import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

/**
 * ImageWithFallback Component
 *
 * Displays local photos gracefully.
 * - If image fails to load, intelligently attempts common filename variations
 *   (e.g., .jpeg <-> .jpg, photo-1 <-> photo-01) before showing fallback.
 * - When no image file exists, displays an aesthetic pastel placeholder
 *   with a heart icon and message ("Our memory goes here 💗").
 * - Identical aspect ratio prevents layout shifts.
 */
export const ImageWithFallback = ({
  src,
  alt = 'Bestie Memory',
  slotId,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  fallbackMessage = 'Our memory goes here 💗',
}) => {
  const [currentSrc, setCurrentSrc] = useState(src || '');
  const [hasError, setHasError] = useState(!src);
  const [isLoading, setIsLoading] = useState(Boolean(src));
  const [fallbackAttempt, setFallbackAttempt] = useState(0);

  // Sync state if src prop changes
  useEffect(() => {
    setCurrentSrc(src || '');
    setHasError(!src);
    setIsLoading(Boolean(src));
    setFallbackAttempt(0);
  }, [src]);

  const handleImageError = () => {
    // Attempt progressive smart fallbacks for common naming patterns
    if (currentSrc && fallbackAttempt < 3) {
      const nextAttempt = fallbackAttempt + 1;
      setFallbackAttempt(nextAttempt);

      // Attempt 1: Swap .jpg <-> .jpeg
      if (nextAttempt === 1) {
        if (currentSrc.endsWith('.jpg')) {
          const alt = currentSrc.replace(/\.jpg$/, '.jpeg');
          console.log(`[BESTIE.EXE] .jpg not found for ${slotId || 'photo'}, trying .jpeg: ${alt}`);
          setCurrentSrc(alt);
          return;
        } else if (currentSrc.endsWith('.jpeg')) {
          const alt = currentSrc.replace(/\.jpeg$/, '.jpg');
          console.log(`[BESTIE.EXE] .jpeg not found for ${slotId || 'photo'}, trying .jpg: ${alt}`);
          setCurrentSrc(alt);
          return;
        }
      }

      // Attempt 2: Swap photo-X <-> photo-0X (single vs double digit padding)
      if (nextAttempt === 2) {
        if (/photo-([1-9])\.(jpe?g|png|webp)$/i.test(currentSrc)) {
          const alt = currentSrc.replace(/photo-([1-9])\./, 'photo-0$1.');
          console.log(`[BESTIE.EXE] Trying padded filename: ${alt}`);
          setCurrentSrc(alt);
          return;
        } else if (/photo-0([1-9])\.(jpe?g|png|webp)$/i.test(currentSrc)) {
          const alt = currentSrc.replace(/photo-0([1-9])\./, 'photo-$1.');
          console.log(`[BESTIE.EXE] Trying unpadded filename: ${alt}`);
          setCurrentSrc(alt);
          return;
        }
      }
    }

    console.warn(`[BESTIE.EXE] Photo failed to load at ${currentSrc}. Showing placeholder.`);
    setHasError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    console.log(`[BESTIE.EXE] Scrapbook photo loaded successfully: ${currentSrc}`);
    setIsLoading(false);
    setHasError(false);
  };

  if (!currentSrc || hasError) {
    return (
      <div
        className={`w-full ${aspectRatio} bg-gradient-to-tr from-rose-100 via-pink-50 to-amber-50 flex flex-col items-center justify-center p-4 text-center border-2 border-dashed border-pink-200/90 rounded-xl relative overflow-hidden select-none ${className}`}
      >
        {/* Soft background decor */}
        <div className="absolute top-2 right-2 text-rose-300/40">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute bottom-2 left-2 text-rose-300/40">
          <Heart className="w-4 h-4 fill-rose-200/50" />
        </div>

        {/* Heart icon badge */}
        <div className="w-12 h-12 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-rose-500 mb-2 border border-rose-100">
          <Heart className="w-6 h-6 fill-rose-400 stroke-[1.8]" />
        </div>

        <span className="text-xs font-bold text-rose-600/95 tracking-wide font-sans block mb-1">
          {fallbackMessage}
        </span>

        {slotId && (
          <span className="text-[10px] font-semibold text-rose-400/90 bg-white/80 px-2.5 py-0.5 rounded-full border border-rose-100 font-mono">
            /images/{slotId}.jpg
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-xl bg-pink-50 ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-pink-50 animate-pulse flex items-center justify-center">
          <Heart className="w-6 h-6 text-rose-300 animate-bounce" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
