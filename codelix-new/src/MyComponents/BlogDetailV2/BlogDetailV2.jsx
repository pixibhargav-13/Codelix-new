import React, { useEffect, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./BlogDetailV2.css";

/* same real article data + slug lookup as the live /blog/:slug page, merged
   with anything published via the Supabase admin panel (see useBlogPosts) —
   the article body, dates, and tags are not duplicated or rewritten here */
import { slugify } from "../../data/blogData";
import { useBlogPosts } from "../../data/useBlogPosts";
import NavbarV2 from "../Shared/NavbarV2";
import CtaSection from '../Shared/CtaSection';
import { StructuredData } from "../../components/StructuredData";
import { SEO } from "../../components/SEO";


export default function BlogDetailV2() {
  const { slug } = useParams();
  const { posts: blogs, loading } = useBlogPosts();
  const blog = blogs.find((b) => (b.slug ? b.slug === slug : slugify(b.title) === slug));

  
  
  
  const [readProgress, setReadProgress] = useState(0);

  const rootRef = useRef(null);
  const articleRef = useRef(null);

  

  

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

  /* A post published from the admin panel lives only in Supabase, so it is
     absent from the first render and only arrives when that read lands.
     Showing "not found" in the meantime meant every such article opened with
     a flash of the error screen before the real content replaced it. Wait for
     the read to settle before saying anything is missing; posts that are
     already in hand still render immediately, with no spinner. */
  if (!blog && loading) {
    return (
      <div className="v2" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="bdv2-loading" aria-live="polite">Loading article…</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="v2" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <h1 style={{ color: "#fff", fontSize: 28 }}>Article not found.</h1>
        <Link className="v2-btn" to="/blog">Back to Blog →</Link>
      </div>
    );
  }

  const related = blogs.filter((b) => b.id !== blog.id && b.tags.some((t) => blog.tags.includes(t))).slice(0, 3);

  return (
    <div className="v2" ref={rootRef}>
      <SEO title={`${blog.title} | Codelix IT Solutions`} description={blog.excerpt || blog.subtitle || `Read ${blog.title} on Codelix IT Solutions.`} />
      <div className="v2-progress" aria-hidden="true"><span /></div>
      <div className="bdv2-read-rail" aria-hidden="true">
        <div className="bdv2-read-fill" style={{ transform: `scaleX(${readProgress})` }} />
      </div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />
      <StructuredData type="BlogPosting" data={blog} />

      
      

      {/* ══════════ 1 · ARTICLE HEADER ══════════ */}
      <header className="bdv2-header">
        <div className="bdv2-header-inner">
          <nav className="sd2-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/blog">Blog</Link>
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
            <Link className="v2-hero-secondary" to="/blog">
              <ArrowLeft size={15} strokeWidth={2} />
              <span className="v2-hero-secondary-label">Back to all articles</span>
            </Link>
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
              <Link className="bdv2-related-card" to={`/blog/${b.slug || slugify(b.title)}`} key={b.id}>
                <div className="bdv2-related-media">
                  <img src={b.image} alt={b.title} loading="lazy" />
                </div>
                <div className="bdv2-related-body">
                  <h3>{b.title}</h3>
                  <span>{b.date} · {b.readTime}</span>
                </div>
                <span className="bdv2-related-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.8} /></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ 4 · CTA ══════════ */}
      <CtaSection className="v2-section--void  bdv2-cta-shell">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Bring us the problem.
            <br />
            <span className="v2-cta-accent">We'll bring back a scoped plan.</span>
          </h2>
          <p className="v2-cta-body">
            A structured conversation about your product — your users, your workflows, your constraints.
            We scope what should be built first, what can wait, and what it takes to ship it.
          </p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to="/contact">Book a consultation →</Link></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
            <FooterV2 />
    </div>
  );
}
