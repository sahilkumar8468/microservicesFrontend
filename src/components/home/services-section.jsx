'use client';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { services } from '@/data/services';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container-wide">
        <SectionHeading
          subtitle="Our Services"
          title="Everything Your Home Needs"
          description="From quick repairs to complete transformations, get reliable help for your home."
        />

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  );
}
