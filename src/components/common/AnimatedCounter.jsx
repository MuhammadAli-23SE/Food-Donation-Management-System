import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

export const AnimatedCounter = ({ value, duration = 1.6, prefix = '', suffix = '', className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract numeric part from string like "14,280" or "8.4" or "98.2"
  const rawNumber = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, ''));
  const isDecimal = String(value).includes('.');

  useEffect(() => {
    if (!isInView || isNaN(rawNumber)) {
      return;
    }

    let startTimestamp = null;
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Ease out cubic: 1 - (1 - progress)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (rawNumber - startValue) * easeProgress;

      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(rawNumber);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [isInView, rawNumber, duration]);

  const formatted = isDecimal
    ? displayValue.toFixed(1)
    : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {isInView ? formatted : '0'}
      {suffix}
    </span>
  );
};
