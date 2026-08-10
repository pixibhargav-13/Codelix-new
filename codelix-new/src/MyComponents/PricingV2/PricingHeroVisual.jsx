import React from 'react';
import './PricingHeroVisual.css';
import { Settings2, Database, LayoutTemplate, Smartphone, Plus, Check } from 'lucide-react';

export default function PricingHeroVisual() {
  return (
    <div className="phv-container">
      {/* Background glow to ground the composition */}
      <div className="phv-glow-bg"></div>

      {/* The main Configurator UI Window */}
      <div className="phv-config-window">
        {/* Window Header */}
        <div className="phv-window-header">
          <div className="phv-mac-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="phv-window-title">
            <Settings2 size={13} color="rgba(255,255,255,0.6)" />
            <span>Scope_Estimator_v2.0</span>
          </div>
        </div>

        {/* Window Body */}
        <div className="phv-window-body">
          {/* Sidebar */}
          <div className="phv-config-sidebar">
            <div className="phv-side-item active">
              <LayoutTemplate size={14} />
              <span>Web App</span>
            </div>
            <div className="phv-side-item active">
              <Database size={14} />
              <span>Backend</span>
            </div>
            <div className="phv-side-item">
              <Smartphone size={14} />
              <span>Mobile iOS</span>
            </div>
          </div>

          {/* Main Area */}
          <div className="phv-config-main">
            <div className="phv-module-card added">
              <div className="phv-mod-info">
                <h6>Core Architecture</h6>
                <p>Base platform setup</p>
              </div>
              <div className="phv-mod-check">
                <Check size={14} strokeWidth={3} />
              </div>
            </div>

            <div className="phv-module-card added">
              <div className="phv-mod-info">
                <h6>Payment Gateway</h6>
                <p>Stripe Custom Connect</p>
              </div>
              <div className="phv-mod-check">
                <Check size={14} strokeWidth={3} />
              </div>
            </div>

            <div className="phv-module-card optional">
              <div className="phv-mod-info">
                <h6>AI Assistant</h6>
                <p>LLM Integration</p>
              </div>
              <div className="phv-mod-add">
                <Plus size={14} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

        {/* Window Footer / Total */}
        <div className="phv-window-footer">
          <div className="phv-footer-left">
            <span>Scope Calculation</span>
            <div className="phv-progress-track">
              <div className="phv-progress-fill"></div>
            </div>
          </div>
          <div className="phv-footer-right">
            <div className="phv-calc-value">Fixed Price</div>
          </div>
        </div>
      </div>

      {/* Floating Elements (Hand-crafted details) */}
      <div className="phv-float-tag tag-1">
        <span>No hourly billing</span>
      </div>

      <div className="phv-float-tag tag-2">
        <div className="pulse-dot"></div>
        <span>Scope locked</span>
      </div>
      
      {/* Laser scanline overlay effect for the "tech" feel */}
      <div className="phv-scanline"></div>

    </div>
  );
}
