const EVENT = "codelix:intro-handoff";
export const INTRO_SEEN_KEY = "codelix_intro_seen";
const KEY = INTRO_SEEN_KEY;

/* The intro plays on desktop only. On a phone it covered the homepage for
   ~3s after the JS had already taken seconds to arrive, which made the hero
   the page's Largest Contentful Paint at ~7s — and Google ranks on mobile.
   scripts/ssg-build.mjs uses the same query for the pre-boot plate, so the
   plate and the intro can never disagree about which devices get it. */
export const INTRO_MEDIA = "(min-width: 1024px) and (pointer: fine)";

/* Whether the intro runs, decided ONCE per page load and cached.

   The cache is load-bearing in two directions:

   - it must not re-read storage per call, because the read is paired with a
     write; a second caller would otherwise get "false" and disagree with the
     first.
   - it must stay stable for the whole load, because PageLoader is a child of
     HomepageV2 and its effects run first. If this flipped mid-load the hero
     effect would then read "false", skip its hold, and play out behind the
     plate — the exact bug the handoff exists to prevent. */
let decided = null;

export function introWillPlay() {
  if (typeof window === "undefined") return false;
  if (decided === null) {
    if (!window.matchMedia(INTRO_MEDIA).matches) {
      decided = false;
      return decided;
    }
    try {
      decided = sessionStorage.getItem(KEY) !== "1";
      if (decided) sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode or blocked storage — show it rather than suppress it */
      decided = true;
    }
  }
  return decided;
}

/* Fired by the loader as its plate starts clearing — the hero timeline is
   held until this lands so its wipe happens in front of the viewer rather
   than behind the plate. */
export function handOffIntro() {
  window.dispatchEvent(new Event(EVENT));
}

export function onIntroHandoff(fn) {
  window.addEventListener(EVENT, fn, { once: true });
  return () => window.removeEventListener(EVENT, fn);
}
