'use client';
import { StatCounter } from '@/components/stat-counter';
import { impactStats } from '@/data/stats';
import { Shield, Sparkles, Building2, CheckCircle2, Star, ThumbsUp } from 'lucide-react';

const statIcons = [Building2, CheckCircle2, ThumbsUp, Star];

export function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-surface-950 via-slate-950 to-slate-900 border-y border-orange-500/20 text-white relative overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-600/10 blur-[150px] pointer-events-none" />

      <div className="container-wide relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-extrabold tracking-wider uppercase text-orange-400 mb-4 shadow-inner">
            <Sparkles size={14} className="animate-spin text-orange-400" />
            Verified Customer Impact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance leading-tight">
            Helping Homes <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">Run Better</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-surface-400 font-medium leading-relaxed">
            Every day, we help homeowners solve problems, fix emergencies, and transform their living spaces across Karachi.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {impactStats.map((stat, idx) => {
            const Icon = statIcons[idx] || Shield;
            return (
              <StatCounter
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                isDecimal={stat.isDecimal}
                icon={Icon}
              />
            );
          })}
        </div>

        <p className="text-center text-xs text-surface-400 mt-10 font-mono font-medium">
          * Demo statistics — real business data will be connected
        </p>
      </div>
    </section>
  );
}
