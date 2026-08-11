import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './FaqSection.css';

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
          }
          io.unobserve(targetEl);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );

    const items = el.querySelectorAll(".v2-faq-item");
    items.forEach((item) => io.observe(item));

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
      <div className="v2-faq-intro">
        <div>
          <p className="v2-label">{label}</p>
          <h2 className="v2-heading">{heading}</h2>
        </div>
        <p className="v2-lede v2-faq-note">
          Don't see yours here? <a href="/contact">Ask us directly →</a>
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
