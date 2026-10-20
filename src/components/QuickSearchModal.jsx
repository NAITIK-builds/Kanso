import React, { useState, useEffect, useRef } from 'react';
import { useKanso } from '../context/KansoContext';

export default function QuickSearchModal() {
  const {
    isQuickSearchOpen,
    setIsQuickSearchOpen,
    listings,
    setDetailSanctuaryId
  } = useKanso();

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isQuickSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isQuickSearchOpen]);

  if (!isQuickSearchOpen) return null;

  const filtered = query.trim()
    ? listings.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.host?.name?.toLowerCase().includes(q) ||
          item.amenities?.some((a) => a.toLowerCase().includes(q))
        );
      })
    : listings.slice(0, 5);

  const handleSelect = (id) => {
    setIsQuickSearchOpen(false);
    setDetailSanctuaryId(id);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsQuickSearchOpen(false)}>
      <div
        className="modal-box modal-md"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
      >
        <div className="modal-header" style={{ paddingBottom: '12px' }}>
          <div>
            <span className="modal-tag">QUICK ARCHITECTURAL SEARCH</span>
            <h3 className="modal-title">Search Sanctuaries</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setIsQuickSearchOpen(false)}
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '0 24px 16px 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-canvas)',
              border: '1.5px solid var(--line-hairline)',
              borderRadius: 'var(--radius-pill)',
              padding: '10px 18px',
              gap: '12px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by name, Goa, Manali, pool, architect..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '15px',
                fontFamily: 'var(--font-sans)',
                color: 'var(--ink-primary)'
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--ink-tertiary)',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px 24px' }}>
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--ink-tertiary)',
              display: 'block',
              marginBottom: '10px'
            }}
          >
            {query.trim() ? `Found ${filtered.length} Results` : 'Featured Sanctuaries'}
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-hairline)',
                  background: 'var(--bg-surface-elevated)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <img
                  src={item.coverImg}
                  alt={item.title}
                  style={{
                    width: '60px',
                    height: '50px',
                    objectFit: 'cover',
                    borderRadius: '6px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', fontSize: '14px', color: 'var(--ink-primary)' }}>
                    {item.title}
                  </strong>
                  <span style={{ fontSize: '12px', color: 'var(--ink-tertiary)' }}>
                    {item.location} · {item.type}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 600, color: 'var(--accent-earth)', fontSize: '14px' }}>
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--ink-tertiary)' }}>
                    / night
                  </span>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <p style={{ textAlign: 'center', padding: '24px 0', color: 'var(--ink-tertiary)' }}>
                No sanctuaries match "{query}".
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
