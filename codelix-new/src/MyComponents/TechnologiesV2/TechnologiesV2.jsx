import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

/* v2 design system — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./TechnologiesV2.css";

/* real tools — same source of truth as ToolsAndTechUsed.jsx, not a new/
   invented stack list */
import reactLogo from "../Images/react.png";
import angularLogo from "../Images/angular.png";
import bootstrapLogo from "../Images/bootstrap.png";
import nust from "../Images/nust.png";
import vueLogo from "../Images/vue.png";
import tsLogo from "../Images/typescript.png";
import jsLogo from "../Images/javascript.png";
import viteLogo from "../Images/vite.png";
import tailwindLogo from "../Images/tailwind.png";
import nextLogo from "../Images/next.png";
import nodeLogo from "../Images/node.png";
import laravelLogo from "../Images/laravel.png";
import phpLogo from "../Images/php.png";
import pythonLogo from "../Images/python.png";
import springLogo from "../Images/springboot.png";
import javaLogo from "../Images/java.png";
import dockerLogo from "../Images/docker.png";
import djangoLogo from "../Images/django.png";
import csharpLogo from "../Images/csharp.png";
import postgresqlLogo from "../Images/postgresql.png";
import figmaLogo from "../Images/figma.png";
import adobeXdLogo from "../Images/adobe-xd.png";
import sketchLogo from "../Images/sketch.png";
import framerLogo from "../Images/framer.png";
import canvaLogo from "../Images/canva.png";
import flutterLogo from "../Images/flutter.png";
import androidLogo from "../Images/android.png";
import swiftLogo from "../Images/swift.png";
import shopifyLogo from "../Images/shopify.png";
import woocommerceLogo from "../Images/woocommerce.png";
import webflowLogo from "../Images/webflow.png";
import n8nLogo from "../Images/n8n.png";
import zapierLogo from "../Images/zapier.png";
import makeLogo from "../Images/make.png";

