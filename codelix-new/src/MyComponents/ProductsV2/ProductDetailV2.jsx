import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, X, ArrowUpRight, ExternalLink } from "lucide-react";
import FooterV2 from "../Shared/FooterV2";
import NavbarV2 from "../Shared/NavbarV2";
import { LISTED_PRODUCTS, productBySlug } from "./productsData";
import { SEO } from "../../components/SEO";
import { StructuredData } from "../../components/StructuredData";

const SITE = "https://www.codelixitsolutions.com";

/* Only prices the page itself publishes, read from the same data it renders.
   A tier like "₹1,999" with "/month + GST" becomes a monthly price with tax
   excluded; a one-off range like "₹2.5 Lakh – ₹25 Lakh+" becomes a minimum
   only, because the "+" means there is no ceiling to state. Anything priced
   as a percentage or "billed separately" has no number to give and is left
   out rather than guessed at. */
const rupees = (s) => {
  const lakh = /₹\s*([\d.]+)\s*Lakh/i.exec(s);
  if (lakh) return Math.round(parseFloat(lakh[1]) * 100000);
  const plain = /₹\s*([\d,]+)/.exec(s);
  return plain ? Number(plain[1].replace(/,/g, "")) : null;
};

function productOffers(p) {
  const tiers = p.pricing?.tiers || [];
  const components = p.pricing?.components || [];
  const offers = [];
  for (const t of tiers) {
    const price = rupees(t.price || "");
    if (price == null) continue;
    const monthly = /month/i.test(t.period || "");
    const exTax = /GST/i.test(t.period || "");
    offers.push({
      "@type": "Offer",
      "name": t.name,
      "price": String(price),
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": price,
        "priceCurrency": "INR",
        ...(monthly ? { "unitText": "MONTH" } : {}),
        ...(exTax ? { "valueAddedTaxIncluded": false } : {}),
      },
    });
  }
  for (const c of components) {
    const min = rupees(c.range || "");
    if (min == null) continue;
    offers.push({
      "@type": "Offer",
      "name": c.name,
      "priceCurrency": "INR",
      "priceSpecification": { "@type": "PriceSpecification", "minPrice": min, "priceCurrency": "INR" },
    });
  }
  return offers;
}

function productSchema(p) {
  const onPlay = /Google Play/i.test(p.status || "");
  const offers = productOffers(p);
  return {
    "name": p.name,
    "description": p.seoDescription || p.tagline,
    "image": `${SITE}/og/${p.slug}.png`,
    ...(p.website ? { "sameAs": [p.website] } : {}),
    // only the platform the page says it is actually live on
    ...(onPlay ? { "operatingSystem": "Android" } : {}),
    ...(offers.length ? { "offers": offers } : {}),
  };
}

import "../HomepageV2/HomepageV2.css";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "../IndustriesV2/IndustryDetailV2.css";
import "./ProductDetailV2.css";
import CtaSection from '../Shared/CtaSection';
import FaqSection from "../Shared/FaqSection";
import RelatedReading from "../Shared/RelatedReading";
import { useReplayHeroIntro } from "../../lib/heroIntro.js";

