# DhanMitra — AI-Powered Personal Financial Coach

> **Philosophy: "YOU VS YOU"**  
> DhanMitra learns your historical spending baseline and detects when current behaviour starts drifting from your normal patterns — turning insights into 7-day micro-challenges that compound into massive financial goals.

---

## 🌟 Key Features

- **Personal Spending Baseline**: 3-Month rolling baseline vs actual daily spending with Recharts interactive Area Chart (14-day, 30-day, and 90-day timeframes).
- **Priority Drift Score & Category Donut**: Visualizes stated financial intent vs actual discretionary spending distribution (Food & Dining, Shopping, Transport, Bills, Other).
- **Category Spending Pie Chart**: Interactive pie chart breakdown with hover tooltips and category percentage shares.
- **AI Personalized Insight**: Contextual anomaly detection identifying specific spending leaks (e.g. weekday food delivery spikes) with 1-click challenge conversion.
- **7-Day Micro-Challenges**: Actionable habit challenges with progress tracking, coin rewards, and celebratory confetti animations upon completion.
- **Compounding Habit Rewards**: DhanMitra Coins, Day Streaks, Personal Records, and Money Saved dashboard.
- **Premium Goal Simulator**: Dynamic real-time calculation sliders for Income, Current Savings, Goal Target, and discretionary spending cuts with live *"Reach your goal ~X weeks sooner!"* forecasts.
- **Bank & Cash Transaction System**: ~90 days of realistic Indian transaction data (Swiggy, Zomato, Blinkit, Zepto, Amazon, Rent, Salary ₹52,000, UPI) + a live **Add Cash Spending** modal that recalculates metrics in real time.
- **Onboarding / Quick Personalisation**: Custom financial profile setup with multi-select priority pills.
- **Fintech Aesthetic**: Deep forest green (`#07110D`), fresh lime (`#B9F36A`), and soft mint (`#E7F4ED`) theme with `Space Grotesk` and `DM Sans` typography.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🔑 Demo Credentials
- **Username / Email:** `pranjal@dhanmitra.ai` *(or `pranjal`)*
- **Password:** `dhanmitra123` *(or `finly123` / `password123`)*

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite
- **Data Visualization**: Recharts (Area Charts, Donut Charts, Pie Charts)
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
- **Styling**: Vanilla CSS Design System with CSS Tokens & Responsive Breakpoints
- **Architecture**: Modular React Context state with `localStorage` persistence, ready for Node.js + Express + Firestore backend integration.
