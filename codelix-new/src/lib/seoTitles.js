/* Search titles for posts whose headline is too long for a results page.
   Google shows about 60 characters, and fitTitle() can only drop the brand
   suffix, not shorten the headline itself, so these lost their endings to an
   ellipsis. The on-page H1 keeps the full headline; only <title> changes.
   Keyed by slug because some of these posts live in Supabase, not in the
   repo. A post with no entry falls back to fitTitle(). */
const BLOG_SEO_TITLES = {
  "flutter-vs-react-native": "Flutter vs React Native (2026): Which to Choose | Codelix",
  "website-development-cost-in-india": "Website Development Cost in India (2026) | Codelix",
  "app-development-cost-in-india": "App Development Cost in India (2026) | Codelix",
  "custom-software-development-cost-in-india": "Custom Software Development Cost in India | Codelix",
  "in-house-vs-outsourcing-software-development": "In-House vs Outsourcing Software Development",
  "laravel-vs-node-js-for-business-web-apps": "Laravel vs Node.js for Business Web Apps | Codelix",
  "custom-software-vs-off-the-shelf-software": "Custom vs Off-the-Shelf Software | Codelix",
  "whatsapp-payment-reminders-for-invoices": "WhatsApp Payment Reminders for Invoices | Codelix",
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
  /* frozen at their pre-Nov-2026 values: the visible titles became outcome
     headlines ("…cut reconciliation from 4 days to 1…"), and search titles
     shouldn't move with them */
  "car-marketplace-case-study": "A Feature-Rich Mobile Marketplace for Buying & Selling Cars",
  "edtech-case-study": "Modern EdTech Website for Online Courses | Codelix",
  "elegant-creative-agency-case-study": "Elegant Creative Agency Website – UI/UX Design | Codelix",
  "freight-shipping-case-study": "Freight & Shipping Web Platform – Modern Development",
  "hr-portal-case-study": "Modern HR Portal for Employee Benefits - Web Development",
  "internal-ops-erp-case-study": "Internal Operations ERP for a B2B SaaS Company | Codelix",
  "makhana-store-case-study": "Organic Makhana Store – Responsive E-Commerce Platform",
  "modern-creative-agency-case-study": "Modern Website UI/UX Design for a Creative Agency | Codelix",
  "nextgen-case-study": "NextGen – Modern Fashion E-Commerce Website | Codelix",
  "payroll-case-study": "Custom Payroll Management System – Web & Mobile | Codelix",
  "school-management-case-study": "Modern School Management Mobile Application | Codelix",
  "smart-business-case-study": "Smart Business Operations System - Custom Software | Codelix",
};

export const blogSeoTitleFor = (slug) => BLOG_SEO_TITLES[slug];
export const caseStudySeoTitleFor = (slug) => CASE_STUDY_SEO_TITLES[slug];
