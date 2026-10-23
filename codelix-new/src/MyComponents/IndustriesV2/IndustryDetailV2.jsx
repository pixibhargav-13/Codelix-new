import React, { useEffect, useRef, useState } from "react";
import { SEO } from "../../components/SEO";
import { StructuredData } from "../../components/StructuredData";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import {
  Check, XCircle, FileCheck2, Layers3, Timer, KeyRound,
  Globe, Smartphone, PenTool, ShoppingCart, Code2, Sparkles, BarChart3,
} from "lucide-react";
import FooterV2 from "../Shared/FooterV2";
import NavbarV2 from "../Shared/NavbarV2";
import TestimonialSpotlight from "../Shared/TestimonialSpotlight";
import { TECH_STACK } from "../HomepageV2/techStack";
import { INDUSTRIES, industryBySlug, WORK_INDUSTRY_MAP } from "./industriesData";
import { caseStudyCard } from "../../lib/caseStudyRow";
import { useCaseStudies } from "../CaseStudyDetailV2/useCaseStudies";
import { useTestimonials } from "../../data/useTestimonials";

import "../HomepageV2/HomepageV2.css";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./IndustriesV2.css";
import "./IndustryDetailV2.css";
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import ClientStrip from '../Shared/ClientStrip';
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";

/* the 7 core service names that ever appear in industriesData.js's
   `services` arrays — real routes to the actual core service pages, not
   invented ones, plus one honest line on why that service shows up in
   this kind of engagement */
const SERVICE_INFO = {
  "Web Development": { icon: Globe, path: "/services/web-development", body: "The public-facing or client-facing surface — built for speed and clarity, not just to look finished in a demo." },
  "Application Development": { icon: Smartphone, path: "/services/application-development", body: "The mobile or SaaS layer, when the work needs to live beyond a browser tab." },
  "UI/UX Design": { icon: PenTool, path: "/services/ui-ux-design", body: "The interface work, done before code — so the build doesn't get redesigned halfway through." },
  "E-Commerce Solutions": { icon: ShoppingCart, path: "/services/e-commerce-solutions", body: "The storefront and checkout layer, engineered around conversion and reliability under real traffic." },
  "Custom Software Development": { icon: Code2, path: "/services/custom-software-development", body: "The system underneath — internal tools, workflows, or a backend built around how you actually operate." },
  "AI Development": { icon: Sparkles, path: "/services/ai-development", body: "AI features scoped to a real question in this workflow, not bolted on for the sake of a feature list." },
  "Data Analytics": { icon: BarChart3, path: "/services/data-analytics", body: "The reporting and dashboard layer, built on data your team can actually trust." },
};

/* fallback shown before Supabase responds — same 5 real quotes used on
   the Homepage carousel and About/Team pages, so this page also
   auto-rotates through live, admin-editable testimonials instead of one
   static quote frozen at build time. */
const STATIC_QUOTES = [
  { quote: "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule.", name: "Rajesh Patel", position: "CEO, Harmony Inc." },
  { quote: "Their communication and problem-solving skills are top-notch. The entire workflow was smooth and professional.", name: "Priya Sharma", position: "Founder, Nexa Digital" },
  { quote: "Amazing team! Delivered everything on time with exceptional quality. Totally recommend!", name: "Amit Kumar", position: "CTO, PixelWave" },
  { quote: "Honestly, we were struggling to keep up with our growth until they stepped in. They didn't just build the tech; they actually understood our users. It's been a total game-changer for our workflow, and the design is just spot on.", name: "Emily Watson", position: "Director, Nova Corp" },
  { quote: "What I love most is that they don't just say 'yes' to everything — they tell us what's actually going to work. The whole process felt super collaborative, and they genuinely cared about making the project a success.", name: "Chris Taylor", position: "COO, Orbit Labs" },
];

/* same real, site-wide facts already shown on the Industries listing
   page (STATS in IndustriesV2.jsx) — presented as a horizontal ticker
   here instead of ring gauges, since sd2-bench-panel already owns that
   visual everywhere else. */
