/* 18 additional service pages, beyond the 8 core services already on the
   main Services page/nav dropdown. Per the brief: build a dedicated page
   for each, structured identically to the 8 core ServiceDetailV2-style
   pages, but surfaced only from the footer (not the nav dropdown or the
   ServicesV2 grid) — see the "More Services" footer row in footerData.js.
   Title/description are used verbatim as given; "covers" is that same
   description broken into its listed items, not invented detail. */

import {
  Cloud, CloudCog, Plug, Workflow, Building2, Bot, Sparkles, Server,
  PenTool, Store, CreditCard, RefreshCw, BarChart3, TrendingUp, Database,
  Gauge, ShieldCheck, Users,
  AlertTriangle, Clock, Puzzle,
} from "lucide-react";

/* six pain→fix pairs per service — grounded in that service's own
   description (not a different, invented claim), same "sound familiar"
   pattern and count already used on the 8 core service pages. Icon
   rotates by position rather than being hand-picked per row — decorative,
   not meaningful per problem. */
const PAIN_ICONS = [AlertTriangle, Clock, Puzzle];
const pains = (rows) => rows.map((p, i) => ({ ...p, icon: PAIN_ICONS[i % PAIN_ICONS.length] }));

const splitCovers = (description) =>
  description
    .replace(/\.$/, "")
    .split(",")
    .flatMap((part) => part.split(" and "))
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1));

/* maps each additional service to the closest of the 7 real project
   categories (see WorkV2/projectsData.js) so "Related Work" can show
   real, already-shipped projects instead of inventing fake ones — several
   additional services have no close real-project match, so they simply
   render without that section (see AdditionalServiceDetailV2.jsx). */
