import React from 'react';

export default function Input({ type = "text", value, onChange, placeholder, icon: Icon }) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full appearance-none bg-white border border-gray-300 text-[#111111] py-3.5 ${Icon ? 'pl-11' : 'pl-4'} pr-4 rounded-lg shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors`}
      />
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
          <Icon size={18} />
        </div>
      )}
    </div>
  );
}
