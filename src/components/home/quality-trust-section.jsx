'use client';
import { ShieldCheck, Star, MapPin, Smartphone, Headphones, Camera } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const trustItems = [
  { icon: ShieldCheck, title: 'Verified Professionals', desc: 'Background-checked and skill-assessed' },
  { icon: Star, title: 'Customer Reviews', desc: 'Real ratings from real customers' },
  { icon: MapPin, title: 'Service Tracking', desc: 'Know when your professional is arriving' },
  { icon: Smartphone, title: 'Digital Booking', desc: 'Book and manage from your phone' },
  { icon: Headphones, title: 'Support', desc: 'Help when you need it' },
  { icon: Camera, title: 'Before & After Verification', desc: 'See the work that was done' },
];

export function QualityTrustSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 md:py-28 bg-surface-50 overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Trust list */}
          <div className={`flex flex-col items-center text-center lg:items-start lg:text-left transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-brand-600 mb-2.5 sm:mb-3 block text-center lg:text-left mx-auto lg:mx-0">
              Quality & Trust
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 text-balance leading-[1.18] sm:leading-[1.15] text-center lg:text-left">
              Trusted by Homeowners Across Karachi
            </h2>
            <p className="mt-4 text-sm sm:text-lg text-surface-500 leading-relaxed text-center lg:text-left mx-auto lg:mx-0 max-w-lg">
              We take quality seriously. Every aspect of our service is designed to give you peace of mind.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3 w-full text-left">
              {trustItems.map((item) => (
                <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-surface-200 hover:border-brand-200 hover:shadow-sm transition-all">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900">{item.title}</p>
                    <p className="text-xs text-surface-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative aspect-[3/4] max-w-sm mx-auto">
              {/* Main visual card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-6">
                    <ShieldCheck size={36} className="text-brand-600" />
                  </div>
                  <div className="w-8 h-1 bg-brand-600 rounded-full mb-4" />
                  <p className="text-xl font-bold text-surface-900">Quality Assured</p>
                  <p className="text-sm text-surface-500 mt-2">Every professional is verified, trained, and rated</p>

                  <div className="mt-6 space-y-3 w-full">
                    <div className="flex items-center gap-2 bg-white/80 rounded-lg px-4 py-2.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium text-surface-700">Identity Verified</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 rounded-lg px-4 py-2.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium text-surface-700">Skills Assessed</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 rounded-lg px-4 py-2.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium text-surface-700">Background Checked</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-16 h-16 bg-brand-600/10 rounded-2xl -z-10" />
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-24 h-24 bg-brand-600/5 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
