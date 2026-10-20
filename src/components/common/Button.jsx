import React from 'react';
import { motion } from 'framer-motion';

/**
 * Button Component
 *
 * Touch-friendly (≥44px height), tactile button with smooth hover/active scaling.
 * Variants:
 * - 'primary': Vibrant rose pink gradient with soft shadow
 * - 'secondary': Cream paper button with pink border
 * - 'subtle': Text button with underline hover
 */
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
}) => {
  const baseClasses = `
    w-full min-h-[46px] px-5 py-3 rounded-2xl font-bold text-sm sm:text-base
    flex items-center justify-center gap-2 select-none touch-manipulation
    transition-all duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-rose-400
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-scrapbook-rose via-[#FF4D80] to-[#FF3366]
      text-white shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.98]
      border-b-2 border-rose-700/30
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `,
    secondary: `
      bg-white/90 hover:bg-white text-scrapbook-plum border border-pink-200/90
      shadow-xs hover:shadow-sm hover:text-scrapbook-rose active:scale-[0.98]
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `,
    subtle: `
      bg-transparent text-scrapbook-plum-muted/80 hover:text-scrapbook-rose
      py-2 min-h-[38px] underline decoration-pink-300 underline-offset-4
    `,
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      aria-label={ariaLabel}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </motion.button>
  );
};
