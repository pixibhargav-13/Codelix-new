import React from "react";

/* purely decorative abstract vector for the right side of the shared CTA
   section — generic on purpose (tilted orbit rings with glowing nodes,
   atom/orbital style) since this same component sits on ~16 different
   pages with different CTA copy, so it can't reference any specific
   product or project. */
export default function CtaVisual() {
  return (
    <svg
      className="v2-cta-visual-svg"
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ctaOrbitA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(124,155,255,0)" />
          <stop offset="45%" stopColor="rgba(124,155,255,.9)" />
          <stop offset="100%" stopColor="rgba(160,120,240,.15)" />
        </linearGradient>
        <linearGradient id="ctaOrbitB" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(160,120,240,0)" />
          <stop offset="50%" stopColor="rgba(160,120,240,.85)" />
          <stop offset="100%" stopColor="rgba(124,155,255,.1)" />
        </linearGradient>
        <linearGradient id="ctaOrbitC" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(126,224,168,0)" />
          <stop offset="50%" stopColor="rgba(126,224,168,.75)" />
          <stop offset="100%" stopColor="rgba(124,155,255,.1)" />
        </linearGradient>
        <radialGradient id="ctaCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,.95)" />
          <stop offset="35%" stopColor="rgba(124,155,255,.7)" />
          <stop offset="100%" stopColor="rgba(124,155,255,0)" />
        </radialGradient>
        <radialGradient id="ctaAmbientGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(124,155,255,.22)" />
          <stop offset="100%" stopColor="rgba(124,155,255,0)" />
        </radialGradient>
        <filter id="ctaSoftBlur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ambient backdrop */}
      <circle cx="180" cy="180" r="168" fill="url(#ctaAmbientGlow)" />

      {/* faint scattered background stars */}
      <circle cx="52" cy="90" r="1.6" fill="rgba(255,255,255,.35)" />
      <circle cx="308" cy="120" r="1.4" fill="rgba(255,255,255,.3)" />
      <circle cx="66" cy="270" r="1.4" fill="rgba(255,255,255,.3)" />
      <circle cx="300" cy="280" r="1.8" fill="rgba(255,255,255,.35)" />
      <circle cx="180" cy="24" r="1.4" fill="rgba(255,255,255,.3)" />

      {/* three tilted orbit rings, atom-style */}
      <ellipse cx="180" cy="180" rx="150" ry="58" stroke="url(#ctaOrbitA)" strokeWidth="1.4"
        transform="rotate(-24 180 180)" />
      <ellipse cx="180" cy="180" rx="150" ry="58" stroke="url(#ctaOrbitB)" strokeWidth="1.4"
        transform="rotate(48 180 180)" />
      <ellipse cx="180" cy="180" rx="150" ry="58" stroke="url(#ctaOrbitC)" strokeWidth="1.2"
        strokeDasharray="2 7" transform="rotate(96 180 180)" />

      {/* glowing core */}
      <circle cx="180" cy="180" r="26" fill="url(#ctaCoreGlow)" filter="url(#ctaSoftBlur)" opacity=".8" />
      <circle cx="180" cy="180" r="9" fill="#fff" />
      <circle cx="180" cy="180" r="9" fill="url(#ctaCoreGlow)" />

      {/* traveling nodes, one per orbit, with a soft glow halo behind each */}
      <g transform="rotate(-24 180 180)">
        <circle cx="330" cy="180" r="10" fill="rgba(124,155,255,.5)" filter="url(#ctaSoftBlur)" />
        <circle cx="330" cy="180" r="5" fill="#fff" />
      </g>
      <g transform="rotate(48 180 180)">
        <circle cx="30" cy="180" r="9" fill="rgba(160,120,240,.5)" filter="url(#ctaSoftBlur)" />
        <circle cx="30" cy="180" r="4.5" fill="rgba(230,220,255,.95)" />
      </g>
      <g transform="rotate(96 180 180)">
        <circle cx="180" cy="122" r="7" fill="rgba(126,224,168,.5)" filter="url(#ctaSoftBlur)" />
        <circle cx="180" cy="122" r="3.5" fill="rgba(210,255,230,.95)" />
      </g>
    </svg>
  );
}
