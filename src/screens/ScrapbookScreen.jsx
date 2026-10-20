import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Polaroid } from '../components/common/Polaroid';
import { ImageModal } from '../components/common/ImageModal';
import { CONTENT } from '../data/content';

// In-memory cache so navigating between screens is instantaneous
let cachedVerifiedPhotos = null;

/**
 * Tests whether an image URL exists and can be loaded by the browser.
 */
const testImageUrl = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;

    img.onload = () => {
      if (!settled) {
        settled = true;
        resolve(true);
      }
    };

    img.onerror = () => {
      if (!settled) {
        settled = true;
        resolve(false);
      }
    };

    // Safety fallback timeout
    setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(false);
      }
    }, 1500);

    img.src = url;
  });
};

/**
 * Generates candidate URLs in strict priority order for a given photo index.
 * Priority:
 * 1. Configured custom imagePath (if any)
 * 2. Unpadded: photo-1.jpg, photo-1.jpeg, photo-1.png, photo-1.webp...
 * 3. Zero-padded: photo-01.jpg, photo-01.jpeg, photo-01.png, photo-01.webp...
 */
const getCandidateUrls = (index, customPath) => {
  const candidates = [];
  if (customPath) {
    candidates.push(customPath);
  }

  const padded = String(index).padStart(2, '0');
  const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];

  // 1. Unpadded candidates
  for (const ext of extensions) {
    const u = `/images/photo-${index}${ext}`;
    if (!candidates.includes(u)) candidates.push(u);
  }

  // 2. Padded candidates (for single digits)
  if (index < 10) {
    for (const ext of extensions) {
      const u = `/images/photo-${padded}${ext}`;
      if (!candidates.includes(u)) candidates.push(u);
    }
  }

  return candidates;
};

/**
 * Resolves the first existing candidate URL for a photo slot.
 * Returns the photo object with resolvedUrl, or null if no file exists.
 */
const resolvePhotoSlot = async (slotConfig, slotNumber) => {
  const candidates = getCandidateUrls(slotNumber, slotConfig?.imagePath);
  for (const url of candidates) {
    const exists = await testImageUrl(url);
    if (exists) {
      return {
        ...slotConfig,
        id: slotNumber,
        resolvedUrl: url,
        imagePath: url,
      };
    }
  }
  return null;
};

// Alternating scrapbook rotations for authentic tactile feel
const ROTATIONS = [
  '-rotate-1.5',
  'rotate-1.5',
  '-rotate-2',
  'rotate-1',
  '-rotate-1',
  'rotate-2',
];

/**
 * Screen 4: Our Photo Scrapbook 📸
 *
 * Mobile-first 2-column Polaroid photo grid:
 * - Automatically checks photos 1 up to 20
 * - Checks JPG, JPEG, PNG, WEBP (both unpadded & padded)
 * - Renders ONLY verified existing photos (NEVER empty cards or placeholders)
 * - Clean two-column responsive CSS grid with automatic reflow
 * - Touch-to-zoom modal with scroll lock
 */
export const ScrapbookScreen = ({ onNext, onBack }) => {
  const { scrapbook } = CONTENT;
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photos, setPhotos] = useState(cachedVerifiedPhotos || []);
  const [isValidating, setIsValidating] = useState(!cachedVerifiedPhotos);

  useEffect(() => {
    let isMounted = true;

    const verifyPhotos = async () => {
      const slots = scrapbook.photos || [];
      // Test all slots concurrently in parallel
      const promises = slots.map((slot, idx) => resolvePhotoSlot(slot, idx + 1));
      const results = await Promise.all(promises);
      const valid = results.filter(Boolean);

      cachedVerifiedPhotos = valid;
      if (isMounted) {
        setPhotos(valid);
        setIsValidating(false);
      }
    };

    verifyPhotos();

    return () => {
      isMounted = false;
    };
  }, [scrapbook.photos]);

  return (
    <div className="w-full max-w-lg mx-auto px-2.5 sm:px-4 py-6 flex flex-col items-center">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-5"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-rose-600 font-extrabold text-[10px] tracking-wider uppercase mb-2 border border-pink-200">
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

      {/* Two-Column Scrapbook Photo Grid */}
      {isValidating && photos.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center">
          <Heart className="w-8 h-8 text-rose-400 fill-rose-200 animate-pulse mb-2" />
          <p className="font-handwriting text-xl text-scrapbook-plum font-bold">
            Unfolding our photo memories... 📸
          </p>
        </div>
      ) : photos.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-4 mb-6">
          {photos.map((photo, idx) => {
            const rotation = ROTATIONS[idx % ROTATIONS.length];
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 20,
                  delay: idx * 0.04,
                }}
              >
                <Polaroid
                  photo={{ ...photo, rotation }}
                  onSelect={setSelectedPhoto}
                />
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="w-full py-10 px-4 text-center bg-pink-50/60 rounded-2xl border border-pink-200/80 mb-6">
          <p className="font-handwriting text-xl text-scrapbook-plum font-bold mb-1">
            No memories added yet! 📸
          </p>
          <p className="text-xs text-scrapbook-plum-muted">
            Add photos to <code className="bg-white px-1.5 py-0.5 rounded font-mono text-rose-500 font-bold">/public/images/photo-1.jpg</code> up to <code className="bg-white px-1.5 py-0.5 rounded font-mono text-rose-500 font-bold">photo-20.jpg</code> to see them appear here!
          </p>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="w-full space-y-2.5 pt-2">
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
        />
      )}
    </div>
  );
};
