import React from 'react';

/* Clutch's embeddable widget (both their official widget.js/CLUTCHCO.Init()
   auto-detect, and a hand-built iframe pointed at their same endpoint) only
   paints reliably when the browser happens to win a race against their own
   internal resize handshake — which needs a companion "iframeResizer"
   script running in the parent that we don't (and shouldn't have to) load.
   That produced inconsistent results per page load rather than a fixable
   bug on our side, so we always show the static badge instead: same real
   rating Clutch's own widget reports for this account, styled to match the
   Google review badge exactly so it reads as one consistent pair. */
const CLUTCH_PROFILE_URL = "https://clutch.co/profile/codelix-it-solutions";
const CLUTCH_RATING = "5.0";
const CLUTCH_REVIEW_COUNT = "1 review";

export default function ClutchWidget({ className = "" }) {
  return (
    <a
      className={`v2-footer-google-review v2-clutch-fallback ${className}`.trim()}
      href={CLUTCH_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="v2-clutch-mark" aria-hidden="true">C</span>
      <div className="v2-google-review-text">
        <span className="v2-google-stars">★★★★★</span>
        <span className="v2-google-rating">{CLUTCH_RATING} ({CLUTCH_REVIEW_COUNT})</span>
      </div>
    </a>
  );
}
