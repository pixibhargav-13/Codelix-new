/* The checks a blog post has to pass, for the admin panel's post editor.
   They mirror the rules scripts/publish-blog-post.mjs enforces on posts
   from the scheduled writer, so a post written by hand reaches the same
   standard: what the blog page builds from (short answer box, FAQ
   accordion, closing button) is there, and the primary search phrase sits
   where search engines weigh it. Plain data and functions only. */

/* label shown in the editor -> the name the blog's category filter uses
   (BlogV2 CATEGORIES), stored as tags[1] */
export const BLOG_CATEGORIES = [
  { label: "Business", value: "business" },
  { label: "Development", value: "Development" },
  { label: "AI", value: "Artificial Intelligence" },
  { label: "E-Commerce", value: "E-Commerce" },
  { label: "CMS", value: "CMS" },
  { label: "UI/UX", value: "UI/UX" },
  { label: "Tech", value: "Tech" },
];
const CATEGORY_VALUES = BLOG_CATEGORIES.map((c) => c.value);

const SITE = "https://www.codelixitsolutions.com";

/* the skeleton "Insert template" puts into an empty editor */
export const POST_TEMPLATE = `Short answer: [the verdict in 2 to 3 sentences, using your main search phrase].

[The reader's real problem, in a short paragraph.]

## [A heading phrased the way people search, with your main search phrase]

[Section text.]

## How much does it cost?

[What drives the cost. Quote prices only from a named, dated source.]

| Option | Best for | Watch out for |
|---|---|---|
| [Option 1] | [...] | [...] |
| [Option 2] | [...] | [...] |

## How long does it take?

[Timeline and what affects it.]

## Before you decide

1. [Checklist item]
2. [Checklist item]
3. [Checklist item]

## How Codelix helps

[A short, honest paragraph, with a link such as [our ERP & CRM development service](${SITE}/services/erp-crm-development).]

## Frequently asked questions

### [Question 1?]

[Direct answer in 1 to 3 sentences.]

### [Question 2?]

[Answer.]

### [Question 3?]

[Answer.]

### [Question 4?]

[Answer.]

[Closing line inviting the reader to talk.] [Book a free consultation](${SITE}/contact)`;

export const SNIPPETS = {
  table: "| Option | Best for | Watch out for |\n|---|---|---|\n| [Option 1] | [...] | [...] |\n| [Option 2] | [...] | [...] |",
  faq: "### [Question?]\n\n[Direct answer in 1 to 3 sentences.]",
  cta: `[Closing line inviting the reader to talk.] [Book a free consultation](${SITE}/contact)`,
  link: `[link text](${SITE}/services/web-development)`,
};

const norm = (t) => String(t || "").toLowerCase().replace(/[-\s]+/g, " ");
export const wordCount = (text) => String(text || "").split(/\s+/).filter(Boolean).length;
export const readTimeFor = (text) => `${Math.max(3, Math.round(wordCount(text) / 200))} min read`;

/* tags as stored: ["All Articles", category, primary keyword, ...extra] */
export function buildTags({ category, primaryKeyword, extraTags }) {
  const extra = String(extraTags || "").split(",").map((t) => t.trim()).filter(Boolean);
  return [...new Set(["All Articles", category, String(primaryKeyword || "").trim(), ...extra].filter(Boolean))];
}

/* the reverse, for posts saved earlier (by the publisher, or by the old
   form with a free-text tag list) */
export function splitTags(tags = []) {
  const rest = tags.filter((t) => t && t !== "All Articles");
  const category = rest.find((t) => CATEGORY_VALUES.includes(t)) || "";
  const others = rest.filter((t) => t !== category);
  /* the publisher stores the primary keyword straight after the category */
  const afterCategory = category && tags[tags.indexOf(category) + 1];
  const primaryKeyword = afterCategory && afterCategory !== "All Articles" && !CATEGORY_VALUES.includes(afterCategory) ? afterCategory : "";
  return { category, primaryKeyword, extraTags: others.filter((t) => t !== primaryKeyword).join(", ") };
}

