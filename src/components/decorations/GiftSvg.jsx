import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * GiftSvg Component
 *
 * Cute wrapped present with heart ribbon and floating sparkles.
 * Supports opened state or bouncing/pulsing animation.
 */
export const GiftSvg = ({ className = '', size = 'md', isOpen = false }) => {
  const isLarge = size === 'lg';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`} aria-hidden="true">
      <motion.div
        animate={{ scale: [0.9, 1.25, 0.9], rotate: [0, 15, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 -right-2 text-amber-400 pointer-events-none z-10"
      >
        <Sparkles className="w-5 h-5 fill-amber-300" />
      </motion.div>

      <svg
        viewBox="0 0 160 150"
        className={isLarge ? 'w-32 h-32 sm:w-36 sm:h-36 drop-shadow-md' : 'w-24 h-24 sm:w-28 sm:h-28 drop-shadow-sm'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft shadow */}
        <ellipse cx="80" cy="140" rx="55" ry="7" fill="#F47298" fillOpacity="0.25" />

        {/* Gift Box Base */}
        <rect x="35" y="65" width="90" height="70" rx="10" fill="#FFC0CB" stroke="#F47298" strokeWidth="2.5" />

        {/* Polka dots on box */}
        <circle cx="50" cy="85" r="3" fill="#FFFDF9" opacity="0.8" />
        <circle cx="110" cy="85" r="3" fill="#FFFDF9" opacity="0.8" />
        <circle cx="50" cy="115" r="3" fill="#FFFDF9" opacity="0.8" />
        <circle cx="110" cy="115" r="3" fill="#FFFDF9" opacity="0.8" />

        {/* Vertical Ribbon */}
        <rect x="71" y="65" width="18" height="70" fill="#FF3366" />

        {/* Gift Box Lid (animate lid open if isOpen) */}
        <motion.g
          animate={isOpen ? { y: -25, rotate: -10 } : { y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <rect x="28" y="50" width="104" height="20" rx="6" fill="#FFAAA6" stroke="#F47298" strokeWidth="2.5" />
          <rect x="71" y="50" width="18" height="20" fill="#FF3366" />

          {/* Ribbon Bow on Top */}
          {/* Left Loop */}
          <path
            d="M75 52C60 30 45 42 62 52C70 56 75 52 75 52Z"
            fill="#FF3366"
            stroke="#F47298"
            strokeWidth="1.5"
          />
          {/* Right Loop */}
          <path
            d="M85 52C100 30 115 42 98 52C90 56 85 52 85 52Z"
            fill="#FF3366"
            stroke="#F47298"
            strokeWidth="1.5"
          />
          {/* Center Knot */}
          <circle cx="80" cy="52" r="7" fill="#E02960" stroke="#FFF" strokeWidth="1.5" />
        </motion.g>
      </svg>
    </div>
  );
};
