import React, { useState } from 'react';
import { useKanso } from '../context/KansoContext';

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
  const { isAddListingOpen, setIsAddListingOpen, createListing } = useKanso();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Private Room');
  const [region, setRegion] = useState('Bangalore');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('14500');
  const [guests, setGuests] = useState('1');
  const [tenantPreference, setTenantPreference] = useState('Any (Working Professional)');
  const [specs, setSpecs] = useState('Queen Bed · Attached Bath · Balcony · 220 sq.ft');
  const [coverImg, setCoverImg] = useState(
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
  );
  const [narrative, setNarrative] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([
    'Attached Bath',
    'High-Speed WiFi',
    'Air Conditioning',
    'Furnished',
    'Work Desk'
  ]);

  if (!isAddListingOpen) return null;

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !narrative.trim()) return;

    createListing({
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
      narrative: narrative.trim(),
      amenities: selectedAmenities
    });
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAddListingOpen(false)}>
      <div className="modal-box modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-tag">ROOM SUBMISSION // ZERO BROKERAGE</span>
            <h3 className="modal-title">Post a Room for Rent</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setIsAddListingOpen(false)}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body form-grid">
          <div className="form-group span-2">
            <label htmlFor="listingTitle">Room Title *</label>
            <input
              type="text"
              id="listingTitle"
              required
              placeholder="e.g. Sunlit Master Bedroom with Private Balcony"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Goa">Goa</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Pune">Pune</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="listingLocation">Neighborhood / Area *</label>
            <input
              type="text"
              id="listingLocation"
              required
              placeholder="e.g. Indiranagar 100ft Rd, Bangalore"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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

          <div className="form-group span-2">
            <label htmlFor="listingImage">Cover Image URL (Clean Bedroom Photo) *</label>
            <input
              type="url"
              id="listingImage"
              required
              placeholder="https://images.unsplash.com/..."
              value={coverImg}
              onChange={(e) => setCoverImg(e.target.value)}
            />
            <span className="field-hint">Defaults to a verified room photograph. You can paste any valid image URL.</span>
          </div>

          <div className="form-group span-2">
            <label htmlFor="listingDesc">Room Description & Flat Rules *</label>
            <textarea
              id="listingDesc"
              rows={3}
              required
              placeholder="Describe ventilation, sunlight, study desk, attached washroom, flatmates, and kitchen access..."
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
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
              onClick={() => setIsAddListingOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-architectural btn-primary">
              Post Room Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
