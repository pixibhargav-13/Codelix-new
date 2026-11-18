import { Link } from "react-router-dom";
import { Globe, LayoutDashboard, Gauge, Search, ShieldCheck, Smartphone, Wrench, Check, TrendingDown, Clock, EyeOff, Unlink, PhoneOff, Building2, Store, Rocket, GraduationCap, HeartPulse, Landmark, BookOpen, Palette, PenTool, ShoppingCart, Code2, Sparkles, BarChart3, LifeBuoy } from "lucide-react";

/* web-specific stack subset */
import techReact from "../Images/react.webp";
import techNext from "../Images/next.webp";
import techTs from "../Images/typescript.webp";
import techJs from "../Images/javascript.webp";
import techVite from "../Images/vite.webp";
import techTailwind from "../Images/tailwind.webp";
import techBootstrap from "../Images/bootstrap.webp";
import techNode from "../Images/node.webp";
import techLaravel from "../Images/laravel.webp";
import techPhp from "../Images/php.webp";
import techPostgres from "../Images/postgresql.webp";
import techMongo from "../Images/MongoDB.webp";
import techAws from "../Images/AWS.webp";
import techDocker from "../Images/docker.webp";
import techFigma from "../Images/figma.webp";
import techWebflow from "../Images/webflow.webp";

const WEB_STACK = [
  { src: techReact, name: "React" },
  { src: techNext, name: "Next.js" },
  { src: techTs, name: "TypeScript" },
  { src: techJs, name: "JavaScript" },
  { src: techVite, name: "Vite" },
  { src: techTailwind, name: "Tailwind" },
  { src: techBootstrap, name: "Bootstrap" },
  { src: techNode, name: "Node.js" },
  { src: techLaravel, name: "Laravel" },
  { src: techPhp, name: "PHP" },
  { src: techPostgres, name: "PostgreSQL" },
  { src: techMongo, name: "MongoDB" },
  { src: techAws, name: "AWS" },
  { src: techDocker, name: "Docker" },
  { src: techFigma, name: "Figma" },
  { src: techWebflow, name: "Webflow" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: Clock, pain: "The site takes forever to load.", fix: "We hold a performance budget from day one and test on mid-range phones, not just fast office wifi." },
  { icon: EyeOff, pain: "Nobody finds us on Google.", fix: "Semantic markup, structured data, clean URLs, and real page-speed work — the technical groundwork search engines actually reward." },
  { icon: Unlink, pain: "We can't update anything ourselves.", fix: "A CMS your team can genuinely use, plus documentation and a walkthrough at handover." },
  { icon: TrendingDown, pain: "Traffic comes, but nobody converts.", fix: "We design backwards from the action you want, then cut every step that isn't earning its place." },
  { icon: PhoneOff, pain: "It falls apart on mobile.", fix: "Designed and tested small-screen-first, across real devices — not a desktop layout squeezed down." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Building2, title: "Corporate & B2B", body: "Credibility-first sites for companies whose buyers research before they ever make contact." },
  { icon: Rocket, title: "Startups & SaaS", body: "Marketing sites and product pages that explain a new idea clearly and capture signups." },
  { icon: Store, title: "Retail & D2C", body: "Storefronts built around a fast, low-friction path from landing to checkout." },
  { icon: GraduationCap, title: "Education", body: "Course catalogues, admissions journeys, and student portals that handle real enrolment load." },
  { icon: HeartPulse, title: "Healthcare", body: "Appointment flows and patient information built with privacy and accessibility in mind." },
  { icon: Landmark, title: "Finance & Legal", body: "Compliance-conscious sites where trust signals and document handling actually matter." },
];

/* quality bars we hold ourselves to — value is the count-up target */
const BENCHMARKS = [
  { value: 95, suffix: "+", label: "Lighthouse performance", note: "Measured on mobile, not desktop", ring: 95 },
  { value: 2, suffix: "s", label: "Target load time", note: "First contentful paint on 4G", ring: 90 },
  { value: 100, suffix: "%", label: "Responsive coverage", note: "320px through ultrawide", ring: 100 },
  { value: 0, suffix: "", label: "Known critical bugs", note: "Nothing ships red", ring: 100 },
];

