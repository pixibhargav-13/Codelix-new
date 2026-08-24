/* slug list only, kept separate from src/data/blogData.js so route-config.js
   (imported as raw source by scripts/ssg-build.mjs under plain Node ESM,
   no bundler) never has to resolve the image imports blogData.js pulls in
   — Node can't load .png as a module. Values match blogData.js's
   slugify(title) output exactly. */
export const BLOG_POST_SLUGS = [
  "why-digital-presence-matters-more-than-ever-in-2025",
  "design-system-component-based-uis-efficiency-at-scale",
  "progressive-web-apps-pwas-as-the-new-standard",
  "saas-vs-on-premise-whats-best-for-your-business",
  "how-e-commerce-platforms-boost-retail-transformation",
  "how-end-to-end-web-development-delivers-better-results",
  "top-5-reasons-to-choose-laravel-for-faster-web-app-development",
  "ai-powered-solutions-transforming-modern-businesses",
  "mastering-wordpress-advanced-cms-techniques",
  "building-scalable-web-applications-with-modern-frameworks",
  "the-future-of-mobile-app-development-trends-and-insights",
  "optimizing-user-experience-through-better-uiux-design",
];
