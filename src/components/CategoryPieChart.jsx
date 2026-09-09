import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { PieChart as PieIcon, TrendingUp, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';

// Custom curated harmonious color palette matching the Finly theme
const CATEGORY_COLORS = {
  'Food & Dining': '#7C3AED', // purple AI accent
  'Shopping': '#10B981',      // emerald
  'Transport': '#0B2419',     // deep forest
  'Bills': '#3B82F6',         // blue
  'Groceries': '#F59E0B',     // amber
  'Subscriptions': '#EC4899', // pink
  'Entertainment': '#8B5CF6', // violet
  'Other': '#64748B'          // slate
};

const DEFAULT_COLOR = '#94A3B8';

// Custom Tooltip for Category Pie Chart
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: data.color }} />
          <strong style={{ fontSize: '0.92rem', color: '#FFFFFF' }}>{data.name}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 4 }}>
          <span style={{ color: '#A3C2B3' }}>Total Spent:</span>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: 'var(--lime-primary)' }}>
            {formatINR(data.value)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 2 }}>
          <span style={{ color: '#A3C2B3' }}>Share of Budget:</span>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#FFFFFF' }}>
            {data.percentage}%
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 2 }}>
          <span style={{ color: '#A3C2B3' }}>Transactions:</span>
          <span style={{ color: '#E2ECE5' }}>{data.count} entries</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function CategoryPieChart({ title = 'Category Spending Breakdown' }) {
  const { transactions } = useApp();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Compute category totals dynamically from debit transactions
  const debits = transactions.filter((t) => t.type === 'debit' && t.category !== 'Rent');
  const totalsByCategory = {};
  const countByCategory = {};

  debits.forEach((tx) => {
    const cat = tx.category || 'Other';
    totalsByCategory[cat] = (totalsByCategory[cat] || 0) + Number(tx.amount || 0);
    countByCategory[cat] = (countByCategory[cat] || 0) + 1;
  });

  const grandTotal = Object.values(totalsByCategory).reduce((sum, val) => sum + val, 0) || 1;

  // Format array for Recharts PieChart
  const pieData = Object.keys(totalsByCategory)
    .map((cat) => {
      const val = totalsByCategory[cat];
      const pct = Math.round((val / grandTotal) * 100);
      return {
        name: cat,
        value: val,
        percentage: pct,
        count: countByCategory[cat] || 0,
        color: CATEGORY_COLORS[cat] || DEFAULT_COLOR
      };
    })
    .sort((a, b) => b.value - a.value);

  return (
    <div className="chart-card">
      <div className="card-header-row">
        <div>
          <h3 className="card-title">{title}</h3>
          <p className="card-subtitle">
            Total spending across categories: <strong>{formatINR(grandTotal)}</strong>
          </p>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--mint-soft)',
            padding: '5px 12px',
            borderRadius: 9999,
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--forest-800)'
          }}
        >
          <PieIcon size={14} />
          <span>{pieData.length} Active Categories</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
        {/* Pie Chart Display */}
        <div style={{ width: '100%', height: 280, position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={105}
                innerRadius={30}
                paddingAngle={2}
                onMouseEnter={(_, index) => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`pie-cell-${index}`}
                    fill={entry.color}
                    opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.6}
                    stroke="#FFFFFF"
                    strokeWidth={hoveredIndex === index ? 3 : 1.5}
                    style={{ transition: 'opacity 0.2s, transform 0.2s', cursor: 'pointer' }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Legend & Breakdown List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 280, overflowY: 'auto', paddingRight: 6 }}>
          {pieData.map((item, idx) => (
            <div
              key={item.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                background: hoveredIndex === idx ? 'var(--mint-soft)' : 'var(--card-subtle)',
                border: hoveredIndex === idx ? `1px solid ${item.color}` : '1px solid transparent',
                transition: 'all 0.15s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: item.color,
                    flexShrink: 0
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {item.count} spends
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '0.92rem', color: 'var(--forest-950)' }}>
                  {formatINR(item.value)}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--forest-700)', fontWeight: 600 }}>
                  {item.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
