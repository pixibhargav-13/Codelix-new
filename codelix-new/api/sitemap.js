import { createClient } from '@supabase/supabase-js';

/* Served as /sitemap-posts.xml (vercel.json rewrite; robots.txt lists it).

   sitemap.xml is written at build time, so a post published between deploys
   (the scheduled blog task publishes without one) was missing from it until
   the next deploy. This one reads Supabase on each request, so a new blog
   post or case study is in a sitemap the moment it is published. It lists
   only those: every other page, and the built-in posts, are in sitemap.xml.
   A URL in both is fine; search engines merge them. */
const SITE = 'https://www.codelixitsolutions.com';

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).send('Missing Supabase configuration');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const [caseStudiesRes, blogsRes] = await Promise.all([
      supabase.from('case_studies').select('slug, updated_at, published_at').eq('published', true),
      supabase.from('blog_posts').select('slug, updated_at, published_at').eq('published', true)
    ]);
    if (caseStudiesRes.error || blogsRes.error) throw caseStudiesRes.error || blogsRes.error;

    const entries = [
      ...(blogsRes.data || []).map((r) => ({ ...r, path: `/blog/${r.slug}` })),
      ...(caseStudiesRes.data || []).map((r) => ({ ...r, path: `/case-study/${r.slug}` })),
    ].filter((r) => r.slug);

    const lastmod = (r) => {
      const d = new Date(r.updated_at || r.published_at);
      return isNaN(d) ? '' : `    <lastmod>${d.toISOString().slice(0, 10)}</lastmod>\n`;
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((r) => `  <url>\n    <loc>${SITE}${r.path}</loc>\n${lastmod(r)}  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    /* short CDN cache: fresh within minutes of a publish, without a Supabase
       query on every crawler hit */
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
    res.status(200).send(xml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating sitemap');
  }
}
