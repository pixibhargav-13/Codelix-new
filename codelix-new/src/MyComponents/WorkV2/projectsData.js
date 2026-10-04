/* real project images — same source of truth as BestProjects.jsx, not
   new/invented visuals.

   Each is imported twice. The .webp is what visitors see: the originals
   were 2000x1600 PNGs of up to 2.6 MB, and at 1600px WebP they are 60-240
   KB. The .png is kept as `share`, the image a case study hands to
   og:image — LinkedIn's WebP support is not something to rely on, and
   only crawlers ever fetch that file, so browsers never pay for it. */
import projectOne from "../Images/work-best-project-one.webp";
import projectOneShare from "../Images/work-best-project-one.png";
import projectTwo from "../Images/work-best-project-two.webp";
import projectTwoShare from "../Images/work-best-project-two.png";
import projectThree from "../Images/work-best-project-three.webp";
import projectThreeShare from "../Images/work-best-project-three.png";
import projectFour from "../Images/work-best-project-four.webp";
import projectFourShare from "../Images/work-best-project-four.png";
import projectFive from "../Images/work-best-project-five.webp";
import projectFiveShare from "../Images/work-best-project-five.png";
import projectSix from "../Images/work-best-project-six.webp";
import projectSixShare from "../Images/work-best-project-six.png";
import projectSeven from "../Images/work-best-project-seven.webp";
import projectSevenShare from "../Images/work-best-project-seven.png";
import projectEight from "../Images/work-best-project-eight.webp";
import projectEightShare from "../Images/work-best-project-eight.png";
import projectNine from "../Images/work-best-project-nine.webp";
import projectNineShare from "../Images/work-best-project-nine.png";
import projectTen from "../Images/work-best-project-ten.webp";
import projectTenShare from "../Images/work-best-project-ten.png";
import projectEleven from "../Images/work-best-project-eleven.webp";
import projectElevenShare from "../Images/work-best-project-eleven.png";
import projectThirteen from "../Images/work-best-project-thirteen.webp";
import projectThirteenShare from "../Images/work-best-project-thirteen.png";
import projectFourteen from "../Images/work-best-project-fourteen.webp";
import projectFourteenShare from "../Images/work-best-project-fourteen.png";
import projectFifteen from "../Images/work-best-project-fifteen.webp";
import projectFifteenShare from "../Images/work-best-project-fifteen.png";


/* real client project — details supplied directly by Codelix, not
   internet-researched or invented (see caseStudiesData.js for the full
   write-up). No real product screenshot was supplied, so this uses an
   illustrative dashboard diagram rather than a fabricated "screenshot". */
import projectTwentyThree from "../Images/work-erp-internal-ops.svg";

/* the full portfolio — same 15 real projects, descriptions, tags, and case
   study routes as BestProjects.jsx, not a new/invented list. Shared between
   WorkV2 and CaseStudyV2 so both stay in sync from one source. */
