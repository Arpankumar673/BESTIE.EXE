import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Polaroid } from '../components/common/Polaroid';
import { ImageModal } from '../components/common/ImageModal';
import { CONTENT } from '../data/content';

/**
 * Screen 4: Our Photo Scrapbook 📸
 *
 * Displays 6 Polaroid photo slots with:
 * - Graceful fallback "Our memory goes here 💗"
 * - Touch-to-zoom modal
 * - Decorative washi tape & stickers
 * - Responsive 1-col on mobile, 2-col on larger screens
 */
export const ScrapbookScreen = ({ onNext, onBack }) => {
  const { scrapbook } = CONTENT;
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="w-full max-w-md mx-auto px-3 py-6 flex flex-col items-center">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-rose-600 font-extrabold text-[10px] tracking-wider uppercase mb-2.5 border border-pink-200">
          <Sparkles className="w-3 h-3 text-rose-500 fill-rose-400" />
          <span>{scrapbook.badge}</span>
        </div>

        <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-scrapbook-plum tracking-tight leading-tight">
          {scrapbook.heading}
        </h2>

        <p className="text-xs sm:text-sm text-scrapbook-plum-muted font-medium mt-1 max-w-xs mx-auto">
          {scrapbook.subtitle}
        </p>
      </motion.div>

      {/* Scrapbook Photo Grid (1 column on small phones, 2 columns on sm+) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 mb-5">
        {scrapbook.photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 20,
              delay: idx * 0.08,
            }}
          >
            <Polaroid
              photo={photo}
              onSelect={setSelectedPhoto}
              fallbackMessage={scrapbook.fallbackMessage}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="w-full space-y-2.5">
        <Button
          onClick={onNext}
          icon={ArrowRight}
          ariaLabel="Advance to Screen 5: The Friendship Letter"
        >
          {scrapbook.continueButton}
        </Button>

        {onBack && (
          <Button
            variant="secondary"
            onClick={onBack}
            icon={ArrowLeft}
            ariaLabel="Back to Appreciation Screen"
          >
            ← Back to Appreciation
          </Button>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <ImageModal
          photo={selectedPhoto}
          isOpen={Boolean(selectedPhoto)}
          onClose={() => setSelectedPhoto(null)}
          fallbackMessage={scrapbook.fallbackMessage}
        />
      )}
    </div>
  );
};
