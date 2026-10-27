import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate if user has configured real Supabase credentials
export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  rawUrl.startsWith('http') &&
  !rawUrl.includes('your-project') &&
  !rawUrl.includes('placeholder') &&
  rawKey.length > 25 &&
  !rawKey.includes('your-anon-key')
);

export const supabaseUrl = isSupabaseConfigured ? rawUrl : '';
export const supabaseAnonKey = isSupabaseConfigured ? rawKey : '';

// Create client instance if configured, or create a mock/safe client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

// ============================================================================
// DATA MAPPING HELPERS
// Converts Supabase snake_case SQL records to App camelCase format and vice-versa
// ============================================================================

export function mapListingFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    city: row.city,
    region: row.region,
    localArea: row.local_area || row.localArea || '',
    location: row.location,
    price: Number(row.price),
    pricePeriod: row.price_period || row.pricePeriod || '/ month',
    deposit: Number(row.deposit || 0),
    depositText: row.deposit_text || row.depositText || '',
    leaseTerm: row.lease_term || row.leaseTerm || '11-Month Renewable Agreement',
    lockInPeriod: row.lock_in_period || row.lockInPeriod || '3 Months',
    noticePeriod: row.notice_period || row.noticePeriod || '30 Days Notice',
    metroProximity: row.metro_proximity || row.metroProximity || '',
    techParkProximity: row.tech_park_proximity || row.techParkProximity || '',
    dailyEssentials: row.daily_essentials || row.dailyEssentials || '',
    utilityBillSharing: row.utility_bill_sharing || row.utilityBillSharing || '',
    rating: Number(row.rating || 5.0),
    reviewsCount: Number(row.reviews_count || (row.reviews ? row.reviews.length : 0)),
    guests: Number(row.guests || 1),
    tenantPreference: row.tenant_preference || row.tenantPreference || '',
    specs: row.specs || '',
    coverImg: row.cover_img || row.coverImg || '',
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    narrative: row.narrative || '',
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    host: row.host || {},
    reviews: Array.isArray(row.reviews) ? row.reviews : [],
    createdBy: row.created_by,
    createdAt: row.created_at
  };
}

export function mapListingToDb(listing, userId = null) {
  return {
    id: listing.id,
    title: listing.title,
    type: listing.type,
    city: listing.city || listing.region || 'Bengaluru',
    region: listing.region || listing.city || 'Bengaluru',
    local_area: listing.localArea || listing.local_area || '',
    location: listing.location || '',
    price: Math.round(Number(listing.price) || 0),
    price_period: listing.pricePeriod || '/ month',
    deposit: Math.round(Number(listing.deposit) || 0),
    deposit_text: listing.depositText || '',
    lease_term: listing.leaseTerm || '11-Month Renewable Agreement',
    lock_in_period: listing.lockInPeriod || '3 Months',
    notice_period: listing.noticePeriod || '30 Days Notice',
    metro_proximity: listing.metroProximity || '',
    tech_park_proximity: listing.techParkProximity || '',
    daily_essentials: listing.dailyEssentials || '',
    utility_bill_sharing: listing.utilityBillSharing || '',
    rating: Number(listing.rating || 5.0),
    reviews_count: Number(listing.reviewsCount || 0),
    guests: Number(listing.guests || 1),
    tenant_preference: listing.tenantPreference || '',
    specs: listing.specs || '',
    cover_img: listing.coverImg || '',
    gallery: listing.gallery || [listing.coverImg],
    narrative: listing.narrative || '',
    amenities: listing.amenities || [],
    host: listing.host || {},
    reviews: listing.reviews || [],
    created_by: userId
  };
}

export function mapReservationFromDb(row) {
  if (!row) return null;
  return {
    bookingId: row.booking_id || row.bookingId,
    propertyId: row.property_id || row.propertyId,
    title: row.title,
    location: row.location,
    userId: row.user_id,
    guestName: row.guest_name || row.guestName,
    guestEmail: row.guest_email || row.guestEmail,
    guestPhone: row.guest_phone || row.guestPhone,
    checkIn: row.check_in || row.checkIn,
    checkOut: row.check_out || row.checkOut,
    nights: Number(row.nights || 30),
    guests: Number(row.guests || 1),
    total: Number(row.total || 0),
    status: row.status || 'Confirmed',
    specialRequests: row.special_requests || row.specialRequests || '',
    createdAt: row.created_at
  };
}

