import React from 'react';

/**
 * Reusable Card Container
 */
export default function Card({
  children,
  className = '',
  hoverEffect = false,
  padding = 'p-6',
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 shadow-xs ${
        hoverEffect ? 'hover:border-emerald-300 hover:shadow-md transition-all duration-200' : ''
      } ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
