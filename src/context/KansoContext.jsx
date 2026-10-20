import React, { createContext, useContext, useState, useEffect } from 'react';
import { SEED_SANCTUARIES } from '../data/sanctuaries';

const KansoContext = createContext();

const DEFAULT_RESERVATIONS = [
  {
    bookingId: "KN-2026-7731",
    propertyId: "kn-01",
    title: "Villa Terra Cotta",
    location: "Morjim, North Goa",
    guestName: "Priyanka Sharma",
    guestEmail: "priyanka@example.com",
    guestPhone: "+91 98200 12345",
    checkIn: "2026-11-04",
    checkOut: "2026-11-07",
    nights: 3,
    guests: 2,
    total: 63660,
    status: "Confirmed",
    specialRequests: "Quiet corner room requested"
  }
];

export const DEMO_USERS = {
  guest: {
    name: "Kabir Sen",
    email: "kabir@example.com",
    role: "guest",
    roleLabel: "Seeking Stays",
    initials: "KS",
    phone: "+91 98765 43210"
  },
  host: {
    name: "Ananya Varma",
    email: "ananya@varma-arch.in",
    role: "host",
    roleLabel: "Host Custodian",
    initials: "AV",
    practiceName: "Varma Studio Architecture",
    phone: "+91 98200 12345"
  }
};

