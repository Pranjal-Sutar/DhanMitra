// DhanMitra Live OpenAI Integration Service

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Helper to retrieve API key from Vite environment
 */
export function getOpenAIApiKey() {
  const key = import.meta.env.VITE_OPENAI_API_KEY || '';
  if (!key || key === 'your_openai_api_key_here') return null;
  return key.trim();
}

/**
 * 1. Generate Live AI Coaching Insight based on real-time baseline metrics
 */
export async function generateCoachingInsight({ userProfile, baselineMetrics, topCategory }) {
  const apiKey = getOpenAIApiKey();

  if (!apiKey) {
    return {
      title: "Your food spending spikes on busy weekdays.",
      desc: `You're averaging ₹460 on weekday delivery, compared with ₹290 on your normal days. A ₹200 weekday cap could save roughly ₹3,400/month towards your ${userProfile.goalName || 'Emergency Fund'}.`,
      isLive: false
    };
  }

  const prompt = `
You are DhanMitra, an elite AI personal financial coach in India following the "YOU VS YOU" philosophy.
User context:
- Name: ${userProfile.name}
- Stated Financial Goal: ${userProfile.goalName} (Target: ₹${userProfile.goalAmount?.toLocaleString('en-IN')})
- Current Savings: ₹${userProfile.currentSavings?.toLocaleString('en-IN')}
- This Month Spent: ₹${baselineMetrics.thisMonthSpent?.toLocaleString('en-IN')}
- Spending Drift: ${baselineMetrics.currentDrift}% vs baseline
- Top Spending Category Leak: ${topCategory?.name || 'Food & Dining'} (${topCategory?.value || 32}% of budget)

Generate a high-impact personalized coaching recommendation.
Format your output as a JSON object with two fields:
{
  "title": "A punchy, insightful headline (max 8 words)",
  "desc": "2 concise, encouraging sentences explaining the exact behavioural pattern and how capping it saves money towards their ${userProfile.goalName}."
}
Only return valid JSON, no markdown formatting.
`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are DhanMitra, a warm, intelligent AI financial coach.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim();
    const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      title: parsed.title,
      desc: parsed.desc,
      isLive: true
    };
  } catch (error) {
    console.warn("OpenAI API call failed, falling back to calibrated default:", error);
    return {
      title: `${topCategory?.name || 'Discretionary'} spending drift detected.`,
      desc: `Your spending in ${topCategory?.name || 'Food & Dining'} is trending higher than your historical baseline. Reducing this by 15% would divert roughly ₹2,500/month straight to your ${userProfile.goalName}.`,
      isLive: false,
      error: error.message
    };
  }
}

/**
 * 2. Ask DhanMitra Conversational AI Assistant
 */
export async function askDhanMitraCoach(userQuestion, chatHistory = [], financialContext = {}) {
  const apiKey = getOpenAIApiKey();

  if (!apiKey) {
    return `⚠️ To enable live AI responses, add your OpenAI API key to the .env file (VITE_OPENAI_API_KEY=sk-...). 

For now: Based on your numbers, you're projected to save ₹${(financialContext.projectedSavings || 20000).toLocaleString('en-IN')} this month. Capping weekday food delivery by ₹200 would speed up your ${financialContext.goalName || 'goal'} by nearly 3 weeks!`;
  }

  const systemMessage = `
You are DhanMitra, a conversational AI personal financial coach in India.
Your core philosophy is "YOU VS YOU" — you focus on helping users overcome their personal behavioral drift rather than judging them or giving generic textbook advice.

User Financial Context:
- Monthly Income: ₹${(financialContext.monthlyIncome || 52000).toLocaleString('en-IN')}
- Current Savings: ₹${(financialContext.currentSavings || 42000).toLocaleString('en-IN')}
- Goal: ${financialContext.goalName || 'Emergency Fund'} (₹${(financialContext.goalAmount || 100000).toLocaleString('en-IN')})
- Spent This Month: ₹${(financialContext.thisMonthSpent || 18420).toLocaleString('en-IN')}
- Projected Monthly Savings: ₹${(financialContext.projectedSavings || 20000).toLocaleString('en-IN')}
- Current Streak: ${financialContext.streak || 4} Days
- Coins: ${financialContext.coins || 120}

Instructions:
- Keep your answers concise, practical, and empathetic (2-4 paragraphs maximum).
- Use ₹ Indian Rupee amounts.
- Provide actionable micro-habits rather than telling the user to starve or cut off all fun.
- If they ask if they can afford something, calculate the impact on their goal timeline.
`;

  const messages = [
    { role: 'system', content: systemMessage },
    ...chatHistory.slice(-6),
    { role: 'user', content: userQuestion }
  ];

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI error (${response.status})`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I couldn't process that right now. Please try again.";
  } catch (error) {
    console.error("DhanMitra chat error:", error);
    return `Could not connect to OpenAI API (${error.message}). Please check your API key in .env.`;
  }
}

/**
 * 3. Generate Custom 7-Day Habit Challenge using OpenAI
 */
export async function generateCustomAIChallenge({ userProfile, topCategory }) {
  const apiKey = getOpenAIApiKey();

  if (!apiKey) {
    return {
      id: `challenge-ai-${Date.now()}`,
      title: `The 15-Minute ${topCategory?.name || 'Food'} Pause`,
      category: topCategory?.name || 'Food & Dining',
      goal: `Wait 15 minutes before ordering on apps to avoid impulse delivery.`,
      targetSpending: 1200,
      currentSpending: 0,
      completedDays: 1,
      totalDays: 7,
      rewardCoins: 50,
      isActive: true,
      isCompleted: false,
      dailyLog: [{ day: 1, date: new Date().toISOString().split('T')[0], status: 'on_track', spent: 0 }]
    };
  }

  const prompt = `
Generate an innovative, measurable 7-day behavioural micro-challenge for an Indian user who wants to cut spending in ${topCategory?.name || 'Food & Dining'}.
Return JSON only:
{
  "title": "Fun, memorable title (max 5 words, e.g. 'The 10-Minute Swiggy Pause')",
  "goal": "Clear, measurable weekly rule (e.g. 'Keep delivery spending under ₹1,200 this week.')",
  "category": "${topCategory?.name || 'Food & Dining'}",
  "totalDays": 7,
  "rewardCoins": 50
}
`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an AI financial coach designing habit challenges.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 150
      })
    });

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim();
    const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      id: `challenge-ai-${Date.now()}`,
      title: parsed.title,
      category: parsed.category || topCategory?.name || 'Food & Dining',
      goal: parsed.goal,
      targetSpending: 1200,
      currentSpending: 0,
      completedDays: 1,
      totalDays: parsed.totalDays || 7,
      rewardCoins: parsed.rewardCoins || 50,
      isActive: true,
      isCompleted: false,
      dailyLog: [{ day: 1, date: new Date().toISOString().split('T')[0], status: 'on_track', spent: 0 }]
    };
  } catch (e) {
    return {
      id: `challenge-ai-${Date.now()}`,
      title: `Smart ${topCategory?.name || 'Budget'} Cap`,
      category: topCategory?.name || 'Food & Dining',
      goal: `Stay under your personal daily baseline for the next 7 days.`,
      targetSpending: 1400,
      currentSpending: 0,
      completedDays: 1,
      totalDays: 7,
      rewardCoins: 50,
      isActive: true,
      isCompleted: false,
      dailyLog: [{ day: 1, date: new Date().toISOString().split('T')[0], status: 'on_track', spent: 0 }]
    };
  }
}
