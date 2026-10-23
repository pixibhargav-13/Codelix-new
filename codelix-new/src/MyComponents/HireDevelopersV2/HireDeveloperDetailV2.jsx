import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Phone, FileText, UserCheck, PlayCircle, UserRound, Users, FileSignature } from "lucide-react";
import { SEO } from "../../components/SEO";
import { StructuredData } from "../../components/StructuredData";
import NavbarV2 from "../Shared/NavbarV2";
import FooterV2 from "../Shared/FooterV2";
import FaqSection from "../Shared/FaqSection";
import CtaSection from "../Shared/CtaSection";
import ClientStrip from "../Shared/ClientStrip";
import NotFound from "../NotFound/NotFound";
import { useCaseStudies } from "../CaseStudyDetailV2/useCaseStudies";
import { FOOTER_ALL_SERVICES } from "../HomepageV2/footerData";
import {
  HIRE_ROLES, hireRoleBySlug, ENGAGEMENT_MODELS, HIRING_STEPS, SHARED_HIRE_FAQS,
} from "./hireDevelopersData";
import { useHirePageMotion } from "./useHirePageMotion";

import "../HomepageV2/HomepageV2.css";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./HireDevelopersV2.css";

const MODEL_ICONS = [UserRound, Users, FileSignature];
const STEP_ICONS = [Phone, FileText, UserCheck, PlayCircle];

