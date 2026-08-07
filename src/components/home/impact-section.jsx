'use client';
import { StatCounter } from '@/components/stat-counter';
import { impactStats } from '@/data/stats';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function ImpactSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-surface-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)]" />

      <div className="container-wide relative">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-brand-400 mb-3">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance">
            Helping Homes Run Better
          </h2>
          <p className="mt-4 text-lg text-surface-400 max-w-xl mx-auto">
            Every day, we help homeowners solve problems and improve their living spaces.
          </p>
        </div>

        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {impactStats.map((stat) => (
            <div key={stat.id} className="text-center group">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {stat.isDecimal ? (
                  <>
                    <StatCounter value={stat.value} suffix={stat.suffix} label="" isDecimal />
                  </>
                ) : (
                  <>
                    <StatCounter value={stat.value} suffix={stat.suffix} label="" />
                  </>
                )}
              </div>
              <div className="mt-1 text-sm md:text-base text-surface-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-surface-600 mt-10">
          * Demo statistics — real business data will be connected
        </p>
      </div>
    </section>
  );
}
