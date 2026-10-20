/* Renders a cover for each built-in post in src/data/blogData.js into
   src/MyComponents/Images/blog/<slug>.webp (the on-site banner)
   and <slug>-share.webp (the link preview) — the same image — in the same style as covers for
   posts published through scripts/publish-blog-post.mjs.

     node scripts/blog-static-covers.mjs

   Not a build step: run it by hand after changing a built-in post's title
   or category. blogData.js imports the covers it produces, so it is read as
   text here, with its import lines stubbed out. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderCover } from "./blog-cover.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "src/MyComponents/Images/blog");

const src = fs.readFileSync(path.join(ROOT, "src/data/blogData.js"), "utf8")
  .replace(/^import (\w+) from .*$/gm, 'const $1 = "";')
  .replace(/^export const /gm, "const ");
const blogs = new Function(`${src}; return blogs;`)();

fs.mkdirSync(OUT, { recursive: true });
for (const b of blogs) {
  const { cover, banner, motif, screen, topic, layout } = await renderCover({ title: b.title, category: b.tags[1], tags: b.tags.slice(2) });
  /* <slug>.webp is the on-site banner, <slug>-share.webp the link preview */
  fs.writeFileSync(path.join(OUT, `${b.slug}.webp`), banner);
  fs.writeFileSync(path.join(OUT, `${b.slug}-share.webp`), cover);
  console.log(`${`${motif} ${screen}`.padEnd(14)} ${(topic || "-").padEnd(9)} ${layout.padEnd(12)} ${b.slug}`);
}
console.log(`${blogs.length} covers -> ${path.relative(ROOT, OUT)}`);
