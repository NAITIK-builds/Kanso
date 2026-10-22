/**
 * VERIFIED LOCAL AREA ROOM RENTALS DIRECTORY
 * Tailored for long-term stays (11-month agreements, standard deposits,
 * walkable metro stations, tech park proximity, and daily local essentials).
 */

export const SEED_ROOMS = [
  // ===================== BENGALURU =====================
  {
    id: "rm-blr-01",
    title: "Sunlit Balcony Master Room",
    type: "Private Room",
    city: "Bengaluru",
    region: "Bengaluru",
    localArea: "Indiranagar",
    location: "Defense Colony, 100ft Road, Indiranagar, Bengaluru",
    price: 16500,
    pricePeriod: "/ month",
    deposit: 33000,
    depositText: "₹33,000 (2 months, 100% refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "450m from Indiranagar Metro (Purple Line) — 5 mins walk",
    techParkProximity: "1.2 km to Bagmane Tech Park & RMZ Infinity",
    dailyEssentials: "Nature's Basket (180m), Cult.fit (300m), Chinmaya Mission Hospital (1.2km)",
    utilityBillSharing: "Electricity as per sub-meter; Fiber 300Mbps WiFi & water included",
    rating: 4.97,
    reviewsCount: 38,
    guests: 2,
    tenantPreference: "Working Professionals / Couple Friendly",
    specs: "Master Bedroom · Private Balcony · Attached Bath · 240 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Located in quiet Defense Colony off Indiranagar 100ft Road, this spacious master bedroom features an attached ensuite with hot geyser, teak wood wardrobe, dedicated work-from-home desk, and a private glass-door balcony facing lush rain trees. Walking distance to metro, premier cafes, and groceries.",
    amenities: ["Attached Bath", "High-Speed WiFi", "Air Conditioning", "Furnished", "Work Desk", "Shared Kitchen", "Power Backup", "Housekeeping", "Washing Machine", "Geyser", "Gated Security"],
    host: {
      name: "Rohan & Ananya Varma",
      initials: "RV",
      role: "Architect & Resident Owner",
      bio: "Living in the flat. Looking for quiet, mindful working professionals who value cleanliness and a calm home atmosphere.",
      verified: true
    },
    reviews: [
      { author: "Aditya Nair", score: 5.0, date: "October 2026", text: "Stayed for 11 months during my startup stint. The 300 Mbps fiber WiFi never dropped, metro is literally around the corner, and the neighborhood is peaceful." },
      { author: "Pooja Hegde", score: 4.9, date: "August 2026", text: "The private balcony and morning birdsong make working from home wonderful. Zero landlord interference." }
    ]
  },
  {
    id: "rm-blr-02",
    title: "Minimalist Studio Room near Tech Corridor",
    type: "Studio Room",
    city: "Bengaluru",
    region: "Bengaluru",
    localArea: "HSR Layout",
    location: "Sector 2, 27th Main Road, HSR Layout, Bengaluru",
    price: 18000,
    pricePeriod: "/ month",
    deposit: 36000,
    depositText: "₹36,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "1.4 km from upcoming HSR Silkboard Metro interchange",
    techParkProximity: "10 mins to Embassy TechVillage, EcoWorld & Prestige Tech Park",
    dailyEssentials: "Star Market (120m), Cult HSR (250m), Agara Lake Park (500m)",
    utilityBillSharing: "Electricity sub-metered; WiFi, 24/7 power backup and housekeeping included",
    rating: 4.93,
    reviewsCount: 31,
    guests: 1,
    tenantPreference: "Tech Professional / Solo Tenant",
    specs: "Independent Studio Room · Kitchenette · Ensuite Washroom · 260 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Independent, fully furnished studio room in prime HSR Sector 2. Comes with private induction kitchenette, mini-fridge, ergonomic Herman Miller-style study chair, queen orthopedic bed, and cross-ventilation windows facing green tree canopies. Ideal for Outer Ring Road tech workers wanting zero long commutes.",
    amenities: ["Attached Bath", "High-Speed WiFi", "Furnished", "Work Desk", "Air Conditioning", "Power Backup", "Housekeeping", "Washing Machine", "Kitchenette"],
    host: {
      name: "Siddharth Rao",
      initials: "SR",
      role: "Property Owner & Techie",
      bio: "Tech professional providing transparent, zero-brokerage long-term room rentals in HSR Layout.",
      verified: true
    },
    reviews: [
      { author: "Kunal Shah", score: 5.0, date: "September 2026", text: "Commute to EcoWorld is just 12 mins on bike. The room is quiet, clean, and power backup handles work uninterrupted." }
    ]
  },
  {
    id: "rm-blr-03",
    title: "Quiet Garden-Facing Bedroom in 3BHK",
    type: "Private Room",
    city: "Bengaluru",
    region: "Bengaluru",
    localArea: "Koramangala",
    location: "4th Block, 80ft Road, Koramangala, Bengaluru",
    price: 15000,
    pricePeriod: "/ month",
    deposit: 30000,
    depositText: "₹30,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "1.1 km to Sony World Signal & upcoming Dairy Circle Metro",
    techParkProximity: "Walk to Koramangala co-working hubs (WeWork, BHIVE, Innov8)",
    dailyEssentials: "Nature's Basket (200m), Third Wave Coffee (300m), St. John's Hospital (1.4km)",
    utilityBillSharing: "Equally shared electricity and gas with 2 flatmates; maid and cook available",
    rating: 4.96,
    reviewsCount: 26,
    guests: 1,
    tenantPreference: "Working Professional / Mindful Flatmate",
    specs: "Spacious Private Room · Attached Washroom · Garden View · 210 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "A private bedroom in a serene, low-density Koramangala 4th Block villa floor. Overlooking an inner courtyard garden, the room is equipped with custom oak study table, private attached bath with pressure shower, and full access to large living room and modular kitchen with cook facility.",
    amenities: ["Attached Bath", "High-Speed WiFi", "Furnished", "Work Desk", "Shared Kitchen", "Housekeeping", "Washing Machine", "Cook Service Available", "Gated Security"],
    host: {
      name: "Tanvi Kulkarni",
      initials: "TK",
      role: "Lead Flatmate & Product Designer",
      bio: "Sharing a quiet 3BHK flat with respectful design & startup professionals.",
      verified: true
    },
    reviews: [
      { author: "Sneha Sen", score: 5.0, date: "October 2026", text: "Safe for solo women, lovely green residential street, and having a reliable cook in the flat is a lifesaver." }
    ]
  },
  {
    id: "rm-blr-04",
    title: "Gated High-Rise Room near ITPB",
    type: "Co-Living",
    city: "Bengaluru",
    region: "Bengaluru",
    localArea: "Whitefield",
    location: "ITPB Main Road, Hope Farm Junction, Whitefield, Bengaluru",
    price: 13500,
    pricePeriod: "/ month",
    deposit: 27000,
    depositText: "₹27,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "300m from Hope Farm Channasandra Metro Station",
    techParkProximity: "5 mins to International Tech Park Bangalore (ITPB) & GR Tech Park",
    dailyEssentials: "In-society Supermarket, Swimming Pool, Gym, Manipal Hospital Whitefield (2km)",
    utilityBillSharing: "All maintenance & clubhouse amenities included; electricity as per meter",
    rating: 4.92,
    reviewsCount: 35,
    guests: 1,
    tenantPreference: "IT Professional / Graduate Engineer",
    specs: "Private High-Rise Bedroom · Ensuite Bath · Society Amenities · 220 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "14th floor bedroom inside a premium gated apartment community in Whitefield. Features expansive skyline views, private attached bathroom, high-speed fiber line, 100% DG power backup, Olympic clubhouse gym, and swimming pool. Walk straight to the metro station.",
    amenities: ["Attached Bath", "High-Speed WiFi", "Air Conditioning", "Furnished", "Work Desk", "Power Backup", "Housekeeping", "Gym / Pool", "Gated Security", "Washing Machine"],
    host: {
      name: "Amitabh Sen",
      initials: "AS",
      role: "Flatmate & Senior Engineer",
      bio: "Living in a gated society 3BHK flat near ITPB. Looking for an organized flatmate for long stay.",
      verified: true
    },
    reviews: [
      { author: "Deepak Verma", score: 4.9, date: "October 2026", text: "Walkable to metro station and 5 mins to my office in ITPB. Swimming pool and gym inside the society are a huge bonus." }
    ]
  },
  {
    id: "rm-blr-05",
    title: "Double Sharing Executive Room",
    type: "Shared Room",
    city: "Bengaluru",
    region: "Bengaluru",
    localArea: "BTM Layout",
    location: "Stage 2, 7th Cross, BTM Layout, Bengaluru",
    price: 9500,
    pricePeriod: "/ month",
    deposit: 19000,
    depositText: "₹19,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "2 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "800m from Rashtreeya Vidyalaya Road & BTM Metro stations",
    techParkProximity: "15 mins to Electronic City bus hub and Bannerghatta corporate road",
    dailyEssentials: "Local vegetable & fruit market (80m), Udupi restaurant (50m), Apollo Clinic (600m)",
    utilityBillSharing: "Fixed utility pack (WiFi, water, common electricity, daily cleaning) included",
    rating: 4.89,
    reviewsCount: 42,
    guests: 2,
    tenantPreference: "Students / Working Bachelors",
    specs: "Twin Sharing Bed · Individual Lockers & Study Desks · Attached Bath · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Clean, budget-conscious 2-sharing room in residential BTM 2nd Stage. Two separate single wooden beds with orthopedic spring mattresses, two personal 3-door wardrobes with lockable safes, two independent study desks, attached geyser washroom, and daily maid service.",
    amenities: ["Attached Bath", "High-Speed WiFi", "Furnished", "Work Desk", "Housekeeping", "Power Backup", "RO Water", "Washing Machine"],
    host: {
      name: "Mathew Thomas",
      initials: "MT",
      role: "Residence Manager",
      bio: "Managing clean, student and professional sharing homes across BTM Layout.",
      verified: true
    },
    reviews: [
      { author: "Arjun Nair", score: 4.9, date: "October 2026", text: "Quiet street, great food options around, and genuine zero brokerage. The deposit was refunded promptly when my roommate moved." }
    ]
  },

  // ===================== MUMBAI MMR =====================
  {
    id: "rm-mum-01",
    title: "Heritage Master Bedroom in Leafy Suburb",
    type: "Private Room",
    city: "Mumbai",
    region: "Mumbai",
    localArea: "Bandra West",
    location: "Pali Hill, Turner Road, Bandra West, Mumbai",
    price: 26000,
    pricePeriod: "/ month",
    deposit: 52000,
    depositText: "₹52,000 (2 months, 100% refundable)",
    leaseTerm: "11-Month Registered Agreement",
    lockInPeriod: "6 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "1.2 km to Bandra Suburban Station & upcoming Metro Line 2B",
    techParkProximity: "15 mins to BKC (Bandra Kurla Complex) via Western Express",
    dailyEssentials: "Candies Cafe (150m), Nature's Basket (200m), Lilavati Hospital (1.5km)",
    utilityBillSharing: "Electricity as per room meter; high-speed WiFi and maid included",
    rating: 4.96,
    reviewsCount: 25,
    guests: 2,
    tenantPreference: "Working Professional / Corporate Executive",
    specs: "Air-Conditioned Master Bedroom · Attached Rain Shower Bath · 280 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "A rare, calm master bedroom inside a leafy Pali Hill residential society. Double-glazed noise-cancelling windows, solid teak double bed, private modern bathroom with brass fittings, split AC, and dedicated work desk. Quick commute to BKC and South Mumbai.",
    amenities: ["Attached Bath", "Air Conditioning", "High-Speed WiFi", "Furnished", "Work Desk", "Shared Kitchen", "Housekeeping", "Gated Security", "Washing Machine"],
    host: {
      name: "Vikram Mehta",
      initials: "VM",
      role: "Architect & Owner",
      bio: "Offering verified luxury long-term room rentals in Bandra West for discerning corporate and creative professionals.",
      verified: true
    },
    reviews: [
      { author: "Kabir Sen", score: 5.0, date: "October 2026", text: "Commuting to BKC takes 15 minutes. Peaceful retreat from Mumbai's rush with giant banyan trees outside the window." }
    ]
  },
  {
    id: "rm-mum-02",
    title: "Modern Independent 1RK Studio",
    type: "Studio Room",
    city: "Mumbai",
    region: "Mumbai",
    localArea: "Andheri West",
    location: "Lokhandwala Complex, Back Road, Andheri West, Mumbai",
    price: 22000,
    pricePeriod: "/ month",
    deposit: 44000,
    depositText: "₹44,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "850m from D.N. Nagar & Versova Metro Stations",
    techParkProximity: "10 mins to Nesco IT Park Goregaon & Laxmi Industrial Estate",
    dailyEssentials: "Lokhandwala Market (100m), Kokilaben Dhirubhai Ambani Hospital (900m)",
    utilityBillSharing: "Direct electricity meter reading; society maintenance and WiFi included",
    rating: 4.91,
    reviewsCount: 28,
    guests: 2,
    tenantPreference: "Any (Media / IT Professionals / Solo)",
    specs: "Studio 1RK · Kitchen Counter · Private Balcony · 250 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Self-contained independent studio room in bustling Lokhandwala. Features compact granite kitchen platform with piped gas, attached bathroom with continuous hot water, private balcony, inverter power backup, and high-speed fiber internet.",
    amenities: ["Attached Bath", "Air Conditioning", "High-Speed WiFi", "Furnished", "Work Desk", "Power Backup", "Washing Machine", "Kitchenette", "Gated Security"],
    host: {
      name: "Sunil & Radhika Merchant",
      initials: "SM",
      role: "Resident Owners",
      bio: "Renting clean, well-maintained independent studios in Andheri West for long-term professionals.",
      verified: true
    },
    reviews: [
      { author: "Ananya Roy", score: 4.9, date: "October 2026", text: "Walkable to metro, everything you need is available 24/7 on Lokhandwala back road. Great host." }
    ]
  },
  {
    id: "rm-mum-03",
    title: "Lake-View High-Rise Bedroom",
    type: "Private Room",
    city: "Mumbai",
    region: "Mumbai",
    localArea: "Powai",
    location: "Hiranandani Gardens, Central Avenue, Powai, Mumbai",
    price: 21500,
    pricePeriod: "/ month",
    deposit: 43000,
    depositText: "₹43,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "1.5 km to upcoming Powai Lake Metro; easy bus connectivity",
    techParkProximity: "Walk to Hiranandani Business Park, Kensington, and Supreme Business Park",
    dailyEssentials: "Galleria Shopping Mall (300m), Haiko Supermarket (250m), Hiranandani Hospital (800m)",
    utilityBillSharing: "Electricity sub-metered; 500Mbps WiFi and daily flat housekeeping included",
    rating: 4.95,
    reviewsCount: 33,
    guests: 1,
    tenantPreference: "Working Professional / IIT Researcher",
    specs: "Private Bedroom · Powai Lake Vista · Attached Bath · 230 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Overlooking calm waters of Powai Lake and neoclassic European architecture of Hiranandani, this 18th floor bedroom offers complete silence, attached marble washroom, high-spec work desk, central AC, and shared access to a fully equipped modern kitchen.",
    amenities: ["Attached Bath", "Air Conditioning", "High-Speed WiFi", "Furnished", "Work Desk", "Shared Kitchen", "Housekeeping", "Power Backup", "Gym Access", "Gated Security"],
    host: {
      name: "Dr. Alok Srivastava",
      initials: "AS",
      role: "Professor & Homeowner",
      bio: "Renting extra bedrooms to quiet corporate techies and academic researchers looking for long-term peace.",
      verified: true
    },
    reviews: [
      { author: "Prateek Joshi", score: 5.0, date: "September 2026", text: "Walk to Hiranandani Business Park is 7 minutes. Cleanest neighborhood in Mumbai, zero traffic headache." }
    ]
  },

  // ===================== DELHI-NCR =====================
  {
    id: "rm-del-01",
    title: "Executive Suite near Rapid Metro",
    type: "Private Room",
    city: "Delhi-NCR",
    region: "Delhi-NCR",
    localArea: "Cyber City Gurgaon",
    location: "DLF Phase 3, Moulsari Avenue, Cyber City, Gurgaon",
    price: 19500,
    pricePeriod: "/ month",
    deposit: 39000,
    depositText: "₹39,000 (2 months, 100% refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "350m from Moulsari Avenue Rapid Metro Station (Walkable)",
    techParkProximity: "Walk to DLF Cyber Hub, Cyber City Building 10, 14, and Horizon Center",
    dailyEssentials: "Cyber Hub dining (400m), Le Marche Supermarket (300m), Fortis Hospital (4km)",
    utilityBillSharing: "Electricity prepaid smart meter; high-speed WiFi and RO water included",
    rating: 4.94,
    reviewsCount: 39,
    guests: 2,
    tenantPreference: "Corporate Professional / Consultant",
    specs: "Air-Conditioned Bedroom · Ensuite Bath · Balcony · 270 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Prime DLF Phase 3 private bedroom built for executives working in Cyber City. Walk to your office tower in 7 minutes and skip the notorious Gurgaon highway gridlock. Includes orthopedic king mattress, 50-inch smart TV, ensuite washroom with glass shower partition, and daily cleaning.",
    amenities: ["Attached Bath", "Air Conditioning", "High-Speed WiFi", "Furnished", "Work Desk", "Power Backup", "Housekeeping", "Gated Security", "Washing Machine"],
    host: {
      name: "Captain R.K. Bhalla",
      initials: "RB",
      role: "Resident Owner & Veteran",
      bio: "Providing secure, high-standard long-stay accommodations for corporate executives in DLF Phase 3.",
      verified: true
    },
    reviews: [
      { author: "Gaurav Malhotra", score: 5.0, date: "October 2026", text: "Walkable to my office in Cyber Hub Building 10. The 100% power backup and security guard make it completely hassle-free." }
    ]
  },
  {
    id: "rm-del-02",
    title: "Green View Bedroom near Metro Hub",
    type: "Private Room",
    city: "Delhi-NCR",
    region: "Delhi-NCR",
    localArea: "Noida Sector 62",
    location: "Block B, Sector 62, Noida, Uttar Pradesh",
    price: 12000,
    pricePeriod: "/ month",
    deposit: 24000,
    depositText: "₹24,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "500m from Noida Electronic City Metro Station (Blue Line)",
    techParkProximity: "Walk to Stellar IT Park, Logix Cyber Park, and Symbiosis Campus",
    dailyEssentials: "Tot Mall (200m), Fortis Hospital Noida (1.1km), Local Gym (250m)",
    utilityBillSharing: "Electricity as per sub-meter; WiFi, drinking water, and common society maintenance included",
    rating: 4.88,
    reviewsCount: 30,
    guests: 1,
    tenantPreference: "IT Professional / College Student",
    specs: "Spacious Private Room · Attached Washroom · Park Facing · 220 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Sun-drenched private bedroom overlooking the sector park. Situated in a gated colony right by Blue Line metro, with quick connectivity to Connaught Place and Central Delhi. Equipped with a large study desk, geyser, wooden wardrobe, and shared kitchen.",
    amenities: ["Attached Bath", "Air Conditioning", "High-Speed WiFi", "Furnished", "Work Desk", "Shared Kitchen", "Power Backup", "Housekeeping", "Gated Security"],
    host: {
      name: "Praveen Tiwari",
      initials: "PT",
      role: "Lead Flatmate",
      bio: "Software developer living in a 3BHK flat in Sector 62, welcoming clean and peaceful long-stay flatmates.",
      verified: true
    },
    reviews: [
      { author: "Nikhil Joshi", score: 4.9, date: "October 2026", text: "Blue line metro is literally a 6-minute walk. Very calm sector with green parks and zero brokerage." }
    ]
  },
  {
    id: "rm-del-03",
    title: "Quiet Heritage Room in South Delhi",
    type: "Private Room",
    city: "Delhi-NCR",
    region: "Delhi-NCR",
    localArea: "Hauz Khas",
    location: "Hauz Khas Enclave, Near Deer Park, South Delhi",
    price: 18500,
    pricePeriod: "/ month",
    deposit: 37000,
    depositText: "₹37,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "600m to Hauz Khas Metro Station (Yellow & Magenta Line Interchange)",
    techParkProximity: "15 mins to Aerocity, Saket District Centre, and AIIMS",
    dailyEssentials: "Deer Park walking track (150m), Aurobindo Market (400m), Max Saket (3.5km)",
    utilityBillSharing: "Electricity on meter; high-speed fiber internet and morning water supply included",
    rating: 4.98,
    reviewsCount: 36,
    guests: 1,
    tenantPreference: "Researchers / Professionals / Expats",
    specs: "South Delhi Bedroom · Ensuite Bathroom · French Window · 240 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Tucked inside South Delhi's serene Hauz Khas Enclave, steps away from the expansive green Deer Park. Large bedroom with high ceilings, attached bath with marble finish, solid wood work desk, inverter backup, and access to a rooftop terrace.",
    amenities: ["Attached Bath", "Air Conditioning", "High-Speed WiFi", "Furnished", "Work Desk", "Shared Kitchen", "Housekeeping", "Gated Security", "Washing Machine"],
    host: {
      name: "Siddhartha & Sunayana Sengupta",
      initials: "SS",
      role: "Resident Owners & Academics",
      bio: "Senior researchers offering dignified long-term living in our South Delhi family residence.",
      verified: true
    },
    reviews: [
      { author: "Tara Vohra", score: 5.0, date: "October 2026", text: "Morning walks in Deer Park and instant metro access at Hauz Khas interchange make this the best address in Delhi." }
    ]
  },

  // ===================== PUNE =====================
  {
    id: "rm-pun-01",
    title: "Modern Tech-Hub Bedroom near Infotech Park",
    type: "Private Room",
    city: "Pune",
    region: "Pune",
    localArea: "Hinjawadi",
    location: "Phase 1, Hinjawadi Rajiv Gandhi Infotech Park, Pune",
    price: 12500,
    pricePeriod: "/ month",
    deposit: 25000,
    depositText: "₹25,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "500m to upcoming Hinjawadi Metro Line 3 station",
    techParkProximity: "Walk to Infosys, Wipro, Cognizant, and Quadron Business Park",
    dailyEssentials: "D-Mart Hinjawadi (800m), Medipoint Hospital (2km), Local Food Stalls (100m)",
    utilityBillSharing: "Electricity sub-metered; WiFi, water, and building maintenance included",
    rating: 4.91,
    reviewsCount: 32,
    guests: 1,
    tenantPreference: "IT Professional / Graduate Engineer",
    specs: "Furnished Bedroom · Attached Ensuite · Work Station · 220 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Located in Hinjawadi Phase 1, eliminating the notorious Hinjawadi bridge traffic completely. Fully furnished with study table, queen bed with storage, attached bath with instant geyser, refrigerator, washing machine, and 24/7 power backup.",
    amenities: ["Attached Bath", "High-Speed WiFi", "Furnished", "Work Desk", "Shared Kitchen", "Power Backup", "Housekeeping", "Washing Machine", "Gated Security"],
    host: {
      name: "Sandeep Deshmukh",
      initials: "SD",
      role: "Homeowner & IT Lead",
      bio: "Renting clean, hassle-free rooms for long-term tech professionals working in Hinjawadi Phase 1 & 2.",
      verified: true
    },
    reviews: [
      { author: "Rahul Deshpande", score: 5.0, date: "October 2026", text: "I walk 5 minutes to my desk at Infosys Phase 1 every morning. Zero commute stress and genuine zero brokerage." }
    ]
  },
  {
    id: "rm-pun-02",
    title: "Tree-Canopied Studio in Cosmopolitan Hub",
    type: "Studio Room",
    city: "Pune",
    region: "Pune",
    localArea: "Koregaon Park",
    location: "Lane 5, North Main Road, Koregaon Park, Pune",
    price: 17000,
    pricePeriod: "/ month",
    deposit: 34000,
    depositText: "₹34,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "1.8 km to Bund Garden Metro Station & Pune Railway Station",
    techParkProximity: "10 mins to Kalyani Nagar (Cerebrum IT Park) & Yerwada Commerzone",
    dailyEssentials: "German Bakery (200m), Nature's Basket (350m), Inlaks & Budhrani Hospital (1km)",
    utilityBillSharing: "Electricity sub-metered; fiber WiFi, daily housekeeping and water included",
    rating: 4.97,
    reviewsCount: 37,
    guests: 2,
    tenantPreference: "Creative Professional / Expat / Couple",
    specs: "Boutique Studio Room · Kitchenette · Balcony · 270 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Immersed under the famous banyan tree canopy of Koregaon Park Lane 5. Features independent entrance, polished Kota stone flooring, private kitchenette with microwave & induction, attached designer bathroom, high-speed WiFi, and private sit-out balcony.",
    amenities: ["Attached Bath", "Air Conditioning", "High-Speed WiFi", "Furnished", "Work Desk", "Power Backup", "Housekeeping", "Kitchenette", "Gated Security"],
    host: {
      name: "Meera & Cyrus Poonawalla",
      initials: "CP",
      role: "Architects & Resident Hosts",
      bio: "Curating mindful long-stay living spaces in Pune's most beloved green cultural neighborhood.",
      verified: true
    },
    reviews: [
      { author: "Sonia Gokhale", score: 5.0, date: "October 2026", text: "Quiet lanes, birds chirping all day, and best cafes in Pune within walking distance. Ideal for long-term focus." }
    ]
  },

  // ===================== HYDERABAD =====================
  {
    id: "rm-hyd-01",
    title: "High-Rise Suite near Cyber Towers",
    type: "Private Room",
    city: "Hyderabad",
    region: "Hyderabad",
    localArea: "Hitec City",
    location: "Madhapur, Near Cyber Towers, Hitec City, Hyderabad",
    price: 15500,
    pricePeriod: "/ month",
    deposit: 31000,
    depositText: "₹31,000 (2 months, 100% refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "400m to Hitec City Metro Station (Blue Line)",
    techParkProximity: "Walk to Cyber Gateway, Mindspace IT Park, and Phoenix Tech Zone",
    dailyEssentials: "Inorbit Mall (1.2km), Ratnadeep Supermarket (200m), Medicover Hospital (1km)",
    utilityBillSharing: "Electricity as per sub-meter; high-speed 300Mbps fiber WiFi and RO water included",
    rating: 4.95,
    reviewsCount: 34,
    guests: 2,
    tenantPreference: "Tech Professional / Couple",
    specs: "Air-Conditioned Master Bedroom · Ensuite Bath · Balcony · 250 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Located directly in Madhapur/Hitec City, 4 minutes walk from the metro. Features large windows with open views, attached bathroom with geyser, private balcony, silent Daikin inverter AC, dedicated study desk with ergonomic chair, and full access to common modular kitchen.",
    amenities: ["Attached Bath", "Air Conditioning", "High-Speed WiFi", "Furnished", "Work Desk", "Shared Kitchen", "Power Backup", "Housekeeping", "Gated Security", "Washing Machine"],
    host: {
      name: "Srinivas Reddy",
      initials: "SR",
      role: "Lead Flatmate & Cloud Architect",
      bio: "Living in a 3BHK flat near Cyber Towers. Looking for a neat, responsible working professional for long-term stay.",
      verified: true
    },
    reviews: [
      { author: "Karthik Varma", score: 5.0, date: "October 2026", text: "Walk to Mindspace campus in 10 mins. Metro is super convenient and the flat is always clean." }
    ]
  },
  {
    id: "rm-hyd-02",
    title: "Gated Society Room in Financial District",
    type: "Co-Living",
    city: "Hyderabad",
    region: "Hyderabad",
    localArea: "Gachibowli",
    location: "Financial District, Nanakramguda, Gachibowli, Hyderabad",
    price: 14000,
    pricePeriod: "/ month",
    deposit: 28000,
    depositText: "₹28,000 (2 months, refundable)",
    leaseTerm: "11-Month Renewable Agreement",
    lockInPeriod: "3 Months",
    noticePeriod: "30 Days Notice",
    metroProximity: "15 mins to Raidurg Metro Station; society shuttle available",
    techParkProximity: "5 mins to Microsoft, Google, Amazon, and Wipro Gachibowli campuses",
    dailyEssentials: "In-society Supermarket, Swimming Pool, Gym, Continental Hospital (1.5km)",
    utilityBillSharing: "Clubhouse and society maintenance included; electricity as per meter",
    rating: 4.93,
    reviewsCount: 29,
    guests: 1,
    tenantPreference: "Working Professional / Corporate Trainee",
    specs: "Private Bedroom · Attached Bathroom · Society Amenities · 230 sq.ft · 11-mo lease",
    coverImg: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
    ],
    narrative: "Located in a luxury gated community in Gachibowli Financial District. Zero commute for tech professionals working at Microsoft, Amazon, or Google. Features high-rise views, attached bath with glass partition, power backup, clubhouse gym access, and 24/7 security.",
    amenities: ["Attached Bath", "Air Conditioning", "High-Speed WiFi", "Furnished", "Work Desk", "Shared Kitchen", "Power Backup", "Housekeeping", "Gym / Pool", "Gated Security"],
    host: {
      name: "Pooja & Ravi Teja",
      initials: "RT",
      role: "Software Engineers & Hosts",
      bio: "Renting extra room in our gated society flat for a quiet long-term corporate tenant.",
      verified: true
    },
    reviews: [
      { author: "Venkat Rao", score: 4.9, date: "October 2026", text: "Commute to Amazon campus is 5 minutes. The gym and badminton court inside society are great." }
    ]
  }
];

// Backwards compatibility alias
export const SEED_SANCTUARIES = SEED_ROOMS;
