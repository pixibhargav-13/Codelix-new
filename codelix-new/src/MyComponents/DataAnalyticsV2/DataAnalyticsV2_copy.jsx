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


import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
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
import workOne from "../Images/work-best-project-one.png";
import workThree from "../Images/work-best-project-three.png";
import workFive from "../Images/work-best-project-five.png";
import ScrollSentence from '../Shared/ScrollSentence';
import FaqSection from '../Shared/FaqSection';
import ClientStrip from '../Shared/ClientStrip';
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";

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
  { icon: Smartphone, n: "02", title: "Application Development", path: "/services/application-development" },
  { icon: Palette, n: "03", title: "UI/UX Design", path: "/services-v2/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Custom Software Development", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI Development", path: "/services/ai-development" },
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
  { n: "01", title: "Discovery", time: "1 week", body: "Understanding your business goals, identifying key metrics, and auditing your current data sources and quality." },
  { n: "02", title: "Strategy & Architecture", time: "1–2 weeks", body: "Designing the data pipeline, selecting the right tools, and defining the schema for your data warehouse." },
  { n: "03", title: "Data Engineering", time: "2–4 weeks", body: "Building the ETL/ELT pipelines to extract, clean, and load your data securely and reliably." },
  { n: "04", title: "Analysis & Modeling", time: "1–3 weeks", body: "Creating the logical models, calculating metrics, and identifying trends and insights." },
  { n: "05", title: "Visualization", time: "1–2 weeks", body: "Designing and developing interactive dashboards that present the insights clearly and intuitively." },
  { n: "06", title: "Handoff & Support", time: "Ongoing", body: "Training your team, providing documentation, and monitoring the pipelines for continuous accuracy." },
];

