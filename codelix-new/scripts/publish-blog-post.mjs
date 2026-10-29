/* Publishes a blog post written by the scheduled "blog writer" task (or by
   hand) straight to Supabase, with a generated cover, then asks Vercel to
   rebuild so the post is prerendered and listed in sitemap.xml — the
   IndexNow workflow then runs on its own after that production deploy.

     node scripts/publish-blog-post.mjs --list              existing posts, to avoid repeats
     node scripts/publish-blog-post.mjs post.json --dry-run validate + render cover, send nothing
     node scripts/publish-blog-post.mjs post.json           publish, then check the live page
     node scripts/publish-blog-post.mjs --verify <slug>     re-run the live checks for a published post
     node scripts/publish-blog-post.mjs --slot              the oldest scheduled slot still without a post
     node scripts/publish-blog-post.mjs post.json --published-at=<ISO>
                                                            publish dated to that missed slot

   Slots: the writer is scheduled Mon, Wed and Fri at 10:00 IST. When a run
   can't happen (a usage limit, an outage), a later run catches up: --slot
   names the oldest slot from the last 14 days that has no post, and the
   post goes out dated to that slot, so the blog keeps its schedule.

   post.json:
     { title, slug?, excerpt, content, category, primary_keyword, tags: [4–6], read_time?,
       post_type, fact_check: [{ claim, source, quote }, ...],
       review: { accuracy, relevance, reader_value, seo } }
   post_type sets the length: educational 800–1,200 words, tutorial
   1,200–1,800, comparison 1,000–1,500 (with a table), erp-guide
   1,000–1,600. review holds the findings of the pre-publish review, one
   note per area, so a post can't go live without one.
   fact_check is the post's evidence: each factual claim, the URL it comes
   from and the exact sentence on that page that supports it. Every
   external link in the content needs at least one entry. The dry run
   writes it out as <slug>-fact-check.md for review.
   or post.md — the same fields as a header between "---" lines (tags
   comma-separated), then the content as plain text. Easier to review than
   JSON; drafts live in content/blog-drafts/.
   category is one of: Business, Development, AI, E-Commerce, CMS, UI/UX, Tech
   (mapped to the blog page's filter names). content uses the markup that
   src/lib/articleMarkup.jsx renders: blocks separated by a blank line;
   "## " / "### " headings, "- " and "1. " lists, "> " quotes, "|" tables,
   [label](url) links, plain paragraphs. No "# " — the title is the H1.

   Needs, in .env.local (never committed — .env.* is gitignored):
     VITE_SUPABASE_URL          already used by the build
     SUPABASE_SERVICE_ROLE_KEY  writes bypass the "authenticated only" policy;
                                Supabase → Project settings → API keys
     VERCEL_DEPLOY_HOOK_URL     optional; Vercel → Project → Settings → Git →
                                Deploy Hooks, branch main. Without it the post
                                is live (client-rendered) but not prerendered
                                until the next deploy. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { renderCover } from "./blog-cover.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, "..");
dotenv.config({ path: path.join(ROOT, ".env.local"), quiet: true });

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const LIST = args.includes("--list");
const VERIFY = args.includes("--verify");
const SLOT = args.includes("--slot");
const PUBLISHED_AT = (args.find((a) => a.startsWith("--published-at=")) || "").slice("--published-at=".length);
const file = args.find((a) => !a.startsWith("--"));

/* Never process.exit() while a network request may still be closing: on
   Windows, Node aborts with a libuv assertion (exit code 127) and the run
   looks failed even when it worked. Errors throw Stop; normal ends return
   from main() and let Node exit by itself. */
class Stop extends Error {}
const fail = (msg) => {
  throw new Stop(msg);
};

