import React from 'react';
import { Flame, Sparkles, CheckCircle2, Award, Zap, ArrowRight, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import RewardsPanel from '../components/RewardsPanel';
import ChallengeCard from '../components/ChallengeCard';

export default function ChallengesPage() {
  const { challenges, completeChallenge } = useApp();

  const activeChallenge = challenges.find((c) => c.id === 'challenge-food-delivery') || challenges[0];
  const otherChallenges = challenges.filter((c) => c.id !== activeChallenge.id);

  return (
    <div className="page-body">
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--mint-soft)',
            color: 'var(--forest-800)',
            fontSize: '0.74rem',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 9999,
            marginBottom: 8
          }}
        >
          <Sparkles size={13} />
          <span>MICRO-HABIT ACCELERATOR</span>
        </div>
        <h1 style={{ fontSize: '2rem', color: 'var(--forest-950)', marginBottom: 6 }}>
          Small wins compound.
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 680 }}>
          Complete measurable 7-day behavioural challenges, earn Finly coins, protect your streak,
          and redirect drift back toward your primary goal.
        </p>
      </div>

      {/* Rewards & Streak Overview Banner */}
      <RewardsPanel />

      {/* Active 7-Day Challenge Showcase */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--forest-950)' }}>
            Active 7-Day Habit Challenge
          </h2>
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              background: 'rgba(124, 58, 237, 0.1)',
              color: 'var(--purple-ai)',
              padding: '2px 8px',
              borderRadius: 9999
            }}
          >
            AI Calibrated
          </span>
        </div>

        <ChallengeCard challenge={activeChallenge} />
      </div>

      {/* Other Weekly Challenges Catalog */}
      <div>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--forest-950)', marginBottom: 16 }}>
          Available Challenges Catalog
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {otherChallenges.map((item) => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span className="category-tag">{item.category}</span>
                  <span className="challenge-reward-badge">
                    +{item.rewardCoins} coins
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--forest-950)', marginBottom: 6 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: 14 }}>
                  {item.goal}
                </p>
              </div>

              <div>
                {item.isCompleted ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      color: 'var(--success)',
                      fontWeight: 600,
                      fontSize: '0.85rem'
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Completed & Claimed</span>
                  </div>
                ) : (
                  <button
                    className="btn-outline"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => completeChallenge(item.id)}
                  >
                    <Zap size={15} />
                    <span>Start Challenge (+{item.rewardCoins} coins)</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
