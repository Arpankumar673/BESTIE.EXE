import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

/**
 * PolaroidCard Component
 *
 * Renders an individual prominent Polaroid card for the intro screen:
 * - Dimensions: approx 115–130px width, 130–145px height
 * - Clean white Polaroid border with authentic taller bottom chin
 * - Realistic soft drop shadow
 * - Full-size softly colored placeholder when image is missing with "Our little memory 💗"
 * - Displays loaded image with object-fit: cover when available
 * - Gracefully tries alternate extensions (.jpeg / .jpg) before falling back to placeholder
 */
const PolaroidCard = ({ photo, className = '', index = 0 }) => {
  const [currentSrc, setCurrentSrc] = useState(photo.imagePath || '');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [triedAltExtension, setTriedAltExtension] = useState(false);

  // Sync if photo.imagePath prop changes
  useEffect(() => {
    setCurrentSrc(photo.imagePath || '');
    setHasError(!photo.imagePath);
    setIsLoading(Boolean(photo.imagePath));
    setTriedAltExtension(false);
  }, [photo.imagePath]);

  const handleImageError = () => {
    // If not tried yet, attempt swapping between .jpg and .jpeg
    if (!triedAltExtension && currentSrc) {
      setTriedAltExtension(true);
      if (currentSrc.endsWith('.jpg')) {
        const alt = currentSrc.replace(/\.jpg$/, '.jpeg');
        console.log(`[BESTIE.EXE] .jpg not found for photo ${index + 1}, trying .jpeg: ${alt}`);
        setCurrentSrc(alt);
        return;
      } else if (currentSrc.endsWith('.jpeg')) {
        const alt = currentSrc.replace(/\.jpeg$/, '.jpg');
        console.log(`[BESTIE.EXE] .jpeg not found for photo ${index + 1}, trying .jpg: ${alt}`);
        setCurrentSrc(alt);
        return;
      }
    }

    console.warn(`[BESTIE.EXE] Photo ${index + 1} could not be loaded at ${currentSrc}. Showing placeholder.`);
    setHasError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    console.log(`[BESTIE.EXE] Photo ${index + 1} loaded successfully: ${currentSrc}`);
    setIsLoading(false);
    setHasError(false);
  };

  return (
    <div
      className={`
        relative bg-white rounded-xl sm:rounded-2xl
        p-2 sm:p-2.5 pb-4 sm:pb-5
        border border-pink-100/90 select-none
        shadow-[0_10px_24px_-4px_rgba(45,27,45,0.14),0_4px_10px_-2px_rgba(255,77,128,0.08)]
        transition-all duration-300 hover:scale-105 hover:z-30
        w-[115px] sm:w-[126px] md:w-[130px] shrink-0
        ${photo.rotation || (index === 0 ? '-rotate-[8deg]' : 'rotate-[7deg]')}
        ${className}
      `}
      aria-label={photo.alt || `Intro photo ${index + 1}`}
    >
      {/* Top washi tape decoration */}
      <div
        className={`
          absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-4
          ${photo.tapeColor || (index === 0 ? 'washi-tape' : 'washi-tape-yellow')}
          rounded-xs opacity-90 ${index === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'}
          pointer-events-none z-30
        `}
        aria-hidden="true"
      />

      {/* Small decorative corner sticker */}
      {photo.sticker && (
        <span
          className="absolute -bottom-1 -right-1 text-sm select-none drop-shadow-2xs z-30"
          aria-hidden="true"
        >
          {photo.sticker}
        </span>
      )}

      {/* Main Photo Area Container (identical dimensions for loaded and placeholder) */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-tr from-rose-100/80 via-pink-50 to-amber-50 border border-pink-100/70 shadow-inner">
        {(!currentSrc || hasError) ? (
          /* Prominent, readable pastel placeholder */
          <div
            className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none"
            title="Add your photo to /public/images/"
          >
            {/* Cute heart circle icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 shadow-2xs flex items-center justify-center text-rose-500 mb-1 border border-pink-100">
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-rose-300 stroke-[1.8] animate-pulse-gentle" />
            </div>

            {/* Clear, readable placeholder text */}
            <span className="font-handwriting text-xs sm:text-[13px] font-bold text-rose-600/90 leading-tight">
              Our little memory 💗
            </span>
          </div>
        ) : (
          /* Real Image Display */
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-pink-50 animate-pulse flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-300 animate-bounce" />
              </div>
            )}
            <img
              src={currentSrc}
              alt={photo.alt || 'Our friendship memory'}
              loading="eager"
              decoding="async"
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </>
        )}
      </div>

      {/* Authentic Polaroid Chin Accent */}
      <div className="w-full pt-1.5 flex items-center justify-center">
        <Heart className="w-2.5 h-2.5 fill-rose-300/70 text-rose-400" />
      </div>
    </div>
  );
};

/**
 * IntroTopPhotos Component
 *
 * Prominent, beautifully balanced duo of tilted Polaroid photographs
 * positioned between the heading and introductory text on Screen 1.
 */
export const IntroTopPhotos = ({ photos = [] }) => {
  if (!photos || photos.length === 0) return null;

  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="my-2 sm:my-3 flex items-center justify-center select-none"
      aria-label="Opening memories preview"
    >
      <div className="relative inline-flex items-center justify-center py-2 px-1">
        {/* Left Photo (approx -8 deg) */}
        {photos[0] && (
          <PolaroidCard
            photo={photos[0]}
            index={0}
            className="-mr-5 sm:-mr-6 z-10"
          />
        )}

        {/* Right Photo (approx +7 deg) */}
        {photos[1] && (
          <PolaroidCard
            photo={photos[1]}
            index={1}
            className="z-20"
          />
        )}
      </div>
    </motion.div>
  );
};
