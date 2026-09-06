import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { services, serviceIcons } from '@/data/services';
import { ServiceSearch } from '@/components/home/service-search';
import { Button } from '@/components/button';
import { SectionHeading } from '@/components/section-heading';

export const metadata = {
  title: 'Services',
  description: 'Browse all home services — plumbing, electrical, AC repair, carpentry, handyman, water tank cleaning, home decoration, and furniture transformation.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-surface-50 to-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-semibold tracking-wider uppercase text-brand-600 mb-3">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-surface-900 text-balance">
              Find the Right Service for Your Home
            </h1>
            <p className="mt-4 text-lg text-surface-500 max-w-xl mx-auto">
              From emergency repairs to home transformations — we have the right professional for every job.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <ServiceSearch />

      {/* All Services */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group p-4 sm:p-6 md:p-8 rounded-2xl border border-surface-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/30 transition-all duration-300 bg-white"
                >
                  <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-5">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${service.bgColor} flex items-center justify-center shrink-0 group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${service.textColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold text-surface-900 group-hover:text-brand-600 transition-colors truncate">
                        {service.name}
                      </h2>
                      <p className="text-surface-500 mt-1 text-xs sm:text-sm leading-relaxed">{service.description}</p>

                      {/* Micro services */}
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
                        {service.microServices.slice(0, 4).map((ms) => (
                          <span key={ms} className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-surface-100 text-surface-600 font-medium">
                            {ms}
                          </span>
                        ))}
                        {service.microServices.length > 4 && (
                          <span className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-surface-100 text-surface-400">
                            +{service.microServices.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-surface-100 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] sm:text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-emerald-100">
                          ● Verified Partner
                        </span>
                        <span className={`text-xs sm:text-sm font-bold ${service.textColor} flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
                          View Services <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-600">
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Not sure which service you need?</h2>
          <p className="mt-2 text-white/80">Describe your problem and we&apos;ll help you find the right professional.</p>
          <div className="mt-6">
            <Button href="/book" variant="outlineLight" size="lg">
              Book a Service
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
