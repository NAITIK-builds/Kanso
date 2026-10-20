import React, { useState, useEffect } from 'react';
import { useKanso } from '../context/KansoContext';

export default function BookingModal() {
  const {
    listings,
    bookingSanctuaryId,
    setBookingSanctuaryId,
    activeReceipt,
    setActiveReceipt,
    currentUser,
    createReservation,
    setInquiryTarget,
    setIsReservationsOpen
  } = useKanso();

  const sanctuary = listings.find((s) => s.id === bookingSanctuaryId) ||
    (activeReceipt ? listings.find((s) => s.id === activeReceipt.propertyId) : null);

  // Form fields
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Default dates
  useEffect(() => {
    const today = new Date();
    const d1 = new Date(today);
    d1.setDate(today.getDate() + 4);
    const d2 = new Date(today);
    d2.setDate(today.getDate() + 7);

    setCheckIn(d1.toISOString().split('T')[0]);
    setCheckOut(d2.toISOString().split('T')[0]);

    if (currentUser) {
      setGuestName(currentUser.name || '');
      setGuestEmail(currentUser.email || '');
      setGuestPhone(currentUser.phone || '+91 98765 43210');
    } else {
      setGuestName('Kabir Sen');
      setGuestEmail('kabir@example.com');
      setGuestPhone('+91 98765 43210');
    }
  }, [currentUser, bookingSanctuaryId]);

  if (!bookingSanctuaryId && !activeReceipt) return null;
  if (!sanctuary) return null;

  // Nights calculation
  let nights = 3;
  if (checkIn && checkOut) {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diff = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
    nights = diff > 0 ? diff : 1;
  }

  const basePrice = (sanctuary.price || 15000) * nights;
  const cleaningFee = 1500;
  const tax = Math.round((basePrice + cleaningFee) * 0.12);
  const total = basePrice + cleaningFee + tax;

  const handleClose = () => {
    setBookingSanctuaryId(null);
    setActiveReceipt(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReservation({
      propertyId: sanctuary.id,
      title: sanctuary.title,
      location: sanctuary.location,
      guestName: guestName || 'Guest Traveler',
      guestEmail: guestEmail || 'guest@example.com',
      guestPhone: guestPhone || '+91 98765 43210',
      checkIn,
      checkOut,
      nights,
      guests: Number(guests),
      total,
      specialRequests
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleContactHost = () => {
    setInquiryTarget({ propertyId: sanctuary.id, sanctuary });
  };

  const handleViewAllReservations = () => {
    handleClose();
    setIsReservationsOpen(true);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-box modal-ticket" onClick={(e) => e.stopPropagation()}>
        {/* Boarding Pass Header */}
        <div className="ticket-header">
          <div className="ticket-brand">
            <span className="ticket-brand-mark">KL</span>
            <div>
              <strong>KANSO LIVING</strong>
              <span>ARCHITECTURAL STAY SLIP · आवास</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close booking modal"
          >
            ✕
          </button>
        </div>

        {/* View 1: Booking Form */}
        {!activeReceipt ? (
          <div id="bookingFormView">
            <div className="ticket-body">
              <div className="ticket-property-preview">
                <img src={sanctuary.coverImg} alt={sanctuary.title} />
                <div>
                  <span className="ticket-cat">{sanctuary.type.toUpperCase()} · {sanctuary.region.toUpperCase()}</span>
                  <h3>{sanctuary.title}</h3>
                  <span>{sanctuary.location}</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="ticket-inputs-grid">
                <div className="form-group">
                  <label htmlFor="bookCheckIn">Check-in Date *</label>
                  <input
                    type="date"
                    id="bookCheckIn"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bookCheckOut">Check-out Date *</label>
                  <input
                    type="date"
                    id="bookCheckOut"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bookGuests">Number of Guests</label>
                  <select
                    id="bookGuests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="guestFullName">Full Name *</label>
                  <input
                    type="text"
                    id="guestFullName"
                    required
                    placeholder="e.g. Kabir Sen"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="guestEmail">Email Address *</label>
                  <input
                    type="email"
                    id="guestEmail"
                    required
                    placeholder="kabir@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="guestPhone">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    id="guestPhone"
                    required
                    placeholder="+91 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                  />
                </div>

                <div className="form-group span-2">
                  <label htmlFor="specialRequests">Arrival Time & Notes</label>
                  <input
                    type="text"
                    id="specialRequests"
                    placeholder="e.g. Expected arrival at 3:00 PM, quiet workspace needed"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>

                {/* Price Breakdown Calculation */}
                <div className="ticket-calculation span-2">
                  <div className="calc-row">
                    <span>₹{sanctuary.price.toLocaleString('en-IN')} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    <span>₹{basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="calc-row">
                    <span>Sanctuary Cleaning & Prep Fee</span>
                    <span>₹{cleaningFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="calc-row">
                    <span>Hospitality GST (12%)</span>
                    <span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="perforated-line"></div>
                  <div className="calc-row total-row">
                    <span>Total Payable (INR)</span>
                    <span className="total-amount">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="modal-footer span-2">
                  <button type="button" className="btn-text" onClick={handleClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-architectural btn-primary">
                    Confirm & Issue Boarding Pass
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* View 2: Generated Boarding Pass Receipt */
          <div id="bookingReceiptView">
            <div className="ticket-receipt" id="printableTicketReceipt">
              {/* Header strip */}
              <div className="receipt-header-strip">
                <div className="receipt-badge-wrap">
                  <span className="receipt-stamp-mark">OFFICIALLY CONFIRMED · पुष्टि</span>
                  <span className="receipt-class-label">ARCHITECTURAL PASS // PRIORITY GUEST</span>
                </div>
                <div className="receipt-thumb-wrap">
                  <img
                    src={sanctuary.coverImg}
                    alt="Sanctuary Thumbnail"
                    className="receipt-thumb-img"
                  />
                </div>
              </div>

              {/* Rows */}
              <div className="receipt-row">
                <div className="receipt-col">
                  <label>PASSENGER / GUEST</label>
                  <strong>{activeReceipt.guestName}</strong>
                  <span>{activeReceipt.guestEmail} · {activeReceipt.guestPhone}</span>
                </div>
                <div className="receipt-col">
                  <label>BOARDING PASS NO.</label>
                  <strong className="receipt-booking-id">{activeReceipt.bookingId}</strong>
                  <span className="badge-confirmed">Instant Host Confirmation</span>
                </div>
              </div>

              <div className="receipt-row">
                <div className="receipt-col">
                  <label>SANCTUARY & CUSTODIAN</label>
                  <strong>{activeReceipt.title}</strong>
                  <span>{activeReceipt.location}</span>
                  <span className="receipt-host-sub">
                    Custodian: {sanctuary.host?.name || 'Verified Architect'}
                  </span>
                </div>
                <div className="receipt-col">
                  <label>STAY DATES & TIMINGS</label>
                  <strong>
                    {activeReceipt.nights} Nights ({activeReceipt.guests || 2} Guests)
                  </strong>
                  <span>{activeReceipt.checkIn} → {activeReceipt.checkOut}</span>
                  <span className="receipt-timing-sub">Check-in: 14:00 IST · Check-out: 11:00 IST</span>
                </div>
              </div>

              <div className="receipt-row">
                <div className="receipt-col">
                  <label>TOTAL SETTLED (INR)</label>
                  <strong className="receipt-total">
                    ₹{Number(activeReceipt.total).toLocaleString('en-IN')}
                  </strong>
                  <span>Includes 12% Hospitality GST & Prep</span>
                </div>
                <div className="receipt-col">
                  <label>SECURITY & ACCESS</label>
                  <strong className="receipt-access">VERIFIED DIGITAL KEY</strong>
                  <span className="receipt-access-sub">Key code sent to WhatsApp 2h before arrival</span>
                </div>
              </div>

              {/* Physical Perforation Tear with Dual Punch Cutouts */}
              <div className="receipt-tear-line">
                <span className="tear-label">
                  TEAR OR DETACH ALONG PERFORATION FOR ACCESS RECORD
                </span>
              </div>

              <div className="ticket-barcode-wrap">
                <div className="barcode-graphic"></div>
                <span className="barcode-code">KN-STAY-VERIFIED-AUTH-INDIA-2026</span>
                <p className="ticket-legal-micro">
                  ISSUED UNDER KANSO LIVING ARCHITECTURAL CHARTER · VALID ACROSS VERIFIED RESIDENCES
                </p>
              </div>

              <div className="receipt-actions">
                <button
                  type="button"
                  className="btn-architectural btn-secondary"
                  onClick={handleContactHost}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  Message Custodian
                </button>
                <button
                  type="button"
                  className="btn-architectural btn-secondary"
                  onClick={handlePrint}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                  Print / Save Slip
                </button>
                <button
                  type="button"
                  className="btn-architectural btn-primary"
                  onClick={handleViewAllReservations}
                >
                  View My Reservations
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
