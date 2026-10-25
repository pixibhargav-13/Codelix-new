import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, ArrowUpRight, ArrowRight } from "lucide-react";
import FooterV2 from "../Shared/FooterV2";
import NavbarV2 from "../Shared/NavbarV2";
import { SEO } from "../../components/SEO";
import { StructuredData } from "../../components/StructuredData";
import CtaSection from "../Shared/CtaSection";
import FaqSection from "../Shared/FaqSection";
import RelatedReading from "../Shared/RelatedReading";
import NotFound from "../NotFound/NotFound";
import { useReplayHeroIntro } from "../../lib/heroIntro.js";
import { LISTED_PRODUCTS } from "../ProductsV2/productsData";
import { ERP_OVERVIEW, ERP_INDUSTRIES, ERP_PATH, ERP_ACCENT, erpMark, erpIndustryBySlug } from "./erpData";

import "../HomepageV2/HomepageV2.css";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "../IndustriesV2/IndustryDetailV2.css";
import "../ProductsV2/ProductDetailV2.css";
import "./ErpV2.css";

const SITE = "https://www.codelixitsolutions.com";

/* Codelix ERP: /products/codelix-erp (the overview) and
   /products/codelix-erp/:industry (one edition). Both render from erpData.js
   with the product pages' design (ProductDetailV2.css) plus the sections a
   pitch deck needs: module spotlights with real screens, the mobile app,
   the editions, and who it's for. */
