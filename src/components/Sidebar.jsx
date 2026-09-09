import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Target,
  Flame,
  Settings,
  RotateCcw,
  ShieldCheck,
  X,
  Sparkles,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const {
    currentPage,
    setCurrentPage,
    rewards,
    isMobileNavOpen,
    setIsMobileNavOpen,
    setOnboardingOpen,
    resetDemoData,
    logout
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'spending', label: 'Spending Baseline', icon: TrendingUp },
    { id: 'goals', label: 'Goal Simulator', icon: Target },
    { id: 'challenges', label: 'Challenges', icon: Flame, badge: '+50' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileNavOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`sidebar-overlay ${isMobileNavOpen ? 'mobile-open' : ''}`}
        onClick={() => setIsMobileNavOpen(false)}
      />

      <aside className={`sidebar ${isMobileNavOpen ? 'mobile-open' : ''}`}>
        <div>
          {/* Brand Header */}
          <div className="sidebar-brand" onClick={() => handleNavClick('dashboard')}>
            <div className="brand-icon-box">
              <span>₹</span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="brand-text">DhanMitra</span>
                <span className="brand-tag">AI</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#81A194', letterSpacing: '0.04em' }}>
                YOU VS YOU
              </div>
            </div>
            {isMobileNavOpen && (
              <button
                style={{ marginLeft: 'auto', color: '#FFFFFF' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileNavOpen(false);
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="sidebar-nav">
            <div className="nav-section-title">Personal Coach</div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="sidebar-footer">
          <button
            className="sidebar-action-btn"
            onClick={() => {
              setOnboardingOpen(true);
              setIsMobileNavOpen(false);
            }}
          >
            <Settings size={16} />
            <span>Profile & Priorities</span>
          </button>

          <button
            className="sidebar-action-btn"
            onClick={() => {
              if (window.confirm('Sign out from DhanMitra?')) {
                logout();
                setIsMobileNavOpen(false);
              }
            }}
            title="Log out to test login screen"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>

          <button
            className="sidebar-action-btn"
            onClick={() => {
              if (window.confirm('Reset DhanMitra to default hackathon demo state?')) {
                resetDemoData();
              }
            }}
          >
            <RotateCcw size={16} />
            <span>Reset Demo State</span>
          </button>

          <div className="privacy-badge">
            <ShieldCheck size={16} style={{ color: 'var(--lime-primary)', flexShrink: 0 }} />
            <span>Your data stays private & on-device</span>
          </div>
        </div>
      </aside>
    </>
  );
}
