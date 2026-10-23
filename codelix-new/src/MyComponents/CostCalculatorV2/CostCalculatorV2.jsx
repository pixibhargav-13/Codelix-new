import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Layers, Plug, Smartphone, ShieldCheck, Clock } from "lucide-react";
import NavbarV2 from "../Shared/NavbarV2";
import FooterV2 from "../Shared/FooterV2";
import FaqSection from "../Shared/FaqSection";
import CtaSection from "../Shared/CtaSection";
import { useHirePageMotion } from "../HireDevelopersV2/useHirePageMotion";
import { BASE_ESTIMATES, COMPLEXITY, COST_FAMILIES } from "../../lib/pricingBands.js";

import "../HomepageV2/HomepageV2.css";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "../PricingV2/PricingV2.css";
import "./CostCalculatorV2.css";

/* A page of its own for "software development cost calculator" searches.
   Every figure comes from src/lib/pricingBands.js — the bands /pricing
   already publishes — so the calculator never states a price the company
   hasn't. The full table is rendered as plain HTML so search engines and
   answer engines can read every range, not just the one a visitor picks. */

const COST_DRIVERS = [
  { icon: Layers, title: "Number of features and screens", body: "The biggest single factor. Each workflow, report and admin screen adds design, build and testing time." },
  { icon: Users, title: "User roles", body: "One type of user is simple. Customers, staff, managers and partners each seeing different screens multiplies the work." },
  { icon: Plug, title: "Integrations", body: "Payment gateways, Tally, GST e-invoicing, CRMs and shipping partners each need building, testing and error handling." },
  { icon: Smartphone, title: "Platforms", body: "A website, an Android app and an iOS app are three surfaces. Cross-platform tools reduce the cost but don't remove it." },
  { icon: ShieldCheck, title: "Security and compliance", body: "Audit trails, role-based access, data residency and payment security add work up front and save trouble later." },
  { icon: Clock, title: "Timeline", body: "A fixed, early deadline means more people working in parallel. A flexible timeline usually costs less." },
];

const FAQS = [
  { q: "How accurate is this software cost calculator?", a: "It shows the range we publish for that type and size of project. Your exact price comes in a written quote after a short scoping call, usually within 48 hours." },
  { q: "Why are the prices in US dollars?", a: "These are the same bands published on our pricing page. Your written quote states the exact amount, currency and any applicable taxes." },
  { q: "What is not included in the estimate?", a: "Third-party costs you pay directly — hosting, app store accounts, paid APIs, SMS and WhatsApp messages, and software licences. We list them in the quote so there are no surprises." },
  { q: "Can I start small and add features later?", a: "Yes, and we usually recommend it. Launching a smaller first version and adding to it based on real use is the most common way to keep cost under control." },
  { q: "Do you charge for maintenance after launch?", a: "Every project includes a support window for fixes after launch. After that, maintenance is an optional monthly plan — the Maintenance & support row in the table above." },
];

