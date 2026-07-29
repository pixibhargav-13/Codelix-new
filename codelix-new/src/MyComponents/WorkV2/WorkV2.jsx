import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./WorkV2.css";

/* real project images — same source of truth as BestProjects.jsx, not
   new/invented visuals */
import projectOne from "../Images/work-best-project-one.png";
import projectTwo from "../Images/work-best-project-two.png";
import projectThree from "../Images/work-best-project-three.png";
import projectFour from "../Images/work-best-project-four.png";
import projectFive from "../Images/work-best-project-five.png";
import projectSix from "../Images/work-best-project-six.png";
import projectSeven from "../Images/work-best-project-seven.png";
import projectEight from "../Images/work-best-project-eight.png";
import projectNine from "../Images/work-best-project-nine.png";
import projectTen from "../Images/work-best-project-ten.png";
import projectEleven from "../Images/work-best-project-eleven.png";
import projectTwelve from "../Images/work-best-project-twelve.png";
import projectThirteen from "../Images/work-best-project-thirteen.png";
import projectFourteen from "../Images/work-best-project-fourteen.png";
import projectFifteen from "../Images/work-best-project-fifteen.png";

/* real client testimonials — same source of truth as Ourwork.jsx */
import logo1 from "../Images/Our-work-logo-one.png";
import logo2 from "../Images/Our-work-logo-two.png";
import logo3 from "../Images/Our-work-logo-three.png";
import logo4 from "../Images/Our-work-logo-four.png";
import logo5 from "../Images/Our-work-logo-five.png";

/* the full portfolio — same 15 real projects, descriptions, tags, and case
   study routes as BestProjects.jsx, not a new/invented list */
const PROJECTS = [
  { id: 1, title: "NextGen — Modern Fashion E-Commerce Website", category: "E-Commerce Solutions", description: "A modern and fully responsive e-commerce website built for a fashion and lifestyle brand offering clothing, eyewear, and accessories. Clean UI, intuitive navigation, and a shopping experience designed to maximize conversions.", tags: ["Nodejs", "ReactJS", "Postgres", "AWS"], image: projectOne, href: "/nextgen-case-study" },
  { id: 2, title: "A Custom ERP Solution for Industrial & Financial Workflows", category: "Custom Software Development", description: "A robust and scalable ERP system designed to handle complex industrial workflows, streamline financial processes, and support high-volume operational activities with accuracy and transparency.", tags: ["Spring Boot", "ReactJS", "MySQL", "AWS"], image: projectTwo, href: "/erp-case-study" },
  { id: 3, title: "A Smart Society Management App for Residential Communities", category: "Application Development", description: "A mobile application that digitizes everyday society operations — approvals, maintenance requests, payments, and community updates — making residential life more organized and transparent.", tags: ["Flutter", "Firebase", "AWS", "MySQL"], image: projectThree, href: "/smart-society-management-case-study" },
  { id: 4, title: "A Feature-Rich Mobile Marketplace for Buying & Selling Cars", category: "Application Development", description: "An automotive marketplace app for browsing vehicles with detailed specs, listing cars for sale, and comparing options — with secure flows, smart filters, and real-time updates.", tags: ["React Native", "Firebase", "AWS", "Postgres"], image: projectFour, href: "/car-marketplace-case-study" },
  { id: 5, title: "A High-Performance E-Commerce Platform for Book Collections", category: "E-Commerce Solutions", description: "An online storefront for book retail with smooth navigation, elegant product showcases, and an organized category structure that helps users discover titles easily.", tags: ["Nodejs", "ReactJS", "MongoDB", "AWS"], image: projectFive, href: "/book-collections-case-study" },
  { id: 6, title: "Modern Website UI/UX Design for a Creative Agency", category: "UI/UX Design", description: "A complete UI/UX design for a modern creative agency — bold visual identity, clean layout structures, and a smooth journey from hero to contact.", tags: ["Figma", "Canva", "Photoshop"], image: projectSix, href: "/modern-creative-agency-case-study" },
  { id: 7, title: "Modern HR Portal for Employee Benefits", category: "Web Development", description: "A responsive web platform to simplify employee benefits, claims, and HR administration — a clean dashboard for viewing benefits, submitting claims, and tracking approvals.", tags: ["AngularJS", "Postgres", "Django"], image: projectSeven, href: "/hr-portal-case-study" },
  { id: 8, title: "Organic Makhana Store — Responsive E-Commerce Platform", category: "E-Commerce Solutions", description: "An e-commerce website for a premium makhana brand — multiple product categories, mobile-first layout, and optimised product pages to support conversion.", tags: ["Nodejs", "ReactJS", "Postgres", "AWS"], image: projectEight, href: "/makhana-store-case-study" },
  { id: 9, title: "Modern EdTech Website for Online Courses", category: "Web Development", description: "A web platform for an online learning experience — structured course pages, fast performance, and mobile responsiveness for a simple, engaging enrolment flow.", tags: ["ReactJS", "MongoDB", "Spring Boot"], image: projectNine, href: "/edtech-case-study" },
  { id: 10, title: "Custom Payroll Management System — Web & Mobile", category: "Custom Software Development", description: "A payroll management system for salary processing, attendance tracking, and financial reporting — with a responsive web dashboard and mobile interface.", tags: ["Spring Boot", "AngularJS", "MySQL", "AWS"], image: projectTen, href: "/payroll-case-study" },
  { id: 11, title: "Elegant Creative Agency Website — UI/UX Design", category: "UI/UX Design", description: "A high-end UI/UX design for a modern creative studio — dark-mode aesthetics, clean grids, and strong typography to showcase projects boldly.", tags: ["Figma", "Canva"], image: projectEleven, href: "/elegant-creative-agency-case-study" },
  { id: 12, title: "AI-Powered Design Platform — UI/UX Concept", category: "UI/UX Design", description: "A futuristic UI/UX concept for an AI-powered design platform — bold visuals, modern gradients, and a layout centered on simplicity and high visual impact.", tags: ["Framer", "Canva"], image: projectTwelve, href: "/ai-powered-design-case-study" },
  { id: 13, title: "Freight & Shipping Web Platform", category: "Web Development", description: "A responsive website for an international ocean freight and logistics provider — global cargo solutions, shipment tracking, and service categories through a clean interface.", tags: ["ReactJS", "MongoDB", "Nodejs"], image: projectThirteen, href: "/freight-shipping-case-study" },
  { id: 14, title: "Smart Business Operations System", category: "Custom Software Development", description: "A custom system to manage business operations — a web dashboard and mobile-friendly interface covering order tracking, inventory, staff workflows, and reporting.", tags: ["Spring Boot", "ReactJS", "Postgres", "AWS"], image: projectFourteen, href: "/smart-business-case-study" },
  { id: 15, title: "Modern School Management Mobile Application", category: "Application Development", description: "A mobile app to streamline school operations, student schedules, and daily academic activity — classes, timetables, announcements, and academic updates.", tags: ["Flutter", "Firebase", "MongoDB", "Django"], image: projectFifteen, href: "/school-management-case-study" },
];

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
];

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
  { q: "Is everything shown here real client work?", a: "Almost all of it — a couple of pieces (like the AI design platform) are concept explorations rather than live client builds, and we say so plainly in the case study itself." },
  { q: "Can we speak to a past client before signing?", a: "Yes, on request for shortlisted proposals — we'll connect you with a comparable past client where confidentiality allows." },
  { q: "Do you sign NDAs before sharing more project detail?", a: "Yes — standard practice before any confidential scope discussion." },
  { q: "Why don't all projects link to a live site?", a: "Some are private client deployments we can't publicly link to. The case study covers what we're able to share." },
];

