import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import { FileText, Layers, LifeBuoy } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./PricingV2.css";
import NavbarV2 from "../Shared/NavbarV2";
import PricingHeroVisual from "./PricingHeroVisual";
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import ClientStrip from '../Shared/ClientStrip';
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";


/* same real budget bands already used in the live /contact intake form
   (ContactUs.jsx) — not new/invented numbers */
const BASE_ESTIMATES = {
  "Web": ["$1,500 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000"],
  "App": ["$5,000 - $15,000", "$15,000 - $35,000", "Above $35,000"],
  "UI": ["$2,000 - $5,000", "$5,000 - $12,000", "$12,000 - $25,000"],
  "Ecom": ["$3,000 - $8,000", "$8,000 - $20,000", "Above $20,000"],
  "Enterprise": ["$10,000 - $25,000", "$25,000 - $60,000", "Above $60,000"],
  "AI": ["$5,000 - $15,000", "$15,000 - $40,000", "Above $40,000"],
  "Data": ["$4,000 - $10,000", "$10,000 - $25,000", "Above $25,000"],
  "Support": ["$500 - $1,500 / mo", "$1,500 - $4,000 / mo", "Custom Retainer"],
};

/* dynamically generate sorted project types list directly from the shared truth */
const PROJECT_TYPES = FOOTER_ALL_SERVICES.map(s => s.label);

const COMPLEXITY = [
  "Simple (MVP / Foundation)",
  "Standard (Core product / Redesign)",
  "Complex (Scale / Enterprise)",
];

/* ballpark mapping onto those same real bands — explicitly labeled as an
   estimate, not a quote */
const ESTIMATE_MAP = {
  // Web Development Family
  "Web Development": BASE_ESTIMATES["Web"],
  "Performance Optimization": BASE_ESTIMATES["Web"],
  
  // Application Development Family
  "Application Development": BASE_ESTIMATES["App"],
  "SaaS Product Development": BASE_ESTIMATES["App"],
  
  // UI/UX Family
  "UI/UX & Product Design": BASE_ESTIMATES["UI"],
  "UX Research & Design Systems": BASE_ESTIMATES["UI"],
  
  // E-Commerce Family
  "E-Commerce Solutions": BASE_ESTIMATES["Ecom"],
  "Marketplace Development": BASE_ESTIMATES["Ecom"],
  "Payment Integration Services": BASE_ESTIMATES["Ecom"],
  
  // Enterprise Software Family
  "Enterprise Software Solutions": BASE_ESTIMATES["Enterprise"],
  "ERP & CRM Development": BASE_ESTIMATES["Enterprise"],
  "API Development & Integration": BASE_ESTIMATES["Enterprise"],
  "Legacy System Modernization": BASE_ESTIMATES["Enterprise"],
  
  // AI & Automation Family
  "AI & Automation Solutions": BASE_ESTIMATES["AI"],
  "AI Agent Development": BASE_ESTIMATES["AI"],
  "Generative AI Solutions": BASE_ESTIMATES["AI"],
  "Workflow Automation": BASE_ESTIMATES["AI"],
  
  // Data Analytics Family
  "Data Analytics & Business Intelligence": BASE_ESTIMATES["Data"],
  "Business Intelligence Solutions": BASE_ESTIMATES["Data"],
  "Predictive Analytics": BASE_ESTIMATES["Data"],
  "Data Engineering": BASE_ESTIMATES["Data"],
  
  // Support & Managed Services Family
  "Support & Managed Services": BASE_ESTIMATES["Support"],
  "Cloud Solutions & Migration": BASE_ESTIMATES["Support"],
  "Cloud Infrastructure Services": BASE_ESTIMATES["Support"],
  "Security & Maintenance": BASE_ESTIMATES["Support"],
  "Dedicated Development Teams": BASE_ESTIMATES["Support"],
};

/* real engagement structure, grounded in what's already stated on
   HomepageFaq.jsx and ProcessV2 — not invented terms */
const MODELS = [
  { icon: FileText, n: "01", title: "Fixed-Scope Project", body: "A written proposal with scope and price locked before work starts. The proposal you sign is the proposal we build to — no creeping invoices.", best: "Best for a defined project with a clear end point." },
  { icon: Layers, n: "02", title: "Milestone-Based Billing", body: "An upfront deposit, followed by milestone-based instalments as work progresses through each stage — you always know what you're paying for and when.", best: "Best for larger builds delivered in stages." },
  { icon: LifeBuoy, n: "03", title: "Ongoing Maintenance & Support", body: "A maintenance plan after launch covering updates, enhancements, and tech support — for projects that keep evolving after delivery.", best: "Best for products that need continued iteration." },
];

