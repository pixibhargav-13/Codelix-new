import React from "react";
import { ShieldCheck, Database } from "lucide-react";
import "./IndustryHeroVisual.css";

export default function IndustryHeroVisual() {
  return (
    <div className="industry-visual-container">
      {/* Ambient background glow and grid */}
      <div className="stack-glow"></div>
      <div className="ind-bg-grid"></div>

      {/* Orbital Rings */}
      <div className="iso-rings">
        <div className="iso-ring r1"></div>
        <div className="iso-ring r2"></div>
      </div>

      <div className="iso-stack">
        
        {/* Base Layer - Infrastructure */}
        <div className="iso-layer infra">
          <div className="layer-grid">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={`infra-${i}`} className="grid-cell" />
            ))}
          </div>
          <div className="iso-label">Infrastructure</div>
        </div>

        {/* Middle Layer - Compliance */}
        <div className="iso-layer compliance">
          <div className="layer-grid">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={`comp-${i}`} className="grid-cell" />
            ))}
          </div>
          <div className="iso-label">Compliance Layer</div>
        </div>

        {/* Top Layer - Interface/Sector Specific */}
        <div className="iso-layer interface">
          <div className="iso-laser"></div>
          <div className="layer-grid">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={`ui-${i}`} className="grid-cell" />
            ))}
          </div>
          <div className="iso-label">Sector Interface</div>
        </div>

        {/* Connecting Beams with Data Packets */}
        <div className="iso-beam beam-1">
          <div className="data-packet"></div>
        </div>
        <div className="iso-beam beam-2">
          <div className="data-packet"></div>
        </div>
        <div className="iso-beam beam-3">
          <div className="data-packet"></div>
        </div>
        <div className="iso-beam beam-4">
          <div className="data-packet"></div>
        </div>

        {/* Base Shadow */}
        <div className="iso-shadow"></div>
      </div>

      {/* Holographic Floating Panels */}
      <div className="holo-panel left">
        <div className="holo-icon">
          <Database size={14} />
        </div>
        <div className="holo-text">
          <span className="holo-val">CROSS-SECTOR</span>
          <span className="holo-lbl">Data Matrix</span>
        </div>
      </div>

      <div className="holo-panel right">
        <div className="holo-icon">
          <ShieldCheck size={14} />
        </div>
        <div className="holo-text">
          <span className="holo-val">ENCRYPTED</span>
          <span className="holo-lbl">Zero Trust</span>
        </div>
      </div>

    </div>
  );
}
