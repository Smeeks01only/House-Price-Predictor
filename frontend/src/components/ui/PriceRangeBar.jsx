import React from 'react';

export default function PriceRangeBar({ low, predicted, high }) {
  // Calculate position percentage and clamp between 0 and 100
  let rawPercentage = ((predicted - low) / (high - low)) * 100;
  const percentage = Math.max(0, Math.min(100, rawPercentage));

  // We'll place the predicted value dead center visually for this component design
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
        <span>Low: {low}</span>
        <span className="text-[#111111] bg-gray-100 px-3 py-1 rounded-full text-[10px]">Predicted</span>
        <span>High: {high}</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full w-full">
        {/* Center emphasis mark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-4 border-white rounded-full shadow-sm z-10" />
        
        {/* Gradient fill */}
        <div className="absolute h-full w-full bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 rounded-full opacity-50" />
        <div className="absolute h-full w-1/2 left-1/4 bg-black rounded-full" />
      </div>
      <div className="text-center mt-4">
        <span className="text-2xl font-extrabold tracking-tight text-[#111111]">{predicted}</span>
      </div>
    </div>
  );
}
