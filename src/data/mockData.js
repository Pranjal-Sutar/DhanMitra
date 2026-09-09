// Finly Realistic Indian Financial Dataset & Seed State

export const INITIAL_USER_PROFILE = {
  name: "Pranjal",
  monthlyIncome: 52000,
  currentSavings: 42000,
  goalAmount: 100000,
  goalName: "Emergency Fund",
  priorities: [
    "Save more",
    "Reduce food spending",
    "Build emergency fund"
  ]
};

export const INITIAL_REWARDS = {
  coins: 120,
  streak: 4,
  bestStreak: 12,
  moneySaved: 1000,
  simulatorUnlocked: true // judges can view immediately, but unlock UI is also available
};

export const INITIAL_CHALLENGES = [
  {
    id: "challenge-food-delivery",
    title: "Reduce food deliveries",
    category: "Food & Dining",
    goal: "Keep delivery spending under ₹1,400 this week.",
    targetSpending: 1400,
    currentSpending: 980,
    startDate: "2026-09-05T08:00:00.000Z",
    completedDays: 4,
    totalDays: 7,
    rewardCoins: 50,
    isActive: true,
    isCompleted: false,
    aiTriggered: true,
    dailyLog: [
      { day: 1, date: "2026-09-05", status: "on_track", spent: 180 },
      { day: 2, date: "2026-09-06", status: "on_track", spent: 220 },
      { day: 3, date: "2026-09-07", status: "on_track", spent: 290 },
      { day: 4, date: "2026-09-08", status: "on_track", spent: 290 }
    ]
  },
  {
    id: "challenge-home-cooking",
    title: "Weekend Home Chef",
    category: "Food & Dining",
    goal: "Cook dinner at home on Saturday & Sunday.",
    targetSpending: 0,
    currentSpending: 0,
    startDate: null,
    completedDays: 0,
    totalDays: 2,
    rewardCoins: 40,
    isActive: false,
    isCompleted: false,
    aiTriggered: false,
    dailyLog: []
  },
  {
    id: "challenge-tea-cap",
    title: "Chai & Snacks UPI Cap",
    category: "Food & Dining",
    goal: "Keep daily small UPI tea & snack spends under ₹80/day.",
    targetSpending: 400,
    currentSpending: 0,
    startDate: null,
    completedDays: 0,
    totalDays: 5,
    rewardCoins: 35,
    isActive: false,
    isCompleted: false,
    aiTriggered: false,
    dailyLog: []
  },
  {
    id: "challenge-commute-walk",
    title: "Walk Short Distances",
    category: "Transport",
    goal: "Avoid auto/cab for trips under 1 km this week.",
    targetSpending: 0,
    currentSpending: 0,
    startDate: null,
    completedDays: 0,
    totalDays: 4,
    rewardCoins: 45,
    isActive: false,
    isCompleted: false,
    aiTriggered: false,
    dailyLog: []
  },
  {
    id: "challenge-subscription-audit",
    title: "Zero-Splurge Tuesday",
    category: "Shopping",
    goal: "No e-commerce or unplanned shopping on weekdays.",
    targetSpending: 0,
    currentSpending: 0,
    startDate: "2026-09-08T08:00:00.000Z",
    completedDays: 1,
    totalDays: 1,
    rewardCoins: 30,
    isActive: false,
    isCompleted: true,
    aiTriggered: false,
    dailyLog: [
      { day: 1, date: "2026-09-08", status: "on_track", spent: 0 }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Weekday Spending Drift",
    message: "Your food spending spiked to ₹460 on Wednesday vs your ₹290 baseline.",
    time: "2 hours ago",
    unread: true,
    type: "drift"
  },
  {
    id: "notif-2",
    title: "Challenge Streak Protected",
    message: "4 days in a row! 3 more days left to earn +50 DhanMitra coins.",
    time: "Yesterday",
    unread: true,
    type: "challenge"
  },
  {
    id: "notif-3",
    title: "Monthly Salary Credited",
    message: "₹52,000 credited from TechCorp Solutions. Auto-budget calibrated.",
    time: "8 days ago",
    unread: false,
    type: "credit"
  }
];

// Helper to generate 90 days of realistic Indian transaction data
export function generateRealisticTransactions() {
  const transactions = [];
  const now = new Date();
  
  // Deterministic seeds for Indian merchants
  const recurringSalaries = [
    { merchant: "TechCorp Solutions", category: "Income", amount: 52000, type: "credit", dayOffset: 8 },
    { merchant: "TechCorp Solutions", category: "Income", amount: 52000, type: "credit", dayOffset: 38 },
    { merchant: "TechCorp Solutions", category: "Income", amount: 52000, type: "credit", dayOffset: 68 }
  ];

  const recurringRent = [
    { merchant: "Landlord (UPI - R. Sharma)", category: "Bills", amount: 15000, type: "debit", dayOffset: 5 },
    { merchant: "Landlord (UPI - R. Sharma)", category: "Bills", amount: 15000, type: "debit", dayOffset: 35 },
    { merchant: "Landlord (UPI - R. Sharma)", category: "Bills", amount: 15000, type: "debit", dayOffset: 65 }
  ];

  // Recurring bills
  const recurringBills = [
    { merchant: "Adani Electricity / MSEB", category: "Bills", amount: 1680, type: "debit", dayOffset: 12 },
    { merchant: "Airtel Fiber & Mobile Postpaid", category: "Bills", amount: 1099, type: "debit", dayOffset: 14 },
    { merchant: "Netflix Premium Subscription", category: "Subscriptions", amount: 649, type: "debit", dayOffset: 18 },
    { merchant: "Spotify Individual Premium", category: "Subscriptions", amount: 119, type: "debit", dayOffset: 20 },
    { merchant: "Adani Electricity / MSEB", category: "Bills", amount: 1520, type: "debit", dayOffset: 42 },
    { merchant: "Airtel Fiber & Mobile Postpaid", category: "Bills", amount: 1099, type: "debit", dayOffset: 44 },
    { merchant: "Netflix Premium Subscription", category: "Subscriptions", amount: 649, type: "debit", dayOffset: 48 },
    { merchant: "Spotify Individual Premium", category: "Subscriptions", amount: 119, type: "debit", dayOffset: 50 },
    { merchant: "Adani Electricity / MSEB", category: "Bills", amount: 1410, type: "debit", dayOffset: 72 },
    { merchant: "Airtel Fiber & Mobile Postpaid", category: "Bills", amount: 1099, type: "debit", dayOffset: 74 },
    { merchant: "Netflix Premium Subscription", category: "Subscriptions", amount: 649, type: "debit", dayOffset: 78 }
  ];

  // Add fixed monthly items
  [...recurringSalaries, ...recurringRent, ...recurringBills].forEach((item, idx) => {
    const d = new Date(now);
    d.setDate(d.getDate() - item.dayOffset);
    transactions.push({
      id: `tx-fixed-${idx}`,
      merchant: item.merchant,
      category: item.category,
      amount: item.amount,
      type: item.type,
      date: d.toISOString().split("T")[0],
      rawDate: d
    });
  });

  // Daily random realistic expenses
  const dailyOptions = [
    { merchant: "Swiggy", category: "Food & Dining", min: 280, max: 540, prob: 0.45 },
    { merchant: "Zomato", category: "Food & Dining", min: 310, max: 620, prob: 0.35 },
    { merchant: "Blinkit Quick Commerce", category: "Groceries", min: 240, max: 680, prob: 0.4 },
    { merchant: "Zepto 10-min Grocery", category: "Groceries", min: 180, max: 450, prob: 0.3 },
    { merchant: "DMart Ready", category: "Groceries", min: 1400, max: 3200, prob: 0.08 },
    { merchant: "Uber India", category: "Transport", min: 140, max: 380, prob: 0.5 },
    { merchant: "Ola Cabs", category: "Transport", min: 120, max: 340, prob: 0.25 },
    { merchant: "Amazon India", category: "Shopping", min: 650, max: 2800, prob: 0.15 },
    { merchant: "Flipkart", category: "Shopping", min: 890, max: 3400, prob: 0.08 },
    { merchant: "Chai Point / Local Tea UPI", category: "Food & Dining", min: 40, max: 120, prob: 0.6 },
    { merchant: "BookMyShow Movies", category: "Entertainment", min: 550, max: 1100, prob: 0.06 },
    { merchant: "Reliance Digital", category: "Shopping", min: 1200, max: 4500, prob: 0.03 }
  ];

  let idCounter = 100;
  for (let day = 0; day < 90; day++) {
    const date = new Date(now);
    date.setDate(date.getDate() - day);
    const dateStr = date.toISOString().split("T")[0];
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    dailyOptions.forEach((opt) => {
      // Deterministic pseudo-random variation based on day
      const seed = Math.sin(day * 13 + opt.merchant.length * 7) * 10000;
      const rand = seed - Math.floor(seed);
      
      let threshold = opt.prob;
      if (isWeekend && opt.category === "Food & Dining") threshold += 0.15;
      if (!isWeekend && opt.merchant === "Swiggy") threshold += 0.2; // creates the weekday food spike anomaly!
      if (isWeekend && opt.category === "Entertainment") threshold += 0.2;

      if (rand < threshold) {
        const amount = Math.round(opt.min + rand * (opt.max - opt.min));
        transactions.push({
          id: `tx-${idCounter++}`,
          merchant: opt.merchant,
          category: opt.category,
          amount,
          type: "debit",
          date: dateStr,
          rawDate: date
        });
      }
    });
  }

  // Sort by date descending
  return transactions.sort((a, b) => b.rawDate - a.rawDate);
}

// 90-day aggregated baseline timeline for the Recharts AreaChart
export function generateBaselineTimeline() {
  const points = [];
  const now = new Date();
  
  // Starting from 90 days ago up to today
  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Baseline is steady around ₹680 with slight weekday/weekend shape
    const baseline = isWeekend ? 820 : 640;
    
    // Actual spending has realistic variance and a weekday spike in recent weeks
    const varianceSeed = Math.sin(i * 19.3) * 120;
    let actual = baseline + varianceSeed;
    
    // Recent 14 days drift: slight weekday surge in food delivery
    if (i < 20 && !isWeekend) {
      actual += 160; // recent weekday drift
    } else if (i < 10 && isWeekend) {
      actual -= 90; // mindful weekend spending
    }

    actual = Math.max(280, Math.round(actual));
    
    // Format label (e.g. "Aug 12" or "12 Aug")
    const dateLabel = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    
    points.push({
      date: dateLabel,
      fullDate: d.toISOString().split("T")[0],
      actual: actual,
      baseline: baseline,
      drift: Math.round(((actual - baseline) / baseline) * 100)
    });
  }
  return points;
}

// Priority Drift Category Breakdown (discretionary spending percentages)
export const INITIAL_PRIORITY_DRIFT_DATA = [
  { name: "Food & Dining", value: 32, amount: 5894, color: "#7C3AED", drift: "+18% vs baseline" },
  { name: "Shopping", value: 24, amount: 4420, color: "#10B981", drift: "-4% vs baseline" },
  { name: "Transport", value: 16, amount: 2947, color: "#0B2419", drift: "+2% vs baseline" },
  { name: "Bills", value: 15, amount: 2763, color: "#3B82F6", drift: "On track" },
  { name: "Other", value: 13, amount: 2396, color: "#9CA3AF", drift: "-2% vs baseline" }
];
