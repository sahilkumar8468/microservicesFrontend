import { notFound } from 'next/navigation';
import { ArrowRight, Check, Star, MapPin, Clock } from 'lucide-react';
import { services, serviceIcons, getServiceById } from '@/data/services';
import { Button } from '@/components/button';
import { FAQAccordion } from '@/components/faq-accordion';
import { SectionHeading } from '@/components/section-heading';
import { testimonials } from '@/data/testimonials';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceById(slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.name,
    description: service.description,
  };
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceById(slug);

  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const serviceFAQs = [
    { q: `What ${service.name.toLowerCase()} services do you offer?`, a: `We offer a comprehensive range of ${service.name.toLowerCase()} services including: ${service.microServices.join(', ')}. If you need something specific, feel free to contact us.` },
    { q: 'How do I book this service?', a: 'Simply click the "Book This Service" button, tell us about your problem, upload photos if needed, choose your preferred time, and confirm. A verified professional will be assigned to your job.' },
    { q: 'What are the estimated costs?', a: `You'll receive an upfront, clear estimate after describing the issue or during initial technician inspection before work begins.` },
    { q: 'How long does the service take?', a: 'Service duration varies depending on the specific job. Minor repairs may take 30-60 minutes, while larger projects can take several hours or multiple visits. Your professional will give you a time estimate after assessing the work.' },
  ];

  const relatedTestimonials = testimonials.filter(
    t => t.service.toLowerCase().replace(/\s+/g, '-').includes(service.id.replace(/-/g, '')) || t.service === service.name
  ).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-surface-50 to-white">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            <div className="flex-1">
              <div className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6`}>
                <Icon size={32} className={service.textColor} />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900">
                {service.name} Services in Karachi
              </h1>
              <p className="mt-4 text-lg text-surface-500 max-w-2xl leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/book" size="lg">
                  Book This Service
                  <ArrowRight size={18} />
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Ask a Question
                </Button>
              </div>
            </div>

            {/* Quick info card */}
            <div className="lg:w-80 shrink-0 bg-white rounded-2xl border border-surface-200 shadow-sm p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-brand-600" />
                  <div>
                    <p className="text-sm font-semibold text-surface-900">Service Status</p>
                    <p className="text-emerald-600 font-bold text-sm">● Available for Booking</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-brand-600" />
                  <div>
                    <p className="text-sm font-semibold text-surface-900">Available In</p>
                    <p className="text-surface-600 text-sm">Multiple areas in Karachi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star size={18} className="text-amber-500" />
                  <div>
                    <p className="text-sm font-semibold text-surface-900">Rating</p>
                    <p className="text-surface-600 text-sm">4.8/5 from customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we can help with */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-wide">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-surface-900 mb-8">What We Can Help With</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.microServices.map((ms) => (
                <div key={ms} className="flex items-center gap-3 p-4 rounded-xl bg-surface-50 border border-surface-100 hover:border-brand-200 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <span className="text-surface-700 font-medium">{ms}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works for this service */}
      <section className="py-16 md:py-20 bg-surface-50">
        <div className="container-wide">
          <SectionHeading
            title="How It Works"
            description="Simple steps to get your problem solved."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Tell Us', desc: `Describe your ${service.name.toLowerCase()} problem` },
              { step: '2', title: 'Show Us', desc: 'Upload photos or video of the issue' },
              { step: '3', title: 'Schedule', desc: 'Pick a date and time that works for you' },
              { step: '4', title: 'Relax', desc: 'A professional handles the rest' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {s.step}
                </div>
                <h4 className="font-bold text-surface-900">{s.title}</h4>
                <p className="text-sm text-surface-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      {relatedTestimonials.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container-wide">
            <SectionHeading
              title="Customer Reviews"
              description={`See what customers say about our ${service.name.toLowerCase()} services.`}
            />
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedTestimonials.map((t) => (
                <div key={t.id} className="p-6 rounded-2xl border border-surface-200 bg-surface-50">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-surface-200'} />
                    ))}
                  </div>
                  <p className="text-surface-700 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <p className="mt-3 text-sm font-semibold text-surface-900">{t.name}</p>
                  <p className="text-xs text-surface-500">{t.area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-surface-50">
        <div className="container-narrow">
          <SectionHeading
            title="Frequently Asked Questions"
            description={`Common questions about our ${service.name.toLowerCase()} services.`}
          />
          <FAQAccordion items={serviceFAQs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-brand-600">
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ready to get your {service.name.toLowerCase()} issue solved?
          </h2>
          <p className="mt-2 text-white/80">Book now and a verified professional will take care of it.</p>
          <div className="mt-6">
            <Button href="/book" variant="outlineLight" size="lg">
              Book This Service
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
