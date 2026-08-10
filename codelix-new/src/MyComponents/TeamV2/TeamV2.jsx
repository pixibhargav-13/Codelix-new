import React, { useEffect, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import {
  Compass, Users, ShieldCheck, Linkedin, Globe, Smartphone, PenTool,
  ShoppingCart, Code2, Sparkles, BarChart3, Database, LifeBuoy,
} from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import manasImg from "../Images/manas_vadodaria.jpeg";
import kushalImg from "../Images/kushal.png";
import CtaVisual from "../HomepageV2/CtaVisual";
import { useTestimonials } from "../../data/useTestimonials";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./TeamV2.css";
import NavbarV2 from "../Shared/NavbarV2";
import TeamHeroVisual from "./TeamHeroVisual";
import TestimonialSpotlight from "../Shared/TestimonialSpotlight";


/* Public bios sourced from LinkedIn — titles/roles kept to what's actually
   verifiable there rather than invented specifics. No photos are pulled
   from the internet for real individuals — `photo` points at a file in
   /public/images/team/ that doesn't exist yet. Drop the real headshot in
   there under the exact filename below and it'll appear automatically;
   until then the img fails to load and the initials avatar underneath
   shows through instead (see .team-lead-photo-wrap in TeamV2.css). */
const LEADERSHIP = [
  {
    name: "Manas Vadodaria",
    title: "Founder & CEO",
    initials: "MV",
    photo: manasImg,
    bio: "Sets product direction and leads client delivery at Codelix — turning ideas into market-ready custom software and SaaS solutions for businesses that intend to still be running them in five years.",
    linkedin: "https://www.linkedin.com/in/manas-vadodaria-396353275/",
  },
  {
    name: "Kushal Mungalpara",
    title: "Co-Founder",
    initials: "KM",
    photo: kushalImg,
    bio: "Works alongside Manas turning visionary ideas into shipped systems — hands-on across the technical and delivery side of every Codelix engagement.",
    linkedin: "https://www.linkedin.com/in/kushal-mungalpara-60805227b/",
  },
];

const HOW_WE_LEAD = [
  { key: "Direct", icon: Compass, claim: "You talk to the people who build it.", body: "No account manager relaying messages to an anonymous team. The founders scope the work and stay on it through delivery." },
  { key: "Small on purpose", icon: Users, claim: "We stay small enough to stay accountable.", body: "Every project has a name attached to it at the top. That doesn't change as we grow — it's the thing we're protecting." },
  { key: "Accountable", icon: ShieldCheck, claim: "Our name is on every line of code.", body: "We don't outsource to anonymous contractors and hope for the best. The people who scope your project are the people who build it." },
];

/* fallback shown before Supabase responds — same 5 real quotes and same
   shape useTestimonials() expects, editable from the admin panel's
   Testimonials section afterwards. Same content as the Homepage carousel's
   STATIC_TESTIMONIALS, kept as its own copy here (like WorkV2's own
   TESTIMONIALS array) so this page auto-rotates through them too instead
   of only ever showing the first one. */
const STATIC_QUOTE = [
  { quote: "We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule.", name: "Rajesh Patel", position: "CEO, Harmony Inc." },
  { quote: "Their communication and problem-solving skills are top-notch. The entire workflow was smooth and professional.", name: "Priya Sharma", position: "Founder, Nexa Digital" },
  { quote: "Amazing team! Delivered everything on time with exceptional quality. Totally recommend!", name: "Amit Kumar", position: "CTO, PixelWave" },
  { quote: "Honestly, we were struggling to keep up with our growth until they stepped in. They didn't just build the tech; they actually understood our users. It's been a total game-changer for our workflow, and the design is just spot on.", name: "Emily Watson", position: "Director, Nova Corp" },
  { quote: "What I love most is that they don't just say 'yes' to everything — they tell us what's actually going to work. The whole process felt super collaborative, and they genuinely cared about making the project a success.", name: "Chris Taylor", position: "COO, Orbit Labs" },
];

const OTHER_SERVICES = [
  { icon: Globe, n: "01", title: "Web Development", body: "Modern websites and web applications tailored to your business needs.", path: "/services-v2/web-development" },
  { icon: Smartphone, n: "02", title: "Application Development", body: "Mobile apps, SaaS platforms, and cloud-native solutions built from scratch.", path: "/services-v2/application-development" },
  { icon: PenTool, n: "03", title: "UI/UX & Product Design", body: "UX research, wireframes, prototypes, design systems, and accessibility.", path: "/services-v2/ui-ux-design" },
  { icon: ShoppingCart, n: "04", title: "E-Commerce Solutions", body: "Custom stores, B2B commerce platforms, marketplaces, and payment integrations.", path: "/services-v2/e-commerce-solutions" },
  { icon: Code2, n: "05", title: "Enterprise Software Solutions", body: "ERP, CRM, workflow automation, legacy modernization, and integrations.", path: "/services-v2/custom-software-development" },
  { icon: Sparkles, n: "06", title: "AI & Automation Solutions", body: "AI agents, chatbots, generative AI, and workflow automation that works.", path: "/services-v2/ai-development" },
  { icon: BarChart3, n: "07", title: "Data Analytics & Business Intelligence", body: "Dashboards, reporting, data visualization, and predictive analytics.", path: "/services-v2/data-analytics" },
  { icon: LifeBuoy, n: "08", title: "Support & Managed Services", body: "Ongoing maintenance, technical support, and dedicated team augmentation.", path: "/services-v2/support-managed-services" },
];

export default function TeamV2() {
  const testimonials = useTestimonials(STATIC_QUOTE);

  const rootRef = useRef(null);
  const stripRef = useRef(null);


  /* hero intro — masked-line GSAP wipe, matching the other v2 pages */
  useEffect(() => {
    const q = (s) => rootRef.current.querySelectorAll(s);
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

  /* client strip drift, pausing on hover */
  useEffect(() => {
    const track = stripRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, x = 0, paused = false, last = performance.now();
    const step = (now) => {
      const dt = now - last; last = now;
      if (!paused) {
        x -= 0.00125 * dt;
        if (x <= -50) x += 50;
        track.style.transform = `translateX(${x}%)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const wrap = track.parentElement;
    const on = () => { paused = true; };
    const off = () => { paused = false; };
    wrap.addEventListener("mouseenter", on);
    wrap.addEventListener("mouseleave", off);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mouseenter", on);
      wrap.removeEventListener("mouseleave", off);
    };
  }, []);

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <NavbarV2 />

      

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero team-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <em>Team</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Est. 2024 · Ahmedabad</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>The people behind</span></span>
                <span className="line"><span className="v2-hero-accent">what Codelix ships.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                No account managers, no anonymous contractors — every project
                is scoped and delivered by the two people who founded this
                studio.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="/contact">
                  <span>Work with us</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
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
                <p className="team-lead-num">
                  <em />
                  Founder
                </p>
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
          { num: "30+", label: "Projects delivered" },
          { num: "20+", label: "Clients worldwide" },
          { num: "100%", label: "Source code ownership" },
        ]}
      />

      {/* ══════════ 5 · EXPLORE SERVICES ══════════ */}
      <section className="v2-section" id="other">
        <p className="v2-label">Explore More</p>
        <h2 className="v2-heading">What we build.</h2>
        <div className="sd2-other-list">
          {OTHER_SERVICES.map((s) => (
            <a className="sd2-other" href={s.path} key={s.path}>
              <div className="sd2-other-top">
                <span className="sd2-other-icon"><s.icon size={17} strokeWidth={1.5} /></span>
                <span className="sd2-other-n">{s.n}</span>
              </div>
              <span className="sd2-other-title">{s.title}</span>
              <p className="sd2-other-body">{s.body}</p>
              <span className="sd2-other-go">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════ 7 · CTA ══════════ */}
      <section className="v2-section v2-section--void v2-cta-shell">
        <div className="v2-cta">
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Talk to the founders,<br />not an account manager.
          </h2>
          <p className="v2-cta-body">
            Every engagement starts and ends with the same two people.
            Tell us what you're building.
          </p>
          <div className="v2-cta-actions">
            <a className="v2-btn" href="/contact">Book a consultation →</a>
          </div>
          <div className="v2-cta-badges">
            <span className="v2-cta-badge">Free consultation</span>
            <span className="v2-cta-badge">NDA on request</span>
            <span className="v2-cta-badge">No obligation</span>
          </div>
        </div>

        <aside className="v2-cta-visual">
          <CtaVisual />
        </aside>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <FooterV2 />
    </div>
  );
}
