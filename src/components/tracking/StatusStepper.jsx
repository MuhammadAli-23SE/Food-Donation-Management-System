import React from 'react';
import { motion } from 'motion/react';
import { Check, Clock, Truck, HeartHandshake } from 'lucide-react';

export const StatusStepper = ({ currentStatus }) => {
  const steps = [
    { key: 'scheduled', label: 'Reserved & Scheduled', icon: Clock, desc: 'Donation confirmed by kitchen' },
    { key: 'picked_up', label: 'Collected / In Transit', icon: Truck, desc: 'Volunteer collected items' },
    { key: 'distributed', label: 'Nourished Community', icon: HeartHandshake, desc: 'Handed out with proof' }
  ];

  const statusOrder = {
    reserved: 0,
    scheduled: 0,
    picked_up: 1,
    in_transit: 1,
    distributed: 2,
    completed: 2
  };

  const currentIndex = statusOrder[currentStatus] ?? 0;
  const progressPercent = (currentIndex / 2) * 100;

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-3 gap-2 relative">
        {/* Track Line */}
        <div className="absolute top-5 left-10 right-10 h-1.5 bg-[#E8EEE6] rounded-full overflow-hidden -z-0">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="h-full bg-[#174D38] rounded-full"
          />
        </div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center text-center relative z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.12 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors shadow-sm relative ${
                  isDone
                    ? 'bg-[#174D38] text-[#C7E78B]'
                    : isCurrent
                    ? 'bg-[#C7E78B] text-[#174D38] ring-4 ring-[#C7E78B]/40 font-bold shadow-md'
                    : 'bg-[#FDFAF5] text-[#202720]/40 border-2 border-[#E8EEE6]'
                }`}
              >
                {/* Active pulsating beacon */}
                {isCurrent && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#174D38] opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#174D38]"></span>
                  </span>
                )}

                {isDone ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  >
                    <Check className="w-5 h-5 stroke-[3]" />
                  </motion.div>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </motion.div>

              <p
                className={`mt-2.5 text-xs font-bold leading-tight ${
                  isCurrent ? 'text-[#174D38]' : isDone ? 'text-[#174D38]/80' : 'text-[#202720]/50'
                }`}
              >
                {step.label}
              </p>
              <p className="text-[11px] text-[#202720]/60 mt-0.5 hidden sm:block max-w-[130px]">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
