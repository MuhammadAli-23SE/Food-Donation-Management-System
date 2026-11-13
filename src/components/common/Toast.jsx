import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#C7E78B]" />,
    info: <Info className="w-5 h-5 text-[#C7E78B]" />,
    error: <AlertCircle className="w-5 h-5 text-rose-300" />
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-[#174D38] text-[#F8F6EF] rounded-2xl shadow-xl border border-[#216248] animate-in fade-in slide-in-from-top-4 duration-200">
      {icons[toast.type] || icons.info}
      <span className="text-sm font-medium pr-2">{toast.message}</span>
    </div>
  );
};
