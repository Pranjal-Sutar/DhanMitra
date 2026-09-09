import React from 'react';
import { Bell, Plus, Menu, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Topbar() {
  const {
    userProfile,
    rewards,
    unreadCount,
    isNotificationsOpen,
    setIsNotificationsOpen,
    setIsCashModalOpen,
    setIsMobileNavOpen,
    setCurrentPage,
    currentPage
  } = useApp();

  const getPageTitle = () => {
    switch (currentPage) {
      case 'spending':
        return 'Spending Baseline';
      case 'goals':
        return 'Goals & Forecast';
      case 'challenges':
        return 'Habit Challenges & Rewards';
      default:
        return `Good afternoon, ${userProfile.name} 👋`;
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileNavOpen(true)}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="topbar-greeting-wrap">
          <span className="topbar-eyebrow">YOUR MONEY, YOUR PATTERN</span>
          <h1 className="topbar-title">{getPageTitle()}</h1>
        </div>
      </div>

      <div className="topbar-right">
        {/* Quick Add Cash Spending Button */}
        <button
          className="btn-outline"
          onClick={() => setIsCashModalOpen(true)}
          title="Add cash or offline transaction"
        >
          <Plus size={16} />
          <span>Add cash spending</span>
        </button>

        {/* Dynamic Coin Pill */}
        <div
          className="coin-pill"
          onClick={() => setCurrentPage('challenges')}
          title="DhanMitra Coins · Click to view rewards"
        >
          <div className="coin-icon">
            <span>🪙</span>
          </div>
          <span className="coin-count">{rewards.coins}</span>
          <span style={{ fontSize: '0.74rem', color: '#B45309', fontWeight: 600 }}>coins</span>
        </div>

        {/* Notification Bell */}
        <button
          className="icon-btn-pill"
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && <span className="notification-dot" />}
        </button>
      </div>
    </header>
  );
}
