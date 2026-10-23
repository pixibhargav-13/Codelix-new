/* Search titles for posts whose headline is too long for a results page.
   Google shows about 60 characters, and fitTitle() can only drop the brand
   suffix, not shorten the headline itself, so these lost their endings to an
   ellipsis. The on-page H1 keeps the full headline; only <title> changes.
   Keyed by slug because some of these posts live in Supabase, not in the
   repo. A post with no entry falls back to fitTitle(). */
const BLOG_SEO_TITLES = {
  "building-scalable-web-applications-with-modern-frameworks": "Building Scalable Web Applications: A Guide | Codelix",
  "optimizing-user-experience-through-better-uiux-design": "How Better UI/UX Design Improves Conversions | Codelix",
  "saas-vs-on-premise-whats-best-for-your-business": "SaaS vs On-Premise Software: Which to Choose? | Codelix",
  "when-to-move-from-tally-to-erp": "When to Move From Tally to ERP Software | Codelix",
  "why-digital-presence-matters-more-than-ever-in-2025": "Why Digital Presence Matters for Indian Businesses",
};

const CASE_STUDY_SEO_TITLES = {
  "book-collections-case-study": "E-Commerce Platform for a Book Store: Case Study | Codelix",
  "erp-case-study": "Custom ERP for Industrial & Financial Workflows | Codelix",
  "smart-society-management-case-study": "Society Management App: Case Study | Codelix",
};

export const blogSeoTitleFor = (slug) => BLOG_SEO_TITLES[slug];
export const caseStudySeoTitleFor = (slug) => CASE_STUDY_SEO_TITLES[slug];
