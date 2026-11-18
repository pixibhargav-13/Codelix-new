import { LayoutDashboard, Smartphone, Gauge, Bell, ShieldCheck, Wifi, Wrench, Check, BatteryLow, RefreshCcw, Bug, LayoutGrid, Building2, Store, Rocket, GraduationCap, HeartPulse, Landmark, BookOpen, KeyRound, Palette, Globe, ShoppingCart, Code2, Sparkles, BarChart3, LifeBuoy, Store as StoreOff } from "lucide-react";
import { Link } from "react-router-dom";

/* mobile-specific stack subset — pulled from the same real stack list shown
   on the homepage's "THE STACK" section, not a new set of claims */
import techFlutter from "../Images/flutter.webp";
import techSwift from "../Images/swift.webp";
import techAndroid from "../Images/android.webp";
import techJava from "../Images/java.webp";
import techNode from "../Images/node.webp";
import techFirebase from "../Images/Firebase.webp";
import techAws from "../Images/AWS.webp";
import techFigma from "../Images/figma.webp";

const APP_STACK = [
  { src: techFlutter, name: "Flutter" },
  { src: techSwift, name: "Swift" },
  { src: techAndroid, name: "Android" },
  { src: techJava, name: "Java" },
  { src: techNode, name: "Node.js" },
  { src: techFirebase, name: "Firebase" },
  { src: techAws, name: "AWS" },
  { src: techFigma, name: "Figma" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: BatteryLow, pain: "The app drains battery and lags.", fix: "We profile every screen against real devices, not just simulators, so performance issues get caught before launch." },
  { icon: StoreOff, pain: "It keeps getting rejected from the store.", fix: "We build to Apple and Google's actual review guidelines from day one, not as an afterthought before submission." },
  { icon: RefreshCcw, pain: "iOS and Android versions drift apart.", fix: "One Flutter codebase for both platforms, so a fix or feature ships everywhere at once, not twice." },
  { icon: Wifi, pain: "It breaks the moment the signal drops.", fix: "Offline-first data handling and sync logic, so patchy connectivity degrades gracefully instead of crashing." },
  { icon: Bug, pain: "Every update seems to break something else.", fix: "Automated testing across the core flows before every release, so a new feature doesn't quietly break an old one." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Building2, title: "Corporate & B2B", body: "Internal tools and field-service apps that replace paper forms and spreadsheets with something your team actually opens." },
  { icon: Rocket, title: "Startups & SaaS", body: "A companion mobile app for a web product, built to ship fast without duplicating the whole engineering effort." },
  { icon: Store, title: "Retail & D2C", body: "Shopping apps with a fast, low-friction path from browsing to checkout, built for repeat use, not a one-off visit." },
  { icon: GraduationCap, title: "Education", body: "Student and parent apps for schedules, attendance, and communication that hold up under real daily use." },
  { icon: HeartPulse, title: "Healthcare", body: "Appointment and patient-facing apps built with privacy, accessibility, and offline reliability in mind." },
  { icon: Landmark, title: "Finance & Legal", body: "Secure, compliance-conscious apps where authentication and data handling actually matter." },
];

/* quality bars we hold ourselves to */
const BENCHMARKS = [
  { value: 99, suffix: "%", label: "Crash-free sessions", note: "Measured post-launch, not in a demo", ring: 99 },
  { value: 2, suffix: "s", label: "Target cold-start time", note: "On a mid-range Android device", ring: 90 },
  { value: 100, suffix: "%", label: "Store-guideline compliance", note: "Reviewed before every submission", ring: 100 },
  { value: 0, suffix: "", label: "Known critical bugs", note: "Nothing ships red", ring: 100 },
];

/* the actual artifacts handed over */
const HANDOVER = [
  { icon: KeyRound, title: "App store accounts", body: "Apple Developer and Google Play Console accounts registered in your name, with credentials handed over." },
  { icon: Palette, title: "Design files", body: "The Figma project with components and styles, so future work doesn't start from a screenshot." },
  { icon: LayoutDashboard, title: "Admin access", body: "A login to the admin panel, so your team can manage content and users without touching code." },
  { icon: BookOpen, title: "User guide & walkthrough", body: "A plain-language guide to running it day to day, plus a live walkthrough for your team at handover." },
];

