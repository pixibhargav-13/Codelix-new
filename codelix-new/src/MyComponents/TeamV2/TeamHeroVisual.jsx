import React, { useEffect, useRef } from "react";
import "./TeamHeroVisual.css";

/* ─── Team Command Center ───
   An extraordinary hero visual: a glowing orbital system with the
   founders at the center, circled by animated stat-cards, floating
   particles, and a pulsing energy ring. Feels like a mission-control
   dashboard from a sci-fi film. */

const STATS = [
  { value: "40+", label: "Projects shipped" },
  { value: "11", label: "Industries served" },
  { value: "2", label: "Founders — zero layers" },
  { value: "24h", label: "Response time" },
];

export default function TeamHeroVisual() {
  const containerRef = useRef(null);

  /* Parallax tilt on mouse move — subtle, premium feel */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      el.style.setProperty("--mx", dx.toFixed(3));
      el.style.setProperty("--my", dy.toFixed(3));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="thv-container" ref={containerRef}>
      {/* Ambient glow layers */}
      <div className="thv-glow thv-glow--1" aria-hidden="true" />
      <div className="thv-glow thv-glow--2" aria-hidden="true" />

      {/* Orbital rings */}
      <div className="thv-orbit thv-orbit--1" aria-hidden="true">
        <span className="thv-orbit-dot" />
      </div>
      <div className="thv-orbit thv-orbit--2" aria-hidden="true">
        <span className="thv-orbit-dot" />
      </div>
      <div className="thv-orbit thv-orbit--3" aria-hidden="true">
        <span className="thv-orbit-dot" />
      </div>

      {/* Floating particles */}
      <div className="thv-particles" aria-hidden="true">
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={i}
            className="thv-particle"
            style={{
              "--p-x": `${10 + Math.random() * 80}%`,
              "--p-y": `${10 + Math.random() * 80}%`,
              "--p-delay": `${Math.random() * 6}s`,
              "--p-dur": `${3 + Math.random() * 4}s`,
              "--p-size": `${2 + Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      {/* Central core — pulsing energy hub */}
      <div className="thv-core">
        <div className="thv-core-ring thv-core-ring--outer" />
        <div className="thv-core-ring thv-core-ring--mid" />
        <div className="thv-core-ring thv-core-ring--inner" />
        <div className="thv-core-label">
          <span className="thv-core-icon">⚡</span>
          <span className="thv-core-text">DIRECT<br />ACCESS</span>
        </div>
      </div>

      {/* Glassmorphic stat cards — orbiting */}
      <div className="thv-stats">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="thv-stat-card"
            style={{ "--card-i": i, "--card-total": STATS.length }}
          >
            <span className="thv-stat-value">{s.value}</span>
            <span className="thv-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Corner accents — tech grid lines */}
      <svg className="thv-grid-lines" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        {/* top-left corner bracket */}
        <path d="M2,40 L2,2 L40,2" stroke="rgba(79,178,255,.25)" strokeWidth="1" />
        {/* top-right corner bracket */}
        <path d="M360,2 L398,2 L398,40" stroke="rgba(168,107,255,.25)" strokeWidth="1" />
        {/* bottom-left corner bracket */}
        <path d="M2,360 L2,398 L40,398" stroke="rgba(168,107,255,.25)" strokeWidth="1" />
        {/* bottom-right corner bracket */}
        <path d="M360,398 L398,398 L398,360" stroke="rgba(79,178,255,.25)" strokeWidth="1" />
        {/* Cross-hair lines through center */}
        <line x1="200" y1="0" x2="200" y2="400" stroke="rgba(255,255,255,.03)" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,255,255,.03)" strokeWidth="1" strokeDasharray="4 8" />
      </svg>

      {/* Bottom tag */}
      <span className="thv-tag">FOUNDER-LED · NO MIDDLEMEN · FULL TRANSPARENCY</span>
    </div>
  );
}
