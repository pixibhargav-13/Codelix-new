import React, { useEffect, useMemo, useRef, useState } from "react";
import FooterV2 from "../Shared/FooterV2";
import gsap from "gsap";
import {
  Search, ShieldCheck, Wallet, Handshake, Rocket,
  Mail, Phone, MapPin, Check,
} from "lucide-react";

/* v2 design system + shared data — same source of truth as the other v2 pages */

import "../HomepageV2/HomepageV2.css";

import { CLIENT_LOGOS } from "../HomepageV2/clientLogos";
import { FOOTER_SERVICE_KEYWORDS, FOOTER_ALL_SERVICES, FOOTER_INDUSTRY_KEYWORDS } from "../HomepageV2/footerData";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./ContactV2.css";
import ContactHeroVisual from "./ContactHeroVisual";
import NavbarV2 from "../Shared/NavbarV2";


const REQUIRED_FIELDS = ["name", "contact", "email", "company", "designation", "service", "aboutProject"];

/* real process, ported from the existing /contact page */
const PROCESS = [
  { n: "01", icon: Search, title: "Define your needs", meta: "First step", body: "Tell us what you need — our tech team analyzes it and suggests the best approach." },
  { n: "02", icon: ShieldCheck, title: "NDA signing", meta: "If needed", body: "We secure your idea with a signed NDA. Your privacy is always the priority." },
  { n: "03", icon: Wallet, title: "Estimated budget", meta: "After evaluation", body: "After in-depth evaluation, we share the estimated budget and project timeline." },
  { n: "04", icon: Handshake, title: "Initiating partnership", meta: "Once approved", body: "Once the scope and budget are approved, we formalize the partnership to get started." },
  { n: "05", icon: Rocket, title: "Timeline & launch", meta: "Ongoing", body: "We respect your deadlines — delivering on time, with full transparency." },
];

const FAQS = [
  { q: "How quickly will I hear back?", a: "We aim to respond within one business day. If your inquiry comes in over a weekend, expect a reply the next business day." },
  { q: "Do you sign an NDA before discussing my project?", a: "Yes, as a matter of course before any detailed scoping conversation — before you share specifics, not after." },
  { q: "What do I need to have ready before reaching out?", a: "Nothing formal. A rough idea of what you're building and any budget or timeline constraints is enough to start a useful conversation." },
  { q: "Is the initial consultation free?", a: "Yes. The discovery call and the written proposal that follows are both free, with no obligation to proceed." },
];

