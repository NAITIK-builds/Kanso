import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useKanso } from '../context/KansoContext';

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
  } = useKanso();

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const sanctuary = listings.find((s) => s.id === id);

  if (!sanctuary) {
    return (
      <div className="container page-container not-found-view">
        <div className="not-found-card">
          <span className="not-found-code">404 // SANCTUARY</span>
          <h2>Sanctuary Not Found</h2>
          <p>The architectural residence you are seeking is either private or has been archived.</p>
          <Link to="/" className="btn-architectural btn-primary">
            ← Return to Curated Collection
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = wishlist.includes(sanctuary.id);
  const gallery = sanctuary.gallery && sanctuary.gallery.length > 0 ? sanctuary.gallery : [sanctuary.coverImg];
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
    <div className="sanctuary-detail-page container">
      {/* Editorial Top Navigation Bar */}
      <div className="detail-page-nav">
        <button type="button" className="nav-back-link" onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Sanctuaries</span>
        </button>

        <div className="detail-breadcrumbs">
          <Link to="/">HOME</Link>
          <span className="bc-sep">/</span>
          <span>{sanctuary.region.toUpperCase()}</span>
          <span className="bc-sep">/</span>
          <span>{sanctuary.type.toUpperCase()}</span>
          <span className="bc-sep">/</span>
          <span className="bc-id">{sanctuary.id.toUpperCase()}</span>
        </div>

        <div className="detail-top-actions">
          <button
            type="button"
            className={`action-icon-pill ${isSaved ? 'active' : ''}`}
            onClick={() => toggleWishlist(sanctuary.id)}
            aria-label="Save to Wishlist"
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
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Editorial Layout */}
      <div className="detail-page-grid">
        {/* Left Column: Visuals & Narrative */}
        <div className="detail-main-col">
          {/* Gallery Showcase */}
          <div className="detail-gallery-showcase">
            <div className="detail-hero-frame">
              <img src={activeImg} alt={sanctuary.title} />
              <span className="gallery-counter">
                {activeImgIndex + 1} / {gallery.length} Views
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
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`${sanctuary.title} preview ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Heading Info */}
          <div className="detail-heading-block">
            <div className="detail-meta-tags">
              <span className="detail-tag-location">
                {sanctuary.location.toUpperCase()} · {sanctuary.region.toUpperCase()}
              </span>
              <span className="detail-tag-rating">
                ★ <strong>{sanctuary.rating}</strong> ({sanctuary.reviewsCount} reviews)
              </span>
            </div>
            <h1 className="detail-main-title">{sanctuary.title}</h1>
            <div className="detail-specs-pill-bar">
              <span className="specs-pill">{sanctuary.specs}</span>
              <span className="specs-pill">Type: {sanctuary.type}</span>
              <span className="specs-pill">{sanctuary.guests} Max Guests</span>
            </div>
          </div>

          {/* Architectural Narrative */}
          <div className="detail-section-block">
            <h3 className="section-eyebrow">THE ARCHITECTURAL NARRATIVE</h3>
            <p className="detail-narrative-body">{sanctuary.narrative}</p>
          </div>

          {/* Provisions & Amenities */}
          <div className="detail-section-block">
            <h3 className="section-eyebrow">SANCTUARY PROVISIONS</h3>
            <div className="detail-amenities-cloud">
              {sanctuary.amenities.map((item, idx) => (
                <div key={idx} className="amenity-cloud-item">
                  <span className="amenity-bullet">✦</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host Custodian Card */}
          <div className="detail-section-block">
            <h3 className="section-eyebrow">RESIDENCE CUSTODIAN</h3>
            <div className="detail-custodian-card">
              <div className="custodian-avatar">
                <span>{sanctuary.host?.initials || 'AC'}</span>
              </div>
              <div className="custodian-info">
                <div className="custodian-header">
                  <h4>{sanctuary.host?.name || 'Architectural Custodian'}</h4>
                  <span className="verified-badge">VERIFIED ARCHITECT</span>
                </div>
                <p className="custodian-bio">
                  {sanctuary.host?.bio || 'Preserving indigenous material craft and quiet architectural retreats across India.'}
                </p>
              </div>
              <button
                type="button"
                className="btn-architectural btn-secondary btn-sm"
                onClick={handleInquire}
              >
                Inquire
              </button>
            </div>
          </div>

          {/* Guest Reviews */}
          <div className="detail-section-block">
            <div className="reviews-header-row">
              <div>
                <h3 className="section-eyebrow">GUEST IMPRESSIONS</h3>
                <h4 className="reviews-subheading">
                  ★ {sanctuary.rating} · {sanctuary.reviews?.length || 0} Verified Stays
                </h4>
              </div>
              <button
                type="button"
                className="btn-architectural btn-sm"
                onClick={handleWriteImpression}
              >
                + Share Impression
              </button>
            </div>

            <div className="reviews-cards-grid">
              {sanctuary.reviews && sanctuary.reviews.length > 0 ? (
                sanctuary.reviews.map((rev, idx) => (
                  <div key={idx} className="guest-impression-card">
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
                  No guest impressions recorded yet. Be among the first to experience this sanctuary.
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
              <span className="widget-unit">/ night (+ 12% GST)</span>
            </div>

            <div className="booking-widget-dates">
              <div className="date-cell">
                <label>CHECK-IN</label>
                <span>Select Dates</span>
              </div>
              <div className="date-cell">
                <label>CHECK-OUT</label>
                <span>Select Dates</span>
              </div>
            </div>

            <div className="booking-widget-guests">
              <label>OCCUPANCY</label>
              <span>Up to {sanctuary.guests} Guests · Entire Sanctuary</span>
            </div>

            <button
              type="button"
              className="btn-architectural btn-primary btn-widget-cta"
              onClick={handleBookNow}
            >
              <span>Instant Boarding Pass</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <p className="widget-guarantee-note">
              No immediate deduction · Receive verified custodian key upon confirmation
            </p>

            <div className="widget-highlights-list">
              <div className="highlight-row">
                <span className="highlight-icon">✓</span>
                <span>Direct custodian communication & concierge</span>
              </div>
              <div className="highlight-row">
                <span className="highlight-icon">✓</span>
                <span>Autonomous keyless or hosted check-in</span>
              </div>
              <div className="highlight-row">
                <span className="highlight-icon">✓</span>
                <span>Complimentary organic local morning brew</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
