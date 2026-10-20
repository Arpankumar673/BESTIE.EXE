import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

/**
 * FloatingHearts Component
 *
 * Ambient floating decorative hearts, stars, and sparkles.
 * Strictly non-interactive (pointer-events-none) to preserve zero click interference.
 */
export const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Top Left Heart */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 left-4 text-pink-300/40"
      >
        <Heart className="w-8 h-8 fill-pink-200/40" />
      </motion.div>

      {/* Top Right Star */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-12 right-6 text-amber-300/50"
      >
        <Sparkles className="w-6 h-6 fill-amber-200/40" />
      </motion.div>

      {/* Middle Left Sparkle */}
      <motion.div
        animate={{ y: [0, -10, 0], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 -left-2 text-rose-300/30"
      >
        <Star className="w-6 h-6 fill-rose-200/30" />
      </motion.div>

      {/* Middle Right Heart */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-1/2 right-3 text-rose-400/35"
      >
        <Heart className="w-7 h-7 fill-pink-300/30" />
      </motion.div>

      {/* Bottom Left Doodle */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 left-6 text-purple-300/30"
      >
        <Heart className="w-6 h-6 fill-purple-200/30" />
      </motion.div>

      {/* Bottom Right Star */}
      <motion.div
        animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute bottom-28 right-5 text-amber-300/40"
      >
        <Sparkles className="w-5 h-5 fill-amber-200/30" />
      </motion.div>
    </div>
  );
};
