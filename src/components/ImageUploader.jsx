import React, { useState, useRef } from 'react';
import { optimizeMultipleImages, formatBytes } from '../utils/imageOptimizer';
import { IconUpload, IconImage, IconTrash, IconCamera, IconSparkles, IconCheck } from './Icons';

// Curated verified room presets for instant 1-click selection
const CURATED_ROOM_PRESETS = [
  {
    id: 'preset-1',
    title: 'Modern Minimalist with Desk',
    type: 'Study & Work',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-2',
    title: 'Sunlit Bedroom & Balcony',
    type: 'Balcony View',
    url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-3',
    title: 'Executive Master Suite',
    type: 'Attached Bath',
    url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-4',
    title: 'Urban Studio Room (1RK)',
    type: 'Compact & Clean',
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-5',
    title: 'Co-Living Private Bedroom',
    type: 'High-Speed WiFi',
    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'preset-6',
    title: 'Peaceful Heritage Haven',
    type: 'Quiet & Green',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function ImageUploader({
  coverImg = '',
  gallery = [],
  onChange,
  required = true,
  label = 'Room Photographs'
}) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'presets' | 'url'
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const [lastUploadedMeta, setLastUploadedMeta] = useState(null);

  const fileInputRef = useRef(null);

  // Construct current combined list of images
  const allImages = [
    ...(coverImg ? [coverImg] : []),
    ...(Array.isArray(gallery) ? gallery.filter((img) => img && img !== coverImg) : [])
  ];

  // Helper to notify parent of changes
  const updateImages = (newCover, newGalleryList) => {
    if (typeof onChange === 'function') {
      onChange({
        coverImg: newCover || '',
        gallery: newGalleryList || []
      });
    }
  };

  // Handle uploaded files (from file input or drag-and-drop)
  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) return;

    setIsProcessing(true);
    setProcessingStatus(`Optimizing ${files.length} room ${files.length === 1 ? 'photo' : 'photos'}...`);

    try {
      const optimizedResults = await optimizeMultipleImages(files, {
        maxWidth: 1600,
        maxHeight: 1200,
        quality: 0.84
      });

      if (optimizedResults.length > 0) {
        const newUrls = optimizedResults.map((r) => r.dataUrl);
        const firstOptimized = optimizedResults[0];

        setLastUploadedMeta({
          count: optimizedResults.length,
          originalTotal: optimizedResults.reduce((acc, r) => acc + r.originalSize, 0),
          compressedTotal: optimizedResults.reduce((acc, r) => acc + r.compressedSize, 0),
          savingsPercent: firstOptimized.savingsPercent
        });

        if (!coverImg) {
          // If no cover yet, set first as cover and rest as gallery
          const [newCover, ...rest] = newUrls;
          updateImages(newCover, newUrls);
        } else {
          // Append to existing images
          const updatedGallery = [...allImages, ...newUrls];
          updateImages(coverImg, updatedGallery);
        }
      }
    } catch (err) {
      console.error('Image optimization failed:', err);
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Remove a photo
  const handleRemoveImage = (imgToRemove) => {
    const remaining = allImages.filter((img) => img !== imgToRemove);
    if (imgToRemove === coverImg) {
      // If removed the cover, promote the next image or clear
      const newCover = remaining.length > 0 ? remaining[0] : '';
      updateImages(newCover, remaining);
    } else {
      updateImages(coverImg, remaining);
    }
  };

  // Set an existing photo as the primary cover photo
  const handleSetAsCover = (imgToPromote) => {
    const otherImages = allImages.filter((img) => img !== imgToPromote);
    updateImages(imgToPromote, [imgToPromote, ...otherImages]);
  };

  // Preset selection
  const handleSelectPreset = (presetUrl) => {
    if (!coverImg) {
      updateImages(presetUrl, [presetUrl]);
    } else {
      // Append if not already in list
      if (!allImages.includes(presetUrl)) {
        updateImages(coverImg, [...allImages, presetUrl]);
      } else {
        handleSetAsCover(presetUrl);
      }
    }
  };

  // Manual URL Add
  const handleAddManualUrl = (e) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;
    const trimmed = manualUrl.trim();

    if (!coverImg) {
      updateImages(trimmed, [trimmed]);
    } else {
      updateImages(coverImg, [...allImages, trimmed]);
    }
    setManualUrl('');
  };

  return (
    <div className="img-uploader-wrapper">
      {/* Header and Source Selector Tabs */}
      <div className="img-uploader-header">
        <div>
          <label className="img-uploader-label">
            {label} {required && <span className="req-star">*</span>}
          </label>
          <span className="img-uploader-sub">
            Upload clear, well-lit photos of the bedroom, bathroom, study desk, or balcony.
          </span>
        </div>

        <div className="img-source-tabs" role="tablist">
          <button
            type="button"
            className={`source-tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <IconUpload size={14} />
            <span>Upload Device Photos</span>
          </button>
          <button
            type="button"
            className={`source-tab-btn ${activeTab === 'presets' ? 'active' : ''}`}
            onClick={() => setActiveTab('presets')}
          >
            <IconSparkles size={14} />
            <span>Sample Presets</span>
          </button>
          <button
            type="button"
            className={`source-tab-btn ${activeTab === 'url' ? 'active' : ''}`}
            onClick={() => setActiveTab('url')}
          >
            <IconImage size={14} />
            <span>Paste URL</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Direct File Upload & Drag-and-Drop */}
      {activeTab === 'upload' && (
        <div className="img-upload-panel">
          <div
            className={`img-dropzone ${isDragging ? 'drag-active' : ''} ${isProcessing ? 'is-busy' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/avif"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => handleFiles(e.target.files)}
            />

            <div className="dropzone-inner">
              <div className="dropzone-icon-bubble">
                {isProcessing ? (
                  <div className="upload-spinner" />
                ) : (
                  <IconUpload size={28} className="upload-svg" />
                )}
              </div>

              {isProcessing ? (
                <div className="dropzone-texts">
                  <strong className="dropzone-title">{processingStatus}</strong>
                  <span className="dropzone-hint">Compressing and scaling for ultra-fast loading</span>
                </div>
              ) : (
                <div className="dropzone-texts">
                  <strong className="dropzone-title">
                    {isDragging ? 'Release to upload your photos' : 'Click to browse or drop room photos here'}
                  </strong>
                  <span className="dropzone-hint">
                    Select one or multiple photos (JPG, PNG, WEBP) · Auto-optimized for web
                  </span>
                </div>
              )}

              <button
                type="button"
                className="btn-architectural btn-secondary btn-sm dropzone-browse-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <IconCamera size={14} style={{ marginRight: '6px' }} />
                Browse Device Photos
              </button>
            </div>
          </div>

          {/* Upload Optimization Status Banner */}
          {lastUploadedMeta && (
            <div className="upload-optimization-pill">
              <IconCheck size={14} className="opt-check-icon" />
              <span>
                Optimized {lastUploadedMeta.count} photo(s): {formatBytes(lastUploadedMeta.originalTotal)} → {formatBytes(lastUploadedMeta.compressedTotal)} ({lastUploadedMeta.savingsPercent}% saved).
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Curated Presets */}
      {activeTab === 'presets' && (
        <div className="img-presets-panel">
          <p className="presets-instruction">
            Choose from verified high-standard room photography presets to preview or use immediately:
          </p>
          <div className="presets-grid">
            {CURATED_ROOM_PRESETS.map((preset) => {
              const isSelectedCover = coverImg === preset.url;
              const isIncluded = allImages.includes(preset.url);

              return (
                <div
                  key={preset.id}
                  className={`preset-card ${isSelectedCover ? 'is-cover' : isIncluded ? 'is-included' : ''}`}
                  onClick={() => handleSelectPreset(preset.url)}
                >
                  <div className="preset-thumb-wrap">
                    <img src={preset.url} alt={preset.title} loading="lazy" />
                    {isSelectedCover && <span className="preset-cover-badge">★ Active Cover</span>}
                  </div>
                  <div className="preset-info">
                    <strong>{preset.title}</strong>
                    <span>{preset.type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Web Image URL */}
      {activeTab === 'url' && (
        <div className="img-url-panel">
          <div className="url-input-row">
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              className="url-text-field"
            />
            <button
              type="button"
              className="btn-architectural btn-primary btn-sm"
              onClick={handleAddManualUrl}
              disabled={!manualUrl.trim()}
            >
              + Add URL Photo
            </button>
          </div>
          <span className="field-hint">
            You can paste any direct web image link from Unsplash, Imgur, or cloud storage.
          </span>
        </div>
      )}

      {/* PHOTO PREVIEWS & GALLERY MANAGER */}
      {allImages.length > 0 ? (
        <div className="photos-manager-container">
          <div className="manager-title-bar">
            <span className="photos-count-badge">
              {allImages.length} {allImages.length === 1 ? 'Photo Attached' : 'Photos Attached'}
            </span>
            <span className="manager-cover-note">
              First photo is your <strong>Primary Cover Photo</strong>. Tenants see this first in search results.
            </span>
          </div>

          <div className="photos-manager-grid">
            {allImages.map((imgSrc, index) => {
              const isCover = imgSrc === coverImg;

              return (
                <div key={`${imgSrc.slice(0, 32)}-${index}`} className={`photo-item-card ${isCover ? 'is-cover' : ''}`}>
                  <div className="photo-thumb-container">
                    <img src={imgSrc} alt={`Room photograph ${index + 1}`} />

                    {isCover ? (
                      <span className="photo-cover-tag">★ Cover Photo</span>
                    ) : (
                      <button
                        type="button"
                        className="photo-action-btn set-cover-btn"
                        onClick={() => handleSetAsCover(imgSrc)}
                        title="Set as primary cover photo"
                      >
                        Set as Cover
                      </button>
                    )}

                    <button
                      type="button"
                      className="photo-action-btn remove-photo-btn"
                      onClick={() => handleRemoveImage(imgSrc)}
                      aria-label="Remove image"
                      title="Remove image"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>

                  <div className="photo-item-meta">
                    <span className="photo-slot-name">
                      {isCover ? 'Main Cover' : `Gallery #${index + 1}`}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Quick Add More Tile */}
            <div
              className="photo-add-more-tile"
              onClick={() => {
                setActiveTab('upload');
                fileInputRef.current?.click();
              }}
            >
              <div className="add-more-icon-wrap">
                <IconCamera size={20} />
              </div>
              <span>+ Add More Photos</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="photos-empty-notice">
          <IconImage size={24} className="empty-icon" />
          <span>No room photos uploaded yet. Upload a photo or pick a sample preset above.</span>
        </div>
      )}
    </div>
  );
}