export default function CostCalculatorV2() {
  const rootRef = useRef(null);
  const [familyKey, setFamilyKey] = useState(COST_FAMILIES[0].key);
  const [size, setSize] = useState(1);
  useHirePageMotion(rootRef, "calculator");

  const family = COST_FAMILIES.find((f) => f.key === familyKey);
  const estimate = BASE_ESTIMATES[family.key][size];
  /* carried into the contact form, which reads ?service= and ?note= */
  const quoteLink = `/contact?${new URLSearchParams({
    service: family.service,
    note: `From the cost calculator: ${family.label}, ${COMPLEXITY[size]} — estimate ${estimate}.`,
  })}`;

  return (
    <div className="v2" ref={rootRef}>
      {/* title and meta come from seoData via RouteSEO in App.jsx */}
      <div className="v2-progress" aria-hidden="true"><span /></div>
      <NavbarV2 />

      <main>
        <header className="sd2-hero">
          <div className="sd2-hero-inner">
            <div className="sd2-hero-main">
              <div>
                <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                  <Link to="/">Home</Link>
                  <span>/</span>
                  <Link to="/pricing">Pricing</Link>
                  <span>/</span>
                  <em>Cost Calculator</em>
                </nav>
                <div className="v2-hero-top sv2-hero-reveal">
                  <span className="v2-hero-status"><i /> Free · No sign-up</span>
                  <h1 className="v2-hero-eyebrow">Software Development Cost Calculator</h1>
                </div>
                <h2 className="sd2-hero-title">
                  <span className="line"><span>What will your project cost?</span></span>
                </h2>
                <p className="sd2-hero-sub sv2-hero-reveal">
                  Pick what you're building and how big it is. You'll see the
                  price range we publish for projects like it — then a written,
                  fixed quote after a short call.
                </p>
                <div className="sd2-hero-cta sv2-hero-reveal">
                  <a className="v2-btn v2-btn--filled" href="#calculator">
                    <span>Estimate my project</span>
                    <i className="v2-btn-arrow">→</i>
                  </a>
                  <a className="v2-hero-secondary" href="#all-prices">
                    <span className="v2-hero-secondary-label">See all price ranges</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="v2-section" id="calculator">
          <p className="v2-label">Cost Calculator</p>
          <h2 className="v2-heading">Estimate your software development cost.</h2>
          <p className="v2-lede">A published range, not a sales trick — no email needed to see it.</p>

          <div className="pv2-estimator is-in">
            <div className="pv2-estimator-controls">
              <span className="pv2-estimator-label">1 · What are you building?</span>
              <div className="pv2-chip-row">
                {COST_FAMILIES.map((f) => (
                  <button
                    type="button"
                    key={f.key}
                    className={`pv2-chip ${familyKey === f.key ? "is-active" : ""}`}
                    onClick={() => setFamilyKey(f.key)}
                    aria-pressed={familyKey === f.key}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <span className="pv2-estimator-label">2 · How big is it?</span>
              <div className="cc2-size-list">
                {COMPLEXITY.map((c, i) => (
                  <button
                    type="button"
                    key={c}
                    className={`cc2-size ${size === i ? "is-active" : ""}`}
                    onClick={() => setSize(i)}
                    aria-pressed={size === i}
                  >
                    <span className="cc2-size-name">{c}</span>
                    <span className="cc2-size-body">{family.sizes[i]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pv2-estimator-result" aria-live="polite">
              <span className="pv2-result-label">Estimated cost</span>
              <div className="pv2-result-value-wrapper" key={estimate}>
                <span className="pv2-result-value">{estimate}</span>
                <span className="pv2-result-approx">Approx.</span>
              </div>
              <p className="pv2-result-note">
                {family.label}, {COMPLEXITY[size].split(" (")[0].toLowerCase()} size: {family.sizes[size]}
              </p>
              <Link className="v2-btn v2-btn--filled" to={quoteLink}>
                <span>Get an exact quote</span>
                <i className="v2-btn-arrow">→</i>
              </Link>
              <Link className="cc2-service-link" to={family.path}>About this service →</Link>
            </div>
          </div>
        </section>

        <section className="v2-section v2-section--void" id="all-prices">
          <p className="v2-label">All Price Ranges</p>
          <h2 className="v2-heading">Software development cost by project type.</h2>
          <p className="v2-lede">Every range we publish, in one table.</p>
          <div className="cc2-table-wrap">
            <table className="cc2-table">
              <caption className="cc2-visually-hidden">Codelix software development price ranges by project type and size</caption>
              <thead>
                <tr>
                  <th scope="col">Project type</th>
                  {COMPLEXITY.map((c) => <th scope="col" key={c}>{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {COST_FAMILIES.map((f) => (
                  <tr key={f.key}>
                    <th scope="row"><Link to={f.path}>{f.label}</Link></th>
                    {BASE_ESTIMATES[f.key].map((band) => <td key={band}>{band}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="v2-section" id="cost-drivers">
          <div className="sd2-case-head">
            <div>
              <p className="v2-label">What Changes The Price</p>
              <h2 className="v2-heading">Six things that decide where you land in the range.</h2>
            </div>
            <p className="v2-lede">Two projects with the same name can differ several times in cost. These are the reasons.</p>
          </div>
          <div className="sd2-case-grid">
            {COST_DRIVERS.map((d, i) => (
              <article className="sd2-case" key={d.title}>
                <div className="sd2-case-top">
                  <span className="sd2-case-icon"><d.icon size={21} strokeWidth={1.6} /></span>
                  <span className="sd2-case-n">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="sd2-case-title">{d.title}</h3>
                <p className="sd2-case-body">{d.body}</p>
                <span className="sd2-case-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <FaqSection faqs={FAQS} className="v2-section--void" heading="Questions about software development cost." />

        <CtaSection>
          <p className="v2-label">Next Step</p>
          <h2 className="v2-cta-headline">
            Want the exact number?<br />Get a fixed, written quote.
          </h2>
          <p className="v2-cta-body">
            A 30-minute call about your project, then a written proposal with
            scope, price and timeline — usually within 48 hours.
          </p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to={quoteLink}>Get an exact quote →</Link>
          </div>
        </CtaSection>
      </main>

      <FooterV2 />
    </div>
  );
}
