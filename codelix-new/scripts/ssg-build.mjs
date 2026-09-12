import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { createClient } from "@supabase/supabase-js";
import jsesc from "jsesc";
import { getGeneratedRoutes } from "../src/lib/route-config.js";
import { seoData } from "../src/lib/seoData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import dotenv from "dotenv";
if (fs.existsSync(path.resolve(__dirname, "../.env.local"))) {
  dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
} else {
  dotenv.config();
}

/* No fallbacks. These used to default to a different project's URL and a
   placeholder key, so a missing variable did not fail the build — it built
   against the wrong database, fetched nothing, and prerendered a site with
   no Supabase content at all. Failing loudly here is the point: the whole
   blog and case-study prerender depends on this connection. */
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "\n❌ VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set.\n" +
    "   Locally they come from .env.local; on Vercel from the project's\n" +
    "   environment variables. Without them nothing from Supabase — blog\n" +
    "   posts, case studies — reaches the prerendered HTML.\n"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function build() {
  console.log("🚀 Starting SSG build process...");

  // 1. Fetch dynamic data from Supabase
  console.log("Fetching case studies from Supabase...");
  const { data: caseStudiesRaw, error: caseStudiesError } = await supabase
    .from("case_studies")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (caseStudiesError) {
    console.error("❌ Error fetching case studies:", caseStudiesError.message);
  } else {
    console.log(`✅ Fetched ${caseStudiesRaw?.length || 0} case studies`);
  }

  console.log("Fetching blog posts from Supabase...");
  const { data: blogPostsRaw, error: blogPostsError } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (blogPostsError) {
    console.error("❌ Error fetching blog posts:", blogPostsError.message);
  } else {
    console.log(`✅ Fetched ${blogPostsRaw?.length || 0} blog posts`);
  }

  // Map to the format the application expects
  const caseStudies = (caseStudiesRaw || []).map((cs) => {
    const challengeImages = [
      cs.challenge_image_1_url ? { src: cs.challenge_image_1_url, alt: cs.challenge_image_1_alt || "" } : null,
      cs.challenge_image_2_url ? { src: cs.challenge_image_2_url, alt: cs.challenge_image_2_alt || "" } : null,
    ].filter(Boolean);

    return {
      slug: cs.slug,
      title: cs.title,
      description: cs.description,
      category: cs.category,
      industry: cs.industry || cs.category,
      tags: cs.tags?.length ? cs.tags : [],
      tools: cs.tools?.length ? cs.tools : cs.tags || [],
      overview: cs.overview || [],
      outcomes: cs.outcomes || [],
      challenges: cs.challenges || [],
      solutions: cs.solutions || [],
      image: cs.cover_image_url || "https://laravel.com/img/logomark.min.svg",
      isConcept: !!cs.is_concept,
      snapshot: cs.snapshot?.length ? cs.snapshot : undefined,
      challengeImages: challengeImages.length ? challengeImages : undefined,
      process: cs.process?.length ? cs.process : undefined,
      resultsNote: cs.results_note || undefined,
      services: cs.services?.length ? cs.services : undefined,
      features: cs.features?.length ? cs.features : undefined,
      whyStack: cs.why_stack?.length ? cs.why_stack : undefined,
      quote: cs.quote_text ? { text: cs.quote_text, role: cs.quote_role || "", name: cs.quote_name || "" } : undefined,
    };
  });

  const blogPosts = (blogPostsRaw || []).map((p) => ({
    id: `sb-${p.id}`,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    date: p.published_at ? new Date(p.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "",
    readTime: p.read_time || "",
    image: p.cover_image_url || "",
    tags: p.tags?.length ? p.tags : ["All Articles"],
    content: p.content,
  }));

  const initialData = { caseStudies, blogPosts };

  // 2. Get all static routes
  const staticRoutes = getGeneratedRoutes();
  
  // 3. Append dynamic routes
  const dynamicRoutes = [
    ...caseStudies.map((cs) => `/case-study/${cs.slug}`),
    ...blogPosts.map((bp) => `/blog/${bp.slug}`),
  ];

  const allRoutes = [...new Set([...staticRoutes, ...dynamicRoutes])]; // Unique routes
  
  // 4. Load the generated HTML template and SSR render function
  const templatePath = path.resolve(__dirname, "../dist/index.html");
  const template = fs.readFileSync(templatePath, "utf-8");
  
  // The server entry file generated by Vite
  const serverEntryPath = path.resolve(__dirname, "../dist-server/entry-server.js");
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  console.log(`Pre-rendering ${allRoutes.length} pages...`);

  // Safe stringification for initial data
  const safeInitialData = jsesc(initialData, {
    isScriptContext: true,
    json: true,
    wrap: true
  });

  for (const url of allRoutes) {
    try {
      const { appHtml, helmet } = render(url, initialData);

      let html = template;

      /* react-helmet-async's context extraction returns nothing under React 19 -
         helmet comes back undefined and the SEO tags render inline into the app
         markup instead, which leaves them inside <div id="root">. A browser hoists
         them into <head> at hydration, so Google (which runs JS) has been fine;
         anything reading the HTML without executing it is not. That includes
         Lighthouse, which reports no meta description, and every social scraper -
         Facebook, LinkedIn, WhatsApp, Twitter - which sees no OG tags and renders
         a shared link with no title, description or preview image.

         So lift them into the head here. Copied rather than moved: renderToString
         emitted them as ordinary children, so React expects them at those
         positions when it hydrates and removing them would mismatch every page. */
      const hoistable = [
        ...(appHtml.match(/<title>[\s\S]*?<\/title>/g) || []),
        ...(appHtml.match(/<meta\b[^>]*?>/g) || []),
        ...(appHtml.match(/<link\b[^>]*?rel="(?:canonical|preload)"[^>]*?>/g) || []),
      ];
      const helmetTags = helmet
        ? `
        ${helmet.title?.toString() || ''}
        ${helmet.meta?.toString() || ''}
        ${helmet.link?.toString() || ''}
      `
        : hoistable.join(String.fromCharCode(10));

      /* Nineteen page components read from Supabase the moment they mount, and
         the first of those requests pays for a DNS lookup and a TLS handshake
         to an origin the browser has never seen. Nothing in the markup hints at
         that origin, so the connection cannot start until the bundle has parsed
         and a component has asked for data — measured at about half a second
         into the load. A preconnect moves the handshake into that window
         instead of after it. crossorigin because these are CORS fetches; the
         hint has to match the request or the browser opens a second
         connection. Injected from the env var rather than hardcoded, so it
         stays correct if the project URL changes. */
      const preconnect = `<link rel="preconnect" href="${new URL(supabaseUrl).origin}" crossorigin>`;
      html = html.replace('</head>', `${preconnect}\n</head>`);

      // Inject helmet tags before </head>
      if (helmetTags) {
        html = html.replace('</head>', `${helmetTags}\n</head>`);
      }

      /* Moved, not copied. The note above used to say these had to stay in the
         body or hydration would mismatch every page; that turns out not to be
         how React 19 behaves. It hoists title/meta/link into <head> itself on
         the client, takes ownership of the copies there, and leaves whatever
         was rendered inline in the body untouched — a client-side navigation
         updates <head> correctly while the body copy keeps the previous
         page's title forever. So they are not hydration anchors, they are
         orphans: invalid inside <body>, never read, never updated. */
      const bodyHtml = hoistable.reduce((acc, tag) => acc.replace(tag, ''), appHtml);

      // Inject the rendered app HTML
      html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

      /* The homepage intro mounts from a React effect, which only runs after
         hydration — so the prerendered page painted first and the plate
         dropped over it a moment later, producing a visible flash of the
         homepage. This paints the plate in the markup itself, before any JS
         runs, and PageLoader removes it once its own plate is on screen.
         Homepage only: every other route must never be covered. The inline
         timeout is a safety net so a JS failure can't leave the site hidden. */
      if (url === "/") {
        html = html.replace(
          "<body>",
          `<body>
  <style>#pl-preboot{position:fixed;inset:0;z-index:9998;background:#050507}</style>
  <div id="pl-preboot"></div>
  <script>setTimeout(function(){var e=document.getElementById('pl-preboot');if(e&&e.parentNode)e.parentNode.removeChild(e);},4000)</script>`
        );
      }

      // Inject the initial data before closing body
      html = html.replace(
        '</body>',
        `<script>window.__INITIAL_DATA__ = ${safeInitialData};</script>\n</body>`
      );

      // Save to physical file
      const isRoot = url === "/";
      const destDir = isRoot
        ? path.resolve(__dirname, "../dist")
        : path.resolve(__dirname, `../dist${url}`);
      
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      const destFile = path.resolve(destDir, "index.html");
      fs.writeFileSync(destFile, html);
      console.log(`✅ Prerendered ${url}`);

    } catch (error) {
      console.error(`❌ Error prerendering ${url}:`, error);
    }
  }

  // 5. Generate Sitemap
  console.log("Generating sitemap.xml...");
  /* lastmod tells Google which pages are worth revisiting; without it
     every URL in the sitemap looks equally stale. */
  const buildDate = new Date().toISOString().slice(0, 10);
  /* a page carrying noindex has no business in the sitemap - the file would
     be asking Google to index exactly what the tag tells it not to */
  const sitemapRoutes = allRoutes.filter(
    (url) => !(seoData[url] && seoData[url].robots && seoData[url].robots.includes("noindex"))
  );
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map((url) => `  <url>\n    <loc>https://www.codelixitsolutions.com${url}</loc>\n    <lastmod>${buildDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${url === '/' ? '1.0' : '0.8'}</priority>\n  </url>`)
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.resolve(__dirname, "../dist/sitemap.xml"), sitemapXml);
  console.log("✅ Sitemap generated");
  
  console.log("🎉 SSG Build Complete!");
}

build().catch((err) => {
  console.error("SSG Build Failed:", err);
  process.exit(1);
});
