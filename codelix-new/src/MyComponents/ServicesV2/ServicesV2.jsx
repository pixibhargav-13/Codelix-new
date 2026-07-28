import React, { useEffect, useRef, useState } from "react";
import {
  Globe, Smartphone, PenTool, ShoppingCart, Code2, Sparkles,
  CalendarCheck, Lock, Eye, Receipt, Users, LifeBuoy, Clock,
} from "lucide-react";

/* the v2 design system + the shared tech-stack data live with the homepage —
   importing them here keeps both pages on one source of truth instead of a
   drifting copy */
import "../HomepageV2/HomepageV2.css";
import { TECH_STACK } from "../HomepageV2/techStack";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
import "./ServicesV2.css";

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
  { value: 30, suffix: "+", label: "Projects delivered", icon: Sparkles },
  { value: 6, suffix: "", label: "Core services", icon: Code2 },
  { value: 100, suffix: "%", label: "Source-code ownership", icon: Lock },
  { value: 24, suffix: "h", label: "Response time", icon: Clock },
];

/* real service copy, lifted from the live site's WhatWeProvide.jsx, with the
   per-service capability lists expanded for a dedicated services page */
const SERVICES = [
  {
    n: "01",
    icon: Globe,
    title: "Web Development",
    body: "Fast, reliable websites that look sharp and actually bring in business — not just another template with your logo on it.",
    path: "/services-v2/web-development",
    capabilities: ["Corporate websites", "Web applications", "CMS builds", "Landing pages", "Performance & Core Web Vitals"],
  },
  {
    n: "02",
    icon: Smartphone,
    title: "Application Development",
    body: "Native and cross-platform apps built from scratch — no cookie-cutter builders, no shortcuts on performance or security.",
    path: "/services/application-development",
    capabilities: ["iOS & Android", "Cross-platform (Flutter)", "Progressive web apps", "Desktop apps", "App store delivery"],
  },
  {
    n: "03",
    icon: PenTool,
    title: "UI/UX Design",
    body: "Designs that make sense to the people using them. We prototype, test, and refine until the interface feels obvious.",
    path: "/services-v2/ui-ux-design",
    capabilities: ["User research", "Wireframing", "Design systems", "Interactive prototypes", "Usability testing"],
  },
  {
    n: "04",
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    body: "Online stores that are easy to buy from — fast checkout, clear navigation, and a backend you can actually manage yourself.",
    path: "/services/e-commerce-solutions",
    capabilities: ["Custom storefronts", "Shopify & WooCommerce", "Payment integration", "Inventory & orders", "Checkout optimisation"],
  },
  {
    n: "05",
    icon: Code2,
    title: "Custom Software Development",
    body: "Software built around how your business actually works — not a generic tool you have to bend your process around.",
    path: "/services/custom-software-development",
    capabilities: ["ERP & CRM systems", "Workflow automation", "Third-party integrations", "Admin dashboards", "Legacy modernisation"],
  },
  {
    n: "06",
    icon: Sparkles,
    title: "AI Development",
    body: "Practical AI that does real work — automating the repetitive stuff, answering customers, or surfacing data your team would otherwise miss.",
    path: "/services/ai-development",
    capabilities: ["AI agents & assistants", "Chatbots", "Process automation", "Predictive analytics", "LLM integration"],
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
  { key: "Owned", icon: Lock, claim: "No code you don't fully own.", body: "When the invoice is paid, the code is yours. We hand over the repos, the docs, and the keys. No vendor lock-in, no hostage situations." },
  { key: "Visible", icon: Eye, claim: "No progress you can't see.", body: "We don't go dark for a month and come back with a surprise. You see the work as it happens, so we can course-correct early." },
];

const FAQS = [
  { q: "Which service is right for my project?", a: "Honestly, most projects use two or three of these together. If you're not sure where you land, just tell us what you're trying to build and we'll point you in the right direction." },
  { q: "Can you take over an existing project?", a: "Yes, we do it all the time. We'll audit the codebase first so you know exactly what shape it's in before we touch anything." },
  { q: "Do you provide source code after project completion?", a: "Yes. Once the project is done and paid for, you get everything — full source code, documentation, and deployment details. It's your code." },
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
function ScrollSentence({ words, tone }) {
  const ref = useRef(null);
  const wordRefs = useRef([]);
  const bgRefs = useRef([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0, running = false, target = 0, current = 0, primed = false;

    const readTarget = () => {
      const r = el.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      const raw = (-r.top) / scrollable;
      const norm = Math.min(Math.max((raw - 0.06) / 0.86, 0), 0.9999);
      return norm * words.length;
    };

    const IN_END = 0.2;
    const OUT_START = 0.8;

    const paint = (t) => {
      words.forEach((_, i) => {
        const d = Math.min(Math.max(t - i, 0), 1);
        const wordEl = wordRefs.current[i];
        const bgEl = bgRefs.current[i];

        let scale, opacity, blur;
        if (d < IN_END) {
          const p = ease(d / IN_END);
          scale = 0.78 + p * 0.22; opacity = p; blur = 5 * (1 - p);
        } else if (d <= OUT_START) {
          scale = 1; opacity = 1; blur = 0;
        } else {
          const p = ease((d - OUT_START) / (1 - OUT_START));
          scale = 1 + p * 0.22; opacity = 1 - p; blur = 6 * p;
        }

        if (wordEl) {
          wordEl.style.opacity = opacity;
          wordEl.style.transform = `translate3d(0,-50%,0) scale(${scale})`;
          wordEl.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
        }
        if (bgEl) bgEl.style.opacity = ease(Math.min(d / IN_END, 1));
      });
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.0002) {
        current = target; paint(current); running = false; raf = 0; return;
      }
      current += diff * 0.12;
      paint(current);
      raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      target = readTarget();
      if (!primed) { current = target; primed = true; }
      if (!running) { running = true; raf = requestAnimationFrame(tick); }
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [words]);

  return (
    <section className={`v2-sentence v2-sentence--${tone}`} ref={ref}>
      <div className="v2-sentence-sticky">
        <div className="v2-sentence-bgs" aria-hidden="true">
          {words.map((w, i) => (
            <span className="v2-sentence-bg" style={{ zIndex: i }}
              ref={(elm) => (bgRefs.current[i] = elm)} key={"bg" + i} />
          ))}
        </div>
        <div className="v2-sentence-words">
          {words.map((w, i) => (
            <span className="v2-sentence-word"
              ref={(elm) => (wordRefs.current[i] = elm)} key={w + i}>{w}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());
  const [svcActive, setSvcActive] = useState(0);

  const rootRef = useRef(null);
  const stripRef = useRef(null);

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

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock background scroll while the drawer is open; Escape closes it */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  /* sticky heading bands only show their bottom rule once actually stuck */
  useEffect(() => {
    const shells = rootRef.current.querySelectorAll(".v2-method-shell");
    if (!shells.length) return;
    const pairs = Array.from(shells)
      .map((shell) => ({ shell, head: shell.querySelector(".v2-method-head") }))
      .filter((p) => p.head);
    const onScroll = () => {
      pairs.forEach(({ shell, head }) => {
        const r = shell.getBoundingClientRect();
        head.classList.toggle("is-stuck", r.top <= 0 && r.bottom > 0);
      });
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
          if (el.classList.contains("v2-faq-item")) {
            const idx = Number(el.dataset.faqIndex);
            setRevealedFaqs((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
          } else {
            el.classList.add("is-in");
          }
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

  /* client logo strip drifts continuously (CSS-driven so this page doesn't
     need GSAP at all), easing off while hovered */
  useEffect(() => {
    const track = stripRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, x = 0, speed = 0.00125, paused = false;
    let last = performance.now();
    const step = (now) => {
      const dt = now - last; last = now;
      if (!paused) {
        x -= speed * dt;
        if (x <= -50) x += 50; // track holds two copies, so -50% loops seamlessly
        track.style.transform = `translateX(${x}%)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const wrap = track.parentElement;
    const slow = () => { paused = true; };
    const norm = () => { paused = false; };
    wrap.addEventListener("mouseenter", slow);
    wrap.addEventListener("mouseleave", norm);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mouseenter", slow);
      wrap.removeEventListener("mouseleave", norm);
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

  /* FAQ accordion height */
  useEffect(() => {
    rootRef.current.querySelectorAll(".v2-faq-a").forEach((el, i) => {
      const inner = el.querySelector("p");
      el.style.height = i === openFaq ? `${inner.offsetHeight}px` : "0px";
    });
  }, [openFaq]);

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
      <header className="sv2-hero">
        <div className="sv2-hero-inner">
          <div className="v2-hero-top sv2-hero-reveal">
            <span className="v2-hero-status"><i /> Six services · One delivery standard</span>
          </div>
          <h1 className="sv2-hero-title sv2-hero-reveal">
            Everything we build,<br />
            <span className="v2-hero-accent">and how we build it.</span>
          </h1>
          <p className="sv2-hero-sub sv2-hero-reveal">
            Whether it's a landing page or a full platform — we handle web, mobile, design,
            e-commerce, custom software, and AI. Same team, same process, same handoff
            every time.
          </p>
          <div className="sv2-hero-cta sv2-hero-reveal">
            <a className="v2-btn v2-btn--filled" href="/contact">
              <span>Get a free quote</span>
              <i className="v2-btn-arrow">→</i>
            </a>
            <a className="v2-hero-secondary" href="#services">
              <span className="v2-hero-secondary-label">Browse services</span>
            </a>
          </div>

          {/* quick jump chips */}
          <div className="sv2-chips sv2-hero-reveal">
            {SERVICES.map((s, i) => (
              <a className="sv2-chip" href="#services" onClick={() => setSvcActive(i)} key={s.n}>
                <s.icon size={14} strokeWidth={1.7} />
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ══════════ 2 · SERVICES ══════════ */}
      <section className="v2-method-shell" id="services">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">What We Provide.</h2>
          <p className="v2-method-lede">
            Six things we do well. Most projects use a few of them together.
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
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                    <a className="sv2-service-link" href={s.path}>
                      <span>Explore</span>
                      <i>→</i>
                    </a>
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
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <a className="sv2-service-link sv2-service-link--panel" href={s.path}>
                  <i>
                    <svg className="sv2-svc-link-arrow" viewBox="0 0 34 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M0 7H32M32 7L26 1M32 7L26 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </i>
                  <span>Explore</span>
                </a>
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
      <section className="v2-section v2-section--void" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Questions we're asked about services.</h2>
          </div>
          <p className="v2-lede v2-faq-note">
            Don't see yours here? <a href="/contact">Ask us directly →</a>
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

      {/* ══════════ 8 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll tell you how we'd build it.
          </h2>
          <p className="v2-cta-body">
            Walk us through what you're working on. We'll figure out what to build first,
            what can wait, and what it'll take to get it live.
          </p>
          <a className="v2-btn" href="/contact">Book a consultation →</a>
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
            {SERVICES.map((s) => (
              <a href={s.path} key={s.path}>{s.title}</a>
            ))}
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
