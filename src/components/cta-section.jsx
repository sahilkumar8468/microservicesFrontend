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
  const isDark = variant === 'dark';
  const isBrand = variant === 'brand';

  return (
    <section className={`relative overflow-hidden ${isDark ? 'bg-surface-900' : isBrand ? 'bg-brand-600' : 'bg-surface-50'}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.15),transparent_50%)]' : isBrand ? 'bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]' : ''}`} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="container-wide relative py-20 md:py-28 text-center">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance ${isDark || isBrand ? 'text-white' : 'text-surface-900'}`}>
          {title}
        </h2>
        <p className={`mt-4 text-lg max-w-xl mx-auto text-balance ${isDark ? 'text-surface-400' : isBrand ? 'text-white/80' : 'text-surface-500'}`}>
          {description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            href={primaryHref}
            size="lg"
            variant={isDark || isBrand ? 'outlineLight' : 'primary'}
          >
            {primaryLabel}
          </Button>
          <Button
            href={secondaryHref}
            size="lg"
            variant={isDark ? 'ghost' : isBrand ? 'outlineLight' : 'outline'}
            className={isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : ''}
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
