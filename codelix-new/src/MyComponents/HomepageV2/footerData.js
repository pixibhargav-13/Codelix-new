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

/* 18 additional service pages — dedicated pages exist for each (see
   ServiceDetailV2/additionalServicesData.js + AdditionalServiceDetailV2.jsx)
   but per the brief they're surfaced only from the footer, not the main
   nav dropdown or the ServicesV2 grid. */
export const FOOTER_MORE_SERVICES = [
  { label: "SaaS Product Development", path: "/services-v2/saas-product-development" },
  { label: "Cloud Solutions & Migration", path: "/services-v2/cloud-solutions-migration" },
  { label: "API Development & Integration", path: "/services-v2/api-development-integration" },
  { label: "Workflow Automation", path: "/services-v2/workflow-automation" },
  { label: "ERP & CRM Development", path: "/services-v2/erp-crm-development" },
  { label: "AI Agent Development", path: "/services-v2/ai-agent-development" },
  { label: "Generative AI Solutions", path: "/services-v2/generative-ai-solutions" },
  { label: "Cloud Infrastructure Services", path: "/services-v2/cloud-infrastructure-services" },
  { label: "UX Research & Design Systems", path: "/services-v2/ux-research-design-systems" },
  { label: "Marketplace Development", path: "/services-v2/marketplace-development" },
  { label: "Payment Integration Services", path: "/services-v2/payment-integration-services" },
  { label: "Legacy System Modernization", path: "/services-v2/legacy-system-modernization" },
  { label: "Business Intelligence Solutions", path: "/services-v2/business-intelligence-solutions" },
  { label: "Predictive Analytics", path: "/services-v2/predictive-analytics" },
  { label: "Data Engineering", path: "/services-v2/data-engineering" },
  { label: "Performance Optimization", path: "/services-v2/performance-optimization" },
  { label: "Security & Maintenance", path: "/services-v2/security-maintenance" },
  { label: "Dedicated Development Teams", path: "/services-v2/dedicated-development-teams" },
];

/* single merged, alphabetised list for the footer's "Services" strip —
   all 8 core services plus all 18 additional ones in one arranged row,
   instead of two separate rows. The nav dropdown and ServicesV2 grid
   still use FOOTER_SERVICE_KEYWORDS on its own (unchanged, blurbs intact,
   core 8 only) — this combined list is footer-only. */
export const FOOTER_ALL_SERVICES = [...FOOTER_SERVICE_KEYWORDS, ...FOOTER_MORE_SERVICES]
  .map(({ label, path }) => ({ label, path }))
  .sort((a, b) => a.label.localeCompare(b.label));

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

export const NAVBAR_SERVICES_HIERARCHY = [
  {
    title: "Web Development",
    path: "/services-v2/web-development",
    items: [
      { label: "Performance Optimization", path: "/services-v2/performance-optimization" }
    ]
  },
  {
    title: "Application Development",
    path: "/services-v2/application-development",
    items: [
      { label: "SaaS Product Development", path: "/services-v2/saas-product-development" }
    ]
  },
  {
    title: "UI/UX & Product Design",
    path: "/services-v2/ui-ux-design",
    items: [
      { label: "UX Research & Design Systems", path: "/services-v2/ux-research-design-systems" }
    ]
  },
  {
    title: "E-Commerce Solutions",
    path: "/services-v2/e-commerce-solutions",
    items: [
      { label: "Marketplace Development", path: "/services-v2/marketplace-development" },
      { label: "Payment Integration Services", path: "/services-v2/payment-integration-services" }
    ]
  },
  {
    title: "Enterprise Software Solutions",
    path: "/services-v2/custom-software-development",
    items: [
      { label: "ERP & CRM Development", path: "/services-v2/erp-crm-development" },
      { label: "API Development & Integration", path: "/services-v2/api-development-integration" },
      { label: "Legacy System Modernization", path: "/services-v2/legacy-system-modernization" }
    ]
  },
  {
    title: "AI & Automation Solutions",
    path: "/services-v2/ai-development",
    items: [
      { label: "AI Agent Development", path: "/services-v2/ai-agent-development" },
      { label: "Generative AI Solutions", path: "/services-v2/generative-ai-solutions" },
      { label: "Workflow Automation", path: "/services-v2/workflow-automation" }
    ]
  },
  {
    title: "Data Analytics & Business Intelligence",
    path: "/services-v2/data-analytics",
    items: [
      { label: "Business Intelligence Solutions", path: "/services-v2/business-intelligence-solutions" },
      { label: "Predictive Analytics", path: "/services-v2/predictive-analytics" },
      { label: "Data Engineering", path: "/services-v2/data-engineering" }
    ]
  },
  {
    title: "Support & Managed Services",
    path: "/services-v2/support-managed-services",
    items: [
      { label: "Cloud Solutions & Migration", path: "/services-v2/cloud-solutions-migration" },
      { label: "Cloud Infrastructure Services", path: "/services-v2/cloud-infrastructure-services" },
      { label: "Security & Maintenance", path: "/services-v2/security-maintenance" },
      { label: "Dedicated Development Teams", path: "/services-v2/dedicated-development-teams" }
    ]
  }
];
