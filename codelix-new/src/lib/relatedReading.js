/* The links between a hub page and the pages that support it: the cost
   guides and comparisons that answer a buyer's next question, and the
   service, product or hiring page that turns the answer into a project.
   Without them each service page stood alone — the ERP service didn't link
   to the ERP cost guide or to 4bitx, the mobile app service didn't link to
   the app cost guide, and the hiring hub and the dedicated-team service
   never linked to each other. Keyed by the page's path; RelatedReading
   renders the entry for the current page, if there is one. Every target is
   a live page — check before adding one. */
export const POST = {
  erpCost: { label: "ERP software development cost in India", path: "/blog/erp-software-development-cost-in-india", body: "Setup price ranges, yearly AMC and the hidden costs to plan for." },
  tally: { label: "When to move from Tally to ERP", path: "/blog/when-to-move-from-tally-to-erp", body: "The signs your business has outgrown Tally and spreadsheets." },
  customCost: { label: "Custom software development cost in India", path: "/blog/custom-software-development-cost-in-india", body: "Price ranges by project size, and fixed price vs a dedicated team." },
  customVsOts: { label: "Custom vs off-the-shelf software", path: "/blog/custom-software-vs-off-the-shelf-software", body: "When to buy a product and when building your own pays off." },
  inHouse: { label: "In-house vs outsourcing software development", path: "/blog/in-house-vs-outsourcing-software-development", body: "Cost, control and risk of each, and how to outsource well." },
  appCost: { label: "App development cost in India", path: "/blog/app-development-cost-in-india", body: "What an MVP, a full app and a complex platform cost to build." },
  flutterRn: { label: "Flutter vs React Native", path: "/blog/flutter-vs-react-native", body: "Which cross-platform framework fits your app and your team." },
  webCost: { label: "Website development cost in India", path: "/blog/website-development-cost-in-india", body: "Price ranges for business sites, custom web apps and portals." },
  laravelNode: { label: "Laravel vs Node.js for business web apps", path: "/blog/laravel-vs-node-js-for-business-web-apps", body: "Which backend suits an admin-heavy app and which a real-time one." },
  ecomCost: { label: "E-commerce website development cost in India", path: "/blog/e-commerce-website-development-cost-in-india", body: "Shopify vs WooCommerce vs custom, and the running costs." },
  chatbotCost: { label: "AI chatbot cost in India", path: "/blog/ai-chatbot-cost-in-india", body: "WhatsApp AI add-ons vs a custom build, and the model and message charges." },
  dpdp: { label: "DPDP Act compliance for small business", path: "/blog/dpdp-act-compliance-for-small-business", body: "What the Rules require, what it costs and what to fix first." },
  ceramicErp: { label: "ERP for the ceramic industry", path: "/blog/erp-for-ceramic-industry", body: "Features, options, prices and timelines for tile and sanitaryware makers." },
};
const PAGE = {
  erp: { label: "ERP & CRM development", path: "/services/erp-crm-development", body: "Custom ERP and CRM built around how your business runs." },
  customSoftware: { label: "Custom software development", path: "/services/custom-software-development", body: "Internal tools, workflows and platforms built for your process." },
  /* Codelix ERP is the ERP product; /products/4bitx redirects to its
     manufacturing edition */
  codelixErp: { label: "Codelix Custom ERP", path: "/products/codelix-erp", body: "Our own ERP, with editions for construction, manufacturing, ceramic and textile." },
  erpManufacturing: { label: "Codelix Custom ERP for manufacturing", path: "/products/codelix-erp/manufacturing", body: "Our own manufacturing ERP, with GST e-invoice and e-way bills." },
  manufacturing: { label: "Software for manufacturing", path: "/industries/manufacturing", body: "Production, inventory and dispatch systems for factories." },
  hireHub: { label: "Hire dedicated developers", path: "/hire-developers", body: "Developers by technology, full-time on your product." },
  dedicatedTeams: { label: "Dedicated development teams", path: "/services/dedicated-development-teams", body: "A managed team of developers, design and QA for a long roadmap." },
  hireFlutter: { label: "Hire Flutter developers", path: "/hire-developers/flutter", body: "One codebase for Android and iOS, with store releases." },
  hireReactNative: { label: "Hire React Native developers", path: "/hire-developers/react-native", body: "Cross-platform apps for teams already using React." },
  hireShopify: { label: "Hire Shopify developers", path: "/hire-developers/shopify", body: "Store builds, custom themes, integrations and speed fixes." },
  calculator: { label: "Software development cost calculator", path: "/software-development-cost-calculator", body: "Our published price range for your type and size of project." },
  aiDev: { label: "AI development", path: "/services/ai-development", body: "AI chatbots, LLM features and automation built into your product." },
  aiAgent: { label: "AI agent development", path: "/services/ai-agent-development", body: "Agents that read, decide and act across your tools, with approval steps." },
  ecomIndustry: { label: "Software for e-commerce brands", path: "/industries/e-commerce", body: "Stores, marketplaces and the systems behind them." },
};

