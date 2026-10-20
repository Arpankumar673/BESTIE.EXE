import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, ArrowRight, RotateCcw, Sparkles, Smile } from 'lucide-react';
import { Button } from '../components/common/Button';
import { CONTENT } from '../data/content';

/**
 * Screen 2: The Bestie Verification
 *
 * Playful quiz check:
 * - "Hold on a second... 🤨"
 * - "Are you actually my favorite human?"
 * - Cute compact hugging hearts illustration (pink & lavender)
 * - Primary YES button + styled secondary NO button
 * - Ordered interactive cycling NO responses beneath the buttons
 * - Celebratory success card when YES is clicked
 * - Synchronized navigation and preserved state
 */
export const VerificationScreen = ({ onNext, onBack, isCompleted = false, onComplete }) => {
  const { verification } = CONTENT;

  const [hasSaidYes, setHasSaidYes] = useState(isCompleted);
  const [noCount, setNoCount] = useState(0);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleYes = () => {
    setHasSaidYes(true);
    if (onComplete) onComplete();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF4D80', '#FF85A2', '#FFD1DC', '#FDE047', '#E9D5FF', '#A7F3D0'],
      });
    } catch {
      // Graceful fallback
    }
  };

  const handleNoClick = () => {
    if (hasSaidYes) return;

    // Trigger slight cute shake animation
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);

    const responses = verification.noResponses || [];
    if (responses.length > 0) {
      const responseIndex = noCount % responses.length;
      setCurrentResponse(responses[responseIndex]);
      setNoCount((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto px-3 py-4 sm:py-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        className="relative w-full bg-[#FFFDF9] rounded-3xl p-5 sm:p-7 border-2 border-pink-200/90 shadow-scrapbook text-center overflow-hidden"
      >
        {/* Top Washi Tape */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-yellow rounded-xs opacity-90 rotate-1 pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Small Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-rose-600 font-extrabold text-[10px] tracking-wider uppercase mb-2.5 border border-pink-200">
          <Sparkles className="w-3 h-3 text-rose-500 fill-rose-400" />
          <span>{verification.badge}</span>
        </div>

        {/* Heading */}
        <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-scrapbook-plum tracking-tight mb-1.5 leading-tight">
          {verification.heading}
        </h2>

        {/* Question */}
        <p className="font-handwriting text-xl sm:text-2xl font-bold text-rose-600 mb-2 leading-snug">
          "{verification.question}"
        </p>

        {/* Small Decorative Friendship Hugging Hearts (Soft Pink & Lavender) */}
        {!hasSaidYes && (
          <motion.div
            animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="my-2.5 sm:my-3 flex items-center justify-center select-none"
            aria-hidden="true"
          >
            <div className="relative inline-flex items-center justify-center py-1">
              {/* Left Heart (Soft Rose Pink) */}
              <motion.div
                animate={{ rotate: [-6, 3, -6] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-rose-400 drop-shadow-sm -mr-2 z-10"
              >
                <Heart className="w-8 h-8 sm:w-9 sm:h-9 fill-rose-300/90 stroke-[1.8]" />
              </motion.div>

              {/* Sparkle Hug Badge in Center */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-30 text-amber-400 drop-shadow-2xs">
                <Sparkles className="w-4 h-4 fill-amber-300" />
              </div>

              {/* Right Heart (Soft Lavender) */}
              <motion.div
                animate={{ rotate: [6, -3, 6] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="text-purple-400 drop-shadow-sm z-20"
              >
                <Heart className="w-8 h-8 sm:w-9 sm:h-9 fill-purple-200/90 stroke-[1.8]" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Success State Card (When YES is clicked) */}
        {hasSaidYes ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="my-3 p-4 bg-gradient-to-r from-pink-100 via-rose-50 to-purple-50 border-2 border-rose-200 rounded-2xl shadow-xs text-center"
          >
            <div className="w-11 h-11 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto mb-2 shadow-2xs">
              <Heart className="w-5 h-5 fill-white" />
            </div>

            <h3 className="font-handwriting text-2xl sm:text-3xl font-extrabold text-rose-600 mb-1 leading-snug">
              {verification.yesHeading || 'I KNEW IT! 😭💗'}
            </h3>

            <p className="text-xs sm:text-sm font-semibold text-scrapbook-plum leading-relaxed mb-4 px-1">
              "{verification.yesCelebration}"
            </p>

            {/* Continue Button */}
            <Button
              onClick={onNext}
              icon={ArrowRight}
              ariaLabel="Proceed to Friendship Appreciation"
            >
              {verification.continueButton}
            </Button>
          </motion.div>
        ) : (
          /* Question State: YES & NO Option Buttons */
          <div className="w-full space-y-2.5 mt-2">
            {/* Primary YES Button (Bright Pink Gradient) */}
            <Button
              onClick={handleYes}
              icon={Heart}
              ariaLabel="Accept: YES, OBVIOUSLY"
            >
              {verification.yesButton}
            </Button>

            {/* Styled Secondary NO Button */}
            <motion.button
              type="button"
              onClick={handleNoClick}
              animate={isShaking ? { x: [-4, 4, -4, 4, 0] } : {}}
              transition={{ duration: 0.25 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full min-h-[46px] px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-[#FFF5F8] hover:bg-rose-50 border border-pink-200/90 hover:border-pink-300 text-rose-500 shadow-2xs transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 select-none touch-manipulation"
              aria-label="Decline: NOOO, I'M NOT YOUR BESTIE"
            >
              <span>{verification.noButton}</span>
            </motion.button>

            {/* Interactive NO Response Message (Displayed BENEATH the buttons) */}
            <AnimatePresence mode="wait">
              {currentResponse && (
                <motion.div
                  key={currentResponse}
                  initial={{ opacity: 0, scale: 0.94, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="mt-3 p-3 bg-pink-100/75 border border-pink-200/90 rounded-2xl text-xs sm:text-sm font-bold text-rose-600 shadow-2xs"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Smile className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{currentResponse}</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Back navigation */}
        {onBack && !hasSaidYes && (
          <div className="mt-4 pt-2 border-t border-pink-100">
            <button
              type="button"
              onClick={onBack}
              className="text-[11px] font-bold text-scrapbook-plum-muted/70 hover:text-rose-500 transition-colors flex items-center justify-center gap-1 mx-auto focus-visible:outline-none focus-visible:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Back to Start</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
