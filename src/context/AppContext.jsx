import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_USER_PROFILE,
  INITIAL_REWARDS,
  INITIAL_CHALLENGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_PRIORITY_DRIFT_DATA,
  generateRealisticTransactions,
  generateBaselineTimeline
} from '../data/mockData';
import { calculateBaselineMetrics } from '../utils/calculations';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. User Profile State (persisted in localStorage)
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('finly_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  // 2. Transactions State
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finly_transactions');
    return saved ? JSON.parse(saved) : generateRealisticTransactions();
  });

  // 3. Baseline Timeline Data (for Recharts Area Chart)
  const [timelineData, setTimelineData] = useState(() => {
    return generateBaselineTimeline();
  });

  // 4. Priority Drift Categories
  const [categoryData, setCategoryData] = useState(() => {
    return INITIAL_PRIORITY_DRIFT_DATA;
  });

  // 5. Challenges State
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('finly_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  // 6. Rewards State (Coins, Streak, Money Saved)
  const [rewards, setRewards] = useState(() => {
    const saved = localStorage.getItem('finly_rewards');
    return saved ? JSON.parse(saved) : INITIAL_REWARDS;
  });

  // 7. Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('finly_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // 0. Authentication State (hardcoded credentials for hackathon demo)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('finly_auth');
    // Default to true if not explicitly logged out so user can explore immediately
    return saved !== 'false';
  });

  const login = (user, pass) => {
    const u = (user || '').trim().toLowerCase();
    const p = (pass || '').trim();
    // Hardcoded demo credentials
    if (
      (u === 'pranjal' || u === 'pranjal@dhanmitra.ai' || u === 'pranjal@finly.ai') &&
      (p === 'dhanmitra123' || p === 'finly123' || p === 'password123')
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('finly_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('finly_auth', 'false');
  };

  // 8. Navigation & Modal UI State
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('finly_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('finly_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finly_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('finly_rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('finly_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Dynamic calculated metrics from active transactions
  const baselineMetrics = calculateBaselineMetrics(transactions);

  // Action: Add Cash / Manual Transaction
  const addTransaction = ({ amount, category, description, date }) => {
    const numAmount = parseFloat(amount) || 0;
    const txDate = date || new Date().toISOString().split('T')[0];

    const newTx = {
      id: `tx-cash-${Date.now()}`,
      merchant: description || `${category} (Cash)`,
      category: category || 'Other',
      amount: numAmount,
      type: 'debit',
      date: txDate,
      rawDate: new Date(txDate)
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Add point to today's timeline spending
    setTimelineData((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        const lastIdx = updated.length - 1;
        updated[lastIdx] = {
          ...updated[lastIdx],
          actual: updated[lastIdx].actual + numAmount
        };
      }
      return updated;
    });

    // Also update category distribution slightly
    setCategoryData((prev) => {
      return prev.map((cat) => {
        if (cat.name.toLowerCase().includes(category.toLowerCase().split(' ')[0])) {
          return { ...cat, amount: cat.amount + numAmount };
        }
        return cat;
      });
    });

    setIsCashModalOpen(false);
  };

  // Action: Start / Activate a challenge from catalog (starts at Day 1 with real JSON log)
  const startChallenge = (challengeId) => {
    const today = new Date().toISOString().split('T')[0];
    let startedTitle = 'Challenge';
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          startedTitle = c.title;
          return {
            ...c,
            isActive: true,
            isCompleted: false,
            startDate: new Date().toISOString(),
            completedDays: 1, // Fresh challenge starts at Day 1
            dailyLog: [
              { day: 1, date: today, status: 'on_track', spent: 0 }
            ]
          };
        }
        return c;
      })
    );

    // Push instant notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Challenge Started',
        message: `Activated "${startedTitle}" at Day 1. Check in daily to build streak!`,
        time: 'Just now',
        unread: true,
        type: 'challenge'
      },
      ...prev
    ]);
  };

  // Action: Daily Check-in / Log +1 Day Progress
  const checkInChallengeDay = (challengeId) => {
    const today = new Date().toISOString().split('T')[0];
    let challengeTitle = 'Challenge';
    let reward = 50;
    let willComplete = false;

    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          challengeTitle = c.title;
          reward = c.rewardCoins || 50;
          const nextDay = Math.min(c.totalDays, (c.completedDays || 0) + 1);
          willComplete = nextDay >= c.totalDays;

          const updatedLog = [
            ...(c.dailyLog || []),
            { day: nextDay, date: today, status: 'on_track', spent: 0 }
          ];

          return {
            ...c,
            completedDays: nextDay,
            dailyLog: updatedLog,
            isCompleted: willComplete
          };
        }
        return c;
      })
    );

    if (willComplete) {
      // Award coins and celebration
      setRewards((prev) => {
        const newStreak = prev.streak + 1;
        return {
          ...prev,
          coins: prev.coins + reward,
          streak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
          moneySaved: prev.moneySaved + reward * 10
        };
      });

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: 'Goal Achieved! 🏆',
          message: `Finished all days for "${challengeTitle}"! Earned +${reward} coins!`,
          time: 'Just now',
          unread: true,
          type: 'challenge'
        },
        ...prev
      ]);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B9F36A', '#10B981', '#F59E0B', '#7C3AED', '#07110D']
        });
      } catch (e) {}
    } else {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: 'Daily Progress Logged',
          message: `Checked in day for "${challengeTitle}". Keep going!`,
          time: 'Just now',
          unread: true,
          type: 'challenge'
        },
        ...prev
      ]);
    }
  };

  // Action: Complete Challenge with Confetti and Coin/Streak Boost
  const completeChallenge = (challengeId) => {
    let reward = 50;
    let title = 'Challenge';

    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          reward = c.rewardCoins || 50;
          title = c.title;
          return {
            ...c,
            isCompleted: true,
            completedDays: c.totalDays
          };
        }
        return c;
      })
    );

    // Boost coins (+reward), increment streak, increase money saved
    setRewards((prev) => {
      const newStreak = prev.streak + 1;
      return {
        ...prev,
        coins: prev.coins + reward,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        moneySaved: prev.moneySaved + reward * 10
      };
    });

    // Push completion alert to notification bell
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Challenge Completed! 🎉',
        message: `You earned +${reward} DhanMitra coins for finishing "${title}"!`,
        time: 'Just now',
        unread: true,
        type: 'challenge'
      },
      ...prev
    ]);

    // Fire festive confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B9F36A', '#10B981', '#F59E0B', '#7C3AED', '#07110D']
      });
    } catch (e) {
      console.warn("Confetti error:", e);
    }
  };

  // Action: Unlock Premium Simulator using coins
  const unlockSimulator = () => {
    if (rewards.coins >= 100) {
      setRewards((prev) => ({
        ...prev,
        coins: prev.coins - 100,
        simulatorUnlocked: true
      }));
    }
  };

  // Action: Mark all notifications read
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Reset to initial demo defaults if user desires
  const resetDemoData = () => {
    localStorage.removeItem('finly_user_profile');
    localStorage.removeItem('finly_transactions');
    localStorage.removeItem('finly_challenges');
    localStorage.removeItem('finly_rewards');
    localStorage.removeItem('finly_notifications');
    setUserProfile(INITIAL_USER_PROFILE);
    setTransactions(generateRealisticTransactions());
    setTimelineData(generateBaselineTimeline());
    setCategoryData(INITIAL_PRIORITY_DRIFT_DATA);
    setChallenges(INITIAL_CHALLENGES);
    setRewards(INITIAL_REWARDS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentPage('dashboard');
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        transactions,
        addTransaction,
        timelineData,
        categoryData,
        challenges,
        startChallenge,
        checkInChallengeDay,
        completeChallenge,
        rewards,
        unlockSimulator,
        notifications,
        markAllNotificationsRead,
        unreadCount,
        baselineMetrics,
        currentPage,
        setCurrentPage,
        isCashModalOpen,
        setIsCashModalOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isMobileNavOpen,
        setIsMobileNavOpen,
        resetDemoData,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
