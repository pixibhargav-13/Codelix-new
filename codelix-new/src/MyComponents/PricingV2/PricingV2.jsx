import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { FileText, Layers, LifeBuoy } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./PricingV2.css";

/* same real budget bands already used in the live /contact intake form
   (ContactUs.jsx) — not new/invented numbers */
const PROJECT_TYPES = ["Landing / Marketing Site", "UI/UX Design Only", "E-Commerce Store", "Web App / SaaS Platform", "Mobile App", "Custom Software / ERP"];
const COMPLEXITY = ["Simple", "Standard", "Complex"];

/* ballpark mapping onto those same real bands — explicitly labeled as an
   estimate, not a quote */
const ESTIMATE_MAP = {
  "Landing / Marketing Site": ["Under $1,500", "$1,500 - $5,000", "$5,000 - $10,000"],
  "UI/UX Design Only": ["$1,500 - $5,000", "$5,000 - $10,000", "$10,000 - $20,000"],
  "E-Commerce Store": ["$1,500 - $5,000", "$5,000 - $10,000", "$10,000 - $20,000"],
  "Web App / SaaS Platform": ["$5,000 - $10,000", "$10,000 - $20,000", "$20,000 - $50,000"],
  "Mobile App": ["$5,000 - $10,000", "$10,000 - $20,000", "$20,000 - $50,000"],
  "Custom Software / ERP": ["$10,000 - $20,000", "$20,000 - $50,000", "Above $50,000"],
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [complexity, setComplexity] = useState(0);

  const rootRef = useRef(null);
  const stripRef = useRef(null);

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
            <span className="pv2-result-value" key={estimate}>{estimate}</span>
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
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll tell you what it costs.
          </h2>
          <p className="v2-cta-body">
            A free scoping call and a written proposal — no obligation to proceed.
          </p>
          <a className="v2-btn" href="/contact-v2">Book a consultation →</a>
          <p className="v2-cta-footnote">Free consultation · NDA on request · No obligation</p>
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
