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

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
