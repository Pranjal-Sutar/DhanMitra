import React from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import NotificationPanel from './components/NotificationPanel';
import CashSpendingModal from './components/CashSpendingModal';
import OnboardingModal from './components/OnboardingModal';
import DashboardPage from './pages/DashboardPage';
import SpendingPage from './pages/SpendingPage';
import GoalsPage from './pages/GoalsPage';
import ChallengesPage from './pages/ChallengesPage';
import AICoachChat from './components/AICoachChat';

import LoginScreen from './components/LoginScreen';

export default function App() {
  const { currentPage, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'spending':
        return <SpendingPage />;
      case 'goals':
        return <GoalsPage />;
      case 'challenges':
        return <ChallengesPage />;
      case 'dashboard':
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-root">
      {/* Persistent Sidebar (Desktop & Mobile Drawer) */}
      <Sidebar />

      {/* Main Wrapper */}
      <div className="main-wrapper">
        <Topbar />
        <NotificationPanel />

        {/* Dynamic Route Content */}
        <main>{renderCurrentPage()}</main>

        {/* Global Modals & AI Floating Coach */}
        <CashSpendingModal />
        <OnboardingModal />
        <AICoachChat />
      </div>
    </div>
  );
}
