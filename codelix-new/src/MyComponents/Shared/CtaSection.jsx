import React from 'react';
import './CtaSection.css';
import CtaVisual from './CtaVisual';

export default function CtaSection({ children, className = "" }) {
  return (
    <section className={`v2-section v2-cta-shell ${className}`.trim()}>
      <div className="v2-cta">
        {children}
      </div>
      <aside className="v2-cta-visual">
        <CtaVisual />
      </aside>
    </section>
  );
}
