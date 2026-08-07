'use client';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/button';
import { BeforeAfterSlider } from '@/components/before-after-slider';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { beforeAfterProjects } from '@/data/projects';

export function BeforeAfterShowcaseSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-brand-600 mb-3">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 text-balance">
            Real Problems. Real Transformations.
          </h2>
          <p className="mt-4 text-lg text-surface-500 max-w-xl mx-auto">
            See how we&apos;ve helped homeowners transform their spaces with professional services.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {beforeAfterProjects.slice(0, 3).map((project) => (
            <div key={project.id} className="group rounded-2xl border border-surface-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              <BeforeAfterSlider beforeLabel="Before" afterLabel="After" />
              <div className="p-5">
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">{project.service}</span>
                <h3 className="text-lg font-bold text-surface-900 mt-1">{project.title}</h3>
                <p className="text-sm text-surface-500 mt-1 line-clamp-2">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button href="/services/furniture-transformation" variant="outline" size="md">
            View More Projects
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
