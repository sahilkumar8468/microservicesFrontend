'use client';
import Link from 'next/link';
import { ArrowRight, Check, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/button';
import { LocationSelector } from '@/components/location-selector';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_30%,transparent_70%)]" />

      <div ref={ref} className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-full text-sm font-medium text-brand-700 mb-6">
              <ShieldCheck size={16} />
              Trusted Home Services in Karachi
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-surface-900 text-balance leading-[1.1]">
              Your Home.
              <br />
              Every Problem.
              <br />
              <span className="text-brand-600">One Solution.</span>
            </h1>

            <p className="mt-6 text-lg text-surface-500 max-w-xl text-balance leading-relaxed">
              From plumbing and electrical repairs to home decoration and furniture transformation — book trusted professionals at your convenience.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/book" size="lg">
                Book a Service
                <ArrowRight size={18} />
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Explore Services
              </Button>
            </div>

            {/* Location Selector */}
            <div className="mt-8 max-w-sm">
              <LocationSelector />
            </div>
          </div>

          {/* Right visual */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Main visual */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-50 via-brand-100 to-surface-100 border border-surface-200 shadow-lg">
              {/* Decorative home illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4">
                    <div className="text-4xl">🏠</div>
                  </div>
                  <div className="w-16 h-1 bg-brand-600 rounded-full mx-auto mb-3" />
                  <p className="text-sm text-surface-500 font-medium">Professional Home Services</p>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg border border-surface-200 px-4 py-3 flex items-center gap-2 animate-float">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check size={16} className="text-green-600" />
                </div>
                <span className="text-sm font-semibold text-surface-900">Verified Professional</span>
              </div>

              <div className="absolute bottom-20 left-4 bg-white rounded-xl shadow-lg border border-surface-200 px-4 py-3 flex items-center gap-2 animate-float-delayed">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-surface-900">4.8 Rating</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg border border-surface-200 px-4 py-3 animate-float">
                <div className="text-lg font-bold text-brand-600">2,500+</div>
                <div className="text-xs text-surface-500">Services Completed</div>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[radial-gradient(circle,#2563eb_1.5px,transparent_1.5px)] bg-[size:12px_12px] opacity-20" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 3.5s ease-in-out 1s infinite; }
      `}</style>
    </section>
  );
}
