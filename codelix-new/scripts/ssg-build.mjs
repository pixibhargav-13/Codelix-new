import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { createClient } from "@supabase/supabase-js";
import jsesc from "jsesc";
import { getGeneratedRoutes } from "../src/lib/route-config.js";
import { seoData } from "../src/lib/seoData.js";
import { INTRO_MEDIA, INTRO_SEEN_KEY } from "../src/lib/introGate.js";
import { createRouteCss } from "./route-css.mjs";
import { createPageDates } from "./page-dates.mjs";
import { caseStudyFromRow } from "../src/lib/caseStudyRow.js";

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

  /* Every blog post and case study lives only in Supabase now. A failed or
     empty read would publish a site with no blog and no case studies, so
     fail the build instead: Vercel then keeps the last good deploy live. */
  if (caseStudiesError || blogPostsError || !caseStudiesRaw?.length || !blogPostsRaw?.length) {
    throw new Error(
      `Supabase returned ${caseStudiesError ? "an error" : `${caseStudiesRaw?.length || 0} case studies`} and ${blogPostsError ? "an error" : `${blogPostsRaw?.length || 0} blog posts`}; refusing to build a site without them`
    );
  }

  /* the same mapping useCaseStudies applies in the browser, so the
     prerendered page and the one React hydrates are built from one object */
  const caseStudies = (caseStudiesRaw || []).map(caseStudyFromRow);

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

  /* useBlogPosts maps raw blog_posts rows itself (published_at,
     cover_image_url, read_time, updated_at…), so it is handed the rows as
     Supabase returns them. Passing the pre-mapped objects above left every
     Supabase post prerendered without its date, read time or cover. */
  const initialData = { caseStudies, blogPosts: blogPostsRaw || [] };

  // 2. Get all static routes
  const staticRoutes = getGeneratedRoutes();
  
  // 3. Append dynamic routes
  const dynamicRoutes = [
    ...caseStudies.map((cs) => `/case-study/${cs.slug}`),
    ...blogPosts.map((bp) => `/blog/${bp.slug}`),
  ];

  const allRoutes = [...new Set([...staticRoutes, ...dynamicRoutes])]; // Unique routes

  /* No route matches this path, so it renders NotFound (noindex) and is
     written to dist/404.html. Vercel serves that file with a real 404 status
     for any URL that isn't a prerendered page — previously vercel.json sent
     every unknown URL to the homepage with a 200, which Google reports as a
     soft 404 and which handed junk URLs an indexable copy of the homepage. */
  const NOT_FOUND_ROUTE = "/404";
  
  // 4. Load the generated HTML template and SSR render function
  const templatePath = path.resolve(__dirname, "../dist/index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  /* Per-route stylesheets (cssCodeSplit). The template already links the
     entry's CSS; each page adds the CSS of its own route chunk. The manifest
     is removed from dist afterwards — it is a build artefact, not something
     to publish. */
  const manifestDir = path.resolve(__dirname, "../dist/.vite");
  const manifest = JSON.parse(fs.readFileSync(path.join(manifestDir, "manifest.json"), "utf-8"));
  const routeCss = createRouteCss({
    appFile: path.resolve(__dirname, "../src/App.jsx"),
    srcDir: path.resolve(__dirname, "../src"),
    manifest,
  });
  const pageDates = createPageDates(path.resolve(__dirname, ".."));
  /* after the LAST entry stylesheet: a page's own CSS overrides the shared
     base, so it has to come after it — the same order Vite gives it when
     the route chunk loads on client-side navigation */
  const entryCssLinks = [...template.matchAll(/<link rel="stylesheet"[^>]*href="\/assets\/[^"]+\.css"[^>]*>/g)];
  if (!entryCssLinks.length) throw new Error("No entry stylesheet link in dist/index.html");
  const entryCssLink = entryCssLinks[entryCssLinks.length - 1];
  
  // The server entry file generated by Vite
  const serverEntryPath = path.resolve(__dirname, "../dist-server/entry-server.js");
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  console.log(`Pre-rendering ${allRoutes.length} pages...`);

  /* window.__INITIAL_DATA__ used to carry every post and case study in full
     on every page — 240 KB, half to three quarters of each page's HTML. Only
     the post or case study a page is about needs its body; every other page
     shows them as cards and lists. So each route gets the full text of its
     own post or study only, and a page that reads neither list during the
     render gets neither. The same slimmed object is handed to render() as
     to the browser, so the prerendered markup and the page React hydrates
     are built from identical data. */
  const STUDY_DETAIL_FIELDS = ["overview", "outcomes", "challenges", "solutions", "snapshot", "challengeImages", "process", "resultsNote", "services", "features", "whyStack", "scalability", "quote"];
  const slimStudy = (cs) => Object.fromEntries(Object.entries(cs).filter(([k]) => !STUDY_DETAIL_FIELDS.includes(k)));
  const dataFor = (url) => {
    const blogSlug = (url.match(/^\/blog\/([^/]+)$/) || [])[1];
    const studySlug = (url.match(/^\/case-study\/([^/]+)$/) || [])[1];
    return {
      caseStudies: initialData.caseStudies.map((cs) => (cs.slug === studySlug ? cs : slimStudy(cs))),
      blogPosts: initialData.blogPosts.map((p) => (p.slug === blogSlug ? p : { ...p, content: undefined })),
    };
  };
  /* records which lists the render actually reads */
  const recording = (data) => {
    const used = new Set();
    const view = {};
    for (const key of Object.keys(data)) {
      Object.defineProperty(view, key, { enumerable: true, get: () => (used.add(key), data[key]) });
    }
    return { view, used };
  };
  const serialize = (data) => jsesc(data, { isScriptContext: true, json: true, wrap: true });

  /* A post or case study published after the last deploy has no file of its
     own yet, so vercel.json rewrites its URL to a fallback page. That used to
     be index.html, i.e. the HOMEPAGE's prerendered HTML: the post then
     carried the homepage's canonical, description and og:image in <head>
     ahead of its own (React adds its tags but never removes static ones), so
     Google saw two canonicals, the first pointing at "/". This shell is the
     bare template instead: only site-wide tags, an empty #root (main.jsx
     mounts fresh rather than hydrating) and the page then adds its own SEO
     tags as the only ones. It stops mattering for a post at the next deploy,
     which prerenders it. */
  const preconnectLink = `<link rel="preconnect" href="${new URL(supabaseUrl).origin}" crossorigin>`;
  fs.writeFileSync(
    path.resolve(__dirname, "../dist/post-shell.html"),
    template
      .replace("</head>", `${preconnectLink}\n</head>`)
      .replace("</body>", `<script>window.__INITIAL_DATA__ = ${serialize(dataFor("/post-shell"))};</script>\n</body>`)
  );
  console.log("✅ Wrote post-shell.html (fallback for posts published after this build)");

  for (const url of [...allRoutes, NOT_FOUND_ROUTE]) {
    try {
      const routeData = dataFor(url);
      const { view, used } = recording(routeData);
      const { appHtml, helmet } = render(url, view);

      let html = template;

      const pageCss = routeCss(url)
        .filter((href) => !template.includes(`href="${href}"`))
        .map((href) => `<link rel="stylesheet" crossorigin href="${href}">`)
        .join("\n");
      if (pageCss) html = html.replace(entryCssLink[0], `${entryCssLink[0]}\n${pageCss}`);

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
        /* data-ssr marks these copies so main.jsx can remove them just before
           hydrating: React adds its own title/meta/link to <head> and does not
           adopt ones already there, so without this every tag was in the
           head twice once the page had loaded */
        : hoistable.map((tag) => tag.replace(/^<(title|meta|link)\b/, '<$1 data-ssr=""')).join(String.fromCharCode(10));

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
         timeout is a safety net so a JS failure can't leave the site hidden.

         The plate only shows where the intro will actually play — desktop
         (INTRO_MEDIA), first visit this session. Anywhere else it used to
         cover the prerendered page until the JS had loaded and hydrated,
         holding back the first paint for nothing. */
      if (url === "/") {
        html = html.replace(
          "<body>",
          `<body>
  <style>#pl-preboot{display:none}@media ${INTRO_MEDIA}{#pl-preboot{display:block;position:fixed;inset:0;z-index:9998;background:#050507}}</style>
  <div id="pl-preboot"></div>
  <script>(function(){var e=document.getElementById('pl-preboot');function rm(){if(e&&e.parentNode)e.parentNode.removeChild(e);}try{if(sessionStorage.getItem(${JSON.stringify(INTRO_SEEN_KEY)})==="1")rm();}catch(x){}setTimeout(rm,4000);})()</script>`
        );
      }

      // Inject the initial data before closing body: only the lists read
      const pageData = Object.fromEntries([...used].map((key) => [key, routeData[key]]));
      html = html.replace(
        '</body>',
        `<script>window.__INITIAL_DATA__ = ${serialize(pageData)};</script>\n</body>`
      );

      /* WebPage markup with the page's dates, for every page that is not a
         post (posts carry their own Article/BlogPosting dates from
         Supabase) and not the 404 */
      /* a post rendered from the built-in fallback data (no Supabase row)
         has no dates of its own — it gets the WebPage dates instead */
      const isDatedPost = /^\/(blog|case-study)\/[^/]+$/.test(url) && html.includes('"datePublished"');
      if (!isDatedPost && url !== NOT_FOUND_ROUTE) {
        const dates = pageDates(routeCss.sourceFor(url));
        const title = (html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/) || [])[1];
        const pageUrl = `https://www.codelixitsolutions.com${url === "/" ? "/" : url}`;
        const webPage = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: title ? title.replace(/&amp;/g, "&").replace(/&#x27;/g, "'") : undefined,
          inLanguage: "en",
          isPartOf: { "@id": "https://www.codelixitsolutions.com/#website" },
          about: { "@id": "https://www.codelixitsolutions.com/#organization" },
          publisher: { "@id": "https://www.codelixitsolutions.com/#organization" },
          datePublished: dates?.published,
          dateModified: dates?.modified,
        };
        html = html.replace(
          "</head>",
          `<script type="application/ld+json">${JSON.stringify(webPage).replace(/</g, "\\u003c")}</script>\n</head>`
        );
      }

      if (url === NOT_FOUND_ROUTE) {
        fs.writeFileSync(path.resolve(__dirname, "../dist/404.html"), html);
        console.log(`✅ Prerendered 404.html`);
        continue;
      }

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
  /* lastmod tells Google which pages are worth revisiting — but only while
     it is true. Stamping every URL with the build date made all 111 pages
     claim to change on every deploy, and Google stops trusting a sitemap's
     lastmod once it sees that. Posts use their Supabase updated_at, other
     pages the last commit to their source (the same date as their WebPage
     dateModified); a page with neither gets no lastmod rather than a fake
     one. */
  const postDates = new Map(
    [...(caseStudiesRaw || []).map((r) => [`/case-study/${r.slug}`, r]), ...(blogPostsRaw || []).map((r) => [`/blog/${r.slug}`, r])]
      .map(([url, r]) => [url, r.updated_at || r.published_at])
  );
  const lastmodFor = (url) => {
    let date = postDates.get(url);
    if (!date) {
      try {
        date = pageDates(routeCss.sourceFor(url))?.modified;
      } catch {
        date = undefined;
      }
    }
    const d = date ? new Date(date) : null;
    return d && !isNaN(d) ? d.toISOString().slice(0, 10) : null;
  };
  /* a page carrying noindex has no business in the sitemap - the file would
     be asking Google to index exactly what the tag tells it not to */
  const sitemapRoutes = allRoutes.filter(
    (url) => !(seoData[url] && seoData[url].robots && seoData[url].robots.includes("noindex"))
  );
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map((url) => {
    const lastmod = lastmodFor(url);
    return `  <url>\n    <loc>https://www.codelixitsolutions.com${url}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}    <changefreq>weekly</changefreq>\n    <priority>${url === '/' ? '1.0' : '0.8'}</priority>\n  </url>`;
  })
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.resolve(__dirname, "../dist/sitemap.xml"), sitemapXml);
  console.log("✅ Sitemap generated");

  fs.rmSync(manifestDir, { recursive: true, force: true });
  
  console.log("🎉 SSG Build Complete!");
}

build().catch((err) => {
  console.error("SSG Build Failed:", err);
  process.exit(1);
});
