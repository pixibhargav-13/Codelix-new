import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./BlogDetailV2.css";

/* same real article data + slug lookup as the live /blog/:slug page — the
   article body, dates, and tags are not duplicated or rewritten here */
import { blogs, slugify } from "../../data/blogData";

export default function BlogDetailV2() {
  const { slug } = useParams();
  const blog = blogs.find((b) => slugify(b.title) === slug);

  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const rootRef = useRef(null);
  const articleRef = useRef(null);

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
    rootRef.current?.querySelectorAll(".bdv2-related, .v2-cta").forEach((el) => io.observe(el));
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
              <a className="bdv2-related-card" href={`/blog-v2/${slugify(b.title)}`} key={b.id}>
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
      <section className="v2-section">
        <div className="v2-cta">
          <p className="v2-label">Have A Project In Mind?</p>
          <h2 className="v2-cta-headline">
            Reading is one thing.<br />Shipping is another.
          </h2>
          <a className="v2-btn v2-btn--filled" href="/contact-v2">
            <span>Start a project</span>
            <i className="v2-btn-arrow">→</i>
          </a>
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
            <a href="/blog-v2">Blog</a>
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
