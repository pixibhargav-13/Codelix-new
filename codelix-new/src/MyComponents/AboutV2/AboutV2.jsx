import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Eye, HeartHandshake, ShieldCheck,
  Globe, Smartphone, PenTool, ShoppingCart, Code2, Sparkles,
  Check, Minus, X,
} from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./AboutV2.css";

const STATS = [
  { value: 3, suffix: "+", label: "Years building software", note: "Since day one, same team", ring: 45 },
  { value: 30, suffix: "+", label: "Projects delivered", note: "Across web, mobile & AI", ring: 92 },
  { value: 20, suffix: "+", label: "Clients worldwide", note: "Repeat business, not one-offs", ring: 88 },
  { value: 100, suffix: "%", label: "Source-code ownership", note: "Every project, no exceptions", ring: 100 },
];

const VALUES = [
  { key: "Honest", icon: Eye, claim: "We tell you what you need to hear.", body: "Not what's easiest to say. If a timeline's unrealistic or a feature's a bad idea, we say so before you spend money on it." },
  { key: "Accountable", icon: ShieldCheck, claim: "Our name is on every line of code.", body: "We don't outsource to anonymous contractors and hope for the best. The people who scope your project are the people who build it." },
  { key: "Independent", icon: HeartHandshake, claim: "No lock-in, ever.", body: "You own the repo, the domain, the infrastructure. If you want to leave, you can — on day one or year five." },
];

const PROCESS = [
  { n: "01", title: "Discovery call", time: "30 minutes", body: "We ask about your business, not just the feature list — what success looks like, who it's for, and what's actually broken today." },
  { n: "02", title: "Written proposal", time: "Within 48 hours", body: "A fixed scope, a realistic timeline, and a price — in writing, before any commitment. No verbal estimates that quietly grow." },
  { n: "03", title: "Design & architecture", time: "1–2 weeks", body: "We design the interface and the system architecture together, so the two aren't fighting each other by the time development starts." },
  { n: "04", title: "Build in short cycles", time: "Ongoing", body: "You see working software every week, not a single reveal at the end. If something needs to change, we catch it in week two, not week ten." },
  { n: "05", title: "QA & hardening", time: "1–2 weeks", body: "We break it before your users do — real devices, real edge cases, security review — before anything goes live." },
  { n: "06", title: "Handover & support", time: "Ongoing", body: "Full source, documentation, and a support window after launch. You're never dependent on us to keep the lights on." },
];

const COMPARE_COLS = ["Codelix", "Template / builder", "Freelancer", "Large agency"];
const COMPARE_ROWS = [
  { label: "One team, start to finish", vals: ["yes", "no", "maybe", "no"] },
  { label: "100% source-code ownership", vals: ["yes", "partial", "maybe", "yes"] },
  { label: "Direct access to who builds it", vals: ["yes", "no", "yes", "no"] },
  { label: "Fixed scope in writing", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Post-launch support included", vals: ["yes", "no", "maybe", "yes"] },
  { label: "Won't vanish mid-project", vals: ["yes", "yes", "no", "yes"] },
];

const FAQS = [
  { q: "Where is Codelix based?", a: "We're headquartered in Ahmedabad, India, and work with clients across time zones — most communication happens over calls and async updates, so location hasn't been a blocker for our clients." },
  { q: "Do you work with startups, or only established companies?", a: "Both. We scope projects to fit the budget and stage you're at — a first MVP looks very different from a system for an established business, and we price and plan accordingly." },
  { q: "Do you sign NDAs?", a: "Yes, as a matter of course before any detailed scoping conversation. Your idea and your data are yours." },
  { q: "What happens if I need changes after launch?", a: "Every project includes a post-launch support window. After that, you can take it in-house with the documentation we provide, or keep us on a retainer." },
  { q: "Can I own the code and infrastructure outright?", a: "Yes — that's the default, not an add-on. You get the repo, the deployment accounts, and the documentation when the project closes." },
  { q: "How do I get started?", a: "Book a discovery call. We'll talk through what you're building, and follow up with a written proposal — scope, timeline, and price — within 48 hours." },
];

const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", path: "/services-v2/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", path: "/services/application-development" },
  { icon: PenTool, n: "03", title: "UI/UX Design", path: "/services-v2/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Custom Software Development", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI Development", path: "/services/ai-development" },
];

const QUOTE = {
  text: "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule.",
  name: "Rajesh Patel",
  role: "CEO, Harmony Inc.",
};

const MISSION_WORDS = [
  "WE BUILD SOFTWARE.",
  "NOT DECKS.",
  "NOT PROMISES.",
  "WORKING SOFTWARE,",
  "OWNED BY YOU.",
];

/* scroll-scrubbed word reveal — same mechanism as the other v2 pages' copy */
const scrollSentenceEase = (p) => p * p * p * (p * (p * 6 - 15) + 10);

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
          const p = scrollSentenceEase(d / IN_END);
          scale = 0.78 + p * 0.22; opacity = p; blur = 5 * (1 - p);
        } else if (d <= OUT_START) {
          scale = 1; opacity = 1; blur = 0;
        } else {
          const p = scrollSentenceEase((d - OUT_START) / (1 - OUT_START));
          scale = 1 + p * 0.22; opacity = 1 - p; blur = 6 * p;
        }

        if (wordEl) {
          wordEl.style.opacity = opacity;
          wordEl.style.transform = `translate3d(-50%,-50%,0) scale(${scale})`;
          wordEl.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
        }
        if (bgEl) bgEl.style.opacity = scrollSentenceEase(Math.min(d / IN_END, 1));
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
    <section className={`v2-sentence v2-sentence--${tone} sd2-sentence`} ref={ref}>
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

