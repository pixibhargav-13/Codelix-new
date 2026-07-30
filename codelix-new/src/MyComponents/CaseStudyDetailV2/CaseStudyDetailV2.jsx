import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight, X, Check } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./CaseStudyDetailV2.css";

/* real content extracted verbatim from the 15 individual case-study
   components, not new/invented copy — see caseStudiesData.js */
import { CASE_STUDIES } from "./caseStudiesData";
import { PROJECTS } from "../WorkV2/projectsData";

/* the mask-line wipe animation (shared with every other v2 hero) only
   reads correctly when each .line wraps exactly one visual line of text —
   it clips via overflow:hidden and slides the span up by a percentage of
   its own height, so a long title crammed into one .line would animate as
   one clipped blob instead of a clean per-line reveal. Case-study titles
   are long, real, and vary a lot in length, so split each one into two
   roughly-balanced halves by word count instead of hardcoding lines. */
const splitTitle = (title) => {
  const words = title.split(" ");
  if (words.length < 4) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
};

export default function CaseStudyDetailV2() {
  const { slug } = useParams();
  const cs = CASE_STUDIES.find((c) => c.slug === slug);

  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);

  const rootRef = useRef(null);

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

  /* hero intro — masked-line GSAP wipe, matching every other v2 page's
     sd2-hero (same selectors, same timeline shape) */
  useEffect(() => {
    if (!cs) return;
    const q = (s) => rootRef.current.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"),
        { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: .1 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".csd2-tags.sv2-hero-reveal"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .8 }, "-=.7")
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7");
    return () => tl.kill();
  }, [cs]);

  /* reveal-on-enter + stat count-up */
  useEffect(() => {
    if (!cs) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );
    rootRef.current?.querySelectorAll(
      ".csd2-outcomes, .csd2-cs, .csd2-more, .v2-cta, .v2-heading, .v2-label, .v2-lede, .sd2-bench"
    ).forEach((el) => io.observe(el));

    const nums = rootRef.current?.querySelectorAll(".sd2-bench-value") || [];
    const runNum = (el) => {
      const target = Number(el.dataset.target);
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(target * eased).toString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const numIo = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        runNum(e.target);
        numIo.unobserve(e.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -12% 0px" }
    );
    nums.forEach((n) => numIo.observe(n));

    return () => { io.disconnect(); numIo.disconnect(); };
  }, [cs]);

  if (!cs) {
    return (
      <div className="v2" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <h1 style={{ color: "#fff", fontSize: 28 }}>Case study not found.</h1>
        <a className="v2-btn" href="/case-study-v2">Back to Case Studies →</a>
      </div>
    );
  }

  const more = PROJECTS.filter((p) => p.href !== `/${cs.slug}`).slice(0, 3);

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
            <a href="/preview-v2">Homepage V2</a>
            <a href="/services-v2">Services V2</a>
            <a href="/about-v2">About V2</a>
            <a href="/work-v2">Work V2</a>
            <a href="/industries-v2">Industries V2</a>
            <a href="/process-v2">Process V2</a>
            <a href="/contact-v2">Contact V2</a>
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
            { label: "Homepage V2", href: "/preview-v2" },
            { label: "Services V2", href: "/services-v2" },
            { label: "About V2", href: "/about-v2" },
            { label: "Work V2", href: "/work-v2" },
            { label: "Industries V2", href: "/industries-v2" },
            { label: "Process V2", href: "/process-v2" },
            { label: "Contact V2", href: "/contact-v2" },
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

      {/* ══════════ 1 · HERO — same sd2-hero shell as every other v2 page
          (background treatment, mask-line title wipe, status pill, CTA
          row), not a bespoke layout. ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <a href="/case-study-v2">Case Studies</a>
            <span>/</span>
            <em>{cs.title}</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Case Study{cs.isConcept ? " · Concept" : ""}</span>
              </div>
              <h1 className="sd2-hero-title csd2-title">
                {splitTitle(cs.title).map((part, i) => (
                  <span className="line" key={i}><span>{part}</span></span>
                ))}
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">{cs.description}</p>
              <div className="csd2-tags sv2-hero-reveal">
                {cs.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              {cs.isConcept && (
                <p className="csd2-concept-note">
                  This is a concept exploration, not a live client build — shown here honestly as design work, not a deployed product.
                </p>
              )}
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="/contact-v2">
                  <span>Start a similar project</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <a className="v2-hero-secondary" href="/case-study-v2">
                  <ArrowLeft size={15} strokeWidth={2} />
                  <span className="v2-hero-secondary-label">All case studies</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {cs.image && (
        <div className="csd2-image">
          <div className="csd2-image-frame">
            <img src={cs.image} alt={cs.title} />
          </div>
        </div>
      )}

      {/* ══════════ 2 · OVERVIEW ══════════ */}
      <section className="v2-section" id="overview">
        <p className="v2-label">Project Overview</p>
        <div className="csd2-overview">
          {cs.overview.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {/* ══════════ 3 · OUTCOMES ══════════ */}
      <section className="v2-section v2-section--void" id="outcomes">
        <p className="v2-label">Project Outcomes</p>
        <h2 className="v2-heading">The transformation after launch.</h2>
        <div className="csd2-outcomes">
          {cs.outcomes.map((o, i) => {
            const R = 52;
            const C = 2 * Math.PI * R;
            const ring = Math.min(o.value, 100);
            const offset = C - (C * ring) / 100;
            return (
              <div className="sd2-bench" key={i}>
                <div className="sd2-bench-ring">
                  <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                    <defs>
                      <linearGradient id={`csd2-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                        <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                      </linearGradient>
                    </defs>
                    <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                    <circle
                      className="sd2-bench-ring-fill"
                      cx="60" cy="60" r={R}
                      stroke={`url(#csd2-grad-${i})`}
                      style={{ "--c": C, "--ring-offset": offset }}
                    />
                  </svg>
                  <div className="sd2-bench-num">
                    <span className="sd2-bench-value" data-target={o.value}>0</span>
                    <span className="sd2-bench-suffix">{o.suffix}</span>
                  </div>
                </div>
                <div className="sd2-bench-label">{o.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════ 4 · CHALLENGES / SOLUTIONS — the extraordinary
          section: a toggle switch (matching the pattern already proven on
          Process V2) between the full challenges list and the full
          solutions list, instead of forcing a 1:1 paired layout that would
          break on case studies with mismatched list lengths. ══════════ */}
      <section className="v2-section" id="challenges">
        <p className="v2-label">What We Solved</p>
        <h2 className="v2-heading">The problem, and what we built instead.</h2>

        <div className="csd2-toggle" role="group" aria-label="Show challenges or solutions">
          <button className={!showSolutions ? "is-active" : ""} onClick={() => setShowSolutions(false)}>
            <X size={14} strokeWidth={2.5} /> Challenges
          </button>
          <button className={showSolutions ? "is-active" : ""} onClick={() => setShowSolutions(true)}>
            <Check size={14} strokeWidth={2.5} /> Solutions
          </button>
          <span className={`csd2-toggle-pill ${showSolutions ? "is-right" : ""}`} aria-hidden="true" />
        </div>

        <div className="csd2-cs">
          <ul className={showSolutions ? "is-solutions" : ""}>
            {(showSolutions ? cs.solutions : cs.challenges).map((item, i) => (
              <li key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className={`csd2-cs-icon ${showSolutions ? "is-check" : "is-x"}`}>
                  {showSolutions ? <Check size={14} strokeWidth={2.5} /> : <X size={14} strokeWidth={2.5} />}
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════ 5 · TOOLS ══════════ */}
      <section className="v2-section v2-section--void" id="tools">
        <p className="v2-label">Tools & Technologies</p>
        <h2 className="v2-heading">What this project was built with.</h2>
        <div className="csd2-tools">
          {cs.tools.map((t) => <span key={t}>{t}</span>)}
        </div>
      </section>

      {/* ══════════ 6 · MORE CASE STUDIES ══════════ */}
      <section className="v2-section" id="more">
        <p className="v2-label">More Work</p>
        <h2 className="v2-heading">Other real projects.</h2>
        <div className="csd2-more">
          {more.map((p) => (
            <a className="csd2-more-card" href={`/case-study-v2${p.href}`} key={p.id}>
              <div className="csd2-more-media">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="csd2-more-body">
                <h3>{p.title}</h3>
                <div className="csd2-more-tags">
                  {p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
              <span className="csd2-more-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.8} /></span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 7 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Like what you see?<br />Let's build yours next.
          </h2>
          <a className="v2-btn v2-btn--filled" href="/contact-v2">
            <span>Start a project</span>
            <i className="v2-btn-arrow">→</i>
          </a>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="v2-footer">
        <div className="v2-footer-marquee">
          <div className="v2-footer-marquee-track">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>WE LIVE IN IT <em>•</em></span>
            ))}
          </div>
        </div>
        <div className="v2-footer-grid">
          <div className="v2-footer-col">
            <h5>Company</h5>
            <a href="/preview-v2">Codelix</a>
            <a href="/about-v2">About</a>
            <a href="/team-v2">Team</a>
            <a href="/work-v2">Work</a>
            <a href="/industries-v2">Industries</a>
            <a href="/process-v2">Process</a>
            <a href="/contact-v2">Contact</a>
          </div>
          <div className="v2-footer-col">
            <h5>Services</h5>
            <a href="/services-v2/web-development">Web Development</a>
            <a href="/services-v2">Application Development</a>
            <a href="/services-v2/ui-ux-design">UI/UX Design</a>
            <a href="/services-v2">E-Commerce Solutions</a>
            <a href="/services-v2">Custom Software</a>
            <a href="/services-v2">AI Development</a>
          </div>
          <div className="v2-footer-col">
            <h5>Resources</h5>
            <a href="/pricing-v2">Pricing</a>
            <a href="/technologies-v2">Technologies</a>
            <a href="/careers-v2">Careers</a>
            <a href="/blog-v2">Blog</a>
            <a href="/faq-v2">FAQ</a>
            <a href="/sitemap-v2">Sitemap</a>
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
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="v2-footer-bottom">
          <span>© 2026 Codelix IT Solutions — All Copyright Reserved</span>
          <div className="v2-footer-legal">
            <a href="/privacy-policy-v2">Privacy Policy</a>
            <a href="/terms-of-service-v2">Terms of service</a>
            <a href="/refund-policy-v2">Refund Policy</a>
          </div>
        </div>
        <div className="codelix-large-text" style={{ padding: '0 var(--pad-x)' }}>
          <div className="codelix-text">
            <img src={codelixText} alt="Codelix" style={{ width: '100%', display: 'block', margin: '0 auto' }} />
          </div>
        </div>
      </footer>
    </div>
  );
}
