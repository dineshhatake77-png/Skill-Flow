import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Pause, SkipForward, X, Sparkles } from 'lucide-react';

export const DemoTour: React.FC = () => {
  const { 
    demoState, 
    stopDemoMode, 
    nextDemoStep, 
    togglePauseDemo 
  } = useApp();

  if (!demoState.isActive) return null;

  const progressPercent = Math.round((demoState.step / demoState.totalSteps) * 100);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl bg-white dark:bg-zinc-900 border-2 border-black dark:border-white rounded-2xl shadow-2xl p-4 backdrop-blur-xl animate-in slide-in-from-bottom duration-300 text-black dark:text-white">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-3 border border-black dark:border-zinc-700">
        <div 
          className="h-full bg-black dark:bg-white transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Step Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black text-black dark:text-white uppercase tracking-wider">
                Hackathon Tour • Step {demoState.step} / {demoState.totalSteps}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-black border border-black dark:border-white">
                Live Interactive Mode
              </span>
            </div>
            <p className="text-xs text-black dark:text-white font-extrabold mt-0.5 max-w-md line-clamp-1">
              {demoState.currentStepMessage}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={togglePauseDemo}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-2 border-black dark:border-zinc-600 text-black dark:text-white transition-colors"
            title={demoState.isPaused ? 'Resume Tour' : 'Pause Tour'}
          >
            {demoState.isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
          </button>
          
          <button
            onClick={nextDemoStep}
            className="px-3.5 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white text-xs font-black flex items-center gap-1.5 shadow-md transition-all"
          >
            <span>Next Step</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={stopDemoMode}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-2 border-black dark:border-zinc-600 text-black dark:text-white transition-colors"
            title="Exit Demo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

