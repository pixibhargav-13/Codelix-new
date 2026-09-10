/* Hero titles used to be hand-split across <span class="line"> blocks, which
   hardcoded where every break fell — so the same title that read well at
   1440px broke awkwardly at 1024px or on a phone.

   This measures the rendered text instead and rebuilds the same
   .line > span structure around each REAL visual line, so titles wrap to
   whatever width they're given while the existing GSAP mask-wipe (which
   targets ".<title> .line > span") keeps working untouched.

   It flattens whatever markup is already there first, so the old
   hand-authored breaks disappear on their own — no markup edits needed
   in the page components. */

const WORDS_KEY = "__splitWords";
const OBSERVED = new WeakMap();

/* Pull the title down to a flat word list, remembering which words carried
   an accent class (e.g. v2-hero-accent) so the colour survives a rebuild
   even when a run of accented words gets broken across two lines. */
function readWords(el) {
  if (el[WORDS_KEY]) return el[WORDS_KEY];

  const words = [];
  const walk = (node, accent) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.textContent
          .split(/\s+/)
          .filter(Boolean)
          .forEach((text) => words.push({ text, accent }));
        return;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) return;

      /* "line" is structural, anything else (the accent span) is styling
         we need to carry through */
      const own = [...child.classList].filter((c) => c !== "line");
      walk(child, own.length ? own.join(" ") : accent);
    });
  };
  walk(el, null);

  el[WORDS_KEY] = words;
  return words;
}

/* A word like "E-Commerce" is one word to this splitter but two break
   opportunities to the browser, which will happily leave "E-" hanging at the
   end of a line. No CSS property prevents it for Latin text — word-break:
   keep-all is defined for CJK only, and hyphens/line-break do not govern an
   explicit hyphen — so the word has to be made atomic in the markup instead.
   Only words that actually contain an in-word break get wrapped, so the
   common case emits exactly the markup it did before. */
const IN_WORD_BREAK = /\S[-\u2013\u2014/]\S/;

function appendWord(parent, text, doc) {
  if (!IN_WORD_BREAK.test(text)) {
    parent.appendChild(doc.createTextNode(text));
    return;
  }
  const span = doc.createElement("span");
  span.style.whiteSpace = "nowrap";
  span.textContent = text;
  parent.appendChild(span);
}

function buildWordSpan(word, doc) {
  const span = doc.createElement("span");
  span.textContent = word.text;
  /* measure with the same atomicity the rebuilt markup will have, or the
     line grouping is computed against breaks that will not happen */
  if (IN_WORD_BREAK.test(word.text)) span.style.whiteSpace = "nowrap";
  if (word.accent) span.className = word.accent;
  return span;
}

export function splitTitleLines(el) {
  if (!el) return;
  const words = readWords(el);
  if (!words.length) return;

  const doc = el.ownerDocument;

  /* 1. lay the words out flat so the browser decides the breaks */
  el.textContent = "";
  const probes = words.map((w, i) => {
    const span = buildWordSpan(w, doc);
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(doc.createTextNode(" "));
    return span;
  });

  /* 2. group by the line each word actually landed on */
  const lines = [];
  let currentTop = null;
  probes.forEach((span, i) => {
    const top = span.offsetTop;
    if (currentTop === null || Math.abs(top - currentTop) > 1) {
      currentTop = top;
      lines.push([]);
    }
    lines[lines.length - 1].push(words[i]);
  });

  /* 3. rebuild as .line > span, the shape the GSAP wipe expects */
  el.textContent = "";
  lines.forEach((line) => {
    const outer = doc.createElement("span");
    outer.className = "line";
    const inner = doc.createElement("span");

    /* Consecutive words sharing an accent are emitted as ONE span rather
       than one span per word. The accent is a gradient drawn with
       background-clip:text, which resolves against each element's own box —
       so a span per word restarted the sweep on every word ("Real" going
       full white-to-blue by itself) instead of running once across the
       whole phrase. Runs are grouped per line, so a phrase broken over two
       lines still gets a clean sweep on each. */
    let i = 0;
    while (i < line.length) {
      const { accent } = line[i];
      let end = i;
      while (end + 1 < line.length && line[end + 1].accent === accent) end++;

      const runWords = line.slice(i, end + 1);
      const target = accent ? doc.createElement("span") : inner;
      if (accent) target.className = accent;
      runWords.forEach((w, k) => {
        appendWord(target, w.text, doc);
        if (k < runWords.length - 1) target.appendChild(doc.createTextNode(" "));
      });
      if (accent) inner.appendChild(target);

      if (end < line.length - 1) inner.appendChild(doc.createTextNode(" "));
      i = end + 1;
    }

    outer.appendChild(inner);

    /* separate the lines with a real whitespace text node. Each .line is
       display:block so this changes nothing visually, but without it the
       title's extracted text runs together — "We buildsoftware that" — which
       is what search engines and screen readers read. */
    if (el.childNodes.length) el.appendChild(doc.createTextNode(" "));
    el.appendChild(outer);
  });
}

/* Split now, then re-split on resize. The re-split is debounced and skips
   identical widths so a scroll-driven mobile URL-bar resize doesn't rebuild
   the DOM (and stomp a running animation) for nothing. */
export function splitTitleLinesIn(root, selector = ".sd2-hero-title") {
  if (!root || typeof window === "undefined") return () => {};

  const els = [...root.querySelectorAll(selector)];
  if (!els.length) return () => {};

  els.forEach(splitTitleLines);

  let lastWidth = window.innerWidth;
  let timer = 0;
  const onResize = () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    clearTimeout(timer);
    timer = setTimeout(() => els.forEach(splitTitleLines), 150);
  };

  window.addEventListener("resize", onResize, { passive: true });
  OBSERVED.set(root, onResize);

  return () => {
    clearTimeout(timer);
    window.removeEventListener("resize", onResize);
  };
}
