import { PenTool, Layers, Search, Eye, Smartphone, Palette, Check, HelpCircle, Paintbrush, MousePointerClick, RefreshCw, Users2, Frown, Building2, Store, Rocket, GraduationCap, HeartPulse, Landmark, BookOpen, KeyRound, GitBranch, Layout, Globe, ShoppingCart, Code2, Sparkles, BarChart3, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";

/* UI/UX-specific tool logos */
import techFigma from "../Images/figma.webp";
import techXD from "../Images/adobe-xd.webp";
import techSketch from "../Images/sketch.webp";
import techFramer from "../Images/framer.webp";
import techPhotoshop from "../Images/PhotoShop.webp";
import techCanva from "../Images/canva.webp";

const UIUX_STACK = [
  { src: techFigma, name: "Figma" },
  { src: techXD, name: "Adobe XD" },
  { src: techSketch, name: "Sketch" },
  { src: techFramer, name: "Framer" },
  { src: techPhotoshop, name: "Photoshop" },
  { src: techCanva, name: "Canva" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: HelpCircle, pain: "We designed without research.", fix: "We start with real user data — interviews, analytics, competitor audits — so every design decision has a reason behind it." },
  { icon: Paintbrush, pain: "Our brand looks inconsistent.", fix: "A living design system with reusable components, tokens, and spacing rules that keep every screen on-brand automatically." },
  { icon: MousePointerClick, pain: "Users drop off before converting.", fix: "We map the full user journey and redesign around the action that matters — removing friction at every step." },
  { icon: RefreshCw, pain: "Every update breaks something.", fix: "Component-driven design with clear documentation means your team can iterate without accidentally drifting off-system." },
  { icon: Users2, pain: "We never tested with real users.", fix: "Clickable prototypes tested with real people before a single line of code is written — so you fix problems when they're cheap." },
  { icon: Frown, pain: "It works, but it feels dated.", fix: "A modern visual refresh that respects what already works while upgrading typography, spacing, and micro-interactions." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Building2, title: "Corporate & B2B", body: "Complex workflows simplified into interfaces that employees and clients can navigate without training." },
  { icon: Rocket, title: "Startups & SaaS", body: "MVPs designed to validate fast — clear onboarding, sharp dashboards, and flows that keep early adopters engaged." },
  { icon: Store, title: "Retail & D2C", body: "Shopping experiences designed around speed and trust — from product discovery to a frictionless checkout." },
  { icon: GraduationCap, title: "Education", body: "Learning platforms with clear information hierarchy, accessible navigation, and intuitive course progression." },
  { icon: HeartPulse, title: "Healthcare", body: "Patient-facing interfaces built with accessibility, clarity, and privacy as first-class design requirements." },
  { icon: Landmark, title: "Finance & Legal", body: "Dashboards and portals that make dense data scannable and complex workflows feel straightforward." },
];

/* quality bars we hold ourselves to */
const BENCHMARKS = [
  { value: 90, suffix: "+", label: "Usability score", note: "System Usability Scale (SUS)", ring: 90 },
  { value: 95, suffix: "%", label: "Task completion rate", note: "Measured in user testing", ring: 95 },
  { value: 100, suffix: "%", label: "Design consistency", note: "Token-driven, no one-offs", ring: 100 },
  { value: 0, suffix: "", label: "Unresolved usability issues", note: "Nothing ships untested", ring: 100 },
];

/* the actual artifacts handed over */
const HANDOVER = [
  { icon: Palette, title: "Figma design files", body: "The complete Figma project with all screens, components, and auto-layout — ready to iterate on or hand to another designer." },
  { icon: Layers, title: "Design system", body: "A documented component library with tokens for color, typography, spacing, and elevation — one source of truth for every screen." },
  { icon: Layout, title: "Interactive prototypes", body: "Clickable flows in Figma that demonstrate the full user journey — not static mockups, but a testable product simulation." },
  { icon: BookOpen, title: "UX documentation", body: "User flows, personas, research findings, and design rationale — so future decisions build on evidence, not guesses." },
  { icon: KeyRound, title: "Asset exports", body: "Every icon, illustration, and image exported in the formats and resolutions your developers need — SVG, PNG, WebP." },
  { icon: GitBranch, title: "Developer handoff", body: "Annotated specs with exact measurements, tokens, and interaction notes — so the build matches the design pixel-for-pixel." },
];

/* comparison table */
const COMPARE_COLS = ["Codelix", "DIY / Canva", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "Research-backed design decisions", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Reusable design system", vals: ["yes", "no", "maybe", "yes"] },
  { label: "User testing before handoff", vals: ["yes", "no", "no", "partial"] },
  { label: "One team, one point of contact", vals: ["yes", "yes", "yes", "no"] },
  { label: "Developer-ready handoff", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Transparent, fixed pricing", vals: ["yes", "yes", "maybe", "no"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services/application-development" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

/* what's included */
const INCLUDED = [
  { icon: Search, title: "User research & analysis", body: "Interviews, surveys, analytics reviews, and competitor audits — so we design for real behaviour, not assumptions." },
  { icon: Layers, title: "Wireframes & information architecture", body: "Low-fidelity layouts that nail the structure and flow before anyone picks a colour or a font." },
  { icon: Palette, title: "High-fidelity UI design", body: "Pixel-perfect screens with your brand applied — typography, colour, spacing, and imagery all dialled in." },
  { icon: PenTool, title: "Design system & components", body: "A reusable library of buttons, forms, cards, and patterns — so every new screen is consistent by default." },
  { icon: MousePointerClick, title: "Interactive prototyping", body: "Clickable Figma prototypes you can test with real users and share with stakeholders before writing code." },
  { icon: Eye, title: "Usability testing & iteration", body: "We watch real people use the prototype, identify friction, and redesign until the interface feels obvious." },
];

/* estimator option sets */
const EST_TYPES = [
  { id: "audit", label: "UI audit", weeks: 1, base: "A review of your existing interface with actionable fixes." },
  { id: "mobile", label: "Mobile app design", weeks: 3, base: "End-to-end design for iOS or Android." },
  { id: "saas", label: "SaaS product design", weeks: 5, base: "Dashboard, onboarding, and core flows." },
  { id: "system", label: "Design system", weeks: 4, base: "Tokens, components, and documentation." },
];
const EST_SCALE = [
  { id: "s", label: "1–5 screens", mult: 1 },
  { id: "m", label: "6–15 screens", mult: 1.3 },
  { id: "l", label: "16–40 screens", mult: 1.65 },
  { id: "xl", label: "40+ screens", mult: 2 },
];
const EST_ADDONS = [
  { id: "research", label: "User research", weeks: 1 },
  { id: "testing", label: "Usability testing", weeks: 0.5 },
  { id: "motion", label: "Micro-animations", weeks: 0.5 },
  { id: "icons", label: "Custom iconography", weeks: 0.5 },
  { id: "brand", label: "Brand refresh", weeks: 1 },
  { id: "handoff", label: "Dev handoff specs", weeks: 0.5 },
];

const PROCESS = [
  { n: "01", title: "Research", time: "3–5 days", body: "We talk to users, audit the competition, and dig into analytics to understand what the design actually needs to solve." },
  { n: "02", title: "IA & User Flows", time: "2–3 days", body: "Sitemap, screen inventory, and task flows mapped out — so the structure is right before anyone opens a design tool." },
  { n: "03", title: "Wireframes", time: "1 week", body: "Low-fidelity layouts reviewed with you until the structure and hierarchy are signed off — no wasted high-fidelity time." },
  { n: "04", title: "Visual Design", time: "1–3 weeks", body: "High-fidelity screens with real content, brand applied, and every interaction state accounted for." },
  { n: "05", title: "Prototype & Test", time: "1–2 weeks", body: "Interactive Figma prototype tested with real users — we identify and fix usability issues before development starts." },
  { n: "06", title: "Handoff & Support", time: "Ongoing", body: "Annotated specs, exported assets, and a design system your developers can build from accurately." },
];

const FAQS = [
  { q: "How long does a typical design project take?", a: "A focused UI audit is usually 1–2 weeks. A full product design with research, wireframes, and testing runs 4–8 weeks. Use the estimator above for a rough range, then we'll firm it up on a call." },
  { q: "Do you redesign existing products?", a: "Yes. We'll audit what you have first — sometimes the right answer is a full redesign, sometimes it's targeted fixes to specific flows. We'll tell you honestly which one you need." },
  { q: "Do you build the product too, or just design it?", a: "We can do both. If you have your own developers, we hand off pixel-perfect specs and a design system they can build from. If you need us to build it, we have a full development team." },
  { q: "What tools do you use?", a: "Figma is our primary tool for UI design, prototyping, and design systems. We also use Adobe XD, Sketch, and Framer depending on project needs and client preferences." },
  { q: "Can you create a design system for our existing product?", a: "Absolutely. We audit your current interface, identify patterns, and build a component library with tokens for colour, typography, spacing, and elevation — documented for your team." },
  { q: "Do you do user research?", a: "Yes — it's one of our strongest capabilities. Interviews, surveys, analytics audits, competitive analysis, and usability testing. Research is what separates design from decoration." },
];

const SENTENCE = [
  "YOU GET THE FILES.",
  "YOU GET THE SYSTEM.",
  "YOU GET THE RESEARCH.",
  "NO LOCK-IN.",
  "NO LICENSE GAMES.",
];

import ServicePageV2 from "../ServiceDetailV2/ServicePageV2";

const PAGE = {
  related: { category: "UI/UX Design" },
  estType: "mobile",
  estScale: "s",
  estAddons: [],
  estRange: [1, 1.35, 0], // [low x, high x, minimum weeks]
  name: "UI/UX Design",
  answer: "Codelix IT Solutions is a UI/UX design company in Ahmedabad. We design websites, mobile apps and SaaS products from user research through wireframes and Figma prototypes, then hand over full Figma files and a design system. A typical project takes 1–6 weeks and starts with a discovery call.",
  status: "Service 03 · UI/UX Design",
  h1: "UI/UX Design Company in Ahmedabad",
  heroLine: "Interfaces that are",
  heroAccent: "intuitive, beautiful, and backed by evidence.",
  heroLede: "We design user interfaces and product experiences grounded in real research — prototyped, tested, and refined until the interface feels obvious, then handed over with a complete design system.",
  facts: [ ["Typical timeline", "1–6 weeks"], ["Starts with", "Discovery call"], ["You receive", "Full Figma files"], ["Post-handoff", "Support included"], ],
  problemsHeading: "The problems we get called in to fix.",
  problemsLede: "If you recognise two or three of these, a proper design process will save you more than another round of ad-hoc tweaks.",
  includedHeading: "Every design project ships with all of this.",
  includedLede: "Not an upsell list — this is the baseline on every UI/UX project we take, whatever the size.",
  forHeading: "Designed for how your sector actually operates.",
  forLede: "The approach changes depending on your users, your industry, and what they're trying to accomplish.",
  workHeading: "Designs we've shipped.",
  estHeading: "Rough out your timeline in ten seconds.",
  estLede: "Pick what you need and we'll show an honest range. It's an estimate, not a quote — but it's the same maths we start from.",
  estQ1: "01 — What do you need?",
  estQ2: "02 — How big is it?",
  estOutK: "Estimated design time",
  barMax: 20,
  estList: (
    <>
      <li><Check size={13} strokeWidth={2.4} /> Research + design + testing included</li>
      <li><Check size={13} strokeWidth={2.4} /> Fixed price once scoped</li>
      <li><Check size={13} strokeWidth={2.4} /> Full Figma handover</li>
    </>
  ),
  estCta: <><Link className="v2-btn" to="/contact">Get an exact quote →</Link></>,
  benchLede: "Every design is measured against these before it's allowed to ship — not aspirations, gates.",
  benchMeta: "Checked on every project",
  grad: "ux-",
  stackLabel: "The Design Stack",
  stackHeading: "What we design with.",
  stackLede: "Chosen per project, not by habit — the right tool for your team's workflow and your developers' handoff needs.",
  handoverHeading: "Everything, at handoff.",
  handoverLede: "\"You own the designs\" is easy to say. Here is the exact list of what lands in your accounts when the project closes.",
  manifestTitle: "Handoff manifest",
  manifestMeta: "Transferred on completion",
  handoverFoot: (
    <>
      Everything above transfers to your accounts when the project closes.
      <b> No lock-in, no retained access, no dependency on us.</b>
    </>
  ),
  compareLede: "A template kit, a freelancer, and a big agency all solve part of the problem. Here's where each one tends to leave you exposed.",
  faqHeading: "Questions about UI/UX design.",
  ctaHeading: <>Tell us what you're designing.<br />We'll tell you how we'd approach it.</>,
  ctaLede: "A structured conversation about your product — your users, your goals, your constraints. We scope what should be designed first, what can wait, and what it takes to ship it.",
  path: "/services/ui-ux-design",
  deepDive: false,
  relatedReading: true,
  process: { heading: "How A Design Project Runs.", lede: "Six stages from first call to final handoff — nothing advances until the stage before it is signed off.", steps: PROCESS },
  stack: UIUX_STACK,
  PROBLEMS, USE_CASES, BENCHMARKS, HANDOVER, COMPARE_COLS, COMPARE_ROWS, OTHER_SERVICES, INCLUDED, EST_TYPES, EST_SCALE, EST_ADDONS, FAQS, SENTENCE,
};

export default function UIUXDesignV2() {
  return <ServicePageV2 page={PAGE} />;
}
