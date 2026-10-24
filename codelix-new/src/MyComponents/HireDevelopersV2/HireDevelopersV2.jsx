import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { UserRound, Users, FileSignature } from "lucide-react";
import NavbarV2 from "../Shared/NavbarV2";
import FooterV2 from "../Shared/FooterV2";
import FaqSection from "../Shared/FaqSection";
import RelatedReading from "../Shared/RelatedReading";
import CtaSection from "../Shared/CtaSection";
import ClientStrip from "../Shared/ClientStrip";
import { HIRE_ROLES, ENGAGEMENT_MODELS, SHARED_HIRE_FAQS } from "./hireDevelopersData";
import { useHirePageMotion } from "./useHirePageMotion";

import "../HomepageV2/HomepageV2.css";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./HireDevelopersV2.css";

const MODEL_ICONS = [UserRound, Users, FileSignature];

/* The hub for the per-technology hire pages: it is what links them together
   and ranks for the broad "hire dedicated developers India" query on its own. */
const FAQS = [
  { q: "How much does it cost to hire a developer from Codelix?", a: "It depends on the technology, seniority and whether you hire a dedicated developer, a team or a fixed-scope project. After a short call you get a written proposal with the exact cost within 48 hours." },
  { q: "Can I interview the developer before hiring?", a: "Yes. You talk to the developer directly and can give them a technical task before you approve them." },
  { q: "Do I hire freelancers or Codelix employees?", a: "Codelix developers, working from our office in Ahmedabad, with a project lead you can escalate to." },
  ...SHARED_HIRE_FAQS,
];

export default function HireDevelopersV2() {
  const rootRef = useRef(null);
  useHirePageMotion(rootRef, "hub");

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
                  <em>Hire Developers</em>
                </nav>
                <div className="v2-hero-top sv2-hero-reveal">
                  <span className="v2-hero-status"><i /> Hire Developers</span>
                </div>
                <h1 className="sd2-hero-title">
                  <span className="line"><span>Hire Dedicated Developers in India</span></span>
                </h1>
                <p className="sd2-hero-sub sv2-hero-reveal">
                  Web, mobile, backend, AI, DevOps, QA and design talent from our
                  Ahmedabad team — full-time on your product,
                  as an extension of your team, or on a fixed-scope project.
                </p>
                <div className="sd2-hero-cta sv2-hero-reveal">
                  <Link className="v2-btn v2-btn--filled" to="/contact">
                    <span>Hire developers</span>
                    <i className="v2-btn-arrow">→</i>
                  </Link>
                  <a className="v2-hero-secondary" href="#roles">
                    <span className="v2-hero-secondary-label">Browse by technology</span>
                  </a>
                </div>
              </div>

              <aside className="sd2-facts sv2-hero-reveal">
                {[
                  ["Technologies", `${HIRE_ROLES.length} stacks`],
                  ["Proposal", "Within 48 hours"],
                  ["Code ownership", "Yours, always"],
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

        <section className="v2-section" id="roles">
          <p className="v2-label">By Technology</p>
          <h2 className="v2-heading">Which developers do you need?</h2>
          <div className="sd2-other-list">
            {HIRE_ROLES.map((r, i) => (
              <Link className="sd2-other" to={`/hire-developers/${r.slug}`} key={r.slug}>
                <div className="sd2-other-top">
                  <span className="sd2-other-icon"><r.icon size={17} strokeWidth={1.5} /></span>
                  <span className="sd2-other-n">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span className="sd2-other-title">{r.title}</span>
                <p className="sd2-other-body">{r.tagline}</p>
                <span className="sd2-other-go">→</span>
              </Link>
            ))}
          </div>
        </section>

        <ClientStrip />

        <section className="v2-section v2-section--void" id="models">
          <div className="sd2-case-head">
            <div>
              <p className="v2-label">Engagement Models</p>
              <h2 className="v2-heading">Three ways to work with our developers.</h2>
            </div>
            <p className="v2-lede">Pick the model that fits the work. You can switch as the product grows.</p>
          </div>
          <div className="sd2-case-grid">
            {ENGAGEMENT_MODELS.map((m, i) => {
              const Icon = MODEL_ICONS[i];
              return (
                <article className="sd2-case" key={m.title}>
                  <div className="sd2-case-top">
                    <span className="sd2-case-icon"><Icon size={21} strokeWidth={1.6} /></span>
                    <span className="sd2-case-n">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="sd2-case-title">{m.title}</h3>
                  <p className="sd2-case-body">{m.body}</p>
                  <span className="hd2-model-meta">{m.meta}</span>
                </article>
              );
            })}
          </div>
        </section>

        <RelatedReading />

        <FaqSection faqs={FAQS} heading="Questions about hiring developers from Codelix." />

        <CtaSection className="v2-section--void">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us about the work.<br />We'll propose the right developers.
          </h2>
          <p className="v2-cta-body">
            A 30-minute call, then a written proposal with developer profiles and
            the cost — within 48 hours.
          </p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to="/contact">Book a consultation →</Link>
          </div>
        </CtaSection>
      </main>

      <FooterV2 />
    </div>
  );
}
