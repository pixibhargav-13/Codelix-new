import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ServicesHeroVisual.css";

const ServicesHeroVisual = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial entrance
      tl.fromTo(containerRef.current,
        { opacity: 0, x: 60, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 1.4, ease: "expo.out" }
      );

      // Continuous slow float for the main panel
      gsap.to(".shv-main-panel", {
        y: -12,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Floating widgets with offset timings
      gsap.to(".shv-widget-1", { y: 15, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".shv-widget-2", { y: -10, duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

      // Simulate code typing or blinking cursor
      gsap.to(".shv-cursor", { opacity: 0, duration: 0.6, repeat: -1, yoyo: true, ease: "steps(1)" });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="shv-container" ref={containerRef}>
      
      {/* Background Glow */}
      <div className="shv-glow"></div>

      {/* Main IDE / Architecture Panel */}
      <div className="shv-main-panel">
        <div className="shv-header">
          <div className="shv-dots">
            <span className="shv-dot close" />
            <span className="shv-dot min" />
            <span className="shv-dot max" />
          </div>
          <div className="shv-tabs">
            <div className="shv-tab active">services.config.ts</div>
            <div className="shv-tab">deploy.yml</div>
          </div>
        </div>

        <div className="shv-body">
          <div className="shv-sidebar">
            <div className="shv-sb-item active" />
            <div className="shv-sb-item" />
            <div className="shv-sb-item" />
            <div className="shv-sb-item" />
          </div>
          
          <div className="shv-content">
            <div className="shv-code-line">
              <span className="shv-kw">import</span> {`{`} Codelix {`}`} <span className="shv-kw">from</span> <span className="shv-str">"@core/services"</span>;
            </div>
            <div className="shv-code-line mt-2">
              <span className="shv-kw">const</span> <span className="shv-var">activeServices</span> = [
            </div>
            <div className="shv-code-line indent">
              <span className="shv-str">"Web Development"</span>,
            </div>
            <div className="shv-code-line indent">
              <span className="shv-str">"Application Development"</span>,
            </div>
            <div className="shv-code-line indent">
              <span className="shv-str">"UI/UX & Product Design"</span>,
            </div>
            <div className="shv-code-line indent">
              <span className="shv-str">"E-Commerce Solutions"</span>,
            </div>
            <div className="shv-code-line indent">
              <span className="shv-str">"Enterprise Software Solutions"</span>,
            </div>
            <div className="shv-code-line indent">
              <span className="shv-str">"AI & Automation"</span>,
            </div>
            <div className="shv-code-line indent">
              <span className="shv-str">"Data Analytics & BI"</span>,
            </div>
            <div className="shv-code-line indent">
              <span className="shv-str">"Support & Managed Services"</span>
            </div>
            <div className="shv-code-line">
              ];
            </div>
            <div className="shv-code-line mt-4">
              <span className="shv-class">Codelix</span>.<span className="shv-fn">deploy</span>(<span className="shv-var">activeServices</span>).<span className="shv-fn">then</span>(() {`=>`} {`{`}
            </div>
            <div className="shv-code-line indent">
              <span className="shv-class">Console</span>.<span className="shv-fn">log</span>(<span className="shv-str">"All 8 services online."</span>);<span className="shv-cursor">_</span>
            </div>
            <div className="shv-code-line">
              {`}`});
            </div>
          </div>
        </div>
      </div>

      {/* Widget 1: Analytics Ring (Top Right) */}
      <div className="shv-widget shv-widget-1">
        <div className="shv-widget-header">
          <span>System Health</span>
          <div className="shv-status-dot pulse" />
        </div>
        <div className="shv-widget-body">
          <div className="shv-ring-container">
            <svg viewBox="0 0 36 36" className="shv-ring-svg">
              <path className="shv-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="shv-ring-fill" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="shv-ring-text">92%</div>
          </div>
          <div className="shv-widget-stats">
            <div className="shv-stat">
              <div className="shv-stat-val">12ms</div>
              <div className="shv-stat-lbl">Latency</div>
            </div>
            <div className="shv-stat">
              <div className="shv-stat-val">99.9%</div>
              <div className="shv-stat-lbl">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Widget 2: Deployment Status (Bottom Left) */}
      <div className="shv-widget shv-widget-2">
        <div className="shv-widget-row">
          <div className="shv-icon-box bg-blue">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div className="shv-w2-text">
            <strong>Deployment Successful</strong>
            <span>production-v2.1.0 — 2m ago</span>
          </div>
        </div>
        <div className="shv-widget-row">
          <div className="shv-icon-box bg-purple">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </div>
          <div className="shv-w2-text">
            <strong>All tests passed</strong>
            <span>482 tests, 0 failures</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ServicesHeroVisual;
