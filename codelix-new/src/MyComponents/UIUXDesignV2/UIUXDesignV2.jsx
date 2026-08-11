import { PenTool, Layers, Search, Eye, Smartphone, Palette, CalendarCheck, Lock, Check, HelpCircle, Paintbrush, MousePointerClick, RefreshCw, Users2, Frown, Building2, Store, Rocket, GraduationCap, HeartPulse, Landmark, FileCode2, BookOpen, KeyRound, Server, GitBranch, Layout, Globe, ShoppingCart, Code2, Sparkles, BarChart3, LifeBuoy, Minus, X, Phone, FileText, PlayCircle, Monitor, Database } from "lucide-react";
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

/* UI/UX-specific tool logos */
import techFigma from "../Images/figma.png";
import techXD from "../Images/adobe-xd.png";
import techSketch from "../Images/sketch.png";
import techFramer from "../Images/framer.png";
import techPhotoshop from "../Images/PhotoShop.png";
import techCanva from "../Images/canva.png";

/* real project screenshots — shared source of truth with WorkV2/CaseStudyV2 */
import { PROJECTS } from "../WorkV2/projectsData";
import TechStackShowcaseV2 from "../Shared/TechStackShowcaseV2";
import NavbarV2 from "../Shared/NavbarV2";
import ScrollSentence from '../Shared/ScrollSentence';
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import ClientStrip from '../Shared/ClientStrip';


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

