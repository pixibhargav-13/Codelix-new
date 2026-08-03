import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  PenTool, Layers, Search, Eye, Smartphone, Palette,
  CalendarCheck, Lock, Check,
  HelpCircle, Paintbrush, MousePointerClick, RefreshCw, Users2, Frown,
  Building2, Store, Rocket, GraduationCap, HeartPulse, Landmark,
  FileCode2, BookOpen, KeyRound, Server, GitBranch, Layout,
  Globe, ShoppingCart, Code2, Sparkles, BarChart3,
  Minus, X, Phone, FileText, PlayCircle, PieChart, Database, Network, TrendingUp, Clock
} from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import CtaVisual from "../HomepageV2/CtaVisual";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";

/* Data Analytics-specific tool logos */
import techPython from "../Images/python.png";
import techAWS from "../Images/AWS.png";
import techPostgres from "../Images/postgresql.png";
import techDocker from "../Images/docker.png";
import techReact from "../Images/react.png";
import techMongo from "../Images/MongoDB.png";

/* real project screenshots */
import { PROJECTS } from "../WorkV2/projectsData";

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
  { icon: Users2, title: "Training & Handover", body: "Workshops and documentation ensuring your team knows how to use the dashboards and maintain the pipelines." },
];

/* real client quote */
const QUOTE = {
  text: "They didn't just build dashboards; they gave us clarity. For the first time, our leadership team trusts the numbers.",
  name: "Marcus Chen",
  role: "COO, LogisTech Solutions",
};

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

/* next steps */
const NEXT_STEPS = [
  { n: "01", icon: Phone, title: "Discovery call", meta: "30 minutes", body: "We discuss your current data setup, the questions you can't answer, and the bottlenecks in your reporting." },
  { n: "02", icon: FileText, title: "Data Audit & Proposal", meta: "Within 3 days", body: "We map out your data sources and provide a clear architectural plan and fixed-price quote." },
  { n: "03", icon: PlayCircle, title: "Implementation", meta: "On your go-ahead", body: "We start building pipelines and wireframing dashboards, keeping you involved in the metric definitions." },
];

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", path: "/services-v2/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", path: "/services-v2/application-development" },
  { icon: Palette, n: "03", title: "UI/UX Design", path: "/services-v2/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", path: "/services-v2/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Custom Software Development", path: "/services-v2/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI Development", path: "/services-v2/ai-development" },
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

/* the unified operations dashboard concept is the one project actually
   filed under this category — paired with two real cross-section pieces,
   pulled from the same shared portfolio data so titles/thumbnails stay
   accurate. It only has a v2 case-study page (no v1 twin like the other
   15 projects), so its link is built for the v2 route instead of the
   bare v1 href. */
const RELATED = [17, 5, 13].map((id) => {
  const p = PROJECTS.find((proj) => proj.id === id);
  const link = id === 17 ? `/case-study-v2${p.href}` : p.href;
  return { tag: p.category, title: p.title, link, thumb: p.image };
});

const PRINCIPLES = [
  { key: "Accurate", icon: Check, claim: "No numbers you can't trust.", body: "We build rigorous validation into our pipelines. If a dashboard shows a number, you can bet your business on it." },
  { key: "Accessible", icon: Users2, claim: "No gatekeeping the data.", body: "We design tools for business users, not just analysts. Everyone who needs insights should be able to get them." },
  { key: "Actionable", icon: TrendingUp, claim: "No vanity metrics.", body: "We don't build charts just to look pretty. Every metric we surface is tied to a specific business decision." },
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
  "YOU GET THE PIPELINES.",
  "YOU GET THE CLARITY.",
  "NO MORE GUESSWORK.",
  "NO MORE SILOS.",
];

/* scroll-scrubbed word reveal — same mechanism as ServiceDetailV2's copy,
   kept as its own local copy so each page can tune timing independently */
const scrollSentenceEase = (p) => p * p * p * (p * (p * 6 - 15) + 10);

