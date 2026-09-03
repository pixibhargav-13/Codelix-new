import React from 'react';
import './CareersHeroVisual.css';
import { GitPullRequest, GitMerge, Terminal } from 'lucide-react';

export default function CareersHeroVisual() {
  return (
    <div className="chv-container">
      {/* Background Glow */}
      <div className="chv-glow-bg"></div>

      {/* The main Collaboration UI Window */}
      <div className="chv-ui-window">
        {/* Window Header */}
        <div className="chv-header">
          <div className="chv-repo-path">
            <Terminal size={14} />
            <span>codelix / client-project / </span>
            <span className="chv-highlight">pulls</span>
          </div>
          <div className="chv-pr-status">
            <GitPullRequest size={14} />
            Open
          </div>
        </div>

        {/* Window Body */}
        <div className="chv-pr-body">
          <span className="chv-pr-title">Feature: Client Dashboard Launch</span>
          <div className="chv-pr-meta">
            <div className="chv-avatar you">You</div>
            <span className="chv-meta-text">requested review from</span>
            <div className="chv-avatar founder" title="Manas">M</div>
            <div className="chv-avatar founder" title="Kushal">K</div>
          </div>
          
          {/* Code Diff Simulation */}
          <div className="chv-code-diff">
            <div className="chv-diff-line remove">
              <span className="chv-line-num">42</span>
              <span className="chv-line-sym">-</span> 
              <code>{'// TODO: Mock data for now'}</code>
            </div>
            <div className="chv-diff-line add">
              <span className="chv-line-num">42</span>
              <span className="chv-line-sym">+</span> 
              <code>{'await syncLiveClientData(req);'}</code>
            </div>
            <div className="chv-diff-line add">
              <span className="chv-line-num">43</span>
              <span className="chv-line-sym">+</span> 
              <code>{'logger.info("Real data shipped");'}</code>
            </div>
          </div>

          {/* Comment Thread */}
          <div className="chv-comment-thread">
            <div className="chv-comment">
              <div className="chv-avatar founder">M</div>
              <div className="chv-comment-box">
                <p>Great catch on that edge case. Direct feedback applied perfectly. Let's get this live.</p>
              </div>
            </div>
            
            {/* CI/CD Status Checks */}
            <div className="chv-ci-checks">
              <div className="chv-check-line">
                <div className="chv-check-icon success">✓</div>
                <span><strong>Tests passing</strong> (95% coverage)</span>
              </div>
              <div className="chv-check-line">
                <div className="chv-check-icon success">✓</div>
                <span><strong>Build successful</strong> (Vercel)</span>
              </div>
            </div>

            <div className="chv-merge-action">
              <div className="chv-merge-icon">
                <GitMerge size={14} />
              </div>
              <div className="chv-merge-text">
                <strong>Manas</strong> merged into <span>production</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements (Hand-crafted details) */}
      <div className="chv-float-badge badge-1">
        <span>No middle-managers</span>
      </div>
      
      <div className="chv-float-badge badge-2">
        <div className="pulse-green"></div>
        <span>Shipping daily</span>
      </div>

    </div>
  );
}
