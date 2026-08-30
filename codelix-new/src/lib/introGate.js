const KEY = "codelix_intro_seen";
const EVENT = "codelix:intro-handoff";

/* Decided once per page load and cached, so the loader and the homepage's
   hero timeline can never disagree about whether an intro is running —
   they both read this, and whoever asks first settles it. */
let decided = null;

export function introWillPlay() {
  if (typeof window === "undefined") return false;
  if (decided === null) {
    decided = sessionStorage.getItem(KEY) !== "1";
    if (decided) sessionStorage.setItem(KEY, "1");
  }
  return decided;
}

/* Fired by the loader as its plate starts clearing — the hero timeline
   is held until this lands so its wipe happens in front of the viewer
   rather than behind the plate. */
export function handOffIntro() {
  window.dispatchEvent(new Event(EVENT));
}

export function onIntroHandoff(fn) {
  window.addEventListener(EVENT, fn, { once: true });
  return () => window.removeEventListener(EVENT, fn);
}
