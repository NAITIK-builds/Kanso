import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SEED_SANCTUARIES } from '../data/sanctuaries';

export const RentalContext = createContext();

const DEFAULT_RESERVATIONS = [
  {
    bookingId: "RN-2026-7731",
    propertyId: "rm-knp-01",
    title: "Garden-Facing AC Room near Motijheel & Medical College",
    location: "Near Motijheel Lawns & Rave 3, Swaroop Nagar, Kanpur",
    guestName: "Priyanka Sharma",
    guestEmail: "priyanka@example.com",
    guestPhone: "+91 98200 12345",
    checkIn: "2026-11-01",
    checkOut: "2026-12-01",
    nights: 30,
    guests: 1,
    total: 11500,
    status: "Confirmed",
    specialRequests: "Quiet study corner & morning sunlight"
  }
];

export const DEMO_USERS = {
  guest: {
    name: "Kabir Sen",
    email: "kabir@example.com",
    role: "guest",
    roleLabel: "Seeking Home / Tenant",
    initials: "KS",
    phone: "+91 98765 43210"
  },
  host: {
    name: "Ananya Varma",
    email: "ananya@varma-arch.in",
    role: "host",
    roleLabel: "Room Owner / Host",
    initials: "AV",
    practiceName: "Indiranagar Residence",
    phone: "+91 98200 12345"
  }
};

