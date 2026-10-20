import React, { useState } from 'react';
import { useKanso } from '../context/KansoContext';

const AMENITY_OPTIONS = [
  'Plunge Pool',
  'High-Speed WiFi',
  'Private Chef',
  'Mountain Panorama',
  'Yoga Deck',
  'Pet Friendly',
  'Air Conditioning',
  'Dedicated Workspace'
];

export default function AddListingModal() {
  const { isAddListingOpen, setIsAddListingOpen, createListing } = useKanso();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Villa');
  const [region, setRegion] = useState('Goa');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('18000');
  const [guests, setGuests] = useState('4');
  const [specs, setSpecs] = useState('2 Suites · 2 Baths · Garden Courtyard');
  const [coverImg, setCoverImg] = useState(
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  );
  const [narrative, setNarrative] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([
    'Plunge Pool',
    'High-Speed WiFi',
    'Private Chef',
    'Air Conditioning'
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
      price: Number(price) || 15000,
      guests: Number(guests) || 4,
      specs: `${guests} Guests · ${specs}`,
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
            <span className="modal-tag">HOST SUBMISSION</span>
            <h3 className="modal-title">Publish an Architectural Sanctuary</h3>
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
            <label htmlFor="listingTitle">Sanctuary Name *</label>
            <input
              type="text"
              id="listingTitle"
              required
              placeholder="e.g. The Courtyard Villa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="listingType">Property Type *</label>
            <select
              id="listingType"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Villa">Stone & Coastal Villa</option>
              <option value="Chalet">Mountain & Cedar Chalet</option>
              <option value="Haveli">Heritage Haveli</option>
              <option value="Bungalow">Plantation Bungalow</option>
              <option value="Loft">Atelier & Urban Loft</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="listingState">State / Region *</label>
            <select
              id="listingState"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="Goa">Goa</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Maharashtra">Maharashtra (Alibaug)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="listingLocation">Specific City / Town *</label>
            <input
              type="text"
              id="listingLocation"
              required
              placeholder="e.g. Morjim, North Goa"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="listingPrice">Price per Night (₹ INR) *</label>
            <input
              type="number"
              id="listingPrice"
              required
              min="1000"
              step="500"
              placeholder="15000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="listingGuests">Max Guests</label>
            <input
              type="number"
              id="listingGuests"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="listingBedrooms">Bedrooms & Bathrooms</label>
            <input
              type="text"
              id="listingBedrooms"
              placeholder="2 Beds · 2 Baths"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
            />
          </div>

          <div className="form-group span-2">
            <label htmlFor="listingImage">Cover Image URL (High-Res Architectural Photo) *</label>
            <input
              type="url"
              id="listingImage"
              required
              placeholder="https://images.unsplash.com/..."
              value={coverImg}
              onChange={(e) => setCoverImg(e.target.value)}
            />
            <span className="field-hint">Defaults to a verified architectural photograph. You can paste any valid image URL.</span>
          </div>

          <div className="form-group span-2">
            <label htmlFor="listingDesc">Sanctuary Narrative / Description *</label>
            <textarea
              id="listingDesc"
              rows={3}
              required
              placeholder="Describe the materials, architectural flow, light, and natural surroundings..."
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group span-2">
            <label>Sanctuary Amenities</label>
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
              Publish to Marketplace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
