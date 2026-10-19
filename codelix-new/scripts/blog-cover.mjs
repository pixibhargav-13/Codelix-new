/* The blog cover: a 1200x630 flat illustration in a bright colour picked
   from the post's topic, with the Codelix logo, the title (first line
   highlighted) and a scene of the topic: a main screen showing it, two
   floating cards and a person with a tablet.

   Shared by publish-blog-post.mjs (new posts) and blog-static-covers.mjs
   (the built-in posts in src/data/blogData.js). The site shows every cover
   at 1200x630 (cards and article hero alike), so nothing is cropped and the
   logo and title can sit near the edges. `banner` and `cover` are the same
   image; both names are kept because the publisher and the page store
   them as two files (<name>.banner.webp / <name>.share.webp).

   category is the blog filter name stored in tags[1] ("business",
   "Development", "Artificial Intelligence", "E-Commerce", "CMS", "UI/UX",
   "Tech"). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;
const FONT = "Segoe UI, Arial, sans-serif";
const LOGO_SVG = fs.readFileSync(path.join(ROOT, "src/MyComponents/Images/codelix_logo.svg"), "utf8");
const [, LOGO_SVG_W, LOGO_SVG_H] = LOGO_SVG.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/).map(Number);

/* one palette per scene: background, deep shade, light tint */
const PALETTES = {
  erp: { bg: "#2563eb", deep: "#1e3a8a", tint: "#dbeafe" },
  mobile: { bg: "#7c3aed", deep: "#4c1d95", tint: "#ede9fe" },
  ai: { bg: "#059669", deep: "#064e3b", tint: "#d1fae5" },
  ecommerce: { bg: "#ea580c", deep: "#7c2d12", tint: "#ffedd5" },
  uiux: { bg: "#db2777", deep: "#831843", tint: "#fce7f3" },
  cms: { bg: "#4f46e5", deep: "#312e81", tint: "#e0e7ff" },
  business: { bg: "#0284c7", deep: "#0c4a6e", tint: "#e0f2fe" },
  development: { bg: "#0f766e", deep: "#134e4a", tint: "#ccfbf1" },
};

/* the title decides first, then the tags, then the category */
const MOTIF_WORDS = [
  ["erp", /\berp\b|tally|inventory|\bcrm\b|manufactur/],
  /* "app" alone means mobile, but "web app" does not */
  ["mobile", /(?<!web )\bapps?\b|mobile|android|\bios\b|flutter|react native|\bpwas?\b|progressive web/],
  ["ai", /\bai\b|chatbot|agent|automation|machine learning|\bllm\b|gpt/],
  ["ecommerce", /e-?commerce|shop|store|checkout|payment|cart|retail/],
  ["uiux", /ui\/ux|\bux\b|\bui\b|design/],
  ["cms", /wordpress|\bcms\b|content/],
  ["business", /saas|on-premise|business|digital presence|cost|pricing/],
];
const CATEGORY_MOTIF = { business: "business", "Artificial Intelligence": "ai", "E-Commerce": "ecommerce", "UI/UX": "uiux", CMS: "cms" };

