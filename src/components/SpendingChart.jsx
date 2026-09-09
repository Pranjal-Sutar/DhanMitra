import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';

// Custom Tooltip for Recharts
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const actual = payload.find((p) => p.dataKey === 'actual')?.value || 0;
    const baseline = payload.find((p) => p.dataKey === 'baseline')?.value || 0;
    const diff = actual - baseline;
    const diffPct = Math.round((diff / (baseline || 1)) * 100);

    return (
      <div
        style={{
          background: '#07110D',
          color: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          border: '1px solid rgba(185, 243, 106, 0.25)',
          fontSize: '0.84rem'
        }}
      >
        <div style={{ fontWeight: 700, color: '#A3C2B3', marginBottom: 6 }}>
          {label}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#B9F36A' }} />
          <span>Actual Spend: </span>
          <strong style={{ color: '#FFFFFF', fontFamily: 'Space Grotesk' }}>
            {formatINR(actual)}
          </strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#94A3B8' }} />
          <span>Personal Baseline: </span>
          <strong style={{ color: '#E2E8F0', fontFamily: 'Space Grotesk' }}>
            {formatINR(baseline)}
          </strong>
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            paddingTop: 4,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            color: diff > 0 ? '#FCA5A5' : '#86EFAC',
            fontWeight: 600
          }}
        >
          {diff > 0
            ? `+${diffPct}% above baseline (drift)`
            : `${Math.abs(diffPct)}% under baseline (great!)`}
        </div>
      </div>
    );
  }
  return null;
}

import CategoryPieChart from './CategoryPieChart';

export default function SpendingChart({ title = 'Personal spending baseline', showControls = true }) {
  const { timelineData } = useApp();
  const [timeframe, setTimeframe] = useState('90d');
  const [chartType, setChartType] = useState('graph'); // 'graph' or 'pie'

  // Filter data based on selected timeframe
  let displayData = timelineData;
  if (timeframe === '30d') {
    displayData = timelineData.slice(-30);
  } else if (timeframe === '14d') {
    displayData = timelineData.slice(-14);
  }

  return (
    <div>
      {/* Chart View Toggle Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'inline-flex', background: 'var(--mint-soft)', padding: 3, borderRadius: 9999, border: '1px solid var(--border-light)' }}>
          <button
            onClick={() => setChartType('graph')}
            style={{
              padding: '6px 14px',
              borderRadius: 9999,
              fontSize: '0.82rem',
              fontWeight: 600,
              background: chartType === 'graph' ? 'var(--forest-950)' : 'transparent',
              color: chartType === 'graph' ? 'var(--lime-primary)' : 'var(--forest-800)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s ease'
            }}
          >
            <span>📈 Spending Baseline Graph</span>
          </button>
          <button
            onClick={() => setChartType('pie')}
            style={{
              padding: '6px 14px',
              borderRadius: 9999,
              fontSize: '0.82rem',
              fontWeight: 600,
              background: chartType === 'pie' ? 'var(--forest-950)' : 'transparent',
              color: chartType === 'pie' ? 'var(--lime-primary)' : 'var(--forest-800)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s ease'
            }}
          >
            <span>🥧 Category Spending Pie Chart</span>
          </button>
        </div>

        {chartType === 'graph' && showControls && (
          <div style={{ display: 'flex', gap: 6 }}>
            {['14d', '30d', '90d'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  background: timeframe === tf ? 'var(--forest-900)' : '#FFFFFF',
                  color: timeframe === tf ? 'var(--lime-primary)' : 'var(--text-secondary)',
                  border: '1px solid var(--border-light)',
                  cursor: 'pointer'
                }}
              >
                {tf === '14d' ? '14 Days' : tf === '30d' ? '30 Days' : '3 Months'}
              </button>
            ))}
          </div>
        )}
      </div>

      {chartType === 'pie' ? (
        <CategoryPieChart title="Spending by Category (Pie Chart)" />
      ) : (
        <div className="chart-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">{title}</h3>
              <p className="card-subtitle">
                Comparing daily transactions against your rolling personal spending baseline
              </p>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="chart-legend-row" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="legend-dot" style={{ background: 'var(--forest-900)' }} />
              <span>Actual Daily Spending</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="legend-line" style={{ background: '#94A3B8', borderTop: '2px dashed #94A3B8' }} />
              <span>Personal Baseline (Rolling Avg)</span>
            </div>
          </div>

          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B2419" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0B2419" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EFE9" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={{ stroke: '#E2ECE5' }}
                  tick={{ fill: '#748F82', fontSize: 11 }}
                  interval={timeframe === '90d' ? 12 : timeframe === '30d' ? 4 : 1}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: '#E2ECE5' }}
                  tick={{ fill: '#748F82', fontSize: 11 }}
                  tickFormatter={(v) => `₹${v}`}
                  domain={[0, 'dataMax + 200']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#0B2419"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#spendGradient)"
                  activeDot={{ r: 5, fill: '#B9F36A', stroke: '#07110D', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
