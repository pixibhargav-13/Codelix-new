import { createElement } from "react";

const IN_WORD_BREAK = /\S[-–—/]\S/;

/* Hero titles wrap naturally, and the browser will break "E-Commerce" or
   "UI/UX" after the hyphen or slash, leaving "E-" alone at the end of a
   line. No CSS property prevents that for Latin text, so words with an
   in-word break are wrapped in a nowrap span; everything else stays a plain
   string, so the common case renders exactly as before. */
export function keepWords(text) {
  return String(text)
    .split(/(\s+)/)
    .map((part, i) =>
      IN_WORD_BREAK.test(part)
        ? createElement("span", { key: i, style: { whiteSpace: "nowrap" } }, part)
        : part
    );
}
