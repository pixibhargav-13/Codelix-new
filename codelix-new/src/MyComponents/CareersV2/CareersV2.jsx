import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Compass, Users, ShieldCheck, Globe, Smartphone, PenTool, Server, Sparkles, CheckCircle2,
} from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./CareersV2.css";
import GoogleReviewButton from "../Shared/GoogleReviewButton";
import ClutchWidget from "../Shared/ClutchWidget";

/* same honest small-team working style already stated on TeamV2 — Codelix
   is a small, founder-led studio, not a large org with an HR department,
   so this page doesn't invent headcount, fixed job listings, or a formal
   multi-stage interview funnel that don't exist */
const HOW_WE_WORK = [
  { key: "Direct", icon: Compass, claim: "You work with the founders, not a layer beneath them.", body: "No account manager standing between you and the people making decisions. If you join, you're working alongside Manas and Kushal directly." },
  { key: "Small on purpose", icon: Users, claim: "We stay small enough to stay accountable.", body: "There's no anonymous bench here. Every person on a project has their name on it — that includes you." },
  { key: "Ownership", icon: ShieldCheck, claim: "You ship real client work, not busywork.", body: "What you build goes live for real businesses. No make-work assignments to keep you occupied between 'real' projects." },
];

const DISCIPLINES = [
  { key: "Frontend", icon: Globe, blurb: "React, Next, and the rest of what's on our stack page — building interfaces real users actually touch." },
  { key: "Backend", icon: Server, blurb: "Node, Spring Boot, Laravel, Django — APIs and systems that hold up under real production load." },
  { key: "Mobile", icon: Smartphone, blurb: "Flutter and React Native — apps that ship to real app stores for real users." },
  { key: "Design", icon: PenTool, blurb: "Figma-first UI/UX work that gets handed to development, not filed away as concept art." },
  { key: "AI / Automation", icon: Sparkles, blurb: "Practical AI integration and workflow automation — n8n, Zapier, Make, and applied ML, not buzzword slides." },
];

const WHAT_WE_LOOK_FOR = [
  { n: "01", title: "Shipped work over credentials", body: "A portfolio of real, finished projects tells us more than a resume. Show us what you've actually built." },
  { n: "02", title: "Comfortable with direct feedback", body: "We work in tight, fast loops with clients and each other. That only works if you can give and take feedback plainly." },
  { n: "03", title: "Ownership over instructions", body: "We're small enough that nobody's handing you a spec to execute blindly. You'll be expected to flag problems, not just implement." },
];

const FAQS = [
  { q: "Are you currently hiring for a specific role?", a: "We don't keep a running job board — we hire when a specific project need lines up with what someone brings. Send your details anyway; we keep good applications on file." },
  { q: "Do you hire freelancers or only full-time?", a: "Both, depending on the work. Tell us what you're looking for and we'll tell you honestly if it's a fit right now." },
  { q: "What does the interview process look like?", a: "There's no fixed multi-round funnel. Typically it's a portfolio review followed by a direct conversation with the founders." },
  { q: "Is this role remote or on-site?", a: "Depends on the role and what it needs — we'll be upfront about it when we reach out." },
];

