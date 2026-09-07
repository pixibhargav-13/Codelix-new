import React from 'react';
import './TechHeroVisual.css';
import { Database, Server, MonitorSmartphone } from 'lucide-react';

export default function TechHeroVisual() {
  return (
    <div className="thv-container">
      <div className="thv-ambient-glow"></div>

      <div className="thv-cards-stack">
        
        {/* Connection Line */}
        <div className="thv-connection-line">
          <div className="thv-pulse-dot"></div>
        </div>

        {/* Top Card: Frontend */}
        <div className="thv-glass-card card-front">
          <div className="thv-card-icon glow-blue">
            <MonitorSmartphone size={22} color="#0096ff" />
          </div>
          <div className="thv-card-text">
            <span className="thv-card-name">Frontend & Mobile</span>
            <p>React, Next.js, Vue, Tailwind</p>
          </div>
          <div className="thv-mini-bar-group">
            <div className="thv-mini-bar b1 blue"></div>
            <div className="thv-mini-bar b2 blue"></div>
          </div>
        </div>

        {/* Middle Card: Backend */}
        <div className="thv-glass-card card-mid">
          <div className="thv-card-icon glow-purple">
            <Server size={22} color="#8a2be2" />
          </div>
          <div className="thv-card-text">
            <span className="thv-card-name">Backend & APIs</span>
            <p>Node.js, Python, Laravel, Java</p>
          </div>
          <div className="thv-mini-bar-group">
            <div className="thv-mini-bar b1 purple"></div>
            <div className="thv-mini-bar b2 purple"></div>
            <div className="thv-mini-bar b3 purple"></div>
          </div>
        </div>

        {/* Bottom Card: Database & Infra */}
        <div className="thv-glass-card card-bot">
          <div className="thv-card-icon glow-green">
            <Database size={22} color="#10b981" />
          </div>
          <div className="thv-card-text">
            <span className="thv-card-name">Data & Cloud</span>
            <p>PostgreSQL, Docker, AWS</p>
          </div>
          <div className="thv-mini-bar-group">
            <div className="thv-mini-bar b1 green"></div>
            <div className="thv-mini-bar b2 green"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
