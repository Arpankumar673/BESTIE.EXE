import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { CONTENT } from '../data/content';

/**
 * Screen 3: Friendship Appreciation
 *
 * 4 beautifully animated appreciation cards:
 * 1. Professional Partner in Crime 🕵️
 * 2. Certified Mood Booster ☀️
 * 3. Keeper of My Secrets 🤫
 * 4. My Forever Bestie 🫶
 */
export const AppreciationScreen = ({ onNext, onBack }) => {
  const { appreciation } = CONTENT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto px-3 py-6 flex flex-col items-center">
      {/* Top Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-5"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-rose-600 font-extrabold text-[10px] tracking-wider uppercase mb-2.5 border border-pink-200">
          <Sparkles className="w-3 h-3 text-rose-500 fill-rose-400" />
          <span>{appreciation.badge}</span>
        </div>

        <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-scrapbook-plum tracking-tight leading-tight">
          {appreciation.heading}
        </h2>

        <p className="text-xs sm:text-sm text-scrapbook-plum-muted font-medium mt-1 max-w-xs mx-auto">
          {appreciation.subtitle}
        </p>
      </motion.div>

      {/* 4 Animated Appreciation Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full space-y-3.5 mb-6"
      >
        {appreciation.cards.map((card, idx) => (
          <motion.div
            key={card.id || idx}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="relative bg-white rounded-2xl p-4 sm:p-5 border border-pink-100/90 shadow-polaroid hover:shadow-polaroid-hover transition-all text-left overflow-hidden group"
          >
            {/* Top Washi Tape Corner */}
            <div
              className={`
                absolute -top-2.5 right-6 w-16 h-4
                ${card.tapeColor || 'washi-tape'}
                rounded-xs opacity-90 rotate-2 pointer-events-none z-10
              `}
              aria-hidden="true"
            />

            {/* Tag & Sticker */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-extrabold text-rose-500 uppercase tracking-wider bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                #{idx + 1} • {card.tag}
              </span>
              <span className="text-xl select-none" aria-hidden="true">
                {card.sticker}
              </span>
            </div>

            {/* Card Title */}
            <h3 className="font-handwriting text-xl sm:text-2xl font-bold text-scrapbook-plum leading-snug group-hover:text-scrapbook-rose transition-colors mb-1">
              {card.title}
            </h3>

            {/* Card Description */}
            <p className="text-xs sm:text-sm text-scrapbook-plum-muted font-medium leading-relaxed">
              "{card.description}"
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full space-y-2.5 pt-2"
      >
        <Button
          onClick={onNext}
          icon={ArrowRight}
          ariaLabel="Continue to Photo Scrapbook"
        >
          {appreciation.continueButton}
        </Button>

        {onBack && (
          <Button
            variant="secondary"
            onClick={onBack}
            icon={ArrowLeft}
            ariaLabel="Back to Verification Screen"
          >
            ← Back to Verification
          </Button>
        )}
      </motion.div>
    </div>
  );
};