export default function ContactV2() {
  
  
  
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());

  const rootRef = useRef(null);
  const stripRef = useRef(null);

  /* real form state + submission logic, ported from /contact */
  const [formData, setFormData] = useState({
    name: "", contact: "", email: "", company: "",
    designation: "", service: "Select", aboutProject: "",
    budget: "Select", timeline: "Select", howHeard: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const formPayload = new FormData(e.target);
    formPayload.append("access_key", "d81ad30d-2d27-411e-849b-6b1d9945a2b8");
    formPayload.append("subject", `New Inquiry from ${formData.name} — Codelix Contact Form`);
    formPayload.append("from_name", "Codelix Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        e.target.reset();
        setFormData({
          name: "", contact: "", email: "", company: "",
          designation: "", service: "Select", aboutProject: "",
          budget: "Select", timeline: "Select", howHeard: "",
        });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  /* extraordinary section — a live completion ring + running summary card
     that updates as the visitor fills the form, instead of a form sitting
     next to dead static copy */
  const filledCount = useMemo(() => {
    return REQUIRED_FIELDS.filter((k) => {
      const v = formData[k];
      return v && v !== "Select";
    }).length;
  }, [formData]);
  const completion = Math.round((filledCount / REQUIRED_FIELDS.length) * 100);
  const RING_R = 52;
  const RING_C = 2 * Math.PI * RING_R;
  const ringOffset = RING_C - (RING_C * completion) / 100;

  

  

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
      .fromTo(q(".sd2-hero-visual.sv2-hero-reveal"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 }, "-=.8");
    return () => tl.kill();
  }, []);

  /* reveal-on-enter — IntersectionObserver, no stale cached scroll positions */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.classList.contains("v2-faq-item")) {
          const idx = Number(el.dataset.faqIndex);
          setRevealedFaqs((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
        } else {
          el.classList.add("is-in");
        }
        io.unobserve(el);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    const sel = [
      ".contact-form-shell", ".sd2-step", ".v2-faq-item", ".v2-strip",
      ".v2-heading", ".v2-label", ".v2-lede",
    ].join(", ");
    rootRef.current.querySelectorAll(sel).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* FAQ accordion height */
  useEffect(() => {
    rootRef.current.querySelectorAll(".v2-faq-a").forEach((el, i) => {
      const inner = el.querySelector("p");
      el.style.height = i === openFaq ? `${inner.offsetHeight}px` : "0px";
    });
  }, [openFaq]);

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
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <div className="sd2-hero-main">
            <div>
              <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span>/</span>
                <em>Contact</em>
              </nav>

              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> Usually reply within 1 business day</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Tell us what</span></span>
                <span className="line"><span className="v2-hero-accent">you're building.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Whether you're looking for guidance, support, or a custom
                solution, we're here to help you every step of the way.
              </p>
              <div className="sd2-hero-cta sv2-hero-reveal contact-hero-links">
                <a className="contact-quick-link" href="mailto:sales@codelixitsolutions.com">
                  <Mail size={15} strokeWidth={1.7} />
                  <span>sales@codelixitsolutions.com</span>
                </a>
                <a className="contact-quick-link" href="tel:+919429269295">
                  <Phone size={15} strokeWidth={1.7} />
                  <span>+91 94292 69295</span>
                </a>
                <a
                  className="contact-quick-link"
                  href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.009586,72.5203036,17z/data=!3m1!4b1!4m6!3m5!1s0x395e856f394696fd:0x69f60cf69bf7dd43!8m2!3d23.0095811!4d72.5228785!16s%2Fg%2F11z61zmnv5?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank" rel="noopener noreferrer"
                >
                  <MapPin size={15} strokeWidth={1.7} />
                  <span>Ahmedabad, Gujarat</span>
                </a>
              </div>
            </div>
            
            {/* Visual Column */}
            <div className="sd2-hero-visual sv2-hero-reveal">
              <ContactHeroVisual />
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · FORM + LIVE SUMMARY — the extraordinary section ══════════ */}
      <section className="v2-section v2-section--void" id="contact-form">
        <p className="v2-label">Schedule A Meeting</p>
        <h2 className="v2-heading">Leave us a little info — we'll get in touch.</h2>
        <p className="v2-lede">
          With our design and development team, there's nothing we can't
          achieve — a proven end-to-end process from strategy to launch.
        </p>

        <div className="contact-form-shell">
          <div className="contact-form-panel">
            {submitted ? (
              <div className="contact-success">
                <span className="contact-success-icon"><Check size={26} strokeWidth={2.2} /></span>
                <h3>Thank you!</h3>
                <p>Your message has been received. Our team will get back to you shortly.</p>
                <button className="v2-btn" onClick={() => setSubmitted(false)}>Send another →</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <input type="checkbox" name="botcheck" style={{ display: "none" }} />

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>Your Name*</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="contact-field">
                    <label>Email*</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>Contact*</label>
                    <input type="text" name="contact" required value={formData.contact} onChange={handleChange} />
                  </div>
                  <div className="contact-field">
                    <label>Company*</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleChange} />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>Designation*</label>
                    <input type="text" name="designation" required value={formData.designation} onChange={handleChange} />
                  </div>
                  <div className="contact-field">
                    <label>Service*</label>
                    <select name="service" required value={formData.service} onChange={handleChange}>
                      <option disabled value="Select">Select</option>
                      {FOOTER_ALL_SERVICES.map(s => (
                        <option key={s.label} value={s.label}>{s.label}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="contact-field">
                  <label>About Project*</label>
                  <textarea rows="4" name="aboutProject" required value={formData.aboutProject} onChange={handleChange} />
                </div>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>Budget</label>
                    <select name="budget" value={formData.budget} onChange={handleChange}>
                      <option disabled value="Select">Select</option>
                      <option>Under $1500</option>
                      <option>$1500 - $5,000</option>
                      <option>$5,000 - $10,000</option>
                      <option>$10,000 - $20,000</option>
                      <option>$20,000 - $50,000</option>
                      <option>Above $50,000</option>
                    </select>
                  </div>
                  <div className="contact-field">
                    <label>Timeline</label>
                    <select name="timeline" value={formData.timeline} onChange={handleChange}>
                      <option disabled value="Select">Select</option>
                      <option>1-3 months</option>
                      <option>3-6 months</option>
                      <option>6-12 months</option>
                      <option>12+ months</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="contact-field">
                  <label>How did you hear about us?</label>
                  <textarea rows="3" name="howHeard" value={formData.howHeard} onChange={handleChange} />
                </div>

                {error && <p className="contact-error">⚠️ {error}</p>}

                <button type="submit" className="contact-submit" disabled={sending}>
                  <span>{sending ? "Sending…" : "Submit"}</span>
                  {!sending && <i className="contact-submit-arrow">→</i>}
                </button>
              </form>
            )}
          </div>

          {/* live-updating summary — the standout piece: watches the form
              fill in real time instead of sitting next to static copy */}
          <aside className="contact-live">
            <div className="contact-live-ring">
              <svg viewBox="0 0 120 120" className="contact-live-ring-svg" aria-hidden="true">
                <circle className="contact-live-ring-track" cx="60" cy="60" r={RING_R} />
                <circle
                  className="contact-live-ring-fill"
                  cx="60" cy="60" r={RING_R}
                  style={{
                    strokeDasharray: RING_C,
                    strokeDashoffset: ringOffset,
                  }}
                />
              </svg>
              <div className="contact-live-ring-num">
                <span>{completion}</span>
                <em>%</em>
              </div>
            </div>
            <p className="contact-live-label">Inquiry completeness</p>

            <div className="contact-live-card">
              <div className="contact-live-row">
                <span>Name</span>
                <strong>{formData.name || "—"}</strong>
              </div>
              <div className="contact-live-row">
                <span>Company</span>
                <strong>{formData.company || "—"}</strong>
              </div>
              <div className="contact-live-row">
                <span>Service</span>
                <strong>{formData.service !== "Select" ? formData.service : "—"}</strong>
              </div>
              <div className="contact-live-row">
                <span>Budget</span>
                <strong>{formData.budget !== "Select" ? formData.budget : "—"}</strong>
              </div>
              <div className="contact-live-row">
                <span>Timeline</span>
                <strong>{formData.timeline !== "Select" ? formData.timeline : "—"}</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ══════════ 3 · PROCESS — connected timeline ══════════ */}
      <section className="v2-section v2-section--void" id="process">
        <p className="v2-label">What Happens Next</p>
        <h2 className="v2-heading">Five steps from message to launch.</h2>
        <p className="v2-lede">
          No drawn-out sales process — reach out and here's exactly what
          follows.
        </p>
        <div className="sd2-next">
          <span className="sd2-next-line" aria-hidden="true" />
          {PROCESS.map((s) => (
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

      {/* ══════════ 4 · FAQ ══════════ */}
      <section className="v2-section v2-section--void" id="faq">
        <div className="v2-faq-intro">
          <div>
            <p className="v2-label">FAQ</p>
            <h2 className="v2-heading">Before you reach out.</h2>
          </div>
          <p className="v2-lede v2-faq-note">
            Still unsure? <a href="mailto:sales@codelixitsolutions.com">Email us directly →</a>
          </p>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <div
              className={`v2-faq-item ${openFaq === i ? "open" : ""} ${revealedFaqs.has(i) ? "is-in" : ""}`}
              data-faq-index={i}
              key={f.q}
            >
              <button className="v2-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <span className="v2-faq-q-label">
                  <span className="v2-faq-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="v2-faq-q-text">{f.q}</span>
                </span>
                <span className="v2-faq-sign"><span /><span /></span>
              </button>
              <div className="v2-faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
            <FooterV2 />
    </div>
  );
}
