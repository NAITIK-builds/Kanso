import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useKanso } from '../context/KansoContext';
import SmoothImage from '../components/SmoothImage';
import { IconHouse, IconCheck } from '../components/Icons';

export default function HostPortalPage() {
  const {
    listings,
    reservations,
    dispatchDigitalKey,
    setIsAddListingOpen,
    currentUser,
    setAuthModalState,
    logoutUser
  } = useKanso();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'listings'

  // If user is logged in as seeking home/guest, do not allow listing a room
  if (currentUser?.role === 'guest') {
    return (
      <div className="host-portal-page container" style={{ padding: '80px 20px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '560px', width: '100%', background: 'var(--bg-surface, #ffffff)', padding: '40px 32px', borderRadius: '16px', border: '1px solid var(--line-hairline, rgba(0,0,0,0.1))', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--bg-subtle, #f5f0e8)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <IconHouse size={28} style={{ color: 'var(--accent-earth)' }} />
          </div>
          <span style={{ display: 'inline-block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--accent-earth, #a05a32)', marginBottom: '8px' }}>
            TENANT & SEEKER ACCOUNT
          </span>
          <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '24px', fontWeight: 600, color: 'var(--ink-primary)', marginBottom: '12px' }}>
            Seeking Home Mode Active
          </h2>
          <p style={{ color: 'var(--ink-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px' }}>
            You are currently signed in as <strong>{currentUser.name} (Seeking Home)</strong>. The ability to list rooms and manage properties is reserved for Room Owners and Hosts.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-architectural btn-primary" style={{ padding: '12px 24px' }}>
              Explore Available Homes
            </Link>
            <button
              type="button"
              className="btn-architectural btn-secondary"
              style={{ padding: '12px 20px' }}
              onClick={() => {
                logoutUser();
                setAuthModalState({ initialRole: 'host', initialMode: 'login' });
              }}
            >
              Sign In as Host
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPayout = reservations.reduce((acc, r) => acc + (Number(r.total) || 0), 0);

  return (
    <div className="host-portal-page container">
      {/* Top Header */}
      <div className="host-page-header">
        <div>
          <span className="host-badge-pill">ROOM OWNER & HOST SUITE // 2026</span>
          <h1 className="host-main-heading">Manage Your Rooms & Tenants</h1>
          <p className="host-subtitle">
            Oversee room listings, review tenant move-in reservations, and dispatch digital access passes.
          </p>
        </div>

        <button
          type="button"
          className="btn-architectural btn-primary"
          onClick={() => setIsAddListingOpen(true)}
        >
          <span>+ Post a Room</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="custodian-metrics-grid">
        <div className="custodian-metric-box scroll-reveal">
          <span className="c-metric-label">ACTIVE ROOMS</span>
          <strong className="c-metric-val">{listings.length}</strong>
          <span className="c-metric-hint">Verified rooms on Rental House Finder</span>
        </div>
        <div className="custodian-metric-box scroll-reveal">
          <span className="c-metric-label">TOTAL TENANT RESERVATIONS</span>
          <strong className="c-metric-val">{reservations.length}</strong>
          <span className="c-metric-hint">Confirmed room hold slips</span>
        </div>
        <div className="custodian-metric-box scroll-reveal">
          <span className="c-metric-label">ESTIMATED MONTHLY VOLUME</span>
          <strong className="c-metric-val">₹{totalPayout.toLocaleString('en-IN')}</strong>
          <span className="c-metric-hint">Total monthly rental volume</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="custodian-tabs-bar">
        <button
          type="button"
          className={`c-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Tenant Bookings ({reservations.length})
        </button>
        <button
          type="button"
          className={`c-tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          Listed Rooms ({listings.length})
        </button>
      </div>

      {/* Tab 1: Guest Bookings */}
      {activeTab === 'bookings' && (
        <div className="custodian-bookings-wrapper">
          {reservations.length > 0 ? (
            reservations.map((res) => {
              const sanctuary = listings.find((s) => s.id === res.propertyId);
              const initials = res.guestName
                ? res.guestName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                : 'G';

              return (
                <div key={res.bookingId} className="custodian-booking-card scroll-reveal">
                  {/* Guest Identity */}
                  <div className="c-guest-identity">
                    <div className="c-guest-avatar">{initials}</div>
                    <div className="c-guest-meta">
                      <h3 className="c-guest-name">{res.guestName}</h3>
                      <div className="c-guest-contact">
                        <span>{res.guestEmail}</span>
                        <span className="contact-sep">·</span>
                        <span>{res.guestPhone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sanctuary & Stay Details */}
                  <div className="c-stay-details">
                    <h4 className="c-stay-sanctuary">
                      <Link to={`/sanctuary/${res.propertyId}`}>{res.title}</Link>
                    </h4>
                    <div className="c-stay-dates">
                      <span className="date-highlight">{res.checkIn}</span>
                      <span className="date-arrow">→</span>
                      <span className="date-highlight">{res.checkOut}</span>
                      <span className="stay-duration-tag">
                        ({res.nights} Nights · {res.guests || 2} Guests)
                      </span>
                    </div>
                    {res.specialRequests && (
                      <div className="c-special-notes">
                        <strong>Notes:</strong> "{res.specialRequests}"
                      </div>
                    )}
                  </div>

                  {/* Price & Status */}
                  <div className="c-rate-status">
                    <span className="c-total-figure">
                      ₹{Number(res.total).toLocaleString('en-IN')}
                    </span>
                    <span className={`status-pill ${res.status === 'Key Dispatched' ? 'dispatched' : 'confirmed'}`}>
                      {res.status || 'Confirmed'}
                    </span>
                  </div>

                  {/* Dispatch Actions */}
                  <div className="c-dispatch-action">
                    {res.status !== 'Key Dispatched' ? (
                      <button
                        type="button"
                        className="btn-architectural btn-primary btn-sm btn-whatsapp"
                        onClick={() => dispatchDigitalKey(res.bookingId)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginRight: '6px' }}>
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>Dispatch Key (WhatsApp)</span>
                      </button>
                    ) : (
                      <div className="key-dispatched-badge">
                        <IconCheck size={14} className="check-icon" />
                        <span>Digital Key Dispatched</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="custodian-empty-bookings">
              <p>No active reservations received yet. Your listings are actively promoted across the network.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Listed Sanctuaries */}
      {activeTab === 'listings' && (
        <div className="custodian-listings-wrapper">
          <div className="custodian-listings-grid">
            {listings.map((item) => (
              <div key={item.id} className="custodian-listing-card scroll-reveal">
                <div className="c-listing-image">
                  <SmoothImage src={item.coverImg} alt={item.title} />
                  <span className="c-listing-type">{item.type}</span>
                </div>
                <div className="c-listing-content">
                  <div className="c-listing-region">{item.region} · {item.location}</div>
                  <h3 className="c-listing-title">{item.title}</h3>
                  <p className="c-listing-specs">{item.specs}</p>
                  <div className="c-listing-footer">
                    <div className="c-listing-price">
                      <strong>₹{item.price.toLocaleString('en-IN')}</strong>
                      <span>/ night</span>
                    </div>
                    <Link
                      to={`/sanctuary/${item.id}`}
                      className="btn-architectural btn-secondary btn-sm"
                    >
                      View Live
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
