import React, { useEffect, useMemo, useRef, useState } from "react";
import { SEO } from "../../components/SEO";
import FooterV2 from "../Shared/FooterV2";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import {
  ArrowLeft, Check, X, Minus, FileCode2,
  Building2, Rocket, Store, GraduationCap, HeartPulse, Landmark,
  CalendarCheck, Lock, Eye,
  GitBranch, BookOpen, KeyRound, Palette, Server,
  Phone, FileText, PlayCircle,
} from "lucide-react";
import TestimonialSpotlight from "../Shared/TestimonialSpotlight";
import { STATIC_TESTIMONIALS } from "../../data/testimonialsData";

/* v2 design system + shared data — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";

import { TECH_STACK } from "../HomepageV2/techStack";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import TechStackShowcaseV2 from "../Shared/TechStackShowcaseV2";

import { PROJECTS } from "../WorkV2/projectsData";
import { useCaseStudies } from "../CaseStudyDetailV2/useCaseStudies";
import { ADDITIONAL_SERVICES, additionalServiceBySlug } from "./additionalServicesData";
import NavbarV2 from "../Shared/NavbarV2";
import ScrollSentence from "../Shared/ScrollSentence";
import FaqSection from "../Shared/FaqSection";
import CtaSection from "../Shared/CtaSection";
import ClientStrip from "../Shared/ClientStrip";


/* ─── shared/generic content, reused across all 18 pages — the same true,
   general claims already used on the 8 core service pages (fixed
   pricing, source-code ownership, same delivery process), not invented
   per-service specifics. ─── */
const USE_CASES = [
  { icon: Building2, title: "Corporate & B2B", body: "Built for teams whose buyers research before they ever make contact — credibility and clarity first." },
  { icon: Rocket, title: "Startups & SaaS", body: "Fast to ship, built to evolve — designed for a product that's still finding its shape." },
  { icon: Store, title: "Retail & D2C", body: "Engineered around speed and trust, from first interaction through to conversion." },
  { icon: GraduationCap, title: "Education", body: "Built to hold up under real usage, not just a polished demo." },
  { icon: HeartPulse, title: "Healthcare", body: "Privacy and accessibility treated as requirements from day one, not a retrofit." },
  { icon: Landmark, title: "Finance & Legal", body: "Compliance-conscious builds where trust signals and data handling actually matter." },
];

const PRINCIPLES = [
  { key: "Delivered", icon: CalendarCheck, claim: "No deadline we don't hold ourselves to.", body: "We pad the schedule honestly upfront so we don't have to renegotiate halfway through. If we say a date, we hit it." },
  { key: "Owned", icon: Lock, claim: "No code you don't fully own.", body: "When the invoice is paid, the code is yours. We hand over the repos, the docs, and the keys. No vendor lock-in." },
  { key: "Visible", icon: Eye, claim: "No progress you can't see.", body: "We don't go dark for a month and come back with a surprise. You see the work as it happens." },
];

/* generic quality bars — real, universal company commitments (not a
   fabricated per-service performance number, since we don't have real
   measured data for 18 different service lines) */
const BENCHMARKS = [
  { value: 100, suffix: "%", label: "Source-code ownership", note: "Every project, no exceptions", ring: 100 },
  { value: 100, suffix: "%", label: "Scope agreed in writing", note: "Before any work starts", ring: 100 },
  { value: 24, suffix: "h", label: "Typical response time", note: "During an active engagement", ring: 80 },
  { value: 0, suffix: "", label: "Retained access after handover", note: "No lock-in, no dependency", ring: 100 },
];

/* the actual artifacts handed over — generic across engagement types,
   not tied to one specific deliverable format */
const HANDOVER = [
  { icon: FileCode2, title: "Full source code", body: "The complete repository, with clean commit history — yours to keep, fork, or hand to another team." },
  { icon: GitBranch, title: "Repository access", body: "Transferred to your organisation account, with history and configuration intact." },
  { icon: BookOpen, title: "Technical documentation", body: "Architecture, setup, and configuration written for someone who's never seen it before." },
  { icon: KeyRound, title: "Credentials & accounts", body: "Hosting, infrastructure, and any third-party keys — registered in your name from the start." },
  { icon: Palette, title: "Design or architecture files", body: "Whatever was used to plan the build, handed over so future work doesn't start from scratch." },
  { icon: Server, title: "Deployment & handover walkthrough", body: "A live session covering how everything runs, so your team owns it fully from day one." },
];

