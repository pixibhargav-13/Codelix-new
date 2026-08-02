import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight, X, Check } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import codelixLogo from "../Images/codelix-logo.png";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./CaseStudyDetailV2.css";

/* real content extracted verbatim from the 15 individual case-study
   components, not new/invented copy — see caseStudiesData.js */
import { CASE_STUDIES } from "./caseStudiesData";
import { PROJECTS } from "../WorkV2/projectsData";

/* the mask-line wipe animation (shared with every other v2 hero) only
   reads correctly when each .line wraps exactly one visual line of text —
   it clips via overflow:hidden and slides the span up by a percentage of
   its own height, so a long title crammed into one .line would animate as
   one clipped blob instead of a clean per-line reveal. Case-study titles
   are long, real, and vary a lot in length, so split each one into two
   roughly-balanced halves by word count instead of hardcoding lines. */
const splitTitle = (title) => {
  const words = title.split(" ");
  if (words.length < 4) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
};

export default function CaseStudyDetailV2() {
  const { slug } = useParams();
  const cs = CASE_STUDIES.find((c) => c.slug === slug);

  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);

  const rootRef = useRef(null);

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

  /* hero intro — masked-line GSAP wipe, matching every other v2 page's
     sd2-hero (same selectors, same timeline shape) */
  useEffect(() => {
    if (!cs) return;
    const q = (s) => rootRef.current.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"),
        { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: .1 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".csd2-tags.sv2-hero-reveal"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .8 }, "-=.7")
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".csd2-hero-media.sv2-hero-reveal"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=.9");
    return () => tl.kill();
  }, [cs]);

  /* reveal-on-enter + stat count-up */
  useEffect(() => {
    if (!cs) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );
    rootRef.current?.querySelectorAll(
      ".csd2-outcomes, .csd2-cs, .csd2-more, .v2-cta, .v2-heading, .v2-label, .v2-lede, .sd2-bench, " +
      ".csd2-snapshot, .csd2-features, .csd2-whystack, .v2-method-row, .sd2-quote, " +
      ".csd2-ledger, .csd2-roadmap, .csd2-issues"
    ).forEach((el) => io.observe(el));

    const nums = rootRef.current?.querySelectorAll(".sd2-bench-value") || [];
    const runNum = (el) => {
      const target = Number(el.dataset.target);
      const isDecimal = target % 1 !== 0;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = isDecimal
          ? (target * eased).toFixed(1)
          : Math.round(target * eased).toString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const numIo = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        runNum(e.target);
        numIo.unobserve(e.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -12% 0px" }
    );
    nums.forEach((n) => numIo.observe(n));

    return () => { io.disconnect(); numIo.disconnect(); };
  }, [cs]);

  if (!cs) {
    return (
      <div className="v2" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <h1 style={{ color: "#fff", fontSize: 28 }}>Case study not found.</h1>
        <a className="v2-btn" href="/case-study-v2">Back to Case Studies →</a>
      </div>
    );
  }

  const more = PROJECTS.filter((p) => p.href !== `/${cs.slug}`).slice(0, 3);

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
            <a href="/preview-v2">Homepage</a>
            <a href="/services-v2">Services</a>
            <a href="/about-v2">About</a>
            <a href="/work-v2">Work</a>
            <a href="/industries-v2">Industries</a>
            <a href="/process-v2">Process</a>
            <a href="/contact-v2">Contact</a>
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
            { label: "Homepage", href: "/preview-v2" },
            { label: "Services", href: "/services-v2" },
            { label: "About", href: "/about-v2" },
            { label: "Work", href: "/work-v2" },
            { label: "Industries", href: "/industries-v2" },
            { label: "Process", href: "/process-v2" },
            { label: "Contact", href: "/contact-v2" },
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

      {/* ══════════ 1 · HERO — same sd2-hero shell as every other v2 page
          (background treatment, mask-line title wipe, status pill, CTA
          row), not a bespoke layout. ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <a href="/case-study-v2">Case Studies</a>
            <span>/</span>
            <em>{cs.title}</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Case Study{cs.isConcept ? " · Concept" : ""}</span>
              </div>
              <h1 className="sd2-hero-title csd2-title">
                {splitTitle(cs.title).map((part, i) => (
                  <span className="line" key={i}><span>{part}</span></span>
                ))}
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">{cs.description}</p>
              <div className="csd2-tags sv2-hero-reveal">
                {cs.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              {cs.isConcept && (
                <p className="csd2-concept-note">
                  This is a concept exploration, not a live client build — shown here honestly as design work, not a deployed product.
                </p>
              )}
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="/contact-v2">
                  <span>Start a similar project</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <a className="v2-hero-secondary" href="/case-study-v2">
                  <ArrowLeft size={15} strokeWidth={2} />
                  <span className="v2-hero-secondary-label">All case studies</span>
                </a>
              </div>
            </div>

            {cs.image && (
              <div className="csd2-hero-media sv2-hero-reveal">
                <img src={cs.image} alt={cs.title} />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ══════════ 1b · SNAPSHOT — only present on richer, fully-briefed
          case studies; older entries without this data simply skip it. ══ */}
      {cs.snapshot && (
        <section className="v2-section v2-section--void" id="snapshot">
          <p className="v2-label">Engagement at a Glance</p>
          <h2 className="v2-heading">The project, in numbers.</h2>
          <div className="csd2-snapshot">
            {cs.snapshot.map((s, i) => (
              <div className="csd2-snapshot-item" key={i}>
                <span className="csd2-snapshot-k">{s.label}</span>
                <span className="csd2-snapshot-v">{s.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 2 · OVERVIEW ══════════
          Business Objectives was dropped from here — it restated the same
          points as The Challenges / The Solutions below almost 1:1 (e.g.
          "give leadership real-time visibility" appeared as an objective,
          a challenge, and a solution). Challenges → Solutions already
          carries that story more concretely, so this cuts the repeat
          instead of trimming the more specific pair. ══════════ */}
      <section className="v2-section" id="overview">
        <p className="v2-label">Project Overview</p>
        <div className="csd2-overview">
          {cs.overview.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {/* ══════════ 2a-i · CHALLENGE IMAGES — two illustrative diagrams
          side by side, giving the problem section a visual anchor before
          the reader hits the text list. ══════════ */}
      {cs.challengeImages && (
        <div className="csd2-duo">
          {cs.challengeImages.map((img, i) => (
            <div className="csd2-duo-frame" key={i}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      )}

      {/* ══════════ 2b · CHALLENGES / SOLUTIONS — placed right after the
          objectives so a reader hits problem-then-solution before the
          results and delivery process, matching how the story actually
          unfolded rather than leading with the numbers. Each point gets
          its own row with a colored icon (red = problem, green = fixed)
          instead of a wall of prose paragraphs. ══════════ */}
      <section className="v2-section" id="challenges">
        <div className="csd2-challenges-grid">
          <div className="csd2-challenges-col">
            <p className="v2-label">The Challenges</p>
            <h2 className="v2-heading">The problem we faced.</h2>
            <div className="csd2-issues csd2-issues--problem">
              {cs.challenges.map((p, i) => (
                <div className="csd2-issue-row" key={i}>
                  <span className="csd2-issue-icon"><X size={13} strokeWidth={2.6} /></span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="csd2-challenges-col">
            <p className="v2-label">The Solutions</p>
            <h2 className="v2-heading">What we built instead.</h2>
            <div className="csd2-issues csd2-issues--solution">
              {cs.solutions.map((p, i) => (
                <div className="csd2-issue-row" key={i}>
                  <span className="csd2-issue-icon"><Check size={13} strokeWidth={2.6} /></span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 3 · DELIVERY PROCESS — reuses the same sticky-header
          method-row pattern already proven on the service pages, rather
          than inventing a new timeline component from scratch. Sits right
          after the problem/solution so "how we built it" reads before
          "what happened after launch." ══════════ */}
      {cs.process && (
        <section className="v2-method-shell" id="process">
          <div className="v2-method-head">
            <h2 className="v2-method-heading">How We Delivered It.</h2>
            <p className="v2-method-lede">
              The phase-by-phase path from discovery to go-live.
            </p>
          </div>
          <div className="v2-method-rows">
            {cs.process.map((m, i) => (
              <div className="v2-method-row" key={i}>
                <div className="v2-method-index">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="v2-method-title">{m.phase}</div>
                  <span className="v2-method-timeframe">{m.time}</span>
                </div>
                <div className="v2-method-body">{m.body}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 3b · OUTCOMES ══════════ */}
      <section className="v2-section v2-section--void" id="outcomes">
        <p className="v2-label">Project Outcomes</p>
        <h2 className="v2-heading">The results, measured after launch.</h2>
        <p className="v2-lede">Four numbers that summarize what changed once the system went live.</p>
        <div className="csd2-outcomes">
          {cs.outcomes.map((o, i) => {
            const R = 52;
            const C = 2 * Math.PI * R;
            const ring = Math.min(o.value, 100);
            const offset = C - (C * ring) / 100;
            return (
              <div className="sd2-bench" key={i}>
                <div className="sd2-bench-ring">
                  <svg viewBox="0 0 120 120" className="sd2-bench-ring-svg" aria-hidden="true">
                    <defs>
                      <linearGradient id={`csd2-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(180,200,230,.55)" />
                        <stop offset="100%" stopColor="rgba(180,200,230,1)" />
                      </linearGradient>
                    </defs>
                    <circle className="sd2-bench-ring-track" cx="60" cy="60" r={R} />
                    <circle
                      className="sd2-bench-ring-fill"
                      cx="60" cy="60" r={R}
                      stroke={`url(#csd2-grad-${i})`}
                      style={{ "--c": C, "--ring-offset": offset }}
                    />
                  </svg>
                  <div className="sd2-bench-num">
                    <span className="sd2-bench-value" data-target={o.value}>0</span>
                    <span className="sd2-bench-suffix">{o.suffix}</span>
                  </div>
                </div>
                <div className="sd2-bench-label">{o.label}</div>
              </div>
            );
          })}
        </div>
        {cs.resultsNote && <p className="csd2-results-note">{cs.resultsNote}</p>}
      </section>

      {/* ══════════ 4a · SERVICES DELIVERED ══════════ */}
      {cs.services && (
        <section className="v2-section v2-section--void" id="services-delivered">
          <p className="v2-label">Services Delivered</p>
          <h2 className="v2-heading">What we were engaged to do.</h2>
          <div className="csd2-ledger">
            {cs.services.map((s, i) => (
              <div className="csd2-ledger-row" key={i}>
                <span className="csd2-ledger-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="csd2-ledger-text">{s}</span>
                <span className="csd2-ledger-icon"><Check size={13} strokeWidth={2.6} /></span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 4b · CORE FEATURES ══════════ */}
      {cs.features && (
        <section className="v2-section" id="features">
          <p className="v2-label">Core Features</p>
          <h2 className="v2-heading">What shipped inside the system.</h2>
          <div className="csd2-features">
            {cs.features.map((f, i) => (
              <div className="csd2-feature" key={i}>
                <div className="csd2-feature-top">
                  <span className="csd2-feature-icon"><Check size={14} strokeWidth={2.6} /></span>
                  <span className="csd2-feature-index">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p>{f}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 5 · TOOLS ══════════ */}
      <section className="v2-section v2-section--void" id="tools">
        <p className="v2-label">Tools & Technologies</p>
        <h2 className="v2-heading">What this project was built with.</h2>
        <div className="csd2-tools">
          {cs.tools.map((t) => (
            <span key={t}>
              <i className="csd2-tools-avatar" aria-hidden="true">{t.charAt(0)}</i>
              {t}
            </span>
          ))}
        </div>

        {cs.whyStack && (
          <div className="csd2-whystack">
            <p className="csd2-whystack-label">Why this stack</p>
            <ul>
              {cs.whyStack.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        )}
      </section>

      {/* ══════════ 5b · FUTURE SCALABILITY ══════════ */}
      {cs.scalability && (
        <section className="v2-section" id="scalability">
          <p className="v2-label">Built To Grow</p>
          <h2 className="v2-heading">Where this goes from here.</h2>
          <div className="csd2-roadmap">
            {cs.scalability.map((s, i) => (
              <div className="csd2-roadmap-item" key={i}>
                <span className="csd2-roadmap-marker">{String(i + 1).padStart(2, "0")}</span>
                <div className="csd2-roadmap-card">
                  <p>{s}</p>
                  <span className="csd2-roadmap-arrow"><ArrowUpRight size={15} strokeWidth={2} /></span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 5c · CLIENT TESTIMONIAL ══════════ */}
      {cs.quote && (
        <section className="v2-section">
          <figure className="sd2-quote">
            <span className="sd2-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="sd2-quote-text">{cs.quote.text}</blockquote>
            <figcaption className="sd2-quote-by">
              {cs.quote.name && <span className="sd2-quote-name">{cs.quote.name}</span>}
              <span className="sd2-quote-role">{cs.quote.role}</span>
            </figcaption>
          </figure>
        </section>
      )}

      {/* ══════════ 6 · MORE CASE STUDIES ══════════ */}
      <section className="v2-section" id="more">
        <p className="v2-label">More Work</p>
        <h2 className="v2-heading">Other real projects.</h2>
        <div className="csd2-more">
          {more.map((p) => (
            <a className="csd2-more-card" href={`/case-study-v2${p.href}`} key={p.id}>
              <div className="csd2-more-media">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="csd2-more-body">
                <h3>{p.title}</h3>
                <div className="csd2-more-tags">
                  {p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
              <span className="csd2-more-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.8} /></span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 7 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Like what you see?<br />Let's build yours next.
          </h2>
          <a className="v2-btn v2-btn--filled" href="/contact-v2">
            <span>Start a project</span>
            <i className="v2-btn-arrow">→</i>
          </a>
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

        {/* office / contact info — a single four-up row instead of two
            stacked 2x2 blocks, so it reads as one info bar */}
        <div className="v2-footer-cards v2-footer-cards--four">
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
          <div className="v2-footer-card">
            <h5>Looking For Jobs</h5>
            <a className="v2-footer-card-strong" href="/careers-v2">View openings →</a>
          </div>
          <div className="v2-footer-card">
            <h5>HR</h5>
            <a className="v2-footer-card-strong" href="mailto:hr@codelixitsolutions.com">
              hr@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>General</h5>
            <a className="v2-footer-card-strong" href="mailto:info@codelixitsolutions.com">
              info@codelixitsolutions.com
            </a>
          </div>
          <div className="v2-footer-card">
            <h5>For Sales</h5>
            <a className="v2-footer-card-strong" href="mailto:Sales@codelixitsolutions.com">
              Sales@codelixitsolutions.com
            </a>
          </div>
        </div>

        {/* socials + back-to-top, same row as the reference */}
        <div className="v2-footer-social">
          <div className="v2-footer-social-links">
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61561748130641" target="_blank" rel="noopener noreferrer">Facebook</a>
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
