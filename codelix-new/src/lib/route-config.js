import { INDUSTRIES } from "../MyComponents/IndustriesV2/industriesData.js";
import { ADDITIONAL_SERVICES } from "../MyComponents/ServiceDetailV2/additionalServicesData.js";
import { CASE_STUDY_SLUGS } from "./caseStudySlugs.js";
import { BLOG_POST_SLUGS } from "./blogSlugs.js";

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
  "/case-study"
];

// Combine all non-database routes
export function getGeneratedRoutes() {
  const industryRoutes = INDUSTRIES.map((i) => `/industries/${i.slug}`);
  const extraServices = ADDITIONAL_SERVICES.map((s) => `/services/${s.slug}`);
  const productRoutes = ["/products/audytee", "/products/4bitx", "/products/aanganone"];
  const caseStudyRoutes = CASE_STUDY_SLUGS.map((slug) => `/case-study/${slug}`);
  const blogRoutes = BLOG_POST_SLUGS.map((slug) => `/blog/${slug}`);
  return [...STATIC_ROUTES, ...industryRoutes, ...extraServices, ...productRoutes, ...caseStudyRoutes, ...blogRoutes];
}
