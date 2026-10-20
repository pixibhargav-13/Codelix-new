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
import * as opentype from "opentype.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;
/* covers use Inter (the site's own font, SIL OFL), bundled in scripts/fonts.
   Every <text> is turned into vector outlines from those files just before
   rendering (outlineText), so the cover never depends on the fonts
   installed on the machine: it looks the same on Windows and on the Linux
   machine that runs the scheduled blog task in the cloud. */
const FONT = "Inter";
const FONT_FILES = { 600: "Inter_600SemiBold.ttf", 700: "Inter_700Bold.ttf", 800: "Inter_800ExtraBold.ttf" };
const FONTS = Object.fromEntries(Object.entries(FONT_FILES).map(([w, f]) => {
  const buf = fs.readFileSync(path.join(ROOT, "scripts/fonts", f));
  return [w, opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))];
}));
const fontFor = (weight) => FONTS[Number(weight) >= 800 ? 800 : Number(weight) >= 700 ? 700 : 600];
/* width in px of a line of text, letter spacing included */
const measure = (str, size, weight = 600, spacing = 0) => fontFor(weight).getAdvanceWidth(str, size) + spacing * Math.max(0, [...str].length - 1);
const unesc = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

function outlineText(svg) {
  return svg.replace(/<text\b([^>]*)>([^<]*)<\/text>/g, (_, attrs, body) => {
    const attr = (n, d) => (attrs.match(new RegExp(`(?:^|[ ])${n}="([^"]*)"`)) || [])[1] ?? d;
    const str = unesc(body);
    const size = Number(attr("font-size", 16));
    const weight = attr("font-weight", 600);
    const spacing = Number(attr("letter-spacing", 0));
    const font = fontFor(weight);
    let x = Number(attr("x", 0));
    const y = Number(attr("y", 0));
    const w = measure(str, size, weight, spacing);
    const anchor = attr("text-anchor", "start");
    if (anchor === "middle") x -= w / 2;
    else if (anchor === "end") x -= w;
    let d = "";
    for (const ch of [...str]) {
      d += font.getPath(ch === " " ? "" : ch, x, y, size).toPathData(2);
      x += font.getAdvanceWidth(ch, size) + spacing;
    }
    const opacity = attr("fill-opacity");
    return `<path d="${d}" fill="${attr("fill", "#000000")}"${opacity ? ` fill-opacity="${opacity}"` : ""}/>`;
  });
}
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

/* greedy word wrap by measured width (the first line is indented 16px
   inside its highlight box, so it gets 16px less) */
