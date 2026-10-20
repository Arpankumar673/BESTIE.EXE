import React, { useState } from 'react';
import { Heart, Sparkles, Image as ImageIcon } from 'lucide-react';

/**
 * ImageWithFallback Component
 *
 * Displays local photos gracefully. If the image file doesn't exist yet
 * or fails to load, renders an aesthetic pink-and-cream scrapbook placeholder
 * with a heart icon and message: "Our memory goes here 💗".
 */
export const ImageWithFallback = ({
  src,
  alt = 'Bestie Memory',
  slotId,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  fallbackMessage = 'Our memory goes here 💗',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
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
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
