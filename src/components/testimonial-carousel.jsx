'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, User } from 'lucide-react';

export function TestimonialCarousel({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  function next() {
    setCurrent((prev) => (prev + 1) % total);
  }

  function prev() {
    setCurrent((prev) => (prev - 1 + total) % total);
  }

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-surface-200 p-8 md:p-10 shadow-sm">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-surface-200'}
            />
          ))}
        </div>
        <blockquote className="text-lg md:text-xl text-surface-700 leading-relaxed mb-6">
          &ldquo;{t.text}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-brand-100 flex items-center justify-center">
            <User size={20} className="text-brand-600" />
          </div>
          <div>
            <div className="font-semibold text-surface-900">{t.name}</div>
            <div className="text-sm text-surface-500">{t.area} &middot; {t.service}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-surface-200 flex items-center justify-center hover:bg-surface-50 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-brand-600 w-6' : 'bg-surface-300'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-surface-200 flex items-center justify-center hover:bg-surface-50 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
