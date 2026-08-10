import React from "react";
import "./ProcessHeroVisual.css";
import { MessageSquare, PenTool, Code, Rocket } from "lucide-react";

export default function ProcessHeroVisual() {
  return (
    <div className="process-visual-container">
      {/* Ambient background glow */}
      <div className="process-glow"></div>

      <div className="process-assembly">
        {/* The Central Axis (The Pipeline) */}
        <div className="pipeline-core">
          <div className="pipeline-beam"></div>
          <div className="pipeline-pulse"></div>
        </div>

        {/* Stage 1: Message */}
        <div className="stage-layer layer-1">
          <div className="layer-glass">
            <div className="layer-ring"></div>
            <MessageSquare size={16} className="layer-icon" />
            <span className="layer-label">Message</span>
          </div>
        </div>

        {/* Stage 2: Scope & Design */}
        <div className="stage-layer layer-2">
          <div className="layer-glass">
            <div className="layer-ring"></div>
            <PenTool size={16} className="layer-icon" />
            <span className="layer-label">Scope</span>
          </div>
        </div>

        {/* Stage 3: Build */}
        <div className="stage-layer layer-3">
          <div className="layer-glass">
            <div className="layer-ring"></div>
            <Code size={16} className="layer-icon" />
            <span className="layer-label">Build</span>
          </div>
        </div>

        {/* Stage 4: Launch */}
        <div className="stage-layer layer-4">
          <div className="layer-glass">
            <div className="layer-ring"></div>
            <Rocket size={16} className="layer-icon" />
            <span className="layer-label">Launch</span>
          </div>
        </div>

      </div>
    </div>
  );
}
