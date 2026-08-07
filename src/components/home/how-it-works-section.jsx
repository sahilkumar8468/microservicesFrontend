'use client';
import { Search, Camera, Calendar, CheckCircle } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Choose a Service',
    description: 'Tell us what you need — browse our services or describe your problem.',
    color: 'bg-brand-50 text-brand-600',
  },
  {
    number: '02',
    icon: Camera,
    title: 'Show Us the Problem',
    description: 'Upload photos or a short video so we understand exactly what needs fixing.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    number: '03',
    icon: Calendar,
    title: 'Pick a Time',
    description: 'Choose your preferred date and time slot that works for you.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Get It Done',
    description: 'A verified professional arrives and handles the job. Simple as that.',
    color: 'bg-purple-50 text-purple-600',
  },
];

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container-wide">
        <SectionHeading
          subtitle="How It Works"
          title="Home Services Made Simple"
          description="Four easy steps from problem to solution."
        />

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {steps.map((step, i) => (
            <div key={step.number} className="relative group">
              <div className="text-6xl font-bold text-surface-100 mb-[-2rem] ml-[-0.25rem] select-none">
                {step.number}
              </div>
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-2">{step.title}</h3>
                <p className="text-surface-500 leading-relaxed">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8">
                  <svg viewBox="0 0 24 24" fill="none" className="text-surface-300">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
