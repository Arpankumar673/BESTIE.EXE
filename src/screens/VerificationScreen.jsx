import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, ArrowRight, RotateCcw, Sparkles, Smile } from 'lucide-react';
import { Button } from '../components/common/Button';
import { CONTENT } from '../data/content';

// Playful offset positions for dodging NO button
const DODGE_POSITIONS = [
  { x: -25, y: -14 },
  { x: 28, y: 12 },
  { x: -28, y: 16 },
  { x: 24, y: -18 },
  { x: 0, y: 0 },
];

/**
 * Screen 2: The Bestie Verification
 *
 * Playful quiz check:
 * - "Hold on a second... 🤨"
 * - "Are you actually my favorite human?"
 * - YES, OBVIOUSLY 💅 triggers heart burst & celebration
 * - NO, WHO ARE YOU? 🤡 dodges playfully with funny responses
 * - Active Continue button to advance to Screen 3
 */
export const VerificationScreen = ({ onNext, onBack }) => {
  const { verification } = CONTENT;

  const [hasSaidYes, setHasSaidYes] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [currentResponse, setCurrentResponse] = useState('');
  const [dodgeIndex, setDodgeIndex] = useState(0);

  const handleYes = () => {
    setHasSaidYes(true);
    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#FF4D80', '#FF85A2', '#FFD1DC', '#FDE047', '#A7F3D0'],
      });
    } catch {
      // Graceful fallback
    }
  };

  const handleNoInteraction = () => {
    if (hasSaidYes) return;

    const nextCount = noCount + 1;
    setNoCount(nextCount);

    const responses = verification.noResponses || [];
    const responseIndex = Math.min(nextCount - 1, responses.length - 1);
    setCurrentResponse(responses[responseIndex]);

    setDodgeIndex((prev) => (prev + 1) % DODGE_POSITIONS.length);
  };

  const currentDodge = DODGE_POSITIONS[dodgeIndex] || { x: 0, y: 0 };
  const hasResigned = noCount >= 4;

  return (
    <div className="w-full max-w-sm mx-auto px-3 py-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        className="relative w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border-2 border-pink-200/90 shadow-scrapbook text-center overflow-hidden"
      >
        {/* Top Washi Tape */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-yellow rounded-xs opacity-90 rotate-1 pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Small Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-rose-600 font-extrabold text-[10px] tracking-wider uppercase mb-3 border border-pink-200">
          <Sparkles className="w-3 h-3 text-rose-500 fill-rose-400" />
          <span>{verification.badge}</span>
        </div>

        {/* Heading */}
        <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-scrapbook-plum tracking-tight mb-2 leading-tight">
          {verification.heading}
        </h2>

        {/* Question */}
        <p className="font-handwriting text-xl sm:text-2xl font-bold text-rose-600 mb-5 leading-snug">
          "{verification.question}"
        </p>

        {/* Humorous Reaction Feedback */}
        <AnimatePresence mode="wait">
          {currentResponse && !hasSaidYes && (
            <motion.div
              key={currentResponse}
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-4 p-2.5 bg-pink-100/70 border border-pink-200/80 rounded-2xl text-xs font-bold text-rose-600 shadow-2xs"
            >
              <span className="flex items-center justify-center gap-1.5">
                <Smile className="w-3.5 h-3.5 shrink-0" />
                <span>{currentResponse}</span>
              </span>
            </motion.div>
          )}

          {hasSaidYes && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mb-5 p-3.5 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 border border-rose-200 rounded-2xl shadow-xs"
            >
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto mb-2 shadow-2xs">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-scrapbook-plum leading-relaxed">
                {verification.yesCelebration}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Option Buttons */}
        <div className="w-full space-y-3 relative min-h-[110px] flex flex-col justify-center">
          {!hasSaidYes ? (
            <>
              {/* YES Button */}
              <Button
                onClick={handleYes}
                icon={Heart}
                ariaLabel="Accept: YES, OBVIOUSLY"
              >
                {verification.yesButton}
              </Button>

              {/* Playful NO Button */}
              <motion.div
                animate={{
                  x: currentDodge.x,
                  y: currentDodge.y,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-full"
              >
                <button
                  type="button"
                  onClick={handleNoInteraction}
                  onMouseEnter={handleNoInteraction}
                  className={`
                    w-full min-h-[46px] px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm
                    border transition-colors shadow-2xs active:scale-95 touch-manipulation
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400
                    ${
                      hasResigned
                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                        : 'bg-white/85 hover:bg-white border-pink-200 text-scrapbook-plum-muted'
                    }
                  `}
                  aria-label="Decline: NO, WHO ARE YOU?"
                >
                  {hasResigned ? "Okay fine, YES! 🥹💕" : verification.noButton}
                </button>
              </motion.div>
            </>
          ) : (
            /* Continue Button after YES */
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-2"
            >
              <Button
                onClick={onNext}
                icon={ArrowRight}
                ariaLabel="Proceed to Friendship Appreciation"
              >
                {verification.continueButton}
              </Button>
            </motion.div>
          )}
        </div>

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
