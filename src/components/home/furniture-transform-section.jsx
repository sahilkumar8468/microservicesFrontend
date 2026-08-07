'use client';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/button';
import { BeforeAfterSlider } from '@/components/before-after-slider';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function FurnitureTransformSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-surface-50">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left visual */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BeforeAfterSlider beforeLabel="Old Sofa" afterLabel="Modern Sofa" />
          </div>

          {/* Right content */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-sm font-semibold tracking-wider uppercase text-rose-600 mb-3 block">
              Featured Service
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 text-balance leading-[1.15]">
              Don&apos;t Replace It.
              <br />
              <span className="text-rose-600">Transform It.</span>
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-lg leading-relaxed">
              Give your old furniture a completely new life. Our skilled craftsmen restore, redesign, and transform your beloved pieces into something beautiful.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                'Sofa Upholstery',
                'Wardrobe Redesign',
                'Table Refinishing',
                'Cabinet Transformation',
                'Antique Restoration',
                'Custom Modifications',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-surface-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button href="/services/furniture-transformation" size="lg">
                Transform My Furniture
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
