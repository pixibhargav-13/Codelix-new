/* /media/* (vercel.json rewrites it here) serves the Supabase storage bucket
   from our own domain; see src/lib/media.js for why.

   A plain external rewrite to the bucket worked but was never cached:
   Supabase answers through Cloudflare, which adds a Set-Cookie (__cf_bm) to
   every image, and Vercel's CDN does not cache a response that sets a
   cookie. Every image then paid for an extra hop (live TTFB 0.73-0.88 s
   against 0.47-0.58 s direct) and blog LCP got worse. This function fetches
   the file once and returns only the body and the headers that matter, so
   the CDN keeps it: a cache hit never reaches this code or Supabase. */
const BUCKET = 'https://qmahqirligslilrywyot.supabase.co/storage/v1/object/public/media/';
const SAFE_PATH = /^[A-Za-z0-9][A-Za-z0-9._\-/]*$/;
/* Vercel functions return at most 4.5 MB; anything bigger is sent to the
   bucket directly instead of failing */
const MAX_BYTES = 4 * 1024 * 1024;

export default async function handler(req, res) {
  const raw = Array.isArray(req.query.path) ? req.query.path.join('/') : String(req.query.path || '');
  const file = raw.replace(/^\/+/, '');
  if (!SAFE_PATH.test(file) || file.includes('..')) {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300');
    return res.status(404).send('Not found');
  }
  const url = BUCKET + file.split('/').map(encodeURIComponent).join('/');

  let upstream;
  try {
    upstream = await fetch(url);
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).send('Upstream unavailable');
  }
  if (!upstream.ok) {
    /* a missing file is cached briefly, an upstream error not at all */
    res.setHeader('Cache-Control', upstream.status === 404 || upstream.status === 400 ? 'public, max-age=0, s-maxage=300' : 'no-store');
    return res.status(upstream.status === 400 ? 404 : upstream.status).send('Not found');
  }
  const size = Number(upstream.headers.get('content-length') || 0);
  if (size > MAX_BYTES) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Location', url);
    return res.status(307).end();
  }

  const body = Buffer.from(await upstream.arrayBuffer());
  res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/octet-stream');
  res.setHeader('Content-Length', String(body.length));
  const etag = upstream.headers.get('etag');
  if (etag) res.setHeader('ETag', etag);
  /* browsers keep it a year, as Supabase already asked; Vercel's CDN keeps it
     a week, so a file replaced under the same name refreshes within days */
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.setHeader('CDN-Cache-Control', 'public, max-age=604800');
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).send(body);
}
