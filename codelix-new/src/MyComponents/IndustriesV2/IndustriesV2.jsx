import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import { ShieldCheck, Gauge, Eye } from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./IndustriesV2.css";
import NavbarV2 from "../Shared/NavbarV2";
import { INDUSTRIES } from "./industriesData";
import IndustryHeroVisual from "./IndustryHeroVisual";
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import ClientStrip from '../Shared/ClientStrip';
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";

const APPROACH = [
  { icon: Eye, claim: "We learn the domain, not just the brief.", body: "Before we design a single screen, we understand the regulations, the buyer behaviour, and the operational constraints specific to your sector." },
  { icon: ShieldCheck, claim: "Compliance is a requirement, not a checkbox.", body: "Data handling, accessibility, and privacy get designed in from day one for the sectors where getting it wrong actually costs you." },
  { icon: Gauge, claim: "Faster onboarding, fewer surprises.", body: "Sector context means fewer rounds of 'actually, in our industry...' — we ask the right questions earlier." },
];

const STATS = [
  { value: 11, suffix: "", label: "Industries served", note: "Not spread thin across dozens", ring: 78 },
  { value: 40, suffix: "+", label: "Projects across sectors", note: "Real deployments, not pilots", ring: 92 },
];

const FAQS = [
  { q: "We're not in one of the industries listed — can you still help?", a: "Almost certainly. These are the sectors we have the deepest repeat experience in, not a hard boundary. Tell us what you're building and we'll tell you honestly if it's a fit." },
  { q: "Do you handle industry-specific compliance requirements?", a: "We design with privacy and accessibility as requirements for regulated sectors like healthcare and finance. For specific certifications your business needs (HIPAA, PCI-DSS, etc.), we'll work with your compliance team rather than claim expertise we'd need to verify case by case." },
  { q: "Does industry experience change your pricing?", a: "No — pricing is based on scope and complexity, the same estimator and process regardless of sector." },
];

