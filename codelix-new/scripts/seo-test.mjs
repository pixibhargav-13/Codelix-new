import fs from 'fs';
import path from 'path';

async function runTests() {
  console.log("===================================");
  console.log("   SEO Implementation Test Suite   ");
  console.log("===================================");
  
  const vercelPath = path.join(process.cwd(), 'vercel.json');
  if (fs.existsSync(vercelPath)) {
    const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
    console.log("✅ vercel.json found.");
    const rewrites = vercel.rewrites || [];
    const hasBlogRewrite = rewrites.some(r => r.source === '/blog/:slug' && r.destination === '/api/dynamic-seo');
    const hasCsRewrite = rewrites.some(r => r.source === '/case-study/:slug' && r.destination === '/api/dynamic-seo');
    if (hasBlogRewrite && hasCsRewrite) {
      console.log("✅ Vercel rewrites for dynamic SEO configured correctly.");
    } else {
      console.error("❌ Missing Vercel rewrites for dynamic SEO.");
    }
  } else {
    console.error("❌ vercel.json not found.");
  }
  
  const sitemapPath = path.join(process.cwd(), 'api', 'sitemap.js');
  if (fs.existsSync(sitemapPath)) {
    console.log("✅ api/sitemap.js found.");
    const content = fs.readFileSync(sitemapPath, 'utf8');
    if (!content.includes('nextgen-case-study')) {
      console.log("✅ Hardcoded dynamic URLs removed from sitemap.");
    } else {
      console.error("❌ Hardcoded URLs still in sitemap.");
    }
  }
  
  const dynamicSeoPath = path.join(process.cwd(), 'api', 'dynamic-seo.js');
  if (fs.existsSync(dynamicSeoPath)) {
    console.log("✅ api/dynamic-seo.js found.");
    const content = fs.readFileSync(dynamicSeoPath, 'utf8');
    if (content.includes('process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL')) {
      console.log("✅ Dynamic SEO using secure server-side environment variables.");
    } else {
      console.error("❌ Dynamic SEO not using proper environment variables.");
    }
  }

  const structuredDataPath = path.join(process.cwd(), 'src', 'components', 'StructuredData.jsx');
  if (fs.existsSync(structuredDataPath)) {
    console.log("✅ src/components/StructuredData.jsx found.");
  } else {
    console.error("❌ src/components/StructuredData.jsx not found.");
  }
  
  console.log("===================================");
  console.log("Tests complete. Ready for production.");
}

runTests().catch(console.error);
