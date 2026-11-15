import { LayoutDashboard, ShoppingCart, Gauge, CreditCard, ShieldCheck, PackageSearch, Wrench, Check, TrendingDown, Clock, ShoppingBag, RotateCcw, AlertTriangle, Building2, Store, Rocket, GraduationCap, Shirt, Utensils, Palette, Globe, Smartphone, Code2, Sparkles, BarChart3, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";

/* e-commerce-specific stack subset — pulled from the same real stack list
   shown on the homepage's "THE STACK" section, not a new set of claims */
import techReact from "../Images/react.webp";
import techNext from "../Images/next.webp";
import techNode from "../Images/node.webp";
import techShopify from "../Images/shopify.webp";
import techWoo from "../Images/woocommerce.webp";
import techPostgres from "../Images/postgresql.webp";
import techMongo from "../Images/MongoDB.webp";
import techAws from "../Images/AWS.webp";

const ECOM_STACK = [
  { src: techReact, name: "React" },
  { src: techNext, name: "Next.js" },
  { src: techNode, name: "Node.js" },
  { src: techShopify, name: "Shopify" },
  { src: techWoo, name: "WooCommerce" },
  { src: techPostgres, name: "PostgreSQL" },
  { src: techMongo, name: "MongoDB" },
  { src: techAws, name: "AWS" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: ShoppingBag, pain: "Carts get abandoned at checkout.", fix: "We design backwards from payment — fewer steps, clearer shipping costs, no surprise fees at the last screen." },
  { icon: Clock, pain: "The storefront is slow on mobile.", fix: "We hold a performance budget from day one and test on mid-range phones, not just fast office wifi." },
  { icon: PackageSearch, pain: "Inventory and orders don't sync.", fix: "A single source of truth between your storefront, warehouse, and any marketplaces you sell on." },
  { icon: RotateCcw, pain: "Returns and refunds are all manual.", fix: "Self-serve return flows wired into your actual fulfilment process, not a support inbox full of spreadsheets." },
  { icon: AlertTriangle, pain: "We can't handle a traffic spike.", fix: "Architecture that scales for a sale-day surge, load-tested before it ever needs to hold under real pressure." },
  { icon: TrendingDown, pain: "Traffic comes, but nobody converts.", fix: "Clear product pages, honest reviews, and a checkout that doesn't ask for anything it doesn't need." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Shirt, title: "Fashion & D2C", body: "Storefronts built around visual browsing, size guidance, and a fast path from landing page to cart." },
  { icon: Utensils, title: "Food & FMCG", body: "Subscription and repeat-order flows for products people buy again and again, not just once." },
  { icon: Building2, title: "B2B Commerce", body: "Bulk pricing, quote requests, and account-based ordering for buyers who aren't paying by card at checkout." },
  { icon: Rocket, title: "New Brands", body: "A launch-ready storefront that doesn't need a rebuild the moment the first real sales month lands." },
  { icon: Store, title: "Multi-Channel Retail", body: "One inventory feeding your website, marketplaces, and in-store point of sale without manual reconciliation." },
  { icon: GraduationCap, title: "Digital Products", body: "Checkout and delivery flows for courses, licenses, and downloads — no physical shipping to plan around." },
];

/* quality bars we hold ourselves to */
const BENCHMARKS = [
  { value: 95, suffix: "+", label: "Lighthouse performance", note: "Measured on mobile, not desktop", ring: 95 },
  { value: 2, suffix: "s", label: "Target checkout load time", note: "First contentful paint on 4G", ring: 90 },
  { value: 100, suffix: "%", label: "Payment gateway uptime target", note: "Monitored from hour one", ring: 100 },
  { value: 0, suffix: "", label: "Known critical bugs", note: "Nothing ships red", ring: 100 },
];

/* the actual artifacts handed over */
const HANDOVER = [
  { icon: Globe, title: "Domain access", body: "Your domain is registered in your name, with full access to it — DNS, renewals, and transfers stay in your hands." },
  { icon: CreditCard, title: "Payment gateway account", body: "Your merchant account is registered in your name, so payments go straight to you." },
  { icon: LayoutDashboard, title: "Store admin", body: "A login to manage products, inventory, and orders yourself — no code involved — with a walkthrough at handover." },
  { icon: Palette, title: "Design files", body: "The Figma project with components and styles, so future work doesn't start from a screenshot." },
];

const COMPARE_COLS = ["Codelix", "Template / builder", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "Timeline you can hold us to", vals: ["yes", "yes", "no", "partial"] },
  { label: "Built for your exact catalogue & workflow", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Handles a real sale-day traffic spike", vals: ["yes", "maybe", "no", "yes"] },
  { label: "Post-launch support & docs", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Transparent, fixed pricing", vals: ["yes", "yes", "maybe", "no"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services/application-development" },
  { icon: Palette, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

/* what's actually included */
const INCLUDED = [
  { icon: ShoppingCart, title: "Custom storefront build", body: "Hand-built or headless commerce front-ends — no page-builder bloat, no theme you have to fight to customise." },
  { icon: CreditCard, title: "Payment gateway integration", body: "Secure checkout wired to the gateways your market actually uses, with fees and taxes handled correctly." },
  { icon: PackageSearch, title: "Inventory & order sync", body: "A single source of truth between your storefront, warehouse, and any marketplaces you already sell on." },
  { icon: Gauge, title: "Performance budget", body: "We hold a Core Web Vitals target from day one. Fast on a mid-range phone on 4G, not just on your office wifi." },
  { icon: ShieldCheck, title: "Security & compliance", body: "HTTPS, PCI-conscious payment handling, and sensible headers configured before anything goes live." },
  { icon: Wrench, title: "CMS & handover", body: "An admin you can actually use for products and orders, plus documentation." },
];

/* the interactive estimator's option sets */
const EST_TYPES = [
  { id: "storefront", label: "Standard storefront", weeks: 4, base: "A hosted or headless storefront with checkout." },
  { id: "marketplace", label: "Multi-vendor marketplace", weeks: 10, base: "Multiple sellers, payouts, and listing management." },
  { id: "b2b", label: "B2B ordering portal", weeks: 8, base: "Bulk pricing, quotes, and account-based checkout." },
  { id: "migration", label: "Platform migration", weeks: 5, base: "Moving an existing store to new architecture safely." },
];
const EST_SCALE = [
  { id: "s", label: "Under 100 SKUs", mult: 1 },
  { id: "m", label: "100–1,000 SKUs", mult: 1.3 },
  { id: "l", label: "1,000–10,000 SKUs", mult: 1.65 },
  { id: "xl", label: "10,000+ SKUs", mult: 2 },
];
const EST_ADDONS = [
  { id: "subs", label: "Subscriptions", weeks: 1 },
  { id: "multi", label: "Multi-currency", weeks: 0.5 },
  { id: "loyalty", label: "Loyalty & rewards", weeks: 1 },
  { id: "erp", label: "ERP/warehouse integration", weeks: 1.5 },
  { id: "pos", label: "In-store POS sync", weeks: 1.5 },
  { id: "analytics", label: "Analytics & dashboards", weeks: 0.5 },
];

const PROCESS = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We work out what the storefront actually has to do — your catalogue, your customers, and what can be cut for launch." },
  { n: "02", title: "Architecture", time: "3–5 days", body: "Platform choice, catalogue structure, and the technical approach, agreed before design starts so nothing gets rebuilt later." },
  { n: "03", title: "Design", time: "1–2 weeks", body: "High-fidelity screens for every key template, reviewed with you until the direction is signed off." },
  { n: "04", title: "Build", time: "3–8 weeks", body: "Front-end, checkout, and integrations built in sprints, with a staging link you can check at any point." },
  { n: "05", title: "QA & Launch", time: "1–2 weeks", body: "Cross-browser, cross-device, load, and payment-flow testing — then deployment and DNS cutover." },
  { n: "06", title: "Support", time: "Ongoing", body: "Post-launch fixes, monitoring, and improvements. You keep the code either way." },
];

const FAQS = [
  { q: "Shopify, WooCommerce, or a custom build — which do we need?", a: "Shopify or WooCommerce cover most standard storefronts well and get you live faster. We'll recommend a custom or headless build only when your catalogue, workflow, or scale genuinely needs it." },
  { q: "Can you migrate our existing store without losing sales?", a: "Yes. We plan the migration around your traffic patterns, keep the old store live until the new one is verified, and handle redirects so SEO rankings carry over." },
  { q: "Do you handle payment gateway setup?", a: "Yes, for whichever gateways your market actually uses. You own the merchant account — we don't hold your payment processing hostage." },
  { q: "Can it handle a big sale-day traffic spike?", a: "We architect and load-test for it before launch, rather than finding out during your first real sale event." },
  { q: "Will I be able to manage products myself?", a: "Yes. We build an admin your team can actually use for products, inventory, and orders, and walk you through it at handover." },
  { q: "What happens after launch?", a: "Every project includes a post-launch support window for fixes. After that, you can keep us on a monthly retainer for updates, fixes, and support." },
];

const SENTENCE = [
  "YOU GET THE CATALOGUE.",
  "YOU GET THE CHECKOUT.",
];

import ServicePageV2 from "../ServiceDetailV2/ServicePageV2";

const PAGE = {
  related: { category: "E-Commerce Solutions" },
  estType: "storefront",
  estScale: "m",
  estAddons: [],
  estRange: [0.85, 1.25, 2], // [low x, high x, minimum weeks]
  name: "E-Commerce Solutions",
  status: "Service 04 · E-Commerce Solutions",
  h1: "E-Commerce Website Development Company in India",
  heroLine: "Storefronts built",
  heroAccent: "backwards from payment.",
  heroLede: "We build high-performance storefronts and checkout flows with clean, hand-written code — designed to convert browsers into buyers.",
  facts: [ ["Typical timeline", "3–10 weeks"], ["Starts with", "Discovery call"], ["Post-launch", "Support included"], ],
  problemsHeading: "The problems we get called in to fix.",
  problemsLede: "If you recognise two or three of these, a rebuild will pay for itself faster than another round of patches.",
  includedHeading: "Every build ships with all of this.",
  includedLede: "Not an upsell list — this is the baseline on every commerce project we take, whatever the size.",
  forHeading: "Built for how your customers actually shop.",
  forLede: "The stack and the checkout flow change depending on what you sell and how your buyers actually pay.",
  workHeading: "Commerce builds we've shipped.",
  estHeading: "Rough out your timeline in ten seconds.",
  estLede: "Pick what you're building and we'll show an honest range. It's an estimate, not a quote — but it's the same maths we start from.",
  estQ1: "01 — What are you building?",
  estQ2: "02 — How big is your catalogue?",
  estOutK: "Estimated build time",
  barMax: 30,
  estList: (
    <>
      <li><Check size={13} strokeWidth={2.4} /> Design + build + QA included</li>
      <li><Check size={13} strokeWidth={2.4} /> Fixed price once scoped</li>
    </>
  ),
  estCta: <><Link className="v2-btn" to="/contact">Get an exact quote →</Link></>,
  benchLede: "Every build is measured against these before it's allowed to ship — not aspirations, gates.",
  benchMeta: "Checked on every build",
  grad: "ecom-",
  stackLabel: "The Commerce Stack",
  stackHeading: "What we build storefronts with.",
  stackLede: "Chosen per project, not by habit — the right tool for your catalogue, your team, and what you'll need to maintain.",
  handoverHeading: "Everything, at handover.",
  handoverLede: "Here is the exact list of what lands in your accounts when the project closes.",
  manifestTitle: "Handover manifest",
  manifestMeta: "Transferred on completion",
  handoverFoot: "Everything above transfers to your accounts when the project closes.",
  compareLede: "A template, a freelancer, and a big agency all solve part of the problem. Here's where each one tends to leave you exposed.",
  faqHeading: "Questions about e-commerce development.",
  ctaHeading: <>Tell us what you're selling.<br />We'll tell you how we'd build it.</>,
  ctaLede: "A structured conversation about your store — your catalogue, your customers, your constraints. We scope what should be built first, what can wait, and what it takes to ship it.",
  path: "/services/e-commerce-solutions",
  deepDive: true,
  relatedReading: true,
  process: { heading: "How A Build Runs.", lede: "Six stages from first call to live store — nothing advances until the stage before it is signed off.", steps: PROCESS },
  stack: ECOM_STACK,
  PROBLEMS, USE_CASES, BENCHMARKS, HANDOVER, COMPARE_COLS, COMPARE_ROWS, OTHER_SERVICES, INCLUDED, EST_TYPES, EST_SCALE, EST_ADDONS, FAQS, SENTENCE,
};

export default function ECommerceSolutionsV2() {
  return <ServicePageV2 page={PAGE} />;
}
