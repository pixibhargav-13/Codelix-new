import { createContext } from "react";

/* The prerender data (Supabase case studies and blog posts) is handed to the
   tree through this context.

   It lives in its own module because there are two App entry points — App.jsx
   for the browser and App.server.jsx for prerendering — and each used to call
   createContext itself. Two calls make two unrelated context objects, so the
   provider in App.server was invisible to the hooks, which read App's. Every
   hook saw the default null during SSR, and anything published from the admin
   panel silently missed the prerendered HTML: the blog list showed only the
   static posts, and an admin post's own page rendered the loading skeleton. */
export const InitialDataContext = createContext(null);
