'use client';
import { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { getAllServices } from '@/data/services';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [allServices, setAllServices] = useState(getAllServices([]));

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://micro-services-backend.vercel.app/api';

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/services`);
      if (res.ok) {
        const customData = await res.json();
        setAllServices(getAllServices(customData));
      }
    } catch (e) {
      console.error('Failed to fetch services:', e);
    }
  };

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
          {allServices.map((service) => (
            <ServiceCard key={service.id} service={service} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  );
}
