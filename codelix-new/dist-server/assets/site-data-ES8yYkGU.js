import { r as reactLogo, n as nextLogo, a as angularLogo, v as vueLogo, t as tsLogo, j as jsLogo, b as viteLogo, c as tailwindLogo, d as bootstrapLogo, f as flutterLogo, e as androidLogo, s as swiftLogo, g as nodeLogo, p as pythonLogo, h as djangoLogo, i as javaLogo, k as springLogo, l as laravelLogo, m as phpLogo, o as csharpLogo, q as nust, u as techMongo, w as postgresqlLogo, x as techFirebase, y as techAws, z as dockerLogo, A as figmaLogo, B as adobeXdLogo, C as sketchLogo, D as framerLogo, E as canvaLogo, F as shopifyLogo, G as woocommerceLogo, H as webflowLogo, I as n8nLogo, J as zapierLogo, K as makeLogo, L as client1, M as client2, N as client3, O as client4, P as client5, Q as client6, R as client7, S as client8, T as client9, U as client10, V as client11, W as client12, X as client13 } from "./site-images-DRvRo0sp.js";
const FOOTER_SERVICE_KEYWORDS = [
  { label: "Web Development", path: "/services/web-development", blurb: "Modern websites and web applications tailored to your business needs." },
  { label: "Application Development", path: "/services/application-development", blurb: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch." },
  { label: "UI/UX & Product Design", path: "/services/ui-ux-design", blurb: "UX research, wireframes, prototypes, design systems, and accessibility." },
  { label: "E-Commerce Solutions", path: "/services/e-commerce-solutions", blurb: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations." },
  { label: "Enterprise Software Solutions", path: "/services/custom-software-development", blurb: "ERP, CRM, workflow automation, legacy modernization, and integrations." },
  { label: "AI & Automation Solutions", path: "/services/ai-development", blurb: "AI agents, chatbots, generative AI, and workflow automation that works." },
  { label: "Data Analytics & Business Intelligence", path: "/services/data-analytics", blurb: "Dashboards, reporting, data visualization, and predictive analytics." },
  { label: "Support & Managed Services", path: "/services/support-managed-services", blurb: "Ongoing maintenance, technical support, and dedicated team augmentation." }
];
const FOOTER_MORE_SERVICES = [
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
  { label: "Dedicated Development Teams", path: "/services/dedicated-development-teams" }
];
const FOOTER_ALL_SERVICES = [...FOOTER_SERVICE_KEYWORDS, ...FOOTER_MORE_SERVICES].map(({ label, path }) => ({ label, path })).sort((a, b) => a.label.localeCompare(b.label));
const FOOTER_INDUSTRY_KEYWORDS = [
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
  { label: "Travel & Hospitality", path: "/industries/travel-hospitality" }
];
const NAVBAR_SERVICES_HIERARCHY = [
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
const FOOTER_PRODUCTS = [
  { label: "Audytee", path: "/products/audytee" },
  { label: "4bitx", path: "/products/4bitx" },
  { label: "AanganOne", path: "/products/aanganone" }
];
const TECH_STACK = [
  { src: reactLogo, name: "React" },
  { src: nextLogo, name: "Next.js" },
  { src: angularLogo, name: "Angular" },
  { src: vueLogo, name: "Vue" },
  { src: tsLogo, name: "TypeScript" },
  { src: jsLogo, name: "JavaScript" },
  { src: viteLogo, name: "Vite" },
  { src: tailwindLogo, name: "Tailwind" },
  { src: bootstrapLogo, name: "Bootstrap" },
  { src: flutterLogo, name: "Flutter" },
  { src: androidLogo, name: "Android" },
  { src: swiftLogo, name: "Swift" },
  { src: nodeLogo, name: "Node.js" },
  { src: pythonLogo, name: "Python" },
  { src: djangoLogo, name: "Django" },
  { src: javaLogo, name: "Java" },
  { src: springLogo, name: "Spring Boot" },
  { src: laravelLogo, name: "Laravel" },
  { src: phpLogo, name: "PHP" },
  { src: csharpLogo, name: "C#" },
  { src: nust, name: "Nust" },
  { src: techMongo, name: "MongoDB" },
  { src: postgresqlLogo, name: "PostgreSQL" },
  { src: techFirebase, name: "Firebase" },
  { src: techAws, name: "AWS" },
  { src: dockerLogo, name: "Docker" },
  { src: figmaLogo, name: "Figma" },
  { src: adobeXdLogo, name: "Adobe XD" },
  { src: sketchLogo, name: "Sketch" },
  { src: framerLogo, name: "Framer" },
  { src: canvaLogo, name: "Canva" },
  { src: shopifyLogo, name: "Shopify" },
  { src: woocommerceLogo, name: "WooCommerce" },
  { src: webflowLogo, name: "Webflow" },
  { src: n8nLogo, name: "n8n" },
  { src: zapierLogo, name: "Zapier" },
  { src: makeLogo, name: "Make" }
];
const CLIENT_LOGOS = [
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7,
  client8,
  client9,
  client10,
  client11,
  client12,
  client13
];
export {
  CLIENT_LOGOS as C,
  FOOTER_INDUSTRY_KEYWORDS as F,
  NAVBAR_SERVICES_HIERARCHY as N,
  TECH_STACK as T,
  FOOTER_ALL_SERVICES as a,
  FOOTER_PRODUCTS as b
};
