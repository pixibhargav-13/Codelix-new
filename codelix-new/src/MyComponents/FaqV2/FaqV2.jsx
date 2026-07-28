import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Search } from "lucide-react";

/* v2 design system — same source of truth as the other v2 pages */
import "../HomepageV2/HomepageV2.css";
import codelixLogo from "../Images/codelix-logo.png";
import codelixText from "../Images/codelix-footer-logo.png";
import "../ServicesV2/ServicesV2.css";
import "../ServiceDetailV2/ServiceDetailV2.css";
import "./FaqV2.css";

/* every answer here is the same real, already-established statement used
   elsewhere on the site (HomepageFaq.jsx, ProcessV2, IndustriesV2, WorkV2)
   — compiled into one place, not new/invented answers */
const FAQS = [
  { category: "General", q: "Do you provide source code after project completion?", a: "Yes. Once the project is completed and fully paid for, you receive 100% ownership of the source code, along with documentation and deployment details." },
  { category: "General", q: "What if I need changes after the project is delivered?", a: "We offer a revision window after delivery for design or functionality tweaks. For ongoing improvements, we recommend our maintenance plan, which covers updates, enhancements, and tech support." },
  { category: "General", q: "Can you sign an NDA before starting the project?", a: "Of course. We take confidentiality seriously and are happy to sign an NDA before discussing or starting your project to protect your ideas and data." },
  { category: "Pricing & Billing", q: "How does billing work?", a: "Our billing process is simple and transparent. After finalising your project scope, we provide a detailed quotation with milestones. Payments are made in phases: an upfront deposit, followed by milestone-based instalments as work progresses." },
  { category: "Pricing & Billing", q: "What is your cancellation policy?", a: "You can cancel a project at any stage with written notice. Work completed up to the cancellation date will be billed accordingly, and any unused payment balance will be refunded." },
  { category: "Pricing & Billing", q: "Does industry experience change your pricing?", a: "No — pricing is based on scope and complexity, the same estimator and process regardless of sector." },
  { category: "Our Process", q: "Does every project go through all six stages?", a: "Yes — the depth varies with project size, but we don't skip stages to move faster. A smaller project moves through them quickly; it doesn't cut them out." },
  { category: "Our Process", q: "What if my project changes scope midway?", a: "We re-scope openly rather than quietly absorbing the change. You'll see the impact on timeline and price before we proceed, not after." },
  { category: "Our Process", q: "How involved do I need to be during development?", a: "As involved as you want. At minimum, weekly check-ins on working builds. Some clients want daily visibility; we can accommodate either." },
  { category: "Our Process", q: "What happens if QA finds something after launch?", a: "Every project includes a post-launch support window specifically for this. It's expected, not an emergency." },
  { category: "Technology", q: "How do you integrate AI into your solutions?", a: "We use AI to enhance performance and user experience through smart recommendations, chat automation, predictive analytics, and process optimisation. Our AI-powered integrations are tailored to your business goals, ensuring tangible results, not just buzzwords." },
  { category: "Technology", q: "Do you handle industry-specific compliance requirements?", a: "We design with privacy and accessibility as requirements for regulated sectors like healthcare and finance. For specific certifications your business needs (HIPAA, PCI-DSS, etc.), we'll work with your compliance team rather than claim expertise we'd need to verify case by case." },
  { category: "Our Work", q: "Is the work you show real client work?", a: "Almost all of it — a couple of pieces are concept explorations rather than live client builds, and we say so plainly in the case study itself." },
  { category: "Our Work", q: "Can we speak to a past client before signing?", a: "Yes, on request for shortlisted proposals — we'll connect you with a comparable past client where confidentiality allows." },
  { category: "Getting Started", q: "How quickly will I hear back?", a: "We aim to respond within one business day. If your inquiry comes in over a weekend, expect a reply the next business day." },
  { category: "Getting Started", q: "What do I need to have ready before reaching out?", a: "Nothing formal. A rough idea of what you're building and any budget or timeline constraints is enough to start a useful conversation." },
  { category: "Getting Started", q: "Is the initial consultation free?", a: "Yes. The discovery call and the written proposal that follows are both free, with no obligation to proceed." },
  { category: "Technology", q: "Do we choose the stack, or do you?", a: "We recommend based on your project's constraints and explain the trade-offs — but if you have an existing stack or a strong preference, we build in it." },
  { category: "Careers", q: "Are you currently hiring for a specific role?", a: "We don't keep a running job board — we hire when a specific project need lines up with what someone brings. Send your details anyway; we keep good applications on file." },
  { category: "Careers", q: "Do you hire freelancers or only full-time?", a: "Both, depending on the work. Tell us what you're looking for and we'll tell you honestly if it's a fit right now." },
];

