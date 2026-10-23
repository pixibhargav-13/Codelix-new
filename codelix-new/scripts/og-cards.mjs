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
import { locationPageBySlug } from "../src/MyComponents/LocationLandingV2/locationPagesData.js";

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
function layout(text, { sizes = [66, 58, 50, 44], maxLines = 2, budget = TEXT_BUDGET } = {}) {
  const wrap = (size) => {
    const lines = [];
    let line = "";
    for (const word of text.split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (textWidth(next, size) <= budget || !line) line = next;
      else {
        lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  for (const size of sizes) {
    const lines = wrap(size);
    if (lines.length <= maxLines && lines.every((l) => textWidth(l, size) <= budget)) {
      return { lines, size };
    }
  }
  /* nothing fit — take the smallest size and let it run to another line */
  const size = sizes[sizes.length - 1];
  return { lines: wrap(size), size };
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
    logo: "codelix-logo.webp", logoHeight: 62,
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
    logo: "Aanganone.webp", logoHeight: 74, chip: true,
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
    logo: "codelix-logo.webp",
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
    logo: "codelix-logo.webp",
    logoHeight: 46,
    eyebrow: m[1] === "services" ? "Services" : "Industries",
    headline: titleFromSlug(m[2]),
    sub: "codelixitsolutions.com",
  });
}

/* city landing pages — "Best Website Development Company in Surat" */
for (const route of routes) {
  const page = /^\/best-/.test(route) && locationPageBySlug(route.slice(1));
  if (!page) continue;
  cards.push({
    route,
    key: route.slice(1),
    accent: BRAND,
    logo: "codelix-logo.webp",
    logoHeight: 46,
    eyebrow: `${page.city.name}, ${page.city.region}`,
    headline: `Best ${page.service.label} Company in ${page.city.name}`,
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

/* ── the homepage globe ───────────────────────────────────────────────────
   The hero on the homepage is a wireframe network sphere, and it is the one
   thing about this site that is visually its own. Rebuilding it here rather
   than screenshotting it keeps the card sharp at any size and lets the
   layout breathe around it — the card ends up looking like the page it
   links to, which is the whole job of a share image.

   Orthographic projection of a unit sphere: a point is placed by latitude
   and longitude, tilted, spun, then flattened by dropping z. z survives as
   depth, which drives opacity and radius so the far side of the sphere
   reads as far away rather than as clutter. */
function sphereArt({ cx, cy, r, accent }) {
  const TILT = -0.36; // radians, lifts the pole toward the viewer
  const SPIN = 0.6;

  const project = (lat, lon) => {
    let x = Math.cos(lat) * Math.cos(lon);
    let y = Math.sin(lat);
    let z = Math.cos(lat) * Math.sin(lon);
    // spin about the vertical axis
    const x1 = x * Math.cos(SPIN) - z * Math.sin(SPIN);
    const z1 = x * Math.sin(SPIN) + z * Math.cos(SPIN);
    // tilt about the horizontal axis
    const y2 = y * Math.cos(TILT) - z1 * Math.sin(TILT);
    const z2 = y * Math.sin(TILT) + z1 * Math.cos(TILT);
    return { x: cx + r * x1, y: cy - r * y2, z: z2 };
  };

  const parts = [];

  /* graticule: latitude rings and longitude meridians, drawn as polylines of
     projected points so the tilt comes out right. Each is split wherever it
     crosses behind the sphere so the back half can be drawn fainter. */
  const strand = (points, front) => {
    const d = points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("");
    const o = front ? 0.34 : 0.12;
    return `<path d="${d}" fill="none" stroke="${accent}" stroke-opacity="${o}" stroke-width="1"/>`;
  };

  const emitStrands = (sample) => {
    let run = [];
    let runFront = null;
    for (const p of sample) {
      const front = p.z >= 0;
      if (runFront === null) runFront = front;
      if (front !== runFront) {
        if (run.length > 1) parts.push(strand(run, runFront));
        run = [run[run.length - 1]].filter(Boolean);
        runFront = front;
      }
      run.push(p);
    }
    if (run.length > 1) parts.push(strand(run, runFront));
  };

  for (let i = 1; i < 8; i++) {
    const lat = -Math.PI / 2 + (i * Math.PI) / 8;
    const ring = [];
    for (let s = 0; s <= 96; s++) ring.push(project(lat, (s / 96) * Math.PI * 2));
    emitStrands(ring);
  }
  for (let m = 0; m < 12; m++) {
    const lon = (m / 12) * Math.PI * 2;
    const mer = [];
    for (let s = 0; s <= 64; s++) mer.push(project(-Math.PI / 2 + (s / 64) * Math.PI, lon));
    emitStrands(mer);
  }

  /* nodes on a Fibonacci lattice — an even scatter without the clumping at
     the poles that a lat/long grid gives you */
  const N = 130;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nodes = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const lat = Math.asin(y);
    const lon = golden * i;
    nodes.push({ ...project(lat, lon), unit: { lat, lon } });
  }

  /* edges between neighbours, front hemisphere only: the back ones read as
     noise through the wireframe rather than as structure */
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      if (a.z < 0.05 || b.z < 0.05) continue;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > r * 0.22) continue;
      const o = (0.14 + 0.26 * Math.min(a.z, b.z)).toFixed(3);
      parts.push(
        `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="#9fb6ff" stroke-opacity="${o}" stroke-width="0.9"/>`
      );
    }
  }

  /* a handful of nodes glow — the ones nearest the viewer, so the highlight
     lands where the eye already is */
  const lit = [...nodes].sort((a, b) => b.z - a.z).slice(0, 9);
  const litSet = new Set(lit);
  for (const n of nodes) {
    const depth = (n.z + 1) / 2;
    if (litSet.has(n)) {
      parts.push(
        `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="9" fill="${accent}" fill-opacity="0.16"/>`,
        `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="3.1" fill="#dfe8ff"/>`
      );
    } else {
      const rr = (1.1 + depth * 1.5).toFixed(2);
      const o = (0.16 + depth * 0.62).toFixed(3);
      parts.push(
        `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${rr}" fill="#c6d4ff" fill-opacity="${o}"/>`
      );
    }
  }

  return parts.join("\n  ");
}