function wrapPx(text, maxPx, size) {
  const lines = [];
  let line = "";
  for (const w of text.split(" ")) {
    const next = (line + " " + w).trim();
    const room = lines.length ? maxPx : maxPx - 16;
    if (line && measure(next, size, 800) > room) {
      lines.push(line);
      line = w;
    } else line = next;
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


/* ── more screens per scene, picked by what the post is about ──────────
   screen() above is variant 0 of each scene; these are 1 and 2. The
   title (then the tags) picks one through SCREEN_HINTS; when nothing
   matches, the title's hash does. */
const SCREEN_COUNT = { development: 3, mobile: 2, business: 3, uiux: 2, ecommerce: 2, cms: 2, ai: 2, erp: 2 };
const SCREEN_HINTS = {
  development: [[2, /end-to-end|one team|process|deliver|agile/], [1, /scal|architect|cloud|server|\bapi\b|microservice/], [0, /laravel|php|code|bug|test/]],
  mobile: [[1, /\bpwas?\b|progressive web|web app/], [0, /trend|native|android|\bios\b|flutter/]],
  business: [[1, /\bvs\.?\b|versus|compare|on-premise/], [2, /presence|online|seo|google|search|website/]],
  uiux: [[1, /design system|component|library/], [0, /conversion|retention|experience|\bux\b/]],
  ecommerce: [[1, /payment|checkout|\bupi\b|cart|order/]],
  cms: [[1, /editor|admin|custom post|plugin|advanced/]],
  ai: [[1, /automat|workflow|agent|whatsapp/]],
  erp: [[1, /inventory|stock|warehouse|tally/]],
};
function screenFor(motif, title, tags, h) {
  for (const text of [title, tags.join(" ")]) {
    const hit = (SCREEN_HINTS[motif] || []).find(([, re]) => re.test(text.toLowerCase()));
    if (hit) return hit[0];
  }
  return h % SCREEN_COUNT[motif];
}

function screenAlt(motif, n, p) {
  const bar = (x, y, w, h, fill, rx = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
  const line = (x, y, w, fill = "#cbd5e1") => bar(x, y, w, 9, fill, 4.5);
  const soft = (x, y, w, o = 0.75) => `<rect x="${x}" y="${y}" width="${w}" height="8" rx="4" fill="#ffffff" fill-opacity="${o}"/>`;
  const check = (x, y, fill) => `<circle cx="${x}" cy="${y}" r="9" fill="${fill}"/><path d="M${x - 4} ${y} l3 3 l5 -6" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  const stars = (x, y, n5) => [0, 1, 2, 3, 4].map((i) => `<path transform="translate(${x + i * 16} ${y}) scale(.55)" d="M10 0 l3 7 l7.5 .8 l-5.6 5 l1.7 7.4 l-6.6 -3.9 l-6.6 3.9 l1.7 -7.4 l-5.6 -5 l7.5 -.8 Z" fill="${i < n5 ? "#fbbf24" : "#e2e8f0"}"/>`).join("");
  const key = `${motif}${n}`;
  switch (key) {
    case "development1": /* architecture: client, two services, a database */
      return `
        <path d="M190 100 V114 M100 114 H280 M100 114 V130 M280 114 V130 M100 174 V194 M280 174 V194 M100 194 H280 M190 194 V206" fill="none" stroke="${p.deep}" stroke-opacity=".45" stroke-width="3"/>
        ${bar(140, 56, 100, 44, p.tint, 10)}${bar(152, 66, 40, 8, p.bg, 4)}${line(152, 80, 70)}
        ${[50, 230].map((x) => `${bar(x, 130, 100, 44, p.deep, 10)}${[0, 1].map((i) => `${soft(x + 12, 140 + i * 14, 58, .7)}<circle cx="${x + 84}" cy="${144 + i * 14}" r="3.5" fill="#34d399"/>`).join("")}`).join("")}
        <rect x="156" y="212" width="68" height="40" fill="${p.bg}"/><ellipse cx="190" cy="252" rx="34" ry="9" fill="${p.bg}"/>
        <path d="M156 230 A34 9 0 0 0 224 230" fill="none" stroke="#ffffff" stroke-opacity=".5" stroke-width="2.5"/>
        <ellipse cx="190" cy="212" rx="34" ry="9" fill="${p.tint}"/>
        <path d="M300 236 a12 12 0 0 1 3 -23 a16 16 0 0 1 30 -3 a11 11 0 0 1 4 26 Z" fill="${p.tint}"/>`;
    case "development2": /* process: four steps and a progress bar */
      return `
        ${line(60, 106, 270, "#e2e8f0")}${line(60, 106, 180, p.bg)}
        ${[60, 150, 240, 330].map((x, i) => `<circle cx="${x}" cy="110" r="26" fill="${i < 3 ? p.bg : p.tint}" stroke="#ffffff" stroke-width="4"/>
          <text x="${x}" y="118" font-family="${FONT}" font-size="22" font-weight="800" fill="${i < 3 ? "#ffffff" : p.deep}" text-anchor="middle">${i + 1}</text>
          ${line(x - 30, 150, 60, i < 3 ? p.deep : "#cbd5e1")}${line(x - 22, 166, 44)}`).join("")}
        ${bar(22, 196, 336, 62, "#f8fafc", 12)}
        ${[0, 1, 2].map((i) => `<circle cx="${48 + i * 22}" cy="227" r="13" fill="${[p.tint, p.bg, p.deep][i]}" stroke="#ffffff" stroke-width="3"/>`).join("")}
        ${line(120, 214, 150, p.deep)}${bar(120, 232, 220, 12, "#e2e8f0", 6)}${bar(120, 232, 170, 12, p.bg, 6)}`;
    case "mobile1": /* a web page with an install banner, and the same app on a phone */
      return `
        ${bar(22, 56, 214, 24, p.tint, 8)}${line(34, 64, 80, p.bg)}
        ${bar(22, 92, 214, 96, p.bg, 12)}${soft(38, 110, 120, .95)}${soft(38, 126, 90, .7)}${bar(38, 150, 70, 22, "#ffffff", 11)}
        ${bar(22, 200, 214, 56, p.deep, 12)}<circle cx="50" cy="228" r="15" fill="${p.bg}"/>
        <path d="M50 220 V234 M44 229 L50 235 L56 229" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        ${soft(76, 218, 110, .95)}${soft(76, 232, 76, .6)}
        <rect x="252" y="62" width="100" height="196" rx="18" fill="#111827"/><rect x="258" y="70" width="88" height="180" rx="13" fill="#ffffff"/>
        ${bar(266, 82, 72, 44, p.bg, 9)}${line(266, 138, 60)}${line(266, 154, 44)}
        ${bar(266, 172, 34, 30, p.tint, 7)}${bar(304, 172, 34, 30, p.tint, 7)}${bar(266, 220, 72, 18, p.deep, 9)}`;
    case "business1": /* cloud or your own server, compared */
      return `
        ${bar(22, 58, 158, 202, "#f8fafc", 12)}${bar(200, 58, 158, 202, p.tint, 12)}
        <path d="M78 116 a14 14 0 0 1 3 -27 a19 19 0 0 1 36 -4 a14 14 0 0 1 5 31 Z" fill="${p.bg}"/>
        ${[0, 1, 2].map((i) => `<rect x="252" y="${78 + i * 14}" width="54" height="11" rx="3" fill="${p.deep}"/><circle cx="298" cy="${83.5 + i * 14}" r="2.5" fill="#34d399"/>`).join("")}
        ${[0, 1, 2].map((i) => `${check(46, 150 + i * 32, p.bg)}${line(62, 146 + i * 32, [90, 70, 100][i])}${check(224, 150 + i * 32, p.deep)}${line(240, 146 + i * 32, [80, 100, 66][i])}`).join("")}
        <circle cx="190" cy="104" r="22" fill="${p.deep}" stroke="#ffffff" stroke-width="4"/>
        <text x="190" y="110" font-family="${FONT}" font-size="15" font-weight="800" fill="#ffffff" text-anchor="middle">VS</text>`;
    case "business2": /* being found online: search results and a map pin */
      return `
        ${bar(22, 54, 336, 34, "#f1f5f9", 17)}<circle cx="44" cy="70" r="7" fill="none" stroke="${p.deep}" stroke-width="3"/>
        <path d="M49 75 L55 81" stroke="${p.deep}" stroke-width="3" stroke-linecap="round"/>${line(66, 66, 140, "#94a3b8")}
        ${[104, 158, 212].map((y, i) => `${line(22, y, [170, 140, 156][i], i === 0 ? p.bg : p.deep)}${line(22, y + 16, [110, 130, 96][i])}${stars(22, y + 28, [5, 4, 4][i])}`).join("")}
        <ellipse cx="300" cy="244" rx="26" ry="7" fill="${p.deep}" fill-opacity=".2"/>
        <path d="M300 242 C282 214 270 200 270 180 a30 30 0 0 1 60 0 C330 200 318 214 300 242 Z" fill="${p.bg}"/>
        <circle cx="300" cy="180" r="11" fill="#ffffff"/>`;
    case "uiux1": /* a component library: buttons, toggle, input, card, slider */
      return `
        ${bar(22, 56, 128, 38, p.bg, 19)}${soft(54, 71, 64, .95)}
        <rect x="162" y="57" width="120" height="36" rx="18" fill="#ffffff" stroke="${p.bg}" stroke-width="3"/>${line(192, 71, 60, p.bg)}
        ${bar(298, 60, 60, 30, p.bg, 15)}<circle cx="343" cy="75" r="11" fill="#ffffff"/>
        <rect x="22" y="110" width="260" height="38" rx="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>${line(36, 125, 90)}${bar(132, 119, 3, 20, p.deep, 1.5)}
        ${bar(298, 112, 34, 34, p.deep, 8)}<path d="M306 129 l6 6 l12 -12" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${bar(22, 164, 170, 96, "#f8fafc", 12)}<circle cx="52" cy="194" r="16" fill="${p.tint}"/>${line(78, 186, 90, p.deep)}${line(78, 202, 64)}${bar(36, 226, 70, 20, p.bg, 10)}
        ${bar(210, 180, 148, 9, "#e2e8f0", 4.5)}${bar(210, 180, 92, 9, p.bg, 4.5)}<circle cx="302" cy="184.5" r="11" fill="#ffffff" stroke="${p.bg}" stroke-width="3"/>
        ${[p.bg, p.deep, "#fbbf24", p.tint].map((c, i) => `<circle cx="${222 + i * 32}" cy="234" r="11" fill="${c}" stroke="#e2e8f0"/>`).join("")}`;
    case "ecommerce1": /* checkout: cart items, a QR code and the pay button */
      return `
        ${[58, 106, 154].map((y, i) => `${bar(22, y, 40, 40, i === 1 ? p.bg : p.tint, 8)}${line(74, y + 8, 90)}${line(74, y + 24, 50, p.bg)}${bar(172, y + 12, 38, 16, p.deep, 8)}`).join("")}
        ${bar(22, 208, 188, 48, p.tint, 10)}${line(36, 228, 70, p.deep)}${bar(150, 222, 46, 20, p.deep, 10)}
        ${bar(226, 58, 132, 198, "#f8fafc", 12)}${line(240, 72, 70)}
        <g transform="translate(256 90)">
          ${[[0, 0], [54, 0], [0, 54]].map(([x, y]) => `<rect x="${x + 2}" y="${y + 2}" width="22" height="22" rx="4" fill="none" stroke="${p.deep}" stroke-width="5"/><rect x="${x + 9}" y="${y + 9}" width="8" height="8" rx="1.5" fill="${p.deep}"/>`).join("")}
          ${[[33, 2], [41, 10], [33, 18], [2, 33], [18, 41], [33, 33], [49, 33], [65, 41], [41, 49], [57, 57], [33, 65], [49, 69], [69, 65]].map(([x, y]) => `<rect x="${x}" y="${y}" width="9" height="9" rx="2" fill="${p.deep}"/>`).join("")}
        </g>
        ${bar(240, 214, 104, 30, p.bg, 15)}<text x="292" y="236" font-family="${FONT}" font-size="18" font-weight="800" fill="#ffffff" text-anchor="middle">₹ Pay</text>`;
    case "cms1": /* the admin editor: sidebar, toolbar, text and an image */
      return `
        ${bar(22, 52, 72, 212, p.deep, 10)}${[0, 1, 2, 3, 4].map((i) => soft(34, 70 + i * 26, [48, 40, 44, 36, 42][i], i === 1 ? .95 : .45)).join("")}
        ${bar(108, 54, 168, 24, "#f1f5f9", 6)}${line(118, 62, 110, p.deep)}${bar(288, 54, 70, 24, p.bg, 12)}${soft(302, 62, 42, .95)}
        ${[0, 1, 2, 3, 4, 5].map((i) => bar(108 + i * 26, 90, 18, 18, i === 2 ? p.tint : "#e2e8f0", 4)).join("")}
        ${line(108, 122, 250)}${line(108, 138, 220)}${line(108, 154, 236)}
        ${bar(108, 174, 120, 84, p.tint, 8)}<polyline points="118,248 150,212 172,232 190,218 218,248" fill="none" stroke="${p.bg}" stroke-width="4" stroke-linejoin="round"/><circle cx="204" cy="194" r="8" fill="${p.bg}"/>
        ${[180, 196, 212, 228, 244].map((y, i) => line(240, y, [118, 96, 110, 84, 104][i])).join("")}`;
    case "ai1": /* an automation: trigger, the AI step, two outcomes */
      return `
        <path d="M102 148 H150 M234 132 C258 132 258 92 282 92 M234 164 C258 164 258 204 282 204" fill="none" stroke="${p.deep}" stroke-width="3" stroke-dasharray="6 5"/>
        ${bar(22, 122, 80, 52, p.tint, 12)}<path d="M66 132 L52 152 H62 L58 166 L74 144 H64 Z" fill="${p.bg}"/>
        ${bar(150, 106, 84, 84, p.bg, 18)}<path d="M192 122 L198 140 L216 148 L198 156 L192 174 L186 156 L168 148 L186 140 Z" fill="#ffffff"/>
        ${bar(282, 66, 76, 52, "#f1f5f9", 12)}<rect x="304" y="80" width="32" height="24" rx="4" fill="none" stroke="${p.deep}" stroke-width="3"/><path d="M305 82 L320 94 L335 82" fill="none" stroke="${p.deep}" stroke-width="3" stroke-linejoin="round"/>
        ${bar(282, 178, 76, 52, "#f1f5f9", 12)}${check(320, 204, p.deep)}
        ${line(22, 246, 120, p.tint)}${line(150, 246, 84)}`;
    case "erp1": /* the stock list: items, quantities, status */
      return `
        ${bar(22, 54, 336, 28, p.deep, 8)}${soft(34, 64, 60, .85)}${soft(190, 64, 40, .85)}${soft(262, 64, 56, .85)}
        ${[0, 1, 2, 3, 4].map((i) => {
          const y = 90 + i * 34;
          return `${i % 2 ? "" : bar(22, y, 336, 32, "#f8fafc", 6)}${bar(30, y + 5, 22, 22, p.tint, 5)}${line(62, y + 11, [100, 80, 110, 70, 90][i])}${line(190, y + 11, [40, 30, 44, 26, 36][i], p.bg)}${bar(262, y + 7, 72, 18, ["#34d399", "#fbbf24", "#34d399", "#f87171", p.bg][i], 9)}`;
        }).join("")}`;
    default:
      return screen(motif, p);
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


/* ── the two small floating cards ───────────────────────────────────────
   Each scene has its own pair (cardA lower left, cardB top right). When
   the title names something with a clear picture — security, speed,
   growth, time, team, conversions, search, cost — that card takes one of
   the two slots, so the cover says a little more about the post. */
function card(x, y, w, h, p, body) {
  return `<g transform="translate(${x} ${y})">
    <rect x="4" y="8" width="${w}" height="${h}" rx="16" fill="${p.deep}" fill-opacity=".35"/>
    <rect width="${w}" height="${h}" rx="16" fill="#ffffff"/>${body}</g>`;
}
const pill = (x, y, w, fill) => `<rect x="${x}" y="${y}" width="${w}" height="9" rx="4.5" fill="${fill}"/>`;
const rupee = (x, y, size, fill) => `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="${fill}" text-anchor="middle">₹</text>`;

function ownA(motif, p) { /* 150 x 112 */
  return {
    erp: `${[0, 1, 2].map((i) => `<rect x="${18 + i * 14}" y="${62 - i * 16}" width="38" height="30" rx="5" fill="${i === 2 ? p.bg : p.tint}" stroke="${p.deep}" stroke-opacity=".25"/>`).join("")}${pill(92, 40, 42, p.bg)}${pill(92, 58, 34, "#cbd5e1")}${pill(92, 76, 40, "#cbd5e1")}`,
    ai: `<path d="M44 26 L52 48 L74 56 L52 64 L44 86 L36 64 L14 56 L36 48 Z" fill="${p.bg}"/><text x="90" y="68" font-family="${FONT}" font-size="30" font-weight="800" fill="${p.deep}">AI</text>`,
    ecommerce: `<path d="M18 44 L52 22 H98 V68 L64 90 Z" fill="${p.tint}" stroke="${p.bg}" stroke-width="3" stroke-linejoin="round"/><circle cx="86" cy="36" r="5" fill="${p.bg}"/>${rupee(60, 70, 30, p.deep)}${pill(108, 48, 28, p.bg)}`,
    uiux: `${[p.bg, p.deep, "#fbbf24", p.tint].map((c, i) => `<circle cx="${30 + i * 30}" cy="40" r="12" fill="${c}" stroke="#e2e8f0"/>`).join("")}${pill(18, 70, 90, "#cbd5e1")}${pill(18, 86, 60, p.bg)}`,
    cms: `<rect x="30" y="20" width="58" height="74" rx="6" fill="${p.tint}"/><rect x="22" y="28" width="58" height="74" rx="6" fill="#ffffff" stroke="${p.bg}" stroke-width="3"/>${pill(32, 44, 36, p.bg)}${pill(32, 60, 38, "#cbd5e1")}${pill(32, 76, 30, "#cbd5e1")}${pill(98, 46, 36, p.deep)}`,
    business: `${[0, 1, 2, 3].map((i) => `<ellipse cx="46" cy="${82 - i * 14}" rx="26" ry="9" fill="${i === 3 ? p.bg : p.tint}" stroke="${p.deep}" stroke-opacity=".3"/>`).join("")}${rupee(46, 46, 20, "#ffffff")}${pill(92, 46, 42, p.bg)}${pill(92, 64, 32, "#cbd5e1")}`,
    development: `<rect x="12" y="14" width="126" height="84" rx="10" fill="#0f172a"/><circle cx="26" cy="28" r="4" fill="#f87171"/><circle cx="40" cy="28" r="4" fill="#fbbf24"/><circle cx="54" cy="28" r="4" fill="#34d399"/><text x="24" y="60" font-family="${FONT}" font-size="16" font-weight="700" fill="#34d399">$</text>${pill(42, 50, 70, "#94a3b8")}${pill(24, 72, 50, p.tint)}`,
    mobile: `<path d="M44 30 C30 30 28 44 28 56 V68 L22 76 H66 L60 68 V56 C60 44 58 30 44 30 Z" fill="${p.bg}"/><circle cx="44" cy="82" r="6" fill="${p.bg}"/><circle cx="60" cy="32" r="8" fill="#f43f5e"/>${pill(86, 44, 46, p.deep)}${pill(86, 62, 36, "#cbd5e1")}`,
  }[motif];
}

function ownB(motif, p) { /* 168 x 98 */
  const star = (x, f) => `<path d="M${x} 30 l5 10 l11 1.5 l-8 7.5 l2 11 l-10 -5.5 l-10 5.5 l2 -11 l-8 -7.5 l11 -1.5 Z" fill="${f}"/>`;
  return {
    erp: `<text x="20" y="36" font-family="${FONT}" font-size="16" font-weight="800" fill="${p.deep}">GST</text>${pill(70, 26, 76, p.tint)}${pill(20, 52, 128, "#cbd5e1")}${pill(20, 70, 90, "#cbd5e1")}${rupee(140, 82, 20, p.bg)}`,
    ai: `<rect x="16" y="22" width="120" height="44" rx="14" fill="${p.tint}"/><path d="M30 66 L24 80 L44 66 Z" fill="${p.tint}"/>${[0, 1, 2].map((i) => `<circle cx="${52 + i * 22}" cy="44" r="6" fill="${p.bg}" fill-opacity="${1 - i * .25}"/>`).join("")}`,
    ecommerce: `<rect x="18" y="34" width="64" height="38" rx="6" fill="${p.bg}"/><path d="M82 46 H110 L124 60 V72 H82 Z" fill="${p.deep}"/><circle cx="40" cy="76" r="9" fill="#111827"/><circle cx="104" cy="76" r="9" fill="#111827"/>${pill(130, 30, 22, "#cbd5e1")}`,
    uiux: `<path d="M40 70 C40 40 120 70 120 36" fill="none" stroke="${p.bg}" stroke-width="4"/><rect x="34" y="64" width="12" height="12" fill="#ffffff" stroke="${p.deep}" stroke-width="3"/><rect x="114" y="30" width="12" height="12" fill="#ffffff" stroke="${p.deep}" stroke-width="3"/><path d="M78 20 L92 46 L78 54 L64 46 Z" fill="${p.deep}"/>`,
    cms: `${[0, 1].map((i) => `<rect x="20" y="${22 + i * 32}" width="40" height="22" rx="11" fill="${i === 0 ? p.bg : "#e2e8f0"}"/><circle cx="${i === 0 ? 49 : 31}" cy="${33 + i * 32}" r="8" fill="#ffffff"/>${pill(72, 29 + i * 32, i === 0 ? 72 : 56, "#cbd5e1")}`).join("")}`,
    business: `<path d="M24 70 L52 46 L76 58 L120 26" fill="none" stroke="${p.bg}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M104 24 L122 24 L122 42" fill="none" stroke="${p.bg}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>${pill(24, 80, 70, "#cbd5e1")}`,
    development: `<circle cx="42" cy="49" r="20" fill="none" stroke="${p.bg}" stroke-width="8" stroke-dasharray="8 5"/><circle cx="42" cy="49" r="8" fill="${p.deep}"/><circle cx="98" cy="28" r="7" fill="${p.bg}"/><circle cx="98" cy="72" r="7" fill="${p.bg}"/><circle cx="136" cy="50" r="7" fill="${p.deep}"/><path d="M98 35 V65 M98 50 Q118 50 130 50" fill="none" stroke="${p.bg}" stroke-width="4"/>`,
    mobile: `${[0, 1, 2, 3, 4].map((i) => star(30 + i * 27, i < 4 ? "#fbbf24" : "#e2e8f0")).join("")}${pill(20, 74, 96, "#cbd5e1")}`,
  }[motif];
}

/* topic cards: an icon at the left, two text lines beside it */
const TOPIC_CARDS = [
  ["shield", /secur|safe|protect|privacy|backup/],
  ["gauge", /speed|fast|faster|performance|load time/],
  ["rocket", /scal|growth|grow|boost|launch|transform/],
  ["team", /team|end-to-end|hire|agency|partner/],
  ["funnel", /conversion|retention|leads?\b|sales/],
  ["search", /\bseo\b|google|search|presence|rank/],
  ["coins", /cost|price|pricing|budget|pays? off|\broi\b/],
  ["calendar", /trend|future|timeline|how long|deadline/],
];
function topicCard(name, w, h, p) {
  const cx = 42;
  const cy = h / 2;
  const icon = {
    shield: `<path d="M${cx} ${cy - 26} L${cx + 21} ${cy - 17} V${cy + 1} C${cx + 21} ${cy + 15} ${cx + 11} ${cy + 23} ${cx} ${cy + 28} C${cx - 11} ${cy + 23} ${cx - 21} ${cy + 15} ${cx - 21} ${cy + 1} V${cy - 17} Z" fill="${p.bg}"/><path d="M${cx - 8} ${cy} l6 6 l11 -12" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    gauge: `<path d="M${cx - 24} ${cy + 10} A24 24 0 0 1 ${cx + 24} ${cy + 10}" fill="none" stroke="#e2e8f0" stroke-width="9" stroke-linecap="round"/><path d="M${cx - 24} ${cy + 10} A24 24 0 0 1 ${cx + 17} ${cy - 7}" fill="none" stroke="${p.bg}" stroke-width="9" stroke-linecap="round"/><path d="M${cx} ${cy + 10} L${cx + 13} ${cy - 6}" stroke="${p.deep}" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy + 10}" r="5" fill="${p.deep}"/>`,
    rocket: `<g transform="translate(${cx} ${cy}) rotate(40)"><path d="M0 -28 C12 -16 12 8 8 16 H-8 C-12 8 -12 -16 0 -28 Z" fill="${p.bg}"/><circle cy="-6" r="5" fill="#ffffff"/><path d="M-8 4 L-17 18 L-8 16 Z M8 4 L17 18 L8 16 Z" fill="${p.deep}"/><path d="M-5 17 L0 30 L5 17 Z" fill="#fbbf24"/></g>`,
    team: [[-17, p.tint], [17, p.tint], [0, p.bg]].map(([dx, f]) => `<circle cx="${cx + dx}" cy="${cy - 9}" r="${dx ? 8 : 10}" fill="${f}" stroke="#ffffff" stroke-width="2"/><path d="M${cx + dx - (dx ? 13 : 16)} ${cy + 20} a${dx ? 13 : 16} ${dx ? 12 : 14} 0 0 1 ${dx ? 26 : 32} 0 Z" fill="${f}" stroke="#ffffff" stroke-width="2"/>`).join(""),
    funnel: `<path d="M${cx - 24} ${cy - 20} H${cx + 24} L${cx + 6} ${cy + 3} V${cy + 22} L${cx - 6} ${cy + 15} V${cy + 3} Z" fill="${p.bg}"/><circle cx="${cx - 10}" cy="${cy - 27}" r="3" fill="${p.deep}"/><circle cx="${cx + 2}" cy="${cy - 29}" r="3" fill="${p.deep}"/><circle cx="${cx + 13}" cy="${cy - 26}" r="3" fill="${p.deep}"/>`,
    search: `<circle cx="${cx - 4}" cy="${cy - 4}" r="15" fill="${p.tint}" stroke="${p.bg}" stroke-width="6"/><path d="M${cx + 8} ${cy + 8} L${cx + 20} ${cy + 20}" stroke="${p.deep}" stroke-width="7" stroke-linecap="round"/>`,
    coins: `${[0, 1, 2, 3].map((i) => `<ellipse cx="${cx}" cy="${cy + 18 - i * 11}" rx="22" ry="8" fill="${i === 3 ? p.bg : p.tint}" stroke="${p.deep}" stroke-opacity=".3"/>`).join("")}${rupee(cx, cy - 10, 16, "#ffffff")}`,
    calendar: `<rect x="${cx - 22}" y="${cy - 20}" width="44" height="42" rx="7" fill="#ffffff" stroke="${p.bg}" stroke-width="3"/><path d="M${cx - 22} ${cy - 13} a7 7 0 0 1 7 -7 H${cx + 15} a7 7 0 0 1 7 7 V${cy - 6} H${cx - 22} Z" fill="${p.bg}"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${cx - 15 + (i % 3) * 11}" y="${cy + (i < 3 ? 0 : 10)}" width="7" height="6" rx="1.5" fill="${i === 4 ? p.deep : "#cbd5e1"}"/>`).join("")}<path d="M${cx - 10} ${cy - 25} V${cy - 15} M${cx + 10} ${cy - 25} V${cy - 15}" stroke="${p.deep}" stroke-width="3" stroke-linecap="round"/>`,
  }[name];
  const pw = Math.min(w - 100, 60);
  return `${icon}${pill(80, cy - 14, pw, p.bg)}${pill(80, cy + 2, pw - 16, "#cbd5e1")}`;
}
function topicFor(title, tags) {
  for (const text of [title, tags.join(" ")]) {
    const hit = TOPIC_CARDS.find(([, re]) => re.test(text.toLowerCase()));
    if (hit) return hit[0];
  }
  return null;
}

function cards(motif, p, v, topic) {
  const a = topic && v.topicSlot === 0 ? topicCard(topic, 150, 112, p) : ownA(motif, p);
  const b = topic && v.topicSlot === 1 ? topicCard(topic, 168, 98, p) : ownB(motif, p);
  return card(v.right ? 626 : 596, 352, 150, 112, p, a) + card(944, 64, 168, 98, p, b);
}

/* ── a person beside the screen: holding a tablet, or pointing at it ── */
const SKINS = ["#f2c094", "#d9a066", "#9a6640"];
function person(p, v) {
  const skin = SKINS[v.skin];
  const shirt = v.shirt ? "#ffffff" : p.tint;
  const hair = [
    `<path d="M29 42 C25 12 48 4 64 7 C83 10 92 26 87 46 C82 32 73 24 60 24 C47 24 36 31 29 42 Z" fill="#1f2937"/>`,
    `<circle cx="58" cy="6" r="13" fill="#1f2937"/><path d="M29 42 C27 14 46 10 58 10 C74 10 90 18 87 44 C80 30 70 26 58 26 C46 26 36 30 29 42 Z" fill="#1f2937"/>`,
    `<path d="M27 72 C20 40 26 8 58 8 C90 8 96 40 89 72 C84 56 86 30 74 26 C64 22 52 22 42 26 C30 32 32 56 27 72 Z" fill="#3b2314"/>`,
  ][v.hair];
  const arms = v.pose
    ? `<path d="M28 98 Q6 82 -10 60" fill="none" stroke="${shirt}" stroke-width="20" stroke-linecap="round"/>
      <path d="M90 98 Q104 132 96 166" fill="none" stroke="${shirt}" stroke-width="20" stroke-linecap="round"/>
      <g transform="rotate(10 98 168)"><rect x="88" y="136" width="18" height="62" rx="4" fill="${p.deep}"/><rect x="92" y="142" width="10" height="50" rx="2" fill="${p.bg}"/></g>
      <circle cx="-12" cy="57" r="9" fill="${skin}"/><circle cx="96" cy="168" r="9" fill="${skin}"/>`
    : `<path d="M26 98 Q8 132 22 162" fill="none" stroke="${shirt}" stroke-width="20" stroke-linecap="round"/>
      <path d="M90 98 Q106 136 70 162" fill="none" stroke="${shirt}" stroke-width="20" stroke-linecap="round"/>
      <g transform="rotate(-6 46 152)">
        <rect x="16" y="118" width="62" height="78" rx="9" fill="#111827"/>
        <rect x="22" y="124" width="50" height="66" rx="5" fill="${p.bg}"/>
        <rect x="28" y="132" width="30" height="7" rx="3.5" fill="#ffffff" fill-opacity=".9"/>
        <rect x="28" y="146" width="38" height="7" rx="3.5" fill="#ffffff" fill-opacity=".6"/>
      </g>
      <circle cx="22" cy="164" r="9" fill="${skin}"/><circle cx="70" cy="164" r="9" fill="${skin}"/>`;
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
      ${arms}
    </g>`;
}

/* ── the main screen (a phone for app posts' first variant) ─────────── */
const isPhone = (motif, n) => motif === "mobile" && n === 0;
function mainScreen(motif, p, n) {
  if (isPhone(motif, n)) {
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
      ${n === 0 ? screen(motif, p) : screenAlt(motif, n, p)}
    </g>`;
}

/* chips sit on the main screen's top edge, like labels stuck to it */
function chips(labels, phone, p) {
  let x = phone ? 650 : 660;
  const y = phone ? 62 : 84;
  return labels.map((label) => {
    const w = Math.round(measure(label, 17, 700) + 34);
    const out = `<g transform="translate(${x} ${y})">
        <rect x="3" y="5" width="${w}" height="38" rx="19" fill="${p.deep}" fill-opacity=".35"/>
        <rect width="${w}" height="38" rx="19" fill="${p.deep}"/>
        <text x="${w / 2}" y="25" font-family="${FONT}" font-size="17" font-weight="700" fill="#ffffff" text-anchor="middle">${esc(label)}</text>
      </g>`;
    x += w + 10;
    return out;
  }).join("");
}

function scene(motif, p, v, labels, topic) {
  const sparks = `<path d="M590 76 l10 -18 M610 84 l18 -10 M584 96 l-16 -4" stroke="#ffffff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/>`;
  return sparks + mainScreen(motif, p, v.screen) + cards(motif, p, v, topic) + chips(labels, isPhone(motif, v.screen), p) + person(p, v);
}

/* background texture in the corner under the title column */
const PATTERNS = [
  `<circle cx="2" cy="2" r="2" fill="#ffffff" fill-opacity=".18"/>`,
  `<path d="M24 0 H0 V24" fill="none" stroke="#ffffff" stroke-opacity=".13" stroke-width="1.5"/>`,
  `<path d="M0 24 L24 0" stroke="#ffffff" stroke-opacity=".14" stroke-width="3"/>`,
  `<path d="M12 7 V17 M7 12 H17" stroke="#ffffff" stroke-opacity=".2" stroke-width="2.5" stroke-linecap="round"/>`,
];

/* the label above the title: the blog filter the post sits under */
const KICKER = { business: "Business", "Artificial Intelligence": "AI", "E-Commerce": "E-Commerce", "UI/UX": "UI/UX", CMS: "CMS", Development: "Development", Tech: "Tech" };

export async function renderCover({ title, category, tags = [] }) {
  const motif = motifFor({ title, tags, category });
  const h = hash(title);
  const v = {
    right: h & 1, alt: (h >>> 1) & 1, hair: (h >>> 2) % 3, skin: (h >>> 4) % 3, shirt: (h >>> 6) & 1,
    pose: (h >>> 7) & 1, pattern: (h >>> 8) % 4, rings: (h >>> 10) & 1, topicSlot: (h >>> 11) & 1,
    screen: screenFor(motif, title, tags, h >>> 12),
  };
  const p = v.alt ? ALT_PALETTES[motif] : PALETTES[motif];
  const kickerText = category === "Tech" && motif === "mobile" ? "Mobile Apps" : KICKER[category] || category || "";
  const labels = chipsFor(title, tags).filter((l) => l.toLowerCase() !== kickerText.toLowerCase());
  const topic = topicFor(title, tags);
  const kicker = kickerText.toUpperCase();

  /* the scene is drawn for the right half; "right" layouts slide it to the
     left half and put the title (and logo) on the right instead */
  const SHIFT = -570;
  const tx = v.right ? 660 : 56;

  /* title kept inside 500px so it never runs under the illustration; the
     largest size that fits in four lines wins */
  const MAX_W = v.right ? 470 : 500;
  let size = 40;
  let lines = wrapPx(title, MAX_W, 40).slice(0, 5);
  for (const s of [54, 48, 44, 40]) {
    const l = wrapPx(title, MAX_W, s);
    if (l.length <= 4) { size = s; lines = l; break; }
  }
  const lead = Math.round(size * 1.2);
  const blockH = lines.length * lead;
  const top = Math.max(186, 360 - blockH / 2) + size * 0.82;
  const textW = (s) => Math.round(measure(s, size, 800));
  const kickerY = top - size * 0.86 - 46;
  const kickerW = Math.round(measure(kicker, 15, 700, 1.6) + 36);

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

  const blob = (cx, cy, r, o) => v.rings
    ? `<circle cx="${cx}" cy="${cy}" r="${r - 20}" fill="none" stroke="#ffffff" stroke-opacity="${o * 1.6}" stroke-width="34"/>`
    : `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" fill-opacity="${o}"/>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <pattern id="tex" width="24" height="24" patternUnits="userSpaceOnUse">${PATTERNS[v.pattern]}</pattern>
    <linearGradient id="sheen" x1="${v.right ? 1 : 0}" y1="0" x2="${v.right ? 0 : 1}" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".10"/><stop offset="1" stop-color="#000000" stop-opacity=".12"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${p.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#sheen)"/>
  ${blob(v.right ? 120 : 1080, 40, 230, 0.07)}
  ${blob(v.right ? 540 : 660, 620, 160, 0.05)}
  <rect x="${v.right ? W - 260 : 0}" y="470" width="260" height="160" fill="url(#tex)"/>

  <g transform="translate(${v.right ? SHIFT : 0} 0)">${scene(motif, p, v, labels, topic)}</g>

  ${logo}

  ${kicker ? `<rect x="${tx - 8}" y="${kickerY}" width="${kickerW}" height="32" rx="16" fill="#ffffff" fill-opacity=".16"/>
  <text x="${tx - 8 + kickerW / 2}" y="${kickerY + 21}" font-family="${FONT}" font-size="15" font-weight="700" letter-spacing="1.6" fill="#ffffff" text-anchor="middle">${esc(kicker)}</text>` : ""}

  ${lines.map((l, i) => {
    const y = top + i * lead;
    const t = `<text x="${i === 0 ? tx + 16 : tx}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="${i === 0 ? p.deep : "#ffffff"}">${esc(l)}</text>`;
    const box = `x="${tx - 8}" y="${y - size * 0.86}" width="${Math.min(textW(l) + 40, v.right ? W - tx - 16 : 548)}" height="${size * 1.12}" rx="12"`;
    return i === 0 ? `<rect ${box} fill="${p.tint}"/><rect ${box} fill="none" stroke="#ffffff" stroke-width="3"/>${t}` : t;
  }).join("\n  ")}

  <text x="${tx}" y="${H - 34}" font-family="${FONT}" font-size="20" font-weight="600" fill="#ffffff" fill-opacity=".85">codelixitsolutions.com/blog</text>
</svg>`;
  const image = await sharp(Buffer.from(outlineText(svg))).webp({ quality: 90 }).toBuffer();
  return { cover: image, banner: image, motif, screen: v.screen, topic, layout: v.right ? "title right" : "title left", chips: labels };
}
