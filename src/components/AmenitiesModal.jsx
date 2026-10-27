import React, { useState, useEffect } from 'react';
import { useKanso } from '../context/KansoContext';
import { IconClose } from './Icons';

const ALL_PROVISIONS = [
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

  const getLabel = (item) => {
    switch (item) {
      case 'Attached Bath':
        return 'Attached Private Bathroom';
      case 'High-Speed WiFi':
        return 'High-Speed Fiber WiFi';
      case 'Air Conditioning':
        return 'Air Conditioning (AC)';
      case 'Furnished':
        return 'Fully Furnished (Bed & Wardrobe)';
      case 'Work Desk':
        return 'Dedicated Study / Work Desk';
      case 'Shared Kitchen':
        return 'Shared Kitchen / Self Cooking';
      case 'Power Backup':
        return '24x7 Power Backup (Inverter)';
      case 'Housekeeping':
        return 'Regular Room Housekeeping';
      case 'Food / Meal Option':
        return 'Home-Cooked Meals Option';
      case 'Pet Friendly':
        return 'Pet Friendly Flatshare';
      default:
        return item;
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAmenitiesModalOpen(false)}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-tag">FILTER BY ROOM FEATURES</span>
            <h3 className="modal-title">Room Amenities & Comforts</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setIsAmenitiesModalOpen(false)}
            aria-label="Close modal"
          >
            <IconClose size={18} />
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
                {getLabel(item)}
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
              Apply Amenities ({selected.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
