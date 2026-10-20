/**
 * KANSO LIVING — ARCHITECTURAL MARKETPLACE JAVASCRIPT ENGINE
 * Handles: Multi-host marketplace, search & filters, instant boarding pass booking,
 * host dashboard, messaging, reviews, and localStorage persistence.
 */

// ==========================================
// 1. SEED DATA: ARCHITECTURAL SANCTUARIES
// ==========================================
const SEED_SANCTUARIES = [
  {
    id: "kn-01",
    title: "Villa Terra Cotta",
    type: "Villa",
    region: "Goa",
    location: "Morjim, North Goa",
    price: 18500,
    rating: 4.96,
    reviewsCount: 28,
    guests: 4,
    specs: "4 Guests · 2 Master Suites · 2 Baths · 2,400 sq.ft",
    coverImg: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Carved from exposed regional laterite stone and reclaimed Burma teak, Villa Terra Cotta merges indoor courtyards with a private frangipani garden and an emerald plunge pool. Built by studio architects to capture the sea breeze.",
    amenities: ["Plunge Pool", "High-Speed WiFi", "Private Chef", "Air Conditioning", "Dedicated Workspace"],
    host: {
      name: "Ananya & Rohan Varma",
      initials: "AV",
      role: "Architect & Landscape Custodian",
      bio: "Practicing tropical architects based between Morjim and Mumbai, dedicated to preserving 19th-century Konkan stone masonry.",
      verified: true
    },
    reviews: [
      { author: "Kabir Sen", score: 5.0, date: "October 2026", text: "The quality of light filtering through the courtyard at sunrise is unmatched. The chef prepared pristine coastal Konkan meals daily." },
      { author: "Zoya Akhtar", score: 4.9, date: "September 2026", text: "Total silence, raw textures, and high-speed Starlink made this an inspiring remote work retreat." }
    ]
  },
  {
    id: "kn-02",
    title: "Cedarwood Deodar Chalet",
    type: "Chalet",
    region: "Himachal Pradesh",
    location: "Old Manali Valley",
    price: 14200,
    rating: 4.98,
    reviewsCount: 34,
    guests: 4,
    specs: "4 Guests · 2 Lofts · 2 Baths · Mountain Panorama",
    coverImg: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Perched above apple orchards in the upper Beas watershed, this handcrafted cedar sanctuary features Kath-Kuni dry-stone architecture, cast-iron woodstoves, and double-height glass framing snow-capped peaks.",
    amenities: ["Mountain Panorama", "High-Speed WiFi", "Dedicated Workspace", "Yoga Deck"],
    host: {
      name: "Tsering Dorje",
      initials: "TD",
      role: "Highland Builder & Naturalist",
      bio: "Himalayan heritage conservator managing eco-conscious timber architecture across the Kullu valley.",
      verified: true
    },
    reviews: [
      { author: "Vikram Mehta", score: 5.0, date: "October 2026", text: "The smell of cedar wood and the crackling bukhari fireplace create an atmosphere of pure peace." }
    ]
  },
  {
    id: "kn-03",
    title: "Raw Sandstone Haveli Suite",
    type: "Haveli",
    region: "Rajasthan",
    location: "Lake Pichola, Udaipur",
    price: 26000,
    rating: 4.95,
    reviewsCount: 42,
    guests: 2,
    specs: "2 Guests · 1 Royal Suite · 1 Marble Bath · Lakefront",
    coverImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Restored 240-year-old Mewari stone atelier. Features Jodhpur yellow sandstone arches, hand-burnished lime plaster walls, and private jharokha balconies hovering directly above the shimmering water.",
    amenities: ["Private Chef", "High-Speed WiFi", "Air Conditioning", "Plunge Pool"],
    host: {
      name: "Devika Rathore",
      initials: "DR",
      role: "Heritage Restorer",
      bio: "Descendant of Rajasthani architectural artisans, specializing in lime plastering and stone jali revival.",
      verified: true
    },
    reviews: [
      { author: "Natasha Roy", score: 5.0, date: "October 2026", text: "Sitting in the private stone jharokha watching the sunset over Lake Pichola was surreal." }
    ]
  },
  {
    id: "kn-04",
    title: "The Coffee Estate Bungalow",
    type: "Bungalow",
    region: "Karnataka",
    location: "Madikeri, Coorg",
    price: 21500,
    rating: 4.93,
    reviewsCount: 19,
    guests: 6,
    specs: "6 Guests · 3 Suites · 3 Baths · 80-Acre Estate",
    coverImg: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Tucked inside an 80-acre biodiverse Arabica plantation, this single-story retreat features red oxide floors, clay-tiled verandahs, outdoor brass bathtubs, and mist-covered forest trails.",
    amenities: ["Dedicated Workspace", "Pet Friendly", "High-Speed WiFi", "Private Chef", "Yoga Deck"],
    host: {
      name: "Vikram & Maya Cariappa",
      initials: "VC",
      role: "3rd Generation Planters",
      bio: "Regenerative coffee cultivators passionate about organic agriculture and Kodava culinary heritage.",
      verified: true
    },
    reviews: [
      { author: "Arjun Nair", score: 4.9, date: "August 2026", text: "Waking up to birdsong and fresh estate coffee brewed in brass filters was heavenly." }
    ]
  },
  {
    id: "kn-05",
    title: "Malabar Teak Pavilion",
    type: "Villa",
    region: "Kerala",
    location: "Kumarakom Backwaters",
    price: 24000,
    rating: 4.97,
    reviewsCount: 31,
    guests: 4,
    specs: "4 Guests · 2 Water Villas · 2 Open-Air Baths",
    coverImg: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Traditional Kerala Thachushastra wooden structure reassembled on the calm backwater canal. Equipped with open-to-sky monsoon showers, cantilevered wooden dining deck, and private solar boat transfers.",
    amenities: ["Plunge Pool", "Private Chef", "High-Speed WiFi", "Yoga Deck", "Air Conditioning"],
    host: {
      name: "Mathew Thomas",
      initials: "MT",
      role: "Canal Custodian",
      bio: "Boat builder and heritage wood preservationist nurturing backwater eco-sanctuaries.",
      verified: true
    },
    reviews: [
      { author: "Sunita Rao", score: 5.0, date: "September 2026", text: "The reflection of coconut palms on the private plunge pool is pure poetry." }
    ]
  },
  {
    id: "kn-06",
    title: "The Atelier Lime Studio",
    type: "Loft",
    region: "Puducherry",
    location: "White Town, French Quarter",
    price: 9800,
    rating: 4.91,
    reviewsCount: 22,
    guests: 2,
    specs: "2 Guests · 1 Designer Loft · 1 Courtyard",
    coverImg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "A sunlit artist studio featuring mustard yellow lime wash, terracotta arches, curated Indian textile library, and a minimalist private reading courtyard shaded by bougainvillea.",
    amenities: ["High-Speed WiFi", "Dedicated Workspace", "Air Conditioning", "Pet Friendly"],
    host: {
      name: "Camille & Arvind",
      initials: "CA",
      role: "Ceramicists & Designers",
      bio: "Founders of a regional terracotta design workshop collaborating with local Auroville artisans.",
      verified: true
    },
    reviews: [
      { author: "Pooja Hegde", score: 4.8, date: "October 2026", text: "Quiet, elegant, and two minutes walk from the promenade." }
    ]
  },
  {
    id: "kn-07",
    title: "Ganges Riverfront Hermitage",
    type: "Chalet",
    region: "Uttarakhand",
    location: "Shivpuri, Rishikesh",
    price: 16500,
    rating: 4.99,
    reviewsCount: 29,
    guests: 2,
    specs: "2 Guests · 1 Riverside Suite · Stone Deck",
    coverImg: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Minimalist river-stone pavilion overlooking the turquoise Ganges. Designed for silent contemplation, with an organic stone yoga deck and private access to pristine river rapids.",
    amenities: ["Mountain Panorama", "Yoga Deck", "High-Speed WiFi", "Private Chef"],
    host: {
      name: "Swami Anand & Meera",
      initials: "AM",
      role: "Sanctuary Custodians",
      bio: "Dedicated practitioners maintaining unhurried eco-dwellings along the upper Ganges.",
      verified: true
    },
    reviews: [
      { author: "Karan Johar", score: 5.0, date: "October 2026", text: "Waking up to the sound of flowing holy water was deeply rejuvenating." }
    ]
  },
  {
    id: "kn-08",
    title: "Alibaug Basalt Rock Villa",
    type: "Villa",
    region: "Maharashtra",
    location: "Awas Beach, Alibaug",
    price: 32000,
    rating: 4.94,
    reviewsCount: 16,
    guests: 8,
    specs: "8 Guests · 4 Suites · 4 Baths · 1 Acre Orchard",
    coverImg: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Crafted from black basalt rock and cast concrete, this brutalist coastal sanctuary is set inside a grove of chikoo and betel nut trees, featuring a 20-meter black stone lap pool.",
    amenities: ["Plunge Pool", "Private Chef", "High-Speed WiFi", "Air Conditioning", "Pet Friendly"],
    host: {
      name: "Siddharth Doshi",
      initials: "SD",
      role: "Modernist Architect",
      bio: "Architect focusing on monsoonal climate residential design and sustainable stone extraction.",
      verified: true
    },
    reviews: [
      { author: "Mira Kapoor", score: 5.0, date: "September 2026", text: "The black stone pool and private orchard made this feel like a sanctuary worlds away from Mumbai." }
    ]
  }
];

