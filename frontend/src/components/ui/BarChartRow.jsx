import React from 'react';
import { motion } from 'framer-motion';

export default function BarChartRow({ label, percent, delay = 0 }) {
  return (
    <div className="flex items-center gap-4 py-1">
      <div className="w-32 text-sm font-semibold text-[#171717] truncate">{label}</div>
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full bg-black rounded-full"
        />
      </div>
      <div className="w-12 text-sm font-bold text-gray-500 text-right">{percent}%</div>
    </div>
  );
}
