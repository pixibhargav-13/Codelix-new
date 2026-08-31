const EVENT = "codelix:intro-handoff";
const KEY = "codelix_intro_seen";

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
