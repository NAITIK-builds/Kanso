import React, { useState, useEffect } from 'react';
import { useKanso } from '../context/KansoContext';

const ALL_PROVISIONS = [
  'Plunge Pool',
  'High-Speed WiFi',
  'Private Chef',
  'Mountain Panorama',
  'Yoga Deck',
  'Pet Friendly',
  'Dedicated Workspace',
  'Air Conditioning'
];

export default function AmenitiesModal() {
  const { isAmenitiesModalOpen, setIsAmenitiesModalOpen, activeFilter, setActiveFilter } = useKanso();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isAmenitiesModalOpen) {
      setSelected(activeFilter.amenities || []);
    }
  }, [isAmenitiesModalOpen, activeFilter.amenities]);

  if (!isAmenitiesModalOpen) return null;

  const handleToggle = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleClear = () => {
    setSelected([]);
    setActiveFilter((prev) => ({ ...prev, amenities: [] }));
    setIsAmenitiesModalOpen(false);
  };

  const handleApply = () => {
    setActiveFilter((prev) => ({ ...prev, amenities: selected }));
    setIsAmenitiesModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAmenitiesModalOpen(false)}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-tag">FILTER BY FEATURE</span>
            <h3 className="modal-title">Sanctuary Provisions</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setIsAmenitiesModalOpen(false)}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="amenities-checkbox-grid filter-provisions-grid">
            {ALL_PROVISIONS.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  className="amenity-filter-check"
                  checked={selected.includes(item)}
                  onChange={() => handleToggle(item)}
                />{' '}
                {item === 'Plunge Pool'
                  ? 'Private Plunge Pool'
                  : item === 'Private Chef'
                  ? 'Private Chef on Call'
                  : item === 'Yoga Deck'
                  ? 'Yoga & Meditation Deck'
                  : item}
              </label>
            ))}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-text" onClick={handleClear}>
              Clear
            </button>
            <button
              type="button"
              className="btn-architectural btn-primary"
              onClick={handleApply}
            >
              Apply Provisions ({selected.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
