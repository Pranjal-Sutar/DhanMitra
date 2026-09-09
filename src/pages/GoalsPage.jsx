import React, { useState } from 'react';
import { Target, Sparkles, TrendingUp, Calendar, Zap, CheckCircle2, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR, calculateGoalProjection } from '../utils/calculations';

export default function GoalsPage() {
  const { userProfile, rewards, unlockSimulator } = useApp();

  const [monthlyIncome, setMonthlyIncome] = useState(userProfile.monthlyIncome || 52000);
  const [currentSavings, setCurrentSavings] = useState(userProfile.currentSavings || 42000);
  const [goalAmount, setGoalAmount] = useState(userProfile.goalAmount || 100000);
  const [extraReduction, setExtraReduction] = useState(2000);

  // Dynamic projection calculations
  const projection = calculateGoalProjection(
    monthlyIncome,
    currentSavings,
    goalAmount,
    extraReduction
  );

  return (
    <div className="page-body">
      {/* Header */}
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
          <span>BEHAVIOURAL GOAL ENGINE</span>
        </div>
        <h1 style={{ fontSize: '2rem', color: 'var(--forest-950)', marginBottom: 6 }}>
          Make your goal feel achievable.
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 680 }}>
          Change one behaviour and see how much sooner you could reach your target.
          Simulate real scenarios without cutting out essentials.
        </p>
      </div>

      {/* Simulator Grid */}
      <div className="simulator-grid">
        {/* Left: Interactive Sliders & Inputs */}
        <div className="simulator-input-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--forest-950)' }}>
              Goal & Cash Flow Parameters
            </h2>
            <span
              style={{
                fontSize: '0.78rem',
                background: 'var(--mint-soft)',
                color: 'var(--forest-800)',
                padding: '4px 10px',
                borderRadius: 9999,
                fontWeight: 600
              }}
            >
              {userProfile.goalName}
            </span>
          </div>

          {/* Goal Amount Slider */}
          <div className="slider-group">
            <div className="slider-label-row">
              <span className="slider-label">Target Goal Amount</span>
              <span className="slider-value-badge">{formatINR(goalAmount)}</span>
            </div>
            <input
              type="range"
              className="custom-range-slider"
              min="20000"
              max="500000"
              step="5000"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#8BA89B', marginTop: 4 }}>
              <span>₹20,000</span>
              <span>₹5,00,000</span>
            </div>
          </div>

          {/* Current Savings Slider */}
          <div className="slider-group">
            <div className="slider-label-row">
              <span className="slider-label">Current Savings</span>
              <span className="slider-value-badge">{formatINR(currentSavings)}</span>
            </div>
            <input
              type="range"
              className="custom-range-slider"
              min="0"
              max={goalAmount}
              step="2000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#8BA89B', marginTop: 4 }}>
              <span>₹0</span>
              <span>{formatINR(goalAmount)}</span>
            </div>
          </div>

          {/* Monthly In-Hand Income Slider */}
          <div className="slider-group">
            <div className="slider-label-row">
              <span className="slider-label">Monthly Income</span>
              <span className="slider-value-badge">{formatINR(monthlyIncome)}</span>
            </div>
            <input
              type="range"
              className="custom-range-slider"
              min="25000"
              max="200000"
              step="2500"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            />
          </div>

          {/* Behavioural Change Slider */}
          <div
            style={{
              marginTop: 32,
              padding: 20,
              background: '#F5F9F6',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px dashed #A3CBB5'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Zap size={16} style={{ color: 'var(--forest-800)' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--forest-800)' }}>
                Behavioural Change Variable
              </span>
            </div>

            <div className="slider-label-row">
              <span className="slider-label" style={{ fontWeight: 600 }}>
                Reduce discretionary spending by:
              </span>
              <span
                className="slider-value-badge"
                style={{ background: 'var(--forest-950)', color: 'var(--lime-primary)' }}
              >
                +{formatINR(extraReduction)}/mo
              </span>
            </div>

            <input
              type="range"
              className="custom-range-slider"
              min="0"
              max="10000"
              step="500"
              value={extraReduction}
              onChange={(e) => setExtraReduction(Number(e.target.value))}
            />

            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 8 }}>
              e.g. Capping weekday food delivery saves ~₹2,000 to ₹3,400 monthly.
            </p>
          </div>
        </div>

        {/* Right: Dynamic Outcome Card */}
        <div className="simulator-outcome-card">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--lime-primary)', fontWeight: 700 }}>
                Dynamic Behavioural Forecast
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#A3C2B3', fontSize: '0.8rem' }}>
                <CheckCircle2 size={15} color="#B9F36A" />
                <span>Live Model</span>
              </div>
            </div>

            <div style={{ marginTop: 24, marginBottom: 20 }}>
              <div style={{ fontSize: '0.86rem', color: '#9FB8AC' }}>At your current pace:</div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '3rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
                {projection.currentMonths} <span style={{ fontSize: '1.4rem', fontWeight: 500, color: '#A3C2B3' }}>months</span>
              </div>
              <div style={{ fontSize: '0.84rem', color: '#748F82', marginTop: 4 }}>
                Based on saving {formatINR(projection.baseMonthlySavings)}/month
              </div>
            </div>

            {/* If extra reduction is applied */}
            <div className="outcome-stat-box">
              <div style={{ fontSize: '0.85rem', color: '#D1E7DB', marginBottom: 8 }}>
                With ₹{extraReduction.toLocaleString('en-IN')}/mo challenge savings:
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontFamily: 'Space Grotesk', fontSize: '2.2rem', fontWeight: 700, color: 'var(--lime-primary)' }}>
                  {projection.improvedMonths} months
                </span>
                <span style={{ fontSize: '0.85rem', color: '#A3C2B3' }}>
                  ({formatINR(projection.improvedMonthlySavings)}/mo saved)
                </span>
              </div>

              {projection.weeksSaved > 0 && (
                <div style={{ marginTop: 14 }}>
                  <span className="outcome-delta-badge">
                    <Sparkles size={16} />
                    <span>Reach your goal ~{projection.weeksSaved} weeks sooner!</span>
                  </span>
                </div>
              )}
            </div>

            {/* Visual Progress toward Goal */}
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: '#A3C2B3', marginBottom: 6 }}>
                <span>Progress: {projection.progressPct}%</span>
                <span>{formatINR(projection.remaining)} remaining</span>
              </div>
              <div className="progress-track" style={{ height: 10, background: 'rgba(255,255,255,0.1)' }}>
                <div className="progress-fill" style={{ width: `${projection.progressPct}%` }} />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 20 }}>
            <p style={{ fontSize: '0.84rem', color: '#8DAAA0' }}>
              💡 <strong>Insight:</strong> Reducing just two food deliveries a week diverts{' '}
              <span style={{ color: '#FFFFFF' }}>₹2,000/month</span> straight into your liquid safety net.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
