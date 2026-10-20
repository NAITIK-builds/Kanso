import React from 'react';
import { Link } from 'react-router-dom';
import { useKanso } from '../context/KansoContext';
import SmoothImage from '../components/SmoothImage';

export default function ReservationsPage() {
  const {
    reservations,
    listings,
    setActiveReceipt,
    setBookingSanctuaryId,
    setInquiryTarget
  } = useKanso();

  const handleOpenReceipt = (res) => {
    setActiveReceipt(res);
    setBookingSanctuaryId(res.propertyId);
  };

  const handleContactHost = (res) => {
    const property = listings.find((s) => s.id === res.propertyId);
    setInquiryTarget({ propertyId: res.propertyId, sanctuary: property });
  };

  return (
    <div className="reservations-page container">
      {/* Editorial Header */}
      <div className="page-header-block">
        <div className="page-stamp-tag">YOUR JOURNEYS // 2026 ARCHIVE</div>
        <h1 className="page-heading">Reserved Sanctuaries</h1>
        <p className="page-subheading">
          All verified bookings, digital keys, and architectural retreat passes issued under your name.
        </p>
      </div>

      {/* Journeys List */}
      <div className="journeys-grid">
        {reservations.length > 0 ? (
          reservations.map((res) => {
            const sanctuary = listings.find((s) => s.id === res.propertyId);
            return (
              <article key={res.bookingId} className="journey-card scroll-reveal">
                {/* Visual Strip */}
                {sanctuary && (
                  <div className="journey-card-media">
                    <SmoothImage src={sanctuary.coverImg} alt={res.title} />
                    <span className="journey-id-tag">{res.bookingId}</span>
                  </div>
                )}

                {/* Details Content */}
                <div className="journey-card-body">
                  <div className="journey-header">
                    <div>
                      <span className="journey-location-label">{res.location}</span>
                      <h2 className="journey-sanctuary-title">
                        <Link to={`/sanctuary/${res.propertyId}`}>{res.title}</Link>
                      </h2>
                    </div>
                    <span className="badge-confirmed-pill">
                      <span className="pulse-dot"></span>
                      {res.status || 'Confirmed'}
                    </span>
                  </div>

                  {/* Dates & Schedule Grid */}
                  <div className="journey-schedule-grid">
                    <div className="schedule-box">
                      <span className="schedule-label">CHECK-IN</span>
                      <strong className="schedule-date">{res.checkIn}</strong>
                      <span className="schedule-sub">14:00 IST</span>
                    </div>
                    <div className="schedule-arrow">→</div>
                    <div className="schedule-box">
                      <span className="schedule-label">CHECK-OUT</span>
                      <strong className="schedule-date">{res.checkOut}</strong>
                      <span className="schedule-sub">11:00 IST</span>
                    </div>
                    <div className="schedule-box">
                      <span className="schedule-label">DURATION & GUESTS</span>
                      <strong className="schedule-duration">{res.nights} Nights</strong>
                      <span className="schedule-sub">{res.guests || 2} Guests Registered</span>
                    </div>
                  </div>

                  {/* Booking Metadata Chips */}
                  <div className="journey-meta-chips">
                    <div className="meta-chip">
                      <span className="chip-key">Pass:</span>
                      <code className="chip-code">{res.bookingId}</code>
                    </div>
                    {res.guestName && (
                      <div className="meta-chip">
                        <span className="chip-key">Guest:</span>
                        <span className="chip-val">{res.guestName}</span>
                      </div>
                    )}
                    {res.specialRequests && (
                      <div className="meta-chip request-chip">
                        <span className="chip-key">Note:</span>
                        <span className="chip-val">"{res.specialRequests}"</span>
                      </div>
                    )}
                  </div>

                  {/* Footer with Rate & Actions */}
                  <div className="journey-card-footer">
                    <div className="journey-pricing">
                      <span className="journey-total-label">Total Settled</span>
                      <div className="journey-total-amount">
                        <strong>₹{Number(res.total).toLocaleString('en-IN')}</strong>
                        <span className="tax-inclusive-tag">incl. 12% GST</span>
                      </div>
                    </div>

                    <div className="journey-actions">
                      <button
                        type="button"
                        className="btn-architectural btn-secondary btn-sm"
                        onClick={() => handleContactHost(res)}
                      >
                        Contact Host
                      </button>
                      <button
                        type="button"
                        className="btn-architectural btn-primary btn-sm"
                        onClick={() => handleOpenReceipt(res)}
                      >
                        <span>View Boarding Pass</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginLeft: '4px' }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="journeys-empty-card">
            <div className="empty-icon-wrap">✈</div>
            <h3>No Journeys Scheduled Yet</h3>
            <p>You have no active sanctuaries reserved. Discover mindful architectural shelters across India.</p>
            <Link to="/" className="btn-architectural btn-primary">
              Explore Sanctuaries
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