export default function ProductDetailV2() {
  const { slug } = useParams();
  const p = productBySlug(slug);

  const rootRef = useRef(null);
  const [statsRevealed, setStatsRevealed] = useState(false);
  const statsRef = useRef(null);

  useReplayHeroIntro(rootRef, p);

  /* reveal-on-scroll, with the same hard 2s safety-net force-reveal used
     on the Industry detail page — this page also has a lot of
     conditionally-rendered sections, and an observer that only queries
     once on mount can miss elements swapped in on a later render. */
  useEffect(() => {
    if (!p) return;
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
  }, [p]);

  /* stat count-up — runs once the stats strip enters view. Numbers with
     a "+" or non-numeric characters (₹, Cr, commas) count up on the
     leading numeric portion only and keep the suffix static. */
  useEffect(() => {
    if (!statsRevealed) return;
    const els = statsRef.current?.querySelectorAll(".pd2-stat-num") || [];
    els.forEach((el) => {
      const raw = el.dataset.value || "";
      const match = raw.match(/^([\D₹]*)([\d,]+)(.*)$/);
      if (!match) return;
      const [, prefix, numStr, suffix] = match;
      const target = parseInt(numStr.replace(/,/g, ""), 10);
      if (!Number.isFinite(target)) return;
      const dur = 1200;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.round(target * eased);
        el.textContent = `${prefix}${val.toLocaleString("en-IN")}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, [statsRevealed]);

  if (!p) {
    return (
      <div className="v2" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <h1 style={{ color: "#fff", fontSize: 28 }}>Product not found.</h1>
        <Link className="v2-btn" to={`/products/${LISTED_PRODUCTS[0].slug}`}>Back to Products →</Link>
      </div>
    );
  }

  /* only listed products: an unlisted one (4bitx) isn't advertised here */
  const otherProducts = LISTED_PRODUCTS.filter((x) => x.slug !== p.slug);
  const faqs = p.faq || [];

  return (
    <div className="v2 pd2-root" ref={rootRef} style={{ "--prod-accent": p.accent }}>
      {/* each product has its own share card under /og, keyed by slug - a
          product link shared on its own should look like the product */}
      <SEO
        title={p.seoTitle || `${p.name} | Codelix IT Solutions`}
        description={p.seoDescription || p.tagline || `Learn about ${p.name} at Codelix IT Solutions.`}
        keywords={p.keywords}
        image={`/og/${p.slug}.png`}
      />
      <StructuredData type="SoftwareApplication" data={productSchema(p)} />
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
                <em>{p.name}</em>
              </nav>

              <div className="pd2-hero-logo sv2-hero-reveal"><img src={p.logo} alt={`${p.name} logo`} /></div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status" style={{ "--dot": p.accent }}><i /> {p.badge}</span>
              </div>
              <h1 key={slug} className="sd2-hero-title">
                <span className="line"><span>{p.name}</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">{p.tagline}</p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Talk to us about {p.name}</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                {p.website && (
                  <a className="v2-hero-secondary" href={p.website} target="_blank" rel="noopener noreferrer">
                    <span className="v2-hero-secondary-label">Visit {p.website.replace("https://", "")}</span>
                    <ExternalLink size={14} strokeWidth={2} />
                  </a>
                )}
              </div>
            </div>

            <aside className="sd2-facts sv2-hero-reveal">
              {[
                ["Status", p.status],
                ["Built by", "Codelix IT Solutions"],
                ["Category", p.badge],
              ].map(([k, v]) => (
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
        {p.stats.map((s) => (
          <div className="pd2-stat" key={s.label}>
            <span className="pd2-stat-num" data-value={s.value}>{s.value}</span>
            <span className="pd2-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ══════════ PROBLEM ══════════ */}
      {p.problem && (
        <section className="v2-section pd2-problem">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">{p.problem.label}</span>
            <h2 className="v2-heading pd2-reveal">{p.problem.heading}</h2>
            <p className="v2-lede pd2-reveal">{p.problem.body}</p>
            <div className="pd2-problem-grid">
              {p.problem.points.map((pt, i) => (
                <div className="pd2-problem-card pd2-reveal" key={i}>
                  <pt.icon size={22} strokeWidth={1.5} />
                  <h3>{pt.title}</h3>
                  <p>{pt.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ POSITIONING (4bitx) ══════════ */}
      {p.positioning && p.positioning.not && (
        <section className="v2-section pd2-positioning">
          <div className="v2-container">
            <h2 className="v2-heading pd2-reveal">What {p.name} actually is.</h2>
            <div className="pd2-positioning-grid">
              <div className="pd2-positioning-col pd2-positioning-not pd2-reveal">
                <span className="pd2-positioning-label">4bitx is not</span>
                {p.positioning.not.map((t) => (
                  <div className="pd2-positioning-row" key={t}><X size={16} strokeWidth={2} /><span>{t}</span></div>
                ))}
              </div>
              <div className="pd2-positioning-col pd2-positioning-is pd2-reveal">
                <span className="pd2-positioning-label">4bitx is</span>
                {p.positioning.is.map((t) => (
                  <div className="pd2-positioning-row" key={t}><Check size={16} strokeWidth={2} /><span>{t}</span></div>
                ))}
              </div>
            </div>
            {p.industries && (
              <div className="pd2-industry-tags pd2-reveal">
                {p.industries.map((ind) => <span key={ind}>{ind}</span>)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════ MODULES ══════════ */}
      {p.modules && (
        <section className="v2-section pd2-modules">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">The Platform</span>
            <h2 className="v2-heading pd2-reveal">{p.modules.length} modules. One connected system.</h2>
            <div className="pd2-module-grid">
              {p.modules.map((m) => (
                <div className={`pd2-module-card pd2-reveal ${m.unique ? "is-unique" : ""}`} key={m.n}>
                  <span className="pd2-module-n">{m.n}</span>
                  <m.icon size={20} strokeWidth={1.5} />
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                  {m.unique && <span className="pd2-module-badge">Only in {p.name}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ AI FEATURES ══════════ */}
      {p.ai && (
        <section className="v2-section pd2-ai">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">{p.ai.label}</span>
            <h2 className="v2-heading pd2-reveal">{p.ai.heading}</h2>
            {p.ai.body && <p className="v2-lede pd2-reveal">{p.ai.body}</p>}
            <div className="pd2-ai-grid">
              {p.ai.items.map((it, i) => (
                <div className="pd2-ai-card pd2-reveal" key={i}>
                  <div className="pd2-ai-icon"><it.icon size={22} strokeWidth={1.5} /></div>
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ USERS (AanganOne) ══════════ */}
      {p.users && (
        <section className="v2-section pd2-users">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">Who It's For</span>
            <h2 className="v2-heading pd2-reveal">Four roles. One shared platform.</h2>
            <div className="pd2-users-grid">
              {p.users.map((u) => (
                <div className="pd2-user-card pd2-reveal" key={u.role}>
                  <h3>{u.role}</h3>
                  <p>{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ FEATURES (AanganOne, grouped) ══════════ */}
      {p.features && (
        <section className="v2-section pd2-features">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">Everything Inside</span>
            <h2 className="v2-heading pd2-reveal">{p.features.reduce((a, g) => a + g.items.length, 0)} features across {p.features.length} categories.</h2>
            {p.features.map((group) => (
              <div className="pd2-feature-group pd2-reveal" key={group.group}>
                <h3>{group.group}</h3>
                <div className="pd2-feature-grid">
                  {group.items.map((it) => (
                    <div className="pd2-feature-card" key={it.title}>
                      <it.icon size={20} strokeWidth={1.5} />
                      <div>
                        <h3>{it.title}</h3>
                        <p>{it.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════ HOW IT WORKS ══════════ */}
      {p.howItWorks && (
        <section className="v2-section pd2-how">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">How It Works</span>
            <h2 className="v2-heading pd2-reveal">From first call to going live.</h2>
            <div className="pd2-how-spine">
              {p.howItWorks.map((step, i) => (
                <div className="pd2-how-row pd2-reveal" key={i}>
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
      )}

      {/* ══════════ PRICING — tiers (Audytee) ══════════ */}
      {p.pricing?.tiers && (
        <section className="v2-section pd2-pricing">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">Pricing</span>
            <h2 className="v2-heading pd2-reveal">Simple, transparent plans.</h2>
            <p className="v2-lede pd2-reveal">{p.pricing.note}</p>
            <div className="pd2-pricing-grid">
              {p.pricing.tiers.map((t) => (
                <div className={`pd2-pricing-card pd2-reveal ${t.popular ? "is-popular" : ""}`} key={t.name}>
                  {t.popular && <span className="pd2-pricing-tag">Most Popular</span>}
                  <h3>{t.name}</h3>
                  <p className="pd2-pricing-desc">{t.desc}</p>
                  <div className="pd2-pricing-price">{t.price}<span>{t.period}</span></div>
                  <ul>
                    {t.features.map((f) => <li key={f}><Check size={14} strokeWidth={2.5} />{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            {p.pricing.enterprise && <p className="pd2-pricing-enterprise pd2-reveal">{p.pricing.enterprise}</p>}
          </div>
        </section>
      )}

      {/* ══════════ PRICING — components (4bitx) ══════════ */}
      {p.pricing?.components && (
        <section className="v2-section pd2-pricing">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">Investment</span>
            <h2 className="v2-heading pd2-reveal">What it costs to run {p.name}.</h2>
            <p className="v2-lede pd2-reveal">{p.pricing.note}</p>
            <div className="pd2-price-components pd2-reveal">
              {p.pricing.components.map((c) => (
                <div className="pd2-price-row" key={c.name}>
                  <div className="pd2-price-row-name">{c.name}</div>
                  <div className="pd2-price-row-range">{c.range}</div>
                  <div className="pd2-price-row-body">{c.body}</div>
                </div>
              ))}
            </div>
            {p.pricing.enterprise && <p className="pd2-pricing-enterprise pd2-reveal">{p.pricing.enterprise}</p>}
          </div>
        </section>
      )}

      {/* ══════════ COMPARE (Audytee) ══════════ */}
      {p.compare && (
        <section className="v2-section pd2-compare">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">Comparison</span>
            <h2 className="v2-heading pd2-reveal">{p.compare.heading}</h2>
            <p className="v2-lede pd2-reveal">{p.compare.body}</p>
            <div className="pd2-compare-table-wrap pd2-reveal">
              <table className="pd2-compare-table">
                <thead>
                  <tr>
                    <th></th>
                    {p.compare.cols.map((c, i) => <th key={c} className={i === 0 ? "is-us" : ""}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {p.compare.rows.map((row) => (
                    <tr key={row.label}>
                      <td className="pd2-compare-row-label">{row.label}</td>
                      {row.vals.map((v, i) => (
                        <td key={i} className={i === 0 ? "is-us" : ""}>
                          {v === "yes" && <Check size={16} strokeWidth={2.5} className="pd2-cmp-yes" />}
                          {v === "no" && <X size={16} strokeWidth={2.5} className="pd2-cmp-no" />}
                          {v === "partial" && <span className="pd2-cmp-partial">Partial</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ══════════ MARKET (Audytee) ══════════ */}
      {p.market && (
        <section className="v2-section pd2-market">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">The Opportunity</span>
            <div className="pd2-market-grid">
              {p.market.map((m) => (
                <div className="pd2-market-card pd2-reveal" key={m.label}>
                  <span className="pd2-market-value">{m.value}</span>
                  <span className="pd2-market-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ DIFFERENTIATORS (AanganOne) ══════════ */}
      {p.differentiators && (
        <section className="v2-section pd2-diff">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">Why It's Different</span>
            <h2 className="v2-heading pd2-reveal">Built to feel premium, not just functional.</h2>
            {p.positioning?.body && <p className="v2-lede pd2-reveal">{p.positioning.body}</p>}
            <div className="pd2-diff-list">
              {p.differentiators.map((d, i) => (
                <div className="pd2-diff-row pd2-reveal" key={i}>
                  <span className="pd2-diff-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ TRACTION + ROADMAP ══════════ */}
      {p.traction && (
        <section className="v2-section pd2-traction">
          <div className="v2-container">
            <span className="v2-label pd2-reveal">Traction</span>
            <h2 className="v2-heading pd2-reveal">Where {p.name} stands today.</h2>
            <div className="pd2-traction-grid">
              <ul className="pd2-traction-list pd2-reveal">
                {p.traction.points.map((pt, i) => (
                  <li key={i}><Check size={16} strokeWidth={2.5} />{pt}</li>
                ))}
              </ul>
              {p.traction.roadmap && (
                <div className="pd2-roadmap pd2-reveal">
                  {p.traction.roadmap.map((r, i) => (
                    <div className="pd2-roadmap-row" key={i}>
                      <span className="pd2-roadmap-period">{r.period}</span>
                      <span className="pd2-roadmap-body">{r.body}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <RelatedReading />

      {/* ══════════ FAQ ══════════ */}
      {faqs.length > 0 && (
        <FaqSection
          faqs={faqs}
          label="FAQ"
          heading={`Common questions about ${p.name}.`}
        />
      )}

      {/* ══════════ OTHER PRODUCTS ══════════ */}
      <section className="v2-section pd2-other-products">
        <div className="v2-container">
          <span className="v2-label pd2-reveal">More From Codelix</span>
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
        
          <p className="v2-label">Get Started</p>
          <h2 className="v2-cta-headline">Want {p.name} for your {p.slug === 'aanganone' ? 'society' : 'business'}?</h2>
          <p className="v2-cta-body">
            Tell us about your {p.slug === 'aanganone' ? 'society' : 'team'} and we'll walk you through a live demo.
          </p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to="/contact">Book a demo →</Link></div>
</CtaSection>

      </main>

      <FooterV2 />
    </div>
  );
}
