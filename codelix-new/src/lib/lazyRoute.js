import { lazy as reactLazy } from "react";

/* React.lazy with a preload(). Once preload() has finished, rendering the
   component doesn't suspend at all: the loader hands React an already
   resolved thenable, which it reads synchronously. A plain import() promise
   always resolves a tick later, so React.lazy suspends on first render even
   when the module is already in memory.

   That matters for hydration: a prerendered route that suspends is left
   waiting, and if anything above it updates in the meantime (Lenis
   publishing its instance through context, on mount) React discards the
   server HTML and renders the page again from scratch. main.jsx preloads
   the current route before hydrating so that never happens. */
export function lazy(load) {
  let loaded;
  const loadOnce = () => load().then((module) => (loaded = module));
  const Component = reactLazy(() => (loaded ? { then: (resolve) => resolve(loaded) } : loadOnce()));
  Component.preload = () => (loaded ? Promise.resolve(loaded) : loadOnce());
  return Component;
}
