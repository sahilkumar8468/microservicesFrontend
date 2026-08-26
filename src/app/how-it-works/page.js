'use client';

import { Wrench, FileText, Camera, MapPin, Calendar, CheckCircle, ArrowRight, Star, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import { CTASection } from '@/components/cta-section';
import { siteConfig } from '@/data/site-config';

const steps = [
  {
    number: '01',
    icon: Wrench,
    title: 'Choose Your Service',
    description: 'Browse our wide range of home services — plumbing, electrical, AC repair, carpentry, and more. Select the one that matches your need.',
    color: 'bg-brand-50 text-brand-600',
    detail: 'Each service page shows the full list of micro-services included, starting prices, and what to expect.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Describe the Problem',
    description: 'Tell us what\'s wrong. Choose from common problem types or write your own description so our professional arrives prepared.',
    color: 'bg-amber-50 text-amber-600',
    detail: 'The more detail you provide, the better we can prepare — right tools, right parts, right from the start.',
  },
  {
    number: '03',
    icon: Camera,
    title: 'Upload Photos (Optional)',
    description: 'Snap a photo or record a short video of the issue. This helps our team assess the problem before arriving.',
    color: 'bg-emerald-50 text-emerald-600',
    detail: 'Visuals help us give a more accurate estimate and ensure the right specialist is assigned to your job.',
  },
  {
    number: '04',
    icon: MapPin,
    title: 'Select Your Location',
    description: 'Choose your area in Karachi so we can match you with the nearest available professional.',
    color: 'bg-rose-50 text-rose-600',
    detail: 'We currently serve 13+ areas across Karachi including DHA, Clifton, Gulshan, Nazimabad, and more.',
  },
  {
    number: '05',
    icon: Calendar,
    title: 'Pick a Time Slot',
    description: 'Choose a convenient date and time. Same-day slots are often available for urgent needs.',
    color: 'bg-purple-50 text-purple-600',
    detail: 'Time slots from 9 AM to 7 PM, Monday through Saturday. Reschedule anytime up to 2 hours before.',
  },
  {
    number: '06',
    icon: CheckCircle,
    title: 'Confirm & Relax',
    description: 'Review your booking details, confirm, and you\'re done! Our professional arrives at your doorstep on time.',
    color: 'bg-cyan-50 text-cyan-600',
    detail: 'You\'ll receive a confirmation with professional details and real-time tracking once they\'re on the way.',
  },
];

const perks = [
  { icon: Shield, title: 'Verified Pros', description: 'Every professional is background-checked and skill-verified' },
  { icon: Clock, title: 'On-Time Promise', description: 'We arrive within the scheduled window — or your next service is free' },
  { icon: Star, title: 'Satisfaction Guaranteed', description: 'Not happy? We\'ll make it right at no extra cost' },
];

export default function HowItWorksPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-surface-50 via-white to-brand-50/30 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        {/* Decorative circles */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-6">
            <ArrowRight className="h-4 w-4" />
            Simple 6-Step Process
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 tracking-tight">
            How It <span className="text-brand-600">Works</span>
          </h1>
          <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
            From booking to doorstep — your home solution is just 6 simple steps away. No hassle, no hidden charges.
          </p>
        </div>
      </section>

      {/* Steps Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-surface-200 hidden md:block" />

            <div className="space-y-12 md:space-y-0">
              {steps.map((step, index) => (
                <div key={step.number} className="relative md:pl-20 pb-12 md:pb-16 last:pb-0">
                  {/* Step Number Circle */}
                  <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 rounded-2xl bg-white border-2 border-surface-200 items-center justify-center shadow-sm z-10">
                    <span className="text-lg font-bold text-surface-400">{step.number}</span>
                  </div>

                  <div className="flex gap-5">
                    {/* Mobile Number */}
                    <div className="md:hidden flex-shrink-0 w-16 h-16 rounded-2xl bg-white border-2 border-surface-200 flex items-center justify-center shadow-sm">
                      <span className="text-lg font-bold text-surface-400">{step.number}</span>
                    </div>

                    <div className="flex-1">
                      <div className={`inline-flex items-center gap-3 rounded-xl ${step.color} px-4 py-2 mb-4`}>
                        <step.icon className="h-5 w-5" />
                        <span className="font-semibold text-sm">{step.title}</span>
                      </div>
                      <p className="text-surface-500 leading-relaxed text-lg">{step.description}</p>
                      <p className="mt-3 text-sm text-surface-400 italic">{step.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-4 text-white font-semibold hover:bg-brand-700 active:scale-[0.98] transition-all shadow-lg shadow-brand-200 text-lg"
            >
              Start Your Booking
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">Why Book With Us</h2>
            <p className="mt-3 text-surface-500 text-lg">Three promises we make to every customer</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {perks.map((perk) => (
              <div key={perk.title} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-surface-200 flex items-center justify-center mx-auto mb-5 group-hover:border-brand-200 group-hover:shadow-lg group-hover:shadow-brand-100/50 transition-all">
                  <perk.icon className="h-7 w-7 text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">{perk.title}</h3>
                <p className="text-surface-500 text-sm leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Link */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-surface-900 mb-3">Still Have Questions?</h2>
          <p className="text-surface-500 mb-8">Check our FAQ for answers to common questions about our services.</p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-surface-200 px-6 py-3 text-surface-700 font-semibold hover:border-brand-200 hover:text-brand-600 transition-all"
          >
            Visit FAQ Page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <CTASection
        variant="brand"
        title="Ready to Get Started?"
        description="Book your first service in under 2 minutes. Your home deserves the best."
        primaryButton={{ label: 'Book Now', href: '/book', icon: 'Wrench' }}
        secondaryButton={{ label: 'Call Us', href: `tel:${siteConfig.contact.phone}`, icon: 'Phone' }}
      />
    </main>
  );
}