export default function ErpPageV2() {
  const { industry } = useParams();
  const page = industry ? erpIndustryBySlug(industry) : ERP_OVERVIEW;
  const isOverview = !industry;

  const rootRef = useRef(null);
  const statsRef = useRef(null);
  const [statsRevealed, setStatsRevealed] = useState(false);

  useReplayHeroIntro(rootRef, page);

  /* reveal on scroll, with the product page's 2s safety net */
  useEffect(() => {
    if (!page) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    const sel = [".v2-strip", ".v2-cta", ".v2-heading", ".v2-label", ".v2-lede", ".pd2-stats", ".pd2-reveal"].join(", ");
    const targets = rootRef.current?.querySelectorAll(sel) || [];
    targets.forEach((el) => io.observe(el));
    const safety = setTimeout(() => {
      targets.forEach((el) => el.classList.add("is-in"));
      setStatsRevealed(true);
    }, 2000);
    return () => { io.disconnect(); clearTimeout(safety); };
  }, [page]);

  /* stat count-up on the leading number only ("₹1000+ Cr" counts 1000) */
  useEffect(() => {
    if (!statsRevealed) return;
    statsRef.current?.querySelectorAll(".pd2-stat-num").forEach((el) => {
      const match = (el.dataset.value || "").match(/^([^\d]*)([\d,]+)(.*)$/);
      if (!match) return;
      const [, prefix, numStr, suffix] = match;
      const target = parseInt(numStr.replace(/,/g, ""), 10);
      if (!Number.isFinite(target)) return;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / 1200, 1);
        el.textContent = `${prefix}${Math.round(target * (1 - Math.pow(1 - t, 3))).toLocaleString("en-IN")}${suffix}`;
        /* end on the stat exactly as written ("₹1000+ Cr", not "₹1,000+ Cr") */
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = el.dataset.value;
      };
      requestAnimationFrame(tick);
    });
  }, [statsRevealed]);

  /* an unknown edition is a real 404, noindex included */
  if (!page) return <NotFound />;

  const path = isOverview ? ERP_PATH : `${ERP_PATH}/${page.slug}`;
  const ogKey = isOverview ? "codelix-erp" : `codelix-erp-${page.slug}`;
  const otherEditions = ERP_INDUSTRIES.filter((i) => i.slug !== page.slug);
  const otherProducts = LISTED_PRODUCTS.filter((p) => p.slug !== "codelix-erp");

  return (
    <div className="v2 pd2-root erp2" ref={rootRef} style={{ "--prod-accent": ERP_ACCENT }}>
      <SEO title={page.seoTitle} description={page.seoDescription} keywords={page.keywords} image={`/og/${ogKey}.png`} />
      <StructuredData
        type="SoftwareApplication"
        data={{
          name: isOverview ? "Codelix ERP" : `Codelix ERP for ${page.name}`,
          description: page.seoDescription,
          applicationCategory: "BusinessApplication",
          image: `${SITE}/og/${ogKey}.png`,
          url: `${SITE}${path}`,
        }}
      />
      <div className="v2-progress" aria-hidden="true"><span /></div>
      <NavbarV2 />

      <main>

      {/* ══════════ HERO ══════════ */}
      <header className="sd2-hero pd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                {isOverview ? <em>Codelix ERP</em> : (
                  <>
                    <Link to={ERP_PATH}>Codelix ERP</Link>
                    <span>/</span>
                    <em>{page.name}</em>
                  </>
                )}
              </nav>

              <div className="pd2-hero-logo sv2-hero-reveal"><img src={erpMark} alt="Codelix ERP logo" /></div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status" style={{ "--dot": ERP_ACCENT }}><i /> {page.badge}</span>
              </div>
              <h1 key={path} className="sd2-hero-title">
                <span className="line"><span>{page.title}</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">{page.tagline}</p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Book a free demo</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                <a className="v2-hero-secondary" href={isOverview ? "#editions" : "#modules"}>
                  <span className="v2-hero-secondary-label">{isOverview ? "See the editions" : "See the modules"}</span>
                  <ArrowRight size={14} strokeWidth={2} />
                </a>
              </div>
            </div>

            <aside className="sd2-facts sv2-hero-reveal">
              {page.facts.map(([k, v]) => (
                <div className="sd2-fact" key={k}>
                  <span className="sd2-fact-k">{k}</span>
                  <span className="sd2-fact-v">{v}</span>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </header>

      {/* ══════════ STATS ══════════ */}
      <section className="pd2-stats pd2-reveal" ref={statsRef}>
        {page.stats.map((s) => (
          <div className="pd2-stat" key={s.label}>
            <span className="pd2-stat-num" data-value={s.value}>{s.value}</span>
            <span className="pd2-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ══════════ PROBLEM ══════════ */}
      <section className="v2-section pd2-problem">
        <div className="v2-container">
          <span className="v2-label pd2-reveal">{page.problem.label}</span>
          <h2 className="v2-heading pd2-reveal">{page.problem.heading}</h2>
          <p className="v2-lede pd2-reveal">{page.problem.body}</p>
          {page.problem.illustrations && (
            <div className="erp2-illus pd2-reveal">
              {page.problem.illustrations.map((il) => (
                <img key={il.alt} src={il.img} alt={il.alt} loading="lazy" decoding="async" />
              ))}
            </div>
          )}
          <div className="pd2-problem-grid">
            {page.problem.points.map((pt) => (
              <div className="pd2-problem-card pd2-reveal" key={pt.title}>
                <pt.icon size={22} strokeWidth={1.5} />
                <h3>{pt.title}</h3>
                <p>{pt.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EDITIONS (overview) ══════════ */}
      {isOverview && (
        <section className="v2-section erp2-editions" id="editions">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">{page.industriesSection.label}</span>
            <h2 className="v2-heading pd2-reveal">{page.industriesSection.heading}</h2>
            <p className="v2-lede pd2-reveal">{page.industriesSection.body}</p>
            <div className="erp2-edition-grid">
              {ERP_INDUSTRIES.map((ed) => (
                <Link className="erp2-edition-card pd2-reveal" to={`${ERP_PATH}/${ed.slug}`} key={ed.slug}>
                  <span className="erp2-edition-icon"><ed.icon size={22} strokeWidth={1.5} /></span>
                  <h3>{ed.title}</h3>
                  <p>{ed.card}</p>
                  <ul>
                    {ed.highlights.map((h) => <li key={h}><Check size={14} strokeWidth={2.5} />{h}</li>)}
                  </ul>
                  <span className="erp2-edition-go">See the {ed.name.toLowerCase()} edition <ArrowUpRight size={16} strokeWidth={2} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ MODULES (edition) / CORE (overview) ══════════ */}
      {(page.modules || page.core) && (() => {
        const m = page.modules || page.core;
        return (
          <section className="v2-section pd2-modules" id="modules">
            <div className="v2-container">
              <span className="v2-label pd2-reveal">{m.label}</span>
              <h2 className="v2-heading pd2-reveal">{m.heading}</h2>
              {m.body && <p className="v2-lede pd2-reveal">{m.body}</p>}
              <div className={m.illustration ? "erp2-modules-split" : undefined}>
                {m.illustration && (
                  <img className="erp2-modules-illus pd2-reveal" src={m.illustration.img} alt={m.illustration.alt} loading="lazy" decoding="async" />
                )}
                <div className="pd2-module-grid">
                  {m.items.map((it) => (
                    <div className={`pd2-module-card pd2-reveal ${it.unique ? "is-unique" : ""}`} key={it.n}>
                      <span className="pd2-module-n">{it.n}</span>
                      <it.icon size={20} strokeWidth={1.5} />
                      <h3>{it.title}</h3>
                      <p>{it.body}</p>
                      {it.unique && <span className="pd2-module-badge">Only in Codelix ERP</span>}
                    </div>
                  ))}
                </div>
              </div>
              {m.custom && (
                <p className="erp2-custom pd2-reveal"><span>+ Customisation</span>{m.custom}</p>
              )}
            </div>
          </section>
        );
      })()}

      {/* ══════════ SPOTLIGHTS: each module with its real screen ══════════ */}
      {page.spotlights && (
        <section className="v2-section erp2-spots">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">Inside the app</span>
            <h2 className="v2-heading pd2-reveal">Every module, the way it really looks.</h2>
            {page.spotlights.map((s, i) => (
              <article className={`erp2-spot pd2-reveal ${i % 2 ? "is-flipped" : ""}`} key={s.label}>
                <div className="erp2-spot-text">
                  <span className="erp2-spot-label">{String(i + 1).padStart(2, "0")} · {s.label}</span>
                  <h3>{s.title}</h3>
                  <dl>
                    {s.points.map((pt) => (
                      <div key={pt.title}>
                        <dt>{pt.title}</dt>
                        <dd>{pt.body}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="erp2-spot-simple"><strong>In simple words:</strong> {s.simple}</p>
                </div>
                <figure className="erp2-shot">
                  <img src={s.img} alt={s.alt} loading="lazy" decoding="async" />
                </figure>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ AI ══════════ */}
      {page.ai && (
        <section className="v2-section pd2-ai">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">{page.ai.label}</span>
            <h2 className="v2-heading pd2-reveal">{page.ai.heading}</h2>
            <div className="pd2-ai-grid">
              {page.ai.items.map((it) => (
                <div className="pd2-ai-card pd2-reveal" key={it.title}>
                  <div className="pd2-ai-icon"><it.icon size={22} strokeWidth={1.5} /></div>
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ CORE SCREENS (non-construction pages) ══════════ */}
      {page.coreScreens && !page.spotlights && (
        <section className="v2-section erp2-core-screens">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">The same core</span>
            <h2 className="v2-heading pd2-reveal">Screens from the Codelix ERP core.</h2>
            <p className="v2-lede pd2-reveal">Every edition shares these screens, shown here with sample data.</p>
            <div className="erp2-screen-grid">
              {page.coreScreens.map((s) => (
                <figure className="erp2-screen pd2-reveal" key={s.title}>
                  <div className="erp2-shot"><img src={s.img} alt={`${s.title} screen in Codelix ERP`} loading="lazy" decoding="async" /></div>
                  <figcaption><strong>{s.title}</strong>{s.body}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ MOBILE APP ══════════ */}
      {page.mobile && (
        <section className="v2-section erp2-mobile">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">Mobile app</span>
            <h2 className="v2-heading pd2-reveal">{page.mobile.heading}</h2>
            <p className="v2-lede pd2-reveal">{page.mobile.body}</p>
            <div className="erp2-phone-grid">
              {page.mobile.items.map((m) => (
                <figure className="erp2-phone pd2-reveal" key={m.title}>
                  <img src={m.img} alt={`${m.title} on the Codelix ERP mobile app`} loading="lazy" decoding="async" />
                  <figcaption><strong>{m.title}</strong>{m.body}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ WHO IT'S FOR (construction) ══════════ */}
      {page.audiences && (
        <section className="v2-section pd2-users">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">{page.audiences.label}</span>
            <h2 className="v2-heading pd2-reveal">{page.audiences.heading}</h2>
            <div className="pd2-users-grid">
              {page.audiences.items.map((a) => (
                <div className="pd2-user-card pd2-reveal" key={a.role}>
                  <h3>{a.role}</h3>
                  <ul className="erp2-checklist">
                    {a.points.map((pt) => <li key={pt}><Check size={14} strokeWidth={2.5} />{pt}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            {page.audiences.note && <p className="erp2-note pd2-reveal">{page.audiences.note}</p>}
          </div>
        </section>
      )}

      {/* ══════════ TRUST (construction) ══════════ */}
      {page.trust && (
        <section className="v2-section erp2-trust">
          <div className="v2-container">
            <p className="erp2-trust-value pd2-reveal">{page.trust.value}</p>
            <p className="erp2-trust-body pd2-reveal">{page.trust.body}</p>
          </div>
        </section>
      )}

      {/* ══════════ TRACTION (manufacturing family) ══════════ */}
      {page.traction && (
        <section className="v2-section pd2-traction">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">Where it runs</span>
            <h2 className="v2-heading pd2-reveal">Already running on real factory floors.</h2>
            <ul className="pd2-traction-list pd2-reveal">
              {page.traction.map((t) => <li key={t}><Check size={16} strokeWidth={2.5} />{t}</li>)}
            </ul>
          </div>
        </section>
      )}

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="v2-section pd2-how">
        <div className="v2-container">
          <span className="v2-label pd2-reveal">How it works</span>
          <h2 className="v2-heading pd2-reveal">From first call to going live.</h2>
          <div className="pd2-how-spine">
            {page.howItWorks.map((step, i) => (
              <div className="pd2-how-row pd2-reveal" key={step.title}>
                <span className="pd2-how-n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PRICING: what a quote depends on ══════════ */}
      <section className="v2-section erp2-pricing">
        <div className="v2-container">
          <span className="v2-label pd2-reveal">Pricing</span>
          <h2 className="v2-heading pd2-reveal">{page.pricing.heading}</h2>
          <p className="v2-lede pd2-reveal">{page.pricing.body}</p>
          <ul className="erp2-factors pd2-reveal">
            {page.pricing.factors.map((f) => <li key={f}><Check size={15} strokeWidth={2.5} />{f}</li>)}
          </ul>
          <Link className="v2-btn v2-btn--filled pd2-reveal erp2-pricing-cta" to="/contact">
            <span>Book a free demo for a quote</span>
            <i className="v2-btn-arrow">→</i>
          </Link>
        </div>
      </section>

      <RelatedReading />

      {/* ══════════ FAQ ══════════ */}
      <FaqSection
        faqs={page.faq}
        label="FAQ"
        heading={isOverview ? "Common questions about Codelix ERP." : `Common questions about ${page.title}.`}
      />

      {/* ══════════ OTHER EDITIONS + PRODUCTS ══════════ */}
      <section className="v2-section pd2-other-products">
        <div className="v2-container">
          {!isOverview && (
            <>
              <span className="v2-label pd2-reveal">Other editions</span>
              <div className="pd2-other-grid erp2-other-editions">
                <Link to={ERP_PATH} className="pd2-other-card pd2-reveal" style={{ "--accent": ERP_ACCENT }}>
                  <span className="pd2-other-logo"><img src={erpMark} alt="Codelix ERP logo" /></span>
                  <span className="pd2-other-badge">All editions</span>
                  <h3>Codelix ERP</h3>
                  <p>One ERP, set up for your industry.</p>
                  <span className="pd2-other-arrow"><ArrowUpRight size={18} strokeWidth={2} /></span>
                </Link>
                {otherEditions.map((ed) => (
                  <Link to={`${ERP_PATH}/${ed.slug}`} className="pd2-other-card pd2-reveal" key={ed.slug} style={{ "--accent": ERP_ACCENT }}>
                    <span className="pd2-other-logo erp2-other-icon"><ed.icon size={22} strokeWidth={1.5} /></span>
                    <span className="pd2-other-badge">Codelix ERP</span>
                    <h3>{ed.title}</h3>
                    <p>{ed.card}</p>
                    <span className="pd2-other-arrow"><ArrowUpRight size={18} strokeWidth={2} /></span>
                  </Link>
                ))}
              </div>
            </>
          )}
          <span className="v2-label pd2-reveal erp2-more-label">More from Codelix</span>
          <div className="pd2-other-grid">
            {otherProducts.map((op) => (
              <Link to={`/products/${op.slug}`} className="pd2-other-card pd2-reveal" key={op.slug} style={{ "--accent": op.accent }}>
                <span className="pd2-other-logo"><img src={op.logo} alt={`${op.name} logo`} /></span>
                <span className="pd2-other-badge">{op.badge}</span>
                <h3>{op.name}</h3>
                <p>{op.tagline}</p>
                <span className="pd2-other-arrow"><ArrowUpRight size={18} strokeWidth={2} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <CtaSection className="v2-section--void">
        <p className="v2-label">Get started</p>
        <h2 className="v2-cta-headline">
          {isOverview ? "See Codelix ERP with your own work." : `See Codelix ERP with your own ${page.slug === "construction" ? "sites" : "plant"}.`}
        </h2>
        <p className="v2-cta-body">Book a free demo. We'll walk you through it with examples from your industry, then send a written quote.</p>
        <div className="v2-cta-actions">
          <Link className="v2-btn" to="/contact">Book a free demo →</Link>
        </div>
      </CtaSection>

      </main>

      <FooterV2 />
    </div>
  );
}
