import { LayoutDashboard, Code2, Gauge, Layers, ShieldCheck, Workflow, Wrench, Check, FileSpreadsheet, Clock, Puzzle, Repeat, Users2, AlertOctagon, Building2, Store, Rocket, Factory, HeartPulse, Landmark, BookOpen, Palette, Globe, Smartphone, ShoppingCart, Sparkles, BarChart3, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";

/* custom-software-specific stack subset — pulled from the same real stack
   list shown on the homepage's "THE STACK" section, not a new set of claims */
import techJava from "../Images/java.webp";
import techSpring from "../Images/springboot.webp";
import techCsharp from "../Images/csharp.webp";
import techPython from "../Images/python.webp";
import techDjango from "../Images/django.webp";
import techPostgres from "../Images/postgresql.webp";
import techMongo from "../Images/MongoDB.webp";
import techDocker from "../Images/docker.webp";
import techAws from "../Images/AWS.webp";

const CUSTOM_STACK = [
  { src: techJava, name: "Java" },
  { src: techSpring, name: "Spring Boot" },
  { src: techCsharp, name: "C#" },
  { src: techPython, name: "Python" },
  { src: techDjango, name: "Django" },
  { src: techPostgres, name: "PostgreSQL" },
  { src: techMongo, name: "MongoDB" },
  { src: techDocker, name: "Docker" },
  { src: techAws, name: "AWS" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: FileSpreadsheet, pain: "Our operations still run on spreadsheets.", fix: "We turn the spreadsheet nobody fully understands into a system with an owner, an audit trail, and real access control." },
  { icon: Puzzle, pain: "Off-the-shelf software almost fits, but not quite.", fix: "We build to your exact workflow instead of bending your process to fit someone else's product roadmap." },
  { icon: Repeat, pain: "The same manual task happens every single day.", fix: "We automate the repetitive handoffs between your tools, so a person only touches what actually needs judgement." },
  { icon: AlertOctagon, pain: "One system going down stops the whole team.", fix: "Architecture reviewed for single points of failure, with monitoring and backups in place before launch, not after an incident." },
  { icon: Users2, pain: "Every team uses a different, disconnected tool.", fix: "One system your CRM, accounts, and inventory can all speak to, instead of five tools that don't agree with each other." },
  { icon: Clock, pain: "Reports take days because nothing is automated.", fix: "Data aggregated and reported automatically, so a decision doesn't wait on someone compiling numbers by hand." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Factory, title: "Manufacturing & Industrial", body: "Production tracking and workflow systems built around your actual floor operations, not a generic ERP template." },
  { icon: Landmark, title: "Finance & Payroll", body: "Compliance-conscious systems for payroll, disbursements, and reporting where accuracy isn't negotiable." },
  { icon: Building2, title: "Enterprise Operations", body: "Internal tools that replace disconnected spreadsheets with one system your whole team can trust." },
  { icon: HeartPulse, title: "Healthcare", body: "Patient and resource management systems built with privacy and audit requirements in mind." },
  { icon: Rocket, title: "Startups scaling up", body: "Custom internal tooling that grows with the team, instead of a stack of workarounds nobody wants to touch." },
  { icon: Store, title: "Retail & Distribution", body: "Inventory, procurement, and multi-location systems that keep every branch working from the same numbers." },
];

/* quality bars we hold ourselves to */
const BENCHMARKS = [
  { value: 99.9, suffix: "%", label: "Target system uptime", note: "Monitored from day one", ring: 100 },
  { value: 100, suffix: "%", label: "Workflow-fit accuracy", note: "Built to your process, not a template", ring: 100 },
  { value: 0, suffix: "", label: "Single points of failure shipped", note: "Reviewed before every release", ring: 100 },
  { value: 0, suffix: "", label: "Known critical bugs", note: "Nothing ships red", ring: 100 },
];

/* the actual artifacts handed over */
const HANDOVER = [
  { icon: Workflow, title: "Process documentation", body: "The exact workflow the system was built around, so the logic behind it doesn't live only in someone's head." },
  { icon: Globe, title: "Domain access", body: "Your domain is registered in your name, with full access to it — DNS, renewals, and transfers stay in your hands." },
  { icon: LayoutDashboard, title: "Admin access", body: "A login to the admin panel, so your team can manage data and users without touching code." },
  { icon: BookOpen, title: "User guide & walkthrough", body: "A plain-language guide to running it day to day, plus a live walkthrough for your team at handover." },
];

const COMPARE_COLS = ["Codelix", "Off-the-shelf software", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "Timeline you can hold us to", vals: ["yes", "yes", "no", "partial"] },
  { label: "Built for your exact workflow", vals: ["yes", "no", "maybe", "yes"] },
  { label: "No per-seat licensing to outgrow", vals: ["yes", "no", "yes", "yes"] },
  { label: "Post-launch support & docs", vals: ["yes", "maybe", "maybe", "yes"] },
  { label: "Transparent, fixed pricing", vals: ["yes", "yes", "maybe", "no"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services/application-development" },
  { icon: Palette, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services/e-commerce-solutions" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

/* what's actually included */
const INCLUDED = [
  { icon: Workflow, title: "Process mapping", body: "We trace your actual workflow before writing a line of code, so the system fits how your team really works." },
  { icon: Code2, title: "Custom architecture", body: "Built around your data and scale, not adapted from a generic template that fits some of your needs." },
  { icon: ShieldCheck, title: "Security & access control", body: "Role-based access, audit trails, and sensible data handling configured before anything goes live." },
  { icon: Layers, title: "Systems integration", body: "Your CRM, accounts, and inventory made to exchange the right data on the right trigger, not manually re-entered." },
  { icon: Gauge, title: "Performance under real load", body: "Tested against your actual data volumes and usage patterns, not a clean demo dataset." },
  { icon: Wrench, title: "Documentation & handover", body: "Plain-language docs and a walkthrough your team can actually follow." },
];

/* the interactive estimator's option sets */
const EST_TYPES = [
  { id: "internal", label: "Internal tool", weeks: 4, base: "A focused tool replacing a manual process for one team." },
  { id: "erp", label: "ERP / operations system", weeks: 10, base: "Multi-module system spanning several departments." },
  { id: "integration", label: "Systems integration", weeks: 3, base: "Connecting existing tools so data flows automatically." },
  { id: "platform", label: "Full custom platform", weeks: 14, base: "Ground-up system built around your entire operation." },
];
const EST_SCALE = [
  { id: "s", label: "Single team", mult: 1 },
  { id: "m", label: "Multiple departments", mult: 1.4 },
  { id: "l", label: "Multi-location", mult: 1.8 },
  { id: "xl", label: "Enterprise-wide", mult: 2.2 },
];
const EST_ADDONS = [
  { id: "auth", label: "Role-based access", weeks: 1 },
  { id: "reporting", label: "Reporting & dashboards", weeks: 1 },
  { id: "api", label: "Third-party integrations", weeks: 1 },
  { id: "migration", label: "Legacy data migration", weeks: 1.5 },
  { id: "mobile", label: "Companion mobile app", weeks: 2 },
  { id: "audit", label: "Audit trail & compliance", weeks: 1 },
];

const PROCESS = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We work out what the system actually has to do — the workflow it replaces and what can't be compromised." },
  { n: "02", title: "Architecture", time: "3–5 days", body: "Data model, module boundaries, and the technical approach, agreed before design starts so nothing gets rebuilt later." },
  { n: "03", title: "Design", time: "1–2 weeks", body: "High-fidelity screens for every key workflow, reviewed with you until the direction is signed off." },
  { n: "04", title: "Build", time: "4–12 weeks", body: "Modules built in sprints, with a staging environment you can check and test against real workflows at any point." },
  { n: "05", title: "QA & Launch", time: "1–2 weeks", body: "Functional, security, and load testing against your real use cases — then deployment and data migration." },
  { n: "06", title: "Support", time: "Ongoing", body: "Post-launch fixes, monitoring, and improvements. You keep the code either way." },
];

const FAQS = [
  { q: "How is this different from buying off-the-shelf software?", a: "Off-the-shelf software fits 80% of a generic workflow. We build for the 20% that's actually specific to how your business runs — and you're not paying per-seat licensing forever." },
  { q: "Can you integrate with the systems we already use?", a: "Yes. We regularly connect CRMs, accounting software, and inventory systems so they exchange data automatically instead of requiring manual re-entry." },
  { q: "What if our workflow changes after launch?", a: "Custom systems are built to be modified — that's the point. We scope changes as they come up, either through a support retainer or as standalone work." },
  { q: "Do you migrate data from our old system?", a: "Yes. Legacy data migration is a common part of these projects — we plan for it during architecture, not as an afterthought during launch week." },
  { q: "How do you handle security and compliance?", a: "Role-based access, audit trails, and data handling appropriate to your industry are built in from the start, not bolted on before launch." },
  { q: "What happens after launch?", a: "Every project includes a post-launch support window for fixes. After that, you can keep us on a monthly retainer for updates, fixes, and support." },
];

const SENTENCE = [
  "YOU GET THE DOMAIN.",
  "YOU GET THE ADMIN.",
  "FIXED SCOPE.",
  "FIXED PRICE.",
];

import ServicePageV2 from "../ServiceDetailV2/ServicePageV2";

const PAGE = {
  related: { category: "Custom Software Development" },
  estType: "internal",
  estScale: "m",
  estAddons: ["auth"],
  estRange: [0.85, 1.25, 3], // [low x, high x, minimum weeks]
  name: "Custom Software Development",
  status: "Service 05 · Custom Software Development",
  h1: "Custom Software Development Company in India",
  heroLine: "Software built around",
  heroAccent: "how you actually work.",
  heroLede: "We build custom systems and internal tools with clean, hand-written code — designed around your exact workflow instead of bending your process to fit someone else's product.",
  facts: [ ["Typical timeline", "4–14 weeks"], ["Starts with", "Discovery call"], ["Post-launch", "Support included"], ],
  problemsHeading: "The problems we get called in to fix.",
  problemsLede: "If you recognise two or three of these, a custom system will pay for itself faster than another workaround.",
  includedHeading: "Every build ships with all of this.",
  includedLede: "Not an upsell list — this is the baseline on every custom software project we take, whatever the size.",
  forHeading: "Built for how your sector actually operates.",
  forLede: "The architecture changes depending on your industry, your compliance needs, and how many teams the system has to serve.",
  workHeading: "Custom systems we've shipped.",
  estHeading: "Rough out your timeline in ten seconds.",
  estLede: "Pick what you're building and we'll show an honest range. It's an estimate, not a quote — but it's the same maths we start from.",
  estQ1: "01 — What are you building?",
  estQ2: "02 — How wide is the reach?",
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
  grad: "custom-",
  stackLabel: "The Software Stack",
  stackHeading: "What we build custom systems with.",
  stackLede: "Chosen per project, not by habit — the right tool for your scale, your team, and what you'll need to maintain.",
  handoverHeading: "Everything, at handover.",
  handoverLede: "Here is the exact list of what lands in your accounts when the project closes.",
  manifestTitle: "Handover manifest",
  manifestMeta: "Transferred on completion",
  handoverFoot: "Everything above transfers to your accounts when the project closes.",
  compareLede: "Off-the-shelf software, a freelancer, and a big agency all solve part of the problem. Here's where each one tends to leave you exposed.",
  faqHeading: "Questions about custom software.",
  ctaHeading: <>Tell us how you work today.<br />We'll tell you how we'd build it.</>,
  ctaLede: "A structured conversation about your process — your teams, your bottlenecks, your constraints. We scope what should be built first, what can wait, and what it takes to ship it.",
  path: "/services/custom-software-development",
  deepDive: true,
  relatedReading: true,
  process: { heading: "How A Build Runs.", lede: "Six stages from first call to live system — nothing advances until the stage before it is signed off.", steps: PROCESS },
  stack: CUSTOM_STACK,
  PROBLEMS, USE_CASES, BENCHMARKS, HANDOVER, COMPARE_COLS, COMPARE_ROWS, OTHER_SERVICES, INCLUDED, EST_TYPES, EST_SCALE, EST_ADDONS, FAQS, SENTENCE,
};

export default function CustomSoftwareDevelopmentV2() {
  return <ServicePageV2 page={PAGE} />;
}
