/* shared footer keyword lists — only the real services and industries we
   actually list on ServicesV2.jsx / IndustriesV2.jsx, not a padded list.
   Single source of truth so every v2 page's footer stays in sync. */

/* blurb is a trimmed version of the real one-liner already used on
   ServicesV2.jsx (cut at the em-dash where one exists) — short enough for
   the nav dropdown card, not new/invented copy. */
export const FOOTER_SERVICE_KEYWORDS = [
  { label: "Web Development", path: "/services-v2/web-development", blurb: "Modern websites and web applications tailored to your business needs." },
  { label: "Application Development", path: "/services-v2/application-development", blurb: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch." },
  { label: "UI/UX & Product Design", path: "/services-v2/ui-ux-design", blurb: "UX research, wireframes, prototypes, design systems, and accessibility." },
  { label: "E-Commerce Solutions", path: "/services-v2/e-commerce-solutions", blurb: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations." },
  { label: "Enterprise Software Solutions", path: "/services-v2/custom-software-development", blurb: "ERP, CRM, workflow automation, legacy modernization, and integrations." },
  { label: "AI & Automation Solutions", path: "/services-v2/ai-development", blurb: "AI agents, chatbots, generative AI, and workflow automation that works." },
  { label: "Data Analytics & Business Intelligence", path: "/services-v2/data-analytics", blurb: "Dashboards, reporting, data visualization, and predictive analytics." },
  { label: "Support & Managed Services", path: "/services-v2/support-managed-services", blurb: "Ongoing maintenance, technical support, and dedicated team augmentation." },
];

export const FOOTER_INDUSTRY_KEYWORDS = [
  { label: "Manufacturing", path: "/industries-v2#manufacturing" },
  { label: "FinTech", path: "/industries-v2#fintech" },
  { label: "AI & Data", path: "/industries-v2#ai-data" },
  { label: "Healthcare", path: "/industries-v2#healthcare" },
  { label: "Food & Beverages", path: "/industries-v2#food-beverages" },
  { label: "E-Commerce", path: "/industries-v2#e-commerce" },
  { label: "Real Estate & Construction", path: "/industries-v2#real-estate-construction" },
  { label: "Education", path: "/industries-v2#education" },
  { label: "Startups", path: "/industries-v2#startups" },
  { label: "B2B SaaS", path: "/industries-v2#b2b-saas" },
  { label: "Travel & Hospitality", path: "/industries-v2#travel-hospitality" },
];
