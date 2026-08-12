import { createClient } from '@supabase/supabase-js';

const staticUrls = [
  "https://www.codelixitsolutions.com/",
  "https://www.codelixitsolutions.com/about",
  "https://www.codelixitsolutions.com/services",
  "https://www.codelixitsolutions.com/services/web-development",
  "https://www.codelixitsolutions.com/services/application-development",
  "https://www.codelixitsolutions.com/services/ui-ux-design",
  "https://www.codelixitsolutions.com/services/e-commerce-solutions",
  "https://www.codelixitsolutions.com/services/custom-software-development",
  "https://www.codelixitsolutions.com/services/ai-development",
  "https://www.codelixitsolutions.com/services/data-analytics",
  "https://www.codelixitsolutions.com/services/support-managed-services",
  "https://www.codelixitsolutions.com/industries",
  "https://www.codelixitsolutions.com/team",
  "https://www.codelixitsolutions.com/process",
  "https://www.codelixitsolutions.com/pricing",
  "https://www.codelixitsolutions.com/technologies",
  "https://www.codelixitsolutions.com/careers",
  "https://www.codelixitsolutions.com/faq",
  "https://www.codelixitsolutions.com/refund-policy",
  "https://www.codelixitsolutions.com/terms-of-service",
  "https://www.codelixitsolutions.com/privacy-policy",
  "https://www.codelixitsolutions.com/products/audytee",
  "https://www.codelixitsolutions.com/products/4bitx",
  "https://www.codelixitsolutions.com/products/aanganone",
  "https://www.codelixitsolutions.com/work",
  "https://www.codelixitsolutions.com/blog",
  "https://www.codelixitsolutions.com/contact",
  "https://www.codelixitsolutions.com/case-study"
];

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
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    const allUrls = new Map();
    
    // Add static URLs first (if they overlap with dynamic ones, the dynamic lastmod takes precedence later)
    for (const url of staticUrls) {
      allUrls.set(url, { loc: url });
    }
    
    // Process dynamic case studies
    if (caseStudiesRes.data) {
      for (const item of caseStudiesRes.data) {
        if (!item.slug) continue;
        const loc = `https://www.codelixitsolutions.com/case-study/${item.slug}`;
        const lastmod = item.updated_at || item.published_at;
        allUrls.set(loc, { loc, lastmod });
      }
    }
    
    // Process dynamic blogs
    if (blogsRes.data) {
      for (const item of blogsRes.data) {
        if (!item.slug) continue;
        const loc = `https://www.codelixitsolutions.com/blog/${item.slug}`;
        const lastmod = item.updated_at || item.published_at;
        allUrls.set(loc, { loc, lastmod });
      }
    }
    
    // Generate XML entries
    for (const data of allUrls.values()) {
      xml += '  <url>\n';
      xml += `    <loc>${data.loc}</loc>\n`;
      if (data.lastmod) {
        try {
          const dateObj = new Date(data.lastmod);
          if (!isNaN(dateObj.getTime())) {
            const dateStr = dateObj.toISOString().split('T')[0];
            xml += `    <lastmod>${dateStr}</lastmod>\n`;
          }
        } catch (e) {
          // ignore invalid dates
        }
      }
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    }
    
    xml += '</urlset>';
    
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(xml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating sitemap');
  }
}
