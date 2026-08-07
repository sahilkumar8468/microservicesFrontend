'use client';
import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration = 2000, startCounting = false, isDecimal = false) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startCounting || hasStarted) return;
    setHasStarted(true);

    let startTime = null;
    const startValue = 0;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (end - startValue) * eased;

      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }

    requestAnimationFrame(animate);
  }, [startCounting, end, duration, hasStarted, isDecimal]);

  return { count, ref };
}
