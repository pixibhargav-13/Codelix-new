import React from 'react';
import './PricingHeroVisual.css';
import { FileText, Check, Lock } from 'lucide-react';

/* A project proposal, as the Pricing page describes one: a complexity band
   (COMPLEXITY), scope locked before work starts (Fixed-Scope Project), a free
   discovery call and proposal (FAQ), and payment as a deposit followed by
   milestone instalments (Milestone-Based Billing / FAQ). No prices — the
   page is explicit that there is no public rate card. */
const SCOPE = [
  { item: 'Discovery & written proposal', tag: 'Free', free: true },
  { item: 'Design & build', tag: 'In scope' },
  { item: 'Testing & launch', tag: 'In scope' },
  { item: 'Post-launch support window', tag: 'In scope' },
];

const PAYMENTS = ['Deposit', 'Milestone', 'Milestone', 'Launch'];

export default function PricingHeroVisual() {
  return (
    <div className="phv-container">
      <div className="phv-glow-bg"></div>

      <div className="phv-stage">
        <div className="phv-doc">
          <div className="phv-doc-header">
            <span className="phv-doc-title">
              <FileText size={15} strokeWidth={1.8} />
              Project proposal
            </span>
            <span className="phv-status">
              <Lock size={11} strokeWidth={2.4} />
              Scope locked
            </span>
          </div>

          <div className="phv-doc-body">
            <div className="phv-band">
              <span className="phv-label">Complexity</span>
              <span className="phv-band-value">Standard — Core product / Redesign</span>
            </div>

            <div className="phv-scope">
              <span className="phv-label">Scope</span>
              <ul>
                {SCOPE.map((s) => (
                  <li key={s.item}>
                    <span className="phv-tick"><Check size={11} strokeWidth={3} /></span>
                    <span className="phv-scope-item">{s.item}</span>
                    <span className={`phv-scope-tag${s.free ? ' is-free' : ''}`}>{s.tag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="phv-pay">
              <span className="phv-label">Payment schedule</span>
              <div className="phv-pay-track">
                {PAYMENTS.map((p, i) => (
                  <div className="phv-pay-step" key={i} style={{ '--i': i }}>
                    <span className="phv-pay-bar"><i /></span>
                    <span className="phv-pay-name">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="phv-doc-footer">
            <span>Price locked before work starts</span>
            <span className="phv-dot" />
            <span>No creeping invoices</span>
          </div>
        </div>
      </div>
    </div>
  );
}
