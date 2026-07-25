import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Globe, Gauge, Search, ShieldCheck, Smartphone, Wrench,
  CalendarCheck, Lock, Eye, Check,
  TrendingDown, Clock, EyeOff, Unlink, PhoneOff, Puzzle,
  Building2, Store, Rocket, GraduationCap, HeartPulse, Landmark,
  FileCode2, BookOpen, KeyRound, Palette, Server, GitBranch,
  PenTool, ShoppingCart, Code2, Sparkles,
} from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import "../ServicesV2/ServicesV2.css";
import "./ServiceDetailV2.css";

/* web-specific stack subset */
import techReact from "../Images/react.png";
import techNext from "../Images/next.png";
import techTs from "../Images/typescript.png";
import techJs from "../Images/javascript.png";
import techVite from "../Images/vite.png";
import techTailwind from "../Images/tailwind.png";
import techBootstrap from "../Images/bootstrap.png";
import techNode from "../Images/node.png";
import techLaravel from "../Images/laravel.png";
import techPhp from "../Images/php.png";
import techPostgres from "../Images/postgresql.png";
import techMongo from "../Images/MongoDB.png";
import techAws from "../Images/AWS.png";
import techDocker from "../Images/docker.png";
import techFigma from "../Images/figma.png";
import techWebflow from "../Images/webflow.png";

/* real project screenshots */
import workOne from "../Images/work-best-project-one.png";
import workTwo from "../Images/work-best-project-two.png";
import workFour from "../Images/work-best-project-four.png";

const WEB_STACK = [
  { src: techReact, name: "React" },
  { src: techNext, name: "Next.js" },
  { src: techTs, name: "TypeScript" },
  { src: techJs, name: "JavaScript" },
  { src: techVite, name: "Vite" },
  { src: techTailwind, name: "Tailwind" },
  { src: techBootstrap, name: "Bootstrap" },
  { src: techNode, name: "Node.js" },
  { src: techLaravel, name: "Laravel" },
  { src: techPhp, name: "PHP" },
  { src: techPostgres, name: "PostgreSQL" },
  { src: techMongo, name: "MongoDB" },
  { src: techAws, name: "AWS" },
  { src: techDocker, name: "Docker" },
  { src: techFigma, name: "Figma" },
  { src: techWebflow, name: "Webflow" },
];

/* pain points — lets a visitor self-identify before we pitch anything */
const PROBLEMS = [
  { icon: Clock, pain: "The site takes forever to load.", fix: "We hold a performance budget from day one and test on mid-range phones, not just fast office wifi." },
  { icon: EyeOff, pain: "Nobody finds us on Google.", fix: "Semantic markup, structured data, clean URLs, and real page-speed work — the technical groundwork search engines actually reward." },
  { icon: Unlink, pain: "We can't update anything ourselves.", fix: "A CMS your team can genuinely use, plus documentation and a walkthrough at handover." },
  { icon: TrendingDown, pain: "Traffic comes, but nobody converts.", fix: "We design backwards from the action you want, then cut every step that isn't earning its place." },
  { icon: PhoneOff, pain: "It falls apart on mobile.", fix: "Designed and tested small-screen-first, across real devices — not a desktop layout squeezed down." },
  { icon: Puzzle, pain: "Our last developer disappeared.", fix: "You get the repo, the docs, and the credentials. No lock-in, no dependency on us to keep it running." },
];

/* who this service is actually for */
const USE_CASES = [
  { icon: Building2, title: "Corporate & B2B", body: "Credibility-first sites for companies whose buyers research before they ever make contact." },
  { icon: Rocket, title: "Startups & SaaS", body: "Marketing sites and product pages that explain a new idea clearly and capture signups." },
  { icon: Store, title: "Retail & D2C", body: "Storefronts built around a fast, low-friction path from landing to checkout." },
  { icon: GraduationCap, title: "Education", body: "Course catalogues, admissions journeys, and student portals that handle real enrolment load." },
  { icon: HeartPulse, title: "Healthcare", body: "Appointment flows and patient information built with privacy and accessibility in mind." },
  { icon: Landmark, title: "Finance & Legal", body: "Compliance-conscious sites where trust signals and document handling actually matter." },
];

