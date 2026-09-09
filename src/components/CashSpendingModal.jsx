import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CashSpendingModal() {
  const { isCashModalOpen, setIsCashModalOpen, addTransaction } = useApp();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food & Dining');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isCashModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid spending amount.');
      return;
    }

    addTransaction({
      amount: parseFloat(amount),
      category,
      description: description || `${category} (Cash)`,
      date
    });

    // Reset form
    setAmount('');
    setDescription('');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCashModalOpen(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => setIsCashModalOpen(false)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--forest-950)' }}>Add Cash Spending</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Record unbanked cash transactions to keep your baseline 100% accurate.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 350"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food & Dining">Food & Dining</option>
              <option value="Groceries">Groceries</option>
              <option value="Shopping">Shopping</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description / Note</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Chai with team, auto rickshaw cash"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button
              type="button"
              className="btn-outline"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => setIsCashModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <PlusCircle size={16} />
              <span>Save Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
