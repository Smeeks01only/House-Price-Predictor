import React from 'react';

export default function FeatureTile({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-4 text-left">
      <div className="p-3 bg-gray-50 border border-gray-100 rounded-full flex-shrink-0">
        <Icon size={24} className="text-[#111111]" strokeWidth={2} />
      </div>
      <div>
        <h4 className="font-bold text-[#111111] mb-1">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}
