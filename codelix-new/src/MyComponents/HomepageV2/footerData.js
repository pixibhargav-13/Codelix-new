/* shared footer keyword lists — only the real services and industries we
   actually list on ServicesV2.jsx / IndustriesV2.jsx, not a padded list.
   Single source of truth so every v2 page's footer stays in sync. */

export const FOOTER_SERVICE_KEYWORDS = [
  { label: "Web Development", path: "/services-v2/web-development" },
  { label: "Application Development", path: "/services-v2/application-development" },
  { label: "UI/UX Design", path: "/services-v2/ui-ux-design" },
  { label: "E-Commerce Solutions", path: "/services-v2/e-commerce-solutions" },
  { label: "Custom Software Development", path: "/services-v2/custom-software-development" },
  { label: "AI Development", path: "/services-v2/ai-development" },
  { label: "Data Analytics", path: "/services-v2/data-analytics" },
];

export const FOOTER_INDUSTRY_KEYWORDS = [
  { label: "Corporate & B2B", path: "/industries-v2#corporate" },
  { label: "Startups & SaaS", path: "/industries-v2#startups" },
  { label: "Retail & D2C", path: "/industries-v2#retail" },
  { label: "Education", path: "/industries-v2#education" },
  { label: "Healthcare", path: "/industries-v2#healthcare" },
  { label: "Finance & Legal", path: "/industries-v2#finance" },
];
