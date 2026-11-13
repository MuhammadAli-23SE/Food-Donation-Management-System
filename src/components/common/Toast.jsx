import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toast } = useApp();

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#C7E78B]" />,
    info: <Info className="w-5 h-5 text-[#C7E78B]" />,
    error: <AlertCircle className="w-5 h-5 text-rose-300" />
  };

  return (
    <div className="fixed top-5 right-5 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="pointer-events-auto relative overflow-hidden flex items-center gap-3 px-4 py-3.5 bg-[#174D38] text-[#F8F6EF] rounded-2xl shadow-2xl border border-[#216248] backdrop-blur-md"
          >
            <div className="shrink-0">{icons[toast.type] || icons.info}</div>
            <span className="text-xs font-semibold pr-2 leading-snug">{toast.message}</span>

            {/* Subtle duration progress bar at the bottom */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
              className="absolute bottom-0 left-0 h-0.5 bg-[#C7E78B]/70"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
