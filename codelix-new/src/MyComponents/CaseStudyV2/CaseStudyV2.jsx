import React, { useEffect, useMemo, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./CaseStudyV2.css";

/* the same 15 real projects shared with WorkV2 — one source of truth,
   not a duplicated or re-invented list */
import { PROJECTS } from "../WorkV2/projectsData";
import { useCaseStudies } from "../CaseStudyDetailV2/useCaseStudies";
import NavbarV2 from "../Shared/NavbarV2";
import CtaSection from '../Shared/CtaSection';
import ClientStrip from '../Shared/ClientStrip';


/* v2 case-study detail pages live at /case-study/:slug, reusing the
   same slugs as the existing routes */
const toV2Slug = (href) => href.replace("/", "");

const CATEGORIES = ["All", "Web Development", "Application Development", "UI/UX Design", "E-Commerce Solutions", "Custom Software Development", "AI Development", "Data Analytics"];

const STATS = [
  { value: 15, suffix: "+", label: "Case studies documented", note: "Every stage, not just the highlight reel", ring: 75 },
  { value: 6, suffix: "", label: "Industries covered", note: "Not one narrow niche", ring: 60 },
  { value: 100, suffix: "%", label: "Source-code ownership", note: "Every project, no exceptions", ring: 100 },
];

export default function CaseStudyV2() {
  
  
  
  const [category, setCategory] = useState("All");

  const rootRef = useRef(null);

  /* admin-created case studies (published via Supabase) aren't part of the
     static PROJECTS list, so they need to be reshaped into the same
     card-shape PROJECTS already has before they can slot into this grid —
     additive only, the existing 15 keep coming from PROJECTS untouched */
  const caseStudies = useCaseStudies();
  const adminCards = useMemo(() => {
    const existingSlugs = new Set(PROJECTS.map((p) => toV2Slug(p.href)));
    return caseStudies
      .filter((cs) => !existingSlugs.has(cs.slug))
      .map((cs) => ({
        id: `admin-${cs.slug}`,
        title: cs.title,
        category: cs.category,
        industry: cs.industry,
        description: cs.description,
        tags: cs.tags,
        image: cs.image,
        href: `/${cs.slug}`,
      }));
  }, [caseStudies]);

  const allProjects = useMemo(() => [...adminCards, ...PROJECTS], [adminCards]);
  const filtered = category === "All" ? allProjects : allProjects.filter((p) => p.category === category);

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
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const sel = [".csv2-grid", ".sd2-bench", ".v2-strip", ".v2-cta", ".v2-heading", ".v2-label", ".v2-lede"].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [allProjects.map(p => p.id).join(","), category]);

  /* stat numbers count up when scrolled in */
  useEffect(() => {
    const nums = rootRef.current.querySelectorAll(".sd2-bench-value");
    if (!nums.length) return;
    const run = (el) => {
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

      
      

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span>/</span>
                <em>Case Studies</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> {allProjects.length} documented projects</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>The problem, the build,</span></span>
                <span className="line"><span className="v2-hero-accent">and what changed.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Every case study here covers the same three things — what was
                broken, what we built, and the outcome — not just a screenshot gallery.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · CASE STUDIES — filterable grid, each card linking
          to its own detailed case-study page (challenges, solutions,
          outcomes, tools). ══════════ */}
      <section className="v2-section" id="case-studies">
        <p className="v2-label">Browse By Category</p>
        <h2 className="v2-heading">Filter by what you're building.</h2>

        <div className="csv2-filters" role="group" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`csv2-filter ${category === c ? "is-active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="csv2-grid is-in">
          {filtered.map((p) => (
            <a className="csv2-card" href={`/case-study/${toV2Slug(p.href)}`} key={p.id}>
              <div className="csv2-card-media">
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="csv2-card-cat">{p.category}</span>
              </div>
              <div className="csv2-card-body">
                <h3 className="csv2-card-title">{p.title}</h3>
                <p className="csv2-card-desc">{p.description}</p>
                <div className="csv2-card-tags">
                  {Array.isArray(p.tags) ? p.tags.slice(0, 4).map((t) => <span key={t}>{t}</span>) : null}
                </div>
                <span className="csv2-card-link">
                  Read case study <ArrowUpRight size={15} strokeWidth={1.8} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 3 · STATS ══════════ */}
      <section className="v2-section v2-section--void" id="stats">
        <p className="v2-label">By The Portfolio</p>
        <h2 className="v2-heading">Depth across a real range of work.</h2>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Codelix, across case studies</span>
            <span className="sd2-bench-bar-meta">Updated 2026</span>
          </div>
          <div className="sd2-bench-grid csv2-stats-grid">
            {STATS.map((b, i) => {
              const R = 52;
              const C = 2 * Math.PI * R;
              const offset = C - (C * b.ring) / 100;
              return (
                <div className="sd2-bench" key={b.label}>
                  <div className="sd2-bench-ring">
                    <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                      <defs>
                        <linearGradient id={`csv2-bench-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#csv2-bench-grad-${i})`}
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

      {/* ══════════ 4 · CLIENT STRIP ══════════ */}
      <ClientStrip />

      {/* ══════════ 5 · CTA ══════════ */}
      <CtaSection className="v2-section--void  csv2-cta-shell">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Like what you see?<br />Let's build yours next.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your project — scoped honestly,
            built the same way as everything above.
          </p>
          <div className="v2-cta-actions">
            <a className="v2-btn" href="/contact">Start a project →</a></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
            <FooterV2 />
    </div>
  );
}
