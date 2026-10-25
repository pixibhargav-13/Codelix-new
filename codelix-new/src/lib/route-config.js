import { INDUSTRIES } from "../MyComponents/IndustriesV2/industriesData.js";
import { ADDITIONAL_SERVICES } from "../MyComponents/ServiceDetailV2/additionalServicesData.js";
import { LOCATION_SLUGS } from "../MyComponents/LocationLandingV2/locationPagesData.js";
import { HIRE_SLUGS } from "../MyComponents/HireDevelopersV2/hireDevelopersData.js";

// Static routes that do not require dynamic data
export const STATIC_ROUTES = [
  "/",
  "/services",
  "/services/web-development",
  "/services/application-development",
  "/services/ui-ux-design",
  "/services/e-commerce-solutions",
  "/services/custom-software-development",
  "/services/ai-development",
  "/services/data-analytics",
  "/services/support-managed-services",
  "/about",
  "/contact",
  "/industries",
  "/process",
  "/team",
  "/work",
  "/terms-of-service",
  "/privacy-policy",
  "/refund-policy",
  "/careers",
  "/pricing",
  "/faq",
  "/technologies",
  "/sitemap",
  "/blog",
  "/case-study",
  "/hire-developers",
  "/software-development-cost-calculator"
];

// Combine all non-database routes
export function getGeneratedRoutes() {
  const industryRoutes = INDUSTRIES.map((i) => `/industries/${i.slug}`);
  const extraServices = ADDITIONAL_SERVICES.map((s) => `/services/${s.slug}`);
  /* 4bitx stays prerendered and in the sitemap: it is unlisted in menus,
     not removed. Codelix ERP's editions must match ERP_INDUSTRIES in
     ErpV2/erpData.js (not imported here: it pulls in images, and this file
     is loaded under plain Node by ssg-build). */
  const erpRoutes = ["construction", "manufacturing", "ceramic", "textile"].map((s) => `/products/codelix-erp/${s}`);
  const productRoutes = ["/products/audytee", "/products/4bitx", "/products/aanganone", "/products/codelix-erp", ...erpRoutes];
  /* blog posts and case studies all live in Supabase: ssg-build adds
     their routes from the rows it fetches */
  const hireRoutes = HIRE_SLUGS.map((slug) => `/hire-developers/${slug}`);
  /* city landing pages: in the prerender and sitemap.xml, linked from nowhere */
  const locationRoutes = LOCATION_SLUGS.map((slug) => `/${slug}`);
  return [...STATIC_ROUTES, ...industryRoutes, ...extraServices, ...productRoutes, ...hireRoutes, ...locationRoutes];
}
