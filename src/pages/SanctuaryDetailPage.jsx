import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRental } from '../context/RentalContext';
import SmoothImage from '../components/SmoothImage';

export default function SanctuaryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    listings,
    wishlist,
    toggleWishlist,
    setBookingSanctuaryId,
    setInquiryTarget,
    setAddReviewTarget
  } = useRental();

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const sanctuary = listings.find((s) => s.id === id);

  if (!sanctuary) {
    return (
      <div className="container page-container not-found-view">
        <div className="not-found-card">
          <span className="not-found-code">404 // ROOM NOT FOUND</span>
          <h2>Room Not Found</h2>
          <p>The room or flatshare you are seeking has either been rented out or was archived.</p>
          <Link to="/" className="btn-architectural btn-primary">
            ← Return to Available Rooms
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = wishlist.includes(sanctuary.id);
  const gallery = sanctuary.gallery && sanctuary.gallery.length > 0
    ? sanctuary.gallery
    : [sanctuary.coverImg];
  const activeImg = gallery[activeImgIndex] || sanctuary.coverImg;

  const handleBookNow = () => {
    setBookingSanctuaryId(sanctuary.id);
  };

  const handleInquire = () => {
    setInquiryTarget({ propertyId: sanctuary.id, sanctuary });
  };

  const handleWriteImpression = () => {
    setAddReviewTarget({ propertyId: sanctuary.id, sanctuary });
  };

  return (
    <div className="container page-container detail-page-layout">
      {/* Editorial Breadcrumbs & Back Navigation */}
      <div className="detail-top-nav">
        <div className="editorial-breadcrumbs">
          <Link to="/" className="bc-link">
            All Cities
          </Link>
          <span className="bc-sep">/</span>
          <span className="bc-region">{sanctuary.city || sanctuary.region}</span>
          <span className="bc-sep">/</span>
          <span className="bc-region">{sanctuary.localArea}</span>
          <span className="bc-sep">/</span>
          <span className="bc-id">{sanctuary.id.toUpperCase()}</span>
        </div>

        <div className="detail-top-actions">
          <button
            type="button"
            className={`action-icon-pill ${isSaved ? 'active' : ''}`}
            onClick={() => toggleWishlist(sanctuary.id)}
            aria-label="Save Room to Shortlist"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isSaved ? 'var(--accent-earth)' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{isSaved ? 'Saved Room' : 'Save Room'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="detail-page-grid">
        {/* Left Column: Visuals & Narrative */}
        <div className="detail-main-col">
          {/* Gallery Showcase */}
          <div className="detail-gallery-showcase">
            <div className="detail-hero-frame">
              <SmoothImage src={activeImg} alt={sanctuary.title} />
              <span className="gallery-counter">
                {activeImgIndex + 1} / {gallery.length} Room Views
              </span>
            </div>

            {gallery.length > 1 && (
              <div className="detail-gallery-strip">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`gallery-strip-thumb ${idx === activeImgIndex ? 'active' : ''}`}
                    onClick={() => setActiveImgIndex(idx)}
                    aria-label={`View room photo ${idx + 1}`}
                  >
                    <SmoothImage src={imgUrl} alt={`${sanctuary.title} preview ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Heading Info */}
          <div className="detail-heading-block">
            <div className="detail-meta-tags">
              <span className="detail-tag-location">
                📍 {sanctuary.localArea?.toUpperCase()} · {sanctuary.city?.toUpperCase() || sanctuary.region?.toUpperCase()}
              </span>
              <span className="detail-tag-rating">
                ★ <strong>{sanctuary.rating}</strong> ({sanctuary.reviewsCount} reviews)
              </span>
            </div>
            <h1 className="detail-main-title">{sanctuary.title}</h1>
            <p className="detail-full-address">{sanctuary.location}</p>
            <div className="detail-specs-pill-bar">
              <span className="specs-pill">{sanctuary.specs}</span>
              <span className="specs-pill">Type: {sanctuary.type}</span>
              <span className="specs-pill">{sanctuary.guests} Max Occupant(s)</span>
              {sanctuary.tenantPreference && (
                <span className="specs-pill">Pref: {sanctuary.tenantPreference}</span>
              )}
            </div>
          </div>

          {/* Room Narrative */}
          <div className="detail-section-block scroll-reveal">
            <h3 className="section-eyebrow">ROOM OVERVIEW & LIVING ATMOSPHERE</h3>
            <p className="detail-narrative-body">{sanctuary.narrative}</p>
          </div>

          {/* Long-Term Lease & Neighborhood Proximity Card Grid */}
          <div className="detail-section-block scroll-reveal">
            <h3 className="section-eyebrow">LONG-TERM LEASE & LOCAL NEIGHBORHOOD SPECS</h3>
            <div className="longstay-specs-grid">
              <div className="longstay-spec-card">
                <div className="spec-icon">📋</div>
                <div className="spec-content">
                  <h5>Lease Agreement</h5>
                  <p>{sanctuary.leaseTerm || '11-Month Renewable Agreement'}</p>
                  <span className="spec-sub">Lock-in: {sanctuary.lockInPeriod || '3 Months'} · Notice: {sanctuary.noticePeriod || '30 Days'}</span>
                </div>
              </div>

              <div className="longstay-spec-card">
                <div className="spec-icon">💰</div>
                <div className="spec-content">
                  <h5>Security Deposit</h5>
                  <p>{sanctuary.depositText || `₹${(sanctuary.price * 2).toLocaleString('en-IN')} (2 months, 100% refundable)`}</p>
                  <span className="spec-sub">Zero Brokerage · Direct Owner Agreement</span>
                </div>
              </div>

              {sanctuary.metroProximity && (
                <div className="longstay-spec-card">
                  <div className="spec-icon">🚇</div>
                  <div className="spec-content">
                    <h5>Metro & Transit Connectivity</h5>
                    <p>{sanctuary.metroProximity}</p>
                    <span className="spec-sub">Quick daily transit with zero traffic headache</span>
                  </div>
                </div>
              )}

              {sanctuary.techParkProximity && (
                <div className="longstay-spec-card">
                  <div className="spec-icon">🏢</div>
                  <div className="spec-content">
                    <h5>Work & Tech Park Proximity</h5>
                    <p>{sanctuary.techParkProximity}</p>
                    <span className="spec-sub">Short commute for tech & corporate professionals</span>
                  </div>
                </div>
              )}

              {sanctuary.dailyEssentials && (
                <div className="longstay-spec-card">
                  <div className="spec-icon">🛒</div>
                  <div className="spec-content">
                    <h5>Daily Local Essentials</h5>
                    <p>{sanctuary.dailyEssentials}</p>
                    <span className="spec-sub">Walkable markets, fitness centers & healthcare</span>
                  </div>
                </div>
              )}

              {sanctuary.utilityBillSharing && (
                <div className="longstay-spec-card">
                  <div className="spec-icon">⚡</div>
                  <div className="spec-content">
                    <h5>Utility & Maintenance Sharing</h5>
                    <p>{sanctuary.utilityBillSharing}</p>
                    <span className="spec-sub">Transparent meter readings with zero hidden surcharges</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Provisions & Amenities */}
          <div className="detail-section-block scroll-reveal">
            <h3 className="section-eyebrow">INCLUDED ROOM AMENITIES & COMFORTS</h3>
            <div className="detail-amenities-cloud">
              {sanctuary.amenities.map((item, idx) => (
                <div key={idx} className="amenity-cloud-item">
                  <span className="amenity-bullet">✦</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Owner / Host Card */}
          <div className="detail-section-block scroll-reveal">
            <h3 className="section-eyebrow">ROOM OWNER / PRIMARY FLATMATE</h3>
            <div className="detail-custodian-card">
              <div className="custodian-avatar">
                <span>{sanctuary.host?.initials || 'RO'}</span>
              </div>
              <div className="custodian-info">
                <div className="custodian-header">
                  <h4>{sanctuary.host?.name || 'Verified Room Owner'}</h4>
                  <span className="verified-badge">VERIFIED RESIDENT</span>
                </div>
                <p className="custodian-bio">
                  {sanctuary.host?.bio || 'Welcoming peaceful, clean, and respectful flatmates for long-term stay.'}
                </p>
              </div>
              <button
                type="button"
                className="btn-architectural btn-secondary btn-sm"
                onClick={handleInquire}
              >
                Chat with Owner
              </button>
            </div>
          </div>

          {/* Tenant Reviews */}
          <div className="detail-section-block scroll-reveal">
            <div className="reviews-header-row">
              <div>
                <h3 className="section-eyebrow">TENANT EXPERIENCES</h3>
                <h4 className="reviews-subheading">
                  ★ {sanctuary.rating} · {sanctuary.reviews?.length || 0} Verified Long-Stay Reviews
                </h4>
              </div>
              <button
                type="button"
                className="btn-architectural btn-sm"
                onClick={handleWriteImpression}
              >
                + Leave Review
              </button>
            </div>

            <div className="reviews-cards-grid">
              {sanctuary.reviews && sanctuary.reviews.length > 0 ? (
                sanctuary.reviews.map((rev, idx) => (
                  <div key={idx} className="guest-impression-card scroll-reveal">
                    <div className="impression-top">
                      <span className="impression-author">{rev.author}</span>
                      <span className="impression-rating">★ {rev.score}</span>
                    </div>
                    <span className="impression-date">{rev.date}</span>
                    <p className="impression-quote">"{rev.text}"</p>
                  </div>
                ))
              ) : (
                <p className="no-reviews-note">
                  No tenant reviews recorded yet. Be among the first to stay in this room.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Reservation Box */}
        <div className="detail-sidebar-col">
          <div className="sticky-booking-widget">
            <div className="booking-widget-rate">
              <span className="widget-price">₹{sanctuary.price.toLocaleString('en-IN')}</span>
              <span className="widget-unit">{sanctuary.pricePeriod || '/ month'} · Zero Brokerage</span>
            </div>

            <div className="booking-widget-dates">
              <div className="date-cell">
                <label>MOVE-IN</label>
                <span>Immediate / Flexible</span>
              </div>
              <div className="date-cell">
                <label>AGREEMENT</label>
                <span>11-Month Lease</span>
              </div>
            </div>

            <div className="booking-widget-guests">
              <label>REFUNDABLE DEPOSIT</label>
              <span>{sanctuary.depositText || `₹${(sanctuary.price * 2).toLocaleString('en-IN')}`}</span>
            </div>

            <div className="booking-widget-guests">
              <label>LOCATION & METRO</label>
              <span>{sanctuary.localArea} · {sanctuary.metroProximity ? sanctuary.metroProximity.split('—')[0].trim() : sanctuary.city}</span>
            </div>

            <button
              type="button"
              className="btn-architectural btn-primary btn-widget-cta"
              onClick={handleBookNow}
            >
              <span>Apply / Reserve Room</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <p className="widget-guarantee-note">
              Zero Brokerage · Direct Owner Agreement · Refundable Deposit
            </p>

            <div className="widget-highlights-list">
              <div className="highlight-row">
                <span className="highlight-icon">✓</span>
                <span>Direct owner & flatmate WhatsApp verification</span>
              </div>
              <div className="highlight-row">
                <span className="highlight-icon">✓</span>
                <span>Lockable private room key provided</span>
              </div>
              <div className="highlight-row">
                <span className="highlight-icon">✓</span>
                <span>Verified high-speed fiber internet & power backup</span>
              </div>
              <div className="highlight-row">
                <span className="highlight-icon">✓</span>
                <span>Standard 11-month agreement format with 30-day notice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
