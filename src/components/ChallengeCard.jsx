import React from 'react';
import { Flame, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ChallengeCard({ challenge, showNavigate = false }) {
  const { completeChallenge, checkInChallengeDay, setCurrentPage } = useApp();

  const activeChallenge = challenge || {
    id: 'challenge-food-delivery',
    title: 'Reduce food deliveries',
    goal: 'Keep delivery spending under ₹1,400 this week.',
    completedDays: 4,
    totalDays: 7,
    rewardCoins: 50,
    isCompleted: false
  };

  const pct = Math.min(
    100,
    Math.round(((activeChallenge.completedDays || 0) / (activeChallenge.totalDays || 1)) * 100)
  );

  return (
    <div className="challenge-card">
      <div>
        <div className="challenge-top-tag">
          <span className="challenge-badge">
            <Flame size={13} style={{ color: '#D97706' }} />
            <span>{activeChallenge.totalDays}-Day Habit Challenge</span>
          </span>

          <span className="challenge-reward-badge">
            <span>+{activeChallenge.rewardCoins}</span>
            <span>🪙 coins</span>
          </span>
        </div>

        <h3 className="challenge-title">{activeChallenge.title}</h3>
        <p className="challenge-goal">{activeChallenge.goal}</p>

        {/* Visual Day Tracker Chips */}
        <div style={{ display: 'flex', gap: 6, margin: '14px 0 14px 0', alignItems: 'center' }}>
          {Array.from({ length: activeChallenge.totalDays }).map((_, i) => {
            const isDone = i < (activeChallenge.completedDays || 0);
            const isCurrent = i === (activeChallenge.completedDays || 0) && !activeChallenge.isCompleted;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 28,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: isDone
                    ? 'var(--forest-950)'
                    : isCurrent
                    ? 'var(--lime-light)'
                    : 'var(--card-subtle)',
                  color: isDone
                    ? 'var(--lime-primary)'
                    : isCurrent
                    ? 'var(--forest-950)'
                    : 'var(--text-muted)',
                  border: isDone
                    ? '1px solid rgba(185, 243, 106, 0.4)'
                    : isCurrent
                    ? '1.5px solid var(--lime-primary)'
                    : '1px solid var(--border-light)',
                  transition: 'all 0.2s ease'
                }}
                title={`Day ${i + 1}: ${isDone ? 'Completed' : isCurrent ? 'Today' : 'Upcoming'}`}
              >
                Day {i + 1} {isDone ? '✓' : ''}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="challenge-progress-bar-wrap">
          <div className="challenge-progress-meta">
            <span>
              {activeChallenge.isCompleted
                ? 'All Days Completed!'
                : `${activeChallenge.completedDays || 0} / ${activeChallenge.totalDays} days on track`}
            </span>
            <span>{activeChallenge.isCompleted ? '100%' : `${pct}%`}</span>
          </div>
          <div className="progress-track" style={{ height: 8, margin: 0 }}>
            <div
              className="progress-fill"
              style={{
                width: `${activeChallenge.isCompleted ? 100 : pct}%`,
                background: activeChallenge.isCompleted
                  ? 'var(--success)'
                  : 'linear-gradient(90deg, #F59E0B, var(--lime-primary))'
              }}
            />
          </div>
        </div>
      </div>

      <div>
        {activeChallenge.isCompleted ? (
          <div
            className="btn-complete-challenge btn-completed-state"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <CheckCircle2 size={18} />
            <span>Challenge Complete! (+{activeChallenge.rewardCoins} coins earned)</span>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            {activeChallenge.completedDays < activeChallenge.totalDays && (
              <button
                className="btn-outline"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.86rem' }}
                onClick={() => checkInChallengeDay(activeChallenge.id)}
                title="Log daily progress and advance +1 day"
              >
                <span>Check-in Day (+1)</span>
              </button>
            )}

            <button
              className="btn-complete-challenge"
              style={{ flex: 1.2 }}
              onClick={() => completeChallenge(activeChallenge.id)}
            >
              <Award size={18} />
              <span>Complete challenge</span>
            </button>
          </div>
        )}

        {showNavigate && (
          <div style={{ marginTop: 10, textAlign: 'center' }}>
            <button
              onClick={() => setCurrentPage('challenges')}
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <span>View all weekly challenges</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