const COMPARE_COLS = ["Codelix", "No-code app builder", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "Timeline you can hold us to", vals: ["yes", "yes", "no", "partial"] },
  { label: "One codebase, both platforms", vals: ["yes", "partial", "maybe", "yes"] },
  { label: "One team, one point of contact", vals: ["yes", "no", "yes", "no"] },
  { label: "Post-launch support & docs", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Transparent, fixed pricing", vals: ["yes", "yes", "maybe", "no"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Palette, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

/* what's actually included */
const INCLUDED = [
  { icon: Smartphone, title: "Cross-platform build", body: "One Flutter codebase for iOS and Android where it fits, or fully native where the platform demands it." },
  { icon: Gauge, title: "Performance profiling", body: "Cold-start time, memory, and battery use checked against real mid-range devices, not just a flagship simulator." },
  { icon: Bell, title: "Push & background handling", body: "Notifications, background sync, and offline-first data so the app stays useful with a weak signal." },
  { icon: ShieldCheck, title: "Security & hardening", body: "Secure auth, encrypted local storage, and sensible API handling configured before anything ships." },
  { icon: LayoutGrid, title: "Store-ready submission", body: "App-store listing assets, screenshots, and compliance review handled as part of the build, not after." },
  { icon: Wrench, title: "Backend & admin", body: "A reliable backend with an admin panel your team can use, plus app-store account handover." },
];

/* the interactive estimator's option sets */
const EST_TYPES = [
  { id: "mvp", label: "MVP app", weeks: 4, base: "A focused app that proves the core idea works." },
  { id: "consumer", label: "Consumer app", weeks: 8, base: "Full-featured app with accounts, content, and push." },
  { id: "marketplace", label: "Marketplace app", weeks: 12, base: "Two-sided app with listings, search, and messaging." },
  { id: "enterprise", label: "Enterprise / field app", weeks: 10, base: "Internal tool with offline sync and role-based access." },
];
const EST_SCALE = [
  { id: "s", label: "Single platform", mult: 1 },
  { id: "m", label: "iOS + Android", mult: 1.4 },
  { id: "l", label: "+ Admin dashboard", mult: 1.75 },
  { id: "xl", label: "+ Backend from scratch", mult: 2.1 },
];
const EST_ADDONS = [
  { id: "auth", label: "User accounts", weeks: 1 },
  { id: "pay", label: "In-app payments", weeks: 1.5 },
  { id: "push", label: "Push notifications", weeks: 0.5 },
  { id: "offline", label: "Offline mode", weeks: 1.5 },
  { id: "chat", label: "In-app messaging", weeks: 1.5 },
  { id: "analytics", label: "Analytics & dashboards", weeks: 0.5 },
];

const PROCESS = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We work out what the app actually has to do — who it's for, what action matters, and what can be cut for v1." },
  { n: "02", title: "Architecture", time: "3–5 days", body: "Platform choice, data model, and the technical approach, agreed before design starts so nothing gets rebuilt later." },
  { n: "03", title: "Design", time: "1–2 weeks", body: "High-fidelity screens for every key flow, reviewed with you until the direction is signed off." },
  { n: "04", title: "Build", time: "3–10 weeks", body: "Front-end and backend built in sprints, with a test build you can install on your own device at any point." },
  { n: "05", title: "QA & Store Submission", time: "1–2 weeks", body: "Device testing, crash monitoring, and store-guideline review — then submission and release." },
  { n: "06", title: "Support", time: "Ongoing", body: "Post-launch fixes, monitoring, and OS-update compatibility. You keep the code either way." },
];