export default function WorkV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [spotlightVisible, setSpotlightVisible] = useState(false);
  const [filter, setFilter] = useState("All");
  const [testimonial, setTestimonial] = useState(0);

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
        } else if (el.classList.contains("wv-spotlight")) {
          setSpotlightVisible(true);
        } else {
          el.classList.add("is-in");
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
    let raf = 0, x = 0, isPaused = false, last = performance.now();
    const step = (now) => {
      const dt = now - last; last = now;
      if (!isPaused) {
        x -= 0.00125 * dt;
        if (x <= -50) x += 50;
        track.style.transform = `translateX(${x}%)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const wrap = track.parentElement;
    const on = () => { isPaused = true; };
    const off = () => { isPaused = false; };
    wrap.addEventListener("mouseenter", on);
    wrap.addEventListener("mouseleave", off);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mouseenter", on);
      wrap.removeEventListener("mouseleave", off);
    };
  }, []);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

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
            <em>Work</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> 15+ real projects, six industries</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Real constraints.</span></span>
                <span className="line"><span className="v2-hero-accent">Real shipped work.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Every project below solved an actual problem for an actual
                business — no concept mockups dressed up as case studies.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="/contact-v2">
                  <span>Start your project</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <a className="v2-hero-secondary" href="#projects">
                  <span className="v2-hero-secondary-label">Browse all work</span>
                </a>
              </div>
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
                  <a className="v2-btn v2-btn--filled" href={p.href}>
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

        <div className="wv-grid">
          {filtered.map((p) => (
            <a className="wv-card" href={p.href} key={p.id}>
              <div className="wv-card-media">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="wv-card-body">
                <span className="wv-card-cat">{p.category}</span>
                <h3 className="wv-card-title">{p.title}</h3>
                <div className="wv-card-tags">
                  {p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
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
      <section className="v2-section" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Before you reach out.</h2>
          </div>
          <p className="v2-lede v2-faq-note">
            Want to see something specific? <a href="/contact-v2">Ask us directly →</a>
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

      {/* ══════════ 7 · CLIENT STRIP ══════════ */}
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

      {/* ══════════ 8 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Like what you see?<br />Let's build yours next.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your project — scoped honestly,
            built the same way as everything above.
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
