import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import codelixLogo from "../Images/codelix-logo.png";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import CtaVisual from "../HomepageV2/CtaVisual";
import "./BlogDetailV2.css";

/* same real article data + slug lookup as the live /blog/:slug page, merged
   with anything published via the Supabase admin panel (see useBlogPosts) —
   the article body, dates, and tags are not duplicated or rewritten here */
import { slugify } from "../../data/blogData";
import { useBlogPosts } from "../../data/useBlogPosts";
import GoogleReviewButton from "../Shared/GoogleReviewButton";
import ClutchWidget from "../Shared/ClutchWidget";

export default function BlogDetailV2() {
  const { slug } = useParams();
  const blogs = useBlogPosts();
  const blog = blogs.find((b) => (b.slug ? b.slug === slug : slugify(b.title) === slug));

  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const rootRef = useRef(null);
  const articleRef = useRef(null);

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
    if (!blog) return;
    const q = (s) => rootRef.current.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".bdv2-title"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.4")
      .fromTo(q(".bdv2-meta"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.6");
    return () => tl.kill();
  }, [blog]);

  /* extraordinary section — a horizontal reading-progress rail that fills
     as the reader scrolls through the article body, painted every
     animation frame from live getBoundingClientRect (not a cached
     ScrollTrigger position that can go stale after images/fonts reflow
     the page). */
  useEffect(() => {
    if (!blog) return;
    let raf = 0;
    const paint = () => {
      const el = articleRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight * 0.6;
        const done = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
        setReadProgress(done);
      }
      raf = requestAnimationFrame(paint);
    };
    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
  }, [blog]);

  useEffect(() => {
    if (!blog) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );
    rootRef.current?.querySelectorAll(".v2-label, .v2-heading, .bdv2-related, .v2-cta").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [blog]);

  if (!blog) {
    return (
      <div className="v2" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <h1 style={{ color: "#fff", fontSize: 28 }}>Article not found.</h1>
        <a className="v2-btn" href="/blog-v2">Back to Blog →</a>
      </div>
    );
  }

  const related = blogs.filter((b) => b.id !== blog.id && b.tags.some((t) => blog.tags.includes(t))).slice(0, 3);

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>
      <div className="bdv2-read-rail" aria-hidden="true">
        <div className="bdv2-read-fill" style={{ transform: `scaleX(${readProgress})` }} />
      </div>

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

      {/* ══════════ 1 · ARTICLE HEADER ══════════ */}
      <header className="bdv2-header">
        <div className="bdv2-header-inner">
          <nav className="sd2-crumbs" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <a href="/blog-v2">Blog</a>
            <span>/</span>
            <em>{blog.title}</em>
          </nav>
          <div className="bdv2-meta">
            <span className="bdv2-tag">{blog.tags[1] || blog.tags[0]}</span>
            <span>{blog.date}</span>
            <span>{blog.readTime}</span>
          </div>
          <h1 className="bdv2-title">{blog.title}</h1>
        </div>
      </header>

      {/* ══════════ 2 · ARTICLE BODY — the extraordinary section is the
          horizontal reading-progress rail fixed to the top of the viewport
          (rendered once, above), painted every animation frame from this
          article's live position. ══════════ */}
      <section className="v2-section" id="article">
        <div className="bdv2-article-inner">
          <div className="bdv2-image">
            <img src={blog.image} alt={blog.title} />
          </div>

          <article className="bdv2-body" ref={articleRef}>
            {blog.content.split(/\n\n|\\n\\n/).map((block, index) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("### ")) {
                return <h3 key={index}>{trimmed.replace("### ", "")}</h3>;
              }
              if (trimmed.startsWith("## ")) {
                return <h2 key={index}>{trimmed.replace("## ", "")}</h2>;
              }
              if (trimmed.startsWith("> ")) {
                return <blockquote key={index}>{trimmed.replace("> ", "")}</blockquote>;
              }
              if (trimmed.startsWith("- ")) {
                const items = trimmed.split(/\\n|\\\\n|\n/).filter((l) => l.trim().startsWith("- "));
                return (
                  <ul key={index}>
                    {items.map((item, i) => <li key={i}>{item.replace(/^-\s*/, "")}</li>)}
                  </ul>
                );
              }
              return <p key={index}>{trimmed}</p>;
            })}
          </article>

          <div className="bdv2-back">
            <a className="v2-hero-secondary" href="/blog-v2">
              <ArrowLeft size={15} strokeWidth={2} />
              <span className="v2-hero-secondary-label">Back to all articles</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════ 3 · RELATED ARTICLES ══════════ */}
      {related.length > 0 && (
        <section className="v2-section v2-section--void" id="related">
          <p className="v2-label">Keep Reading</p>
          <h2 className="v2-heading">Related articles.</h2>
          <div className="bdv2-related">
            {related.map((b) => (
              <a className="bdv2-related-card" href={`/blog-v2/${b.slug || slugify(b.title)}`} key={b.id}>
                <div className="bdv2-related-media">
                  <img src={b.image} alt={b.title} loading="lazy" />
                </div>
                <div className="bdv2-related-body">
                  <h3>{b.title}</h3>
                  <span>{b.date} · {b.readTime}</span>
                </div>
                <span className="bdv2-related-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.8} /></span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 4 · CTA ══════════ */}
      <section className="v2-section v2-section--void v2-cta-shell bdv2-cta-shell">
        <div className="v2-cta">
          <p className="v2-label">Have A Project In Mind?</p>
          <h2 className="v2-cta-headline">
            Reading is one thing.<br />Shipping is another.
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your project — scoped honestly,
            built the same way as everything above.
          </p>
          <div className="v2-cta-actions">
            <a className="v2-btn v2-btn--filled" href="/contact-v2">
              <span>Start a project</span>
              <i className="v2-btn-arrow">→</i>
            </a>
          </div>
          <div className="v2-cta-badges">
            <span className="v2-cta-badge">Free consultation</span>
            <span className="v2-cta-badge">NDA on request</span>
            <span className="v2-cta-badge">No obligation</span>
          </div>
        </div>

        <aside className="v2-cta-visual">
          <CtaVisual />
        </aside>
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
