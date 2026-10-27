import React, { useState, useEffect } from 'react';
import { useKanso } from '../context/KansoContext';
import { IconClose } from './Icons';

export default function AddReviewModal() {
  const { addReviewTarget, setAddReviewTarget, addReview, currentUser } = useKanso();
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('5');
  const [text, setText] = useState('');

  useEffect(() => {
    if (currentUser) {
      setAuthor(currentUser.name || '');
    } else {
      setAuthor('');
    }
  }, [currentUser, addReviewTarget]);

  if (!addReviewTarget) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim() || !addReviewTarget.propertyId) return;

    addReview(addReviewTarget.propertyId, {
      author: author.trim(),
      rating,
      text: text.trim()
    });
  };

  return (
    <div className="modal-backdrop" onClick={() => setAddReviewTarget(null)}>
      <div className="modal-box modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-tag">TENANT REVIEW</span>
            <h3 className="modal-title">Share Your Room Experience</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setAddReviewTarget(null)}
            aria-label="Close modal"
          >
            <IconClose size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body form-grid">
          <div className="form-group span-2">
            <label htmlFor="reviewAuthor">Your Name *</label>
            <input
              type="text"
              id="reviewAuthor"
              required
              placeholder="e.g. Maya Patel"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="form-group span-2">
            <label htmlFor="reviewRating">Overall Score</label>
            <select
              id="reviewRating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="5">5.0 / 5.0 — Outstanding Room & Quiet Living</option>
              <option value="4.8">4.8 / 5.0 — Peaceful & Clean Room</option>
              <option value="4.5">4.5 / 5.0 — Very Good Stay & Fast WiFi</option>
              <option value="4.0">4.0 / 5.0 — Good Room</option>
            </select>
          </div>

          <div className="form-group span-2">
            <label htmlFor="reviewText">Your Review & Notes *</label>
            <textarea
              id="reviewText"
              rows={3}
              required
              placeholder="Describe room cleanliness, ventilation, WiFi stability, noise levels, and owner/flatmate friendliness..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          <div className="modal-footer span-2">
            <button
              type="button"
              className="btn-text"
              onClick={() => setAddReviewTarget(null)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-architectural btn-primary">
              Submit Room Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
