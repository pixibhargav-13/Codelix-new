import React from 'react';
import './CareersHeroVisual.css';
import {
  Globe, Server, Smartphone, PenTool, Sparkles, Cloud, Database, TestTube, Briefcase, ArrowUpRight,
} from 'lucide-react';

/* The disciplines the page hires for (DISCIPLINES in CareersV2.jsx), as a
   bento grid; a highlight moves from tile to tile. Stacks are the ones the
   page already names for each discipline. */
const TILES = [
  { name: 'Frontend', stack: 'React · Next.js', icon: Globe },
  { name: 'Backend', stack: 'Node · Spring · Laravel', icon: Server },
  { name: 'Mobile', stack: 'Flutter · React Native', icon: Smartphone },
  { feature: true },
  { name: 'Design', stack: 'Figma · UI/UX', icon: PenTool },
  { name: 'AI & Automation', stack: 'n8n · Applied ML', icon: Sparkles },
  { name: 'DevOps & Cloud', stack: 'AWS · Azure · CI/CD', icon: Cloud },
  { name: 'Data', stack: 'BI · Analytics', icon: Database },
  { name: 'QA', stack: 'Automation · Performance', icon: TestTube },
  { name: 'Product', stack: 'Scrum · Product ownership', icon: Briefcase, wide: true },
];

/* position in the highlight cycle (the feature tile is not part of it) */
let cycle = 0;
const GRID = TILES.map((t) => (t.feature ? t : { ...t, i: cycle++ }));

export default function CareersHeroVisual() {
  return (
    <div className="chv-container">
      <div className="chv-glow-bg"></div>

      <div className="chv-stage">
        <div className="chv-ui-window">
          <div className="chv-header">
            <span className="chv-header-title">Careers at Codelix</span>
            <span className="chv-header-meta">Engineering · Design · Product</span>
          </div>

          <div className="chv-grid">
            {GRID.map((t) => {
              if (t.feature) {
                return (
                  <div className="chv-tile chv-tile--feature" key="feature">
                    <span className="chv-feature-title">Build what&apos;s next.</span>
                    <span className="chv-feature-sub">Products used by real businesses, across nine disciplines.</span>
                    <span className="chv-feature-cta">Find your role <ArrowUpRight size={13} /></span>
                  </div>
                );
              }
              const Icon = t.icon;
              return (
                <div className={`chv-tile${t.wide ? ' chv-tile--wide' : ''}`} key={t.name} style={{ '--i': t.i }}>
                  <span className="chv-tile-icon"><Icon size={16} strokeWidth={1.8} /></span>
                  <span className="chv-tile-name">{t.name}</span>
                  <span className="chv-tile-stack">{t.stack}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
