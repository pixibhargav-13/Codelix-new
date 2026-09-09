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
import App from './App.jsx'

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

if (rootElement.hasChildNodes() && !isAdmin) {
  hydrateRoot(rootElement, app);
} else {
  if (isAdmin) rootElement.innerHTML = "";
  createRoot(rootElement).render(app);
}
