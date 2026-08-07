export function SectionHeading({ subtitle, title, description, center = true, light = false }) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}>
      {subtitle && (
        <span className={`inline-block text-sm font-semibold tracking-wider uppercase mb-3 ${light ? 'text-brand-300' : 'text-brand-600'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance ${light ? 'text-white' : 'text-surface-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg max-w-2xl text-balance ${center ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-surface-500'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