const COMPARE_COLS = ["Codelix", "Template / builder", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "100% source-code ownership", vals: ["yes", "partial", "maybe", "partial"] },
  { label: "Timeline you can hold us to", vals: ["yes", "yes", "no", "partial"] },
  { label: "Built for your exact workflow", vals: ["yes", "no", "maybe", "yes"] },
  { label: "One team, one point of contact", vals: ["yes", "no", "yes", "no"] },
  { label: "Post-launch support & docs", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Transparent, fixed pricing", vals: ["yes", "yes", "maybe", "no"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

const PROCESS = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We work out what actually has to be solved — the constraints, the users, and what can be cut from scope." },
  { n: "02", title: "Scoping", time: "3–5 days", body: "A concrete plan agreed before anything is built, so nothing gets rebuilt later because of a missed assumption." },
  { n: "03", title: "Design & Architecture", time: "1–2 weeks", body: "The technical approach and any interface work, reviewed with you until the direction is signed off." },
  { n: "04", title: "Build", time: "2–8 weeks", body: "Built in short cycles with visible progress — you see it working early and often, not just at the end." },
  { n: "05", title: "QA & Launch", time: "1–2 weeks", body: "Tested against real conditions before it goes live, then deployed with a rollback plan in place." },
  { n: "06", title: "Support", time: "Ongoing", body: "Post-launch fixes, monitoring, and improvements. You keep everything either way." },
];

const NEXT_STEPS = [
  { n: "01", icon: Phone, meta: "30 minutes", title: "Discovery call", body: "A no-pressure call to understand what you're building and what's not working. No slide deck, no sales pitch." },
  { n: "02", icon: FileText, meta: "Within 48 hours", title: "Written proposal", body: "A clear scope, a fixed price, and a timeline — in writing. You know exactly what you're getting before you commit." },
  { n: "03", icon: PlayCircle, meta: "On your go-ahead", title: "Kickoff", body: "We lock the scope and start. You get a point of contact and visible progress from day one." },
];

/* interpolated with the actual service name/title so each of the 18 pages
   reads as answering questions about THAT service, not a copy-pasted
   generic block — the answers stay universally true (same pricing model,
   same ownership terms on every engagement) since we don't have real
   per-service specifics to report, but the questions themselves and one
   dedicated "does this cover..." item are now service-specific. */
const getFaqs = (svc) => {
  const name = svc.title.toLowerCase();
  const firstCover = svc.covers?.[0];
  return [
    { q: `How is ${name} priced?`, a: "Fixed scope, fixed price — you get a written quote before any work starts, based on what you actually need, not an hourly guess." },
    { q: `How long does a typical ${name} engagement take?`, a: "It depends on scope, but most engagements run 2–12 weeks. Use the estimator above for a rough range, then we'll firm it up on a call." },
    { q: `Do we own the code and IP once the ${name} work is done?`, a: "Yes — 100% source-code ownership transfers to you at project close. No retained access, no dependency on us to keep it running." },
    firstCover
      ? { q: `Does ${name} include ${firstCover}?`, a: `Yes — ${firstCover} is one of the things covered under this service. See "What's Included" above for the full list of what's in scope.` }
      : { q: `What exactly is included in ${name}?`, a: "See \"What's Included\" above for the full list of what's covered under this service." },
    { q: `Do you work with our existing team on ${name}?`, a: "Yes — plenty of engagements plug into an existing in-house team rather than replacing it. We scope around whatever setup you already have." },
    { q: "What happens after launch?", a: "Every project includes a post-launch support window for fixes. After that you can take it in-house with the docs we provide, or keep us on a monthly retainer." },
  ];
};

