import React, { useEffect, useRef, useState } from "react";
import { trackLead } from "../../lib/analytics";
import { Link } from "react-router-dom";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import {
  Compass, Users, ShieldCheck, Globe, Smartphone, PenTool, Server, Sparkles, CheckCircle2,
  Database, Cloud, TestTube, Briefcase
} from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./CareersV2.css";
import CareersHeroVisual from "./CareersHeroVisual";
import NavbarV2 from "../Shared/NavbarV2";
import FaqSection from '../Shared/FaqSection';
import CtaSection from '../Shared/CtaSection';
import { splitTitleLinesIn } from "../../lib/splitTitleLines.js";
import { StructuredData } from "../../components/StructuredData";


/* same honest small-team working style already stated on TeamV2 — Codelix
   is a small, founder-led studio, not a large org with an HR department,
   so this page doesn't invent headcount, fixed job listings, or a formal
   multi-stage interview funnel that don't exist */
const HOW_WE_WORK = [
  { key: "Direct", icon: Compass, claim: "You work with the founders, not a layer beneath them.", body: "No account manager standing between you and the people making decisions. If you join, you're working alongside Manas and Kushal directly." },
  { key: "Small on purpose", icon: Users, claim: "We stay small enough to stay accountable.", body: "There's no anonymous bench here. Every person on a project has their name on it — that includes you." },
  { key: "Ownership", icon: ShieldCheck, claim: "You ship real client work, not busywork.", body: "What you build goes live for real businesses. No make-work assignments to keep you occupied between 'real' projects." },
];

const DISCIPLINES = [
  { key: "Frontend", icon: Globe, blurb: "React, Next, and the rest of what's on our stack page — building interfaces real users actually touch." },
  { key: "Backend", icon: Server, blurb: "Node, Spring Boot, Laravel, Django — APIs and systems that hold up under real production load." },
  { key: "Mobile", icon: Smartphone, blurb: "Flutter and React Native — apps that ship to real app stores for real users." },
  { key: "DevOps & Cloud", icon: Cloud, blurb: "AWS, Azure, CI/CD, and infrastructure as code — building secure, scalable, and resilient cloud solutions." },
  { key: "Data & Analytics", icon: Database, blurb: "Data engineering, business intelligence, and predictive analytics — turning raw data into actionable insights." },
  { key: "AI / Automation", icon: Sparkles, blurb: "Practical AI integration and workflow automation — n8n, Zapier, Make, and applied ML, not buzzword slides." },
  { key: "QA / Testing", icon: TestTube, blurb: "Automated testing, security maintenance, and performance optimization — ensuring every release is production-ready." },
  { key: "Design", icon: PenTool, blurb: "Figma-first UI/UX work that gets handed to development, not filed away as concept art." },
  { key: "Product Management", icon: Briefcase, blurb: "Scrum masters and product owners — driving dedicated development teams and SaaS products from concept to launch." },
];

const WHAT_WE_LOOK_FOR = [
  { n: "01", title: "Shipped work over credentials", body: "A portfolio of real, finished projects tells us more than a resume. Show us what you've actually built." },
  { n: "02", title: "Comfortable with direct feedback", body: "We work in tight, fast loops with clients and each other. That only works if you can give and take feedback plainly." },
  { n: "03", title: "Ownership over instructions", body: "We're small enough that nobody's handing you a spec to execute blindly. You'll be expected to flag problems, not just implement." },
];

const FAQS = [
  { q: "Are you currently hiring for a specific role?", a: "We don't keep a running job board — we hire when a specific project need lines up with what someone brings. Send your details anyway; we keep good applications on file." },
  { q: "Do you hire freelancers or only full-time?", a: "Both, depending on the work. Tell us what you're looking for and we'll tell you honestly if it's a fit right now." },
  { q: "What does the interview process look like?", a: "There's no fixed multi-round funnel. Typically it's a portfolio review followed by a direct conversation with the founders." },
  { q: "Is this role remote or on-site?", a: "Depends on the role and what it needs — we'll be upfront about it when we reach out." },
];

