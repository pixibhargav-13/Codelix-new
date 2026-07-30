import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Compass, Users, ShieldCheck, Linkedin, Globe, Smartphone, PenTool,
  ShoppingCart, Code2, Sparkles,
} from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./TeamV2.css";

/* Public bios sourced from LinkedIn — titles/roles kept to what's actually
   verifiable there rather than invented specifics. No photos are pulled
   from the internet for real individuals — `photo` points at a file in
   /public/images/team/ that doesn't exist yet. Drop the real headshot in
   there under the exact filename below and it'll appear automatically;
   until then the img fails to load and the initials avatar underneath
   shows through instead (see .team-lead-photo-wrap in TeamV2.css). */
const LEADERSHIP = [
  {
    name: "Manas Vadodaria",
    title: "Founder & CEO",
    initials: "MV",
    photo: "/images/team/manas-vadodaria.jpg",
    bio: "Sets product direction and leads client delivery at Codelix — turning ideas into market-ready custom software and SaaS solutions for businesses that intend to still be running them in five years.",
    linkedin: "https://www.linkedin.com/in/manas-vadodaria-396353275/",
  },
  {
    name: "Kushal Mungalpara",
    title: "Co-Founder",
    initials: "KM",
    photo: "/images/team/kushal-mungalpara.jpg",
    bio: "Works alongside Manas turning visionary ideas into shipped systems — hands-on across the technical and delivery side of every Codelix engagement.",
    linkedin: "https://www.linkedin.com/in/kushal-mungalpara-60805227b/",
  },
];

const HOW_WE_LEAD = [
  { key: "Direct", icon: Compass, claim: "You talk to the people who build it.", body: "No account manager relaying messages to an anonymous team. The founders scope the work and stay on it through delivery." },
  { key: "Small on purpose", icon: Users, claim: "We stay small enough to stay accountable.", body: "Every project has a name attached to it at the top. That doesn't change as we grow — it's the thing we're protecting." },
  { key: "Accountable", icon: ShieldCheck, claim: "Our name is on every line of code.", body: "We don't outsource to anonymous contractors and hope for the best. The people who scope your project are the people who build it." },
];

const QUOTE = {
  text: "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule.",
  name: "Rajesh Patel",
  role: "CEO, Harmony Inc.",
};

const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", path: "/services/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", path: "/services/application-development" },
  { icon: PenTool, n: "03", title: "UI/UX Design", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Custom Software Development", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI Development", path: "/services/ai-development" },
];

export default function TeamV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  /* reveal-on-enter — IntersectionObserver */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.01, rootMargin: "0px" }
    );
    const sel = [
      ".team-lead-row", ".sd2-tenet", ".v2-cta", ".v2-strip",
      ".sd2-quote", ".sd2-other",
      ".v2-heading", ".v2-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
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
            <em>Team</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Est. 2024 · Ahmedabad</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>The people behind</span></span>
                <span className="line"><span className="v2-hero-accent">what Codelix ships.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                No account managers, no anonymous contractors — every project
                is scoped and delivered by the two people who founded this
                studio.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="/contact">
                  <span>Work with us</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <a className="v2-hero-secondary" href="#leadership">
                  <span className="v2-hero-secondary-label">Meet the founders</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · LEADERSHIP ══════════ */}
      <section className="v2-section v2-section--void" id="leadership">
        <p className="v2-label">Leadership</p>
        <h2 className="v2-heading">Two founders, one team.</h2>
        <div className="team-lead-grid">
          {LEADERSHIP.map((p, i) => (
            <article
              className={`team-lead-row${i % 2 !== 0 ? " team-lead-row--reverse" : ""}`}
              key={p.name}
            >
              {/* ── Image panel ── */}
              <div className="team-lead-img-panel">
                <span className="team-lead-index">0{i + 1}</span>
                <div className="team-lead-avatar-wrap">
                  <div className="team-lead-avatar">
                    {p.initials}
                    <img
                      className="team-lead-photo"
                      src={p.photo}
                      alt={p.name}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                </div>
              </div>

              {/* ── Info panel ── */}
              <div className="team-lead-info-panel">
                <span className="team-lead-watermark" aria-hidden="true">
                  {p.initials}
                </span>
                <p className="team-lead-num">
                  <em />
                  Founder
                </p>
                <h3 className="team-lead-name">{p.name}</h3>
                <p className="team-lead-title">{p.title}</p>
                <p className="team-lead-bio">{p.bio}</p>
                <a
                  className="team-lead-linkedin"
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={14} strokeWidth={2} />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* ══════════ 3 · HOW WE LEAD ══════════ */}
      <section className="v2-section" id="how-we-lead">
        <p className="v2-label">How We Lead</p>
        <h2 className="v2-heading">Three things that don't change as we grow.</h2>
        <div className="sd2-tenet-grid">
          {HOW_WE_LEAD.map((p, i) => (
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

      {/* ══════════ 4 · TESTIMONIAL ══════════ */}
      <section className="v2-section v2-section--gallery">
        <figure className="sd2-quote">
          <span className="sd2-quote-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="sd2-quote-text">{QUOTE.text}</blockquote>
          <figcaption className="sd2-quote-by">
            <span className="sd2-quote-name">{QUOTE.name}</span>
            <span className="sd2-quote-role">{QUOTE.role}</span>
          </figcaption>
        </figure>
      </section>

      {/* ══════════ 5 · EXPLORE SERVICES ══════════ */}
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

      {/* ══════════ 7 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Talk to the founders,<br />not an account manager.
          </h2>
          <p className="v2-cta-body">
            Every engagement starts and ends with the same two people.
            Tell us what you're building.
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
            <a href="/case-study-v2">Case Studies</a>
            <a href="/blog-v2">Blog</a>
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
