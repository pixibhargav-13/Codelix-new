import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ClientStrip.css';
import { CLIENT_LOGOS } from '../HomepageV2/clientLogos'; // We will move clientLogos later or just import from there

export default function ClientStrip() {
  const stripRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const tw = gsap.to(trackRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    const wrap = trackRef.current.parentElement;
    const slow = () => gsap.to(tw, { timeScale: 0.25, duration: .6, ease: "power2.out" });
    const norm = () => gsap.to(tw, { timeScale: 1, duration: .6, ease: "power2.out" });
    wrap.addEventListener("mouseenter", slow);
    wrap.addEventListener("mouseleave", norm);
    return () => {
      tw.kill();
      wrap.removeEventListener("mouseenter", slow);
      wrap.removeEventListener("mouseleave", norm);
    };
  }, []);

  return (
    <section className="v2-section v2-client-strip" style={{ paddingTop: 56, paddingBottom: 56, paddingLeft: 0, paddingRight: 0 }}>
      <p className="v2-label" style={{ textAlign: "center", marginBottom: 28 }}>Trusted by 40+ companies</p>
      <div className="v2-strip" ref={stripRef}>
        <div className="v2-strip-track" ref={trackRef}>
          {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, i) => (
            <img key={i} src={logo} alt="" loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
