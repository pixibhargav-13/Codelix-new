import React, { useEffect } from 'react';

export default function GoodfirmsWidget({ className = "" }) {
  useEffect(() => {
    const initializeGoodfirms = () => {
      if (window.GOODFIRMS && typeof window.GOODFIRMS.Init === 'function') {
        window.GOODFIRMS.Init();
      }
    };

    let script = document.querySelector('script[src="https://assets.goodfirms.co/assets/js/widget.min.js"]');
    
    if (!script) {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = "https://assets.goodfirms.co/assets/js/widget.min.js";
      script.async = true;
      script.onload = initializeGoodfirms;
      document.body.appendChild(script);
    } else {
      initializeGoodfirms();
    }
  }, []);

  return (
    <div className={`v2-goodfirms-widget-container ${className}`.trim()}>
      <div 
        className="goodfirm-widget" 
        data-widget-type="goodfirms-widget-t9" 
        data-widget-pattern="horizontal-inline" 
        data-height="61" 
        data-company-id="210452"
      ></div>
    </div>
  );
}
