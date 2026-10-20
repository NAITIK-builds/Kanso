import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useKanso } from '../context/KansoContext';
import SmoothImage from './SmoothImage';

const AUTOPLAY_INTERVAL = 4800; // 4.8 seconds per slide for a comfortable reading cadence

export default function Hero() {
  const { listings, activeFilter, setActiveFilter, setDetailSanctuaryId } = useKanso();
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

  const handleScrollToGrid = () => {
    const grid = document.getElementById('sanctuaryGridSection') || document.getElementById('sanctuaryGrid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!currentSanctuary) return null;

  return (
    <section className="hero-fullscreen-wrap" aria-label="Welcome and Featured Sanctuaries">
      <div className="hero-split container">
        {/* Left Editorial Column */}
      <div className="hero-left">
        <div className="hero-curation-stamp">
          <span className="stamp-border"></span>
          <span>CURATED COLLECTION // 2026</span>
        </div>
        <h1 className="hero-headline">
          The art of <em>mindful shelter</em> across India.
        </h1>
        <p className="hero-manifesto">
          Private sanctuaries rooted in silence, local stone, and timeless craft. From Portuguese villas in Goa to cedarwood retreats in the high Himalayas.
        </p>

        {/* Interactive Search & Filter Capsule */}
        <form className="hero-search-capsule" onSubmit={handleSearchSubmit}>
          <div className="search-cell">
            <label htmlFor="heroLocation">DESTINATION</label>
            <select
              id="heroLocation"
              aria-label="Select Destination"
              value={activeFilter.region}
              onChange={(e) => setActiveFilter((prev) => ({ ...prev, region: e.target.value }))}
            >
              <option value="all">All Indian Regions</option>
              <option value="Goa">Goa (Konkan Coast)</option>
              <option value="Himachal Pradesh">Himachal (Manali & Parvati)</option>
              <option value="Rajasthan">Rajasthan (Udaipur & Jaipur)</option>
              <option value="Karnataka">Karnataka (Coorg & Kabini)</option>
              <option value="Kerala">Kerala (Munnar & Backwaters)</option>
              <option value="Puducherry">Puducherry (French Quarter)</option>
              <option value="Uttarakhand">Uttarakhand (Rishikesh)</option>
            </select>
          </div>

          <div className="search-cell">
            <label htmlFor="heroCheckIn">CHECK-IN</label>
            <input
              type="date"
              id="heroCheckIn"
              aria-label="Check-in date"
              value={activeFilter.checkIn || ''}
              onChange={(e) => setActiveFilter((prev) => ({ ...prev, checkIn: e.target.value }))}
            />
          </div>

          <div className="search-cell">
            <label htmlFor="heroCheckOut">CHECK-OUT</label>
            <input
              type="date"
              id="heroCheckOut"
              aria-label="Check-out date"
              value={activeFilter.checkOut || ''}
              onChange={(e) => setActiveFilter((prev) => ({ ...prev, checkOut: e.target.value }))}
            />
          </div>

          <div className="search-cell">
            <label htmlFor="heroGuests">GUESTS</label>
            <select
              id="heroGuests"
              aria-label="Number of Guests"
              value={activeFilter.guests || '2'}
              onChange={(e) => setActiveFilter((prev) => ({ ...prev, guests: e.target.value }))}
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="4">4 Guests</option>
              <option value="6">6+ Guests (Entire Villa)</option>
            </select>
          </div>

          <button type="submit" className="hero-submit-btn" aria-label="Search Sanctuaries">
            <span>Discover</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Regional Quick Coordinates */}
        <div className="hero-micro-pills">
          <span className="micro-label">Quick Jump:</span>
          {[
            { label: 'All', value: 'all' },
            { label: 'Goa', value: 'Goa' },
            { label: 'Manali', value: 'Himachal Pradesh' },
            { label: 'Udaipur', value: 'Rajasthan' },
            { label: 'Coorg', value: 'Karnataka' },
            { label: 'Kerala', value: 'Kerala' }
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              className={`micro-pill ${activeFilter.region === item.value ? 'active' : ''}`}
              onClick={() => handleMicroPillClick(item.value)}
            >
              {item.label}
            </button>
          ))}
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
                SANCTUARY № {String(showcaseIndex + 1).padStart(2, '0')}
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
                <span className="price-unit">/ night (+ 12% GST)</span>
              </div>
              <Link
                to={`/sanctuary/${currentSanctuary.id}`}
                className="btn-architectural"
              >
                <span>View Space</span>
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
        aria-label="Scroll to curated sanctuaries collection"
      >
        <span className="scroll-cue-text">Scroll to Explore</span>
        <span className="scroll-cue-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </span>
      </button>
    </section>
  );
}

