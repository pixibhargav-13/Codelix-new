/* meta keywords for each built-in blog post, keyed by slug. The primary
   search phrase comes first (it is also in the post's title, description,
   first sentence and one heading), followed by the India-specific and
   question-style searches the post answers.

   Posts published later (admin panel or the scheduled writer) have no entry
   here: for those, blogKeywordsFor() builds the list from the post's title,
   which carries its primary phrase, plus its tags. */
const BLOG_KEYWORDS = {
  "why-digital-presence-matters-more-than-ever-in-2025": [
    "digital presence for business", "online presence for small business India", "why a business needs a website",
    "Google Business Profile for business", "how to improve online presence", "business website Ahmedabad",
    "local SEO India", "website for small business cost",
  ],
  "design-system-component-based-uis-efficiency-at-scale": [
    "design system", "component-based UI", "what is a design system", "design system vs style guide",
    "UI component library", "design tokens", "Figma design system", "Storybook component library",
    "design system for SaaS product",
  ],
  "progressive-web-apps-pwas-as-the-new-standard": [
    "progressive web app", "PWA vs native app", "what is a PWA", "PWA development India",
    "PWA vs Flutter app", "convert website to PWA", "PWA on iPhone", "PWA cost",
  ],
  "saas-vs-on-premise-whats-best-for-your-business": [
    "SaaS vs on-premise", "cloud vs on-premise software", "SaaS vs on-premise cost", "SaaS or custom software",
    "on-premise software pros and cons", "SaaS security", "data residency India", "SaaS for small business India",
  ],
  "how-e-commerce-platforms-boost-retail-transformation": [
    "e-commerce platform", "best e-commerce platform India", "Shopify vs WooCommerce", "custom e-commerce website",
    "how to start selling online in India", "e-commerce website development cost", "payment gateway for e-commerce India",
    "GST for online selling",
  ],
  "how-end-to-end-web-development-delivers-better-results": [
    "end-to-end web development", "full-stack web development company", "web development process",
    "how to hire a web development company", "web development contract checklist", "web development agency vs freelancer",
    "web development company Ahmedabad",
  ],
  "top-5-reasons-to-choose-laravel-for-faster-web-app-development": [
    "Laravel", "why choose Laravel", "Laravel web app development", "Laravel vs Node.js",
    "Laravel hosting", "Laravel support policy", "Laravel development company India", "is Laravel good for large applications",
  ],
  "ai-powered-solutions-transforming-modern-businesses": [
    "AI for business", "AI for small business India", "AI automation for business", "AI chatbot for business",
    "AI agents for business", "AI chatbot on WhatsApp", "cost of AI project", "AI development company India",
  ],
  "mastering-wordpress-advanced-cms-techniques": [
    "WordPress", "advanced WordPress development", "WordPress custom post types", "speed up WordPress site",
    "WordPress security", "headless WordPress", "WordPress maintenance", "WordPress vs custom website",
  ],
  "building-scalable-web-applications-with-modern-frameworks": [
    "scalable web application", "how to build a scalable web app", "best framework for scalable web app",
    "microservices vs monolith", "web application architecture", "web app hosting India", "load testing web app",
  ],
  "the-future-of-mobile-app-development-trends-and-insights": [
    "mobile app development trends", "mobile app development trends 2026", "Flutter vs React Native",
    "cross-platform app development", "AI in mobile apps", "how to publish an app on Play Store",
    "App Store developer account cost", "mobile app development India",
  ],
  "optimizing-user-experience-through-better-uiux-design": [
    "UI/UX design", "UI vs UX", "UX design process", "how to improve website conversion",
    "how to measure UX", "UX audit", "UI/UX design cost", "UI/UX design company India",
  ],
};

export const blogKeywordsFor = (slug, tags = [], title = "") => {
  if (BLOG_KEYWORDS[slug]) return [...BLOG_KEYWORDS[slug], "Codelix IT Solutions"].join(", ");
  /* the title carries the primary phrase; trailing punctuation is dropped
     so it reads as a search phrase */
  const fromTitle = title.replace(/[?.!]+$/, "").trim();
  const fromTags = tags.filter((t) => t && t !== "All Articles");
  return [...new Set([fromTitle, ...fromTags, "Codelix IT Solutions"].filter(Boolean))].join(", ");
};
