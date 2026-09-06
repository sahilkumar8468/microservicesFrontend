'use client';
import { useState, useEffect } from 'react';
import { Camera, Video, FileText, CheckCircle2, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const animatedStates = [
  {
    step: 'Step 1 of 3',
    title: '📸 Photo & Video Upload',
    subtitle: 'AI Diagnostic Scanner Active',
    badge: 'Scanning Leak / Damage...',
    progress: '35%',
    icon: Camera,
    color: 'from-blue-600 to-indigo-600',
    statusBg: 'bg-blue-500/20 text-blue-300 border-blue-400/30'
  },
  {
    step: 'Step 2 of 3',
    title: '⚡ Instant Diagnosis',
    subtitle: 'Microservice Partner Matching',
    badge: 'Evaluating Solution Cost...',
    progress: '70%',
    icon: Sparkles,
    color: 'from-amber-600 to-orange-600',
    statusBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
  },
  {
    step: 'Step 3 of 3',
    title: '✅ Technician Dispatched',
    subtitle: 'Verified Arrival Scheduled',
    badge: 'Worker Arriving in 15 Mins',
    progress: '100%',
    icon: CheckCircle2,
    color: 'from-emerald-600 to-teal-600',
    statusBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
  }
];

export function ShowProblemSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  // Continuous animation loop for mobile screen mockup
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % animatedStates.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const currentState = animatedStates[activeStepIdx];
  const StepIcon = currentState.icon;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-surface-950 via-slate-950 to-surface-900 text-white overflow-hidden overflow-x-clip relative">
      {/* Background glowing halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[140px] pointer-events-none" />

      <div ref={ref} className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left content */}
          <div className={`flex flex-col items-center text-center lg:items-start lg:text-left transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="inline-flex items-center justify-center flex-wrap gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[11px] sm:text-xs font-extrabold tracking-wider uppercase text-orange-400 mb-4 shadow-inner max-w-full mx-auto lg:mx-0">
              <Sparkles size={14} className="animate-spin text-orange-400 shrink-0" />
              Smart Assessment
            </span>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance leading-[1.18] sm:leading-[1.15] text-center lg:text-left">
              Not Sure What the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">Problem Is?</span>
            </h2>
            
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-surface-400 max-w-lg leading-relaxed font-medium text-center lg:text-left mx-auto lg:mx-0">
              Don&apos;t worry! Simply snap a photo or record a quick video walkthrough. Our team identifies the exact issue, sends a price estimate, and dispatches a verified technician with the right tools.
            </p>

            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5 w-full text-left">
              {[
                { icon: Camera, text: 'Snap Photos', desc: 'Capture any leak, noise, or broken fixture' },
                { icon: Video, text: 'Record Video Walkthrough', desc: 'Record a short video to show sound or movement' },
                { icon: FileText, text: 'Describe in Your Own Words', desc: 'Add optional notes so technicians arrive prepared' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:border-brand-500/40 group">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon size={20} className="text-brand-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-white text-sm sm:text-base">{item.text}</div>
                    <div className="text-xs text-surface-400 mt-0.5 font-medium">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 w-full flex justify-center lg:justify-start">
              <Button href="/book" variant="primary" size="lg" className="shadow-lg shadow-brand-600/30 font-bold rounded-xl px-8 w-full sm:w-auto justify-center">
                Request Free Assessment
              </Button>
            </div>
          </div>

          {/* Right visual — Continuous Mobile Animation Loop */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative mx-auto max-w-[280px] sm:max-w-sm px-2 sm:px-0">
              
              {/* Smartphone Frame Mockup */}
              <div className="relative rounded-[2.5rem] sm:rounded-[3rem] border-4 sm:border-[6px] border-surface-700/80 bg-slate-950 p-2.5 sm:p-4 shadow-2xl shadow-brand-500/20 ring-1 ring-white/20">
                {/* Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-6 bg-surface-700 rounded-b-2xl z-30 flex items-center justify-center">
                  <div className="w-8 sm:w-10 h-1 bg-surface-900 rounded-full" />
                </div>

                {/* Mobile Screen Display Container */}
                <div className="aspect-[9/18] rounded-[1.8rem] sm:rounded-[2.2rem] bg-gradient-to-b from-slate-900 via-brand-950 to-slate-950 overflow-hidden flex flex-col justify-between p-4 sm:p-6 relative border border-white/10">
                  
                  {/* Continuous Scanning Laser Beam Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-500/0 via-brand-500/25 to-brand-500/0 animate-scan pointer-events-none z-10" />

                  {/* Header Status Bar */}
                  <div className="flex items-center justify-between pt-3 relative z-20">
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-surface-400">
                      {currentState.step}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold border ${currentState.statusBg}`}>
                      ● LIVE DIAGNOSTIC
                    </span>
                  </div>

                  {/* Center Screen Animated Icon & Ticker */}
                  <div className="my-auto text-center relative z-20 flex flex-col items-center">
                    
                    {/* Animated Pulsing Lens Circle */}
                    <div className="relative mb-3 sm:mb-5">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-teal-500 p-0.5 shadow-xl shadow-brand-500/30 animate-pulse">
                        <div className="w-full h-full bg-slate-950 rounded-[14px] sm:rounded-[22px] flex items-center justify-center">
                          <StepIcon size={28} className="text-white animate-bounce" />
                        </div>
                      </div>
                      <div className="absolute -inset-2 bg-brand-500/20 rounded-full blur-lg animate-ping opacity-30" />
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
                      {currentState.title}
                    </h3>
                    
                    <p className="text-[11px] sm:text-xs text-brand-300 font-semibold mt-1">
                      {currentState.subtitle}
                    </p>

                    <span className="mt-2.5 sm:mt-3 inline-block px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-xl text-[10px] sm:text-xs font-mono text-emerald-400 border border-white/15">
                      {currentState.badge}
                    </span>

                    {/* Continuous Progress Bar Indicator */}
                    <div className="mt-4 sm:mt-6 w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700"
                        style={{ width: currentState.progress }}
                      />
                    </div>
                  </div>

                  {/* Bottom Security Note */}
                  <div className="p-2 sm:p-3 rounded-2xl bg-white/5 border border-white/10 text-center relative z-20">
                    <span className="text-[10px] sm:text-[11px] font-bold text-surface-300 flex items-center justify-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                      100% Free Problem Inspection
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Live Badge Overlays on Mobile Mockup */}
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:-left-4 bg-white rounded-2xl shadow-2xl p-2.5 sm:p-4 border border-surface-200 z-30 animate-float max-w-[180px] sm:max-w-[220px]">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span className="text-[11px] sm:text-xs font-extrabold text-surface-900">Identified</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-surface-500 font-medium leading-tight">
                  Water Pump Capacitor Issue
                </p>
              </div>

              <div className="absolute top-2 sm:-top-2 right-2 sm:-right-4 bg-surface-900 text-white rounded-2xl shadow-2xl px-3 sm:px-4 py-1.5 sm:py-2.5 border border-surface-700 z-30 animate-float-delayed">
                <div className="flex items-center gap-1.5">
                  <RefreshCw size={13} className="text-brand-400 animate-spin shrink-0" />
                  <span className="text-[10px] sm:text-xs font-extrabold">Instant Pro Match</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}
