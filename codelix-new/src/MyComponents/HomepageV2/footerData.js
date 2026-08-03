/* shared footer keyword lists — only the real services and industries we
   actually list on ServicesV2.jsx / IndustriesV2.jsx, not a padded list.
   Single source of truth so every v2 page's footer stays in sync. */

/* blurb is a trimmed version of the real one-liner already used on
   ServicesV2.jsx (cut at the em-dash where one exists) — short enough for
   the nav dropdown card, not new/invented copy. */
export const FOOTER_SERVICE_KEYWORDS = [
  { label: "Web Development", path: "/services-v2/web-development", blurb: "Fast, reliable websites that look sharp and actually bring in business." },
  { label: "Application Development", path: "/services-v2/application-development", blurb: "Native and cross-platform apps built from scratch." },
  { label: "UI/UX Design", path: "/services-v2/ui-ux-design", blurb: "Designs that make sense to the people using them." },
  { label: "E-Commerce Solutions", path: "/services-v2/e-commerce-solutions", blurb: "Online stores that are easy to buy from." },
  { label: "Custom Software Development", path: "/services-v2/custom-software-development", blurb: "Software built around how your business actually works." },
  { label: "AI Development", path: "/services-v2/ai-development", blurb: "Practical AI that does real work." },
  { label: "Data Analytics", path: "/services-v2/data-analytics", blurb: "Turn raw data into clear decisions." },
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
