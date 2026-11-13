import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const base = "inline-flex items-center font-medium rounded-full transition-colors";
  
  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm"
  };

  const variants = {
    // Brand palettes
    lime: "bg-[#C7E78B] text-[#174D38] border border-[#b1d86d]/40",
    forest: "bg-[#174D38] text-[#F8F6EF]",
    sage: "bg-[#E8EEE6] text-[#202720] border border-[#d2ddd0]",
    cream: "bg-[#F8F6EF] text-[#174D38] border border-[#ECE9DE]",
    
    // Status specific
    available: "bg-[#eaf7d6] text-[#174D38] border border-[#C7E78B]/70 font-semibold",
    requested: "bg-amber-100 text-amber-900 border border-amber-300",
    reserved: "bg-emerald-100 text-emerald-900 border border-emerald-300",
    completed: "bg-[#174D38] text-[#C7E78B] border border-[#174D38]",
    cancelled: "bg-stone-200 text-stone-700 border border-stone-300",
    
    // Verifications & Requests
    pending: "bg-amber-50 text-amber-800 border border-amber-200",
    approved: "bg-emerald-50 text-emerald-800 border border-emerald-300",
    verified: "bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold",
    rejected: "bg-rose-50 text-rose-800 border border-rose-200",
    
    // Default neutral
    default: "bg-[#E8EEE6] text-[#202720]"
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};
