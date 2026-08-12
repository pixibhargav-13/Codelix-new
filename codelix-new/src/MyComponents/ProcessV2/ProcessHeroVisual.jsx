import React, { useEffect, useState } from "react";
import "./ProcessHeroVisual.css";
import { MessageSquare, LayoutGrid, PenTool, Code2, Rocket, LifeBuoy } from "lucide-react";

export default function ProcessHeroVisual() {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Helper to check if step is done or current
  const getNodeClass = (stepNum) => {
    if (activeStep === stepNum) return "current";
    if (activeStep > stepNum) return "done";
    return "";
  };

  return (
    <div className="process-flow-container">
      {/* Central big glow */}
      <div className="flow-glow"></div>

      <div className="flowchart-board">

        {/* 1. MESSAGE */}
        <div className={`ahv-card c1 ${getNodeClass(1)}`}>
           <div className="ahc-card-top">
              <MessageSquare size={12} /> <span>01. MESSAGE</span>
           </div>
           <div className="ahc-card-title">Discovery</div>
           <div className="ahc-card-visual wave">
             <span/><span/><span/><span/><span/>
           </div>
           {activeStep === 1 && <div className="node-active-ring"></div>}
        </div>
        
        {/* CONN 1 -> 2 */}
        <div className={`ahv-line h-line l1-2 ${activeStep >= 1 ? "active" : ""}`}>
           {activeStep === 1 && <div className="light-pulse pulse-right"></div>}
        </div>

        {/* 2. SCOPE */}
        <div className={`ahv-card c2 ${getNodeClass(2)}`}>
           <div className="ahc-card-top">
              <LayoutGrid size={12} /> <span>02. SCOPE</span>
           </div>
           <div className="ahc-card-title">Architecture</div>
           <div className="ahc-card-visual boxes">
             <span/><span/><span/>
           </div>
           {activeStep === 2 && <div className="node-active-ring"></div>}
        </div>

        {/* CONN 2 -> 3 */}
        <div className={`ahv-line v-line l2-3 ${activeStep >= 2 ? "active" : ""}`}>
           {activeStep === 2 && <div className="light-pulse pulse-down"></div>}
        </div>

        {/* 3. DESIGN (Reversed Row) */}
        <div className={`ahv-card c3 ${getNodeClass(3)}`}>
           <div className="ahc-card-top">
              <PenTool size={12} /> <span>03. DESIGN</span>
           </div>
           <div className="ahc-card-title">UI / UX</div>
           <div className="ahc-card-visual wireframe">
              <div className="wf-line w-full"></div>
              <div className="wf-line w-half"></div>
           </div>
           {activeStep === 3 && <div className="node-active-ring"></div>}
        </div>

        {/* CONN 3 -> 4 */}
        <div className={`ahv-line h-line l3-4 ${activeStep >= 3 ? "active" : ""}`}>
           {activeStep === 3 && <div className="light-pulse pulse-left"></div>}
        </div>

        {/* 4. BUILD */}
        <div className={`ahv-card c4 ${getNodeClass(4)}`}>
           <div className="ahc-card-top">
              <Code2 size={12} /> <span>04. BUILD</span>
           </div>
           <div className="ahc-card-title">Engineering</div>
           <div className="ahc-card-visual code-text">
             <div>compile...</div>
             <div className="text-gray">OK</div>
           </div>
           {activeStep === 4 && <div className="node-active-ring"></div>}
        </div>

        {/* CONN 4 -> 5 */}
        <div className={`ahv-line v-line l4-5 ${activeStep >= 4 ? "active" : ""}`}>
           {activeStep === 4 && <div className="light-pulse pulse-down"></div>}
        </div>

        {/* 5. LAUNCH */}
        <div className={`ahv-card c5 ${getNodeClass(5)}`}>
           <div className="ahc-card-top">
              <Rocket size={12} /> <span>05. LAUNCH</span>
           </div>
           <div className="ahc-card-title">Deployment</div>
           <div className="ahc-card-visual launch-progress">
             <div className="prog-bar"><div className="prog-fill"></div></div>
           </div>
           {activeStep === 5 && <div className="node-active-ring"></div>}
        </div>

        {/* CONN 5 -> 6 */}
        <div className={`ahv-line h-line l5-6 ${activeStep >= 5 ? "active" : ""}`}>
           {activeStep === 5 && <div className="light-pulse pulse-right"></div>}
        </div>

        {/* 6. SUPPORT */}
        <div className={`ahv-card c6 ${getNodeClass(6)}`}>
           <div className="ahc-card-top">
              <LifeBuoy size={12} /> <span>06. SUPPORT</span>
           </div>
           <div className="ahc-card-title">Maintenance</div>
           <div className="ahc-card-visual pulse-dot">
             <div className="dot"></div>
             <div className="dot-label">System Stable</div>
           </div>
           {activeStep === 6 && <div className="node-active-ring"></div>}
        </div>

      </div>
    </div>
  );
}
