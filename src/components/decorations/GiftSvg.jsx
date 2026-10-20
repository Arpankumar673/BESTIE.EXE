import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

/**
 * GiftSvg Component
 *
 * Upgraded interactive birthday surprise gift box:
 * - Detailed ribbon, bow loops, hanging tails, and layered gradients
 * - Floating ambient sparkles, hearts, and celebratory elements
 * - Smooth lid-opening animation with emerging celebration burst
 * - Fully responsive with touch & keyboard accessibility
 */
export const GiftSvg = ({ className = '', size = 'lg', isOpen = false, onClick, onKeyDown }) => {
  const isLarge = size === 'lg';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {/* Floating Sparkle Top-Right */}
      <motion.div
        animate={{
          scale: [0.9, 1.25, 0.9],
          rotate: [0, 15, -10, 0],
          y: [0, -4, 0],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3.5 -right-3 text-amber-400 pointer-events-none z-20"
      >
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-300 drop-shadow-xs" />
      </motion.div>

      {/* Floating Mini Heart Top-Left */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          y: [0, -6, 0],
          rotate: [-6, 6, -6],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="absolute -top-2.5 -left-2 text-rose-500 pointer-events-none z-20"
      >
        <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-400 drop-shadow-xs" />
      </motion.div>

      {/* Tiny Birthday Star Bottom-Right */}
      <motion.div
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.85, 1.1, 0.85],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute -bottom-1 -right-2 text-yellow-400 pointer-events-none text-xs sm:text-sm select-none z-20"
      >
        ✨
      </motion.div>

      {/* Tiny Birthday Heart Bottom-Left */}
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
          y: [0, -3, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
        className="absolute -bottom-1 -left-2 text-rose-400 pointer-events-none text-xs select-none z-20"
      >
        💗
      </motion.div>

      {/* Main Gift SVG */}
      <svg
        viewBox="0 0 170 165"
        className={
          isLarge
            ? 'w-36 h-36 sm:w-44 sm:h-44 drop-shadow-lg'
            : 'w-24 h-24 sm:w-28 sm:h-28 drop-shadow-md'
        }
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Box Gradient */}
          <linearGradient id="boxGrad" x1="35" y1="65" x2="135" y2="145" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF0F5" />
            <stop offset="0.5" stopColor="#FFC0CB" />
            <stop offset="1" stopColor="#FFA6B9" />
          </linearGradient>

          {/* Lid Gradient */}
          <linearGradient id="lidGrad" x1="25" y1="46" x2="145" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE4EC" />
            <stop offset="0.6" stopColor="#FFAAA6" />
            <stop offset="1" stopColor="#FF8FA3" />
          </linearGradient>

          {/* Ribbon Gradient */}
          <linearGradient id="ribbonGrad" x1="72" y1="50" x2="98" y2="145" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4D80" />
            <stop offset="0.6" stopColor="#E02960" />
            <stop offset="1" stopColor="#B31245" />
          </linearGradient>

          {/* Bow Highlight */}
          <linearGradient id="bowGrad" x1="50" y1="20" x2="120" y2="55" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6B93" />
            <stop offset="0.5" stopColor="#FF2A6D" />
            <stop offset="1" stopColor="#D81B55" />
          </linearGradient>
        </defs>

        {/* Soft Ground Shadow */}
        <ellipse cx="85" cy="152" rx="60" ry="8" fill="#F47298" fillOpacity="0.28" />

        {/* Gift Box Base */}
        <rect
          x="38"
          y="72"
          width="94"
          height="74"
          rx="12"
          fill="url(#boxGrad)"
          stroke="#F47298"
          strokeWidth="2.5"
        />

        {/* Polka Dots / Confetti dots on Box */}
        <circle cx="54" cy="90" r="3.5" fill="#FFFDF9" opacity="0.85" />
        <circle cx="116" cy="90" r="3.5" fill="#FFFDF9" opacity="0.85" />
        <circle cx="54" cy="122" r="3.5" fill="#FFFDF9" opacity="0.85" />
        <circle cx="116" cy="122" r="3.5" fill="#FFFDF9" opacity="0.85" />
        <circle cx="68" cy="106" r="2.5" fill="#FEF08A" opacity="0.9" />
        <circle cx="102" cy="106" r="2.5" fill="#FEF08A" opacity="0.9" />

        {/* Emerging Surprise Elements When Opened */}
        {isOpen && (
          <motion.g
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          >
            {/* Surprise Glow */}
            <circle cx="85" cy="65" r="22" fill="#FEF08A" fillOpacity="0.4" filter="blur(4px)" />
            <text x="85" y="70" textAnchor="middle" fontSize="18" className="select-none">
              🎂✨
            </text>
          </motion.g>
        )}

        {/* Vertical Ribbon Body */}
        <rect x="75" y="72" width="20" height="74" fill="url(#ribbonGrad)" />
        <rect x="83" y="72" width="4" height="74" fill="#FF85A2" opacity="0.5" />

        {/* Hanging Ribbon Tails */}
        <path
          d="M77 75 C 72 98, 62 110, 54 122 C 58 120, 64 124, 66 128 C 72 116, 78 102, 80 75 Z"
          fill="url(#ribbonGrad)"
          opacity="0.9"
        />
        <path
          d="M93 75 C 98 98, 108 110, 116 122 C 112 120, 106 124, 104 128 C 98 116, 92 102, 90 75 Z"
          fill="url(#ribbonGrad)"
          opacity="0.9"
        />

        {/* Gift Box Lid (animates upward and tilts when opened) */}
        <motion.g
          animate={isOpen ? { y: -30, rotate: -12, x: -5 } : { y: 0, rotate: 0, x: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          style={{ transformOrigin: '30px 58px' }}
        >
          {/* Lid Base */}
          <rect
            x="30"
            y="56"
            width="110"
            height="20"
            rx="7"
            fill="url(#lidGrad)"
            stroke="#F47298"
            strokeWidth="2.5"
          />

          {/* Lid Ribbon */}
          <rect x="75" y="56" width="20" height="20" fill="url(#ribbonGrad)" />
          <rect x="83" y="56" width="4" height="20" fill="#FF85A2" opacity="0.5" />

          {/* Ribbon Bow on Top */}
          {/* Left Bow Loop */}
          <path
            d="M80 58 C 58 30, 42 45, 64 58 C 74 63, 79 58, 80 58 Z"
            fill="url(#bowGrad)"
            stroke="#E02960"
            strokeWidth="1.5"
          />
          {/* Left Inner Shadow */}
          <path d="M68 53 C 58 44, 52 48, 62 55 Z" fill="#B31245" opacity="0.6" />

          {/* Right Bow Loop */}
          <path
            d="M90 58 C 112 30, 128 45, 106 58 C 96 63, 91 58, 90 58 Z"
            fill="url(#bowGrad)"
            stroke="#E02960"
            strokeWidth="1.5"
          />
          {/* Right Inner Shadow */}
          <path d="M102 53 C 112 44, 118 48, 108 55 Z" fill="#B31245" opacity="0.6" />

          {/* Center Bow Knot */}
          <circle cx="85" cy="58" r="8" fill="#B31245" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx="83.5" cy="56.5" r="2.5" fill="#FFAAA6" />
        </motion.g>
      </svg>
    </div>
  );
};
