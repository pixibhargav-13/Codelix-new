/* global process */
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

/* /blog/:slug and /case-study/:slug land here (vercel.json rewrites) only
   when no prerendered file exists for the slug — Vercel serves files before
   rewrites. That is either a post published since the last deploy, or a URL
   that doesn't exist. Both used to get post-shell.html with a 200, so any
   made-up post URL was a soft 404: a blank page whose noindex only appeared
   after JavaScript ran. Now the slug is looked up first: a published one
   gets the shell (the page renders it from Supabase, and the rebuild
   workflow prerenders it within the hour); anything else gets the site's
   404 page with a real 404 status. */
const SITE = 'https://www.codelixitsolutions.com';
const TABLES = { blog: 'blog_posts', case: 'case_studies' };

/* dist/ is bundled with the function (vercel.json "includeFiles"); the live
   site's copy is the fallback if it isn't */
async function page(file) {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'dist', file), 'utf8');
  } catch {
    const res = await fetch(`${SITE}/${file}`, { headers: { 'User-Agent': 'CodelixPostPage/1.0' } });
    return res.ok ? res.text() : null;
  }
}

export default async function handler(req, res) {
  const table = TABLES[req.query.type];
  const slug = String(req.query.slug || '');
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  let exists = false;
  let lookupFailed = false;
  if (table && /^[a-z0-9-]+$/.test(slug) && supabaseUrl && supabaseKey) {
    const { data, error } = await createClient(supabaseUrl, supabaseKey)
      .from(table).select('slug').eq('slug', slug).eq('published', true).maybeSingle();
    exists = !!data;
    lookupFailed = !!error;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  /* a database hiccup must not turn a real post into a 404 that gets cached
     and indexed as gone: serve the shell, which shows its own "not found"
     after it has checked for itself */
  if (exists || lookupFailed) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60');
    return res.status(200).send((await page('post-shell.html')) || '');
  }
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
  return res.status(404).send((await page('404.html')) || 'Not found');
}
