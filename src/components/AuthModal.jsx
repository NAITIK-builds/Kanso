import React, { useState, useEffect } from 'react';
import { useRental, DEMO_USERS } from '../context/RentalContext';
import { IconSparkle, IconBed, IconCheck, IconAlert, IconHost, IconClose } from './Icons';

export default function AuthModal() {
  const {
    authModalState,
    setAuthModalState,
    loginUser
  } = useRental();

  const [role, setRole] = useState('guest'); // 'guest' | 'host'
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  // Form fields
  const [fullName, setFullName] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('rental2026');

  // UI status
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (authModalState) {
      const initialRole = authModalState.initialRole || 'guest';
      setRole(initialRole);
      setMode(authModalState.initialMode || 'login');
      setErrorMessage('');
      if (initialRole === 'host') {
        setEmail('ananya@varma-arch.in');
        setFullName('Ananya Varma');
      } else {
        setEmail('kabir@example.com');
        setFullName('Kabir Sen');
      }
    }
  }, [authModalState]);

  if (!authModalState) return null;

  const handleClose = () => {
    setAuthModalState(null);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrorMessage('');
    if (newRole === 'host') {
      setEmail('ananya@varma-arch.in');
      if (!fullName || fullName === 'Kabir Sen') setFullName('Ananya Varma');
    } else {
      setEmail('kabir@example.com');
      if (!fullName || fullName === 'Ananya Varma') setFullName('Kabir Sen');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    const name = fullName.trim() || (role === 'host' ? 'Ananya Varma' : 'Kabir Sen');
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const userObj = {
      name,
      email: email.trim(),
      role,
      roleLabel: role === 'host' ? 'Room Owner / Host' : 'Seeking Home / Tenant',
      initials: initials || (role === 'host' ? 'AV' : 'KS'),
      practiceName: role === 'host' ? propertyName || 'Verified Residence' : undefined,
      phone: phone || (role === 'host' ? '+91 98200 12345' : '+91 98765 43210')
    };

    setTimeout(() => {
      loginUser(userObj);
      setLoading(false);
      handleClose();
    }, 200);
  };

  const handleDemoGuest = () => {
    loginUser(DEMO_USERS.guest);
    handleClose();
  };

  const handleDemoHost = () => {
    loginUser(DEMO_USERS.host);
    handleClose();
  };

  return (
    <div className="fullscreen-auth-page" id="authModal">
      {/* Topbar */}
      <header className="auth-page-topbar">
        <div className="auth-topbar-brand">
          <div className="brand-emblem">
            <span className="brand-monogram">R</span>
            <div className="brand-text">
              <span className="brand-name">RENTAL HOUSE FINDER</span>
              <span className="brand-sub">VERIFIED ACCESS</span>
            </div>
          </div>
        </div>
        <div className="auth-topbar-actions">
          <button
            type="button"
            className="btn-return-sanctuaries"
            onClick={handleClose}
            aria-label="Close and return"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span className="return-label">Back</span>
            <span className="close-icon-pill"><IconClose size={12} /></span>
          </button>
        </div>
      </header>

      {/* Split Content */}
      <div className="auth-split-wrapper">
        {/* Left Editorial Visual Column */}
        <div className="auth-visual-col">
          <div className="auth-visual-inner">
            <div className="auth-brand-stamp">
              <span className="auth-rental-mark auth-kanso-mark">R</span>
              <div>
                <strong>RENTAL HOUSE FINDER</strong>
                <span>VERIFIED ROOMS & CO-LIVING</span>
              </div>
            </div>

            <div className="auth-quote-wrap">
              <div className="auth-tag-pill">MINDFUL LIVING</div>
              <h2 className="auth-visual-heading">
                Live peacefully.<br />Find verified homes & rooms.
              </h2>
              <p className="auth-manifesto-quote">
                "A great room gives you quiet focus, high-speed fiber internet, and respectful flatmates without the stress of broker commissions."
              </p>
              <span className="auth-quote-author">— Rental House Finder Ethos</span>
            </div>

            {/* Dual Persona Value Offerings */}
            <div className="auth-perks-list">
              <div className="auth-perk-card">
                <div className="perk-badge guest">
                  <IconSparkle size={11} style={{ marginRight: '5px' }} />
                  FOR SEEKERS & TENANTS
                </div>
                <p>
                  Find verified furnished private bedrooms, master suites, and shared flats across Kanpur, Bengaluru, Mumbai & top Indian cities with zero brokerage and transparent monthly rent.
                </p>
              </div>
              <div className="auth-perk-card">
                <div className="perk-badge host">
                  <IconBed size={13} style={{ marginRight: '5px' }} />
                  FOR ROOM OWNERS & HOSTS
                </div>
                <p>
                  List your spare bedroom, connect directly with background-checked professionals and students, and manage rent reservations with zero middleman fees.
                </p>
              </div>
            </div>

            <div className="auth-trust-footer">
              <span className="trust-item"><IconCheck size={13} style={{ marginRight: '4px' }} />Verified Room Amenities</span>
              <span className="trust-item"><IconCheck size={13} style={{ marginRight: '4px' }} />Zero Brokerage Fees</span>
              <span className="trust-item"><IconCheck size={13} style={{ marginRight: '4px' }} />Direct Owner Connect</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="auth-form-col">
          <div className="auth-form-container">
            <div className="auth-header-bar">
              <span className="modal-tag">SECURE ACCESS</span>
              <h1 className="auth-main-title">Welcome to Rental House Finder</h1>
              <p className="auth-intro-sub">
                {mode === 'login'
                  ? 'Sign in to access your saved homes, reservations, and chat inquiries.'
                  : 'Create an account to rent verified furnished rooms or list your spare bedroom.'}
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '13px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <IconAlert size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Role Persona Switcher */}
            <div className="auth-role-tabs">
              <button
                type="button"
                className={`auth-role-tab ${role === 'guest' ? 'active' : ''}`}
                onClick={() => handleRoleChange('guest')}
              >
                <span className="role-icon"><IconSparkle size={13} /></span>
                <div className="role-text-wrap">
                  <span className="role-heading">Seeking Home</span>
                  <span className="role-sub">Rooms, Flats & Suites</span>
                </div>
              </button>
              <button
                type="button"
                className={`auth-role-tab ${role === 'host' ? 'active' : ''}`}
                onClick={() => handleRoleChange('host')}
              >
                <span className="role-icon"><IconHost size={16} /></span>
                <div className="role-text-wrap">
                  <span className="role-heading">Host Custodian</span>
                  <span className="role-sub">List & Rent Rooms</span>
                </div>
              </button>
            </div>

            {/* Form Mode Toggle */}
            <div className="auth-mode-toggle">
              <button
                type="button"
                className={`mode-tab ${mode === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`mode-tab ${mode === 'register' ? 'active' : ''}`}
                onClick={() => {
                  setMode('register');
                  setErrorMessage('');
                }}
              >
                Create Account
              </button>
            </div>

            {/* Main Auth Form */}
            <form onSubmit={handleSubmit} className="auth-fields-grid">
              {/* Full Name for register */}
              {mode === 'register' && (
                <div className="form-group span-2">
                  <label htmlFor="authFullName">Full Name *</label>
                  <input
                    type="text"
                    id="authFullName"
                    required
                    placeholder="e.g. Kabir Sen or Ananya Varma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              )}

              {/* Host practice name for host register */}
              {mode === 'register' && role === 'host' && (
                <div className="form-group span-2">
                  <label htmlFor="authPropertyName">Property / Residence Label *</label>
                  <input
                    type="text"
                    id="authPropertyName"
                    required
                    placeholder="e.g. Swaroop Nagar Residence / Studio Flat"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                  />
                </div>
              )}

              {/* Email Address */}
              <div className="form-group span-2">
                <label htmlFor="authEmail">Email Address *</label>
                <input
                  type="email"
                  id="authEmail"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Phone for register */}
              {mode === 'register' && (
                <div className="form-group span-2">
                  <label htmlFor="authPhone">WhatsApp / Mobile Number</label>
                  <input
                    type="tel"
                    id="authPhone"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              )}

              {/* Password */}
              <div className="form-group span-2">
                <div className="label-with-link">
                  <label htmlFor="authPassword">Password *</label>
                  <a
                    href="#"
                    className="forgot-link"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Demo password is pre-filled: rental2026");
                    }}
                  >
                    Forgot?
                  </a>
                </div>
                <input
                  type="password"
                  id="authPassword"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="form-group span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-architectural btn-primary btn-block btn-lg"
                >
                  {loading
                    ? 'Signing in...'
                    : mode === 'login'
                    ? role === 'host'
                      ? 'Sign In as Host Custodian'
                      : 'Sign In as Home Seeker'
                    : role === 'host'
                    ? 'Register as Host Custodian'
                    : 'Create Seeker Account'}
                </button>
              </div>
            </form>

            {/* Quick 1-Click Demo Buttons */}
            <div className="auth-demo-shortcuts">
              <span className="demo-label">OR INSTANT 1-CLICK DEMO ACCESS:</span>
              <div className="demo-buttons-row">
                <button
                  type="button"
                  className="demo-quick-btn"
                  onClick={handleDemoGuest}
                >
                  <span className="demo-dot guest"></span>
                  <span>Demo Seeker (Kabir Sen)</span>
                </button>
                <button
                  type="button"
                  className="demo-quick-btn"
                  onClick={handleDemoHost}
                >
                  <span className="demo-dot host"></span>
                  <span>Demo Host (Ananya Varma)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
