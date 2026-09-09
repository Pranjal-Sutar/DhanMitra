import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/calculations';

export default function TransactionList({ limit = 15, title = 'Recent Transactions' }) {
  const { transactions, setIsCashModalOpen } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Food & Dining',
    'Groceries',
    'Shopping',
    'Transport',
    'Bills',
    'Subscriptions',
    'Entertainment',
    'Income'
  ];

  // Filter transactions
  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayList = limit ? filtered.slice(0, limit) : filtered;

  // Merchant initials helper
  const getInitials = (name) => {
    if (!name) return '₹';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <div className="transactions-card">
      <div className="card-header-row" style={{ flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h3 className="card-title">{title}</h3>
          <p className="card-subtitle">
            Showing {displayList.length} of {filtered.length} verified bank & cash entries
          </p>
        </div>

        <div className="tx-header-actions">
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#8BA89B'
              }}
            />
            <input
              type="text"
              className="tx-search-input"
              style={{ paddingLeft: 34 }}
              placeholder="Search Swiggy, Amazon, Uber..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <select
            className="tx-filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          {/* Add Cash spending button */}
          <button className="btn-primary" onClick={() => setIsCashModalOpen(true)}>
            <Plus size={15} />
            <span>Add cash spending</span>
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="tx-table">
          <thead>
            <tr>
              <th>Merchant / Payee</th>
              <th>Category</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {displayList.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No transactions found matching your criteria.
                </td>
              </tr>
            ) : (
              displayList.map((tx) => {
                const isCredit = tx.type === 'credit';
                return (
                  <tr key={tx.id} className="tx-row">
                    <td>
                      <div className="merchant-cell">
                        <div
                          className="merchant-avatar"
                          style={{
                            background: isCredit ? '#D1FAE5' : 'var(--mint-soft)',
                            color: isCredit ? '#065F46' : 'var(--forest-800)'
                          }}
                        >
                          {getInitials(tx.merchant)}
                        </div>
                        <div>
                          <div className="merchant-name">{tx.merchant}</div>
                          <div className="merchant-subtext">
                            {isCredit ? 'Bank Deposit / Salary' : 'Digital UPI / Card'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">{tx.category}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                      {new Date(tx.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className={`tx-amount ${isCredit ? 'tx-credit' : 'tx-debit'}`}>
                      {isCredit ? `+${formatINR(tx.amount)}` : `-${formatINR(tx.amount)}`}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
