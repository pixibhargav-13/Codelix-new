/* The blog cover: 1200x630 in the site's theme. Shared by
   publish-blog-post.mjs (new posts) and blog-static-covers.mjs (the
   built-in posts in src/data/blogData.js). category is the blog filter
   name stored in tags[1] ("business", "Development", "Artificial
   Intelligence", "E-Commerce", "CMS", "UI/UX", "Tech"). */
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export async function renderCover({ title, category, tags = [] }) {
  /* ── cover: 1200x630 in the site's theme — dark canvas, blue accent,
     faint grid, the title on the left and a line illustration of the
     post's subject on the right ─────────────────────────────────────── */
  const ACCENT = "#7c9bff";
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* each motif is drawn inside a 420x420 box at the origin */
  const stroke = `fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const faint = `fill="none" stroke="${ACCENT}" stroke-opacity=".35" stroke-width="1.5"`;
  const dot = (x, y, r = 5, o = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${ACCENT}" fill-opacity="${o}"/>`;
  const MOTIFS = {
    erp: () => `
      <rect x="20" y="40" width="380" height="300" rx="18" ${stroke}/>
      <line x1="20" y1="84" x2="400" y2="84" ${faint}/>
      ${dot(46, 62, 5, .6)}${dot(66, 62, 5, .4)}${dot(86, 62, 5, .25)}
      <rect x="44" y="108" width="100" height="70" rx="10" ${faint}/>
      <rect x="160" y="108" width="100" height="70" rx="10" ${faint}/>
      <rect x="276" y="108" width="100" height="70" rx="10" ${stroke}/>
      <path d="M60 300 V250 M100 300 V220 M140 300 V265 M180 300 V200" fill="none" stroke="${ACCENT}" stroke-width="14" stroke-linecap="round" stroke-opacity=".8"/>
      <path d="M220 290 L270 250 L310 268 L370 208" ${stroke}/>${dot(370, 208)}
      <line x1="44" y1="312" x2="380" y2="312" ${faint}/>`,
    mobile: () => `
      <rect x="125" y="20" width="170" height="340" rx="30" ${stroke}/>
      <line x1="185" y1="44" x2="235" y2="44" ${faint}/>
      <rect x="148" y="70" width="124" height="72" rx="12" ${faint}/>
      <rect x="148" y="156" width="58" height="58" rx="12" ${stroke}/>
      <rect x="214" y="156" width="58" height="58" rx="12" ${faint}/>
      <line x1="148" y1="236" x2="272" y2="236" ${faint}/><line x1="148" y1="256" x2="240" y2="256" ${faint}/>
      <rect x="148" y="290" width="124" height="38" rx="19" fill="${ACCENT}" fill-opacity=".18" stroke="${ACCENT}" stroke-width="2"/>
      <rect x="40" y="120" width="70" height="120" rx="16" ${faint}/><rect x="310" y="90" width="80" height="140" rx="16" ${faint}/>`,
    ai: () => {
      const n = [[70, 90], [60, 220], [90, 330], [210, 60], [200, 190], [220, 320], [340, 110], [350, 250], [300, 360]];
      const e = [[0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [3, 4], [3, 6], [4, 6], [4, 7], [5, 7], [5, 8], [7, 8], [1, 0], [6, 7]];
      return e.map(([a, b]) => `<line x1="${n[a][0]}" y1="${n[a][1]}" x2="${n[b][0]}" y2="${n[b][1]}" ${faint}/>`).join("") +
        n.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 4 ? 26 : 13}" fill="#08080c" stroke="${ACCENT}" stroke-width="2"/>`).join("") +
        dot(200, 190, 9);
    },
    ecommerce: () => `
      <path d="M40 90 H90 L130 280 H330 L370 140 H110" ${stroke}/>
      <circle cx="160" cy="325" r="18" ${stroke}/><circle cx="300" cy="325" r="18" ${stroke}/>
      <rect x="150" y="160" width="60" height="70" rx="8" ${faint}/><rect x="226" y="160" width="60" height="70" rx="8" ${faint}/>
      <rect x="240" y="30" width="150" height="80" rx="14" fill="${ACCENT}" fill-opacity=".12" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="262" y1="60" x2="368" y2="60" ${stroke}/><line x1="262" y1="82" x2="330" y2="82" ${faint}/>`,
    uiux: () => `
      <rect x="20" y="30" width="380" height="330" rx="18" ${stroke}/>
      <rect x="44" y="56" width="332" height="40" rx="8" ${faint}/>
      <rect x="44" y="114" width="200" height="130" rx="12" ${faint}/>
      <path d="M60 230 L120 170 L160 205 L195 175 L230 230" ${faint}/>
      <rect x="260" y="114" width="116" height="58" rx="10" ${stroke}/>
      <rect x="260" y="186" width="116" height="58" rx="10" ${faint}/>
      <line x1="44" y1="276" x2="376" y2="276" ${faint}/><line x1="44" y1="300" x2="300" y2="300" ${faint}/>
      <path d="M330 300 L352 352 L362 330 L384 322 Z" fill="${ACCENT}" fill-opacity=".9"/>`,
    cms: () => `
      <rect x="90" y="110" width="250" height="250" rx="16" ${faint}/>
      <rect x="65" y="80" width="250" height="250" rx="16" fill="#08080c" stroke="${ACCENT}" stroke-opacity=".35" stroke-width="1.5"/>
      <rect x="40" y="50" width="250" height="250" rx="16" fill="#08080c" stroke="${ACCENT}" stroke-width="2"/>
      <line x1="68" y1="90" x2="200" y2="90" ${stroke}/><line x1="68" y1="124" x2="262" y2="124" ${faint}/>
      <line x1="68" y1="148" x2="262" y2="148" ${faint}/><line x1="68" y1="172" x2="220" y2="172" ${faint}/>
      <rect x="68" y="200" width="194" height="70" rx="10" ${faint}/>
      <circle cx="350" cy="70" r="34" ${stroke}/><path d="M336 70 L346 80 L366 60" ${stroke}/>`,
    business: () => `
      <line x1="40" y1="340" x2="390" y2="340" ${faint}/><line x1="40" y1="40" x2="40" y2="340" ${faint}/>
      <rect x="70" y="250" width="44" height="90" rx="6" ${faint}/><rect x="140" y="210" width="44" height="130" rx="6" ${faint}/>
      <rect x="210" y="170" width="44" height="170" rx="6" ${faint}/><rect x="280" y="110" width="44" height="230" rx="6" fill="${ACCENT}" fill-opacity=".14" stroke="${ACCENT}" stroke-width="2"/>
      <path d="M70 230 L160 180 L230 200 L370 70" ${stroke}/><path d="M340 70 H370 V100" ${stroke}/>
      ${dot(160, 180)}${dot(230, 200)}`,
    development: () => `
      <rect x="20" y="40" width="380" height="300" rx="18" ${stroke}/>
      <line x1="20" y1="84" x2="400" y2="84" ${faint}/>
      ${dot(46, 62, 5, .6)}${dot(66, 62, 5, .4)}${dot(86, 62, 5, .25)}
      <path d="M90 160 L60 190 L90 220" ${stroke}/><path d="M330 160 L360 190 L330 220" ${stroke}/>
      <line x1="230" y1="140" x2="190" y2="240" ${stroke}/>
      <line x1="60" y1="270" x2="200" y2="270" ${faint}/><line x1="60" y1="296" x2="300" y2="296" ${faint}/>
      <line x1="216" y1="270" x2="320" y2="270" stroke="${ACCENT}" stroke-width="2" stroke-opacity=".7"/>`,
  };
  /* the title decides first, then the tags, then the category */
  const MOTIF_WORDS = [
    ["erp", /\berp\b|tally|inventory|\bcrm\b|manufactur/],
    /* "app" alone means mobile, but "web app" does not */
    ["mobile", /(?<!web )\bapps?\b|mobile|android|\bios\b|flutter|react native/],
    ["ai", /\bai\b|chatbot|agent|automation|machine learning|\bllm\b|gpt/],
    ["ecommerce", /e-?commerce|shop|store|checkout|payment|cart/],
    ["uiux", /ui\/ux|\bux\b|\bui\b|design/],
    ["cms", /wordpress|\bcms\b|content/],
  ];
  const motifFor = () => {
    for (const text of [title, tags.join(" ")]) {
      const hit = MOTIF_WORDS.find(([, re]) => re.test(text.toLowerCase()));
      if (hit) return hit[0];
    }
    return { business: "business", "Artificial Intelligence": "ai", "E-Commerce": "ecommerce", "UI/UX": "uiux", CMS: "cms" }[category] || "development";
  };
  const motif = motifFor();

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
  let size = 56;
  let lines = wrap(title, 22);
  if (lines.length > 4) { size = 46; lines = wrap(title, 27); }
  if (lines.length > 5) { size = 40; lines = wrap(title, 31).slice(0, 5); }
  const lead = Math.round(size * 1.18);
  const bottom = 486;
  const top = bottom - (lines.length - 1) * lead;
  const eyebrow = (category === "business" ? "Business" : category).toUpperCase();

  const logoBuf = await sharp(path.join(ROOT, "src/MyComponents/Images/codelix-logo.webp")).resize({ height: 92 }).png().toBuffer();
  const logoMeta = await sharp(logoBuf).metadata();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <radialGradient id="glow" cx="78%" cy="45%" r="45%">
        <stop offset="0%" stop-color="#6f9dff" stop-opacity=".30"/>
        <stop offset="70%" stop-color="#6f9dff" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M48 0 H0 V48" fill="none" stroke="#f2f0ec" stroke-opacity=".04"/>
      </pattern>
      <linearGradient id="fade" x1="0" x2="1">
        <stop offset="0" stop-color="#08080c" stop-opacity="1"/>
        <stop offset=".45" stop-color="#08080c" stop-opacity=".6"/>
        <stop offset="1" stop-color="#08080c" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#08080c"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <g transform="translate(720 110)">${MOTIFS[motif]()}</g>
    <rect width="700" height="630" fill="url(#fade)"/>
    <rect width="1200" height="6" fill="${ACCENT}"/>
    <image href="data:image/png;base64,${logoBuf.toString("base64")}" x="80" y="70" width="${logoMeta.width / 2}" height="46"/>
    <text x="80" y="${top - lead - 4}" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="600" letter-spacing="4" fill="${ACCENT}">${esc(eyebrow)}</text>
    ${lines.map((l, i) => `<text x="80" y="${top + i * lead}" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="700" fill="#f2f0ec">${esc(l)}</text>`).join("\n  ")}
    <text x="80" y="566" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#f2f0ec" fill-opacity=".55">codelixitsolutions.com/blog</text>
  </svg>`;

  /* the banner shown on the site itself (article hero, blog cards): the
     page already prints the title right next to it, so the banner carries
     the illustration, larger and centred, instead of the title again.
     Nothing sits near the edges: the blog cards crop it to a different
     shape than the article hero (object-fit: cover), and a logo or label
     in a corner gets cut in half. The centred illustration survives any
     crop down to a square. */
  const banner = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="720">
    <defs>
      <radialGradient id="bglow" cx="50%" cy="50%" r="48%">
        <stop offset="0%" stop-color="#6f9dff" stop-opacity=".34"/>
        <stop offset="65%" stop-color="#6f9dff" stop-opacity="0"/>
      </radialGradient>
      <pattern id="bgrid" width="56" height="56" patternUnits="userSpaceOnUse">
        <path d="M56 0 H0 V56" fill="none" stroke="#f2f0ec" stroke-opacity=".045"/>
      </pattern>
      <radialGradient id="bvignette" cx="50%" cy="50%" r="75%">
        <stop offset="55%" stop-color="#08080c" stop-opacity="0"/>
        <stop offset="100%" stop-color="#08080c" stop-opacity=".9"/>
      </radialGradient>
    </defs>
    <rect width="1600" height="720" fill="#08080c"/>
    <rect width="1600" height="720" fill="url(#bgrid)"/>
    <rect width="1600" height="720" fill="url(#bglow)"/>
    <circle cx="800" cy="360" r="300" fill="none" stroke="${ACCENT}" stroke-opacity=".08"/>
    <circle cx="800" cy="360" r="220" fill="none" stroke="${ACCENT}" stroke-opacity=".06" stroke-dasharray="4 10"/>
    <g transform="translate(537 97) scale(1.25)">${MOTIFS[motif]()}</g>
    <rect width="1600" height="720" fill="url(#bvignette)"/>
    <rect width="1600" height="5" fill="${ACCENT}"/>
  </svg>`;

  return {
    cover: await sharp(Buffer.from(svg)).webp({ quality: 88 }).toBuffer(),
    banner: await sharp(Buffer.from(banner)).webp({ quality: 86 }).toBuffer(),
    motif,
  };
}
