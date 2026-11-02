/* What each additional service page says about ITS OWN work, in the
   sections that used to be identical on all 18 pages: what each covered
   item actually means, how an engagement runs, and what you receive at the
   end. Measured on 2 Nov 2026, 65–75% of each page's text was shared word
   for word with the other 17, which reads to Google (and to a buyer
   comparing two of them) as one page with the name swapped.

   Written from how these engagements are actually run and from facts
   already on the site (stack, FAQs, timelines in the guides). No client
   names, outcomes or numbers that aren't published elsewhere; where a
   duration isn't published, the step says what happens rather than how
   long it takes. Merged into ADDITIONAL_SERVICES in
   additionalServicesData.js. */

export const SERVICE_DEPTH = {
  "saas-product-development": {
    timeline: "8–12 weeks to MVP",
    covers: [
      { title: "Multi-tenant architecture", body: "One codebase serving every customer, with a tenant ID on every record, or separate databases where a contract requires data isolation." },
      { title: "Subscription billing", body: "Plans, trials, upgrades, downgrades and invoices through Razorpay for rupee payments or Stripe for other currencies." },
      { title: "Roles and onboarding", body: "Self-serve sign-up, workspace invites and roles per workspace, so a new customer is set up without your team." },
      { title: "Admin console", body: "An internal console to see tenants, plans, usage and failed payments, and to help a customer without touching the database." },
      { title: "Cloud deployment", body: "Automated deploys, backups and monitoring on your own cloud account from the first release." },
    ],
    process: [
      { title: "Product scope", time: "1–2 weeks", body: "We agree the one workflow customers will pay for, the pricing plans and the tenant model, and cut everything else from the first release." },
      { title: "Prototype", time: "1–2 weeks", body: "A clickable prototype of sign-up, the core workflow and billing, tested with a few target customers before it's built." },
      { title: "Build the MVP", time: "6–8 weeks", body: "Two-week sprints with a working demo at the end of each; billing goes live before launch, not after." },
      { title: "Launch and learn", time: "Ongoing", body: "First customers onboarded, usage tracked per feature, and the next sprint chosen from what people actually use." },
    ],
    deliverables: [
      { title: "Source code", body: "The full product in your repository, with a README to run it locally." },
      { title: "Production environment", body: "Hosting, database and deploy pipeline set up in your own cloud account." },
      { title: "Billing account", body: "Plans and webhooks configured in your Razorpay or Stripe account, not ours." },
      { title: "Architecture notes", body: "How tenants, roles and billing fit together, so the next developer starts quickly." },
    ],
  },
  "cloud-solutions-migration": {
    timeline: "2–8 weeks per system",
    covers: [
      { title: "Cloud readiness audit", body: "An inventory of every server, application, database and dependency, with what each costs to run today." },
      { title: "Migration plan", body: "The order systems move in, a rollback for each step, and a switch-over window outside business hours." },
      { title: "Data migration", body: "Data copied and verified in advance, kept in sync until switch-over, and checked again after." },
      { title: "Infrastructure modernization", body: "Containers, managed databases and autoscaling where they pay for themselves, not by default." },
      { title: "Cost right-sizing", body: "Idle resources removed and servers sized to real usage, so the monthly bill reflects what you use." },
    ],
    process: [
      { title: "Audit", time: "About 1 week", body: "We map what runs where, who depends on it, and what it costs, including the things nobody remembers setting up." },
      { title: "Plan", time: "3–5 days", body: "A written move order with a rollback for every step and an agreed switch-over window." },
      { title: "Migrate in phases", time: "1–6 weeks", body: "Least critical systems first; each one runs on the cloud and is checked before the next moves." },
      { title: "Right-size and hand over", time: "1–2 weeks after", body: "Two weeks of real usage, then servers resized and the setup documented for your team." },
    ],
    deliverables: [
      { title: "Your cloud account", body: "Everything runs in an AWS or Azure account you own, with billing in your name." },
      { title: "Infrastructure as code", body: "Terraform definitions, so the whole setup can be rebuilt or copied." },
      { title: "Runbook", body: "How to deploy, restore a backup and handle the common alerts." },
      { title: "Cost comparison", body: "The estimated monthly cost before and after, line by line." },
    ],
  },
  "api-development-integration": {
    timeline: "1–6 weeks per integration",
    covers: [
      { title: "REST APIs", body: "Versioned endpoints with authentication, rate limits and OpenAPI documentation your partners can read." },
      { title: "GraphQL APIs", body: "A single endpoint when several apps need different slices of the same data." },
      { title: "Third-party integrations", body: "Connections to CRMs, Zoho, Shiprocket, WhatsApp and the other tools you already pay for." },
      { title: "Payment gateways", body: "Razorpay, Stripe or PayU, with every payment confirmed by a verified webhook on the server." },
      { title: "CRM and ERP integrations", body: "Orders, customers and invoices synced between systems, with one agreed source of truth for each field." },
      { title: "Middleware", body: "A layer that queues, retries and logs every message between systems, so a failure is visible instead of silent." },
    ],
    process: [
      { title: "Map the data", time: "2–3 days", body: "What moves between which systems, which one is the source of truth, and how each field maps." },
      { title: "Agree the contract", time: "2–3 days", body: "Endpoints, authentication and error responses written down before code, so both sides build to the same spec." },
      { title: "Build and test", time: "1–4 weeks", body: "Built against sandboxes with realistic test data, including the failure cases: timeouts, duplicates, bad records." },
      { title: "Go live and watch", time: "First weeks", body: "Alerts on failures, a retry queue, and a log of every run your team can check." },
    ],
    deliverables: [
      { title: "API code and docs", body: "Source in your repository and OpenAPI documentation for every endpoint." },
      { title: "Test collection", body: "A Postman or OpenAPI collection to try every call against sandbox and live." },
      { title: "Logging and alerts", body: "Run logs and failure alerts going to your team's email or Slack." },
      { title: "Keys in your accounts", body: "Every third-party credential registered to your company, not to us." },
    ],
  },
  "workflow-automation": {
    timeline: "1–4 weeks per workflow",
    covers: [
      { title: "Business process automation", body: "Approvals, reminders, data entry and weekly reports that run themselves." },
      { title: "Custom workflows", body: "Logic that off-the-shelf tools can't express: your exceptions, your approval rules, your edge cases." },
      { title: "No-code and low-code automation", body: "n8n, Make or Zapier when the apps you use already have connectors and volume is modest." },
      { title: "System integrations", body: "Custom code for systems with no connector, such as Tally or an older ERP." },
    ],
    process: [
      { title: "Map the process", time: "2–3 days", body: "We watch the task being done, count the hours it takes, and list every exception before automating anything." },
      { title: "Choose the tool", time: "1 day", body: "Zapier, Make, n8n or code, chosen by volume, data sensitivity and who will maintain it." },
      { title: "Build with checkpoints", time: "1–3 weeks", body: "Automated steps with a person approving anything that sends money or contacts a customer." },
      { title: "Run in parallel", time: "About 1 week", body: "The automation runs alongside the manual process until the outputs match, then takes over." },
    ],
    deliverables: [
      { title: "Workflows you own", body: "Built in your own n8n, Make or Zapier account, or in your repository for custom code." },
      { title: "Process map", body: "A one-page diagram of what runs, when, and what happens on failure." },
      { title: "Failure alerts", body: "Errors routed to the person who can fix them, not lost in a log." },
      { title: "Team walkthrough", body: "A session showing staff what changed and how to handle the exceptions." },
    ],
  },
  "erp-crm-development": {
    timeline: "6–10 weeks for 2–3 modules",
    covers: [
      { title: "Custom ERP", body: "Sales, purchase, inventory, production and accounts in one system, built around how you already work." },
      { title: "CRM", body: "Leads, follow-ups, quotations and dealer or distributor accounts, linked to orders in the ERP." },
      { title: "Inventory management", body: "Stock by godown, batch and grade, with reorder levels and transfers between locations." },
      { title: "HRMS", body: "Attendance, leave, shifts and payroll, including contract and piece-rate workers where needed." },
      { title: "Manufacturing software", body: "Bills of materials, production orders, job work and wastage, tracked per batch." },
      { title: "Enterprise applications", body: "Approvals, audit trails and dashboards across departments and branches." },
    ],
    process: [
      { title: "Process study", time: "1–2 weeks", body: "We walk through how orders, stock and money move today, with the people who do the work." },
      { title: "First module design", time: "About 1 week", body: "Screens and reports for the module that hurts most, usually inventory or sales, signed off before build." },
      { title: "Build and migrate", time: "4–8 weeks", body: "The module built in sprints while item masters and opening balances are cleaned and moved from Tally or Excel." },
      { title: "Roll out module by module", time: "Over 3–6 months for a full ERP", body: "Each module goes live with training before the next starts, so operations never stop." },
    ],
    deliverables: [
      { title: "Running system", body: "The ERP on your cloud account or server, with backups scheduled." },
      { title: "Migrated data", body: "Masters and opening balances moved and checked line by line with your team." },
      { title: "User guides and training", body: "Guides and sessions per department: stores, accounts, sales and management." },
      { title: "Admin and code access", body: "Admin rights for your team and the source code, as agreed in your contract." },
    ],
  },
  "ai-agent-development": {
    timeline: "Pilot first, then expand",
    covers: [
      { title: "Custom AI agents", body: "Agents that read, decide and act across your tools, built on GPT, Claude or Gemini." },
      { title: "Autonomous workflows", body: "Multi-step tasks that run on their own, with an approval step before anything irreversible." },
      { title: "AI copilots", body: "Assistance inside the tools your team already uses: drafting, summarising and looking things up." },
      { title: "Intelligent assistants", body: "Chat assistants on your website or WhatsApp that answer from your data and hand off to a person." },
    ],
    process: [
      { title: "Pick one task", time: "About 1 week", body: "A repetitive, rule-heavy task, with today's time and error rate measured so results can be compared." },
      { title: "Prototype on real examples", time: "2–3 weeks", body: "The agent runs on past real cases, and we check its output against what your team actually did." },
      { title: "Pilot with approvals", time: "2–4 weeks", body: "The agent drafts and your team approves, so mistakes are caught while trust is built." },
      { title: "Expand and monitor", time: "Ongoing", body: "More autonomy only where the pilot earned it, with costs and accuracy tracked per task." },
    ],
    deliverables: [
      { title: "Agent code and prompts", body: "Everything in your repository, including the tool (skill) definitions." },
      { title: "Evaluation set", body: "Real tasks with expected results, re-run before any change goes live." },
      { title: "Usage dashboard", body: "Tasks completed, approvals, errors and model cost per task." },
      { title: "Model accounts", body: "API keys with OpenAI, Anthropic or Google held in your company's name." },
    ],
  },
  "generative-ai-solutions": {
    timeline: "Pilot first, then expand",
    covers: [
      { title: "LLM-powered applications", body: "Features built on large language models inside your website, app or internal tools." },
      { title: "AI chatbots", body: "Chatbots that answer from your documents and policies, with sources, instead of from memory." },
      { title: "Content generation", body: "Drafts of product descriptions, replies and reports for a person to review and approve." },
      { title: "RAG systems", body: "Retrieval-augmented generation: your content indexed so the model answers from it, with permission checks." },
      { title: "AI-powered search", body: "Plain-language search across manuals, tickets and past projects." },
    ],
    process: [
      { title: "Gather the content", time: "About 1 week", body: "The documents, FAQs and data the AI will answer from, and who is allowed to see what." },
      { title: "Build retrieval", time: "2–3 weeks", body: "Content split, indexed and connected to the model, with sources shown on every answer." },
      { title: "Test against real questions", time: "About 1 week", body: "Questions your team actually gets, scored for accuracy before anyone outside sees it." },
      { title: "Launch with feedback", time: "Ongoing", body: "Users rate answers; weak ones are fixed by improving content, not just prompts." },
    ],
    deliverables: [
      { title: "Application code", body: "Code, prompts and configuration in your repository." },
      { title: "Search index", body: "The indexed content stored in your own cloud account." },
      { title: "Evaluation results", body: "The test questions, expected answers and how the system scored." },
      { title: "Content admin", body: "A way for your team to add or remove documents without a developer." },
    ],
  },
  "cloud-infrastructure-services": {
    timeline: "1–4 weeks to set up, then ongoing",
    covers: [
      { title: "AWS, Azure and Google Cloud deployment", body: "Applications deployed on the cloud your team and stack suit best." },
      { title: "DevOps", body: "Repeatable builds, environments for staging and production, and safe releases." },
      { title: "Docker", body: "Applications packaged in containers so they run the same on every machine." },
      { title: "Kubernetes", body: "Container orchestration when you run enough services to need it, not before." },
      { title: "CI/CD", body: "Tests and deploys that run automatically on every merge, with one-click rollback." },
      { title: "Server management", body: "Patching, monitoring, backups and on-call fixes for the servers you already have." },
    ],
    process: [
      { title: "Review the setup", time: "2–3 days", body: "How code gets to production today, where it breaks, and what it costs." },
      { title: "Containerise and codify", time: "1–2 weeks", body: "Docker images and Terraform definitions, so environments can be rebuilt in minutes." },
      { title: "Automate releases", time: "About 1 week", body: "CI/CD pipelines with tests, staging deploys and production approvals." },
      { title: "Monitor and manage", time: "Ongoing", body: "Dashboards and alerts on uptime, errors and cost, with fixes as part of the plan." },
    ],
    deliverables: [
      { title: "Infrastructure as code", body: "Terraform or equivalent for every environment, in your repository." },
      { title: "CI/CD pipelines", body: "Build and deploy pipelines in your GitHub or GitLab account." },
      { title: "Monitoring", body: "Dashboards and alerts your team receives directly." },
      { title: "Access documentation", body: "Who has access to what, and how to rotate keys." },
    ],
  },
  "ux-research-design-systems": {
    timeline: "2–6 weeks",
    covers: [
      { title: "User research", body: "Interviews with real users about how they work and where the product gets in the way." },
      { title: "Usability testing", body: "People completing real tasks on your product or prototype while we note where they get stuck." },
      { title: "Wireframing", body: "Low-detail layouts to agree structure and flow before visual design." },
      { title: "Prototyping", body: "Clickable Figma prototypes that feel like the product, for testing and sign-off." },
      { title: "Design systems", body: "Reusable components, colours and type in Figma, matched to how developers build." },
      { title: "Accessibility improvements", body: "Contrast, keyboard use, labels and screen-reader checks against WCAG guidelines." },
    ],
    process: [
      { title: "Research", time: "1–2 weeks", body: "Interviews and usability tests with the people who actually use the product." },
      { title: "Synthesise", time: "3–5 days", body: "Findings ranked by how often they happen and what they cost you." },
      { title: "Prototype and retest", time: "1–2 weeks", body: "Fixes designed as a prototype and tested again with users." },
      { title: "Systemise", time: "1–2 weeks", body: "The patterns that worked turned into components your developers can reuse." },
    ],
    deliverables: [
      { title: "Research findings", body: "A report with the problems found, how often and their priority." },
      { title: "Figma prototype", body: "The tested design, ready for development." },
      { title: "Component library", body: "The design system in Figma with usage notes." },
      { title: "Accessibility checklist", body: "What was checked, what passed and what to fix next." },
    ],
  },
  "marketplace-development": {
    timeline: "MVP first, then phased",
    covers: [
      { title: "Multi-vendor marketplaces", body: "Many sellers in one store, each with their own listings, orders and payouts." },
      { title: "B2B portals", body: "Bulk ordering, price lists per buyer, credit terms and repeat orders." },
      { title: "B2C marketplaces", body: "Consumer-facing listings, search, reviews and checkout across sellers." },
      { title: "Vendor management systems", body: "Seller onboarding, KYC, commissions, payouts and performance reports." },
    ],
    process: [
      { title: "Set the rules", time: "1–2 weeks", body: "Commission model, payout timing, who ships, who handles returns, and how disputes are settled." },
      { title: "Design three sides", time: "About 2 weeks", body: "The buyer experience, the seller panel and your admin, designed together." },
      { title: "Build the MVP", time: "In sprints", body: "Payments and payouts built and tested first, because they are the hardest to change later." },
      { title: "Launch with first sellers", time: "Ongoing", body: "A small group of sellers onboarded by hand, then self-serve once the flow is proven." },
    ],
    deliverables: [
      { title: "Three applications", body: "Buyer site or app, seller panel and admin panel." },
      { title: "Payout setup", body: "Split payments configured in your Razorpay Route or Stripe Connect account." },
      { title: "Seller onboarding guide", body: "What sellers need to sign up, list and get paid." },
      { title: "Source code", body: "All three applications in your repository." },
    ],
  },
  "payment-integration-services": {
    timeline: "1–3 weeks",
    covers: [
      { title: "Stripe", body: "International cards, multi-currency and subscriptions for customers outside India." },
      { title: "Razorpay", body: "UPI, cards, net banking and wallets for customers paying in rupees." },
      { title: "PayPal", body: "For international buyers who prefer paying from a PayPal wallet." },
      { title: "UPI", body: "UPI intent, QR and collect flows, with clear retry paths when a payment fails." },
      { title: "Subscription billing", body: "Recurring plans, trials, upgrades and failed-payment retries." },
      { title: "Secure gateway integration", body: "Card data stays with the gateway; your server confirms every payment through a signed webhook." },
    ],
    process: [
      { title: "Choose gateway and flows", time: "2–3 days", body: "Which gateway for which customers, and the checkout, refund and subscription flows you need." },
      { title: "Build in sandbox", time: "1–2 weeks", body: "Checkout and webhooks built against the gateway's test mode." },
      { title: "Test what goes wrong", time: "3–5 days", body: "Failed payments, duplicate webhooks, partial refunds and timeouts, each tested on purpose." },
      { title: "Go live and reconcile", time: "First settlements", body: "Live keys switched on, and the first settlements matched against orders." },
    ],
    deliverables: [
      { title: "Integration code", body: "Checkout and webhook code in your repository." },
      { title: "Webhook log", body: "Every payment event recorded, so any order can be traced." },
      { title: "Refund and reconciliation screens", body: "Refunds from your admin, and a daily settlement-to-order match." },
      { title: "Live keys in your account", body: "The gateway account and keys belong to your business." },
    ],
  },
  "legacy-system-modernization": {
    timeline: "Phased over months",
    covers: [
      { title: "Modernize outdated software", body: "Unsupported framework and language versions upgraded, with tests added as we go." },
      { title: "Migrate legacy applications", body: "Applications moved to a modern stack or platform module by module." },
      { title: "Improve performance", body: "Slow screens, queries and reports fixed while the code is open." },
      { title: "Adopt modern technologies", body: "APIs, cloud hosting and current frameworks where they reduce cost or risk." },
    ],
    process: [
      { title: "Audit code and usage", time: "1–2 weeks", body: "What the system does, which parts people use, and where the risk is." },
      { title: "Decide the approach", time: "A few days", body: "Refactor, replatform or rewrite, per module, written down with the reasons." },
      { title: "Move module by module", time: "Phased", body: "The old system keeps running; each module switches over only when the new one is proven." },
      { title: "Retire the old system", time: "At the end", body: "Data checked, users moved, and the old system archived on a planned date." },
    ],
    deliverables: [
      { title: "Audit report", body: "Risks, dependencies and the recommended approach per module." },
      { title: "Upgraded codebase", body: "Modern code with automated tests, in your repository." },
      { title: "Migration scripts", body: "Data migration scripts with the checks used to verify them." },
      { title: "Decommission plan", body: "How and when the old system is switched off and archived." },
    ],
  },
  "business-intelligence-solutions": {
    timeline: "2–6 weeks",
    covers: [
      { title: "BI dashboards", body: "Interactive dashboards that update on a schedule, replacing manual Excel reports." },
      { title: "KPI reporting", body: "Each KPI defined once, with an owner, so every department reports the same number." },
      { title: "Power BI", body: "Reports and data models built in Power BI for teams already on Microsoft 365." },
      { title: "Tableau", body: "Dashboards in Tableau where your organisation already licenses it." },
      { title: "Executive dashboards", body: "One screen of the numbers leadership checks every week, with drill-down." },
      { title: "Decision support systems", body: "What-if views and alerts when a number crosses a threshold." },
    ],
    process: [
      { title: "Define the KPIs", time: "About 1 week", body: "Each metric's definition, source and owner agreed in writing." },
      { title: "Connect the data", time: "1–2 weeks", body: "ERP, Tally, CRM and spreadsheets connected and cleaned into one model." },
      { title: "Build the dashboards", time: "1–2 weeks", body: "Built with the people who will use them, one department at a time." },
      { title: "Roll out", time: "Ongoing", body: "Scheduled refreshes, access per role, and a short training for each team." },
    ],
    deliverables: [
      { title: "Dashboards in your workspace", body: "Published in your own Power BI or Tableau account." },
      { title: "KPI definitions", body: "A document of every metric, its formula, source and owner." },
      { title: "Refresh schedule", body: "Automated data refreshes with alerts if one fails." },
      { title: "Team training", body: "How to read, filter and share the dashboards." },
    ],
  },
  "predictive-analytics": {
    timeline: "Pilot on your own history",
    covers: [
      { title: "Forecasting", body: "Demand or sales forecasts per product and location, by week or month." },
      { title: "Machine learning models", body: "Models trained on your history and checked against simpler methods before use." },
      { title: "Customer insights", body: "Which customers are likely to reorder, churn or respond to an offer." },
      { title: "Business prediction systems", body: "Forecasts delivered inside your dashboard or ERP, not as a one-off spreadsheet." },
    ],
    process: [
      { title: "Check the data", time: "About 1 week", body: "How much history there is, how clean it is, and what explains the spikes." },
      { title: "Set a baseline", time: "A few days", body: "A simple forecast the model has to beat, so improvement is measured, not assumed." },
      { title: "Model and backtest", time: "2–3 weeks", body: "Models tested on past periods they never saw, and compared to the baseline." },
      { title: "Put it to work", time: "Ongoing", body: "Forecasts fed into the dashboard or ERP, with accuracy tracked and retraining scheduled." },
    ],
    deliverables: [
      { title: "Model code", body: "Training and retraining scripts in your repository." },
      { title: "Backtest report", body: "How accurate the model was on past periods, against the baseline." },
      { title: "Forecast output", body: "Forecasts delivered where your team already works." },
      { title: "Accuracy monitoring", body: "An alert when forecasts start drifting from actuals." },
    ],
  },
  "data-engineering": {
    timeline: "2–6 weeks",
    covers: [
      { title: "ETL pipelines", body: "Scheduled jobs that extract, clean and load data from every system you run." },
      { title: "Data warehousing", body: "One warehouse where data is consistent and fast to query." },
      { title: "Big data processing", body: "Batch and stream processing for volumes a normal database can't handle." },
      { title: "Data integration", body: "ERP, CRM, Tally, ads and spreadsheets joined on shared keys." },
    ],
    process: [
      { title: "Inventory the sources", time: "2–3 days", body: "Every system, its data, how often it changes and who owns it." },
      { title: "Design the warehouse", time: "About 1 week", body: "Tables and keys designed around the questions the business asks." },
      { title: "Build pipelines with checks", time: "1–3 weeks", body: "Each load validated for row counts, duplicates and missing values." },
      { title: "Monitor", time: "Ongoing", body: "Alerts when a pipeline fails or data looks wrong, before a report is wrong." },
    ],
    deliverables: [
      { title: "Pipeline code", body: "Pipelines and schedules in your repository." },
      { title: "Warehouse schema", body: "Documentation of every table and how it is filled." },
      { title: "Data quality checks", body: "The checks that run on every load, with their alerts." },
      { title: "Your cloud account", body: "The warehouse runs in an account you own." },
    ],
  },
  "performance-optimization": {
    timeline: "1–4 weeks",
    covers: [
      { title: "Website speed optimization", body: "Core Web Vitals improved on real phones: images, fonts, CSS and scripts." },
      { title: "Database tuning", body: "Slow queries found, indexes added and N+1 queries removed." },
      { title: "API optimization", body: "Response times cut with caching, pagination and fewer round trips." },
      { title: "Scalability improvements", body: "Background jobs, queues and caching so the busiest day doesn't slow everyone down." },
      { title: "Performance audits", body: "A measured report of where the time goes, before anything is changed." },
    ],
    process: [
      { title: "Measure", time: "2–3 days", body: "Baseline numbers from real users and lab tests, on the pages and screens that matter most." },
      { title: "Find the causes", time: "2–3 days", body: "Profiling the front end, back end and database to rank causes by impact." },
      { title: "Fix the biggest first", time: "1–3 weeks", body: "Changes shipped one at a time, each measured before the next." },
      { title: "Re-measure and guard", time: "At the end", body: "Before-and-after numbers, and checks so the gains don't quietly slip back." },
    ],
    deliverables: [
      { title: "Audit report", body: "Baseline, causes found, and before-and-after numbers for each fix." },
      { title: "Code changes", body: "Every fix as a reviewed change in your repository." },
      { title: "Monitoring", body: "Ongoing tracking of the key speed metrics." },
      { title: "Next steps", body: "Remaining improvements ranked by impact and effort." },
    ],
  },
  "security-maintenance": {
    timeline: "Monthly plan",
    covers: [
      { title: "Security updates", body: "Framework, plugin and server updates applied and tested every month." },
      { title: "Vulnerability fixes", body: "Known vulnerabilities patched, and malware removed if a site has been compromised." },
      { title: "Monitoring", body: "Uptime, error and security monitoring with alerts to our team and yours." },
      { title: "Backups", body: "Scheduled backups stored off the server, and restores tested, not just assumed." },
      { title: "Maintenance", body: "Small changes, content fixes and bug fixes as part of the plan." },
      { title: "Ongoing technical support", body: "A named contact for anything that breaks, during business hours." },
    ],
    process: [
      { title: "Onboarding audit", time: "Week one", body: "Access handover, full backup, security scan, and a list of what is broken or out of date." },
      { title: "Urgent fixes", time: "First weeks", body: "Vulnerabilities patched and customer-facing bugs fixed first." },
      { title: "Monthly cycle", time: "Every month", body: "Updates, a tested backup restore, monitoring review and small changes." },
      { title: "Monthly report", time: "Every month", body: "What was updated, fixed and found, and what to plan next." },
    ],
    deliverables: [
      { title: "Monthly report", body: "Updates applied, issues fixed, uptime and open risks." },
      { title: "Tested backups", body: "Backups in storage you own, with the date of the last successful restore." },
      { title: "Monitoring access", body: "Your own login to the uptime and security dashboards." },
      { title: "Access list", body: "Who can access the site and servers, reviewed every month." },
    ],
  },
  "dedicated-development-teams": {
    timeline: "Proposal within 48 hours",
    covers: [
      { title: "Dedicated developers", body: "Full-time developers in your stack, working only on your product." },
      { title: "UI/UX designers", body: "Designers who work a sprint ahead of development." },
      { title: "QA engineers", body: "Manual and automated testing on every release." },
      { title: "AI engineers", body: "LLM, agent and chatbot work alongside your product team." },
      { title: "Full-stack development teams", body: "A complete squad that owns a product or feature stream end to end." },
    ],
    process: [
      { title: "Tell us what you need", time: "30 minutes", body: "A call about your product, stack, team and backlog." },
      { title: "Proposal and profiles", time: "Within 48 hours", body: "The team shape, monthly cost and the people we would put on it." },
      { title: "Interview the team", time: "Your choice", body: "Talk to each developer directly and set a technical task if you want to." },
      { title: "Start", time: "On your go-ahead", body: "Access to your repository and tools, and a first small task in week one." },
    ],
    deliverables: [
      { title: "Code in your repository", body: "Every commit lands in your repository from the first day." },
      { title: "Weekly updates", body: "What shipped, what's next and any blockers, every week." },
      { title: "Documentation as you go", body: "Decisions and setup written down in your wiki, not in someone's head." },
      { title: "Clean handovers", body: "If a team member changes, a written handover to their replacement." },
    ],
  },
};
