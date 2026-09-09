import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, RefreshCw, Bot } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateCoachingInsight, generateCustomAIChallenge } from '../services/aiService';

export default function AIInsight() {
  const { setCurrentPage, userProfile, baselineMetrics, categoryData, addCustomChallenge } = useApp();
  
  const [insight, setInsight] = useState({
    title: 'Your food spending spikes on busy weekdays.',
    desc: `You're averaging ₹460 on weekday delivery, compared with ₹290 on your normal days. A ₹200 weekday cap could save roughly ₹3,400/month towards your ${userProfile.goalName || 'Emergency Fund'}.`,
    isLive: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);

  const topCategory = categoryData && categoryData.length > 0
    ? [...categoryData].sort((a, b) => b.value - a.value)[0]
    : { name: 'Food & Dining', value: 32 };

  const fetchInsight = async () => {
    setIsLoading(true);
    try {
      const res = await generateCoachingInsight({
        userProfile,
        baselineMetrics,
        topCategory
      });
      setInsight(res);
    } catch (e) {
      console.error('Failed to generate insight:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight();
  }, [userProfile.goalName, userProfile.goalAmount]);

  const handleTurnIntoChallenge = async () => {
    setIsCreatingChallenge(true);
    try {
      const customChallenge = await generateCustomAIChallenge({
        userProfile,
        topCategory
      });
      addCustomChallenge(customChallenge);
      setCurrentPage('challenges');
    } catch (e) {
      console.error('Failed to create challenge:', e);
      setCurrentPage('challenges');
    } finally {
      setIsCreatingChallenge(false);
    }
  };

  return (
    <div className="ai-insight-card">
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <div className="ai-label-pill">
            <Sparkles size={13} />
            <span>AI PERSONALIZED INSIGHT</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#B9F36A',
                background: 'rgba(185, 243, 106, 0.12)',
                border: '1px solid rgba(185, 243, 106, 0.3)',
                padding: '2px 8px',
                borderRadius: 9999,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}
            >
              <Bot size={11} />
              <span>Behavioral AI Engine</span>
            </span>

            <button
              onClick={fetchInsight}
              disabled={isLoading}
              title="Re-analyze baseline with DhanMitra AI"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: 26,
                height: 26,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <RefreshCw size={13} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
            </button>
          </div>
        </div>

        <h3 className="ai-insight-title" style={{ opacity: isLoading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
          {insight.title}
        </h3>

        <p className="ai-insight-desc" style={{ opacity: isLoading ? 0.6 : 1, transition: 'opacity 0.2s' }}>
          {insight.desc}
        </p>
      </div>

      <button
        className="btn-ai-challenge"
        onClick={handleTurnIntoChallenge}
        disabled={isCreatingChallenge}
        title="Automatically create and activate an AI micro-challenge from this insight"
      >
        <Zap size={16} />
        <span>{isCreatingChallenge ? 'Creating...' : 'Turn this into a challenge'}</span>
        <ArrowRight size={16} />
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
