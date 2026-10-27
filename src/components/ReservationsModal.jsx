import React from 'react';
import { useKanso } from '../context/KansoContext';
import { IconClose } from './Icons';

export default function ReservationsModal() {
  const {
    isReservationsOpen,
    setIsReservationsOpen,
    reservations,
    setActiveReceipt,
    setBookingSanctuaryId
  } = useKanso();

  if (!isReservationsOpen) return null;

  const handleOpenReceipt = (res) => {
    setIsReservationsOpen(false);
    setActiveReceipt(res);
    setBookingSanctuaryId(res.propertyId);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsReservationsOpen(false)}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-tag">YOUR ROOM RESERVATIONS</span>
            <h3 className="modal-title">My Room Bookings & Lease Slips</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setIsReservationsOpen(false)}
            aria-label="Close modal"
          >
            <IconClose size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div className="reservations-list">
            {reservations.length > 0 ? (
              reservations.map((res) => {
                const sanctuary = listings.find((s) => s.id === res.propertyId);
                return (
                  <div key={res.bookingId} className="reservation-item-card">
                    <div className="res-card-top-row">
                      {sanctuary && (
                        <div className="res-thumb-visual">
                          <img src={sanctuary.coverImg} alt={res.title} />
                        </div>
                      )}
                      <div className="res-item-top">
                        <div>
                          <h4 className="res-item-title">{res.title}</h4>
                          <span className="res-item-loc">{res.location}</span>
                        </div>
                        <span className="badge-confirmed">
                          <span className="badge-dot"></span>
                          {res.status || 'Confirmed'}
                        </span>
                      </div>
                    </div>

                    <div className="res-item-schedule">
                      <div className="schedule-pill">
                        <span className="pill-lbl">MOVE-IN</span>
                        <strong>{res.checkIn}</strong>
                      </div>
                      <span className="sched-arrow">→</span>
                      <div className="schedule-pill">
                        <span className="pill-lbl">LEASE TERM</span>
                        <strong>{res.checkOut}</strong>
                      </div>
                      <div className="schedule-pill duration">
                        <span className="pill-lbl">TENANT</span>
                        <strong>{res.guests || 1} Tenant · Zero Brokerage</strong>
                      </div>
                    </div>

                    <div className="res-item-meta">
                      <div className="meta-cell">
                        <span className="res-lbl">Reservation Slip:</span>
                        <code className="res-code-badge">{res.bookingId}</code>
                      </div>
                      {res.specialRequests && (
                        <div className="meta-cell note-cell">
                          <span className="res-lbl">Note:</span>
                          <span className="res-note">"{res.specialRequests}"</span>
                        </div>
                      )}
                    </div>

                    <div className="res-item-footer">
                      <div className="res-price">
                        <span className="price-label">Token Advance:</span>
                        <div className="price-figure-wrap">
                          <strong>₹{Number(res.total).toLocaleString('en-IN')}</strong>
                          <span className="res-tax-note">Credited in 1st month rent</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-architectural btn-sm btn-primary"
                        onClick={() => handleOpenReceipt(res)}
                      >
                        View Room Slip
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--ink-tertiary)' }}>
                <p>You have no active room reservations or hold slips.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
