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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-50 via-amber-50 to-rose-50 border border-orange-200/80 rounded-full text-xs font-extrabold text-orange-950 mb-6 shadow-xs">
              <ShieldCheck size={16} className="text-orange-600 animate-pulse" />
              Verified Microservice Partners · Karachi Operating Radius
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-surface-900 text-balance leading-[1.1]">
              Your Home.
              <br />
              Every Problem.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 animate-gradient-x">One Solution.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-surface-600 max-w-xl text-balance leading-relaxed font-medium">
              Book certified plumbing, electrical, AC repair, water tank cleaning, and furniture restoration experts. Verified background checks & upfront pricing.
            </p>

            {/* Quick Category Pills */}
            <div className="mt-6 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-extrabold text-surface-400 uppercase tracking-wider mr-1">Popular:</span>
              {[
                { label: '❄ AC Repair', href: '/services/ac-repair' },
                { label: '🛠 Plumbing', href: '/services/plumbing' },
                { label: '⚡ Electrical', href: '/services/electrical' },
                { label: '🎨 Painting', href: '/services/home-decoration' },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="px-3 py-1 bg-white hover:bg-brand-50 text-surface-700 hover:text-brand-700 border border-surface-200 hover:border-brand-300 rounded-full text-xs font-bold transition-all shadow-xs"
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/book" size="lg" className="shadow-lg shadow-brand-600/30">
                Book a Service
                <ArrowRight size={18} />
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Explore All Services
              </Button>
            </div>

            {/* Location Selector */}
            <div className="mt-8 max-w-sm">
              <LocationSelector />
            </div>
          </div>

          {/* Right visual - Modern High Tech Card Showcase */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-surface-900 via-brand-950 to-slate-900 border border-surface-700/60 shadow-2xl p-6 sm:p-8 flex flex-col justify-between group">
              
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600/30 border border-brand-500/40 text-brand-400 flex items-center justify-center font-bold text-sm shadow-inner">
                    ⚡
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-white uppercase tracking-wider block">Real-Time Dispatch</span>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Active Service Radius: DHA & Clifton
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-[11px] font-bold border border-white/20">
                  Instant Booking
                </span>
              </div>

              {/* Center Interactive Visual Card Grid */}
              <div className="grid grid-cols-2 gap-3 my-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm mb-2">
                    🛠️
                  </div>
                  <p className="text-white font-bold text-sm">Plumbing & AC Repair</p>
                  <p className="text-xs text-slate-300 mt-0.5 font-medium">Verified Technicians</p>
                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-bold">15-Min Response</span>
                    <span className="text-amber-400 font-extrabold">★ 4.9</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-2">
                    ✨
                  </div>
                  <p className="text-white font-bold text-sm">Electrical & Painting</p>
                  <p className="text-xs text-slate-300 mt-0.5 font-medium">Certified Electricians</p>
                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-bold">Verified Professional</span>
                    <span className="text-amber-400 font-extrabold">★ 5.0</span>
                  </div>
                </div>
              </div>

              {/* Floating Live Badge Overlays */}
              <div className="absolute top-16 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-surface-200 px-4 py-3 flex items-center gap-3 animate-float z-20">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Check size={18} />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-surface-900 block">Quality Verified</span>
                  <span className="text-[10px] text-surface-500 font-bold">100% Satisfaction Guaranteed</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-surface-200 px-4 py-3 flex items-center gap-3 animate-float-delayed z-20">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                <div>
                  <span className="text-xs font-extrabold text-surface-900 block">4.9 Star Rating</span>
                  <span className="text-[10px] text-surface-500 font-bold">2,500+ Reviews</span>
                </div>
              </div>

              {/* Ambient Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
            </div>
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
