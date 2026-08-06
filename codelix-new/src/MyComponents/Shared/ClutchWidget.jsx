import React, { useEffect, useRef } from 'react';

export default function ClutchWidget({ className = "" }) {
  const innerRef = useRef(null);

  useEffect(() => {
    let checkInterval;
    
    const initClutch = () => {
      if (window.CLUTCHCO && typeof window.CLUTCHCO.Init === "function") {
        const widgetDiv = innerRef.current?.querySelector('.clutch-widget');
        if (widgetDiv && !widgetDiv.querySelector('iframe')) {
          window.CLUTCHCO.Init();
        } else if (widgetDiv && widgetDiv.querySelector('iframe')) {
          // If iframe is already injected, stop checking
          clearInterval(checkInterval);
        }
      }
    };

    const existing = document.getElementById('clutch-widget-script');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'clutch-widget-script';
      script.type = 'text/javascript';
      script.src = 'https://widget.clutch.co/static/js/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Repeatedly try to initialize the widget until the iframe appears
    checkInterval = setInterval(initClutch, 500);
    
    // Fallback: stop checking after 10 seconds to prevent infinite polling
    const timeoutId = setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);

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
          data-widget-type="1"
          data-height="40"
          data-nofollow="false"
          data-expandifr="true"
          data-scale="100"
          data-clutchcompany-id="2624895"
        />
      </div>
    </div>
  );
}
