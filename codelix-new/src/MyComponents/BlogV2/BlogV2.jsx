import React, { useEffect, useMemo, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import { Search, ArrowUpRight } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./BlogV2.css";

/* same real articles used on the live /blog page, merged with anything
   published via the Supabase admin panel (see useBlogPosts) — not new/
   invented posts, just reskinned in the v2 theme */
import { slugify } from "../../data/blogData";
import { useBlogPosts } from "../../data/useBlogPosts";
import NavbarV2 from "../Shared/NavbarV2";
import CtaSection from '../Shared/CtaSection';
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";


const CATEGORIES = ["All Articles", "business", "CMS", "UI/UX", "Tech", "E-Commerce", "Development", "Artificial Intelligence"];

export default function BlogV2() {
  const blogs = useBlogPosts();
  
  
  
  const [category, setCategory] = useState("All Articles");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  const rootRef = useRef(null);

  

  

  /* hero intro — masked-line GSAP wipe, matching the other v2 pages */
  useEffect(() => {
    const q = (s) => rootRef.current.querySelectorAll(s);
    splitTitleLinesIn(rootRef.current, ".sd2-hero-title");
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
  }, [visible.map(b => b.id).join(","), category, search]);

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      
      

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span>/</span>
                <em>Blog</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> {blogs.length} articles, no fluff</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Notes on building</span></span>{" "}
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
            <a className="bv2-card" href={`/blog/${b.slug || slugify(b.title)}`} key={b.id}>
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
      <CtaSection className="v2-section--void  bv2-cta-shell">
        
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
            <a className="v2-btn" href="/contact">Book a consultation →</a></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
      <FooterV2 />
    </div>
  );
}
