import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    "Missing Supabase env vars — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local. " +
    "Falling back to a placeholder client so the rest of the site keeps working; " +
    "admin/login and any Supabase-backed content will simply fail until this is set."
  );
}

/* createClient() throws synchronously on an invalid/missing URL, and this
   module is imported at the top of the app (AuthProvider wraps everything
   in App.jsx) — so a missing .env.local must never crash the whole site,
   only the Supabase-dependent features. */
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
