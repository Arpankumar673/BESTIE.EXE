import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

/**
 * Polaroid Component
 *
 * Renders a tactile scrapbook-style photo card with:
 * - Realistic white polaroid frame
 * - Washi tape strip
 * - Sticker accent
 * - Handwriting-style title and caption
 * - Click-to-enlarge modal trigger
 */
export const Polaroid = ({
  photo,
  onSelect,
  className = '',
  featured = false,
  fallbackMessage,
}) => {
  const rotationClass = photo.rotation || 'rotate-0';

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect && onSelect(photo)}
      className={`
        relative group cursor-pointer bg-white rounded-2xl p-3 sm:p-4
        border border-pink-100/90 shadow-polaroid hover:shadow-polaroid-hover
        transition-all duration-300 flex flex-col justify-between
        ${rotationClass} ${className}
      `}
      aria-label={`View photo: ${photo.title}`}
    >
      {/* Top Washi Tape Sticker */}
      <div
        className={`
          absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5
          ${photo.tapeColor || 'washi-tape'}
          rounded-xs opacity-90 rotate-[-1deg] pointer-events-none z-10
        `}
        aria-hidden="true"
      />

      {/* Top Tag & Sticker */}
      <div className="w-full flex items-center justify-between mb-2 px-0.5">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-500 uppercase tracking-wider bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
          <Sparkles className="w-2.5 h-2.5 text-rose-400" />
          <span>{photo.tag || 'MEMORY'}</span>
        </span>
        {photo.sticker && (
          <span className="text-base select-none" aria-hidden="true">
            {photo.sticker}
          </span>
        )}
      </div>

      {/* Polaroid Image Area */}
      <div className="relative w-full rounded-xl overflow-hidden border border-pink-100/70 shadow-inner mb-3">
        <ImageWithFallback
          src={photo.imagePath}
          alt={photo.title}
          slotId={photo.id}
          fallbackMessage={fallbackMessage}
          aspectRatio={featured ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/3]'}
        />

        {/* Hover zoom indicator overlay */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-scrapbook-plum text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
            Tap to view 🔍
          </span>
        </div>
      </div>

      {/* Polaroid Handwritten Caption Area */}
      <div className="w-full text-left pt-1">
        <h3 className="font-handwriting text-xl sm:text-2xl font-bold text-scrapbook-plum leading-snug group-hover:text-scrapbook-rose transition-colors">
          {photo.caption || photo.title}
        </h3>

        <div className="mt-2 pt-1 border-t border-pink-50 flex items-center justify-between text-[10px] font-semibold text-rose-400">
          <span className="font-mono text-[9px] text-rose-300">
            #{photo.id}
          </span>
          <span className="text-rose-400 font-bold">
            💗 Tap to zoom
          </span>
        </div>
      </div>
    </motion.div>
  );
};
