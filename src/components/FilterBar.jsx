import React from 'react';
import { useKanso } from '../context/KansoContext';

const PROPERTY_TYPES = [
  { id: 'all', label: 'All Sanctuaries' },
  { id: 'Villa', label: 'Stone & Coastal Villas' },
  { id: 'Chalet', label: 'Mountain & Cedar Chalets' },
  { id: 'Haveli', label: 'Heritage Havelis' },
  { id: 'Bungalow', label: 'Plantation Bungalows' },
  { id: 'Loft', label: 'Atelier & Urban Lofts' }
];

export default function FilterBar() {
  const { activeFilter, setActiveFilter, setIsAmenitiesModalOpen } = useKanso();

  const handleTypeChange = (typeId) => {
    setActiveFilter((prev) => ({
      ...prev,
      type: typeId
    }));
  };

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setActiveFilter((prev) => ({
      ...prev,
      maxPrice: val
    }));
  };

  const handleSortChange = (e) => {
    setActiveFilter((prev) => ({
      ...prev,
      sortBy: e.target.value
    }));
  };

  return (
    <section className="filter-strip-section">
      <div className="container filter-strip-inner">
        {/* Property Type Tabs */}
        <div className="type-scroll-track">
          {PROPERTY_TYPES.map((type) => {
            const isActive = activeFilter.type === type.id;
            return (
              <button
                key={type.id}
                type="button"
                className={`type-tab ${isActive ? 'active' : ''}`}
                onClick={() => handleTypeChange(type.id)}
              >
                {isActive && <span className="tab-dot"></span>}
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filters & Sort Controls */}
        <div className="filter-actions">
          <div className="price-display-pill">
            <label htmlFor="priceMaxRange">
              Max: <strong>₹{activeFilter.maxPrice.toLocaleString('en-IN')}</strong>
            </label>
            <input
              type="range"
              id="priceMaxRange"
              min="4000"
              max="60000"
              step="1000"
              value={activeFilter.maxPrice}
              onChange={handlePriceChange}
              aria-label="Filter maximum price per night"
            />
          </div>

          <button
            type="button"
            className="filter-drawer-btn"
            onClick={() => setIsAmenitiesModalOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            <span>Amenities ({activeFilter.amenities.length})</span>
          </button>

          <select
            className="sort-select"
            value={activeFilter.sortBy}
            onChange={handleSortChange}
            aria-label="Sort listings"
          >
            <option value="curated">Curated Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </section>
  );
}
