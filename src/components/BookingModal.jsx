import React, { useState, useEffect } from 'react';
import { useRental } from '../context/RentalContext';
import { IconClose } from './Icons';

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
  } = useRental();

  const sanctuary = listings.find((s) => s.id === bookingSanctuaryId) ||
    (activeReceipt ? listings.find((s) => s.id === activeReceipt.propertyId) : null);

  // Form fields
  const [moveInDate, setMoveInDate] = useState('');
  const [durationMonths, setDurationMonths] = useState('11');
  const [guests, setGuests] = useState('1');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Default dates
  useEffect(() => {
    const today = new Date();
    const d1 = new Date(today);
    d1.setDate(today.getDate() + 3);

    setMoveInDate(d1.toISOString().split('T')[0]);

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

  const monthlyRent = sanctuary.price || 14500;
  const tokenAdvance = 2500; // Standard room hold token amount
  const depositRefundable = sanctuary.deposit || (monthlyRent * 2); // 100% refundable deposit
  const brokerageFee = 0; // ZERO BROKERAGE

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
      guestName: guestName || 'Tenant',
      guestEmail: guestEmail || 'tenant@example.com',
      guestPhone: guestPhone || '+91 98765 43210',
      checkIn: moveInDate,
      checkOut: `Lease for ${durationMonths} month(s)`,
      nights: Number(durationMonths) * 30,
      guests: Number(guests),
      total: tokenAdvance,
      monthlyRent,
      depositRefundable,
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
        {/* Room Pass Header */}
        <div className="ticket-header">
          <div className="ticket-brand">
            <span className="ticket-brand-mark">RR</span>
            <div>
              <strong>RENTAL HOUSE FINDER</strong>
              <span>ROOM LEASE SLIP · कमरा टोकन</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close booking modal"
          >
            <IconClose size={18} />
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
                  <label htmlFor="bookMoveIn">Move-in Date *</label>
                  <input
                    type="date"
                    id="bookMoveIn"
                    required
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bookDuration">Lease Duration *</label>
                  <select
                    id="bookDuration"
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(e.target.value)}
                  >
                    <option value="11">11 Months (Standard Registered Agreement)</option>
                    <option value="6">6 Months (Mid-Term Lease)</option>
                    <option value="12">12+ Months (Multi-Year Long-Term)</option>
                    <option value="3">3 Months (Short Lock-In)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="bookGuests">Occupants</label>
                  <select
                    id="bookGuests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 Person (Solo)</option>
                    <option value="2">2 Persons (Sharing / Couple)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="guestFullName">Tenant Full Name *</label>
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
                  <label htmlFor="guestPhone">WhatsApp / Mobile *</label>
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
                  <label htmlFor="specialRequests">Move-in Time & Notes for Owner</label>
                  <input
                    type="text"
                    id="specialRequests"
                    placeholder="e.g. Bringing desktop PC, vegetarian kitchen, quiet hours"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>

                {/* Price Breakdown Calculation */}
                <div className="ticket-calculation span-2">
                  <div className="calc-row">
                    <span>Monthly Rent (₹)</span>
                    <span>₹{monthlyRent.toLocaleString('en-IN')}/month</span>
                  </div>
                  <div className="calc-row">
                    <span>Brokerage Fee</span>
                    <span style={{ color: 'var(--accent-moss)', fontWeight: 600 }}>₹0 (Zero Brokerage)</span>
                  </div>
                  <div className="calc-row">
                    <span>Security Deposit (Refundable at move-out)</span>
                    <span>₹{depositRefundable.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="perforated-line"></div>
                  <div className="calc-row total-row">
                    <span>Room Hold Token Amount (Payable Now)</span>
                    <span className="total-amount">₹{tokenAdvance.toLocaleString('en-IN')}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--ink-tertiary)', marginTop: '4px' }}>
                    * Token amount is 100% credited against your 1st month rent upon room handover.
                  </p>
                </div>

                <div className="modal-footer span-2">
                  <button type="button" className="btn-text" onClick={handleClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-architectural btn-primary">
                    Hold Room & Issue Reservation Slip
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* View 2: Generated Room Slip Receipt */
          <div id="bookingReceiptView">
            <div className="ticket-receipt" id="printableTicketReceipt">
              {/* Header strip */}
              <div className="receipt-header-strip">
                <div className="receipt-badge-wrap">
                  <span className="receipt-stamp-mark">ROOM HELD · कमरा आरक्षित</span>
                  <span className="receipt-class-label">ROOM SLIP // VERIFIED TENANT</span>
                </div>
                <div className="receipt-thumb-wrap">
                  <img
                    src={sanctuary.coverImg}
                    alt="Room Thumbnail"
                    className="receipt-thumb-img"
                  />
                </div>
              </div>

              {/* Rows */}
              <div className="receipt-row">
                <div className="receipt-col">
                  <label>TENANT NAME</label>
                  <strong>{activeReceipt.guestName}</strong>
                  <span>{activeReceipt.guestEmail} · {activeReceipt.guestPhone}</span>
                </div>
                <div className="receipt-col">
                  <label>RESERVATION ID</label>
                  <strong className="receipt-booking-id">{activeReceipt.bookingId}</strong>
                  <span className="badge-confirmed">Zero Brokerage Verified</span>
                </div>
              </div>

              <div className="receipt-row">
                <div className="receipt-col">
                  <label>ROOM & OWNER / FLATMATE</label>
                  <strong>{activeReceipt.title}</strong>
                  <span>{activeReceipt.location}</span>
                  <span className="receipt-host-sub">
                    Owner/Host: {sanctuary.host?.name || 'Verified Resident'}
                  </span>
                </div>
                <div className="receipt-col">
                  <label>MOVE-IN DATE & TERM</label>
                  <strong>
                    Move-in: {activeReceipt.checkIn}
                  </strong>
                  <span>Duration: {activeReceipt.checkOut} ({activeReceipt.guests || 1} Tenant)</span>
                  <span className="receipt-timing-sub">Monthly Rent: ₹{monthlyRent.toLocaleString('en-IN')}/mo</span>
                </div>
              </div>

              <div className="receipt-row">
                <div className="receipt-col">
                  <label>TOKEN SETTLED (INR)</label>
                  <strong className="receipt-total">
                    ₹{Number(activeReceipt.total).toLocaleString('en-IN')}
                  </strong>
                  <span>Adjustable in 1st Month Rent · 0 Brokerage</span>
                </div>
                <div className="receipt-col">
                  <label>ROOM ACCESS & KEYS</label>
                  <strong className="receipt-access">DIGITAL ROOM PASS</strong>
                  <span className="receipt-access-sub">Owner contact & key passcode dispatched via WhatsApp</span>
                </div>
              </div>

              {/* Physical Perforation Tear with Dual Punch Cutouts */}
              <div className="receipt-tear-line">
                <span className="tear-label">
                  TEAR OR DETACH ALONG PERFORATION FOR MOVE-IN CHECK-IN
                </span>
              </div>

              <div className="ticket-barcode-wrap">
                <div className="barcode-graphic"></div>
                <span className="barcode-code">RENTAL-ROOM-LEASE-TOKEN-INDIA-2026</span>
                <p className="ticket-legal-micro">
                  ISSUED UNDER RENTAL HOUSE FINDER ZERO-BROKERAGE CHARTER · VALID FOR DIRECT TENANT MOVE-IN
                </p>
              </div>

              <div className="receipt-actions">
                <button
                  type="button"
                  className="btn-architectural btn-secondary"
                  onClick={handleContactHost}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  Chat with Owner
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
                  View My Room Bookings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
