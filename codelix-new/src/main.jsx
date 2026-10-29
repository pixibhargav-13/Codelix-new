import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
/* Bootstrap was removed: it shipped ~230KB of CSS on every page and the
   whole site used exactly three of its classes (btn, mt-2, mt-4), all now
   replaced by local rules. The parts of its reboot the site had come to
   rely on (box-sizing, heading/paragraph margins) are reproduced in
   index.css so spacing doesn't shift. */
import './index.css'
/* The base stylesheets nearly every page builds on (pages import them and
   then override them in their own CSS). With CSS split per route, Vite loads
   a lazy route's own stylesheet BEFORE the shared ones it depends on, so on
   client-side navigation the base would win over the page's overrides.
   Importing them here puts them in the entry CSS, which is always loaded
   first, so a page's own CSS reliably comes after them. */
import './MyComponents/HomepageV2/HomepageV2.css'
import './MyComponents/ServicesV2/ServicesV2.css'
import './MyComponents/ServiceDetailV2/ServiceDetailV2.css'
import App, { preloadRoute } from './App.jsx'

const initialData = typeof window !== 'undefined' && window.__INITIAL_DATA__ ? window.__INITIAL_DATA__ : null;
const rootElement = document.getElementById('root');

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App initialData={initialData} />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

/* The admin panel is never prerendered, so the host answers /admin/* with the
   SPA fallback — which is the HOMEPAGE's prerendered HTML. Hydrating admin
   onto that markup left the homepage's DOM sitting underneath it: 28 stray
   children in #root, the homepage's <title> on every admin screen, and the
   public chatbot widget floating over the panel even though ChatbotGate
   correctly renders nothing there.

   Admin is client-only and has no server markup worth keeping, so empty the
   container and mount fresh instead of hydrating someone else's page. */
const isAdmin = window.location.pathname.startsWith("/admin");

/* The prerendered head carries copies of the page's title, meta and
   canonical tags (marked data-ssr by scripts/ssg-build.mjs) for crawlers and
   link previews that read the HTML without running it. React renders the
   same tags into <head> itself and doesn't adopt existing ones, so drop the
   copies first or each tag ends up in the head twice. */
document.head.querySelectorAll("[data-ssr]").forEach((tag) => tag.remove());

if (rootElement.hasChildNodes() && !isAdmin) {
  /* load the page this URL renders first (its chunk is already downloading:
     ssg-build.mjs modulepreloads it). Hydrating while it was still loading
     left the route waiting, and the first context update (Lenis setting
     itself up) made React throw the prerendered page away and render it
     again from scratch. A failed load only means hydrating the way it did
     before.

     Only for HTML prerendered for this very URL, which is what carries the
     data-route-chunk link. The 404 page and the post shell are served for
     other URLs (an unknown /blog/ slug, a post published since the build);
     their markup can't match the route, so they hydrate as before. */
  const prerenderedForThisUrl = document.querySelector("link[data-route-chunk]");
  const ready = prerenderedForThisUrl ? preloadRoute(window.location.pathname).catch(() => {}) : Promise.resolve();
  ready.then(() => hydrateRoot(rootElement, app));
} else {
  if (isAdmin) rootElement.innerHTML = "";
  createRoot(rootElement).render(app);
}
