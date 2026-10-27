import React from 'react';
import { Link } from 'react-router-dom';
import { useKanso } from '../context/KansoContext';
import SanctuaryCard from '../components/SanctuaryCard';
import { IconHeart } from '../components/Icons';

export default function WishlistPage() {
  const { wishlist, listings } = useKanso();

  const savedSanctuaries = listings.filter((s) => wishlist.includes(s.id));

  return (
    <div className="wishlist-page container">
      {/* Header */}
      <div className="page-header-block">
        <div className="page-stamp-tag">SAVED ROOMS & FLATSHARES</div>
        <h1 className="page-heading">Your Saved Rooms ({savedSanctuaries.length})</h1>
        <p className="page-subheading">
          Curated private bedrooms, studios, and verified flatshares saved for your next move.
        </p>
      </div>

      {/* Grid */}
      {savedSanctuaries.length > 0 ? (
        <div className="sanctuary-grid">
          {savedSanctuaries.map((sanctuary, idx) => (
            <SanctuaryCard key={sanctuary.id} sanctuary={sanctuary} index={idx} />
          ))}
        </div>
      ) : (
        <div className="journeys-empty-card">
          <div className="empty-icon-wrap">
            <IconHeart size={36} style={{ color: 'var(--accent-earth)' }} />
          </div>
          <h3>Your Room Shortlist is Empty</h3>
          <p>Tap the bookmark heart icon on any room while browsing to save it to your private shortlist.</p>
          <Link to="/" className="btn-architectural btn-primary">
            Discover Available Rooms
          </Link>
        </div>
      )}
    </div>
  );
}
