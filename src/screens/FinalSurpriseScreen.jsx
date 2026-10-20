import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, Camera } from 'lucide-react';
import { Button } from '../components/common/Button';
import { GiftSvg } from '../components/decorations/GiftSvg';
import { CONTENT } from '../data/content';

/**
 * Screen 6: The Final Surprise 🎁
 *
 * Grand interactive birthday surprise finale for Butkii:
 * - "BUTKII, THIS IS YOUR BIRTHDAY DLC! 🎂💗"
 * - Interactive, accessible floating Gift Box with celebration burst
 * - Independent "Make a Birthday Wish ✨" interaction with glowing candle & heart confetti
 * - Multi-stage celebratory confetti cannon with duplicate-tap prevention
 * - "OFFICIALLY STUCK WITH PAGAL BESTU! 💗😂" celebration card
 * - Warm, playful birthday message from Pagal Bestu
 * - Working Replay and Revisit Scrapbook navigation
 */
export const FinalSurpriseScreen = ({ onReplay, onRevisitScrapbook }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [hasMadeWish, setHasMadeWish] = useState(false);
  const isOpeningRef = useRef(false);
  const { final } = CONTENT;

  // Multi-stage confetti celebration triggered on gift opening
  const triggerCelebration = () => {
    if (isOpened || isOpeningRef.current) return;
    isOpeningRef.current = true;
    setIsOpened(true);

    try {
      // Stage 1: Immediate vibrant birthday burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#FF4D80', '#FF85A2', '#FDE047', '#A7F3D0', '#E9D5FF', '#FFB703', '#FB8500'],
      });

      // Stage 2: Left cannon at 250ms
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 60,
          origin: { x: 0.05, y: 0.65 },
          colors: ['#FF4D80', '#FDE047', '#FF85A2', '#FFCAD4'],
        });
      }, 250);

      // Stage 3: Right cannon at 450ms
      setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 60,
          origin: { x: 0.95, y: 0.65 },
          colors: ['#FF4D80', '#A7F3D0', '#E9D5FF', '#FDE047'],
        });
      }, 450);

      // Stage 4: Star & circle shower burst at 700ms
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 90,
          origin: { y: 0.4 },
          colors: ['#FF4D80', '#FFD700', '#FF69B4', '#E9D5FF'],
          shapes: ['circle'],
        });
      }, 700);
    } catch {
      // Graceful fallback
    }
  };

  // Independent birthday wish interaction
  const handleMakeWish = () => {
    setHasMadeWish(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF4D80', '#FF85A2', '#FDE047', '#FFD1DC', '#E9D5FF'],
        shapes: ['circle'],
        scalar: 1.1,
      });
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
        className="relative w-full bg-[#FFFDF9] rounded-3xl p-5 sm:p-7 border-2 border-pink-200/90 shadow-scrapbook text-center"
      >
        {/* Top Washi Tape */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rounded-xs opacity-90 rotate-[-1deg] pointer-events-none"
          aria-hidden="true"
        />

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-rose-600 font-extrabold text-[10px] tracking-wider uppercase mb-2 border border-pink-200">
          <Sparkles className="w-3 h-3 text-rose-500 fill-rose-400" />
          <span>{final.badge}</span>
        </div>

        {/* Personalized Birthday Heading */}
        <h2 className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-scrapbook-plum tracking-tight mb-1.5 leading-tight">
          {final.heading}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-scrapbook-plum-muted font-medium leading-relaxed mb-4 max-w-sm mx-auto">
          {final.subtitle}
        </p>

        {/* Interactive Floating Gift Box */}
        <motion.div
          animate={
            isOpened
              ? { scale: [1, 1.05, 1], y: 0 }
              : { y: [0, -9, 0], rotate: [0, -1.2, 1.2, 0] }
          }
          transition={
            isOpened
              ? { duration: 0.4 }
              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }
          className={`my-3 inline-flex flex-col items-center select-none ${
            !isOpened ? 'cursor-pointer group' : ''
          }`}
          onClick={!isOpened ? triggerCelebration : undefined}
          onKeyDown={(e) => {
            if (!isOpened && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              triggerCelebration();
            }
          }}
          role={!isOpened ? 'button' : 'region'}
          tabIndex={!isOpened ? 0 : -1}
          aria-label={
            !isOpened
              ? "Open Butkii's Birthday Surprise Gift Box"
              : 'Birthday surprise gift box opened'
          }
        >
          <GiftSvg size="lg" isOpen={isOpened} />
          {!isOpened && (
            <span className="text-[11px] font-bold text-rose-500 mt-2 flex items-center gap-1 group-hover:scale-105 transition-transform">
              <span>Tap box to unwrap!</span>
              <span>🎁</span>
            </span>
          )}
        </motion.div>

        {/* Independent Birthday Wish Mini Section (available both before & after opening) */}
        <div className="my-3 w-full p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-amber-50/80 via-pink-50/80 to-purple-50/60 border border-pink-200/80 text-center shadow-xs">
          {!hasMadeWish ? (
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-[11px] sm:text-xs text-scrapbook-plum-muted font-semibold">
                Make a special wish for your birthday year ahead! ✨
              </p>
              <Button
                variant="subtle"
                onClick={handleMakeWish}
                icon={Sparkles}
                ariaLabel="Make a Birthday Wish"
              >
                {final.wishButton}
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-1.5"
            >
              {/* Animated Candle & Glowing Heart */}
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    filter: [
                      'drop-shadow(0 0 4px #F472B6)',
                      'drop-shadow(0 0 10px #FB7185)',
                      'drop-shadow(0 0 4px #F472B6)',
                    ],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-2xl select-none"
                  aria-hidden="true"
                >
                  🕯️
                </motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    rotate: [-4, 4, -4],
                  }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-xl select-none"
                  aria-hidden="true"
                >
                  💖
                </motion.div>
              </div>

              <p className="text-xs sm:text-[13px] font-semibold text-rose-600 leading-relaxed px-1">
                {final.wishMadeMessage}
              </p>

              <button
                type="button"
                onClick={handleMakeWish}
                className="text-[11px] font-bold text-rose-500 hover:text-rose-600 underline underline-offset-2 transition-colors cursor-pointer pt-0.5"
              >
                Make another wish ✨
              </button>
            </motion.div>
          )}
        </div>

        {/* Interactive State Container */}
        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* UNOPENED STATE CTA */
            <motion.div
              key="unopened-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full mt-3"
            >
              <Button
                onClick={triggerCelebration}
                icon={Sparkles}
                ariaLabel="Open Your Birthday Surprise"
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
              {/* Mission Complete Birthday Banner */}
              <div className="p-3 sm:p-3.5 bg-gradient-to-r from-pink-100/90 via-rose-100/90 to-amber-100/90 border border-pink-300/80 rounded-2xl shadow-xs text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-[10px] tracking-wider uppercase mb-1.5 shadow-xs">
                  <Sparkles className="w-3 h-3 fill-white" />
                  <span>{final.missionComplete}</span>
                </div>
                <p className="text-xs sm:text-sm text-scrapbook-plum font-semibold leading-relaxed">
                  {final.missionSupporting}
                </p>
              </div>

              {/* Personalized Celebration Card */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-[#FFF5F8] via-[#FFEBF1] to-[#FFF0E6] border-2 border-rose-300/90 rounded-2xl shadow-sm text-center relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <Heart className="w-6 h-6 fill-white" />
                </div>
                <h3 className="font-handwriting text-2xl sm:text-3xl font-extrabold text-rose-600 leading-snug mb-1.5">
                  {final.celebrationHeadline}
                </h3>
                <p className="text-xs sm:text-[13px] text-scrapbook-plum-muted font-medium leading-relaxed px-1">
                  {final.celebrationNotice}
                </p>
              </div>

              {/* Personalized Birthday Message Card */}
              <div className="p-4 sm:p-5 bg-white/95 border border-pink-200/90 rounded-2xl shadow-xs text-left relative overflow-hidden">
                {/* Washi tape accent on top right */}
                <div
                  className="absolute -top-2.5 right-4 w-16 h-4 washi-tape-yellow rounded-xs opacity-90 rotate-[2deg] pointer-events-none"
                  aria-hidden="true"
                />

                <h4 className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-600 mb-2.5 tracking-tight">
                  {final.birthdayMessageTitle}
                </h4>

                <div className="space-y-2.5 text-xs sm:text-[13px] text-scrapbook-plum font-medium leading-relaxed">
                  {final.birthdayMessageParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Sign-off & Signature */}
                <div className="mt-4 pt-3 border-t border-pink-100 flex flex-col items-end text-right">
                  <span className="text-xs text-scrapbook-plum-muted font-medium mb-0.5">
                    {final.birthdayMessageClosing}
                  </span>
                  <span className="font-handwriting text-2xl font-bold text-rose-600">
                    {final.birthdayMessageSignature}
                  </span>
                </div>
              </div>

              {/* Action Navigation Buttons */}
              <div className="w-full space-y-2.5 pt-3 border-t border-pink-200/80">
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
                    {final.revisitScrapbookButton}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Tagline */}
        <p className="mt-5 text-[11px] font-bold text-rose-400 select-none pb-1">
          {final.tagline}
        </p>
      </motion.div>
    </div>
  );
};
