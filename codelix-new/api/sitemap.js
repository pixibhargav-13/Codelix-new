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
  "https://www.codelixitsolutions.com/case-study",
  "https://www.codelixitsolutions.com/nextgen-case-study",
  "https://www.codelixitsolutions.com/erp-case-study",
  "https://www.codelixitsolutions.com/payroll-case-study",
  "https://www.codelixitsolutions.com/smart-business-case-study",
  "https://www.codelixitsolutions.com/book-collections-case-study",
  "https://www.codelixitsolutions.com/makhana-store-case-study",
  "https://www.codelixitsolutions.com/freight-shipping-case-study",
  "https://www.codelixitsolutions.com/hr-portal-case-study",
  "https://www.codelixitsolutions.com/edtech-case-study",
  "https://www.codelixitsolutions.com/modern-creative-agency-case-study",
  "https://www.codelixitsolutions.com/elegant-creative-agency-case-study",
  "https://www.codelixitsolutions.com/car-marketplace-case-study",
  "https://www.codelixitsolutions.com/school-management-case-study",
  "https://www.codelixitsolutions.com/smart-society-management-case-study",
  "https://www.codelixitsolutions.com/internal-ops-erp-case-study",
  "https://www.codelixitsolutions.com/blog/why-digital-presence-matters-more-than-ever-in-2025",
  "https://www.codelixitsolutions.com/blog/design-system-component-based-uis-efficiency-at-scale",
  "https://www.codelixitsolutions.com/blog/progressive-web-apps-pwas-as-the-new-standard",
  "https://www.codelixitsolutions.com/blog/saas-vs-on-premise-whats-best-for-your-business",
  "https://www.codelixitsolutions.com/blog/how-e-commerce-platforms-boost-retail-transformation",
  "https://www.codelixitsolutions.com/blog/how-end-to-end-web-development-delivers-better-results",
  "https://www.codelixitsolutions.com/blog/top-5-reasons-to-choose-laravel-for-faster-web-app-development",
  "https://www.codelixitsolutions.com/blog/ai-powered-solutions-transforming-modern-businesses",
  "https://www.codelixitsolutions.com/blog/mastering-wordpress-advanced-cms-techniques",
  "https://www.codelixitsolutions.com/blog/building-scalable-web-applications-with-modern-frameworks",
  "https://www.codelixitsolutions.com/blog/the-future-of-mobile-app-development-trends-and-insights",
  "https://www.codelixitsolutions.com/blog/optimizing-user-experience-through-better-uiux-design"
];

export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  
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
        // Format to YYYY-MM-DD
        const dateStr = new Date(data.lastmod).toISOString().split('T')[0];
        xml += `    <lastmod>${dateStr}</lastmod>\n`;
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
