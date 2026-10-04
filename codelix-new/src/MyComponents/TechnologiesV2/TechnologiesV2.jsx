import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";

/* v2 design system — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./TechnologiesV2.css";
import TechHeroVisual from "./TechHeroVisual";

/* real tools — same source of truth as ToolsAndTechUsed.jsx, not a new/
   invented stack list */
import reactLogo from "../Images/react.webp";
import angularLogo from "../Images/angular.webp";
import bootstrapLogo from "../Images/bootstrap.webp";
import nust from "../Images/nust.webp";
import vueLogo from "../Images/vue.webp";
import tsLogo from "../Images/typescript.webp";
import jsLogo from "../Images/javascript.webp";
import viteLogo from "../Images/vite.webp";
import tailwindLogo from "../Images/tailwind.webp";
import nextLogo from "../Images/next.webp";
import nodeLogo from "../Images/node.webp";
import laravelLogo from "../Images/laravel.webp";
import phpLogo from "../Images/php.webp";
import pythonLogo from "../Images/python.webp";
import springLogo from "../Images/springboot.webp";
import javaLogo from "../Images/java.webp";
import dockerLogo from "../Images/docker.webp";
import djangoLogo from "../Images/django.webp";
import csharpLogo from "../Images/csharp.webp";
import postgresqlLogo from "../Images/postgresql.webp";
import figmaLogo from "../Images/figma.webp";
import adobeXdLogo from "../Images/adobe-xd.webp";
import sketchLogo from "../Images/sketch.webp";
import framerLogo from "../Images/framer.webp";
import canvaLogo from "../Images/canva.webp";
import flutterLogo from "../Images/flutter.webp";
import androidLogo from "../Images/android.webp";
import swiftLogo from "../Images/swift.webp";
import shopifyLogo from "../Images/shopify.webp";
import woocommerceLogo from "../Images/woocommerce.webp";
import webflowLogo from "../Images/webflow.webp";
import n8nLogo from "../Images/n8n.webp";
import zapierLogo from "../Images/zapier.webp";
import makeLogo from "../Images/make.webp";
import NavbarV2 from "../Shared/NavbarV2";
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";


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
];

const STATS = [
  { value: STACK.length, suffix: "+", label: "Tools & frameworks", note: "Across the whole delivery stack", ring: 85 },
  { value: 6, suffix: "", label: "Stack categories", note: "Frontend to automation", ring: 60 },
];

const FAQS = [
  { q: "Do we choose the stack, or do you?", a: "We recommend based on your project's constraints and explain the trade-offs — but if you have an existing stack or a strong preference, we build in it." },
  { q: "What if our product already uses something not listed here?", a: "This list reflects what we reach for most often, not a hard boundary. Tell us your existing stack and we'll tell you honestly if it's a fit." },
  { q: "Do you take on legacy codebases in older tech?", a: "Often, yes — depends on the specific stack and state of the codebase. We'll review it before committing either way." },
];

export default function TechnologiesV2() {
  
  
  
  const [category, setCategory] = useState("All");

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
      ".tv2-grid", ".sd2-tenet", ".sd2-bench", ".v2-faq-item", ".v2-strip", ".v2-cta",
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


  const filtered = useMemo(
    () => (category === "All" ? STACK : STACK.filter((t) => t.cat === category)),
    [category]
  );

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
                <em>Technologies</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> {STACK.length}+ tools, six categories</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>The stack behind</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">what we build.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Every tool below has shipped in a real client project — picked for
                the problem at hand, not because it's trending.
              </p>
            </div>
            {/* Visual Column */}
            <div className="sd2-hero-visual sv2-hero-reveal">
              <TechHeroVisual />
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
      <FaqSection faqs={FAQS} className="v2-section--void" />

      {/* ══════════ 7 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll tell you what it needs.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your project and the stack it actually calls for.
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
