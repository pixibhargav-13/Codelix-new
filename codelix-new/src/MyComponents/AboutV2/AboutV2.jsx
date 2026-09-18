import { STATIC_TESTIMONIALS } from '../../data/testimonialsData';
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import { useTestimonials } from "../../data/useTestimonials";
import TestimonialSpotlight from "../Shared/TestimonialSpotlight";
import NavbarV2 from "../Shared/NavbarV2";
import ScrollSentence from "../Shared/ScrollSentence";
import CtaSection from "../Shared/CtaSection";
import ClientStrip from "../Shared/ClientStrip";
import {
  Eye, HeartHandshake, ShieldCheck,
  Globe, Smartphone, PenTool, ShoppingCart, Code2, Sparkles,
  Check, Minus, X, BarChart3, LifeBuoy,
} from "lucide-react";

import AboutHeroVisual from "./AboutHeroVisual";

import "../HomepageV2/HomepageV2.css";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./AboutV2.css";
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";



const MISSION_WORDS = [
  "WE BUILD SOFTWARE.",
  "NOT DECKS.",
  "NOT PROMISES.",
  "WORKING SOFTWARE,",
  "OWNED BY YOU.",
];

const STATS = [
  { value: 3, suffix: "+", label: "Years building software", note: "Since day one, same team", ring: 45 },
  { value: 40, suffix: "+", label: "Projects delivered", note: "Across web, mobile & AI", ring: 92 },
  { value: 40, suffix: "+", label: "Clients worldwide", note: "Repeat business, not one-offs", ring: 88 },
  { value: 100, suffix: "%", label: "Source-code ownership", note: "Every project, no exceptions", ring: 100 },
];

const VALUES = [
  { key: "Transparent", icon: Eye, claim: "No progress you can't see.", body: "We don't go dark for a month and come back with a surprise. You see the work as it happens." },
  { key: "Committed", icon: HeartHandshake, claim: "No deadline we don't hold ourselves to.", body: "We pad the schedule honestly upfront so we don't have to renegotiate halfway through. If we say a date, we hit it." },
  { key: "Reliable", icon: ShieldCheck, claim: "No code you don't fully own.", body: "When the invoice is paid, the code is yours. We hand over the repos, the docs, and the keys. No vendor lock-in." },
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

const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services/application-development" },
  { icon: PenTool, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

const PROCESS = [
  { n: "01", title: "Discovery", time: "2–3 days", body: "We work out what actually has to be solved — the constraints, the users, and what can be cut from scope." },
  { n: "02", title: "Scoping", time: "3–5 days", body: "A concrete plan agreed before anything is built, so nothing gets rebuilt later because of a missed assumption." },
  { n: "03", title: "Design & Architecture", time: "1–2 weeks", body: "The technical approach and any interface work, reviewed with you until the direction is signed off." },
  { n: "04", title: "Build", time: "2–8 weeks", body: "Built in short cycles with visible progress — you see it working early and often, not just at the end." },
  { n: "05", title: "QA & Launch", time: "1–2 weeks", body: "Tested against real conditions before it goes live, then deployed with a rollback plan in place." },
  { n: "06", title: "Support", time: "Ongoing", body: "Post-launch fixes, monitoring, and improvements. You keep everything either way." },
];

/* scroll-scrubbed word reveal — same mechanism as the other v2 pages' copy */
const scrollSentenceEase = (p) => p * p * p * (p * (p * 6 - 15) + 10);


export default function AboutV2() {
  const testimonials = useTestimonials(STATIC_TESTIMONIALS);


  const rootRef = useRef(null);

  

  

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

  /* hero intro — masked-line GSAP wipe, matching the other v2 pages */
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
      .fromTo(q(".sd2-hero-visual.sv2-hero-reveal"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2 }, "-=.8");
    return () => tl.kill();
  }, []);

  /* reveal-on-enter — IntersectionObserver, no stale cached scroll positions */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        
          el.classList.add("is-in");
        
        io.unobserve(el);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const sel = [
      ".about-stat", ".sd2-tenet", ".v2-cta", ".v2-strip",
      ".v2-method-row", ".sd2-quote", ".sd2-cmp-row", ".sd2-other",
      ".v2-faq-item",
      ".v2-heading", ".v2-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* stat numbers count up when scrolled in */
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

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      <main>

      

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero about-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <em>About</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Est. 2024 · Ahmedabad</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>A small team that</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">builds like it's theirs.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Codelix is an IT solutions studio that builds web, mobile, and AI
                systems for businesses that intend to still be running them in
                five years. No lock-in, no black boxes — just software you own.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Work with us</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                <a className="v2-hero-secondary" href="#story">
                  <span className="v2-hero-secondary-label">Our story</span>
                </a>
              </div>
            </div>
            
            {/* Right side visual */}
            <div className="sd2-hero-visual sv2-hero-reveal" style={{ display: 'flex', justifyContent: 'center' }}>
              <AboutHeroVisual />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · STATS ══════════ */}
      <section className="v2-section v2-section--void" id="stats">
        <p className="v2-label">By The Numbers</p>
        <h2 className="v2-heading">Six years of shipping, not pitching.</h2>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Codelix, at a glance</span>
            <span className="sd2-bench-bar-meta">Updated 2026</span>
          </div>
          <div className="sd2-bench-grid">
            {STATS.map((b, i) => {
              const R = 52;
              const C = 2 * Math.PI * R;
              const offset = C - (C * b.ring) / 100;
              return (
                <div className="sd2-bench about-stat" key={b.label}>
                  <div className="sd2-bench-ring">
                    <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                      <defs>
                        <linearGradient id={`about-bench-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#about-bench-grad-${i})`}
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

      {/* ══════════ 3b · HOW WE WORK — sticky header, numbered rows ══════════ */}
      <section className="v2-method-shell" id="process">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">How We Work.</h2>
          <p className="v2-method-lede">
            Same six stages regardless of the project — nothing advances until
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

      {/* ══════════ 4 · SCROLL SENTENCE ══════════ */}
      <ScrollSentence words={MISSION_WORDS} tone="dark"  centered={true} />

      {/* ══════════ 5 · VALUES ══════════ */}
      <section className="v2-section" id="values">
        <p className="v2-label">What We Actually Believe</p>
        <h2 className="v2-heading">Three things that don't change per client.</h2>
        <div className="sd2-tenet-grid">
          {VALUES.map((p, i) => (
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

      {/* ══════════ 5b · WHY US vs ALTERNATIVES ══════════ */}
      <section className="v2-section v2-section--void" id="compare">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">Why Us</p>
            <h2 className="v2-heading">Against what you're actually comparing.</h2>
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

      {/* ══════════ 5c · TESTIMONIAL ══════════ */}
      <TestimonialSpotlight
        testimonials={testimonials}
        label="Client Voices"
        heading="What clients say about working with us."
        stats={[
          { num: "40+", label: "Projects delivered" },
          { num: "40+", label: "Clients worldwide" },
          { num: "100%", label: "Source code ownership" },
        ]}
      />

      {/* ══════════ 5e · EXPLORE SERVICES ══════════ */}
      <section className="v2-section" id="other">
        <p className="v2-label">Explore More</p>
        <h2 className="v2-heading">What we build.</h2>
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

      {/* ══════════ 6 · CLIENT STRIP ══════════ */}
      <ClientStrip />

      {/* ══════════ 7 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Same team you meet today<br />builds what you use in year three.
          </h2>
          <p className="v2-cta-body">
            No handoffs to a different team after the sales call. Talk to us
            about what you're building.
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
