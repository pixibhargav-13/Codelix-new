import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import {
  Search, ClipboardList, PenTool, Code2, Bug, Rocket,
  Eye, ShieldCheck, Repeat, X, Check,
} from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./ProcessV2.css";
import ProcessHeroVisual from "./ProcessHeroVisual";
import NavbarV2 from "../Shared/NavbarV2";
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";


/* same six stages already used across the per-service "Process" sections
   and the site-wide METHOD data — expanded here with deliverables per
   stage instead of a new, invented process */
const STAGES = [
  {
    n: "01", icon: Search, title: "Discovery", time: "2–3 days",
    body: "We start by figuring out exactly what we're solving. We look at your users, your competitors, and strip back the feature list to what actually matters.",
    deliverables: ["Goals & constraints summary", "Competitor scan", "Rough scope direction"],
  },
  {
    n: "02", icon: ClipboardList, title: "Scoping", time: "3–5 days",
    body: "We draw up a hard plan. Clear milestones, firm timelines, and a locked-in scope so there are no surprises once the clock starts.",
    deliverables: ["Written proposal", "Fixed scope & price", "Milestone schedule"],
  },
  {
    n: "03", icon: PenTool, title: "Design", time: "1–2 weeks",
    body: "We design the interface to be obvious and usable first, then layer on your brand. We don't just build what we think looks cool — architecture gets decided alongside it.",
    deliverables: ["Wireframes", "High-fidelity UI", "System architecture"],
  },
  {
    n: "04", icon: Code2, title: "Development", time: "2–8 weeks",
    body: "We build in short cycles and show you working software early and often. If something needs to pivot, we catch it in week two, not week ten.",
    deliverables: ["Weekly working builds", "Staging environment", "Progress check-ins"],
  },
  {
    n: "05", icon: Bug, title: "QA & Testing", time: "1–2 weeks",
    body: "We break it before your users do. We test across devices, browsers, and edge cases to make sure it holds up in the real world.",
    deliverables: ["Cross-device QA pass", "Bug fix cycle", "Performance check"],
  },
  {
    n: "06", icon: Rocket, title: "Launch & Support", time: "Ongoing",
    body: "We push it live and stick around. We handle the handoff, the documentation, and the post-launch fixes so you're not left stranded.",
    deliverables: ["Domain & admin access", "User guide", "Post-launch support window"],
  },
];

/* maps directly onto the six stages above — what typically goes wrong
   when a stage gets rushed or skipped, and what we do instead */
const RISKS = [
  { stage: "Discovery", icon: Search, cost: "Building the wrong thing entirely", fix: "We map goals and constraints before any design starts" },
  { stage: "Scoping", icon: ClipboardList, cost: "Scope creep and invoice surprises mid-project", fix: "Fixed scope and price, in writing, before work begins" },
  { stage: "Design", icon: PenTool, cost: "A rebuild disguised as “polish” after development", fix: "Interface and architecture agreed before a line of code is written" },
  { stage: "Development", icon: Code2, cost: "Problems surface in week ten, not week two", fix: "Weekly working builds, so issues get caught early" },
  { stage: "QA & Testing", icon: Bug, cost: "Your users find the bugs instead of us", fix: "Cross-device testing and a fix cycle before anything ships" },
  { stage: "Launch & Support", icon: Rocket, cost: "You're stranded the moment something breaks", fix: "Domain and admin access, a user guide, and a support window after launch" },
];

const PRINCIPLES = [
  { key: "Sequential", icon: Repeat, claim: "Nothing advances until the stage before it is signed off.", body: "We don't design while requirements are still shifting, or build while design is half-finished. Each stage closes before the next opens." },
  { key: "Visible", icon: Eye, claim: "You see it before it's finished, not after.", body: "Weekly check-ins and working builds, not a single reveal at the end. If something needs to change, we catch it early — not after it's expensive to fix." },
  { key: "Accountable", icon: ShieldCheck, claim: "Fixed scope, fixed price, in writing.", body: "The proposal you sign is the proposal we build to. No creeping invoices, no surprise add-ons halfway through." },
];

const STATS = [
  { value: 6, suffix: "", label: "Stages, every project", note: "No stage skipped to save time", ring: 60 },
  { value: 100, suffix: "%", label: "Fixed scope in writing", note: "Before any commitment", ring: 100 },
  { value: 1, suffix: "/wk", label: "Check-in cadence", note: "During active development", ring: 40 },
];

const FAQS = [
  { q: "Does every project go through all six stages?", a: "Yes — the depth varies with project size, but we don't skip stages to move faster. A smaller project moves through them quickly; it doesn't cut them out." },
  { q: "What if my project changes scope midway?", a: "We re-scope openly rather than quietly absorbing the change. You'll see the impact on timeline and price before we proceed, not after." },
  { q: "How involved do I need to be during development?", a: "As involved as you want. At minimum, weekly check-ins on working builds. Some clients want daily visibility; we can accommodate either." },
  { q: "What happens if QA finds something after 'launch'?", a: "Every project includes a post-launch support window specifically for this. It's expected, not an emergency." },
];