/* next steps */
const NEXT_STEPS = [
  { n: "01", icon: Phone, title: "Discovery call", meta: "30 minutes", body: "A no-pressure call to understand your product, your users, and what's not working. No slide deck, no sales pitch." },
  { n: "02", icon: FileText, title: "Design brief", meta: "Within 48 hours", body: "A clear scope covering deliverables, timeline, and price — in writing. You know exactly what you're getting before you commit." },
  { n: "03", icon: PlayCircle, title: "Kickoff", meta: "On your go-ahead", body: "We start with research, share findings early, and keep you in the loop at every stage. You see progress from week one." },
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

/* real UI/UX design projects — pulled from the same shared portfolio data
   as the Work page, filtered to the category that actually matches this
   service (the previous list mixed in e-commerce/mobile projects and even
   a mistitled entry — this is the honest fix) */
/* every project in PROJECTS now has a matching v2 case-study page, so all
   links route through /case-study rather than the old-site v1 href */
const RELATED = PROJECTS
  .filter((p) => p.category === "UI/UX Design")
  .map((p) => ({
    tag: p.category, title: p.title, thumb: p.image,
    link: `/case-study${p.href}`,
  }));

const PRINCIPLES = [
  { key: "Delivered", icon: CalendarCheck, claim: "No deadline we don't hold ourselves to.", body: "We pad the schedule honestly upfront so we don't have to renegotiate halfway through. If we say a date, we hit it." },
  { key: "Owned", icon: Lock, claim: "No design you don't fully own.", body: "When the invoice is paid, the Figma files, the design system, and every asset are yours. No lock-in, no retained access." },
  { key: "Visible", icon: Eye, claim: "No progress you can't see.", body: "We don't go dark for a month and come back with a surprise. You see the work as it happens, so we can course-correct early." },
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

/* scroll-scrubbed word reveal — same mechanism as ServiceDetailV2's copy,
   kept as its own local copy so each page can tune timing independently */
const scrollSentenceEase = (p) => p * p * p * (p * (p * 6 - 15) + 10);



const TECH_CATEGORIES = [
  {
    id: "design",
    title: "Design & Prototyping",
    icon: PenTool,
    tools: ["Figma", "Sketch", "Adobe XD", "Principle"],
    colSpan: 1,
  },
  {
    id: "motion",
    title: "Motion & Interaction",
    icon: Monitor,
    tools: ["After Effects", "Framer", "Lottie", "Rive"],
    colSpan: 1,
  },
  {
    id: "research",
    title: "Research & Handoff",
    icon: Database,
    tools: ["Maze", "Hotjar", "Zeplin", "Storybook"],
    colSpan: 1,
  }
];

const METRICS = [
  { value: "300%", label: "Avg. Engagement Increase" },
  { value: "10ms", label: "Interaction Latency" },
  { value: "AA", label: "WCAG Accessibility" }
];

export default function UIUXDesignV2() {
  
  
  
  const [incActive, setIncActive] = useState(0);
  const [estType, setEstType] = useState("mobile");
  const [estScale, setEstScale] = useState("s");
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
                <em>UI/UX Design</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Service 03 · UI/UX Design</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Interfaces that are</span></span>
                <span className="line"><span className="v2-hero-accent">intuitive, beautiful, and backed by evidence.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                We design user interfaces and product experiences grounded in real
                research — prototyped, tested, and refined until the interface
                feels obvious, then handed over with a complete design system.
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
                ["Typical timeline", "1–6 weeks"],
                ["Starts with", "Discovery call"],
                ["You receive", "Full Figma files"],
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
        <h2 className="v2-heading">The problems we get called in to fix.</h2>
        <p className="v2-lede">
          If you recognise two or three of these, a proper design process will
          save you more than another round of ad-hoc tweaks.
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
        <h2 className="v2-heading">Every design project ships with all of this.</h2>
        <p className="v2-lede">
          Not an upsell list — this is the baseline on every UI/UX project we
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
            <h2 className="v2-heading">Designed for how your sector actually operates.</h2>
          </div>
          <p className="v2-lede">
            The approach changes depending on your users, your industry, and what
            they're trying to accomplish.
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

            {/* live readout */}
            <aside className="sd2-est-out" aria-live="polite">
              <span className="sd2-est-out-k">Estimated design time</span>
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
                <li><Check size={13} strokeWidth={2.4} /> Research + design + testing included</li>
                <li><Check size={13} strokeWidth={2.4} /> Fixed price once scoped</li>
                <li><Check size={13} strokeWidth={2.4} /> Full Figma handover</li>
              </ul>
              <a className="v2-btn" href="/contact">Get an exact quote →</a>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════ 6 · PROCESS ══════════ */}
      <section className="v2-method-shell" id="process">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">How A Design Project Runs.</h2>
          <p className="v2-method-lede">
            Six stages from first call to final handoff — nothing advances until
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
          Every design is measured against these before it's allowed to ship —
          not aspirations, gates.
        </p>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Live quality gate</span>
            <span className="sd2-bench-bar-meta">Checked on every project</span>
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
                        <linearGradient id={`sd2-bench-grad-ux-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#sd2-bench-grad-ux-${i})`}
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

      {/* ══════════ 8 · TOOLS ══════════ */}
      <section className="v2-section v2-tech" id="stack">
        <div className="v2-tech-head">
          <div>
            <p className="v2-label">The Design Stack</p>
            <h2 className="v2-heading">What we design with.</h2>
          </div>
          <p className="v2-lede">
            Chosen per project, not by habit — the right tool for your team's
            workflow and your developers' handoff needs.
          </p>
        </div>
        <div className="v2-tech-grid">
          {UIUX_STACK.map((t) => (
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
        <h2 className="v2-heading">Designs we've shipped.</h2>
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
      <TestimonialSpotlight
        testimonials={STATIC_TESTIMONIALS}
        label="Client Voices"
        heading="What clients say once we ship."
        stats={[
          { num: "40+", label: "Companies trust us" },
          { num: "11", label: "Industries served" },
          { num: "100%", label: "Source code ownership" },
        ]}
      />


      {/* ══════════ 13 · PRINCIPLES ══════════ */}
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
        title="The Modern Design Arsenal"
        description="Industry-standard design tools and prototyping software we use to create pixel-perfect, accessible, and highly-interactive experiences."
        categories={TECH_CATEGORIES}
        metrics={METRICS}
      />
{/* ══════════ 9 · HANDOVER ══════════ */}
      <section className="v2-section" id="handover">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">What You Receive</p>
            <h2 className="v2-heading">Everything, at handoff.</h2>
          </div>
          <p className="v2-lede">
            "You own the designs" is easy to say. Here is the exact list of what
            lands in your accounts when the project closes.
          </p>
        </div>
        <div className="sd2-manifest">
          <div className="sd2-manifest-bar">
            <span className="sd2-manifest-title">
              <FileCode2 size={14} strokeWidth={1.8} />
              Handoff manifest
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

      {/* ══════════ 14 · WHY US vs ALTERNATIVES ══════════ */}
      <section className="v2-section v2-section--void" id="compare">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">Why Us</p>
            <h2 className="v2-heading">Against what you're actually comparing.</h2>
          </div>
          <p className="v2-lede">
            A template kit, a freelancer, and a big agency all solve part of the
            problem. Here's where each one tends to leave you exposed.
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

      {/* ══════════ 14b · SCROLL SENTENCE ══════════ */}
      <ScrollSentence words={SENTENCE} tone="dark"  centered={true} />

      {/* ══════════ 15 · FAQ ══════════ */}
      <FaqSection faqs={FAQS} className="v2-section--void" />

      {/* ══════════ 16 · WHAT HAPPENS NEXT ══════════ */}
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

      {/* ══════════ 17 · OTHER SERVICES ══════════ */}
      <section className="v2-section" id="other">
        <p className="v2-label">Explore More</p>
        <h2 className="v2-heading">The rest of what we do.</h2>
        <div className="sd2-other-list">
          {OTHER_SERVICES.map((s) => (
            <a className="sd2-other" href={s.path} key={s.path}>
              <div className="sd2-other-top">
                <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
                <span className="sd2-other-n">{s.n}</span>
              </div>
              <span className="sd2-other-title">{s.title}</span>
              <p className="sd2-other-body">{s.body}</p>
              <span className="sd2-other-go">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 18 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're designing.<br />We'll tell you how we'd approach it.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your product — your users, your goals,
            your constraints. We scope what should be designed first, what can wait,
            and what it takes to ship it.
          </p>
          <div className="v2-cta-actions">
            <a className="v2-btn" href="/contact">Book a consultation →</a></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
            <FooterV2 />
    </div>
  );
}
