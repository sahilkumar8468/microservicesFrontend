'use client';
import { useCountUp } from '@/hooks/use-count-up';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function StatCounter({ value, suffix, label, isDecimal = false, icon: Icon }) {
  const { ref, isVisible } = useScrollAnimation();
  const { count } = useCountUp(value, 2000, isVisible, isDecimal);

  return (
    <div
      ref={ref}
      className="text-center p-6 sm:p-7 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-orange-500/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center group"
    >
      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Icon size={24} className="text-orange-400" />
        </div>
      )}
      <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
        {isDecimal ? count.toFixed(1) : count.toLocaleString()}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 ml-0.5">{suffix}</span>
      </div>
      <div className="mt-2 text-xs sm:text-sm font-bold text-surface-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}
