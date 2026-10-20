import React from 'react';
import { Link } from 'react-router-dom';
import { useKanso } from '../context/KansoContext';
import SanctuaryCard from '../components/SanctuaryCard';

export default function WishlistPage() {
  const { wishlist, listings } = useKanso();

  const savedSanctuaries = listings.filter((s) => wishlist.includes(s.id));

  return (
    <div className="wishlist-page container">
      {/* Header */}
      <div className="page-header-block">
        <div className="page-stamp-tag">SAVED ARCHITECTURAL RETREATS</div>
        <h1 className="page-heading">Your Saved Sanctuaries ({savedSanctuaries.length})</h1>
        <p className="page-subheading">
          Hand-picked residences, mountain chalets, and private estates saved for future mindful escapes.
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
          <div className="empty-icon-wrap">♡</div>
          <h3>Your Wishlist is Empty</h3>
          <p>Tap the heart icon on any sanctuary while browsing to save it to your private collection.</p>
          <Link to="/" className="btn-architectural btn-primary">
            Discover Sanctuaries
          </Link>
        </div>
      )}
    </div>
  );
}
