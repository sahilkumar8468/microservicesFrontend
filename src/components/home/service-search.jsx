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
    <section className="py-14 md:py-24 bg-gradient-to-b from-white via-surface-50 to-slate-100 border-y border-surface-200/80 relative overflow-hidden">
      {/* Background glow halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-brand-500/10 blur-[100px] pointer-events-none" />

      <div className="container-wide max-w-3xl relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-surface-900 tracking-tight text-balance">
            What Do You Need Help With Today?
          </h2>
          <p className="mt-2 text-surface-500 font-medium text-xs sm:text-base text-balance">
            Type any problem — tap leaking, AC not cooling, furniture repair — and we&apos;ll match the right service.
          </p>
        </div>

        <div className="relative">
          <div className="relative shadow-xl shadow-brand-600/10 rounded-2xl">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 absolute left-3.5 sm:left-5 top-1/2 -translate-y-1/2 text-brand-600" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try "tap leaking", "fan repair", "AC not cooling"...'
              className="w-full pl-10 sm:pl-14 pr-4 sm:pr-5 py-3 sm:py-5 text-sm sm:text-lg font-semibold bg-white border border-surface-200/80 rounded-2xl shadow-sm focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 transition-all text-surface-900 placeholder:text-surface-400 placeholder:font-normal"
            />
          </div>

          {showResults && (
            <div className="absolute top-full mt-3 left-0 right-0 bg-white border border-surface-200/80 rounded-2xl sm:rounded-3xl shadow-2xl p-2 sm:p-3 z-40 animate-fade-in max-h-[70vh] overflow-y-auto">
              {results.length > 0 ? (
                results.map((service) => {
                  const Icon = serviceIcons[service.icon];
                  return (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl hover:bg-brand-50/70 transition-all group border border-transparent hover:border-brand-200"
                    >
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${service.bgColor} flex items-center justify-center shrink-0 shadow-xs`}>
                        <Icon size={20} className={service.textColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-surface-900 text-sm sm:text-base group-hover:text-brand-600 transition-colors truncate">{service.name}</span>
                        </div>
                        <p className="text-xs text-surface-500 mt-0.5 truncate font-medium">{service.shortDesc.split(',')[0]}</p>
                      </div>
                      <ArrowRight size={16} className="text-surface-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all shrink-0" />
                    </Link>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-surface-500">
                  <p className="font-bold text-surface-800 text-sm sm:text-base">No matching service found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-surface-400 mt-1 font-medium">Try searching &quot;AC&quot;, &quot;plumber&quot;, &quot;wiring&quot;, or &quot;paint&quot;.</p>
                </div>
              )}
            </div>
          )}

          {!showResults && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-5 justify-center">
              {['Tap Leaking', 'Fan Not Working', 'AC Not Cooling', 'Wood Carpenter', 'Furniture Polish'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold bg-white border border-surface-200/80 rounded-xl text-surface-700 hover:border-brand-400 hover:text-brand-700 hover:bg-brand-50/50 transition-all shadow-xs"
                >
                  🔍 {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