export default function CareersV2() {
  
  
  
  const [discipline, setDiscipline] = useState(DISCIPLINES[0].key);

  const [formData, setFormData] = useState({ name: "", email: "", portfolio: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

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
      .fromTo(q(".sd2-hero-visual.sv2-hero-reveal"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 }, "-=.8");
    return () => tl.kill();
  }, []);

  /* reveal-on-enter — IntersectionObserver */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        
          el.classList.add("is-in");
        
        io.unobserve(el);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const sel = [
      ".cv2-apply", ".sd2-tenet", ".cv2-look-for", ".v2-faq-item", ".v2-strip", ".v2-cta",
      ".v2-heading", ".v2-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* real submission — same Web3Forms integration used on /contact and
     /contact, not a new/mocked endpoint */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "careers",
          name: formData.name,
          email: formData.email,
          portfolio: formData.portfolio,
          message: formData.message,
          discipline,
          _hp: e.target._hp?.value || "",
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        e.target.reset();
        setFormData({ name: "", email: "", portfolio: "", message: "" });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

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
                <em>Careers</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Small team, real client work</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Work directly with</span></span>{" "}
                <span className="line"><span className="v2-hero-accent">the people who build it.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                No account managers, no anonymous bench. If you join, you're
                shipping real client projects alongside the founders.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal">
                <a className="v2-btn v2-btn--filled" href="#apply">
                  <span>Apply now</span>
                  <i className="v2-btn-arrow">→</i>
                </a>
                <Link className="v2-hero-secondary" to="/team">
                  <span className="v2-hero-secondary-label">Meet the team</span>
                </Link>
              </div>
            </div>
            
            {/* Visual Column */}
            <div className="sd2-hero-visual sv2-hero-reveal">
              <CareersHeroVisual />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · HOW WE WORK ══════════ */}
      <section className="v2-section" id="how-we-work">
        <p className="v2-label">How We Work</p>
        <h2 className="v2-heading">What it's actually like day to day.</h2>
        <div className="sd2-tenet-grid">
          {HOW_WE_WORK.map((p, i) => (
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

      {/* ══════════ 3 · APPLY — discipline picker + real application form
          (the extraordinary section). Picking a discipline crossfades a
          short honest blurb and tags the submission, instead of a static
          list of fabricated job postings we don't actually have open. ══════════ */}
      <section className="v2-section v2-section--void" id="apply">
        <p className="v2-label">Open To</p>
        <h2 className="v2-heading">We hire when the work calls for it.</h2>
        <p className="v2-lede">
          We don't run a fixed job board — send your details for whichever
          area fits, and we'll reach out when it lines up with real work.
        </p>

        <div className="cv2-apply">
          <div className="cv2-apply-left">
            <div className="cv2-disc-chips" role="group" aria-label="Choose a discipline">
              {DISCIPLINES.map((d) => (
                <button
                  key={d.key}
                  className={`cv2-disc-chip ${discipline === d.key ? "is-active" : ""}`}
                  onClick={() => setDiscipline(d.key)}
                  type="button"
                >
                  <d.icon size={16} strokeWidth={1.7} />
                  {d.key}
                </button>
              ))}
            </div>
            <div className="cv2-disc-stage">
              {DISCIPLINES.map((d) => (
                <div className={`cv2-disc-panel ${discipline === d.key ? "is-active" : ""}`} key={d.key}>
                  <span className="cv2-disc-panel-icon"><d.icon size={26} strokeWidth={1.4} /></span>
                  <p>{d.blurb}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cv2-apply-right">
            {submitted ? (
              <div className="cv2-success">
                <CheckCircle2 size={40} strokeWidth={1.4} />
                <h3>Got it.</h3>
                <p>We'll review your details and reach out if it's a fit for something we're working on.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cv2-form">
                {/* honeypot: hidden from people, bots fill it and the server
                    silently discards the submission */}
                <input type="text" name="_hp" tabIndex={-1} autoComplete="off"
                  aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }} />
                <div className="cv2-field">
                  <label htmlFor="cv2-name">Name</label>
                  <input id="cv2-name" name="name" type="text" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="cv2-field">
                  <label htmlFor="cv2-email">Email</label>
                  <input id="cv2-email" name="email" type="email" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="cv2-field">
                  <label htmlFor="cv2-portfolio">Portfolio / LinkedIn / GitHub</label>
                  <input id="cv2-portfolio" name="portfolio" type="url" placeholder="https://" required value={formData.portfolio} onChange={handleChange} />
                </div>
                <div className="cv2-field">
                  <label htmlFor="cv2-message">Anything else?</label>
                  <textarea id="cv2-message" name="message" rows={4} placeholder="Optional — what you've shipped, what you're looking for" value={formData.message} onChange={handleChange} />
                </div>
                <input type="hidden" name="discipline" value={discipline} />
                {error && <p className="cv2-error">{error}</p>}
                <button type="submit" className="v2-btn v2-btn--filled cv2-submit" disabled={sending}>
                  <span>{sending ? "Sending…" : `Apply for ${discipline}`}</span>
                  <i className="v2-btn-arrow">→</i>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════ 4 · WHAT WE LOOK FOR ══════════ */}
      <section className="v2-section" id="look-for">
        <p className="v2-label">What We Look For</p>
        <h2 className="v2-heading">Three things that matter more than a resume.</h2>
        <div className="cv2-look-for">
          {WHAT_WE_LOOK_FOR.map((w) => (
            <div className="cv2-look-row" key={w.n}>
              <span className="cv2-look-n">{w.n}</span>
              <div>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 5 · FAQ ══════════ */}
      <FaqSection faqs={FAQS} className="v2-section--void" />

      {/* ══════════ 6 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        
          <p className="v2-label">Start Here</p>
          <h2 className="v2-cta-headline">
            Don't see the right role?<br />Tell us what you'd bring.
          </h2>
          <p className="v2-cta-body">
            We hire when a specific project need lines up with what someone
            brings, not against a running job board. Send your details anyway.
          </p>
          <div className="v2-cta-actions">
            <Link className="v2-btn" to="/contact">Get in touch →</Link></div>
</CtaSection>

      {/* ══════════ FOOTER ══════════ */}
      </main>

            <StructuredData type="FAQPage" data={FAQS} />
            <FooterV2 />
    </div>
  );
}
