'use client';
import { Check } from 'lucide-react';

export function BookingStepper({ steps, currentStep }) {
  return (
    <div className="w-full">
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isCompleted
                      ? 'bg-brand-600 text-white'
                      : isCurrent
                      ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                      : 'bg-surface-100 text-surface-400'
                  }`}
                >
                  {isCompleted ? <Check size={18} /> : step.id}
                </div>
                <span
                  className={`mt-2 text-xs font-medium whitespace-nowrap ${
                    isCurrent ? 'text-brand-600' : isCompleted ? 'text-surface-700' : 'text-surface-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 mx-2 mt-[-20px]">
                  <div
                    className={`h-0.5 rounded-full transition-colors ${
                      i < currentStep ? 'bg-brand-600' : 'bg-surface-200'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile stepper */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-surface-500">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-semibold text-brand-600">
            {steps[currentStep]?.label}
          </span>
        </div>
        <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-600 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
