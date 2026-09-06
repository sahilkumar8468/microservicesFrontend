import Link from 'next/link';
import { Button } from '@/components/button';

export function CTASection({
  title = "Something Needs Fixing?",
  description = "Tell us what you need. We'll help you find the right solution.",
  primaryHref = '/book',
  primaryLabel = 'Book a Service',
  secondaryHref = '/contact',
  secondaryLabel = 'Contact Us',
  variant = 'dark',
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-amber-950 to-orange-950 text-white py-14 sm:py-24 md:py-32 border-t border-orange-500/20">
      {/* Animated glowing ambient orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[140px] animate-glow-pulse pointer-events-none hidden sm:block" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-amber-600/20 rounded-full blur-[140px] animate-glow-pulse pointer-events-none hidden sm:block" />

      {/* Animated glowing border line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500 animate-gradient-x" />

      <div className="container-wide relative z-10 text-center px-3.5 sm:px-6">
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-tight">
          {title}
        </h2>
        <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-xl text-surface-300 max-w-xl mx-auto text-balance font-medium leading-relaxed">
          {description}
        </p>
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button
            href={primaryHref}
            size="lg"
            variant="primary"
            className="shadow-xl shadow-brand-600/30 px-6 sm:px-9 font-extrabold text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            {primaryLabel}
          </Button>
          <Button
            href={secondaryHref}
            size="lg"
            variant="outlineLight"
            className="px-6 sm:px-9 font-extrabold text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
