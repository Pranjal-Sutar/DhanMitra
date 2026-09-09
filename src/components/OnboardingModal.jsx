import React, { useState } from 'react';
import { X, Check, Sparkles, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OnboardingModal() {
  const { isOnboardingOpen, setIsOnboardingOpen, userProfile, setUserProfile, setCurrentPage } = useApp();

  const [monthlyIncome, setMonthlyIncome] = useState(userProfile.monthlyIncome || 52000);
  const [currentSavings, setCurrentSavings] = useState(userProfile.currentSavings || 42000);
  const [goalName, setGoalName] = useState(userProfile.goalName || 'Emergency Fund');
  const [goalAmount, setGoalAmount] = useState(userProfile.goalAmount || 100000);
  const [priorities, setPriorities] = useState(
    userProfile.priorities || ['Save more', 'Reduce food spending', 'Build emergency fund']
  );

  if (!isOnboardingOpen) return null;

  const goalPresets = [
    { name: 'Emergency Fund', amount: 100000 },
    { name: 'Buy a Laptop (MacBook M3)', amount: 120000 },
    { name: 'Travel / Vacation', amount: 60000 },
    { name: 'Higher Education', amount: 250000 },
    { name: 'Mutual Fund Investment', amount: 150000 },
    { name: 'Other Custom Target', amount: 80000 }
  ];

  const priorityOptions = [
    'Save more',
    'Reduce food spending',
    'Reduce shopping',
    'Build emergency fund',
    'Avoid unnecessary subscriptions',
    'Invest consistently'
  ];

  const togglePriority = (p) => {
    if (priorities.includes(p)) {
      setPriorities(priorities.filter((item) => item !== p));
    } else {
      setPriorities([...priorities, p]);
    }
  };

  const handleGoalSelect = (e) => {
    const selected = goalPresets.find((g) => g.name === e.target.value);
    setGoalName(e.target.value);
    if (selected) {
      setGoalAmount(selected.amount);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      monthlyIncome: parseFloat(monthlyIncome) || 52000,
      currentSavings: parseFloat(currentSavings) || 42000,
      goalName,
      goalAmount: parseFloat(goalAmount) || 100000,
      priorities
    });

    setIsOnboardingOpen(false);
    setCurrentPage('dashboard');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsOnboardingOpen(false)}>
      <div
        className="modal-box"
        style={{ maxWidth: 580, maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={() => setIsOnboardingOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: 20 }}>
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
            <span>PERSONAL FINANCIAL COACH</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--forest-950)' }}>Quick Personalisation</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Tell DhanMitra what matters to you so we can calculate your true Priority Drift.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Monthly In-Hand Income (₹)</label>
              <input
                type="number"
                className="form-input"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Liquid Savings (₹)</label>
              <input
                type="number"
                className="form-input"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Primary Financial Goal</label>
            <select className="form-input" value={goalName} onChange={handleGoalSelect}>
              {goalPresets.map((g) => (
                <option key={g.name} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Target Goal Amount (₹)</label>
            <input
              type="number"
              className="form-input"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Select Your Important Priorities <span style={{ color: 'var(--text-muted)' }}>(Select multiple)</span>
            </label>
            <div className="priority-pill-grid">
              {priorityOptions.map((opt) => {
                const isSelected = priorities.includes(opt);
                return (
                  <button
                    type="button"
                    key={opt}
                    className={`priority-pill ${isSelected ? 'selected' : ''}`}
                    onClick={() => togglePriority(opt)}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        border: isSelected ? 'none' : '1.5px solid #CBD5E1',
                        background: isSelected ? 'var(--lime-primary)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {isSelected && <Check size={12} color="#07110D" strokeWidth={3} />}
                    </div>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <button
              type="submit"
              className="btn-lime"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              <span>Build My Financial Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
