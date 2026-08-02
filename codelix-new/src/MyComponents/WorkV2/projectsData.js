/* real project images — same source of truth as BestProjects.jsx, not
   new/invented visuals */
import projectOne from "../Images/work-best-project-one.png";
import projectTwo from "../Images/work-best-project-two.png";
import projectThree from "../Images/work-best-project-three.png";
import projectFour from "../Images/work-best-project-four.png";
import projectFive from "../Images/work-best-project-five.png";
import projectSix from "../Images/work-best-project-six.png";
import projectSeven from "../Images/work-best-project-seven.png";
import projectEight from "../Images/work-best-project-eight.png";
import projectNine from "../Images/work-best-project-nine.png";
import projectTen from "../Images/work-best-project-ten.png";
import projectEleven from "../Images/work-best-project-eleven.png";
import projectTwelve from "../Images/work-best-project-twelve.png";
import projectThirteen from "../Images/work-best-project-thirteen.png";
import projectFourteen from "../Images/work-best-project-fourteen.png";
import projectFifteen from "../Images/work-best-project-fifteen.png";

/* concept-exploration visuals — abstract diagrams built for these entries
   specifically, not screenshots of a real deployed product (see isConcept
   in caseStudiesData.js, disclosed on the case-study page itself) */
import projectSixteen from "../Images/concept-ai-support-triage.svg";
import projectSeventeen from "../Images/concept-unified-ops-dashboard.svg";
import projectEighteen from "../Images/concept-web-conversion-rebuild.svg";
import projectNineteen from "../Images/concept-offline-field-app.svg";
import projectTwenty from "../Images/concept-saas-onboarding.svg";
import projectTwentyOne from "../Images/concept-checkout-recovery.svg";
import projectTwentyTwo from "../Images/concept-spreadsheet-to-system.svg";

/* real client project — details supplied directly by Codelix, not
   internet-researched or invented (see caseStudiesData.js for the full
   write-up). No real product screenshot was supplied, so this uses an
   illustrative dashboard diagram rather than a fabricated "screenshot". */
import projectTwentyThree from "../Images/work-erp-internal-ops.svg";

/* the full portfolio — same 15 real projects, descriptions, tags, and case
   study routes as BestProjects.jsx, not a new/invented list. Shared between
   WorkV2 and CaseStudyV2 so both stay in sync from one source. */
