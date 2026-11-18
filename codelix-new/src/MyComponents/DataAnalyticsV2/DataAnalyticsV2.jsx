import { PenTool, Search, Eye, Smartphone, Palette, Check, HelpCircle, MousePointerClick, RefreshCw, Users2, Building2, Store, Rocket, HeartPulse, Landmark, BookOpen, Globe, ShoppingCart, Code2, Sparkles, BarChart3, PieChart, Database, Network, Clock, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";

/* Data Analytics-specific tool logos */
import techPython from "../Images/python.webp";
import techAWS from "../Images/AWS.webp";
import techPostgres from "../Images/postgresql.webp";
import techDocker from "../Images/docker.webp";
import techReact from "../Images/react.webp";
import techMongo from "../Images/MongoDB.webp";

const DATA_STACK = [
  { src: techPython, name: "Python" },
  { src: techAWS, name: "AWS" },
  { src: techPostgres, name: "PostgreSQL" },
  { src: techDocker, name: "Docker" },
  { src: techMongo, name: "MongoDB" },
  { src: techReact, name: "React" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: HelpCircle, pain: "We have data, but no insights.", fix: "We build dashboards that surface the metrics you actually need to make decisions, filtering out the noise." },
  { icon: Clock, pain: "Reporting takes days of manual work.", fix: "Automated pipelines that aggregate data from multiple sources in real-time, eliminating spreadsheet wrangling." },
  { icon: HelpCircle, pain: "Different tools show different numbers.", fix: "A single source of truth data warehouse that unifies your metrics across marketing, sales, and product." },
  { icon: Eye, pain: "We only know what happened, not why.", fix: "Deep analytics that uncover trends, anomalies, and root causes so you can proactively adjust strategy." },
  { icon: RefreshCw, pain: "Our data is messy and unreliable.", fix: "Data cleaning and transformation pipelines that ensure data integrity before it reaches your reports." },
  { icon: MousePointerClick, pain: "We don't know how to track new features.", fix: "Comprehensive event tracking plans tailored to your product, capturing user behavior accurately." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Store, title: "E-Commerce", body: "Sales funnels, cart abandonment analysis, and inventory forecasting to maximize revenue and minimize stockouts." },
  { icon: Rocket, title: "SaaS", body: "Churn prediction, user engagement tracking, and MRR dashboards to understand and improve customer lifetime value." },
  { icon: HeartPulse, title: "Healthcare", body: "Patient outcomes tracking, resource utilization analysis, and compliance reporting built with strict data privacy." },
  { icon: Landmark, title: "Finance", body: "Risk analysis models, fraud detection algorithms, and portfolio performance dashboards for rapid decision making." },
  { icon: Users2, title: "Marketing", body: "Campaign ROI measurement, attribution modeling, and customer segmentation to optimize ad spend across channels." },
  { icon: Building2, title: "Operations", body: "Supply chain optimization, bottleneck identification, and operational efficiency metrics to streamline your business." },
];

/* quality bars we hold ourselves to */
const BENCHMARKS = [
  { value: 99.9, suffix: "%", label: "Data accuracy", note: "Validated through automated tests", ring: 100 },
  { value: 2, suffix: "s", label: "Dashboard load time", note: "Optimized queries and caching", ring: 95 },
  { value: 100, suffix: "%", label: "Manual hours saved", note: "Fully automated reporting", ring: 100 },
  { value: 0, suffix: "", label: "Data silos remaining", note: "Unified data warehouse approach", ring: 100 },
];

/* the actual artifacts handed over */
const HANDOVER = [
  { icon: PieChart, title: "Interactive Dashboards", body: "Custom-built, fast-loading dashboards tailored to your specific KPIs, accessible to stakeholders without technical skills." },
  { icon: Database, title: "Data Warehouse Architecture", body: "A scalable, centralized repository for all your business data, optimized for complex queries and reporting." },
  { icon: Network, title: "Automated ETL Pipelines", body: "Robust data extraction, transformation, and loading processes that run silently in the background." },
  { icon: BookOpen, title: "Data Dictionary", body: "Comprehensive documentation defining every metric, data source, and transformation rule for your team." },
  { icon: PenTool, title: "Tracking Plans", body: "Detailed specifications for developers on what events to track, when to fire them, and what properties to include." },
  { icon: Users2, title: "Training & Handover", body: "Workshops and documentation ensuring your team knows how to use the dashboards and read the metrics." },
];

/* real client quote, specific to this page — kept alongside the shared
   site-wide quotes below rather than dropped */

/* comparison table */
const COMPARE_COLS = ["Codelix", "Off-the-shelf BI", "Internal Hire", "Generic Agency"];
const COMPARE_ROWS = [
  { label: "Custom tailored to your business logic", vals: ["yes", "no", "yes", "maybe"] },
  { label: "Handles messy, unstructured data", vals: ["yes", "no", "maybe", "no"] },
  { label: "Scales without per-seat licensing", vals: ["yes", "no", "yes", "yes"] },
  { label: "Deep engineering & UI expertise", vals: ["yes", "no", "maybe", "no"] },
  { label: "Rapid time-to-value", vals: ["yes", "yes", "no", "maybe"] },
  { label: "No single point of failure", vals: ["yes", "yes", "no", "yes"] },
  { label: "Clear data governance strategy", vals: ["yes", "no", "maybe", "no"] },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services/application-development" },
  { icon: Palette, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

/* what's included */
const INCLUDED = [
  { icon: Search, title: "Requirements & Metric Mapping", body: "We work with stakeholders to define the exact KPIs that matter and trace them back to raw data sources." },
  { icon: Database, title: "Architecture Design", body: "Planning the optimal data stack—from extraction tools to warehouse schema—to balance cost and performance." },
  { icon: Network, title: "Data Engineering & Pipelines", body: "Building robust, automated processes to clean, transform, and aggregate data from APIs and databases." },
  { icon: PieChart, title: "Dashboard Creation", body: "Designing and developing intuitive visual interfaces that make complex data instantly understandable." },
  { icon: Eye, title: "Testing & Validation", body: "Rigorous QA to ensure the numbers on the dashboard exactly match the reality of your business." },
  { icon: RefreshCw, title: "Ongoing Support & Iteration", body: "Monitoring pipeline health and updating metrics as your business goals evolve." },
];

/* estimator option sets */
const EST_TYPES = [
  { id: "audit", label: "Tracking Audit", weeks: 1, base: "Review of current event tracking with a remediation plan." },
  { id: "dashboard", label: "Custom Dashboard", weeks: 3, base: "Connecting 1-3 sources into a unified BI dashboard." },
  { id: "warehouse", label: "Data Warehouse", weeks: 6, base: "Centralized data infrastructure for the whole company." },
  { id: "predictive", label: "Predictive Model", weeks: 8, base: "Advanced analytics for forecasting or risk assessment." },
];
const EST_SCALE = [
  { id: "s", label: "Small (1-2 sources)", mult: 1 },
  { id: "m", label: "Medium (3-5 sources)", mult: 1.4 },
  { id: "l", label: "Large (6-10 sources)", mult: 1.8 },
  { id: "xl", label: "Enterprise (10+)", mult: 2.5 },
];
const EST_ADDONS = [
  { id: "realtime", label: "Real-time Processing", weeks: 1.5 },
  { id: "migration", label: "Data Migration", weeks: 2 },
  { id: "custom_viz", label: "Custom Visualisations", weeks: 1 },
  { id: "ml", label: "Machine Learning applied", weeks: 3 },
  { id: "training", label: "Team Training", weeks: 0.5 },
  { id: "governance", label: "Data Governance setup", weeks: 1 },
];

const PROCESS = [
  { n: "01", icon: Search, title: "Discovery", time: "1 week", body: "Understanding your business goals, identifying key metrics, and auditing your current data sources and quality." },
  { n: "02", icon: Network, title: "Strategy & Architecture", time: "1–2 weeks", body: "Designing the data pipeline, selecting the right tools, and defining the schema for your data warehouse." },
  { n: "03", icon: Database, title: "Data Engineering", time: "2–4 weeks", body: "Building the ETL/ELT pipelines to extract, clean, and load your data securely and reliably." },
  { n: "04", icon: BarChart3, title: "Analysis & Modeling", time: "1–3 weeks", body: "Creating the logical models, calculating metrics, and identifying trends and insights." },
  { n: "05", icon: PieChart, title: "Visualization", time: "1–2 weeks", body: "Designing and developing interactive dashboards that present the insights clearly and intuitively." },
  { n: "06", icon: Check, title: "Handoff & Support", time: "Ongoing", body: "Training your team, providing documentation, and monitoring the pipelines for continuous accuracy." },
];

const FAQS = [
  { q: "What data sources can you connect to?", a: "Almost anything. We regularly integrate with CRMs (Salesforce, HubSpot), ERPs, marketing platforms (Google Ads, Meta), payment gateways (Stripe), and custom internal databases (SQL, NoSQL)." },
  { q: "Do we need to buy expensive BI software?", a: "Not necessarily. We can build custom dashboards using React and modern charting libraries, or implement cost-effective open-source solutions like Metabase or Superset if that fits your needs better." },
  { q: "How do you ensure our data remains secure?", a: "Security is foundational. We use encrypted connections, role-based access control, and comply with standards like GDPR and HIPAA. Your data remains in your control." },
  { q: "Can you fix our existing, broken dashboards?", a: "Yes. We start with a data audit to trace the discrepancies back to the source. Usually, the issue isn't the dashboard tool, but the underlying data pipeline and modeling." },
  { q: "How long does it take to see results?", a: "While a full data warehouse takes time, we prioritize 'quick wins'. We can often connect 1-2 critical sources and deliver an initial high-value dashboard within 2-3 weeks." },
  { q: "Do you offer machine learning and predictive analytics?", a: "Yes, but we ensure your foundational data is solid first. Once you have reliable historical data, we can build models for forecasting, churn prediction, or recommendation engines." },
];

const SENTENCE = [
  "YOU GET THE INSIGHTS.",
  "YOU GET THE DASHBOARDS.",
  "YOU GET THE CLARITY.",
  "NO MORE GUESSWORK.",
  "NO MORE SILOS.",
];

import ServicePageV2 from "../ServiceDetailV2/ServicePageV2";

const PAGE = {
  related: { slugs: ["internal-ops-erp-case-study", "book-collections-case-study", "freight-shipping-case-study"] },
  estType: "dashboard",
  estScale: "m",
  estAddons: [],
  estRange: [1, 1.35, 0], // [low x, high x, minimum weeks]
  name: "Data Analytics",
  answer: "Codelix IT Solutions builds data analytics and business intelligence systems from Ahmedabad, India: automated data pipelines, a central data warehouse and dashboards that give you one source of truth. A typical project takes 2–8 weeks, starts with a data audit and includes support after handoff.",
  status: "Service 07 · Data Analytics",
  h1: "Data Analytics & Business Intelligence Services",
  heroLine: "Turn raw data into",
  heroAccent: "clarity and action.",
  heroLede: "We build automated pipelines, centralized data warehouses, and fast, intuitive dashboards that give you a single source of truth—so you can stop guessing and start growing.",
  facts: [ ["Typical timeline", "2–8 weeks"], ["Starts with", "Data Audit"], ["You receive", "Dashboards & Pipelines"], ["Post-handoff", "Support included"], ],
  problemsHeading: "The data problems we fix every day.",
  problemsLede: "If you're spending more time wrangling spreadsheets than analyzing the results, it's time to upgrade your data infrastructure.",
  includedHeading: "Every data project ships with all of this.",
  includedLede: "Not an upsell list — this is the baseline on every data analytics project we take, whatever the size.",
  forHeading: "Actionable metrics for your specific sector.",
  forLede: "The data stack changes depending on your business model, scale, and what decisions you're trying to drive.",
  workHeading: "Selected work.",
  estHeading: "Rough out your timeline in ten seconds.",
  estLede: "Pick what you need and we'll show an honest range. It's an estimate, not a quote — but it's the same maths we start from.",
  estQ1: "01 — What do you need?",
  estQ2: "02 — How complex is the data?",
  estOutK: "Estimated project time",
  barMax: 20,
  estList: (
    <>
      <li><Check size={14} /> Full strategy & architecture</li>
      <li><Check size={14} /> QA and data validation</li>
      <li><Check size={14} /> Comprehensive documentation</li>
    </>
  ),
  estCta: (
    <>
      <Link to="/contact" className="v2-btn v2-btn--outline" style={{ marginTop: 24, width: "100%" }}>
      <span>Discuss this scope</span>
      </Link>
    </>
  ),
  benchLede: "Every build is measured against these before it's allowed to ship — not aspirations, gates.",
  benchMeta: "Checked on every build",
  grad: "data-",
  stackLabel: "The Data Stack",
  stackHeading: "What we build pipelines and dashboards with.",
  stackLede: "Chosen per project, not by habit — the right tool for your data, your team, and what you'll need to maintain.",
  handoverHeading: "Everything, at handover.",
  handoverLede: "Here is the exact list of what lands in your accounts when the project closes.",
  manifestTitle: "Handover manifest",
  manifestMeta: "Transferred on completion",
  handoverFoot: "Everything above transfers to your accounts when the project closes.",
  compareLede: "Off-the-shelf BI, an internal hire, and a generic agency all solve part of the problem. Here's where each one tends to leave you exposed.",
  faqHeading: "Questions about data analytics and BI.",
  ctaHeading: <>Tell us what you're measuring.<br />We'll tell you how we'd build it.</>,
  ctaLede: "A structured conversation about your data — your sources, your reporting gaps, your constraints. We scope what should be built first, what can wait, and what it takes to ship it.",
  path: "/services/data-analytics",
  deepDive: false,
  relatedReading: false,
  process: { heading: "How We Turn Data Into Decisions.", lede: "Six stages from first call to a live dashboard — nothing advances until the stage before it is signed off.", steps: PROCESS },
  stack: DATA_STACK,
  PROBLEMS, USE_CASES, BENCHMARKS, HANDOVER, COMPARE_COLS, COMPARE_ROWS, OTHER_SERVICES, INCLUDED, EST_TYPES, EST_SCALE, EST_ADDONS, FAQS, SENTENCE,
};

export default function DataAnalyticsV2() {
  return <ServicePageV2 page={PAGE} />;
}
