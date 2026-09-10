/* Generates every 1200x630 share card, plus the manifest that tells the app
   which routes have one.

   Run from the project root:  node scripts/og-cards.mjs

   Writes:
     public/og-image.png     the default card, used by anything without its own
     public/og/<key>.png     one per route below
     src/lib/ogCards.js      route -> card path, imported by RouteSEO

   Deliberately not a build step. The output is identical bytes until a
   tagline changes, so rasterising sixty images on every deploy would be
   waste. Run it by hand after editing anything here. */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { getGeneratedRoutes } from "../src/lib/route-config.js";

const ROOT = process.cwd();
const IMG = path.join(ROOT, "src/MyComponents/Images");
const OUT = path.join(ROOT, "public/og");

const W = 1200;
const H = 630;
const PAD = 88;
const TEXT_BUDGET = W - PAD * 2;

const BRAND = "#7c9bff";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ── text metrics ─────────────────────────────────────────────────────────
   librsvg gives no way to measure a string, and the cards have to wrap
   without a human deciding every break. These per-character advances are
   eyeballed against Segoe UI Bold and only need to be close: the layout
   uses them to pick a line break and a font size, and both have slack. */
const NARROW = new Set("iljtfIr.,;:'!|()[]-");
const WIDE = new Set("mwMW@");
function textWidth(str, size) {
  let u = 0;
  for (const ch of str) {
    if (ch === " ") u += 0.26;
    else if (NARROW.has(ch)) u += 0.32;
    else if (WIDE.has(ch)) u += 0.88;
    else if (ch >= "A" && ch <= "Z") u += 0.64;
    else if (ch >= "0" && ch <= "9") u += 0.58;
    else u += 0.54;
  }
  return u * size;
}

/* Greedy wrap into at most `maxLines`, shrinking the type until it fits
   rather than letting a long service name run off the card. */
