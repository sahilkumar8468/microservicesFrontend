export function SectionHeading({ subtitle, title, description, center = true, light = false }) {
  return (
    <div className={`mb-8 sm:mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
      {subtitle && (
        <span className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-extrabold tracking-wider uppercase mb-2.5 sm:mb-3.5 border shadow-inner max-w-full truncate ${
          light 
            ? 'bg-white/10 border-white/20 text-brand-300' 
            : 'bg-brand-50 border-brand-200/80 text-brand-700'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse shrink-0" />
          <span className="truncate">{subtitle}</span>
        </span>
      )}
      <h2 className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance leading-[1.18] sm:leading-[1.15] ${
        light ? 'text-white' : 'text-surface-900'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-2.5 sm:mt-4 text-xs sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed text-balance ${center ? 'mx-auto' : ''} ${
          light ? 'text-surface-300' : 'text-surface-500'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
}
