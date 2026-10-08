/* "Light mode" for phones and other touch devices: the homepage keeps its
   layout and content but drops the effects that are expensive to draw on a
   phone GPU — blur filters, frosted-glass panels, the hero's decorative
   loops — and the globe animates at 30fps. The same query is written out in
   HomepageV2.css, HeroVisual.css and ScrollSentence.css; keep them in step. */
export const LIGHT_MEDIA = "(max-width: 900px), (pointer: coarse)";

export const isLightMode = () =>
  typeof window !== "undefined" && window.matchMedia(LIGHT_MEDIA).matches;
