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
    faqs: [
      { q: "Can the software pull data from our machines and weighbridges?", a: "Usually, yes. Where a machine, controller or weighbridge can export data or exposes an API, we read from it directly instead of having someone re-type readings. We check what each machine supports on the first call." },
      { q: "Does it handle GST e-invoicing and e-way bills?", a: "Yes. Since 1 August 2023, e-invoicing applies to businesses whose aggregate turnover exceeded ₹5 crore in any financial year from 2017-18, and the ERP generates e-invoices and e-way bills with each dispatch." },
      { q: "Can we keep Tally for accounts?", a: "Yes. Codelix ERP includes accounting and GST, but it can also connect to Tally through its XML interface if your accountant prefers to stay on Tally." },
      { q: "How long does it take to go live?", a: "Codelix ERP typically goes live in 4 to 12 weeks, depending on modules, workflow and data migration. A fully custom ERP is rolled out module by module over 3 to 6 months." },
    ],
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
    faqs: [
      { q: "Do you build to regulatory requirements?", a: "We build the controls auditors and regulators look for: audit trails, role-based access, encryption and data retention rules. The exact rules depend on your licence, so we work alongside your compliance team on what applies to you." },
      { q: "How do you handle KYC?", a: "Through the API of the KYC or verification provider you choose, with documents stored encrypted and every access logged." },
      { q: "Does the DPDP Act apply to fintech software?", a: "Yes, to any personal data you hold. Most of the duties under the DPDP Rules, 2025 apply from around mid-May 2027; our DPDP guide covers what to plan for." },
      { q: "Do you have a finance product of your own?", a: "Yes. Audytee is our practice management software for CA firms, covering clients, compliance deadlines, documents and billing." },
    ],
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
    faqs: [
      { q: "Do we need a data warehouse before using AI?", a: "No. Most first projects start from the data you already have in Tally, an ERP, a CRM or spreadsheets, cleaned and joined for one purpose. A warehouse is worth building once several teams need the same data." },
      { q: "Will our data be used to train AI models?", a: "We use business API plans and settings that keep your data out of model training where the provider offers that, keep your data in your own accounts, and go through the provider's terms with you before anything goes live." },
      { q: "What does a first AI project cost?", a: "On our published pricing, a chatbot on your documents or a few automated workflows costs $5,000–$15,000, and AI connected to your CRM, ERP or product $15,000–$40,000." },
      { q: "Do you work with Power BI?", a: "Yes. We build Power BI reports and data models, or custom dashboards where Power BI isn't a fit." },
    ],
    seoTitle: "AI & Data Software Development | Codelix",
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
    faqs: [
      { q: "Have you built healthcare software before?", a: "Not as a published case study yet. What we bring are the same building blocks healthcare software needs (records, appointments, role-based access and audit logs) from HR, school and ERP systems we have shipped, and we are upfront about that on the first call." },
      { q: "Can you make our software DPDP or HIPAA compliant?", a: "We build the technical safeguards those rules require: access control, encryption, audit logs, consent and data deletion. Compliance also depends on your own processes, so we work alongside your compliance advisor." },
      { q: "Where is patient data stored?", a: "In a cloud account you own, in the region you choose, with encrypted storage and tested backups." },
      { q: "How is a healthcare project priced?", a: "Fixed scope, fixed price: you get a written quote after a scoping call, before any work starts." },
    ],
    seoTitle: "Healthcare Software Development | Codelix",
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
    faqs: [
      { q: "Can it track stock by batch and expiry date?", a: "Yes. Stock is tracked by batch, manufacturing and expiry date, and dispatch can follow first-expiry-first-out." },
      { q: "Can distributors place their own orders?", a: "Yes, through an ordering app or portal with each distributor's own price list, plus outstanding balances." },
      { q: "Can online sales and distributor orders share the same stock?", a: "Yes. That is the point of one connected system: a sale on your D2C store and a distributor order both update the same stock." },
      { q: "Can it work with Tally?", a: "Yes. Orders and invoices can sync to Tally, so your accounts stay in the tool your accountant already uses." },
    ],
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
    faqs: [
      { q: "Should we build on Shopify or go custom?", a: "Most new brands should start on Shopify. A custom store makes sense for dealer pricing, bulk B2B ordering, several warehouses or a marketplace; our e-commerce cost guide compares the options." },
      { q: "Can you connect our store to Tally or our ERP?", a: "Yes. Orders, stock and invoices can sync between the store and Tally or an ERP, so nothing oversells." },
      { q: "Which payment gateways do you integrate?", a: "Razorpay, PayU and Cashfree for customers paying in rupees, and Stripe or PayPal for international customers." },
      { q: "Can you speed up our existing store?", a: "Yes. We measure it on real phones, fix the biggest causes first, and show before-and-after numbers for each change." },
    ],
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
    faqs: [
      { q: "Is the construction ERP for contractors or builders?", a: "Both. It covers tenders, projects, tasks, procurement and equipment, which contractors and builders both run across several sites." },
      { q: "Does it work at the site on a phone?", a: "Yes. Site teams use the mobile app to record progress, material use and requests, and the office sees it the same day." },
      { q: "Can you build a housing society app?", a: "Yes. We have built one for residential communities, and our own AanganOne app covers visitors, maintenance billing, complaints and notices." },
      { q: "How long does the construction ERP take to go live?", a: "Typically 4 to 12 weeks, depending on how many modules you take, your workflow and how much data is moved." },
    ],
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
    faqs: [
      { q: "Can parents use the school app?", a: "Yes. Parents see attendance, homework, notices, fees and results, and staff and students each get their own view." },
      { q: "How do you handle children's data?", a: "India's DPDP Act requires verifiable consent from a parent or guardian before processing a child's personal data, so that consent step is built into sign-up, along with access controls." },
      { q: "Can fees be paid online?", a: "Yes, by UPI, cards or net banking, with receipts and reminders for overdue fees." },
      { q: "Do you build online course websites?", a: "Yes: course catalogues, enrolment, payments and lesson delivery, like the EdTech website in our case studies." },
    ],
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
    faqs: [
      { q: "How much does an MVP cost?", a: "On our published pricing, an MVP app for Android and iOS costs $5,000–$15,000, and a SaaS MVP with sign-up, one core workflow and subscriptions usually takes 8–12 weeks." },
      { q: "Will we own the code?", a: "Yes. The code lives in your repository and the hosting in your cloud accounts from day one, so investors and future hires can see and build on it." },
      { q: "Can you work with a non-technical founder?", a: "Yes. You get a written scope in plain language, a demo every two weeks, and decisions explained in terms of cost and risk, not jargon." },
      { q: "What happens after the MVP?", a: "Most startups move to a dedicated team once the product is live and the backlog grows; others pay per change. You can switch either way." },
    ],
    seoTitle: "MVP & Startup Software Development | Codelix",
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
    faqs: [
      { q: "Can your developers join our existing engineering team?", a: "Yes. Dedicated developers work in your repository, tools and stand-ups and report to your tech lead." },
      { q: "Single-tenant or multi-tenant?", a: "Most B2B SaaS products start multi-tenant, with a tenant ID on every record; separate databases make sense when customers contractually require data isolation." },
      { q: "Can you add AI features to our product?", a: "Yes: search, summaries, assistants and agents built into the product, with costs and accuracy tracked." },
      { q: "Do you handle subscription billing?", a: "Yes, through Razorpay for rupee payments or Stripe for other currencies, including trials, upgrades and failed-payment retries." },
    ],
    seoTitle: "B2B SaaS Software Development Company | Codelix",
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
    faqs: [
      { q: "Have you built travel software before?", a: "Not as a published case study yet. The parts a booking system needs (live availability, payments, notifications and admin panels) are ones we have built in marketplace and community apps, and we are upfront about that on the first call." },
      { q: "Can it connect to OTAs or a channel manager?", a: "Where the OTA or channel manager offers an API, yes. We confirm which ones you use and what each supports on the first call." },
      { q: "Can international guests pay in their own currency?", a: "Yes, through Stripe or PayPal alongside an Indian gateway for rupee payments." },
      { q: "How is a travel project priced?", a: "Fixed scope, fixed price: a written quote after a scoping call, before any work starts." },
    ],
    keywords: "travel software development, hotel management software, booking engine development, travel app development, hospitality software, tour booking system",
    seoTitle: "Travel & Hospitality Booking Software | Codelix",
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
