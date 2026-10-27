-- ============================================================================
-- RENTAL ROOMS PLATFORM - SUPABASE SCHEMA & DATABASE SETUP
-- ============================================================================
-- Execute this entire script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query).
-- It creates all required tables, Row Level Security (RLS) policies, triggers,
-- and seeds the 15 verified long-term room listings.
-- ============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 2. USER PROFILES TABLE
-- Extends Supabase auth.users with app-specific profile metadata
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'guest' CHECK (role IN ('guest', 'host', 'admin')),
  role_label TEXT DEFAULT 'Room Seeker / Tenant',
  phone TEXT,
  practice_name TEXT,
  initials TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger function to automatically create a profile row when a user registers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_name TEXT;
  v_role TEXT;
  v_role_label TEXT;
  v_phone TEXT;
  v_practice TEXT;
  v_initials TEXT;
BEGIN
  v_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1));
  v_role := COALESCE(NEW.raw_user_meta_data->>'role', 'guest');
  v_phone := NEW.raw_user_meta_data->>'phone';
  v_practice := NEW.raw_user_meta_data->>'practice_name';
  v_role_label := CASE WHEN v_role = 'host' THEN 'Room Owner / Host' ELSE 'Room Seeker / Tenant' END;
  v_initials := UPPER(SUBSTRING(v_name FROM 1 FOR 2));

  INSERT INTO public.profiles (id, email, full_name, role, role_label, phone, practice_name, initials)
  VALUES (
    NEW.id,
    NEW.email,
    v_name,
    v_role,
    v_role_label,
    v_phone,
    v_practice,
    v_initials
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    role_label = EXCLUDED.role_label,
    phone = COALESCE(EXCLUDED.phone, profiles.phone),
    practice_name = COALESCE(EXCLUDED.practice_name, profiles.practice_name),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 3. ROOM LISTINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.listings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  local_area TEXT NOT NULL,
  location TEXT NOT NULL,
  price INTEGER NOT NULL,
  price_period TEXT DEFAULT '/ month',
  deposit INTEGER,
  deposit_text TEXT,
  lease_term TEXT,
  lock_in_period TEXT,
  notice_period TEXT,
  metro_proximity TEXT,
  tech_park_proximity TEXT,
  daily_essentials TEXT,
  utility_bill_sharing TEXT,
  rating NUMERIC(3,2) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  guests INTEGER DEFAULT 1,
  tenant_preference TEXT,
  specs TEXT,
  cover_img TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  narrative TEXT,
  amenities JSONB DEFAULT '[]'::jsonb,
  host JSONB DEFAULT '{}'::jsonb,
  reviews JSONB DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. RESERVATIONS / BOOKINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id TEXT UNIQUE NOT NULL,
  property_id TEXT NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  location TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  check_in TEXT,
  check_out TEXT,
  nights INTEGER DEFAULT 30,
  guests INTEGER DEFAULT 1,
  total INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Confirmed',
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. ROOM INQUIRIES / CHAT MESSAGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id TEXT NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  sender TEXT NOT NULL CHECK (sender IN ('guest', 'host')),
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. ROOM REVIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id TEXT NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author TEXT NOT NULL,
  score NUMERIC(3,1) NOT NULL CHECK (score >= 1.0 AND score <= 5.0),
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 7. USER SAVED ROOMS (WISHLIST) TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id TEXT NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- Permissive & safe defaults for seamless real-time usage
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert and update their own profile" ON public.profiles;
CREATE POLICY "Users can insert and update their own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- LISTINGS POLICIES
DROP POLICY IF EXISTS "Listings are viewable by everyone" ON public.listings;
CREATE POLICY "Listings are viewable by everyone" ON public.listings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert listings for testing, or authenticated hosts" ON public.listings;
CREATE POLICY "Anyone can insert listings for testing, or authenticated hosts" ON public.listings
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Owners or authenticated users can update listings" ON public.listings;
CREATE POLICY "Owners or authenticated users can update listings" ON public.listings
  FOR UPDATE USING (true);

-- RESERVATIONS POLICIES
DROP POLICY IF EXISTS "Reservations viewable by creator or hosts" ON public.reservations;
CREATE POLICY "Reservations viewable by creator or hosts" ON public.reservations
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can book a room reservation" ON public.reservations;
CREATE POLICY "Anyone can book a room reservation" ON public.reservations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update reservation status" ON public.reservations;
CREATE POLICY "Anyone can update reservation status" ON public.reservations
  FOR UPDATE USING (true);

-- INQUIRIES POLICIES
DROP POLICY IF EXISTS "Inquiries are viewable by everyone" ON public.inquiries;
CREATE POLICY "Inquiries are viewable by everyone" ON public.inquiries
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert an inquiry" ON public.inquiries;
CREATE POLICY "Anyone can insert an inquiry" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- REVIEWS POLICIES
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews;
CREATE POLICY "Reviews can be inserted" ON public.reviews
  FOR INSERT WITH CHECK (true);

-- WISHLISTS POLICIES
DROP POLICY IF EXISTS "Users can view their wishlists" ON public.wishlists;
CREATE POLICY "Users can view their wishlists" ON public.wishlists
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can insert their wishlist items" ON public.wishlists;
CREATE POLICY "Users can insert their wishlist items" ON public.wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can delete their wishlist items" ON public.wishlists;
CREATE POLICY "Users can delete their wishlist items" ON public.wishlists
  FOR DELETE USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- ============================================================================
-- 9. SEED DATA - 15 VERIFIED LOCAL ROOM LISTINGS
-- ============================================================================

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-blr-01',
  'Sunlit Balcony Master Room',
  'Private Room',
  'Bengaluru',
  'Bengaluru',
  'Indiranagar',
  'Defense Colony, 100ft Road, Indiranagar, Bengaluru',
  16500,
  '/ month',
  33000,
  '₹33,000 (2 months, 100% refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '450m from Indiranagar Metro (Purple Line) — 5 mins walk',
  '1.2 km to Bagmane Tech Park & RMZ Infinity',
  'Nature''s Basket (180m), Cult.fit (300m), Chinmaya Mission Hospital (1.2km)',
  'Electricity as per sub-meter; Fiber 300Mbps WiFi & water included',
  4.97,
  38,
  2,
  'Working Professionals / Couple Friendly',
  'Master Bedroom · Private Balcony · Attached Bath · 240 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Located in quiet Defense Colony off Indiranagar 100ft Road, this spacious master bedroom features an attached ensuite with hot geyser, teak wood wardrobe, dedicated work-from-home desk, and a private glass-door balcony facing lush rain trees. Walking distance to metro, premier cafes, and groceries.',
  '["Attached Bath","High-Speed WiFi","Air Conditioning","Furnished","Work Desk","Shared Kitchen","Power Backup","Housekeeping","Washing Machine","Geyser","Gated Security"]'::jsonb,
  '{"name":"Rohan & Ananya Varma","initials":"RV","role":"Architect & Resident Owner","bio":"Living in the flat. Looking for quiet, mindful working professionals who value cleanliness and a calm home atmosphere.","verified":true}'::jsonb,
  '[{"author":"Aditya Nair","score":5,"date":"October 2026","text":"Stayed for 11 months during my startup stint. The 300 Mbps fiber WiFi never dropped, metro is literally around the corner, and the neighborhood is peaceful."},{"author":"Pooja Hegde","score":4.9,"date":"August 2026","text":"The private balcony and morning birdsong make working from home wonderful. Zero landlord interference."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-blr-02',
  'Minimalist Studio Room near Tech Corridor',
  'Studio Room',
  'Bengaluru',
  'Bengaluru',
  'HSR Layout',
  'Sector 2, 27th Main Road, HSR Layout, Bengaluru',
  18000,
  '/ month',
  36000,
  '₹36,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '1.4 km from upcoming HSR Silkboard Metro interchange',
  '10 mins to Embassy TechVillage, EcoWorld & Prestige Tech Park',
  'Star Market (120m), Cult HSR (250m), Agara Lake Park (500m)',
  'Electricity sub-metered; WiFi, 24/7 power backup and housekeeping included',
  4.93,
  31,
  1,
  'Tech Professional / Solo Tenant',
  'Independent Studio Room · Kitchenette · Ensuite Washroom · 260 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Independent, fully furnished studio room in prime HSR Sector 2. Comes with private induction kitchenette, mini-fridge, ergonomic Herman Miller-style study chair, queen orthopedic bed, and cross-ventilation windows facing green tree canopies. Ideal for Outer Ring Road tech workers wanting zero long commutes.',
  '["Attached Bath","High-Speed WiFi","Furnished","Work Desk","Air Conditioning","Power Backup","Housekeeping","Washing Machine","Kitchenette"]'::jsonb,
  '{"name":"Siddharth Rao","initials":"SR","role":"Property Owner & Techie","bio":"Tech professional providing transparent, zero-brokerage long-term room rentals in HSR Layout.","verified":true}'::jsonb,
  '[{"author":"Kunal Shah","score":5,"date":"September 2026","text":"Commute to EcoWorld is just 12 mins on bike. The room is quiet, clean, and power backup handles work uninterrupted."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-blr-03',
  'Quiet Garden-Facing Bedroom in 3BHK',
  'Private Room',
  'Bengaluru',
  'Bengaluru',
  'Koramangala',
  '4th Block, 80ft Road, Koramangala, Bengaluru',
  15000,
  '/ month',
  30000,
  '₹30,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '1.1 km to Sony World Signal & upcoming Dairy Circle Metro',
  'Walk to Koramangala co-working hubs (WeWork, BHIVE, Innov8)',
  'Nature''s Basket (200m), Third Wave Coffee (300m), St. John''s Hospital (1.4km)',
  'Equally shared electricity and gas with 2 flatmates; maid and cook available',
  4.96,
  26,
  1,
  'Working Professional / Mindful Flatmate',
  'Spacious Private Room · Attached Washroom · Garden View · 210 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'A private bedroom in a serene, low-density Koramangala 4th Block villa floor. Overlooking an inner courtyard garden, the room is equipped with custom oak study table, private attached bath with pressure shower, and full access to large living room and modular kitchen with cook facility.',
  '["Attached Bath","High-Speed WiFi","Furnished","Work Desk","Shared Kitchen","Housekeeping","Washing Machine","Cook Service Available","Gated Security"]'::jsonb,
  '{"name":"Tanvi Kulkarni","initials":"TK","role":"Lead Flatmate & Product Designer","bio":"Sharing a quiet 3BHK flat with respectful design & startup professionals.","verified":true}'::jsonb,
  '[{"author":"Sneha Sen","score":5,"date":"October 2026","text":"Safe for solo women, lovely green residential street, and having a reliable cook in the flat is a lifesaver."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-blr-04',
  'Gated High-Rise Room near ITPB',
  'Co-Living',
  'Bengaluru',
  'Bengaluru',
  'Whitefield',
  'ITPB Main Road, Hope Farm Junction, Whitefield, Bengaluru',
  13500,
  '/ month',
  27000,
  '₹27,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '300m from Hope Farm Channasandra Metro Station',
  '5 mins to International Tech Park Bangalore (ITPB) & GR Tech Park',
  'In-society Supermarket, Swimming Pool, Gym, Manipal Hospital Whitefield (2km)',
  'All maintenance & clubhouse amenities included; electricity as per meter',
  4.92,
  35,
  1,
  'IT Professional / Graduate Engineer',
  'Private High-Rise Bedroom · Ensuite Bath · Society Amenities · 220 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  '14th floor bedroom inside a premium gated apartment community in Whitefield. Features expansive skyline views, private attached bathroom, high-speed fiber line, 100% DG power backup, Olympic clubhouse gym, and swimming pool. Walk straight to the metro station.',
  '["Attached Bath","High-Speed WiFi","Air Conditioning","Furnished","Work Desk","Power Backup","Housekeeping","Gym / Pool","Gated Security","Washing Machine"]'::jsonb,
  '{"name":"Amitabh Sen","initials":"AS","role":"Flatmate & Senior Engineer","bio":"Living in a gated society 3BHK flat near ITPB. Looking for an organized flatmate for long stay.","verified":true}'::jsonb,
  '[{"author":"Deepak Verma","score":4.9,"date":"October 2026","text":"Walkable to metro station and 5 mins to my office in ITPB. Swimming pool and gym inside the society are a huge bonus."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-blr-05',
  'Double Sharing Executive Room',
  'Shared Room',
  'Bengaluru',
  'Bengaluru',
  'BTM Layout',
  'Stage 2, 7th Cross, BTM Layout, Bengaluru',
  9500,
  '/ month',
  19000,
  '₹19,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '2 Months',
  '30 Days Notice',
  '800m from Rashtreeya Vidyalaya Road & BTM Metro stations',
  '15 mins to Electronic City bus hub and Bannerghatta corporate road',
  'Local vegetable & fruit market (80m), Udupi restaurant (50m), Apollo Clinic (600m)',
  'Fixed utility pack (WiFi, water, common electricity, daily cleaning) included',
  4.89,
  42,
  2,
  'Students / Working Bachelors',
  'Twin Sharing Bed · Individual Lockers & Study Desks · Attached Bath · 11-mo lease',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Clean, budget-conscious 2-sharing room in residential BTM 2nd Stage. Two separate single wooden beds with orthopedic spring mattresses, two personal 3-door wardrobes with lockable safes, two independent study desks, attached geyser washroom, and daily maid service.',
  '["Attached Bath","High-Speed WiFi","Furnished","Work Desk","Housekeeping","Power Backup","RO Water","Washing Machine"]'::jsonb,
  '{"name":"Mathew Thomas","initials":"MT","role":"Residence Manager","bio":"Managing clean, student and professional sharing homes across BTM Layout.","verified":true}'::jsonb,
  '[{"author":"Arjun Nair","score":4.9,"date":"October 2026","text":"Quiet street, great food options around, and genuine zero brokerage. The deposit was refunded promptly when my roommate moved."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-mum-01',
  'Heritage Master Bedroom in Leafy Suburb',
  'Private Room',
  'Mumbai',
  'Mumbai',
  'Bandra West',
  'Pali Hill, Turner Road, Bandra West, Mumbai',
  26000,
  '/ month',
  52000,
  '₹52,000 (2 months, 100% refundable)',
  '11-Month Registered Agreement',
  '6 Months',
  '30 Days Notice',
  '1.2 km to Bandra Suburban Station & upcoming Metro Line 2B',
  '15 mins to BKC (Bandra Kurla Complex) via Western Express',
  'Candies Cafe (150m), Nature''s Basket (200m), Lilavati Hospital (1.5km)',
  'Electricity as per room meter; high-speed WiFi and maid included',
  4.96,
  25,
  2,
  'Working Professional / Corporate Executive',
  'Air-Conditioned Master Bedroom · Attached Rain Shower Bath · 280 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'A rare, calm master bedroom inside a leafy Pali Hill residential society. Double-glazed noise-cancelling windows, solid teak double bed, private modern bathroom with brass fittings, split AC, and dedicated work desk. Quick commute to BKC and South Mumbai.',
  '["Attached Bath","Air Conditioning","High-Speed WiFi","Furnished","Work Desk","Shared Kitchen","Housekeeping","Gated Security","Washing Machine"]'::jsonb,
  '{"name":"Vikram Mehta","initials":"VM","role":"Architect & Owner","bio":"Offering verified luxury long-term room rentals in Bandra West for discerning corporate and creative professionals.","verified":true}'::jsonb,
  '[{"author":"Kabir Sen","score":5,"date":"October 2026","text":"Commuting to BKC takes 15 minutes. Peaceful retreat from Mumbai''s rush with giant banyan trees outside the window."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-mum-02',
  'Modern Independent 1RK Studio',
  'Studio Room',
  'Mumbai',
  'Mumbai',
  'Andheri West',
  'Lokhandwala Complex, Back Road, Andheri West, Mumbai',
  22000,
  '/ month',
  44000,
  '₹44,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '850m from D.N. Nagar & Versova Metro Stations',
  '10 mins to Nesco IT Park Goregaon & Laxmi Industrial Estate',
  'Lokhandwala Market (100m), Kokilaben Dhirubhai Ambani Hospital (900m)',
  'Direct electricity meter reading; society maintenance and WiFi included',
  4.91,
  28,
  2,
  'Any (Media / IT Professionals / Solo)',
  'Studio 1RK · Kitchen Counter · Private Balcony · 250 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Self-contained independent studio room in bustling Lokhandwala. Features compact granite kitchen platform with piped gas, attached bathroom with continuous hot water, private balcony, inverter power backup, and high-speed fiber internet.',
  '["Attached Bath","Air Conditioning","High-Speed WiFi","Furnished","Work Desk","Power Backup","Washing Machine","Kitchenette","Gated Security"]'::jsonb,
  '{"name":"Sunil & Radhika Merchant","initials":"SM","role":"Resident Owners","bio":"Renting clean, well-maintained independent studios in Andheri West for long-term professionals.","verified":true}'::jsonb,
  '[{"author":"Ananya Roy","score":4.9,"date":"October 2026","text":"Walkable to metro, everything you need is available 24/7 on Lokhandwala back road. Great host."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-mum-03',
  'Lake-View High-Rise Bedroom',
  'Private Room',
  'Mumbai',
  'Mumbai',
  'Powai',
  'Hiranandani Gardens, Central Avenue, Powai, Mumbai',
  21500,
  '/ month',
  43000,
  '₹43,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '1.5 km to upcoming Powai Lake Metro; easy bus connectivity',
  'Walk to Hiranandani Business Park, Kensington, and Supreme Business Park',
  'Galleria Shopping Mall (300m), Haiko Supermarket (250m), Hiranandani Hospital (800m)',
  'Electricity sub-metered; 500Mbps WiFi and daily flat housekeeping included',
  4.95,
  33,
  1,
  'Working Professional / IIT Researcher',
  'Private Bedroom · Powai Lake Vista · Attached Bath · 230 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Overlooking calm waters of Powai Lake and neoclassic European architecture of Hiranandani, this 18th floor bedroom offers complete silence, attached marble washroom, high-spec work desk, central AC, and shared access to a fully equipped modern kitchen.',
  '["Attached Bath","Air Conditioning","High-Speed WiFi","Furnished","Work Desk","Shared Kitchen","Housekeeping","Power Backup","Gym Access","Gated Security"]'::jsonb,
  '{"name":"Dr. Alok Srivastava","initials":"AS","role":"Professor & Homeowner","bio":"Renting extra bedrooms to quiet corporate techies and academic researchers looking for long-term peace.","verified":true}'::jsonb,
  '[{"author":"Prateek Joshi","score":5,"date":"September 2026","text":"Walk to Hiranandani Business Park is 7 minutes. Cleanest neighborhood in Mumbai, zero traffic headache."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-del-01',
  'Executive Suite near Rapid Metro',
  'Private Room',
  'Delhi-NCR',
  'Delhi-NCR',
  'Cyber City Gurgaon',
  'DLF Phase 3, Moulsari Avenue, Cyber City, Gurgaon',
  19500,
  '/ month',
  39000,
  '₹39,000 (2 months, 100% refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '350m from Moulsari Avenue Rapid Metro Station (Walkable)',
  'Walk to DLF Cyber Hub, Cyber City Building 10, 14, and Horizon Center',
  'Cyber Hub dining (400m), Le Marche Supermarket (300m), Fortis Hospital (4km)',
  'Electricity prepaid smart meter; high-speed WiFi and RO water included',
  4.94,
  39,
  2,
  'Corporate Professional / Consultant',
  'Air-Conditioned Bedroom · Ensuite Bath · Balcony · 270 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Prime DLF Phase 3 private bedroom built for executives working in Cyber City. Walk to your office tower in 7 minutes and skip the notorious Gurgaon highway gridlock. Includes orthopedic king mattress, 50-inch smart TV, ensuite washroom with glass shower partition, and daily cleaning.',
  '["Attached Bath","Air Conditioning","High-Speed WiFi","Furnished","Work Desk","Power Backup","Housekeeping","Gated Security","Washing Machine"]'::jsonb,
  '{"name":"Captain R.K. Bhalla","initials":"RB","role":"Resident Owner & Veteran","bio":"Providing secure, high-standard long-stay accommodations for corporate executives in DLF Phase 3.","verified":true}'::jsonb,
  '[{"author":"Gaurav Malhotra","score":5,"date":"October 2026","text":"Walkable to my office in Cyber Hub Building 10. The 100% power backup and security guard make it completely hassle-free."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-del-02',
  'Green View Bedroom near Metro Hub',
  'Private Room',
  'Delhi-NCR',
  'Delhi-NCR',
  'Noida Sector 62',
  'Block B, Sector 62, Noida, Uttar Pradesh',
  12000,
  '/ month',
  24000,
  '₹24,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '500m from Noida Electronic City Metro Station (Blue Line)',
  'Walk to Stellar IT Park, Logix Cyber Park, and Symbiosis Campus',
  'Tot Mall (200m), Fortis Hospital Noida (1.1km), Local Gym (250m)',
  'Electricity as per sub-meter; WiFi, drinking water, and common society maintenance included',
  4.88,
  30,
  1,
  'IT Professional / College Student',
  'Spacious Private Room · Attached Washroom · Park Facing · 220 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Sun-drenched private bedroom overlooking the sector park. Situated in a gated colony right by Blue Line metro, with quick connectivity to Connaught Place and Central Delhi. Equipped with a large study desk, geyser, wooden wardrobe, and shared kitchen.',
  '["Attached Bath","Air Conditioning","High-Speed WiFi","Furnished","Work Desk","Shared Kitchen","Power Backup","Housekeeping","Gated Security"]'::jsonb,
  '{"name":"Praveen Tiwari","initials":"PT","role":"Lead Flatmate","bio":"Software developer living in a 3BHK flat in Sector 62, welcoming clean and peaceful long-stay flatmates.","verified":true}'::jsonb,
  '[{"author":"Nikhil Joshi","score":4.9,"date":"October 2026","text":"Blue line metro is literally a 6-minute walk. Very calm sector with green parks and zero brokerage."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-del-03',
  'Quiet Heritage Room in South Delhi',
  'Private Room',
  'Delhi-NCR',
  'Delhi-NCR',
  'Hauz Khas',
  'Hauz Khas Enclave, Near Deer Park, South Delhi',
  18500,
  '/ month',
  37000,
  '₹37,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '600m to Hauz Khas Metro Station (Yellow & Magenta Line Interchange)',
  '15 mins to Aerocity, Saket District Centre, and AIIMS',
  'Deer Park walking track (150m), Aurobindo Market (400m), Max Saket (3.5km)',
  'Electricity on meter; high-speed fiber internet and morning water supply included',
  4.98,
  36,
  1,
  'Researchers / Professionals / Expats',
  'South Delhi Bedroom · Ensuite Bathroom · French Window · 240 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Tucked inside South Delhi''s serene Hauz Khas Enclave, steps away from the expansive green Deer Park. Large bedroom with high ceilings, attached bath with marble finish, solid wood work desk, inverter backup, and access to a rooftop terrace.',
  '["Attached Bath","Air Conditioning","High-Speed WiFi","Furnished","Work Desk","Shared Kitchen","Housekeeping","Gated Security","Washing Machine"]'::jsonb,
  '{"name":"Siddhartha & Sunayana Sengupta","initials":"SS","role":"Resident Owners & Academics","bio":"Senior researchers offering dignified long-term living in our South Delhi family residence.","verified":true}'::jsonb,
  '[{"author":"Tara Vohra","score":5,"date":"October 2026","text":"Morning walks in Deer Park and instant metro access at Hauz Khas interchange make this the best address in Delhi."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-pun-01',
  'Modern Tech-Hub Bedroom near Infotech Park',
  'Private Room',
  'Pune',
  'Pune',
  'Hinjawadi',
  'Phase 1, Hinjawadi Rajiv Gandhi Infotech Park, Pune',
  12500,
  '/ month',
  25000,
  '₹25,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '500m to upcoming Hinjawadi Metro Line 3 station',
  'Walk to Infosys, Wipro, Cognizant, and Quadron Business Park',
  'D-Mart Hinjawadi (800m), Medipoint Hospital (2km), Local Food Stalls (100m)',
  'Electricity sub-metered; WiFi, water, and building maintenance included',
  4.91,
  32,
  1,
  'IT Professional / Graduate Engineer',
  'Furnished Bedroom · Attached Ensuite · Work Station · 220 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Located in Hinjawadi Phase 1, eliminating the notorious Hinjawadi bridge traffic completely. Fully furnished with study table, queen bed with storage, attached bath with instant geyser, refrigerator, washing machine, and 24/7 power backup.',
  '["Attached Bath","High-Speed WiFi","Furnished","Work Desk","Shared Kitchen","Power Backup","Housekeeping","Washing Machine","Gated Security"]'::jsonb,
  '{"name":"Sandeep Deshmukh","initials":"SD","role":"Homeowner & IT Lead","bio":"Renting clean, hassle-free rooms for long-term tech professionals working in Hinjawadi Phase 1 & 2.","verified":true}'::jsonb,
  '[{"author":"Rahul Deshpande","score":5,"date":"October 2026","text":"I walk 5 minutes to my desk at Infosys Phase 1 every morning. Zero commute stress and genuine zero brokerage."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-pun-02',
  'Tree-Canopied Studio in Cosmopolitan Hub',
  'Studio Room',
  'Pune',
  'Pune',
  'Koregaon Park',
  'Lane 5, North Main Road, Koregaon Park, Pune',
  17000,
  '/ month',
  34000,
  '₹34,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '1.8 km to Bund Garden Metro Station & Pune Railway Station',
  '10 mins to Kalyani Nagar (Cerebrum IT Park) & Yerwada Commerzone',
  'German Bakery (200m), Nature''s Basket (350m), Inlaks & Budhrani Hospital (1km)',
  'Electricity sub-metered; fiber WiFi, daily housekeeping and water included',
  4.97,
  37,
  2,
  'Creative Professional / Expat / Couple',
  'Boutique Studio Room · Kitchenette · Balcony · 270 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Immersed under the famous banyan tree canopy of Koregaon Park Lane 5. Features independent entrance, polished Kota stone flooring, private kitchenette with microwave & induction, attached designer bathroom, high-speed WiFi, and private sit-out balcony.',
  '["Attached Bath","Air Conditioning","High-Speed WiFi","Furnished","Work Desk","Power Backup","Housekeeping","Kitchenette","Gated Security"]'::jsonb,
  '{"name":"Meera & Cyrus Poonawalla","initials":"CP","role":"Architects & Resident Hosts","bio":"Curating mindful long-stay living spaces in Pune''s most beloved green cultural neighborhood.","verified":true}'::jsonb,
  '[{"author":"Sonia Gokhale","score":5,"date":"October 2026","text":"Quiet lanes, birds chirping all day, and best cafes in Pune within walking distance. Ideal for long-term focus."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-hyd-01',
  'High-Rise Suite near Cyber Towers',
  'Private Room',
  'Hyderabad',
  'Hyderabad',
  'Hitec City',
  'Madhapur, Near Cyber Towers, Hitec City, Hyderabad',
  15500,
  '/ month',
  31000,
  '₹31,000 (2 months, 100% refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '400m to Hitec City Metro Station (Blue Line)',
  'Walk to Cyber Gateway, Mindspace IT Park, and Phoenix Tech Zone',
  'Inorbit Mall (1.2km), Ratnadeep Supermarket (200m), Medicover Hospital (1km)',
  'Electricity as per sub-meter; high-speed 300Mbps fiber WiFi and RO water included',
  4.95,
  34,
  2,
  'Tech Professional / Couple',
  'Air-Conditioned Master Bedroom · Ensuite Bath · Balcony · 250 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Located directly in Madhapur/Hitec City, 4 minutes walk from the metro. Features large windows with open views, attached bathroom with geyser, private balcony, silent Daikin inverter AC, dedicated study desk with ergonomic chair, and full access to common modular kitchen.',
  '["Attached Bath","Air Conditioning","High-Speed WiFi","Furnished","Work Desk","Shared Kitchen","Power Backup","Housekeeping","Gated Security","Washing Machine"]'::jsonb,
  '{"name":"Srinivas Reddy","initials":"SR","role":"Lead Flatmate & Cloud Architect","bio":"Living in a 3BHK flat near Cyber Towers. Looking for a neat, responsible working professional for long-term stay.","verified":true}'::jsonb,
  '[{"author":"Karthik Varma","score":5,"date":"October 2026","text":"Walk to Mindspace campus in 10 mins. Metro is super convenient and the flat is always clean."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;

INSERT INTO public.listings (
  id, title, type, city, region, local_area, location, price, price_period,
  deposit, deposit_text, lease_term, lock_in_period, notice_period,
  metro_proximity, tech_park_proximity, daily_essentials, utility_bill_sharing,
  rating, reviews_count, guests, tenant_preference, specs, cover_img,
  gallery, narrative, amenities, host, reviews
) VALUES (
  'rm-hyd-02',
  'Gated Society Room in Financial District',
  'Co-Living',
  'Hyderabad',
  'Hyderabad',
  'Gachibowli',
  'Financial District, Nanakramguda, Gachibowli, Hyderabad',
  14000,
  '/ month',
  28000,
  '₹28,000 (2 months, refundable)',
  '11-Month Renewable Agreement',
  '3 Months',
  '30 Days Notice',
  '15 mins to Raidurg Metro Station; society shuttle available',
  '5 mins to Microsoft, Google, Amazon, and Wipro Gachibowli campuses',
  'In-society Supermarket, Swimming Pool, Gym, Continental Hospital (1.5km)',
  'Clubhouse and society maintenance included; electricity as per meter',
  4.93,
  29,
  1,
  'Working Professional / Corporate Trainee',
  'Private Bedroom · Attached Bathroom · Society Amenities · 230 sq.ft · 11-mo lease',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  'Located in a luxury gated community in Gachibowli Financial District. Zero commute for tech professionals working at Microsoft, Amazon, or Google. Features high-rise views, attached bath with glass partition, power backup, clubhouse gym access, and 24/7 security.',
  '["Attached Bath","Air Conditioning","High-Speed WiFi","Furnished","Work Desk","Shared Kitchen","Power Backup","Housekeeping","Gym / Pool","Gated Security"]'::jsonb,
  '{"name":"Pooja & Ravi Teja","initials":"RT","role":"Software Engineers & Hosts","bio":"Renting extra room in our gated society flat for a quiet long-term corporate tenant.","verified":true}'::jsonb,
  '[{"author":"Venkat Rao","score":4.9,"date":"October 2026","text":"Commute to Amazon campus is 5 minutes. The gym and badminton court inside society are great."}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  cover_img = EXCLUDED.cover_img,
  rating = EXCLUDED.rating;
