import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from '../hooks/useCountUp.js';

export default function StatCounter({ value, unit = '%', color = 'text-nt-red', size = 'text-stat' }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const count = useCountUp(value, 1400, 0, inView);

  return (
    <span
      ref={ref}
      className={`${size} font-extrabold ${color} leading-none`}
      aria-label={`${value}${unit}`}
    >
      <span aria-hidden="true">{count}{unit}</span>
      <span className="sr-only">{value}{unit}</span>
    </span>
  );
}
