/* Publishes a blog post written by the scheduled "blog writer" task (or by
   hand) straight to Supabase, with a generated cover, then asks Vercel to
   rebuild so the post is prerendered and listed in sitemap.xml — the
   IndexNow workflow then runs on its own after that production deploy.

     node scripts/publish-blog-post.mjs --list              existing posts, to avoid repeats
     node scripts/publish-blog-post.mjs post.json --dry-run validate + render cover, send nothing
     node scripts/publish-blog-post.mjs post.json           publish

   post.json:
     { title, slug?, excerpt, content, category, primary_keyword, tags: [4–6], read_time? }
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
import { BLOG_POST_SLUGS } from "../src/lib/blogSlugs.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, "..");
dotenv.config({ path: path.join(ROOT, ".env.local"), quiet: true });

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const LIST = args.includes("--list");
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
const needDb = LIST || !DRY;
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

/* ── validate ────────────────────────────────────────────────────────── */
if (!file) fail("usage: node scripts/publish-blog-post.mjs <post.json> [--dry-run] | --list");
const post = JSON.parse(fs.readFileSync(file, "utf8"));

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
if (words < 750 || words > 2000) problems.push(`content is ${words} words (want 750–2,000)`);
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
if (problems.length) fail(`post rejected:\n   - ${problems.join("\n   - ")}`);

if (db) {
  /* the twelve built-in posts live in src/data/blogData.js, not the
     database, so a database check alone would let a new post take one of
     their URLs; the two would then clash on the site */
  if (BLOG_POST_SLUGS.includes(slug)) fail(`slug "${slug}" belongs to one of the built-in posts; choose another`);
  if (slug.startsWith("best-")) fail(`slug "${slug}" looks like a city landing page URL; choose another`);
  const { data: clash } = await db.from("blog_posts").select("id").eq("slug", slug).maybeSingle();
  if (clash) fail(`a post with slug "${slug}" already exists`);
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
  published_at: new Date().toISOString(),
};

if (DRY) {
  const out = path.join(path.dirname(path.resolve(file)), `${slug}-cover.webp`);
  const outBanner = path.join(path.dirname(path.resolve(file)), `${slug}-banner.webp`);
  fs.writeFileSync(out, cover);
  fs.writeFileSync(outBanner, banner);
  console.log(`✅ dry run OK — ${words} words, ${h2s} sections, ${row.read_time}, cover: ${motif}, tags: ${row.tags.join(", ")}`);
  console.log(`   would publish https://www.codelixitsolutions.com/blog/${slug}`);
  console.log(`   share card preview: ${out}`);
  console.log(`   on-site banner preview: ${outBanner}`);
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
     post-shell.html, so its own canonical and meta tags are the only ones */
  console.log("ℹ️ VERCEL_DEPLOY_HOOK_URL not set — no rebuild. The post is live and listed in sitemap-posts.xml now, with its own canonical and meta tags; it is prerendered and added to sitemap.xml at the next deploy");
}

/* IndexNow from here rather than relying on the GitHub workflow, whose
   sitemap fetch from GitHub's runners has come back empty. The post is
   already live (rendered in the browser even before the rebuild), so it is
   submitted either way, together with the blog listing it now heads. */
await submitIndexNow([postUrl, `${SITE_ORIGIN}/blog`]);
}

const SITE_ORIGIN = "https://www.codelixitsolutions.com";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
