import React, { useState, useRef, useEffect } from 'react';

const FALLBACK_ROOM_IMAGE = 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80';

/**
 * SmoothImage — Progressive Blur-Up Architectural Image Component
 * Renders an animated warm travertine shimmer skeleton while loading,
 * then smoothly fades and de-blurs into view with hardware acceleration.
 * Includes automated fallback recovery to prevent broken image icons.
 */
export default function SmoothImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  aspectRatio,
  onClick,
  draggable = false,
  ...props
}) {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_ROOM_IMAGE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setCurrentSrc(src || FALLBACK_ROOM_IMAGE);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Check if image is already cached / completed on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleError = () => {
    if (currentSrc !== FALLBACK_ROOM_IMAGE) {
      setCurrentSrc(FALLBACK_ROOM_IMAGE);
      setHasError(false);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  return (
    <div
      className={`smooth-img-wrap ${isLoaded ? 'is-loaded' : 'is-loading'} ${wrapperClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      onClick={onClick}
    >
      {/* Shimmer Placeholder Skeleton */}
      {!isLoaded && !hasError && (
        <div className="img-shimmer-skeleton" aria-hidden="true" />
      )}

      {/* Main Image with Progressive Blur-Up Transition */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`smooth-img ${isLoaded ? 'img-loaded' : 'img-loading'} ${className}`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        draggable={draggable}
        {...props}
      />
    </div>
  );
}
