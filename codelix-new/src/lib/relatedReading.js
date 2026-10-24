/* The links between a hub page and the pages that support it: the cost
   guides and comparisons that answer a buyer's next question, and the
   service, product or hiring page that turns the answer into a project.
   Without them each service page stood alone — the ERP service didn't link
   to the ERP cost guide or to 4bitx, the mobile app service didn't link to
   the app cost guide, and the hiring hub and the dedicated-team service
   never linked to each other. Keyed by the page's path; RelatedReading
   renders the entry for the current page, if there is one. Every target is
   a live page — check before adding one. */
const POST = {
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
};
const PAGE = {
  erp: { label: "ERP & CRM development", path: "/services/erp-crm-development", body: "Custom ERP and CRM built around how your business runs." },
  customSoftware: { label: "Custom software development", path: "/services/custom-software-development", body: "Internal tools, workflows and platforms built for your process." },
  fourbitx: { label: "4bitx — ERP for manufacturers", path: "/products/4bitx", body: "Our own manufacturing ERP, with GST e-invoice and e-way bills." },
  manufacturing: { label: "Software for manufacturing", path: "/industries/manufacturing", body: "Production, inventory and dispatch systems for factories." },
  hireHub: { label: "Hire dedicated developers", path: "/hire-developers", body: "Developers by technology, full-time on your product." },
  dedicatedTeams: { label: "Dedicated development teams", path: "/services/dedicated-development-teams", body: "A managed team of developers, design and QA for a long roadmap." },
  hireFlutter: { label: "Hire Flutter developers", path: "/hire-developers/flutter", body: "One codebase for Android and iOS, with store releases." },
  hireReactNative: { label: "Hire React Native developers", path: "/hire-developers/react-native", body: "Cross-platform apps for teams already using React." },
  hireShopify: { label: "Hire Shopify developers", path: "/hire-developers/shopify", body: "Store builds, custom themes, integrations and speed fixes." },
  calculator: { label: "Software development cost calculator", path: "/software-development-cost-calculator", body: "Our published price range for your type and size of project." },
};

export const RELATED_READING = {
  "/services/custom-software-development": [POST.customCost, POST.customVsOts, PAGE.erp, POST.inHouse],
  "/services/erp-crm-development": [POST.erpCost, POST.tally, PAGE.fourbitx, PAGE.manufacturing],
  "/products/4bitx": [PAGE.erp, POST.erpCost, POST.tally],
  "/industries/manufacturing": [PAGE.fourbitx, PAGE.erp, POST.tally],
  "/services/application-development": [POST.appCost, POST.flutterRn, PAGE.hireFlutter, PAGE.hireReactNative],
  "/hire-developers": [PAGE.dedicatedTeams, POST.inHouse, PAGE.calculator],
  "/services/dedicated-development-teams": [PAGE.hireHub, POST.inHouse, PAGE.calculator],
  "/software-development-cost-calculator": [POST.webCost, POST.appCost, POST.ecomCost, POST.erpCost, POST.customCost],
  "/services/web-development": [POST.webCost, POST.laravelNode, PAGE.calculator],
  "/services/e-commerce-solutions": [POST.ecomCost, PAGE.hireShopify, PAGE.calculator],
};
