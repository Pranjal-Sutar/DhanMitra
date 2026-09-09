import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Zap,
  TrendingDown,
  Compass,
  AlertCircle,
  Minimize2,
  Key,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { askDhanMitraCoach, getOpenAIApiKey, saveOpenAIApiKey } from '../services/aiService';

const SUGGESTED_PROMPTS = [
  'Can I afford eating out tonight?',
  'How do I stop weekday food delivery drift?',
  'When will I hit my Emergency Fund goal?',
  'Give me a 7-day rule to save ₹2,000'
];

export default function AICoachChat() {
  const { userProfile, baselineMetrics, rewards } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Namaste ${userProfile.name.split(' ')[0]}! 🙏 I'm DhanMitra, your personal financial coach. I evaluate your spending against your own baseline—not generic rules. How can I help you accelerate towards your ${userProfile.goalName}?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeKey, setActiveKey] = useState(() => getOpenAIApiKey());
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const messagesEndRef = useRef(null);

  const hasApiKey = Boolean(activeKey);

  const handleSaveKey = (e) => {
    if (e) e.preventDefault();
    if (keyInput.trim()) {
      saveOpenAIApiKey(keyInput.trim());
      setActiveKey(keyInput.trim());
      setShowKeyConfig(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const question = (textToSend || input).trim();
    if (!question || isTyping) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', content: question }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const financialContext = {
        monthlyIncome: userProfile.monthlyIncome,
        currentSavings: userProfile.currentSavings,
        goalName: userProfile.goalName,
        goalAmount: userProfile.goalAmount,
        thisMonthSpent: baselineMetrics.thisMonthSpent,
        projectedSavings: baselineMetrics.projectedSavings,
        streak: rewards.streak,
        coins: rewards.coins
      };

      const reply = await askDhanMitraCoach(question, newMessages, financialContext);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      console.error('Chat error:', e);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I hit a temporary bump connecting. Please try asking again!'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 900,
            background: 'var(--forest-950)',
            color: 'var(--lime-primary)',
            border: '1.5px solid var(--lime-primary)',
            borderRadius: 9999,
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 8px 24px rgba(7, 17, 13, 0.4), 0 0 16px rgba(185, 243, 106, 0.25)',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.9rem',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(7, 17, 13, 0.5), 0 0 24px rgba(185, 243, 106, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(7, 17, 13, 0.4), 0 0 16px rgba(185, 243, 106, 0.25)';
          }}
          title="Open DhanMitra AI Financial Coach"
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Bot size={20} />
            <span
              style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: 8,
                height: 8,
                background: '#10B981',
                borderRadius: '50%',
                boxShadow: '0 0 6px #10B981'
              }}
            />
          </div>
          <span>Ask DhanMitra AI</span>
          <Sparkles size={16} />
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 390,
            maxWidth: 'calc(100vw - 32px)',
            height: 580,
            maxHeight: 'calc(100vh - 48px)',
            background: 'var(--card-bg)',
            border: '1.5px solid var(--border-color)',
            borderRadius: 20,
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.22), 0 0 20px rgba(185, 243, 106, 0.1)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUpChat 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 18px',
              background: 'var(--forest-950)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: 'rgba(185, 243, 106, 0.15)',
                  border: '1px solid rgba(185, 243, 106, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--lime-primary)'
                }}
              >
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>DhanMitra AI Coach</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: hasApiKey ? 'var(--lime-primary)' : 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: hasApiKey ? '#10B981' : '#F59E0B' }} />
                  <span>{hasApiKey ? 'OpenAI GPT-4o-mini Live' : 'Calibrated AI Drift Engine'}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                onClick={() => setShowKeyConfig(!showKeyConfig)}
                style={{
                  background: hasApiKey ? 'rgba(185, 243, 106, 0.15)' : 'rgba(245, 158, 11, 0.2)',
                  border: 'none',
                  color: hasApiKey ? 'var(--lime-primary)' : '#F59E0B',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.72rem',
                  fontWeight: 600
                }}
                title="Configure OpenAI API Key"
              >
                <Key size={12} />
                <span>{hasApiKey ? 'Key Active' : 'Set Key'}</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.65)',
                  cursor: 'pointer',
                  padding: 4,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Inline Key Configuration Drawer */}
          {showKeyConfig && (
            <div
              style={{
                padding: '10px 12px',
                background: '#0E2119',
                borderBottom: '1px solid rgba(185, 243, 106, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#B9F36A', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>Enter OpenAI API Key (sk-...):</span>
                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>Saved locally</span>
              </div>
              <form onSubmit={handleSaveKey} style={{ display: 'flex', gap: 6 }}>
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="sk-proj-..."
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: 6,
                    border: '1px solid rgba(185, 243, 106, 0.4)',
                    background: '#07110D',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn-lime"
                  style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: 6 }}
                >
                  <Check size={13} />
                  <span>Save</span>
                </button>
              </form>
            </div>
          )}

          {/* Quick Info Notice if Key is missing */}
          {!hasApiKey && !showKeyConfig && (
            <div
              style={{
                padding: '7px 12px',
                background: 'rgba(245, 158, 11, 0.1)',
                borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
                fontSize: '0.73rem',
                color: '#92400E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 6
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertCircle size={13} style={{ flexShrink: 0 }} />
                <span>Save key in <code>.env</code> (Ctrl+S) or click <strong>Set Key</strong>.</span>
              </div>
            </div>
          )}

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background:
                      m.role === 'user'
                        ? 'var(--forest-950)'
                        : 'var(--surface-color)',
                    color: m.role === 'user' ? '#FFFFFF' : 'var(--forest-950)',
                    border: m.role === 'user' ? 'none' : '1px solid var(--border-color)',
                    fontSize: '0.86rem',
                    lineHeight: 1.45,
                    whiteSpace: 'pre-line',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: '0.8rem', paddingLeft: 6 }}>
                <Sparkles size={14} style={{ animation: 'spin 1s linear infinite', color: 'var(--lime-dark)' }} />
                <span>DhanMitra is analyzing your finances...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Pill Chips */}
          <div
            style={{
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.02)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: 6,
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSend(prompt)}
                disabled={isTyping}
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  background: 'var(--surface-color)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--forest-800)',
                  padding: '4px 10px',
                  borderRadius: 9999,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--lime-dark)';
                  e.currentTarget.style.background = 'var(--mint-soft)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.background = 'var(--surface-color)';
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: '10px 12px',
              borderTop: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your money or habits..."
              disabled={isTyping}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                background: 'var(--surface-color)',
                fontSize: '0.85rem',
                color: 'var(--forest-950)',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="btn-lime"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                padding: 0,
                justifyContent: 'center',
                flexShrink: 0,
                opacity: isTyping || !input.trim() ? 0.5 : 1,
                cursor: isTyping || !input.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes slideUpChat {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
