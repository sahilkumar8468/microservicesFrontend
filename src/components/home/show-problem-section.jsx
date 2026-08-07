'use client';
import { Camera, Video, FileText } from 'lucide-react';
import { Button } from '@/components/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function ShowProblemSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-surface-900 text-white overflow-hidden">
      <div ref={ref} className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-sm font-semibold tracking-wider uppercase text-brand-400 mb-3 block">
              Unique Feature
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance leading-[1.15]">
              Not Sure What the Problem Is?
            </h2>
            <p className="mt-4 text-lg text-surface-400 max-w-lg leading-relaxed">
              Don&apos;t worry. Show us what you&apos;re dealing with and our team can review it. No technical knowledge needed.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Camera, text: 'Upload Photos', desc: 'Snap a picture of the problem' },
                { icon: Video, text: 'Upload Video', desc: 'Record a short video walkthrough' },
                { icon: FileText, text: 'Describe the Problem', desc: 'Tell us in your own words' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-brand-600/20 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-brand-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{item.text}</div>
                    <div className="text-sm text-surface-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button href="/book" variant="outlineLight" size="lg">
                Request an Assessment
              </Button>
            </div>
          </div>

          {/* Right visual */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative mx-auto max-w-sm">
              {/* Phone mockup */}
              <div className="relative rounded-[2.5rem] border-4 border-surface-700 bg-surface-800 p-3 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-surface-700 rounded-b-2xl" />
                <div className="aspect-[9/16] rounded-[1.75rem] bg-gradient-to-b from-brand-50 to-brand-100 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4">
                    <Camera size={28} className="text-brand-600" />
                  </div>
                  <div className="w-12 h-1.5 bg-brand-600 rounded-full mb-3" />
                  <p className="text-sm font-medium text-surface-700">Upload photo or video</p>
                  <p className="text-xs text-surface-500 mt-1">We&apos;ll review & respond</p>
                  <div className="mt-4 w-full h-1.5 bg-brand-200 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-brand-600 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating element */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-surface-200">
                <div className="text-sm font-semibold text-surface-900">✓ Problem Identified</div>
                <div className="text-xs text-surface-500">Assessment in progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
