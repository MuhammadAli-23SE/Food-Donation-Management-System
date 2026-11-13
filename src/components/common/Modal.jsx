import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { modalBackdropVariants, modalDialogVariants } from '../../utils/motion';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg'
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            variants={modalBackdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-[#202720]/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Dialog */}
          <motion.div
            variants={shouldReduceMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } } : modalDialogVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`relative w-full ${maxWidth} bg-[#FDFAF5] rounded-3xl shadow-2xl border border-[#E8EEE6] p-6 sm:p-8 z-10 text-left`}
          >
            <div className="flex items-start justify-between pb-4 border-b border-[#E8EEE6]">
              <div>
                <h3 className="text-xl font-bold text-[#174D38] font-display">{title}</h3>
                {subtitle && <p className="text-xs text-[#202720]/70 mt-1">{subtitle}</p>}
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-full text-[#202720]/60 hover:text-[#174D38] hover:bg-[#E8EEE6] transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="mt-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
