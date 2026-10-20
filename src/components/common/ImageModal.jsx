import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

/**
 * ImageModal Component
 *
 * Fullscreen mobile-friendly lightbox to view any photo in high detail.
 * Closes via 'X' button, backdrop tap, or Escape key.
 */
export const ImageModal = ({ photo, isOpen, onClose, fallbackMessage }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !photo) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs"
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
          className="absolute inset-0"
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
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-500 uppercase tracking-wider bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
              <Sparkles className="w-2.5 h-2.5 text-rose-400" />
              <span>{photo.tag || 'MEMORY'}</span>
              <span className="text-scrapbook-plum-muted/60 ml-1">#{photo.id}</span>
            </span>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white border border-pink-200 text-scrapbook-plum-muted hover:text-rose-500 hover:bg-pink-50 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              aria-label="Close photo view"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Large Image Frame */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-pink-100 bg-stone-50 shadow-inner mb-3">
            <ImageWithFallback
              src={photo.imagePath}
              alt={photo.title}
              slotId={photo.id}
              fallbackMessage={fallbackMessage}
              aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
            />
          </div>

          {/* Title & Caption */}
          <div className="w-full text-left space-y-1.5">
            <h2
              id="image-modal-title"
              className="font-handwriting text-2xl font-bold text-scrapbook-plum leading-snug"
            >
              {photo.caption || photo.title}
            </h2>

            <p className="text-xs text-scrapbook-plum-muted/80 font-medium pt-1">
              File path: <code className="bg-pink-50 text-rose-600 px-1.5 py-0.5 rounded text-[11px] font-mono">/public{photo.imagePath}</code>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