export function RentalProvider({ children }) {
  // 1. Listings State (Automatically initialized with Kanpur and major cities)
  const [listings, setListings] = useState(() => {
    try {
      const savedVersion = localStorage.getItem('rental_room_version') || localStorage.getItem('kanso_room_version');
      const saved = localStorage.getItem('rental_listings') || localStorage.getItem('kanso_listings');
      if (saved && savedVersion === 'local_rooms_2026_kanpur_v1') {
        const parsed = JSON.parse(saved);
        if (parsed?.length && parsed[0]?.localArea) {
          return parsed;
        }
      }
      localStorage.setItem('rental_room_version', 'local_rooms_2026_kanpur_v1');
      localStorage.setItem('rental_listings', JSON.stringify(SEED_SANCTUARIES));
      return SEED_SANCTUARIES;
    } catch {
      return SEED_SANCTUARIES;
    }
  });

  // 2. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('rental_wishlist') || localStorage.getItem('kanso_wishlist');
      return saved ? JSON.parse(saved) : ["rm-knp-01", "rm-blr-01"];
    } catch {
      return ["rm-knp-01", "rm-blr-01"];
    }
  });

  // 3. Reservations State
  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem('rental_reservations') || localStorage.getItem('kanso_reservations');
      return saved ? JSON.parse(saved) : DEFAULT_RESERVATIONS;
    } catch {
      return DEFAULT_RESERVATIONS;
    }
  });

  // 4. Inquiries / Chat State
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('rental_inquiries') || localStorage.getItem('kanso_inquiries');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5. Current User State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rental_current_user') || localStorage.getItem('kanso_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 6. Filter State
  const [activeFilter, setActiveFilter] = useState({
    region: 'all',
    localArea: 'all',
    type: 'all',
    maxPrice: 40000,
    amenities: [],
    sortBy: 'curated',
    searchQuery: '',
    checkIn: '',
    checkOut: '',
    guests: '1'
  });

  // 7. Modal & UI State
  const [detailSanctuaryId, setDetailSanctuaryId] = useState(null);
  const [bookingSanctuaryId, setBookingSanctuaryId] = useState(null);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [isHostPortalOpen, setIsHostPortalOpen] = useState(false);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);
  const [inquiryTarget, setInquiryTarget] = useState(null);
  const [addReviewTarget, setAddReviewTarget] = useState(null);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState(null);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);

  // 8. Toast State
  const [toast, setToast] = useState({ show: false, message: '', symbol: 'sparkle' });

  const showToast = useCallback((message, symbol = 'sparkle') => {
    setToast({ show: true, message, symbol });
    setTimeout(() => {
      setToast({ show: false, message: '', symbol: 'sparkle' });
    }, 3500);
  }, []);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('rental_listings', JSON.stringify(listings));
    localStorage.setItem('kanso_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('rental_wishlist', JSON.stringify(wishlist));
    localStorage.setItem('kanso_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('rental_reservations', JSON.stringify(reservations));
    localStorage.setItem('kanso_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('rental_inquiries', JSON.stringify(inquiries));
    localStorage.setItem('kanso_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rental_current_user', JSON.stringify(currentUser));
      localStorage.setItem('kanso_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('rental_current_user');
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

  // Actions
  const toggleWishlist = (sanctuaryId) => {
    setWishlist((prev) => {
      const exists = prev.includes(sanctuaryId);
      const updated = exists ? prev.filter((id) => id !== sanctuaryId) : [...prev, sanctuaryId];
      showToast(
        exists ? "Removed from your saved rooms." : "Room saved to your wishlist.",
        exists ? "check" : "heart"
      );
      return updated;
    });
  };

  const createReservation = (newRes) => {
    const bookingId = `RN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullRecord = {
      ...newRes,
      bookingId,
      status: 'Confirmed'
    };
    setReservations((prev) => [fullRecord, ...prev]);
    setActiveReceipt(fullRecord);
    showToast(`Official Boarding Pass issued for ${fullRecord.title}!`, 'ticket');
    return fullRecord;
  };

  const updateReservationStatus = (bookingId, newStatus) => {
    setReservations((prev) =>
      prev.map((item) => (item.bookingId === bookingId ? { ...item, status: newStatus } : item))
    );
    showToast(`Reservation #${bookingId} updated to "${newStatus}".`, 'check');
  };

  const dispatchDigitalKey = (bookingId) => {
    updateReservationStatus(bookingId, 'Key Dispatched');
    showToast(`Digital access key code dispatched to guest WhatsApp & Email!`, 'key');
  };

  const createListing = (newListing) => {
    const id = `rm-${Date.now().toString().slice(-4)}`;
    const listingWithDefaults = {
      id,
      reviewsCount: 0,
      rating: 5.0,
      reviews: [],
      gallery: [newListing.coverImg, newListing.coverImg],
      host: {
        name: currentUser?.name || "Room Owner / Host",
        initials: currentUser?.initials || "RO",
        role: currentUser?.practiceName || "Verified Flatmate & Host",
        bio: "Providing clean, verified room rentals and peaceful shared living.",
        verified: true
      },
      ...newListing
    };

    setListings((prev) => [listingWithDefaults, ...prev]);
    showToast(`"${newListing.title}" published live for tenants!`, 'bed');
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
    showToast("Thank you. Your room review has been published.", 'star');
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
        text: `Namaste! Thank you for inquiring about this room rental. The room is available for immediate move-in with high-speed WiFi, clean washroom, and peaceful surroundings. Let us know if you'd like to schedule a physical walkthrough or discuss move-in dates!`,
        time: 'Just now'
      };
      setInquiries((prev) => ({
        ...prev,
        [propertyId]: [...(prev[propertyId] || []), hostReply]
      }));
    }, 1200);
  };

  // Local Fast Authentication
  const loginUser = (userObj) => {
    setCurrentUser(userObj);
    setAuthModalState(null);
    showToast(`Signed in as ${userObj.name} (${userObj.roleLabel || userObj.role}).`, 'sparkle');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast("Signed out. Returned to guest visitor mode.", 'check');
  };

  const quickDemoLogin = (role = 'guest') => {
    loginUser(DEMO_USERS[role]);
  };

  return (
    <RentalContext.Provider
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
    </RentalContext.Provider>
  );
}

export function useRental() {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
}

// Backward compatibility aliases
export const KansoContext = RentalContext;
export const KansoProvider = RentalProvider;
export const useKanso = useRental;