export default function ProcessV2() {
  
  
  
  const [showFix, setShowFix] = useState(false);

  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const fillRef = useRef(null);

  

  

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
      .fromTo(q(".sd2-hero-visual.sv2-hero-reveal"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 }, "-=.8");
    return () => tl.kill();
  }, []);

  /* extraordinary section — the vertical line's fill height tracks how far
     the reader has scrolled through the timeline, painted every animation
     frame from live getBoundingClientRect rather than a cached
     ScrollTrigger position (which can go stale if fonts/images reflow the
     page after mount). Each stage node lights up independently via its
     own IntersectionObserver entry below. */
  useEffect(() => {
    const section = timelineRef.current;
    const fill = fillRef.current;
    if (!section || !fill) return;
    let raf = 0;
    const paint = () => {
      const r = section.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const done = total > 0 ? Math.min(Math.max((-r.top + window.innerHeight * 0.5) / total, 0), 1) : 0;
      fill.style.transform = `scaleY(${done})`;
      raf = requestAnimationFrame(paint);
    };
    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
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
      ".proc-stage", ".proc-risk", ".sd2-tenet", ".sd2-bench", ".v2-faq-item", ".v2-strip", ".v2-cta",
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
      <header className="sd2-hero process-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <em>Process</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Six stages, every project</span>
                <h1 className="v2-hero-eyebrow">Our Software Development Process</h1>
              </div>
              <h2 className="sd2-hero-title">
                <span className="line"><span>How we go from</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">message to launch.</span></span>
              </h2>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Same process regardless of the service — a fixed sequence of
                stages, each signed off before the next one starts, so
                nothing gets built on a shifting foundation.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Start a project</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                <a className="v2-hero-secondary" href="#stages">
                  <span className="v2-hero-secondary-label">See the stages</span>
                </a>
              </div>
            </div>
            {/* Visual Column */}
            <div className="sd2-hero-visual sv2-hero-reveal">
              <ProcessHeroVisual />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · STAGES — scroll-filled vertical timeline
          (the extraordinary section) ══════════ */}
      <section className="v2-section" id="stages">
        <p className="v2-label">Our Process</p>
        <h2 className="v2-heading">Six stages. Nothing skipped.</h2>
        <p className="v2-lede">
          Same sequence whether it's a landing page or a full platform — the
          depth changes with project size, the order doesn't.
        </p>

        <div className="proc-timeline" ref={timelineRef}>
          <div className="proc-line" aria-hidden="true">
            <div className="proc-line-fill" ref={fillRef} />
          </div>
          {STAGES.map((s) => (
            <article className="proc-stage" key={s.n}>
              <div className="proc-stage-node">
                <s.icon size={18} strokeWidth={1.7} />
              </div>
              <div className="proc-stage-card">
                <div className="proc-stage-head">
                  <span className="proc-stage-n">{s.n}</span>
                  <h3 className="proc-stage-title">{s.title}</h3>
                  <span className="proc-stage-time">{s.time}</span>
                </div>
                <p className="proc-stage-body">{s.body}</p>
                <div className="proc-stage-foot">
                  <div>
                    <span className="proc-stage-sub">What you get</span>
                    <ul className="proc-stage-deliverables">
                      {s.deliverables.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 2b · THE COST OF SKIPPING A STAGE ══════════ */}
      <section className="v2-section v2-section--void" id="risk">
        <p className="v2-label">The Cost Of Skipping A Stage</p>
        <h2 className="v2-heading">Every shortcut here has a price later.</h2>
        <p className="v2-lede">
          Flip the switch — this is exactly what each stage above is
          actually preventing.
        </p>

        <div className="proc-risk-toggle" role="group" aria-label="Show risk or fix">
          <button
            className={!showFix ? "is-active" : ""}
            onClick={() => setShowFix(false)}
          >
            The risk
          </button>
          <button
            className={showFix ? "is-active" : ""}
            onClick={() => setShowFix(true)}
          >
            Our fix
          </button>
          <span className={`proc-risk-toggle-pill ${showFix ? "is-right" : ""}`} aria-hidden="true" />
        </div>

        <div className={`proc-risk-list ${showFix ? "is-fix" : ""}`}>
          {RISKS.map((r, i) => (
            <article className="proc-risk" key={r.stage} style={{ "--i": i }}>
              {/* Giant background number */}
              <span className="proc-risk-bg-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>

              <div className="proc-risk-stage">
                <span className="proc-risk-stage-icon"><r.icon size={15} /></span>
                {r.stage}
              </div>
              <div className="proc-risk-flip">
                <div className="proc-risk-flip-inner">
                  <div className="proc-risk-face proc-risk-face--cost">
                    <span className="proc-risk-icon proc-risk-icon--x"><X size={18} strokeWidth={2.5} /></span>
                    <p>{r.cost}</p>
                  </div>
                  <div className="proc-risk-face proc-risk-face--fix">
                    <span className="proc-risk-icon proc-risk-icon--check"><Check size={18} strokeWidth={2.5} /></span>
                    <p>{r.fix}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 3 · WHY THIS ORDER MATTERS ══════════ */}
      <section className="v2-section" id="principles">
        <p className="v2-label">Why This Order Matters</p>
        <h2 className="v2-heading">Three rules that hold across every stage.</h2>
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

      {/* ══════════ 4 · STATS ══════════ */}
      <section className="v2-section v2-section--void" id="stats">
        <p className="v2-label">By The Process</p>
        <h2 className="v2-heading">Structure, not guesswork.</h2>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Same process, every project</span>
            <span className="sd2-bench-bar-meta">Updated 2026</span>
          </div>
          <div className="sd2-bench-grid proc-stats-grid">
            {STATS.map((b, i) => {
              const R = 52;
              const C = 2 * Math.PI * R;
              const offset = C - (C * b.ring) / 100;
              return (
                <div className="sd2-bench" key={b.label}>
                  <div className="sd2-bench-ring">
                    <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                      <defs>
                        <linearGradient id={`proc-bench-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#proc-bench-grad-${i})`}
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

      {/* ══════════ 5 · FAQ ══════════ */}
      <FaqSection faqs={FAQS} className="v2-section--void" />

      {/* ══════════ 7 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll tell you which stage comes first.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your project — scoped against
            the same six stages, whichever service it needs.
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
