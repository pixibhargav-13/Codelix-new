/* The published price bands — the same figures as the budget options of the
   original contact form. Kept in one place so /pricing and the cost
   calculator can never show different numbers for the same project. Index
   0/1/2 matches COMPLEXITY. */
export const BASE_ESTIMATES = {
  Web: ["$1,500 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000"],
  App: ["$5,000 - $15,000", "$15,000 - $35,000", "Above $35,000"],
  UI: ["$2,000 - $5,000", "$5,000 - $12,000", "$12,000 - $25,000"],
  Ecom: ["$3,000 - $8,000", "$8,000 - $20,000", "Above $20,000"],
  Enterprise: ["$10,000 - $25,000", "$25,000 - $60,000", "Above $60,000"],
  AI: ["$5,000 - $15,000", "$15,000 - $40,000", "Above $40,000"],
  Data: ["$4,000 - $10,000", "$10,000 - $25,000", "Above $25,000"],
  Support: ["$500 - $1,500 / mo", "$1,500 - $4,000 / mo", "Custom Retainer"],
};

export const COMPLEXITY = [
  "Simple (MVP / Foundation)",
  "Standard (Core product / Redesign)",
  "Complex (Scale / Enterprise)",
];

/* The calculator's project types: each band with a plain-language name,
   what a project at each size usually looks like, and the service page and
   contact-form service it belongs to. */
export const COST_FAMILIES = [
  {
    key: "Web", label: "Website or web app", service: "Web Development", path: "/services/web-development",
    sizes: [
      "A business website of 5–15 pages with a contact form, CMS and basic SEO.",
      "A custom-designed site or web app with logins, integrations and an admin panel.",
      "A large portal or web platform with many roles, workflows and third-party systems.",
    ],
  },
  {
    key: "App", label: "Mobile app", service: "Application Development", path: "/services/application-development",
    sizes: [
      "An MVP app for Android and iOS with sign-up, a core feature and an admin panel.",
      "A full app with payments, notifications, chat or maps, plus its backend.",
      "A multi-sided app (customers, partners, admins) with real-time features at scale.",
    ],
  },
  {
    key: "Ecom", label: "E-commerce store", service: "E-Commerce Solutions", path: "/services/e-commerce-solutions",
    sizes: [
      "A Shopify or WooCommerce store with your products, payments and shipping set up.",
      "A custom store with ERP or inventory sync, coupons, GST invoices and a mobile-first checkout.",
      "A multi-vendor marketplace or high-volume store with custom integrations.",
    ],
  },
  {
    key: "Enterprise", label: "ERP, CRM or custom software", service: "Enterprise Software Solutions", path: "/services/erp-crm-development",
    sizes: [
      "One or two modules, such as inventory or a sales CRM, replacing spreadsheets.",
      "A multi-module system — sales, purchase, inventory, accounts — with roles and reports.",
      "A company-wide ERP with production, multiple branches, integrations and GST e-invoicing.",
    ],
  },
  {
    key: "AI", label: "AI or automation", service: "AI & Automation Solutions", path: "/services/ai-development",
    sizes: [
      "A chatbot on your documents or a few automated workflows.",
      "An AI agent or AI feature connected to your CRM, ERP or product.",
      "Several AI workflows with custom data pipelines, evaluation and monitoring.",
    ],
  },
  {
    key: "Data", label: "Dashboards & analytics", service: "Data Analytics & Business Intelligence", path: "/services/data-analytics",
    sizes: [
      "A Power BI or custom dashboard from one or two data sources.",
      "Dashboards for several departments with a cleaned, combined data model.",
      "A data warehouse with pipelines, forecasting and company-wide reporting.",
    ],
  },
  {
    key: "UI", label: "UI/UX design only", service: "UI/UX & Product Design", path: "/services/ui-ux-design",
    sizes: [
      "Design for a website or a small app — key screens and a style guide.",
      "Full product design with user research, prototypes and a component library.",
      "A complete design system and redesign across a large product.",
    ],
  },
  {
    key: "Support", label: "Maintenance & support", service: "Support & Managed Services", path: "/services/support-managed-services",
    sizes: [
      "Updates, monitoring, backups and small fixes for one website or app.",
      "Regular feature work and support for a business-critical application.",
      "A dedicated team or retainer covering several systems.",
    ],
  },
];