export default function IndustriesV2() {




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
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".ind-hero-visual-wrapper.sv2-hero-reveal"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2 }, "-=.7");
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
      ".ind-scroll-shell", ".sd2-tenet", ".sd2-bench", ".v2-faq-item", ".v2-strip", ".v2-cta",
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
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main ind-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <em>Industries</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Eleven sectors, real repeat experience</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Built for how</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">your sector actually operates.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                The stack, the compliance posture, and the structure change
                depending on who's using the site and what they came to do.
                Here's where we have the deepest repeat experience.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Talk about your sector</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                <a className="v2-hero-secondary" href="#industries">
                  <span className="v2-hero-secondary-label">Browse industries</span>
                </a>
              </div>
            </div>
            <div className="ind-hero-visual-wrapper sv2-hero-reveal">
              <IndustryHeroVisual />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · INDUSTRIES — scroll-driven sticky reveal
          (the extraordinary section): each card is its own position:sticky
          element with a progressively larger "top" offset, so as the
          reader scrolls, each next card physically slides up and covers
          the one before it — only that earlier card's number tab still
          peeks out above. Pure CSS stacking, no scroll-position JS at all. ══════════ */}
      <section className="v2-section" id="industries">
        <div className="ind-scroll-shell">
          <div className="ind-scroll-left">
            <p className="v2-label">Industries We Serve</p>
            <h2 className="v2-heading">Eleven sectors. Different problems, different builds.</h2>
            <p className="v2-lede">
              Not a generic template reskinned across sectors — each one has
              different constraints, and we design around the ones that matter.
            </p>
            <ul className="ind-scroll-points">
              <li>Sector-specific compliance designed in, not bolted on</li>
              <li>Real repeat experience, not a first attempt at your industry</li>
              <li>Faster onboarding — fewer "actually, in our industry…" surprises</li>
              <li>Same process and pricing, tuned per sector</li>
            </ul>
            <Link className="v2-btn v2-btn--filled" to="/contact">
              <span>Talk about your sector</span>
              <i className="v2-btn-arrow">→</i>
            </Link>
          </div>

          <div className="ind-scroll-right">
            <div className="ind-scroll-stack">
              {INDUSTRIES.map((it, i) => (
                <article
                  className="ind-scroll-card"
                  style={{ top: `120px`, zIndex: i + 1 }}
                  key={it.title}
                >
                  <div
                    className="ind-scroll-card-tab"
                    style={{
                      width: `calc(100% / ${INDUSTRIES.length})`,
                      marginLeft: `calc(100% / ${INDUSTRIES.length} * ${i})`,
                    }}
                  >
                    <span className="ind-scroll-card-n">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="ind-scroll-card-body">
                    <span className="ind-panel-icon"><it.icon size={22} strokeWidth={1.4} /></span>
                    <h3 className="ind-panel-title">{it.title}</h3>
                    <p className="ind-panel-tagline">{it.tagline}</p>
                    <div className="ind-panel-cols">
                      <div>
                        <span className="ind-panel-sub">What we see a lot</span>
                        <ul className="ind-panel-challenges">
                          {it.challenges.map((c) => <li key={c}>{c}</li>)}
                        </ul>
                      </div>
                      <div>
                        <span className="ind-panel-sub">What we deliver</span>
                        <p className="ind-panel-body">{it.body}</p>
                        <div className="ind-panel-services">
                          {it.services.map((s) => <span key={s}>{s}</span>)}
                        </div>
                      </div>
                    </div>
                    <Link className="ind-panel-more" to={`/industries/${it.slug}`}>
                      Explore {it.title} →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* mobile — a plain stacked list instead of the sticky/scroll trick,
            which doesn't translate to a short viewport */}
        <div className="ind-mobile-stack">
          {INDUSTRIES.map((it, i) => (
            <article className="ind-mobile-card" key={it.title}>
              <div className="ind-mobile-card-top">
                <span className="ind-panel-icon"><it.icon size={22} strokeWidth={1.4} /></span>
                <span className="ind-mobile-n">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="ind-panel-title">{it.title}</h3>
              <p className="ind-panel-tagline">{it.tagline}</p>
              {/* the desktop panel puts these two blocks in separate
                  columns under their own headings; stacked on mobile they
                  need the same headings or the bullets read as one
                  continuous run of text with the paragraph below */}
              <span className="ind-panel-sub">What we see a lot</span>
              <ul className="ind-panel-challenges">
                {it.challenges.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <span className="ind-panel-sub">What we deliver</span>
              <p className="ind-panel-body">{it.body}</p>
              <div className="ind-panel-services">
                {it.services.map((s) => <span key={s}>{s}</span>)}
              </div>
              <Link className="ind-panel-more" to={`/industries/${it.slug}`}>
                Explore {it.title} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 3 · OUR APPROACH ══════════ */}
      <section className="v2-section" id="approach">
        <p className="v2-label">Our Approach</p>
        <h2 className="v2-heading">Why sector experience actually matters.</h2>
        <div className="sd2-tenet-grid">
          {APPROACH.map((p, i) => (
            <article className="sd2-tenet" key={p.claim}>
              <span className="sd2-tenet-shine" aria-hidden="true" />
              <div className="sd2-tenet-top">
                <span className="sd2-tenet-icon"><p.icon size={20} strokeWidth={1.5} /></span>
                <span className="sd2-tenet-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="sd2-tenet-claim">{p.claim}</h3>
              <p className="sd2-tenet-body">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 4 · STATS ══════════ */}
      <section className="v2-section v2-section--void" id="stats">
        <p className="v2-label">Across Sectors</p>
        <h2 className="v2-heading">Depth, not a scattershot client list.</h2>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Codelix, across industries</span>
            <span className="sd2-bench-bar-meta">Updated 2026</span>
          </div>
          <div className="sd2-bench-grid ind-stats-grid">
            {STATS.map((b, i) => {
              const R = 52;
              const C = 2 * Math.PI * R;
              const offset = C - (C * b.ring) / 100;
              return (
                <div className="sd2-bench" key={b.label}>
                  <div className="sd2-bench-ring">
                    <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                      <defs>
                        <linearGradient id={`ind-bench-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#ind-bench-grad-${i})`}
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

      {/* ══════════ 6 · CLIENT STRIP ══════════ */}
      <ClientStrip />

      {/* ══════════ 7 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us your sector.<br />We'll tell you what actually matters.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your industry's real constraints —
            not a generic pitch reused across every client.
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
