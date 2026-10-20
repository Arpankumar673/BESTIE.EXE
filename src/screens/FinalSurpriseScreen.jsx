import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, Camera } from 'lucide-react';
import { Button } from '../components/common/Button';
import { GiftSvg } from '../components/decorations/GiftSvg';
import { CONTENT } from '../data/content';

/**
 * Screen 6: The Final Surprise 🎁
 *
 * Grand interactive finale:
 * - "And One Last Thing... 🥹"
 * - Animated gift box with "Open Your Final Surprise 🎁"
 * - Full-screen confetti cannon & celebration burst
 * - "YOU ARE OFFICIALLY STUCK WITH ME! 💗😂"
 * - "Replay Our Little Adventure ↻" resets back to Screen 1
 */
export const FinalSurpriseScreen = ({ onReplay, onRevisitScrapbook }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { final } = CONTENT;

  const triggerCelebration = () => {
    setIsOpened(true);

    // Multi-stage confetti cannon burst
    try {
      // Immediate burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF4D80', '#FF85A2', '#FDE047', '#A7F3D0', '#E9D5FF'],
      });

      // Left cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#FF4D80', '#FF85A2', '#FDE047'],
        });
      }, 250);

      // Right cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#FF4D80', '#A7F3D0', '#E9D5FF'],
        });
      }, 450);
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-3 py-6 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        className="relative w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border-2 border-pink-200/90 shadow-scrapbook text-center overflow-hidden"
      >
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rounded-xs opacity-90 rotate-[-1deg] pointer-events-none"
          aria-hidden="true"
        />

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-rose-600 font-extrabold text-[10px] tracking-wider uppercase mb-2 border border-pink-200">
          <Sparkles className="w-3 h-3 text-rose-500 fill-rose-400" />
          <span>{final.badge}</span>
        </div>

        {/* Heading */}
        <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-scrapbook-plum tracking-tight mb-2 leading-tight">
          {final.heading}
        </h2>

        {/* Supporting text */}
        <p className="text-xs sm:text-sm text-scrapbook-plum-muted font-medium leading-relaxed mb-4 max-w-xs mx-auto">
          {final.supportingText}
        </p>

        {/* Gift Box Graphic */}
        <motion.div
          animate={isOpened ? { scale: 1.1 } : { y: [0, -8, 0] }}
          transition={
            isOpened
              ? { duration: 0.3 }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          className="my-3 flex justify-center cursor-pointer select-none"
          onClick={!isOpened ? triggerCelebration : undefined}
          title={!isOpened ? 'Tap to open!' : undefined}
        >
          <GiftSvg size="lg" isOpen={isOpened} />
        </motion.div>

        {/* Interactive State Container */}
        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* UNOPENED STATE */
            <motion.div
              key="unopened-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full mt-4"
            >
              <Button
                onClick={triggerCelebration}
                icon={Sparkles}
                ariaLabel="Open Your Final Surprise"
              >
                {final.openButton}
              </Button>
            </motion.div>
          ) : (
            /* OPENED CELEBRATION STATE */
            <motion.div
              key="celebration-content"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              className="w-full mt-4 space-y-4"
            >
              {/* Grand Banner */}
              <div className="p-4 bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 border-2 border-rose-300/80 rounded-2xl shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <Heart className="w-6 h-6 fill-white" />
                </div>
                <h3 className="font-handwriting text-2xl sm:text-3xl font-extrabold text-rose-600 leading-snug">
                  {final.celebrationHeadline}
                </h3>
              </div>

              {/* Supporting message */}
              <p className="text-xs sm:text-sm text-scrapbook-plum font-semibold leading-relaxed px-2">
                "{final.celebrationSupporting}"
              </p>

              {/* Action Buttons */}
              <div className="w-full space-y-2.5 pt-3 border-t border-pink-200">
                <Button
                  onClick={onReplay}
                  icon={RotateCcw}
                  ariaLabel="Replay Our Little Adventure"
                >
                  {final.replayButton}
                </Button>

                {onRevisitScrapbook && (
                  <Button
                    variant="secondary"
                    onClick={onRevisitScrapbook}
                    icon={Camera}
                    ariaLabel="Revisit Scrapbook Memories"
                  >
                    Revisit Scrapbook Memories 📸
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Tagline */}
        <p className="mt-5 text-[11px] font-bold text-rose-400 select-none">
          {final.tagline}
        </p>
      </motion.div>
    </div>
  );
};