export const PROJECTS = [
  { id: 1, title: "NextGen — Modern Fashion E-Commerce Website", category: "E-Commerce Solutions", industry: "E-commerce", description: "A modern and fully responsive e-commerce website built for a fashion and lifestyle brand offering clothing, eyewear, and accessories. Clean UI, intuitive navigation, and a shopping experience designed to maximize conversions.", tags: ["Nodejs", "ReactJS", "Postgres", "AWS"], image: projectOne, href: "/nextgen-case-study" },
  { id: 2, title: "A Custom ERP Solution for Industrial & Financial Workflows", category: "Custom Software Development", industry: "Manufacturing", description: "A robust and scalable ERP system designed to handle complex industrial workflows, streamline financial processes, and support high-volume operational activities with accuracy and transparency.", tags: ["Spring Boot", "ReactJS", "MySQL", "AWS"], image: projectTwo, href: "/erp-case-study" },
  { id: 3, title: "A Smart Society Management App for Residential Communities", category: "Application Development", industry: "Real estae and construction", description: "A mobile application that digitizes everyday society operations — approvals, maintenance requests, payments, and community updates — making residential life more organized and transparent.", tags: ["Flutter", "Firebase", "AWS", "MySQL"], image: projectThree, href: "/smart-society-management-case-study" },
  { id: 4, title: "A Feature-Rich Mobile Marketplace for Buying & Selling Cars", category: "Application Development", industry: "Startups", description: "An automotive marketplace app for browsing vehicles with detailed specs, listing cars for sale, and comparing options — with secure flows, smart filters, and real-time updates.", tags: ["React Native", "Firebase", "AWS", "Postgres"], image: projectFour, href: "/car-marketplace-case-study" },
  { id: 5, title: "A High-Performance E-Commerce Platform for Book Collections", category: "E-Commerce Solutions", industry: "E-commerce", description: "An online storefront for book retail with smooth navigation, elegant product showcases, and an organized category structure that helps users discover titles easily.", tags: ["Nodejs", "ReactJS", "MongoDB", "AWS"], image: projectFive, href: "/book-collections-case-study" },
  { id: 6, title: "Modern Website UI/UX Design for a Creative Agency", category: "UI/UX Design", industry: "Startups", description: "A complete UI/UX design for a modern creative agency — bold visual identity, clean layout structures, and a smooth journey from hero to contact.", tags: ["Figma", "Canva", "Photoshop"], image: projectSix, href: "/modern-creative-agency-case-study" },
  { id: 7, title: "Modern HR Portal for Employee Benefits", category: "Web Development", industry: "B2B SaaS", description: "A responsive web platform to simplify employee benefits, claims, and HR administration — a clean dashboard for viewing benefits, submitting claims, and tracking approvals.", tags: ["AngularJS", "Postgres", "Django"], image: projectSeven, href: "/hr-portal-case-study" },
  { id: 8, title: "Organic Makhana Store — Responsive E-Commerce Platform", category: "E-Commerce Solutions", industry: "Food and Bavarages", description: "An e-commerce website for a premium makhana brand — multiple product categories, mobile-first layout, and optimised product pages to support conversion.", tags: ["Nodejs", "ReactJS", "Postgres", "AWS"], image: projectEight, href: "/makhana-store-case-study" },
  { id: 9, title: "Modern EdTech Website for Online Courses", category: "Web Development", industry: "Education", description: "A web platform for an online learning experience — structured course pages, fast performance, and mobile responsiveness for a simple, engaging enrolment flow.", tags: ["ReactJS", "MongoDB", "Spring Boot"], image: projectNine, href: "/edtech-case-study" },
  { id: 10, title: "Custom Payroll Management System — Web & Mobile", category: "Custom Software Development", industry: "FinTech", description: "A payroll management system for salary processing, attendance tracking, and financial reporting — with a responsive web dashboard and mobile interface.", tags: ["Spring Boot", "AngularJS", "MySQL", "AWS"], image: projectTen, href: "/payroll-case-study" },
  { id: 11, title: "Elegant Creative Agency Website — UI/UX Design", category: "UI/UX Design", industry: "Startups", description: "A high-end UI/UX design for a modern creative studio — dark-mode aesthetics, clean grids, and strong typography to showcase projects boldly.", tags: ["Figma", "Canva"], image: projectEleven, href: "/elegant-creative-agency-case-study" },
  { id: 12, title: "AI-Powered Design Platform — UI/UX Concept", category: "UI/UX Design", industry: "Ai & Data", description: "A futuristic UI/UX concept for an AI-powered design platform — bold visuals, modern gradients, and a layout centered on simplicity and high visual impact.", tags: ["Framer", "Canva"], image: projectTwelve, href: "/ai-powered-design-case-study" },
  { id: 13, title: "Freight & Shipping Web Platform", category: "Web Development", industry: "Travel & Hospitality", description: "A responsive website for an international ocean freight and logistics provider — global cargo solutions, shipment tracking, and service categories through a clean interface.", tags: ["ReactJS", "MongoDB", "Nodejs"], image: projectThirteen, href: "/freight-shipping-case-study" },
  { id: 14, title: "Smart Business Operations System", category: "Custom Software Development", industry: "Startups", description: "A custom system to manage business operations — a web dashboard and mobile-friendly interface covering order tracking, inventory, staff workflows, and reporting.", tags: ["Spring Boot", "ReactJS", "Postgres", "AWS"], image: projectFourteen, href: "/smart-business-case-study" },
  { id: 15, title: "Modern School Management Mobile Application", category: "Application Development", industry: "Education", description: "A mobile app to streamline school operations, student schedules, and daily academic activity — classes, timetables, announcements, and academic updates.", tags: ["Flutter", "Firebase", "MongoDB", "Django"], image: projectFifteen, href: "/school-management-case-study" },
  { id: 16, title: "AI-Powered Support Triage — AI Concept", category: "AI Development", industry: "Ai & Data", description: "A concept system addressing a common support-team problem — repetitive tickets and slow first response — by drafting a reviewable first-pass reply and routing each ticket automatically.", tags: ["Python", "Node.js", "PostgreSQL", "Docker"], image: projectSixteen, href: "/ai-support-triage-case-study" },
  { id: 17, title: "Unified Operations Dashboard — Data Concept", category: "Data Analytics", industry: "Ai & Data", description: "A concept BI dashboard addressing a common reporting problem — decisions made on stale, scattered spreadsheets — by unifying multiple data sources into one live, role-based view.", tags: ["Python", "PostgreSQL", "AWS", "Docker"], image: projectSeventeen, href: "/unified-ops-dashboard-case-study" },
  { id: 18, title: "Conversion-First Rebuild for a Service Business Site — Web Concept", category: "Web Development", industry: "Startups", description: "A concept rebuild addressing a common web problem — a slow, brochure-style site that fails to convert — by designing backwards from the enquiry action and holding a strict performance budget.", tags: ["React", "Next.js", "Node.js", "PostgreSQL"], image: projectEighteen, href: "/web-conversion-rebuild-case-study" },
  { id: 19, title: "Offline-First Field Service App — App Concept", category: "Application Development", industry: "Healthcare", description: "A concept app addressing a common field-service problem — lost data when connectivity drops mid-job — with local-first storage that syncs automatically once a signal returns.", tags: ["Flutter", "Firebase", "AWS"], image: projectNineteen, href: "/offline-field-app-case-study" },
  { id: 20, title: "SaaS Onboarding Redesign — UX Concept", category: "UI/UX Design", industry: "B2B SaaS", description: "A concept redesign addressing a common SaaS problem — new users dropping off before reaching their first useful result — through a shortened, progress-visible onboarding flow.", tags: ["Figma", "Framer"], image: projectTwenty, href: "/saas-onboarding-case-study" },
  { id: 21, title: "Checkout Abandonment Recovery — Commerce Concept", category: "E-Commerce Solutions", industry: "E-commerce", description: "A concept checkout redesign addressing a common e-commerce problem — high cart abandonment from a long, unclear checkout — by cutting it to three steps with guest checkout and upfront shipping costs.", tags: ["Shopify", "React", "Node.js"], image: projectTwentyOne, href: "/checkout-recovery-case-study" },
  { id: 22, title: "Spreadsheet-to-System Migration — Software Concept", category: "Custom Software Development", industry: "FinTech", description: "A concept system addressing a common operations problem — critical processes run on a patchwork of spreadsheets and email with no single source of truth — replaced by one auditable system of record.", tags: ["Spring Boot", "PostgreSQL", "Docker"], image: projectTwentyTwo, href: "/spreadsheet-to-system-case-study" },
  { id: 23, title: "Internal Operations ERP for a B2B SaaS Company", category: "Custom Software Development", industry: "B2B SaaS", description: "A centralized internal ERP unifying billing, onboarding, and support data for a 140-180 person B2B SaaS company — replacing disconnected spreadsheets with one auditable system across departments.", tags: ["Spring Boot", "React", "PostgreSQL", "AWS"], image: projectTwentyThree, href: "/internal-ops-erp-case-study" },
];
