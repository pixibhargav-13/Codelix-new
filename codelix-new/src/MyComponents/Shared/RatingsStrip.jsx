import React from 'react';
import './RatingsStrip.css';

export default function RatingsStrip() {
  return (
    <div className="v2-ratings-container">
      <div className="v2-ratings-inner">
        
        {/* Google */}
        <div className="v2-rating-block">
          <div className="v2-rating-score">4.9</div>
          <div className="v2-rating-logo google-logo">
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
          </div>
        </div>



        <div className="v2-rating-divider"></div>

        {/* Clutch */}
        <div className="v2-rating-block">
          <div className="v2-rating-score">5.0</div>
          <div className="v2-rating-logo clutch-logo">
            Clut<span className="clutch-c">c</span>h
          </div>
        </div>

        <div className="v2-rating-divider"></div>

        {/* GoodFirms */}
        <div className="v2-rating-block">
          <div className="v2-rating-score">5.0</div>
          <div className="v2-rating-logo goodfirms-logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="gf-icon">
              <path fillRule="evenodd" clipRule="evenodd" d="M17.653 2.112H6.346c-2.33 0-4.233 1.89-4.233 4.204v11.368c0 2.314 1.903 4.204 4.233 4.204h11.307c2.33 0 4.233-1.89 4.233-4.204V6.316c0-2.314-1.903-4.204-4.233-4.204zm-8.875 14.53H6.602V7.126h5.811v2.102H8.784v1.892h3.298v1.96H8.784v3.562zm6.208-5.698h-2.181v1.96h2.181v1.96h-2.181v1.602h2.528v2.102h-4.709V7.126h4.709v2.102h-2.528v1.717h2.181v-1.96z" fill="currentColor"/>
            </svg>
            GoodFirms
          </div>
        </div>

      </div>
    </div>
  );
}
