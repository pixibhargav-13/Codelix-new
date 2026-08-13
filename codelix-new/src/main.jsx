import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";

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