export default function HireDeveloperDetailV2() {
  const { slug } = useParams();
  const role = hireRoleBySlug(slug);
  const rootRef = useRef(null);
  const { studies } = useCaseStudies();
  useHirePageMotion(rootRef, slug);

  /* an unknown slug is a real 404 (noindex), not an empty template */
  if (!role) return <NotFound />;

  const techLower = role.tech.toLowerCase();
  /* real shipped work only: case studies whose own tool list names this
     stack. A role with no match (AI, for now) skips the section. */
  const seen = new Set();
  const work = studies
    .filter((cs) => cs.image && (cs.tools || []).some((t) => role.matchTools.includes(String(t).toLowerCase())))
    .filter((cs) => !seen.has(cs.slug) && seen.add(cs.slug))
    .slice(0, 3);
  const services = role.services
    .map((path) => FOOTER_ALL_SERVICES.find((s) => s.path === path))
    .filter(Boolean);
  const otherRoles = HIRE_ROLES.filter((r) => r.slug !== role.slug);
  const faqs = [
    ...role.faqs,
    { q: `How quickly can a ${role.tech} developer start?`, a: "You get a written proposal within 48 hours of the first call. Once you have interviewed and approved the developer, work starts as soon as you give access to your repository and tools." },
    ...SHARED_HIRE_FAQS,
  ];

  return (
    <div className="v2" ref={rootRef}>
      <SEO
        title={role.seoTitle}
        ogTitle={`${role.title} — Codelix IT Solutions`}
        description={role.seoDescription}
        keywords={role.keywords}
      />
      <StructuredData
        type="Service"
        data={{ name: `${role.tech} developers for hire`, description: role.seoDescription }}
      />
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
                  <Link to="/hire-developers">Hire Developers</Link>
                  <span>/</span>
                  <em>{role.tech}</em>
                </nav>
                <div className="v2-hero-top sv2-hero-reveal">
                  <span className="v2-hero-status"><i /> Hire Developers</span>
                </div>
                <h1 key={slug} className="sd2-hero-title">
                  <span className="line"><span>{role.title}</span></span>
                </h1>
                <p className="sd2-hero-sub sv2-hero-reveal">{role.tagline}</p>
                <div className="sd2-hero-cta sv2-hero-reveal">
                  <Link className="v2-btn v2-btn--filled" to="/contact">
                    <span>Hire {role.tech} developers</span>
                    <i className="v2-btn-arrow">→</i>
                  </Link>
                  <a className="v2-hero-secondary" href="#models">
                    <span className="v2-hero-secondary-label">See engagement models</span>
                  </a>
                </div>
              </div>

              <aside className="sd2-facts sv2-hero-reveal">
                {[
                  ["Based in", "Ahmedabad, India"],
                  ["Proposal", "Within 48 hours"],
                  ["Engagement", "Dedicated, team or fixed scope"],
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

        <section className="v2-section" id="overview">
          <p className="v2-label">Why Teams Hire {role.tech} Developers</p>
          <h2 className="v2-heading">Dedicated {role.tech} developers, working as part of your team.</h2>
          <p className="hd2-intro">{role.intro}</p>
        </section>

        <ClientStrip />

        <section className="v2-section v2-section--void" id="builds">
          <div className="sd2-case-head">
            <div>
              <p className="v2-label">What They Build</p>
              <h2 className="v2-heading">What our {role.tech} developers work on.</h2>
            </div>
            <p className="v2-lede">The work clients most often bring to a {techLower} developer.</p>
          </div>
          <div className={`sd2-case-grid${role.builds.length === 4 ? " sd2-case-grid--four" : ""}`}>
            {role.builds.map((b, i) => (
              <article className="sd2-case" key={b.title}>
                <div className="sd2-case-top">
                  <span className="sd2-case-icon"><role.icon size={21} strokeWidth={1.6} /></span>
                  <span className="sd2-case-n">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="sd2-case-title">{b.title}</h3>
                <p className="sd2-case-body">{b.body}</p>
                <span className="sd2-case-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="v2-section" id="skills">
          <p className="v2-label">Skills</p>
          <h2 className="v2-heading">{role.tech} skills you get.</h2>
          <p className="v2-lede">The tools and libraries our {techLower} developers use day to day.</p>
          <ul className="hd2-skills">
            {role.skills.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </section>

        <section className="v2-section v2-section--void" id="models">
          <div className="sd2-case-head">
            <div>
              <p className="v2-label">Engagement Models</p>
              <h2 className="v2-heading">Three ways to hire {role.tech} developers.</h2>
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

        {work.length > 0 && (
          <section className="v2-section" id="work">
            <p className="v2-label">Real Work</p>
            <h2 className="v2-heading">Projects built with {role.tech}.</h2>
            <div className="sd2-work-grid">
              {work.map((w) => (
                <Link className="sd2-work-card" to={`/case-study/${w.slug}`} key={w.slug}>
                  <span className="sd2-work-media">
                    <img src={w.image} alt={w.title} loading="lazy" />
                  </span>
                  <span className="sd2-work-tag">{w.category}</span>
                  <span className="sd2-work-title">{w.title}</span>
                  <span className="sd2-work-go">Read case study →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="v2-section v2-section--void" id="how">
          <div className="sd2-case-head">
            <div>
              <p className="v2-label">How Hiring Works</p>
              <h2 className="v2-heading">From first call to first commit.</h2>
            </div>
            <p className="v2-lede">No long sales process. You talk to the developer before you commit.</p>
          </div>
          <div className="sd2-next hd2-steps">
            <span className="sd2-next-line" aria-hidden="true" />
            {HIRING_STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <article className="sd2-step" key={s.n}>
                  <div className="sd2-step-node">
                    <span className="sd2-step-num">{s.n}</span>
                    <span className="sd2-step-badge"><Icon size={15} strokeWidth={1.7} /></span>
                  </div>
                  <div className="sd2-step-inner">
                    <span className="sd2-step-meta">{s.meta}</span>
                    <h3 className="sd2-step-title">{s.title}</h3>
                    <p className="sd2-step-body">{s.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {services.length > 0 && (
          <section className="v2-section" id="services">
            <p className="v2-label">Related Services</p>
            <h2 className="v2-heading">Need a whole project, not a developer?</h2>
            <div className="sd2-other-list">
              {services.map((s, i) => (
                <Link className="sd2-other" to={s.path} key={s.path}>
                  <div className="sd2-other-top">
                    <span className="sd2-other-icon"><role.icon size={17} strokeWidth={1.5} /></span>
                    <span className="sd2-other-n">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="sd2-other-title">{s.label}</span>
                  <span className="sd2-other-go">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FaqSection
          faqs={faqs}
          className="v2-section--void"
          heading={`Questions about hiring ${role.tech} developers.`}
        />

        <section className="v2-section" id="other">
          <p className="v2-label">Hire Other Developers</p>
          <h2 className="v2-heading">Other developers you can hire.</h2>
          <div className="sd2-other-list">
            {otherRoles.map((r, i) => (
              <Link className="sd2-other" to={`/hire-developers/${r.slug}`} key={r.slug}>
                <div className="sd2-other-top">
                  <span className="sd2-other-icon"><r.icon size={17} strokeWidth={1.5} /></span>
                  <span className="sd2-other-n">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span className="sd2-other-title">{r.title}</span>
                <span className="sd2-other-go">→</span>
              </Link>
            ))}
          </div>
        </section>

        <CtaSection className="v2-section--void">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Tell us what you're building.<br />We'll match you with a {role.tech} developer.
          </h2>
          <p className="v2-cta-body">
            A 30-minute call, then a written proposal with the developer's profile
            and the cost — within 48 hours.
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
