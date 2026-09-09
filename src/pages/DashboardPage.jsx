import React from 'react';
import { Calendar, Wallet, Flame, HeartPulse } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';
import HeroCard from '../components/HeroCard';
import GoalCard from '../components/GoalCard';
import StatCard from '../components/StatCard';
import SpendingChart from '../components/SpendingChart';
import CategoryDonut from '../components/CategoryDonut';
import AIInsight from '../components/AIInsight';
import ChallengeCard from '../components/ChallengeCard';
import TransactionList from '../components/TransactionList';

export default function DashboardPage() {
  const { baselineMetrics, rewards, challenges } = useApp();

  const activeChallenge = challenges.find((c) => c.id === 'challenge-food-delivery') || challenges[0];

  return (
    <div className="page-body">
      {/* 1. Hero & Goal Overview Grid */}
      <div className="hero-grid">
        <HeroCard />
        <GoalCard />
      </div>

      {/* 2. Four Key Statistic Cards */}
      <div className="stats-grid">
        <StatCard
          label="This Month"
          value={formatINR(baselineMetrics.thisMonthSpent)}
          trendText="8% lower"
          trendType="positive"
          subtext="vs baseline"
          icon={Calendar}
        />
        <StatCard
          label="Projected Savings"
          value={formatINR(baselineMetrics.projectedSavings)}
          trendText="+₹2,400"
          trendType="positive"
          subtext="this month"
          icon={Wallet}
        />
        <StatCard
          label="Current Streak"
          value={`${rewards.streak} Days`}
          trendText="+50 coins"
          trendType="neutral"
          subtext="available"
          icon={Flame}
        />
        <StatCard
          label="Financial Health"
          value="Good"
          trendText="Top 24%"
          trendType="positive"
          subtext="of your baseline"
          icon={HeartPulse}
        />
      </div>

      {/* 3. Personal Spending Baseline Chart & Priority Drift Donut */}
      <div className="charts-grid">
        <SpendingChart title="Personal spending baseline" />
        <CategoryDonut />
      </div>

      {/* 4. AI Insight & 7-Day Challenge Row */}
      <div className="action-cards-grid">
        <AIInsight />
        <ChallengeCard challenge={activeChallenge} showNavigate={true} />
      </div>

      {/* 5. Recent Transactions */}
      <div style={{ marginTop: 28 }}>
        <TransactionList limit={8} title="Recent Activity" />
      </div>
    </div>
  );
}
