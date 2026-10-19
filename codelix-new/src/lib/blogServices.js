import { BarChart3, Bot, Boxes, Cloud, Code2, CreditCard, Gauge, Globe, Layers, LayoutGrid, PenTool, ShoppingCart, Smartphone, Sparkles, Store, Workflow } from "lucide-react";

/* Which service pages a blog post points readers to, in the "Related
   services" box under the article. The title is checked first (so a post
   about ERP links the ERP page whatever its category), then the category
   (tags[1]). Only main-site service pages: the city landing pages (/best-…)
   are deliberately kept off the rest of the site. */
const S = {
  web: { label: "Web Development", path: "/services/web-development", icon: Globe, body: "Fast, mobile-first business websites and web apps, designed and built by one team." },
  apps: { label: "Mobile App Development", path: "/services/application-development", icon: Smartphone, body: "Android and iOS apps from one Flutter or React Native codebase, published to both stores." },
  uiux: { label: "UI/UX Design", path: "/services/ui-ux-design", icon: PenTool, body: "Screens and flows designed around your users, tested as prototypes before any code." },
  ecom: { label: "E-Commerce Solutions", path: "/services/e-commerce-solutions", icon: ShoppingCart, body: "Online stores with UPI and card payments, GST invoices and stock that stays in sync." },
  custom: { label: "Custom Software Development", path: "/services/custom-software-development", icon: Code2, body: "Software built around how your business actually works, not the other way round." },
  ai: { label: "AI Development", path: "/services/ai-development", icon: Sparkles, body: "AI features that take repetitive work off your team, built into tools you already use." },
  agents: { label: "AI Agent Development", path: "/services/ai-agent-development", icon: Bot, body: "Assistants that answer questions and take actions across your systems, with a person in the loop." },
  automation: { label: "Workflow Automation", path: "/services/workflow-automation", icon: Workflow, body: "Automate the handoffs between your tools so nobody retypes the same data twice." },
  erp: { label: "ERP & CRM Development", path: "/services/erp-crm-development", icon: Boxes, body: "Inventory, production, sales, GST and accounts in one system built for your process." },
  saas: { label: "SaaS Product Development", path: "/services/saas-product-development", icon: Layers, body: "Multi-tenant SaaS with subscriptions, roles and billing built in from day one." },
  data: { label: "Data Analytics", path: "/services/data-analytics", icon: BarChart3, body: "Dashboards and reports from live data, so decisions don't wait for a spreadsheet." },
  cloud: { label: "Cloud Solutions & Migration", path: "/services/cloud-solutions-migration", icon: Cloud, body: "Move to the cloud with a plan for data, downtime and cost, not just a lift and shift." },
  design: { label: "UX Research & Design Systems", path: "/services/ux-research-design-systems", icon: LayoutGrid, body: "A shared component library and design tokens that keep a growing product consistent." },
  perf: { label: "Performance Optimization", path: "/services/performance-optimization", icon: Gauge, body: "Find what slows your site or app down and fix it, measured before and after." },
  market: { label: "Marketplace Development", path: "/services/marketplace-development", icon: Store, body: "Multi-vendor marketplaces with seller onboarding, commissions and payouts." },
  pay: { label: "Payment Integration", path: "/services/payment-integration-services", icon: CreditCard, body: "Razorpay, PayU, Stripe and UPI integrations, including subscriptions and refunds." },
};

const BY_TITLE = [
  [/\berp\b|tally|inventory|\bcrm\b|manufactur/i, ["erp", "custom", "automation"]],
  [/\bai\b|chatbot|agent|automation|machine learning|\bllm\b/i, ["ai", "agents", "automation"]],
  [/\bapps?\b|mobile|android|\bios\b|flutter|react native|pwa/i, ["apps", "web", "uiux"]],
  [/e-?commerce|shop|store|checkout|retail|marketplace/i, ["ecom", "market", "pay"]],
  [/saas|on-premise|subscription/i, ["saas", "cloud", "custom"]],
  [/design system|component/i, ["design", "uiux", "web"]],
  [/ui\/ux|\bux\b|user experience/i, ["uiux", "design", "web"]],
  [/wordpress|\bcms\b/i, ["web", "perf", "uiux"]],
  [/laravel|framework|scalab|web app|web development/i, ["web", "custom", "cloud"]],
];

const BY_CATEGORY = {
  business: ["custom", "web", "erp"],
  "Artificial Intelligence": ["ai", "agents", "automation"],
  "UI/UX": ["uiux", "design", "web"],
  "E-Commerce": ["ecom", "market", "pay"],
  Development: ["web", "custom", "apps"],
  CMS: ["web", "perf", "uiux"],
  Tech: ["apps", "web", "cloud"],
};

export function servicesForPost(post) {
  const hit = BY_TITLE.find(([re]) => re.test(post.title || ""));
  const keys = hit ? hit[1] : BY_CATEGORY[post.tags?.[1]] || ["custom", "web", "apps"];
  return keys.map((k) => S[k]);
}
