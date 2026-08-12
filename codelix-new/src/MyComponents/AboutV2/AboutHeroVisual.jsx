import React from "react";
import "./AboutHeroVisual.css";
import { Eye, HeartHandshake, ShieldCheck } from "lucide-react";

export default function AboutHeroVisual() {
  return (
    <div className="ahv-typo-container">
      <div className="ahv-typo-glow"></div>
      
      <div className="ahv-typo-stack">
        <div className="ahv-typo-card delay-1">
          <div className="ahv-icon-wrap icon-blue">
            <Eye size={22} strokeWidth={2} />
          </div>
          <div className="ahv-text-wrap">
            <span className="ahv-title">Transparent</span>
            <span className="ahv-sub">No hidden costs, no surprises.</span>
          </div>
        </div>

        <div className="ahv-typo-card delay-2">
          <div className="ahv-icon-wrap icon-purple">
            <HeartHandshake size={22} strokeWidth={2} />
          </div>
          <div className="ahv-text-wrap">
            <span className="ahv-title">Committed</span>
            <span className="ahv-sub">We own your product’s success.</span>
          </div>
        </div>

        <div className="ahv-typo-card delay-3">
          <div className="ahv-icon-wrap icon-green">
            <ShieldCheck size={22} strokeWidth={2} />
          </div>
          <div className="ahv-text-wrap">
            <span className="ahv-title">Reliable</span>
            <span className="ahv-sub">Scalable architectures built to last.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
