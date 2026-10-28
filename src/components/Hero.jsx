import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useRental } from '../context/RentalContext';
import SmoothImage from './SmoothImage';
import { IconPin, IconBed, IconRupee, IconUsers, IconSearch } from './Icons';

const AUTOPLAY_INTERVAL = 4800; // 4.8 seconds per slide for a comfortable reading cadence

export default function Hero() {
  const { listings, activeFilter, setActiveFilter } = useRental();
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [slideAnimKey, setSlideAnimKey] = useState(0);

  // Drag / Swipe gesture states
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const isPointerDown = useRef(false);
  const pillsTrackRef = useRef(null);

  const scrollPills = (dir) => {
    if (pillsTrackRef.current) {
      const scrollAmount = dir === 'left' ? -220 : 220;
      pillsTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePillsWheel = (e) => {
    if (pillsTrackRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      pillsTrackRef.current.scrollLeft += e.deltaY;
    }
  };

  // Synchronize showcase if region filter changes
  useEffect(() => {
    if (activeFilter.region && activeFilter.region !== 'all' && listings?.length) {
      const idx = listings.findIndex((s) =>
        s.region.toLowerCase().includes(activeFilter.region.toLowerCase())
      );
      if (idx !== -1 && idx !== showcaseIndex) {
        setDirection(idx > showcaseIndex ? 'next' : 'prev');
        setShowcaseIndex(idx);
        setSlideAnimKey((k) => k + 1);
      }
    }
  }, [activeFilter.region, listings]);

  const totalSanctuaries = listings?.length || 0;
  const currentSanctuary = listings?.[showcaseIndex] || listings?.[0];

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setDirection('prev');
    setShowcaseIndex((prev) => (prev === 0 ? totalSanctuaries - 1 : prev - 1));
    setSlideAnimKey((k) => k + 1);
  }, [totalSanctuaries]);

  const handleNext = useCallback(() => {
    setDirection('next');
    setShowcaseIndex((prev) => (prev === totalSanctuaries - 1 ? 0 : prev + 1));
    setSlideAnimKey((k) => k + 1);
  }, [totalSanctuaries]);

  const toggleAutoPlay = () => {
    setIsAutoPlayActive((prev) => !prev);
  };

  // Autoplay timer effect
  const isPaused = isHovered || !isAutoPlayActive || isDragging;
  useEffect(() => {
    if (isPaused || totalSanctuaries <= 1) return;

    const timer = setTimeout(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);

    return () => clearTimeout(timer);
  }, [showcaseIndex, isPaused, totalSanctuaries, handleNext]);

  // Touch and Mouse Swipe Handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    dragStartX.current = touch.clientX;
    isPointerDown.current = true;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isPointerDown.current) return;
    const touch = e.touches[0];
    const diff = touch.clientX - dragStartX.current;
    setDragOffset(Math.max(-80, Math.min(80, diff)));
  };

  const handleTouchEnd = () => {
    if (!isPointerDown.current) return;
    if (dragOffset < -35) {
      handleNext();
    } else if (dragOffset > 35) {
      handlePrev();
    }
    isPointerDown.current = false;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    dragStartX.current = e.clientX;
    isPointerDown.current = true;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isPointerDown.current) return;
    const diff = e.clientX - dragStartX.current;
    setDragOffset(Math.max(-80, Math.min(80, diff)));
  };

  const handleMouseUp = () => {
    if (!isPointerDown.current) return;
    if (dragOffset < -35) {
      handleNext();
    } else if (dragOffset > 35) {
      handlePrev();
    }
    isPointerDown.current = false;
    setIsDragging(false);
    setDragOffset(0);
  };

  // Search form submit with smooth scroll to collection
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const grid = document.getElementById('sanctuaryGridSection') || document.getElementById('sanctuaryGrid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLocationSelect = (e) => {
    const val = e.target.value;
    if (val === 'all') {
      setActiveFilter((prev) => ({ ...prev, region: 'all', localArea: 'all' }));
    } else if (val.startsWith('city:')) {
      const cityName = val.replace('city:', '');
      setActiveFilter((prev) => ({ ...prev, region: cityName, localArea: 'all' }));
    } else {
      const areaToCityMap = {
        'Swaroop Nagar': 'Kanpur',
        'Kakadeo': 'Kanpur',
        'Kalyanpur (IIT)': 'Kanpur',
        'Civil Lines': 'Kanpur',
        'Tilak Nagar': 'Kanpur',
        'Kidwai Nagar': 'Kanpur',
        'Mall Road': 'Kanpur',
        'Barra': 'Kanpur',
        'Indiranagar': 'Bengaluru',
        'HSR Layout': 'Bengaluru',
        'Koramangala': 'Bengaluru',
        'Whitefield': 'Bengaluru',
        'BTM Layout': 'Bengaluru',
        'Bandra West': 'Mumbai',
        'Andheri West': 'Mumbai',
        'Powai': 'Mumbai',
        'Cyber City Gurgaon': 'Delhi-NCR',
        'Noida Sector 62': 'Delhi-NCR',
        'Hauz Khas': 'Delhi-NCR',
        'Hinjawadi': 'Pune',
        'Koregaon Park': 'Pune',
        'Hitec City': 'Hyderabad',
        'Gachibowli': 'Hyderabad'
      };
      const city = areaToCityMap[val] || 'all';
      setActiveFilter((prev) => ({ ...prev, region: city, localArea: val }));
    }
  };

  const handleBudgetSelect = (e) => {
    const val = e.target.value;
    setActiveFilter((prev) => ({
      ...prev,
      maxPrice: val === 'all' ? 40000 : Number(val)
    }));
  };

  const handleScrollToGrid = () => {
    const grid = document.getElementById('sanctuaryGridSection') || document.getElementById('sanctuaryGrid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!currentSanctuary) return null;

  const selectedLocationValue =
    activeFilter.localArea && activeFilter.localArea !== 'all'
      ? activeFilter.localArea
      : activeFilter.region !== 'all'
      ? `city:${activeFilter.region}`
      : 'all';

  // Prevent duplicate city in location string (e.g. "Kakadeo, Kanpur · KANPUR")
  const rawLoc = currentSanctuary.location || '';
  const rawCity = currentSanctuary.region || currentSanctuary.city || '';
  const displayLocation = rawLoc.toLowerCase().includes(rawCity.toLowerCase())
    ? rawLoc
    : `${rawLoc} · ${rawCity}`;

  return (
    <section className="hero-fullscreen-wrap" aria-label="Welcome and Featured Sanctuaries">
      <div className="hero-split container">
        {/* Left Editorial Column */}
        <div className="hero-left">
          <div className="hero-curation-stamp">
            <span className="stamp-dot" aria-hidden="true" />
            <span>VERIFIED DIRECTORY // 100% ZERO BROKERAGE ROOMS 2026</span>
          </div>

          <h1 className="hero-headline">
            Find verified rooms in your <em>neighborhood</em>.
          </h1>

          <p className="hero-manifesto">
            Curated private rooms, master suites, and studios in prime residential layouts & tech corridors. Built for peaceful long-term living with 11-month agreements, zero brokerage, and direct owner connections.
          </p>

          {/* Upgraded Interactive Search & Filter Capsule */}
          <form className="hero-search-capsule" onSubmit={handleSearchSubmit}>
            {/* Cell 1: Local Area / City */}
            <div className="search-cell">
              <div className="cell-header">
                <IconPin size={13} className="cell-icon" />
                <label htmlFor="heroLocation">LOCALITY / CITY</label>
              </div>
              <select
                id="heroLocation"
                aria-label="Select Local Area or City"
                value={selectedLocationValue}
                onChange={handleLocationSelect}
              >
                <option value="all">All Cities & Areas</option>

                <optgroup label="Kanpur Localities">
                  <option value="city:Kanpur">All Kanpur</option>
                  <option value="Swaroop Nagar">Swaroop Nagar (Motijheel / Rave 3)</option>
                  <option value="Kakadeo">Kakadeo (Coaching Hub / Libraries)</option>
                  <option value="Kalyanpur (IIT)">Kalyanpur (IIT Kanpur Gate)</option>
                  <option value="Civil Lines">Civil Lines (Green Park / VIP Rd)</option>
                  <option value="Tilak Nagar">Tilak Nagar (Company Bagh)</option>
                  <option value="Kidwai Nagar">Kidwai Nagar (South Hub)</option>
                </optgroup>

                <optgroup label="Bengaluru Neighborhoods">
                  <option value="city:Bengaluru">All Bengaluru</option>
                  <option value="Indiranagar">Indiranagar (100ft Rd / Defense Colony)</option>
                  <option value="HSR Layout">HSR Layout (Sector 2 & 27th Main)</option>
                  <option value="Koramangala">Koramangala (4th & 5th Block)</option>
                  <option value="Whitefield">Whitefield (ITPB & Hope Farm)</option>
                  <option value="BTM Layout">BTM Layout (Stage 2 / Silk Board)</option>
                </optgroup>

                <optgroup label="Mumbai Suburbs">
                  <option value="city:Mumbai">All Mumbai</option>
                  <option value="Bandra West">Bandra West (Pali Hill / Turner Rd)</option>
                  <option value="Andheri West">Andheri West (Lokhandwala)</option>
                  <option value="Powai">Powai (Hiranandani Gardens)</option>
                </optgroup>

                <optgroup label="Delhi-NCR">
                  <option value="city:Delhi-NCR">All Delhi-NCR</option>
                  <option value="Cyber City Gurgaon">Gurgaon (DLF Cyber City)</option>
                  <option value="Noida Sector 62">Noida (Sector 62)</option>
                  <option value="Hauz Khas">South Delhi (Hauz Khas)</option>
                </optgroup>

                <optgroup label="Pune">
                  <option value="city:Pune">All Pune</option>
                  <option value="Hinjawadi">Hinjawadi (Phase 1 Tech Park)</option>
                  <option value="Koregaon Park">Koregaon Park (North Main Rd)</option>
                </optgroup>

                <optgroup label="Hyderabad">
                  <option value="city:Hyderabad">All Hyderabad</option>
                  <option value="Hitec City">Hitec City (Madhapur / Cyber Towers)</option>
                  <option value="Gachibowli">Gachibowli (Financial District)</option>
                </optgroup>
              </select>
            </div>

            {/* Cell 2: Room Type */}
            <div className="search-cell">
              <div className="cell-header">
                <IconBed size={13} className="cell-icon" />
                <label htmlFor="heroType">ROOM TYPE</label>
              </div>
              <select
                id="heroType"
                aria-label="Select Room Type"
                value={activeFilter.type || 'all'}
                onChange={(e) => setActiveFilter((prev) => ({ ...prev, type: e.target.value }))}
              >
                <option value="all">All Types</option>
                <option value="Private Room">Private Master</option>
                <option value="Single Room">Single Room</option>
                <option value="Shared Room">Shared / Twin</option>
                <option value="Studio Room">Studio (1RK)</option>
                <option value="Co-Living">Co-Living Suite</option>
              </select>
            </div>

            {/* Cell 3: Monthly Budget */}
            <div className="search-cell">
              <div className="cell-header">
                <IconRupee size={13} className="cell-icon" />
                <label htmlFor="heroBudget">MAX BUDGET</label>
              </div>
              <select
                id="heroBudget"
                aria-label="Select Monthly Budget"
                value={activeFilter.maxPrice && activeFilter.maxPrice < 40000 ? String(activeFilter.maxPrice) : 'all'}
                onChange={handleBudgetSelect}
              >
                <option value="all">Any Budget</option>
                <option value="10000">Up to ₹10k</option>
                <option value="15000">Up to ₹15k</option>
                <option value="20000">Up to ₹20k</option>
                <option value="25000">Up to ₹25k</option>
                <option value="35000">Up to ₹35k</option>
              </select>
            </div>

            {/* Cell 4: Occupancy */}
            <div className="search-cell">
              <div className="cell-header">
                <IconUsers size={13} className="cell-icon" />
                <label htmlFor="heroGuests">TENANTS</label>
              </div>
              <select
                id="heroGuests"
                aria-label="Number of Tenants"
                value={activeFilter.guests || '1'}
                onChange={(e) => setActiveFilter((prev) => ({ ...prev, guests: e.target.value }))}
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
              </select>
            </div>

            {/* Submit CTA */}
            <button type="submit" className="hero-submit-btn" aria-label="Search Verified Local Rooms">
              <IconSearch size={16} />
              <span>Find Rooms</span>
            </button>
          </form>

          {/* Quick Local Area Filter Pills */}
          <div className="hero-micro-pills">
            <div className="micro-pills-header">
              <div className="micro-pills-title">
                <IconPin size={13} className="micro-pills-icon" />
                <span>Popular Local Areas</span>
              </div>
              <div className="micro-pills-nav">
                <button
                  type="button"
                  className="micro-nav-btn"
                  onClick={() => scrollPills('left')}
                  aria-label="Scroll localities left"
                  title="Previous areas"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="micro-nav-btn"
                  onClick={() => scrollPills('right')}
                  aria-label="Scroll localities right"
                  title="More areas"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              className="pills-scroll-track"
              ref={pillsTrackRef}
              onWheel={handlePillsWheel}
            >
              {[
                { label: 'All Cities', region: 'all', localArea: 'all' },
                { label: 'Kanpur', region: 'Kanpur', localArea: 'all' },
                { label: 'Swaroop Nagar', region: 'Kanpur', localArea: 'Swaroop Nagar' },
                { label: 'Kakadeo', region: 'Kanpur', localArea: 'Kakadeo' },
                { label: 'Kalyanpur', region: 'Kanpur', localArea: 'Kalyanpur (IIT)' },
                { label: 'Indiranagar', region: 'Bengaluru', localArea: 'Indiranagar' },
                { label: 'HSR Layout', region: 'Bengaluru', localArea: 'HSR Layout' },
                { label: 'Bandra West', region: 'Mumbai', localArea: 'Bandra West' },
                { label: 'Cyber City', region: 'Delhi-NCR', localArea: 'Cyber City Gurgaon' },
                { label: 'Hinjawadi', region: 'Pune', localArea: 'Hinjawadi' },
                { label: 'Hitec City', region: 'Hyderabad', localArea: 'Hitec City' }
              ].map((item) => {
                const isActive =
                  item.localArea === 'all'
                    ? (item.region === 'all' ? activeFilter.region === 'all' : activeFilter.region === item.region && activeFilter.localArea === 'all')
                    : (activeFilter.localArea === item.localArea);
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`micro-pill ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveFilter((prev) => ({
                        ...prev,
                        region: item.region,
                        localArea: item.localArea
                      }));
                      const target = document.getElementById('sanctuaryGridSection');
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Architectural Exhibition Showcase Frame */}
        <div className="hero-right">
          <div
            className={`exhibit-frame ${isHovered ? 'is-hovered' : ''} ${isDragging ? 'is-dragging' : ''}`}
            id="heroShowcaseCard"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              if (isPointerDown.current) handleMouseUp();
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* Header Controls */}
            <div className="exhibit-header-ctrls">
              <div className="exhibit-header-left">
                <span className="exhibit-stamp" key={`badge-${showcaseIndex}`}>
                  VERIFIED ROOM № {String(showcaseIndex + 1).padStart(2, '0')}
                </span>
                <span className={`exhibit-status-pill ${isPaused ? 'paused' : 'live'}`}>
                  {isHovered ? 'PAUSED' : isAutoPlayActive ? 'LIVE TOUR' : 'PAUSED'}
                </span>
              </div>

              <div className="exhibit-nav-arrows">
                <button
                  type="button"
                  className="exhibit-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous room"
                  title="Previous Room"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  type="button"
                  className={`exhibit-arrow-btn exhibit-playpause-btn ${isPaused ? 'is-paused' : ''}`}
                  onClick={toggleAutoPlay}
                  aria-label={isAutoPlayActive ? 'Pause Auto Tour' : 'Resume Auto Tour'}
                  title={isAutoPlayActive ? 'Pause Auto Tour' : 'Resume Auto Tour'}
                >
                  {isAutoPlayActive && !isHovered ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                <span className="exhibit-counter">
                  {String(showcaseIndex + 1).padStart(2, '0')} / {String(totalSanctuaries).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  className="exhibit-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next room"
                  title="Next Room"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Architectural Timeline Progress Bar */}
            <div className="exhibit-progress-track">
              <div
                className="exhibit-progress-fill"
                style={{
                  width: `${((showcaseIndex + 1) / totalSanctuaries) * 100}%`
                }}
              />
            </div>

            {/* Cinematic Swipeable Image Stage */}
            <div
              className="exhibit-image-wrap"
              style={{
                transform: dragOffset ? `translateX(${dragOffset * 0.4}px)` : 'none',
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div
                key={`slide-${currentSanctuary.id}-${slideAnimKey}`}
                className={`exhibit-slide-layer slide-dir-${direction}`}
              >
                <SmoothImage
                  src={currentSanctuary.coverImg}
                  alt={currentSanctuary.title}
                  loading="eager"
                  draggable={false}
                />
                <div className="exhibit-image-sheen" />
              </div>
              <div className="exhibit-overlay" />

              {/* Gesture swipe cue pill */}
              <div className="exhibit-drag-indicator">
                <span>← Drag or Swipe →</span>
              </div>
            </div>

            {/* Meta Information with Staggered Cascading Reveal */}
            <div className="exhibit-meta" key={`meta-${currentSanctuary.id}-${slideAnimKey}`}>
              <div className="exhibit-info">
                <span className="exhibit-loc anim-stagger-1">
                  {displayLocation.toUpperCase()}
                </span>
                <h3 className="exhibit-title anim-stagger-2">{currentSanctuary.title}</h3>
                <p className="exhibit-desc anim-stagger-3">{currentSanctuary.narrative}</p>
                <div className="exhibit-tags-row anim-stagger-4">
                  {(currentSanctuary.amenities || []).slice(0, 3).map((amenity, idx) => (
                    <span key={idx} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="exhibit-price-cta anim-stagger-5">
                <div className="exhibit-price">
                  <span className="price-val">₹{Number(currentSanctuary.price).toLocaleString('en-IN')}</span>
                  <span className="price-unit">{currentSanctuary.pricePeriod || '/ month'} · Zero Brokerage</span>
                </div>
                <Link
                  to={`/sanctuary/${currentSanctuary.id}`}
                  className="btn-architectural btn-primary"
                >
                  <span>View Room</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginLeft: '6px' }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Scroll-Down Indicator */}
      <button
        type="button"
        className="hero-scroll-cue"
        onClick={handleScrollToGrid}
        aria-label="Scroll to explore rooms"
      >
        <span className="scroll-cue-text">Scroll to Explore Rooms</span>
        <span className="scroll-cue-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </span>
      </button>
    </section>
  );
}