/* ── the per-page constellation ───────────────────────────────────────────
   The homepage keeps the whole globe; giving the same one to fifty-three
   other cards would make it mean nothing. These get a fragment of the same
   language instead — a lattice of nodes and short links — seeded from the
   route, so /services/web-development and /industries/fintech are visibly
   different images that plainly belong to the same set.

   Seeded rather than random on purpose: the script has to produce identical
   bytes when re-run, or every regeneration is a spurious diff of 53 files. */
function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function constellation({ key, cx, cy, r, accent }) {
  const rand = mulberry32(hashString(key));
  const parts = [];
  const nodes = [];

  /* rejection sampling with a minimum separation — a plain uniform scatter
     clumps, and clumps read as a smudge at this opacity */
  let guard = 0;
  while (nodes.length < 26 && guard++ < 4000) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * r;
    const p = { x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d * 0.92 };
    if (nodes.every((q) => Math.hypot(p.x - q.x, p.y - q.y) > r * 0.17)) nodes.push(p);
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d > r * 0.32) continue;
      /* fade with distance from the centre so the shape has an edge rather
         than stopping abruptly at the sampling radius */
      const mid = Math.hypot((nodes[i].x + nodes[j].x) / 2 - cx, (nodes[i].y + nodes[j].y) / 2 - cy);
      const o = (0.26 * (1 - mid / r) + 0.05).toFixed(3);
      parts.push(
        `<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}" stroke="#9fb6ff" stroke-opacity="${o}" stroke-width="0.9"/>`
      );
    }
  }

  const litCount = 2 + Math.floor(rand() * 2);
  nodes.forEach((p, i) => {
    const fade = 1 - Math.hypot(p.x - cx, p.y - cy) / r;
    if (i < litCount) {
      parts.push(
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="10" fill="${accent}" fill-opacity="0.14"/>`,
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="#dfe8ff" fill-opacity="0.85"/>`
      );
    } else {
      parts.push(
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(1.4 + fade * 1.2).toFixed(2)}" fill="#c6d4ff" fill-opacity="${(0.20 + fade * 0.42).toFixed(3)}"/>`
      );
    }
  });

  return parts.join("\n  ");
}

