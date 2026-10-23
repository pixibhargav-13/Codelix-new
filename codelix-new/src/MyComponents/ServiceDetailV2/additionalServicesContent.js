/* The parts of each additional service page that are about THAT service:
   a short overview, who typically asks for it, the tools it is built with,
   and the questions buyers ask about it. These pages used to share their
   "who it's for", tech grid and FAQ word for word (only the service name
   swapped in), which reads to Google as eighteen copies of one page.

   Use cases describe the kinds of businesses and situations the service is
   for, not named past clients. `stack` names that match techStack.js show
   their logo; the rest render as text. Merged into ADDITIONAL_SERVICES in
   additionalServicesData.js. */

export const SERVICE_CONTENT = {
  "saas-product-development": {
    overview: "A SaaS product has to work for its hundredth customer as well as its first. We design the tenant model, subscription billing, roles and onboarding up front, so growth adds customers rather than rework. Most builds start as an MVP that charges real money within a few months, then expand feature by feature.",
    useCases: [
      { title: "Spreadsheet to software", body: "A business that runs a process in Excel for clients and wants to sell it as a subscription product." },
      { title: "Founder-led MVP", body: "A startup that needs a paid first version in front of customers before raising or hiring a team." },
      { title: "Agency productising a service", body: "A services firm turning repeat client work into a self-serve tool with monthly plans." },
      { title: "Outgrown first build", body: "A SaaS whose first version can't handle more tenants, roles or plans without a rewrite." },
    ],
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "Stripe", "Razorpay", "AWS", "Docker"],
    faqs: [
      { q: "Single-tenant or multi-tenant — which does my SaaS need?", a: "Most B2B SaaS products start multi-tenant with a shared database and a tenant ID on every record; it is cheaper to run and easier to update. We recommend separate databases only when customers contractually require data isolation." },
      { q: "Which payment gateway should a SaaS use in India?", a: "Razorpay for Indian customers paying in rupees with UPI and cards; Stripe when most customers pay in other currencies. Both support recurring subscriptions, and we can integrate both behind one billing module." },
      { q: "How long does a SaaS MVP take to build?", a: "A focused MVP with sign-up, one core workflow, subscriptions and an admin panel usually takes 8–12 weeks. We agree the exact scope in writing before starting." },
    ],
  },
  "cloud-solutions-migration": {
    overview: "Cloud migration is mostly planning: what moves first, how data is copied without loss, and how to switch over without a weekend outage. We audit what you run today, move it to AWS or Azure in phases with a rollback at each step, then right-size the servers so the monthly bill reflects what you actually use.",
    useCases: [
      { title: "Office or hosting server retirement", body: "A business running its software on an in-office server or old shared hosting that needs reliability and backups." },
      { title: "Rising cloud bill", body: "A team already on the cloud paying for oversized servers and services nobody switched off." },
      { title: "Growth-driven move", body: "An application that slows down at peak times and needs to scale without manual intervention." },
      { title: "Compliance or data residency", body: "Companies that need data stored in a specific region with proper access controls and audit logs." },
    ],
    stack: ["AWS", "Azure", "Docker", "Terraform", "PostgreSQL", "Linux", "GitHub Actions", "Cloudflare"],
    faqs: [
      { q: "Will there be downtime during cloud migration?", a: "For most applications the final switch-over takes minutes, scheduled out of business hours. Data is copied and verified in advance, and the old system stays available until the new one is confirmed working." },
      { q: "AWS or Azure — which should we move to?", a: "If your team already uses Microsoft 365 or .NET, Azure is often simpler. For most web and mobile backends AWS has the widest choice of services. We recommend based on your stack and team, not a partnership." },
      { q: "Will moving to the cloud reduce our costs?", a: "Usually, if the setup is right-sized and unused resources are turned off. A straight copy of an over-provisioned server can cost more, which is why sizing is part of every migration we do." },
    ],
  },
  "api-development-integration": {
    overview: "Most businesses run five to ten tools that don't talk to each other, so someone re-types orders, leads or invoices between them. We build documented REST and GraphQL APIs and integrations that move that data automatically, with retries, logging and alerts when a third-party service fails.",
    useCases: [
      { title: "Website to CRM or ERP", body: "Orders, enquiries and payments flowing from the website into the CRM, ERP or accounting system without manual entry." },
      { title: "Backend for a mobile app", body: "A secure, versioned API that a Flutter, Android or iOS app can rely on." },
      { title: "Partner and marketplace feeds", body: "Sharing stock, prices or orders with distributors, marketplaces and logistics partners." },
      { title: "Replacing fragile scripts", body: "Swapping one-off scripts and CSV uploads for integrations that log every run and alert on failure." },
    ],
    stack: ["Node.js", "Python", "Laravel", "PostgreSQL", "GraphQL", "Swagger / OpenAPI", "Redis", "AWS"],
    faqs: [
      { q: "REST or GraphQL — which API should we build?", a: "REST suits most integrations and public APIs because every tool supports it. GraphQL helps when several apps need different slices of the same data. Many systems use REST for partners and GraphQL for their own frontends." },
      { q: "Can you integrate with Tally, Zoho or other Indian business software?", a: "Yes, where the software exposes an API or import format. Tally integrations usually go through its XML/ODBC interface; Zoho, Shiprocket and most payment gateways have REST APIs." },
      { q: "What happens when a connected service goes down?", a: "Calls are retried with back-off, failed records are queued instead of lost, and you get an alert. Nothing silently disappears." },
    ],
  },
  "workflow-automation": {
    overview: "If someone on your team copies data between tools, chases approvals by email or builds the same report every Monday, that work can usually be automated. We map the process, automate the repeatable steps with n8n, Make, Zapier or custom code, and keep a person in the loop wherever judgement is needed.",
    useCases: [
      { title: "Lead handling", body: "New enquiries captured from forms, WhatsApp and ads, assigned to a salesperson and followed up automatically." },
      { title: "Approvals", body: "Purchase requests, leave and discounts routed to the right approver with reminders and an audit trail." },
      { title: "Reports on a schedule", body: "Daily or weekly reports assembled from several tools and sent to managers without anyone building them." },
      { title: "Document processing", body: "Invoices, forms and orders read with AI and entered into your systems for a person to confirm." },
    ],
    stack: ["n8n", "Make", "Zapier", "Python", "Node.js", "OpenAI API", "Google Workspace", "WhatsApp Business API"],
    faqs: [
      { q: "n8n, Make or Zapier — which automation tool should we use?", a: "Zapier is quickest for simple two-app flows. Make handles branching logic at lower cost. n8n can be self-hosted, which suits high volumes and sensitive data. We pick based on volume, cost and where your data may live." },
      { q: "Can WhatsApp be part of an automation?", a: "Yes, through the official WhatsApp Business API — for order updates, reminders and lead replies. Messages must follow WhatsApp's template and opt-in rules, which we set up with you." },
      { q: "What if an automated step makes a mistake?", a: "Each flow logs every run, failed steps alert a named person, and anything with financial impact waits for a human approval before it acts." },
    ],
  },
  "erp-crm-development": {
    overview: "Off-the-shelf ERPs force your process into their screens. A custom ERP or CRM is built around how your business already works — your production steps, approval chain, pricing rules and GST reporting — and replaces the spreadsheets and disconnected tools that grew around the old system. It is rolled out module by module so operations never stop.",
    useCases: [
      { title: "Manufacturers", body: "Production planning, BOM, inventory, dispatch and GST e-invoicing in one system instead of Tally plus spreadsheets." },
      { title: "Distributors and traders", body: "Orders, stock across godowns, dealer pricing, credit limits and collections tracked in real time." },
      { title: "Service businesses", body: "A CRM that tracks leads, quotations, projects and renewals with reminders for the sales team." },
      { title: "Growing beyond Tally", body: "Companies whose accounts are in Tally but whose operations need workflows, approvals and dashboards." },
    ],
    stack: ["React", "Spring Boot", "Node.js", "PostgreSQL", "MySQL", "Flutter", "AWS", "GST e-invoice API"],
    faqs: [
      { q: "Custom ERP or an off-the-shelf ERP — which is better?", a: "Off-the-shelf works if your process matches the product. A custom ERP is better when your workflows are your advantage, or when you'd pay for many modules and use few. We'll tell you honestly which fits after a discovery call." },
      { q: "Can a custom ERP work alongside Tally?", a: "Yes. Many clients keep Tally for accounts while the ERP handles operations, with vouchers and ledgers synced between them. Moving accounts out of Tally is optional." },
      { q: "Does the ERP support GST e-invoice and e-way bills?", a: "Yes. E-invoices and e-way bills are generated through a GST Suvidha Provider API directly from sales and dispatch entries." },
    ],
  },
  "ai-agent-development": {
    overview: "An AI agent does more than answer questions — it reads information, decides what to do and takes actions in your tools, such as updating a CRM, drafting a reply or raising a ticket. We build agents on GPT, Claude or Gemini with clear limits: which tools they can use, when a person must approve, and how much each run may cost.",
    useCases: [
      { title: "Customer support agent", body: "Answers from your help docs and order data, and hands over to a person with the full context when it can't." },
      { title: "Sales assistant", body: "Qualifies inbound leads, enriches them with company data and books meetings into the right calendar." },
      { title: "Operations agent", body: "Checks orders, stock or tickets on a schedule and acts on exceptions instead of waiting for someone to notice." },
      { title: "Internal knowledge agent", body: "Lets staff ask questions across policies, SOPs and past projects, with links to the source documents." },
    ],
    stack: ["OpenAI API", "Anthropic Claude", "Google Gemini", "Python", "LangChain", "pgvector", "n8n", "Node.js"],
    faqs: [
      { q: "What is the difference between a chatbot and an AI agent?", a: "A chatbot answers questions. An agent can also act — look up an order, update a record, send an email — using tools you give it permission to use, with approval steps for anything sensitive." },
      { q: "Can an AI agent make mistakes, and how is that controlled?", a: "Yes, so agents are tested against real examples before launch, limited to specific tools and actions, logged on every run, and required to ask a person before anything irreversible." },
      { q: "How much does it cost to run an AI agent each month?", a: "Mostly model usage, which depends on volume. A support agent handling a few thousand conversations a month typically costs a modest amount in API fees; we estimate it from your real volumes before building." },
    ],
  },
  "generative-ai-solutions": {
    overview: "Generative AI is most useful inside the software you already use: answering questions from your own documents, drafting replies and descriptions, summarising long records or pulling data out of PDFs. We integrate large language models into your product or internal tools, grounded in your data, with privacy settings and cost limits agreed up front.",
    useCases: [
      { title: "Chat over your documents", body: "Staff or customers ask questions and get answers from manuals, policies and contracts, with citations." },
      { title: "Content drafting", body: "Product descriptions, proposals, emails and reports drafted from your data for a person to review." },
      { title: "Document extraction", body: "Invoices, purchase orders, forms and IDs read into structured data for your ERP or CRM." },
      { title: "AI features in a SaaS", body: "Summaries, smart search and suggestions added to an existing product for its users." },
    ],
    stack: ["OpenAI API", "Anthropic Claude", "Google Gemini", "Python", "FastAPI", "pgvector", "React", "AWS"],
    faqs: [
      { q: "Is our company data safe with ChatGPT or Claude APIs?", a: "Business API traffic from OpenAI, Anthropic and Google is not used to train their models by default. We also keep sensitive fields out of prompts where possible and document exactly what is sent." },
      { q: "What is RAG (retrieval-augmented generation)?", a: "The AI first searches your own documents for relevant passages, then answers using only those passages. It keeps answers grounded in your data and lets every answer link to its source." },
      { q: "Can generative AI work in Hindi or Gujarati?", a: "Current models handle Hindi and Gujarati reasonably well for reading and drafting. We test quality on your real content before relying on it." },
    ],
  },
  "cloud-infrastructure-services": {
    overview: "Good infrastructure is invisible: deployments are one click, the site stays up during traffic spikes, backups exist and have been restored at least once. We set up and run cloud infrastructure on AWS — containers, CI/CD pipelines, monitoring, backups and auto-scaling — and document it so your team is never locked out of its own servers.",
    useCases: [
      { title: "Manual deployments", body: "Teams that deploy by copying files to a server and want automated, repeatable releases." },
      { title: "Unknown server setup", body: "Infrastructure set up years ago by someone who has left, with no documentation." },
      { title: "Traffic spikes", body: "Sale days, campaigns or exam results that take the site down every time." },
      { title: "No tested backups", body: "Businesses that have never restored a backup and aren't sure they could." },
    ],
    stack: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Nginx", "Grafana", "Cloudflare"],
    faqs: [
      { q: "Do we need Kubernetes?", a: "Most small and mid-size applications don't. Docker with a managed service such as AWS ECS or a few well-sized servers is simpler and cheaper. We recommend Kubernetes only when you run many services at scale." },
      { q: "Who owns the cloud account?", a: "You do. Infrastructure is created in your AWS account, and we work with access you grant and can revoke at any time." },
      { q: "How do you monitor uptime and performance?", a: "Uptime checks, server and application metrics, error tracking and alerts to a named person, with dashboards your team can open too." },
    ],
  },
  "ux-research-design-systems": {
    overview: "When a product grows, every new screen gets designed slightly differently and every developer rebuilds the same button. UX research tells you what users actually struggle with; a design system — shared components, tokens and rules in Figma and code — keeps the product consistent and makes new features faster to design and build.",
    useCases: [
      { title: "Before a redesign", body: "Interviews and usability tests that show what to fix before anyone redraws screens." },
      { title: "Inconsistent product", body: "A product with five button styles and three date pickers that needs one shared library." },
      { title: "Growing design team", body: "Several designers and developers who need one source of truth to work from." },
      { title: "Low conversion or adoption", body: "Funnels or features where users drop off and nobody knows why." },
    ],
    stack: ["Figma", "Framer", "React", "Storybook", "Tailwind", "TypeScript", "Maze", "Hotjar"],
    faqs: [
      { q: "What is included in a design system?", a: "Design tokens (colours, type, spacing), a Figma component library, matching coded components, and usage guidelines so designers and developers build the same thing." },
      { q: "How many users do you need for UX research?", a: "Five to eight interviews or usability sessions per user type usually uncover the main problems. Analytics and session recordings then show how widespread each one is." },
      { q: "Can you build a design system for an existing product?", a: "Yes, and that is the most common case. We audit existing screens, consolidate patterns into components, and replace old ones gradually rather than all at once." },
    ],
  },
  "marketplace-development": {
    overview: "A marketplace is two products in one: a buying experience for customers and a selling toolkit for vendors, held together by commissions, payouts and trust. We build multi-vendor platforms with seller onboarding, listings, split payments, reviews and an admin panel to manage disputes and quality.",
    useCases: [
      { title: "B2C product marketplace", body: "Several sellers listing products to consumers, with the platform taking a commission on each order." },
      { title: "Services marketplace", body: "Booking local professionals — tutors, technicians, consultants — with scheduling and ratings." },
      { title: "B2B trade platform", body: "Manufacturers and distributors listing bulk products with tiered pricing and quotation requests." },
      { title: "Rental and resale", body: "Platforms for renting or reselling vehicles, equipment or property with listings and inspections." },
    ],
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "Razorpay Route", "Stripe Connect", "Flutter", "AWS"],
    faqs: [
      { q: "How are payments split between the platform and sellers?", a: "Through split-payment products such as Razorpay Route or Stripe Connect: the customer pays once, your commission is kept, and each seller's share is settled to their bank account on a schedule." },
      { q: "Do sellers need their own dashboard?", a: "Yes. Sellers manage listings, stock, orders and payouts from their own panel, while you control approvals, commissions and disputes from the admin." },
      { q: "Should a marketplace launch with a mobile app?", a: "Usually a fast mobile website first. Apps make sense once repeat customers or sellers need notifications and offline features." },
    ],
  },
  "payment-integration-services": {
    overview: "A payment integration isn't done when the first test payment succeeds. It needs webhooks that confirm payments reliably, handling for failures and refunds, subscription retries, GST-ready invoices and daily reconciliation with your bank settlements. We integrate Indian and international gateways into websites, apps and billing systems with all of that included.",
    useCases: [
      { title: "Website checkout", body: "UPI, cards, net banking and wallets on an e-commerce store or booking site." },
      { title: "Subscriptions", body: "Recurring billing for SaaS, memberships or services, including UPI AutoPay mandates." },
      { title: "In-app payments", body: "Payments inside Flutter, Android and iOS apps, following store rules for digital goods." },
      { title: "Reconciliation", body: "Matching gateway settlements against orders and invoices so accounts close without manual checking." },
    ],
    stack: ["Razorpay", "Stripe", "PayU", "Cashfree", "PayPal", "UPI AutoPay", "Node.js", "Laravel"],
    faqs: [
      { q: "Which payment gateway is best for an Indian business?", a: "Razorpay, PayU and Cashfree all support UPI, cards and net banking with similar fees. The choice usually comes down to settlement speed, subscription features and the support you get; we can integrate whichever you already have an account with." },
      { q: "Can customers pay in dollars or other currencies?", a: "Yes. Stripe, PayPal and the international products from Indian gateways accept foreign cards, subject to the gateway approving your business for cross-border payments." },
      { q: "How do you handle failed or duplicate payments?", a: "Payment status is confirmed through signed webhooks, not the browser redirect, and every order is processed once even if a webhook arrives twice. Failed subscription charges are retried automatically." },
    ],
  },
  "legacy-system-modernization": {
    overview: "Old software is rarely broken — it runs the business, which is exactly why replacing it feels risky. We modernise in phases: document what the system really does, wrap it with APIs, then rebuild one module at a time on a modern stack while the old one keeps working. Data is migrated and checked at each step.",
    useCases: [
      { title: "Desktop software to web", body: "A Visual Basic, FoxPro or .NET desktop application moved to a browser-based system staff can use anywhere." },
      { title: "Unsupported PHP versions", body: "Old PHP or CodeIgniter applications upgraded to supported versions or rebuilt in Laravel." },
      { title: "The developer has left", body: "Systems nobody in the company fully understands, with no documentation or tests." },
      { title: "Monolith slowing the team", body: "One large codebase where every change risks breaking something unrelated." },
    ],
    stack: ["Laravel", "Spring Boot", "React", "Node.js", "PostgreSQL", "Docker", "AWS", ".NET"],
    faqs: [
      { q: "Should we rewrite our legacy system or upgrade it?", a: "If the code is understandable and the stack is still supported, upgrading is cheaper. If the platform is end-of-life or every change breaks something, a phased rebuild is safer. An audit tells you which, before you commit." },
      { q: "Will we lose data during modernisation?", a: "No. Data is migrated with scripts that are run and verified on copies first, with row counts and spot checks signed off before the live move." },
      { q: "Can staff keep using the old system during the rebuild?", a: "Yes. Old and new run side by side, and each module switches over only once it is tested and staff are trained." },
    ],
  },
  "business-intelligence-solutions": {
    overview: "Business intelligence turns data scattered across ERP, CRM, accounts and spreadsheets into dashboards managers trust. We connect the sources, clean and model the data once, and build Power BI or custom dashboards for sales, finance, inventory and operations that refresh on their own instead of being rebuilt in Excel every month.",
    useCases: [
      { title: "Management dashboard", body: "Revenue, margins, collections and stock in one daily view for owners and managers." },
      { title: "Sales performance", body: "Targets versus actuals by salesperson, region, product and dealer." },
      { title: "Inventory and working capital", body: "Slow-moving stock, ageing and reorder levels across warehouses." },
      { title: "Replacing Excel MIS", body: "Monthly MIS reports that take days to compile, automated and always current." },
    ],
    stack: ["Power BI", "Looker Studio", "Metabase", "PostgreSQL", "Python", "SQL Server", "Excel", "Tally connectors"],
    faqs: [
      { q: "Power BI or a custom dashboard?", a: "Power BI is fastest for internal management dashboards and has low licence costs. A custom dashboard makes sense when you need it inside your own product for customers, or have unusual interaction needs." },
      { q: "Can dashboards use data from Tally?", a: "Yes. Tally data can be extracted on a schedule through its ODBC/XML interface or a connector, then combined with data from your other systems." },
      { q: "How often do dashboards refresh?", a: "Anywhere from every few minutes to once a day, depending on the source and licence. Most management dashboards refresh hourly or overnight." },
    ],
  },
  "predictive-analytics": {
    overview: "Predictive analytics uses your own history to estimate what happens next: which products will sell, which customers might leave, which leads are worth calling first. We start with the data you have, check whether it can support a reliable model, and only then build one — with its accuracy measured and shown in the tools your team already uses.",
    useCases: [
      { title: "Demand forecasting", body: "Predicting sales by product and location to plan purchasing and production." },
      { title: "Customer churn", body: "Flagging customers likely to cancel or stop ordering so the team can act early." },
      { title: "Lead scoring", body: "Ranking enquiries by likelihood to convert so sales time goes where it pays." },
      { title: "Credit and collections risk", body: "Estimating which invoices are likely to be paid late to prioritise follow-up." },
    ],
    stack: ["Python", "scikit-learn", "Pandas", "PostgreSQL", "Power BI", "FastAPI", "AWS", "Jupyter"],
    faqs: [
      { q: "How much data do we need for predictive analytics?", a: "As a rough guide, one to two years of clean history for forecasting, and a few hundred examples of the outcome you want to predict (such as churned customers). We check your data before promising a model." },
      { q: "How accurate will the predictions be?", a: "It depends on the data. We measure accuracy on past periods the model hasn't seen and share that figure before you rely on it." },
      { q: "Where do the predictions show up?", a: "Wherever your team works — a Power BI dashboard, a column in your CRM or ERP, or an automated alert." },
    ],
  },
  "data-engineering": {
    overview: "Reports and AI are only as reliable as the data underneath them. Data engineering is the plumbing: pipelines that pull data from every system, clean and validate it, and load it into a warehouse where it is consistent and fast to query. Built once and monitored, it replaces the one-off scripts and copy-pasted exports that break quietly.",
    useCases: [
      { title: "One source of truth", body: "Sales, finance and operations data combined into one warehouse with agreed definitions." },
      { title: "Slow reports", body: "Reports that time out when run against the live application database." },
      { title: "Preparing for AI", body: "Clean, structured data needed before forecasting or AI features can work." },
      { title: "Fragile scripts", body: "Nightly exports and scripts that fail without anyone noticing." },
    ],
    stack: ["Python", "PostgreSQL", "BigQuery", "Apache Airflow", "dbt", "AWS", "Docker", "Pandas"],
    faqs: [
      { q: "What is the difference between ETL and ELT?", a: "ETL transforms data before loading it into the warehouse; ELT loads raw data first and transforms it inside the warehouse. Modern warehouses make ELT simpler and more flexible, so most new pipelines use it." },
      { q: "Do we need a data warehouse?", a: "If reporting runs against your live database and slows it down, or data comes from several systems, yes. A small business can often start with a PostgreSQL warehouse before anything larger." },
      { q: "How do you catch bad data?", a: "Validation checks run on every load — missing values, duplicates, unexpected ranges — and failed checks stop the load and alert someone instead of passing bad numbers to reports." },
    ],
  },
  "performance-optimization": {
    overview: "Slow software costs sales and rankings, and adding servers rarely fixes it. We measure first — Core Web Vitals, page weight, slow queries, API response times — find the few causes behind most of the delay, fix them, and measure again so you see the before-and-after numbers.",
    useCases: [
      { title: "Failing Core Web Vitals", body: "Websites flagged in Search Console for slow LCP, layout shift or poor responsiveness." },
      { title: "Slow online store", body: "Shopify or WooCommerce stores slowed by apps, images and scripts." },
      { title: "Sluggish web app", body: "Dashboards and admin panels that slow down as data grows." },
      { title: "Peak-time failures", body: "Applications that time out during campaigns, sales or month-end." },
    ],
    stack: ["Lighthouse", "PageSpeed Insights", "Chrome DevTools", "React", "Next.js", "PostgreSQL", "Redis", "Cloudflare"],
    faqs: [
      { q: "What are Core Web Vitals and do they affect SEO?", a: "They are Google's measures of loading speed (LCP), responsiveness (INP) and visual stability (CLS). They are a ranking signal, and more importantly they affect whether visitors stay." },
      { q: "How much faster can you make our site?", a: "We can't promise a number before measuring, but most sites have a handful of large, fixable causes — oversized images, render-blocking scripts, slow queries. You get a measured before-and-after report." },
      { q: "Will optimisation change how the site looks?", a: "No. The work is in how pages load, not in the design. Any change visitors could notice is agreed with you first." },
    ],
  },
  "security-maintenance": {
    overview: "Software keeps needing work after launch: security patches, framework and plugin updates, expiring certificates, backups and small fixes. A maintenance plan takes care of all of it on a schedule, with monitoring that alerts us before you notice a problem and a monthly note on what was done.",
    useCases: [
      { title: "WordPress and CMS sites", body: "Core and plugin updates, malware scans and backups for business websites." },
      { title: "Inherited applications", body: "Apps built by another team that need someone to keep them patched and running." },
      { title: "After a security scare", body: "Sites that were hacked or flagged, needing clean-up and hardening." },
      { title: "Compliance requirements", body: "Businesses that must show patching, access control and backup records to clients or auditors." },
    ],
    stack: ["Cloudflare", "AWS", "Linux", "Let's Encrypt", "UptimeRobot", "Sentry", "WordPress", "Laravel"],
    faqs: [
      { q: "What does a website maintenance plan include?", a: "Security and framework updates, uptime and error monitoring, regular backups with test restores, SSL renewal, and a set number of hours for small fixes and changes each month." },
      { q: "Can you fix a hacked website?", a: "Yes. We clean the infection, close the hole it came through, restore clean data, reset credentials, and request removal from any blocklists." },
      { q: "Do you maintain apps you didn't build?", a: "Yes. We start with an audit of the code, dependencies and server so we know what we're taking on, then put it on a regular maintenance schedule." },
    ],
  },
  "dedicated-development-teams": {
    overview: "A dedicated team works only on your product — developers, and designers or QA if you need them — inside your tools, sprints and stand-ups. You decide priorities day to day; we handle hiring, payroll, equipment and replacement. It suits companies with a long roadmap who want capacity without building an in-house team from scratch.",
    useCases: [
      { title: "Startups after funding", body: "Founders who need to grow engineering quickly without months of recruiting." },
      { title: "Extending an in-house team", body: "Companies with a tech lead who need more developers working under them." },
      { title: "Agencies with overflow", body: "Digital agencies that need reliable white-label development capacity." },
      { title: "Long-running products", body: "Products with a steady backlog that a fixed-scope project would never finish." },
    ],
    stack: ["React", "Node.js", "Laravel", "Python", "Flutter", "Spring Boot", "AWS", "Jira"],
    faqs: [
      { q: "How is a dedicated team different from a fixed-price project?", a: "A fixed-price project delivers an agreed scope. A dedicated team is monthly capacity you direct — better when priorities change often or the backlog has no end." },
      { q: "Can we interview the developers?", a: "Yes. You interview and approve each person before they join your team." },
      { q: "How do you work across time zones?", a: "Our working hours are 10:00–19:00 IST, Monday to Saturday, which overlaps the UK and Gulf working day. For US teams we agree a fixed daily overlap for stand-ups at the start." },
    ],
  },
};
