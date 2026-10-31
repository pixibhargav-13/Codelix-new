/* shared source of truth for both the industries listing (IndustriesV2.jsx)
   and each industry's own detail page (IndustryDetailV2.jsx) — same 11
   sectors, same real challenges/body/services already used on the listing
   page, just with a fix paired to each challenge for the detail page's
   "Problems We Solve" section instead of inventing new content. */
import {
  Rocket, GraduationCap, HeartPulse, Landmark,
  Factory, Cpu, UtensilsCrossed, ShoppingCart,
  Building, Layers, Plane,
  AlertTriangle, Clock, Puzzle,
} from "lucide-react";

const PAIN_ICONS = [AlertTriangle, Clock, Puzzle];
const withFixes = (challenges, fixes) =>
  challenges.map((pain, i) => ({ pain, fix: fixes[i], icon: PAIN_ICONS[i % PAIN_ICONS.length] }));

export const INDUSTRIES = [
  {
    slug: "manufacturing",
    seoTitle: "Manufacturing Software Development Company in India",
    h1: "Manufacturing Software Development Company in India",
    keywords: "manufacturing ERP software, manufacturing software development, production planning software, inventory management software, shop floor management system, factory automation software, manufacturing ERP Ahmedabad, custom ERP for manufacturers",
    seoDescription:
      "Manufacturing ERP and custom software that connect the shop floor to the office — production, inventory and reporting in one system, built in Ahmedabad.",
    icon: Factory,
    title: "Manufacturing",
    tagline: "Operational systems that connect the shop floor to the office.",
    challenges: ["Inventory and production data scattered across spreadsheets", "Legacy systems that don't talk to newer tools", "Reporting that lags days behind the shop floor"],
    body: "Custom software that connects inventory, production, and reporting into one system your team can trust, without ripping out equipment that already works.",
    services: ["Custom Software Development", "Data Analytics"],
    problems: withFixes(
      ["Inventory and production data scattered across spreadsheets", "Legacy systems that don't talk to newer tools", "Reporting that lags days behind the shop floor"],
      ["One connected system for inventory and production, replacing the spreadsheet patchwork.", "Integration layers that let new tools talk to the equipment you already have, instead of ripping it out.", "Reporting pulled from live production data, not a manual export someone runs at the end of the week."]
    ),
  },
  {
    slug: "fintech",
    seoTitle: "Fintech Software Development Company in India",
    h1: "Fintech Software Development Company in India",
    keywords: "fintech software development, fintech app development, payment app development, lending software, banking software development, payment gateway integration, fintech company India, secure financial software",
    seoDescription:
      "Fintech products where security, compliance and clear information architecture are requirements from the start — onboarding flows, dashboards and reporting.",
    icon: Landmark,
    title: "FinTech",
    tagline: "Where compliance and trust can't be an afterthought.",
    challenges: ["Regulated data that has to be handled correctly from day one", "Trust signals that have to be earned, not decorated", "Integrations with banking and payment infrastructure"],
    body: "Builds where security, compliance, and clear information architecture are treated as requirements, not a later pass — from onboarding flows to dashboards handling sensitive data.",
    services: ["Custom Software Development", "Web Development", "UI/UX Design"],
    problems: withFixes(
      ["Regulated data that has to be handled correctly from day one", "Trust signals that have to be earned, not decorated", "Integrations with banking and payment infrastructure"],
      ["Data handling designed in from the first architecture decision, not bolted on before launch.", "Information architecture and UI that earns trust through clarity, not a stock 'secure' badge.", "Clean integration layers for the banking and payment infrastructure your product depends on."]
    ),
  },
  {
    slug: "ai-data",
    keywords: "AI software development, data analytics solutions, machine learning development, AI and data company India, business intelligence, predictive analytics, data engineering, AI automation",
    seoDescription:
      "Data pipelines, dashboards and AI features built around a real business question rather than a proof of concept that never leaves the demo.",
    icon: Cpu,
    title: "AI & Data",
    tagline: "Turning raw data into something a team can act on.",
    challenges: ["Data spread across disconnected tools", "No clear pipeline from raw data to a usable dashboard", "Wanting AI features without a clear use case"],
    body: "Data pipelines, dashboards, and AI features built around an actual business question, not a proof-of-concept that never leaves the demo.",
    services: ["AI Development", "Data Analytics", "Custom Software Development"],
    problems: withFixes(
      ["Data spread across disconnected tools", "No clear pipeline from raw data to a usable dashboard", "Wanting AI features without a clear use case"],
      ["A pipeline that consolidates scattered data sources into one reliable place.", "A build path from raw data to a dashboard your team actually opens, not just a data lake.", "AI features scoped to a real business question first, so the feature has a reason to exist."]
    ),
  },
  {
    slug: "healthcare",
    keywords: "healthcare software development, hospital management system, clinic management software, telemedicine app development, patient management system, healthcare app development India, EHR software",
    seoDescription:
      "Healthcare software with privacy and accessibility designed in from day one — appointment flows, patient portals and clinical tools, not a retrofit.",
    icon: HeartPulse,
    title: "Healthcare",
    tagline: "Privacy and accessibility as first-class requirements.",
    challenges: ["Patient data that has to be handled carefully", "Appointment flows that need to work for everyone", "Accessibility requirements that are easy to overlook"],
    body: "Appointment flows and patient-facing tools built with privacy and accessibility as requirements from day one, not a retrofit.",
    services: ["Web Development", "Custom Software Development", "UI/UX Design"],
    problems: withFixes(
      ["Patient data that has to be handled carefully", "Appointment flows that need to work for everyone", "Accessibility requirements that are easy to overlook"],
      ["Privacy treated as a requirement from the first data-model decision, not a checklist at the end.", "Booking flows tested against real, varied patients — not just the easiest path through a demo.", "Accessibility designed in from day one, not audited in afterward."]
    ),
  },
  {
    slug: "food-beverages",
    seoTitle: "Food & Beverage Software Development Company",
    h1: "Food & Beverage Software Development",
    keywords: "food and beverage software, restaurant management software, food delivery app development, FMCG distribution software, inventory software for food business, online ordering system",
    seoDescription:
      "Ordering, reservation and inventory systems for restaurants and food businesses, built to stay reliable through the dinner rush rather than a quiet demo.",
    icon: UtensilsCrossed,
    title: "Food & Beverages",
    tagline: "Ordering and operations that hold up during a dinner rush.",
    challenges: ["Online ordering that breaks under peak-hour traffic", "Menu and inventory updates spread across platforms", "Delivery and reservation systems that don't talk to each other"],
    body: "Ordering, reservation, and inventory systems built to stay reliable during the busiest hour of the night, not just in a quiet demo.",
    services: ["Web Development", "E-Commerce Solutions", "Custom Software Development"],
    problems: withFixes(
      ["Online ordering that breaks under peak-hour traffic", "Menu and inventory updates spread across platforms", "Delivery and reservation systems that don't talk to each other"],
      ["Ordering systems load-tested against a real dinner rush, not just a quiet afternoon demo.", "One place to update the menu and inventory instead of syncing three platforms by hand.", "Delivery and reservations sharing one system, so a booked table and an incoming order don't collide."]
    ),
  },
  {
    slug: "e-commerce",
    seoTitle: "E-commerce Software Development for Brands | Codelix",
    keywords: "e-commerce software development, e-commerce website development Ahmedabad, online store development, marketplace development, Shopify development, WooCommerce development, B2B e-commerce platform",
    seoDescription:
      "E-commerce storefronts engineered for speed and trust — fast product discovery, a low-friction checkout and a backend your team can actually run.",
    icon: ShoppingCart,
    title: "E-Commerce",
    tagline: "A fast, low-friction path from landing to checkout.",
    challenges: ["Cart abandonment from slow or clunky checkout", "Inventory and orders spread across tools", "Mobile traffic that converts worse than desktop"],
    body: "Storefronts engineered around speed and trust — fast product discovery, a frictionless checkout, and a backend your team can actually run.",
    services: ["E-Commerce Solutions", "Web Development"],
    problems: withFixes(
      ["Cart abandonment from slow or clunky checkout", "Inventory and orders spread across tools", "Mobile traffic that converts worse than desktop"],
      ["A checkout engineered for speed and clarity, cutting the friction that causes cart abandonment.", "Inventory and orders unified into one backend your team can actually run day to day.", "A mobile experience treated as the primary path, not a shrunk-down desktop layout."]
    ),
  },
  {
    slug: "real-estate-construction",
    seoTitle: "Construction & Real Estate Software Development",
    keywords: "real estate software development, construction management software, property management software, real estate CRM, real estate app development, builder ERP software",
    seoDescription:
      "Listing platforms and project-tracking tools that keep availability, documents and client communication accurate in one system as things move quickly.",
    icon: Building,
    title: "Real Estate & Construction",
    tagline: "Listings and project data that stay accurate as things move fast.",
    challenges: ["Listings and availability that go stale across platforms", "Project and document tracking spread across tools", "Client-facing portals that feel like an afterthought"],
    body: "Listing platforms and project-tracking tools that keep availability, documents, and client communication in one accurate system.",
    services: ["Web Development", "Custom Software Development"],
    problems: withFixes(
      ["Listings and availability that go stale across platforms", "Project and document tracking spread across tools", "Client-facing portals that feel like an afterthought"],
      ["One accurate source of truth for listings and availability, instead of syncing platforms by hand.", "Project and document tracking consolidated into a single system your team actually maintains.", "Client-facing portals designed as a real product surface, not a bolted-on afterthought."]
    ),
  },
  {
    slug: "education",
    seoTitle: "Education Software & School Management Systems",
    h1: "Education Software & School Management Systems",
    keywords: "education software development, school management system, edtech app development, learning management system, LMS development, college management software, online learning platform",
    seoDescription:
      "Course catalogues, admissions flows and student portals built to hold up under real enrolment traffic — education software that survives results day.",
    icon: GraduationCap,
    title: "Education",
    tagline: "Built for real enrolment load, not a demo.",
    challenges: ["Admissions journeys that lose applicants midway", "Course catalogues that are hard to browse", "Student portals that break under real usage"],
    body: "Course catalogues, admissions flows, and student portals designed to hold up under real enrolment traffic, not just a polished demo.",
    services: ["Web Development", "Custom Software Development"],
    problems: withFixes(
      ["Admissions journeys that lose applicants midway", "Course catalogues that are hard to browse", "Student portals that break under real usage"],
      ["Admissions flows designed to carry an applicant all the way through, not lose them halfway.", "Course catalogues built around how students actually search and compare, not a flat list.", "Student portals load-tested against real enrolment traffic, not just a polished walkthrough."]
    ),
  },
  {
    slug: "startups",
    keywords: "software development for startups, MVP development, startup app development, product development for startups, MVP development company India, startup tech partner",
    seoDescription:
      "Marketing sites and product experiences that explain something new clearly, capture signups and keep evolving as fast as the product behind them does.",
    icon: Rocket,
    title: "Startups",
    tagline: "Ship the idea clearly, capture the signup.",
    challenges: ["Explaining a new idea in one scroll", "Needing to look credible with a small team", "Iterating fast without rebuilding from scratch"],
    body: "Marketing sites and product experiences built to explain something new clearly, capture signups, and evolve fast as the product does.",
    services: ["Web Development", "Custom Software Development", "AI Development"],
    problems: withFixes(
      ["Explaining a new idea in one scroll", "Needing to look credible with a small team", "Iterating fast without rebuilding from scratch"],
      ["A single scroll built to explain the idea clearly and get to a signup fast.", "A production-grade build that reads as credible, regardless of team size.", "An architecture built to evolve quickly, not one that has to be rebuilt after the first pivot."]
    ),
  },
  {
    slug: "b2b-saas",
    keywords: "B2B SaaS development, SaaS product development, multi-tenant SaaS, SaaS development company India, SaaS application development, subscription software development",
    seoDescription:
      "Product dashboards and internal operations tools for B2B SaaS, built to stay usable as the team, the data and the customer base all grow at once.",
    icon: Layers,
    title: "B2B SaaS",
    tagline: "Internal systems and product dashboards that scale with the team.",
    challenges: ["Internal tools that don't scale past the first few hires", "Onboarding flows that lose enterprise buyers", "Dashboards that can't keep up with growing data"],
    body: "Product dashboards and internal operations tools built to stay usable as the team, the data, and the customer base all grow at once.",
    services: ["Custom Software Development", "Application Development", "Data Analytics"],
    problems: withFixes(
      ["Internal tools that don't scale past the first few hires", "Onboarding flows that lose enterprise buyers", "Dashboards that can't keep up with growing data"],
      ["Internal tools architected to keep working as headcount grows, not just for the first ten users.", "Onboarding flows built around what an enterprise buyer actually needs to see before they commit.", "Dashboards designed to stay fast as data volume scales, not just in an early demo dataset."]
    ),
  },
  {
    slug: "travel-hospitality",
    keywords: "travel software development, hotel management software, booking engine development, travel app development, hospitality software, tour booking system",
    seoTitle: "Travel & Hospitality Software | Codelix IT Solutions",
    seoDescription:
      "Booking and reservation platforms designed to stay fast and accurate through seasonal demand spikes, not only in a slow month.",
    icon: Plane,
    title: "Travel & Hospitality",
    tagline: "Booking flows that hold up during peak season.",
    challenges: ["Booking systems that break during high-demand periods", "Availability across properties or routes going out of sync", "Guest-facing tools that feel outdated"],
    body: "Booking and reservation platforms designed to stay accurate and fast under seasonal demand spikes, not just in a slow month.",
    services: ["Web Development", "Custom Software Development", "UI/UX Design"],
    problems: withFixes(
      ["Booking systems that break during high-demand periods", "Availability across properties or routes going out of sync", "Guest-facing tools that feel outdated"],
      ["Booking systems load-tested against peak season demand, not just a slow-month baseline.", "Availability kept in sync across properties or routes in real time, not on a delayed batch job.", "Guest-facing tools redesigned to feel current, not like a decade-old booking widget."]
    ),
  },
];

export const industryBySlug = (slug) => INDUSTRIES.find((i) => i.slug === slug);

/* maps each industry's slug to the exact `industry` string used in
   each case study's industry field in the admin panel (including its existing typos —
   "Bavarages", "estae" — kept verbatim so the match actually works)
   so a detail page can pull in real, already-shipped case studies
   instead of inventing "related work". */
export const WORK_INDUSTRY_MAP = {
  "manufacturing": "Manufacturing",
  "fintech": "FinTech",
  "ai-data": "Ai & Data",
  "healthcare": "Healthcare",
  "food-beverages": "Food and Bavarages",
  "e-commerce": "E-commerce",
  "real-estate-construction": "Real estae and construction",
  "education": "Education",
  "startups": "Startups",
  "b2b-saas": "B2B SaaS",
  "travel-hospitality": "Travel & Hospitality",
};
