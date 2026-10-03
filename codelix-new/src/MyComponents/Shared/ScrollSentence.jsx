import React, { useRef, useEffect } from 'react';
import './ScrollSentence.css';

/* smootherstep — takes the linear scroll fraction and softens both ends so the
   scrubbed motion doesn't start and stop abruptly */
const ease = (p) => p * p * p * (p * (p * 6 - 15) + 10);

/* Tall sticky block that shows ONE line at a time. Unlike a timed animation,
   every value here (opacity, scale, blur, backdrop position) is a direct
   function of scroll position — no CSS transition plays on its own. Scroll a
   pixel, the text moves a pixel; scroll back, it reverses. */
export default function ScrollSentence({ words, tone, centered = false }) {
  const ref = useRef(null);
  const wordRefs = useRef([]);
  const bgRefs = useRef([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let running = false;
    let target = 0;   // where the scrollbar says we are
    let current = 0;  // where the type actually is — chases target
    let primed = false;

    /* The block's document-space position and height only change on resize,
       but this used to read getBoundingClientRect() on every scroll event —
       and since paint() writes styles every frame, each of those reads forced
       a synchronous layout. Measure once and derive the scroll position
       arithmetically instead; same technique the homepage word-flyer already
       uses. */
    let docTop = 0, blockHeight = 0, viewportH = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      docTop = r.top + window.scrollY;
      blockHeight = r.height;
      viewportH = window.innerHeight;
    };

    const readTarget = () => {
      const scrollable = blockHeight - viewportH;
      if (scrollable <= 0) return 0;
      /* -r.top in viewport space is exactly scrollY - docTop */
      const raw = (window.scrollY - docTop) / scrollable;
      const norm = Math.min(Math.max(raw / 0.92, 0), 0.9999);
      return norm * words.length;
    };

    // Each slot is split so the line spends MOST of it sharp and still.
    const IN_END = 0.2;
    const OUT_START = 0.8;

    const paint = (t) => {
      words.forEach((_, i) => {
        const d = Math.min(Math.max(t - i, 0), 1);
        const wordEl = wordRefs.current[i];
        const bgEl = bgRefs.current[i];

        let scale, opacity, blur;
        if (d < IN_END) {
          const p = ease(d / IN_END);
          scale = 0.78 + p * 0.22;
          opacity = p;
          blur = 5 * (1 - p);
        } else if (d <= OUT_START) {
          scale = 1;
          opacity = 1;
          blur = 0;
        } else {
          const p = ease((d - OUT_START) / (1 - OUT_START));
          scale = 1 + p * 0.22;
          opacity = 1 - p;
          blur = 6 * p;
        }

        if (wordEl) {
          wordEl.style.opacity = opacity;
          wordEl.style.transform = centered 
            ? `translate3d(-50%,-50%,0) scale(${scale})`
            : `translate3d(0,-50%,0) scale(${scale})`;
          wordEl.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
        }
        if (bgEl) {
          // plain crossfade — no sliding motion, the color just blends in
          // so the change isn't visible as one panel moving over another
          const bp = ease(Math.min(d / IN_END, 1));
          bgEl.style.opacity = bp;
        }
      });
    };

    // Damped follow: each frame we close ~12% of the remaining gap. That gives
    // the motion weight — it glides into place and settles instead of snapping
    // to whatever the scrollbar reads on that exact frame.
    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.0002) {
        current = target;
        paint(current);
        running = false;
        raf = 0;
        return;
      }
      current += diff * 0.12;
      paint(current);
      raf = requestAnimationFrame(tick);
    };

    const handleScroll = () => {
      const next = readTarget();
      /* off-screen the target is pinned at 0 or the end, so most scroll
         events change nothing — don't start a frame that rewrites every
         word's styles to the values they already have */
      if (primed && !running && next === current) return;
      target = next;
      // force the very first render to be instant so it's correct before the
      // user scrolls, but ease every frame after that
      if (!primed) {
        current = target;
        paint(current);
        primed = true;
      }
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    /* only these re-measure; scroll just reads the cached numbers.
       Caching trades a per-scroll layout read for a staleness risk, so
       re-measure on everything that can move the block after mount — late
       images and webfonts both reflow the page well after the effect runs. */
    const onResize = () => { measure(); handleScroll(); };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(onResize).catch(() => {});
    }
    measure();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      cancelAnimationFrame(raf);
    };
  }, [words.length, centered]);

  return (
    <div 
      className={`v2-sentence v2-sentence--${tone} ${centered ? 'v2-sentence--centered' : ''}`} 
      ref={ref}
    >
      <div className="v2-sentence-sticky">
        <div className="v2-sentence-bgs">
          {words.map((_, i) => (
            <div
              key={i}
              ref={(el) => (bgRefs.current[i] = el)}
              className="v2-sentence-bg"
            />
          ))}
        </div>
        <div className="v2-sentence-words">
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => (wordRefs.current[i] = el)}
              className="v2-sentence-word"
              dangerouslySetInnerHTML={{ __html: w }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
