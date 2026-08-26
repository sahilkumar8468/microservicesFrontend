import Link from 'next/link';

const variants = {
  primary: 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 hover:from-orange-600 hover:via-amber-600 hover:to-rose-700 text-white shadow-md shadow-orange-500/30 active:scale-[0.98]',
  secondary: 'bg-surface-900 text-white hover:bg-slate-800 shadow-md active:scale-[0.98]',
  outline: 'border border-surface-200 bg-white text-surface-900 hover:bg-surface-50 hover:border-orange-400 shadow-xs active:scale-[0.98]',
  outlineLight: 'border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 active:scale-[0.98]',
  ghost: 'text-surface-600 hover:text-orange-600 hover:bg-orange-50/80 active:scale-[0.98]',
};

const sizes = {
  sm: 'px-4 py-2 text-xs font-bold rounded-xl',
  md: 'px-6 py-3 text-sm font-extrabold rounded-xl',
  lg: 'px-8 py-4 text-base font-extrabold rounded-2xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
}
