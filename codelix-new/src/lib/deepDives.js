/* Question-and-answer sections, keyed by page path, rendered by
   Shared/DeepDive.jsx. Each one answers a question that Search Console
   (Jul–Oct 2026) shows people asking on the way to that page, and gives the
   page something no other page on the site has: the service pages shared one
   template, and the core service pages had no search impressions of their
   own. Plan: codelixitsolutions.com-audit/2026-11-01-search-console/
   PAGE-CONTENT-PLAN.md.

   Only facts that are already published elsewhere on the site (our price
   bands, timelines, case studies) or that carry a source checked on
   1 November 2026. Anything time-sensitive says "as of" and names the
   source, so it can be re-checked. */
import { BASE_ESTIMATES, COST_FAMILIES } from "./pricingBands";
import { HIRE_ROLES } from "../MyComponents/HireDevelopersV2/hireDevelopersData";

const SITE_BLOG = "/blog/";
const CHECKED = "as of 1 November 2026";

const hire = (slug) => {
  const role = HIRE_ROLES.find((r) => r.slug === slug);
  return { label: role.title, href: `/hire-developers/${slug}` };
};

const CWV = {
  cols: ["Metric", "What it measures", "Good result"],
  rows: [
    ["Largest Contentful Paint (LCP)", "How fast the main content appears", "2.5 seconds or less"],
    ["Interaction to Next Paint (INP)", "How fast the page responds to a tap or click", "200 milliseconds or less"],
    ["Cumulative Layout Shift (CLS)", "How much the layout jumps while loading", "0.1 or less"],
  ],
};
const CWV_SOURCE = { label: `web.dev, Web Vitals (${CHECKED})`, href: "https://web.dev/articles/vitals" };
const E_INVOICE_SOURCE = { label: "Notification 10/2023-Central Tax, GST Council", href: "https://gstcouncil.gov.in/sites/default/files/2024-05/10ct_eng.pdf" };

/* every band from the price table, in the order the calculator lists them */
const bandRows = COST_FAMILIES.map((f) => [f.label, ...BASE_ESTIMATES[f.key]]);

