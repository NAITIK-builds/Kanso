import React, { useMemo } from 'react';
import { useRental } from '../context/RentalContext';
import SanctuaryCard from './SanctuaryCard';

export default function SanctuaryGrid() {
  const { listings, activeFilter, setActiveFilter } = useRental();

  const filteredListings = useMemo(() => {
    return listings
      .filter((p) => {
        // Region / City check
        if (activeFilter.region !== 'all' && p.region !== activeFilter.region && p.city !== activeFilter.region) {
          return false;
        }
        // Local Area check
        if (activeFilter.localArea && activeFilter.localArea !== 'all') {
          if (p.localArea?.toLowerCase() !== activeFilter.localArea.toLowerCase()) {
            return false;
          }
        }
        // Type check
        if (activeFilter.type !== 'all' && p.type !== activeFilter.type) {
          return false;
        }
        // Price check
        if (p.price > activeFilter.maxPrice) {
          return false;
        }
        // Amenities check
        if (activeFilter.amenities.length > 0) {
          const hasAll = activeFilter.amenities.every((a) => p.amenities.includes(a));
          if (!hasAll) return false;
        }
        // Text search query
        if (activeFilter.searchQuery.trim() !== '') {
          const q = activeFilter.searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchLoc = p.location.toLowerCase().includes(q);
          const matchReg = p.region.toLowerCase().includes(q);
          const matchArea = p.localArea?.toLowerCase().includes(q);
          const matchMetro = p.metroProximity?.toLowerCase().includes(q);
          const matchTech = p.techParkProximity?.toLowerCase().includes(q);
          const matchNarrative = p.narrative.toLowerCase().includes(q);
          const matchHost = p.host?.name.toLowerCase().includes(q);
          if (!matchTitle && !matchLoc && !matchReg && !matchArea && !matchMetro && !matchTech && !matchNarrative && !matchHost) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (activeFilter.sortBy === 'price-asc') return a.price - b.price;
        if (activeFilter.sortBy === 'price-desc') return b.price - a.price;
        if (activeFilter.sortBy === 'rating') return b.rating - a.rating;
        return 0; // curated order
      });
  }, [listings, activeFilter]);

  const handleResetFilters = () => {
    setActiveFilter({
      region: 'all',
      localArea: 'all',
      type: 'all',
      maxPrice: 40000,
      amenities: [],
      sortBy: 'curated',
      searchQuery: '',
      checkIn: '',
      checkOut: '',
      guests: '1'
    });
  };

  return (
    <section className="gallery-section container" id="sanctuaryGridSection">
      <div className="gallery-header scroll-reveal">
        <div className="section-title-wrap">
          <span className="catalogue-badge">INDEX // ROOMS & FLATSHARES</span>
          <h2 className="section-title">Verified Rooms for Rent</h2>
        </div>
        <div className="results-stats">
          <span>Showing {filteredListings.length} verified rooms</span> · Zero Brokerage · Rent in ₹/month
        </div>
      </div>

      {/* Grid of Architectural Cards */}
      {filteredListings.length > 0 ? (
        <div className="sanctuary-grid" id="sanctuaryGrid">
          {filteredListings.map((item, index) => (
            <SanctuaryCard key={item.id} sanctuary={item} index={index} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 21V10a8 8 0 0 1 16 0v11" />
              <path d="M9 21v-6a3 3 0 0 1 6 0v6" />
            </svg>
          </div>
          <h3>No Rooms Found</h3>
          <p>No verified rooms match your selected filters. Try broadening your city, budget, or amenities.</p>
          <button type="button" className="btn-architectural" onClick={handleResetFilters}>
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
}
