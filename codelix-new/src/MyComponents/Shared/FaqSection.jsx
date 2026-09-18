import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import gsap from 'gsap';
import './FaqSection.css';
import { StructuredData } from "../../components/StructuredData";

export default function FaqSection({ faqs, className = "", label = "FAQ", heading = "Questions we're asked before every engagement." }) {
  const [openFaq, setOpenFaq] = useState(-1);
  const [revealedFaqs, setRevealedFaqs] = useState(() => new Set());
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const targetEl = entry.target;
          if (targetEl.classList.contains("v2-faq-item")) {
            const idx = Number(targetEl.dataset.faqIndex);
            setRevealedFaqs((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)));
          } else {
            /* intro copy — plain static classNames, so adding the class
               imperatively is safe here (unlike the items above, whose
               className React recomputes on every open/close) */
            targetEl.classList.add("is-in");
          }
          io.unobserve(targetEl);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );

    const items = el.querySelectorAll(".v2-faq-item");
    items.forEach((item) => io.observe(item));

    /* The label/heading/lede start at opacity:0 and only become visible
       once they carry .is-in. This component is dropped into 20+ pages,
       and previously it depended on each host page's own reveal observer
       to do that — so on any host that doesn't watch these selectors the
       heading stayed invisible forever, leaving a blank gap above the
       questions. Reveal our own intro instead of relying on the host. */
    el.querySelectorAll(".v2-faq-intro .v2-label, .v2-faq-intro .v2-heading, .v2-faq-intro .v2-lede")
      .forEach((node) => io.observe(node));

    return () => io.disconnect();
  }, [faqs]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll(".v2-faq-a").forEach((item, i) => {
      const inner = item.querySelector("p");
      if (inner) {
        gsap.to(item, {
          height: i === openFaq ? inner.offsetHeight : 0,
          duration: 0.55,
          ease: "power3.inOut",
        });
      }
    });
  }, [openFaq]);

  return (
    <section className={`v2-section ${className}`.trim()} id="faq" ref={ref}>
      {/* Markup lives here, not on each page: every FAQ on the site renders
          through this component, so this is the one place it can be built from
          exactly the list the accordion shows — including pages added later. */}
      <StructuredData type="FAQPage" data={faqs} />
      <div className="v2-faq-intro">
        <div>
          <p className="v2-label">{label}</p>
          <h2 className="v2-heading">{heading}</h2>
        </div>
        <p className="v2-lede v2-faq-note">
          Don't see yours here? <Link to="/contact">Ask us directly →</Link>
        </p>
      </div>
      <div>
        {faqs.map((f, i) => (
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
  );
}
