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
import { blogKeywordsFor } from "../../lib/blogKeywords";
import { renderArticle, articleHeadings, articleFaqs } from "../../lib/articleMarkup";
import { servicesForPost } from "../../lib/blogServices";
import { authorFor } from "../../lib/people";
import { useBlogPosts, toISODate } from "../../data/useBlogPosts";
import ArticleSkeleton from "../Shared/ArticleSkeleton";
import NavbarV2 from "../Shared/NavbarV2";
import CtaSection from '../Shared/CtaSection';
import FaqSection from "../Shared/FaqSection";
import { StructuredData } from "../../components/StructuredData";
import { SEO } from "../../components/SEO";
import { fitTitle } from "../../lib/fitTitle.js";


export default function BlogDetailV2() {
  const { slug } = useParams();
  const { posts: blogs, loading } = useBlogPosts();
  const blog = blogs.find((b) => (b.slug ? b.slug === slug : slugify(b.title) === slug));

  
  
  
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState(null);

  /* contents rail: highlight the section being read — the last heading
     that has scrolled past the upper third of the screen */
  useEffect(() => {
    if (!blog) return;
    const targets = [...(rootRef.current?.querySelectorAll(".bdv2-body h2[id], #faq") || [])];
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const passed = targets.filter((t) => t.getBoundingClientRect().top < window.innerHeight * 0.33);
        if (passed.length) setActiveId(passed[passed.length - 1].id);
        else if (entries.length) setActiveId(targets[0].id);
      },
      { rootMargin: "0px 0px -66% 0px", threshold: [0, 1] }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [blog]);

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
  if (!blog && loading) return <ArticleSkeleton label="Loading article" />;

  if (!blog) {
    return (
      <div className="v2" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <main><h1 style={{ color: "#fff", fontSize: 28 }}>Article not found.</h1>
        <Link className="v2-btn" to="/blog">Back to Blog →</Link>
      </main></div>
    );
  }

  /* every post carries "All Articles", so matching on any shared tag made
     every post "related" and this showed the three newest whatever the topic.
     Rank by the tags actually shared (category, topic phrases) instead; blogs
     is newest first, so ties keep the newer post. */
  const ownTags = new Set(blog.tags.filter((t) => t !== "All Articles"));
  const related = blogs
    .filter((b) => b.id !== blog.id)
    .map((b, i) => ({ b, i, shared: b.tags.filter((t) => ownTags.has(t)).length }))
    .sort((x, y) => y.shared - x.shared || x.i - y.i)
    .slice(0, 3)
    .map(({ b }) => b);
  const headings = articleHeadings(blog.content);
  const faqs = articleFaqs(blog.content);
  const author = authorFor(blog);
  const initials = author.name.split(" ").map((w) => w[0]).join("");
  const tocItems = faqs.length > 0 ? [...headings, { id: "faq", text: "Frequently asked questions" }] : headings;
  const services = servicesForPost(blog);
  const pageUrl = `https://www.codelixitsolutions.com/blog/${slug}`;
  /* "Updated …" only once the post was edited on a later day than it was
     published: a fresh post's updated_at is its publish moment, and the
     byline would otherwise announce an update that never happened */
  const updatedIso = toISODate(blog.updatedAt);
  const publishedIso = toISODate(blog.publishedAt || blog.date);
  const updated = updatedIso && (!publishedIso || updatedIso.slice(0, 10) > publishedIso.slice(0, 10))
    ? new Date(updatedIso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;
  const copyLink = () => {
    navigator.clipboard?.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };
  /* sits before the middle "## " heading of longer articles */
  const midCta = (
    <div className="bdv2-midcta">
      <div>
        <p className="bdv2-midcta-k">Free consultation</p>
        <p className="bdv2-midcta-title">Planning something like this?</p>
        <p className="bdv2-midcta-body">Tell us what you need. After a short call we send a written scope, timeline and fixed quote.</p>
      </div>
      <Link className="v2-btn v2-btn--filled" to="/contact"><span>Book a consultation</span><i className="v2-btn-arrow">→</i></Link>
    </div>
  );

  return (
    <div className="v2" ref={rootRef}>
      {/* Only a real cover. The pre-Supabase posts share three decorative
          images between twelve of them, so using those would put the same
          picture on four unrelated posts - worse than the house card, which
          at least does not claim to depict the article. */}
      <SEO
        title={fitTitle(blog.title, [" | Codelix IT Solutions", " | Codelix"])}
        description={blog.excerpt || blog.subtitle || `Read ${blog.title} on Codelix IT Solutions.`}
        keywords={blogKeywordsFor(slug, blog.tags, blog.title)}
        image={blog.coverImage}
        type="article"
        publishedTime={toISODate(blog.publishedAt || blog.date)}
        modifiedTime={toISODate(blog.updatedAt) || toISODate(blog.publishedAt || blog.date)}
      />
      <div className="v2-progress" aria-hidden="true"><span /></div>
      <div className="bdv2-read-rail" aria-hidden="true">
        <div className="bdv2-read-fill" style={{ transform: `scaleX(${readProgress})` }} />
      </div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      <main>
      <StructuredData type="BlogPosting" data={{ ...blog, author }} />

      
      

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
          {blog.excerpt && <p className="bdv2-lede">{blog.excerpt}</p>}
          {/* the same person the BlogPosting markup names as author */}
          <div className="bdv2-byline">
            <span className="bdv2-avatars" aria-hidden="true"><i>{initials}</i></span>
            <span>
              By <Link to="/team">{author.name}</Link>, {author.jobTitle}
              {updated && <> · Updated {updated}</>}
            </span>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · ARTICLE BODY — the extraordinary section is the
          horizontal reading-progress rail fixed to the top of the viewport
          (rendered once, above), painted every animation frame from this
          article's live position. ══════════ */}
      <section className="v2-section" id="article">
        <div className="bdv2-article-inner">
          <div className="bdv2-image">
            {/* same as the case study hero: this is the LCP element on the
                page, so it should not wait for the layout pass to be
                prioritised */}
            <img src={blog.image} alt={blog.title} width="1200" height="630" fetchPriority="high" decoding="async" />
          </div>

          <div className="bdv2-content">
          {/* contents: a collapsed box above the article on small screens,
              a sticky rail in the right margin on wide ones (CSS decides) */}
          {tocItems.length >= 3 && (
            <>
              <details className="bdv2-toc">
                <summary>On this page <span>{tocItems.length} sections</span></summary>
                <ol>
                  {tocItems.map((h) => (
                    <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>
                  ))}
                </ol>
              </details>
              <aside className="bdv2-rail" aria-label="On this page">
                <nav className="bdv2-rail-inner">
                  <p className="bdv2-rail-k">On this page</p>
                  <ol>
                    {tocItems.map((h) => (
                      <li key={h.id} className={activeId === h.id ? "is-active" : ""}>
                        <a href={`#${h.id}`}>{h.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            </>
          )}

          <article className="bdv2-body" ref={articleRef}>
            {renderArticle(blog.content, {
              insert: headings.length >= 4 ? { beforeHeading: Math.floor(headings.length / 2), node: midCta } : undefined,
              /* the questions are shown in the FAQ accordion below instead */
              skipFaq: faqs.length > 0,
            })}
          </article>

          <div className="bdv2-share">
            <span>Share this article</span>
            <a href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} ${pageUrl}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`https://x.com/intent/post?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer">X</a>
            <button type="button" onClick={copyLink}>{copied ? "Link copied" : "Copy link"}</button>
          </div>

          {/* who wrote it — the same person (and profile) the BlogPosting
              markup names as author, chosen by authorFor in src/lib/people.js */}
          <aside className="bdv2-authors" aria-label="About the author">
            <p className="bdv2-authors-k">About the author</p>
            <div className="bdv2-author">
              <span className="bdv2-author-avatar" aria-hidden="true">{initials}</span>
              <div>
                <p className="bdv2-author-name">{author.name}</p>
                <p className="bdv2-author-role">{author.jobTitle}, Codelix IT Solutions</p>
                {author.sameAs?.[0] && (
                  <a className="bdv2-author-link" href={author.sameAs[0]} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                )}
              </div>
            </div>
            <p className="bdv2-authors-note">
              Codelix IT Solutions is a software company in Ahmedabad that builds websites, mobile apps,
              ERP systems and AI tools for businesses across India, with 40+ projects delivered.{" "}
              <Link to="/team">Meet the team →</Link>
            </p>
          </aside>

          <div className="bdv2-back">
            <Link className="v2-hero-secondary" to="/blog">
              <ArrowLeft size={15} strokeWidth={2} />
              <span className="v2-hero-secondary-label">Back to all articles</span>
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* ══════════ 2b · FAQ — the article's own questions, in the same
          accordion as every other page (it also emits the FAQPage markup) ══════════ */}
      {faqs.length > 0 && (
        <FaqSection
          faqs={faqs}
          className="v2-section--void bdv2-wide"
          label="FAQ"
          heading="Questions readers ask about this topic."
        />
      )}

      {/* ══════════ 2c · HOW WE CAN HELP — the service pages that match the
          post, in the same cards as the service pages' "Explore More" ══════════ */}
      <section className="v2-section bdv2-wide" id="services">
        <p className="v2-label">How We Can Help</p>
        <h2 className="v2-heading">Services related to this article.</h2>
        <div className="sd2-other-list bdv2-help-list">
          {services.map((s, i) => (
            <Link className="sd2-other is-in" to={s.path} key={s.path}>
              <div className="sd2-other-top">
                <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
                <span className="sd2-other-n">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <span className="sd2-other-title">{s.label}</span>
              <p className="sd2-other-body">{s.body}</p>
              <span className="sd2-other-go">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ 3 · RELATED ARTICLES ══════════ */}
      {related.length > 0 && (
        <section className="v2-section v2-section--void bdv2-wide" id="related">
          <p className="v2-label">Keep Reading</p>
          <h2 className="v2-heading">Related articles.</h2>
          <div className="bdv2-related">
            {related.map((b) => (
              <Link className="bdv2-related-card" to={`/blog/${b.slug || slugify(b.title)}`} key={b.id}>
                <div className="bdv2-related-media">
                  <img src={b.image} alt={b.title} width="1200" height="630" loading="lazy" decoding="async" />
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
            <Link className="v2-btn v2-btn--filled" to="/contact">
              <span>Book a consultation</span>
              <i className="v2-btn-arrow">→</i>
            </Link>
          </div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
      </main>

            <FooterV2 />
    </div>
  );
}