function ScrollSentence({ words, tone }) {
  const ref = useRef(null);
  const wordRefs = useRef([]);
  const bgRefs = useRef([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0, running = false, target = 0, current = 0, primed = false;

    const readTarget = () => {
      const r = el.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      const raw = (-r.top) / scrollable;
      const norm = Math.min(Math.max((raw - 0.06) / 0.86, 0), 0.9999);
      return norm * words.length;
    };

    const IN_END = 0.2;
    const OUT_START = 0.8;

    const paint = (t) => {
      words.forEach((_, i) => {
        const d = Math.min(Math.max(t - i, 0), 1);
        const wordEl = wordRefs.current[i];
        const bgEl = bgRefs.current[i];

        let scale, opacity, blur;
        if (d < IN_END) {
          const p = scrollSentenceEase(d / IN_END);
          scale = 0.78 + p * 0.22; opacity = p; blur = 5 * (1 - p);
        } else if (d <= OUT_START) {
          scale = 1; opacity = 1; blur = 0;
        } else {
          const p = scrollSentenceEase((d - OUT_START) / (1 - OUT_START));
          scale = 1 + p * 0.22; opacity = 1 - p; blur = 6 * p;
        }

        if (wordEl) {
          wordEl.style.opacity = opacity;
          wordEl.style.transform = `translate3d(-50%,-50%,0) scale(${scale})`;
          wordEl.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
        }
        if (bgEl) bgEl.style.opacity = scrollSentenceEase(Math.min(d / IN_END, 1));
      });
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.0002) {
        current = target; paint(current); running = false; raf = 0; return;
      }
      current += diff * 0.12;
      paint(current);
      raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      target = readTarget();
      if (!primed) { current = target; primed = true; }
      if (!running) { running = true; raf = requestAnimationFrame(tick); }
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [words]);

  return (
    <section className={`v2-sentence v2-sentence--${tone} sd2-sentence`} ref={ref}>
      <div className="v2-sentence-sticky">
        <div className="v2-sentence-bgs" aria-hidden="true">
          {words.map((w, i) => (
            <span className="v2-sentence-bg" style={{ zIndex: i }}
              ref={(elm) => (bgRefs.current[i] = elm)} key={"bg" + i} />
          ))}
        </div>
        <div className="v2-sentence-words">
          {words.map((w, i) => (
            <span className="v2-sentence-word"
              ref={(elm) => (wordRefs.current[i] = elm)} key={w + i}>{w}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DataAnalyticsV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());
  const [incActive, setIncActive] = useState(0);
  const [estType, setEstType] = useState("dashboard");
  const [estScale, setEstScale] = useState("m");
  const [estAddons, setEstAddons] = useState(() => new Set());

  const rootRef = useRef(null);
  const stripRef = useRef(null);

  const estimate = useMemo(() => {
    const t = EST_TYPES.find((x) => x.id === estType) || EST_TYPES[0];
    const s = EST_SCALE.find((x) => x.id === estScale) || EST_SCALE[0];
    const addW = [...estAddons].reduce((sum, id) => {
      const a = EST_ADDONS.find((x) => x.id === id);
      return sum + (a ? a.weeks : 0);
    }, 0);
    const raw = t.weeks * s.mult + addW;
    return { low: Math.round(raw), high: Math.round(raw * 1.35), base: t.base };
  }, [estType, estScale, estAddons]);

  const toggleAddon = (id) =>
    setEstAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 40);
      setNavHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  /* sticky heading bands only show their rule once actually stuck */
  useEffect(() => {
    const shells = rootRef.current.querySelectorAll(".v2-method-shell");
    if (!shells.length) return;
    const pairs = Array.from(shells)
      .map((shell) => ({ shell, head: shell.querySelector(".v2-method-head") }))
      .filter((p) => p.head);
    const onScroll = () => {
      pairs.forEach(({ shell, head }) => {
        const r = shell.getBoundingClientRect();
        head.classList.toggle("is-stuck", r.top <= 0 && r.bottom > 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* hero intro — GSAP wipe-up for the title, overlapping fade for the rest,
     matching ServiceDetailV2's hero entrance */
  useEffect(() => {
    const q = (s) => rootRef.current.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"),
        { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: .1 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".sd2-facts.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.75");
    return () => tl.kill();
  }, []);

  /* reveal-on-enter — IntersectionObserver */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.classList.contains("v2-faq-item")) {
            const idx = Number(el.dataset.faqIndex);
            setRevealedFaqs((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
          } else {
            el.classList.add("is-in");
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const sel = [
      ".sd2-inc-showcase", ".sd2-est", ".sd2-work-card", ".v2-method-row",
      ".sd2-problem", ".sd2-case", ".sd2-bench", ".sd2-hand", ".sd2-quote",
      ".sd2-cmp-row", ".sd2-step", ".sd2-other",
      ".sd2-tenet", ".v2-faq-item", ".v2-cta", ".v2-strip",
      ".v2-heading", ".v2-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* client strip drift, pausing on hover */
  useEffect(() => {
    const track = stripRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, x = 0, paused = false, last = performance.now();
    const step = (now) => {
      const dt = now - last; last = now;
      if (!paused) {
        x -= 0.00125 * dt;
        if (x <= -50) x += 50;
        track.style.transform = `translateX(${x}%)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const wrap = track.parentElement;
    const on = () => { paused = true; };
    const off = () => { paused = false; };
    wrap.addEventListener("mouseenter", on);
    wrap.addEventListener("mouseleave", off);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mouseenter", on);
      wrap.removeEventListener("mouseleave", off);
    };
  }, []);

  /* benchmark numbers count up when scrolled in */
  useEffect(() => {
    const nums = rootRef.current.querySelectorAll(".sd2-bench-value");
    if (!nums.length) return;
    const run = (el) => {
      const target = Number(el.dataset.target);
      if (target === 0) { el.textContent = "0"; return; }
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = target % 1 !== 0 ? (target * eased).toFixed(1) : Math.round(target * eased).toString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -12% 0px" }
    );
    nums.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* damped scroll-progress bar */
  useEffect(() => {
    const bar = rootRef.current.querySelector(".v2-progress span");
    if (!bar) return;
    let raf = 0, cur = 0, tgt = 0, running = false;
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    const tick = () => {
      const d = tgt - cur;
      if (Math.abs(d) < 0.0005) { cur = tgt; running = false; raf = 0; }
      else { cur += d * 0.15; raf = requestAnimationFrame(tick); }
      bar.style.transform = `scaleX(${cur})`;
    };
    const kick = () => { tgt = read(); if (!running) { running = true; raf = requestAnimationFrame(tick); } };
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* magnetic buttons + card tilt */
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const root = rootRef.current;
    const bind = (els, fn) => els.map((el) => {
      const move = (e) => fn(el, e);
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return { el, move, leave };
    });

    const mags = bind(Array.from(root.querySelectorAll(".v2-btn")), (el, e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${mx * 0.28}px, ${my * 0.34}px)`;
    });
    const tilts = bind(Array.from(root.querySelectorAll(".sd2-work-card")), (el, e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(760px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-6px)`;
    });

    return () => [...mags, ...tilts].forEach(({ el, move, leave }) => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    });
  }, []);

  /* FAQ accordion height */
  useEffect(() => {
    rootRef.current.querySelectorAll(".v2-faq-a").forEach((el, i) => {
      const inner = el.querySelector("p");
      el.style.height = i === openFaq ? `${inner.offsetHeight}px` : "0px";
    });
  }, [openFaq]);

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <nav className={`v2-nav ${navScrolled ? "scrolled" : ""} ${navHidden ? "nav-hidden" : ""}`}>
        <div className="v2-nav-inner">
          <a href="/preview-v2" className="v2-nav-logo" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <div className="v2-nav-links">
            <div className="v2-nav-dropdown">
              <a href="/services-v2">Services <span className="v2-nav-dropdown-chevron">▾</span></a>
              <div className="v2-nav-dropdown-panel">
                <div className="v2-nav-dropdown-head">
                  <div>
                    <p className="v2-nav-dropdown-head-label">Our Services</p>
                    <p className="v2-nav-dropdown-head-lede">Everything we build, in one place.</p>
                  </div>
                  <a href="/services-v2" className="v2-nav-dropdown-head-all">View all services →</a>
                </div>
                {FOOTER_SERVICE_KEYWORDS.map((s) => (
                  <a href={s.path} key={s.label} className="v2-nav-dropdown-card">
                    <span className="v2-nav-dropdown-title">{s.label}</span>
                    <span className="v2-nav-dropdown-blurb">{s.blurb}</span>
                  </a>
                ))}
              </div>
            </div>
            <a href="/work-v2">Work</a>
            <a href="/industries-v2">Industries</a>
          </div>
          <div className="v2-nav-actions">
            <a className="v2-btn v2-btn--filled v2-nav-cta" href="/contact-v2">Book a consultation</a>
            <button
              className={`v2-burger ${mobileOpen ? "open" : ""}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <V2MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <a href="/services-v2">Services</a>
            <span>/</span>
            <em>Data Analytics</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Service 07 · Data Analytics</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Turn raw data into</span></span>
                <span className="line"><span className="v2-hero-accent">clarity and action.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                We build automated pipelines, centralized data warehouses, and fast, 
                intuitive dashboards that give you a single source of truth—so you 
                can stop guessing and start growing.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="/contact">
                  <span>Schedule a call</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <a className="v2-hero-secondary" href="#estimate">
                  <span className="v2-hero-secondary-label">Estimate my project</span>
                </a>
              </div>
            </div>

            {/* at-a-glance facts */}
            <aside className="sd2-facts sv2-hero-reveal">
              {[
                ["Typical timeline", "2–8 weeks"],
                ["Starts with", "Data Audit"],
                ["You receive", "Dashboards & Pipelines"],
                ["Post-handoff", "Support included"],
              ].map(([k, v]) => (
                <div className="sd2-fact" key={k}>
                  <span className="sd2-fact-k">{k}</span>
                  <span className="sd2-fact-v">{v}</span>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · PROBLEMS WE SOLVE ══════════ */}
      <section className="v2-section v2-section--void" id="problems">
        <p className="v2-label">Sound Familiar?</p>
        <h2 className="v2-heading">The data problems we fix every day.</h2>
        <p className="v2-lede">
          If you're spending more time wrangling spreadsheets than analyzing the results, 
          it's time to upgrade your data infrastructure.
        </p>
        <div className="sd2-problem-grid">
          {PROBLEMS.map((p) => (
            <article className="sd2-problem" key={p.pain}>
              <span className="sd2-problem-icon"><p.icon size={17} strokeWidth={1.6} /></span>
              <div>
                <h3 className="sd2-problem-pain">{p.pain}</h3>
                <p className="sd2-problem-fix">{p.fix}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 2b · CLIENT STRIP ══════════ */}
      <section className="v2-section v2-client-strip" style={{ paddingTop: 56, paddingBottom: 56, paddingLeft: 0, paddingRight: 0 }}>
        <p className="v2-label" style={{ textAlign: "center", marginBottom: 28 }}>Trusted by 30+ companies</p>
        <div className="v2-strip">
          <div className="v2-strip-track" ref={stripRef}>
            {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, i) => (
              <img key={i} src={logo} alt="" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3 · WHAT'S INCLUDED ══════════ */}
      <section className="v2-section" id="included">
        <p className="v2-label">What's Included</p>
        <h2 className="v2-heading">Every data project ships with all of this.</h2>
        <p className="v2-lede">
          Not an upsell list — this is the baseline on every data analytics project we
          take, whatever the size.
        </p>
        <div className="sd2-inc-showcase">
          <div className="sd2-inc-nav" role="tablist" aria-label="What's included">
            <span
              className="sd2-inc-nav-indicator"
              style={{ transform: `translateY(${incActive * 100}%)` }}
              aria-hidden="true"
            />
            {INCLUDED.map((it, i) => (
              <div className="sd2-inc-navitem" key={it.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={incActive === i}
                  className={`sd2-inc-tab ${incActive === i ? "is-active" : ""}`}
                  onMouseEnter={() => setIncActive(i)}
                  onFocus={() => setIncActive(i)}
                  onClick={() => setIncActive(i)}
                >
                  <span className="sd2-inc-tab-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sd2-inc-tab-title">{it.title}</span>
                  <span className="sd2-inc-tab-icon"><it.icon size={16} strokeWidth={1.6} /></span>
                </button>
                <div className={`sd2-inc-mobile-body ${incActive === i ? "is-open" : ""}`}>
                  <div className="sd2-inc-mobile-body-inner">
                    <p className="sd2-inc-mobile-body-text">{it.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sd2-inc-stage">
            {INCLUDED.map((it, i) => (
              <div
                className={`sd2-inc-panel ${incActive === i ? "is-active" : ""}`}
                aria-hidden={incActive !== i}
                key={it.title}
              >
                <span className="sd2-inc-panel-glow" aria-hidden="true" />
                <span className="sd2-inc-panel-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="sd2-inc-panel-icon"><it.icon size={40} strokeWidth={1.2} /></span>
                <h3 className="sd2-inc-panel-title">{it.title}</h3>
                <p className="sd2-inc-panel-body">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4 · WHO IT'S FOR ══════════ */}
      <section className="v2-section v2-section--void" id="for">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">Who It's For</p>
            <h2 className="v2-heading">Actionable metrics for your specific sector.</h2>
          </div>
          <p className="v2-lede">
            The data stack changes depending on your business model, scale, and what
            decisions you're trying to drive.
          </p>
        </div>
        <div className="sd2-case-grid">
          {USE_CASES.map((c, i) => (
            <article className="sd2-case" key={c.title}>
              <div className="sd2-case-top">
                <span className="sd2-case-icon"><c.icon size={21} strokeWidth={1.6} /></span>
                <span className="sd2-case-n">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="sd2-case-title">{c.title}</h3>
              <p className="sd2-case-body">{c.body}</p>
              <span className="sd2-case-rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 5 · INTERACTIVE ESTIMATOR ══════════ */}
      <section className="v2-section v2-section--void sd2-est-section" id="estimate">
        <div className="sd2-est">
          <div className="sd2-est-head">
            <div>
              <p className="v2-label">Scope Estimator</p>
              <h2 className="v2-heading">Rough out your timeline in ten seconds.</h2>
            </div>
            <p className="v2-lede">
              Pick what you need and we'll show an honest range. It's an estimate,
              not a quote — but it's the same maths we start from.
            </p>
          </div>

          <div className="sd2-est-body">
            <div className="sd2-est-controls">
              <div className="sd2-est-group">
                <span className="sd2-est-label">01 — What do you need?</span>
                <div className="sd2-est-opts">
                  {EST_TYPES.map((t) => (
                    <button
                      key={t.id}
                      className={`sd2-opt ${estType === t.id ? "on" : ""}`}
                      onClick={() => setEstType(t.id)}
                      aria-pressed={estType === t.id}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sd2-est-group">
                <span className="sd2-est-label">02 — How complex is the data?</span>
                <div className="sd2-est-opts">
                  {EST_SCALE.map((s) => (
                    <button
                      key={s.id}
                      className={`sd2-opt ${estScale === s.id ? "on" : ""}`}
                      onClick={() => setEstScale(s.id)}
                      aria-pressed={estScale === s.id}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sd2-est-group">
                <span className="sd2-est-label">03 — Anything else? (optional)</span>
                <div className="sd2-est-opts">
                  {EST_ADDONS.map((a) => (
                    <button
                      key={a.id}
                      className={`sd2-opt sd2-opt--check ${estAddons.has(a.id) ? "on" : ""}`}
                      onClick={() => toggleAddon(a.id)}
                      aria-pressed={estAddons.has(a.id)}
                    >
                      <i><Check size={12} strokeWidth={3} /></i>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* live readout */}
            <aside className="sd2-est-out" aria-live="polite">
              <span className="sd2-est-out-k">Estimated project time</span>
              <div className="sd2-est-out-v">
                <span key={estimate.low} className="sd2-est-num">{estimate.low}</span>
                <span className="sd2-est-dash">–</span>
                <span key={estimate.high + "h"} className="sd2-est-num">{estimate.high}</span>
                <span className="sd2-est-unit">weeks</span>
              </div>
              <p className="sd2-est-note">{estimate.base}</p>
              <div className="sd2-est-bar" aria-hidden="true">
                <span style={{ width: `${Math.min(100, (estimate.high / 20) * 100)}%` }} />
              </div>
              <ul className="sd2-est-list">
                <li><Check size={14} /> Full strategy & architecture</li>
                <li><Check size={14} /> QA and data validation</li>
                <li><Check size={14} /> Comprehensive documentation</li>
              </ul>
              <a href="/contact" className="v2-btn v2-btn--outline" style={{ marginTop: 24, width: "100%" }}>
                <span>Discuss this scope</span>
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════ 4b · PROCESS ══════════ */}
      <section className="v2-method-shell" id="process">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">How We Turn Data Into Decisions.</h2>
          <p className="v2-method-lede">
            Six stages from first call to a live dashboard — nothing advances until
            the stage before it is signed off.
          </p>
        </div>
        <div className="v2-method-rows">
          {PROCESS.map((m) => (
            <div className="v2-method-row" key={m.n}>
              <div className="v2-method-index">{m.n}</div>
              <div>
                <div className="v2-method-title">{m.title}</div>
                <span className="v2-method-timeframe">{m.time}</span>
              </div>
              <div className="v2-method-body">{m.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 7 · QUALITY BENCHMARKS ══════════ */}
      <section className="v2-section v2-section--void" id="benchmarks">
        <p className="v2-label">Quality Bar</p>
        <h2 className="v2-heading">The numbers we hold ourselves to.</h2>
        <p className="v2-lede">
          Every build is measured against these before it's allowed to ship —
          not aspirations, gates.
        </p>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Live quality gate</span>
            <span className="sd2-bench-bar-meta">Checked on every build</span>
          </div>
          <div className="sd2-bench-grid">
            {BENCHMARKS.map((b, i) => {
              const R = 52;
              const C = 2 * Math.PI * R;
              const offset = C - (C * b.ring) / 100;
              return (
                <div className="sd2-bench" key={b.label}>
                  <div className="sd2-bench-ring">
                    <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                      <defs>
                        <linearGradient id={`sd2-bench-grad-data-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#sd2-bench-grad-data-${i})`}
                        style={{ "--c": C, "--ring-offset": offset }}
                      />
                    </svg>
                    <div className="sd2-bench-num">
                      <span className="sd2-bench-value" data-target={b.value}>0</span>
                      <span className="sd2-bench-suffix">{b.suffix}</span>
                    </div>
                  </div>
                  <div className="sd2-bench-label">{b.label}</div>
                  <div className="sd2-bench-note">{b.note}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ 8 · TECH ══════════ */}
      <section className="v2-section v2-tech" id="stack">
        <div className="v2-tech-head">
          <div>
            <p className="v2-label">The Data Stack</p>
            <h2 className="v2-heading">What we build pipelines and dashboards with.</h2>
          </div>
          <p className="v2-lede">
            Chosen per project, not by habit — the right tool for your data,
            your team, and what you'll need to maintain.
          </p>
        </div>
        <div className="v2-tech-grid">
          {DATA_STACK.map((t) => (
            <div className="v2-tech-item" key={t.name}>
              <img src={t.src} alt={t.name} loading="lazy" />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 10 · RELATED WORK ══════════ */}
      <section className="v2-section v2-section--void" id="work">
        <p className="v2-label">Related Work</p>
        <h2 className="v2-heading">Selected work.</h2>
        <div className="sd2-work-grid">
          {RELATED.map((w) => (
            <a className="sd2-work-card" href={w.link} key={w.link}>
              <span className="sd2-work-media">
                <img src={w.thumb} alt="" loading="lazy" />
              </span>
              <span className="sd2-work-tag">{w.tag}</span>
              <span className="sd2-work-title">{w.title}</span>
              <span className="sd2-work-go">Read case study →</span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 11 · TESTIMONIAL ══════════ */}
      <section className="v2-section">
        <figure className="sd2-quote">
          <span className="sd2-quote-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="sd2-quote-text">{QUOTE.text}</blockquote>
          <figcaption className="sd2-quote-by">
            <span className="sd2-quote-name">{QUOTE.name}</span>
            <span className="sd2-quote-role">{QUOTE.role}</span>
          </figcaption>
        </figure>
      </section>

      {/* ══════════ 8 · PRINCIPLES ══════════ */}
      <section className="v2-section" id="principles">
        <p className="v2-label">Our Principles</p>
        <h2 className="v2-heading">Three commitments that govern every project.</h2>
        <div className="sd2-tenet-grid">
          {PRINCIPLES.map((p, i) => (
            <article className="sd2-tenet" key={p.key}>
              <span className="sd2-tenet-shine" aria-hidden="true" />
              <div className="sd2-tenet-top">
                <span className="sd2-tenet-icon"><p.icon size={20} strokeWidth={1.5} /></span>
                <span className="sd2-tenet-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="sd2-tenet-claim">{p.claim}</h3>
              <p className="sd2-tenet-body">{p.body}</p>
              <span className="sd2-tenet-tag">{p.key}</span>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 8a · HANDOVER ══════════ */}
      <section className="v2-section" id="handover">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">What You Receive</p>
            <h2 className="v2-heading">Everything, at handover.</h2>
          </div>
          <p className="v2-lede">
            "You own the code" is easy to say. Here is the exact list of what
            lands in your accounts when the project closes.
          </p>
        </div>
        <div className="sd2-manifest">
          <div className="sd2-manifest-bar">
            <span className="sd2-manifest-title">
              <FileCode2 size={14} strokeWidth={1.8} />
              Handover manifest
            </span>
            <span className="sd2-manifest-meta">
              {HANDOVER.length} items
              <i />
              Transferred on completion
            </span>
          </div>

          <div className="sd2-manifest-grid">
            {HANDOVER.map((h, i) => (
              <article className="sd2-hand" key={h.title}>
                <div className="sd2-hand-top">
                  <span className="sd2-hand-icon"><h.icon size={16} strokeWidth={1.6} /></span>
                  <span className="sd2-hand-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sd2-hand-tick"><Check size={12} strokeWidth={3} /></span>
                </div>
                <h3 className="sd2-hand-title">{h.title}</h3>
                <p className="sd2-hand-body">{h.body}</p>
              </article>
            ))}
          </div>

          <div className="sd2-manifest-foot">
            <span className="sd2-manifest-seal"><Check size={13} strokeWidth={3} /></span>
            <span>
              Everything above transfers to your accounts when the project closes.
              <b> No lock-in, no retained access, no dependency on us.</b>
            </span>
          </div>
        </div>
      </section>

      {/* ══════════ 8b · WHY US vs ALTERNATIVES ══════════ */}
      <section className="v2-section v2-section--void" id="compare">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">Why Us</p>
            <h2 className="v2-heading">Against what you're actually comparing.</h2>
          </div>
          <p className="v2-lede">
            Off-the-shelf BI, an internal hire, and a generic agency all solve
            part of the problem. Here's where each one tends to leave you exposed.
          </p>
        </div>

        <div className="sd2-cmp" role="table" aria-label="Codelix compared to alternatives">
          <div className="sd2-cmp-head" role="row">
            <span className="sd2-cmp-rowlabel" role="columnheader" />
            {COMPARE_COLS.map((c, i) => (
              <span
                className={`sd2-cmp-col ${i === 0 ? "is-us" : ""}`}
                role="columnheader"
                key={c}
              >
                {c}
              </span>
            ))}
          </div>
          {COMPARE_ROWS.map((row) => (
            <div className="sd2-cmp-row" role="row" key={row.label}>
              <span className="sd2-cmp-rowlabel" role="rowheader">{row.label}</span>
              {row.vals.map((v, i) => (
                <span
                  className={`sd2-cmp-cell ${i === 0 ? "is-us" : ""} sd2-cmp-${v}`}
                  role="cell"
                  key={i}
                >
                  {v === "yes" && <Check size={16} strokeWidth={2.6} />}
                  {v === "partial" && <Minus size={16} strokeWidth={2.6} />}
                  {v === "maybe" && <Minus size={16} strokeWidth={2.6} />}
                  {v === "no" && <X size={15} strokeWidth={2.6} />}
                  <em className="sd2-cmp-txt">
                    {v === "yes" ? "Yes" : v === "no" ? "No" : v === "partial" ? "Partial" : "Maybe"}
                  </em>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 8.5 · SCROLL SENTENCE ══════════ */}
      <ScrollSentence words={SENTENCE} tone="dark" />

      {/* ══════════ 9 · FAQ ══════════ */}
      <section className="v2-section v2-section--void" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Data analytics questions.</h2>
          </div>
          <p className="v2-lede v2-faq-note">
            Don't see yours here? <a href="/contact">Ask us directly →</a>
          </p>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <div
              className={`v2-faq-item ${openFaq === i ? "open" : ""} ${revealedFaqs.has(i) ? "is-in" : ""}`}
              data-faq-index={i}
              key={f.q}
            >
              <button className="v2-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <span className="v2-faq-q-label">
                  <span className="v2-faq-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="v2-faq-q-text">{f.q}</span>
                </span>
                <span className="v2-faq-sign"><span /><span /></span>
              </button>
              <div className="v2-faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 14b · WHAT HAPPENS NEXT ══════════ */}
      <section className="v2-section v2-section--void" id="next">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">What Happens Next</p>
            <h2 className="v2-heading">Three steps from here to kickoff.</h2>
          </div>
          <p className="v2-lede">
            No drawn-out sales process. Reach out and here's exactly what follows.
          </p>
        </div>
        <div className="sd2-next">
          <span className="sd2-next-line" aria-hidden="true" />
          {NEXT_STEPS.map((s) => (
            <article className="sd2-step" key={s.n}>
              <div className="sd2-step-node">
                <span className="sd2-step-num">{s.n}</span>
                <span className="sd2-step-badge"><s.icon size={15} strokeWidth={1.7} /></span>
              </div>
              <div className="sd2-step-inner">
                <span className="sd2-step-meta">{s.meta}</span>
                <h3 className="sd2-step-title">{s.title}</h3>
                <p className="sd2-step-body">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 15 · OTHER SERVICES ══════════ */}
      <section className="v2-section" id="other">
        <p className="v2-label">Explore More</p>
        <h2 className="v2-heading">The rest of what we do.</h2>
        <div className="sd2-other-list">
          {OTHER_SERVICES.map((s) => (
            <a className="sd2-other" href={s.path} key={s.path}>
              <span className="sd2-other-n">{s.n}</span>
              <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
              <span className="sd2-other-title">{s.title}</span>
              <span className="sd2-other-go">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 18 · CTA ══════════ */}
      <section className="v2-section v2-section--void v2-cta-shell">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're measuring.<br />We'll tell you how we'd build it.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your data — your sources, your reporting gaps,
            your constraints. We scope what should be built first, what can wait, and
            what it takes to ship it.
          </p>
          <div className="v2-cta-actions">
            <a className="v2-btn" href="/contact">Book a consultation →</a>
          </div>
          <div className="v2-cta-badges">
            <span className="v2-cta-badge">Free consultation</span>
            <span className="v2-cta-badge">NDA on request</span>
            <span className="v2-cta-badge">No obligation</span>
          </div>
        </div>

        <aside className="v2-cta-visual">
          <CtaVisual />
        </aside>
      </section>

      {/* ══════════ FOOTER ══════════ */}
            <footer className="v2-footer">
        {/* tagline header — our own real line ("we live in it," already used
            in the marquee elsewhere on the site) instead of a borrowed one */}
        <div className="v2-footer-tagline">
          <h2 className="v2-footer-wordmark-small">
            WE LIVE
            <br />
            IN <span className="v2-footer-wordmark-accent">IT</span>
          </h2>
          <p className="v2-footer-tagline-body">
            We design and build web, mobile, and AI systems for businesses that
            intend to still be running them in five years.
          </p>
        </div>

        {/* dense keyword strips — everything we build, everything we serve,
            laid out flat rather than tucked into a dropdown */}
          <div className="v2-footer-keywords-row">
            <p className="v2-footer-keywords-label">Services</p>
            <div className="v2-footer-keywords-list">
              {FOOTER_SERVICE_KEYWORDS.map((k, i) => (
                <a href={k.path} className="v2-footer-keyword" key={i}>{k.label}</a>
              ))}
            </div>
          </div>
          <div className="v2-footer-keywords-row">
            <p className="v2-footer-keywords-label">Industries</p>
            <div className="v2-footer-keywords-list">
              {FOOTER_INDUSTRY_KEYWORDS.map((k, i) => (
                <a href={k.path} className="v2-footer-keyword" key={i}>{k.label}</a>
              ))}
            </div>
          </div>

        {/* office / contact info — a single four-up row instead of two
            stacked 2x2 blocks, so it reads as one info bar */}
        <div className="v2-footer-cards v2-footer-cards--four">
          <a
            className="v2-footer-card"
            href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.009586,72.5203036,17z/data=!3m1!4b1!4m6!3m5!1s0x395e856f394696fd:0x69f60cf69bf7dd43!8m2!3d23.0095811!4d72.5228785!16s%2Fg%2F11z61zmnv5?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h5>India (HQ)</h5>
            <p className="v2-footer-card-addr">
              A-1308, PNTC — Times Of India Press Road, Vejalpur, Ahmedabad, Gujarat — 380015
            </p>
          </a>
          <div className="v2-footer-card">
            <h5>Phone</h5>
            <a className="v2-footer-card-strong" href="tel:+919429269295">+91 94292 69295</a>
            <a className="v2-footer-card-strong" href="tel:+917490909686">+91 74909 09686</a>
          </div>
          <div className="v2-footer-card">
            <h5>Looking For Jobs</h5>
            <a className="v2-footer-card-strong" href="/careers-v2">View openings →</a>
          </div>
          <div className="v2-footer-card">
            <h5>HR</h5>
            <a className="v2-footer-card-strong" href="mailto:hr@codelixitsolutions.com">
              hr@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>General</h5>
            <a className="v2-footer-card-strong" href="mailto:info@codelixitsolutions.com">
              info@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>For Sales</h5>
            <a className="v2-footer-card-strong" href="mailto:sales@codelixitsolutions.com">
              sales@codelixitsolutions.com
            </a>
          </div>
        </div>

        {/* socials + back-to-top, same row as the reference */}
        <div className="v2-footer-social">
          <div className="v2-footer-social-links">
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61561748130641" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Behance</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Dribbble</a>
          </div>
          <button
            type="button"
            className="v2-footer-top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑
          </button>
        </div>

        <div className="v2-footer-bottom">
          <a href="/preview-v2" className="v2-footer-bottom-brand" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <span className="v2-footer-bottom-copy">© 2026 Codelix IT Solutions — All Copyright Reserved</span>
          <div className="v2-footer-legal">
            <a href="/sitemap-v2">Sitemap</a>
            <a href="/refund-policy-v2">Refund Policy</a>
            <a href="/privacy-policy-v2">Privacy</a>
            <a href="/terms-of-service-v2">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