// ==========================================
// 2. STATE INITIALIZATION & LOCALSTORAGE
// ==========================================
class KansoStore {
  constructor() {
    this.listings = this.loadListings();
    this.wishlist = this.loadJSON("kanso_wishlist", ["kn-01"]);
    this.reservations = this.loadJSON("kanso_reservations", [
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
        status: "Confirmed"
      }
    ]);
    this.inquiries = this.loadJSON("kanso_inquiries", {});
    this.currentUser = this.loadJSON("kanso_current_user", null);
    this.activeFilter = {
      region: "all",
      type: "all",
      maxPrice: 60000,
      amenities: [],
      sortBy: "curated",
      searchQuery: ""
    };
    this.selectedProperty = null;
  }

  setCurrentUser(user) {
    this.currentUser = user;
    if (user) {
      this.saveJSON("kanso_current_user", this.currentUser);
    } else {
      localStorage.removeItem("kanso_current_user");
    }
  }

  loadListings() {
    const saved = localStorage.getItem("kanso_listings");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    localStorage.setItem("kanso_listings", JSON.stringify(SEED_SANCTUARIES));
    return SEED_SANCTUARIES;
  }

  saveListings() {
    localStorage.setItem("kanso_listings", JSON.stringify(this.listings));
  }

  loadJSON(key, defaultVal) {
    const saved = localStorage.getItem(key);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return defaultVal;
  }

  saveJSON(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  toggleWishlist(id) {
    const idx = this.wishlist.indexOf(id);
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
    } else {
      this.wishlist.push(id);
    }
    this.saveJSON("kanso_wishlist", this.wishlist);
    return this.wishlist.includes(id);
  }

  addListing(newListing) {
    this.listings.unshift(newListing);
    this.saveListings();
  }

  addReservation(res) {
    this.reservations.unshift(res);
    this.saveJSON("kanso_reservations", this.reservations);
  }

  addReview(propertyId, review) {
    const prop = this.listings.find(p => p.id === propertyId);
    if (prop) {
      prop.reviews.unshift(review);
      prop.reviewsCount += 1;
      const sum = prop.reviews.reduce((acc, r) => acc + Number(r.score), 0);
      prop.rating = (sum / prop.reviews.length).toFixed(2);
      this.saveListings();
    }
  }

  getFilteredListings() {
    return this.listings.filter(p => {
      // Region check
      if (this.activeFilter.region !== "all" && p.region !== this.activeFilter.region) {
        return false;
      }
      // Type check
      if (this.activeFilter.type !== "all" && p.type !== this.activeFilter.type) {
        return false;
      }
      // Price check
      if (p.price > this.activeFilter.maxPrice) {
        return false;
      }
      // Amenities check
      if (this.activeFilter.amenities.length > 0) {
        const hasAll = this.activeFilter.amenities.every(a => p.amenities.includes(a));
        if (!hasAll) return false;
      }
      // Text search query
      if (this.activeFilter.searchQuery.trim() !== "") {
        const q = this.activeFilter.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchLoc = p.location.toLowerCase().includes(q);
        const matchReg = p.region.toLowerCase().includes(q);
        const matchNarrative = p.narrative.toLowerCase().includes(q);
        const matchHost = p.host.name.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchReg && !matchNarrative && !matchHost) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (this.activeFilter.sortBy === "price-asc") return a.price - b.price;
      if (this.activeFilter.sortBy === "price-desc") return b.price - a.price;
      if (this.activeFilter.sortBy === "rating") return b.rating - a.rating;
      return 0; // curated order
    });
  }
}

const store = new KansoStore();

// ==========================================
// 3. UI CONTROLLER & RENDERING
// ==========================================

// Modal Scroll Lock Helpers (Prevents background from moving/scrolling)
function openModal(modalElem) {
  if (!modalElem) return;
  modalElem.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeModal(modalElem) {
  if (!modalElem) return;
  modalElem.classList.add("hidden");
  const anyOpen = document.querySelector(".modal-backdrop:not(.hidden), .host-portal-overlay:not(.hidden)");
  if (!anyOpen) {
    document.body.classList.remove("modal-open");
  }
}

// Hero Exhibition Showcase Carousel Engine
let currentHeroIndex = 0;

function updateHeroShowcase(index) {
  const list = store.listings;
  if (!list || !list.length) return;
  currentHeroIndex = (index + list.length) % list.length;
  const p = list[currentHeroIndex];

  const img = document.getElementById("heroShowcaseImg");
  if (img) {
    img.style.opacity = "0.35";
    setTimeout(() => {
      img.src = p.coverImg;
      img.alt = p.title;
      img.style.opacity = "1";
    }, 160);
  }

  const stamp = document.getElementById("heroShowcaseStamp");
  if (stamp) stamp.textContent = `SANCTUARY № ${String(currentHeroIndex + 1).padStart(2, "0")}`;

  const counter = document.getElementById("heroShowcaseCounter");
  if (counter) counter.textContent = `${currentHeroIndex + 1} / ${list.length}`;

  const loc = document.getElementById("heroShowcaseLoc");
  if (loc) loc.textContent = `${p.location.toUpperCase()} · ${p.region.toUpperCase()}`;

  const title = document.getElementById("heroShowcaseTitle");
  if (title) title.textContent = p.title;

  const desc = document.getElementById("heroShowcaseDesc");
  if (desc) desc.textContent = p.narrative;

  const price = document.getElementById("heroShowcasePrice");
  if (price) price.textContent = formatINR(p.price);

  const tags = document.getElementById("heroShowcaseTags");
  if (tags) {
    tags.innerHTML = p.amenities.slice(0, 3).map(a => `<span class="amenity-tag">${a}</span>`).join("");
  }

  const btn = document.getElementById("heroReserveBtn");
  if (btn) {
    btn.onclick = () => openPropertyDetail(p.id);
  }
}

// Format Indian Currency INR (₹)
function formatINR(val) {
  return "₹" + Number(val).toLocaleString("en-IN");
}

// Show Toast Notification
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const msgElem = document.getElementById("toastMessage");
  if (!toast || !msgElem) return;
  msgElem.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3200);
}