/* Guides a hire page points to, by the role's slug: the comparison or cost
   question a buyer of that skill asks next. Roles not listed get the
   outsourcing and custom-software guides. */
export const HIRE_GUIDES = {
  "react-native": [POST.flutterRn, POST.appCost],
  flutter: [POST.flutterRn, POST.appCost],
  android: [POST.appCost, POST.flutterRn],
  ios: [POST.appCost, POST.flutterRn],
  nodejs: [POST.laravelNode, POST.customCost],
  laravel: [POST.laravelNode, POST.webCost],
  php: [POST.laravelNode, POST.webCost],
  wordpress: [POST.webCost, POST.inHouse],
  shopify: [POST.ecomCost, POST.inHouse],
  python: [POST.chatbotCost, POST.customCost],
  ai: [POST.chatbotCost, POST.customCost],
};

export const RELATED_READING = {
  "/services/custom-software-development": [POST.customCost, POST.customVsOts, PAGE.erp, POST.inHouse, PAGE.calculator],
  "/services/erp-crm-development": [POST.erpCost, POST.tally, POST.ceramicErp, PAGE.codelixErp, PAGE.manufacturing],
  "/industries/manufacturing": [PAGE.erpManufacturing, PAGE.erp, POST.tally],
  "/products/codelix-erp": [POST.erpCost, POST.tally, PAGE.erp],
  "/products/codelix-erp/construction": [POST.erpCost, POST.customVsOts, PAGE.erp],
  "/products/codelix-erp/manufacturing": [POST.tally, POST.erpCost, PAGE.manufacturing],
  "/products/codelix-erp/ceramic": [POST.ceramicErp, POST.tally, POST.erpCost, PAGE.manufacturing],
  "/products/codelix-erp/textile": [POST.tally, POST.erpCost, PAGE.manufacturing],
  "/services/application-development": [POST.appCost, POST.flutterRn, PAGE.hireFlutter, PAGE.hireReactNative],
  "/hire-developers": [PAGE.dedicatedTeams, POST.inHouse, PAGE.calculator],
  "/services/dedicated-development-teams": [PAGE.hireHub, POST.inHouse, PAGE.calculator],
  "/software-development-cost-calculator": [POST.webCost, POST.appCost, POST.ecomCost, POST.erpCost, POST.customCost],
  "/services/web-development": [POST.webCost, POST.laravelNode, POST.ecomCost, PAGE.calculator],
  "/services/e-commerce-solutions": [POST.ecomCost, PAGE.hireShopify, PAGE.calculator],
  /* the AI pages had no Related Reading, so the AI chatbot cost guide had no
     link from any money page. Search Console (Oct 2026) showed the AI service
     page and the AI agent page splitting "ai agent development services", so
     agent searches are handed to the agent page from both of the others. */
  "/services/ai-development": [PAGE.aiAgent, POST.chatbotCost, PAGE.calculator, POST.customVsOts],
  "/services/generative-ai-solutions": [POST.chatbotCost, PAGE.aiAgent, PAGE.aiDev, PAGE.calculator],
  "/services/ai-agent-development": [POST.chatbotCost, PAGE.aiDev, PAGE.calculator],
  "/services/security-maintenance": [POST.dpdp, PAGE.customSoftware],
  /* the e-commerce cost guide ranks 13-20 and had one link in from a money
     page; the ERP service page fell from 25 to 58 with three pages splitting
     its queries, so the industry pages point at the one ERP page */
  "/industries/e-commerce": [POST.ecomCost, PAGE.hireShopify, PAGE.calculator],
  "/industries/food-beverages": [POST.ecomCost, PAGE.erp],
  "/industries/fintech": [PAGE.customSoftware, POST.dpdp],
  "/industries/real-estate-construction": [PAGE.erp, PAGE.codelixErp],
};

/* Hire pages for the technologies a service is built with, taken from each
   role's own `services` list, so every service page links to the matching
   "hire X developers" pages without a hand-kept second list. The roles that
   Search Console shows close to page one come first. */
export const HIRE_PRIORITY = ["react-native", "angular", "nodejs", "python", "full-stack"];