const TICKER_FACTS = [
  "11 industries served",
  "40+ projects across sectors",
  "Fixed scope, fixed price",
];

/* the honest, universal questions a discovery call actually opens
   with — true regardless of sector, personalized only by dropping the
   industry name in, not by inventing sector-specific specifics we don't
   have. Card front = the question, back = why we ask it. */
const firstCallQuestions = (title) => [
  { q: `What's actually broken in your ${title.toLowerCase()} workflow today?`, a: "Not what should be broken — what's actually costing you time or money right now. That's where real scoping starts." },
  { q: "Who touches this system day to day?", a: "The people using it daily notice friction a stakeholder brief never mentions. We talk to them directly whenever we can." },
  { q: "What's the one thing this absolutely can't get wrong?", a: "Every project has a non-negotiable — a compliance rule, a peak-load moment, a data type. We scope around that first, not last." },
  { q: "What happens if you do nothing?", a: "Sometimes the honest answer is 'not much yet.' We'd rather tell you that than invent urgency to close a deal." },
];

export default function IndustryDetailV2() {
  const { slug } = useParams();
  const svc = industryBySlug(slug);

  const [blueprintActive, setBlueprintActive] = useState(-1);
  const [flippedCard, setFlippedCard] = useState(-1);

  const rootRef = useRef(null);
  const shiftWrapRef = useRef(null);
  const shiftStageRef = useRef(null);
  const blueprintWrapRef = useRef(null);
  const blueprintPathRef = useRef(null);
  const blueprintActiveRef = useRef(-1);

  const blueprintServices = (svc?.services || []).map((name) => ({ name, ...SERVICE_INFO[name] })).filter((s) => s.icon);
  const testimonials = useTestimonials(STATIC_QUOTES);
  const { studies: caseStudies } = useCaseStudies();

  /* hero intro — masked-line GSAP wipe, matching every other v2 hero */
  useEffect(() => {
    if (!svc) return;
    const q = (s) => rootRef.current.querySelectorAll(s);
    splitTitleLinesIn(rootRef.current, ".sd2-hero-title");
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"), { yPercent: 118 }, { yPercent: 0, duration: 1.15 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".sd2-facts.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.75");
    return () => tl.kill();
  }, [svc]);

  /* reveal-on-enter. This page adds a couple of async data sources
     (live testimonials, live case studies) that other detail pages don't
     have, and a scroll-triggered observer that only ever runs its
     querySelectorAll once on mount can end up missing elements if the
     browser doesn't fire an intersection callback for something already
     in view at setup time — the result is a section stuck permanently at
     opacity:0, invisible forever, exactly what showed up in the "Other
     sectors" and testimonial sections. Two fixes: re-run the observer
     whenever the async data actually changes shape (not just once), and
     force-reveal anything still unrevealed after a short grace period as
     a hard safety net so nothing can stay invisible indefinitely. */
  useEffect(() => {
    if (!svc) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        
          el.classList.add("is-in");
        
        io.unobserve(el);
      }),
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    const sel = [
      ".v2-faq-item", ".v2-strip", ".v2-cta", ".v2-heading", ".v2-label", ".v2-lede", ".sd2-other", ".sd2-quote",
    ].join(", ");
    const targets = rootRef.current?.querySelectorAll(sel) || [];
    targets.forEach((el) => io.observe(el));

    const safety = setTimeout(() => {
      targets.forEach((el) => {
        if (el.classList.contains("v2-faq-item")) return;
        el.classList.add("is-in");
      });
    }, 2000);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [svc, testimonials.length, caseStudies.length]);

  /* the extraordinary section — "The Shift": a scroll-driven wipe reveal.
     A tall wrapper gives the section scroll length; the stage inside pins
     via position:sticky. Scroll progress through that wrapper drives a
     single CSS custom property (--wipe, 0% → 100%) on the stage, and a
     clip-path on the "after" panel (absolutely positioned on top of the
     "before" panel) uses that same value to sweep left-to-right, revealing
     the fixed state underneath the problem state row by row. Nothing else
     on the site uses a clip-path scroll-wipe — every other scroll effect
     here uses opacity/scale/rotate/sticky-stacking instead. */
  useEffect(() => {
    if (!svc) return;
    const wrap = shiftWrapRef.current;
    const stage = shiftStageRef.current;
    if (!wrap || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.style.setProperty("--wipe", "100%");
      return;
    }
    let raf = 0;
    const tick = () => {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.7;
      const raw = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      stage.style.setProperty("--wipe", `${raw * 100}%`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [svc]);

  /* second extraordinary section — "The Build, Layer by Layer": a thin
     SVG spine down the middle of the real services this industry uses,
     drawn in via stroke-dashoffset as the reader scrolls (a path-draw
     reveal — a third distinct mechanism on this page, after the clip-path
     wipe above; nothing here is a click-driven quiz). Each service node
     lights up once the drawn line reaches it, computed from the same
     scroll fraction rather than a separate observer per node. */
  useEffect(() => {
    if (!svc) return;
    const wrap = blueprintWrapRef.current;
    const path = blueprintPathRef.current;
    if (!wrap || !path) return;
    const total = blueprintServices.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      setBlueprintActive(total - 1);
      return;
    }
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    let raf = 0;
    const tick = () => {
      const rect = wrap.getBoundingClientRect();
      let span = rect.height - window.innerHeight * 0.35;
      if (span < rect.height * 0.3) span = rect.height * 0.3;
      const raw = Math.min(Math.max((window.innerHeight * 0.6 - rect.top) / span, 0), 1);
      path.style.strokeDashoffset = `${len * (1 - raw)}`;
      const active = Math.floor(raw * total + 0.0001) - (raw >= 1 ? 0 : 0);
      const clamped = Math.min(Math.max(active, raw > 0 ? 0 : -1), total - 1);
      if (clamped !== blueprintActiveRef.current) {
        blueprintActiveRef.current = clamped;
        setBlueprintActive(clamped);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [svc, blueprintServices.length]);

  if (!svc) {
    return (
      <div className="v2" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <h1 style={{ color: "#fff", fontSize: 28 }}>Industry not found.</h1>
        <Link className="v2-btn" to="/industries">Back to Industries →</Link>
      </div>
    );
  }

  /* real matches only: case studies whose industry (set in the admin
     panel, from the same option list) matches this page. Nothing invented;
     an industry with no match simply skips this section entirely. */
  const toggleFlip = (i) => setFlippedCard((prev) => (prev === i ? -1 : i));
  const questions = firstCallQuestions(svc.title);

  const matchedWork = caseStudies
    .map(caseStudyCard)
    .filter((p) => p.image && p.industry === WORK_INDUSTRY_MAP[svc.slug])
    .slice(0, 3)
    .map((p) => ({ image: p.image, category: p.category, title: p.title, href: `/case-study${p.href}` }));
  const otherIndustries = INDUSTRIES.filter((i) => i.slug !== svc.slug).slice(0, 6);
  const faqs = [
    { q: `Do you have real experience in ${svc.title.toLowerCase()}?`, a: `Yes — ${svc.title} is one of the sectors we take on repeat work in, not a first attempt. See the problems and process above for what that looks like in practice.` },
    { q: "How is this priced?", a: "Fixed scope, fixed price — you get a written quote before any work starts, based on what you actually need, not an hourly guess." },
    { q: "We're not exactly this sector — can you still help?", a: "Almost certainly. This page describes where we have the deepest repeat experience, not a hard boundary. Tell us what you're building and we'll tell you honestly if it's a fit." },
    { q: "What happens after launch?", a: "Every project includes a post-launch support window for fixes. After that, you can keep us on a monthly retainer for updates, fixes, and support." },
  ];

  return (
    <div className="v2" ref={rootRef}>
      <SEO title={svc.seoTitle || `${svc.title} Software Solutions | Codelix IT Solutions`} description={svc.seoDescription || svc.tagline} keywords={svc.keywords} />
      <StructuredData type="Service" data={{ name: `${svc.title} software development`, description: svc.seoDescription || svc.tagline }} />
      <div className="v2-progress" aria-hidden="true"><span /></div>

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
                <Link to="/industries">Industries</Link>
                <span>/</span>
                <em>{svc.title}</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Industry</span>
                <h1 className="v2-hero-eyebrow">{svc.title} Software Development</h1>
              </div>
              <h2 key={slug} className="sd2-hero-title">
                <span className="line"><span>{svc.title}</span></span>
              </h2>
              <p className="sd2-hero-sub sv2-hero-reveal">{svc.tagline}</p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Talk about your sector</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                <a className="v2-hero-secondary" href="#shift">
                  <span className="v2-hero-secondary-label">See the shift</span>
                </a>
              </div>
            </div>

            <aside className="sd2-facts sv2-hero-reveal">
              {[
                ["Sector", svc.title],
                ["Typical timeline", "2–12 weeks"],
                ["Post-launch", "Support included"],
              ].map(([k, v]) => (
                <div className="sd2-fact" key={k}>
                  <span className="sd2-fact-k">{k}</span>
                  <span className="sd2-fact-v">{v}</span>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </header>

      {/* ══════════ TICKER — a continuous horizontal marquee of real,
          site-wide facts. The stats exist elsewhere too (the Industries
          listing page), but always as ring gauges — this is a different
          treatment (a moving strip, no numbers counting up on scroll). */}
      <div className="ind2-ticker" aria-hidden="true">
        <div className="ind2-ticker-track">
          {[...TICKER_FACTS, ...TICKER_FACTS, ...TICKER_FACTS, ...TICKER_FACTS].map((f, i) => (
            <span key={i}>{f}</span>
          ))}
        </div>
      </div>

      {/* ══════════ SECTOR OVERVIEW — a large editorial statement built
          from svc.body, real copy that existed in the data but had no
          home anywhere on this page until now. A giant watermark index
          number behind the text is the only decoration — no card, no
          grid, nothing borrowed from another section on the site. */}
      <section className="v2-section ind2-overview" id="overview">
        <span className="ind2-overview-mark" aria-hidden="true">
          {String(INDUSTRIES.findIndex((i) => i.slug === svc.slug) + 1).padStart(2, "0")}
        </span>
        <p className="v2-label">In Short</p>
        <p className="ind2-overview-text">{svc.body}</p>
      </section>

      {/* ══════════ 2b · CLIENT STRIP ══════════ */}
      <ClientStrip />

      {/* ══════════ 3 · THE SHIFT — extraordinary scroll-wipe section ══════════ */}
      <section className="v2-section" id="shift">
        <p className="v2-label">The Shift</p>
        <h2 className="v2-heading">From daily friction to a system that holds.</h2>
        <p className="v2-lede">Scroll to sweep from where things stand today to what changes.</p>

        <div className="ind2-shift-wrap" ref={shiftWrapRef}>
          <div className="ind2-shift-sticky">
            <div className="ind2-shift-stage" ref={shiftStageRef}>
              <div className="ind2-shift-before">
                <span className="ind2-shift-tag ind2-shift-tag--before">Before</span>
                {svc.problems.map((p) => (
                  <div className="ind2-shift-row" key={p.pain}>
                    <span className="ind2-shift-icon ind2-shift-icon--before"><XCircle size={16} strokeWidth={1.8} /></span>
                    <p>{p.pain}</p>
                  </div>
                ))}
              </div>
              <div className="ind2-shift-after">
                <span className="ind2-shift-tag ind2-shift-tag--after">With Codelix</span>
                {svc.problems.map((p) => (
                  <div className="ind2-shift-row" key={p.fix}>
                    <span className="ind2-shift-icon ind2-shift-icon--after"><Check size={16} strokeWidth={2} /></span>
                    <p>{p.fix}</p>
                  </div>
                ))}
              </div>
              <span className="ind2-shift-scanline" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ THIRD SECTION UNIQUE TO THIS PAGE: THE SECTOR FILE —
          a case-file/dossier styled panel, built only from this industry's
          real data (no invented process steps or "principles" copy shared
          with every other detail page on the site). No shared section
          classes reused here — its own layout, purpose-built for this
          page only. ══════════ */}
      <section className="v2-section v2-section--void" id="dossier">
        <p className="v2-label">The Sector File</p>
        <h2 className="v2-heading">What we already know, before the first call.</h2>
        <div className="ind2-file">
          <div className="ind2-file-tab">
            <span>SECTOR // {svc.slug.toUpperCase().replace(/-/g, "·")}</span>
            <span>FILE 01</span>
          </div>
          <div className="ind2-file-body">
            <div className="ind2-file-mark" aria-hidden="true"><svc.icon size={120} strokeWidth={0.8} /></div>
            <div className="ind2-file-main">
              <h3>{svc.title}</h3>
              <p>{svc.tagline}</p>
            </div>
            <dl className="ind2-file-specs">
              <div>
                <dt><FileCheck2 size={14} strokeWidth={1.8} /> Problems on record</dt>
                <dd>{svc.problems.length} recurring, see "The Shift" above</dd>
              </div>
              <div>
                <dt><Layers3 size={14} strokeWidth={1.8} /> Services involved</dt>
                <dd>{svc.services.join(" · ")}</dd>
              </div>
              <div>
                <dt><Timer size={14} strokeWidth={1.8} /> Typical timeline</dt>
                <dd>2–12 weeks, scope-dependent</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ══════════ REAL WORK IN THIS SECTOR — actual shipped projects
          matched by industry (not category), a real cross-reference that
          didn't exist on this page before. Renders nothing at all when
          there's no genuine match, rather than padding with unrelated
          work. ══════════ */}
      {matchedWork.length > 0 && (
        <section className="v2-section v2-section--void" id="sector-work">
          <p className="v2-label">Real Work</p>
          <h2 className="v2-heading">Already shipped in {svc.title.toLowerCase()}.</h2>
          <div className="ind2-work-row">
            {matchedWork.map((w) => (
              <Link className="ind2-work-card" to={w.href} key={w.href}>
                <span className="ind2-work-media">
                  <img src={w.image} alt={w.title} loading="lazy" />
                </span>
                <span className="ind2-work-cat">{w.category}</span>
                <span className="ind2-work-title">{w.title}</span>
                <span className="ind2-work-go">Read case study →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 6 · TECH ══════════ */}
      <section className="v2-section v2-tech" id="stack">
        <div className="v2-tech-head">
          <div>
            <p className="v2-label">Our Broader Stack</p>
            <h2 className="v2-heading">What we build with.</h2>
          </div>
          <p className="v2-lede">
            Chosen per project, not by habit — the right tool for your scale,
            your team, and what you'll need to maintain.
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

      {/* ══════════ 7 · TESTIMONIAL — live, admin-editable, auto-rotating
          (same pattern as Homepage/About/Team), instead of one quote
          frozen at build time ══════════ */}
      <TestimonialSpotlight
        testimonials={testimonials}
        label="Client Voices"
        heading={`What clients say about our ${svc.title.toLowerCase()} work.`}
        stats={[
          { num: "11", label: "Industries served" },
          { num: "40+", label: "Projects across sectors" },
        ]}
      />

      {/* ══════════ EXTRAORDINARY SECTION: THE BUILD, LAYER BY LAYER — a
          scroll-drawn SVG spine connecting the real services this industry
          uses, each node lighting up as the line reaches it. Passive,
          scroll-driven, and a different visual mechanism from "The Shift"
          above (path-draw vs clip-path wipe) — no quiz, no click required. */}
      <section className="v2-section" id="blueprint">
        <p className="v2-label">The Build</p>
        <h2 className="v2-heading">What actually goes into this, layer by layer.</h2>
        <p className="v2-lede">Scroll to trace how the real services below combine for {svc.title.toLowerCase()}.</p>

        <div className="ind2-bp-wrap" ref={blueprintWrapRef}>
          <svg className="ind2-bp-spine" viewBox={`0 0 2 ${blueprintServices.length * 200}`} preserveAspectRatio="none" aria-hidden="true">
            <path d={`M1 0 L1 ${blueprintServices.length * 200}`} className="ind2-bp-spine-track" />
            <path ref={blueprintPathRef} d={`M1 0 L1 ${blueprintServices.length * 200}`} className="ind2-bp-spine-draw" />
          </svg>

          <div className="ind2-bp-nodes">
            {blueprintServices.map((s, i) => (
              <Link
                className={`ind2-bp-node ${i <= blueprintActive ? "is-lit" : ""}`}
                to={s.path}
                key={s.name}
              >
                <span className="ind2-bp-node-dot" aria-hidden="true" />
                <span className="ind2-bp-node-icon"><s.icon size={20} strokeWidth={1.5} /></span>
                <span className="ind2-bp-node-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ind2-bp-node-title">{s.name}</h3>
                <p className="ind2-bp-node-body">{s.body}</p>
                <span className="ind2-bp-node-go">View this service →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHAT WE'D ASK FIRST — a 3D flip-card grid. Click a
          card to flip it (not hover — works on touch too) and see why we
          ask. Genuinely honest, universal discovery questions, not
          sector-specific claims we can't back up. A fourth distinct
          interaction mechanic on this page (flip, after wipe / draw /
          marquee), and the only click-to-reveal one. ══════════ */}
      <section className="v2-section" id="first-call">
        <p className="v2-label">Before Anything Gets Built</p>
        <h2 className="v2-heading">What we'd actually ask on the first call.</h2>
        <p className="v2-lede">Click a card to see why it matters.</p>
        <div className="ind2-flip-grid">
          {questions.map((item, i) => (
            <button
              type="button"
              key={item.q}
              className={`ind2-flip-card ${flippedCard === i ? "is-flipped" : ""}`}
              onClick={() => toggleFlip(i)}
              aria-label={flippedCard === i ? "Show question" : "Show why we ask"}
            >
              <div className="ind2-flip-inner">
                <div className="ind2-flip-face ind2-flip-front">
                  <span className="ind2-flip-n">{String(i + 1).padStart(2, "0")}</span>
                  <p>{item.q}</p>
                  <span className="ind2-flip-hint">Tap to see why →</span>
                </div>
                <div className="ind2-flip-face ind2-flip-back">
                  <span className="ind2-flip-n">{String(i + 1).padStart(2, "0")}</span>
                  <p>{item.a}</p>
                  <span className="ind2-flip-hint">Tap to close →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════ 9 · FAQ ══════════ */}
      <FaqSection faqs={faqs} className="v2-section--void" />

      {/* ══════════ 10 · OTHER INDUSTRIES ══════════ */}
      <section className="v2-section" id="other">
        <p className="v2-label">Explore More</p>
        <h2 className="v2-heading">Other sectors we work in.</h2>
        <div className="sd2-other-list">
          {otherIndustries.map((s, i) => (
            <Link className="sd2-other" to={`/industries/${s.slug}`} key={s.slug}>
              <div className="sd2-other-top">
                <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
                <span className="sd2-other-n">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <span className="sd2-other-title">{s.title}</span>
              <p className="sd2-other-body">{s.tagline}</p>
              <span className="sd2-other-go">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ 11 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us about your {svc.title.toLowerCase()} project.<br />We'll tell you how we'd build it.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your sector's real constraints —
            not a generic pitch reused across every client.
          </p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to="/contact">Book a consultation →</Link></div>
</CtaSection>

      </main>

      <FooterV2 />
    </div>
  );
}
