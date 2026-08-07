'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQAccordion({ items, category }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      {category && (
        <h3 className="text-xl font-bold text-surface-900 mb-4">{category}</h3>
      )}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-surface-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface-50 transition-colors"
            >
              <span className="font-medium text-surface-900 pr-4">{item.q}</span>
              <ChevronDown
                size={20}
                className={`text-surface-400 shrink-0 transition-transform duration-200 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-200 ${
                openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 text-surface-600 leading-relaxed">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