const STACK = [
  { name: "React", img: reactLogo, cat: "Frontend" },
  { name: "Angular", img: angularLogo, cat: "Frontend" },
  { name: "Vue", img: vueLogo, cat: "Frontend" },
  { name: "Next", img: nextLogo, cat: "Frontend" },
  { name: "Nust", img: nust, cat: "Frontend" },
  { name: "Typescript", img: tsLogo, cat: "Frontend" },
  { name: "Javascript", img: jsLogo, cat: "Frontend" },
  { name: "Tailwind", img: tailwindLogo, cat: "Frontend" },
  { name: "Bootstrap", img: bootstrapLogo, cat: "Frontend" },
  { name: "Vite", img: viteLogo, cat: "Frontend" },
  { name: "Node", img: nodeLogo, cat: "Backend" },
  { name: "Laravel", img: laravelLogo, cat: "Backend" },
  { name: "PHP", img: phpLogo, cat: "Backend" },
  { name: "Python", img: pythonLogo, cat: "Backend" },
  { name: "Spring Boot", img: springLogo, cat: "Backend" },
  { name: "Java", img: javaLogo, cat: "Backend" },
  { name: "Django", img: djangoLogo, cat: "Backend" },
  { name: "C#", img: csharpLogo, cat: "Backend" },
  { name: "Postgres", img: postgresqlLogo, cat: "Backend" },
  { name: "Docker", img: dockerLogo, cat: "Backend" },
  { name: "Flutter", img: flutterLogo, cat: "Mobile" },
  { name: "React Native", img: reactLogo, cat: "Mobile" },
  { name: "Android", img: androidLogo, cat: "Mobile" },
  { name: "Swift", img: swiftLogo, cat: "Mobile" },
  { name: "Figma", img: figmaLogo, cat: "Design" },
  { name: "Adobe XD", img: adobeXdLogo, cat: "Design" },
  { name: "Sketch", img: sketchLogo, cat: "Design" },
  { name: "Framer", img: framerLogo, cat: "Design" },
  { name: "Canva", img: canvaLogo, cat: "Design" },
  { name: "Shopify", img: shopifyLogo, cat: "E-Commerce" },
  { name: "WooCommerce", img: woocommerceLogo, cat: "E-Commerce" },
  { name: "Webflow", img: webflowLogo, cat: "E-Commerce" },
  { name: "n8n", img: n8nLogo, cat: "Automation" },
  { name: "Zapier", img: zapierLogo, cat: "Automation" },
  { name: "Make", img: makeLogo, cat: "Automation" },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Mobile", "Design", "E-Commerce", "Automation"];

const TENETS = [
  { n: "01", claim: "Picked per project, not one-size-fits-all.", body: "The stack follows the problem — a marketing site and a real-time dashboard don't reach for the same tools, and we don't force them to." },
  { n: "02", claim: "Production-proven, not resume-driven.", body: "Everything listed here has shipped in a real client project — nothing is on this page because it's trendy." },
  { n: "03", claim: "Yours to take anywhere, no lock-in.", body: "Whatever we build with, you get full source-code ownership on delivery — no proprietary framework holding your project hostage." },
];

const STATS = [
  { value: STACK.length, suffix: "+", label: "Tools & frameworks", note: "Across the whole delivery stack", ring: 85 },
  { value: 6, suffix: "", label: "Stack categories", note: "Frontend to automation", ring: 60 },
  { value: 100, suffix: "%", label: "Source-code ownership", note: "Whatever stack we build in", ring: 100 },
];

const FAQS = [
  { q: "Do we choose the stack, or do you?", a: "We recommend based on your project's constraints and explain the trade-offs — but if you have an existing stack or a strong preference, we build in it." },
  { q: "What if our product already uses something not listed here?", a: "This list reflects what we reach for most often, not a hard boundary. Tell us your existing stack and we'll tell you honestly if it's a fit." },
  { q: "Do you take on legacy codebases in older tech?", a: "Often, yes — depends on the specific stack and state of the codebase. We'll review it before committing either way." },
];

export default function TechnologiesV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState("All");
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
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65");
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
      ".tv2-grid", ".sd2-tenet", ".sd2-bench", ".v2-faq-item", ".v2-strip", ".v2-cta",
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

  const filtered = useMemo(
    () => (category === "All" ? STACK : STACK.filter((t) => t.cat === category)),
    [category]
  );

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
            <em>Technologies</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> {STACK.length}+ tools, six categories</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>The stack behind</span></span>
                <span className="line"><span className="v2-hero-accent">what we build.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Every tool below has shipped in a real client project — picked for
                the problem at hand, not because it's trending.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · STACK — filterable logo grid (the extraordinary
          section), each tile flipping in with a staggered 3D reveal ══════════ */}
      <section className="v2-section" id="stack">
        <p className="v2-label">Our Stack</p>
        <h2 className="v2-heading">Filter by what you're building.</h2>

        <div className="tv2-filters" role="group" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`tv2-filter ${category === c ? "is-active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="tv2-grid">
          {filtered.map((t, i) => (
            <div className="tv2-tile" style={{ "--d": `${(i % 10) * 0.04}s` }} key={t.name + t.cat}>
              <img src={t.img} alt={t.name} loading="lazy" />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 3 · WHY THIS STACK ══════════ */}
      <section className="v2-section v2-section--void" id="why">
        <p className="v2-label">Why This Stack</p>
        <h2 className="v2-heading">Chosen for the project, not the resume.</h2>
        <div className="sd2-tenet-grid">
          {TENETS.map((t) => (
            <article className="sd2-tenet" key={t.n}>
              <span className="sd2-tenet-shine" aria-hidden="true" />
              <div className="sd2-tenet-top">
                <span className="sd2-tenet-n" aria-hidden="true">{t.n}</span>
              </div>
              <h3 className="sd2-tenet-claim">{t.claim}</h3>
              <p className="sd2-tenet-body">{t.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 4 · STATS ══════════ */}
      <section className="v2-section" id="stats">
        <p className="v2-label">By The Stack</p>
        <h2 className="v2-heading">Breadth, without spreading thin.</h2>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Codelix, across the stack</span>
            <span className="sd2-bench-bar-meta">Updated 2026</span>
          </div>
          <div className="sd2-bench-grid tv2-stats-grid">
            {STATS.map((b, i) => {
              const R = 52;
              const C = 2 * Math.PI * R;
              const offset = C - (C * b.ring) / 100;
              return (
                <div className="sd2-bench" key={b.label}>
                  <div className="sd2-bench-ring">
                    <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                      <defs>
                        <linearGradient id={`tv2-bench-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#tv2-bench-grad-${i})`}
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
            Something specific in mind? <a href="/contact-v2">Ask us directly →</a>
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

      {/* ══════════ 7 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll tell you what it needs.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your project and the stack it actually calls for.
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
