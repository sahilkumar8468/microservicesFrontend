'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { serviceIcons } from '@/data/services';

export function ServiceCard({ service, variant = 'default' }) {
  const Icon = serviceIcons[service.icon];

  if (variant === 'featured') {
    return (
      <Link
        href={`/services/${service.id}`}
        className="group relative flex flex-col items-center p-6 bg-white rounded-2xl border border-surface-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50 transition-all duration-300"
      >
        <div className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={28} className={service.textColor} />
        </div>
        <h3 className="font-semibold text-surface-900 text-center mb-1">{service.name}</h3>
        <p className="text-sm text-surface-500 text-center line-clamp-2">{service.shortDesc.split('.')[0]}</p>
        <span className={`mt-3 text-sm font-medium ${service.textColor} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
          Learn more <ArrowRight size={14} />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/services/${service.id}`}
      className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-surface-200 hover:border-brand-200 hover:shadow-md transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} className={service.textColor} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-surface-900">{service.name}</h3>
        <p className="text-sm text-surface-500 mt-0.5 line-clamp-2">{service.description}</p>
        <div className={`mt-2 text-sm font-medium ${service.textColor} flex items-center gap-1`}>
          View Services <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