const SENTENCE = [
  "YOU GET THE SOURCE.",
  "YOU GET THE SERVER.",
  "YOU GET THE DOMAIN.",
  "NO LOCK-IN.",
  "NO LICENSE GAMES.",
];

/* generic scope estimator — same interaction/maths as the core pages'
   estimator, but with universal size tiers instead of web-specific
   deliverable types, so the same component works for any service line */
const EST_TYPES = [
  { id: "focused", label: "Focused project", weeks: 2, base: "A single, well-defined piece of work." },
  { id: "standard", label: "Standard build", weeks: 4, base: "A complete, production-ready deliverable." },
  { id: "complex", label: "Complex system", weeks: 8, base: "Multiple moving parts, real integrations." },
  { id: "enterprise", label: "Enterprise scale", weeks: 14, base: "Built to run across a large organisation." },
];
const EST_SCALE = [
  { id: "s", label: "Small scope", mult: 1 },
  { id: "m", label: "Medium scope", mult: 1.3 },
  { id: "l", label: "Large scope", mult: 1.6 },
  { id: "xl", label: "Very large scope", mult: 2 },
];
const EST_ADDONS = [
  { id: "integrations", label: "Third-party integrations", weeks: 1 },
  { id: "roles", label: "Multi-user roles & permissions", weeks: 0.5 },
  { id: "migration", label: "Data migration", weeks: 1 },
  { id: "dashboard", label: "Custom reporting / dashboard", weeks: 1 },
  { id: "support", label: "Ongoing support retainer", weeks: 0 },
  { id: "priority", label: "Priority timeline", weeks: 0 },
];

/* scroll-scrubbed word reveal — identical mechanism to the core service
   pages, kept as its own copy rather than a shared import so each page
   can tune timing independently */
import { useTestimonials } from "../../data/useTestimonials";
const scrollSentenceEase = (p) => p * p * p * (p * (p * 6 - 15) + 10);


