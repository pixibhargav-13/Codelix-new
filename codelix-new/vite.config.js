import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false,
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
})
