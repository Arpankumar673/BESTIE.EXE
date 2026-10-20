import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';

/**
 * ImageModal Component
 *
 * Fullscreen mobile-friendly lightbox to view any scrapbook photo in high detail.
 * - Prevents background page scrolling while modal is open
 * - Restores background scrolling when modal closes
 * - Closes via 'X' button, backdrop tap, or Escape key
 */
export const ImageModal = ({ photo, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    // Lock body scroll while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !photo) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-modal-title"
      >
        {/* Backdrop click to dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Polaroid Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl p-4 sm:p-6 border-2 border-pink-100 shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-y-auto"
        >
          {/* Top Washi Tape */}
          <div
            className={`
              absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6
              ${photo.tapeColor || 'washi-tape'}
              rounded-xs opacity-90 rotate-[-1deg] pointer-events-none z-20
            `}
            aria-hidden="true"
          />

          {/* Modal Header */}
          <div className="w-full flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-rose-500 uppercase tracking-wider bg-pink-50 px-3 py-1 rounded-full border border-pink-100 shadow-2xs">
              <Sparkles className="w-3 h-3 text-rose-400" />
              <span>{photo.tag || 'MEMORY'}</span>
              <span className="text-scrapbook-plum-muted/70 font-mono ml-1">
                #{String(photo.id).padStart(2, '0')}
              </span>
            </span>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white border border-pink-200 text-scrapbook-plum-muted hover:text-rose-500 hover:bg-pink-50 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Image Frame */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-pink-100/90 bg-stone-50 shadow-inner mb-3">
            <img
              src={photo.resolvedUrl || photo.imagePath}
              alt={photo.caption || photo.title || 'Scrapbook Memory'}
              className="w-full max-h-[60vh] object-contain rounded-xl mx-auto"
            />
          </div>

          {/* Caption */}
          <div className="w-full text-left space-y-1">
            <h2
              id="image-modal-title"
              className="font-handwriting text-2xl sm:text-3xl font-bold text-scrapbook-plum leading-snug"
            >
              {photo.caption || photo.title}
            </h2>

            <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold pt-1">
              <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-400 inline" />
              <span>A moment worth keeping forever 💗</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
