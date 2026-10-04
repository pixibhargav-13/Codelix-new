import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe, Smartphone, PenTool, ShoppingCart, Code2, Sparkles, BarChart3,
  CalendarCheck, Lock, Eye, Receipt, Users, LifeBuoy, Clock,
} from "lucide-react";

/* the v2 design system + the shared tech-stack data live with the homepage —
   importing them here keeps both pages on one source of truth instead of a
   drifting copy */

import "../HomepageV2/HomepageV2.css";

import { TECH_STACK } from "../HomepageV2/techStack";
import codelixLogo from "../Images/codelix-logo.webp";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "./ServicesV2.css";
import GoogleReviewButton from "../Shared/GoogleReviewButton";
import ClutchWidget from "../Shared/ClutchWidget";
import ServicesHeroVisual from "./ServicesHeroVisual";
import NavbarV2 from "../Shared/NavbarV2";
import FooterV2 from "../Shared/FooterV2";
import ScrollSentence from '../Shared/ScrollSentence';
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import ClientStrip from '../Shared/ClientStrip';


/* how delivery actually runs — the question every services page has to answer
   right after "what do you do". Same six stages as the live site's HowWeWork. */
const METHOD = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We start by figuring out exactly what we're solving. We look at your users, your competitors, and strip back the feature list to what actually matters." },
  { n: "02", title: "Scoping", time: "3–5 days", body: "We draw up a hard plan. Clear milestones, firm timelines, and a locked-in scope so there are no surprises once the clock starts." },
  { n: "03", title: "Design", time: "1–2 weeks", body: "We design the interface to be obvious and usable first, then layer on your brand. We don't just build what we think looks cool." },
  { n: "04", title: "Development", time: "2–8 weeks", body: "We build in short cycles and show you working software early and often. If something needs to pivot, we catch it in week two, not week ten." },
  { n: "05", title: "QA & Testing", time: "1–2 weeks", body: "We break it before your users do. We test across devices, browsers, and edge cases to make sure it holds up in the real world." },
  { n: "06", title: "Launch & Support", time: "Ongoing", body: "We push it live and stick around. We handle the handoff, the documentation, and the post-launch fixes so you're not left stranded." },
];

/* headline numbers — value is the count-up target, suffix rides along */
const STATS = [
  { value: 40, suffix: "+", label: "Projects delivered", icon: Sparkles },
  { value: 8, suffix: "", label: "Core services", icon: Code2 },
  { value: 24, suffix: "h", label: "Response time", icon: Clock },
];

/* real service copy, lifted from the live site's WhatWeProvide.jsx, with the
   per-service capability lists expanded for a dedicated services page */
const SERVICES = [
  {
    n: "01",
    icon: Globe,
    title: "Web Development",
    body: "We build modern websites and web applications tailored to your business needs — not just another template with your logo on it.",
    path: "/services/web-development",
    capabilities: [
      { label: "Performance Optimization", path: "/services/performance-optimization" }
    ],
  },
  {
    n: "02",
    icon: Smartphone,
    title: "Application Development",
    body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch — no cookie-cutter builders, no shortcuts on performance or security.",
    path: "/services/application-development",
    capabilities: [
      { label: "SaaS Product Development", path: "/services/saas-product-development" }
    ],
  },
  {
    n: "03",
    icon: PenTool,
    title: "UI/UX & Product Design",
    body: "User-centered design services including UX research, wireframes, prototypes, interface design, design systems, and accessibility optimization.",
    path: "/services/ui-ux-design",
    capabilities: [
      { label: "UX Research & Design Systems", path: "/services/ux-research-design-systems" }
    ],
  },
  {
    n: "04",
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    body: "Custom online stores, B2B commerce platforms, marketplaces, payment integrations, and e-commerce growth optimization.",
    path: "/services/e-commerce-solutions",
    capabilities: [
      { label: "Marketplace Development", path: "/services/marketplace-development" },
      { label: "Payment Integration Services", path: "/services/payment-integration-services" }
    ],
  },
  {
    n: "05",
    icon: Code2,
    title: "Enterprise Software Solutions",
    body: "Business software development including ERP, CRM, workflow automation, legacy system modernization, and enterprise integrations.",
    path: "/services/custom-software-development",
    capabilities: [
      { label: "ERP & CRM Development", path: "/services/erp-crm-development" },
      { label: "API Development & Integration", path: "/services/api-development-integration" },
      { label: "Legacy System Modernization", path: "/services/legacy-system-modernization" }
    ],
  },
  {
    n: "06",
    icon: Sparkles,
    title: "AI & Automation Solutions",
    body: "AI agents, chatbots, generative AI applications, workflow automation, and AI consulting to improve productivity and customer experience.",
    path: "/services/ai-development",
    capabilities: [
      { label: "AI Agent Development", path: "/services/ai-agent-development" },
      { label: "Generative AI Solutions", path: "/services/generative-ai-solutions" },
      { label: "Workflow Automation", path: "/services/workflow-automation" }
    ],
  },
  {
    n: "07",
    icon: BarChart3,
    title: "Data Analytics & Business Intelligence",
    body: "Dashboards, reporting, data visualization, predictive analytics, data engineering, and business intelligence solutions.",
    path: "/services/data-analytics",
    capabilities: [
      { label: "Business Intelligence Solutions", path: "/services/business-intelligence-solutions" },
      { label: "Predictive Analytics", path: "/services/predictive-analytics" },
      { label: "Data Engineering", path: "/services/data-engineering" }
    ],
  },
  {
    n: "08",
    icon: LifeBuoy,
    title: "Support & Managed Services",
    body: "Ongoing maintenance, technical support, performance optimization, security updates, and dedicated development team augmentation.",
    path: "/services/support-managed-services",
    capabilities: [
      { label: "Cloud Solutions & Migration", path: "/services/cloud-solutions-migration" },
      { label: "Cloud Infrastructure Services", path: "/services/cloud-infrastructure-services" },
      { label: "Security & Maintenance", path: "/services/security-maintenance" },
      { label: "Dedicated Development Teams", path: "/services/dedicated-development-teams" }
    ],
  },
];