export default function AboutV2() {
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

  /* sticky heading bands only show their rule once actually stuck */
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
      ".about-stat", ".sd2-tenet", ".v2-cta", ".v2-strip",
      ".v2-method-row", ".sd2-quote", ".sd2-cmp-row", ".sd2-other",
      ".v2-faq-item",
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
            <a href="/services-v2/web-development">Web Dev V2</a>
            <a href="/services-v2/ui-ux-design">UI/UX V2</a>
            <a href="/about-v2">About V2</a>
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
            { label: "Web Dev V2", href: "/services-v2/web-development" },
            { label: "UI/UX V2", href: "/services-v2/ui-ux-design" },
            { label: "About V2", href: "/about-v2" },
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
            <em>About</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Est. 2024 · Ahmedabad</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>A small team that</span></span>
                <span className="line"><span className="v2-hero-accent">builds like it's theirs.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Codelix is an IT solutions studio that builds web, mobile, and AI
                systems for businesses that intend to still be running them in
                five years. No lock-in, no black boxes — just software you own.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="/contact">
                  <span>Work with us</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <a className="v2-hero-secondary" href="#story">
                  <span className="v2-hero-secondary-label">Our story</span>
                </a>
              </div>
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
      <ScrollSentence words={MISSION_WORDS} tone="dark" />

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
      <section className="v2-section">
        <figure className="sd2-quote">
          <span className="sd2-quote-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="sd2-quote-text">{QUOTE.text}</blockquote>
          <figcaption className="sd2-quote-by">
            <span className="sd2-quote-name">{QUOTE.name}</span>
            <span className="sd2-quote-role">{QUOTE.role}</span>
          </figcaption>
        </figure>
      </section>

      {/* ══════════ 5d · FAQ ══════════ */}
      <section className="v2-section v2-section--void" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Questions people ask before working with us.</h2>
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

      {/* ══════════ 5e · EXPLORE SERVICES ══════════ */}
      <section className="v2-section" id="other">
        <p className="v2-label">Explore More</p>
        <h2 className="v2-heading">What we build.</h2>
        <div className="sd2-other-list">
          {OTHER_SERVICES.map((s) => (
            <a className="sd2-other" href={s.path} key={s.path}>
              <span className="sd2-other-n">{s.n}</span>
              <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
              <span className="sd2-other-title">{s.title}</span>
              <span className="sd2-other-go">→</span>
            </a>
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
            Same team you meet today<br />builds what you use in year three.
          </h2>
          <p className="v2-cta-body">
            No handoffs to a different team after the sales call. Talk to us
            about what you're building.
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
            <h5>Info</h5>
            <a href="/">Codelix</a>
            <a href="/work">Work</a>
            <a href="/about-v2">About</a>
            <a href="/services-v2">Services</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="v2-footer-col">
            <h5>Services</h5>
            <a href="/services/web-development">Web Development</a>
            <a href="/services/application-development">Application Development</a>
            <a href="/services/ui-ux-design">UI/UX Design</a>
            <a href="/services/e-commerce-solutions">E-Commerce Solutions</a>
            <a href="/services/custom-software-development">Custom Software</a>
            <a href="/services/ai-development">AI Development</a>
          </div>
          <div className="v2-footer-col">
            <h5>Social</h5>
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
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
          </div>
        </div>
        <div className="v2-footer-bottom">
          <span>© 2026 Codelix IT Solutions — All Copyright Reserved</span>
          <div className="v2-footer-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of service</a>
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