/* quality bars we hold ourselves to — value is the count-up target */
const BENCHMARKS = [
  { value: 95, suffix: "+", label: "Lighthouse performance", note: "Measured on mobile, not desktop" },
  { value: 2, suffix: "s", label: "Target load time", note: "First contentful paint on 4G" },
  { value: 100, suffix: "%", label: "Responsive coverage", note: "320px through ultrawide" },
  { value: 0, suffix: "", label: "Known critical bugs", note: "Nothing ships red" },
];

/* the actual artifacts handed over — concrete, not vague promises */
const HANDOVER = [
  { icon: FileCode2, title: "Full source code", body: "The complete repository, with clean commit history — yours to keep, fork, or hand to another team." },
  { icon: GitBranch, title: "Repository access", body: "Transferred to your organisation account, with branch history and CI configuration intact." },
  { icon: BookOpen, title: "Technical documentation", body: "Setup, architecture, environment variables, and deployment steps written for a developer who's never seen it." },
  { icon: KeyRound, title: "Credentials & accounts", body: "Hosting, domain, analytics, and any third-party keys — registered in your name from the start." },
  { icon: Palette, title: "Design files", body: "The Figma project with components and styles, so future work doesn't start from a screenshot." },
  { icon: Server, title: "Deployment setup", body: "Live environment configured and documented, with a runbook for redeploying it yourself." },
];

/* real client quote, already used on the live site's Our Work page */
const QUOTE = {
  text: "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule.",
  name: "Rajesh Patel",
  role: "CEO, Harmony Inc.",
};

/* cross-sell to the rest of the catalogue */
const OTHER_SERVICES = [
  { icon: Smartphone, n: "02", title: "Application Development", path: "/services/application-development" },
  { icon: PenTool, n: "03", title: "UI/UX Design", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Custom Software Development", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI Development", path: "/services/ai-development" },
];

/* what's actually included — the deliverables buyers want spelled out */
const INCLUDED = [
  { icon: Globe, title: "Custom front-end build", body: "Hand-built interfaces in React or Next.js — no page-builder bloat, no theme you have to fight to customise." },
  { icon: Gauge, title: "Performance budget", body: "We hold a Core Web Vitals target from day one. Fast on a mid-range phone on 4G, not just on your office wifi." },
  { icon: Search, title: "Technical SEO groundwork", body: "Semantic markup, metadata, sitemaps, structured data, and clean URLs — so the site is findable the day it launches." },
  { icon: Smartphone, title: "Responsive across devices", body: "Designed and tested from small phones up to wide desktops. No 'mobile version' bolted on afterwards." },
  { icon: ShieldCheck, title: "Security & hardening", body: "HTTPS, input validation, dependency auditing, and sensible headers configured before anything goes live." },
  { icon: Wrench, title: "CMS & handover", body: "An admin you can actually use, plus documentation and deployment details so your team owns it fully." },
];

/* the interactive estimator's option sets */
const EST_TYPES = [
  { id: "landing", label: "Landing page", weeks: 1, base: "A single focused page built to convert." },
  { id: "marketing", label: "Marketing site", weeks: 2.5, base: "Multi-page site with a CMS behind it." },
  { id: "webapp", label: "Web application", weeks: 5, base: "Authenticated product with real logic." },
  { id: "platform", label: "Platform / SaaS", weeks: 10, base: "Multi-tenant system built to scale." },
];
const EST_SCALE = [
  { id: "s", label: "1–5 pages", mult: 1 },
  { id: "m", label: "6–15 pages", mult: 1.35 },
  { id: "l", label: "16–40 pages", mult: 1.7 },
  { id: "xl", label: "40+ pages", mult: 2.1 },
];
const EST_ADDONS = [
  { id: "cms", label: "CMS", weeks: 0.5 },
  { id: "auth", label: "User accounts", weeks: 1 },
  { id: "pay", label: "Payments", weeks: 1 },
  { id: "api", label: "Third-party integrations", weeks: 1 },
  { id: "multi", label: "Multi-language", weeks: 0.5 },
  { id: "analytics", label: "Analytics & dashboards", weeks: 0.5 },
];