const FAQS = [
  { q: "Flutter or native — which do we need?", a: "Flutter covers most consumer and internal apps well and ships to both platforms from one codebase. We'll recommend fully native Swift/Java only when a feature genuinely needs it — camera-heavy or hardware-specific apps, mostly." },
  { q: "How long does an app take to build?", a: "A focused MVP is usually 4–6 weeks. A full consumer app with accounts and push runs 8–12 weeks. Marketplace and enterprise apps depend on scope — use the estimator above for a rough range." },
  { q: "Do you handle the App Store and Play Store submission?", a: "Yes. We prepare the listing assets, handle the review process, and submit under your own developer accounts, so you're never locked out of your own app." },
  { q: "Can the app work without an internet connection?", a: "For apps that need it, yes — we build offline-first data handling that syncs once the connection returns, rather than the app simply failing." },
  { q: "Will I be able to update content myself?", a: "Where it makes sense, yes — we build an admin panel or CMS so your team can manage content without waiting on a new app release." },
  { q: "What happens after launch?", a: "Every project includes a post-launch support window for fixes and OS-update compatibility. After that, you can keep us on a monthly retainer for updates, fixes, and support." },
];

const SENTENCE = [
  "YOU GET THE ACCOUNTS.",
  "YOU GET THE ADMIN.",
  "FIXED PRICE.",
];

import ServicePageV2 from "../ServiceDetailV2/ServicePageV2";

const PAGE = {
  related: { category: "Application Development" },
  estType: "consumer",
  estScale: "m",
  estAddons: ["auth"],
  estRange: [0.85, 1.25, 3], // [low x, high x, minimum weeks]
  name: "Application Development",
  answer: "Codelix IT Solutions is a mobile app development company in Ahmedabad, India, building cross-platform and native apps for Android and iOS: one Flutter codebase where it fits, fully native where the platform demands it. A typical app takes 4–12 weeks, starts with a discovery call and includes support after launch.",
  status: "Service 02 · Application Development",
  h1: "Mobile App Development Company in India",
  heroLine: "Apps that feel",
  heroAccent: "native, not bolted on.",
  heroLede: "We build cross-platform and native mobile apps with clean, hand-written code — one Flutter codebase where it fits, fully native where the platform demands it.",
  facts: [ ["Typical timeline", "4–12 weeks"], ["Starts with", "Discovery call"], ["Post-launch", "Support included"], ],
  problemsHeading: "The problems we get called in to fix.",
  problemsLede: "If you recognise two or three of these, a rebuild will pay for itself faster than another round of patches.",
  includedHeading: "Every build ships with all of this.",
  includedLede: "Not an upsell list — this is the baseline on every app project we take, whatever the size.",
  forHeading: "Built for how your users actually behave.",
  forLede: "The platform and the architecture change depending on who's using the app and what they came to do.",
  workHeading: "App builds we've shipped.",
  estHeading: "Rough out your timeline in ten seconds.",
  estLede: "Pick what you're building and we'll show an honest range. It's an estimate, not a quote — but it's the same maths we start from.",
  estQ1: "01 — What are you building?",
  estQ2: "02 — Which platforms?",
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
  grad: "app-",
  stackLabel: "The App Stack",
  stackHeading: "What we build apps with.",
  stackLede: "Chosen per project, not by habit — the right tool for your platform, your team, and what you'll need to maintain.",
  handoverHeading: "Everything, at handover.",
  handoverLede: "Here is the exact list of what lands in your accounts when the project closes.",
  manifestTitle: "Handover manifest",
  manifestMeta: "Transferred on completion",
  handoverFoot: "Everything above transfers to your accounts when the project closes.",
  compareLede: "A no-code builder, a freelancer, and a big agency all solve part of the problem. Here's where each one tends to leave you exposed.",
  faqHeading: "Questions about mobile app development.",
  ctaHeading: <>Tell us what you're building.<br />We'll tell you how we'd build it.</>,
  ctaLede: "A structured conversation about your app — your users, your goals, your constraints. We scope what should be built first, what can wait, and what it takes to ship it.",
  path: "/services/application-development",
  deepDive: true,
  relatedReading: true,
  process: { heading: "How A Build Runs.", lede: "Six stages from first call to a live app — nothing advances until the stage before it is signed off.", steps: PROCESS },
  stack: APP_STACK,
  PROBLEMS, USE_CASES, BENCHMARKS, HANDOVER, COMPARE_COLS, COMPARE_ROWS, OTHER_SERVICES, INCLUDED, EST_TYPES, EST_SCALE, EST_ADDONS, FAQS, SENTENCE,
};

export default function ApplicationDevelopmentV2() {
  return <ServicePageV2 page={PAGE} />;
}
