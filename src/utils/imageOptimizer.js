/**
 * Image Optimizer Utility for Rental House Finder
 * 
 * Provides client-side, zero-dependency image compression and resizing using
 * the browser's native HTML5 Canvas API.
 * 
 * This ensures that uploaded photos (which can be 5-20MB from modern phone cameras)
 * are instantly scaled down to sharp, high-resolution web standards (max 1600x1200, ~100-250KB),
 * preventing browser memory bloat and localStorage QuotaExceededError.
 */

export async function optimizeImageFile(file, options = {}) {
  const {
    maxWidth = 1600,
    maxHeight = 1200,
    quality = 0.84,
    outputType = 'image/jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    if (!file.type || !file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image (JPEG, PNG, WEBP, etc.).'));
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read image file from disk.'));
    };

    reader.onload = (event) => {
      const rawDataUrl = event.target.result;
      const img = new Image();

      img.onerror = () => {
        reject(new Error('Failed to process image format in browser.'));
      };

      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Maintain aspect ratio while bounding within maxWidth & maxHeight
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback if canvas context is unavailable
          resolve({
            dataUrl: rawDataUrl,
            fileName: file.name,
            originalSize: file.size,
            compressedSize: file.size,
            savingsPercent: 0,
            width,
            height
          });
          return;
        }

        // Apply smooth interpolation
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw solid background for transparent PNGs converted to JPEG
        if (outputType === 'image/jpeg') {
          ctx.fillStyle = '#FAFAF8';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL(outputType, quality);

        // Calculate approximate size in bytes from base64 string
        const base64Content = compressedDataUrl.split(',')[1] || '';
        const compressedBytes = Math.round((base64Content.length * 3) / 4);

        const savingsPercent = file.size > compressedBytes
          ? Math.round(((file.size - compressedBytes) / file.size) * 100)
          : 0;

        resolve({
          dataUrl: compressedDataUrl,
          fileName: file.name,
          originalSize: file.size,
          compressedSize: compressedBytes,
          savingsPercent,
          width,
          height
        });
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Optimizes an array of File objects sequentially or in parallel
 */
export async function optimizeMultipleImages(files, options = {}) {
  const fileList = Array.from(files || []);
  const results = [];

  for (const file of fileList) {
    try {
      const optimized = await optimizeImageFile(file, options);
      results.push(optimized);
    } catch (err) {
      console.warn(`[ImageOptimizer] Skipped ${file.name}:`, err.message);
    }
  }

  return results;
}

/**
 * Formats byte counts into human-readable strings (e.g. 1.2 MB or 145 KB)
 */
export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