const PROCESS = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We work out what the site actually has to do — who it's for, what action matters, and what can be cut." },
  { n: "02", title: "Architecture", time: "3–5 days", body: "Sitemap, page structure, and the technical approach, agreed before design starts so nothing gets rebuilt later." },
  { n: "03", title: "Design", time: "1–2 weeks", body: "High-fidelity screens for every key template, reviewed with you until the direction is signed off." },
  { n: "04", title: "Build", time: "2–8 weeks", body: "Front-end and back-end built in sprints, with a staging link you can check at any point." },
  { n: "05", title: "QA & Launch", time: "1–2 weeks", body: "Cross-browser, cross-device, performance and security testing — then deployment and DNS cutover." },
  { n: "06", title: "Support", time: "Ongoing", body: "Post-launch fixes, monitoring, and improvements. You keep the code either way." },
];

const RELATED = [
  { tag: "E-Commerce", title: "A High-Performance Platform for Premium Book Collections", link: "/book-collections-case-study", thumb: workOne },
  { tag: "Enterprise ERP", title: "A Custom ERP Solution for Industrial & Financial Workflows", link: "/erp-case-study", thumb: workTwo },
  { tag: "Marketplace", title: "A Feature-Rich Mobile Marketplace for Buying & Selling Cars", link: "/car-marketplace-case-study", thumb: workFour },
];

const PRINCIPLES = [
  { key: "Delivered.", icon: CalendarCheck, claim: "No deadline we don't hold ourselves to.", body: "We pad the schedule honestly upfront so we don't have to renegotiate halfway through. If we say a date, we hit it." },
  { key: "Owned.", icon: Lock, claim: "No code you don't fully own.", body: "When the invoice is paid, the code is yours. We hand over the repos, the docs, and the keys. No vendor lock-in." },
  { key: "Visible.", icon: Eye, claim: "No progress you can't see.", body: "We don't go dark for a month and come back with a surprise. You see the work as it happens, so we can course-correct early." },
];

const FAQS = [
  { q: "How long does a website take to build?", a: "A focused landing page is usually 2–3 weeks. A full marketing site with a CMS runs 4–8 weeks. Web applications depend heavily on scope — use the estimator above for a rough range, then we'll firm it up on a call." },
  { q: "Do you redesign existing websites?", a: "Yes. We'll audit what you have first — sometimes the right answer is a rebuild, sometimes it's targeted fixes to performance and conversion. We'll tell you honestly which one you need." },
  { q: "Will I be able to update the site myself?", a: "Yes, if you want a CMS we'll build one you can actually use, and walk your team through it at handover. If you'd rather we handle updates, that's what the support retainer is for." },
  { q: "Do you handle hosting and domains?", a: "We can deploy to your hosting or set up new infrastructure on AWS or similar. Either way you own the accounts — we don't hold your domain or hosting hostage." },
  { q: "Is SEO included?", a: "Technical SEO is — semantic markup, metadata, structured data, sitemaps, speed. Ongoing content strategy and link building are separate, though we can advise." },
  { q: "What happens after launch?", a: "Every project includes a post-launch support window for fixes. After that you can take it in-house with the docs we provide, or keep us on a monthly retainer." },
];

