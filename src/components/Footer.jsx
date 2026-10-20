import React from 'react';
import { useKanso } from '../context/KansoContext';

export default function Footer() {
  const { setActiveFilter, currentUser, setIsHostPortalOpen, setAuthModalState, showToast } = useKanso();

  const handleRegionClick = (e, region) => {
    e.preventDefault();
    setActiveFilter((prev) => ({
      ...prev,
      region
    }));
    const grid = document.getElementById('sanctuaryGridSection');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHostClick = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModalState({ initialRole: 'host', initialMode: 'register' });
    } else {
      setIsHostPortalOpen(true);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <div className="brand-emblem">
            <span className="brand-monogram">K</span>
            <div className="brand-text">
              <span className="brand-name">KANSO LIVING</span>
              <span className="brand-sub">ARCHITECTURAL HOSPITALITY INDIA</span>
            </div>
          </div>
          <p className="footer-desc">
            Honoring regional materials, peaceful dwellings, and unhurried living across India. Handcrafted by local architects and custodians.
          </p>
        </div>

        <div className="footer-links-col">
          <h5>SANCTUARIES</h5>
          <ul>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Goa')}>
                Goa Coastal Villas
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Himachal Pradesh')}>
                Himalayan Cedar Cabins
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Rajasthan')}>
                Udaipur Stone Havelis
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Karnataka')}>
                Coorg Coffee Retreats
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Kerala')}>
                Malabar Backwater Dwellings
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h5>HOST PARTNERSHIP</h5>
          <ul>
            <li>
              <a href="#" onClick={handleHostClick}>
                List Your Sanctuary
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Architectural Standards: Regional stone, authentic wood, natural light & ventilation.", '🏛️');
                }}
              >
                Architectural Standards
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Custodian Guidelines: Mindful check-in, pristine organic linens, 24/7 concierge.", '✦');
                }}
              >
                Custodian Guidelines
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Transparent billing: Straightforward 12% Hospitality GST with zero hidden fees.", '₹');
                }}
              >
                Hospitality & GST in INR
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-legal-col">
          <h5>VERIFIED DISCLOSURE</h5>
          <p>All listings are independently verified. Prices are transparent in INR (₹) inclusive of applicable taxes.</p>
          <span className="copyright">© 2026 KANSO LIVING · All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
