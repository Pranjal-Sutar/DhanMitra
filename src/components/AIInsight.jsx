import React from 'react';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AIInsight() {
  const { setCurrentPage } = useApp();

  const handleTurnIntoChallenge = () => {
    setCurrentPage('challenges');
  };

  return (
    <div className="ai-insight-card">
      <div>
        <div className="ai-label-pill">
          <Sparkles size={13} />
          <span>AI PERSONALIZED INSIGHT</span>
        </div>

        <h3 className="ai-insight-title">Your food spending spikes on busy weekdays.</h3>

        <p className="ai-insight-desc">
          You're averaging <strong>₹460</strong> on weekday delivery, compared with{' '}
          <strong>₹290</strong> on your normal days. A ₹200 weekday cap could save roughly{' '}
          <strong>₹3,400/month</strong> towards your Emergency Fund.
        </p>
      </div>

      <button className="btn-ai-challenge" onClick={handleTurnIntoChallenge}>
        <Zap size={16} />
        <span>Turn this into a challenge</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
