import { useEffect } from "react";
import { useReplayHeroIntro } from "../../lib/heroIntro.js";

/* Hero intro and reveal-on-enter for the hire pages — the same masked-line
   wipe and IntersectionObserver every other v2 detail page runs, shared by
   the hub and the per-role pages. `key` re-runs both when the route param
   changes without a remount. */
export function useHirePageMotion(rootRef, key) {
  useReplayHeroIntro(rootRef, key);

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
