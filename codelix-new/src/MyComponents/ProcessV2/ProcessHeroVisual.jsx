import React, { useEffect, useState } from "react";
import "./ProcessHeroVisual.css";
import { MessageSquare, LayoutTemplate, Code2, Rocket } from "lucide-react";

export default function ProcessHeroVisual() {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="process-flow-container">
      <div className="flow-glow"></div>

      <div className="flowchart-board">

        {/* Connection Lines (Perfectly gapped, no overlap) */}
        <div className={`flow-path path-1-2 ${activeStep >= 1 ? "active" : ""}`}>
          {activeStep === 1 && <div className="light-pulse pulse-right"></div>}
        </div>

        <div className={`flow-path path-2-3 ${activeStep >= 2 ? "active" : ""}`}>
          {activeStep === 2 && <div className="light-pulse pulse-down"></div>}
        </div>

        <div className={`flow-path path-3-4 ${activeStep >= 3 ? "active" : ""}`}>
          {activeStep === 3 && <div className="light-pulse pulse-left"></div>}
        </div>

        {/* --- NODE 1: MESSAGE --- */}
        <div className={`flow-node node-1 ${activeStep === 1 ? "current" : activeStep > 1 ? "done" : ""}`}>
          <div className="node-glass">
            <div className="node-header">
              <div className="node-icon"><MessageSquare size={14} /></div>
              <span className="node-num">01. Message</span>
            </div>
            <div className="node-body">
              <h3 className="node-title">Discovery</h3>
            </div>
            <div className="node-visual">
              <div className="mini-wave w-1"></div>
              <div className="mini-wave w-2"></div>
              <div className="mini-wave w-3"></div>
              <div className="mini-wave w-4"></div>
              <div className="mini-wave w-5"></div>
            </div>
            {activeStep === 1 && <div className="node-active-ring"></div>}
          </div>
        </div>

        {/* --- NODE 2: SCOPE --- */}
        <div className={`flow-node node-2 ${activeStep === 2 ? "current" : activeStep > 2 ? "done" : ""}`}>
          <div className="node-glass">
            <div className="node-header">
              <div className="node-icon"><LayoutTemplate size={14} /></div>
              <span className="node-num">02. Scope</span>
            </div>
            <div className="node-body">
              <h3 className="node-title">Architecture</h3>
            </div>
            <div className="node-visual visual-grid">
              <div className="vg-box"></div>
              <div className="vg-box"></div>
              <div className="vg-box"></div>
            </div>
            {activeStep === 2 && <div className="node-active-ring"></div>}
          </div>
        </div>

        {/* --- NODE 3: BUILD --- */}
        <div className={`flow-node node-3 ${activeStep === 3 ? "current" : activeStep > 3 ? "done" : ""}`}>
          <div className="node-glass">
            <div className="node-header">
              <div className="node-icon"><Code2 size={14} /></div>
              <span className="node-num">03. Build</span>
            </div>
            <div className="node-body">
              <h3 className="node-title">Engineering</h3>
            </div>
            <div className="node-visual visual-term">
              <span className="vt-line"> compile...</span>
              <span className="vt-line success"> OK</span>
            </div>
            {activeStep === 3 && <div className="node-active-ring"></div>}
          </div>
        </div>

        {/* --- NODE 4: LAUNCH --- */}
        <div className={`flow-node node-4 ${activeStep === 4 ? "current" : ""}`}>
          <div className="node-glass">
            <div className="node-header">
              <div className="node-icon"><Rocket size={14} /></div>
              <span className="node-num">04. Launch</span>
            </div>
            <div className="node-body">
              <h3 className="node-title">Deployment</h3>
            </div>
            <div className="node-visual visual-launch">
              <div className="vl-bar">
                <div className="vl-progress"></div>
              </div>
            </div>
            {activeStep === 4 && <div className="node-active-ring"></div>}
          </div>
        </div>

      </div>
    </div>
  );
}
