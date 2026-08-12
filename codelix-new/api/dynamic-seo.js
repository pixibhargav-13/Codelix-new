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
    // Send detailed error instead of generic 500
    let dirTree = '';
    try {
      const getTree = (d, depth=0) => {
        if(depth>2) return '';
        let s = '';
        const fs = require('fs');
        const files = fs.readdirSync(d);
        for (const f of files) {
          s += '  '.repeat(depth) + f + '\n';
          const p = require('path').join(d, f);
          if (fs.statSync(p).isDirectory() && !f.includes('node_modules')) {
             s += getTree(p, depth+1);
          }
        }
        return s;
      };
      dirTree = 'CWD:\\n' + getTree(process.cwd()) + '\\nDIRNAME:\\n' + getTree(__dirname);
    } catch(err) {}

    res.status(500).send(`
      <h1>Internal Server Error</h1>
      <h2>Dynamic SEO Execution Failed</h2>
      <pre>${e.message}</pre>
      <pre>${e.stack}</pre>
      <pre>DirTree:
${dirTree}</pre>
    `);
  }
}

async function getIndexHtml(req) {
  // First attempt: Read dist/index.html directly from filesystem
  // This is the fastest and most reliable if Vercel includes it in the lambda.
  try {
    const cwd = process.cwd();
    // Helper to search for index.html
    const findIndexHtml = (dir, depth = 0) => {
      if (depth > 3) return null;
      try {
        const files = fs.readdirSync(dir);
        if (files.includes('index.html')) return path.join(dir, 'index.html');
        for (const file of files) {
          const fullPath = path.join(dir, file);
          if (fs.statSync(fullPath).isDirectory() && !file.includes('node_modules')) {
            const found = findIndexHtml(fullPath, depth + 1);
            if (found) return found;
          }
        }
      } catch (e) {}
      return null;
    };

    let indexPath = findIndexHtml(cwd);
    if (!indexPath && cwd !== __dirname) {
      indexPath = findIndexHtml(__dirname);
    }
    
    if (indexPath) {
      return fs.readFileSync(indexPath, 'utf8');
    }
  } catch (e) {
    console.warn('Could not read index.html locally.', e.message);
  }
  
  // Fallback: Fetch from self. This is required if the static output isn't bundled with the API function.
  // We MUST use the internal Vercel URL to bypass Cloudflare 403 Forbidden on datacenter IPs.
  const vercelUrl = req.headers['x-vercel-deployment-url'] || process.env.VERCEL_URL;
  const host = vercelUrl || req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = host && (host.includes('localhost') || host.includes('127.0.0.1')) ? 'http' : 'https';
  const baseUrl = host ? `${protocol}://${host}` : 'https://www.codelixitsolutions.com';
  
  const response = await fetch(baseUrl + '/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': 'text/html'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch base HTML: ${response.status} ${response.statusText}`);
  }
  return await response.text();
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