function svgFor(card, logo) {
  const hero = card.variant === "hero";
  /* the art occupies the right third on every card now, so the type gets a
     narrower column than the full width it used to have */
  const budget = hero ? 560 : 660;
  const { lines, size } = layout(card.headline, {
    sizes: hero ? [64, 58, 52] : [66, 58, 50, 44],
    maxLines: hero ? 3 : 2,
    budget,
  });
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
    <radialGradient id="glow" cx="${hero ? "73%" : "88%"}" cy="${hero ? "48%" : "12%"}" r="${hero ? "48%" : "62%"}">
      <stop offset="0%" stop-color="${card.accent}" stop-opacity="${hero ? "0.22" : "0.30"}"/>
      <stop offset="100%" stop-color="${card.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#8ea2d8" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <!-- keeps the art from crowding the headline: a soft wash of the page
         ground pulled across the left, so the type sits on flat colour. The
         plain cards need less of it than the hero, whose globe reaches
         further in. -->
    <linearGradient id="vignette" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#06070c" stop-opacity="0.97"/>
      <stop offset="${hero ? "42%" : "48%"}" stop-color="#06070c" stop-opacity="${hero ? "0.72" : "0.80"}"/>
      <stop offset="${hero ? "62%" : "66%"}" stop-color="#06070c" stop-opacity="0"/>
    </linearGradient>
    <style>
      .t   { fill:#F2F0EC; font-family:'Segoe UI',Arial,Helvetica,sans-serif; font-size:${size}px; font-weight:700; letter-spacing:-1.5px; }
      .eb  { fill:${card.accent}; font-family:'Segoe UI',Arial,Helvetica,sans-serif; font-size:22px; font-weight:600; letter-spacing:2.6px; }
      .sub { fill:#8A8F9C; font-family:'Segoe UI',Arial,Helvetica,sans-serif; font-size:25px; font-weight:400; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  ${
    hero
      ? sphereArt({ cx: 880, cy: 300, r: 232, accent: card.accent })
      : constellation({ key: card.key, cx: 942, cy: 300, r: 196, accent: card.accent })
  }
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
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
  const { lines, size } = layout(card.headline, { budget: 660 });
  widest = Math.max(widest, ...lines.map((l) => textWidth(l, size)));
}

/* The homepage gets the sphere: it is the one link that gets shared as "this
   is the company", and the one page whose card is worth the extra weight. */
const homeLogo = await logoDataUri("codelix-logo.webp", 58);
const home = {
  route: "/", key: "home", accent: BRAND, variant: "hero",
  logo: "codelix-logo.webp", logoHeight: 58,
  eyebrow: "AI-Powered Software Development",
  headline: "We build software that actually scales.",
  sub: "Web · Mobile · AI · ERP — Ahmedabad",
};
await sharp(Buffer.from(svgFor(home, homeLogo)))
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, "home.png"));
manifest["/"] = "/og/home.png";

/* The plain default, for anything with no entry at all — a blog post whose
   cover has not been uploaded yet, mostly. */
const fallback = {
  route: "/", key: "og-image", accent: BRAND,
  logo: "codelix-logo.webp", logoHeight: 62,
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
console.log(`  widest headline line: ${Math.round(widest)}px of 660px column`);
console.log(`  manifest -> src/lib/ogCards.js`);
