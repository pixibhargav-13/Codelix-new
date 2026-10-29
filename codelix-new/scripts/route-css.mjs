import fs from "fs";
import path from "path";
import { matchPath } from "react-router";

/* With cssCodeSplit on, a page's styles arrive with its lazy route chunk —
   after the JS has loaded. A prerendered page has to carry them itself or it
   paints unstyled first. This maps a URL to the page component App.jsx
   routes it to, and that component to its CSS through Vite's manifest.

   The route table is read from App.jsx rather than duplicated here, so a new
   route can't silently ship without its styles: an unmatched URL throws. */
export function createRouteCss({ appFile, srcDir, manifest }) {
  const app = fs.readFileSync(appFile, "utf8");

  const lazyFiles = new Map();
  for (const [, name, spec] of app.matchAll(/const (\w+) = lazy\(\(\) => import\("(\.[^"]+)"\)\)/g)) {
    lazyFiles.set(name, resolveSource(path.resolve(path.dirname(appFile), spec)));
  }

  const routes = [];
  for (const [, pattern, element] of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)\s*\/>\}/g)) {
    if (lazyFiles.has(element)) routes.push({ pattern, file: lazyFiles.get(element) });
  }
  /* literal paths before dynamic ones before the catch-all, the same ranking
     React Router applies */
  const rank = (p) => (p === "*" ? 2 : p.includes(":") ? 1 : 0);
  routes.sort((a, b) => rank(a.pattern) - rank(b.pattern));

  const manifestKey = (file) => path.relative(path.dirname(srcDir), file).split(path.sep).join("/");

  const cssFor = (key, out = [], seen = new Set()) => {
    if (seen.has(key)) return out;
    seen.add(key);
    const entry = manifest[key];
    if (!entry) return out;
    for (const dep of entry.imports || []) cssFor(dep, out, seen);
    for (const css of entry.css || []) if (!out.includes(css)) out.push(css);
    return out;
  };

  const routeFor = (url) => {
    const route = routes.find((r) => r.pattern === "*" || matchPath({ path: r.pattern, end: true }, url));
    if (!route) throw new Error(`No route in App.jsx matches ${url}`);
    return route;
  };

  function routeCss(url) {
    const route = routeFor(url);
    const key = manifestKey(route.file);
    if (!manifest[key]) throw new Error(`${key} (route for ${url}) is not in the Vite manifest`);
    return cssFor(key).map((file) => `/${file}`);
  }

  /* the page component's own JS chunk, which main.jsx loads before hydrating
     (see the data-route-chunk link ssg-build.mjs adds) */
  routeCss.chunkFor = (url) => {
    const entry = manifest[manifestKey(routeFor(url).file)];
    return entry ? `/${entry.file}` : null;
  };

  /* the page component a URL renders, and whether it is a template shared by
     several URLs (a ":param" route) — used for the page's dates */
  routeCss.sourceFor = (url) => {
    const route = routeFor(url);
    return { file: route.file, template: route.pattern.includes(":") };
  };

  return routeCss;
}

function resolveSource(base) {
  for (const ext of ["", ".jsx", ".js"]) {
    if (fs.existsSync(base + ext) && fs.statSync(base + ext).isFile()) return base + ext;
  }
  throw new Error(`Cannot resolve lazy import ${base}`);
}