/* the actual artifacts handed over — concrete, not vague promises */
const HANDOVER = [
  { icon: Globe, title: "Domain access", body: "Your domain is registered in your name, with full access to it — DNS, renewals, and transfers stay in your hands." },
  { icon: LayoutDashboard, title: "Admin access", body: "A login to the admin panel, so your team can manage content without touching code." },
  { icon: BookOpen, title: "User guide & walkthrough", body: "A plain-language guide to running it day to day, plus a live walkthrough for your team at handover." },
  { icon: Palette, title: "Design files", body: "The Figma project with components and styles, so future design work doesn't start from a screenshot." },
];

/* how we stack up against what a buyer is realistically comparing us to.
   `vals` order = [Codelix, Template/builder, Freelancer, Large agency] */
const COMPARE_COLS = ["Codelix", "Template / builder", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "Timeline you can hold us to", vals: ["yes", "yes", "no", "partial"] },
  { label: "Built for your exact workflow", vals: ["yes", "no", "maybe", "yes"] },
  { label: "One team, one point of contact", vals: ["yes", "no", "yes", "no"] },
  { label: "Post-launch support & docs", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Transparent, fixed pricing", vals: ["yes", "yes", "maybe", "no"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services/application-development" },
  { icon: PenTool, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

/* what's actually included — the deliverables buyers want spelled out */
const INCLUDED = [
  { icon: Globe, title: "Custom front-end build", body: "Hand-built interfaces in React or Next.js — no page-builder bloat, no theme you have to fight to customise." },
  { icon: Gauge, title: "Performance budget", body: "We hold a Core Web Vitals target from day one. Fast on a mid-range phone on 4G, not just on your office wifi." },
  { icon: Search, title: "Technical SEO groundwork", body: "Semantic markup, metadata, sitemaps, structured data, and clean URLs — so the site is findable the day it launches." },
  { icon: Smartphone, title: "Responsive across devices", body: "Designed and tested from small phones up to wide desktops. No 'mobile version' bolted on afterwards." },
  { icon: ShieldCheck, title: "Security & hardening", body: "HTTPS, input validation, dependency auditing, and sensible headers configured before anything goes live." },
  { icon: Wrench, title: "CMS & handover", body: "An admin you can actually use, plus a guide and walkthrough for your team." },
];

/* the interactive estimator's option sets */
const EST_TYPES = [
  { id: "landing", label: "Landing page", weeks: 1, base: "A single focused page built to convert." },
  { id: "marketing", label: "Marketing site", weeks: 2.5, base: "Multi-page site with a CMS behind it." },
  { id: "webapp", label: "Web application", weeks: 5, base: "Authenticated product with real logic." },
  { id: "platform", label: "Platform / SaaS", weeks: 10, base: "Multi-tenant system built to scale." },
];
const EST_SCALE = [
  { id: "s", label: "1–5 pages", mult: 1 },
  { id: "m", label: "6–15 pages", mult: 1.35 },
  { id: "l", label: "16–40 pages", mult: 1.7 },
  { id: "xl", label: "40+ pages", mult: 2.1 },
];
const EST_ADDONS = [
  { id: "cms", label: "CMS", weeks: 0.5 },
  { id: "auth", label: "User accounts", weeks: 1 },
  { id: "pay", label: "Payments", weeks: 1 },
  { id: "api", label: "Third-party integrations", weeks: 1 },
  { id: "multi", label: "Multi-language", weeks: 0.5 },
  { id: "analytics", label: "Analytics & dashboards", weeks: 0.5 },
];

const FAQS = [
  { q: "How long does a website take to build?", a: "A focused landing page is usually 2–3 weeks. A full marketing site with a CMS runs 4–8 weeks. Web applications depend heavily on scope — use the estimator above for a rough range, then we'll firm it up on a call." },
  { q: "Do you redesign existing websites?", a: "Yes. We'll audit what you have first — sometimes the right answer is a rebuild, sometimes it's targeted fixes to performance and conversion. We'll tell you honestly which one you need." },
  { q: "Will I be able to update the site myself?", a: "Yes, if you want a CMS we'll build one you can actually use, and walk your team through it at handover. If you'd rather we handle updates, that's what the support retainer is for." },
  { q: "Do you handle hosting and domains?", a: "Yes. We set up and manage the hosting for you, and your domain is registered in your name with full access to it — we never hold your domain hostage." },
  { q: "Is SEO included?", a: "Technical SEO is — semantic markup, metadata, structured data, sitemaps, speed. Ongoing content strategy and link building are separate, though we can advise." },
  { q: "What happens after launch?", a: "Every project includes a post-launch support window for fixes. After that, you can keep us on a monthly retainer for updates, fixes, and support." },
];

const SENTENCE = [
  "YOU GET THE DOMAIN.",
  "YOU GET THE ADMIN.",
  "FIXED SCOPE.",
  "FIXED PRICE.",
];

import ServicePageV2 from "./ServicePageV2";

const PAGE = {
  related: { category: "Web Development" },
  estType: "marketing",
  estScale: "m",
  estAddons: ["cms"],
  estRange: [0.85, 1.25, 2], // [low x, high x, minimum weeks]
  name: "Web Development",
  answer: "Codelix IT Solutions is a web application development company in Ahmedabad, India. We build websites and web applications with hand-written code, on a fixed written quote. A typical project takes 2–12 weeks, starts with a discovery call and includes support after launch.",
  status: "Service 01 · Web Development",
  h1: "Web Application Development Company in India",
  heroLine: "Websites that are",
  heroAccent: "fast, findable, and yours.",
  heroLede: "We build high-performance websites and web applications with clean, hand-written code — designed to convert visitors into customers.",
  facts: [ ["Typical timeline", "2–12 weeks"], ["Starts with", "Discovery call"], ["Post-launch", "Support included"], ],
  problemsHeading: "The problems we get called in to fix.",
  problemsLede: "If you recognise two or three of these, a rebuild will pay for itself faster than another round of patches.",
  includedHeading: "Every build ships with all of this.",
  includedLede: "Not an upsell list — this is the baseline on every web project we take, whatever the size.",
  forHeading: "Built for how your sector actually operates.",
  forLede: "The stack and the structure change depending on who's using the site and what they came to do.",
  workHeading: "Web builds we've shipped.",
  estHeading: "Rough out your timeline in ten seconds.",
  estLede: "Pick what you're building and we'll show an honest range. It's an estimate, not a quote — but it's the same maths we start from.",
  estQ1: "01 — What are you building?",
  estQ2: "02 — How big is it?",
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
  grad: "",
  stackLabel: "The Web Stack",
  stackHeading: "What we build websites with.",
  stackLede: "Chosen per project, not by habit — the right tool for your scale, your team, and what you'll need to maintain.",
  handoverHeading: "Everything, at handover.",
  handoverLede: "Here is the exact list of what lands in your accounts when the project closes.",
  manifestTitle: "Handover manifest",
  manifestMeta: "Transferred on completion",
  handoverFoot: "Everything above transfers to your accounts when the project closes.",
  compareLede: "A template, a freelancer, and a big agency all solve part of the problem. Here's where each one tends to leave you exposed.",
  faqHeading: "Questions about web development.",
  ctaHeading: <>Tell us what you're building.<br />We'll tell you how we'd build it.</>,
  ctaLede: "A structured conversation about your site — your users, your goals, your constraints. We scope what should be built first, what can wait, and what it takes to ship it.",
  path: "/services/web-development",
  deepDive: true,
  relatedReading: true,
  process: null,
  stack: WEB_STACK,
  PROBLEMS, USE_CASES, BENCHMARKS, HANDOVER, COMPARE_COLS, COMPARE_ROWS, OTHER_SERVICES, INCLUDED, EST_TYPES, EST_SCALE, EST_ADDONS, FAQS, SENTENCE,
};

export default function ServiceDetailV2() {
  return <ServicePageV2 page={PAGE} />;
}
