import React from "react";
import "./AboutHeroVisual.css";
import { Globe, Smartphone, Sparkles, Terminal } from "lucide-react";

export default function AboutHeroVisual() {
  return (
    <div className="about-studio-container">
      {/* Epic Background Elements */}
      <div className="studio-glow"></div>

      {/* Orbital Rings for scale */}
      <div className="iso-rings">
        <div className="iso-ring r1"></div>
        <div className="iso-ring r2"></div>
      </div>

      <div className="studio-assembly">
        
        {/* Glowing Connection Lines */}
        <div className="connection-line c1"></div>
        <div className="connection-line c2"></div>

        {/* Web Window (Back) */}
        <div className="glass-panel web-window">
          <div className="panel-header">
            <div className="dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="header-title"><Globe size={12} color="#0096ff" /> codelix-web-app</div>
          </div>
          <div className="panel-body">
            <div className="code-line glow-blue"></div>
            <div className="code-line w-75"></div>
            <div className="code-line w-50"></div>
            <div className="code-line w-90 mt-2 glow-purple"></div>
            <div className="code-line w-40"></div>
          </div>
        </div>

        {/* AI Node (Middle Right) */}
        <div className="glass-panel ai-node">
          <div className="ai-pulse"></div>
          <div className="ai-pulse delay"></div>
          <Sparkles size={28} color="#10b981" />
          <div className="ai-text">AI Systems</div>
        </div>

        {/* Mobile Phone (Front Left) */}
        <div className="glass-panel mobile-frame">
          <div className="mobile-speaker"></div>
          <div className="mobile-screen">
            <div className="mobile-header">
              <Smartphone size={16} color="#0096ff" />
              <span>Mobile App</span>
            </div>
            <div className="mobile-content">
              <div className="mobile-card glow-blue"></div>
              <div className="mobile-card"></div>
              <div className="mobile-card glow-green"></div>
            </div>
          </div>
        </div>

        {/* Floating Tags */}
        <div className="studio-tag tag-ownership">
          <Terminal size={14} color="#0096ff" /> Software You Own
        </div>

        <div className="studio-tag tag-team">
          <Sparkles size={14} color="#10b981" /> No Black Boxes
        </div>

      </div>
    </div>
  );
}