/* each check: { label, ok, detail } — `detail` says what to fix */
export function checkPost({ title, slug, excerpt, content, category, primaryKeyword, coverImage }) {
  const blocks = String(content || "").replace(/\r\n/g, "\n").split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  const words = wordCount(content);
  const h2s = blocks.filter((b) => b.startsWith("## "));
  const faqStart = blocks.findIndex((b) => /^## (frequently asked questions|faqs?)\b/i.test(b));
  let faqAnswered = 0;
  if (faqStart >= 0) {
    const faq = [];
    for (const b of blocks.slice(faqStart + 1)) { if (b.startsWith("## ")) break; faq.push(b); }
    faqAnswered = faq.filter((b, i) => b.startsWith("### ") && faq[i + 1] && !faq[i + 1].startsWith("### ")).length;
  }
  const kw = String(primaryKeyword || "").trim();
  const kwPlaces = {
    title, slug, description: excerpt, "short answer": blocks[0] || "", "a ## heading": h2s.join(" "),
  };
  const kwMissing = kw ? Object.entries(kwPlaces).filter(([, t]) => !norm(t).includes(norm(kw))).map(([k]) => k) : [];
  const t = String(title || "").trim();
  const e = String(excerpt || "").trim();
  /* the bracketed hints from POST_TEMPLATE / SNIPPETS, plus the usual leftovers */
  const leftover = String(content || "").match(/\[add a short quote|notes for reviewer|\bTODO\b|lorem ipsum|\[(?:the verdict|the reader|a heading|section text|what drives|option \d|\.\.\.|timeline|checklist item|a short, honest|question|answer|direct answer|closing line|link text)[^\]]*\]/i);

  return [
    { label: "Title 20–90 characters", ok: t.length >= 20 && t.length <= 90, detail: `${t.length} characters` },
    { label: "Meta description 80–160 characters", ok: e.length >= 80 && e.length <= 160, detail: `${e.length} characters` },
    { label: "Category chosen", ok: CATEGORY_VALUES.includes(category), detail: "Pick one from the list" },
    { label: "Main search phrase set", ok: !!kw, detail: "The search query the post should rank for" },
    { label: "Main phrase in title, slug, description, short answer and a heading", ok: !!kw && !kwMissing.length, detail: kw ? (kwMissing.length ? `Missing from: ${kwMissing.join(", ")}` : "In all five") : "Set the main search phrase first" },
    { label: 'Starts with "Short answer:"', ok: /^short answer:/i.test(blocks[0] || ""), detail: "Shown as the highlighted box" },
    { label: "At least 3 sections (## headings)", ok: h2s.length >= 3, detail: `${h2s.length} found` },
    { label: "750–2,000 words", ok: words >= 750 && words <= 2000, detail: `${words} words` },
    { label: "FAQ with 4+ answered questions", ok: faqAnswered >= 4, detail: faqStart < 0 ? 'Add "## Frequently asked questions" with "### " questions' : `${faqAnswered} answered` },
    { label: "Closing consultation link", ok: /\]\((https?:\/\/(www\.)?codelixitsolutions\.com)?\/contact\/?\)/i.test(content || ""), detail: "Becomes the Book a free consultation button" },
    { label: "No Sources section", ok: !blocks.some((b) => /^## sources\b/i.test(b)), detail: "Link each source inline instead" },
    { label: "No city-page links", ok: !/\]\((https?:\/\/(www\.)?codelixitsolutions\.com)?\/best-/i.test(content || ""), detail: "Link a service page instead of /best-…" },
    { label: "No template placeholders left", ok: !leftover, detail: leftover ? `Still contains "${leftover[0]}"` : "None" },
    { label: "Cover image added", ok: !!coverImage, detail: "Upload a 1600×720 banner (no title text on it)" },
  ];
}
