import React from 'react';

export default function Badge({ icon: Icon, label, variant = 'default' }) {
  const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
  
  const variants = {
    default: "bg-gray-100 text-gray-700 border border-gray-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dark: "bg-black text-white border border-black",
  };

  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      {Icon && <Icon size={14} strokeWidth={2.5} />}
      <span>{label}</span>
    </div>
  );
}
