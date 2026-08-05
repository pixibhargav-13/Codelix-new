import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { FileText, Layers, LifeBuoy } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import CtaVisual from "../HomepageV2/CtaVisual";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./PricingV2.css";
import GoogleReviewButton from "../Shared/GoogleReviewButton";
import ClutchWidget from "../Shared/ClutchWidget";

/* same real budget bands already used in the live /contact intake form
   (ContactUs.jsx) — not new/invented numbers */
const PROJECT_TYPES = [
  "Web Development",
  "Application Development",
  "UI/UX & Product Design",
  "E-Commerce Solutions",
  "Enterprise Software Solutions",
  "AI & Automation Solutions",
  "Data Analytics & Business Intelligence",
  "Support & Managed Services"
];
const COMPLEXITY = ["Simple", "Standard", "Complex"];

/* ballpark mapping onto those same real bands — explicitly labeled as an
   estimate, not a quote */
const ESTIMATE_MAP = {
  "Web Development": ["$1,500 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000"],
  "Application Development": ["$5,000 - $15,000", "$15,000 - $35,000", "Above $35,000"],
  "UI/UX & Product Design": ["$2,000 - $5,000", "$5,000 - $12,000", "$12,000 - $25,000"],
  "E-Commerce Solutions": ["$3,000 - $8,000", "$8,000 - $20,000", "Above $20,000"],
  "Enterprise Software Solutions": ["$10,000 - $25,000", "$25,000 - $60,000", "Above $60,000"],
  "AI & Automation Solutions": ["$5,000 - $15,000", "$15,000 - $40,000", "Above $40,000"],
  "Data Analytics & Business Intelligence": ["$4,000 - $10,000", "$10,000 - $25,000", "Above $25,000"],
  "Support & Managed Services": ["$500 - $1,500 / mo", "$1,500 - $4,000 / mo", "Custom Retainer"],
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
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [complexity, setComplexity] = useState(0);

  const rootRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 40);
      setNavHidden(y > lastY && y > 120);
      lastY = y;
    };
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

  /* hero intro — masked-line GSAP wipe, matching the other v2 pages */
  useEffect(() => {
    const q = (s) => rootRef.current.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"),
        { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: .1 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65");
    return () => tl.kill();
  }, []);

  /* reveal-on-enter — IntersectionObserver */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.classList.contains("v2-faq-item")) {
          const idx = Number(el.dataset.faqIndex);
          setRevealedFaqs((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
        } else {
          el.classList.add("is-in");
        }
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

  /* FAQ accordion height */
  useEffect(() => {
    rootRef.current.querySelectorAll(".v2-faq-a").forEach((el, i) => {
      const inner = el.querySelector("p");
      el.style.height = i === openFaq ? `${inner.offsetHeight}px` : "0px";
    });
  }, [openFaq]);

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

  const estimate = useMemo(() => ESTIMATE_MAP[projectType][complexity], [projectType, complexity]);

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <nav className={`v2-nav ${navScrolled ? "scrolled" : ""} ${navHidden ? "nav-hidden" : ""}`}>
        <div className="v2-nav-inner">
          <a href="/preview-v2" className="v2-nav-logo" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <div className="v2-nav-links">
            <div className="v2-nav-dropdown">
              <a href="/services-v2">Services <span className="v2-nav-dropdown-chevron">▾</span></a>
              <div className="v2-nav-dropdown-panel">
                <div className="v2-nav-dropdown-head">
                  <div>
                    <p className="v2-nav-dropdown-head-label">Our Services</p>
                    <p className="v2-nav-dropdown-head-lede">Everything we build, in one place.</p>
                  </div>
                  <a href="/services-v2" className="v2-nav-dropdown-head-all">View all services →</a>
                </div>
                {FOOTER_SERVICE_KEYWORDS.map((s) => (
                  <a href={s.path} key={s.label} className="v2-nav-dropdown-card">
                    <span className="v2-nav-dropdown-title">{s.label}</span>
                    <span className="v2-nav-dropdown-blurb">{s.blurb}</span>
                  </a>
                ))}
              </div>
            </div>
            <a href="/work-v2">Work</a>
            <a href="/industries-v2">Industries</a>
            <a href="/about-v2">About</a>
          </div>
          <div className="v2-nav-actions">
            <a className="v2-btn v2-btn--filled v2-nav-cta" href="/contact-v2">Book a consultation</a>
            <button
              className={`v2-burger ${mobileOpen ? "open" : ""}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <V2MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <em>Pricing</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Scope-based, not a rate card</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>How pricing</span></span>
                <span className="line"><span className="v2-hero-accent">actually works.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                No public rate card — pricing follows scope and complexity. Get a
                ballpark below, then a written quote after a free scoping call.
              </p>
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
            <a className="v2-btn v2-btn--filled" href="/contact-v2">
              <span>Get a real quote</span>
              <i className="v2-btn-arrow">→</i>
            </a>
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
      <section className="v2-section" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Before you reach out.</h2>
          </div>
          <p className="v2-lede v2-faq-note">
            Want an exact number? <a href="/contact-v2">Book a scoping call →</a>
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

      {/* ══════════ 5 · CLIENT STRIP ══════════ */}
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

      {/* ══════════ 6 · CTA ══════════ */}
      <section className="v2-section v2-section--void v2-cta-shell">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll tell you what it costs.
          </h2>
          <p className="v2-cta-body">
            A free scoping call and a written proposal — no obligation to proceed.
          </p>
          <div className="v2-cta-actions">
            <a className="v2-btn" href="/contact-v2">Book a consultation →</a>
          </div>
          <div className="v2-cta-badges">
            <span className="v2-cta-badge">Free consultation</span>
            <span className="v2-cta-badge">NDA on request</span>
            <span className="v2-cta-badge">No obligation</span>
          </div>
        </div>

        <aside className="v2-cta-visual">
          <CtaVisual />
        </aside>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="v2-footer">
        {/* tagline header — left-aligned stack layout */}
        <div className="pv2-footer-tagline-stacked">
          <h2 className="v2-footer-wordmark-small">
            WE LIVE IN <span className="v2-footer-wordmark-accent">IT</span>
          </h2>
          <p>
            We engineer scalable web, mobile, and AI solutions that empower modern 
            businesses to innovate, grow, and lead their industries.
          </p>
        </div>

        {/* dense keyword strips — everything we build, everything we serve,
            laid out flat rather than tucked into a dropdown */}
        <div className="v2-footer-keywords-row">
          <p className="v2-footer-keywords-label">Services</p>
          <div className="v2-footer-keywords-list">
            {FOOTER_SERVICE_KEYWORDS.map((k, i) => (
              <a href={k.path} className="v2-footer-keyword" key={i}>{k.label}</a>
            ))}
          </div>
        </div>
        <div className="v2-footer-keywords-row">
          <p className="v2-footer-keywords-label">Industries</p>
          <div className="v2-footer-keywords-list">
            {FOOTER_INDUSTRY_KEYWORDS.map((k, i) => (
              <a href={k.path} className="v2-footer-keyword" key={i}>{k.label}</a>
            ))}
          </div>
        </div>

        {/* office / contact info — a single four-up row instead of two
            stacked 2x2 blocks, so it reads as one info bar */}
        <div className="v2-footer-cards v2-footer-cards--four">
          <a
            className="v2-footer-card"
            href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.009586,72.5203036,17z/data=!3m1!4b1!4m6!3m5!1s0x395e856f394696fd:0x69f60cf69bf7dd43!8m2!3d23.0095811!4d72.5228785!16s%2Fg%2F11z61zmnv5?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h5>India (HQ)</h5>
            <p className="v2-footer-card-addr">
              A-1308, PNTC — Times Of India Press Road, Vejalpur, Ahmedabad, Gujarat — 380015
            </p>
          </a>
          <div className="v2-footer-card">
            <h5>Phone</h5>
            <a className="v2-footer-card-strong" href="tel:+919429269295">+91 94292 69295</a>
            <a className="v2-footer-card-strong" href="tel:+917490909686">+91 74909 09686</a>
          </div>
          <div className="v2-footer-card">
            <h5>Looking For Jobs</h5>
            <a className="v2-footer-card-strong" href="/careers-v2">View openings →</a>
          </div>
          <div className="v2-footer-card">
            <h5>HR</h5>
            <a className="v2-footer-card-strong" href="mailto:hr@codelixitsolutions.com">
              hr@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>General</h5>
            <a className="v2-footer-card-strong" href="mailto:info@codelixitsolutions.com">
              info@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>For Sales</h5>
            <a className="v2-footer-card-strong" href="mailto:sales@codelixitsolutions.com">
              sales@codelixitsolutions.com
            </a>
          </div>
        </div>

        {/* socials + back-to-top, same row as the reference */}
        <div className="v2-footer-social">
          <div className="v2-footer-social-links">
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61561748130641" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Behance</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Dribbble</a>
          </div>
          <div className="v2-footer-actions">
            <ClutchWidget className="v2-desktop-only" />
            <GoogleReviewButton className="v2-desktop-only" />
            <button
              type="button"
              className="v2-footer-top"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ↑
            </button>
          </div>
        </div>
        <div className="v2-footer-social v2-mobile-only" style={{ borderTop: "none", paddingTop: 0, paddingBottom: "20px", justifyContent: "center" }}>
          <ClutchWidget />
          <GoogleReviewButton />
        </div>
        <div className="v2-footer-bottom">
          <a href="/preview-v2" className="v2-footer-bottom-brand" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <span className="v2-footer-bottom-copy">© 2026 Codelix IT Solutions — All Copyright Reserved</span>
          <div className="v2-footer-legal">
            <a href="/sitemap-v2">Sitemap</a>
            <a href="/refund-policy-v2">Refund Policy</a>
            <a href="/privacy-policy-v2">Privacy</a>
            <a href="/terms-of-service-v2">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
