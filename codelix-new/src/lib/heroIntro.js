import { useEffect, useRef } from "react";

const HERO = ".sd2-crumbs, .sv2-hero-reveal, .sd2-hero-title, .bdv2-title, .bdv2-meta";

/* The hero entrance is a CSS animation (ServicesV2.css), so it plays from the
   prerendered HTML's first paint with no JS involved. A detail page that
   switches to another record without remounting keeps the same hero
   elements, so the animation would not play again; this restarts it when
   `key` changes. Never on mount — that would blank a hero the visitor is
   already reading. */
export function useReplayHeroIntro(rootRef, key) {
  const shown = useRef(key);
  useEffect(() => {
    if (shown.current === key) return;
    shown.current = key;
    rootRef.current?.querySelectorAll(HERO).forEach((el) => {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    });
  }, [rootRef, key]);
}