export default function CareersV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());
  const [discipline, setDiscipline] = useState(DISCIPLINES[0].key);

  const [formData, setFormData] = useState({ name: "", email: "", portfolio: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const rootRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 40);
      setNavHidden(y > lastY && y > 120);
      lastY = y;
    };
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

  /* reveal-on-enter — IntersectionObserver */
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
      ".cv2-apply", ".sd2-tenet", ".cv2-look-for", ".v2-faq-item", ".v2-strip", ".v2-cta",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* real submission — same Web3Forms integration used on /contact and
     /contact-v2, not a new/mocked endpoint */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const formPayload = new FormData(e.target);
    formPayload.append("access_key", "d81ad30d-2d27-411e-849b-6b1d9945a2b8");
    formPayload.append("subject", `New Application from ${formData.name} — ${discipline} — Codelix Careers`);
    formPayload.append("from_name", "Codelix Careers Form");
    formPayload.append("discipline", discipline);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        e.target.reset();
        setFormData({ name: "", email: "", portfolio: "", message: "" });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <nav className={`v2-nav ${navScrolled ? "scrolled" : ""} ${navHidden ? "nav-hidden" : ""}`}>
        <div className="v2-nav-inner">
          <a href="/preview-v2" className="v2-nav-logo" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <div className="v2-nav-links">
            <div className="v2-nav-dropdown">
              <a href="/services-v2">Services <span className="v2-nav-dropdown-chevron">▾</span></a>
              <div className="v2-nav-dropdown-panel">
                <div className="v2-nav-dropdown-head">
                  <div>
                    <p className="v2-nav-dropdown-head-label">Our Services</p>
                    <p className="v2-nav-dropdown-head-lede">Everything we build, in one place.</p>
                  </div>
                  <a href="/services-v2" className="v2-nav-dropdown-head-all">View all services →</a>
                </div>
                {FOOTER_SERVICE_KEYWORDS.map((s) => (
                  <a href={s.path} key={s.label} className="v2-nav-dropdown-card">
                    <span className="v2-nav-dropdown-title">{s.label}</span>
                    <span className="v2-nav-dropdown-blurb">{s.blurb}</span>
                  </a>
                ))}
              </div>
            </div>
            <a href="/work-v2">Work</a>
            <a href="/industries-v2">Industries</a>
            <a href="/about-v2">About</a>
          </div>
          <div className="v2-nav-actions">
            <a className="v2-btn v2-btn--filled v2-nav-cta" href="/contact-v2">Book a consultation</a>
            <button
              className={`v2-burger ${mobileOpen ? "open" : ""}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        </nav>

      <V2MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <em>Careers</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Small team, real client work</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Work directly with</span></span>
                <span className="line"><span className="v2-hero-accent">the people who build it.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                No account managers, no anonymous bench. If you join, you're
                shipping real client projects alongside the founders.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="#apply">
                  <span>Apply now</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <a className="v2-hero-secondary" href="/team-v2">
                  <span className="v2-hero-secondary-label">Meet the team</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · HOW WE WORK ══════════ */}
      <section className="v2-section" id="how-we-work">
        <p className="v2-label">How We Work</p>
        <h2 className="v2-heading">What it's actually like day to day.</h2>
        <div className="sd2-tenet-grid">
          {HOW_WE_WORK.map((p, i) => (
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

      {/* ══════════ 3 · APPLY — discipline picker + real application form
          (the extraordinary section). Picking a discipline crossfades a
          short honest blurb and tags the submission, instead of a static
          list of fabricated job postings we don't actually have open. ══════════ */}
      <section className="v2-section v2-section--void" id="apply">
        <p className="v2-label">Open To</p>
        <h2 className="v2-heading">We hire when the work calls for it.</h2>
        <p className="v2-lede">
          We don't run a fixed job board — send your details for whichever
          area fits, and we'll reach out when it lines up with real work.
        </p>

        <div className="cv2-apply">
          <div className="cv2-apply-left">
            <div className="cv2-disc-chips" role="group" aria-label="Choose a discipline">
              {DISCIPLINES.map((d) => (
                <button
                  key={d.key}
                  className={`cv2-disc-chip ${discipline === d.key ? "is-active" : ""}`}
                  onClick={() => setDiscipline(d.key)}
                  type="button"
                >
                  <d.icon size={16} strokeWidth={1.7} />
                  {d.key}
                </button>
              ))}
            </div>
            <div className="cv2-disc-stage">
              {DISCIPLINES.map((d) => (
                <div className={`cv2-disc-panel ${discipline === d.key ? "is-active" : ""}`} key={d.key}>
                  <span className="cv2-disc-panel-icon"><d.icon size={26} strokeWidth={1.4} /></span>
                  <p>{d.blurb}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cv2-apply-right">
            {submitted ? (
              <div className="cv2-success">
                <CheckCircle2 size={40} strokeWidth={1.4} />
                <h3>Got it.</h3>
                <p>We'll review your details and reach out if it's a fit for something we're working on.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cv2-form">
                <div className="cv2-field">
                  <label htmlFor="cv2-name">Name</label>
                  <input id="cv2-name" name="name" type="text" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="cv2-field">
                  <label htmlFor="cv2-email">Email</label>
                  <input id="cv2-email" name="email" type="email" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="cv2-field">
                  <label htmlFor="cv2-portfolio">Portfolio / LinkedIn / GitHub</label>
                  <input id="cv2-portfolio" name="portfolio" type="url" placeholder="https://" required value={formData.portfolio} onChange={handleChange} />
                </div>
                <div className="cv2-field">
                  <label htmlFor="cv2-message">Anything else?</label>
                  <textarea id="cv2-message" name="message" rows={4} placeholder="Optional — what you've shipped, what you're looking for" value={formData.message} onChange={handleChange} />
                </div>
                <input type="hidden" name="discipline" value={discipline} />
                {error && <p className="cv2-error">{error}</p>}
                <button type="submit" className="v2-btn v2-btn--filled cv2-submit" disabled={sending}>
                  <span>{sending ? "Sending…" : `Apply for ${discipline}`}</span>
                  <i className="v2-btn-arrow">→</i>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════ 4 · WHAT WE LOOK FOR ══════════ */}
      <section className="v2-section" id="look-for">
        <p className="v2-label">What We Look For</p>
        <h2 className="v2-heading">Three things that matter more than a resume.</h2>
        <div className="cv2-look-for">
          {WHAT_WE_LOOK_FOR.map((w) => (
            <div className="cv2-look-row" key={w.n}>
              <span className="cv2-look-n">{w.n}</span>
              <div>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 5 · FAQ ══════════ */}
      <section className="v2-section v2-section--void" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Before you apply.</h2>
          </div>
          <p className="v2-lede v2-faq-note">
            Something else on your mind? <a href="/contact-v2">Ask us directly →</a>
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
            <a className="v2-footer-card-strong" href="mailto:sales@codelixitsolutions.com">
              sales@codelixitsolutions.com
            </a>
          </div>
        </div>

        {/* socials + back-to-top, same row as the reference */}
        <div className="v2-footer-social">
          <div className="v2-footer-social-links">
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61561748130641" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Behance</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Dribbble</a>
          </div>
          <div className="v2-footer-actions">
            <ClutchWidget className="v2-desktop-only" />
            <GoogleReviewButton className="v2-desktop-only" />
            <button
              type="button"
              className="v2-footer-top"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ↑
            </button>
          </div>
        </div>
        <div className="v2-footer-social v2-mobile-only" style={{ borderTop: "none", paddingTop: 0, paddingBottom: "20px", justifyContent: "center" }}>
          <ClutchWidget />
          <GoogleReviewButton />
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
