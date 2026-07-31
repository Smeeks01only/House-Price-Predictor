import React from 'react';
import { motion } from 'framer-motion';

export default function ConfidenceGauge({ percent }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-32 h-32">
        {/* Track */}
        <circle 
          cx="64" cy="64" r={radius} 
          stroke="currentColor" strokeWidth="8" fill="transparent" 
          className="text-gray-100" 
        />
        {/* Fill */}
        <motion.circle 
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="64" cy="64" r={radius} 
          stroke="url(#gradient)" strokeWidth="8" fill="transparent" 
          strokeLinecap="round"
          className="drop-shadow-sm"
          style={{ strokeDasharray: circumference }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" /> {/* emerald-600 */}
            <stop offset="100%" stopColor="#10b981" /> {/* emerald-500 */}
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-extrabold text-[#111111]">{percent}%</span>
      </div>
    </div>
  );
}