export const PROJECTS = [
  { id: 1, title: "NextGen — Modern Fashion E-Commerce Website", category: "E-Commerce Solutions", industry: "E-commerce", description: "A modern and fully responsive e-commerce website built for a fashion and lifestyle brand offering clothing, eyewear, and accessories. Clean UI, intuitive navigation, and a shopping experience designed to maximize conversions.", tags: ["Nodejs", "ReactJS", "Postgres", "AWS"], image: projectOne, share: projectOneShare, href: "/nextgen-case-study" },
  { id: 2, title: "A Custom ERP Solution for Industrial & Financial Workflows", category: "Custom Software Development", industry: "Manufacturing", description: "A robust and scalable ERP system designed to handle complex industrial workflows, streamline financial processes, and support high-volume operational activities with accuracy and transparency.", tags: ["Spring Boot", "ReactJS", "MySQL", "AWS"], image: projectTwo, share: projectTwoShare, href: "/erp-case-study" },
  { id: 3, title: "A Smart Society Management App for Residential Communities", category: "Application Development", industry: "Real estae and construction", description: "A mobile application that digitizes everyday society operations — approvals, maintenance requests, payments, and community updates — making residential life more organized and transparent.", tags: ["Flutter", "Firebase", "AWS", "MySQL"], image: projectThree, share: projectThreeShare, href: "/smart-society-management-case-study" },
  { id: 4, title: "A Feature-Rich Mobile Marketplace for Buying & Selling Cars", category: "Application Development", industry: "Startups", description: "An automotive marketplace app for browsing vehicles with detailed specs, listing cars for sale, and comparing options — with secure flows, smart filters, and real-time updates.", tags: ["React Native", "Firebase", "AWS", "Postgres"], image: projectFour, share: projectFourShare, href: "/car-marketplace-case-study" },
  { id: 5, title: "A High-Performance E-Commerce Platform for Book Collections", category: "E-Commerce Solutions", industry: "E-commerce", description: "An online storefront for book retail with smooth navigation, elegant product showcases, and an organized category structure that helps users discover titles easily.", tags: ["Nodejs", "ReactJS", "MongoDB", "AWS"], image: projectFive, share: projectFiveShare, href: "/book-collections-case-study" },
  { id: 6, title: "Modern Website UI/UX Design for a Creative Agency", category: "UI/UX Design", industry: "Startups", description: "A complete UI/UX design for a modern creative agency — bold visual identity, clean layout structures, and a smooth journey from hero to contact.", tags: ["Figma", "Canva", "Photoshop"], image: projectSix, share: projectSixShare, href: "/modern-creative-agency-case-study" },
  { id: 7, title: "Modern HR Portal for Employee Benefits", category: "Web Development", industry: "B2B SaaS", description: "A responsive web platform to simplify employee benefits, claims, and HR administration — a clean dashboard for viewing benefits, submitting claims, and tracking approvals.", tags: ["AngularJS", "Postgres", "Django"], image: projectSeven, share: projectSevenShare, href: "/hr-portal-case-study" },
  { id: 8, title: "Organic Makhana Store — Responsive E-Commerce Platform", category: "E-Commerce Solutions", industry: "Food and Bavarages", description: "An e-commerce website for a premium makhana brand — multiple product categories, mobile-first layout, and optimised product pages to support conversion.", tags: ["Nodejs", "ReactJS", "Postgres", "AWS"], image: projectEight, share: projectEightShare, href: "/makhana-store-case-study" },
  { id: 9, title: "Modern EdTech Website for Online Courses", category: "Web Development", industry: "Education", description: "A web platform for an online learning experience — structured course pages, fast performance, and mobile responsiveness for a simple, engaging enrolment flow.", tags: ["ReactJS", "MongoDB", "Spring Boot"], image: projectNine, share: projectNineShare, href: "/edtech-case-study" },
  { id: 10, title: "Custom Payroll Management System — Web & Mobile", category: "Custom Software Development", industry: "FinTech", description: "A payroll management system for salary processing, attendance tracking, and financial reporting — with a responsive web dashboard and mobile interface.", tags: ["Spring Boot", "AngularJS", "MySQL", "AWS"], image: projectTen, share: projectTenShare, href: "/payroll-case-study" },
  { id: 11, title: "Elegant Creative Agency Website — UI/UX Design", category: "UI/UX Design", industry: "Startups", description: "A high-end UI/UX design for a modern creative studio — dark-mode aesthetics, clean grids, and strong typography to showcase projects boldly.", tags: ["Figma", "Canva"], image: projectEleven, share: projectElevenShare, href: "/elegant-creative-agency-case-study" },

  { id: 13, title: "Freight & Shipping Web Platform", category: "Web Development", industry: "Travel & Hospitality", description: "A responsive website for an international ocean freight and logistics provider — global cargo solutions, shipment tracking, and service categories through a clean interface.", tags: ["ReactJS", "MongoDB", "Nodejs"], image: projectThirteen, share: projectThirteenShare, href: "/freight-shipping-case-study" },
  { id: 14, title: "Smart Business Operations System", category: "Custom Software Development", industry: "Startups", description: "A custom system to manage business operations — a web dashboard and mobile-friendly interface covering order tracking, inventory, staff workflows, and reporting.", tags: ["Spring Boot", "ReactJS", "Postgres", "AWS"], image: projectFourteen, share: projectFourteenShare, href: "/smart-business-case-study" },
  { id: 15, title: "Modern School Management Mobile Application", category: "Application Development", industry: "Education", description: "A mobile app to streamline school operations, student schedules, and daily academic activity — classes, timetables, announcements, and academic updates.", tags: ["Flutter", "Firebase", "MongoDB", "Django"], image: projectFifteen, share: projectFifteenShare, href: "/school-management-case-study" },

  { id: 23, title: "Internal Operations ERP for a B2B SaaS Company", category: "Custom Software Development", industry: "B2B SaaS", description: "A centralized internal ERP unifying billing, onboarding, and support data for a 140-180 person B2B SaaS company — replacing disconnected spreadsheets with one auditable system across departments.", tags: ["Spring Boot", "React", "PostgreSQL", "AWS"], image: projectTwentyThree, href: "/internal-ops-erp-case-study" },
];
