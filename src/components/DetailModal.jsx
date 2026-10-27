import React, { useState } from 'react';
import { useRental } from '../context/RentalContext';
import SmoothImage from './SmoothImage';
import {
  IconPin,
  IconStar,
  IconClose,
  IconLease,
  IconDeposit,
  IconMetro,
  IconWork,
  IconShopping,
  IconUtility,
  IconSparkle
} from './Icons';

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
  } = useRental();

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
      <div className="modal-box modal-detail" onClick={(e) => e.stopPropagation()}>
        {/* Modal Topbar */}
        <div className="detail-modal-topbar">
          <div className="topbar-left">
            <span className="room-id-tag">ROOM // {sanctuary.id.toUpperCase()}</span>
            <span className="room-type-tag"><IconPin size={12} style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '3px' }} /> {sanctuary.localArea?.toUpperCase()} · {sanctuary.city?.toUpperCase() || sanctuary.region?.toUpperCase()}</span>
          </div>
          <div className="topbar-right">
            <button
              type="button"
              className={`btn-save-round ${isSaved ? 'active' : ''}`}
              onClick={() => toggleWishlist(sanctuary.id)}
              aria-label={isSaved ? 'Remove from saved' : 'Save room'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? 'var(--accent-earth)' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleClose}
              aria-label="Close details"
            >
              <IconClose size={16} />
            </button>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="detail-grid">
          {/* Visual Gallery */}
          <div className="detail-gallery">
            <div className="main-gallery-view">
              <SmoothImage src={activeImg} alt={sanctuary.title} />
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
                    <SmoothImage src={imgUrl} alt={`${sanctuary.title} view ${idx + 1}`} />
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
                  <IconStar size={13} fill="currentColor" style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '2px' }} /> <strong>{sanctuary.rating}</strong> ({sanctuary.reviewsCount} reviews)
                </span>
              </div>
            </div>

            <div className="detail-specs-bar">{sanctuary.specs}</div>

            {/* Long-Stay Lease & Local Transit Specs */}
            <div className="detail-longstay-box">
              <div className="longstay-row">
                <span className="ls-label"><IconLease size={14} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '4px' }} /> Lease Agreement:</span>
                <span className="ls-val">{sanctuary.leaseTerm || '11-Month Renewable Agreement'} (Lock-in: {sanctuary.lockInPeriod || '3 Mos'})</span>
              </div>
              <div className="longstay-row">
                <span className="ls-label"><IconDeposit size={14} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '4px' }} /> Security Deposit:</span>
                <span className="ls-val">{sanctuary.depositText || `₹${(sanctuary.price * 2).toLocaleString('en-IN')} (Refundable)`}</span>
              </div>
              {sanctuary.metroProximity && (
                <div className="longstay-row">
                  <span className="ls-label"><IconMetro size={14} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '4px' }} /> Transit & Metro:</span>
                  <span className="ls-val">{sanctuary.metroProximity}</span>
                </div>
              )}
              {sanctuary.techParkProximity && (
                <div className="longstay-row">
                  <span className="ls-label"><IconWork size={14} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '4px' }} /> Work Proximity:</span>
                  <span className="ls-val">{sanctuary.techParkProximity}</span>
                </div>
              )}
              {sanctuary.dailyEssentials && (
                <div className="longstay-row">
                  <span className="ls-label"><IconShopping size={14} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '4px' }} /> Daily Essentials:</span>
                  <span className="ls-val">{sanctuary.dailyEssentials}</span>
                </div>
              )}
              {sanctuary.utilityBillSharing && (
                <div className="longstay-row">
                  <span className="ls-label"><IconUtility size={14} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '4px' }} /> Bills & Utilities:</span>
                  <span className="ls-val">{sanctuary.utilityBillSharing}</span>
                </div>
              )}
            </div>

            <div className="detail-narrative">
              <h4>ROOM OVERVIEW & LIVING DETAILS</h4>
              <p>{sanctuary.narrative}</p>
            </div>

            {/* Amenities Pills */}
            <div className="detail-amenities-section">
              <h4>INCLUDED ROOM AMENITIES</h4>
              <div className="amenities-pill-grid">
                {sanctuary.amenities.map((item, idx) => (
                  <span key={idx} className="amenity-pill-item">
                    <IconSparkle size={12} style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '4px' }} /> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Host Identity Card */}
            <div className="detail-host-card">
              <div className="host-avatar-box">
                <span>{sanctuary.host?.initials || 'RO'}</span>
              </div>
              <div className="host-card-info">
                <div className="host-name-role">
                  <h5>{sanctuary.host?.name || 'Verified Room Owner'}</h5>
                  <span className="verified-host-tag">VERIFIED RESIDENT</span>
                </div>
                <p>{sanctuary.host?.bio || 'Welcoming respectful, clean, and quiet flatmates.'}</p>
              </div>
              <button
                type="button"
                className="btn-architectural btn-sm"
                onClick={handleInquire}
              >
                Chat with Owner
              </button>
            </div>

            {/* Quick Reserve Floating Action Box */}
            <div className="detail-booking-action-box">
              <div className="action-price-block">
                <span className="action-rent">₹{sanctuary.price.toLocaleString('en-IN')}</span>
                <span className="action-period">{sanctuary.pricePeriod || '/ month'} · Zero Brokerage</span>
              </div>
              <div className="action-buttons-group">
                <button
                  type="button"
                  className="btn-architectural btn-primary"
                  onClick={handleBookNow}
                >
                  Apply & Reserve Room
                </button>
              </div>
            </div>

            {/* Tenant Impressions / Reviews */}
            <div className="detail-impressions-list">
              <div className="impressions-header">
                <h4>VERIFIED TENANT EXPERIENCES</h4>
                <button
                  type="button"
                  className="btn-add-impression-link"
                  onClick={handleWriteImpression}
                >
                  + Add Review
                </button>
              </div>

              {sanctuary.reviews && sanctuary.reviews.length > 0 ? (
                sanctuary.reviews.map((r, i) => (
                  <div key={i} className="impression-item">
                    <div className="impression-author-bar">
                      <span className="author-name">{r.author}</span>
                      <span className="author-score"><IconStar size={12} fill="currentColor" style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '2px' }} /> {r.score}</span>
                      <span className="author-date">{r.date}</span>
                    </div>
                    <p className="impression-text">"{r.text}"</p>
                  </div>
                ))
              ) : (
                <p className="no-reviews-text">No reviews recorded yet for this room.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
