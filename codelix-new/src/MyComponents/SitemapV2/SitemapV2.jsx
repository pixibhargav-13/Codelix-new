import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Search, ArrowUpRight } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./SitemapV2.css";

/* every route here is a real <Route> registered in App.jsx — only the new
   v2-theme pages, not the legacy site */
const GROUPS = [
  {
    title: "Main",
    links: [
      { label: "Homepage", href: "/preview-v2" },
      { label: "About", href: "/about-v2" },
      { label: "Team", href: "/team-v2" },
      { label: "Work", href: "/work-v2" },
      { label: "Industries We Serve", href: "/industries-v2" },
      { label: "Process", href: "/process-v2" },
      { label: "Contact", href: "/contact-v2" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Services", href: "/services-v2" },
      { label: "Web Development", href: "/services-v2/web-development" },
      { label: "UI/UX Design", href: "/services-v2/ui-ux-design" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "/pricing-v2" },
      { label: "Technologies", href: "/technologies-v2" },
      { label: "Careers", href: "/careers-v2" },
      { label: "FAQ", href: "/faq-v2" },
      { label: "Sitemap", href: "/sitemap-v2" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms-of-service-v2" },
      { label: "Privacy Policy", href: "/privacy-policy-v2" },
      { label: "Refund Policy", href: "/refund-policy-v2" },
    ],
  },
];

const TOTAL_LINKS = GROUPS.reduce((n, g) => n + g.links.length, 0);

export default function SitemapV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

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

  /* reveal-on-enter for each group column */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );
    rootRef.current?.querySelectorAll(".smv2-group, .v2-cta").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [search]);

  /* extraordinary section — a live search across every real route, with a
     match count that re-plays its pop-in animation on every change */
  const filteredGroups = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return GROUPS;
    return GROUPS
      .map((g) => ({ ...g, links: g.links.filter((l) => l.label.toLowerCase().includes(term) || l.href.toLowerCase().includes(term)) }))
      .filter((g) => g.links.length > 0);
  }, [search]);

  const matchCount = useMemo(() => filteredGroups.reduce((n, g) => n + g.links.length, 0), [filteredGroups]);

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
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <em>Sitemap</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> {TOTAL_LINKS} pages, one map</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Every page,</span></span>
                <span className="line"><span className="v2-hero-accent">one place to find it.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                A complete map of the site — search or browse by section.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · SITEMAP — the extraordinary section: a live search
          across every real route on the site, with each surviving group
          re-animating in on every filter change. ══════════ */}
      <section className="v2-section" id="sitemap">
        <div className="smv2-toolbar">
          <div className="smv2-search">
            <Search size={16} strokeWidth={1.8} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search pages…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <span className="smv2-count">
            {matchCount} of {TOTAL_LINKS} pages
          </span>
        </div>

        <div className="smv2-groups">
          {filteredGroups.length === 0 && (
            <p className="smv2-empty">No pages match "{search}".</p>
          )}
          {filteredGroups.map((g) => (
            <div className="smv2-group" key={g.title}>
              <h3 className="smv2-group-title">
                {g.title}
                <span className="smv2-group-count">{g.links.length}</span>
              </h3>
              <ul>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>
                      <span>{l.label}</span>
                      <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 3 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Can't Find It?</p>
          <h2 className="v2-cta-headline">
            Looking for something<br />that's not here?
          </h2>
          <p className="v2-cta-body">Just ask — we'll point you in the right direction.</p>
          <a className="v2-btn" href="/contact-v2">Contact us →</a>
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
