import React, { useState, useEffect } from 'react';
import { useKanso, DEMO_USERS } from '../context/KansoContext';

export default function AuthModal() {
  const { authModalState, setAuthModalState, loginUser } = useKanso();

  const [role, setRole] = useState('guest'); // 'guest' | 'host'
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  // Form fields
  const [fullName, setFullName] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('rental2026');

  useEffect(() => {
    if (authModalState) {
      setRole(authModalState.initialRole || 'guest');
      setMode(authModalState.initialMode || 'login');
      if (authModalState.initialRole === 'host') {
        setEmail('ananya@varma-arch.in');
      } else {
        setEmail('kabir@example.com');
      }
    }
  }, [authModalState]);

  if (!authModalState) return null;

  const handleClose = () => {
    setAuthModalState(null);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'host') {
      setEmail('ananya@varma-arch.in');
    } else {
      setEmail('kabir@example.com');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      roleLabel: role === 'host' ? 'Host Custodian' : 'Seeking Stays',
      initials: initials || (role === 'host' ? 'AV' : 'KS'),
      practiceName: role === 'host' ? propertyName || 'Varma Studio Architecture' : undefined,
      phone: phone || (role === 'host' ? '+91 98200 12345' : '+91 98765 43210')
    };

    loginUser(userObj);
  };

  const handleDemoGuest = () => {
    loginUser(DEMO_USERS.guest);
  };

  const handleDemoHost = () => {
    loginUser(DEMO_USERS.host);
  };

  return (
    <div className="fullscreen-auth-page" id="authModal">
      {/* Topbar */}
      <header className="auth-page-topbar">
        <div className="auth-topbar-brand">
          <div className="brand-emblem">
            <span className="brand-monogram">R</span>
            <div className="brand-text">
              <span className="brand-name">RENTAL ROOMS</span>
              <span className="brand-sub">VERIFIED ACCESS</span>
            </div>
          </div>
        </div>
        <div className="auth-topbar-actions">
          <button
            type="button"
            className="btn-return-sanctuaries"
            onClick={handleClose}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Return to Sanctuaries</span>
            <span className="close-icon-pill">✕</span>
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
                <strong>RENTAL ROOMS</strong>
                <span>VERIFIED ROOMS & CO-LIVING</span>
              </div>
            </div>

            <div className="auth-quote-wrap">
              <div className="auth-tag-pill">MINDFUL ROOM LIVING</div>
              <h2 className="auth-visual-heading">
                Live peacefully.<br />Find verified rooms.
              </h2>
              <p className="auth-manifesto-quote">
                "A great room gives you quiet focus, high-speed fiber internet, and respectful flatmates without the stress of broker commissions."
              </p>
              <span className="auth-quote-author">— Rental Rooms Ethos</span>
            </div>

            {/* Dual Persona Value Offerings */}
            <div className="auth-perks-list">
              <div className="auth-perk-card">
                <div className="perk-badge guest">✦ FOR TENANTS & SEEKERS</div>
                <p>
                  Find verified furnished private bedrooms, master suites, and shared flats across top Indian hubs with zero brokerage and transparent monthly rent.
                </p>
              </div>
              <div className="auth-perk-card">
                <div className="perk-badge host">🛏️ FOR ROOM OWNERS & FLATMATES</div>
                <p>
                  List your spare bedroom, connect directly with background-checked professionals and students, and manage rent reservations with zero middleman fees.
                </p>
              </div>
            </div>

            <div className="auth-trust-footer">
              <span className="trust-item">✓ Verified Room Amenities</span>
              <span className="trust-item">✓ Zero Brokerage Fees</span>
              <span className="trust-item">✓ Direct Owner Connect</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="auth-form-col">
          <div className="auth-form-container">
            <div className="auth-header-bar">
              <span className="modal-tag">SECURE ACCESS</span>
              <h1 className="auth-main-title">Welcome to Rental Rooms</h1>
              <p className="auth-intro-sub">
                Sign in to your account or register to rent or list verified furnished rooms across India.
              </p>
            </div>

            {/* Role Persona Switcher */}
            <div className="auth-role-tabs">
              <button
                type="button"
                className={`auth-role-tab ${role === 'guest' ? 'active' : ''}`}
                onClick={() => handleRoleChange('guest')}
              >
                <span className="role-icon">✦</span>
                <div className="role-text-wrap">
                  <span className="role-heading">Seeking Stays</span>
                  <span className="role-sub">Rooms, Villas & Chalets</span>
                </div>
              </button>
              <button
                type="button"
                className={`auth-role-tab ${role === 'host' ? 'active' : ''}`}
                onClick={() => handleRoleChange('host')}
              >
                <span className="role-icon">🏛️</span>
                <div className="role-text-wrap">
                  <span className="role-heading">Host Custodian</span>
                  <span className="role-sub">List & Rent Architecture</span>
                </div>
              </button>
            </div>

            {/* Form Mode Toggle */}
            <div className="auth-mode-toggle">
              <button
                type="button"
                className={`mode-tab ${mode === 'login' ? 'active' : ''}`}
                onClick={() => setMode('login')}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`mode-tab ${mode === 'register' ? 'active' : ''}`}
                onClick={() => setMode('register')}
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
                  <label htmlFor="authPropertyName">Property / Architectural Practice Name *</label>
                  <input
                    type="text"
                    id="authPropertyName"
                    required
                    placeholder="e.g. Varma Studio Architecture / The Courtyard Villa"
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
                  <label htmlFor="authPhone">WhatsApp / Mobile Number *</label>
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
                  className="btn-architectural btn-primary btn-block btn-lg"
                >
                  {mode === 'login'
                    ? role === 'host'
                      ? 'Sign In as Host Custodian'
                      : 'Sign In as Traveler'
                    : role === 'host'
                    ? 'Register as Host Custodian'
                    : 'Create Traveler Account'}
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
                  <span>Demo Guest (Kabir Sen)</span>
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
