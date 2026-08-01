import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Building2, Rocket, Store, GraduationCap, HeartPulse, Landmark,
  ShieldCheck, Gauge, Eye,
} from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./IndustriesV2.css";

/* same six sectors already referenced across the per-service "Who It's For"
   sections — expanded here into fuller profiles instead of a new, invented
   list, so the site stays consistent about who it actually serves */
const INDUSTRIES = [
  {
    icon: Building2,
    title: "Corporate & B2B",
    tagline: "Credibility-first, for buyers who research before they call.",
    challenges: ["Buyers evaluate you before ever reaching out", "Dense offerings that are hard to explain simply", "Legacy sites that undersell an established business"],
    body: "We build sites that carry the weight of an established business — clear positioning, credible proof, and a path from research to real contact.",
    services: ["Web Development", "UI/UX Design"],
  },
  {
    icon: Rocket,
    title: "Startups & SaaS",
    tagline: "Ship the idea clearly, capture the signup.",
    challenges: ["Explaining a new idea in one scroll", "Needing to look credible with a small team", "Iterating fast without rebuilding from scratch"],
    body: "Marketing sites and product experiences built to explain something new clearly, capture signups, and evolve fast as the product does.",
    services: ["Web Development", "Custom Software Development", "AI Development", "Data Analytics"],
  },
  {
    icon: Store,
    title: "Retail & D2C",
    tagline: "A fast, low-friction path from landing to checkout.",
    challenges: ["Cart abandonment from slow or clunky checkout", "Inventory and orders spread across tools", "Mobile traffic that converts worse than desktop"],
    body: "Storefronts engineered around speed and trust — fast product discovery, a frictionless checkout, and a backend your team can actually run.",
    services: ["E-Commerce Solutions", "Web Development"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    tagline: "Built for real enrolment load, not a demo.",
    challenges: ["Admissions journeys that lose applicants midway", "Course catalogues that are hard to browse", "Student portals that break under real usage"],
    body: "Course catalogues, admissions flows, and student portals designed to hold up under real enrolment traffic, not just a polished demo.",
    services: ["Web Development", "Custom Software Development"],
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    tagline: "Privacy and accessibility as first-class requirements.",
    challenges: ["Patient data that has to be handled carefully", "Appointment flows that need to work for everyone", "Accessibility requirements that are easy to overlook"],
    body: "Appointment flows and patient-facing tools built with privacy and accessibility as requirements from day one, not a retrofit.",
    services: ["Web Development", "Custom Software Development", "UI/UX Design"],
  },
  {
    icon: Landmark,
    title: "Finance & Legal",
    tagline: "Where trust signals and document handling actually matter.",
    challenges: ["Dense, regulated content that's hard to make usable", "Document handling that needs to be airtight", "Trust signals that have to be earned, not decorated"],
    body: "Compliance-conscious builds where trust signals, document handling, and information architecture aren't an afterthought.",
    services: ["Web Development", "Custom Software Development"],
  },
];

const APPROACH = [
  { icon: Eye, claim: "We learn the domain, not just the brief.", body: "Before we design a single screen, we understand the regulations, the buyer behaviour, and the operational constraints specific to your sector." },
  { icon: ShieldCheck, claim: "Compliance is a requirement, not a checkbox.", body: "Data handling, accessibility, and privacy get designed in from day one for the sectors where getting it wrong actually costs you." },
  { icon: Gauge, claim: "Faster onboarding, fewer surprises.", body: "Sector context means fewer rounds of 'actually, in our industry...' — we ask the right questions earlier." },
];

const STATS = [
  { value: 6, suffix: "", label: "Industries served", note: "Not spread thin across dozens", ring: 60 },
  { value: 30, suffix: "+", label: "Projects across sectors", note: "Real deployments, not pilots", ring: 92 },
  { value: 100, suffix: "%", label: "Source-code ownership", note: "Regardless of industry", ring: 100 },
];

const FAQS = [
  { q: "We're not in one of the six industries listed — can you still help?", a: "Almost certainly. These are the sectors we have the deepest repeat experience in, not a hard boundary. Tell us what you're building and we'll tell you honestly if it's a fit." },
  { q: "Do you handle industry-specific compliance requirements?", a: "We design with privacy and accessibility as requirements for regulated sectors like healthcare and finance. For specific certifications your business needs (HIPAA, PCI-DSS, etc.), we'll work with your compliance team rather than claim expertise we'd need to verify case by case." },
  { q: "Does industry experience change your pricing?", a: "No — pricing is based on scope and complexity, the same estimator and process regardless of sector." },
];

export default function IndustriesV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());

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
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7");
    return () => tl.kill();
  }, []);

  /* reveal-on-enter — IntersectionObserver, no stale cached scroll positions */
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
      ".ind-scroll-shell", ".sd2-tenet", ".sd2-bench", ".v2-faq-item", ".v2-strip", ".v2-cta",
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

      <V2MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <em>Industries</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Six sectors, real repeat experience</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Built for how</span></span>
                <span className="line"><span className="v2-hero-accent">your sector actually operates.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                The stack, the compliance posture, and the structure change
                depending on who's using the site and what they came to do.
                Here's where we have the deepest repeat experience.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="/contact-v2">
                  <span>Talk about your sector</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <a className="v2-hero-secondary" href="#industries">
                  <span className="v2-hero-secondary-label">Browse industries</span>
                </a>
              </div>
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
            <h2 className="v2-heading">Six sectors. Different problems, different builds.</h2>
            <p className="v2-lede">
              Not a generic template reskinned six times — each sector has
              different constraints, and we design around the ones that matter.
            </p>
            <ul className="ind-scroll-points">
              <li>Sector-specific compliance designed in, not bolted on</li>
              <li>Real repeat experience, not a first attempt at your industry</li>
              <li>Faster onboarding — fewer "actually, in our industry…" surprises</li>
              <li>Same process and pricing, tuned per sector</li>
            </ul>
            <a className="v2-btn v2-btn--filled" href="/contact-v2">
              <span>Talk about your sector</span>
              <i className="v2-btn-arrow">→</i>
            </a>
          </div>

          <div className="ind-scroll-right">
            <div className="ind-scroll-stack">
              {INDUSTRIES.map((it, i) => (
                <article
                  className="ind-scroll-card"
                  style={{ top: `120px`, zIndex: i + 1 }}
                  key={it.title}
                >
                  <div className="ind-scroll-card-tab">
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
              <ul className="ind-panel-challenges">
                {it.challenges.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <p className="ind-panel-body">{it.body}</p>
              <div className="ind-panel-services">
                {it.services.map((s) => <span key={s}>{s}</span>)}
              </div>
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
      <section className="v2-section v2-section--void" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Before you reach out.</h2>
          </div>
          <p className="v2-lede v2-faq-note">
            Don't see your industry? <a href="/contact-v2">Ask us directly →</a>
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

      {/* ══════════ 6 · CLIENT STRIP ══════════ */}
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

      {/* ══════════ 7 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us your sector.<br />We'll tell you what actually matters.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your industry's real constraints —
            not a generic pitch reused across every client.
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
      </section>

      {/* ══════════ FOOTER ══════════ */}
            <footer className="v2-footer">
        {/* tagline header — our own real line ("we live in it," already used
            in the marquee elsewhere on the site) instead of a borrowed one */}
        <div className="v2-footer-tagline">
          <h2 className="v2-footer-wordmark-small">
            WE LIVE
            <br />
            IN <span className="v2-footer-wordmark-accent">IT</span>
          </h2>
          <p className="v2-footer-tagline-body">
            We design and build web, mobile, and AI systems for businesses that
            intend to still be running them in five years.
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

        {/* office / contact cards — bordered two-up rows, same shape as the
            reference's address + sales/careers blocks */}
        <div className="v2-footer-cards">
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
        </div>

        <div className="v2-footer-cards">
          <div className="v2-footer-card">
            <h5>For Sales</h5>
            <a className="v2-footer-card-strong" href="mailto:Sales@codelixitsolutions.com">
              Sales@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>Looking For Jobs</h5>
            <a className="v2-footer-card-strong" href="/careers-v2">View openings →</a>
          </div>
        </div>

        {/* socials + back-to-top, same row as the reference */}
        <div className="v2-footer-social">
          <div className="v2-footer-social-links">
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <button
            type="button"
            className="v2-footer-top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑
          </button>
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
