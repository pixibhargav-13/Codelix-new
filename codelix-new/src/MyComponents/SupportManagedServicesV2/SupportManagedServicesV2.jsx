import { Wrench, ShieldCheck, Activity, Users2, Clock, AlertTriangle, Server, RefreshCw, GitBranch, TrendingUp, Headphones, Bell, Search, Globe, Smartphone, Palette, ShoppingCart, Code2, Sparkles, BarChart3, Check, FileText, FileCode2, Store, Rocket, GraduationCap, Building2, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

/* reusing the same generic stack icons already used on other service pages
   — no new image assets required */
import techReact from "../Images/react.webp";
import techAWS from "../Images/AWS.webp";
import techDocker from "../Images/docker.webp";
import techPostgres from "../Images/postgresql.webp";
import techNode from "../Images/Express.png";
import techMongo from "../Images/MongoDB.webp";

const SUPPORT_STACK = [
  { src: techAWS, name: "AWS" },
  { src: techDocker, name: "Docker" },
  { src: techReact, name: "React" },
  { src: techNode, name: "Node.js" },
  { src: techPostgres, name: "PostgreSQL" },
  { src: techMongo, name: "MongoDB" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: AlertTriangle, pain: "Our site breaks and no one notices for days.", fix: "Proactive uptime and error monitoring that alerts us before your users complain." },
  { icon: Headphones, pain: "We're paying for support but can't reach anyone.", fix: "A named team you can actually reach — not a ticket that vanishes into a queue." },
  { icon: Clock, pain: "Every 'quick fix' turns into a week-long wait.", fix: "A monthly retainer with guaranteed response times, not best-effort promises." },
  { icon: ShieldCheck, pain: "Security patches get skipped until something breaks.", fix: "Scheduled dependency and security updates, applied before they're urgent." },
  { icon: TrendingUp, pain: "Performance quietly degrades as the product grows.", fix: "Regular performance audits and optimization — not just firefighting outages." },
  { icon: Users2, pain: "We need more engineering hands, but not a full hire.", fix: "Dedicated developers who slot into your team on a flexible monthly basis." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Rocket, title: "Post-Launch Startups", body: "You shipped an MVP and need someone watching it while you focus on the next feature, not the last one." },
  { icon: Store, title: "E-Commerce", body: "Uptime during sales spikes, payment gateway monitoring, and fast fixes when checkout breaks at the worst time." },
  { icon: Building2, title: "Growing SaaS", body: "A dedicated retainer that scales with usage — more monitoring, more capacity, without a full-time hire." },
  { icon: GraduationCap, title: "Agencies", body: "Overflow engineering capacity when your own team is stretched thin on a client deadline." },
  { icon: HeartPulse, title: "Regulated Industries", body: "Documented patch cycles and audit trails for healthcare, fintech, and other compliance-heavy sectors." },
  { icon: Server, title: "Legacy Systems", body: "Someone who'll actually maintain the old system instead of quietly letting it rot until it fails." },
];

/* quality bars we hold ourselves to */
const BENCHMARKS = [
  { value: 99.9, suffix: "%", label: "Uptime target", note: "Monitored continuously, not sampled", ring: 100 },
  { value: 4, suffix: "hr", label: "Critical response time", note: "For Priority-1 incidents", ring: 92 },
  { value: 100, suffix: "%", label: "Patches applied on schedule", note: "No skipped security updates", ring: 100 },
  { value: 24, suffix: "/7", label: "Uptime monitoring", note: "Automated alerts, always on", ring: 100 },
];

/* the actual artifacts handed over */
const HANDOVER = [
  { icon: FileText, title: "Monthly Health Report", body: "Uptime, performance, and security status in plain language — what happened, what we fixed, what's next." },
  { icon: Bell, title: "Incident Response Log", body: "A timestamped record of every alert, what triggered it, and how it was resolved." },
  { icon: GitBranch, title: "Update Changelog", body: "Every dependency bump, patch, and deployment logged, so nothing changes silently." },
  { icon: Activity, title: "Performance Audit", body: "A recurring pass on load times, queries, and bottlenecks — not just a one-off health check." },
  { icon: Headphones, title: "Direct Support Channel", body: "A dedicated Slack or email line to the actual people maintaining your system, not a ticket portal." },
  { icon: FileCode2, title: "SLA Documentation", body: "Written response-time commitments per severity level, so expectations are explicit, not assumed." },
];

/* comparison table */
const COMPARE_COLS = ["Codelix", "No support plan", "Freelancer on call", "Big agency retainer"];
const COMPARE_ROWS = [
  { label: "Guaranteed response times", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Direct access to who fixes it", vals: ["yes", "no", "yes", "no"] },
  { label: "Proactive monitoring, not just reactive", vals: ["yes", "no", "no", "maybe"] },
  { label: "Scheduled security patching", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Scales up or down monthly", vals: ["yes", "no", "maybe", "no"] },
  { label: "No long-term lock-in contract", vals: ["yes", "yes", "yes", "no"] },
  { label: "Predictable monthly cost", vals: ["yes", "no", "no", "yes"] },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services/application-development" },
  { icon: Palette, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
];

/* what's included */
const INCLUDED = [
  { icon: Activity, title: "Uptime & Error Monitoring", body: "Automated, continuous monitoring of your live system with alerts routed to a real person, not a dashboard nobody checks." },
  { icon: ShieldCheck, title: "Security & Dependency Updates", body: "Scheduled patching of frameworks, libraries, and infrastructure before vulnerabilities become incidents." },
  { icon: Wrench, title: "Bug Fixes & Patches", body: "A defined monthly allowance of hours for fixing issues as they're reported, with clear priority tiers." },
  { icon: TrendingUp, title: "Performance Optimization", body: "Recurring passes on load times, database queries, and infrastructure cost — not just firefighting when it's slow." },
  { icon: Users2, title: "Dedicated Team Augmentation", body: "Extra engineering hands who already know your codebase, scaled up or down as your roadmap changes." },
  { icon: FileText, title: "Monthly Reporting", body: "A plain-language summary of uptime, incidents, and what we did — so support isn't a black box." },
];

/* estimator option sets */
const EST_TYPES = [
  { id: "essential", label: "Essential Monitoring", weeks: 1, base: "Uptime alerts and monthly security patching for a stable, low-change system." },
  { id: "standard", label: "Standard Retainer", weeks: 2, base: "Monitoring, patching, and a monthly bug-fix allowance for an actively used product." },
  { id: "priority", label: "Priority Support", weeks: 3, base: "Faster response SLAs and a larger fix allowance for business-critical systems." },
  { id: "augment", label: "Team Augmentation", weeks: 4, base: "Dedicated developer capacity working your roadmap alongside ongoing support." },
];
const EST_SCALE = [
  { id: "s", label: "Small (single app)", mult: 1 },
  { id: "m", label: "Medium (a few services)", mult: 1.3 },
  { id: "l", label: "Large (multiple systems)", mult: 1.7 },
  { id: "xl", label: "Enterprise-wide", mult: 2.3 },
];
const EST_ADDONS = [
  { id: "afterhours", label: "After-hours coverage", weeks: 1 },
  { id: "security_audit", label: "Security audit", weeks: 1.5 },
  { id: "perf_audit", label: "Performance audit", weeks: 1 },
  { id: "onboarding_docs", label: "Documentation cleanup", weeks: 1 },
  { id: "extra_dev", label: "Additional dedicated developer", weeks: 2 },
  { id: "dr_plan", label: "Disaster recovery plan", weeks: 1.5 },
];

const PROCESS = [
  { n: "01", icon: Search, title: "Onboarding & Audit", time: "1 week", body: "We review your codebase, infrastructure, and current pain points to understand what actually needs watching." },
  { n: "02", icon: FileText, title: "Plan Selection", time: "2–3 days", body: "You pick the coverage level that matches your risk and budget — no generic one-size-fits-all package." },
  { n: "03", icon: Activity, title: "Monitoring Goes Live", time: "Within a week", body: "Uptime, error, and performance monitoring configured and alerting to a real person from day one." },
  { n: "04", icon: RefreshCw, title: "Scheduled Maintenance", time: "Ongoing", body: "Security patches and dependency updates applied on a set cadence, not whenever someone remembers." },
  { n: "05", icon: Bell, title: "Incident Response", time: "As needed", body: "When something breaks, it's triaged and fixed against the response-time SLA in your plan." },
  { n: "06", icon: Check, title: "Monthly Review", time: "Every month", body: "A report on uptime, what was fixed, and what we recommend next — so support stays visible, not silent." },
];

const FAQS = [
  { q: "Do you only support projects you originally built?", a: "No. We start every new support engagement with a codebase audit so we understand the system properly, whether we built it or not." },
  { q: "What counts as a Priority-1 incident?", a: "Anything that takes your system down or blocks a core user flow — checkout, login, data loss. Those get our fastest response tier." },
  { q: "Is there a minimum contract length?", a: "No long-term lock-in. Plans run monthly, and you can scale coverage up or down as your needs change." },
  { q: "What if our support hours run out mid-month?", a: "We'll flag it before it happens. You can top up hours for that month, or we adjust the plan going forward — no surprise overage bills." },
  { q: "Can this replace hiring an in-house engineer?", a: "For many teams, yes — especially at the scale where a full-time hire isn't justified yet. For larger teams, we typically augment your existing engineers instead." },
  { q: "Do you handle hosting and infrastructure, or just the code?", a: "Both, if needed. We can manage your cloud infrastructure directly or work alongside your existing hosting provider." },
];

const SENTENCE = [
  "YOU SHIP IT.",
  "WE KEEP IT RUNNING.",
  "NO SURPRISE DOWNTIME.",
  "NO ABANDONED PROJECTS.",
  "JUST SUPPORT.",
];

import ServicePageV2 from "../ServiceDetailV2/ServicePageV2";

const PAGE = {
  related: { slugs: ["internal-ops-erp-case-study", "book-collections-case-study", "freight-shipping-case-study"] },
  estType: "standard",
  estScale: "m",
  estAddons: [],
  estRange: [1, 1.35, 0], // [low x, high x, minimum weeks]
  name: "Support & Managed Services",
  answer: "Codelix IT Solutions provides software maintenance and managed IT services from Ahmedabad, India: uptime monitoring, security patching, performance tuning and dedicated engineering capacity. Onboarding takes about a week, starts with a codebase audit, and runs on a monthly contract with no lock-in.",
  status: "Service 08 · Support & Managed Services",
  h1: "Software Maintenance & Managed IT Services",
  heroLine: "Ongoing support that",
  heroAccent: "keeps things running.",
  heroLede: "Uptime monitoring, security patching, performance tuning, and dedicated engineering capacity — a support plan that catches problems before your users do.",
  facts: [ ["Typical setup", "1 week onboarding"], ["Starts with", "Codebase Audit"], ["You receive", "Monitoring & Reports"], ["Contract", "Monthly, no lock-in"], ],
  problemsHeading: "The support problems we fix every day.",
  problemsLede: "If \"support\" currently means hoping nothing breaks, it's time for an actual plan.",
  includedHeading: "Every support plan ships with all of this.",
  includedLede: "Not an upsell list — this is the baseline on every support engagement we take, whatever the size.",
  forHeading: "Support scoped to how you actually run.",
  forLede: "The right support plan depends on how critical the system is and how much is changing month to month.",
  workHeading: "Selected work.",
  estHeading: "Rough out your onboarding time in ten seconds.",
  estLede: "Pick what you need and we'll show an honest range. It's an estimate, not a quote — but it's the same maths we start from.",
  estQ1: "01 — What level of support?",
  estQ2: "02 — How large is the system?",
  estOutK: "Estimated onboarding time",
  barMax: 12,
  estList: (
    <>
      <li><Check size={14} /> Codebase & infrastructure audit</li>
      <li><Check size={14} /> Monitoring & alerting setup</li>
      <li><Check size={14} /> Written SLA documentation</li>
    </>
  ),
  estCta: (
    <>
      <Link to="/contact" className="v2-btn v2-btn--outline" style={{ marginTop: 24, width: "100%" }}>
      <span>Discuss this scope</span>
      </Link>
    </>
  ),
  benchLede: "Every support plan is measured against these — not aspirations, gates.",
  benchMeta: "Checked every month",
  grad: "support-",
  stackLabel: "The Support Stack",
  stackHeading: "What we monitor and maintain with.",
  stackLede: "Chosen per system, not by habit — the right tooling for your stack, your team, and what you'll need to maintain.",
  handoverHeading: "Everything, every month.",
  handoverLede: "\"We've got it covered\" is easy to say. Here is the exact list of what lands in your inbox every month.",
  manifestTitle: "Support manifest",
  manifestMeta: "Delivered monthly",
  handoverFoot: (
    <>
      Everything above is part of the monthly plan, not billed as
      surprise extras. <b>No lock-in, cancel with notice.</b>
    </>
  ),
  compareLede: "No support plan, a freelancer on call, and a big agency retainer all solve part of the problem. Here's where each one tends to leave you exposed.",
  faqHeading: "Questions about maintenance and support.",
  ctaHeading: <>Tell us what's keeping you up at night.<br />We'll tell you how we'd cover it.</>,
  ctaLede: "A structured conversation about your system — what's fragile, what's urgent, and what a realistic support plan looks like.",
  path: "/services/support-managed-services",
  deepDive: false,
  relatedReading: false,
  process: { heading: "How We Keep Things Running.", lede: "Six stages from onboarding to monthly review — nothing runs unmonitored, and nothing changes silently.", steps: PROCESS },
  stack: SUPPORT_STACK,
  PROBLEMS, USE_CASES, BENCHMARKS, HANDOVER, COMPARE_COLS, COMPARE_ROWS, OTHER_SERVICES, INCLUDED, EST_TYPES, EST_SCALE, EST_ADDONS, FAQS, SENTENCE,
};

export default function SupportManagedServicesV2() {
  return <ServicePageV2 page={PAGE} />;
}
