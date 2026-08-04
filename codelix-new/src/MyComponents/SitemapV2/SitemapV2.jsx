import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Search, ArrowUpRight } from "lucide-react";
import CtaVisual from "../HomepageV2/CtaVisual";

/* v2 design system — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";
import V2MobileDrawer from "../HomepageV2/V2MobileDrawer";
import codelixLogo from "../Images/codelix-logo.png";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./SitemapV2.css";

import { CASE_STUDIES } from "../CaseStudyDetailV2/caseStudiesData";
import { blogs, slugify } from "../../data/blogData";
import GoogleReviewButton from '../Shared/GoogleReviewButton';

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
      { label: "Case Studies", href: "/case-study-v2" },
      { label: "Blog", href: "/blog-v2" },
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
      { label: "Application Development", href: "/services-v2/application-development" },
      { label: "UI/UX Design", href: "/services-v2/ui-ux-design" },
      { label: "E-Commerce Solutions", href: "/services-v2/e-commerce-solutions" },
      { label: "Custom Software Development", href: "/services-v2/custom-software-development" },
      { label: "AI Development", href: "/services-v2/ai-development" },
      { label: "Data Analytics", href: "/services-v2/data-analytics" },
    ],
  },
  {
    title: "Case Studies",
    links: CASE_STUDIES.map(cs => ({ label: cs.title, href: `/case-study-v2/${cs.slug}` }))
  },
  {
    title: "Blog Articles",
    links: blogs.map(b => ({ label: b.title, href: `/blog-v2/${slugify(b.title)}` }))
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
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const rootRef = useRef(null);

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

  /* reveal-on-enter for each group column */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    rootRef.current?.querySelectorAll(".v2-label, .v2-heading, .smv2-group-vertical, .v2-cta").forEach((el) => io.observe(el));
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

        <div className="smv2-groups-vertical">
          {filteredGroups.length === 0 && (
            <p className="smv2-empty">No pages match "{search}".</p>
          )}
          {filteredGroups.map((g) => (
            <div className="smv2-group-vertical" key={g.title}>
              <h2 className="smv2-group-vertical-title">
                {g.title}
              </h2>
              <div className="smv2-hatched-bg">
                <div className="smv2-links-grid">
                  {g.links.map((l) => (
                    <a href={l.href} key={l.href} className="smv2-link-card">
                      <span>{l.label}</span>
                      <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 3 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta-shell smv2-cta-shell">
          <div className="v2-cta">
            <p className="v2-label">Can't Find It?</p>
            <h2 className="v2-cta-headline">
              Looking for something<br />that's not here?
            </h2>
            <p className="v2-cta-body">Just ask — we'll point you in the right direction.</p>
            <a className="v2-btn" href="/contact-v2">Contact us →</a>
          </div>
          <aside className="v2-cta-visual">
            <CtaVisual />
          </aside>
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
