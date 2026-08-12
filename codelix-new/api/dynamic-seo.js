import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Fallback metadata
const DEFAULT_TITLE = 'Codelix IT Solutions | AI-Powered Web, App & SaaS Development';
const DEFAULT_DESC = 'Craft AI-powered web, app & SaaS solutions with world-class UI/UX design. Trusted by 25+ companies for professional development services.';

export default async function handler(req, res) {
  try {
    let slug = '';
    let type = '';
    
    // Vercel rewrites preserve the original URL in req.url
    const urlPath = req.url.split('?')[0];
    
    if (urlPath.startsWith('/blog/')) {
      type = 'blog_posts';
      slug = urlPath.replace('/blog/', '');
    } else if (urlPath.startsWith('/case-study/')) {
      type = 'case_studies';
      slug = urlPath.replace('/case-study/', '');
    }
    
    if (!type || !slug) {
       return await serveBaseHtml(req, res, null);
    }
    
    slug = slug.replace(/\/$/, '');

    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
       console.error("Missing Supabase configuration");
       return await serveBaseHtml(req, res, null);
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase
      .from(type)
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
      
    if (error || !data) {
      return await serve404(req, res);
    }
    
    const siteUrl = 'https://www.codelixitsolutions.com';
    const canonical = `${siteUrl}${urlPath}`;
    
    const meta = {
      title: data.seo_title || data.title || DEFAULT_TITLE,
      description: data.seo_description || data.description || data.excerpt || DEFAULT_DESC,
      image: data.cover_image_url || `${siteUrl}/og-image.png`,
      url: canonical,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1'
    };
    
    await serveBaseHtml(req, res, meta);
    
  } catch (error) {
    console.error('Dynamic SEO Error:', error);
    await serveBaseHtml(req, res, null);
  }
}

async function serve404(req, res) {
  try {
    let html = await getIndexHtml(req);
    html = html.replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="noindex, nofollow" />');
    html = html.replace(/<title>.*?<\/title>/i, '<title>404 Not Found | Codelix IT Solutions</title>');
    
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send(html);
  } catch (e) {
    res.status(404).send('404 Not Found');
  }
}

async function serveBaseHtml(req, res, meta) {
  try {
    let html = await getIndexHtml(req);
    
    if (meta) {
      html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeAttr(meta.title)}</title>`);
      html = html.replace(/(<meta id="meta-description"[^>]*content=")[^"]*(")/i, `$1${escapeAttr(meta.description)}$2`);
      html = html.replace(/(<meta id="meta-og-description"[^>]*content=")[^"]*(")/i, `$1${escapeAttr(meta.description)}$2`);
      html = html.replace(/(<meta id="meta-tw-description"[^>]*content=")[^"]*(")/i, `$1${escapeAttr(meta.description)}$2`);
      html = html.replace(/(<link rel="canonical" id="meta-canonical" href=")[^"]*(")/i, `$1${escapeAttr(meta.url)}$2`);
      html = html.replace(/(<meta id="meta-og-url"[^>]*content=")[^"]*(")/i, `$1${escapeAttr(meta.url)}$2`);
      html = html.replace(/(<meta id="meta-og-title"[^>]*content=")[^"]*(")/i, `$1${escapeAttr(meta.title)}$2`);
      html = html.replace(/(<meta id="meta-tw-title"[^>]*content=")[^"]*(")/i, `$1${escapeAttr(meta.title)}$2`);
      html = html.replace(/(<meta property="og:image"[^>]*content=")[^"]*(")/i, `$1${escapeAttr(meta.image)}$2`);
      html = html.replace(/(<meta name="twitter:image"[^>]*content=")[^"]*(")/i, `$1${escapeAttr(meta.image)}$2`);
      html = html.replace(/(<meta name="robots"[^>]*content=")[^"]*(")/i, `$1${escapeAttr(meta.robots)}$2`);
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).send(html);
    
  } catch (e) {
    console.error("HTML Serving Error:", e);
    res.status(500).send('Internal Server Error');
  }
}

async function getIndexHtml(req) {
  // First attempt: Read dist/index.html directly from filesystem
  // This is the fastest and most reliable if Vercel includes it in the lambda.
  try {
    const distPaths = [
      path.join(process.cwd(), 'dist', 'index.html'),
      path.join(process.cwd(), '..', 'dist', 'index.html')
    ];
    for (const dp of distPaths) {
      if (fs.existsSync(dp)) {
        return fs.readFileSync(dp, 'utf8');
      }
    }
  } catch (e) {
    console.warn('Could not read dist/index.html locally, falling back to fetch.', e.message);
  }
  
  // Fallback: Fetch from self. This is required if the static output isn't bundled with the API function.
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = host && host.includes('localhost') ? 'http' : 'https';
  const baseUrl = host ? `${protocol}://${host}` : 'https://www.codelixitsolutions.com';
  
  const response = await fetch(baseUrl + '/');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch base HTML: ${response.status} ${response.statusText}`);
  }
  return await response.text();
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
