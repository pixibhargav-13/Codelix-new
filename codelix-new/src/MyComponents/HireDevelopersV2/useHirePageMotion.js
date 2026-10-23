import { useEffect } from "react";
import gsap from "gsap";
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";

/* Hero intro and reveal-on-enter for the hire pages — the same masked-line
   wipe and IntersectionObserver every other v2 detail page runs, shared by
   the hub and the per-role pages. `key` re-runs both when the route param
   changes without a remount. */
export function useHirePageMotion(rootRef, key) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (s) => root.querySelectorAll(s);
    splitTitleLinesIn(root, ".sd2-hero-title");
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"), { yPercent: 118 }, { yPercent: 0, duration: 1.15 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".sd2-facts.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.75");
    return () => tl.kill();
  }, [rootRef, key]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const targets = root.querySelectorAll(
      ".sd2-case, .sd2-step, .sd2-other, .sd2-work-card, .v2-heading, .v2-label, .v2-lede, .ind2-overview-text"
    );
    targets.forEach((el) => io.observe(el));
    /* same safety net as IndustryDetailV2: nothing may stay at opacity 0 if
       an intersection callback never fires for something already in view */
    const safety = setTimeout(() => targets.forEach((el) => el.classList.add("is-in")), 2000);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [rootRef, key]);
}
