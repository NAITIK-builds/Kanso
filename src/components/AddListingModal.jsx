import React, { useState, useEffect } from 'react';
import { useKanso } from '../context/KansoContext';
import { IconClose } from './Icons';
import ImageUploader from './ImageUploader';

const AMENITY_OPTIONS = [
  'Attached Bath',
  'High-Speed WiFi',
  'Air Conditioning',
  'Furnished',
  'Work Desk',
  'Shared Kitchen',
  'Power Backup',
  'Housekeeping',
  'Food / Meal Option',
  'Pet Friendly'
];

export default function AddListingModal() {
  const {
    isAddListingOpen,
    setIsAddListingOpen,
    createListing,
    updateListing,
    editingListing,
    setEditingListing,
    currentUser,
    showToast
  } = useKanso();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Private Room');
  const [region, setRegion] = useState('Bangalore');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('14500');
  const [guests, setGuests] = useState('1');
  const [tenantPreference, setTenantPreference] = useState('Any (Working Professional)');
  const [specs, setSpecs] = useState('Queen Bed · Attached Bath · Balcony · 220 sq.ft');
  const [coverImg, setCoverImg] = useState('');
  const [gallery, setGallery] = useState([]);
  const [narrative, setNarrative] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([
    'Attached Bath',
    'High-Speed WiFi',
    'Air Conditioning',
    'Furnished',
    'Work Desk'
  ]);
  const [validationError, setValidationError] = useState('');

  // Sync state whenever editingListing or modal visibility changes
  useEffect(() => {
    if (editingListing) {
      setTitle(editingListing.title || '');
      setType(editingListing.type || 'Private Room');
      setRegion(editingListing.region || 'Bangalore');
      setLocation(editingListing.location || '');
      setPrice(String(editingListing.price || '14500'));
      setGuests(String(editingListing.guests || '1'));
      setTenantPreference(editingListing.tenantPreference || 'Any (Working Professional)');
      setSpecs(editingListing.specs?.replace(/^\d+\s+Tenant\(s\)\s*·\s*/, '') || 'Queen Bed · Attached Bath · Balcony · 220 sq.ft');
      setCoverImg(editingListing.coverImg || '');
      setGallery(Array.isArray(editingListing.gallery) ? editingListing.gallery : (editingListing.coverImg ? [editingListing.coverImg] : []));
      setNarrative(editingListing.narrative || '');
      setSelectedAmenities(Array.isArray(editingListing.amenities) ? editingListing.amenities : [
        'Attached Bath',
        'High-Speed WiFi',
        'Air Conditioning',
        'Furnished',
        'Work Desk'
      ]);
      setValidationError('');
    } else {
      // Defaults for brand new listing
      setTitle('');
      setType('Private Room');
      setRegion('Bangalore');
      setLocation('');
      setPrice('14500');
      setGuests('1');
      setTenantPreference('Any (Working Professional)');
      setSpecs('Queen Bed · Attached Bath · Balcony · 220 sq.ft');
      setCoverImg('');
      setGallery([]);
      setNarrative('');
      setSelectedAmenities([
        'Attached Bath',
        'High-Speed WiFi',
        'Air Conditioning',
        'Furnished',
        'Work Desk'
      ]);
      setValidationError('');
    }
  }, [editingListing, isAddListingOpen]);

  // Do not render or allow if user is logged in as seeking home/guest
  if (!isAddListingOpen || currentUser?.role === 'guest') return null;

  const handleClose = () => {
    setIsAddListingOpen(false);
    if (setEditingListing) setEditingListing(null);
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Please enter a room title.');
      return;
    }
    if (!location.trim()) {
      setValidationError('Please specify the neighborhood or area.');
      return;
    }
    if (!coverImg) {
      setValidationError('Please upload at least one room photo or select a preset room photo.');
      if (showToast) showToast('Please upload at least one room photo.', 'bed');
      return;
    }
    if (!narrative.trim()) {
      setValidationError('Please provide a brief room description and flat rules.');
      return;
    }

    const listingPayload = {
      title: title.trim(),
      type,
      region,
      location: location.trim(),
      price: Number(price) || 12000,
      pricePeriod: '/ month',
      guests: Number(guests) || 1,
      tenantPreference,
      specs: `${guests} Tenant(s) · ${specs}`,
      coverImg: coverImg.trim(),
      gallery: gallery.length > 0 ? gallery : [coverImg.trim()],
      narrative: narrative.trim(),
      amenities: selectedAmenities
    };

    if (editingListing && updateListing) {
      updateListing(editingListing.id, listingPayload);
    } else {
      createListing(listingPayload);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-box modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-tag">
              {editingListing ? 'ROOM MANAGEMENT // UPDATE LISTING' : 'ROOM SUBMISSION // ZERO BROKERAGE'}
            </span>
            <h3 className="modal-title">
              {editingListing ? 'Edit Room Listing & Photos' : 'Post a Room for Rent'}
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <IconClose size={18} />
          </button>
        </div>

        {validationError && (
          <div className="form-error-alert" style={{ margin: '16px 24px 0', padding: '12px 16px', borderRadius: '8px', background: 'rgba(184, 83, 50, 0.1)', border: '1px solid var(--accent-earth, #b85332)', color: 'var(--accent-earth, #b85332)', fontSize: '13px', fontWeight: 500 }}>
            ⚠️ {validationError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-body form-grid">
          <div className="form-group span-2">
            <label htmlFor="listingTitle">Room Title *</label>
            <input
              type="text"
              id="listingTitle"
              required
              placeholder="e.g. Sunlit Master Bedroom with Private Balcony"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (validationError) setValidationError('');
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="listingType">Room Type *</label>
            <select
              id="listingType"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Private Room">Private Bedroom</option>
              <option value="Single Room">Single / Solo Room</option>
              <option value="Shared Room">Shared / Twin Sharing</option>
              <option value="Studio Room">Studio Room / 1RK</option>
              <option value="Co-Living">Co-Living Suite</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="listingState">City / Hub *</label>
            <select
              id="listingState"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="Kanpur">Kanpur</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Pune">Pune</option>
              <option value="Goa">Goa</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="listingLocation">Neighborhood / Area *</label>
            <input
              type="text"
              id="listingLocation"
              required
              placeholder="e.g. Swaroop Nagar, Kakadeo, or Indiranagar"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (validationError) setValidationError('');
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="listingPrice">Monthly Rent (₹ INR / month) *</label>
            <input
              type="number"
              id="listingPrice"
              required
              min="1000"
              step="500"
              placeholder="14500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="listingGuests">Max Occupants</label>
            <select
              id="listingGuests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="1">1 Person (Solo)</option>
              <option value="2">2 Persons (Double Sharing / Couple)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="listingTenantPref">Tenant Preference</label>
            <select
              id="listingTenantPref"
              value={tenantPreference}
              onChange={(e) => setTenantPreference(e.target.value)}
            >
              <option value="Any (Working Professional)">Any (Working Professional)</option>
              <option value="Male Only (Bachelor / Student)">Male Only (Bachelor / Student)</option>
              <option value="Female Only (Working / Student)">Female Only (Working / Student)</option>
              <option value="Couple Friendly">Couple Friendly</option>
            </select>
          </div>

          <div className="form-group span-2">
            <label htmlFor="listingBedrooms">Room Specs & Dimensions</label>
            <input
              type="text"
              id="listingBedrooms"
              placeholder="Queen Bed · Attached Bath · Balcony · 220 sq.ft"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
            />
          </div>

          {/* UPGRADED IMAGE UPLOADER COMPONENT - USER CAN UPLOAD PHOTOS DIRECTLY */}
          <div className="form-group span-2">
            <ImageUploader
              coverImg={coverImg}
              gallery={gallery}
              onChange={({ coverImg: newCover, gallery: newGallery }) => {
                setCoverImg(newCover);
                setGallery(newGallery);
                if (validationError) setValidationError('');
              }}
              required={true}
              label="Room Photographs"
            />
          </div>

          <div className="form-group span-2">
            <label htmlFor="listingDesc">Room Description & Flat Rules *</label>
            <textarea
              id="listingDesc"
              rows={3}
              required
              placeholder="Describe ventilation, sunlight, study desk, attached washroom, flatmates, and kitchen access..."
              value={narrative}
              onChange={(e) => {
                setNarrative(e.target.value);
                if (validationError) setValidationError('');
              }}
            ></textarea>
          </div>

          <div className="form-group span-2">
            <label>Included Amenities & Comforts</label>
            <div className="amenities-checkbox-grid">
              {AMENITY_OPTIONS.map((amenity) => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />{' '}
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="modal-footer span-2">
            <button
              type="button"
              className="btn-text"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-architectural btn-primary">
              {editingListing ? 'Save Listing Changes' : 'Post Room Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
