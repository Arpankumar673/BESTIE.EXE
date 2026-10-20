import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Button } from '../components/common/Button';
import { EnvelopeSvg } from '../components/decorations/EnvelopeSvg';
import { CONTENT } from '../data/content';

/**
 * Screen 1: The Surprise Introduction
 *
 * Welcoming opening screen with:
 * - "⚠️ BESTIE DETECTED" badge
 * - "Hey You! 💗" heading
 * - Floating envelope with hearts
 * - "Open Your Surprise 🎁" button
 * - "Made with an unreasonable amount of love ✨"
 */
export const IntroScreen = ({ onNext }) => {
  const [isOpening, setIsOpening] = useState(false);
  const { intro, bestieName } = CONTENT;

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Smooth opening delay before transitioning
    setTimeout(() => {
      onNext();
    }, 450);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-3 py-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        className="relative w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border-2 border-pink-200/90 shadow-scrapbook text-center overflow-hidden"
      >
        {/* Top Washi Tape */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rounded-xs opacity-90 rotate-[-1deg] pointer-events-none"
          aria-hidden="true"
        />

        {/* Badge: ⚠️ BESTIE DETECTED */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-rose-600 font-extrabold text-[11px] tracking-wider uppercase mb-3 border border-pink-200 shadow-2xs">
          <span>{intro.badge}</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-handwriting text-4xl sm:text-5xl font-bold text-scrapbook-plum tracking-tight mb-2 leading-tight">
          {intro.heading}
        </h1>

        {/* Supporting Message */}
        <p className="text-xs sm:text-sm text-scrapbook-plum-muted font-medium leading-relaxed mb-6 px-1">
          {typeof intro.subheading === 'function' ? intro.subheading(bestieName) : intro.subheading}
        </p>

        {/* Cute Floating Envelope Graphic */}
        <motion.div
          animate={isOpening ? { scale: 1.15, y: -8 } : { y: [0, -8, 0] }}
          transition={
            isOpening
              ? { duration: 0.35 }
              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }
          className="my-3 flex justify-center cursor-pointer select-none"
          onClick={handleOpen}
          title="Click to open your surprise!"
        >
          <EnvelopeSvg isOpen={isOpening} size="lg" />
        </motion.div>

        {/* Envelope Hint */}
        <p className="text-[11px] font-bold text-rose-400 mb-6 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400 fill-amber-300" />
          <span>{intro.envelopeHint}</span>
        </p>

        {/* Primary CTA Button */}
        <Button
          onClick={handleOpen}
          disabled={isOpening}
          icon={Heart}
          ariaLabel="Open Your Surprise"
        >
          {isOpening ? 'Opening Surprise... 💗' : intro.buttonText}
        </Button>

        {/* Secondary Decorative Text */}
        <p className="mt-4 text-[11px] font-medium text-scrapbook-plum-muted/80 italic">
          {intro.footerText}
        </p>
      </motion.div>
    </div>
  );
};