async function main() {

const { VITE_SUPABASE_URL: URL_, SUPABASE_SERVICE_ROLE_KEY: KEY, VERCEL_DEPLOY_HOOK_URL: HOOK } = process.env;
const needDb = LIST || VERIFY || SLOT || !DRY;
if (needDb && (!URL_ || !KEY)) {
  fail("VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local");
}
/* .env.local ships with REPLACE_ME placeholders until the real keys go in */
const placeholders = Object.entries({ VITE_SUPABASE_URL: URL_, SUPABASE_SERVICE_ROLE_KEY: KEY, VERCEL_DEPLOY_HOOK_URL: HOOK })
  .filter(([, v]) => v && v.includes("REPLACE_ME"))
  .map(([k]) => k);
if (needDb && placeholders.some((k) => k !== "VERCEL_DEPLOY_HOOK_URL")) {
  fail(`.env.local still has placeholder values for: ${placeholders.join(", ")}. Replace them with the real keys.`);
}
if (placeholders.includes("VERCEL_DEPLOY_HOOK_URL")) {
  fail(".env.local still has a placeholder VERCEL_DEPLOY_HOOK_URL. Paste the real deploy hook URL, or delete that line to publish without an automatic rebuild.");
}
const db = needDb ? createClient(URL_, KEY, { auth: { persistSession: false } }) : null;

/* ── --slot ────────────────────────────────────────────────────────────
   Prints the slot to write for, or "no missed slot" (the run should stop
   there, before any research). */
if (SLOT) {
  const slot = await missedSlot(db);
  console.log(slot ? `slot: ${slot.toISOString()} (${slotLabel(slot)})` : "no missed slot");
  return;
}

/* ── --list ──────────────────────────────────────────────────────────── */
if (LIST) {
  const { data, error } = await db
    .from("blog_posts")
    .select("title, slug, tags, published, published_at")
    .order("published_at", { ascending: false, nullsFirst: false });
  if (error) fail(error.message);
  for (const p of data) {
    console.log(`${p.published ? "live " : "draft"} | ${(p.published_at || "").slice(0, 10)} | ${p.slug} | ${p.title} | ${(p.tags || []).join(", ")}`);
  }
  console.log(`${data.length} posts`);
  return;
}

/* ── --verify <slug> ─────────────────────────────────────────────────── */
if (VERIFY) {
  if (!file) fail("usage: node scripts/publish-blog-post.mjs --verify <slug>");
  const { data: post, error } = await db.from("blog_posts").select("cover_image_url").eq("slug", file).maybeSingle();
  if (error) fail(error.message);
  if (!post) fail(`no post with slug "${file}"`);
  await verifyLive(file, [post.cover_image_url, post.cover_image_url.replace(/\.banner\.webp$/, ".share.webp")]);
  return;
}

/* ── validate ────────────────────────────────────────────────────────── */
if (!file) fail("usage: node scripts/publish-blog-post.mjs <post.json> [--dry-run] | --list | --verify <slug>");
const post = file.endsWith(".md") ? readMarkdownPost(fs.readFileSync(file, "utf8")) : JSON.parse(fs.readFileSync(file, "utf8"));

/* the blog page's category filter (BlogV2 CATEGORIES) uses these names */
const CATEGORY_FILTER = {
  business: "business", development: "Development", ai: "Artificial Intelligence",
  "artificial intelligence": "Artificial Intelligence", "e-commerce": "E-Commerce",
  ecommerce: "E-Commerce", cms: "CMS", "ui/ux": "UI/UX", tech: "Tech",
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const title = String(post.title || "").trim();
const slug = slugify(post.slug || title);
const excerpt = String(post.excerpt || "").trim();
const content = String(post.content || "").replace(/\r\n/g, "\n").trim();
const category = CATEGORY_FILTER[String(post.category || "").trim().toLowerCase()];
const tags = [...new Set((post.tags || []).map((t) => String(t).trim()).filter((t) => t && t !== "All Articles"))];

const words = content.split(/\s+/).filter(Boolean).length;
const blocks = content.split(/\n\n+/).map((b) => b.trim());
const h2s = blocks.filter((b) => b.startsWith("## ")).length;
const problems = [];
if (title.length < 20 || title.length > 90) problems.push(`title is ${title.length} chars (want 20–90)`);
if (excerpt.length < 80 || excerpt.length > 160) problems.push(`excerpt is ${excerpt.length} chars (want 80–160, it is the meta description)`);
/* length by kind of post (the owner's ranges, 26 Oct 2026) */
const POST_TYPES = {
  educational: { label: "simple educational blog", min: 800, max: 1200 },
  tutorial: { label: "detailed technical tutorial", min: 1200, max: 1800 },
  comparison: { label: "software or technology comparison", min: 1000, max: 1500 },
  "erp-guide": { label: "industry-specific ERP guide", min: 1000, max: 1600 },
};
const postType = POST_TYPES[String(post.post_type || "").trim().toLowerCase()];
if (!postType) problems.push(`post_type "${post.post_type || ""}" must be one of: ${Object.keys(POST_TYPES).join(", ")}`);
else {
  if (words < postType.min || words > postType.max) problems.push(`content is ${words} words; a ${postType.label} should be ${postType.min.toLocaleString("en-IN")}–${postType.max.toLocaleString("en-IN")}`);
  if (post.post_type === "comparison" && !blocks.some((b) => b.startsWith("|"))) problems.push("a comparison post needs a comparison table");
}
/* the pre-publish review: what was checked in each area, and what changed */
const REVIEW_AREAS = { accuracy: "every claim re-checked against its fact_check quote", relevance: "the post answers the search query it targets", reader_value: "a business owner can act on it", seo: "keyword placement, title, description, headings, links" };
const review = post.review && typeof post.review === "object" ? post.review : {};
for (const [k, what] of Object.entries(REVIEW_AREAS)) {
  if (String(review[k] || "").trim().length < 30) problems.push(`review.${k} is missing: say what the review checked (${what}) and what it changed`);
}
if (h2s < 3) problems.push(`content has ${h2s} "## " headings (want 3+)`);
if (blocks.some((b) => /^# /.test(b))) problems.push(`content has a "# " heading — the title is already the H1`);
if (!category) problems.push(`category "${post.category}" is not one of Business, Development, AI, E-Commerce, CMS, UI/UX, Tech`);
if (tags.length < 1 || tags.length > 6) problems.push(`want 1–6 tags, got ${tags.length}`);
/* the primary search phrase must appear where search engines weigh it most:
   title, meta description (excerpt), the "Short answer" sentence, a "## "
   heading and the slug. Matching ignores case and treats - and spaces alike. */
const primary = String(post.primary_keyword || "").trim();
const norm = (t) => String(t).toLowerCase().replace(/[-\s]+/g, " ");
if (!primary) problems.push("no primary_keyword given");
else {
  const where = {
    title,
    excerpt,
    slug,
    "first paragraph": blocks[0] || "",
    "a ## heading": blocks.filter((b) => b.startsWith("## ")).join(" "),
  };
  const missing = Object.entries(where).filter(([, t]) => !norm(t).includes(norm(primary))).map(([k]) => k);
  if (missing.length) problems.push(`primary keyword "${primary}" is missing from: ${missing.join(", ")}`);
}
/* things that belong in the run's report, never on the live page */
const leftovers = [/\[add a short quote/i, /notes for reviewer/i, /\bTODO\b/, /lorem ipsum/i, /\[insert/i, /\[placeholder/i];
for (const re of leftovers) if (re.test(content)) problems.push(`content still contains "${content.match(re)[0]}"`);
/* the page builds its FAQ accordion from this section (src/lib/articleMarkup.jsx
   articleFaqs): a heading, then "### " questions each followed by an answer */
const faqStart = blocks.findIndex((b) => /^## (frequently asked questions|faqs?)\b/i.test(b));
if (faqStart < 0) problems.push(`no "## Frequently asked questions" section`);
else {
  const faqBlocks = [];
  for (const b of blocks.slice(faqStart + 1)) { if (b.startsWith("## ")) break; faqBlocks.push(b); }
  const answered = faqBlocks.filter((b, i) => b.startsWith("### ") && faqBlocks[i + 1] && !faqBlocks[i + 1].startsWith("### ")).length;
  if (answered < 4) problems.push(`FAQ has ${answered} answered "### " questions (want 4–5)`);
}
/* the answer-first opening, shown by the page as a "Short answer" box */
if (!/^short answer:/i.test(blocks[0] || "")) problems.push(`the first paragraph must start with "Short answer:"`);
/* the closing line's contact link becomes the page's consultation button */
if (!/\]\((https?:\/\/(www\.)?codelixitsolutions\.com)?\/contact\/?\)/i.test(content)) problems.push(`no closing link to https://www.codelixitsolutions.com/contact`);
/* sources are linked inline where their facts appear, not listed at the end */
if (blocks.some((b) => /^## sources\b/i.test(b))) problems.push(`content has a "## Sources" section — link each source inline instead`);
/* the city landing pages (/best-…) are kept off the rest of the site */
if (/\]\((https?:\/\/(www\.)?codelixitsolutions\.com)?\/best-/i.test(content)) problems.push("content links to a city landing page (/best-…); link a service page instead");
/* markup the blog's renderer (src/lib/articleMarkup.jsx) can't show: it
   would appear as raw symbols, or a line would silently go missing */
problems.push(...markupProblems(blocks));
problems.push(...proseProblems(content));
problems.push(...factCheckProblems(post.fact_check, content));
problems.push(...(await linkProblems(content)));
if (problems.length) fail(`post rejected:\n   - ${problems.join("\n   - ")}`);

if (db) {
  if (slug.startsWith("best-")) fail(`slug "${slug}" looks like a city landing page URL; choose another`);
  const { data: clash } = await db.from("blog_posts").select("id").eq("slug", slug).maybeSingle();
  if (clash) fail(`a post with slug "${slug}" already exists`);
}

/* a post dated to a missed slot: only that exact slot is accepted, so a
   typo can't put a post at an arbitrary date */
let publishedAt = new Date();
if (PUBLISHED_AT) {
  const when = new Date(PUBLISHED_AT);
  if (Number.isNaN(when.getTime())) fail(`--published-at "${PUBLISHED_AT}" is not a date; use the ISO time --slot printed`);
  if (!isSlot(when)) fail(`--published-at ${when.toISOString()} is not a scheduled slot (Mon, Wed or Fri at 10:00 IST)`);
  if (when > new Date()) fail("--published-at is in the future");
  if (db) {
    const slot = await missedSlot(db);
    if (!slot || slot.getTime() !== when.getTime()) fail(`--published-at ${when.toISOString()} isn't the oldest missed slot (that is ${slot ? slot.toISOString() : "none"}); run --slot`);
  }
  publishedAt = when;
}

/* ── cover: see scripts/blog-cover.mjs ─────────────────────────────── */
const { cover, banner, motif } = await renderCover({ title, category, tags });
/* the covers must be WebP (RIFF....WEBP) and light, so the blog loads fast;
   stop before anything is uploaded if that ever changes */
for (const [name, buf] of [["banner", banner], ["share", cover]]) {
  const isWebp = buf.length > 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP";
  if (!isWebp) fail(`the ${name} cover is not a WebP image`);
  if (buf.length > 200 * 1024) fail(`the ${name} cover is ${Math.round(buf.length / 1024)} KB (want under 200 KB)`);
}

const row = {
  title,
  slug,
  excerpt,
  content,
  /* tags[1] is what the blog shows as the post's category */
  /* tags[1] is the category; the primary keyword comes next, so it leads the
     post's meta keywords (src/lib/blogKeywords.js) */
  tags: [...new Set(["All Articles", category, primary, ...tags])],
  read_time: String(post.read_time || "").trim() || `${Math.max(3, Math.round(words / 200))} min read`,
  published: true,
  published_at: publishedAt.toISOString(),
};

if (DRY) {
  const out = path.join(path.dirname(path.resolve(file)), `${slug}-cover.webp`);
  const outBanner = path.join(path.dirname(path.resolve(file)), `${slug}-banner.webp`);
  fs.writeFileSync(out, cover);
  fs.writeFileSync(outBanner, banner);
  const ledger = path.join(path.dirname(path.resolve(file)), `${slug}-fact-check.md`);
  fs.writeFileSync(ledger, factCheckReport(title, post.fact_check, post.review));
  console.log(`✅ dry run OK — ${words} words, ${h2s} sections, ${row.read_time}, cover: ${motif}, tags: ${row.tags.join(", ")}`);
  console.log(`   would publish https://www.codelixitsolutions.com/blog/${slug}${PUBLISHED_AT ? `, dated ${slotLabel(publishedAt)}` : ""}`);
  console.log(`   share card preview: ${out}`);
  console.log(`   on-site banner preview: ${outBanner}`);
  console.log(`   fact check (${post.fact_check.length} claims): ${ledger}`);
  console.log(`   type: ${postType.label} (${postType.min}–${postType.max} words)`);
  return;
}

/* ── publish ─────────────────────────────────────────────────────────── */
/* two files, one column: cover_image_url is the on-site banner
   (<name>.banner.webp); the link-preview card sits next to it as
   <name>.share.webp, and useBlogPosts derives that URL for og:image */
const base = `blog/${slug}-${Date.now().toString(36)}`;
for (const [suffix, buf] of [["banner", banner], ["share", cover]]) {
  const up = await db.storage.from("media").upload(`${base}.${suffix}.webp`, buf, { contentType: "image/webp", cacheControl: "31536000", upsert: false });
  if (up.error) fail(`${suffix} image upload failed: ${up.error.message}`);
}
row.cover_image_url = db.storage.from("media").getPublicUrl(`${base}.banner.webp`).data.publicUrl;

const { error } = await db.from("blog_posts").insert(row);
if (error) fail(`insert failed: ${error.message}`);
console.log(`✅ published https://www.codelixitsolutions.com/blog/${slug} (${words} words, ${row.read_time})`);

const postUrl = `${SITE_ORIGIN}/blog/${slug}`;
let rebuilt = false;
if (HOOK) {
  const res = await fetch(HOOK, { method: "POST" });
  if (res.ok) {
    console.log("✅ Vercel rebuild started — waiting for the post to appear in sitemap.xml");
    rebuilt = await waitForSitemap(postUrl);
    console.log(rebuilt ? "✅ deployed: the post is prerendered and listed in sitemap.xml" : "⚠️ the post wasn't in sitemap.xml after 10 minutes; the deploy may still be running or may have failed (check Vercel)");
  } else {
    console.log(`⚠️ deploy hook returned HTTP ${res.status}`);
  }
} else {
  /* without a rebuild the post is still fully indexable: sitemap-posts.xml
     (api/sitemap.js) reads Supabase live, and the page is served from
     post-shell.html, so its own canonical and meta tags are the only ones.
     The "Rebuild for new posts" workflow (.github/workflows/
     rebuild-new-posts.yml) notices the post within half an hour and
     triggers the deploy that prerenders it and adds it to sitemap.xml. */
  console.log("ℹ️ VERCEL_DEPLOY_HOOK_URL not set — no immediate rebuild. The post is live and listed in sitemap-posts.xml now, with its own canonical and meta tags; the \"Rebuild for new posts\" GitHub workflow redeploys within about 30 minutes, which prerenders it and adds it to sitemap.xml and /sitemap");
}

/* IndexNow from here rather than relying on the GitHub workflow, whose
   sitemap fetch from GitHub's runners has come back empty. The post is
   already live (rendered in the browser even before the rebuild), so it is
   submitted either way, together with the blog listing it now heads. */
await submitIndexNow([postUrl, `${SITE_ORIGIN}/blog`]);

await verifyLive(slug, [row.cover_image_url, db.storage.from("media").getPublicUrl(`${base}.share.webp`).data.publicUrl]);
}

const SITE_ORIGIN = "https://www.codelixitsolutions.com";

/* ── schedule slots ─────────────────────────────────────────────────────
   10:00 IST is 04:30 UTC, the same calendar day. Counting starts at the
   first slot a run missed (Wed 28 Oct 2026, a usage limit), so nothing
   older is backfilled, and looks back at most 14 days. A slot is covered
   by any post published from that slot up to the next one. */
const SLOT_DAYS = [1, 3, 5];
const SLOT_START = Date.parse("2026-10-28T04:30:00Z");
const LOOKBACK_MS = 14 * 24 * 3600 * 1000;
const isSlot = (d) => SLOT_DAYS.includes(d.getUTCDay()) && d.getUTCHours() === 4 && d.getUTCMinutes() === 30 && d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0;
const slotLabel = (d) => `${d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })}, 10:00 IST`;
function slotsSince(from, to) {
  const out = [];
  const day = new Date(from);
  day.setUTCHours(4, 30, 0, 0);
  for (; day.getTime() <= to; day.setUTCDate(day.getUTCDate() + 1)) {
    if (day.getTime() >= from && SLOT_DAYS.includes(day.getUTCDay())) out.push(new Date(day));
  }
  return out;
}
async function missedSlot(db) {
  const now = Date.now();
  const from = Math.max(SLOT_START, now - LOOKBACK_MS);
  const slots = slotsSince(from, now);
  if (!slots.length) return null;
  const { data, error } = await db.from("blog_posts").select("published_at").eq("published", true).gte("published_at", slots[0].toISOString());
  if (error) fail(error.message);
  const times = data.map((p) => Date.parse(p.published_at));
  for (let i = 0; i < slots.length; i++) {
    const start = slots[i].getTime();
    const end = i + 1 < slots.length ? slots[i + 1].getTime() : Infinity;
    if (!times.some((t) => t >= start && t < end)) return slots[i];
  }
  return null;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* post.md: "key: value" lines between two "---" lines, then the content */
function readMarkdownPost(text) {
  const m = text.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) fail('a .md post must start with a "---" header block');
  const post = { content: m[2].trim() };
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) post[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  post.tags = String(post.tags || "").split(",").map((t) => t.trim()).filter(Boolean);
  return post;
}

/* ── markup checks ──────────────────────────────────────────────────────
   Each rule is a way a post has rendered wrongly or could: the renderer
   knows only blank-line-separated blocks of "## "/"### " headings, "- " and
   "1. " lists, "> " quotes, "|" tables and paragraphs with [label](url)
   links. Anything else shows up as raw text, and a list or heading that
   shares its block with other lines loses those lines. */
function markupProblems(blocks) {
  const out = [];
  const short = (b) => JSON.stringify(b.length > 60 ? `${b.slice(0, 60)}…` : b);
  for (const b of blocks) {
    const ls = b.split("\n").map((l) => l.trim()).filter(Boolean);
    if (/\*\*|__/.test(b)) out.push(`bold markup (** or __) shows as raw symbols: ${short(b)}`);
    if (/(^|\s)\*[^*\s][^*]*\*(\s|[.,;:]|$)/.test(b)) out.push(`italic markup (*text*) shows as raw symbols: ${short(b)}`);
    if (/```/.test(b)) out.push(`code fences aren't supported: ${short(b)}`);
    if (/!\[[^\]]*\]\(/.test(b)) out.push(`images aren't supported in the text: ${short(b)}`);
    if (/<\/?[a-z][^>]*>/i.test(b)) out.push(`HTML tags show as raw text: ${short(b)}`);
    if (/^#{4,}\s/m.test(b)) out.push(`only "## " and "### " headings are supported: ${short(b)}`);
    if (/^#{2,3} /.test(b) && ls.length > 1) out.push(`a heading must be alone in its block (blank line after it): ${short(b)}`);
    if (b.startsWith("- ") && ls.some((l) => !l.startsWith("- "))) out.push(`every line of a "- " list must start with "- " (other lines are dropped): ${short(b)}`);
    if (/^1\.\s/.test(b) && ls.some((l) => !/^\d+\.\s/.test(l))) out.push(`every line of a numbered list must start with "N. " (other lines are dropped): ${short(b)}`);
    if (!/^(- |\d+\.\s|\||#{2,3} )/.test(b) && ls.slice(1).some((l) => /^(- |\d+\.\s|\||#{2,3} )/.test(l))) {
      out.push(`a list, table or heading must start its own block (blank line before it): ${short(b)}`);
    }
    if (b.startsWith("|")) {
      if (ls.some((l) => !l.startsWith("|"))) out.push(`every line of a table must start with "|": ${short(b)}`);
      const rows = ls.filter((l) => !/^\|[\s:|-]+\|?$/.test(l));
      const width = (l) => l.replace(/^\||\|$/g, "").split("|").length;
      if (!ls[1] || !/^\|[\s:|-]+\|?$/.test(ls[1])) out.push(`a table's second line must be the "|---|---|" separator: ${short(b)}`);
      if (rows.some((r) => width(r) !== width(rows[0]))) out.push(`every table row needs the same number of cells as the header: ${short(b)}`);
    }
  }
  for (const [, url] of blocks.join("\n").matchAll(/\]\(([^)\s]*)\)/g)) {
    if (!/^(https:\/\/|\/)/.test(url)) out.push(`link "${url}" must be a full https:// URL or a /path on this site`);
  }
  return out;
}

/* ── prose checks ───────────────────────────────────────────────────────
   Slips a proofread should catch but a writing pass can introduce, like
   "...under our [security service](…) We'll sign an NDA", which went live
   on 26 Oct 2026 without its full stop. Link URLs are left out of the
   text these look at, so their dots and slashes don't trip them. */
function proseProblems(content) {
  const out = [];
  const text = content.replace(/\]\([^)]*\)/g, "]");
  const near = (s, i) => JSON.stringify(s.slice(Math.max(0, i - 30), i + 30));
  for (const m of content.matchAll(/\]\([^)\s]+\) +(?=[A-Z][a-z'’])/g)) {
    out.push(`a link runs straight into the next sentence (missing full stop?): ${near(content, m.index + m[0].length)}`);
  }
  for (const m of text.matchAll(/[a-z]{2}[.!?][A-Z][a-z]/g)) out.push(`no space after a full stop: ${near(text, m.index + 3)}`);
  for (const m of text.matchAll(/\b([A-Za-z]{2,}) \1\b/gi)) out.push(`doubled word "${m[1]}": ${near(text, m.index + 4)}`);
  if (/[—–]/.test(text)) out.push("em or en dashes: use a comma, full stop or plain hyphen");
  for (const b of text.split(/\n\n+/)) {
    const open = (b.match(/\(/g) || []).length;
    const close = (b.match(/\)/g) || []).length;
    if (open !== close) out.push(`unbalanced brackets (${open} "(" vs ${close} ")"): ${JSON.stringify(b.slice(0, 60))}`);
  }
  /* products the site no longer lists; promote what the Products menu shows */
  if (/4bitx/i.test(content)) out.push("mentions 4bitx, which the site no longer lists; use Codelix Custom ERP (https://www.codelixitsolutions.com/products/codelix-erp) instead");
  return out;
}

/* ── fact check ─────────────────────────────────────────────────────────
   Every claim needs its evidence on record: the source URL and the exact
   sentence that supports it, copied from the page or PDF that was read
   (not from a search snippet). Every external link must be backed by at
   least one entry, so no source is cited without having been read. */
function factCheckProblems(fc, content) {
  if (!Array.isArray(fc) || fc.length < 3) {
    return ['add "fact_check": a list of { claim, source, quote } for each factual claim (dates, numbers, rules, prices, names), with the exact supporting sentence from the source'];
  }
  const out = [];
  const norm = (u) => String(u || "").trim().replace(/[#?].*$/, "").replace(/\/+$/, "").toLowerCase();
  fc.forEach((e, i) => {
    const n = `fact_check[${i}]`;
    if (!e || typeof e !== "object") return out.push(`${n} must be { claim, source, quote }`);
    if (String(e.claim || "").trim().length < 15) out.push(`${n}.claim is missing or too short`);
    if (!/^https:\/\//.test(String(e.source || ""))) out.push(`${n}.source must be the https:// URL the quote comes from`);
    const q = String(e.quote || "").trim();
    if (q.length < 15 || q.length > 600) out.push(`${n}.quote must be the exact supporting sentence (15–600 characters), got ${q.length}`);
  });
  const sources = new Set(fc.map((e) => norm(e && e.source)));
  const external = [...new Set([...content.matchAll(/\]\((https:\/\/[^)\s]+)\)/g)].map((m) => m[1]))]
    .filter((u) => !/codelixitsolutions\.com/.test(u));
  for (const u of external) if (!sources.has(norm(u))) out.push(`external link ${u} has no fact_check entry (what does it support, and with which sentence?)`);
  return out;
}

function factCheckReport(title, fc, review) {
  const lines = [`# Fact check: ${title}`, "", `Checked ${new Date().toISOString().slice(0, 10)}. Each claim, its source and the sentence that supports it.`, ""];
  fc.forEach((e, i) => lines.push(`${i + 1}. ${e.claim}`, `   - Source: ${e.source}`, `   - Quote: "${String(e.quote).trim()}"`, ""));
  lines.push("## Review", "");
  for (const [k, v] of Object.entries(review || {})) lines.push(`- ${k}: ${v}`);
  return lines.join("\n");
}

/* ── link checks ────────────────────────────────────────────────────────
   Internal links must reach a real page: /blog/ and /case-study/ links are
   looked up in the sitemaps (an unknown one still answers 200 with a "not
   found" page), everything else must answer 200. External links are only
   warned about, since many sites refuse automated requests. A failure to
   reach our own site is a warning too, not a rejection. */
async function linkProblems(text) {
  const out = [];
  const urls = [...new Set([...text.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]))];
  const internal = urls.filter((u) => u.startsWith("/") || /^https:\/\/(www\.)?codelixitsolutions\.com/.test(u))
    .map((u) => u.replace(/^https:\/\/(www\.)?codelixitsolutions\.com/, "").replace(/[?#].*$/, "") || "/");
  let listed;
  try {
    const xml = (await Promise.all(["sitemap.xml", "sitemap-posts.xml"].map(async (f) => (await fetch(`${SITE_ORIGIN}/${f}?ts=${Date.now()}`)).text()))).join("");
    listed = new Set([...xml.matchAll(/<loc>https:\/\/www\.codelixitsolutions\.com([^<]*)<\/loc>/g)].map((m) => m[1] || "/"));
  } catch (e) {
    console.log(`⚠️ couldn't read the sitemaps to check internal links (${e.message})`);
    return out;
  }
  for (const p of new Set(internal)) {
    if (/^\/(blog|case-study)\/[^/]+$/.test(p)) {
      if (!listed.has(p)) out.push(`internal link ${p} isn't a published post or case study`);
      continue;
    }
    try {
      const res = await fetch(`${SITE_ORIGIN}${p}`, { redirect: "manual" });
      if (res.status !== 200) out.push(`internal link ${p} answers HTTP ${res.status}${res.headers.get("location") ? ` (redirects to ${res.headers.get("location")})` : ""}; link the final page`);
    } catch (e) {
      console.log(`⚠️ couldn't check internal link ${p} (${e.message})`);
    }
  }
  for (const u of urls.filter((u) => /^https:\/\//.test(u) && !/codelixitsolutions\.com/.test(u))) {
    try {
      const res = await fetch(u, { method: "GET", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (compatible; CodelixLinkCheck/1.0)" }, signal: AbortSignal.timeout(15000) });
      if (res.status === 404 || res.status === 410) console.log(`⚠️ external link looks dead (HTTP ${res.status}): ${u}`);
    } catch {
      /* unreachable from here is not proof the link is dead */
    }
  }
  return out;
}

/* ── live checks after publishing ──────────────────────────────────────
   What a reader and a search engine get, checked on the live site: the
   page loads, its canonical is its own (never the homepage's), it is in
   sitemap-posts.xml, and both covers are served as WebP. The post is
   already live when these run, so a failure is reported, never retried by
   publishing again; `--verify <slug>` re-runs just these checks. */
async function verifyLive(slug, coverUrls) {
  const postUrl = `${SITE_ORIGIN}/blog/${slug}`;
  const problems = [];
  const attempt = async () => {
    const found = [];
    const res = await fetch(`${postUrl}?ts=${Date.now()}`, { headers: { "User-Agent": "Mozilla/5.0 (compatible; CodelixLiveCheck/1.0)" } });
    if (res.status !== 200) found.push(`the post answers HTTP ${res.status}`);
    const html = await res.text();
    const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
    if (canonicals.length > 1) found.push(`the page HTML has ${canonicals.length} canonical tags`);
    if (canonicals.some((c) => c !== postUrl)) found.push(`the page HTML's canonical is ${canonicals.find((c) => c !== postUrl)}, not the post`);
    const xml = await (await fetch(`${SITE_ORIGIN}/sitemap-posts.xml?ts=${Date.now()}`)).text();
    if (!xml.includes(`<loc>${postUrl}</loc>`)) found.push("the post isn't in sitemap-posts.xml");
    for (const u of coverUrls) {
      const c = await fetch(u);
      if (c.status !== 200 || !/image\/webp/.test(c.headers.get("content-type") || "")) found.push(`cover ${u.split("/").pop()} answers HTTP ${c.status} (${c.headers.get("content-type")})`);
    }
    return found;
  };
  /* a fresh post can take a moment to reach the CDN */
  for (let i = 0; i < 4; i++) {
    try {
      problems.splice(0, problems.length, ...(await attempt()));
    } catch (e) {
      problems.splice(0, problems.length, `couldn't reach the live site (${e.message})`);
    }
    if (!problems.length) break;
    await sleep(30000);
  }
  if (problems.length) {
    console.log(`❌ LIVE CHECK FAILED for ${postUrl} (the post IS published; don't publish it again):\n   - ${problems.join("\n   - ")}`);
    process.exitCode = 1;
  } else {
    console.log("✅ live checks passed: the page loads with its own canonical, it is in sitemap-posts.xml, and both covers are WebP");
  }
}

async function waitForSitemap(url) {
  for (let i = 0; i < 30; i++) {
    await sleep(20000);
    try {
      const xml = await (await fetch(`${SITE_ORIGIN}/sitemap.xml?ts=${Date.now()}`, { cache: "no-store" })).text();
      if (xml.includes(`<loc>${url}</loc>`)) return true;
    } catch {
      /* keep waiting */
    }
  }
  return false;
}

async function submitIndexNow(urls) {
  const pub = path.join(ROOT, "public");
  const keyFile = fs.readdirSync(pub).find((f) => {
    const m = /^([a-f0-9]{32})\.txt$/.exec(f);
    return m && fs.readFileSync(path.join(pub, f), "utf8").trim() === m[1];
  });
  if (!keyFile) {
    console.log("⚠️ IndexNow skipped: no key file in public/");
    return;
  }
  const key = keyFile.replace(/\.txt$/, "");
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: new URL(SITE_ORIGIN).host, key, keyLocation: `${SITE_ORIGIN}/${keyFile}`, urlList: urls }),
    });
    console.log(res.status === 200 || res.status === 202
      ? `✅ IndexNow: HTTP ${res.status}, submitted ${urls.length} URLs (${urls.join(", ")})`
      : `⚠️ IndexNow returned HTTP ${res.status}`);
  } catch (e) {
    console.log(`⚠️ IndexNow request failed: ${e.message}`);
  }
}

main().catch((e) => {
  console.error(e instanceof Stop ? `❌ ${e.message}` : e);
  process.exitCode = 1;
});
