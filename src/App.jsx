import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <>
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

