import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-[#F7F7F8] border border-gray-200 p-8 rounded-2xl shadow-soft ${className}`}>
      {children}
    </div>
  );
}
