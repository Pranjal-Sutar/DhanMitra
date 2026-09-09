import React, { useState } from 'react';
import { Flame, Sparkles, CheckCircle2, Award, Zap, ArrowRight, Shield, Bot } from 'lucide-react';
import { useApp } from '../context/AppContext';
import RewardsPanel from '../components/RewardsPanel';
import ChallengeCard from '../components/ChallengeCard';
import { generateCustomAIChallenge } from '../services/aiService';

export default function ChallengesPage() {
  const { challenges, startChallenge, addCustomChallenge, userProfile, categoryData } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);

  const topCategory = categoryData && categoryData.length > 0
    ? [...categoryData].sort((a, b) => b.value - a.value)[0]
    : { name: 'Food & Dining', value: 32 };

  // Active challenges currently being tracked
  const activeChallenges = challenges.filter((c) => c.isActive);

  // Available in catalog (not yet activated)
  const availableChallenges = challenges.filter((c) => !c.isActive);

  const handleGenerateAIChallenge = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateCustomAIChallenge({ userProfile, topCategory });
      addCustomChallenge(generated);
    } catch (e) {
      console.error('Failed to generate challenge:', e);
    } finally {
      setIsGenerating(false);
    }
  };

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
          Complete measurable behavioural challenges, earn DhanMitra coins, protect your streak,
          and redirect drift back toward your primary goal.
        </p>
      </div>

      {/* Rewards & Streak Overview Banner */}
      <RewardsPanel />

      {/* Active Habit Challenges Showcase (Stacked dynamically) */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--forest-950)' }}>
              Active Habit Challenges
            </h2>
            <span
              style={{
                fontFamily: 'Space Grotesk',
                fontWeight: 700,
                fontSize: '0.82rem',
                background: 'var(--forest-950)',
                color: 'var(--lime-primary)',
                padding: '2px 8px',
                borderRadius: 9999
              }}
            >
              {activeChallenges.length} Active
            </span>
          </div>

          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              background: 'rgba(124, 58, 237, 0.1)',
              color: 'var(--purple-ai)',
              padding: '3px 10px',
              borderRadius: 9999
            }}
          >
            Live Tracking
          </span>
        </div>

        {/* Stacked Active Challenge Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {activeChallenges.map((ch) => (
            <ChallengeCard key={ch.id} challenge={ch} />
          ))}
        </div>
      </div>

      {/* Available Challenges Catalog */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--forest-950)', marginBottom: 4 }}>
              Available Challenges Catalog
            </h2>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Select any challenge to add it to your active list or generate a new one with AI
            </span>
          </div>

          {/* AI Generator Action Button */}
          <button
            className="btn-lime"
            onClick={handleGenerateAIChallenge}
            disabled={isGenerating}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 18px',
              fontSize: '0.85rem',
              boxShadow: '0 4px 12px rgba(185, 243, 106, 0.25)'
            }}
            title="Generate personalized micro-challenge with DhanMitra AI Coach"
          >
            <Sparkles size={16} style={{ animation: isGenerating ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isGenerating ? 'AI Generating Challenge...' : '✨ Generate AI Habit Challenge'}</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {availableChallenges.map((item) => (
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
                      fontSize: '0.85rem',
                      padding: '8px 0'
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Completed & Claimed</span>
                  </div>
                ) : (
                  <button
                    className="btn-lime"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => startChallenge(item.id)}
                    title="Click to start and add to active challenges"
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
