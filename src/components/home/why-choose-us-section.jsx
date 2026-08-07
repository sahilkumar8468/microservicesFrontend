'use client';
import { ArrowRight, CheckCircle, ShieldCheck, Clock, Headphones } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Professionals',
    description: 'Every professional is background-checked, skill-verified, and rated by real customers.',
  },
  {
    icon: CheckCircle,
    title: 'Transparent Service',
    description: 'Clear pricing, detailed scope of work, and no hidden charges. Know exactly what to expect.',
  },
  {
    icon: Clock,
    title: 'Easy Booking',
    description: 'Book from your phone in minutes. Choose your time, describe the problem, and you\'re done.',
  },
  {
    icon: Headphones,
    title: 'Support When You Need It',
    description: 'Our customer support team is available to help with any questions or concerns.',
  },
];

export function WhyChooseUsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-brand-600 mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 text-balance">
            Home Services, Done Differently.
          </h2>
          <p className="mt-4 text-lg text-surface-500 max-w-xl mx-auto">
            We&apos;re not just another service provider — we&apos;re building a better way to care for your home.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl border border-surface-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/30 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-100 group-hover:scale-110 transition-all duration-300">
                <feature.icon size={26} className="text-brand-600" />
              </div>
              <h3 className="text-lg font-bold text-surface-900 mb-2">{feature.title}</h3>
              <p className="text-surface-500 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
