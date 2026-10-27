import React from 'react';
import { useRental } from '../context/RentalContext';
import { IconPin } from './Icons';

const CITIES = [
  { id: 'all', label: 'All Cities' },
  { id: 'Kanpur', label: 'Kanpur' },
  { id: 'Bengaluru', label: 'Bengaluru' },
  { id: 'Mumbai', label: 'Mumbai' },
  { id: 'Delhi-NCR', label: 'Delhi-NCR' },
  { id: 'Pune', label: 'Pune' },
  { id: 'Hyderabad', label: 'Hyderabad' }
];

const LOCAL_AREAS_BY_CITY = {
  Kanpur: ['Swaroop Nagar', 'Kakadeo', 'Kalyanpur (IIT)', 'Civil Lines', 'Tilak Nagar', 'Kidwai Nagar', 'Mall Road', 'Barra'],
  Bengaluru: ['Indiranagar', 'HSR Layout', 'Koramangala', 'Whitefield', 'BTM Layout'],
  Mumbai: ['Bandra West', 'Andheri West', 'Powai'],
  'Delhi-NCR': ['Cyber City Gurgaon', 'Noida Sector 62', 'Hauz Khas'],
  Pune: ['Hinjawadi', 'Koregaon Park'],
  Hyderabad: ['Hitec City', 'Gachibowli']
};

const ALL_POPULAR_AREAS = [
  'Swaroop Nagar', 'Kakadeo', 'Kalyanpur (IIT)', 'Civil Lines',
  'Indiranagar', 'HSR Layout', 'Koramangala', 'Whitefield',
  'Bandra West', 'Powai', 'Cyber City Gurgaon', 'Hinjawadi', 'Hitec City'
];

const PROPERTY_TYPES = [
  { id: 'all', label: 'All Rooms' },
  { id: 'Private Room', label: 'Private Master Rooms' },
  { id: 'Single Room', label: 'Single / Solo Rooms' },
  { id: 'Shared Room', label: 'Shared / Twin' },
  { id: 'Studio Room', label: 'Studio Rooms / 1RK' },
  { id: 'Co-Living', label: 'Co-Living Suites' }
];

export default function FilterBar() {
  const { activeFilter, setActiveFilter, setIsAmenitiesModalOpen } = useRental();

  const handleCityChange = (cityId) => {
    setActiveFilter((prev) => ({
      ...prev,
      region: cityId,
      localArea: 'all'
    }));
  };

  const handleLocalAreaChange = (area) => {
    setActiveFilter((prev) => ({
      ...prev,
      localArea: prev.localArea === area ? 'all' : area
    }));
  };

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

  const displayedAreas =
    activeFilter.region !== 'all' && LOCAL_AREAS_BY_CITY[activeFilter.region]
      ? LOCAL_AREAS_BY_CITY[activeFilter.region]
      : ALL_POPULAR_AREAS;

  return (
    <section className="filter-strip-section">
      <div className="container filter-strip-inner">
        {/* Row 1: City & Local Area Selector Row */}
        <div className="filter-local-strip">
          <div className="city-pill-tabs">
            <span className="strip-label">CITY:</span>
            {CITIES.map((c) => {
              const isActive = activeFilter.region === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`city-pill ${isActive ? 'active' : ''}`}
                  onClick={() => handleCityChange(c.id)}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="local-area-pills-row">
            <span className="strip-label">LOCAL SECTOR:</span>
            <button
              type="button"
              className={`area-pill ${activeFilter.localArea === 'all' ? 'active' : ''}`}
              onClick={() => handleLocalAreaChange('all')}
            >
              All {activeFilter.region !== 'all' ? `${activeFilter.region} ` : ''}Sectors
            </button>
            {displayedAreas.map((area) => {
              const isAreaActive = activeFilter.localArea === area;
              return (
                <button
                  key={area}
                  type="button"
                  className={`area-pill ${isAreaActive ? 'active' : ''}`}
                  onClick={() => handleLocalAreaChange(area)}
                >
                  <IconPin size={13} style={{ marginRight: '4px' }} />
                  {area}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Room Type Tabs & Action Controls */}
        <div className="filter-main-row">
          {/* Room Type Tabs */}
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
                Max Rent: <strong>₹{activeFilter.maxPrice.toLocaleString('en-IN')}</strong>/mo
              </label>
              <input
                type="range"
                id="priceMaxRange"
                min="5000"
                max="40000"
                step="500"
                value={activeFilter.maxPrice}
                onChange={handlePriceChange}
                aria-label="Filter maximum monthly rent"
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
              <option value="price-asc">Rent: Low to High</option>
              <option value="price-desc">Rent: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