const ENGAGEMENTS = [
  {
    n: "01",
    icon: Receipt,
    key: "Fixed scope",
    claim: "You know the number before we start.",
    body: "You tell us what you need, we quote it, and that's the price. No creeping invoices, no surprise add-ons halfway through.",
  },
  {
    n: "02",
    icon: Users,
    key: "Dedicated team",
    claim: "Engineers who work only on you.",
    body: "A small team on a monthly rate, working your priorities. You scale them up when things get busy, scale them down when they don't.",
  },
  {
    n: "03",
    icon: LifeBuoy,
    key: "Support retainer",
    claim: "We stay on after launch.",
    body: "Once you're live, we keep an eye on things. Bug fixes, small improvements, monitoring — all on a predictable monthly plan.",
  },
];

const PRINCIPLES = [
  { key: "Delivered", icon: CalendarCheck, claim: "No deadline we don't hold ourselves to.", body: "We pad the schedule honestly upfront so we don't have to renegotiate halfway through. If we say a date, we hit it." },
  { key: "Visible", icon: Eye, claim: "No progress you can't see.", body: "We don't go dark for a month and come back with a surprise. You see the work as it happens, so we can course-correct early." },
];

const FAQS = [
  { q: "Which service is right for my project?", a: "Honestly, most projects use two or three of these together. If you're not sure where you land, just tell us what you're trying to build and we'll point you in the right direction." },
  { q: "Can you take over an existing project?", a: "Yes, we do it all the time. We'll audit the codebase first so you know exactly what shape it's in before we touch anything." },
  { q: "How do you price a project?", a: "Fixed-scope work gets a firm quote upfront. Teams and retainers are billed monthly. Either way, you'll see a detailed breakdown with milestones before anything kicks off." },
  { q: "Do you offer support after launch?", a: "Yes. Every project comes with a post-launch support window, and we offer ongoing retainers if you want us to keep maintaining and improving things." },
  { q: "Can you sign an NDA before starting the project?", a: "Absolutely. We're happy to sign an NDA before we even start talking details." },
];

const SENTENCE = [
  "PICK A SERVICE.",
  "OR DON'T.",
  "TELL US THE PROBLEM.",
  "WE'LL SCOPE THE FIX.",
  "THEN BUILD IT.",
];

/* smootherstep — softens both ends of the scrubbed motion */
const ease = (p) => p * p * p * (p * (p * 6 - 15) + 10);

/* Tall sticky block that shows ONE line at a time, scrubbed to scroll —
   the same signature moment used on the homepage. */

