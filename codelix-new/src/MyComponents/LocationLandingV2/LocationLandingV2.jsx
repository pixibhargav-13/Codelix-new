import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import {
  Check, MapPin, Phone, Mail, FileText, PlayCircle, ArrowRight,
  ShieldCheck, Clock, KeyRound, Users, Sparkles,
} from "lucide-react";
import { SEO } from "../../components/SEO";
import { StructuredData } from "../../components/StructuredData";
import NotFound from "../NotFound/NotFound";
import FaqSection from "../Shared/FaqSection";
import CtaSection from "../Shared/CtaSection";
import ClientStrip from "../Shared/ClientStrip";
import RatingsStrip from "../Shared/RatingsStrip";
import TestimonialSpotlight from "../Shared/TestimonialSpotlight";
import codelixLogo from "../Images/codelix-logo.webp";
import { TECH_STACK } from "../HomepageV2/techStack";
import { STATIC_TESTIMONIALS } from "../../data/testimonialsData";
import { useTestimonials } from "../../data/useTestimonials";
import {
  LOCATION_SERVICES, LOCATION_CITIES, locationPageBySlug, locationSeo, locationSlug,
} from "./locationPagesData";

/* v2 design system — same look as the service pages */
import "../HomepageV2/HomepageV2.css";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./LocationLandingV2.css";

/* City landing pages for search. They are deliberately standalone: no site
   navbar, no site footer, no links into the rest of the site. The only page
   links are /contact (the "Book…" ones open the booking modal, see
   bookingTrigger.js) and the other services' pages for the same city, under
   "Other services in {city}"; the rest are tel: and mailto:. Nothing
   elsewhere links here; Google finds them through sitemap.xml. Content lives
   in locationPagesData.js. */

const PHONE = { href: "tel:+919429269295", label: "+91 94292 69295" };
const PHONE_2 = { href: "tel:+917490909686", label: "+91 74909 09686" };

const PROCESS = [
  { n: "01", title: "Discovery call", time: "2–3 days", body: "We learn how your business runs today, what is not working and what the first version has to do." },
  { n: "02", title: "Scope & fixed quote", time: "3–5 days", body: "A written scope, timeline and fixed price — agreed before anything is built." },
  { n: "03", title: "Design", time: "1–2 weeks", body: "Screens and flows designed and reviewed with you until they are signed off." },
  { n: "04", title: "Build", time: "2–8 weeks", body: "Built in short sprints with a working demo every fortnight, so there are no surprises at the end." },
  { n: "05", title: "Testing & launch", time: "1–2 weeks", body: "Tested against your real data and use cases, then launched with your team trained to use it." },
  { n: "06", title: "Support", time: "Ongoing", body: "A post-launch support window for fixes, then an optional monthly plan for updates and new features." },
];

const NEXT_STEPS = [
  { n: "01", icon: Phone, meta: "30 minutes", title: "Discovery call", body: "A no-pressure call about what you need and what is not working today." },
  { n: "02", icon: FileText, meta: "Within 48 hours", title: "Written proposal", body: "A clear scope, a fixed price and a timeline, in writing." },
  { n: "03", icon: PlayCircle, meta: "On your go-ahead", title: "Kickoff", body: "We lock the scope and start, with one point of contact from day one." },
];

const WHY = [
  { icon: ShieldCheck, title: "Fixed price, in writing", body: "A written scope and a fixed quote before work starts — no hourly meter running." },
  { icon: Users, title: "One team, start to finish", body: "Design, development, testing and support by the same team, with one point of contact." },
  { icon: Sparkles, title: "40+ projects delivered", body: "ERPs, e-commerce stores, mobile apps and SaaS products shipped across 11 industries." },
  { icon: KeyRound, title: "You own everything", body: "Domain, source code, design files and admin access are handed over to you at the end." },
];

const STATS = [
  { num: "40+", label: "Projects delivered" },
  { num: "11", label: "Industries served" },
  { num: "24h", label: "Response time" },
];

