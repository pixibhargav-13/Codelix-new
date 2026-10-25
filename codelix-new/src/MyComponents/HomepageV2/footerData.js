/* shared footer keyword lists — only the real services and industries we
   actually list on ServicesV2.jsx / IndustriesV2.jsx, not a padded list.
   Single source of truth so every v2 page's footer stays in sync. */

/* blurb is a trimmed version of the real one-liner already used on
   ServicesV2.jsx (cut at the em-dash where one exists) — short enough for
   the nav dropdown card, not new/invented copy. */
export const FOOTER_SERVICE_KEYWORDS = [
  { label: "Web Development", path: "/services/web-development", blurb: "Modern websites and web applications tailored to your business needs." },
  { label: "Application Development", path: "/services/application-development", blurb: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch." },
  { label: "UI/UX & Product Design", path: "/services/ui-ux-design", blurb: "UX research, wireframes, prototypes, design systems, and accessibility." },
  { label: "E-Commerce Solutions", path: "/services/e-commerce-solutions", blurb: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations." },
  { label: "Enterprise Software Solutions", path: "/services/custom-software-development", blurb: "ERP, CRM, workflow automation, legacy modernization, and integrations." },
  { label: "AI & Automation Solutions", path: "/services/ai-development", blurb: "AI agents, chatbots, generative AI, and workflow automation that works." },
  { label: "Data Analytics & Business Intelligence", path: "/services/data-analytics", blurb: "Dashboards, reporting, data visualization, and predictive analytics." },
  { label: "Support & Managed Services", path: "/services/support-managed-services", blurb: "Ongoing maintenance, technical support, and dedicated team augmentation." },
];

/* 18 additional service pages — dedicated pages exist for each (see
   ServiceDetailV2/additionalServicesData.js + AdditionalServiceDetailV2.jsx)
   but per the brief they're surfaced only from the footer, not the main
   nav dropdown or the ServicesV2 grid. */
export const FOOTER_MORE_SERVICES = [
  { label: "SaaS Product Development", path: "/services/saas-product-development" },
  { label: "Cloud Solutions & Migration", path: "/services/cloud-solutions-migration" },
  { label: "API Development & Integration", path: "/services/api-development-integration" },
  { label: "Workflow Automation", path: "/services/workflow-automation" },
  { label: "ERP & CRM Development", path: "/services/erp-crm-development" },
  { label: "AI Agent Development", path: "/services/ai-agent-development" },
  { label: "Generative AI Solutions", path: "/services/generative-ai-solutions" },
  { label: "Cloud Infrastructure Services", path: "/services/cloud-infrastructure-services" },
  { label: "UX Research & Design Systems", path: "/services/ux-research-design-systems" },
  { label: "Marketplace Development", path: "/services/marketplace-development" },
  { label: "Payment Integration Services", path: "/services/payment-integration-services" },
  { label: "Legacy System Modernization", path: "/services/legacy-system-modernization" },
  { label: "Business Intelligence Solutions", path: "/services/business-intelligence-solutions" },
  { label: "Predictive Analytics", path: "/services/predictive-analytics" },
  { label: "Data Engineering", path: "/services/data-engineering" },
  { label: "Performance Optimization", path: "/services/performance-optimization" },
  { label: "Security & Maintenance", path: "/services/security-maintenance" },
  { label: "Dedicated Development Teams", path: "/services/dedicated-development-teams" },
];

/* single merged, alphabetised list for the footer's "Services" strip —
   all 8 core services plus all 18 additional ones in one arranged row,
   instead of two separate rows. The nav dropdown and ServicesV2 grid
   still use FOOTER_SERVICE_KEYWORDS on its own (unchanged, blurbs intact,
   core 8 only) — this combined list is footer-only. */
export const FOOTER_ALL_SERVICES = [...FOOTER_SERVICE_KEYWORDS, ...FOOTER_MORE_SERVICES]
  .map(({ label, path }) => ({ label, path }))
  .sort((a, b) => a.label.localeCompare(b.label));

/* each industry now has its own detail page (see
   IndustriesV2/industriesData.js + IndustryDetailV2.jsx) — these used to
   point at #slug anchors on the listing page, which never scrolled
   anywhere since no element on that page carried a matching id. */
export const FOOTER_INDUSTRY_KEYWORDS = [
  { label: "Manufacturing", path: "/industries/manufacturing" },
  { label: "FinTech", path: "/industries/fintech" },
  { label: "AI & Data", path: "/industries/ai-data" },
  { label: "Healthcare", path: "/industries/healthcare" },
  { label: "Food & Beverages", path: "/industries/food-beverages" },
  { label: "E-Commerce", path: "/industries/e-commerce" },
  { label: "Real Estate & Construction", path: "/industries/real-estate-construction" },
  { label: "Education", path: "/industries/education" },
  { label: "Startups", path: "/industries/startups" },
  { label: "B2B SaaS", path: "/industries/b2b-saas" },
  { label: "Travel & Hospitality", path: "/industries/travel-hospitality" },
];

export const NAVBAR_SERVICES_HIERARCHY = [
  {
    title: "Web Development",
    path: "/services/web-development",
    items: [
      { label: "Performance Optimization", path: "/services/performance-optimization" }
    ]
  },
  {
    title: "Application Development",
    path: "/services/application-development",
    items: [
      { label: "SaaS Product Development", path: "/services/saas-product-development" }
    ]
  },
  {
    title: "UI/UX & Product Design",
    path: "/services/ui-ux-design",
    items: [
      { label: "UX Research & Design Systems", path: "/services/ux-research-design-systems" }
    ]
  },
  {
    title: "E-Commerce Solutions",
    path: "/services/e-commerce-solutions",
    items: [
      { label: "Marketplace Development", path: "/services/marketplace-development" },
      { label: "Payment Integration Services", path: "/services/payment-integration-services" }
    ]
  },
  {
    title: "Enterprise Software Solutions",
    path: "/services/custom-software-development",
    items: [
      { label: "ERP & CRM Development", path: "/services/erp-crm-development" },
      { label: "API Development & Integration", path: "/services/api-development-integration" },
      { label: "Legacy System Modernization", path: "/services/legacy-system-modernization" }
    ]
  },
  {
    title: "AI & Automation Solutions",
    path: "/services/ai-development",
    items: [
      { label: "AI Agent Development", path: "/services/ai-agent-development" },
      { label: "Generative AI Solutions", path: "/services/generative-ai-solutions" },
      { label: "Workflow Automation", path: "/services/workflow-automation" }
    ]
  },
  {
    title: "Data Analytics & Business Intelligence",
    path: "/services/data-analytics",
    items: [
      { label: "Business Intelligence Solutions", path: "/services/business-intelligence-solutions" },
      { label: "Predictive Analytics", path: "/services/predictive-analytics" },
      { label: "Data Engineering", path: "/services/data-engineering" }
    ]
  },
  {
    title: "Support & Managed Services",
    path: "/services/support-managed-services",
    items: [
      { label: "Cloud Solutions & Migration", path: "/services/cloud-solutions-migration" },
      { label: "Cloud Infrastructure Services", path: "/services/cloud-infrastructure-services" },
      { label: "Security & Maintenance", path: "/services/security-maintenance" },
      { label: "Dedicated Development Teams", path: "/services/dedicated-development-teams" }
    ]
  }
];

/* the per-technology hire pages (HireDevelopersV2/hireDevelopersData.js).
   Footer and sitemap are what give them internal links from every page;
   the labels are the queries the pages are written for. Listed here rather
   than imported, so every page's footer doesn't pull in all the page copy. */
export const FOOTER_HIRE = [
  { label: "Hire Dedicated Developers", path: "/hire-developers" },
  { label: "Hire React Developers", path: "/hire-developers/react" },
  { label: "Hire Node.js Developers", path: "/hire-developers/nodejs" },
  { label: "Hire Laravel Developers", path: "/hire-developers/laravel" },
  { label: "Hire Python Developers", path: "/hire-developers/python" },
  { label: "Hire Flutter Developers", path: "/hire-developers/flutter" },
  { label: "Hire Android Developers", path: "/hire-developers/android" },
  { label: "Hire iOS Developers", path: "/hire-developers/ios" },
  { label: "Hire Next.js Developers", path: "/hire-developers/nextjs" },
  { label: "Hire Full-Stack Developers", path: "/hire-developers/full-stack" },
  { label: "Hire AI Developers", path: "/hire-developers/ai" },
  { label: "Hire Shopify Developers", path: "/hire-developers/shopify" },
  { label: "Hire Angular Developers", path: "/hire-developers/angular" },
  { label: "Hire Vue.js Developers", path: "/hire-developers/vuejs" },
  { label: "Hire React Native Developers", path: "/hire-developers/react-native" },
  { label: "Hire Java Developers", path: "/hire-developers/java" },
  { label: "Hire PHP Developers", path: "/hire-developers/php" },
  { label: "Hire MERN Stack Developers", path: "/hire-developers/mern" },
  { label: "Hire WordPress Developers", path: "/hire-developers/wordpress" },
  { label: "Hire DevOps Engineers", path: "/hire-developers/devops" },
  { label: "Hire QA Testers", path: "/hire-developers/qa" },
  { label: "Hire UI/UX Designers", path: "/hire-developers/ui-ux-designers" },
];

export const FOOTER_PRODUCTS = [
  { label: "Audytee", path: "/products/audytee" },
  /* 4bitx is unlisted for now; its page stays live at /products/4bitx */
  // { label: "4bitx", path: "/products/4bitx" },
  { label: "Codelix ERP", path: "/products/codelix-erp" },
  { label: "AanganOne", path: "/products/aanganone" }
];

/* Everything here was reachable from the mobile drawer and nowhere else, which
   left About, Team, Work, Process, Technologies, Pricing and FAQ sitting on
   exactly the same number of internal links as the terms and privacy pages -
   86 apiece. Google had nothing to separate the pages worth surfacing from
   the legal boilerplate, and picked the boilerplate for a sitelink. Case
   Studies was worse: 31 links, the weakest page on the site.

   The labels are written to say what the page is rather than to be short.
   Anchor text is most of what Google has to go on when it decides what to
   call a link, and "Our Work" tells it more than "Work" does. */
export const FOOTER_COMPANY = [
  { label: "About Us", path: "/about" },
  { label: "Our Team", path: "/team" },
  { label: "Our Work", path: "/work" },
  { label: "Case Studies", path: "/case-study" },
  { label: "Our Process", path: "/process" },
  { label: "Technologies", path: "/technologies" },
  { label: "Pricing", path: "/pricing" },
  { label: "Cost Calculator", path: "/software-development-cost-calculator" },
  { label: "FAQ", path: "/faq" },
  { label: "Blog", path: "/blog" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/contact" }
];
