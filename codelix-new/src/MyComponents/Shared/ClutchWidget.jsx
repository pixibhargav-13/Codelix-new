import React, { useEffect, useRef } from 'react';

export default function ClutchWidget({ className = "" }) {
  const innerRef = useRef(null);

  useEffect(() => {
    // the widget's own script only initialises on a document
    // "readystatechange" event, which has already fired by the time this
    // script loads in a client-rendered SPA — so we call its Init() directly
    const initClutch = () => {
      if (window.CLUTCHCO && typeof window.CLUTCHCO.Init === "function") {
        window.CLUTCHCO.Init();
      }
    };

    const existing = document.getElementById('clutch-widget-script');
    if (existing) {
      initClutch();
    } else {
      const script = document.createElement('script');
      script.id = 'clutch-widget-script';
      script.type = 'text/javascript';
      script.src = 'https://widget.clutch.co/static/js/widget.js';
      script.async = true;
      script.onload = initClutch;
      document.body.appendChild(script);
    }

    // Clutch's iframe ships at a fixed, oversized natural size that also
    // varies run to run and resizes in several steps as it loads — instead
    // of forcing it into a preset box (which clips whenever the box guesses
    // wrong), shrink it by a fixed factor and size the box to match the
    // *scaled* content exactly, so it's always fully visible.
    const el = innerRef.current;
    const wrapper = el?.parentElement;
    if (!el || !wrapper) return;

    const SCALE = 0.62;

    const fit = () => {
      const naturalW = el.scrollWidth || el.offsetWidth;
      const naturalH = el.scrollHeight || el.offsetHeight;
      if (!naturalW || !naturalH) return;
      el.style.transform = `translate(-50%, -50%) scale(${SCALE})`;
      // pad the box a little beyond the scaled content so the rounded
      // corners don't clip text that sits flush against the edge
      wrapper.style.width = `${Math.round(naturalW * SCALE) + 14}px`;
      wrapper.style.height = `${Math.round(naturalH * SCALE) + 10}px`;
    };

    const ro = new ResizeObserver(fit);
    ro.observe(el);
    fit();

    return () => ro.disconnect();
  }, []);

  return (
    <div className={`v2-clutch-widget ${className}`.trim()}>
      <div className="v2-clutch-widget-inner" ref={innerRef}>
        <div
          className="clutch-widget"
          data-url="https://widget.clutch.co"
          data-widget-type="2"
          data-height="45"
          data-nofollow="false"
          data-expandifr="true"
          data-clutchcompany-id="2624895"
        />
      </div>
    </div>
  );
}
