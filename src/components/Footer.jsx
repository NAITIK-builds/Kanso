import React from 'react';
import { useRental } from '../context/RentalContext';

export default function Footer() {
  const { setActiveFilter, currentUser, setIsHostPortalOpen, setAuthModalState, showToast } = useRental();

  const handleRegionClick = (e, region, localArea = 'all') => {
    e.preventDefault();
    setActiveFilter((prev) => ({
      ...prev,
      region,
      localArea
    }));
    const grid = document.getElementById('sanctuaryGridSection');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHostClick = (e) => {
    e.preventDefault();
    if (currentUser?.role === 'guest') {
      showToast("You are logged in as Seeking Home. Only Room Owner / Host accounts can post listings.", "alert");
      return;
    }
    if (!currentUser) {
      setAuthModalState({ initialRole: 'host', initialMode: 'register' });
    } else {
      setIsHostPortalOpen(true);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid scroll-reveal">
        <div className="footer-brand-col">
          <div className="brand-emblem">
            <span className="brand-monogram">R</span>
            <div className="brand-text">
              <span className="brand-name">RENTAL HOUSE FINDER</span>
              <span className="brand-sub">VERIFIED ROOMS & CO-LIVING</span>
            </div>
          </div>
          <p className="footer-desc">
            Curating verified private bedrooms, modern studios, and mindful flatshares across top Indian hubs. Zero brokerage fees, transparent rent in ₹/month, and direct owner connections.
          </p>
        </div>

        <div className="footer-links-col">
          <h5>LOCAL RESIDENTIAL HUBS</h5>
          <ul>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Kanpur')}>
                Kanpur (Swaroop Nagar, Kakadeo & Kalyanpur)
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Bengaluru')}>
                Bengaluru (Indiranagar, HSR & Koramangala)
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Mumbai')}>
                Mumbai (Bandra West & Powai)
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Delhi-NCR')}>
                Delhi-NCR (Gurgaon Cyber City & Noida)
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Pune')}>
                Pune (Hinjawadi Infotech & Koregaon Park)
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleRegionClick(e, 'Hyderabad')}>
                Hyderabad (Hitec City & Gachibowli)
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h5>ROOM OWNERS & FLATMATES</h5>
          <ul>
            {(!currentUser || currentUser.role === 'host') && (
              <li>
                <a href="#" onClick={handleHostClick}>
                  Post Your Spare Room
                </a>
              </li>
            )}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Room Standards: High-speed fiber WiFi, natural light, lockable doors & clean washrooms.", 'bed');
                }}
              >
                Room Quality Standards
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Flatmate Guidelines: Mutual privacy, quiet work hours, clean shared kitchen & respect.", 'sparkle');
                }}
              >
                Flatmate Guidelines
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Zero Brokerage Charter: 100% direct owner-to-tenant rent with no hidden commissions.", '₹');
                }}
              >
                Zero Brokerage Charter
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-legal-col">
          <h5>VERIFIED DISCLOSURE</h5>
          <p>All room listings are verified for authenticity. Rents are direct in INR (₹/month) with zero broker commissions.</p>
          <span className="copyright">© 2026 RENTAL HOUSE FINDER · All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
