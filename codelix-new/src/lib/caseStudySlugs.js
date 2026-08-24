/* slug list only, kept separate from caseStudiesData.js so route-config.js
   (imported as raw source by scripts/ssg-build.mjs under plain Node ESM,
   no bundler) never has to resolve the image imports that file pulls in
   via WorkV2/projectsData — Node can't load .png as a module. */
export const CASE_STUDY_SLUGS = [
  "nextgen-case-study",
  "erp-case-study",
  "payroll-case-study",
  "smart-business-case-study",
  "book-collections-case-study",
  "makhana-store-case-study",
  "freight-shipping-case-study",
  "hr-portal-case-study",
  "edtech-case-study",
  "modern-creative-agency-case-study",
  "elegant-creative-agency-case-study",
  "car-marketplace-case-study",
  "school-management-case-study",
  "smart-society-management-case-study",
  "internal-ops-erp-case-study",
];
