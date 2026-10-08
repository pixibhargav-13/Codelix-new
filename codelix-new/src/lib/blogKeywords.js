/* meta keywords for each blog post, keyed by slug. Posts come from Supabase,
   so a post written later through the admin panel has no entry here — for
   those, blogKeywordsFor() builds a set from the post's own tags instead. */
const BLOG_KEYWORDS = {
  "why-digital-presence-matters-more-than-ever-in-2025": "digital presence for business, online presence 2025, business website importance, digital marketing for small business, SEO for business, website development Ahmedabad, brand visibility online",
  "design-system-component-based-uis-efficiency-at-scale": "design system, component-based UI, UI component library, design tokens, scalable UI design, React component library, UI/UX design company Ahmedabad",
  "progressive-web-apps-pwas-as-the-new-standard": "progressive web apps, PWA development, what is a PWA, PWA vs native app, offline web app, service workers, PWA development company India",
  "saas-vs-on-premise-whats-best-for-your-business": "SaaS vs on-premise, cloud vs on-premise software, SaaS benefits, on-premise software pros and cons, SaaS product development, cloud software for business",
  "how-e-commerce-platforms-boost-retail-transformation": "e-commerce platform, retail digital transformation, online store development, e-commerce website development Ahmedabad, omnichannel retail, e-commerce for retailers",
  "how-end-to-end-web-development-delivers-better-results": "end-to-end web development, full-stack web development, web development process, web development company Ahmedabad, custom website development, web application development",
  "top-5-reasons-to-choose-laravel-for-faster-web-app-development": "Laravel development, why choose Laravel, Laravel web app development, PHP framework, Laravel development company Ahmedabad, Laravel vs other frameworks",
  "ai-powered-solutions-transforming-modern-businesses": "AI solutions for business, AI in business, business automation with AI, AI development company India, generative AI for business, AI agents, machine learning solutions",
  "mastering-wordpress-advanced-cms-techniques": "WordPress development, advanced WordPress techniques, WordPress CMS, custom WordPress themes, WordPress plugins, WordPress development company Ahmedabad",
  "building-scalable-web-applications-with-modern-frameworks": "scalable web applications, modern web frameworks, React, Next.js, Node.js, web app architecture, web application development company",
  "the-future-of-mobile-app-development-trends-and-insights": "mobile app development trends, future of mobile apps, cross-platform app development, Flutter, React Native, AI in mobile apps, mobile app development company Ahmedabad",
  "optimizing-user-experience-through-better-uiux-design": "user experience optimization, UI/UX design, UX best practices, usability, conversion-focused design, UI/UX design company Ahmedabad",
};

export const blogKeywordsFor = (slug, tags = []) => {
  if (BLOG_KEYWORDS[slug]) return BLOG_KEYWORDS[slug];
  const fromTags = tags.filter((t) => t && t !== "All Articles");
  return [...fromTags, "Codelix blog", "Codelix IT Solutions"].join(", ");
};
