import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FooterV2 from "../Shared/FooterV2";

/* v2 design system — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./LegalV2.css";
import NavbarV2 from "../Shared/NavbarV2";


/* shared shell for every long-form legal page (Terms, Privacy, Refund) —
   keeps the nav/hero/footer boilerplate and the scroll-tracking table of
   contents in one place instead of duplicating it per page. `sections` is
   an array of { id, heading, body } where body is JSX — the legal text
   itself lives in each page's own file, not here, so it stays a single
   source of truth per document. */
export default function LegalV2({ crumbLabel, statusLabel, titleLine1, titleLine2, sub, updated, sections }) {
  
  
  
  const [activeId, setActiveId] = useState(sections[0]?.id);

  const rootRef = useRef(null);
  const railRef = useRef(null);
  const railFillRef = useRef(null);

  

  


  /* extraordinary section — a reading-progress rail behind the table of
     contents, painted every animation frame from live getBoundingClientRect
     (not a cached ScrollTrigger position), plus a scrollspy that highlights
     whichever section is currently under the reading line. */
  useEffect(() => {
    const shell = railRef.current;
    const fill = railFillRef.current;
    if (!shell || !fill) return;
    let raf = 0;
    const paint = () => {
      const r = shell.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const done = total > 0 ? Math.min(Math.max((-r.top + window.innerHeight * 0.5) / total, 0), 1) : 0;
      fill.style.transform = `scaleY(${done})`;
      raf = requestAnimationFrame(paint);
    };
    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      }),
      { threshold: 0, rootMargin: "-15% 0px -70% 0px" }
    );
    rootRef.current.querySelectorAll(".leg-section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      <main>

      

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <em>{crumbLabel}</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> {statusLabel}</span>
              </div>
              {/* the explicit space matters: .line is display:block so this
                  reads as two lines on screen either way, but without a
                  whitespace text node between them the extracted text
                  concatenates — Google was showing "The terms behindusing
                  this site." as the sitelink */}
              <h1 className="sd2-hero-title">
                <span className="line"><span>{titleLine1}</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">{titleLine2}</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">{sub}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · DOCUMENT — table of contents with a live reading-
          progress rail (the extraordinary section) ══════════ */}
      <section className="v2-section" id="document">
        <div className="leg-shell">
          <aside className="leg-toc">
            <span className="leg-toc-updated">Last updated {updated}</span>
            <div className="leg-toc-rail" ref={railRef}>
              <div className="leg-toc-rail-track" aria-hidden="true">
                <div className="leg-toc-rail-fill" ref={railFillRef} />
              </div>
              <ul>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={activeId === s.id ? "is-active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      <span className="leg-toc-n">{String(i + 1).padStart(2, "0")}</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="leg-doc">
            {sections.map((s) => (
              <article className="leg-section" id={s.id} key={s.id}>
                <h2>{s.heading}</h2>
                <div className="leg-body">{s.body}</div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════ FOOTER ══════════ */}
      </main>

            <FooterV2 />
    </div>
  );
}
