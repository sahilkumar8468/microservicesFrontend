'use client';
import { MapPin, ArrowRight, Wrench } from 'lucide-react';
import { Button } from '@/components/button';
import { LocationSelector } from '@/components/location-selector';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { locations, locationServices } from '@/data/locations';
import { services, serviceIcons } from '@/data/services';
import { useState } from 'react';

export function LocationServicesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedId, setSelectedId] = useState('dha-6');
  const availableServices = locationServices[selectedId] || [];
  const selectedLocation = locations.find(l => l.id === selectedId);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-surface-50">
      <div className="container-wide">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block text-sm font-semibold tracking-wider uppercase text-brand-600 mb-3">
              Service Areas
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 text-balance">
              Services Available Near You
            </h2>
            <p className="mt-4 text-lg text-surface-500 max-w-xl mx-auto">
              Select your area to see which services are currently available. We&apos;re expanding to more areas soon.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-10">
            <LocationSelector
              selectedId={selectedId}
              onSelect={(loc) => setSelectedId(loc.id)}
            />
          </div>

          <div className="text-center mb-8 px-2">
            <div className="inline-flex items-center flex-wrap justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white border border-surface-200 shadow-sm max-w-full text-xs sm:text-sm">
              <Wrench size={16} className="text-brand-600 shrink-0" />
              <span className="font-semibold text-surface-900">
                {availableServices.length} Service{availableServices.length !== 1 ? 's' : ''} Available
              </span>
              <span className="text-xs sm:text-sm text-surface-500 truncate max-w-[150px] sm:max-w-xs">
                in {selectedLocation?.name || 'your area'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
            {services.map((service) => {
              const isAvailable = availableServices.includes(service.id);
              const Icon = serviceIcons[service.icon];
              return (
                <div
                  key={service.id}
                  className={`relative group rounded-xl p-3 sm:p-4 text-center transition-all duration-300 ${
                    isAvailable
                      ? 'bg-white border border-surface-200 hover:border-brand-200 hover:shadow-md cursor-pointer'
                      : 'bg-surface-100/50 border border-surface-200/50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-10 h-10 mx-auto rounded-xl ${service.bgColor} flex items-center justify-center mb-2 ${isAvailable ? 'group-hover:scale-110 transition-transform' : ''}`}>
                    <Icon size={18} className={service.textColor} />
                  </div>
                  <p className={`text-sm font-semibold ${isAvailable ? 'text-surface-900' : 'text-surface-400'}`}>
                    {service.name}
                  </p>
                  {!isAvailable && (
                    <span className="block text-[10px] text-surface-400 mt-0.5">Coming soon</span>
                  )}
                  {isAvailable && (
                    <span className="block text-[10px] text-brand-600 font-medium mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      Available
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {availableServices.length < services.length && (
            <div className="mt-8 text-center">
              <p className="text-sm text-surface-500 mb-3">
                Some services may have limited availability in your area.
              </p>
              <Button href="/book" size="md">
                Check Availability
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
