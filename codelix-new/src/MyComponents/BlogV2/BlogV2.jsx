import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Search, ArrowUpRight } from "lucide-react";
import CtaVisual from "../HomepageV2/CtaVisual";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import codelixLogo from "../Images/codelix-logo.png";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./BlogV2.css";

/* same real articles used on the live /blog page, merged with anything
   published via the Supabase admin panel (see useBlogPosts) — not new/
   invented posts, just reskinned in the v2 theme */
import { slugify } from "../../data/blogData";
import { useBlogPosts } from "../../data/useBlogPosts";

const CATEGORIES = ["All Articles", "business", "CMS", "UI/UX", "Tech", "E-Commerce", "Development", "Artificial Intelligence"];

export default function BlogV2() {
  const blogs = useBlogPosts();
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState("All Articles");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

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

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return blogs.filter((b) => {
      const inCategory = category === "All Articles" || b.tags.includes(category);
      const inSearch = !term || b.title.toLowerCase().includes(term);
      return inCategory && inSearch;
    });
  }, [blogs, category, search]);

  const visible = filtered.slice(0, visibleCount);

  /* reveal-on-enter, re-runs whenever the visible list changes so newly
     matched cards animate in fresh */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    rootRef.current?.querySelectorAll(".v2-label, .v2-heading, .bv2-card, .v2-cta").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visible.length, category, search]);

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

      <div className={`v2-drawer-backdrop ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)} aria-hidden="true" />
      <div className={`v2-drawer ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <button type="button" className="v2-drawer-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
          <span /><span />
        </button>
        <div className="v2-drawer-links">
          {[
            { label: "About", href: "/about-v2" },
            { label: "Team", href: "/team-v2" },
            { label: "Process", href: "/process-v2" },
            { label: "Pricing", href: "/pricing-v2" },
            { label: "Technologies", href: "/technologies-v2" },
            { label: "Blog", href: "/blog-v2" },
            { label: "FAQ", href: "/faq-v2" },
            { label: "Careers", href: "/careers-v2" },
            { label: "Contact", href: "/contact-v2" },
          ].map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}>
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
            <em>Blog</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> {blogs.length} articles, no fluff</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Notes on building</span></span>
                <span className="line"><span className="v2-hero-accent">software that lasts.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Practical writing on web, mobile, design, and the decisions
                behind them — not recycled listicles.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · ARTICLES — the extraordinary section: live search +
          category filter over every real post, same searchable-directory
          mechanic proven on the FAQ and Sitemap pages. ══════════ */}
      <section className="v2-section" id="articles">
        <div className="bv2-toolbar">
          <div className="bv2-search">
            <Search size={16} strokeWidth={1.8} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(9); }}
            />
          </div>
          <div className="bv2-cats">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`bv2-cat ${category === c ? "is-active" : ""}`}
                onClick={() => { setCategory(c); setVisibleCount(9); }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>


        <div className="bv2-grid">
          {visible.length === 0 && (
            <p className="bv2-empty">No articles match — try a different search or category.</p>
          )}
          {visible.map((b) => (
            <a className="bv2-card" href={`/blog-v2/${b.slug || slugify(b.title)}`} key={b.id}>
              <div className="bv2-card-media">
                <img src={b.image} alt={b.title} loading="lazy" />
              </div>
              <div className="bv2-card-body">
                <div className="bv2-card-meta">
                  <span>{b.tags[1] || b.tags[0]}</span>
                  <span>{b.readTime}</span>
                </div>
                <h3 className="bv2-card-title">{b.title}</h3>
                <span className="bv2-card-date">{b.date}</span>
              </div>
              <span className="bv2-card-arrow" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.8} /></span>
            </a>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="bv2-more">
            <button className="v2-btn" onClick={() => setVisibleCount((n) => n + 9)}>Load more articles</button>
          </div>
        )}
      </section>

      {/* ══════════ 3 · CTA ══════════ */}
      <section className="v2-section">
        <div className="v2-cta-shell bv2-cta-shell">
          <div className="v2-cta">
            <p className="v2-label">Have A Project In Mind?</p>
            <h2 className="v2-cta-headline">
              Reading is one thing.<br />Shipping is another.
            </h2>
            <p className="v2-cta-body">
              A structured conversation about your project — no obligation, no sales script.
            </p>
            <a className="v2-btn v2-btn--filled" href="/contact-v2">
              <span>Start a project</span>
              <i className="v2-btn-arrow">→</i>
            </a>
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
