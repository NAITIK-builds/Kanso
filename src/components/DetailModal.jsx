import React, { useState } from 'react';
import { useKanso } from '../context/KansoContext';

export default function DetailModal() {
  const {
    listings,
    detailSanctuaryId,
    setDetailSanctuaryId,
    wishlist,
    toggleWishlist,
    setBookingSanctuaryId,
    setInquiryTarget,
    setAddReviewTarget
  } = useKanso();

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!detailSanctuaryId) return null;

  const sanctuary = listings.find((s) => s.id === detailSanctuaryId);
  if (!sanctuary) return null;

  const isSaved = wishlist.includes(sanctuary.id);
  const gallery = sanctuary.gallery && sanctuary.gallery.length > 0 ? sanctuary.gallery : [sanctuary.coverImg];
  const activeImg = gallery[activeImgIndex] || sanctuary.coverImg;

  const handleClose = () => {
    setDetailSanctuaryId(null);
    setActiveImgIndex(0);
  };

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
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-box modal-xl" onClick={(e) => e.stopPropagation()}>
        {/* Top bar */}
        <div className="detail-header-bar">
          <div className="detail-breadcrumbs">
            <span>{sanctuary.region.toUpperCase()}</span> //{' '}
            <span>{sanctuary.type.toUpperCase()}</span> //{' '}
            <span>{sanctuary.id.toUpperCase()}</span>
          </div>
          <div className="detail-top-actions">
            <button
              type="button"
              className={`action-icon-pill ${isSaved ? 'active' : ''}`}
              onClick={() => toggleWishlist(sanctuary.id)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isSaved ? 'var(--accent-earth)' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{isSaved ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
            </button>
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleClose}
              aria-label="Close detail modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="detail-grid">
          {/* Visual Gallery */}
          <div className="detail-gallery">
            <div className="main-gallery-view">
              <img src={activeImg} alt={sanctuary.title} />
            </div>
            {gallery.length > 1 && (
              <div className="gallery-thumbs">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${idx === activeImgIndex ? 'active' : ''}`}
                    onClick={() => setActiveImgIndex(idx)}
                  >
                    <img src={imgUrl} alt={`${sanctuary.title} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Space Narrative & Specs */}
          <div className="detail-info-pane">
            <div className="detail-title-group">
              <h2>{sanctuary.title}</h2>
              <div className="detail-location-rating">
                <span>{sanctuary.location}</span> ·{' '}
                <span className="rating-badge">
                  ★ <strong>{sanctuary.rating}</strong> ({sanctuary.reviewsCount} reviews)
                </span>
              </div>
            </div>

            <div className="detail-specs-bar">{sanctuary.specs}</div>

            <div className="detail-narrative">
              <h4>THE ARCHITECTURAL NARRATIVE</h4>
              <p>{sanctuary.narrative}</p>
            </div>

            {/* Amenities Pills */}
            <div className="detail-amenities-section">
              <h4>SANCTUARY PROVISIONS</h4>
              <div className="amenities-pill-grid">
                {sanctuary.amenities.map((item, idx) => (
                  <span key={idx} className="amenity-pill-item">
                    ✦ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Host Identity Card */}
            <div className="detail-host-card">
              <div className="host-avatar-box">
                <span>{sanctuary.host?.initials || 'AC'}</span>
              </div>
              <div className="host-card-info">
                <div className="host-name-role">
                  <h5>{sanctuary.host?.name || 'Architect Custodian'}</h5>
                  <span className="verified-host-tag">VERIFIED CUSTODIAN</span>
                </div>
                <p>{sanctuary.host?.bio || 'Preserving regional architectural heritage.'}</p>
              </div>
              <button
                type="button"
                className="btn-architectural btn-sm"
                onClick={handleInquire}
              >
                Inquire
              </button>
            </div>

            {/* Quick Reserve Floating Action Box */}
            <div className="detail-booking-action-box">
              <div className="box-rate">
                <span className="rate-amount">₹{sanctuary.price.toLocaleString('en-IN')}</span>
                <span className="rate-period">/ night (+ 12% GST)</span>
              </div>
              <button
                type="button"
                className="btn-architectural btn-primary btn-book"
                onClick={handleBookNow}
              >
                Book Instantly
              </button>
            </div>
          </div>
        </div>

        {/* Guest Reviews Section */}
        <div className="detail-reviews-section">
          <div className="reviews-header">
            <h3>Guest Impressions ({sanctuary.reviews?.length || 0})</h3>
            <button
              type="button"
              className="btn-architectural btn-sm"
              onClick={handleWriteImpression}
            >
              + Write Impression
            </button>
          </div>
          <div className="reviews-masonry">
            {sanctuary.reviews && sanctuary.reviews.length > 0 ? (
              sanctuary.reviews.map((rev, idx) => (
                <div key={idx} className="review-card">
                  <div className="review-card-header">
                    <span className="review-author">{rev.author}</span>
                    <span className="review-score">★ {rev.score}</span>
                  </div>
                  <span className="review-date">{rev.date}</span>
                  <p className="review-text">"{rev.text}"</p>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--ink-tertiary)', fontStyle: 'italic', padding: '16px 0' }}>
                No guest impressions yet. Be the first to share your experience.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
