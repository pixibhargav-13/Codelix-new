import React, { useEffect, useState } from 'react';
import './FaqHeroVisual.css';
import { Search, Database, Layers } from 'lucide-react';

export default function FaqHeroVisual() {
  const [activeCube, setActiveCube] = useState(4);

  // Randomly highlight different cubes to simulate "searching" or "querying" the knowledge base
  useEffect(() => {
    const interval = setInterval(() => {
      const nextCube = Math.floor(Math.random() * 9) + 1;
      setActiveCube(nextCube);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fhv-container">
      {/* Background ambient glow */}
      <div className="fhv-glow-bg"></div>

      {/* The 3D Knowledge Matrix Scene */}
      <div className="fhv-matrix-scene">
        <div className="fhv-grid-base"></div>
        
        {/* 3x3 Grid of Data Cubes */}
        {Array.from({ length: 9 }).map((_, i) => {
          const id = i + 1;
          const isActive = activeCube === id;
          return (
            <div key={id} className={`fhv-cube cube-${id} ${isActive ? 'is-active' : ''}`}>
              <div className="fhv-face top">
                {isActive && <div className="cube-glow"></div>}
              </div>
              <div className="fhv-face left"></div>
              <div className="fhv-face right"></div>
              <div className="fhv-shadow"></div>
            </div>
          );
        })}

        {/* Scanning Search Ring */}
        <div className="fhv-scan-ring"></div>
      </div>

      {/* Holographic Status Panels */}
      <div className="fhv-holo-panel panel-top">
        <div className="panel-icon"><Search size={12} /></div>
        <div className="panel-text">
          <strong>Querying Index</strong>
          <span>Real-time semantic search</span>
        </div>
      </div>

      <div className="fhv-holo-panel panel-bottom">
        <div className="panel-icon"><Layers size={12} /></div>
        <div className="panel-text">
          <strong>Knowledge Base</strong>
          <span>100% Synced & Verified</span>
        </div>
      </div>
    </div>
  );
}
