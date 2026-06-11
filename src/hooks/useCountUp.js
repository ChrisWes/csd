import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration = 1400, start = 0, shouldStart = false) {
  const [value, setValue] = useState(start);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasRun.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(end);
      return;
    }

    hasRun.current = true;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [shouldStart, end, duration, start]);

  return value;
}
