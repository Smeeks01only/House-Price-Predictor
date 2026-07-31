import React from 'react';
import { Check } from 'lucide-react';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-start justify-between w-full max-w-3xl mx-auto relative px-4">
      {/* Background Line */}
      <div className="absolute top-4 left-10 right-10 h-0.5 bg-gray-200 -z-10" />
      
      {/* Progress Line */}
      <div 
        className="absolute top-4 left-10 h-0.5 bg-black -z-10 transition-all duration-500" 
        style={{ width: `calc(${Math.min(100, Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100))}% - 40px)` }}
      />

      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={step} className="flex flex-col items-center gap-3">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${
                isActive 
                  ? 'bg-black border-black text-white' 
                  : isCompleted 
                    ? 'bg-black border-black text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              {isCompleted ? <Check size={16} strokeWidth={3} /> : stepNum}
            </div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${isActive || isCompleted ? 'text-[#111111]' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
