import React from 'react';

export default function StatCard({ label, value, subtext, icon: Icon, trendType, trendText }) {
  return (
    <div className="stat-card">
      <div>
        <div className="stat-top">
          <span className="stat-label">{label}</span>
          {Icon && (
            <div className="stat-icon-wrap">
              <Icon size={18} />
            </div>
          )}
        </div>
        <div className="stat-value">{value}</div>
      </div>
      <div className="stat-subtext">
        {trendText && (
          <span
            className={`trend-pill ${
              trendType === 'positive'
                ? 'trend-positive'
                : trendType === 'negative'
                ? 'trend-positive' // in spending, negative drift is spending less, which is good
                : 'trend-neutral'
            }`}
          >
            {trendText}
          </span>
        )}
        <span>{subtext}</span>
      </div>
    </div>
  );
}
