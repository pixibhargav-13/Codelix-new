import React, { useEffect, useRef } from 'react';
import './CtaSection.css';
import CtaVisual from './CtaVisual';

export default function CtaSection({ children, className = "" }) {
  const ref = useRef(null);

  /* The panel starts at opacity:0 and only becomes visible once it carries
     .is-in. This component is dropped into 28 pages and used to depend on
     each host to reveal it, which is fragile — FaqV2, for instance, did
     observe .v2-cta but its callback keyed off a data-idx the panel does
     not have, so the class was never applied and the whole left column
     stayed invisible. Reveal ourselves instead of trusting the host. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );

    const panel = el.querySelector(".v2-cta");
    if (panel) io.observe(panel);

    /* headline/body/actions ride on the panel's reveal, but a label or
       lede passed in as children carries its own opacity:0 */
    el.querySelectorAll(".v2-cta .v2-label, .v2-cta .v2-lede")
      .forEach((node) => io.observe(node));

    return () => io.disconnect();
  }, [children]);

  return (
    <section className={`v2-section v2-cta-shell ${className}`.trim()} ref={ref}>
      <div className="v2-cta">
        {children}
      </div>
      <aside className="v2-cta-visual">
        <CtaVisual />
      </aside>
    </section>
  );
}