export default function ServiceDetailV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());

  /* estimator state */
  const [estType, setEstType] = useState("marketing");
  const [estScale, setEstScale] = useState("m");
  const [estAddons, setEstAddons] = useState(() => new Set(["cms"]));

  const rootRef = useRef(null);
  const stripRef = useRef(null);

  const estimate = useMemo(() => {
    const type = EST_TYPES.find((t) => t.id === estType);
    const scale = EST_SCALE.find((s) => s.id === estScale);
    const addonWeeks = EST_ADDONS
      .filter((a) => estAddons.has(a.id))
      .reduce((sum, a) => sum + a.weeks, 0);
    const core = type.weeks * scale.mult + addonWeeks;
    // present as a range rather than false precision
    return { low: Math.max(2, Math.round(core * 0.85)), high: Math.round(core * 1.25), base: type.base };
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

  /* hero intro */
  useEffect(() => {
    const targets = rootRef.current.querySelectorAll(".sv2-hero-reveal");
    targets.forEach((t, i) => {
      t.style.transitionDelay = `${0.15 + i * 0.09}s`;
      requestAnimationFrame(() => t.classList.add("is-in"));
    });
  }, []);

  /* reveal-on-enter — IntersectionObserver, no stale cached scroll positions */
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
      ".sd2-inc", ".sd2-est", ".sd2-work-card", ".v2-method-row",
      ".sd2-problem", ".sd2-case", ".sd2-bench", ".sd2-hand", ".sd2-quote",
      ".sd2-other", ".v2-principle", ".v2-faq-item", ".v2-cta", ".v2-strip",
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

  /* magnetic buttons + card tilt — pointer devices only */
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
            <a href="/preview-v2#work">Work</a>
            <a href="/services-v2">Services</a>
            <a href="#included">Included</a>
            <a href="#estimate">Estimate</a>
            <a href="#handover">Handover</a>
            <a href="/contact">Contact</a>
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

      <div className={`v2-drawer ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="v2-drawer-links">
          {[
            { label: "Work", href: "/preview-v2#work" },
            { label: "Services", href: "/services-v2" },
            { label: "Included", href: "#included" },
            { label: "Estimate", href: "#estimate" },
            { label: "Handover", href: "#handover" },
            { label: "Contact", href: "/contact" },
          ].map((l, i) => (
            <a key={l.label} href={l.href}
              style={{ transitionDelay: `${0.08 + i * 0.05}s` }}
              onClick={() => setMobileOpen(false)}>
              <span className="v2-drawer-index">{String(i + 1).padStart(2, "0")}</span>
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <a href="/services-v2">Services</a>
            <span>/</span>
            <em>Web Development</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Service 01 · Web Development</span>
              </div>
              <h1 className="sd2-hero-title sv2-hero-reveal">
                Websites that are<br />
                <span className="v2-hero-accent">fast, findable, and yours.</span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                We build high-performance websites and web applications with clean,
                hand-written code — designed to convert visitors into customers, and
                handed over with full source-code ownership.
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
        <p className="v2-lede">
          If you recognise two or three of these, a rebuild will pay for itself
          faster than another round of patches.
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

      {/* ══════════ 3 · WHAT'S INCLUDED ══════════ */}
      <section className="v2-section" id="included">
        <p className="v2-label">What's Included</p>
        <h2 className="v2-heading">Every build ships with all of this.</h2>
        <p className="v2-lede">
          Not an upsell list — this is the baseline on every web project we take,
          whatever the size.
        </p>
        <div className="sd2-inc-grid">
          {INCLUDED.map((it) => (
            <article className="sd2-inc" key={it.title}>
              <span className="sd2-inc-icon"><it.icon size={19} strokeWidth={1.5} /></span>
              <h3 className="sd2-inc-title">{it.title}</h3>
              <p className="sd2-inc-body">{it.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 4 · WHO IT'S FOR ══════════ */}
      <section className="v2-section v2-section--void" id="for">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">Who It's For</p>
            <h2 className="v2-heading">Built for how your sector actually operates.</h2>
          </div>
          <p className="v2-lede">
            The stack and the structure change depending on who's using the site
            and what they came to do.
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

      {/* ══════════ 5 · INTERACTIVE ESTIMATOR — the standout ══════════ */}
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

            {/* live readout */}
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
                <li><Check size={13} strokeWidth={2.4} /> Design + build + QA included</li>
                <li><Check size={13} strokeWidth={2.4} /> Fixed price once scoped</li>
                <li><Check size={13} strokeWidth={2.4} /> Full source-code handover</li>
              </ul>
              <a className="v2-btn" href="/contact">Get an exact quote →</a>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════ 4 · PROCESS ══════════ */}
      <section className="v2-method-shell" id="process">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">How A Build Runs.</h2>
          <p className="v2-method-lede">
            Six stages from first call to live site — nothing advances until the
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
        <h2 className="v2-heading">The numbers we hold ourselves to.</h2>
        <p className="v2-lede">
          Every build is measured against these before it's allowed to ship —
          not aspirations, gates.
        </p>
        <div className="sd2-bench-grid">
          {BENCHMARKS.map((b) => (
            <div className="sd2-bench" key={b.label}>
              <div className="sd2-bench-num">
                <span className="sd2-bench-value" data-target={b.value}>0</span>
                <span className="sd2-bench-suffix">{b.suffix}</span>
              </div>
              <div className="sd2-bench-label">{b.label}</div>
              <div className="sd2-bench-note">{b.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 8 · TECH ══════════ */}
      <section className="v2-section v2-tech" id="stack">
        <div className="v2-tech-head">
          <div>
            <p className="v2-label">The Web Stack</p>
            <h2 className="v2-heading">What we build websites with.</h2>
          </div>
          <p className="v2-lede">
            Chosen per project, not by habit — the right tool for your scale,
            your team, and what you'll need to maintain.
          </p>
        </div>
        <div className="v2-tech-grid">
          {WEB_STACK.map((t) => (
            <div className="v2-tech-item" key={t.name}>
              <img src={t.src} alt={t.name} loading="lazy" />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 9 · HANDOVER ══════════ */}
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
        {/* styled as an actual handover document — header, itemised body,
            sign-off footer — rather than a plain list */}
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

      {/* ══════════ 10 · RELATED WORK ══════════ */}
      <section className="v2-section v2-section--void" id="work">
        <p className="v2-label">Related Work</p>
        <h2 className="v2-heading">Web builds we've shipped.</h2>
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

      {/* ══════════ 12 · CLIENT STRIP ══════════ */}
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

      {/* ══════════ 8 · PRINCIPLES ══════════ */}
      <section className="v2-section" id="principles">
        <p className="v2-label">Our Principles</p>
        <h2 className="v2-heading">Three commitments that govern every project.</h2>
        <div style={{ marginTop: 44 }}>
          {PRINCIPLES.map((p) => (
            <div className="v2-principle" key={p.key}>
              <div className="v2-principle-key">
                <p.icon size={15} strokeWidth={1.7} style={{ marginRight: 8, verticalAlign: "-2px" }} />
                {p.key}
              </div>
              <div className="v2-principle-claim">{p.claim}</div>
              <div className="v2-principle-body">{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 9 · FAQ ══════════ */}
      <section className="v2-section v2-section--void" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Web development questions.</h2>
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

      {/* ══════════ 16 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll tell you how we'd build it.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your site — your users, your goals,
            your constraints. We scope what should be built first, what can wait,
            and what it takes to ship it.
          </p>
          <a className="v2-btn" href="/contact">Book a consultation →</a>
          <p className="v2-cta-footnote">Free consultation · NDA on request · No obligation</p>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="v2-footer">
        <div className="v2-footer-grid">
          <div className="v2-footer-col">
            <h5>Info</h5>
            <a href="/">Codelix</a>
            <a href="/work">Work</a>
            <a href="/about">About</a>
            <a href="/services-v2">Services</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="v2-footer-col">
            <h5>Services</h5>
            <a href="/services/web-development">Web Development</a>
            <a href="/services/application-development">Application Development</a>
            <a href="/services/ui-ux-design">UI/UX Design</a>
            <a href="/services/e-commerce-solutions">E-Commerce Solutions</a>
            <a href="/services/custom-software-development">Custom Software</a>
            <a href="/services/ai-development">AI Development</a>
          </div>
          <div className="v2-footer-col">
            <h5>Social</h5>
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div className="v2-footer-col">
            <h5>Contact</h5>
            <a href="mailto:Sales@codelixitsolutions.com">Sales@codelixitsolutions.com</a>
            <a href="tel:+919429269295">+91 94292 69295</a>
            <a href="tel:+917490909686">+91 74909 09686</a>
            <a className="v2-footer-address"
              href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.0095811,72.5203036,17z"
              target="_blank" rel="noopener noreferrer">
              A-1308, PNTC — Times Of India Press Road, Vejalpur, Ahmedabad, Gujarat — 380015
            </a>
          </div>
        </div>
        <div className="v2-footer-bottom">
          <span>© 2026 Codelix IT Solutions — All Copyright Reserved</span>
          <div className="v2-footer-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of service</a>
          </div>
        </div>
        <div className="v2-footer-wordmark" aria-hidden="true">CODELIX</div>
      </footer>
    </div>
  );
}
