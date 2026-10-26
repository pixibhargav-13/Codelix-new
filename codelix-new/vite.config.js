import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

/* `vite preview` only serves a prerendered page at its trailing-slash URL;
   for /industries/healthcare it falls back to dist/index.html, the HOMEPAGE.
   React then hydrates the healthcare route onto homepage markup and throws
   hydration error #418 on every page but /. Vercel, Netlify and the
   .htaccess all serve dist/<path>/index.html for that URL, so the error never
   happened in production - only locally, where it looked like a real bug.
   This maps the URL the way the hosts do, and sends unknown URLs to 404.html
   as Vercel does. */
const previewLikeHost = () => ({
  name: 'preview-like-host',
  configurePreviewServer(server) {
    const dist = path.resolve(server.config.root, server.config.build.outDir)
    server.middlewares.use((req, res, next) => {
      const [pathname, query = ''] = req.url.split('?')
      if (pathname === '/' || path.extname(pathname)) return next()
      const page = path.join(dist, decodeURIComponent(pathname), 'index.html')
      if (fs.existsSync(page)) {
        req.url = `${pathname.replace(/\/+$/, '')}/index.html${query ? `?${query}` : ''}`
      } else if (!pathname.startsWith('/admin') && fs.existsSync(path.join(dist, '404.html'))) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        return res.end(fs.readFileSync(path.join(dist, '404.html')))
      }
      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ command, isSsrBuild }) => ({
  plugins: [react(), previewLikeHost()],
  resolve: {
    alias: [
      /* react-router 7's package.json maps every import condition to its
         dist/development build, so production bundles shipped the dev
         build — larger, and running dev-only checks on every navigation.
         The production build has the identical export list. Exact match
         only; react-router-dom re-exports it, so both resolve to this copy.

         Client production build only. The SSR build leaves node_modules
         external, so Node loads react-router-dom and its own react-router
         there; aliasing the app's imports to a second copy gave the router
         two contexts and every useLocation() failed. The dev server keeps
         the development build for its warnings. */
      ...(command === "build" && !isSsrBuild
        ? [{
            find: /^react-router$/,
            replacement: fileURLToPath(new URL("./node_modules/react-router/dist/production/index.mjs", import.meta.url)),
          }]
        : []),
    ],
  },
  build: {
    /* Each route's CSS ships with its own chunk, so a page only downloads,
       parses and matches the styles it uses — one 334KB stylesheet for every
       page cost a phone ~1s of style and layout at load. The prerender
       (scripts/ssg-build.mjs) reads the manifest to link each page's CSS in
       its HTML, so a prerendered page is styled before any JS runs. */
    cssCodeSplit: true,
    /* Vite's default inlines every image under 4KB as a data: URI in the JS.
       All images share the site-images chunk, so that put 45 SVG logos
       (~138KB) in a script every page downloaded, competing with the CSS for
       bandwidth before first paint. As files, each image loads only on the
       page that shows it, and doesn't block rendering. */
    assetsInlineLimit: 1024,
    manifest: true,
    rollupOptions: {
      output: {
        /* Rollup emits a separate file for every module shared between two or
           more routes, which meant ~38 chunks of 300-1300 bytes each (one per
           tech-stack logo, one per icon) requested in a burst once the page
           chunk resolved. Each is a full round trip, and behind Cloudflare
           each was costing seconds. Grouping collapses that into a couple of
           requests.

           node_modules deliberately goes into ONE chunk. Splitting it per
           package (vendor-react / vendor-gsap / …) tripped a circular import
           between packages and threw "Cannot access 'f' before
           initialization" at runtime — chunk boundaries change module
           evaluation order, so packages that import each other must stay
           together. */
        manualChunks(id) {
          /* node_modules is deliberately NOT grouped here. Forcing it into one
             chunk put the Supabase client (~208KB, admin-only) on every public
             page, and splitting it per package tripped a circular import
             between packages — "Cannot access 'f' before initialization" —
             because chunk boundaries change module evaluation order. Rollup's
             own splitting gets both right: shared deps land in chunks loaded
             only by the routes that need them. */
          /* Do NOT pull lucide-react (or any node_modules package) into its
             own chunk. It reads React at module scope, and once it lands in a
             separate chunk it can evaluate before React does:
             "Cannot read properties of undefined (reading 'forwardRef')".
             The same class of failure as splitting vendor per package. Its
             icons stay as small chunks; that is the lesser cost. */
          if (id.includes('/MyComponents/Images/')) return 'site-images';

          /* small components shared by most routes (CtaSection, FaqSection,
             ClientStrip, …) were each their own sub-2KB request; they import
             each other, so keeping them in ONE chunk also avoids any
             cross-chunk init-order problem */
          if (id.includes('/MyComponents/Shared/')) return 'site-shared';
          if (id.includes('/lib/splitTitleLines') || id.includes('/lib/introGate')) return 'site-shared';
          if (
            id.includes('/MyComponents/HomepageV2/techStack') ||
            id.includes('/MyComponents/HomepageV2/clientLogos') ||
            id.includes('/MyComponents/HomepageV2/footerData')
          ) {
            return 'site-data';
          }
        },
      },
    },
  },
}))
