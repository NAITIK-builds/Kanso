import React, { useState } from 'react';
import { useKanso } from '../context/KansoContext';

export default function HostPortalModal() {
  const {
    isHostPortalOpen,
    setIsHostPortalOpen,
    listings,
    reservations,
    dispatchDigitalKey,
    setIsAddListingOpen,
    setDetailSanctuaryId
  } = useKanso();

  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'bookings'

  if (!isHostPortalOpen) return null;

  const totalPayout = reservations.reduce((acc, r) => acc + (Number(r.total) || 0), 0);

  return (
    <section className="host-portal-overlay" onClick={() => setIsHostPortalOpen(false)}>
      <div className="host-portal-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="host-header">
          <div className="host-title-meta">
            <span className="host-badge">HOST CUSTODIAN PORTAL</span>
            <h2>Manage Your Sanctuaries & Guests</h2>
          </div>
          <div className="host-header-actions">
            <button
              type="button"
              className="btn-architectural btn-primary"
              onClick={() => setIsAddListingOpen(true)}
            >
              + List New Sanctuary
            </button>
            <button
              type="button"
              className="close-overlay-btn"
              onClick={() => setIsHostPortalOpen(false)}
              aria-label="Close Host Portal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="host-metrics-grid">
          <div className="metric-card">
            <span className="metric-label">ACTIVE SPACES</span>
            <span className="metric-val">{listings.length}</span>
            <span className="metric-sub">Listed on Kanso Marketplace</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">RESERVATIONS RECEIVED</span>
            <span className="metric-val">{reservations.length}</span>
            <span className="metric-sub">Confirmed instant bookings</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">TOTAL HOST PAYOUT</span>
            <span className="metric-val">₹{totalPayout.toLocaleString('en-IN')}</span>
            <span className="metric-sub">Accumulated earnings in ₹</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="host-tabs">
          <button
            type="button"
            className={`host-tab ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            Your Listed Sanctuaries ({listings.length})
          </button>
          <button
            type="button"
            className={`host-tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Guest Reservations & Inquiries ({reservations.length})
          </button>
        </div>

        {/* Tab 1: Listings */}
        {activeTab === 'listings' && (
          <div className="host-tab-content active">
            <div className="host-listings-table">
              {listings.map((item) => (
                <div key={item.id} className="host-listing-row">
                  <div className="host-listing-visual">
                    <img src={item.coverImg} alt={item.title} />
                  </div>
                  <div className="host-listing-info">
                    <h4>{item.title}</h4>
                    <span className="host-listing-loc">
                      {item.location} · {item.region} ({item.type})
                    </span>
                    <span className="host-listing-specs">{item.specs}</span>
                  </div>
                  <div className="host-listing-price">
                    <strong>₹{item.price.toLocaleString('en-IN')}</strong>
                    <span>/ night</span>
                  </div>
                  <div className="host-listing-rating">
                    <span>★ {item.rating} ({item.reviewsCount} reviews)</span>
                  </div>
                  <div className="host-listing-actions">
                    <button
                      type="button"
                      className="btn-architectural btn-sm btn-secondary"
                      onClick={() => {
                        setIsHostPortalOpen(false);
                        setDetailSanctuaryId(item.id);
                      }}
                    >
                      View Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Bookings */}
        {activeTab === 'bookings' && (
          <div className="host-tab-content active">
            <div className="host-bookings-list">
              {reservations.length > 0 ? (
                reservations.map((res) => (
                  <div key={res.bookingId} className="host-booking-card">
                    <div className="booking-guest-meta">
                      <div className="guest-badge-initials">
                        {res.guestName
                          ? res.guestName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()
                          : 'G'}
                      </div>
                      <div className="guest-text-details">
                        <h4>{res.guestName}</h4>
                        <div className="booking-contact-chips">
                          <span className="contact-chip">{res.guestEmail}</span>
                          <span className="contact-chip">{res.guestPhone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="booking-stay-details">
                      <h4 className="stay-title">{res.title}</h4>
                      <div className="stay-dates-row">
                        <span className="date-chip">{res.checkIn}</span>
                        <span className="date-arrow">→</span>
                        <span className="date-chip">{res.checkOut}</span>
                        <span className="stay-specs-badge">
                          {res.nights} Nights · {res.guests || 2} Guests
                        </span>
                      </div>
                      {res.specialRequests && (
                        <div className="booking-requests-box">
                          <strong>Guest Note:</strong> "{res.specialRequests}"
                        </div>
                      )}
                    </div>

                    <div className="booking-total-status">
                      <span className="booking-label">Total Payout:</span>
                      <strong className="booking-amount">
                        ₹{Number(res.total).toLocaleString('en-IN')}
                      </strong>
                      <span className={`status-tag ${res.status === 'Key Dispatched' ? 'dispatched' : 'confirmed'}`}>
                        {res.status || 'Confirmed'}
                      </span>
                    </div>

                    <div className="booking-actions">
                      {res.status !== 'Key Dispatched' ? (
                        <button
                          type="button"
                          className="btn-architectural btn-sm btn-primary"
                          onClick={() => dispatchDigitalKey(res.bookingId)}
                        >
                          Dispatch Key (WhatsApp)
                        </button>
                      ) : (
                        <span className="key-dispatched-label">✓ Digital Key Sent</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ padding: '32px 0', textAlign: 'center', color: 'var(--ink-tertiary)' }}>
                  No reservations received yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