const FAQS = [
  { q: "How does billing work?", a: "After finalising your project scope, we provide a detailed quotation with milestones. Payments are made in phases: an upfront deposit, followed by milestone-based instalments as work progresses." },
  { q: "Does industry experience change your pricing?", a: "No — pricing is based on scope and complexity, the same estimator and process regardless of sector." },
  { q: "What is your cancellation policy?", a: "You can cancel a project at any stage with written notice. Work completed up to the cancellation date is billed accordingly, and any unused payment balance is refunded — see our Refund Policy for the full breakdown." },
  { q: "Is the initial consultation free?", a: "Yes. The discovery call and the written proposal that follows are both free, with no obligation to proceed." },
];

export default function PricingV2() {
  
  
  
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [complexity, setComplexity] = useState(0);

  const rootRef = useRef(null);

  

  

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
      .fromTo(q(".sd2-hero-visual.sv2-hero-reveal"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 }, "-=.7");
    return () => tl.kill();
  }, []);

  /* reveal-on-enter — IntersectionObserver */
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
      ".pv2-estimator", ".sd2-tenet", ".v2-faq-item", ".v2-strip", ".v2-cta",
      ".v2-heading", ".v2-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);



  const estimate = useMemo(() => {
    const bands = ESTIMATE_MAP[projectType];
    if (!bands) {
      console.error("Missing estimate for projectType:", projectType);
      return "TBD";
    }
    return bands[complexity];
  }, [projectType, complexity]);

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
                <em>Pricing</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Scope-based, not a rate card</span>
                <h1 className="v2-hero-eyebrow">Software Development Cost &amp; Pricing in India</h1>
              </div>
              <h2 className="sd2-hero-title">
                <span className="line"><span>How pricing</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">actually works.</span></span>
              </h2>
              <p className="sd2-hero-sub sv2-hero-reveal">
                No public rate card — pricing follows scope and complexity. Get a
                ballpark below, then a written quote after a free scoping call.
              </p>
            </div>
            
            <div className="sd2-hero-visual sv2-hero-reveal">
              <PricingHeroVisual />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · ESTIMATOR — the extraordinary section: picking a
          project type and complexity level maps live onto the same real
          budget bands used in our actual intake form, clearly labeled as a
          ballpark rather than a quote. ══════════ */}
      <section className="v2-section" id="estimator">
        <p className="v2-label">Ballpark Estimator</p>
        <h2 className="v2-heading">What are you building?</h2>
        <p className="v2-lede">
          A rough range based on what similar projects have cost — not a quote.
          Every real number comes after a scoping call.
        </p>

        <div className="pv2-estimator">
          <div className="pv2-estimator-controls">
            <span className="pv2-estimator-label">Project type</span>
            <div className="pv2-chip-row">
              {PROJECT_TYPES.map((t) => (
                <button
                  key={t}
                  className={`pv2-chip ${projectType === t ? "is-active" : ""}`}
                  onClick={() => setProjectType(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <span className="pv2-estimator-label">Complexity</span>
            <div className="pv2-complexity-row">
              {COMPLEXITY.map((c, i) => (
                <button
                  key={c}
                  className={`pv2-complexity ${complexity === i ? "is-active" : ""}`}
                  onClick={() => setComplexity(i)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="pv2-estimator-result">
            <span className="pv2-result-label">Ballpark range</span>
            <div className="pv2-result-value-wrapper" key={estimate}>
              <span className="pv2-result-value">{estimate}</span>
              <span className="pv2-result-approx">Approx.</span>
            </div>
            <p className="pv2-result-note">
              Based on {complexity === 0 ? "a simple" : complexity === 1 ? "a standard" : "a complex"}{" "}
              {projectType.toLowerCase()} project. Your exact quote depends on the specifics we cover
              on a scoping call.
            </p>
            <Link className="v2-btn v2-btn--filled" to="/contact">
              <span>Get a real quote</span>
              <i className="v2-btn-arrow">→</i>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ 3 · ENGAGEMENT MODELS ══════════ */}
      <section className="v2-section v2-section--void" id="models">
        <p className="v2-label">Engagement Models</p>
        <h2 className="v2-heading">Three ways we structure a project.</h2>
        <div className="sd2-tenet-grid">
          {MODELS.map((m) => (
            <article className="sd2-tenet" key={m.n}>
              <span className="sd2-tenet-shine" aria-hidden="true" />
              <div className="sd2-tenet-top">
                <span className="sd2-tenet-icon"><m.icon size={20} strokeWidth={1.5} /></span>
                <span className="sd2-tenet-n" aria-hidden="true">{m.n}</span>
              </div>
              <h3 className="sd2-tenet-claim">{m.title}</h3>
              <p className="sd2-tenet-body">{m.body}</p>
              <span className="sd2-tenet-tag">{m.best}</span>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 4 · FAQ ══════════ */}
      <FaqSection faqs={FAQS} />

      {/* ══════════ 5 · CLIENT STRIP ══════════ */}
      <ClientStrip />

      {/* ══════════ 6 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll tell you what it costs.
          </h2>
          <p className="v2-cta-body">
            A free scoping call and a written proposal — no obligation to proceed.
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