export default function AdditionalServiceDetailV2() {
  const testimonials = useTestimonials(STATIC_TESTIMONIALS);

  const { slug } = useParams();
  const svc = additionalServiceBySlug(slug);
  const caseStudies = useCaseStudies();




  const [incActive, setIncActive] = useState(0);
  const [incIndicator, setIncIndicator] = useState({ top: 0, height: 0 });

  const [estType, setEstType] = useState("standard");
  const [estScale, setEstScale] = useState("m");
  const [estAddons, setEstAddons] = useState(() => new Set(["support"]));

  const rootRef = useRef(null);
  const incNavRef = useRef(null);
  const incItemRefs = useRef([]);

  const estimate = useMemo(() => {
    const type = EST_TYPES.find((t) => t.id === estType);
    const scale = EST_SCALE.find((s) => s.id === estScale);
    const addonWeeks = EST_ADDONS
      .filter((a) => estAddons.has(a.id))
      .reduce((sum, a) => sum + a.weeks, 0);
    const core = type.weeks * scale.mult + addonWeeks;
    return { low: Math.max(2, Math.round(core * 0.85)), high: Math.round(core * 1.25), base: type.base };
  }, [estType, estScale, estAddons]);

  const toggleAddon = (id) =>
    setEstAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  /* the sliding highlight bar in "What's Included" is positioned by real
     measurement, not a fixed percentage — the shared CSS assumes exactly
     6 equal-height rows (true for the core pages' fixed 6-item lists),
     but here each service's cover list has a different item count and
     some titles wrap to two lines, so a %-based position would drift off
     the actual row it's supposed to highlight. */
  useEffect(() => {
    const measure = () => {
      const nav = incNavRef.current;
      const item = incItemRefs.current[incActive];
      if (!nav || !item) return;
      const navRect = nav.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      setIncIndicator({ top: itemRect.top - navRect.top, height: itemRect.height });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [incActive, svc]);





  /* sticky heading bands only show their rule once actually stuck */
  useEffect(() => {
    const shells = rootRef.current?.querySelectorAll(".v2-method-shell");
    if (!shells || !shells.length) return;
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
  }, [svc]);

  useEffect(() => {
    if (!svc) return;
    const q = (s) => rootRef.current.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"), { yPercent: 118 }, { yPercent: 0, duration: 1.15 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".sd2-facts.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.75");
    return () => tl.kill();
  }, [svc]);

  useEffect(() => {
    if (!svc) return;
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
    rootRef.current?.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [svc]);

  /* benchmark numbers count up when scrolled in */
  useEffect(() => {
    const nums = rootRef.current?.querySelectorAll(".sd2-bench-value");
    if (!nums || !nums.length) return;
    const run = (el) => {
      const target = Number(el.dataset.target);
      if (target === 0) { el.textContent = "0"; return; }
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(target * eased).toString();
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
  }, [svc]);

  /* damped scroll-progress bar */
  useEffect(() => {
    const bar = rootRef.current?.querySelector(".v2-progress span");
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
  }, [svc]);

  if (!svc) {
    return (
      <div className="v2" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <h1 style={{ color: "#fff", fontSize: 28 }}>Service not found.</h1>
        <a className="v2-btn" href="/services">Back to Services →</a>
      </div>
    );
  }

  const related = ADDITIONAL_SERVICES.filter((s) => s.slug !== svc.slug).slice(0, 6).map((s, i) => ({
    ...s, n: String(i + 1).padStart(2, "0"), path: `/services/${s.slug}`,
  }));

  /* admin-created case studies (published via Supabase) are prepended by
     useCaseStudies() ahead of the static list, so mapping them into the
     same { href, image, category, title } shape PROJECTS cards use and
     putting them first here means the latest published case study for a
     matching category shows up first — same additive merge as the
     WorkV2 / CaseStudyV2 listings. */
  const existingCaseStudySlugs = new Set(PROJECTS.map((p) => p.href.replace("/", "")));
  const adminWork = svc.relatedCategory
    ? caseStudies
      .filter((cs) => cs.image && cs.category === svc.relatedCategory && !existingCaseStudySlugs.has(cs.slug))
      .map((cs) => ({ href: `/case-study/${cs.slug}`, image: cs.image, category: cs.category, title: cs.title }))
    : [];
  const staticWork = svc.relatedCategory
    ? PROJECTS.filter((p) => p.category === svc.relatedCategory).map((p) => ({ href: `/case-study${p.href}`, image: p.image, category: p.category, title: p.title }))
    : [];
  const relatedWork = [...adminWork, ...staticWork].slice(0, 3);

  const faqs = getFaqs(svc);

  return (
    <main className="sd2" ref={rootRef}>
      <SEO title={`${svc.title} | Codelix IT Solutions`} description={svc.description} />
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />



      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span>/</span>
                <a href="/services">Services</a>
                <span>/</span>
                <em>{svc.title}</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Service</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>{svc.title}</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">{svc.description}</p>
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

            <aside className="sd2-facts sv2-hero-reveal">
              {[
                ["Typical timeline", "2–12 weeks"],
                ["Starts with", "Discovery call"],
                ["You receive", "100% source code"],
                ["Post-launch", "Support included"],
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
        <h2 className="v2-heading">The problems we get called in to fix.</h2>
        <p className="v2-lede">If you recognise two or three of these, it's worth a conversation.</p>
        <div className="sd2-problem-grid">
          {svc.problems.map((p) => (
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
        <h2 className="v2-heading">Where this service applies.</h2>
        <p className="v2-lede">Not an upsell list — this is what's actually covered under {svc.title.toLowerCase()}.</p>
        <div className="sd2-inc-showcase">
          <div className="sd2-inc-nav" role="tablist" aria-label="What's included" ref={incNavRef}>
            <span
              className="sd2-inc-nav-indicator"
              style={{ transform: `translateY(${incIndicator.top}px)`, height: `${incIndicator.height}px` }}
              aria-hidden="true"
            />
            {svc.covers.map((c, i) => (
              <div className="sd2-inc-navitem" key={c} ref={(el) => (incItemRefs.current[i] = el)}>
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
                  <span className="sd2-inc-tab-title">{c}</span>
                  <span className="sd2-inc-tab-icon"><Check size={16} strokeWidth={1.8} /></span>
                </button>
                <div className={`sd2-inc-mobile-body ${incActive === i ? "is-open" : ""}`}>
                  <div className="sd2-inc-mobile-body-inner">
                    <p className="sd2-inc-mobile-body-text">Part of every {svc.title.toLowerCase()} engagement.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sd2-inc-stage">
            {svc.covers.map((c, i) => (
              <div
                className={`sd2-inc-panel ${incActive === i ? "is-active" : ""}`}
                aria-hidden={incActive !== i}
                key={c}
              >
                <span className="sd2-inc-panel-glow" aria-hidden="true" />
                <span className="sd2-inc-panel-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="sd2-inc-panel-icon"><Check size={40} strokeWidth={1.2} /></span>
                <h3 className="sd2-inc-panel-title">{c}</h3>
                <p className="sd2-inc-panel-body">Part of every {svc.title.toLowerCase()} engagement, scoped to what you actually need.</p>
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
            <h2 className="v2-heading">Who asks us for {svc.title.toLowerCase()}.</h2>
          </div>
          <p className="v2-lede">The approach changes depending on who's using it and what they came to do.</p>
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
              Pick what you're building and we'll show an honest range. It's an
              estimate, not a quote — but it's the same maths we start from.
            </p>
          </div>

          <div className="sd2-est-body">
            <div className="sd2-est-controls">
              <div className="sd2-est-group">
                <span className="sd2-est-label">01 — What are you building?</span>
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
                <span className="sd2-est-label">02 — How big is it?</span>
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

            <aside className="sd2-est-out" aria-live="polite">
              <span className="sd2-est-out-k">Estimated build time</span>
              <div className="sd2-est-out-v">
                <span key={estimate.low} className="sd2-est-num">{estimate.low}</span>
                <span className="sd2-est-dash">–</span>
                <span key={estimate.high + "h"} className="sd2-est-num">{estimate.high}</span>
                <span className="sd2-est-unit">weeks</span>
              </div>
              <p className="sd2-est-note">{estimate.base}</p>
              <div className="sd2-est-bar" aria-hidden="true">
                <span style={{ width: `${Math.min(100, (estimate.high / 30) * 100)}%` }} />
              </div>
              <ul className="sd2-est-list">
                <li><Check size={13} strokeWidth={2.4} /> Scoping + build + QA included</li>
                <li><Check size={13} strokeWidth={2.4} /> Fixed price once scoped</li>
                <li><Check size={13} strokeWidth={2.4} /> Full source-code handover</li>
              </ul>
              <a className="v2-btn" href="/contact">Get an exact quote →</a>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════ 6 · PROCESS ══════════ */}
      <section className="v2-method-shell" id="process">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">How A {svc.title} Engagement Runs.</h2>
          <p className="v2-method-lede">
            Six stages from first call to live delivery — nothing advances until the
            stage before it is signed off.
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
        <h2 className="v2-heading">The commitments we hold ourselves to on {svc.title.toLowerCase()}.</h2>
        <p className="v2-lede">Not aspirations — the same terms on every engagement, regardless of scope.</p>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Live quality gate</span>
            <span className="sd2-bench-bar-meta">Checked on every engagement</span>
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
                        <linearGradient id={`asd2-bench-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#asd2-bench-grad-${i})`}
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
            <p className="v2-label">Our Broader Stack</p>
            <h2 className="v2-heading">What we build with.</h2>
          </div>
          <p className="v2-lede">
            Chosen per project, not by habit — the right tool for your scale,
            your team, and what you'll need to maintain.
          </p>
        </div>
        <div className="v2-tech-grid">
          {TECH_STACK.map((t) => (
            <div className="v2-tech-item" key={t.name}>
              <img src={t.src} alt={t.name} loading="lazy" />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 9 · RELATED WORK — real projects only, and only when
          there's a genuinely close category match. No fabricated case
          studies for a service line we have no real project for. ══════════ */}
      {relatedWork.length > 0 && (
        <section className="v2-section v2-section--void" id="work">
          <p className="v2-label">Related Work</p>
          <h2 className="v2-heading">Real projects in this space.</h2>
          <div className="sd2-work-grid">
            {relatedWork.map((w) => (
              <a className="sd2-work-card" href={w.href} key={w.href}>
                <span className="sd2-work-media">
                  <img src={w.image} alt="" loading="lazy" />
                </span>
                <span className="sd2-work-tag">{w.category}</span>
                <span className="sd2-work-title">{w.title}</span>
                <span className="sd2-work-go">Read case study →</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 10 · TESTIMONIAL ══════════ */}
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

      {/* ══════════ 11 · PRINCIPLES ══════════ */}
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

      {/* ══════════ EXTRAORDINARY SECTION: TECH STACK ══════════ */}
      <TechStackShowcaseV2 />

      {/* ══════════ 12 · HANDOVER ══════════ */}
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

      {/* ══════════ 13 · WHY US vs ALTERNATIVES ══════════ */}
      <section className="v2-section v2-section--void" id="compare">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">Why Us</p>
            <h2 className="v2-heading">What you're actually comparing for {svc.title.toLowerCase()}.</h2>
          </div>
          <p className="v2-lede">
            A template, a freelancer, and a big agency all solve part of the
            problem. Here's where each one tends to leave you exposed.
          </p>
        </div>

        <div className="sd2-cmp" role="table" aria-label="Codelix compared to alternatives">
          <div className="sd2-cmp-head" role="row">
            <span className="sd2-cmp-rowlabel" role="columnheader" />
            {COMPARE_COLS.map((c, i) => (
              <span className={`sd2-cmp-col ${i === 0 ? "is-us" : ""}`} role="columnheader" key={c}>{c}</span>
            ))}
          </div>
          {COMPARE_ROWS.map((row) => (
            <div className="sd2-cmp-row" role="row" key={row.label}>
              <span className="sd2-cmp-rowlabel" role="rowheader">{row.label}</span>
              {row.vals.map((v, i) => (
                <span className={`sd2-cmp-cell ${i === 0 ? "is-us" : ""} sd2-cmp-${v}`} role="cell" key={i}>
                  {v === "yes" && <Check size={16} strokeWidth={2.6} />}
                  {(v === "partial" || v === "maybe") && <Minus size={16} strokeWidth={2.6} />}
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

      {/* ══════════ 13.5 · SCROLL SENTENCE ══════════ */}
      <ScrollSentence words={SENTENCE} tone="dark" centered={true} />

      {/* ══════════ 14 · FAQ ══════════ */}
      <FaqSection faqs={faqs} className="v2-section--void" />

      {/* ══════════ 15 · WHAT HAPPENS NEXT ══════════ */}
      <section className="v2-section v2-section--void" id="next">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">What Happens Next</p>
            <h2 className="v2-heading">Three steps from here to kickoff.</h2>
          </div>
          <p className="v2-lede">No drawn-out sales process. Reach out and here's exactly what follows.</p>
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

      {/* ══════════ 16 · OTHER SERVICES ══════════ */}
      <section className="v2-section" id="other">
        <p className="v2-label">Explore More</p>
        <h2 className="v2-heading">The rest of what we do.</h2>
        <div className="sd2-other-list">
          {related.map((s) => (
            <a className="sd2-other" href={s.path} key={s.slug}>
              <div className="sd2-other-top">
                <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
                <span className="sd2-other-n">{s.n}</span>
              </div>
              <span className="sd2-other-title">{s.title}</span>
              <p className="sd2-other-body">{s.description}</p>
              <span className="sd2-other-go">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 17 · CTA ══════════ */}
      <CtaSection className="v2-section--void">

        <p className="v2-label">Start Here</p>
        <h2 className="v2-cta-headline">
          Tell us what you're building.<br />We'll tell you how we'd build it.
        </h2>
        <p className="v2-cta-body">
          A structured conversation about {svc.title.toLowerCase()} — your users, your goals,
          your constraints. We scope what should be built first, what can wait,
          and what it takes to ship it.
        </p>
        <div className="v2-cta-actions">
          <a className="v2-btn" href="/contact">Book a consultation →</a></div>
      </CtaSection>

      {/* ══════════ FOOTER ══════════ */}
      <FooterV2 />
    </main>
  );
}
