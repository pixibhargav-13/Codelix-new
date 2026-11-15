import { Gauge, MessageSquare, ShieldCheck, Workflow, Wrench, Check, Repeat2, Clock, HelpCircle, FileWarning, AlertTriangle, Building2, Store, Rocket, HeartPulse, Landmark, GraduationCap, BookOpen, KeyRound, Palette, Globe, Smartphone, ShoppingCart, Code2, BarChart3, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";

/* applied-AI-specific stack subset — pulled from the same real stack list
   shown on the homepage's "THE STACK" section, not a new set of claims */
import techPython from "../Images/python.webp";
import techNode from "../Images/node.webp";
import techDjango from "../Images/django.webp";
import techPostgres from "../Images/postgresql.webp";
import techMongo from "../Images/MongoDB.webp";
import techDocker from "../Images/docker.webp";
import techAws from "../Images/AWS.webp";

const AI_STACK = [
  { src: techPython, name: "Python" },
  { src: techNode, name: "Node.js" },
  { src: techDjango, name: "Django" },
  { src: techPostgres, name: "PostgreSQL" },
  { src: techMongo, name: "MongoDB" },
  { src: techDocker, name: "Docker" },
  { src: techAws, name: "AWS" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: Repeat2, pain: "Your team retypes the same data between tools.", fix: "We automate the handoff between systems, not the judgement — the data moves itself, a person still decides." },
  { icon: Clock, pain: "Support answers the same question fifty times a day.", fix: "A chat automation trained on your actual docs and FAQs, so common questions get answered before they reach a person." },
  { icon: HelpCircle, pain: "We don't know where AI would even help.", fix: "We start with an honest audit of your workflow, not a pitch — some of it won't need AI, and we'll say so." },
  { icon: FileWarning, pain: "We're worried about a black-box system.", fix: "Every system we build is explainable to the people who operate it. No decision your team can't trace back." },
  { icon: AlertTriangle, pain: "A previous AI project never made it to production.", fix: "We scope for what can actually ship and be maintained, not a demo that impresses once and then gets abandoned." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Store, title: "E-Commerce", body: "Product recommendations and support automation that reduce manual triage without losing the personal touch." },
  { icon: Rocket, title: "SaaS", body: "In-app assistants and smart defaults that make a product feel like it understands the user's intent." },
  { icon: HeartPulse, title: "Healthcare", body: "Intake and scheduling automation built with privacy and human oversight kept firmly in the loop." },
  { icon: Landmark, title: "Finance", body: "Document processing and anomaly flagging that speeds up review without replacing the reviewer." },
  { icon: Building2, title: "Operations", body: "Workflow automation that removes the repetitive middle step between two systems that don't talk to each other." },
  { icon: GraduationCap, title: "Education", body: "Content and query automation that helps students find answers without waiting on a support queue." },
];

/* quality bars we hold ourselves to */
const BENCHMARKS = [
  { value: 100, suffix: "%", label: "Explainable decisions", note: "No black-box logic your team can't trace", ring: 100 },
  { value: 2, suffix: "s", label: "Target response time", note: "For interactive automation, not batch jobs", ring: 90 },
  { value: 100, suffix: "%", label: "Human-override coverage", note: "Every automation can be manually corrected", ring: 100 },
  { value: 0, suffix: "", label: "Known critical bugs", note: "Nothing ships red", ring: 100 },
];

/* the actual artifacts handed over */
const HANDOVER = [
  { icon: Workflow, title: "Decision logic documentation", body: "A plain-language explanation of what the system automates and why, so it's never a black box to your team." },
  { icon: BookOpen, title: "User guide & walkthrough", body: "A plain-language guide to running it day to day, plus a live walkthrough for your team at handover." },
  { icon: KeyRound, title: "Accounts in your name", body: "AI-provider and third-party tool subscriptions registered in your name, so billing and usage stay with you." },
];

const COMPARE_COLS = ["Codelix", "Off-the-shelf AI tool", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "Timeline you can hold us to", vals: ["yes", "yes", "no", "partial"] },
  { label: "Built for your exact workflow", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Explainable, not a black box", vals: ["yes", "maybe", "maybe", "yes"] },
  { label: "Post-launch support & docs", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Transparent, fixed pricing", vals: ["yes", "yes", "maybe", "no"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services/application-development" },
  { icon: Palette, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

/* what's actually included */
const INCLUDED = [
  { icon: Workflow, title: "Workflow audit", body: "We map where automation genuinely helps before proposing anything — some of your process won't need it." },
  { icon: MessageSquare, title: "Chat & support automation", body: "Trained on your own docs and FAQs, so it answers with your actual policies, not generic guesses." },
  { icon: Repeat2, title: "Process automation", body: "The repetitive handoff between two systems removed, so a person only touches what needs judgement." },
  { icon: Gauge, title: "Performance & reliability", body: "Response times and uptime held to a target before anything reaches your users, not discovered after launch." },
  { icon: ShieldCheck, title: "Explainability by default", body: "Every automated decision traceable back to a reason — no logic your team can't explain to a customer." },
  { icon: Wrench, title: "Documentation & handover", body: "Plain-language docs and a walkthrough your team can actually follow." },
];

/* the interactive estimator's option sets */
const EST_TYPES = [
  { id: "audit", label: "Automation audit", weeks: 1, base: "Review of your workflow with a prioritised automation plan." },
  { id: "chatbot", label: "Chat / support automation", weeks: 4, base: "A trained assistant wired into your docs and support flow." },
  { id: "workflow", label: "Process automation", weeks: 5, base: "Automating a specific repetitive handoff between systems." },
  { id: "platform", label: "Full AI-enabled platform", weeks: 10, base: "Multiple automations built into one connected system." },
];
const EST_SCALE = [
  { id: "s", label: "Single workflow", mult: 1 },
  { id: "m", label: "A few connected workflows", mult: 1.35 },
  { id: "l", label: "Department-wide", mult: 1.7 },
  { id: "xl", label: "Company-wide", mult: 2.1 },
];
const EST_ADDONS = [
  { id: "integration", label: "Third-party integrations", weeks: 1 },
  { id: "training", label: "Team training", weeks: 0.5 },
  { id: "monitoring", label: "Ongoing monitoring", weeks: 0.5 },
  { id: "override", label: "Human-override tooling", weeks: 1 },
  { id: "multi", label: "Multi-language support", weeks: 1 },
  { id: "analytics", label: "Analytics & dashboards", weeks: 0.5 },
];

const PROCESS = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We work out where automation actually helps — the workflow it touches and what can't be delegated to it." },
  { n: "02", title: "Architecture", time: "3–5 days", body: "Data flow, model choice, and the technical approach, agreed before design starts so nothing gets rebuilt later." },
  { n: "03", title: "Design", time: "1 week", body: "The interaction flow for whoever uses the system — reviewed with you until the direction is signed off." },
  { n: "04", title: "Build", time: "3–8 weeks", body: "Built in sprints, with a staging link you can test against your own real cases at any point." },
  { n: "05", title: "QA & Launch", time: "1–2 weeks", body: "Accuracy, reliability, and edge-case testing against your real data — then deployment." },
  { n: "06", title: "Support", time: "Ongoing", body: "Monitoring, tuning, and improvements as your data and needs evolve. You keep the code either way." },
];

const FAQS = [
  { q: "Do we need our own data before starting?", a: "It helps, but isn't required for everything — some automations work from your existing docs and policies. We'll tell you honestly during the audit if your data isn't ready yet." },
  { q: "Will this replace our team?", a: "No — we build automation for the repetitive middle step, not the judgement calls. The goal is your team spending less time on data entry and more on decisions." },
  { q: "How do you keep the system from making bad decisions?", a: "Every system we build includes human-override paths and is designed to be explainable — no logic your team can't trace back to a reason." },
  { q: "What if the automation gets something wrong?", a: "We build in monitoring and a correction path from day one, and tune the system based on real cases it gets wrong, rather than assuming it's perfect at launch." },
  { q: "Can this integrate with our existing tools?", a: "Yes. We regularly connect CRMs, support platforms, and internal databases so automation reads and writes to your systems, not a separate silo." },
  { q: "What happens after launch?", a: "Every project includes a post-launch support window for monitoring and tuning. After that, you can keep us on a monthly retainer for updates, fixes, and support." },
];

const SENTENCE = [
  "EVERY DECISION EXPLAINED.",
  "NO BLACK BOXES.",
  "FIXED PRICE.",
];

import ServicePageV2 from "../ServiceDetailV2/ServicePageV2";

const PAGE = {
  related: { slugs: ["smart-business-case-study", "book-collections-case-study", "erp-case-study"] },
  estType: "chatbot",
  estScale: "m",
  estAddons: ["override"],
  estRange: [0.85, 1.25, 2], // [low x, high x, minimum weeks]
  name: "AI Development",
  status: "Service 06 · AI Development",
  h1: "AI Development Company in India",
  heroLine: "Automation for the handoff,",
  heroAccent: "not the judgement.",
  heroLede: "We build AI agents and automation with clean, hand-written code — explainable by default, aimed at the repetitive handoff between your tools.",
  facts: [ ["Typical timeline", "2–10 weeks"], ["Starts with", "Workflow audit"], ["Post-launch", "Support included"], ],
  problemsHeading: "The problems we get called in to fix.",
  problemsLede: "If you recognise two or three of these, an audit will pay for itself faster than another manual workaround.",
  includedHeading: "Every build ships with all of this.",
  includedLede: "Not an upsell list — this is the baseline on every applied-AI project we take, whatever the size.",
  forHeading: "Built for where your workflow actually stalls.",
  forLede: "The right automation changes depending on your sector, your data, and how much human oversight the decision needs.",
  workHeading: "Selected work.",
  estHeading: "Rough out your timeline in ten seconds.",
  estLede: "Pick what you need and we'll show an honest range. It's an estimate, not a quote — but it's the same maths we start from.",
  estQ1: "01 — What do you need?",
  estQ2: "02 — How wide is the reach?",
  estOutK: "Estimated build time",
  barMax: 20,
  estList: (
    <>
      <li><Check size={13} strokeWidth={2.4} /> Design + build + QA included</li>
      <li><Check size={13} strokeWidth={2.4} /> Fixed price once scoped</li>
    </>
  ),
  estCta: <><Link className="v2-btn" to="/contact">Get an exact quote →</Link></>,
  benchLede: "Every build is measured against these before it's allowed to ship — not aspirations, gates.",
  benchMeta: "Checked on every build",
  grad: "ai-",
  stackLabel: "The Automation Stack",
  stackHeading: "What we build automation with.",
  stackLede: "Chosen per project, not by habit — the right tool for your data, your team, and what you'll need to maintain.",
  handoverHeading: "Everything, at handover.",
  handoverLede: "Here is the exact list of what lands in your accounts when the project closes.",
  manifestTitle: "Handover manifest",
  manifestMeta: "Transferred on completion",
  handoverFoot: "Everything above transfers to your accounts when the project closes.",
  compareLede: "An off-the-shelf AI tool, a freelancer, and a big agency all solve part of the problem. Here's where each one tends to leave you exposed.",
  faqHeading: "Questions about AI development.",
  ctaHeading: <>Tell us where it slows down.<br />We'll tell you how we'd automate it.</>,
  ctaLede: "A structured conversation about your workflow — where the manual work actually sits, your constraints. We scope what should be built first, what can wait, and what it takes to ship it.",
  path: "/services/ai-development",
  deepDive: true,
  relatedReading: true,
  process: { heading: "How A Build Runs.", lede: "Six stages from first call to live automation — nothing advances until the stage before it is signed off.", steps: PROCESS },
  stack: AI_STACK,
  PROBLEMS, USE_CASES, BENCHMARKS, HANDOVER, COMPARE_COLS, COMPARE_ROWS, OTHER_SERVICES, INCLUDED, EST_TYPES, EST_SCALE, EST_ADDONS, FAQS, SENTENCE,
};

export default function AIDevelopmentV2() {
  return <ServicePageV2 page={PAGE} />;
}
