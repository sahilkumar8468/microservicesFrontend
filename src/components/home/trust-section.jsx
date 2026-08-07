'use client';
import { StatCounter } from '@/components/stat-counter';
import { trustStats } from '@/data/stats';

export function TrustSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-surface-200">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {trustStats.map((stat) => (
            <StatCounter
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isDecimal={stat.isDecimal}
            />
          ))}
        </div>
        <p className="text-center text-xs text-surface-400 mt-8">
          * Demo statistics — real business data will be connected
        </p>
      </div>
    </section>
  );
}
