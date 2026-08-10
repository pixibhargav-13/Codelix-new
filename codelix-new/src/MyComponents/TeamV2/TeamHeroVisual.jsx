import React from "react";
import "./TeamHeroVisual.css";

export default function TeamHeroVisual() {
  return (
    <div className="team-workspace-container">
      {/* Ambient background glow */}
      <div className="workspace-glow"></div>

      <div className="workspace-assembly">
        
        {/* The Design / UI Window (Founder 1) */}
        <div className="founder-window design-window">
          <div className="window-header">
            <div className="mac-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="window-title">ui_architecture.fig</div>
          </div>
          <div className="window-body design-body">
            {/* Abstract UI Wireframes */}
            <div className="wire-nav"></div>
            <div className="wire-hero">
              <div className="wire-text-block">
                <div className="wire-line w-80"></div>
                <div className="wire-line w-60"></div>
              </div>
              <div className="wire-image-block"></div>
            </div>
            <div className="wire-grid">
              <div className="wire-card"></div>
              <div className="wire-card"></div>
              <div className="wire-card"></div>
            </div>
            {/* Animated Cursor */}
            <div className="animated-cursor design-cursor">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0096ff" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 2L20 12L11 14L8 22L4 2Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              <span className="cursor-name">Founder 1</span>
            </div>
          </div>
        </div>

        {/* The Code / Engineering Window (Founder 2) */}
        <div className="founder-window code-window">
          <div className="window-header">
            <div className="mac-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="window-title">system_core.tsx</div>
          </div>
          <div className="window-body code-body">
            {/* Abstract Code Lines */}
            <div className="code-line"><span className="keyword">import</span> <span className="variable">&#123; core &#125;</span> <span className="keyword">from</span> <span className="string">'@codelix/engine'</span>;</div>
            <br/>
            <div className="code-line"><span className="keyword">export async function</span> <span className="function">deployProject</span>() &#123;</div>
            <div className="code-line indent">  <span className="keyword">const</span> scope = <span className="keyword">await</span> <span className="function">analyze</span>();</div>
            <div className="code-line indent">  <span className="keyword">if</span> (!scope.hasIntermediaries) &#123;</div>
            <div className="code-line indent-2">    <span className="keyword">return</span> <span className="function">executeDirectDelivery</span>();</div>
            <div className="code-line indent">  &#125;</div>
            <div className="code-line">&#125;</div>
            
            {/* Animated Typing Cursor */}
            <div className="typing-cursor"></div>
          </div>
        </div>

        {/* Central "Shipped" Badge connecting them */}
        <div className="ship-badge">
          <div className="ship-glow"></div>
          <span className="ship-icon">⚡</span>
          <span className="ship-text">WE SHIP</span>
        </div>

      </div>
    </div>
  );
}
