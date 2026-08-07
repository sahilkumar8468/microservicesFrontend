'use client';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const categories = [
  { title: 'Living Room', image: null, color: 'from-amber-500/20 to-amber-600/5' },
  { title: 'Bedroom', image: null, color: 'from-blue-500/20 to-blue-600/5' },
  { title: 'TV Wall', image: null, color: 'from-purple-500/20 to-purple-600/5' },
  { title: 'Wall Decoration', image: null, color: 'from-emerald-500/20 to-emerald-600/5' },
  { title: 'Lighting', image: null, color: 'from-yellow-500/20 to-yellow-600/5' },
  { title: 'Custom Projects', image: null, color: 'from-rose-500/20 to-rose-600/5' },
];

export function HomeDecorationSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold tracking-wider uppercase text-purple-600 mb-3 block">
              Home Decoration
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900">
              Give Your Home a New Look.
            </h2>
            <p className="mt-3 text-lg text-surface-500 max-w-xl">
              Professional decoration services to refresh and elevate every room in your home.
            </p>
          </div>
          <Button href="/services/home-decoration" variant="outline" className="shrink-0">
            Explore Home Decoration
            <ArrowRight size={16} />
          </Button>
        </div>

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${cat.color} border border-surface-200 cursor-pointer hover:shadow-lg transition-all duration-300`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">
                    {['🛋️', '🛏️', '📺', '🖼️', '💡', '✨'][i]}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-surface-900">{cat.title}</h3>
                <p className="text-sm text-surface-500 mt-1">
                  {[
                    'Beautiful living spaces',
                    'Cozy and stylish bedrooms',
                    'Entertainment focal points',
                    'Artful wall treatments',
                    'Ambient & accent lighting',
                    'Tailored to your vision',
                  ][i]}
                </p>
              </div>
              <div className="absolute inset-0 bg-surface-900/0 group-hover:bg-surface-900/5 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
