import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { EnvelopeSvg } from '../components/decorations/EnvelopeSvg';
import { CONTENT } from '../data/content';

/**
 * Screen 5: The Friendship Letter 💌
 *
 * Heartwarming digital letter:
 * - Sealed envelope state with "Open My Letter 💌" trigger
 * - Smooth flap animation revealing cream paper letter
 * - Unfolding smooth reveal of the heartfelt letter
 * - Working Continue button to proceed to Screen 6
 */
export const LetterScreen = ({ onNext, onBack, isOpenedInitial = false, onOpen }) => {
  const [isOpen, setIsOpen] = useState(isOpenedInitial);
  const { letter, bestieName } = CONTENT;

  const handleOpenLetter = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#FF4D80', '#FFD1DC', '#FDE047', '#E9D5FF'],
      });
    } catch {
      // Graceful fallback
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-3 py-6 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* STATE 1: SEALED ENVELOPE */
          <motion.div
            key="sealed-envelope"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="relative w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border-2 border-pink-200/90 shadow-scrapbook text-center overflow-hidden">
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-lavender rounded-xs opacity-90 rotate-[-1deg] pointer-events-none"
                aria-hidden="true"
              />

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-rose-600 font-extrabold text-[10px] tracking-wider uppercase mb-3 border border-pink-200">
                <Sparkles className="w-3 h-3 text-rose-500 fill-rose-400" />
                <span>{letter.badge}</span>
              </div>

              {/* Envelope Graphic */}
              <div className="my-3 flex justify-center">
                <EnvelopeSvg
                  isOpen={false}
                  size="lg"
                  onClick={handleOpenLetter}
                />
              </div>

              <h2 className="font-handwriting text-2xl sm:text-3xl font-bold text-scrapbook-plum tracking-tight mb-2 leading-tight">
                {letter.heading}
              </h2>

              <p className="text-xs sm:text-sm text-scrapbook-plum-muted font-medium leading-relaxed mb-6 px-2">
                {letter.envelopePrompt}
              </p>

              {/* Open CTA */}
              <Button
                onClick={handleOpenLetter}
                icon={Mail}
                ariaLabel="Open secret friendship letter"
              >
                {letter.openButton}
              </Button>

              {onBack && (
                <div className="mt-4 pt-2 border-t border-pink-100">
                  <Button
                    variant="subtle"
                    onClick={onBack}
                    ariaLabel="Return to Photo Scrapbook"
                  >
                    ← Back to Photo Scrapbook
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* STATE 2: REVEALED UNFOLDED LETTER */
          <motion.div
            key="opened-letter"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            className="w-full"
          >
            {/* Paper Letter Card */}
            <div className="relative w-full bg-[#FFFDF8] rounded-3xl p-4 sm:p-6 border-2 border-pink-200 shadow-xl text-left overflow-hidden">
              {/* Top Washi Tape */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-lavender rounded-xs opacity-90 rotate-[-1deg] pointer-events-none z-20"
                aria-hidden="true"
              />

              {/* Inner Double Dashed Border */}
              <div className="relative w-full border-2 border-dashed border-pink-200/90 rounded-2xl p-4 sm:p-6 bg-white/75">
                {/* Header Tag */}
                <div className="w-full flex items-center justify-between mb-3 border-b border-pink-100 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-400" />
                    <span>PRIVATE & SWEET</span>
                  </span>
                  <span className="text-base select-none">🌸</span>
                </div>

                {/* Handwritten Letter Heading */}
                <h1 className="font-handwriting text-2xl sm:text-3xl font-bold text-scrapbook-plum tracking-tight mb-3">
                  {letter.heading}
                </h1>

                {/* Greeting */}
                <p className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-600 mb-3 tracking-wide">
                  {typeof letter.greeting === 'function' ? letter.greeting(bestieName) : letter.greeting}
                </p>

                {/* Letter Body Paragraphs */}
                <div className="space-y-3 text-xs sm:text-[13px] text-scrapbook-plum font-medium leading-relaxed">
                  {letter.paragraphs.map((para, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Terms & Conditions / Birthday Friendship Rules Mini Card */}
                {(letter.rules || letter.terms) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                    className="relative my-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-pink-50/90 via-[#FFF5F8] to-purple-50/70 border border-pink-200/90 shadow-xs"
                  >
                    {/* Cute mini tape accent */}
                    <div
                      className="absolute -top-2 right-4 w-14 h-4 washi-tape-mint rounded-xs opacity-90 rotate-[2deg] pointer-events-none"
                      aria-hidden="true"
                    />

                    <div className="flex items-center gap-1.5 mb-2.5">
                      <span className="text-base select-none">👑</span>
                      <h3 className="font-bold text-xs sm:text-sm text-scrapbook-plum tracking-tight">
                        {letter.rulesTitle || letter.termsTitle || 'Birthday Friendship Rules 😂'}
                      </h3>
                    </div>

                    <ul className="space-y-2">
                      {(letter.rules || letter.terms).map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-[13px] text-scrapbook-plum font-medium leading-snug"
                        >
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold mt-0.5 shrink-0 border border-rose-200/80">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Final Paragraph */}
                {letter.finalParagraph && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="text-xs sm:text-[13px] text-scrapbook-plum font-medium leading-relaxed my-3"
                  >
                    {letter.finalParagraph}
                  </motion.p>
                )}

                {/* Prominent Birthday Wish Banner */}
                {letter.birthdayWish && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.35 }}
                    className="my-3.5 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-100/90 via-pink-100 to-amber-100/80 border-2 border-pink-200/90 shadow-xs text-center"
                  >
                    <p className="font-handwriting text-2xl sm:text-3xl font-extrabold text-rose-600 tracking-wide drop-shadow-xs">
                      {letter.birthdayWish}
                    </p>
                  </motion.div>
                )}

                {/* Closing */}
                {letter.closing && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="text-xs sm:text-[13px] text-scrapbook-plum font-semibold leading-relaxed mt-2"
                  >
                    {letter.closing}
                  </motion.p>
                )}

                {/* Sign-off & Signature */}
                <div className="mt-5 pt-3 border-t border-pink-100/90 flex flex-col items-end text-right">
                  <span className="text-xs sm:text-sm text-scrapbook-plum-muted font-medium mb-1">
                    {letter.signatureIntro || letter.signoff}
                  </span>
                  <span className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-600 tracking-wide">
                    {letter.signature}
                  </span>
                </div>

                {/* P.S. Note */}
                {letter.ps && (
                  <div className="mt-4 pt-3 border-t border-dashed border-pink-200/90">
                    <div className="bg-pink-50/70 p-3 rounded-xl border border-pink-100/80">
                      <p className="text-xs sm:text-[13px] text-scrapbook-plum italic font-medium leading-relaxed">
                        <span className="font-bold text-rose-600 not-italic mr-1.5">P.S.</span>
                        {letter.ps}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Next Chapter CTA Button */}
            <div className="w-full space-y-2.5 mt-5 pt-3 border-t border-pink-200/70 pb-8">
              <Button
                onClick={onNext}
                icon={ArrowRight}
                ariaLabel="Advance to Final Surprise"
              >
                {letter.continueButton}
              </Button>

              {onBack && (
                <Button
                  variant="secondary"
                  onClick={onBack}
                  icon={ArrowLeft}
                  ariaLabel="Back to Photo Scrapbook"
                >
                  ← Back to Scrapbook
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
