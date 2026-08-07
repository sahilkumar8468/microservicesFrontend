'use client';
import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { searchServices, serviceIcons } from '@/data/services';
import Link from 'next/link';

export function ServiceSearch() {
  const [query, setQuery] = useState('');
  const results = searchServices(query);
  const showResults = query.length >= 2;

  return (
    <section className="py-16 md:py-20 bg-surface-50">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-surface-900">What do you need help with?</h2>
          <p className="mt-2 text-surface-500">Search for your problem and we&apos;ll find the right service.</p>
        </div>

        <div className="relative">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try "tap leaking", "fan not working", "AC not cooling"...'
              className="w-full pl-12 pr-4 py-4 text-base bg-white border border-surface-200 rounded-2xl shadow-sm focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 transition-all"
            />
          </div>

          {showResults && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-surface-200 rounded-2xl shadow-xl p-2 z-30">
              {results.length > 0 ? (
                results.map((service) => {
                  const Icon = serviceIcons[service.icon];
                  return (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-50 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-lg ${service.bgColor} flex items-center justify-center`}>
                        <Icon size={18} className={service.textColor} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-surface-900">{service.name}</div>
                        <div className="text-sm text-surface-500">{service.shortDesc.split(',')[0]}</div>
                      </div>
                      <ArrowRight size={16} className="text-surface-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })
              ) : (
                <div className="px-4 py-6 text-center text-surface-500">
                  <p>No services found for &ldquo;{query}&rdquo;</p>
                  <p className="text-sm mt-1">Try a different search or browse all services.</p>
                </div>
              )}
            </div>
          )}

          {!showResults && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {['tap leaking', 'fan not working', 'AC not cooling', 'need a carpenter', 'transform old furniture'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="px-3 py-1.5 text-sm bg-white border border-surface-200 rounded-full text-surface-600 hover:border-brand-300 hover:text-brand-600 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
