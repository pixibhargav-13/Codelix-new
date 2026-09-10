/* Generates the 1200x630 share cards.

   Run from the project root: node <this file>
   Output: public/og/<name>.png

   Deliberately a one-off script rather than a build step — these change when
   a product or a tagline changes, which is rarely, and rasterising four
   images on every deploy to get the same bytes back is waste. */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const IMG = path.join(ROOT, "src/MyComponents/Images");
const OUT = path.join(ROOT, "public/og");

const W = 1200;
const H = 630;

/* Escape for XML text nodes — an ampersand or an angle bracket in a tagline
   would otherwise produce an SVG that fails to parse. */
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* librsvg has no text layout engine to speak of, so every line break is
   decided here rather than by wrapping. */
const CARDS = [
  {
    name: "careers",
    accent: "#7c9bff",
    logo: "codelix-logo.png",
    logoHeight: 62,
    eyebrow: "Careers at Codelix",
    lines: ["Build things people", "actually run."],
    sub: "Open roles for developers, designers and freshers — Ahmedabad.",
  },
  {
    name: "audytee",
    accent: "#8b6cf0",
    logo: "Audity.svg",
    logoHeight: 68,
    chip: true,
    eyebrow: "Practice Management Software",
    lines: ["Your CA firm.", "Smarter. Faster. Done."],
    sub: "A Codelix product",
  },
  {
    name: "4bitx",
    accent: "#e6a23c",
    logo: "4bitX.svg",
    logoHeight: 88,
    chip: true,
    eyebrow: "Custom ERP for Every Industry",
    lines: ["Your factory.", "Fully connected."],
    sub: "A Codelix product",
  },
  {
    name: "aanganone",
    accent: "#4ecb9c",
    logo: "Aanganone.svg",
    logoHeight: 74,
    chip: true,
    eyebrow: "Society & Community Management",
    lines: ["Smart living for", "modern societies."],
    sub: "A Codelix product",
  },
];

/* The logos are SVG (and one PNG); rasterise each one first and embed the
   result. Nested SVG references are the part of librsvg least worth
   trusting, and a PNG at a known height also lets the layout place it. */
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
  const PAD = 88;
  const titleSize = 66;
  const titleLead = 82;
  /* the block is laid out from the bottom up so cards with different logo
     heights still share one baseline for the headline */
  const subY = H - PAD - 4;
  const titleBottom = subY - 62;
  const titleTop = titleBottom - (card.lines.length - 1) * titleLead;

  /* Two of the product logos are drawn on a white plate inside their own
     SVG. Rather than fight that, every product logo gets the same white
     chip, so the ones that came with a background read as deliberate and
     the transparent one matches them. The Codelix mark is drawn for dark
     and gets none. */
  const CHIP_PAD = 16;
  const chip = card.chip
    ? `<rect x="${PAD}" y="82" width="${logo.width + CHIP_PAD * 2}" height="${logo.height + CHIP_PAD * 2}" rx="16" fill="#FFFFFF"/>`
    : "";
  const logoX = PAD + (card.chip ? CHIP_PAD : 0);
  const logoY = 82 + (card.chip ? CHIP_PAD : 0);
  const blockH = logo.height + (card.chip ? CHIP_PAD * 2 : 0);

  const titleTspans = card.lines
    .map(
      (l, i) =>
        `<text x="${PAD}" y="${titleTop + i * titleLead}" class="t">${esc(l)}</text>`
    )
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
      .t   { fill:#F2F0EC; font-family:'Segoe UI',Arial,Helvetica,sans-serif; font-size:${titleSize}px; font-weight:700; letter-spacing:-1.5px; }
      .eb  { fill:${card.accent}; font-family:'Segoe UI',Arial,Helvetica,sans-serif; font-size:22px; font-weight:600; letter-spacing:2.6px; }
      .sub { fill:#8A8F9C; font-family:'Segoe UI',Arial,Helvetica,sans-serif; font-size:25px; font-weight:400; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="6" fill="${card.accent}"/>

${chip}
  <image href="${logo.uri}" x="${logoX}" y="${logoY}" width="${logo.width}" height="${logo.height}"/>
  <text x="${PAD}" y="${82 + blockH + 62}" class="eb">${esc(card.eyebrow.toUpperCase())}</text>
  ${titleTspans}
  <text x="${PAD}" y="${subY}" class="sub">${esc(card.sub)}</text>
</svg>`;
}

fs.mkdirSync(OUT, { recursive: true });

for (const card of CARDS) {
  const logo = await logoDataUri(card.logo, card.logoHeight);
  const svg = svgFor(card, logo);
  const file = path.join(OUT, `${card.name}.png`);
  await sharp(Buffer.from(svg)).png({ quality: 90, compressionLevel: 9 }).toFile(file);
  const { size } = fs.statSync(file);
  const meta = await sharp(file).metadata();
  console.log(
    `  ${card.name.padEnd(11)} ${meta.width}x${meta.height}  ${(size / 1024).toFixed(0)} KB   logo ${logo.width}x${logo.height}`
  );
}
console.log("\ndone ->", path.relative(ROOT, OUT));
