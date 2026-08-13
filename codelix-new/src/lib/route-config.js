import { INDUSTRIES } from "../MyComponents/IndustriesV2/industriesData.js";
import { ADDITIONAL_SERVICES } from "../MyComponents/ServiceDetailV2/additionalServicesData.js";

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
  "/terms",
  "/privacy",
  "/cookies",
  "/careers",
  "/pricing",
  "/blog",
  "/case-study"
];

// Combine all non-database routes
export function getGeneratedRoutes() {
  const industryRoutes = INDUSTRIES.map((i) => `/industries/${i.slug}`);
  const extraServices = ADDITIONAL_SERVICES.map((s) => `/services/${s.slug}`);
  return [...STATIC_ROUTES, ...industryRoutes, ...extraServices];
}
