import { ShieldCheck, Heart, Target, Eye, Star } from 'lucide-react';
import { Button } from '@/components/button';
import { SectionHeading } from '@/components/section-heading';
import { CTASection } from '@/components/cta-section';

export const metadata = {
  title: 'About Us',
  description: 'We\'re making home services simpler, more reliable, and accessible to everyone in Karachi.',
};

const values = [
  { icon: ShieldCheck, title: 'Trust', desc: 'Every professional is verified, background-checked, and skill-assessed before they can serve you.' },
  { icon: Star, title: 'Quality', desc: 'We hold our professionals to high standards and continuously monitor service quality through customer feedback.' },
  { icon: Heart, title: 'Transparency', desc: 'Clear pricing, detailed scope of work, and no hidden charges. You\'ll always know what to expect.' },
  { icon: Eye, title: 'Convenience', desc: 'Book from your phone in minutes. No calling around, no waiting, no hassle.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-surface-50 to-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-sm font-semibold tracking-wider uppercase text-brand-600 mb-3">
                About HomeSolution
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 text-balance leading-[1.15]">
                We&apos;re Making Home Services Simpler.
              </h1>
              <p className="mt-4 text-lg text-surface-500 max-w-xl leading-relaxed">
                Finding reliable professionals for home repairs and improvements shouldn&apos;t be difficult. We built HomeSolution to change that — one booking at a time.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4">
                    <Target size={36} className="text-brand-600" />
                  </div>
                  <p className="text-2xl font-bold text-surface-900">Our Mission</p>
                  <p className="text-surface-500 mt-2">Make reliable home services accessible and convenient for everyone.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem + Solution */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-surface-50 border border-surface-200">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                <span className="text-2xl">😟</span>
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-3">The Problem</h3>
              <p className="text-surface-600 leading-relaxed">
                Finding trustworthy professionals can be difficult. You call random numbers, wait hours, get inconsistent pricing, and hope for the best. There&apos;s no transparency, no accountability, and no guarantee of quality.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-brand-50 border border-brand-100">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-surface-900 mb-3">Our Solution</h3>
              <p className="text-surface-600 leading-relaxed">
                One platform for all home repairs, maintenance, and transformation. Verified professionals, transparent pricing, easy booking, and support when you need it. Your home deserves better than guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-surface-50">
        <div className="container-wide">
          <SectionHeading
            subtitle="Our Values"
            title="What We Stand For"
            description="These principles guide every decision we make."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-white border border-surface-200 shadow-sm flex items-center justify-center mx-auto mb-4">
                  <v.icon size={26} className="text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">{v.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-narrow text-center">
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-brand-600 mb-3">
            Our Vision
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-surface-900 text-balance">
            &ldquo;To become Pakistan&apos;s most trusted home services platform.&rdquo;
          </h2>
          <p className="mt-6 text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed">
            We envision a future where every homeowner in Pakistan can access reliable, professional home services with just a few taps — backed by trust, quality, and transparency.
          </p>
        </div>
      </section>

      <CTASection
        title="Want to join our team of professionals?"
        description="We're always looking for skilled, reliable professionals to join our platform."
        primaryHref="/contact"
        primaryLabel="Get in Touch"
        secondaryHref="/services"
        secondaryLabel="Explore Services"
        variant="dark"
      />
    </>
  );
}
