import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * EnvelopeSvg Component
 *
 * Renders a cute pink scrapbook envelope.
 * Supports open and closed states with flap animations.
 */
export const EnvelopeSvg = ({
  isOpen = false,
  className = '',
  size = 'md',
  onClick,
}) => {
  const isLarge = size === 'lg';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      aria-hidden="true"
    >
      {/* Floating Sparkle on Envelope */}
      <motion.div
        animate={{ scale: [0.9, 1.2, 0.9], rotate: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 -right-2 text-amber-400 pointer-events-none z-20"
      >
        <Sparkles className="w-5 h-5 fill-amber-300" />
      </motion.div>

      <svg
        viewBox="0 0 160 130"
        className={isLarge ? 'w-36 h-28 sm:w-44 sm:h-34 drop-shadow-md' : 'w-28 h-24 sm:w-32 sm:h-26 drop-shadow-sm'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow */}
        <ellipse cx="80" cy="120" rx="65" ry="7" fill="#F47298" fillOpacity="0.25" />

        {/* Envelope back body */}
        <rect x="15" y="30" width="130" height="85" rx="10" fill="#FFE4E8" stroke="#F47298" strokeWidth="2.5" />

        {/* Inner Letter Paper peeking out if open */}
        {isOpen && (
          <motion.g
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -25, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <rect x="25" y="25" width="110" height="65" rx="6" fill="#FFFDF9" stroke="#F9A8D4" strokeWidth="2" />
            <line x1="38" y1="42" x2="122" y2="42" stroke="#F47298" strokeWidth="2" strokeLinecap="round" />
            <line x1="38" y1="52" x2="115" y2="52" stroke="#F9A8D4" strokeWidth="2" strokeLinecap="round" />
            <line x1="38" y1="62" x2="95" y2="62" stroke="#F9A8D4" strokeWidth="2" strokeLinecap="round" />
            <circle cx="112" cy="62" r="5" fill="#FF4D80" />
          </motion.g>
        )}

        {/* Envelope Side Folds */}
        <path d="M15 115L65 72L15 30V115Z" fill="#FFD1DC" opacity="0.8" />
        <path d="M145 115L95 72L145 30V115Z" fill="#FFD1DC" opacity="0.8" />

        {/* Envelope Bottom Triangle Fold */}
        <path d="M15 115L80 68L145 115H15Z" fill="#FFC0CB" stroke="#F47298" strokeWidth="2" />

        {/* Envelope Flap (Top Triangle) */}
        {!isOpen ? (
          <path
            d="M15 30L80 78L145 30H15Z"
            fill="#FFAAA6"
            stroke="#F47298"
            strokeWidth="2.5"
            className="group-hover:brightness-105 transition-all"
          />
        ) : (
          <path d="M15 30L80 -8L145 30H15Z" fill="#FFAAA6" stroke="#F47298" strokeWidth="2" opacity="0.9" />
        )}

        {/* Wax Heart Seal on Flap */}
        {!isOpen && (
          <g transform="translate(80, 75)">
            <circle cx="0" cy="0" r="13" fill="#FF3366" stroke="#FFFFFF" strokeWidth="2" />
            <path
              d="M0 6l-.7-.6C-3.4 2.8 -5.2 1 -5.2 -1.2c0-1.8 1.4-3.2 3.2-3.2 1 0 2 .5 2 1.2.5-.7 1.4-1.2 2-1.2 1.8 0 3.2 1.4 3.2 3.2 0 2.2-1.8 4 -4.5 6.6L0 6z"
              fill="#FFFFFF"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