const CATEGORIES = ["All", "General", "Getting Started", "Pricing & Billing", "Our Process", "Technology", "Our Work", "Careers"];

export default function FaqV2() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState(-1);
  const [revealed, setRevealed] = useState(() => new Set());

  const rootRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  /* hero intro — masked-line GSAP wipe, matching the other v2 pages */
  useEffect(() => {
    const q = (s) => rootRef.current.querySelectorAll(s);
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
    tl.fromTo(q(".sd2-crumbs"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7 })
      .fromTo(q(".v2-hero-top.sv2-hero-reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, "-=.4")
      .fromTo(q(".sd2-hero-title .line > span"),
        { yPercent: 118 }, { yPercent: 0, duration: 1.15, stagger: .1 }, "-=.45")
      .fromTo(q(".sd2-hero-sub.sv2-hero-reveal"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .9 }, "-=.65");
    return () => tl.kill();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const matches = FAQS.filter((f) => {
      const inCategory = category === "All" || f.category === category;
      const inSearch = !term || f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term);
      return inCategory && inSearch;
    });
    /* group by canonical category order (not source-array order) so every
       same-category question renders as one contiguous run regardless of
       where it was added to FAQS */
    return [...matches].sort((a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category));
  }, [category, search]);

  /* reveal + accordion height, reset whenever the filtered list changes so
     newly-matched items animate in fresh */
  useEffect(() => {
    setRevealed(new Set());
    setOpenIdx(-1);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = Number(entry.target.dataset.idx);
        setRevealed((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
        io.unobserve(entry.target);
      }),
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );
    rootRef.current?.querySelectorAll(".faqv2-item, .v2-cta").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filtered]);

  useEffect(() => {
    rootRef.current?.querySelectorAll(".faqv2-a").forEach((el, i) => {
      const inner = el.querySelector("p");
      el.style.height = i === openIdx ? `${inner.offsetHeight}px` : "0px";
    });
  }, [openIdx, filtered]);

  return (
    <div className="v2" ref={rootRef}>
      <div className="v2-progress" aria-hidden="true"><span /></div>

      {/* ══════════ NAV ══════════ */}
      <nav className={`v2-nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="v2-nav-inner">
          <a href="/preview-v2" className="v2-nav-logo" aria-label="Codelix — home">
            <img src={codelixLogo} alt="Codelix" />
          </a>
          <div className="v2-nav-links">
            <a href="/preview-v2">Homepage V2</a>
            <a href="/services-v2">Services V2</a>
            <a href="/about-v2">About V2</a>
            <a href="/work-v2">Work V2</a>
            <a href="/industries-v2">Industries V2</a>
            <a href="/process-v2">Process V2</a>
            <a href="/contact-v2">Contact V2</a>
          </div>
          <button
            className={`v2-burger ${mobileOpen ? "open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`v2-drawer ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="v2-drawer-links">
          {[
            { label: "Homepage V2", href: "/preview-v2" },
            { label: "Services V2", href: "/services-v2" },
            { label: "About V2", href: "/about-v2" },
            { label: "Work V2", href: "/work-v2" },
            { label: "Industries V2", href: "/industries-v2" },
            { label: "Process V2", href: "/process-v2" },
            { label: "Contact V2", href: "/contact-v2" },
          ].map((l, i) => (
            <a key={l.label} href={l.href}
              style={{ transitionDelay: `${0.08 + i * 0.05}s` }}
              onClick={() => setMobileOpen(false)}>
              <span className="v2-drawer-index">{String(i + 1).padStart(2, "0")}</span>
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* ══════════ 1 · HERO ══════════ */}
      <header className="sd2-hero">
        <div className="sd2-hero-inner">
          <nav className="sd2-crumbs sv2-hero-reveal" aria-label="Breadcrumb">
            <a href="/preview-v2">Home</a>
            <span>/</span>
            <em>FAQ</em>
          </nav>

          <div className="sd2-hero-main">
            <div>
              <div className="v2-hero-top sv2-hero-reveal">
                <span className="v2-hero-status"><i /> {FAQS.length} answers, straight talk</span>
              </div>
              <h1 className="sd2-hero-title">
                <span className="line"><span>Everything people</span></span>
                <span className="line"><span className="v2-hero-accent">ask us, in one place.</span></span>
              </h1>
              <p className="sd2-hero-sub sv2-hero-reveal">
                Search or filter by category — every answer here is the same one
                you'd get if you asked us directly.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ 2 · SEARCHABLE FAQ — the extraordinary section: a live
          search + category filter that narrows the list in real time, with
          each surviving row re-animating in via IntersectionObserver. ══════════ */}
      <section className="v2-section" id="faq">
        <div className="faqv2-toolbar">
          <div className="faqv2-search">
            <Search size={16} strokeWidth={1.8} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search a question…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="faqv2-cats" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`faqv2-cat ${category === c ? "is-active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="faqv2-count">
          {filtered.length} {filtered.length === 1 ? "question" : "questions"}
          {search && <> matching "<strong>{search}</strong>"</>}
        </div>

        <div className="faqv2-list">
          {filtered.length === 0 && (
            <p className="faqv2-empty">No matches — try a different search or category.</p>
          )}
          {filtered.map((f, i) => {
            const isNewGroup = i === 0 || filtered[i - 1].category !== f.category;
            return (
              <React.Fragment key={f.category + f.q}>
                {isNewGroup && (
                  <div className="faqv2-group-head">
                    <span>{f.category}</span>
                  </div>
                )}
                <div
                  className={`faqv2-item ${openIdx === i ? "open" : ""} ${revealed.has(i) ? "is-in" : ""}`}
                  data-idx={i}
                >
                  <button className="faqv2-q" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                    <span className="faqv2-q-text">{f.q}</span>
                    <span className="faqv2-toggle" aria-hidden="true">
                      <span /><span />
                    </span>
                  </button>
                  <div className="faqv2-a"><p>{f.a}</p></div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="v2-footer">
        <div className="v2-footer-marquee">
          <div className="v2-footer-marquee-track">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>WE LIVE IN IT <em>•</em></span>
            ))}
          </div>
        </div>
        <div className="v2-footer-grid">
          <div className="v2-footer-col">
            <h5>Company</h5>
            <a href="/preview-v2">Codelix</a>
            <a href="/about-v2">About</a>
            <a href="/team-v2">Team</a>
            <a href="/work-v2">Work</a>
            <a href="/industries-v2">Industries</a>
            <a href="/process-v2">Process</a>
            <a href="/contact-v2">Contact</a>
          </div>
          <div className="v2-footer-col">
            <h5>Services</h5>
            <a href="/services-v2/web-development">Web Development</a>
            <a href="/services-v2">Application Development</a>
            <a href="/services-v2/ui-ux-design">UI/UX Design</a>
            <a href="/services-v2">E-Commerce Solutions</a>
            <a href="/services-v2">Custom Software</a>
            <a href="/services-v2">AI Development</a>
          </div>
          <div className="v2-footer-col">
            <h5>Resources</h5>
            <a href="/pricing-v2">Pricing</a>
            <a href="/technologies-v2">Technologies</a>
            <a href="/careers-v2">Careers</a>
            <a href="/faq-v2">FAQ</a>
            <a href="/sitemap-v2">Sitemap</a>
          </div>
          <div className="v2-footer-col">
            <h5>Contact</h5>
            <a href="mailto:Sales@codelixitsolutions.com">Sales@codelixitsolutions.com</a>
            <a href="tel:+919429269295">+91 94292 69295</a>
            <a href="tel:+917490909686">+91 74909 09686</a>
            <a className="v2-footer-address"
              href="https://www.google.com/maps/place/Codelix+IT+Solutions+Pvt+Ltd/@23.0095811,72.5203036,17z"
              target="_blank" rel="noopener noreferrer">
              A-1308, PNTC — Times Of India Press Road, Vejalpur, Ahmedabad, Gujarat — 380015
            </a>
            <a href="https://www.linkedin.com/company/codelixit-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/codelixitsolutions/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="v2-footer-bottom">
          <span>© 2026 Codelix IT Solutions — All Copyright Reserved</span>
          <div className="v2-footer-legal">
            <a href="/privacy-policy-v2">Privacy Policy</a>
            <a href="/terms-of-service-v2">Terms of service</a>
            <a href="/refund-policy-v2">Refund Policy</a>
          </div>
        </div>
        <div className="codelix-large-text" style={{ padding: '0 var(--pad-x)' }}>
          <div className="codelix-text">
            <img src={codelixText} alt="Codelix" style={{ width: '100%', display: 'block', margin: '0 auto' }} />
          </div>
        </div>
      </footer>
    </div>
  );
}