export const DEEP_DIVES = {
  /* ───────── core service pages ───────── */
  "/services/web-development": [
    {
      id: "web-cost",
      label: "Cost & Stack",
      question: "How much does web development cost, and which stack should you use?",
      answer: "A business website of 5–15 pages costs $1,500–$5,000, a custom site or web app with logins and integrations $5,000–$10,000, and a large portal $10,000–$25,000. We build marketing sites in Next.js or WordPress, admin-heavy business apps in Laravel, and real-time apps and APIs in Node.js, and recommend one after hearing what the application spends its time doing.",
      table: {
        cols: ["What you need", "Usually built with", "Typical timeline"],
        rows: [
          ["Business website with a CMS", "Next.js or WordPress", "3–6 weeks"],
          ["Admin-heavy web app (portals, booking, ERP-style)", "Laravel with React or Vue", "6–12 weeks"],
          ["Real-time app or API for web and mobile", "Node.js (NestJS or Express) with React", "6–12 weeks"],
          ["Large platform with many roles and integrations", "Chosen per module", "Phased over several months"],
        ],
      },
      more: [
        { label: "Website development cost in India", href: `${SITE_BLOG}website-development-cost-in-india` },
        { label: "Laravel vs Node.js", href: `${SITE_BLOG}laravel-vs-node-js-for-business-web-apps` },
      ],
    },
    {
      id: "web-speed",
      label: "Speed",
      question: "How fast should a business website be?",
      answer: "Google ranks sites on how they work on a phone, and publishes three Core Web Vitals targets for page experience. We build to those targets from the first sprint, because retrofitting speed into a finished site costs more than designing for it.",
      table: CWV,
      source: CWV_SOURCE,
    },
  ],
  "/services/application-development": [
    {
      id: "app-cost",
      label: "Cost & Approach",
      question: "How much does a mobile app cost, and should it be cross-platform?",
      answer: "An MVP for Android and iOS costs $5,000–$15,000, a full app with payments, notifications and its backend $15,000–$35,000, and a multi-sided platform above $35,000. Most business apps are built once in Flutter or React Native and released to both stores; separate native apps make sense only for heavy device or graphics work.",
      table: {
        cols: ["Approach", "Best for", "Cost"],
        rows: [
          ["Flutter", "New apps that want the same polished UI on every phone", "One codebase for both stores"],
          ["React Native", "Teams already using React or JavaScript", "One codebase, shares logic with a React website"],
          ["Native (Kotlin and Swift)", "Heavy device features, AR, complex graphics", "Two codebases, noticeably more"],
        ],
      },
      more: [
        { label: "App development cost in India", href: `${SITE_BLOG}app-development-cost-in-india` },
        { label: "Flutter vs React Native", href: `${SITE_BLOG}flutter-vs-react-native` },
        hire("flutter"),
        hire("react-native"),
      ],
    },
    {
      id: "app-stores",
      label: "App Stores",
      question: "What do Apple and Google charge to publish an app?",
      answer: `${CHECKED[0].toUpperCase()}${CHECKED.slice(1)}, the Apple Developer Program costs $99 a year and Google Play charges a one-time US$25 registration fee. Google also requires new apps and updates to target a recent Android version, which from 31 August 2026 is Android 16 (API level 36), so plan for regular updates even when nothing else changes.`,
      more: [
        { label: "Apple Developer Program", href: "https://developer.apple.com/programs/" },
        { label: "Google Play registration fee", href: "https://support.google.com/googleplay/android-developer/answer/6112435" },
        { label: "Google Play target API requirement", href: "https://support.google.com/googleplay/android-developer/answer/11926878" },
      ],
    },
  ],
  "/services/e-commerce-solutions": [
    {
      id: "ecom-choice",
      label: "Platform & Cost",
      question: "Shopify, WooCommerce or a custom store: which fits, and what does it cost?",
      answer: "A Shopify or WooCommerce store set up with your products, payments and shipping costs $3,000–$8,000; a custom store with ERP or inventory sync and GST invoices $8,000–$20,000; a multi-vendor marketplace above $20,000. Most new D2C brands should start on Shopify. A custom build makes sense when your rules don't fit a platform: dealer pricing, bulk B2B orders or several warehouses.",
      table: {
        cols: ["Option", "Running cost", "Best for"],
        rows: [
          ["Shopify", "Monthly plan plus apps (Basic is ₹1,499 a month paid yearly, as of 1 November 2026)", "Launching fast without managing servers"],
          ["WooCommerce", "Hosting plus paid plugins", "Businesses already on WordPress"],
          ["Custom store", "Hosting and maintenance", "B2B ordering, deep ERP integration, marketplaces"],
        ],
      },
      source: { label: `Shopify India pricing (${CHECKED})`, href: "https://www.shopify.com/in/pricing" },
      more: [
        { label: "E-commerce website development cost in India", href: `${SITE_BLOG}e-commerce-website-development-cost-in-india` },
        hire("shopify"),
        { label: "Makhana store case study", href: "/case-study/makhana-store-case-study" },
      ],
    },
  ],
  "/services/custom-software-development": [
    {
      id: "custom-what",
      label: "What We Build",
      question: "What custom software do businesses ask us to build?",
      answer: "Mostly systems that replace spreadsheets and disconnected tools: ERP and CRM, HR and payroll, internal operations tools and customer portals. A focused system costs $10,000–$25,000, a multi-module platform $25,000–$60,000, and a company-wide system above $60,000, with a fixed written quote before work starts.",
      points: [
        { title: "ERP and CRM", body: "Inventory, sales, purchase, production and accounts in one system, with Tally sync and GST e-invoicing.", links: [{ label: "ERP case study", href: "/case-study/erp-case-study" }, { label: "ERP & CRM development", href: "/services/erp-crm-development" }] },
        { title: "HR and payroll", body: "Attendance, leave, payroll runs and employee self-service.", links: [{ label: "HR portal case study", href: "/case-study/hr-portal-case-study" }, { label: "Payroll case study", href: "/case-study/payroll-case-study" }] },
        { title: "Operations tools", body: "Internal dashboards and workflows built around how your team already works.", links: [{ label: "Internal ops ERP case study", href: "/case-study/internal-ops-erp-case-study" }] },
        { title: "Customer and partner portals", body: "Ordering, tracking and self-service for the people outside your company." },
      ],
      more: [
        { label: "Custom software development cost in India", href: `${SITE_BLOG}custom-software-development-cost-in-india` },
        { label: "Custom vs off-the-shelf software", href: `${SITE_BLOG}custom-software-vs-off-the-shelf-software` },
        { label: "Cost calculator", href: "/software-development-cost-calculator" },
      ],
    },
  ],
  "/services/ai-development": [
    {
      id: "ai-what",
      label: "AI In Practice",
      question: "What can an AI development company build for your business?",
      answer: "The AI work that pays off for most businesses is narrow and measurable: a chatbot that answers from your own documents, automation that reads invoices or emails and enters the data, and AI features inside software you already use. A first chatbot or a few automated workflows costs $5,000–$15,000; AI connected to your CRM, ERP or product $15,000–$40,000.",
      points: [
        { title: "Chatbots on your own data", body: "Answers drawn from your documents, product catalogue or policies, on your website or WhatsApp, with a hand-off to a person.", links: [{ label: "AI chatbot cost in India", href: `${SITE_BLOG}ai-chatbot-cost-in-india` }] },
        { title: "Document and email automation", body: "Reading invoices, orders and forms, extracting the fields, and entering them into your systems for review." },
        { title: "AI agents", body: "Software that takes multi-step actions across your tools with approval steps.", links: [{ label: "AI agent development", href: "/services/ai-agent-development" }] },
        { title: "AI features in your product", body: "Search, summaries, recommendations or drafting built into an existing app.", links: [{ label: "Generative AI solutions", href: "/services/generative-ai-solutions" }] },
      ],
    },
  ],

  /* ───────── additional service pages ───────── */
  "/services/erp-crm-development": [
    {
      id: "erp-gst",
      label: "GST & Tally",
      question: "Does a custom ERP handle GST e-invoicing and work with Tally?",
      answer: "Yes. Since 1 August 2023, e-invoicing applies to businesses whose aggregate turnover exceeded ₹5 crore in any financial year from 2017-18, so the ERP has to generate each B2B invoice in the e-invoice format and register it, usually through a GST Suvidha Provider API. Many businesses keep Tally for accounts and sync vouchers and ledgers from the ERP, so the accounts team doesn't change tools.",
      source: E_INVOICE_SOURCE,
      table: {
        cols: ["Question", "Typical answer"],
        rows: [
          ["What does it cost?", "From about ₹2.5 lakh for a focused setup to ₹25 lakh+ company-wide, plus a yearly AMC of 15–20%"],
          ["How long does it take?", "6–10 weeks for two or three modules; 3–6 months for a full ERP, rolled out module by module"],
          ["Which modules first?", "The one that hurts most, usually inventory or sales"],
        ],
      },
      more: [
        { label: "ERP software development cost in India", href: `${SITE_BLOG}erp-software-development-cost-in-india` },
        { label: "When to move from Tally to ERP", href: `${SITE_BLOG}when-to-move-from-tally-to-erp` },
        { label: "ERP for the ceramic industry", href: `${SITE_BLOG}erp-for-ceramic-industry` },
        { label: "Codelix ERP editions", href: "/products/codelix-erp" },
      ],
    },
  ],
  "/services/ai-agent-development": [
    {
      id: "agent-what",
      label: "AI Agents, Explained",
      question: "What is an AI agent, and what can it do for a business?",
      answer: "An AI agent is software that uses a language model to decide on and carry out a sequence of steps across your tools: reading an email, looking up the order, drafting a reply and updating the CRM. Unlike a chatbot, it acts. Business agents work best on repetitive, rule-heavy tasks, with a person approving anything that spends money or contacts a customer.",
      points: [
        { title: "Sales", body: "Qualifying inbound leads, enriching records and drafting follow-ups for a rep to send." },
        { title: "Support", body: "Answering from your knowledge base, checking order status and escalating with a summary." },
        { title: "Finance", body: "Matching invoices to purchase orders and flagging mismatches for review." },
        { title: "Operations", body: "Turning emails and forms into tasks, updates and reports across your systems." },
      ],
    },
    {
      id: "agent-skills",
      label: "Skills & Guardrails",
      question: "What skills and guardrails does a production AI agent need?",
      answer: "An agent is only as useful as the tools (skills) it can call and as safe as the limits around them. We build each skill as a small, tested function with its own permissions, log every action, and put approval steps and spending limits in front of anything irreversible. For enterprises, that also means role-based access, audit logs and keeping data in the region you choose.",
      table: {
        cols: ["Part", "What we build"],
        rows: [
          ["Skills (tools)", "Functions the agent can call: search the CRM, create a ticket, read a PDF, send a draft"],
          ["Guardrails", "Approval steps, allowed actions per role, spending and rate limits"],
          ["Monitoring", "A log of every step, model costs per task, alerts on failures"],
          ["Evaluation", "A test set of real tasks, re-run before each change goes live"],
        ],
      },
      more: [{ label: "AI chatbot cost in India", href: `${SITE_BLOG}ai-chatbot-cost-in-india` }],
    },
  ],
  "/services/payment-integration-services": [
    {
      id: "pay-gateways",
      label: "Choosing a Gateway",
      question: "Which payment gateway should you integrate in India?",
      answer: "For customers paying in rupees, an Indian gateway such as Razorpay, PayU or Cashfree covers UPI, cards, net banking and wallets. For international customers, Stripe or PayPal handle other currencies. Many businesses integrate one of each behind a single checkout. Compare current fees on each gateway's own pricing page before you choose.",
      table: {
        cols: ["Gateway", "Typical use", "Note"],
        rows: [
          ["Razorpay", "Indian customers: UPI, cards, net banking, subscriptions", "Standard 2% platform fee per successful domestic transaction, plus GST (as of 1 November 2026)"],
          ["PayU / Cashfree", "Indian customers, alternatives to Razorpay", "Check current pricing on their sites"],
          ["Stripe", "International cards and multi-currency billing", "Strong for subscriptions and SaaS"],
          ["PayPal", "International buyers who prefer a PayPal wallet", "Usually added alongside a card gateway"],
        ],
      },
      source: { label: `Razorpay pricing (${CHECKED})`, href: "https://razorpay.com/pricing/" },
    },
    {
      id: "pay-done-right",
      label: "Done Properly",
      question: "What does a reliable payment integration include?",
      answer: "Taking a payment is the easy part. A reliable integration confirms every payment on the server, handles refunds and failures, and reconciles what the gateway settled against your orders, so nothing is marked paid that wasn't.",
      points: [
        { title: "Server-side confirmation", body: "Orders are marked paid only after the gateway's signed webhook confirms it, never from the browser alone." },
        { title: "Refunds and failures", body: "Full and partial refunds from your admin panel, and clear retry paths when UPI or a card payment fails." },
        { title: "Reconciliation", body: "A daily match of settlements against orders, with mismatches flagged." },
        { title: "Split payouts", body: "For marketplaces, commissions and seller payouts through tools like Razorpay Route or Stripe Connect.", links: [{ label: "Marketplace development", href: "/services/marketplace-development" }] },
      ],
    },
  ],
  "/services/marketplace-development": [
    {
      id: "mkt-needs",
      label: "Beyond a Store",
      question: "What does a multi-vendor marketplace need that a normal store doesn't?",
      answer: "A marketplace is a store plus everything needed to manage other sellers: onboarding and verifying them, splitting each payment between seller and platform, routing orders to the right seller, and handling reviews and disputes. A marketplace MVP is priced in our above-$20,000 e-commerce band, and the payout logic is usually the most important part to get right.",
      points: [
        { title: "Seller onboarding", body: "Sign-up, KYC documents, bank details and approval before a seller can list." },
        { title: "Commissions and payouts", body: "Automatic split of each payment into the platform's commission and the seller's share, through Razorpay Route or Stripe Connect." },
        { title: "Order routing", body: "Each item in a basket goes to its own seller, with separate shipping and status." },
        { title: "Trust", body: "Reviews, ratings, dispute handling and seller performance reports." },
      ],
      more: [
        { label: "Car marketplace case study", href: "/case-study/car-marketplace-case-study" },
        { label: "Payment integration", href: "/services/payment-integration-services" },
      ],
    },
  ],
  "/services/performance-optimization": [
    {
      id: "perf-targets",
      label: "The Targets",
      question: "What should performance optimization achieve?",
      answer: "For websites, success is measured against Google's Core Web Vitals, judged on real phones rather than a fast office laptop. For enterprise software, it is response times on the slowest, most-used screens and reports, under the load your busiest day brings. Either way, we measure first, fix the biggest causes, and measure again.",
      table: CWV,
      source: CWV_SOURCE,
    },
    {
      id: "perf-audit",
      label: "The Audit",
      question: "What does a performance audit cover?",
      answer: "An audit finds where the time goes before anything is changed, so the fixes are the ones that move the numbers.",
      points: [
        { title: "Front end", body: "Render-blocking CSS and scripts, image sizes and formats, fonts, and layout shifts." },
        { title: "Back end", body: "Slow database queries, missing indexes, N+1 queries and caching." },
        { title: "Infrastructure", body: "Server size, CDN, compression and cache headers." },
        { title: "Large applications", body: "Load tests on the busiest workflows and reports, with a before-and-after for each fix." },
      ],
    },
  ],
  "/services/workflow-automation": [
    {
      id: "auto-tools",
      label: "Choosing a Tool",
      question: "n8n, Zapier, Make or custom code: which should you automate with?",
      answer: "Use Zapier or Make when the apps you use already have connectors and the volume is modest. Use n8n when you want to self-host so data stays on your own server, or need code steps. Use custom code when volume is high, the logic is complex, or a system has no connector at all, such as Tally or an older ERP.",
      table: {
        cols: ["Tool", "Best for", "Watch out for"],
        rows: [
          ["Zapier", "Quick automations between popular SaaS apps", "Costs grow with the number of tasks run"],
          ["Make", "Visual multi-step scenarios with branching", "Complex scenarios get hard to maintain"],
          ["n8n", "Self-hosting, data control, code steps", "Someone has to host and update it"],
          ["Custom code", "High volume, complex rules, systems without connectors", "Higher upfront cost"],
        ],
      },
    },
    {
      id: "auto-examples",
      label: "Examples",
      question: "Which business processes are worth automating first?",
      answer: "Start with work that is frequent, rule-based and currently done by copying data between tools.",
      points: [
        { title: "Invoice to payment reminder", body: "Overdue invoices trigger WhatsApp or email reminders on a schedule.", links: [{ label: "WhatsApp payment reminders guide", href: `${SITE_BLOG}whatsapp-payment-reminders-for-invoices` }] },
        { title: "Lead to CRM", body: "Website and ad leads land in the CRM, assigned and followed up automatically." },
        { title: "Order to ERP", body: "Online orders create sales orders and invoices without re-typing." },
        { title: "Monday report", body: "The weekly report builds itself from live data and arrives by email." },
      ],
    },
  ],
  "/services/dedicated-development-teams": [
    {
      id: "team-shapes",
      label: "Team Shapes",
      question: "What does a dedicated development team in India look like?",
      answer: "A dedicated IT team works only on your product, in your tools and stand-ups, and is billed monthly. It can be a single developer joining your team, a small pod, or a full squad that owns a product, and it can grow or shrink as the roadmap changes.",
      table: {
        cols: ["Shape", "Who is in it", "Best for"],
        rows: [
          ["One developer", "A developer in your stack, reporting to your lead", "Clearing a backlog alongside your own team"],
          ["Pod", "Two or three developers with part-time QA", "A feature stream or a second product"],
          ["Full squad", "Project lead, developers, QA and a designer", "Owning a product end to end"],
        ],
      },
      more: [
        { label: "In-house vs outsourcing", href: `${SITE_BLOG}in-house-vs-outsourcing-software-development` },
        { label: "Hire developers by technology", href: "/hire-developers" },
      ],
    },
  ],
  "/services/generative-ai-solutions": [
    {
      id: "genai-uses",
      label: "Use Cases",
      question: "What can generative AI do for a business?",
      answer: "Generative AI is most useful where people spend time reading, writing or searching: answering questions from your documents, drafting replies and descriptions, and pulling data out of unstructured files. The common pattern is retrieval-augmented generation (RAG): the model answers from your own content, with sources, instead of from memory.",
      points: [
        { title: "Answers from your documents", body: "Search and Q&A over manuals, policies and past tickets, with links to the source." },
        { title: "Drafting", body: "Product descriptions, email replies and reports drafted for a person to review." },
        { title: "Extraction", body: "Fields pulled from invoices, contracts and forms into structured data." },
        { title: "Data privacy", body: "Personal data handled in line with India's DPDP Rules, with clear retention and access controls.", links: [{ label: "DPDP compliance guide", href: `${SITE_BLOG}dpdp-act-compliance-for-small-business` }] },
      ],
    },
  ],
  "/services/legacy-system-modernization": [
    {
      id: "legacy-choice",
      label: "The Decision",
      question: "Should you rewrite, refactor or replatform a legacy system?",
      answer: "Refactor when the system works and the code is sound but dated. Replatform when the code is fine but the hosting, framework version or database is the problem. Rewrite only when the system no longer matches how the business works. Whichever you choose, move in phases so the old system keeps running until the new one is proven.",
      table: {
        cols: ["Approach", "When it fits", "Risk"],
        rows: [
          ["Refactor", "Working system, maintainable code, outdated parts", "Low"],
          ["Replatform", "Unsupported framework, PHP version or server", "Medium"],
          ["Rewrite", "The software no longer fits the business", "Highest; phase it"],
        ],
      },
      more: [{ label: "Laravel support policy: bug fixes 18 months, security fixes 2 years per release", href: "https://laravel.com/docs/master/releases" }],
    },
  ],
  "/services/api-development-integration": [
    {
      id: "api-india",
      label: "Common Integrations",
      question: "Which integrations do Indian businesses ask for most?",
      answer: "Most requests connect the tools that run money and orders: accounting, tax, payments, messaging and shipping. Each integration we build logs every run, retries failures and alerts someone when a third-party service is down.",
      points: [
        { title: "Tally", body: "Vouchers, ledgers and stock synced from your website, ERP or app through Tally's XML/ODBC interface." },
        { title: "GST e-invoicing", body: "B2B invoices registered through a GST Suvidha Provider API, for businesses above the ₹5 crore threshold." },
        { title: "WhatsApp Business", body: "Order updates, reminders and support conversations through the WhatsApp Business Platform." },
        { title: "Payments and shipping", body: "Razorpay, PayU or Stripe for payments; courier and Shiprocket APIs for labels and tracking.", links: [{ label: "Payment integration", href: "/services/payment-integration-services" }] },
      ],
    },
  ],
  "/services/security-maintenance": [
    {
      id: "sec-answer",
      label: "Fix & Maintain",
      question: "My website has bugs and security issues. Which company can fix and maintain it?",
      answer: "We take over existing websites and applications, including ones we didn't build. The first step is an audit of the code, plugins, server and backups; then we fix what is urgent and put the site on a monthly maintenance plan, which starts at $500–$1,500 a month.",
      points: [
        { title: "Week one", body: "Access handover, full backup, security scan, and a list of what is broken or out of date." },
        { title: "Urgent fixes", body: "Patching vulnerabilities, removing malware, and fixing the bugs that block customers." },
        { title: "Every month", body: "Updates, uptime and security monitoring, tested backups and small changes." },
        { title: "Personal data", body: "Access controls and breach logging in line with India's DPDP Rules.", links: [{ label: "DPDP compliance guide", href: `${SITE_BLOG}dpdp-act-compliance-for-small-business` }] },
      ],
    },
  ],
  "/services/predictive-analytics": [
    {
      id: "pred-data",
      label: "Getting Started",
      question: "What data do you need for demand forecasting?",
      answer: "Usually less than people expect: two or more years of sales or dispatch history by product and date, plus anything that explains the spikes, such as promotions, seasons or price changes. Most manufacturers and distributors already have this in Tally, an ERP or spreadsheets; the work is cleaning it and joining it up.",
      points: [
        { title: "History", body: "Sales or dispatch by product, location and date; the longer the better." },
        { title: "Drivers", body: "Promotions, price changes, festivals and seasons that move demand." },
        { title: "Constraints", body: "Lead times, minimum order quantities and capacity." },
        { title: "Output", body: "A forecast per product per week or month, with how confident the model is.", links: [{ label: "Data engineering", href: "/services/data-engineering" }] },
      ],
    },
  ],

  /* ───────── industries ───────── */
  "/industries/manufacturing": [
    {
      id: "mfg-what",
      label: "What We Build",
      question: "What manufacturing software do we develop?",
      answer: "Software that connects the shop floor to the office: production planning, inventory and batch tracking, quality checks and dispatch with GST paperwork, in one system instead of spreadsheets. We build it as a custom ERP or as editions of our own Codelix ERP for manufacturing, ceramic and textile units, with APIs to pull data from machines and existing tools.",
      points: [
        { title: "Production planning", body: "Bills of materials, job work, work orders and capacity across lines and shifts.", links: [{ label: "Manufacturing ERP", href: "/products/codelix-erp/manufacturing" }] },
        { title: "Inventory and batches", body: "Raw material, work-in-progress and finished goods by batch and location." },
        { title: "Quality and grading", body: "Inspections, rejections and grades recorded at each stage.", links: [{ label: "Ceramic ERP", href: "/products/codelix-erp/ceramic" }, { label: "Textile ERP", href: "/products/codelix-erp/textile" }] },
        { title: "Dispatch and GST", body: "E-invoices and e-way bills generated with each dispatch, for businesses above the ₹5 crore e-invoicing threshold." },
        { title: "Machine and system APIs", body: "Data pulled from machines, weighbridges, Tally and other software through APIs instead of manual entry.", links: [{ label: "API development", href: "/services/api-development-integration" }] },
      ],
      more: [
        { label: "ERP for the ceramic industry", href: `${SITE_BLOG}erp-for-ceramic-industry` },
        { label: "When to move from Tally to ERP", href: `${SITE_BLOG}when-to-move-from-tally-to-erp` },
      ],
    },
  ],
  "/industries/food-beverages": [
    {
      id: "fnb-what",
      label: "What We Build",
      question: "What software do food and beverage businesses need?",
      answer: "Most food and beverage businesses need three things to work together: tracking stock by batch and expiry date, selling direct to consumers online, and taking orders from distributors and retailers. We build these as one connected system, so a sale online or a distributor order updates the same stock.",
      points: [
        { title: "Batch and expiry tracking", body: "Stock by batch, manufacturing and expiry date, with first-expiry-first-out dispatch." },
        { title: "D2C online store", body: "A fast mobile store with UPI and COD.", links: [{ label: "Makhana store case study", href: "/case-study/makhana-store-case-study" }] },
        { title: "Distributor ordering", body: "Price lists per distributor, order apps for field sales, and outstanding tracking." },
      ],
    },
  ],
  "/industries/fintech": [
    {
      id: "fin-what",
      label: "What We Build",
      question: "What does fintech software need from day one?",
      answer: "Fintech software has to be secure and auditable before it is clever: verified onboarding, payment flows that reconcile, a record of who changed what, and personal data handled to India's DPDP Rules. We design those in from the first sprint rather than adding them before an audit.",
      points: [
        { title: "Onboarding and KYC", body: "Document capture and verification steps with a clear status for each customer." },
        { title: "Payments that reconcile", body: "Gateway integration with server-side confirmation and daily settlement matching.", links: [{ label: "Payment integration", href: "/services/payment-integration-services" }] },
        { title: "Audit trails", body: "Every change to money or customer data logged with who, what and when." },
        { title: "Practice software", body: "Our own Audytee is practice management software for CA firms.", links: [{ label: "Audytee", href: "/products/audytee" }] },
      ],
    },
  ],

  /* ───────── technologies hub ───────── */
  "/technologies": [
    {
      id: "tech-hire",
      label: "By Technology",
      question: "Which technology do we use for what?",
      answer: "We pick the stack per project: what the product needs to do, who will maintain it, and what it has to connect to. Each technology below links to the developers you can hire for it.",
      points: [
        { title: "Web front end", body: "React and Next.js for most web apps and fast marketing sites; Angular and Vue where a team already uses them.", links: [hire("react"), hire("nextjs"), hire("angular"), hire("vuejs")] },
        { title: "Back end and APIs", body: "Laravel for admin-heavy business apps, Node.js for real-time apps and APIs, Python for data and AI, Java for large enterprise systems.", links: [hire("laravel"), hire("nodejs"), hire("python"), hire("java"), hire("php")] },
        { title: "Full stack", body: "One team across front end and back end, in MERN or React with Laravel or Node.", links: [hire("full-stack"), hire("mern")] },
        { title: "Mobile", body: "Flutter or React Native for one codebase on Android and iOS; Kotlin and Swift for native work.", links: [hire("flutter"), hire("react-native"), hire("android"), hire("ios")] },
        { title: "E-commerce and CMS", body: "Shopify for stores that need to launch fast; WordPress for content-led sites.", links: [hire("shopify"), hire("wordpress")] },
        { title: "AI, cloud, QA and design", body: "LLM, agent and chatbot work; AWS and CI/CD; manual and automated testing; UI/UX design.", links: [hire("ai"), hire("devops"), hire("qa"), hire("ui-ux-designers")] },
      ],
      more: [
        { label: "Flutter vs React Native", href: `${SITE_BLOG}flutter-vs-react-native` },
        { label: "Laravel vs Node.js", href: `${SITE_BLOG}laravel-vs-node-js-for-business-web-apps` },
      ],
    },
  ],

  /* ───────── pricing and calculator ───────── */
  "/pricing": [
    {
      id: "price-bands",
      label: "All Price Ranges",
      question: "How much does software development cost in India?",
      answer: "On our published pricing, a business website costs $1,500–$5,000, a mobile app MVP $5,000–$15,000, an online store $3,000–$8,000, a focused ERP, CRM or custom system $10,000–$25,000, and a first AI or automation project $5,000–$15,000. Larger versions of each move into the higher bands below. Maintenance starts at $500–$1,500 a month.",
      table: { cols: ["Project type", "Simple", "Standard", "Complex"], rows: bandRows },
      more: [
        { label: "Website cost guide", href: `${SITE_BLOG}website-development-cost-in-india` },
        { label: "App cost guide", href: `${SITE_BLOG}app-development-cost-in-india` },
        { label: "E-commerce cost guide", href: `${SITE_BLOG}e-commerce-website-development-cost-in-india` },
        { label: "ERP cost guide", href: `${SITE_BLOG}erp-software-development-cost-in-india` },
        { label: "Custom software cost guide", href: `${SITE_BLOG}custom-software-development-cost-in-india` },
        { label: "AI chatbot cost guide", href: `${SITE_BLOG}ai-chatbot-cost-in-india` },
      ],
    },
    {
      id: "price-drivers",
      label: "What Changes the Price",
      question: "What decides where your project lands in the range?",
      answer: "Six things: how many screens and workflows there are, how many systems it connects to, how many kinds of users it has, how much old data has to move, how fast it has to be ready, and how much security and reliability it needs. A written scope pins all six down before a fixed quote.",
      more: [{ label: "Dedicated development teams", href: "/services/dedicated-development-teams" }],
    },
  ],
  "/software-development-cost-calculator": [
    {
      id: "calc-how",
      label: "How It Works",
      question: "How does this cost calculator work out a range?",
      answer: "It maps the type and size of your project onto the same price bands we publish on our pricing page and quote from, so the range is what similar projects have actually cost us to deliver. It is a starting point, not a quote: integrations, data migration, deadlines and third-party fees are confirmed on a scoping call.",
      table: {
        cols: ["Example", "Size", "Range"],
        rows: [
          ["A 10-page business website with a CMS", "Simple website", BASE_ESTIMATES.Web[0]],
          ["An MVP app for Android and iOS", "Simple mobile app", BASE_ESTIMATES.App[0]],
          ["Sales, purchase, inventory and accounts in one system", "Standard ERP", BASE_ESTIMATES.Enterprise[1]],
        ],
      },
      points: [
        { title: "Not included", body: "Third-party fees (app store accounts, hosting, payment gateway charges, paid APIs) and content such as photos and copy." },
        { title: "Next step", body: "A free scoping call, then a written quote with scope, price and timeline." },
      ],
    },
  ],
};