export function motifFor({ title = "", tags = [], category = "" }) {
  for (const text of [title, tags.join(" ")]) {
    const hit = MOTIF_WORDS.find(([, re]) => re.test(text.toLowerCase()));
    if (hit) return hit[0];
  }
  return CATEGORY_MOTIF[category] || "development";
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text, max) {
  const lines = [];
  let line = "";
  for (const w of text.split(" ")) {
    if ((line + " " + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

/* ── the main screen's content, per scene, inside a 380x280 window whose
   top 40px are the title bar ─────────────────────────────────────────── */
function screen(motif, p) {
  const bar = (x, y, w, h, fill, rx = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
  const line = (x, y, w, fill = "#cbd5e1") => bar(x, y, w, 9, fill, 4.5);
  switch (motif) {
    case "erp":
      return `
        ${bar(22, 58, 104, 62, p.tint, 10)}${bar(138, 58, 104, 62, p.tint, 10)}${bar(254, 58, 104, 62, p.bg, 10)}
        ${line(34, 72, 50, p.bg)}${line(150, 72, 60, p.bg)}${line(266, 72, 56, "#ffffff")}
        ${bar(34, 92, 70, 14, p.deep, 5)}${bar(150, 92, 54, 14, p.deep, 5)}${bar(266, 92, 66, 14, "#ffffff", 5)}
        ${[46, 82, 60, 104, 72, 120].map((h, i) => bar(34 + i * 34, 254 - h, 22, h, i === 5 ? p.bg : p.tint, 5)).join("")}
        <polyline points="248,232 280,206 310,214 352,170" fill="none" stroke="${p.bg}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="352" cy="170" r="7" fill="${p.bg}"/>`;
    case "ai":
      return `
        ${bar(22, 60, 210, 44, p.tint, 14)}${line(38, 77, 150, p.bg)}
        ${bar(150, 116, 210, 44, p.bg, 14)}${line(168, 133, 160, "#ffffff")}
        ${bar(22, 172, 170, 44, p.tint, 14)}${line(38, 189, 110, p.bg)}
        <g transform="translate(300 232)">
          ${[[-30, -12], [0, -26], [30, -12], [-18, 18], [18, 18]].map(([x, y]) => `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${p.deep}" stroke-width="3"/>`).join("")}
          ${[[-30, -12], [0, -26], [30, -12], [-18, 18], [18, 18]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${p.bg}"/>`).join("")}
          <circle r="12" fill="${p.deep}"/><circle r="5" fill="#ffffff"/>
        </g>`;
    case "ecommerce":
      return [0, 1, 2].map((i) => `
        ${bar(22 + i * 118, 60, 100, 150, "#f8fafc", 12)}
        ${bar(32 + i * 118, 70, 80, 70, i === 1 ? p.bg : p.tint, 9)}
        ${line(32 + i * 118, 152, 70)}${line(32 + i * 118, 168, 46, p.bg)}
        ${bar(32 + i * 118, 184, 80, 18, p.deep, 9)}`).join("") + `
        <g transform="translate(316 238)">
          <path d="M-26 -14 H-16 L-8 16 H18 L26 -6 H-12" fill="none" stroke="${p.deep}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="-4" cy="26" r="5" fill="${p.deep}"/><circle cx="14" cy="26" r="5" fill="${p.deep}"/>
        </g>`;
    case "uiux":
      return `
        ${bar(22, 58, 336, 26, p.tint, 8)}
        ${bar(22, 96, 196, 130, "#f1f5f9", 10)}
        <polyline points="40,206 92,150 128,184 160,158 200,206" fill="none" stroke="${p.bg}" stroke-width="4" stroke-linejoin="round"/>
        ${bar(230, 96, 128, 58, p.bg, 10)}${bar(230, 166, 128, 60, p.tint, 10)}
        ${[p.bg, p.deep, p.tint, "#fbbf24"].map((c, i) => `<circle cx="${40 + i * 30}" cy="252" r="10" fill="${c}"/>`).join("")}
        <path d="M300 222 L328 270 L336 250 L356 244 Z" fill="${p.deep}"/>`;
    case "cms":
      return `
        ${bar(22, 58, 220, 16, p.deep, 6)}
        ${[86, 104, 122].map((y, i) => line(22, y, [300, 280, 240][i])).join("")}
        ${bar(22, 142, 150, 100, p.tint, 10)}
        <polyline points="36,226 74,184 102,208 124,190 160,226" fill="none" stroke="${p.bg}" stroke-width="4" stroke-linejoin="round"/>
        ${[150, 168, 186, 204, 222].map((y, i) => line(188, y, [160, 140, 168, 120, 150][i])).join("")}
        <circle cx="330" cy="70" r="20" fill="${p.bg}"/>
        <path d="M320 70 L327 77 L341 63" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "business":
      return `
        ${bar(22, 58, 160, 70, p.tint, 12)}${line(36, 74, 90, p.bg)}${bar(36, 94, 110, 20, p.deep, 6)}
        ${bar(198, 58, 160, 70, p.bg, 12)}${line(212, 74, 80, "#ffffff")}${bar(212, 94, 96, 20, "#ffffff", 6)}
        ${[34, 54, 74, 94].map((h, i) => bar(40 + i * 56, 258 - h, 34, h, i === 3 ? p.bg : p.tint, 6)).join("")}
        <polyline points="44,214 106,196 158,204 228,166 300,150" fill="none" stroke="${p.deep}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M284 144 L302 150 L292 166" fill="none" stroke="${p.deep}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="330" cy="220" r="22" fill="${p.tint}"/><path d="M322 220 L330 212 L338 220 M330 212 V230" fill="none" stroke="${p.bg}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
    default: /* development */
      return `
        ${[[0, 120, p.bg], [20, 180, "#94a3b8"], [20, 140, p.deep], [40, 200, "#94a3b8"], [40, 110, p.bg], [20, 160, "#94a3b8"], [0, 90, p.deep], [0, 150, "#94a3b8"]]
          .map(([x, w, c], i) => line(56 + x, 62 + i * 24, w, c)).join("")}
        ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<text x="26" y="${70 + i * 24}" font-family="${FONT}" font-size="11" fill="#94a3b8">${i + 1}</text>`).join("")}
        <g transform="translate(316 228)">
          <circle r="30" fill="${p.bg}"/>
          <path d="M-10 -10 L-18 0 L-10 10 M10 -10 L18 0 L10 10 M4 -14 L-4 14" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>`;
  }
}

/* ── what makes each cover its own ──────────────────────────────────────
   The scene is picked from the topic (motif). On top of that, the post's
   title seeds the rest — layout side, colour shade, the person's look —
   so two posts on the same topic still differ, and a given post always
   gets the same image. Tech names the post mentions appear as chips. */

/* a second shade for each scene, chosen per post */
const ALT_PALETTES = {
  erp: { bg: "#0369a1", deep: "#082f49", tint: "#e0f2fe" },
  mobile: { bg: "#9333ea", deep: "#581c87", tint: "#f3e8ff" },
  ai: { bg: "#0d9488", deep: "#134e4a", tint: "#ccfbf1" },
  ecommerce: { bg: "#dc2626", deep: "#7f1d1d", tint: "#fee2e2" },
  uiux: { bg: "#c026d3", deep: "#701a75", tint: "#fae8ff" },
  cms: { bg: "#2563eb", deep: "#1e3a8a", tint: "#dbeafe" },
  business: { bg: "#1d4ed8", deep: "#172554", tint: "#dbeafe" },
  development: { bg: "#334155", deep: "#0f172a", tint: "#e2e8f0" },
};

/* tech and topic names shown as chips when the title or tags mention them */
const TECH = [
  ["React Native", /react native/i], ["Next.js", /next\.?js/i], ["React", /\breact\b(?! native)/i], ["Node.js", /node\.?js/i],
  ["Laravel", /laravel/i], ["Flutter", /flutter/i], ["PWA", /\bpwas?\b|progressive web/i], ["SaaS", /\bsaas\b/i],
  ["WordPress", /wordpress/i], ["Shopify", /shopify/i], ["WooCommerce", /woocommerce/i], ["ERP", /\berp\b/i],
  ["CRM", /\bcrm\b/i], ["GST", /\bgst\b/i], ["Tally", /\btally\b/i], ["UPI", /\bupi\b/i], ["Figma", /figma/i],
  ["AI", /\bai\b/i], ["UI/UX", /ui\/ux/i], ["Cloud", /\bcloud\b|on-premise/i], ["E-Commerce", /e-?commerce/i],
];
export function chipsFor(title, tags = []) {
  const found = [];
  for (const text of [title, tags.join(" ")]) {
    for (const [label, re] of TECH) if (re.test(text) && !found.includes(label)) found.push(label);
  }
  return found.slice(0, 2);
}

function hash(s) {
  let h = 2166136261;
  for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/* ── the two small floating cards, per scene ─────────────────────────── */
function card(x, y, w, h, p, body) {
  return `<g transform="translate(${x} ${y})">
    <rect x="4" y="8" width="${w}" height="${h}" rx="16" fill="${p.deep}" fill-opacity=".35"/>
    <rect width="${w}" height="${h}" rx="16" fill="#ffffff"/>${body}</g>`;
}
const pill = (x, y, w, fill) => `<rect x="${x}" y="${y}" width="${w}" height="9" rx="4.5" fill="${fill}"/>`;
const rupee = (x, y, size, fill) => `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="${fill}" text-anchor="middle">₹</text>`;

function cardA(motif, p, right) { /* 150 x 112, lower left of the scene */
  const b = {
    erp: `${[0, 1, 2].map((i) => `<rect x="${18 + i * 14}" y="${62 - i * 16}" width="38" height="30" rx="5" fill="${i === 2 ? p.bg : p.tint}" stroke="${p.deep}" stroke-opacity=".25"/>`).join("")}${pill(92, 40, 42, p.bg)}${pill(92, 58, 34, "#cbd5e1")}${pill(92, 76, 40, "#cbd5e1")}`,
    ai: `<path d="M44 26 L52 48 L74 56 L52 64 L44 86 L36 64 L14 56 L36 48 Z" fill="${p.bg}"/><text x="90" y="68" font-family="${FONT}" font-size="30" font-weight="800" fill="${p.deep}">AI</text>`,
    ecommerce: `<path d="M18 44 L52 22 H98 V68 L64 90 Z" fill="${p.tint}" stroke="${p.bg}" stroke-width="3" stroke-linejoin="round"/><circle cx="86" cy="36" r="5" fill="${p.bg}"/>${rupee(60, 70, 30, p.deep)}${pill(108, 48, 28, p.bg)}`,
    uiux: `${[p.bg, p.deep, "#fbbf24", p.tint].map((c, i) => `<circle cx="${30 + i * 30}" cy="40" r="12" fill="${c}" stroke="#e2e8f0"/>`).join("")}${pill(18, 70, 90, "#cbd5e1")}${pill(18, 86, 60, p.bg)}`,
    cms: `<rect x="30" y="20" width="58" height="74" rx="6" fill="${p.tint}"/><rect x="22" y="28" width="58" height="74" rx="6" fill="#ffffff" stroke="${p.bg}" stroke-width="3"/>${pill(32, 44, 36, p.bg)}${pill(32, 60, 38, "#cbd5e1")}${pill(32, 76, 30, "#cbd5e1")}${pill(98, 46, 36, p.deep)}`,
    business: `${[0, 1, 2, 3].map((i) => `<ellipse cx="46" cy="${82 - i * 14}" rx="26" ry="9" fill="${i === 3 ? p.bg : p.tint}" stroke="${p.deep}" stroke-opacity=".3"/>`).join("")}${rupee(46, 46, 20, "#ffffff")}${pill(92, 46, 42, p.bg)}${pill(92, 64, 32, "#cbd5e1")}`,
    development: `<rect x="12" y="14" width="126" height="84" rx="10" fill="#0f172a"/><circle cx="26" cy="28" r="4" fill="#f87171"/><circle cx="40" cy="28" r="4" fill="#fbbf24"/><circle cx="54" cy="28" r="4" fill="#34d399"/><text x="24" y="60" font-family="Consolas, monospace" font-size="16" font-weight="700" fill="#34d399">$</text>${pill(42, 50, 70, "#94a3b8")}${pill(24, 72, 50, p.tint)}`,
    mobile: `<path d="M44 30 C30 30 28 44 28 56 V68 L22 76 H66 L60 68 V56 C60 44 58 30 44 30 Z" fill="${p.bg}"/><circle cx="44" cy="82" r="6" fill="${p.bg}"/><circle cx="60" cy="32" r="8" fill="#f43f5e"/>${pill(86, 44, 46, p.deep)}${pill(86, 62, 36, "#cbd5e1")}`,
  }[motif];
  return card(right ? 626 : 596, 352, 150, 112, p, b);
}

function cardB(motif, p) { /* 168 x 98, top right of the scene */
  const star = (x, f) => `<path d="M${x} 30 l5 10 l11 1.5 l-8 7.5 l2 11 l-10 -5.5 l-10 5.5 l2 -11 l-8 -7.5 l11 -1.5 Z" fill="${f}"/>`;
  const b = {
    erp: `<text x="20" y="36" font-family="${FONT}" font-size="16" font-weight="800" fill="${p.deep}">GST</text>${pill(70, 26, 76, p.tint)}${pill(20, 52, 128, "#cbd5e1")}${pill(20, 70, 90, "#cbd5e1")}${rupee(140, 82, 20, p.bg)}`,
    ai: `<rect x="16" y="22" width="120" height="44" rx="14" fill="${p.tint}"/><path d="M30 66 L24 80 L44 66 Z" fill="${p.tint}"/>${[0, 1, 2].map((i) => `<circle cx="${52 + i * 22}" cy="44" r="6" fill="${p.bg}" fill-opacity="${1 - i * .25}"/>`).join("")}`,
    ecommerce: `<rect x="18" y="34" width="64" height="38" rx="6" fill="${p.bg}"/><path d="M82 46 H110 L124 60 V72 H82 Z" fill="${p.deep}"/><circle cx="40" cy="76" r="9" fill="#111827"/><circle cx="104" cy="76" r="9" fill="#111827"/>${pill(130, 30, 22, "#cbd5e1")}`,
    uiux: `<path d="M40 70 C40 40 120 70 120 36" fill="none" stroke="${p.bg}" stroke-width="4"/><rect x="34" y="64" width="12" height="12" fill="#ffffff" stroke="${p.deep}" stroke-width="3"/><rect x="114" y="30" width="12" height="12" fill="#ffffff" stroke="${p.deep}" stroke-width="3"/><path d="M78 20 L92 46 L78 54 L64 46 Z" fill="${p.deep}"/>`,
    cms: `${[0, 1].map((i) => `<rect x="20" y="${22 + i * 32}" width="40" height="22" rx="11" fill="${i === 0 ? p.bg : "#e2e8f0"}"/><circle cx="${i === 0 ? 49 : 31}" cy="${33 + i * 32}" r="8" fill="#ffffff"/>${pill(72, 29 + i * 32, i === 0 ? 72 : 56, "#cbd5e1")}`).join("")}`,
    business: `<path d="M24 70 L52 46 L76 58 L120 26" fill="none" stroke="${p.bg}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M104 24 L122 24 L122 42" fill="none" stroke="${p.bg}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>${pill(24, 80, 70, "#cbd5e1")}`,
    development: `<circle cx="42" cy="49" r="20" fill="none" stroke="${p.bg}" stroke-width="8" stroke-dasharray="8 5"/><circle cx="42" cy="49" r="8" fill="${p.deep}"/><circle cx="98" cy="28" r="7" fill="${p.bg}"/><circle cx="98" cy="72" r="7" fill="${p.bg}"/><circle cx="136" cy="50" r="7" fill="${p.deep}"/><path d="M98 35 V65 M98 50 Q118 50 130 50" fill="none" stroke="${p.bg}" stroke-width="4"/>`,
    mobile: `${[0, 1, 2, 3, 4].map((i) => star(30 + i * 27, i < 4 ? "#fbbf24" : "#e2e8f0")).join("")}${pill(20, 74, 96, "#cbd5e1")}`,
  }[motif];
  return card(944, 64, 168, 98, p, b);
}

/* ── the main screen (or a phone), the chips and a person ───────────── */
const SKINS = ["#f2c094", "#d9a066", "#9a6640"];
function person(p, v) {
  const skin = SKINS[v.skin];
  const shirt = v.shirt ? "#ffffff" : p.tint;
  const hair = [
    `<path d="M29 42 C25 12 48 4 64 7 C83 10 92 26 87 46 C82 32 73 24 60 24 C47 24 36 31 29 42 Z" fill="#1f2937"/>`,
    `<circle cx="58" cy="6" r="13" fill="#1f2937"/><path d="M29 42 C27 14 46 10 58 10 C74 10 90 18 87 44 C80 30 70 26 58 26 C46 26 36 30 29 42 Z" fill="#1f2937"/>`,
    `<path d="M27 72 C20 40 26 8 58 8 C90 8 96 40 89 72 C84 56 86 30 74 26 C64 22 52 22 42 26 C30 32 32 56 27 72 Z" fill="#3b2314"/>`,
  ][v.hair];
  return `<g transform="translate(1050 288)">
      <ellipse cx="58" cy="338" rx="64" ry="10" fill="${p.deep}" fill-opacity=".35"/>
      <rect x="28" y="190" width="24" height="146" rx="11" fill="#1f2937"/>
      <rect x="62" y="190" width="24" height="146" rx="11" fill="#111827"/>
      <rect x="18" y="326" width="38" height="13" rx="6.5" fill="#0b0d14"/><rect x="58" y="326" width="38" height="13" rx="6.5" fill="#0b0d14"/>
      <rect x="18" y="78" width="80" height="128" rx="28" fill="${shirt}"/>
      <rect x="47" y="62" width="22" height="22" rx="7" fill="${skin}"/><rect x="47" y="62" width="22" height="22" rx="7" fill="#000000" fill-opacity=".12"/>
      <circle cx="58" cy="40" r="29" fill="${skin}"/>
      ${hair}
      <circle cx="48" cy="44" r="3" fill="#1f2937"/><circle cx="68" cy="44" r="3" fill="#1f2937"/>
      <path d="M50 55 Q58 61 66 55" fill="none" stroke="#1f2937" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M26 98 Q8 132 22 162" fill="none" stroke="${shirt}" stroke-width="20" stroke-linecap="round"/>
      <path d="M90 98 Q106 136 70 162" fill="none" stroke="${shirt}" stroke-width="20" stroke-linecap="round"/>
      <g transform="rotate(-6 46 152)">
        <rect x="16" y="118" width="62" height="78" rx="9" fill="#111827"/>
        <rect x="22" y="124" width="50" height="66" rx="5" fill="${p.bg}"/>
        <rect x="28" y="132" width="30" height="7" rx="3.5" fill="#ffffff" fill-opacity=".9"/>
        <rect x="28" y="146" width="38" height="7" rx="3.5" fill="#ffffff" fill-opacity=".6"/>
      </g>
      <circle cx="22" cy="164" r="9" fill="${skin}"/><circle cx="70" cy="164" r="9" fill="${skin}"/>
    </g>`;
}

function mainScreen(motif, p) {
  if (motif === "mobile") {
    return `<g transform="translate(720 92)">
        <rect x="6" y="10" width="200" height="380" rx="34" fill="${p.deep}" fill-opacity=".35"/>
        <rect width="200" height="380" rx="34" fill="#111827"/>
        <rect x="10" y="10" width="180" height="360" rx="26" fill="#ffffff"/>
        <rect x="74" y="20" width="52" height="8" rx="4" fill="#111827"/>
        <rect x="26" y="46" width="148" height="86" rx="14" fill="${p.bg}"/>
        <circle cx="58" cy="78" r="14" fill="#ffffff" fill-opacity=".9"/><rect x="82" y="70" width="70" height="9" rx="4.5" fill="#ffffff"/><rect x="82" y="88" width="48" height="9" rx="4.5" fill="#ffffff" fill-opacity=".7"/>
        ${[0, 1, 2, 3].map((i) => `<rect x="${26 + (i % 2) * 78}" y="${146 + Math.floor(i / 2) * 78}" width="70" height="68" rx="12" fill="${i === 1 ? p.tint : "#f1f5f9"}"/><circle cx="${48 + (i % 2) * 78}" cy="${170 + Math.floor(i / 2) * 78}" r="9" fill="${i === 1 ? p.bg : p.deep}" fill-opacity="${i === 1 ? 1 : .5}"/>`).join("")}
        <rect x="26" y="310" width="148" height="36" rx="18" fill="${p.deep}"/><rect x="66" y="324" width="68" height="8" rx="4" fill="#ffffff"/>
      </g>`;
  }
  return `<g transform="translate(640 112)">
      <rect x="6" y="10" width="380" height="280" rx="18" fill="${p.deep}" fill-opacity=".35"/>
      <rect width="380" height="280" rx="18" fill="#ffffff"/>
      <rect width="380" height="40" rx="18" fill="#f1f5f9"/><rect y="22" width="380" height="18" fill="#f1f5f9"/>
      <circle cx="24" cy="20" r="6" fill="#f87171"/><circle cx="44" cy="20" r="6" fill="#fbbf24"/><circle cx="64" cy="20" r="6" fill="#34d399"/>
      ${screen(motif, p)}
    </g>`;
}

/* chips sit on the main screen's top edge, like labels stuck to it */
function chips(labels, motif, p) {
  let x = motif === "mobile" ? 650 : 660;
  const y = motif === "mobile" ? 62 : 84;
  return labels.map((label) => {
    const w = Math.round(label.length * 11.5 + 34);
    const out = `<g transform="translate(${x} ${y})">
        <rect x="3" y="5" width="${w}" height="38" rx="19" fill="${p.deep}" fill-opacity=".35"/>
        <rect width="${w}" height="38" rx="19" fill="${p.deep}"/>
        <text x="${w / 2}" y="25" font-family="${FONT}" font-size="17" font-weight="700" fill="#ffffff" text-anchor="middle">${esc(label)}</text>
      </g>`;
    x += w + 10;
    return out;
  }).join("");
}

function scene(motif, p, v, labels) {
  const sparks = `<path d="M590 76 l10 -18 M610 84 l18 -10 M584 96 l-16 -4" stroke="#ffffff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/>`;
  return sparks + mainScreen(motif, p) + cardA(motif, p, v.right) + cardB(motif, p) + chips(labels, motif, p) + person(p, v);
}

export async function renderCover({ title, category, tags = [] }) {
  const motif = motifFor({ title, tags, category });
  const h = hash(title);
  const v = { right: h & 1, alt: (h >> 1) & 1, hair: (h >>> 2) % 3, skin: (h >>> 4) % 3, shirt: (h >>> 6) & 1 };
  const p = v.alt ? ALT_PALETTES[motif] : PALETTES[motif];
  const labels = chipsFor(title, tags);

  /* the scene is drawn for the right half; "right" layouts slide it to the
     left half and put the title (and logo) on the right instead */
  const SHIFT = -570;
  const tx = v.right ? 660 : 56;

  /* title kept inside 500px so it never runs under the illustration; the
     largest size that fits in four lines wins (bold glyphs ~0.6em) */
  const MAX_W = v.right ? 470 : 500;
  const AVG = 0.6;
  let size = 40;
  let lines = wrap(title, Math.floor(MAX_W / (40 * AVG))).slice(0, 5);
  for (const s of [54, 48, 44, 40]) {
    const l = wrap(title, Math.floor(MAX_W / (s * AVG)));
    if (l.length <= 4) { size = s; lines = l; break; }
  }
  const lead = Math.round(size * 1.2);
  const blockH = lines.length * lead;
  const top = Math.max(170, 345 - blockH / 2) + size * 0.82;
  const textW = (s) => Math.round(s.length * size * AVG);

  /* the vector logo sits straight on the colour, drawn in white so it
     reads on every palette (its blue mark would vanish on the blue and
     purple ones). It always heads the title column: top left, or above the
     title on "right" layouts, which keeps the top-right corner clear for the
     blog card's arrow badge. */
  const LOGO_H = 46;
  const logoW = Math.round((LOGO_SVG_W / LOGO_SVG_H) * LOGO_H);
  const logoX = v.right ? tx : 56;
  const logo = LOGO_SVG.replace(/<svg[^>]*>/, `<svg x="${logoX}" y="44" width="${logoW}" height="${LOGO_H}" viewBox="0 0 ${LOGO_SVG_W} ${LOGO_SVG_H}" fill="none">`)
    .replace(/fill="(?!none)[^"]*"/g, 'fill="#ffffff"').replace(/stroke="(?!none)[^"]*"/g, 'stroke="#ffffff"');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#ffffff" fill-opacity=".18"/></pattern>
    <linearGradient id="sheen" x1="${v.right ? 1 : 0}" y1="0" x2="${v.right ? 0 : 1}" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".10"/><stop offset="1" stop-color="#000000" stop-opacity=".12"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${p.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#sheen)"/>
  <circle cx="${v.right ? 120 : 1080}" cy="40" r="230" fill="#ffffff" fill-opacity=".07"/>
  <circle cx="${v.right ? 540 : 660}" cy="620" r="160" fill="#ffffff" fill-opacity=".05"/>
  <rect x="${v.right ? W - 260 : 0}" y="470" width="260" height="160" fill="url(#dots)"/>

  <g transform="translate(${v.right ? SHIFT : 0} 0)">${scene(motif, p, v, labels)}</g>

  ${logo}

  ${lines.map((l, i) => {
    const y = top + i * lead;
    const t = `<text x="${i === 0 ? tx + 16 : tx}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="${i === 0 ? p.deep : "#ffffff"}">${esc(l)}</text>`;
    const box = `x="${tx - 8}" y="${y - size * 0.86}" width="${Math.min(textW(l) + 40, v.right ? W - tx - 16 : 548)}" height="${size * 1.12}" rx="12"`;
    return i === 0 ? `<rect ${box} fill="${p.tint}"/><rect ${box} fill="none" stroke="#ffffff" stroke-width="3"/>${t}` : t;
  }).join("\n  ")}

  <text x="${tx}" y="${H - 34}" font-family="${FONT}" font-size="20" font-weight="600" fill="#ffffff" fill-opacity=".85">codelixitsolutions.com/blog</text>
</svg>`;
  const image = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toBuffer();
  return { cover: image, banner: image, motif, layout: v.right ? "title right" : "title left", chips: labels };
}