export default function LocationLandingV2() {
  const { slug } = useParams();
  /* memoised: locationPageBySlug builds a new object each call, and the
     animation effects below key off `page` — without this, the header's
     scroll state re-render replayed the hero entrance mid-scroll */
  const page = useMemo(() => locationPageBySlug(slug), [slug]);
  const testimonials = useTestimonials(STATIC_TESTIMONIALS);
  const rootRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!page) return;
    const q = (s) => rootRef.current.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 });
    tl.fromTo(q(".ll-reveal"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .9, stagger: .07 })
      .fromTo(q(".ll-glance"), { opacity: 0, y: 28, scale: .98 }, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, "-=.7");
    return () => tl.kill();
  }, [page]);

  useEffect(() => {
    if (!page) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    rootRef.current
      ?.querySelectorAll(".ll-ind, .ll-why-card, .sd2-case, .v2-method-row, .sd2-step, .v2-faq-item, .v2-heading, .v2-label, .v2-lede, .ll-band")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [page]);

  if (!page) return <NotFound />;

  const { service, city } = page;
  const seo = locationSeo(page);
  const faqs = service.faqs(city);

  return (
    <main className="v2 sd2 ll" ref={rootRef}>
      <SEO title={seo.title} description={seo.description} keywords={seo.keywords} />
      <StructuredData
        type="Service"
        data={{
          name: `${service.label} in ${city.name}`,
          description: seo.description,
          areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: city.region } },
        }}
      />

      {/* ══════════ HEADER — logo, phone, consultation ══════════ */}
      <header className={`ll-bar ${scrolled ? "is-scrolled" : ""}`}>
        <img className="ll-logo" src={codelixLogo} alt="Codelix IT Solutions" />
        <div className="ll-bar-actions">
          <a className="ll-bar-phone" href={PHONE.href}>
            <Phone size={15} strokeWidth={1.8} /> {PHONE.label}
          </a>
          <Link className="v2-btn v2-btn--filled ll-bar-cta" to="/contact">Book a consultation</Link>
        </div>
      </header>

      {/* ══════════ 1 · HERO ══════════ */}
      <section className="ll-hero">
        <span className="ll-hero-glow" aria-hidden="true" />
        <span className="ll-hero-grid" aria-hidden="true" />
        <div className="ll-hero-inner">
          <div className="ll-hero-copy">
            <div className="ll-pill ll-reveal">
              <MapPin size={13} strokeWidth={2} />
              {city.name}, {city.region}
              <span className="ll-pill-sep" />
              <span className="ll-pill-live"><i /> Taking new projects</span>
            </div>
            <h1 className="ll-title ll-reveal">
              Best {service.label} Company in <span className="ll-accent">{city.name}</span>
            </h1>
            <p className="ll-sub ll-reveal">
              Codelix IT Solutions is {service.article} {service.noun} serving {city.name} that {service.definition}
            </p>
            <div className="ll-hero-cta ll-reveal">
              <Link className="v2-btn v2-btn--filled" to="/contact">
                <span>Book a free consultation</span>
                <i className="v2-btn-arrow">→</i>
              </Link>
              <a className="ll-ghost" href={PHONE.href}>
                <Phone size={15} strokeWidth={1.8} /> Call {PHONE.label}
              </a>
            </div>
            <ul className="ll-ticks ll-reveal">
              <li><Check size={14} strokeWidth={2.6} /> Fixed quote in 48 hours</li>
              <li><Check size={14} strokeWidth={2.6} /> You own the code</li>
              <li><Check size={14} strokeWidth={2.6} /> Support after launch</li>
            </ul>
          </div>

          {/* answer-engine friendly summary card */}
          <aside className="ll-glance" aria-label={`${service.label} in ${city.name} at a glance`}>
            <div className="ll-glance-bar">
              <span className="ll-glance-dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="ll-glance-title">{service.lower} · {city.name.toLowerCase()}</span>
            </div>
            <dl className="ll-glance-rows">
              <div><dt>Service</dt><dd>{service.label}</dd></div>
              <div><dt>Serving</dt><dd>{city.name} &amp; all of {city.region}</dd></div>
              <div><dt>Typical timeline</dt><dd>{service.timeline}</dd></div>
              <div><dt>Pricing</dt><dd>Fixed quote, in writing</dd></div>
              <div><dt>Ownership</dt><dd>100% yours at handover</dd></div>
            </dl>
            <div className="ll-glance-stats">
              {STATS.map((s) => (
                <div key={s.label}>
                  <span className="ll-stat-num">{s.num}</span>
                  <span className="ll-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <Link className="ll-glance-cta" to="/contact">
              Get a fixed quote <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </aside>
        </div>
      </section>

      {/* ══════════ 2 · CLIENTS ══════════ */}
      <ClientStrip />

      {/* ══════════ 3 · WHY CODELIX — answer first ══════════ */}
      <section className="v2-section v2-section--void" id="about">
        <div className="ll-split">
          <div>
            <p className="v2-label">{service.label} in {city.name}</p>
            <h2 className="v2-heading">Why {city.name} businesses choose Codelix.</h2>
          </div>
          <div>
            <p className="v2-lede">{city.intro}</p>
            <p className="v2-lede ll-lede-2">{city.economy} We build {service.short} for exactly these businesses.</p>
          </div>
        </div>
        <div className="ll-why">
          {WHY.map((w) => (
            <article className="ll-why-card" key={w.title}>
              <span className="ll-icon"><w.icon size={19} strokeWidth={1.6} /></span>
              <h3>{w.title}</h3>
              <p>{w.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 4 · LOCAL INDUSTRIES ══════════ */}
      <section className="v2-section" id="industries">
        <p className="v2-label">{city.name} Industries</p>
        <h2 className="v2-heading">{service.label} for {city.name}'s key industries.</h2>
        <p className="v2-lede">What {service.short} looks like for the businesses that drive {city.name}.</p>
        <div className="ll-ind-grid">
          {city.industries.map((ind, i) => (
            <article className="ll-ind" key={ind.name}>
              <span className="ll-ind-n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ll-ind-name">{ind.name}</h3>
              <p className="ll-ind-body">{ind[service.key]}</p>
              <span className="ll-ind-tag">{service.short} · {city.name}</span>
            </article>
          ))}
        </div>
        <div className="ll-areas">
          <h3 className="ll-areas-title">
            <MapPin size={16} strokeWidth={1.8} /> Areas we serve in {city.name}
          </h3>
          <ul className="ll-areas-list">
            {city.areas.map((a) => <li key={a}>{a}</li>)}
            <li>All of {city.region}</li>
          </ul>
        </div>
      </section>

      {/* ══════════ 5 · WHAT'S INCLUDED ══════════ */}
      <section className="v2-section v2-section--void" id="included">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">What's Included</p>
            <h2 className="v2-heading">Our {service.lower} services in {city.name}.</h2>
          </div>
          <p className="v2-lede">Everything below is scoped to what your business actually needs — you only pay for what you use.</p>
        </div>
        <div className="sd2-case-grid">
          {service.included.map((c, i) => (
            <article className="sd2-case" key={c.title}>
              <div className="sd2-case-top">
                <span className="sd2-case-icon"><Check size={21} strokeWidth={1.6} /></span>
                <span className="sd2-case-n">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="sd2-case-title">{c.title}</h3>
              <p className="sd2-case-body">{c.body}</p>
              <span className="sd2-case-rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 6 · MID-PAGE QUOTE BAND ══════════ */}
      <section className="ll-band-wrap">
        <div className="ll-band">
          <div>
            <p className="ll-band-k">Free consultation · {city.name}</p>
            <h2 className="ll-band-title">Get a fixed quote for your {service.lower} project.</h2>
            <p className="ll-band-body">A 30-minute call, then a written scope, timeline and price within 48 hours. No obligation.</p>
          </div>
          <div className="ll-band-actions">
            <Link className="v2-btn v2-btn--filled" to="/contact">
              <span>Book a consultation</span>
              <i className="v2-btn-arrow">→</i>
            </Link>
            <a className="ll-ghost" href={PHONE.href}><Phone size={15} strokeWidth={1.8} /> {PHONE.label}</a>
          </div>
        </div>
      </section>

      {/* ══════════ 7 · PROCESS ══════════ */}
      <section className="v2-method-shell" id="process">
        <div className="v2-method-head">
          <h2 className="v2-method-heading">How We Work With {city.name} Clients.</h2>
          <p className="v2-method-lede">{city.meet}</p>
        </div>
        <div className="v2-method-rows">
          {PROCESS.map((m) => (
            <div className="v2-method-row" key={m.n}>
              <div className="v2-method-index">{m.n}</div>
              <div>
                <div className="v2-method-title">{m.title}</div>
                <span className="v2-method-timeframe">{m.time}</span>
              </div>
              <div className="v2-method-body">{m.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 8 · TESTIMONIALS ══════════ */}
      <TestimonialSpotlight
        testimonials={testimonials}
        label="Client Voices"
        heading="What clients say once we ship."
        stats={[
          { num: "40+", label: "Companies trust us" },
          { num: "11", label: "Industries served" },
        ]}
      />

      {/* ══════════ 9 · STACK ══════════ */}
      <section className="v2-section v2-tech" id="stack">
        <div className="v2-tech-head">
          <div>
            <p className="v2-label">Technology</p>
            <h2 className="v2-heading">Built on a proven production stack.</h2>
          </div>
          <p className="v2-lede">The same tools we use for every client — chosen for speed, security and easy maintenance.</p>
        </div>
        <div className="v2-tech-grid">
          {TECH_STACK.map((t) => (
            <div className="v2-tech-item" key={t.name}>
              <img src={t.src} alt={t.name} loading="lazy" />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ 10 · FAQ ══════════ */}
      <FaqSection
        faqs={faqs}
        className="v2-section--void"
        heading={`${service.label} in ${city.name}: common questions.`}
      />

      {/* ══════════ 11 · NEXT STEPS ══════════ */}
      <section className="v2-section v2-section--void" id="next">
        <div className="sd2-case-head">
          <div>
            <p className="v2-label">What Happens Next</p>
            <h2 className="v2-heading">Three steps from here to kickoff.</h2>
          </div>
          <p className="v2-lede">No drawn-out sales process. Reach out and here is exactly what follows.</p>
        </div>
        <div className="sd2-next">
          <span className="sd2-next-line" aria-hidden="true" />
          {NEXT_STEPS.map((s) => (
            <article className="sd2-step" key={s.n}>
              <div className="sd2-step-node">
                <span className="sd2-step-num">{s.n}</span>
                <span className="sd2-step-badge"><s.icon size={15} strokeWidth={1.7} /></span>
              </div>
              <div className="sd2-step-inner">
                <span className="sd2-step-meta">{s.meta}</span>
                <h3 className="sd2-step-title">{s.title}</h3>
                <p className="sd2-step-body">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════ 11b · OTHER SERVICES IN THIS CITY — the only links
          between the city pages; never to other cities ══════════ */}
      <section className="v2-section" id="other-services">
        <p className="v2-label">Also in {city.name}</p>
        <h2 className="v2-heading">Other services in {city.name}.</h2>
        <div className="ll-other-grid">
          {Object.values(LOCATION_SERVICES)
            .filter((s) => s.key !== service.key)
            .map((s) => (
              <Link className="ll-other" key={s.key} to={`/${locationSlug(s.key, city.key)}`}>
                <span className="ll-other-k">{city.name}</span>
                <h3 className="ll-other-title">{s.label} in {city.name}</h3>
                <p className="ll-other-body">{s.pitch}</p>
                <span className="ll-other-go">
                  View {s.lower} <ArrowRight size={15} strokeWidth={2} />
                </span>
              </Link>
            ))}
        </div>
      </section>

      {/* ══════════ 12 · CTA ══════════ */}
      <CtaSection className="v2-section--void">
        <p className="v2-label">Start Here</p>
        <h2 className="v2-cta-headline">
          Looking for the best {service.noun} in {city.name}?
        </h2>
        <p className="v2-cta-body">
          Tell us what you need. We'll scope what should be built first, what can wait,
          and send you a fixed quote — usually within 48 hours of the call.
        </p>
        <div className="v2-cta-actions">
          <Link className="v2-btn" to="/contact">Book a consultation →</Link>
        </div>
      </CtaSection>

      {/* ══════════ FOOTER — contact details; services and cities as plain
          text, so the only page link out is still /contact ══════════ */}
      <footer className="ll-foot">
        <div className="ll-foot-top">
          <div>
            <img className="ll-logo ll-logo--lg" src={codelixLogo} alt="Codelix IT Solutions" />
            <p className="ll-foot-blurb">
              Codelix IT Solutions builds websites, custom software, ERP systems and mobile
              apps for businesses in {city.name} and across {city.region} — from our office in Ahmedabad.
            </p>
            <RatingsStrip />
          </div>
          <div className="ll-foot-cta">
            <p className="ll-foot-cta-k">Have a project in mind?</p>
            <p className="ll-foot-cta-title">Talk to our team today.</p>
            <Link className="v2-btn v2-btn--filled" to="/contact">
              <span>Book a consultation</span>
              <i className="v2-btn-arrow">→</i>
            </Link>
          </div>
        </div>

        <div className="ll-foot-grid">
          <div className="ll-foot-col">
            <span className="ll-foot-k">What we build</span>
            <ul>
              {Object.values(LOCATION_SERVICES).map((s) => <li key={s.key}>{s.label}</li>)}
            </ul>
          </div>
          <div className="ll-foot-col">
            <span className="ll-foot-k">Areas we serve</span>
            <ul className="ll-foot-cities">
              {Object.values(LOCATION_CITIES).map((c) => (
                <li key={c.key} className={c.key === city.key ? "is-here" : ""}>{c.name}</li>
              ))}
            </ul>
          </div>
          <div className="ll-foot-col">
            <span className="ll-foot-k"><MapPin size={14} /> Office</span>
            <p>A-1308, PNTC — Times Of India Press Road, Vejalpur, Ahmedabad, Gujarat — 380015</p>
            <span className="ll-foot-k ll-foot-k--gap"><Clock size={14} /> Response</span>
            <p>We reply to every enquiry within 24 hours.</p>
          </div>
          <div className="ll-foot-col">
            <span className="ll-foot-k"><Phone size={14} /> Call</span>
            <a href={PHONE.href}>{PHONE.label}</a>
            <a href={PHONE_2.href}>{PHONE_2.label}</a>
            <span className="ll-foot-k ll-foot-k--gap"><Mail size={14} /> Email</span>
            <a href="mailto:sales@codelixitsolutions.com">sales@codelixitsolutions.com</a>
            <a href="mailto:info@codelixitsolutions.com">info@codelixitsolutions.com</a>
          </div>
        </div>

        <div className="ll-foot-legal">
          <span>© {new Date().getFullYear()} Codelix IT Solutions. All rights reserved.</span>
          <span>{service.label} · {city.name}, {city.region}</span>
        </div>
      </footer>

      {/* ══════════ MOBILE ACTION BAR ══════════ */}
      <div className="ll-mbar">
        <a className="ll-mbar-call" href={PHONE.href}><Phone size={16} strokeWidth={1.8} /> Call</a>
        <Link className="ll-mbar-book" to="/contact">Book a consultation</Link>
      </div>
    </main>
  );
}
