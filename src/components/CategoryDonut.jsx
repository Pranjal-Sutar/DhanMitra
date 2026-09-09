import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { AlertCircle, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculatePriorityDriftScore } from '../utils/calculations';

function CustomPieTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          background: '#07110D',
          color: '#FFFFFF',
          padding: '8px 14px',
          borderRadius: 10,
          fontSize: '0.82rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ fontWeight: 700, color: data.color }}>{data.name}</div>
        <div>
          Share: <strong>{data.value}%</strong> (₹{data.amount?.toLocaleString('en-IN')})
        </div>
        <div style={{ fontSize: '0.74rem', color: '#A3C2B3', marginTop: 2 }}>{data.drift}</div>
      </div>
    );
  }
  return null;
}

export default function CategoryDonut() {
  const { categoryData, userProfile } = useApp();

  const driftScore = calculatePriorityDriftScore(categoryData, userProfile.priorities);

  const topCategory = [...categoryData].sort((a, b) => b.value - a.value)[0] || categoryData[0];

  return (
    <div className="chart-card">
      <div className="card-header-row">
        <div>
          <h3 className="card-title">Priority Drift</h3>
          <p className="card-subtitle">Stated intent vs discretionary money flow</p>
        </div>

        {/* Priority Drift Score Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--mint-soft)',
            padding: '4px 12px',
            borderRadius: '9999px'
          }}
        >
          <span style={{ fontSize: '0.74rem', color: 'var(--forest-700)', fontWeight: 600 }}>
            Drift Score:
          </span>
          <span
            style={{
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: '0.96rem',
              color: 'var(--forest-950)'
            }}
          >
            {driftScore} / 100
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: 210 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              stroke="none"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label inside donut */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none'
          }}
        >
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#748F82', fontWeight: 700 }}>
            Top Drift
          </div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', fontWeight: 700, color: '#07110D' }}>
            {topCategory.value}%
          </div>
          <div style={{ fontSize: '0.68rem', color: topCategory.color, fontWeight: 600 }}>
            {topCategory.name}
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="category-breakdown-list">
        {categoryData.map((cat) => (
          <div key={cat.name} className="category-row">
            <div className="category-row-left">
              <span className="category-dot" style={{ background: cat.color }} />
              <span className="category-name">{cat.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cat.drift}</span>
              <span className="category-pct">{cat.value}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Behavioural Drift Callout */}
      <div className="drift-callout-box">
        <AlertCircle size={17} style={{ color: '#D97706', flexShrink: 0, marginTop: 1 }} />
        <div>
          <strong>Stated priority:</strong> "{userProfile.priorities[0] || 'Save more'}"
          <div style={{ marginTop: 2 }}>
            Your biggest discretionary drift is <strong>{topCategory.name.toLowerCase()}</strong> ({topCategory.value}% of monthly spend).
          </div>
        </div>
      </div>
    </div>
  );
}
