import React from 'react';
import { Target, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';

export default function GoalCard() {
  const { userProfile, setCurrentPage } = useApp();

  const progress = Math.min(
    100,
    Math.round((userProfile.currentSavings / (userProfile.goalAmount || 1)) * 100)
  );

  return (
    <div className="hero-goal-card">
      <div>
        <div className="goal-card-top">
          <div>
            <span className="goal-target-badge">{userProfile.goalName}</span>
            <div className="goal-amount-display">{formatINR(userProfile.goalAmount)}</div>
            <div className="goal-subtext">Target savings milestone</div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'var(--mint-soft)',
              color: 'var(--forest-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Target size={22} />
          </div>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="progress-labels">
          <span>{progress}% achieved</span>
          <span>{formatINR(userProfile.currentSavings)} saved</span>
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <button
          className="btn-outline"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => setCurrentPage('goals')}
        >
          <span>View Goal</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}
