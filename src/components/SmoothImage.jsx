import React, { useState, useRef, useEffect } from 'react';

/**
 * SmoothImage — Progressive Blur-Up Architectural Image Component
 * Renders an animated warm travertine shimmer skeleton while loading,
 * then smoothly fades and de-blurs into view with hardware acceleration.
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Check if image is already cached / completed on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

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
        src={src}
        alt={alt}
        className={`smooth-img ${isLoaded ? 'img-loaded' : 'img-loading'} ${className}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        draggable={draggable}
        {...props}
      />
    </div>
  );
}
