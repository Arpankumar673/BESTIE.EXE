import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeaderNav } from './components/common/HeaderNav';
import { FloatingHearts } from './components/common/FloatingHearts';
import { IntroScreen } from './screens/IntroScreen';
import { VerificationScreen } from './screens/VerificationScreen';
import { AppreciationScreen } from './screens/AppreciationScreen';
import { ScrapbookScreen } from './screens/ScrapbookScreen';
import { LetterScreen } from './screens/LetterScreen';
import { FinalSurpriseScreen } from './screens/FinalSurpriseScreen';

/**
 * BESTIE.EXE Main Application Controller
 *
 * Orchestrates 6 stages:
 * 1. IntroScreen - Surprise introduction ("⚠️ BESTIE DETECTED", "Hey You! 💗")
 * 2. VerificationScreen - Bestie verification quiz ("Are you actually my favorite human?")
 * 3. AppreciationScreen - Friendship appreciation (4 animated cards)
 * 4. ScrapbookScreen - Photo scrapbook (6 Polaroid slots + missing image fallback)
 * 5. LetterScreen - Friendship letter (sealed envelope unfolding into letter)
 * 6. FinalSurpriseScreen - Grand finale celebration (confetti, "YOU ARE OFFICIALLY STUCK WITH ME!", replay)
 */
export function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Scroll to top smoothly when changing screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep]);

  // Navigate with debounce lock to prevent rapid click glitches
  const goTo = (step) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentStep(step);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
  };

  const handleReset = () => {
    goTo(1);
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#FFF5F7] text-[#2D1B2D] flex flex-col justify-between overflow-x-hidden selection:bg-rose-200">
      {/* Background Floating Ambient Hearts & Sparkles */}
      <FloatingHearts />

      {/* Top Header Navigation Bar with 6 Progress Steps */}
      <HeaderNav
        currentStep={currentStep}
        totalSteps={6}
        onReset={handleReset}
      />

      {/* Main Screen Content View */}
      <main className="w-full flex-1 flex flex-col items-center justify-center z-10 px-2 sm:px-4 py-2">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <IntroScreen onNext={() => goTo(2)} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <VerificationScreen
                onNext={() => goTo(3)}
                onBack={() => goTo(1)}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <AppreciationScreen
                onNext={() => goTo(4)}
                onBack={() => goTo(2)}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <ScrapbookScreen
                onNext={() => goTo(5)}
                onBack={() => goTo(3)}
              />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <LetterScreen
                onNext={() => goTo(6)}
                onBack={() => goTo(4)}
              />
            </motion.div>
          )}

          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <FinalSurpriseScreen
                onReplay={handleReset}
                onRevisitScrapbook={() => goTo(4)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Tiny bottom watermark */}
      <footer className="w-full py-2 text-center text-[10px] font-semibold text-rose-300 select-none pointer-events-none z-10">
        BESTIE.EXE 💗 • A Tiny Corner of the Internet Just For You
      </footer>
    </div>
  );
}

export default App;
