import React, { useState, useRef, useEffect } from 'react';

export default function Slider({ min, max, value, onChange, labelMin, labelMax }) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const percent = ((value - min) / (max - min)) * 100;

  const handleInteract = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newPercent = x / rect.width;
    const newValue = Math.round(newPercent * (max - min) + min);
    onChange(newValue);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) handleInteract(e);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, min, max, onChange]);

  return (
    <div className="w-full select-none pb-6 pt-10">
      <div 
        ref={sliderRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleInteract(e);
        }}
      >
        <div 
          className="absolute h-full bg-black rounded-full" 
          style={{ width: `${percent}%` }}
        />
        
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-black rounded-full shadow cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
          style={{ left: `calc(${percent}% - 10px)` }}
        >
          {/* Bubble */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-black">
            {value}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-3 text-xs font-medium text-gray-500">
        <span>{labelMin || min}</span>
        <span>{labelMax || max}</span>
      </div>
    </div>
  );
}
