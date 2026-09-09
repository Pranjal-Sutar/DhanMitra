import React from 'react';
import { TrendingDown, Sparkles, AlertTriangle, Trophy, BarChart2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';
import SpendingChart from '../components/SpendingChart';
import TransactionList from '../components/TransactionList';
import StatCard from '../components/StatCard';

export default function SpendingPage() {
  const { baselineMetrics, setIsCashModalOpen } = useApp();

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
          <span>YOU VS YOU BASELINE ENGINE</span>
        </div>
        <h1 style={{ fontSize: '2rem', color: 'var(--forest-950)', marginBottom: 6 }}>
          Understand what's normal for you.
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 680 }}>
          We compare your recent spending with your own historical patterns — not someone else's.
          This prevents unrealistic budgeting and spots behavioural drift early.
        </p>
      </div>

      {/* 4 Behavioural Baseline Stat Cards */}
      <div className="stats-grid">
        <StatCard
          label="Average Daily"
          value={formatINR(baselineMetrics.avgDaily)}
          trendText="Rolling 90-Day"
          trendType="neutral"
          subtext="typical daily spend"
          icon={BarChart2}
        />
        <StatCard
          label="Current Drift"
          value={`${baselineMetrics.currentDrift > 0 ? '+' : ''}${baselineMetrics.currentDrift}%`}
          trendText={baselineMetrics.currentDrift <= 0 ? 'Under baseline' : 'Above baseline'}
          trendType={baselineMetrics.currentDrift <= 0 ? 'positive' : 'negative'}
          subtext="vs 3-month norm"
          icon={TrendingDown}
        />
        <StatCard
          label="Unusual Spends"
          value={baselineMetrics.unusualSpendsCount}
          trendText="Above 1.8x avg"
          trendType="neutral"
          subtext="flagged transactions"
          icon={AlertTriangle}
        />
        <StatCard
          label="Best Spending Day"
          value={formatINR(baselineMetrics.bestDay)}
          trendText="Personal Record"
          trendType="positive"
          subtext="lowest active spend"
          icon={Trophy}
        />
      </div>

      {/* Large Area Chart */}
      <div style={{ marginBottom: 32 }}>
        <SpendingChart title="Personal spending baseline (90 Days)" showControls={true} />
      </div>

      {/* Full Transaction History */}
      <TransactionList limit={null} title="All Historical Transactions" />
    </div>
  );
}
