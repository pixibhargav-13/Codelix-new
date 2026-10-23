import { STATIC_TESTIMONIALS } from '../../data/testimonialsData';
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import { useTestimonials } from "../../data/useTestimonials";
import TestimonialSpotlight from "../Shared/TestimonialSpotlight";
import NavbarV2 from "../Shared/NavbarV2";
import CtaSection from "../Shared/CtaSection";
import {
  Compass, Users, ShieldCheck, Linkedin, Globe, Smartphone, PenTool,
  ShoppingCart, Code2, Sparkles, BarChart3, Database, LifeBuoy,
} from "lucide-react";

import TeamHeroVisual from "./TeamHeroVisual";
import manasImg from "../Images/manas_vadodaria.webp";
import kushalImg from "../Images/kushal.webp";

/* each founder's own LinkedIn profile (also their sameAs in src/lib/people.js) */
const LEADERSHIP = [
  { name: "Manas Vadodaria", initials: "M", photo: manasImg, title: "CEO", bio: "Sets product direction and leads client delivery at Codelix — turning ideas into market-ready custom software and SaaS solutions for businesses that intend to still be running them in five years.", linkedin: "https://www.linkedin.com/in/manas-vadodaria-396353275/" },
  { name: "Kushal Mungalpara", initials: "K", photo: kushalImg, title: "Co-Founder", bio: "Works alongside Manas turning visionary ideas into shipped systems — hands-on across the technical and delivery side of every Codelix engagement.", linkedin: "https://www.linkedin.com/in/kushal-mungalpara-60805227b/" },
];

const HOW_WE_LEAD = [
  { key: "Direct", icon: Compass, claim: "You work with the founders, not a layer beneath them.", body: "No account manager standing between you and the people making decisions. Every project runs through Manas and Kushal directly." },
  { key: "Accountable", icon: Users, claim: "Two people, one shared responsibility.", body: "No hiding behind a team of ten when something goes wrong. If it ships under Codelix, one of us is directly accountable for it." },
  { key: "Consistent", icon: ShieldCheck, claim: "The same standard, project after project.", body: "Fixed pricing and the same delivery process — whether it's client one or client fifty." },
];

import "../HomepageV2/HomepageV2.css";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./TeamV2.css";
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";



const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services/application-development" },
  { icon: PenTool, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services/support-managed-services" },
];

export default function TeamV2() {
  const testimonials = useTestimonials(STATIC_TESTIMONIALS);

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
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65")
      .fromTo(q(".sd2-hero-cta.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.7")
      .fromTo(q(".sd2-hero-visual.sv2-hero-reveal"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2 }, "-=.7");
    return () => tl.kill();
  }, []);

  /* reveal-on-enter — IntersectionObserver */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.01, rootMargin: "0px" }
    );
    const sel = [
      ".team-lead-row", ".sd2-tenet", ".v2-cta", ".v2-strip",
      ".sd2-quote", ".sd2-other",
      ".v2-heading", ".v2-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);


  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      <main>



      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero team-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <em>Team</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Est. 2024 · Ahmedabad</span>
                <h1 className="v2-hero-eyebrow">Our Team — Software Developers in Ahmedabad</h1>
              </div>
              <h2 className="sd2-hero-title">
                <span className="line"><span>The people behind</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">what Codelix ships.</span></span>
              </h2>
              <p className="sd2-hero-sub sv2-hero-reveal">
                No account managers, no anonymous contractors — every project
                is scoped and delivered by the two people who founded this
                studio.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <Link className="v2-btn v2-btn--filled" to="/contact">
                  <span>Work with us</span>
                  <i className="v2-btn-arrow">→</i>
                </Link>
                <a className="v2-hero-secondary" href="#leadership">
                  <span className="v2-hero-secondary-label">Meet the founders</span>
                </a>
              </div>
            </div>

            {/* Visual Column */}
            <div className="sd2-hero-visual sv2-hero-reveal">
              <TeamHeroVisual />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · LEADERSHIP ══════════ */}
      <section className="v2-section v2-section--void" id="leadership">
        <p className="v2-label">Leadership</p>
        <h2 className="v2-heading">Two founders, one team.</h2>
        <div className="team-lead-grid">
          {LEADERSHIP.map((p, i) => (
            <article
              className={`team-lead-row${i % 2 !== 0 ? " team-lead-row--reverse" : ""}`}
              key={p.name}
            >
              {/* ── Image panel ── */}
              <div className="team-lead-img-panel">
                <span className="team-lead-index">0{i + 1}</span>
                <div className="team-lead-avatar-wrap">
                  <div className="team-lead-avatar">
                    {p.initials}
                    <img
                      className="team-lead-photo"
                      src={p.photo}
                      alt={p.name}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                </div>
              </div>

              {/* ── Info panel ── */}
              <div className="team-lead-info-panel">
                <span className="team-lead-watermark" aria-hidden="true">
                  {p.initials}
                </span>
                <h3 className="team-lead-name">{p.name}</h3>
                <p className="team-lead-title">{p.title}</p>
                <p className="team-lead-bio">{p.bio}</p>
                <a
                  className="team-lead-linkedin"
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={14} strokeWidth={2} />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* ══════════ 3 · HOW WE LEAD ══════════ */}
      <section className="v2-section" id="how-we-lead">
        <p className="v2-label">How We Lead</p>
        <h2 className="v2-heading">Three things that don't change as we grow.</h2>
        <div className="sd2-tenet-grid">
          {HOW_WE_LEAD.map((p, i) => (
            <article className="sd2-tenet" key={p.key}>
              <span className="sd2-tenet-shine" aria-hidden="true" />
              <div className="sd2-tenet-top">
                <span className="sd2-tenet-icon"><p.icon size={20} strokeWidth={1.5} /></span>
                <span className="sd2-tenet-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="sd2-tenet-claim">{p.claim}</h3>
              <p className="sd2-tenet-body">{p.body}</p>
              <span className="sd2-tenet-tag">{p.key}</span>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 4 · TESTIMONIAL ══════════ */}
      <TestimonialSpotlight
        testimonials={testimonials}
        label="Client Voices"
        heading="What clients say about the team."
        stats={[
          { num: "40+", label: "Projects delivered" },
          { num: "40+", label: "Clients worldwide" },
        ]}
      />

      {/* ══════════ 5 · EXPLORE SERVICES ══════════ */}
      <section className="v2-section" id="other">
        <p className="v2-label">Explore More</p>
        <h2 className="v2-heading">What we build.</h2>
        <div className="sd2-other-list">
          {OTHER_SERVICES.map((s) => (
            <Link className="sd2-other" to={s.path} key={s.path}>
              <div className="sd2-other-top">
                <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
                <span className="sd2-other-n">{s.n}</span>
              </div>
              <span className="sd2-other-title">{s.title}</span>
              <p className="sd2-other-body">{s.body}</p>
              <span className="sd2-other-go">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════ 7 · CTA ══════════ */}
      <CtaSection className="v2-section--void">

        <p className="v2-label">Start Here</p>
        <h2 className="v2-cta-headline">
          Talk to the founders,<br />not an account manager.
        </h2>
        <p className="v2-cta-body">
          Every engagement starts and ends with the same two people.
          Tell us what you're building.
        </p>
        <div className="v2-cta-actions">
          <Link className="v2-btn" to="/contact">Book a consultation →</Link></div>
      </CtaSection>

      {/* ══════════ FOOTER ══════════ */}
      </main>

      <FooterV2 />
    </div>
  );
}
