import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const CHAPTER_NAMES = [
  'Surprise',
  'Verify',
  'Awesome',
  'Scrapbook',
  'Letter',
  'Finale',
];

/**
 * HeaderNav Component
 *
 * Compact header showing current step progress across all 6 screens.
 */
export const HeaderNav = ({ currentStep = 1, totalSteps = 6, onReset }) => {
  const currentChapter = CHAPTER_NAMES[currentStep - 1] || 'Surprise';

  return (
    <header className="w-full max-w-md mx-auto pt-3 pb-2 px-3 z-30 select-none">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between mb-1.5">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-lg group text-left"
          title="Return to Welcome Screen"
          aria-label="Return to Welcome Screen"
        >
          <span className="font-extrabold text-sm tracking-wider text-rose-500 flex items-center gap-1 group-hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5 fill-rose-400 text-rose-400" aria-hidden="true" />
            BESTIE.EXE
          </span>
          <span className="text-[10px] font-bold text-rose-400/80 bg-pink-100/70 px-2 py-0.5 rounded-full border border-pink-200/60">
            {currentStep}/{totalSteps}
          </span>
        </button>

        <span className="text-[11px] font-bold text-scrapbook-plum-muted/80 uppercase tracking-wider flex items-center gap-1">
          <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
          {currentChapter}
        </span>
      </div>

      {/* Progress Dots & Bar */}
      <div className="w-full flex items-center gap-1">
        {CHAPTER_NAMES.map((name, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={name}
              className={`
                h-1.5 rounded-full transition-all duration-300 flex-1
                ${
                  isCurrent
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 scale-y-125 shadow-2xs'
                    : isDone
                    ? 'bg-rose-300'
                    : 'bg-pink-100'
                }
              `}
              title={`Step ${stepNum}: ${name}`}
            />
          );
        })}
      </div>
    </header>
  );
};
