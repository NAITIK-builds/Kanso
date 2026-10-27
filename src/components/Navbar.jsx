import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useKanso } from '../context/KansoContext';

export default function Navbar() {
  const navigate = useNavigate();
  const {
    wishlist,
    reservations,
    currentUser,
    logoutUser,
    setAuthModalState,
    setIsQuickSearchOpen,
    setActiveFilter
  } = useKanso();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open, handle ESC key
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleBrandClick = () => {
    setActiveFilter((prev) => ({
      ...prev,
      region: 'all',
      type: 'all',
      searchQuery: ''
    }));
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (role = 'guest', mode = 'login') => {
    setIsMobileMenuOpen(false);
    setAuthModalState({ initialRole: role, initialMode: mode });
  };

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner container">
          {/* Brand Logo */}
          <Link to="/" className="brand-emblem" onClick={handleBrandClick}>
            <span className="brand-monogram">R</span>
            <div className="brand-text">
              <span className="brand-name">RENTAL HOUSE FINDER</span>
              <span className="brand-sub">VERIFIED ROOMS · आवास</span>
            </div>
          </Link>

          {/* Quick Search Bar (Editorial Pill for Desktop) */}
          <div
            className="nav-search"
            onClick={() => setIsQuickSearchOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Open search rooms dialog"
          >
            <span className="search-indicator"></span>
            <span className="search-prompt">Search by room type, city, attached bath, flatmate...</span>
            <kbd className="search-shortcut">⌘K</kbd>
          </div>

          {/* Desktop Action Items */}
          <div className="header-actions nav-desktop-actions">
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="nav-icon-btn"
              title="Saved Rooms"
              aria-label={`Saved Rooms (${wishlist.length})`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.length > 0 ? "var(--accent-earth)" : "none"} stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="badge-count">{wishlist.length}</span>
            </Link>

            {/* View My Bookings Route */}
            <Link to="/reservations" className="nav-pill-btn">
              <span>My Room Bookings</span>
              <span className="badge-count">{reservations.length}</span>
            </Link>

            {/* Host Switcher Button Route - Hidden when logged in as seeking home */}
            {(!currentUser || currentUser.role === 'host') && (
              <Link
                to="/host"
                className="host-cta-btn"
                onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();
                    handleOpenAuth('host', 'login');
                  }
                }}
              >
                <span className="btn-dot"></span>
                <span>+ List a Room</span>
              </Link>
            )}

            {/* Unauthenticated Guest Auth Actions */}
            {!currentUser ? (
              <div className="nav-auth-cluster">
                <button
                  type="button"
                  className="nav-btn-signin"
                  onClick={() => handleOpenAuth('guest', 'login')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="nav-btn-register"
                  onClick={() => handleOpenAuth('guest', 'register')}
                >
                  Create Account
                </button>
              </div>
            ) : (
              /* Authenticated User Profile & Dropdown */
              <div className="user-menu-wrap" ref={dropdownRef}>
                <button
                  className="user-avatar-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label="User Account"
                  title="Your Account & Suite"
                >
                  <span className="avatar-initials">{currentUser.initials || 'KL'}</span>
                  <span
                    className={`status-indicator ${currentUser.role === 'host' ? 'host-online' : ''}`}
                  ></span>
                </button>

                {/* Dropdown Popover */}
                {isDropdownOpen && (
                  <div className="user-dropdown-popover">
                    <div className="dropdown-header">
                      <strong>{currentUser.name}</strong>
                      <span className="dropdown-badge">
                        {currentUser.roleLabel || (currentUser.role === 'host' ? 'Host Custodian' : 'Seeking Stays')}
                      </span>
                    </div>
                    <div className="dropdown-items">
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate('/reservations');
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        My Reservations
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate('/wishlist');
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        Saved Sanctuaries ({wishlist.length})
                      </button>
                      {currentUser.role === 'host' && (
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            navigate('/host');
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                          Host Custodian Suite
                        </button>
                      )}
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item text-earth"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleOpenAuth(currentUser.role === 'host' ? 'guest' : 'host', 'login');
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                        Switch Persona
                      </button>
                      <button
                        className="dropdown-item text-muted"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logoutUser();
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Right Quick Action Group */}
          <div className="header-actions nav-mobile-actions">
            {/* Quick Search Icon Trigger */}
            <button
              type="button"
              className="nav-icon-btn nav-mobile-search-btn"
              onClick={() => setIsQuickSearchOpen(true)}
              aria-label="Open Quick Search"
              title="Search Sanctuaries"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Saved Wishlist Icon with Count */}
            <Link
              to="/wishlist"
              className="nav-icon-btn nav-mobile-wishlist-btn"
              title="Saved Sanctuaries"
              aria-label={`Saved Sanctuaries (${wishlist.length})`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.length > 0 ? "var(--accent-earth)" : "none"} stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </Link>

            {/* Modern Hamburger Button */}
            <button
              type="button"
              className={`nav-icon-btn nav-mobile-toggle ${isMobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="7" x2="20" y2="7"></line>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="17" x2="20" y2="17"></line>
                </svg>
              )}
              {reservations.length > 0 && (
                <span className="mobile-notification-dot" title={`${reservations.length} active bookings`}></span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer & Backdrop */}
      <div
        className={`mobile-drawer-backdrop ${isMobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`nav-mobile-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
        aria-label="Mobile Navigation"
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="brand-emblem" onClick={handleBrandClick}>
            <span className="brand-monogram">R</span>
            <div className="brand-text">
              <span className="brand-name">RENTAL HOUSE FINDER</span>
              <span className="brand-sub">VERIFIED ROOMS · आवास</span>
            </div>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Quick Search Button in Drawer */}
        <div className="drawer-search-wrap">
          <div
            className="drawer-search-pill"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsQuickSearchOpen(true);
            }}
            role="button"
            tabIndex={0}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Search room, city, Kanpur, attached bath...</span>
            <span className="drawer-search-tag">⌘K</span>
          </div>
        </div>

        {/* Primary Navigation List */}
        <nav className="drawer-nav-list">
          <button
            type="button"
            className="drawer-nav-item"
            onClick={() => handleNavClick('/')}
          >
            <div className="nav-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <div className="nav-item-text">
              <span className="item-title">Explore Rooms</span>
              <span className="item-sub">Verified private, shared & studio rooms</span>
            </div>
            <span className="drawer-arrow">→</span>
          </button>

          <button
            type="button"
            className="drawer-nav-item"
            onClick={() => handleNavClick('/reservations')}
          >
            <div className="nav-item-icon accent-moss">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            </div>
            <div className="nav-item-text">
              <span className="item-title">
                My Room Bookings
                {reservations.length > 0 && (
                  <span className="drawer-badge-count">{reservations.length}</span>
                )}
              </span>
              <span className="item-sub">Hold receipts & lease slips</span>
            </div>
            <span className="drawer-arrow">→</span>
          </button>

          <button
            type="button"
            className="drawer-nav-item"
            onClick={() => handleNavClick('/wishlist')}
          >
            <div className="nav-item-icon accent-earth">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <div className="nav-item-text">
              <span className="item-title">
                Saved Rooms
                {wishlist.length > 0 && (
                  <span className="drawer-badge-count earth">{wishlist.length}</span>
                )}
              </span>
              <span className="item-sub">Your personal room shortlist</span>
            </div>
            <span className="drawer-arrow">→</span>
          </button>

          {(!currentUser || currentUser.role === 'host') && (
            <button
              type="button"
              className="drawer-nav-item drawer-host-highlight"
              onClick={() => {
                if (!currentUser) {
                  handleOpenAuth('host', 'login');
                } else {
                  handleNavClick('/host');
                }
              }}
            >
              <div className="nav-item-icon host-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <div className="nav-item-text">
                <span className="item-title">Post a Room for Rent</span>
                <span className="item-sub">List spare bedroom & find flatmates</span>
              </div>
              <span className="drawer-badge-live">HOST</span>
            </button>
          )}

        </nav>

        {/* User Persona & Authentication Block */}
        <div className="drawer-auth-section">
          {currentUser ? (
            <div className="drawer-user-card">
              <div className="drawer-user-header">
                <div className="drawer-user-avatar">
                  {currentUser.initials || 'KL'}
                </div>
                <div className="drawer-user-info">
                  <strong className="drawer-user-name">{currentUser.name}</strong>
                  <span className="drawer-user-role">
                    {currentUser.roleLabel || (currentUser.role === 'host' ? 'Host Custodian' : 'Guest Explorer')}
                  </span>
                </div>
              </div>

              <div className="drawer-user-actions">
                <button
                  type="button"
                  className="drawer-btn-secondary"
                  onClick={() => handleOpenAuth(currentUser.role === 'host' ? 'guest' : 'host', 'login')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                  <span>Switch Persona</span>
                </button>
                <button
                  type="button"
                  className="drawer-btn-danger"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logoutUser();
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="drawer-unauth-card">
              <span className="drawer-unauth-tag">MEMBER ACCESS</span>
              <h4 className="drawer-unauth-title">Experience Mindful Indian Architecture</h4>
              <p className="drawer-unauth-desc">Sign in to unlock direct custodian messaging and manage confirmed reservations.</p>
              
              <div className="drawer-auth-buttons">
                <button
                  type="button"
                  className="drawer-auth-btn primary"
                  onClick={() => handleOpenAuth('guest', 'register')}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  className="drawer-auth-btn secondary"
                  onClick={() => handleOpenAuth('guest', 'login')}
                >
                  Sign In
                </button>
              </div>

              <button
                type="button"
                className="drawer-host-link"
                onClick={() => handleOpenAuth('host', 'login')}
              >
                Join as Sanctuary Custodian (Host) →
              </button>
            </div>
          )}
        </div>

        {/* Drawer Heritage Coordinates Footer */}
        <div className="drawer-footer">
          <div className="drawer-coords">
            <span>28°36'N · 77°12'E</span>
            <span>VOL. 01 / 2026 ARCHIVE</span>
          </div>
          <span className="drawer-copy">RENTAL HOUSE FINDER · ALL RIGHTS RESERVED</span>
        </div>
      </aside>
    </>
  );
}