export function mapReservationToDb(res, userId = null) {
  return {
    booking_id: res.bookingId,
    property_id: res.propertyId,
    title: res.title,
    location: res.location || '',
    user_id: userId || null,
    guest_name: res.guestName,
    guest_email: res.guestEmail,
    guest_phone: res.guestPhone || '',
    check_in: res.checkIn,
    check_out: res.checkOut,
    nights: Number(res.nights || 30),
    guests: Number(res.guests || 1),
    total: Math.round(Number(res.total || 0)),
    status: res.status || 'Confirmed',
    special_requests: res.specialRequests || ''
  };
}

// ============================================================================
// AUTHENTICATION HELPERS
// ============================================================================

export async function signUpUser({ email, password, fullName, role = 'guest', phone = '', practiceName = '' }) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add credentials to your .env file.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
        phone,
        practice_name: practiceName
      }
    }
  });

  if (error) throw error;
  return data;
}

export async function signInUser({ email, password }) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add credentials to your .env file.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

export async function signOutUser() {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getProfile(userId) {
  if (!isSupabaseConfigured || !supabase || !userId) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data;
}

// ============================================================================
// DATABASE CRUD HELPERS
// ============================================================================

export async function fetchListings() {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[Supabase] Failed to fetch listings:', error.message);
    return null;
  }
  return data && data.length > 0 ? data.map(mapListingFromDb) : null;
}

export async function insertListing(listing, userId = null) {
  if (!isSupabaseConfigured || !supabase) return null;
  const payload = mapListingToDb(listing, userId);
  const { data, error } = await supabase
    .from('listings')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error inserting listing:', error);
    throw error;
  }
  return mapListingFromDb(data);
}

export async function updateListingReviews(propertyId, reviews, rating, reviewsCount) {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('listings')
    .update({
      reviews,
      rating,
      reviews_count: reviewsCount
    })
    .eq('id', propertyId)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error updating listing reviews:', error);
    throw error;
  }
  return mapListingFromDb(data);
}

export async function fetchReservations(userEmail = null, userId = null) {
  if (!isSupabaseConfigured || !supabase) return null;
  let query = supabase.from('reservations').select('*').order('created_at', { ascending: false });
  
  if (userId) {
    query = query.or(`user_id.eq.${userId},guest_email.eq.${userEmail}`);
  } else if (userEmail) {
    query = query.eq('guest_email', userEmail);
  }

  const { data, error } = await query;
  if (error) {
    console.warn('[Supabase] Failed to fetch reservations:', error.message);
    return null;
  }
  return data ? data.map(mapReservationFromDb) : null;
}

export async function insertReservation(res, userId = null) {
  if (!isSupabaseConfigured || !supabase) return null;
  const payload = mapReservationToDb(res, userId);
  const { data, error } = await supabase
    .from('reservations')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error inserting reservation:', error);
    throw error;
  }
  return mapReservationFromDb(data);
}

export async function updateReservationStatus(bookingId, newStatus) {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('reservations')
    .update({ status: newStatus })
    .eq('booking_id', bookingId)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error updating reservation status:', error);
    throw error;
  }
  return mapReservationFromDb(data);
}

export async function fetchInquiries(propertyId) {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('property_id', propertyId)
    .order('created_at', { ascending: true });

  if (error) {
    console.warn('[Supabase] Failed to fetch inquiries:', error.message);
    return null;
  }
  return data;
}

export async function insertInquiry({ propertyId, userId = null, sender, text }) {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('inquiries')
    .insert([{
      property_id: propertyId,
      user_id: userId,
      sender,
      text
    }])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error inserting inquiry:', error);
    throw error;
  }
  return data;
}

export async function insertReview({ propertyId, userId = null, author, score, text }) {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from('reviews')
    .insert([{
      property_id: propertyId,
      user_id: userId,
      author,
      score: parseFloat(score),
      text
    }])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Error inserting review:', error);
    throw error;
  }
  return data;
}

// Connection test helper
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      connected: false,
      message: 'Supabase credentials are not configured in your .env file.'
    };
  }
  try {
    const { data, error } = await supabase.from('listings').select('id').limit(1);
    if (error) {
      return {
        connected: false,
        message: `Connected to Supabase URL, but database returned error: ${error.message}. Make sure you ran supabase/schema.sql in your SQL Editor.`
      };
    }
    return {
      connected: true,
      message: 'Successfully connected to Supabase PostgreSQL database!'
    };
  } catch (err) {
    return {
      connected: false,
      message: err.message || 'Connection failed.'
    };
  }
}
