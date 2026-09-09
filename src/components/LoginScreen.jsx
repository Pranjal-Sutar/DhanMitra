import React, { useState } from 'react';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginScreen() {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e?.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (!success) {
        setError('Invalid username or password. Please try again.');
        setIsLoading(false);
      }
    }, 350);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(circle at top right, #0B2419 0%, #07110D 60%, #050C09 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Rings */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          right: '-150px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(185, 243, 106, 0.12) 0%, rgba(7, 17, 13, 0) 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-120px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, rgba(7, 17, 13, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Login Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '440px',
          width: '100%',
          padding: '40px 36px',
          boxShadow: '0 24px 70px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          zIndex: 10,
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: 'var(--lime-primary)',
              color: 'var(--forest-950)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              fontWeight: 800,
              boxShadow: 'var(--shadow-lime)',
              marginBottom: 14
            }}
          >
            <span>₹</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '1.85rem', fontWeight: 700, color: 'var(--forest-950)' }}>
              Finly
            </h1>
            <span className="brand-tag" style={{ background: 'var(--mint-soft)', color: 'var(--forest-800)', border: '1px solid #C7E2D3' }}>
              AI COACH
            </span>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: 4, letterSpacing: '0.04em' }}>
            YOU VS YOU · PERSONAL BEHAVIOURAL INTELLIGENCE
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: '#FEE2E2',
              color: '#991B1B',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              marginBottom: 18,
              border: '1px solid #FCA5A5'
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label className="form-label">Username or Email</label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: 38 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="pranjal@finly.ai"
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: 38, paddingRight: 38 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px',
              borderRadius: '12px',
              fontSize: '0.95rem'
            }}
            disabled={isLoading}
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Finly'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Security badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            marginTop: 20,
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
          <span>Local on-device simulation · 100% Private</span>
        </div>
      </div>
    </div>
  );
}
