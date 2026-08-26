'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { serviceIcons } from '@/data/services';

export function ServiceCard({ service, variant = 'default' }) {
  const Icon = serviceIcons[service.icon] || serviceIcons.Wrench;

  if (variant === 'featured') {
    return (
      <Link
        href={`/services/${service.id}`}
        className="group relative flex flex-col bg-white rounded-3xl border border-surface-200/80 hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-600/15 transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden"
      >
        {/* Top Photographic Image Banner */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          {service.image ? (
            <img
              src={service.image}
              alt={service.name}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-tr ${service.color}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating Icon Pill */}
          <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl ${service.bgColor} backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20`}>
            <Icon size={20} className={service.textColor} />
          </div>

          {/* Service Name on Image */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-extrabold text-white text-xl tracking-tight leading-tight group-hover:text-brand-300 transition-colors">
              {service.name}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <p className="text-xs text-surface-500 line-clamp-2 leading-relaxed font-medium">
            {service.shortDesc ? service.shortDesc.split('.')[0] : service.description}
          </p>

          <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between text-xs font-extrabold">
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Verified Pros
            </span>
            <span className={`${service.textColor} flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
              Book Now <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/services/${service.id}`}
      className="group flex items-start gap-4 p-5 sm:p-6 bg-white rounded-2xl border border-surface-200/80 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/5 transition-all duration-300 transform hover:-translate-y-0.5"
    >
      <div className={`w-13 h-13 rounded-2xl ${service.bgColor} flex items-center justify-center shrink-0 group-hover:scale-105 shadow-sm transition-transform`}>
        <Icon size={24} className={service.textColor} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-extrabold text-surface-900 text-base group-hover:text-brand-600 transition-colors">{service.name}</h3>
          <span className="text-[11px] font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full shrink-0">Available</span>
        </div>
        <p className="text-xs text-surface-500 mt-1 line-clamp-2 leading-relaxed font-medium">{service.description}</p>
        <div className={`mt-3 text-xs font-bold ${service.textColor} flex items-center gap-1`}>
          View Services <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
