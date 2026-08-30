import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
/* Bootstrap must load BEFORE index.css — it sets `body { background-color:
   var(--bs-body-bg) }` (white), which is the same specificity as our own
   body rule, so whichever lands last wins. With it imported afterwards it
   repainted the body white, and that showed through anywhere the dark page
   content didn't cover. Vendor CSS first, ours last. */
import "bootstrap/dist/css/bootstrap.min.css";
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
