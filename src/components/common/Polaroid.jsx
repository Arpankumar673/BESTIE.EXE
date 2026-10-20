import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

/**
 * Polaroid Component — Mobile-First 2-Column Edition
 *
 * Renders an authentic scrapbook-style Polaroid card:
 * - Clean white polaroid frame with pastel border & shadow
 * - Top washi tape accent with rotating color themes
 * - Pastel tag & cute sticker badge
 * - Full-bleed photographic viewport with object-fit: cover
 * - Handwriting-style caption that wraps naturally
 * - Touch-to-zoom indicator and card tap trigger
 */
export const Polaroid = ({
  photo,
  onSelect,
  className = '',
}) => {
  const rotationClass = photo.rotation || 'rotate-0';

  return (
    <motion.div
      whileHover={{ scale: 1.025, rotate: 0 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect && onSelect(photo)}
      className={`
        relative group cursor-pointer bg-white rounded-2xl p-2 sm:p-3
        border border-pink-100/90 shadow-polaroid hover:shadow-polaroid-hover
        transition-all duration-300 flex flex-col justify-between select-none
        ${rotationClass} ${className}
      `}
      aria-label={`View photo: ${photo.caption || photo.title || photo.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect && onSelect(photo);
        }
      }}
    >
      {/* Top Washi Tape Sticker */}
      <div
        className={`
          absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-4
          ${photo.tapeColor || 'washi-tape'}
          rounded-xs opacity-90 rotate-[-1deg] pointer-events-none z-10
        `}
        aria-hidden="true"
      />

      {/* Top Tag & Sticker */}
      <div className="w-full flex items-center justify-between mb-1.5 px-0.5">
        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-rose-500 uppercase tracking-wider bg-pink-50/90 px-1.5 py-0.5 rounded-full border border-pink-100/90 truncate max-w-[75%]">
          <Sparkles className="w-2.5 h-2.5 text-rose-400 shrink-0" />
          <span className="truncate">{photo.tag || `MOMENT #${photo.id}`}</span>
        </span>
        {photo.sticker && (
          <span className="text-xs sm:text-sm select-none shrink-0" aria-hidden="true">
            {photo.sticker}
          </span>
        )}
      </div>

      {/* Polaroid Image Area */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-pink-100/80 shadow-inner bg-pink-50/50 mb-1.5">
        <img
          src={photo.resolvedUrl || photo.imagePath}
          alt={photo.caption || photo.title || `Memory ${photo.id}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover zoom overlay */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-scrapbook-plum text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            🔍 Zoom
          </span>
        </div>
      </div>

      {/* Handwritten Caption Area */}
      <div className="w-full text-left pt-1 flex flex-col justify-between flex-1">
        <h3 className="font-handwriting text-base sm:text-lg font-bold text-scrapbook-plum leading-snug line-clamp-2 group-hover:text-scrapbook-rose transition-colors">
          {photo.caption || photo.title}
        </h3>

        <div className="mt-1.5 pt-1 border-t border-pink-50 flex items-center justify-between text-[9px] sm:text-[10px] font-semibold text-rose-400">
          <span className="font-mono text-[9px] text-rose-300">
            #{String(photo.id).padStart(2, '0')}
          </span>
          <span className="text-rose-400 font-bold flex items-center gap-0.5">
            <Heart className="w-2.5 h-2.5 fill-rose-300 text-rose-400 inline shrink-0" />
            <span>Tap to zoom</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
