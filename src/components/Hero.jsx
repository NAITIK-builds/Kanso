import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useRental } from '../context/RentalContext';
import SmoothImage from './SmoothImage';

const AUTOPLAY_INTERVAL = 4800; // 4.8 seconds per slide for a comfortable reading cadence

export default function Hero() {
  const { listings, activeFilter, setActiveFilter, setDetailSanctuaryId } = useRental();
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

  // Synchronize showcase if region filter changes
  useEffect(() => {
    if (activeFilter.region && activeFilter.region !== 'all' && listings?.length) {
      const idx = listings.findIndex((s) => s.region.toLowerCase().includes(activeFilter.region.toLowerCase()));
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

  const handleJump = useCallback((targetIndex) => {
    if (targetIndex === showcaseIndex) return;
    setDirection(targetIndex > showcaseIndex ? 'next' : 'prev');
    setShowcaseIndex(targetIndex);
    setSlideAnimKey((k) => k + 1);
  }, [showcaseIndex]);

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
    // Bound drag preview resistance
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
    // Only drag with primary mouse button
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

  const handleMicroPillClick = (region) => {
    setActiveFilter((prev) => ({
      ...prev,
      region
    }));
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

  return (
    <section className="hero-fullscreen-wrap" aria-label="Welcome and Featured Sanctuaries">
      <div className="hero-split container">
        {/* Left Editorial Column */}
      <div className="hero-left">
        <div className="hero-curation-stamp">
          <span className="stamp-border"></span>
          <span>LOCAL RESIDENTIAL DIRECTORY // LONG-TERM STAYS 2026</span>
        </div>
        <h1 className="hero-headline">
          Find verified rooms in your <em>local area</em>.
        </h1>
        <p className="hero-manifesto">
          Verified private bedrooms, master suites, and studios in prime residential layouts & tech corridors. Built for long-term peaceful living — 11-month agreements, zero brokerage, and direct verified owner connections.
        </p>

        {/* Interactive Search & Filter Capsule */}
        <form className="hero-search-capsule" onSubmit={handleSearchSubmit}>
          <div className="search-cell">
            <label htmlFor="heroLocation">LOCAL AREA / CITY</label>
            <select
              id="heroLocation"
              aria-label="Select Local Area or City"
              value={selectedLocationValue}
              onChange={handleLocationSelect}
            >
              <option value="all">All Local Areas</option>

              <optgroup label="Kanpur Localities">
                <option value="city:Kanpur">All Kanpur (All Areas)</option>
                <option value="Swaroop Nagar">Swaroop Nagar (Motijheel / Rave 3 / GSVM)</option>
                <option value="Kakadeo">Kakadeo (Coaching Hub & Study Libraries)</option>
                <option value="Kalyanpur (IIT)">Kalyanpur (IIT Kanpur Gate & GT Road)</option>
                <option value="Civil Lines">Civil Lines (Green Park & VIP Road)</option>
                <option value="Tilak Nagar">Tilak Nagar (Company Bagh & HBTU)</option>
                <option value="Kidwai Nagar">Kidwai Nagar (South Hub & Saket Nagar)</option>
              </optgroup>

              <optgroup label="Bengaluru Neighborhoods">
                <option value="city:Bengaluru">All Bengaluru (All Layouts)</option>
                <option value="Indiranagar">Indiranagar (100ft Rd / Defense Colony)</option>
                <option value="HSR Layout">HSR Layout (Sector 2 & 27th Main)</option>
                <option value="Koramangala">Koramangala (4th & 5th Block)</option>
                <option value="Whitefield">Whitefield (ITPB & Hope Farm)</option>
                <option value="BTM Layout">BTM Layout (Stage 2 / Silk Board)</option>
              </optgroup>

              <optgroup label="Mumbai MMR Suburbs">
                <option value="city:Mumbai">All Mumbai (All Suburbs)</option>
                <option value="Bandra West">Bandra West (Pali Hill & Turner Rd)</option>
                <option value="Andheri West">Andheri West (Lokhandwala Complex)</option>
                <option value="Powai">Powai (Hiranandani Gardens / Lake)</option>
              </optgroup>

              <optgroup label="Delhi-NCR Sectors">
                <option value="city:Delhi-NCR">All Delhi-NCR (All Sectors)</option>
                <option value="Cyber City Gurgaon">Gurgaon (DLF Phase 3 & Cyber City)</option>
                <option value="Noida Sector 62">Noida (Sector 62 & Electronic City)</option>
                <option value="Hauz Khas">South Delhi (Hauz Khas & Deer Park)</option>
              </optgroup>

              <optgroup label="Pune Local Areas">
                <option value="city:Pune">All Pune (All Localities)</option>
                <option value="Hinjawadi">Hinjawadi (Phase 1 Infotech Park)</option>
                <option value="Koregaon Park">Koregaon Park (Lane 5 / North Main Rd)</option>
              </optgroup>

              <optgroup label="Hyderabad Tech Corridors">
                <option value="city:Hyderabad">All Hyderabad (All Zones)</option>
                <option value="Hitec City">Hitec City (Madhapur & Cyber Towers)</option>
                <option value="Gachibowli">Gachibowli (Financial District / Wipro)</option>
              </optgroup>
            </select>
          </div>

          <div className="search-cell">
            <label htmlFor="heroType">ROOM TYPE</label>
            <select
              id="heroType"
              aria-label="Select Room Type"
              value={activeFilter.type || 'all'}
              onChange={(e) => setActiveFilter((prev) => ({ ...prev, type: e.target.value }))}
            >
              <option value="all">All Room Types</option>
              <option value="Private Room">Private Master Room</option>
              <option value="Single Room">Single Room</option>
              <option value="Shared Room">Shared Room / Twin</option>
              <option value="Studio Room">Independent Studio (1RK)</option>
              <option value="Co-Living">Co-Living Society Suite</option>
            </select>
          </div>

          <div className="search-cell">
            <label htmlFor="heroMoveIn">TARGET MOVE-IN</label>
            <input
              type="date"
              id="heroMoveIn"
              aria-label="Target move-in date"
              value={activeFilter.checkIn || ''}
              onChange={(e) => setActiveFilter((prev) => ({ ...prev, checkIn: e.target.value }))}
            />
          </div>

          <div className="search-cell">
            <label htmlFor="heroGuests">OCCUPANTS</label>
            <select
              id="heroGuests"
              aria-label="Number of Tenants"
              value={activeFilter.guests || '1'}
              onChange={(e) => setActiveFilter((prev) => ({ ...prev, guests: e.target.value }))}
            >
              <option value="1">1 Person (Solo)</option>
              <option value="2">2 Persons (Couple / Sharing)</option>
            </select>
          </div>

          <button type="submit" className="hero-submit-btn" aria-label="Search Verified Local Rooms">
            <span>Find Rooms</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Local Area Quick Coordinates */}
        <div className="hero-micro-pills">
          <span className="micro-label">Popular Local Areas:</span>
          {[
            { label: 'All Cities', region: 'all', localArea: 'all' },
            { label: 'Kanpur', region: 'Kanpur', localArea: 'all' },
            { label: 'Swaroop Nagar', region: 'Kanpur', localArea: 'Swaroop Nagar' },
            { label: 'Kakadeo (Kanpur)', region: 'Kanpur', localArea: 'Kakadeo' },
            { label: 'Kalyanpur (IIT)', region: 'Kanpur', localArea: 'Kalyanpur (IIT)' },
            { label: 'Indiranagar', region: 'Bengaluru', localArea: 'Indiranagar' },
            { label: 'HSR Layout', region: 'Bengaluru', localArea: 'HSR Layout' },
            { label: 'Bandra West', region: 'Mumbai', localArea: 'Bandra West' },
            { label: 'Cyber City Gurgaon', region: 'Delhi-NCR', localArea: 'Cyber City Gurgaon' },
            { label: 'Hinjawadi', region: 'Pune', localArea: 'Hinjawadi' },
            { label: 'Hitec City', region: 'Hyderabad', localArea: 'Hitec City' }
          ].map((item) => {
            const isActive =
              (item.localArea === 'all' && activeFilter.region === 'all' && activeFilter.localArea === 'all') ||
              (activeFilter.localArea === item.localArea);
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

      {/* Right Architectural Exhibition Showcase Frame with Cinematic Auto-Swipe */}
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
                {isHovered ? 'PAUSED' : isAutoPlayActive ? 'AUTO-TOUR' : 'PAUSED'}
              </span>
            </div>

            <div className="exhibit-nav-arrows">
              <button
                type="button"
                className="exhibit-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous sanctuary"
                title="Previous Sanctuary"
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>

              <span className="exhibit-counter">
                {showcaseIndex + 1} / {totalSanctuaries}
              </span>

              <button
                type="button"
                className="exhibit-arrow-btn"
                onClick={handleNext}
                aria-label="Next sanctuary"
                title="Next Sanctuary"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Segmented Architectural Progress Bar */}
          <div className="exhibit-story-track" role="tablist" aria-label="Sanctuary Slides">
            {listings.map((item, idx) => {
              const isActive = idx === showcaseIndex;
              const isPast = idx < showcaseIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Jump to Sanctuary ${idx + 1}: ${item.title}`}
                  className={`story-bar ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                  onClick={() => handleJump(idx)}
                >
                  <span
                    key={`bar-fill-${showcaseIndex}-${slideAnimKey}`}
                    className="story-bar-fill"
                    style={{
                      animationDuration: `${AUTOPLAY_INTERVAL}ms`,
                      animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                  />
                </button>
              );
            })}
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
              <div className="exhibit-image-sheen"></div>
            </div>
            <div className="exhibit-overlay"></div>

            {/* Gesture swipe cue pills on the image */}
            <div className="exhibit-drag-indicator">
              <span>← Swipe →</span>
            </div>
          </div>

          {/* Animated Meta Information with Staggered Cascading Reveal */}
          <div className="exhibit-meta" key={`meta-${currentSanctuary.id}-${slideAnimKey}`}>
            <div className="exhibit-info">
              <span className="exhibit-loc anim-stagger-1">
                {currentSanctuary.location.toUpperCase()} · {currentSanctuary.region.toUpperCase()}
              </span>
              <h3 className="exhibit-title anim-stagger-2">{currentSanctuary.title}</h3>
              <p className="exhibit-desc anim-stagger-3">{currentSanctuary.narrative}</p>
              <div className="exhibit-tags-row anim-stagger-4">
                {currentSanctuary.amenities.slice(0, 3).map((amenity, idx) => (
                  <span key={idx} className="amenity-tag">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="exhibit-price-cta anim-stagger-5">
              <div className="exhibit-price">
                <span className="price-val">₹{currentSanctuary.price.toLocaleString('en-IN')}</span>
                <span className="price-unit">{currentSanctuary.pricePeriod || '/ month'} · Zero Brokerage</span>
              </div>
              <Link
                to={`/sanctuary/${currentSanctuary.id}`}
                className="btn-architectural"
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

    {/* Architectural Scroll-Down Indicator for Full-Screen Experience */}
    <button
      type="button"
      className="hero-scroll-cue"
      onClick={handleScrollToGrid}
      aria-label="Scroll to curated room collection"
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

