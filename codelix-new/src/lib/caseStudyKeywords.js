/* meta keywords for each case study, keyed by slug. Case studies come from
   Supabase, so one added later through the admin panel has no entry here —
   for those, caseStudyKeywordsFor() builds a set from the study's own tech
   tags instead. */
const CASE_STUDY_KEYWORDS = {
  "nextgen-case-study": "fashion e-commerce website, e-commerce case study, online clothing store development, React e-commerce website, Node.js e-commerce, e-commerce development company Ahmedabad",
  "erp-case-study": "custom ERP case study, ERP for industrial workflows, financial ERP software, ERP software development, Spring Boot ERP, ERP development company Ahmedabad",
  "payroll-case-study": "payroll management system, payroll software development, HR payroll app, payroll web and mobile app, custom payroll software, payroll case study",
  "smart-business-case-study": "business operations software, custom business management system, operations automation, custom software case study, business process software",
  "book-collections-case-study": "online bookstore development, book e-commerce platform, high-performance e-commerce, React e-commerce, e-commerce case study, MongoDB e-commerce",
  "makhana-store-case-study": "organic food e-commerce website, food store website development, D2C e-commerce, responsive e-commerce platform, FMCG online store, e-commerce case study",
  "freight-shipping-case-study": "freight shipping platform, logistics software development, shipping web application, logistics website, freight management system, logistics case study",
  "hr-portal-case-study": "HR portal development, employee benefits portal, HRMS software, HR management system, Django web development, HR software case study",
  "edtech-case-study": "edtech website development, online course platform, e-learning website, LMS development, education website case study, edtech software company",
  "modern-creative-agency-case-study": "creative agency website design, UI/UX design case study, agency website redesign, Figma website design, modern website design",
  "elegant-creative-agency-case-study": "agency website UI/UX design, elegant website design, creative agency web design, Figma UI design, UI/UX case study",
  "car-marketplace-case-study": "car marketplace app, buy and sell cars app, used car marketplace development, React Native marketplace app, automotive app development, marketplace case study",
  "school-management-case-study": "school management app, school management system, Flutter school app, education app development, parent teacher app, school ERP",
  "smart-society-management-case-study": "society management app, apartment management software, housing society app, residential community app, Flutter society app, visitor management system",
  "internal-ops-erp-case-study": "internal operations ERP, ERP for SaaS company, B2B ERP software, operations management system, Spring Boot ERP, custom ERP case study",
};

export const caseStudyKeywordsFor = (slug, tags = []) => {
  if (CASE_STUDY_KEYWORDS[slug]) return CASE_STUDY_KEYWORDS[slug];
  return [...tags.filter(Boolean), "case study", "Codelix IT Solutions"].join(", ");
};
