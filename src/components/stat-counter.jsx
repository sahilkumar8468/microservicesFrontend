'use client';
import { useCountUp } from '@/hooks/use-count-up';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function StatCounter({ value, suffix, label, isDecimal = false }) {
  const { ref, isVisible } = useScrollAnimation();
  const { count } = useCountUp(value, 2000, isVisible, isDecimal);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 tracking-tight">
        {isDecimal ? count.toFixed(1) : count.toLocaleString()}
        <span className="text-brand-600">{suffix}</span>
      </div>
      <div className="mt-1 text-sm md:text-base text-surface-500 font-medium">{label}</div>
    </div>
  );
}
