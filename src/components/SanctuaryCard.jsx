import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useKanso } from '../context/KansoContext';

import SmoothImage from './SmoothImage';

export default function SanctuaryCard({ sanctuary, index }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, setBookingSanctuaryId } = useKanso();
  const isSaved = wishlist.includes(sanctuary.id);
  const indexNumber = String(index + 1).padStart(2, '0');

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(sanctuary.id);
  };

  const handleNavigate = () => {
    navigate(`/sanctuary/${sanctuary.id}`);
  };

  return (
    <article className="sanctuary-card scroll-reveal" data-id={sanctuary.id}>
      {/* Visual Frame */}
      <div
        className="card-media"
        onClick={handleNavigate}
        role="button"
        tabIndex={0}
      >
        <SmoothImage src={sanctuary.coverImg} alt={sanctuary.title} />
        <span className="card-index-tag">LOC // {indexNumber}</span>
        <button
          type="button"
          className={`card-save-btn ${isSaved ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label={isSaved ? `Remove ${sanctuary.title} from wishlist` : `Save ${sanctuary.title} to wishlist`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isSaved ? 'var(--accent-earth)' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* Meta info */}
      <div className="card-content">
        <div className="card-top-meta">
          <span className="card-region">
            {sanctuary.region} · {sanctuary.type}
          </span>
          <span className="card-rating">
            ★ {sanctuary.rating} ({sanctuary.reviewsCount})
          </span>
        </div>

        <h3 className="card-title">
          <Link to={`/sanctuary/${sanctuary.id}`}>{sanctuary.title}</Link>
        </h3>
        <p className="card-specs">
          {sanctuary.location} · {sanctuary.specs}
        </p>

        <div className="card-amenities-tags">
          {sanctuary.amenities.slice(0, 3).map((a, i) => (
            <span key={i} className="amenity-tag">
              {a}
            </span>
          ))}
        </div>

        <div className="card-footer">
          <div className="card-price-block">
            <span className="rate-val">₹{sanctuary.price.toLocaleString('en-IN')}</span>
            <span className="rate-unit">/ night</span>
          </div>
          <div className="card-actions-row">
            <Link
              to={`/sanctuary/${sanctuary.id}`}
              className="btn-architectural btn-sm btn-secondary"
            >
              Explore
            </Link>
            <button
              type="button"
              className="btn-architectural btn-sm btn-primary"
              onClick={() => setBookingSanctuaryId(sanctuary.id)}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
