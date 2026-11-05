/* Blog covers, case-study screenshots and inline post images live in Supabase
   storage. Served from there they cost every page a connection to a second
   origin before the image can even start: on a blog post, whose largest paint
   IS the cover, that was most of a second (simulated mobile LCP 3.9–4.4 s
   against 3.3 s for the same file served from our own domain).

   vercel.json rewrites /media/* to the storage bucket, so the browser only
   ever talks to codelixitsolutions.com, and Vercel's CDN caches the files at
   the edge. This rewrites the URLs inside a row (any field, including the
   HTML of a post body) to that local path. It is applied wherever rows enter
   the site: at build time in ssg-build.mjs and on the client in
   useBlogPosts / useCaseStudies. Idempotent: a localized row passes through
   unchanged. The admin panel keeps the raw URLs. */
const BUCKET_PATH = "/storage/v1/object/public/media/";

const envUrl = () => {
  try {
    return import.meta.env?.VITE_SUPABASE_URL;
  } catch {
    return undefined;
  }
};

export function localMedia(row, supabaseUrl = envUrl()) {
  if (!row || !supabaseUrl) return row;
  const from = `${new URL(supabaseUrl).origin}${BUCKET_PATH}`;
  const json = JSON.stringify(row);
  return json.includes(from) ? JSON.parse(json.split(from).join("/media/")) : row;
}
