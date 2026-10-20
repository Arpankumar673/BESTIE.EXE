import React, { useState, useEffect, useRef } from 'react';
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
 * Orchestrates 6 stages with HTML5 Browser History integration:
 * 1. IntroScreen - Surprise introduction ("⚠️ BESTIE DETECTED", "Hey You! 💗")
 * 2. VerificationScreen - Bestie verification quiz ("Are you actually my favorite human?")
 * 3. AppreciationScreen - Friendship appreciation (4 animated cards)
 * 4. ScrapbookScreen - Photo scrapbook (6 Polaroid slots + missing image fallback)
 * 5. LetterScreen - Friendship letter (sealed envelope unfolding into letter)
 * 6. FinalSurpriseScreen - Grand finale celebration (confetti, "YOU ARE OFFICIALLY STUCK WITH ME!", replay)
 */
export function App() {
  // Safe initial step retrieval from history.state on refresh or load
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== 'undefined' && window.history?.state?.step) {
      const s = window.history.state.step;
      if (typeof s === 'number' && s >= 1 && s <= 6) return s;
    }
    return 1;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);

  // Keep a ref to currentStep to ensure popstate listener always reads latest value without re-binding
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  // Initialize and synchronize with browser history
  useEffect(() => {
    // Populate initial history state if not yet set
    const existing = window.history.state;
    if (!existing || typeof existing.step !== 'number') {
      window.history.replaceState({ step: currentStep, appIndex: 0 }, '');
    }

    // Popstate event handler for Android back button, browser back/forward buttons
    const handlePopState = (event) => {
      const targetStep = event.state?.step;
      if (typeof targetStep === 'number' && targetStep >= 1 && targetStep <= 6) {
        if (targetStep !== currentStepRef.current) {
          setCurrentStep(targetStep);
        }
      } else {
        // Fallback safely to Step 1 if user navigates back to base entry
        setCurrentStep(1);
        window.history.replaceState({ step: 1, appIndex: 0 }, '');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Scroll to top smoothly when changing screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep]);

  // Centralized forward navigation
  const goTo = (nextStep, { replace = false } = {}) => {
    if (isTransitioning) return;
    if (nextStep === currentStepRef.current) return;
    if (nextStep < 1 || nextStep > 6) return;

    setIsTransitioning(true);
    const currentAppIndex = window.history.state?.appIndex ?? 0;

    if (replace) {
      window.history.replaceState({ step: nextStep, appIndex: currentAppIndex }, '');
    } else {
      window.history.pushState({ step: nextStep, appIndex: currentAppIndex + 1 }, '');
    }

    setCurrentStep(nextStep);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
  };

  // Centralized backward navigation synchronized with browser history
  const goBack = (fallbackStep) => {
    if (isTransitioning) return;
    if (currentStepRef.current <= 1) return;

    const currentAppIndex = window.history.state?.appIndex ?? 0;
    if (currentAppIndex > 0) {
      window.history.back();
    } else {
      // In case user refreshed on a deeper screen and has no back entries in session
      const target = fallbackStep ?? Math.max(1, currentStepRef.current - 1);
      goTo(target, { replace: true });
    }
  };

  // Reset / Replay experience cleanly without leaving stale forward entries
  const handleReset = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setQuizCompleted(false);
    setLetterOpened(false);

    const currentAppIndex = window.history.state?.appIndex ?? 0;
    if (currentAppIndex > 0) {
      // Unwind browser history to session root
      window.history.go(-currentAppIndex);
      setCurrentStep(1);
    } else {
      window.history.replaceState({ step: 1, appIndex: 0 }, '');
      setCurrentStep(1);
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
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
                onBack={() => goBack(1)}
                isCompleted={quizCompleted}
                onComplete={() => setQuizCompleted(true)}
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
                onBack={() => goBack(2)}
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
                onBack={() => goBack(3)}
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
                onBack={() => goBack(4)}
                isOpenedInitial={letterOpened}
                onOpen={() => setLetterOpened(true)}
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
