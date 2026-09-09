<div align="center">

# 🌿 DhanMitra (धनमित्र)
### *AI-Powered Personal Financial Coach — The "YOU VS YOU" Philosophy*

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Visibility](https://img.shields.io/badge/GitHub-Public-brightgreen)](https://github.com/Pranjal-Sutar/DhanMitra)

**DhanMitra** is a next-generation personal financial coach built for Indian millennials and Gen-Z. Instead of comparing you to unrealistic population averages, DhanMitra learns your **own historical 90-day spending baseline** and turns behavioural drift into actionable 7-day micro-challenges that compound into life-changing savings.

[Live Demo](#-demo-access) • [Key Features](#-key-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start)

---

</div>

## 💡 The Core Problem: Why Most Budgeting Apps Fail
Traditional personal finance apps fail because they use **guilt-based population averages** (*"An average person spends ₹3,000 on food"*). In reality:
- Everyone has unique lifestyle baselines and income structures.
- Deprivation diets fail in finance just like in nutrition.
- The real enemy is **Behavioral Priority Drift**: when your daily impulse transactions drift away from your stated life goals (e.g. buying a bike, emergency fund, vacation).

---

## 🎯 The "YOU VS YOU" Philosophy
DhanMitra solves this by benchmarking you **against your own past self**:
1. **Personal Spending Baseline**: Tracks 90 days of your real spending patterns to determine your personal normal range.
2. **Priority Drift Detection**: Automatically detects when weekend or weekday discretionary spending exceeds your personal norm.
3. **7-Day Micro-Habit Accelerator**: Converts drift into measurable, non-restrictive 7-day habits (e.g. *"The 15-Minute Delivery Pause"*).
4. **Autonomous AI Behavioral Coach**: An intelligent, conversational financial coach that answers questions like *"Can I afford dinner out tonight?"* based on your current month-end projections.

---

## 🌟 Key Features

### 1. 📊 Personal Spending Baseline Chart
- Interactive **Recharts Area Chart** comparing your actual daily spending against your historical 90-day baseline.
- Filter by **14-Day**, **30-Day**, or **90-Day** views with zoomable precision.

### 2. 🎯 Priority Drift & Category Donut
- Visual breakdown of your stated financial goals vs actual discretionary spending distribution (Food & Dining, Shopping, Entertainment, Transport, Utilities).
- Toggle seamlessly between **Donut View** and **Pie View** with interactive tooltips.

### 3. 🤖 Autonomous Conversational AI Coach
- Floating coach widget (**"Ask DhanMitra AI"**) accessible across the app.
- Instant financial answers tailored to your exact monthly income, current savings, and goal deadlines.
- Pre-loaded prompt shortcuts:
  - *"Can I afford eating out tonight?"*
  - *"How do I stop weekday food delivery drift?"*
  - *"When will I hit my Emergency Fund goal?"*
  - *"Give me a 7-day rule to save ₹2,000"*

### 4. ⚡ 7-Day Micro-Habit Challenges
- Daily check-in pills (`Day 1 ✓`, `Day 2 ○` ... `Day 7`) with dynamic JSON tracking in `localStorage`.
- Instant **"✨ Generate AI Habit Challenge"** button that dynamically formulates custom challenges on the fly.
- Celebratory confetti and DhanMitra Coin rewards upon milestone completion.

### 5. 🪙 Compounding Habit Rewards
- Gamified dashboard tracking:
  - **DhanMitra Coins** earned through discipline.
  - **Day Streak** counter protecting consistency.
  - **Best Streak Record**.
  - **Money Saved** directly redirected to goals.

### 6. 📈 Goal Forecast & Planner
- Interactive real-time sliders for Monthly Income, Current Savings, Goal Target, and Discretionary Cuts.
- Live calculation displaying: *"You will reach your goal ~X weeks sooner!"*

### 7. 💵 Cash & UPI Spending Logger
- Log cash transactions and manual UPI spends instantly.
- Automatically recalculates budget totals, category shares, and baseline drift in real time.

---

## 🔑 Demo Access

For hackathon evaluators and demo testing:
- **Email / Username:** `pranjal@dhanmitra.ai` *(or `pranjal`)*
- **Password:** `dhanmitra123`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + Vite 6 |
| **Data Visualizations** | Recharts (Area, Donut, Pie Charts) |
| **UI Icons** | Lucide React |
| **Animations** | Canvas Confetti |
| **Styling** | Custom Vanilla CSS Design System with CSS Tokens |
| **State Management** | React Context API with LocalStorage Persistence |
| **Deployment** | Vercel SPA Ready (`vercel.json` included) |

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Pranjal-Sutar/DhanMitra.git
cd DhanMitra
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
ptp/
├── public/                  # Static assets & icons
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AICoachChat.jsx      # Floating conversational AI coach
│   │   ├── AIInsight.jsx        # Personalized behavioral insight card
│   │   ├── CategoryDonut.jsx    # Priority drift donut & pie chart
│   │   ├── ChallengeCard.jsx    # 7-day micro-challenge card with day pills
│   │   ├── GoalCard.jsx         # Primary goal progress card
│   │   ├── HeroCard.jsx         # Monthly spending & velocity overview
│   │   ├── RewardsPanel.jsx     # Coins, streak, and rewards tracker
│   │   ├── SpendingChart.jsx    # 90-day baseline area chart
│   │   └── Topbar.jsx           # Header with notifications & profile
│   ├── context/
│   │   └── AppContext.jsx       # Central state management & actions
│   ├── data/
│   │   └── mockData.js          # Realistic 90-day Indian transaction data
│   ├── pages/
│   │   ├── DashboardPage.jsx    # Main overview
│   │   ├── GoalsPage.jsx        # Goal planner & timeline forecast
│   │   ├── ChallengesPage.jsx   # Active & catalog habit challenges
│   │   └── SpendingPage.jsx     # Detailed transaction history & breakdown
│   ├── services/
│   │   └── aiService.js         # Autonomous behavioral AI engine
│   ├── utils/
│   │   └── calculations.js      # Baseline & velocity financial math
│   ├── styles.css               # Design system & tokens
│   ├── App.jsx                  # Root layout & route switcher
│   └── main.jsx                 # Application entry point
├── vercel.json              # Vercel SPA routing rules
└── vite.config.js           # Vite build & server configuration
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