export function KansoProvider({ children }) {
  // 1. Listings State
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem('kanso_listings');
      return saved ? JSON.parse(saved) : SEED_SANCTUARIES;
    } catch {
      return SEED_SANCTUARIES;
    }
  });

  // 2. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kanso_wishlist');
      return saved ? JSON.parse(saved) : ["kn-01"];
    } catch {
      return ["kn-01"];
    }
  });

  // 3. Reservations State
  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem('kanso_reservations');
      return saved ? JSON.parse(saved) : DEFAULT_RESERVATIONS;
    } catch {
      return DEFAULT_RESERVATIONS;
    }
  });

  // 4. Inquiries / Chat State
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('kanso_inquiries');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5. Current User State (First time visitor defaults to null)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('kanso_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 6. Filter State
  const [activeFilter, setActiveFilter] = useState({
    region: 'all',
    type: 'all',
    maxPrice: 60000,
    amenities: [],
    sortBy: 'curated',
    searchQuery: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });

  // 7. Modal & UI State
  const [detailSanctuaryId, setDetailSanctuaryId] = useState(null);
  const [bookingSanctuaryId, setBookingSanctuaryId] = useState(null);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [isHostPortalOpen, setIsHostPortalOpen] = useState(false);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);
  const [inquiryTarget, setInquiryTarget] = useState(null); // { propertyId, sanctuary }
  const [addReviewTarget, setAddReviewTarget] = useState(null); // { propertyId, sanctuary }
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState(null); // null or { initialRole: 'guest'|'host', initialMode: 'login'|'register' }
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);

  // 8. Toast State
  const [toast, setToast] = useState({ show: false, message: '', symbol: '✦' });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('kanso_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('kanso_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('kanso_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('kanso_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kanso_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('kanso_current_user');
    }
  }, [currentUser]);

  // Handle modal-open class on body for smooth scroll locking
  useEffect(() => {
    const isAnyModalOpen = Boolean(
      detailSanctuaryId ||
      bookingSanctuaryId ||
      isHostPortalOpen ||
      isAddListingOpen ||
      isReservationsOpen ||
      inquiryTarget ||
      addReviewTarget ||
      isAmenitiesModalOpen ||
      authModalState ||
      isQuickSearchOpen
    );

    if (isAnyModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [
    detailSanctuaryId,
    bookingSanctuaryId,
    isHostPortalOpen,
    isAddListingOpen,
    isReservationsOpen,
    inquiryTarget,
    addReviewTarget,
    isAmenitiesModalOpen,
    authModalState,
    isQuickSearchOpen
  ]);

  // Keyboard shortcut cmd+k / ctrl+k for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsQuickSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        // Close topmost modal
        if (isQuickSearchOpen) setIsQuickSearchOpen(false);
        else if (isAmenitiesModalOpen) setIsAmenitiesModalOpen(false);
        else if (addReviewTarget) setAddReviewTarget(null);
        else if (inquiryTarget) setInquiryTarget(null);
        else if (bookingSanctuaryId) {
          setBookingSanctuaryId(null);
          setActiveReceipt(null);
        }
        else if (detailSanctuaryId) setDetailSanctuaryId(null);
        else if (isAddListingOpen) setIsAddListingOpen(false);
        else if (isReservationsOpen) setIsReservationsOpen(false);
        else if (isHostPortalOpen) setIsHostPortalOpen(false);
        else if (authModalState) setAuthModalState(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isQuickSearchOpen,
    isAmenitiesModalOpen,
    addReviewTarget,
    inquiryTarget,
    bookingSanctuaryId,
    detailSanctuaryId,
    isAddListingOpen,
    isReservationsOpen,
    isHostPortalOpen,
    authModalState
  ]);

  // Helper actions
  const showToast = (message, symbol = '✦') => {
    setToast({ show: true, message, symbol });
    setTimeout(() => {
      setToast({ show: false, message: '', symbol: '✦' });
    }, 3800);
  };

  const toggleWishlist = (sanctuaryId) => {
    setWishlist((prev) => {
      const exists = prev.includes(sanctuaryId);
      const updated = exists ? prev.filter((id) => id !== sanctuaryId) : [...prev, sanctuaryId];
      showToast(
        exists ? "Removed from your saved sanctuaries." : "Sanctuary saved to your journey wishlist.",
        exists ? "✕" : "♥"
      );
      return updated;
    });
  };

  const createReservation = (newRes) => {
    const bookingId = `KN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullRecord = {
      ...newRes,
      bookingId,
      status: 'Confirmed'
    };
    setReservations((prev) => [fullRecord, ...prev]);
    setActiveReceipt(fullRecord);
    showToast(`Official Boarding Pass issued for ${fullRecord.title}!`, '🎟️');
    return fullRecord;
  };

  const updateReservationStatus = (bookingId, newStatus) => {
    setReservations((prev) =>
      prev.map((item) => (item.bookingId === bookingId ? { ...item, status: newStatus } : item))
    );
    showToast(`Reservation #${bookingId} updated to "${newStatus}".`, '✓');
  };

  const dispatchDigitalKey = (bookingId) => {
    updateReservationStatus(bookingId, 'Key Dispatched');
    showToast(`Digital access key code dispatched to guest WhatsApp & Email!`, '🔑');
  };

  const createListing = (newListing) => {
    const id = `kn-${Date.now().toString().slice(-4)}`;
    const listingWithDefaults = {
      id,
      reviewsCount: 0,
      rating: 5.0,
      reviews: [],
      gallery: [newListing.coverImg, newListing.coverImg],
      host: {
        name: currentUser?.name || "Architect Custodian",
        initials: currentUser?.initials || "AC",
        role: currentUser?.practiceName || "Heritage Custodian",
        bio: "Dedicated architectural steward providing mindful stays.",
        verified: true
      },
      ...newListing
    };

    setListings((prev) => [listingWithDefaults, ...prev]);
    showToast(`"${newListing.title}" published live to the Kanso marketplace!`, '🏛️');
    setIsAddListingOpen(false);
  };

  const addReview = (propertyId, review) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === propertyId) {
          const updatedReviews = [
            {
              author: review.author,
              score: parseFloat(review.rating),
              date: "Just now",
              text: review.text
            },
            ...(item.reviews || [])
          ];
          const newAvg = (
            updatedReviews.reduce((sum, r) => sum + r.score, 0) / updatedReviews.length
          ).toFixed(2);
          return {
            ...item,
            reviewsCount: updatedReviews.length,
            rating: parseFloat(newAvg),
            reviews: updatedReviews
          };
        }
        return item;
      })
    );
    showToast("Thank you. Your architectural impression has been published.", '★');
    setAddReviewTarget(null);
  };

  const sendInquiry = (propertyId, messageText) => {
    const currentThread = inquiries[propertyId] || [];
    const userMsg = { sender: 'guest', text: messageText, time: 'Just now' };
    const updated = [...currentThread, userMsg];

    setInquiries((prev) => ({
      ...prev,
      [propertyId]: updated
    }));

    // Simulate thoughtful host reply after 1.2s
    setTimeout(() => {
      const hostReply = {
        sender: 'host',
        text: `Namaste! Thank you for inquiring. We would be delighted to welcome you. The space is fully prepared with natural sunlight, pure linen, and local organic teas. Let us know if you need anything specific!`,
        time: 'Just now'
      };
      setInquiries((prev) => ({
        ...prev,
        [propertyId]: [...(prev[propertyId] || []), hostReply]
      }));
    }, 1200);
  };

  const loginUser = (userObj) => {
    setCurrentUser(userObj);
    setAuthModalState(null);
    showToast(`Signed in as ${userObj.name} (${userObj.roleLabel}).`, '✦');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast("Signed out. Returned to guest visitor mode.", '✓');
  };

  const quickDemoLogin = (role = 'guest') => {
    loginUser(DEMO_USERS[role]);
  };

  return (
    <KansoContext.Provider
      value={{
        listings,
        wishlist,
        reservations,
        inquiries,
        currentUser,
        activeFilter,
        setActiveFilter,
        detailSanctuaryId,
        setDetailSanctuaryId,
        bookingSanctuaryId,
        setBookingSanctuaryId,
        activeReceipt,
        setActiveReceipt,
        isHostPortalOpen,
        setIsHostPortalOpen,
        isAddListingOpen,
        setIsAddListingOpen,
        isReservationsOpen,
        setIsReservationsOpen,
        inquiryTarget,
        setInquiryTarget,
        addReviewTarget,
        setAddReviewTarget,
        isAmenitiesModalOpen,
        setIsAmenitiesModalOpen,
        authModalState,
        setAuthModalState,
        isQuickSearchOpen,
        setIsQuickSearchOpen,
        toast,
        showToast,
        toggleWishlist,
        createReservation,
        updateReservationStatus,
        dispatchDigitalKey,
        createListing,
        addReview,
        sendInquiry,
        loginUser,
        logoutUser,
        quickDemoLogin
      }}
    >
      {children}
    </KansoContext.Provider>
  );
}

export function useKanso() {
  const context = useContext(KansoContext);
  if (!context) {
    throw new Error('useKanso must be used within a KansoProvider');
  }
  return context;
}
