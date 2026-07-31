import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Dropdown({ value, onChange, options, placeholder = "Select an option" }) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-gray-300 text-[#111111] py-3.5 pl-4 pr-10 rounded-lg shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
      >
        <option value="" disabled className="text-gray-400">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
        <ChevronDown size={18} />
      </div>
    </div>
  );
}