const RELATED = [
  { tag: "E-Commerce", title: "A High-Performance Platform for Premium Book Collections", link: "/book-collections-case-study", thumb: workOne },
  { tag: "SaaS Dashboard", title: "A Full-Stack Dashboard for Modern Freight Management", link: "/freight-shipping-case-study", thumb: workThree },
  { tag: "Mobile App", title: "A Feature-Rich Mobile Marketplace for Buying & Selling Cars", link: "/car-marketplace-case-study", thumb: workFive },
];

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
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  

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
    splitTitleLinesIn(rootRef.current, ".sd2-hero-title");
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
          
            el.classList.add("is-in");
          
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
      <nav className={`v2-nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="v2-nav-inner">
          <a href="/preview-v2" className="v2-nav-logo" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <div className="v2-nav-links">
            <a href="/preview-v2">Homepage</a>
            <a href="/services-v2">Services</a>
            <a href="/about-v2">About</a>
            <a href="/work-v2">Work</a>
            <a href="/industries-v2">Industries</a>
            <a href="/process-v2">Process</a>
            <a href="/contact-v2">Contact</a>
          </div>
          <button
            className={`v2-burger ${mobileOpen ? "open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      

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
      <ClientStrip />

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

      {/* ══════════ 6 · BENCHMARKS ══════════ */}
      <section className="v2-section sd2-bench-section">
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
                      <linearGradient id={`sd2-bench-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                        <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                      </linearGradient>
                    </defs>
                    <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                    <circle
                      className="sd2-bench-ring-fill"
                      cx="60" cy="60" r={R}
                      stroke={`url(#sd2-bench-grad-${i})`}
                      style={{ "--c": C, "--ring-offset": offset }}
                    />
                  </svg>
                  <div className="sd2-bench-num">
                    <span className="sd2-bench-value" data-target={b.value}>0</span>
                    <span className="sd2-bench-suffix">{b.suffix}</span>
                  </div>
                </div>
                <h3 className="sd2-bench-label">{b.label}</h3>
                <p className="sd2-bench-note">{b.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════ 7 · DELIVERABLES ══════════ */}
      <section className="v2-section v2-section--void" id="handover">
        <p className="v2-label">The Handover</p>
        <h2 className="v2-heading">What you actually get at the end.</h2>
        <p className="v2-lede">
          We don't just build pipelines; we hand over the keys. You own the code,
          the infrastructure, and the knowledge.
        </p>
        <div className="sd2-hand-grid">
          {HANDOVER.map((h) => (
            <article className="sd2-hand" key={h.title}>
              <span className="sd2-hand-icon"><h.icon size={20} strokeWidth={1.5} /></span>
              <h3 className="sd2-hand-title">{h.title}</h3>
              <p className="sd2-hand-body">{h.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 8 · QUOTE ══════════ */}
      <section className="v2-section sd2-quote-section">
        <figure className="sd2-quote">
          <blockquote className="sd2-quote-text">"{QUOTE.text}"</blockquote>
          <figcaption className="sd2-quote-cite">
            <strong>{QUOTE.name}</strong>
            <span>{QUOTE.role}</span>
          </figcaption>
        </figure>
      </section>

      {/* ══════════ 9 · THE STACK ══════════ */}
      <section className="v2-section v2-section--void" id="stack">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">Tech Stack</p>
            <h2 className="v2-heading">Modern tools for modern data.</h2>
          </div>
          <p className="v2-lede">
            We use industry-standard tools that scale effortlessly. No obscure 
            proprietary systems—just robust, maintainable tech.
          </p>
        </div>
        <div className="v2-strip" style={{ marginTop: 40, borderTop: "1px solid var(--v2-border)", borderBottom: "1px solid var(--v2-border)" }}>
          <div className="v2-strip-track" style={{ animationDuration: "25s" }}>
            {DATA_STACK.concat(DATA_STACK).concat(DATA_STACK).map((t, i) => (
              <div className="sd2-stack-item" key={i}>
                <img src={t.src} alt={t.name} loading="lazy" />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 10 · COMPARISON ══════════ */}
      <section className="v2-section" id="compare">
        <p className="v2-label">Why Codelix?</p>
        <h2 className="v2-heading">The ROI of doing data right.</h2>
        <div className="sd2-cmp-wrap">
          <table className="sd2-cmp" aria-label="Comparison">
            <thead>
              <tr>
                {COMPARE_COLS.map((c, i) => (
                  <th key={c} className={i === 0 ? "is-us" : ""}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr className="sd2-cmp-row" key={i}>
                  <td className="sd2-cmp-label">{row.label}</td>
                  {row.vals.map((v, j) => (
                    <td key={j} className={j === 0 ? "is-us" : ""} data-val={v}>
                      {v === "yes" ? <Check size={18} strokeWidth={2.5} className="v-yes" /> :
                        v === "no" ? <X size={18} strokeWidth={2.5} className="v-no" /> :
                          <Minus size={18} strokeWidth={2.5} className="v-maybe" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══════════ 11 · SCROLL SENTENCE ══════════ */}
      <ScrollSentence words={SENTENCE} tone="dark"  centered={true} />

      {/* ══════════ 12 · METHODOLOGY ══════════ */}
      <section className="v2-section v2-section--void" id="process">
        <p className="v2-label">Methodology</p>
        <h2 className="v2-heading">How we turn data into decisions.</h2>
        <div className="v2-method-shell">
          {PROCESS.map((st) => (
            <div className="v2-method-row" key={st.n}>
              <div className="v2-method-head">
                <span className="v2-method-n">{st.n}</span>
                <span className="v2-method-t">{st.time}</span>
              </div>
              <div className="v2-method-body">
                <h3 className="v2-method-title">{st.title}</h3>
                <p className="v2-method-desc">{st.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 13 · WORK (RELATED) ══════════ */}
      <section className="v2-section v2-section--void">
        <p className="v2-label">Related Work</p>
        <h2 className="v2-heading">Where data made the difference.</h2>
        <div className="sd2-work-grid">
          {RELATED.map((w) => (
            <a href={w.link} className="sd2-work-card" key={w.title}>
              <div className="sd2-work-thumb">
                <img src={w.thumb} alt={w.title} loading="lazy" />
                <span className="sd2-work-tag">{w.tag}</span>
              </div>
              <h3 className="sd2-work-title">{w.title}</h3>
              <span className="sd2-work-arr">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 14 · TENETS ══════════ */}
      <section className="v2-section sd2-tenet-section">
        <div className="sd2-tenet-grid">
          {PRINCIPLES.map((t) => (
            <article className="sd2-tenet" key={t.key}>
              <span className="sd2-tenet-icon"><t.icon size={22} strokeWidth={1.5} /></span>
              <div>
                <h3 className="sd2-tenet-claim">{t.claim}</h3>
                <p className="sd2-tenet-body">{t.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 15 · NEXT STEPS ══════════ */}
      <section className="v2-section v2-section--void" id="start">
        <p className="v2-label">Next Steps</p>
        <h2 className="v2-heading">How to get started.</h2>
        <div className="sd2-steps">
          {NEXT_STEPS.map((s, i) => (
            <div className="sd2-step" key={s.n}>
              <div className="sd2-step-head">
                <span className="sd2-step-n">{s.n}</span>
                <span className="sd2-step-icon"><s.icon size={20} strokeWidth={1.5} /></span>
              </div>
              <h3 className="sd2-step-title">{s.title}</h3>
              <p className="sd2-step-meta">{s.meta}</p>
              <p className="sd2-step-body">{s.body}</p>
              {i < NEXT_STEPS.length - 1 && <span className="sd2-step-line" />}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 16 · FAQ ══════════ */}
      <FaqSection faqs={FAQS} className="v2-section--void" />

      {/* ══════════ 17 · CROSS-SELL ══════════ */}
      <section className="v2-section v2-section--void">
        <p className="v2-label">More Services</p>
        <h2 className="v2-heading">What else we do.</h2>
        <div className="sd2-other-grid">
          {OTHER_SERVICES.map((s) => (
            <a href={s.path} className="sd2-other" key={s.n}>
              <div className="sd2-other-top">
                <span className="sd2-other-n">{s.n}</span>
                <span className="sd2-other-icon"><s.icon size={22} strokeWidth={1.2} /></span>
              </div>
              <h3 className="sd2-other-title">{s.title}</h3>
              <span className="sd2-other-arr">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 18 · CTA ══════════ */}
      <section className="v2-cta">
        <div className="v2-cta-inner">
          <h2 className="v2-cta-title">Stop guessing. Start growing.</h2>
          <p className="v2-cta-desc">
            Let's build a data pipeline and dashboard that actually helps you make decisions.
          </p>
          <a className="v2-btn v2-btn--filled" href="/contact">
            <span>Schedule a discovery call</span>
            <i className="v2-btn-arrow">→</i>
          </a>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <FooterV2 />
    </div>
  );
}