const RAW = [
  {
    slug: "saas-product-development",
    icon: Cloud,
    title: "SaaS Product Development",
    description: "Build scalable SaaS platforms, multi-tenant applications, subscription systems, and cloud-based products.",
    relatedCategory: "Custom Software Development",
    problems: pains([
      { pain: "Our product can't handle more than a handful of tenants.", fix: "We architect multi-tenant systems designed to scale from your first customer to your thousandth." },
      { pain: "Subscription billing is duct-taped together.", fix: "Proper subscription systems built in from the start, not bolted on later." },
      { pain: "We're not sure our infrastructure will hold up.", fix: "Cloud-based products built for the load you'll actually see, not just the demo." },
      { pain: "Every new customer means manual setup work.", fix: "Self-serve onboarding built into the product, not handled by your team one signup at a time." },
      { pain: "You can't tell which features actually get used.", fix: "Usage tracking built into the product from day one, not bolted on after the fact." },
      { pain: "Your roadmap keeps getting derailed by technical debt.", fix: "Architecture decisions made upfront so scaling doesn't mean rebuilding." },
    ]),
  },
  {
    slug: "cloud-solutions-migration",
    icon: CloudCog,
    title: "Cloud Solutions & Migration",
    description: "Cloud-native application development, cloud migration, infrastructure modernization, and cloud consulting.",
    relatedCategory: null,
    problems: pains([
      { pain: "We're still running on infrastructure we've outgrown.", fix: "Cloud migration planned around zero unplanned downtime, not a risky weekend cutover." },
      { pain: "Our cloud bill keeps climbing with no clear reason.", fix: "Infrastructure modernization that right-sizes what you're actually using." },
      { pain: "Nobody in-house understands our cloud setup end to end.", fix: "Cloud consulting that leaves your team with real documentation, not a black box." },
      { pain: "You're paying for infrastructure sized for peak load you rarely hit.", fix: "Auto-scaling infrastructure that matches cost to actual demand." },
      { pain: "A single server outage takes the whole product down.", fix: "Redundant, cloud-native architecture designed so one failure doesn't cascade." },
      { pain: "Migrating feels too risky to schedule.", fix: "A phased migration plan with rollback points at every stage." },
    ]),
  },
  {
    slug: "api-development-integration",
    icon: Plug,
    title: "API Development & Integration",
    description: "RESTful APIs, GraphQL APIs, third-party integrations, payment gateways, CRM/ERP integrations, and middleware development.",
    relatedCategory: "Custom Software Development",
    problems: pains([
      { pain: "Our systems don't talk to each other.", fix: "RESTful and GraphQL APIs built specifically to connect the tools you already run." },
      { pain: "Every new integration takes weeks of guesswork.", fix: "Clean, documented middleware that makes the next integration faster, not harder." },
      { pain: "Payment or CRM data lives in silos.", fix: "Direct integrations with your payment gateway, CRM, or ERP — no manual syncing." },
      { pain: "Your API breaks every time you change something internally.", fix: "Versioned APIs designed so internal changes don't break external consumers." },
      { pain: "Third-party integrations keep timing out or failing silently.", fix: "Middleware with proper retry logic, logging, and failure alerts." },
      { pain: "Nobody has documented what your APIs actually do.", fix: "Clear API documentation so your team — and ours — isn't guessing." },
    ]),
  },
  {
    slug: "workflow-automation",
    icon: Workflow,
    title: "Workflow Automation",
    description: "Business process automation, custom workflows, no-code/low-code automation, and system integrations.",
    relatedCategory: null,
    problems: pains([
      { pain: "The same manual process eats hours every week.", fix: "Custom workflow automation that removes the repetitive step entirely." },
      { pain: "You've outgrown spreadsheets but aren't ready for a full platform.", fix: "No-code/low-code automation that fits how your team already works." },
      { pain: "Your tools don't sync with each other.", fix: "System integrations that keep every tool updated automatically." },
      { pain: "New hires take weeks to learn a process that should be automatic.", fix: "Automated workflows that guide the process instead of relying on memory." },
      { pain: "Errors slip through because a manual step gets skipped.", fix: "Automation that enforces the steps instead of hoping someone remembers." },
      { pain: "You've automated the easy parts but the hard parts are still manual.", fix: "Custom automation built for your actual edge cases, not just the happy path." },
    ]),
  },
  {
    slug: "erp-crm-development",
    seoTitle: "Custom ERP & CRM Software Development Company | Codelix IT Solutions",
    seoDescription:
      "Custom ERP and CRM software development for manufacturing, inventory, HRMS and enterprise operations. ERP development company in Ahmedabad, India.",
    icon: Building2,
    title: "ERP & CRM Development",
    description: "Custom ERP, CRM, inventory management, HRMS, manufacturing software, and enterprise business applications.",
    relatedCategory: "Custom Software Development",
    problems: pains([
      { pain: "Off-the-shelf ERP doesn't match how you actually operate.", fix: "Custom ERP and CRM built around your real processes, not a generic template." },
      { pain: "Inventory, HR, and sales data live in separate systems.", fix: "One enterprise application unifying inventory, HRMS, and business data." },
      { pain: "Manufacturing operations run on paper or spreadsheets.", fix: "Purpose-built manufacturing software that replaces manual tracking." },
      { pain: "Your sales and finance teams see different numbers.", fix: "One shared system so every department works from the same data." },
      { pain: "Reports take a day to compile because data has to be pulled from five places.", fix: "Enterprise applications built around one unified database." },
      { pain: "New employee access is set up inconsistently.", fix: "Role-based access built into the system from day one." },
    ]),
  },
  {
    slug: "ai-agent-development",
    icon: Bot,
    title: "AI Agent Development",
    description: "Custom AI agents, autonomous workflows, AI copilots, and intelligent assistants for businesses.",
    relatedCategory: "AI Development",
    problems: pains([
      { pain: "You want AI to do real work, not just answer questions.", fix: "Custom AI agents built to execute autonomous workflows, not just chat." },
      { pain: "Your team is buried in repetitive decision-making.", fix: "AI copilots that handle the repeatable judgment calls so your team doesn't have to." },
      { pain: "Off-the-shelf AI tools don't fit your process.", fix: "Intelligent assistants built around your specific business logic." },
      { pain: "You've tried AI tools but they don't fit how your team actually works.", fix: "Agents built around your specific workflows, not a generic template." },
      { pain: "Nobody trusts the AI's output enough to act on it.", fix: "Agents designed with clear guardrails and human checkpoints where it matters." },
      { pain: "You don't know where to even start with AI.", fix: "We help identify the highest-value automation opportunity first, not the flashiest one." },
    ]),
  },
  {
    slug: "generative-ai-solutions",
    icon: Sparkles,
    title: "Generative AI Solutions",
    description: "LLM-powered applications, AI chatbots, content generation, RAG systems, and AI-powered search.",
    relatedCategory: "AI Development",
    problems: pains([
      { pain: "You need an AI chatbot that actually knows your business.", fix: "RAG systems that ground responses in your real data, not generic training data." },
      { pain: "Content creation doesn't scale with your team.", fix: "LLM-powered content generation tuned to your voice and use case." },
      { pain: "Search on your platform returns irrelevant results.", fix: "AI-powered search that understands intent, not just keywords." },
      { pain: "Your chatbot gives confidently wrong answers.", fix: "RAG systems grounded in your actual data, reducing hallucinated responses." },
      { pain: "Content generation still needs heavy manual editing.", fix: "Models tuned to your voice and format so output needs less rework." },
      { pain: "You're not sure generative AI is worth the investment yet.", fix: "We start with a scoped pilot so you can validate value before scaling up." },
    ]),
  },
  {
    slug: "cloud-infrastructure-services",
    icon: Server,
    title: "Cloud Infrastructure Services",
    description: "AWS, Azure, Google Cloud deployment, DevOps, Docker, Kubernetes, CI/CD, and server management.",
    relatedCategory: null,
    problems: pains([
      { pain: "Deployments are manual and error-prone.", fix: "CI/CD pipelines that make every deployment repeatable and safe." },
      { pain: "Your infrastructure doesn't scale under real traffic.", fix: "Docker and Kubernetes setups built for the load you'll actually see." },
      { pain: "Nobody owns your AWS, Azure, or GCP setup.", fix: "Ongoing server management so infrastructure isn't an afterthought." },
      { pain: "Every deployment is a stressful, manual event.", fix: "CI/CD pipelines that make deployment routine, not risky." },
      { pain: "You don't have visibility into what's actually running.", fix: "Proper monitoring and logging across your infrastructure." },
      { pain: "Scaling for a traffic spike means scrambling.", fix: "Kubernetes and Docker setups built to scale automatically, not manually." },
    ]),
  },
  {
    slug: "ux-research-design-systems",
    icon: PenTool,
    title: "UX Research & Design Systems",
    description: "User research, usability testing, wireframing, prototyping, design systems, and accessibility improvements.",
    relatedCategory: "UI/UX Design",
    problems: pains([
      { pain: "You're designing based on opinions, not evidence.", fix: "Real user research and usability testing before a single screen gets built." },
      { pain: "Every new feature looks like it came from a different team.", fix: "A documented design system that keeps every screen consistent." },
      { pain: "Users with accessibility needs can't use your product.", fix: "Accessibility improvements built in, not retrofitted after complaints." },
      { pain: "Feedback from users never makes it back into design decisions.", fix: "A research process that actually closes the loop back into design." },
      { pain: "Designers and developers argue about what the spec actually says.", fix: "A documented design system that removes the ambiguity." },
      { pain: "You ship features nobody asked for.", fix: "Usability testing before build, not after launch." },
    ]),
  },
  {
    slug: "marketplace-development",
    icon: Store,
    title: "Marketplace Development",
    description: "Multi-vendor marketplaces, B2B portals, B2C marketplaces, and vendor management systems.",
    relatedCategory: "E-Commerce Solutions",
    problems: pains([
      { pain: "You need buyers and sellers on one platform, not two workflows.", fix: "Multi-vendor marketplace architecture built for both sides from day one." },
      { pain: "Vendor onboarding is a manual, error-prone process.", fix: "Vendor management systems that handle onboarding, payouts, and approvals." },
      { pain: "You're not sure if B2B or B2C logic fits your model.", fix: "Marketplace builds tailored to B2B portals or B2C storefronts, whichever fits." },
      { pain: "Sellers churn because onboarding takes too long.", fix: "Streamlined vendor onboarding built to get sellers live fast." },
      { pain: "You have no visibility into marketplace health.", fix: "Admin tooling that surfaces vendor performance and platform activity." },
      { pain: "Trust between buyers and sellers is hard to establish.", fix: "Review, rating, and dispute systems built into the platform." },
    ]),
  },
  {
    slug: "payment-integration-services",
    icon: CreditCard,
    title: "Payment Integration Services",
    description: "Stripe, Razorpay, PayPal, UPI, subscription billing, and secure payment gateway integration.",
    relatedCategory: "E-Commerce Solutions",
    problems: pains([
      { pain: "Customers abandon checkout because payment options are limited.", fix: "Stripe, Razorpay, PayPal, and UPI integrated so customers pay however they want." },
      { pain: "Subscription billing errors are costing you revenue.", fix: "Subscription billing built to handle upgrades, downgrades, and failed payments correctly." },
      { pain: "You're not confident your payment flow is secure.", fix: "Secure payment gateway integration done right the first time." },
      { pain: "International customers can't pay in their preferred method.", fix: "Multiple payment gateways integrated so no customer is turned away." },
      { pain: "Reconciling payments across gateways is a manual mess.", fix: "Unified payment reporting across every gateway you use." },
      { pain: "Failed recurring payments quietly cost you revenue.", fix: "Dunning logic that retries and recovers failed subscription payments." },
    ]),
  },
  {
    slug: "legacy-system-modernization",
    icon: RefreshCw,
    title: "Legacy System Modernization",
    description: "Modernize outdated software, migrate legacy applications, improve performance, and adopt modern technologies.",
    relatedCategory: "Custom Software Development",
    problems: pains([
      { pain: "Your core system runs on technology nobody maintains anymore.", fix: "Modernization that migrates you to a stack your team can actually hire for." },
      { pain: "The old system is slow and everyone's used to working around it.", fix: "Performance improvements that fix the bottlenecks, not just add more hardware." },
      { pain: "You're afraid migrating will break something critical.", fix: "Migration planned around your actual usage, tested before the switch, not after." },
      { pain: "Only one person understands how the old system actually works.", fix: "Modernization that documents the logic as it's migrated, not just replicated blindly." },
      { pain: "New features take months because the codebase fights you.", fix: "A modern architecture that makes future features faster to ship, not slower." },
      { pain: "You're stuck on a vendor that no longer supports your version.", fix: "Migration off unsupported platforms onto something your team can maintain." },
    ]),
  },
  {
    slug: "business-intelligence-solutions",
    icon: BarChart3,
    title: "Business Intelligence Solutions",
    description: "BI dashboards, KPI reporting, Power BI, Tableau, executive dashboards, and decision support systems.",
    relatedCategory: "Data Analytics",
    problems: pains([
      { pain: "Leadership makes decisions without seeing the real numbers.", fix: "Executive dashboards that put the real numbers in front of decision-makers." },
      { pain: "Reporting is a manual, once-a-month scramble.", fix: "KPI reporting that updates automatically instead of a spreadsheet fire drill." },
      { pain: "You have Power BI or Tableau but nobody built it out properly.", fix: "BI dashboards configured around the decisions you actually need to make." },
      { pain: "Every department has its own version of the truth.", fix: "One dashboard layer built on a single source of truth." },
      { pain: "Dashboards exist but nobody actually looks at them.", fix: "BI built around the decisions people actually need to make, not vanity metrics." },
      { pain: "You can see what happened but not why.", fix: "Drill-down reporting that gets from the headline number to the root cause." },
    ]),
  },
  {
    slug: "predictive-analytics",
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Forecasting, machine learning models, customer insights, and business prediction systems.",
    relatedCategory: "Data Analytics",
    problems: pains([
      { pain: "You're reacting to problems instead of seeing them coming.", fix: "Forecasting models that flag what's likely to happen before it does." },
      { pain: "You don't know which customers are about to churn.", fix: "Customer insight models built to flag risk and opportunity early." },
      { pain: "Your team debates predictions instead of trusting a model.", fix: "Business prediction systems trained on your real data, not generic assumptions." },
      { pain: "You only find out about a problem after it's already hurt the business.", fix: "Models built to flag risk while there's still time to act." },
      { pain: "Your forecasts are last year's numbers with a guess added.", fix: "Forecasting built on real patterns in your own data." },
      { pain: "Nobody on the team trusts a 'black box' prediction.", fix: "Models explained in plain terms, not delivered as an unexplainable number." },
    ]),
  },
  {
    slug: "data-engineering",
    icon: Database,
    title: "Data Engineering",
    description: "ETL pipelines, data warehousing, big data processing, and data integration solutions.",
    relatedCategory: "Data Analytics",
    problems: pains([
      { pain: "Your data lives in five different places and nowhere clean.", fix: "ETL pipelines that consolidate your data into one reliable source." },
      { pain: "Reports take days to run because of how data is structured.", fix: "Data warehousing designed for the queries your team actually runs." },
      { pain: "You're collecting data but can't use any of it.", fix: "Big data processing pipelines that turn raw data into something usable." },
      { pain: "Every analyst builds their own version of the same pipeline.", fix: "Centralized, reusable data pipelines instead of duplicated one-off scripts." },
      { pain: "Your data warehouse slows to a crawl as it grows.", fix: "Warehousing designed to stay fast as your data volume scales." },
      { pain: "Bad data quietly breaks downstream reports.", fix: "Validation built into the pipeline so bad data gets caught early." },
    ]),
  },
  {
    slug: "performance-optimization",
    icon: Gauge,
    title: "Performance Optimization",
    description: "Website speed optimization, database tuning, API optimization, scalability improvements, and performance audits.",
    relatedCategory: null,
    problems: pains([
      { pain: "Your site or app is slow and it's costing you conversions.", fix: "Speed optimization audits that find the actual bottleneck, not guesswork." },
      { pain: "Database queries get slower as your data grows.", fix: "Database tuning that keeps performance steady as you scale." },
      { pain: "You don't know if your system can handle a traffic spike.", fix: "Scalability improvements tested against the load you're planning for." },
      { pain: "You've thrown more servers at a problem instead of fixing it.", fix: "Root-cause performance audits instead of masking the symptom." },
      { pain: "Performance was fine at launch but has degraded since.", fix: "Ongoing performance monitoring, not a one-time fix." },
      { pain: "You don't know which part of the stack is the actual bottleneck.", fix: "Profiling that pinpoints exactly where time is being lost." },
    ]),
  },
  {
    slug: "security-maintenance",
    icon: ShieldCheck,
    title: "Security & Maintenance",
    description: "Security updates, vulnerability fixes, monitoring, backups, maintenance, and ongoing technical support.",
    relatedCategory: null,
    problems: pains([
      { pain: "Nobody's kept your dependencies or plugins up to date.", fix: "Ongoing security updates and vulnerability fixes, on a schedule, not an afterthought." },
      { pain: "You'd have no idea if the system went down at 2am.", fix: "Monitoring and backups that catch problems before your customers do." },
      { pain: "Every bug fix waits for someone to have free time.", fix: "Ongoing technical support with real response times, not best-effort." },
      { pain: "You found out about a vulnerability from a customer, not your team.", fix: "Proactive vulnerability scanning instead of waiting for someone to report it." },
      { pain: "Backups exist but nobody's tested restoring from one.", fix: "Backup systems that are actually tested, not just assumed to work." },
      { pain: "Maintenance only happens when something breaks.", fix: "Scheduled maintenance that catches problems before they become outages." },
    ]),
  },
  {
    slug: "dedicated-development-teams",
    icon: Users,
    title: "Dedicated Development Teams",
    description: "Hire dedicated developers, UI/UX designers, QA engineers, AI engineers, and full-stack development teams.",
    relatedCategory: null,
    problems: pains([
      { pain: "Hiring in-house is slow and your roadmap can't wait.", fix: "Dedicated developers who plug into your team within weeks, not months." },
      { pain: "You need specialized skills for a few months, not a full-time hire.", fix: "QA engineers, AI engineers, and full-stack developers available on demand." },
      { pain: "Managing multiple freelancers is its own job.", fix: "One dedicated team under one point of contact, not a pile of freelancers to coordinate." },
      { pain: "You're not sure the freelancer you hired can actually deliver.", fix: "Vetted engineers with a track record, not a resume that sounds good." },
      { pain: "Ramping up a new hire takes months you don't have.", fix: "Teams that plug into your existing tools and workflows from week one." },
      { pain: "You need to scale the team up or down and can't do it fast.", fix: "Flexible team sizing that scales with your actual workload." },
    ]),
  },
];

export const ADDITIONAL_SERVICES = RAW.map((s) => ({
  ...s,
  covers: splitCovers(s.description),
}));

export const additionalServiceBySlug = (slug) =>
  ADDITIONAL_SERVICES.find((s) => s.slug === slug);