// Render Gallery Grid
function renderSanctuaryGrid() {
  const container = document.getElementById("sanctuaryGrid");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");
  if (!container) return;

  const filtered = store.getFilteredListings();
  resultsCount.textContent = `Showing ${filtered.length} spaces`;

  if (filtered.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  container.innerHTML = filtered.map((item, index) => {
    const isSaved = store.wishlist.includes(item.id);
    const indexNumber = String(index + 1).padStart(2, "0");

    return `
      <article class="sanctuary-card" data-id="${item.id}">
        <!-- Visual Frame with 0/2px crisp edge -->
        <div class="card-media" onclick="openPropertyDetail('${item.id}')">
          <img src="${item.coverImg}" alt="${item.title}" loading="lazy">
          <span class="card-index-tag">LOC // ${indexNumber}</span>
          <button class="card-save-btn ${isSaved ? 'active' : ''}" 
                  onclick="handleWishlistClick(event, '${item.id}')" 
                  aria-label="Save ${item.title}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <!-- Meta info -->
        <div class="card-content">
          <div class="card-top-meta">
            <span class="card-region">${item.region} · ${item.type}</span>
            <span class="card-rating">★ ${item.rating} (${item.reviewsCount})</span>
          </div>

          <h3 class="card-title" onclick="openPropertyDetail('${item.id}')">${item.title}</h3>
          <p class="card-specs">${item.location} · ${item.specs}</p>

          <div class="card-amenities-tags">
            ${item.amenities.slice(0, 3).map(a => `<span class="amenity-tag">${a}</span>`).join("")}
          </div>

          <div class="card-footer">
            <div class="card-price-block">
              <span class="rate-val">${formatINR(item.price)}</span>
              <span class="rate-unit">/ night</span>
            </div>
            <div class="card-actions-row">
              <button class="btn-architectural btn-sm btn-secondary" onclick="openPropertyDetail('${item.id}')">
                Explore
              </button>
              <button class="btn-architectural btn-sm btn-primary" onclick="openBookingModal('${item.id}')">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");

  updateWishlistBadge();
  updateReservationsBadge();
}

// Update Badges in Header
function updateWishlistBadge() {
  const badge = document.getElementById("wishlistCount");
  if (badge) badge.textContent = store.wishlist.length;
}

function updateReservationsBadge() {
  const badge = document.getElementById("reservationsCount");
  if (badge) badge.textContent = store.reservations.length;
}

// Wishlist Click
window.handleWishlistClick = function(e, id) {
  e.stopPropagation();
  const isNowSaved = store.toggleWishlist(id);
  renderSanctuaryGrid();
  showToast(isNowSaved ? "Sanctuary added to your wishlist." : "Removed from wishlist.");
};

// ==========================================
// 4. PROPERTY DETAIL MODAL
// ==========================================
window.openPropertyDetail = function(id) {
  const prop = store.listings.find(p => p.id === id);
  if (!prop) return;
  store.selectedProperty = prop;

  // Set Content
  document.getElementById("detailRegionBadge").textContent = prop.region.toUpperCase();
  document.getElementById("detailTypeBadge").textContent = prop.type.toUpperCase();
  document.getElementById("detailCode").textContent = prop.id.toUpperCase();

  document.getElementById("detailTitle").textContent = prop.title;
  document.getElementById("detailLocation").textContent = prop.location;
  document.getElementById("detailRating").textContent = prop.rating;
  document.getElementById("detailReviewsCount").textContent = prop.reviewsCount;
  document.getElementById("detailSpecs").textContent = prop.specs;
  document.getElementById("detailNarrative").textContent = prop.narrative;
  document.getElementById("detailPrice").textContent = formatINR(prop.price);

  // Wishlist Status
  const isSaved = store.wishlist.includes(prop.id);
  const wishlistText = document.getElementById("detailWishlistText");
  wishlistText.textContent = isSaved ? "Saved to Wishlist" : "Save to Wishlist";

  // Gallery
  const mainImg = document.getElementById("detailMainImg");
  mainImg.src = prop.coverImg;
  const thumbsContainer = document.getElementById("detailThumbs");
  thumbsContainer.innerHTML = prop.gallery.map((img, i) => `
    <div class="thumb-item ${i === 0 ? 'active' : ''}" onclick="switchDetailGallery('${img}', this)">
      <img src="${img}" alt="${prop.title} thumbnail">
    </div>
  `).join("");

  // Amenities
  const amenitiesList = document.getElementById("detailAmenitiesList");
  amenitiesList.innerHTML = prop.amenities.map(a => `
    <span class="amenity-tag">${a}</span>
  `).join("");

  // Host Card
  document.getElementById("detailHostAvatar").textContent = prop.host.initials;
  document.getElementById("detailHostName").textContent = prop.host.name;
  document.getElementById("detailHostBio").textContent = prop.host.bio;

  // Reviews Masonry
  const reviewsContainer = document.getElementById("detailReviewsContainer");
  document.getElementById("reviewSectionCount").textContent = prop.reviews.length;
  reviewsContainer.innerHTML = prop.reviews.map(r => `
    <div class="review-card">
      <div class="review-card-top">
        <span class="review-author">${r.author}</span>
        <span class="review-score">★ ${r.score}</span>
      </div>
      <p>"${r.text}"</p>
      <span class="review-date">${r.date}</span>
    </div>
  `).join("");

  // Show Modal
  openModal(document.getElementById("detailModal"));
};

window.switchDetailGallery = function(imgUrl, thumbElem) {
  document.getElementById("detailMainImg").src = imgUrl;
  document.querySelectorAll(".thumb-item").forEach(t => t.classList.remove("active"));
  thumbElem.classList.add("active");
};

// ==========================================
// 5. THE KANSO RESERVATION SLIP ENGINE
// ==========================================
window.openBookingModal = function(id) {
  const prop = store.listings.find(p => p.id === id);
  if (!prop) return;
  store.selectedProperty = prop;

  // Setup preview
  document.getElementById("ticketPropertyImg").src = prop.coverImg;
  document.getElementById("ticketPropertyCat").textContent = `${prop.region} · ${prop.type}`;
  document.getElementById("ticketPropertyTitle").textContent = prop.title;
  document.getElementById("ticketPropertyLoc").textContent = prop.location;

  // Default Dates: Tomorrow to 3 days later
  const today = new Date();
  const checkInDate = new Date(today);
  checkInDate.setDate(today.getDate() + 1);
  const checkOutDate = new Date(today);
  checkOutDate.setDate(today.getDate() + 4);

  const formatDateInput = d => d.toISOString().split("T")[0];
  const checkInInput = document.getElementById("bookCheckIn");
  const checkOutInput = document.getElementById("bookCheckOut");

  checkInInput.min = formatDateInput(today);
  checkInInput.value = formatDateInput(checkInDate);
  checkOutInput.min = formatDateInput(checkInDate);
  checkOutInput.value = formatDateInput(checkOutDate);

  // Recalculate costs
  calculateBookingCosts();

  // Pre-fill user details if logged in
  if (store.currentUser) {
    const nameInput = document.getElementById("guestFullName");
    const emailInput = document.getElementById("guestEmail");
    const phoneInput = document.getElementById("guestPhone");
    if (nameInput && store.currentUser.name && store.currentUser.name !== "Guest Traveler") {
      nameInput.value = store.currentUser.name;
    }
    if (emailInput && store.currentUser.email) {
      emailInput.value = store.currentUser.email;
    }
    if (phoneInput && store.currentUser.phone) {
      phoneInput.value = store.currentUser.phone;
    }
  }

  // Reset Views
  document.getElementById("bookingFormView").classList.remove("hidden");
  document.getElementById("bookingReceiptView").classList.add("hidden");
  openModal(document.getElementById("bookingModal"));
};

function calculateBookingCosts() {
  if (!store.selectedProperty) return;
  const prop = store.selectedProperty;
  const inVal = document.getElementById("bookCheckIn").value;
  const outVal = document.getElementById("bookCheckOut").value;

  if (!inVal || !outVal) return;

  const d1 = new Date(inVal);
  const d2 = new Date(outVal);
  const diffTime = d2 - d1;
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const basePrice = prop.price * nights;
  const cleaningFee = 1500;
  const gstTax = Math.round((basePrice + cleaningFee) * 0.12);
  const total = basePrice + cleaningFee + gstTax;

  document.getElementById("calcNightsLabel").textContent = `${formatINR(prop.price)} × ${nights} night${nights > 1 ? 's' : ''}`;
  document.getElementById("calcBasePrice").textContent = formatINR(basePrice);
  document.getElementById("calcCleaning").textContent = formatINR(cleaningFee);
  document.getElementById("calcTax").textContent = formatINR(gstTax);
  document.getElementById("calcTotal").textContent = formatINR(total);

  return { nights, basePrice, cleaningFee, gstTax, total, inVal, outVal };
}

// Handle Reservation Submission
function handleReservationSubmit(e) {
  e.preventDefault();
  const prop = store.selectedProperty;
  if (!prop) return;

  const costs = calculateBookingCosts();
  const guestName = document.getElementById("guestFullName").value;
  const guestEmail = document.getElementById("guestEmail").value;
  const guestPhone = document.getElementById("guestPhone").value;
  const guestsCount = document.getElementById("bookGuests").value;
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const bookingId = `KN-2026-${randomSuffix}`;

  const reservation = {
    bookingId,
    propertyId: prop.id,
    title: prop.title,
    location: prop.location,
    guestName,
    guestEmail,
    guestPhone,
    checkIn: costs.inVal,
    checkOut: costs.outVal,
    nights: costs.nights,
    guests: guestsCount,
    total: costs.total,
    status: "Confirmed",
    timestamp: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
  };

  store.addReservation(reservation);

  // Populate Generated Boarding Pass Receipt
  const receiptThumb = document.getElementById("receiptThumb");
  if (receiptThumb) receiptThumb.src = prop.coverImg || "";
  document.getElementById("receiptGuestName").textContent = guestName;
  const receiptContact = document.getElementById("receiptContactDetails");
  if (receiptContact) receiptContact.textContent = `${guestEmail} · ${guestPhone}`;
  document.getElementById("receiptBookingId").textContent = bookingId;
  document.getElementById("receiptTitle").textContent = prop.title;
  document.getElementById("receiptLocation").textContent = prop.location;
  const receiptHostInfo = document.getElementById("receiptHostInfo");
  if (receiptHostInfo) receiptHostInfo.textContent = `Custodian: ${prop.host?.name || "Sanctuary Host"}`;
  document.getElementById("receiptNights").textContent = `${costs.nights} Nights (${guestsCount} Guests)`;
  document.getElementById("receiptDates").textContent = `${costs.inVal} → ${costs.outVal}`;
  document.getElementById("receiptTotal").textContent = formatINR(costs.total);
  const receiptBarcode = document.getElementById("receiptBarcodeCode");
  if (receiptBarcode) receiptBarcode.textContent = `KN-STAY-${bookingId}-AUTH-INDIA`;

  // Transition view
  document.getElementById("bookingFormView").classList.add("hidden");
  document.getElementById("bookingReceiptView").classList.remove("hidden");

  updateReservationsBadge();
  showToast(`Boarding Pass ${bookingId} confirmed!`);
}

// ==========================================
// 6. HOST PORTAL & DASHBOARD
// ==========================================
function renderHostDashboard() {
  const activeSpaces = store.listings.length;
  const reservationsCount = store.reservations.length;
  const totalEarnings = store.reservations.reduce((acc, r) => acc + (r.total || 0), 0);

  document.getElementById("metricActiveSpaces").textContent = activeSpaces;
  document.getElementById("metricReservations").textContent = reservationsCount;
  document.getElementById("metricEarnings").textContent = formatINR(totalEarnings);

  // Render Host Listings
  const listingsContainer = document.getElementById("hostListingsContainer");
  listingsContainer.innerHTML = store.listings.map(item => `
    <div class="host-listing-row" id="host-listing-${item.id}">
      <div class="host-item-left">
        <img src="${item.coverImg}" alt="${item.title}">
        <div>
          <h4>${item.title}</h4>
          <span>${item.location} · ${item.type} · ★ ${item.rating} (${item.reviewsCount} reviews)</span>
          <div style="margin-top: 4px; display: flex; gap: 8px; align-items: center;">
            <span class="badge-confirmed" style="background: rgba(42,59,46,0.1); color: var(--accent-moss);">VERIFIED ARCHITECTURAL SPACE</span>
          </div>
        </div>
      </div>
      <div class="host-item-right">
        <span class="host-item-price">${formatINR(item.price)} <small>/ night</small></span>
        <button class="btn-architectural btn-sm btn-secondary" onclick="openPropertyDetail('${item.id}')">View Space</button>
        <button class="btn-architectural btn-sm btn-secondary" style="color: var(--accent-earth);" onclick="removeHostListing('${item.id}')" title="Remove Listing">Remove</button>
      </div>
    </div>
  `).join("");

  // Render Host Received Bookings with Status Management
  const bookingsContainer = document.getElementById("hostBookingsContainer");
  if (store.reservations.length === 0) {
    bookingsContainer.innerHTML = `<p style="padding: 24px; text-align: center; color: var(--ink-secondary);">No guest reservations received yet.</p>`;
  } else {
    bookingsContainer.innerHTML = store.reservations.map(res => {
      const statusBadgeColor = res.status === "Key Dispatched" ? "#2A3B2E" : (res.status === "Stay Completed" ? "#524A40" : "#B85332");
      return `
        <div class="booking-item-card" style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;">
          <div class="booking-item-meta" style="flex: 1; min-width: 280px;">
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
              <span class="badge-confirmed" style="background-color: ${statusBadgeColor}20; color: ${statusBadgeColor};">${res.status || 'Confirmed'} · ${res.bookingId}</span>
              <span style="font-size: 0.72rem; color: var(--ink-tertiary);">${res.timestamp || '2026'}</span>
            </div>
            <h4>${res.title} — ${res.guestName}</h4>
            <p style="margin-top: 2px;">Dates: <strong>${res.checkIn} → ${res.checkOut}</strong> (${res.nights} nights · ${res.guests || 2} guests)</p>
            <p style="font-size: 0.8rem; color: var(--ink-tertiary); margin-top: 2px;">Contact: ${res.guestPhone} · ${res.guestEmail}</p>
          </div>
          <div class="booking-item-payout" style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
            <span class="amt">${formatINR(res.total)}</span>
            <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
              <select onchange="updateReservationStatus('${res.bookingId}', this.value)" style="font-size: 0.78rem; padding: 4px 8px; border: 1px solid var(--line-hairline); border-radius: 4px; background: #fff; color: var(--ink-primary); cursor: pointer;">
                <option value="Confirmed" ${res.status === 'Confirmed' || !res.status ? 'selected' : ''}>Confirmed</option>
                <option value="Key Dispatched" ${res.status === 'Key Dispatched' ? 'selected' : ''}>Key Dispatched</option>
                <option value="Checked In" ${res.status === 'Checked In' ? 'selected' : ''}>Checked In</option>
                <option value="Stay Completed" ${res.status === 'Stay Completed' ? 'selected' : ''}>Stay Completed</option>
              </select>
              <button class="btn-architectural btn-sm btn-secondary" onclick="dispatchKeyCode('${res.bookingId}')" title="Send WhatsApp Digital Key">
                Send Key
              </button>
              <button class="btn-architectural btn-sm btn-primary" onclick="openBoardingPassReceipt('${res.bookingId}')">
                View Pass
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
}

window.dispatchKeyCode = function(bookingId) {
  const res = store.reservations.find(r => r.bookingId === bookingId);
  if (!res) return;
  res.status = "Key Dispatched";
  store.saveJSON("kanso_reservations", store.reservations);
  renderHostDashboard();
  renderMyReservations();
  showToast(`✦ Key access code dispatched to ${res.guestName} (${res.guestPhone})!`);
};

window.updateReservationStatus = function(bookingId, newStatus) {
  const res = store.reservations.find(r => r.bookingId === bookingId);
  if (!res) return;
  res.status = newStatus;
  store.saveJSON("kanso_reservations", store.reservations);
  renderHostDashboard();
  renderMyReservations();
  showToast(`✦ Booking ${bookingId} marked as "${newStatus}".`);
};

window.removeHostListing = function(id) {
  const prop = store.listings.find(p => p.id === id);
  if (!prop) return;
  if (store.listings.length <= 1) {
    showToast("Cannot remove the last sanctuary from the marketplace.");
    return;
  }
  const confirmed = confirm(`Are you sure you want to unlist "${prop.title}" from Kanso Living?`);
  if (!confirmed) return;
  const idx = store.listings.findIndex(p => p.id === id);
  if (idx > -1) {
    store.listings.splice(idx, 1);
    store.saveListings();
    renderHostDashboard();
    renderSanctuaryGrid();
    initHeroShowcase();
    showToast(`"${prop.title}" unlisted from marketplace.`);
  }
};

// ==========================================
// 7. GUEST MY RESERVATIONS VIEW
// ==========================================
function renderMyReservations() {
  const container = document.getElementById("reservationsListContainer");
  if (!container) return;

  if (store.reservations.length === 0) {
    container.innerHTML = `<p style="padding: 32px 16px; text-align: center; color: var(--ink-secondary);">No reservations booked yet. Explore our sanctuaries to begin.</p>`;
    return;
  }

  container.innerHTML = store.reservations.map(res => {
    const prop = store.listings.find(p => p.id === res.propertyId);
    const thumbImg = prop ? prop.coverImg : "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80";
    return `
      <div class="booking-item-card" style="margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px; background: #FFFDF9; border: 1px solid var(--line-hairline); border-radius: 14px 6px 14px 6px; box-shadow: 0 4px 14px rgba(42, 59, 46, 0.05);">
        <div style="display: flex; gap: 16px; align-items: center;">
          <img src="${thumbImg}" alt="${res.title}" style="width: 72px; height: 72px; object-fit: cover; border-radius: 10px 4px 10px 4px; border: 1px solid var(--line-hairline); flex-shrink: 0;">
          <div>
            <span class="badge-confirmed">${res.bookingId}</span>
            <h4 style="font-family: var(--font-display); font-size: 1.15rem; margin-top: 4px; color: var(--ink-primary);">${res.title}</h4>
            <p style="font-size: 0.82rem; color: var(--ink-secondary); margin-top: 2px;">${res.location}</p>
            <p style="font-size: 0.76rem; color: var(--ink-tertiary); margin-top: 4px;">${res.checkIn} → ${res.checkOut} (${res.nights} Nights · ${res.guests || 2} Guests)</p>
          </div>
        </div>
        <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
          <span class="amt" style="font-family: var(--font-display); font-weight: 700; color: var(--accent-earth); font-size: 1.25rem;">${formatINR(res.total)}</span>
          <button class="btn-architectural btn-sm btn-primary" onclick="openBoardingPassReceipt('${res.bookingId}')">
            View Boarding Pass
          </button>
        </div>
      </div>
    `;
  }).join("");
}

window.openBoardingPassReceipt = function(bookingId) {
  const res = store.reservations.find(r => r.bookingId === bookingId);
  if (!res) return;
  const prop = store.listings.find(p => p.id === res.propertyId) || {
    id: res.propertyId,
    title: res.title,
    location: res.location,
    coverImg: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    host: { name: "Architect Custodian" }
  };
  store.selectedProperty = prop;

  // Populate Boarding Pass View
  const receiptThumb = document.getElementById("receiptThumb");
  if (receiptThumb) receiptThumb.src = prop.coverImg || "";
  document.getElementById("receiptGuestName").textContent = res.guestName;
  const receiptContact = document.getElementById("receiptContactDetails");
  if (receiptContact) receiptContact.textContent = `${res.guestEmail || ""} · ${res.guestPhone || ""}`;
  document.getElementById("receiptBookingId").textContent = res.bookingId;
  document.getElementById("receiptTitle").textContent = res.title;
  document.getElementById("receiptLocation").textContent = res.location;
  const receiptHostInfo = document.getElementById("receiptHostInfo");
  if (receiptHostInfo) receiptHostInfo.textContent = `Custodian: ${prop.host?.name || "Sanctuary Host"}`;
  document.getElementById("receiptNights").textContent = `${res.nights} Nights (${res.guests || 2} Guests)`;
  document.getElementById("receiptDates").textContent = `${res.checkIn} → ${res.checkOut}`;
  document.getElementById("receiptTotal").textContent = formatINR(res.total);
  const receiptBarcode = document.getElementById("receiptBarcodeCode");
  if (receiptBarcode) receiptBarcode.textContent = `KN-STAY-${res.bookingId}-AUTH-INDIA`;

  // Close reservations drawer and open booking modal in receipt mode
  closeModal(document.getElementById("myReservationsModal"));
  closeModal(document.getElementById("detailModal"));
  document.getElementById("bookingFormView").classList.add("hidden");
  document.getElementById("bookingReceiptView").classList.remove("hidden");
  openModal(document.getElementById("bookingModal"));
};

// ==========================================
// 8. CHAT / INQUIRY THREAD
// ==========================================
function openInquiryModal() {
  const prop = store.selectedProperty;
  if (!prop) return;

  document.getElementById("inquiryHostTitle").textContent = `Inquire with ${prop.host.name}`;
  const thread = document.getElementById("chatThreadContainer");

  // Load existing or seed initial
  if (!store.inquiries[prop.id]) {
    store.inquiries[prop.id] = [
      { sender: "host", name: prop.host.name, text: `Namaste. I am ${prop.host.name}, custodian of ${prop.title}. How may we prepare your stay?` }
    ];
  }

  renderChatThread(prop.id);
  openModal(document.getElementById("inquiryModal"));
}

function renderChatThread(propId) {
  const thread = document.getElementById("chatThreadContainer");
  const messages = store.inquiries[propId] || [];
  thread.innerHTML = messages.map(m => `
    <div class="chat-bubble ${m.sender}">
      <span class="sender">${m.name}</span>
      <p>${m.text}</p>
    </div>
  `).join("");
  thread.scrollTop = thread.scrollHeight;
}

// ==========================================
// 9. EVENT LISTENERS SETUP
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderSanctuaryGrid();
  updateHeroShowcase(0);

  // Hero Carousel Arrow Controls (Step 3 Upgrade)
  document.getElementById("heroNextShowcase")?.addEventListener("click", () => {
    updateHeroShowcase(currentHeroIndex + 1);
  });

  document.getElementById("heroPrevShowcase")?.addEventListener("click", () => {
    updateHeroShowcase(currentHeroIndex - 1);
  });

  // Hero Quick Search
  const heroSearchBtn = document.getElementById("heroSearchBtn");
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener("click", () => {
      const loc = document.getElementById("heroLocation").value;
      store.activeFilter.region = loc;
      // Also update hero showcase to that region if specific
      if (loc !== "all") {
        const matchIdx = store.listings.findIndex(p => p.region.toLowerCase().includes(loc.toLowerCase()));
        if (matchIdx !== -1) updateHeroShowcase(matchIdx);
      }
      document.querySelector(".gallery-section").scrollIntoView({ behavior: "smooth" });
      renderSanctuaryGrid();
    });
  }

  // Hero Quick Micro-Pills with Synchronized Showcase Switcher
  document.querySelectorAll(".micro-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".micro-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const region = pill.getAttribute("data-region");
      store.activeFilter.region = region;
      document.getElementById("heroLocation").value = region;
      
      // Synchronize hero showcase card with chosen region
      if (region !== "all") {
        const matchIdx = store.listings.findIndex(p => p.region.toLowerCase().includes(region.toLowerCase()));
        if (matchIdx !== -1) updateHeroShowcase(matchIdx);
      } else {
        updateHeroShowcase(0);
      }

      renderSanctuaryGrid();
    });
  });

  // Type Filters
  document.querySelectorAll(".type-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".type-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      store.activeFilter.type = tab.getAttribute("data-type");
      renderSanctuaryGrid();
    });
  });

  // Price Slider
  const priceRange = document.getElementById("priceMaxRange");
  const priceLabel = document.getElementById("priceLabel");
  if (priceRange) {
    priceRange.addEventListener("input", (e) => {
      const val = Number(e.target.value);
      store.activeFilter.maxPrice = val;
      priceLabel.textContent = formatINR(val);
      renderSanctuaryGrid();
    });
  }

  // Sort Select
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      store.activeFilter.sortBy = e.target.value;
      renderSanctuaryGrid();
    });
  }

  // Quick Search Trigger
  const quickSearchTrigger = document.getElementById("quickSearchTrigger");
  if (quickSearchTrigger) {
    quickSearchTrigger.addEventListener("click", () => {
      const q = prompt("Search sanctuaries by name, state, or architect (e.g. Goa, Manali, Pool, Laterite):", store.activeFilter.searchQuery);
      if (q !== null) {
        store.activeFilter.searchQuery = q;
        renderSanctuaryGrid();
        showToast(q ? `Filtered by "${q}"` : "Filter cleared.");
      }
    });
  }

  // Keyboard shortcut ⌘K or Ctrl+K
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      quickSearchTrigger.click();
    }
  });

  // Reset Filters
  const resetBtn = document.getElementById("resetFiltersBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      store.activeFilter = {
        region: "all",
        type: "all",
        maxPrice: 60000,
        amenities: [],
        sortBy: "curated",
        searchQuery: ""
      };
      if (priceRange) {
        priceRange.value = 60000;
        priceLabel.textContent = formatINR(60000);
      }
      document.querySelectorAll(".micro-pill").forEach(p => p.classList.remove("active"));
      document.querySelector(".micro-pill[data-region='all']")?.classList.add("active");
      document.querySelectorAll(".type-tab").forEach(t => t.classList.remove("active"));
      document.querySelector(".type-tab[data-type='all']")?.classList.add("active");
      document.getElementById("amenitiesFilterCount").textContent = "0";
      renderSanctuaryGrid();
      updateHeroShowcase(0);
    });
  }

  // Modals Backdrop Click: Closes modal and releases scroll lock
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
  });

  document.getElementById("closeDetailModal").addEventListener("click", () => {
    closeModal(document.getElementById("detailModal"));
  });

  document.getElementById("closeBookingModal").addEventListener("click", () => {
    closeModal(document.getElementById("bookingModal"));
  });

  document.getElementById("cancelBookingBtn").addEventListener("click", () => {
    closeModal(document.getElementById("bookingModal"));
  });

  // Detail Modal Action Buttons
  document.getElementById("detailBookNowBtn").addEventListener("click", () => {
    if (store.selectedProperty) {
      closeModal(document.getElementById("detailModal"));
      openBookingModal(store.selectedProperty.id);
    }
  });

  document.getElementById("detailWishlistBtn").addEventListener("click", () => {
    if (store.selectedProperty) {
      const isSaved = store.toggleWishlist(store.selectedProperty.id);
      document.getElementById("detailWishlistText").textContent = isSaved ? "Saved to Wishlist" : "Save to Wishlist";
      renderSanctuaryGrid();
      showToast(isSaved ? "Saved to your wishlist." : "Removed from wishlist.");
    }
  });

  document.getElementById("detailMessageHostBtn").addEventListener("click", () => {
    openInquiryModal();
  });

  // Date Change in Booking Form with Auto-Advance Validation
  document.getElementById("bookCheckIn").addEventListener("change", () => {
    const checkInInput = document.getElementById("bookCheckIn");
    const checkOutInput = document.getElementById("bookCheckOut");
    if (checkInInput.value) {
      const nextDay = new Date(checkInInput.value);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayStr = nextDay.toISOString().split("T")[0];
      checkOutInput.min = nextDayStr;
      if (!checkOutInput.value || checkOutInput.value <= checkInInput.value) {
        checkOutInput.value = nextDayStr;
      }
    }
    calculateBookingCosts();
  });
  document.getElementById("bookCheckOut").addEventListener("change", calculateBookingCosts);

  // Reservation Form Submit
  document.getElementById("reservationForm").addEventListener("submit", handleReservationSubmit);

  // Print Receipt / Boarding Pass
  document.getElementById("printReceiptBtn").addEventListener("click", () => {
    window.print();
  });

  // Message Custodian from Boarding Pass
  const receiptContactBtn = document.getElementById("receiptContactHostBtn");
  if (receiptContactBtn) {
    receiptContactBtn.addEventListener("click", () => {
      closeModal(document.getElementById("bookingModal"));
      if (store.selectedProperty) {
        openInquiryModal();
      }
    });
  }

  document.getElementById("doneBookingBtn").addEventListener("click", () => {
    closeModal(document.getElementById("bookingModal"));
    document.getElementById("myBookingsBtn").click();
  });

  // My Reservations Drawer
  document.getElementById("myBookingsBtn").addEventListener("click", () => {
    renderMyReservations();
    openModal(document.getElementById("myReservationsModal"));
  });

  document.getElementById("closeReservationsModal").addEventListener("click", () => {
    closeModal(document.getElementById("myReservationsModal"));
  });

  // Wishlist Nav Button
  document.getElementById("wishlistNavBtn").addEventListener("click", () => {
    if (store.wishlist.length === 0) {
      showToast("Your wishlist is empty. Click the heart on any sanctuary to save it.");
      return;
    }
    const savedList = store.listings.filter(p => store.wishlist.includes(p.id));
    document.querySelector(".gallery-section").scrollIntoView({ behavior: "smooth" });
    showToast(`Displaying ${savedList.length} saved sanctuaries.`);
  });

  // Host Portal Handlers
  const hostOverlay = document.getElementById("hostPortalOverlay");
  document.getElementById("hostPortalBtn").addEventListener("click", () => {
    if (!store.currentUser) {
      currentAuthRole = "host";
      currentAuthMode = "register";
      updateAuthFormState();
      openModal(authModal);
      showToast("✦ Join as a Sanctuary Host Custodian to list your architecture.");
      return;
    }
    renderHostDashboard();
    openModal(hostOverlay);
  });

  document.getElementById("closeHostPortalBtn").addEventListener("click", () => {
    closeModal(hostOverlay);
  });

  document.querySelectorAll(".host-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".host-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      document.querySelectorAll(".host-tab-content").forEach(c => c.classList.remove("active"));
      if (target === "listings") document.getElementById("tabContentListings").classList.add("active");
      if (target === "bookings") document.getElementById("tabContentBookings").classList.add("active");
    });
  });

  // Add Listing Handlers
  const addListingModal = document.getElementById("addListingModal");
  document.getElementById("openAddListingBtn").addEventListener("click", () => {
    openModal(addListingModal);
  });

  document.getElementById("closeAddListingModal").addEventListener("click", () => {
    closeModal(addListingModal);
  });

  document.getElementById("cancelAddListingBtn").addEventListener("click", () => {
    closeModal(addListingModal);
  });

  document.getElementById("newListingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("listingTitle").value;
    const type = document.getElementById("listingType").value;
    const region = document.getElementById("listingState").value;
    const location = document.getElementById("listingLocation").value;
    const price = Number(document.getElementById("listingPrice").value);
    const guests = Number(document.getElementById("listingGuests").value);
    const bedrooms = document.getElementById("listingBedrooms").value || "2 Beds · 2 Baths";
    const coverImg = document.getElementById("listingImage").value;
    const narrative = document.getElementById("listingDesc").value;

    const checkedAmenities = Array.from(document.querySelectorAll("input[name='amenity']:checked")).map(cb => cb.value);

    const newId = `kn-${Date.now().toString().slice(-4)}`;
    const newProperty = {
      id: newId,
      title,
      type,
      region,
      location,
      price,
      rating: 5.0,
      reviewsCount: 1,
      guests,
      specs: `${guests} Guests · ${bedrooms}`,
      coverImg,
      gallery: [coverImg, "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
      narrative,
      amenities: checkedAmenities,
      host: {
        name: (store.currentUser && store.currentUser.role === "host" && store.currentUser.name) ? store.currentUser.name : "You (Host Custodian)",
        initials: (store.currentUser && store.currentUser.role === "host" && store.currentUser.initials) ? store.currentUser.initials : "HC",
        role: (store.currentUser && store.currentUser.role === "host" && store.currentUser.propertyName) ? store.currentUser.propertyName : "Sanctuary Custodian",
        bio: "Owner and host of newly published architectural space.",
        verified: true
      },
      reviews: [
        { author: "Kanso Inspection", score: 5.0, date: "Just now", text: "Verified architectural standards and material craftsmanship." }
      ]
    };

    store.addListing(newProperty);
    closeModal(addListingModal);
    document.getElementById("newListingForm").reset();
    renderHostDashboard();
    renderSanctuaryGrid();
    showToast(`"${title}" published to Kanso Marketplace!`);
  });

  // Amenities Filter Modal
  const amenitiesModal = document.getElementById("amenitiesModal");
  document.getElementById("openFiltersBtn").addEventListener("click", () => {
    openModal(amenitiesModal);
  });

  document.getElementById("closeAmenitiesModal").addEventListener("click", () => {
    closeModal(amenitiesModal);
  });

  document.getElementById("clearAmenitiesBtn").addEventListener("click", () => {
    document.querySelectorAll(".amenity-filter-check").forEach(cb => cb.checked = false);
    store.activeFilter.amenities = [];
    document.getElementById("amenitiesFilterCount").textContent = "0";
    closeModal(amenitiesModal);
    renderSanctuaryGrid();
  });

  document.getElementById("applyAmenitiesBtn").addEventListener("click", () => {
    const selected = Array.from(document.querySelectorAll(".amenity-filter-check:checked")).map(cb => cb.value);
    store.activeFilter.amenities = selected;
    document.getElementById("amenitiesFilterCount").textContent = selected.length;
    closeModal(amenitiesModal);
    renderSanctuaryGrid();
    showToast(`Filtered by ${selected.length} amenities.`);
  });

  // Chat Form Submit
  const chatForm = document.getElementById("chatForm");
  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("chatInput");
      const val = input.value.trim();
      if (!val || !store.selectedProperty) return;

      const propId = store.selectedProperty.id;
      if (!store.inquiries[propId]) store.inquiries[propId] = [];

      // Add guest message
      store.inquiries[propId].push({ sender: "guest", name: "You (Guest)", text: val });
      renderChatThread(propId);
      input.value = "";

      // Simulate Host Response after 1.2s
      setTimeout(() => {
        store.inquiries[propId].push({
          sender: "host",
          name: store.selectedProperty.host.name,
          text: `Thank you for reaching out! We have noted this and look forward to welcoming you to ${store.selectedProperty.title}.`
        });
        store.saveJSON("kanso_inquiries", store.inquiries);
        renderChatThread(propId);
      }, 1200);
    });
  }

  document.getElementById("closeInquiryModal").addEventListener("click", () => {
    closeModal(document.getElementById("inquiryModal"));
  });

  // Review Submission Modal
  const addReviewModal = document.getElementById("addReviewModal");
  document.getElementById("openAddReviewBtn").addEventListener("click", () => {
    openModal(addReviewModal);
  });

  document.getElementById("closeAddReviewModal").addEventListener("click", () => {
    closeModal(addReviewModal);
  });

  document.getElementById("cancelReviewBtn").addEventListener("click", () => {
    closeModal(addReviewModal);
  });

  document.getElementById("addReviewForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!store.selectedProperty) return;

    const author = document.getElementById("reviewAuthor").value;
    const score = Number(document.getElementById("reviewRating").value);
    const text = document.getElementById("reviewText").value;
    const date = new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

    store.addReview(store.selectedProperty.id, { author, score, text, date });
    closeModal(addReviewModal);
    document.getElementById("addReviewForm").reset();

    // Reopen detail with updated review
    openPropertyDetail(store.selectedProperty.id);
    renderSanctuaryGrid();
    showToast("Your impression has been published!");
  });

  // Footer Links Region Filter
  document.querySelectorAll(".footer-region-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const region = link.getAttribute("data-region");
      store.activeFilter.region = region;
      document.querySelector(".gallery-section").scrollIntoView({ behavior: "smooth" });
      renderSanctuaryGrid();
    });
  });

  // Footer Host CTA
  document.getElementById("footerBecomeHost")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("hostPortalBtn").click();
  });

  // ==========================================
  // 9. DUAL-PERSONA AUTHENTICATION & USER SUITE
  // ==========================================
  const authModal = document.getElementById("authModal");
  const userMenuBtn = document.getElementById("userMenuBtn");
  const userDropdown = document.getElementById("userDropdownMenu");
  const closeAuthModalBtn = document.getElementById("closeAuthModal");

  const roleTabGuest = document.getElementById("roleTabGuest");
  const roleTabHost = document.getElementById("roleTabHost");
  const modeTabLogin = document.getElementById("modeTabLogin");
  const modeTabRegister = document.getElementById("modeTabRegister");

  const groupFullName = document.getElementById("groupFullName");
  const groupPropertyName = document.getElementById("groupPropertyName");
  const groupPhone = document.getElementById("groupPhone");
  const authEmailInput = document.getElementById("authEmail");
  const authSubmitBtn = document.getElementById("authSubmitBtn");
  const authForm = document.getElementById("authForm");

  const demoGuestBtn = document.getElementById("demoGuestBtn");
  const demoHostBtn = document.getElementById("demoHostBtn");

  let currentAuthRole = "guest"; // "guest" | "host"
  let currentAuthMode = "login";  // "login" | "register"

  function updateUserUI() {
    const user = store.currentUser;
    const navAuthCluster = document.getElementById("navAuthCluster");
    const userMenuWrap = document.getElementById("userMenuWrap");
    const hostBtnText = document.getElementById("hostBtnText");

    if (!user) {
      // First-time visitor: NO user is logged in
      navAuthCluster?.classList.remove("hidden");
      userMenuWrap?.classList.add("hidden");
      if (hostBtnText) hostBtnText.textContent = "List Sanctuary";
      return;
    }

    // Authenticated user: show profile initials & status dot
    navAuthCluster?.classList.add("hidden");
    userMenuWrap?.classList.remove("hidden");

    const initialsElem = document.getElementById("userInitials");
    const statusDot = document.getElementById("userStatusDot");
    const dropdownName = document.getElementById("dropdownUserName");
    const dropdownRole = document.getElementById("dropdownUserRole");

    if (initialsElem) {
      initialsElem.textContent = user.initials || "KL";
    }

    if (statusDot) {
      if (user.role === "host") {
        statusDot.classList.add("host-online");
        statusDot.title = "Host Custodian Online (Selling & Managing Stays)";
      } else {
        statusDot.classList.remove("host-online");
        statusDot.title = "Traveler Active (Seeking Stays & Rooms)";
      }
    }

    if (dropdownName) {
      dropdownName.textContent = user.name || (user.role === "host" ? "Sanctuary Host" : "Guest Traveler");
    }

    if (dropdownRole) {
      if (user.role === "host") {
        dropdownRole.textContent = "Sanctuary Host / Custodian";
        dropdownRole.style.color = "var(--accent-moss)";
      } else {
        dropdownRole.textContent = "Seeking Stays (Traveler)";
        dropdownRole.style.color = "var(--accent-earth)";
      }
    }

    if (hostBtnText) {
      if (user.role === "host") {
        hostBtnText.textContent = "Custodian Suite";
      } else {
        hostBtnText.textContent = "List Sanctuary";
      }
    }
  }

  function updateAuthFormState() {
    if (currentAuthRole === "guest") {
      roleTabGuest?.classList.add("active");
      roleHostTab?.classList.remove("active");
      groupPropertyName?.classList.add("hidden");
      if (authEmailInput && (authEmailInput.value === "ananya@varma-arch.in" || !authEmailInput.value)) {
        authEmailInput.value = "kabir@example.com";
      }
    } else {
      roleTabHost?.classList.add("active");
      roleTabGuest?.classList.remove("active");
      if (currentAuthMode === "register") {
        groupPropertyName?.classList.remove("hidden");
      } else {
        groupPropertyName?.classList.add("hidden");
      }
      if (authEmailInput && (authEmailInput.value === "kabir@example.com" || !authEmailInput.value)) {
        authEmailInput.value = "ananya@varma-arch.in";
      }
    }

    if (currentAuthMode === "login") {
      modeTabLogin?.classList.add("active");
      modeTabRegister?.classList.remove("active");
      groupFullName?.classList.add("hidden");
      groupPhone?.classList.add("hidden");
      groupPropertyName?.classList.add("hidden");

      if (authSubmitBtn) {
        authSubmitBtn.textContent = currentAuthRole === "host" ? "Sign In to Host Suite" : "Sign In as Traveler";
      }
    } else {
      modeTabRegister?.classList.add("active");
      modeTabLogin?.classList.remove("active");
      groupFullName?.classList.remove("hidden");
      groupPhone?.classList.remove("hidden");

      if (currentAuthRole === "host") {
        groupPropertyName?.classList.remove("hidden");
        if (authSubmitBtn) authSubmitBtn.textContent = "Register as Sanctuary Host";
      } else {
        groupPropertyName?.classList.add("hidden");
        if (authSubmitBtn) authSubmitBtn.textContent = "Create Traveler Account";
      }
    }
  }

  // Unauthenticated Navigation Auth Triggers
  document.getElementById("navSignInBtn")?.addEventListener("click", () => {
    currentAuthMode = "login";
    currentAuthRole = "guest";
    updateAuthFormState();
    openModal(authModal);
  });

  document.getElementById("navRegisterBtn")?.addEventListener("click", () => {
    currentAuthMode = "register";
    currentAuthRole = "guest";
    updateAuthFormState();
    openModal(authModal);
  });

  // User Dropdown Open / Close
  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!userDropdown.contains(e.target) && e.target !== userMenuBtn && !userMenuBtn.contains(e.target)) {
        userDropdown.classList.add("hidden");
      }
    });
  }

  document.getElementById("menuMyReservations")?.addEventListener("click", () => {
    userDropdown?.classList.add("hidden");
    document.getElementById("myBookingsBtn")?.click();
  });

  document.getElementById("menuWishlist")?.addEventListener("click", () => {
    userDropdown?.classList.add("hidden");
    document.getElementById("wishlistNavBtn")?.click();
  });

  document.getElementById("menuHostPortal")?.addEventListener("click", () => {
    userDropdown?.classList.add("hidden");
    document.getElementById("hostPortalBtn")?.click();
  });

  document.getElementById("menuSwitchAccount")?.addEventListener("click", () => {
    userDropdown?.classList.add("hidden");
    if (authModal) {
      openModal(authModal);
      updateAuthFormState();
    }
  });

  document.getElementById("menuSignOut")?.addEventListener("click", () => {
    userDropdown?.classList.add("hidden");
    store.setCurrentUser(null);
    updateUserUI();
    showToast("✦ Signed out. You are now exploring as a guest.");
  });

  // Full-Screen Auth Modal Close Action
  if (closeAuthModalBtn && authModal) {
    closeAuthModalBtn.addEventListener("click", () => {
      closeModal(authModal);
    });
  }

  roleTabGuest?.addEventListener("click", () => {
    currentAuthRole = "guest";
    updateAuthFormState();
  });

  roleTabHost?.addEventListener("click", () => {
    currentAuthRole = "host";
    updateAuthFormState();
  });

  modeTabLogin?.addEventListener("click", () => {
    currentAuthMode = "login";
    updateAuthFormState();
  });

  modeTabRegister?.addEventListener("click", () => {
    currentAuthMode = "register";
    updateAuthFormState();
  });

  // 1-Click Fast Demo Buttons
  demoGuestBtn?.addEventListener("click", () => {
    const guestUser = {
      name: "Kabir Sen",
      email: "kabir@example.com",
      role: "guest",
      initials: "KS",
      phone: "+91 98201 54321",
      propertyName: ""
    };
    store.setCurrentUser(guestUser);
    updateUserUI();
    closeModal(authModal);
    showToast("✦ Signed in as Kabir Sen (Seeking Stays & Rooms)");
  });

  demoHostBtn?.addEventListener("click", () => {
    const hostUser = {
      name: "Ananya Varma",
      email: "ananya@varma-arch.in",
      role: "host",
      initials: "AV",
      phone: "+91 98190 87654",
      propertyName: "Varma Architectural Sanctuaries"
    };
    store.setCurrentUser(hostUser);
    updateUserUI();
    closeModal(authModal);
    showToast("✦ Signed in as Ananya Varma (Sanctuary Host Custodian)");
    setTimeout(() => {
      document.getElementById("hostPortalBtn")?.click();
    }, 450);
  });

  // Auth Form Submit
  authForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = authEmailInput?.value.trim() || "";
    const fullName = document.getElementById("authFullName")?.value.trim() || "";
    const phone = document.getElementById("authPhone")?.value.trim() || "";
    const propName = document.getElementById("authPropertyName")?.value.trim() || "";

    let name = "";
    let initials = "";

    if (currentAuthMode === "register" && fullName) {
      name = fullName;
      const parts = fullName.split(" ").filter(Boolean);
      initials = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : parts[0].slice(0, 2).toUpperCase();
    } else {
      if (email.includes("@")) {
        const rawPart = email.split("@")[0].replace(/[._]/g, " ");
        name = rawPart.replace(/\b\w/g, l => l.toUpperCase());
        const parts = name.split(" ").filter(Boolean);
        initials = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : parts[0].slice(0, 2).toUpperCase();
      } else {
        name = currentAuthRole === "host" ? "Host Custodian" : "Traveler";
        initials = currentAuthRole === "host" ? "HC" : "TR";
      }
    }

    const newUser = {
      name: name || (currentAuthRole === "host" ? "Sanctuary Host" : "Guest Traveler"),
      email,
      role: currentAuthRole,
      initials: initials || (currentAuthRole === "host" ? "SH" : "GT"),
      phone: phone || "+91 98200 12345",
      propertyName: propName
    };

    store.setCurrentUser(newUser);
    updateUserUI();
    closeModal(authModal);

    if (currentAuthRole === "host") {
      showToast(`✦ Welcome to Host Custodian Suite, ${newUser.name}!`);
      setTimeout(() => {
        document.getElementById("hostPortalBtn")?.click();
      }, 450);
    } else {
      showToast(`✦ Welcome to Kanso Living, ${newUser.name}!`);
    }
  });

  // Initialize Auth UI state on launch
  updateUserUI();
  updateAuthFormState();
});
