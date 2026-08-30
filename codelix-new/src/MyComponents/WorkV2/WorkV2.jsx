import React, { useEffect, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./WorkV2.css";

/* real client testimonials — same source of truth as Ourwork.jsx */
import logo1 from "../Images/Our-work-logo-one.png";
import logo2 from "../Images/Our-work-logo-two.png";
import logo3 from "../Images/Our-work-logo-three.png";
import logo4 from "../Images/Our-work-logo-four.png";
import logo5 from "../Images/Our-work-logo-five.png";

/* the full portfolio — extracted to its own module so WorkV2 and
   CaseStudyV2 share one source of truth instead of duplicating it */
import { PROJECTS } from "./projectsData";
import { useCaseStudies } from "../CaseStudyDetailV2/useCaseStudies";
import NavbarV2 from "../Shared/NavbarV2";
import WorkHeroVisual from "./WorkHeroVisual";
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import ClientStrip from '../Shared/ClientStrip';
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";


/* the spotlight — a curated, diverse subset of the same 15 real projects
   above (not new content), one per major category */
const FEATURED_IDS = [1, 2, 3, 4, 7];
const FEATURED = FEATURED_IDS.map((id) => PROJECTS.find((p) => p.id === id));

const CATEGORIES = [
  "All",
  "Web Development",
  "Application Development",
  "UI/UX Design",
  "E-Commerce Solutions",
  "Custom Software Development",
  "AI Development",
  "Data Analytics",
];

const INDUSTRIES = [
  "All Industries",
  "Manufacturing",
  "FinTech",
  "Ai & Data",
  "Healthcare",
  "Food and Bavarages",
  "E-commerce",
  "Real estae and construction",
  "Education",
  "Startups",
  "B2B SaaS",
  "Travel & Hospitality"
];

/* every project in PROJECTS now has a matching v2 case-study page (see
   CaseStudyDetailV2/caseStudiesData.js), so every card routes through
   /case-study rather than a bare v1 href */
const linkFor = (p) => `/case-study${p.href}`;

/* same five real client quotes already used in Ourwork.jsx, not new/invented
   attributions */
const TESTIMONIALS = [
  { logo: logo1, quote: "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule. We'll always work on the project with them.", name: "Rajesh Patel", role: "CEO, Harmony Inc." },
  { logo: logo2, quote: "Their communication and problem-solving skills are top-notch. The entire workflow was smooth and professional.", name: "Priya Sharma", role: "Founder, Nexa Digital" },
  { logo: logo3, quote: "Amazing team! Delivered everything on time with exceptional quality. Totally recommend!", name: "Amit Kumar", role: "CTO, PixelWave" },
  { logo: logo4, quote: "Honestly, we were struggling to keep up with our growth until they stepped in. They didn't just build the tech, they actually understood our users. It's been a total game-changer for our workflow.", name: "Emily Watson", role: "Director, Nova Corp" },
  { logo: logo5, quote: "What I love most is that they don't just say 'yes' to everything — they tell us what's actually going to work. The whole process felt super collaborative.", name: "Chris Taylor", role: "COO, Orbit Labs" },
];

const STATS = [
  { value: 15, suffix: "+", label: "Projects delivered", note: "Shown here — more shipped privately", ring: 75 },
  { value: 6, suffix: "", label: "Industries covered", note: "Not one narrow niche", ring: 60 },
  { value: 100, suffix: "%", label: "Source-code ownership", note: "Every project, no exceptions", ring: 100 },
];

const FAQS = [
  { q: "Is everything shown here real client work?", a: "Yes. Every project shown here is a real client build." },
  { q: "Can we speak to a past client before signing?", a: "Yes, on request for shortlisted proposals — we'll connect you with a comparable past client where confidentiality allows." },
  { q: "Do you sign NDAs before sharing more project detail?", a: "Yes — standard practice before any confidential scope discussion." },
  { q: "Why don't all projects link to a live site?", a: "Some are private client deployments we can't publicly link to. The case study covers what we're able to share." },
];

export default function WorkV2() {
  
  
  
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [spotlightVisible, setSpotlightVisible] = useState(false);
  const [filter, setFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [testimonial, setTestimonial] = useState(0);

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
      .fromTo(q(".wv-hero-visual-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.2 }, "-=.8");
    return () => tl.kill();
  }, []);

  /* reveal-on-enter — IntersectionObserver, no stale cached scroll positions */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-in");
        
        if (el.classList.contains("wv-spotlight")) {
          setSpotlightVisible(true);
        }
        
        io.unobserve(el);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const sel = [
      ".wv-spotlight", ".wv-grid", ".wv-testimonial", ".sd2-bench", ".v2-faq-item", ".v2-strip", ".v2-cta",
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

  /* admin-created case studies (published via Supabase) aren't part of the
     static PROJECTS list, so they need to be reshaped into the same
     card-shape PROJECTS already has before they can slot into this grid —
     additive only, the existing 15 keep coming from PROJECTS untouched.
     Same merge as CaseStudyV2.jsx's listing, so a new case study shows up
     in both places once published. */
  const caseStudies = useCaseStudies();
  const adminProjects = React.useMemo(() => {
    const existingSlugs = new Set(PROJECTS.map((p) => p.href.replace("/", "")));
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

  const allWorkProjects = React.useMemo(() => [...adminProjects, ...PROJECTS], [adminProjects]);

  const filtered = allWorkProjects.filter((p) => {
    const matchCategory = filter === "All" || p.category === filter;
    const matchIndustry = industryFilter === "All Industries" || p.industry === industryFilter;
    return matchCategory && matchIndustry;
  });

  return (
    <div className="v2 v2-work" ref={rootRef}>
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
                <em>Work</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> 15+ real projects, six industries</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Real constraints.</span></span>
                <span className="line"><span className="v2-hero-accent">Real shipped work.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Every project below solved an actual problem for an actual
                business.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="/contact">
                  <span>Start your project</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <a className="v2-hero-secondary" href="#projects">
                  <span className="v2-hero-secondary-label">Browse all work</span>
                </a>
              </div>
            </div>
            
            <div className="wv-hero-visual-reveal">
              <WorkHeroVisual />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · SPOTLIGHT — auto-advancing featured showcase
          (the extraordinary section). Each segment is a self-contained
          bar + fill; the active fill is a freshly-keyed element whose CSS
          animation drives both the visual progress and the auto-advance
          (via onAnimationEnd) — no separate JS timer to keep in sync. ══════════ */}
      <section className="v2-section" id="spotlight">
        <p className="v2-label">Featured Work</p>
        <h2 className="v2-heading">Five projects, five different problems.</h2>
        <p className="v2-lede">
          A cross-section of the work below — one from each major category we build in.
        </p>

        <div
          className={`wv-spotlight ${spotlightVisible ? "is-in" : ""} ${paused ? "is-paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="wv-spotlight-segs" role="tablist" aria-label="Featured projects">
            {FEATURED.map((p, i) => (
              <button
                key={p.id}
                className="wv-seg"
                role="tab"
                aria-selected={i === active}
                aria-label={p.title}
                onClick={() => setActive(i)}
              >
                <span className="wv-seg-track">
                  {i < active && <span className="wv-seg-fill wv-seg-fill--done" />}
                  {i === active && (
                    <span
                      key={active}
                      className="wv-seg-fill wv-seg-fill--active"
                      onAnimationEnd={() => {
                        if (paused) return;
                        setActive((a) => (a + 1) % FEATURED.length);
                      }}
                    />
                  )}
                </span>
                <span className="wv-seg-label">{p.title.split("—")[0].split(":")[0].trim()}</span>
              </button>
            ))}
          </div>

          <div className="wv-spotlight-stage">
            {FEATURED.map((p, i) => (
              <div className={`wv-spotlight-panel ${i === active ? "is-active" : ""}`} key={p.id}>
                <div className="wv-spotlight-media">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <div className="wv-spotlight-info">
                  <span className="wv-spotlight-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="wv-spotlight-cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="wv-spotlight-tags">
                    {p.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <a className="v2-btn v2-btn--filled" href={linkFor(p)}>
                    <span>View case study</span>
                    <i className="v2-btn-arrow">→</i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3 · ALL PROJECTS — filterable grid ══════════ */}
      <section className="v2-section v2-section--void" id="projects">
        <p className="v2-label">All Projects</p>
        <h2 className="v2-heading">The full portfolio.</h2>

        <div className="wv-filters-container">
          <div className="wv-filters" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`wv-filter ${filter === c ? "is-active" : ""}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="wv-filter-industry">
            <select 
              value={industryFilter} 
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="wv-industry-select"
              aria-label="Filter by industry"
            >
              {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>
        </div>

        <div className="wv-grid is-in">
          {filtered.map((p) => (
            <a className="wv-card" href={linkFor(p)} key={p.id}>
              <div className="wv-card-media">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="wv-card-body">
                <span className="wv-card-cat">{p.category}</span>
                <h3 className="wv-card-title">{p.title}</h3>
                <div className="wv-card-tags">
                  {Array.isArray(p.tags) ? p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>) : null}
                </div>
              </div>
              <span className="wv-card-arrow" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.8} /></span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 4 · STATS ══════════ */}
      <section className="v2-section" id="stats">
        <p className="v2-label">By The Portfolio</p>
        <h2 className="v2-heading">Depth across a real range of work.</h2>
        <div className="sd2-bench-panel">
          <div className="sd2-bench-bar">
            <span className="sd2-bench-bar-dot" aria-hidden="true" />
            <span className="sd2-bench-bar-title">Codelix, across projects</span>
            <span className="sd2-bench-bar-meta">Updated 2026</span>
          </div>
          <div className="sd2-bench-grid wv-stats-grid">
            {STATS.map((b, i) => {
              const R = 52;
              const C = 2 * Math.PI * R;
              const offset = C - (C * b.ring) / 100;
              return (
                <div className="sd2-bench" key={b.label}>
                  <div className="sd2-bench-ring">
                    <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                      <defs>
                        <linearGradient id={`wv-bench-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                          <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                        </linearGradient>
                      </defs>
                      <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                      <circle
                        className="sd2-bench-ring-fill"
                        cx="60" cy="60" r={R}
                        stroke={`url(#wv-bench-grad-${i})`}
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

      {/* ══════════ 5 · CLIENT TESTIMONIALS — same real quotes as
          Ourwork.jsx ══════════ */}
      <section className="v2-section v2-section--void" id="testimonials">
        <p className="v2-label">In Their Words</p>
        <h2 className="v2-heading">What it's like working with us.</h2>

        <div className="wv-testimonial">
          <div className="wv-testimonial-quote">
            <span className="wv-testimonial-mark" aria-hidden="true">“</span>
            <p>{TESTIMONIALS[testimonial].quote}</p>
            <div className="wv-testimonial-person">
              <span className="wv-testimonial-avatar">{TESTIMONIALS[testimonial].name[0]}</span>
              <div>
                <strong>{TESTIMONIALS[testimonial].name}</strong>
                <span>{TESTIMONIALS[testimonial].role}</span>
              </div>
            </div>
          </div>
          <div className="wv-testimonial-list">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                className={`wv-testimonial-logo ${i === testimonial ? "is-active" : ""}`}
                onClick={() => setTestimonial(i)}
                aria-label={t.name}
              >
                <img src={t.logo} alt="" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 6 · FAQ ══════════ */}
      <FaqSection faqs={FAQS} />

      {/* ══════════ 7 · CLIENT STRIP ══════════ */}
      <ClientStrip />

      {/* ══════════ 8 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Bring us the problem.
            <br />
            <span className="v2-cta-accent">We'll bring back a scoped plan.</span>
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your product — your users, your workflows, your constraints.
            We scope what should be built first, what can wait, and what it takes to ship it.
          </p>
          <div className="v2-cta-actions">
            <a className="v2-btn" href="/contact">Book a consultation →</a></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
            <FooterV2 />
    </div>
  );
}
