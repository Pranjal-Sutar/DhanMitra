import React from 'react';
import { Flame, Trophy, Coins, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';

export default function RewardsPanel() {
  const { rewards, unlockSimulator, setCurrentPage } = useApp();

  return (
    <div className="rewards-banner">
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Sparkles size={16} style={{ color: 'var(--lime-primary)' }} />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--lime-primary)'
            }}
          >
            Habit Rewards & Streaks
          </span>
        </div>

        <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: 20 }}>
          Small micro-habits, massive compounding.
        </h2>

        <div className="rewards-stats-grid">
          {/* DhanMitra Coins */}
          <div className="reward-stat-item">
            <div className="reward-stat-icon" style={{ background: 'rgba(245, 158, 11, 0.18)', color: '#F59E0B' }}>
              <Coins size={26} />
            </div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                {rewards.coins}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#9FB8AC' }}>DhanMitra Coins</div>
            </div>
          </div>

          {/* Current Streak */}
          <div className="reward-stat-item">
            <div className="reward-stat-icon" style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#EF4444' }}>
              <Flame size={26} />
            </div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                {rewards.streak} Days
              </div>
              <div style={{ fontSize: '0.78rem', color: '#9FB8AC' }}>Current Streak</div>
            </div>
          </div>

          {/* Best Streak */}
          <div className="reward-stat-item">
            <div className="reward-stat-icon" style={{ background: 'rgba(59, 130, 246, 0.18)', color: '#60A5FA' }}>
              <Trophy size={26} />
            </div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                {rewards.bestStreak} Days
              </div>
              <div style={{ fontSize: '0.78rem', color: '#9FB8AC' }}>Personal Record</div>
            </div>
          </div>

          {/* Money Saved */}
          <div className="reward-stat-item">
            <div className="reward-stat-icon" style={{ background: 'rgba(185, 243, 106, 0.18)', color: 'var(--lime-primary)' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'Space Grotesk' }}>₹</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.5rem', fontWeight: 700, color: 'var(--lime-primary)' }}>
                {formatINR(rewards.moneySaved)}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#9FB8AC' }}>Saved via Challenges</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: 36, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
        {rewards.simulatorUnlocked ? (
          <button
            className="btn-lime"
            onClick={() => setCurrentPage('goals')}
            style={{ whiteSpace: 'nowrap' }}
          >
            <span>Goal Planner Unlocked</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            className="btn-lime"
            onClick={unlockSimulator}
            disabled={rewards.coins < 100}
            style={{ whiteSpace: 'nowrap', opacity: rewards.coins < 100 ? 0.6 : 1 }}
          >
            <span>Unlock Premium Goal Planner · 100 coins</span>
            <Sparkles size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
