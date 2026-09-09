import React, { useRef, useEffect } from 'react';
import { AlertCircle, CheckCircle2, DollarSign, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotificationPanel() {
  const {
    notifications,
    isNotificationsOpen,
    setIsNotificationsOpen,
    markAllNotificationsRead
  } = useApp();
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        // Only close if click is not on the bell button itself
        const bellBtn = document.querySelector('.icon-btn-pill');
        if (bellBtn && bellBtn.contains(e.target)) return;
        setIsNotificationsOpen(false);
      }
    }
    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen, setIsNotificationsOpen]);

  if (!isNotificationsOpen) return null;

  return (
    <div className="notification-panel" ref={panelRef}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--forest-950)' }}>
          Notifications
        </div>
        <button
          onClick={markAllNotificationsRead}
          style={{ fontSize: '0.75rem', color: 'var(--forest-700)', fontWeight: 600 }}
        >
          Mark all read
        </button>
      </div>

      <div style={{ maxHeight: 320, overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 12px', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
            No new notifications.
          </div>
        ) : (
          notifications.map((n) => {
            return (
              <div
                key={n.id}
                className="notification-item"
                style={{
                  borderLeft: n.unread ? '3px solid var(--lime-primary)' : '3px solid transparent'
                }}
              >
                <div style={{ marginTop: 2, flexShrink: 0 }}>
                  {n.type === 'drift' ? (
                    <AlertCircle size={17} style={{ color: '#D97706' }} />
                  ) : n.type === 'challenge' ? (
                    <CheckCircle2 size={17} style={{ color: 'var(--purple-ai)' }} />
                  ) : (
                    <DollarSign size={17} style={{ color: '#059669' }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--forest-950)', fontSize: '0.84rem' }}>
                    {n.title}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: 2 }}>
                    {n.message}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: 4 }}>
                    {n.time}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
