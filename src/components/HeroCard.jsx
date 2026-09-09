import React from 'react';
import { ArrowRight, Sparkles, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';

export default function HeroCard() {
  const { baselineMetrics, setCurrentPage } = useApp();

  const isLower = baselineMetrics.currentDrift <= 0;
  const absDrift = Math.abs(baselineMetrics.currentDrift);

  return (
    <div className="hero-main-card">
      <div>
        <div className="hero-eyebrow">
          <Sparkles size={14} />
          <span>YOU VS YOU · BEHAVIOURAL DRIFT</span>
        </div>

        <h2 className="hero-headline">
          {baselineMetrics.driftScore >= 75
            ? 'Your spending is mostly on track.'
            : 'Slight spending drift detected.'}
        </h2>

        <p className="hero-description">
          You spent {formatINR(baselineMetrics.thisMonthSpent)} this month. That's{' '}
          <strong style={{ color: 'var(--lime-primary)' }}>{absDrift}% {isLower ? 'lower' : 'higher'}</strong> than
          your personal historical baseline.
        </p>
      </div>

      <div className="hero-metrics-row">
        <div className="drift-score-box">
          <div className="drift-score-circle">
            <span>{baselineMetrics.driftScore}</span>
          </div>
          <div className="drift-score-meta">
            <span className="drift-score-label">Drift Score</span>
            <span className="drift-score-status">
              {baselineMetrics.driftScore >= 80 ? 'Optimal Control' : 'Moderate Drift'}
            </span>
          </div>
        </div>

        <button
          className="btn-lime"
          onClick={() => setCurrentPage('spending')}
          style={{ marginLeft: 'auto' }}
        >
          <span>See my patterns</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
