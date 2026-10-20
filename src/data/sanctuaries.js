export const SEED_SANCTUARIES = [
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
