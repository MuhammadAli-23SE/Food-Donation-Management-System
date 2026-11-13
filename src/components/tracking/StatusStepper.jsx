import React from 'react';
import { Check, Clock, Truck, HeartHandshake, MapPin } from 'lucide-react';

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

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-3 gap-2 relative">
        {/* Connecting Line */}
        <div className="absolute top-5 left-12 right-12 h-1 bg-[#E8EEE6] -z-0">
          <div
            className="h-full bg-[#174D38] transition-all duration-500"
            style={{ width: `${(currentIndex / 2) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                  isDone
                    ? 'bg-[#174D38] text-[#C7E78B]'
                    : isCurrent
                    ? 'bg-[#C7E78B] text-[#174D38] ring-4 ring-[#C7E78B]/30 font-bold scale-110'
                    : 'bg-[#FDFAF5] text-[#202720]/40 border-2 border-[#E8EEE6]'
                }`}
              >
                {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-5 h-5" />}
              </div>

              <p
                className={`mt-2.5 text-xs font-bold leading-tight ${
                  isCurrent ? 'text-[#174D38]' : isDone ? 'text-[#174D38]/80' : 'text-[#202720]/40'
                }`}
              >
                {step.label}
              </p>
              <p className="text-[11px] text-[#202720]/60 mt-0.5 hidden sm:block max-w-[120px]">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
