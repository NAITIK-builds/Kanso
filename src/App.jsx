import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopRibbon from './components/TopRibbon';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Routed Pages
import HomePage from './pages/HomePage';
import SanctuaryDetailPage from './pages/SanctuaryDetailPage';
import ReservationsPage from './pages/ReservationsPage';
import HostPortalPage from './pages/HostPortalPage';
import WishlistPage from './pages/WishlistPage';

// Interactive Modals, Drawers & Overlays
import DetailModal from './components/DetailModal';
import BookingModal from './components/BookingModal';
import HostPortalModal from './components/HostPortalModal';
import AddListingModal from './components/AddListingModal';
import ReservationsModal from './components/ReservationsModal';
import InquiryModal from './components/InquiryModal';
import AddReviewModal from './components/AddReviewModal';
import AmenitiesModal from './components/AmenitiesModal';
import AuthModal from './components/AuthModal';
import QuickSearchModal from './components/QuickSearchModal';
import Toast from './components/Toast';

/**
 * ScrollToTop: Smoothly animates window scroll position to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

/**
 * ScrollAnimator: IntersectionObserver system to dynamically trigger
 * elegant scroll-reveal animations across cards, sections, and galleries
 */
function ScrollAnimator() {
  const { pathname } = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll('.scroll-reveal:not(.is-revealed)');
      targets.forEach((el) => observer.observe(el));
    };

    observeElements();
    const timer = setTimeout(observeElements, 120);

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      {/* Route Smooth Scroll to Top & Global Scroll Animation Observer */}
      <ScrollToTop />
      <ScrollAnimator />

      {/* Top Announcement Bar */}
      <TopRibbon />

      {/* Header Navigation */}
      <Navbar />

      {/* Routed Main Content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sanctuary/:id" element={<SanctuaryDetailPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/host" element={<HostPortalPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <DetailModal />
      <BookingModal />
      <HostPortalModal />
      <AddListingModal />
      <ReservationsModal />
      <InquiryModal />
      <AddReviewModal />
      <AmenitiesModal />
      <AuthModal />
      <QuickSearchModal />
      <Toast />
    </>
  );
}


