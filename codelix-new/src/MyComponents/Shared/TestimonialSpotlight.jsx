import React, { useEffect, useState } from "react";

/* the Homepage's "Client Voices" testimonial section (v2-quote-head /
   v2-quote-spotlight / v2-quote-dots / v2-quote-marquee), extracted so
   every v2 page that shows testimonials renders the exact same design
   instead of the older bare sd2-quote figure. All classes/animations
   are already defined globally in HomepageV2.css. */
export default function TestimonialSpotlight({ testimonials, label = "Client Voices", heading, stats = [] }) {
  const [activeQuote, setActiveQuote] = useState(0);
  const [quotePaused, setQuotePaused] = useState(false);

  useEffect(() => {
    if (quotePaused || testimonials.length < 2) return;
    const t = setTimeout(() => {
      setActiveQuote((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearTimeout(t);
  }, [activeQuote, quotePaused, testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section className="v2-section v2-section--gallery" id="testimonials">
      <div className="v2-quote-head">
        <div>
          <p className="v2-label">{label}</p>
          <h2 className="v2-heading">{heading}</h2>
        </div>
        {stats.length > 0 && (
          <div className="v2-quote-stats">
            {stats.map((s) => (
              <div className="v2-quote-stat" key={s.label}>
                <span className="v2-quote-stat-num">{s.num}</span>
                <span className="v2-quote-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className="v2-quote-spotlight"
        onMouseEnter={() => setQuotePaused(true)}
        onMouseLeave={() => setQuotePaused(false)}
      >
        <span className="v2-quote-spotlight-mark" aria-hidden="true">&ldquo;</span>

        <div className="v2-quote-spotlight-stage">
          {testimonials.map((t, i) => (
            <blockquote
              key={`${t.name}-${i}`}
              className={`v2-quote-spotlight-item ${activeQuote === i ? "is-active" : ""}`}
            >
              <p>{t.quote}</p>
              <footer>
                <span className="v2-quote-spotlight-name">{t.name}</span>
                <span className="v2-quote-spotlight-role">{t.position}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        {testimonials.length > 1 && (
          <div className="v2-quote-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`v2-quote-dot ${activeQuote === i ? "is-active" : ""}`}
                onClick={() => setActiveQuote(i)}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {testimonials.length > 1 && (
        <div className="v2-quote-marquee">
          <div className="v2-quote-marquee-track">
            {[...testimonials, ...testimonials].map((t, i) => (
              <button
                type="button"
                key={i}
                className={`v2-quote-marquee-item ${activeQuote === i % testimonials.length ? "is-active" : ""}`}
                onClick={() => setActiveQuote(i % testimonials.length)}
              >
                <span className="v2-quote-marquee-dot" aria-hidden="true" />
                {t.name}
                <span className="v2-quote-marquee-role">— {t.position}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
