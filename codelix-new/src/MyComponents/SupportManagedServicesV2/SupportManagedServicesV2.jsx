import { LifeBuoy, Wrench, ShieldCheck, Activity, Users2, Clock, AlertTriangle, Server, RefreshCw, GitBranch, TrendingUp, Headphones, Bell, CheckCircle2, Layers, Search, Globe, Smartphone, Palette, ShoppingCart, Code2, Sparkles, BarChart3, Minus, X, Check, Phone, FileText, PlayCircle, FileCode2, Store, Rocket, GraduationCap, Building2, HeartPulse, Monitor, Cloud, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";

/* v2 design system + shared data — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";

import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import TestimonialSpotlight from "../Shared/TestimonialSpotlight";
import { STATIC_TESTIMONIALS } from "../../data/testimonialsData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";

/* reusing the same generic stack icons already used on other service pages
   — no new image assets required */
import techReact from "../Images/react.webp";
import techAWS from "../Images/AWS.webp";
import techDocker from "../Images/docker.webp";
import techPostgres from "../Images/postgresql.webp";
import techNode from "../Images/Express.png";
import techMongo from "../Images/MongoDB.webp";

import { PROJECTS } from "../WorkV2/projectsData";
import TechStackShowcaseV2 from "../Shared/TechStackShowcaseV2";
import NavbarV2 from "../Shared/NavbarV2";
import ScrollSentence from '../Shared/ScrollSentence';
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import ClientStrip from '../Shared/ClientStrip';
import { useTestimonials } from "../../data/useTestimonials";
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";
import { StructuredData } from "../../components/StructuredData";
import { serviceInfo } from "../../lib/serviceSchema";


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

/* next steps */
const NEXT_STEPS = [
  { n: "01", icon: Phone, title: "Discovery call", meta: "30 minutes", body: "We talk through your current setup, what's breaking, and what a realistic support plan looks like." },
  { n: "02", icon: FileText, title: "Support plan proposal", meta: "Within 3 days", body: "A fixed monthly retainer scoped to your actual system — response times, coverage hours, and price, in writing." },
  { n: "03", icon: PlayCircle, title: "Onboarding & monitoring live", meta: "Within a week", body: "We set up monitoring, get access, and you have a direct line to the team from day one." },
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

/* every project in PROJECTS now has a matching v2 case-study page, so all
   links route through /case-study rather than the old-site v1 href */
const RELATED = [23, 5, 13].map((id) => {
  const p = PROJECTS.find((proj) => proj.id === id);
  const link = `/case-study${p.href}`;
  return { tag: p.category, title: p.title, link, thumb: p.image };
});

const PRINCIPLES = [
  { key: "Responsive", icon: Clock, claim: "No ticket that sits for a week.", body: "Response times are written into the plan, not left to best-effort. If we commit to 4 hours, that's what you get." },
  { key: "Transparent", icon: FileText, claim: "No black-box support.", body: "Every incident, patch, and fix is logged and reported. You always know exactly what's being maintained and why." },
  { key: "Proactive", icon: Activity, claim: "No waiting for it to break.", body: "Monitoring and scheduled maintenance catch problems before they become downtime, not after your users report them." },
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

/* scroll-scrubbed word reveal — same mechanism as the other v2 service pages */
const scrollSentenceEase = (p) => p * p * p * (p * (p * 6 - 15) + 10);



const TECH_CATEGORIES = [
  {
    id: "monitoring",
    title: "Monitoring & Alerting",
    icon: Monitor,
    tools: ["Datadog", "New Relic", "PagerDuty", "Sentry"],
    colSpan: 1,
  },
  {
    id: "devops",
    title: "DevOps & CI/CD",
    icon: Cloud,
    tools: ["GitHub Actions", "GitLab CI", "Terraform", "Jenkins"],
    colSpan: 1,
  },
  {
    id: "security",
    title: "Security & Backups",
    icon: Lock,
    tools: ["Cloudflare", "AWS Shield", "Vault", "Veeam"],
    colSpan: 1,
  }
];

const METRICS = [
  { value: "<15m", label: "Incident Response Time" },
  { value: "24/7", label: "Active Monitoring" },
  { value: "99.99%", label: "Guaranteed Uptime" }
];

export default function SupportManagedServicesV2() {
  const testimonials = useTestimonials(STATIC_TESTIMONIALS);

  
  
  
  const [incActive, setIncActive] = useState(0);
  const [estType, setEstType] = useState("standard");
  const [estScale, setEstScale] = useState("m");
  const [estAddons, setEstAddons] = useState(() => new Set());

  const rootRef = useRef(null);

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

  

  

  /* sticky heading bands only show their rule once actually stuck */
  useEffect(() => {
    const shells = rootRef.current.querySelectorAll(".v2-method-shell");
    if (!shells.length) return;
    const pairs = Array.from(shells)
      .map((shell) => ({ shell, head: shell.querySelector(".v2-method-head") }))
      .filter((p) => p.head);
    /* Read every rect first, then write every class. Interleaved, each
       toggle invalidated layout for the next getBoundingClientRect, so a page
       with N sticky bands forced N layout flushes on every scroll event. */
    const onScroll = () => {
      const stuck = pairs.map(({ shell }) => {
        const r = shell.getBoundingClientRect();
        return r.top <= 0 && r.bottom > 0;
      });
      pairs.forEach(({ head }, i) => head.classList.toggle("is-stuck", stuck[i]));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* hero intro — GSAP wipe-up for the title, overlapping fade for the rest */
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


  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      <main>

      

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/services">Services</Link>
                <span>/</span>
                <em>Support &amp; Managed Services</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Service 08 · Support &amp; Managed Services</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Ongoing support that</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">keeps things running.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Uptime monitoring, security patching, performance tuning, and
                dedicated engineering capacity — a support plan that catches
                problems before your users do.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Schedule a call</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                <a className="v2-hero-secondary" href="#estimate">
                  <span className="v2-hero-secondary-label">Estimate my project</span>
                </a>
              </div>
            </div>

            {/* at-a-glance facts */}
            <aside className="sd2-facts sv2-hero-reveal">
              {[
                ["Typical setup", "1 week onboarding"],
                ["Starts with", "Codebase Audit"],
                ["You receive", "Monitoring & Reports"],
                ["Contract", "Monthly, no lock-in"],
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
        <h2 className="v2-heading">The support problems we fix every day.</h2>
        <p className="v2-lede">
          If "support" currently means hoping nothing breaks, it's time for
          an actual plan.
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
        <h2 className="v2-heading">Every support plan ships with all of this.</h2>
        <p className="v2-lede">
          Not an upsell list — this is the baseline on every support engagement
          we take, whatever the size.
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
            <h2 className="v2-heading">Support scoped to how you actually run.</h2>
          </div>
          <p className="v2-lede">
            The right support plan depends on how critical the system is and
            how much is changing month to month.
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
              <h2 className="v2-heading">Rough out your onboarding time in ten seconds.</h2>
            </div>
            <p className="v2-lede">
              Pick what you need and we'll show an honest range. It's an estimate,
              not a quote — but it's the same maths we start from.
            </p>
          </div>

          <div className="sd2-est-body">
            <div className="sd2-est-controls">
              <div className="sd2-est-group">
                <span className="sd2-est-label">01 — What level of support?</span>
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
                <span className="sd2-est-label">02 — How large is the system?</span>
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
              <span className="sd2-est-out-k">Estimated onboarding time</span>
              <div className="sd2-est-out-v">
                <span key={estimate.low} className="sd2-est-num">{estimate.low}</span>
                <span className="sd2-est-dash">–</span>
                <span key={estimate.high + "h"} className="sd2-est-num">{estimate.high}</span>
                <span className="sd2-est-unit">weeks</span>
              </div>
              <p className="sd2-est-note">{estimate.base}</p>
              <div className="sd2-est-bar" aria-hidden="true">
                <span style={{ width: `${Math.min(100, (estimate.high / 12) * 100)}%` }} />
              </div>
              <ul className="sd2-est-list">
                <li><Check size={14} /> Codebase & infrastructure audit</li>
                <li><Check size={14} /> Monitoring & alerting setup</li>
                <li><Check size={14} /> Written SLA documentation</li>
              </ul>
              <Link to="/contact" className="v2-btn v2-btn--outline" style={{ marginTop: 24, width: "100%" }}>
                <span>Discuss this scope</span>
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════ 4b · PROCESS ══════════ */}
      <section className="v2-method-shell" id="process">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">How We Keep Things Running.</h2>
          <p className="v2-method-lede">
            Six stages from onboarding to monthly review — nothing runs
            unmonitored, and nothing changes silently.
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
          Every support plan is measured against these — not aspirations, gates.
        </p>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Live quality gate</span>
            <span className="sd2-bench-bar-meta">Checked every month</span>
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
                        <linearGradient id={`sd2-bench-grad-support-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#sd2-bench-grad-support-${i})`}
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
            <p className="v2-label">The Support Stack</p>
            <h2 className="v2-heading">What we monitor and maintain with.</h2>
          </div>
          <p className="v2-lede">
            Chosen per system, not by habit — the right tooling for your stack,
            your team, and what you'll need to maintain.
          </p>
        </div>
        <div className="v2-tech-grid">
          {SUPPORT_STACK.map((t) => (
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
            <Link className="sd2-work-card" to={w.link} key={w.link}>
              <span className="sd2-work-media">
                <img src={w.thumb} alt="" loading="lazy" />
              </span>
              <span className="sd2-work-tag">{w.tag}</span>
              <span className="sd2-work-title">{w.title}</span>
              <span className="sd2-work-go">Read case study →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ 11 · TESTIMONIAL ══════════ */}
      <TestimonialSpotlight
        testimonials={testimonials}
        label="Client Voices"
        heading="What clients say once we ship."
        stats={[
          { num: "40+", label: "Companies trust us" },
          { num: "11", label: "Industries served" },
          { num: "100%", label: "Source code ownership" },
        ]}
      />

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

      

      {/* ══════════ TECH STACK ══════════ */}
      <TechStackShowcaseV2
        title="Proactive Monitoring & DevOps"
        description="The tools we use to maintain, secure, and continuously monitor your applications ensuring uninterrupted business operations."
        categories={TECH_CATEGORIES}
        metrics={METRICS}
      />
{/* ══════════ 8a · HANDOVER ══════════ */}
      <section className="v2-section" id="handover">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">What You Receive</p>
            <h2 className="v2-heading">Everything, every month.</h2>
          </div>
          <p className="v2-lede">
            "We've got it covered" is easy to say. Here is the exact list of
            what lands in your inbox every month.
          </p>
        </div>
        <div className="sd2-manifest">
          <div className="sd2-manifest-bar">
            <span className="sd2-manifest-title">
              <FileCode2 size={14} strokeWidth={1.8} />
              Support manifest
            </span>
            <span className="sd2-manifest-meta">
              {HANDOVER.length} items
              <i />
              Delivered monthly
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
              Everything above is part of the monthly plan, not billed as
              surprise extras. <b>No lock-in, cancel with notice.</b>
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
            No support plan, a freelancer on call, and a big agency retainer
            all solve part of the problem. Here's where each one tends to
            leave you exposed.
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
      <ScrollSentence words={SENTENCE} tone="dark"  centered={true} />

      {/* ══════════ 9 · FAQ ══════════ */}
      <FaqSection faqs={FAQS} className="v2-section--void" />

      {/* ══════════ 14b · WHAT HAPPENS NEXT ══════════ */}
      <section className="v2-section v2-section--void" id="next">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">What Happens Next</p>
            <h2 className="v2-heading">Three steps from here to onboarding.</h2>
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
            <Link className="sd2-other" to={s.path} key={s.path}>
              <div className="sd2-other-top">
                <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
                <span className="sd2-other-n">{s.n}</span>
              </div>
              <span className="sd2-other-title">{s.title}</span>
              <p className="sd2-other-body">{s.body}</p>
              <span className="sd2-other-go">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ 18 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what's keeping you up at night.<br />We'll tell you how we'd cover it.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your system — what's fragile, what's
            urgent, and what a realistic support plan looks like.
          </p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to="/contact">Book a consultation →</Link></div>
</CtaSection>

      </main>

      <StructuredData type="Service" data={serviceInfo("/services/support-managed-services")} />
      <FooterV2 />
    </div>
  );
}