function layout(text, { sizes = [66, 58, 50, 44], maxLines = 2 } = {}) {
  const words = text.split(/\s+/).filter(Boolean);
  for (const size of sizes) {
    const lines = [];
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (textWidth(next, size) <= TEXT_BUDGET || !line) line = next;
      else {
        lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    const fits =
      lines.length <= maxLines &&
      lines.every((l) => textWidth(l, size) <= TEXT_BUDGET);
    if (fits) return { lines, size };
  }
  /* nothing fit — take the smallest size and let it wrap to three */
  const size = sizes[sizes.length - 1];
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (textWidth(next, size) <= TEXT_BUDGET || !line) line = next;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return { lines, size };
}

/* ── naming ───────────────────────────────────────────────────────────────
   Slugs are the only per-page copy that exists for 37 service and industry
   pages, so headlines come from them. Capitalising word by word turns
   "ui-ux-design" into "Ui Ux Design", hence the acronym table. */
const ACRONYMS = {
  ui: "UI", ux: "UX", ai: "AI", api: "API", erp: "ERP", crm: "CRM",
  saas: "SaaS", hr: "HR", it: "IT", b2b: "B2B", iot: "IoT", qa: "QA",
  and: "and", for: "for", of: "of",
};
function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((w) => ACRONYMS[w] ?? w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace("UI UX", "UI/UX")
    .replace("ERP CRM", "ERP & CRM")
    .replace("E Commerce", "E-Commerce")
    .replace("AI Data", "AI & Data");
}

/* ── the cards ────────────────────────────────────────────────────────── */
const routes = getGeneratedRoutes();

/* The legal pages carry noindex and the sitemap is a utility page; none of
   the three is ever shared deliberately, so none gets art. */
const SKIP = new Set(["/terms-of-service", "/privacy-policy", "/refund-policy", "/sitemap", "/"]);

const TOP_LEVEL = {
  "/about": { eyebrow: "About Codelix", headline: "A small team that builds like it's theirs." },
  "/work": { eyebrow: "Our Work", headline: "Real constraints. Real shipped work." },
  "/case-study": { eyebrow: "Case Studies", headline: "The problem, the build, and what changed." },
  "/services": { eyebrow: "What We Do", headline: "Everything we build, in one place." },
  "/industries": { eyebrow: "Industries", headline: "Software shaped by the sector it runs in." },
  "/contact": { eyebrow: "Contact", headline: "Tell us what you're building." },
  "/team": { eyebrow: "Our Team", headline: "The people who actually build it." },
  "/process": { eyebrow: "How We Work", headline: "From first message to launch." },
  "/technologies": { eyebrow: "Our Stack", headline: "The tools we build on, and why." },
  "/pricing": { eyebrow: "Pricing", headline: "How pricing actually works." },
  "/faq": { eyebrow: "Questions", headline: "Straight answers before you commit." },
  "/blog": { eyebrow: "Insights", headline: "What we learn, written down." },
};

/* The four with real brand art of their own. */
const BRANDED = [
  {
    route: "/careers", key: "careers", accent: BRAND,
    logo: "codelix-logo.png", logoHeight: 62,
    eyebrow: "Careers at Codelix",
    headline: "Build things people actually run.",
    sub: "Open roles for developers, designers and freshers — Ahmedabad.",
  },
  {
    route: "/products/audytee", key: "audytee", accent: "#8b6cf0",
    logo: "Audity.svg", logoHeight: 68, chip: true,
    eyebrow: "Practice Management Software",
    headline: "Your CA firm. Smarter. Faster. Done.",
    sub: "A Codelix product",
  },
  {
    route: "/products/4bitx", key: "4bitx", accent: "#e6a23c",
    logo: "4bitX.svg", logoHeight: 88, chip: true,
    eyebrow: "Custom ERP for Every Industry",
    headline: "Your factory. Fully connected.",
    sub: "A Codelix product",
  },
  {
    route: "/products/aanganone", key: "aanganone", accent: "#4ecb9c",
    logo: "Aanganone.svg", logoHeight: 74, chip: true,
    eyebrow: "Society & Community Management",
    headline: "Smart living for modern societies.",
    sub: "A Codelix product",
  },
];

const cards = [...BRANDED];

for (const [route, copy] of Object.entries(TOP_LEVEL)) {
  cards.push({
    route,
    key: route.slice(1),
    accent: BRAND,
    logo: "codelix-logo.png",
    logoHeight: 46,
    ...copy,
    sub: "codelixitsolutions.com",
  });
}

for (const route of routes) {
  const m = /^\/(services|industries)\/(.+)$/.exec(route);
  if (!m) continue;
  cards.push({
    route,
    key: `${m[1]}-${m[2]}`,
    accent: BRAND,
    logo: "codelix-logo.png",
    logoHeight: 46,
    eyebrow: m[1] === "services" ? "Services" : "Industries",
    headline: titleFromSlug(m[2]),
    sub: "codelixitsolutions.com",
  });
}

/* ── rendering ────────────────────────────────────────────────────────── */
async function logoDataUri(file, targetHeight) {
  const buf = await sharp(path.join(IMG, file), { density: 400 })
    .resize({ height: targetHeight * 2 })
    .png()
    .toBuffer();
  const meta = await sharp(buf).metadata();
  return {
    uri: `data:image/png;base64,${buf.toString("base64")}`,
    width: Math.round(meta.width / 2),
    height: Math.round(meta.height / 2),
  };
}

function svgFor(card, logo) {
  const { lines, size } = layout(card.headline);
  const lead = Math.round(size * 1.24);

  /* the eyebrow rides with the headline rather than sitting under the logo:
     bottom-anchoring the title means a one-line headline would otherwise
     leave a hole through the middle of the card */
  const subY = H - PAD - 4;
  const titleBottom = subY - 62;
  const titleTop = titleBottom - (lines.length - 1) * lead;

  const CHIP_PAD = 16;
  const chip = card.chip
    ? `<rect x="${PAD}" y="82" width="${logo.width + CHIP_PAD * 2}" height="${logo.height + CHIP_PAD * 2}" rx="16" fill="#FFFFFF"/>`
    : "";
  const logoX = PAD + (card.chip ? CHIP_PAD : 0);
  const logoY = 82 + (card.chip ? CHIP_PAD : 0);

  const titleText = lines
    .map((l, i) => `<text x="${PAD}" y="${titleTop + i * lead}" class="t">${esc(l)}</text>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0c12"/>
      <stop offset="100%" stop-color="#050507"/>
    </linearGradient>
    <radialGradient id="glow" cx="88%" cy="12%" r="62%">
      <stop offset="0%" stop-color="${card.accent}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${card.accent}" stop-opacity="0"/>
    </radialGradient>
    <style>
      .t   { fill:#F2F0EC; font-family:'Segoe UI',Arial,Helvetica,sans-serif; font-size:${size}px; font-weight:700; letter-spacing:-1.5px; }
      .eb  { fill:${card.accent}; font-family:'Segoe UI',Arial,Helvetica,sans-serif; font-size:22px; font-weight:600; letter-spacing:2.6px; }
      .sub { fill:#8A8F9C; font-family:'Segoe UI',Arial,Helvetica,sans-serif; font-size:25px; font-weight:400; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="6" fill="${card.accent}"/>

  ${chip}
  <image href="${logo.uri}" x="${logoX}" y="${logoY}" width="${logo.width}" height="${logo.height}"/>
  <text x="${PAD}" y="${titleTop - Math.round(size * 0.72) - 26}" class="eb">${esc(card.eyebrow.toUpperCase())}</text>
  ${titleText}
  <text x="${PAD}" y="${subY}" class="sub">${esc(card.sub)}</text>
</svg>`;
}

fs.mkdirSync(OUT, { recursive: true });

const manifest = {};
const logoCache = new Map();
let widest = 0;

for (const card of cards) {
  const cacheKey = `${card.logo}@${card.logoHeight}`;
  if (!logoCache.has(cacheKey)) {
    logoCache.set(cacheKey, await logoDataUri(card.logo, card.logoHeight));
  }
  const logo = logoCache.get(cacheKey);
  const svg = svgFor(card, logo);
  const file = path.join(OUT, `${card.key}.png`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);
  manifest[card.route] = `/og/${card.key}.png`;
  const { lines, size } = layout(card.headline);
  widest = Math.max(widest, ...lines.map((l) => textWidth(l, size)));
}

/* The default card, for everything with no entry above. Same art, no logo
   chip, the positioning line as the headline. */
const fallback = {
  route: "/", key: "og-image", accent: BRAND,
  logo: "codelix-logo.png", logoHeight: 62,
  eyebrow: "Codelix IT Solutions",
  headline: "We build software that actually scales.",
  sub: "Web, mobile, AI and ERP — built in Ahmedabad.",
};
const fbLogo = await logoDataUri(fallback.logo, fallback.logoHeight);
await sharp(Buffer.from(svgFor(fallback, fbLogo)))
  .png({ compressionLevel: 9 })
  .toFile(path.join(ROOT, "public/og-image.png"));

const banner = `/* GENERATED by scripts/og-cards.mjs — do not edit by hand.
   Maps a route to its share card. RouteSEO reads this so a page only
   advertises a card that was actually rendered; anything missing falls
   through to /og-image.png. */\n`;
fs.writeFileSync(
  path.join(ROOT, "src/lib/ogCards.js"),
  `${banner}export const OG_CARDS = ${JSON.stringify(manifest, null, 2)};\n`
);

console.log(`  ${cards.length} route cards + og-image.png`);
console.log(`  widest headline line: ${Math.round(widest)}px of ${TEXT_BUDGET}px budget`);
console.log(`  manifest -> src/lib/ogCards.js`);