export default function ServicesV2() {
  
  
  
  const [svcActive, setSvcActive] = useState(0);

  const rootRef = useRef(null);

  /* on mobile, tapping a service scrolls its row to sit just below the
     sticky ".v2-method-head" instead of leaving the expanded answer to
     open off-screen above or below the visible area. Deferred by 480ms —
     the previously-open row's accordion body takes 450ms to collapse, and
     scrolling before that settles meant the collapse shifted the whole
     list upward afterward, dragging the target row back behind the
     sticky header. */
  const scrollServiceIntoView = (el) => {
    if (window.innerWidth > 900 || !el) return;
    window.setTimeout(() => {
      const head = rootRef.current.querySelector("#services .v2-method-head");
      const headH = head ? head.getBoundingClientRect().height : 0;
      const rect = el.getBoundingClientRect();
      const target = window.scrollY + rect.top - headH - 8;
      window.scrollTo({ top: target, behavior: "smooth" });
    }, 480);
  };

  

  

  /* sticky heading bands only show their bottom rule once actually stuck */
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

  /* hero intro */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const targets = el.querySelectorAll(".sv2-hero-reveal");
    targets.forEach((t, i) => {
      t.style.transitionDelay = `${0.15 + i * 0.09}s`;
      requestAnimationFrame(() => t.classList.add("is-in"));
    });
  }, []);

  /* reveal-on-enter via IntersectionObserver (no cached scroll positions to
     go stale when webfonts/images reflow the page) */
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
      ".sv2-svc-showcase", ".sv2-engagement", ".sv2-tenet", ".sv2-stat-card", ".v2-method-row", ".v2-faq-item",
      ".v2-cta", ".v2-strip", ".v2-heading", ".v2-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* damped top scroll-progress bar */
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

  /* stat numbers count up from 0 → target the first time they scroll in */
  useEffect(() => {
    const nums = rootRef.current.querySelectorAll(".v2-stat-value");
    if (!nums.length) return;
    const runCount = (el) => {
      const target = Number(el.dataset.target);
      const dur = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(target * eased).toString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          runCount(e.target);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -12% 0px" }
    );
    nums.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* magnetic buttons — pointer devices only */
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const magnets = Array.from(rootRef.current.querySelectorAll(".v2-btn"));
    const handlers = magnets.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${mx * 0.28}px, ${my * 0.34}px)`;
      };
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return { el, move, leave };
    });
    return () => handlers.forEach(({ el, move, leave }) => {
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
      <header className="sv2-hero">
        <div className="sv2-hero-inner">
          <div className="sv2-hero-main">
            <div className="sv2-hero-left">
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Seven services · One delivery standard</span>
              </div>
              <h1 className="sv2-hero-title sv2-hero-reveal">
                Everything we build,<br />
                <span className="v2-hero-accent">and how we build it.</span>
              </h1>
              <p className="sv2-hero-sub sv2-hero-reveal">
                Whether it's a landing page or a full platform — we handle web, mobile, design,
                e-commerce, custom software, AI, and data analytics. Same team, same process,
                same handoff every time.
              </p>
              <div className="sv2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Get a free quote</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                <a className="v2-hero-secondary" href="#services">
                  <span className="v2-hero-secondary-label">Browse services</span>
                </a>
              </div>
            </div>
            
            <div className="sv2-hero-right sv2-hero-reveal">
              <ServicesHeroVisual />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · SERVICES ══════════ */}
      <section className="v2-method-shell" id="services">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">What We Provide.</h2>
          <p className="v2-method-lede">
            Seven things we do well. Most projects use a few of them together.
          </p>
        </div>
        <div className="sv2-svc-showcase">
          <div className="sv2-svc-nav" role="tablist" aria-label="What we provide">
            <span
              className="sv2-svc-nav-indicator"
              style={{ transform: `translateY(${svcActive * 100}%)` }}
              aria-hidden="true"
            />
            {SERVICES.map((s, i) => (
              <div className="sv2-svc-navitem" key={s.n}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={svcActive === i}
                  className={`sv2-svc-tab ${svcActive === i ? "is-active" : ""}`}
                  onMouseEnter={() => setSvcActive(i)}
                  onFocus={() => setSvcActive(i)}
                  onClick={(e) => {
                    setSvcActive(i);
                    scrollServiceIntoView(e.currentTarget);
                  }}
                >
                  <span className="sv2-svc-tab-n">{s.n}</span>
                  <span className="sv2-svc-tab-title">{s.title}</span>
                  <span className="sv2-svc-tab-icon"><s.icon size={16} strokeWidth={1.6} /></span>
                </button>
                {/* mobile-only accordion body — desktop shows the side stage instead */}
                <div className={`sv2-svc-mobile-body ${svcActive === i ? "is-open" : ""}`}>
                  <div className="sv2-svc-mobile-body-inner">
                    <p className="sv2-svc-mobile-body-text">{s.body}</p>
                    <ul className="sv2-caps sv2-svc-mobile-caps">
                      {s.capabilities.map((c) => (
                        <li key={c.label}>
                          {c.path ? (
                            <Link to={c.path} style={{ color: "inherit", textDecoration: "none" }}>{c.label}</Link>
                          ) : (
                            c.label
                          )}
                        </li>
                      ))}
                    </ul>
                    <Link className="sv2-service-link" to={s.path}>
                      <span>Explore</span>
                      <i>→</i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sv2-svc-stage">
            {SERVICES.map((s, i) => (
              <div
                className={`sv2-svc-panel ${svcActive === i ? "is-active" : ""}`}
                aria-hidden={svcActive !== i}
                key={s.n}
              >
                <span className="sv2-svc-panel-glow" aria-hidden="true" />
                <span className="sv2-svc-panel-n" aria-hidden="true">{s.n}</span>
                <span className="sv2-svc-panel-icon"><s.icon size={36} strokeWidth={1.2} /></span>
                <h3 className="sv2-svc-panel-title">{s.title}</h3>
                <p className="sv2-svc-panel-body">{s.body}</p>
                <ul className="sv2-caps sv2-svc-panel-caps">
                  {s.capabilities.map((c) => (
                    <li key={c.label}>
                      {c.path ? (
                        <Link to={c.path} style={{ color: "inherit", textDecoration: "none" }}>{c.label}</Link>
                      ) : (
                        c.label
                      )}
                    </li>
                  ))}
                </ul>
                <Link className="sv2-service-link sv2-service-link--panel" to={s.path}>
                  <i>
                    <svg className="sv2-svc-link-arrow" viewBox="0 0 34 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M0 7H32M32 7L26 1M32 7L26 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </i>
                  <span>Explore</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3 · SCROLL SENTENCE ══════════ */}
      <ScrollSentence words={SENTENCE} tone="dark" />

      {/* ══════════ 3b · HOW WE DELIVER — sticky header, numbered rows ══════════ */}
      <section className="v2-method-shell" id="method">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">How We Deliver.</h2>
          <p className="v2-method-lede">
            Same six steps regardless of the service. Each one gets signed off
            before the next one starts.
          </p>
        </div>
        <div className="v2-method-rows">
          {METHOD.map((m) => (
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

      {/* ══════════ 3c · CLIENT PROOF + STATS ══════════ */}
      <ClientStrip />

      <section className="v2-section sv2-stats-band">
        <div className="sv2-stats-grid">
          {STATS.map((s) => (
            <div className="sv2-stat-card" key={s.label}>
              <span className="sv2-stat-icon"><s.icon size={18} strokeWidth={1.6} /></span>
              <div className="v2-stat-num">
                <span className="v2-stat-value" data-target={s.value}>0</span>
                <span className="v2-stat-suffix">{s.suffix}</span>
              </div>
              <div className="v2-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 4 · ENGAGEMENT MODELS ══════════ */}
      <section className="v2-section v2-section--void sv2-engagements" id="engagements">
        <div className="sv2-engagements-head">
          <div>
            <p className="v2-label">How We Work</p>
            <h2 className="v2-heading">Three ways to work with us.</h2>
          </div>
          <p className="v2-lede">
            Same team, same quality. The only difference is how we scope the work
            and send the invoice.
          </p>
        </div>
        <div className="sv2-engagements-grid">
          {ENGAGEMENTS.map((p) => (
            <article className="sv2-engagement" key={p.key}>
              <div className="sv2-engagement-top">
                <span className="sv2-engagement-n">{p.n}</span>
                <span className="sv2-engagement-icon">
                  <p.icon size={20} strokeWidth={1.5} />
                </span>
              </div>
              <p className="sv2-engagement-key">{p.key}</p>
              <h3 className="sv2-engagement-claim">{p.claim}</h3>
              <p className="sv2-engagement-body">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 5 · TECH STACK ══════════ */}
      <section className="v2-section v2-tech" id="stack">
        <div className="v2-tech-head">
          <div>
            <p className="v2-label">The Stack</p>
            <h2 className="v2-heading">Tools we've shipped with, not just tried.</h2>
          </div>
          <p className="v2-lede">
            We don't test new frameworks on your project. Everything here has been
            through production on real client work.
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

      {/* ══════════ 6 · PRINCIPLES ══════════ */}
      <section className="v2-section" id="principles">
        <p className="v2-label">Our Principles</p>
        <h2 className="v2-heading">Three things we don't bend on.</h2>
        <div className="sv2-tenet-grid">
          {PRINCIPLES.map((p, i) => (
            <article className="sv2-tenet" key={p.key}>
              <span className="sv2-tenet-shine" aria-hidden="true" />
              <div className="sv2-tenet-top">
                <span className="sv2-tenet-icon"><p.icon size={20} strokeWidth={1.5} /></span>
                <span className="sv2-tenet-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="sv2-tenet-claim">{p.claim}</h3>
              <p className="sv2-tenet-body">{p.body}</p>
              <span className="sv2-tenet-tag">{p.key}</span>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 7 · FAQ ══════════ */}
      <FaqSection faqs={FAQS} className="v2-section--void" />

      {/* ══════════ 8 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll tell you how we'd build it.
          </h2>
          <p className="v2-cta-body">
            Walk us through what you're working on. We'll figure out what to build first,
            what can wait, and what it'll take to get it live.
          </p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to="/contact">Book a consultation →</Link></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
      </main>

      <FooterV2 />
    </div>
  );
}
