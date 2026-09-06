'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './button';
import { LocationSelector } from './location-selector';
import { siteConfig } from '@/data/site-config';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl shadow-md shadow-surface-900/5 border-b border-surface-200/80 py-3'
            : 'bg-white/90 backdrop-blur-md py-4 border-b border-surface-100'
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group min-w-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-surface-200 overflow-hidden flex items-center justify-center p-0.5 shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <img src="/logo.png" alt={siteConfig.name} className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-base sm:text-xl text-surface-900 tracking-tight block leading-none truncate">
                Universal<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Interior</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-surface-400 uppercase block mt-0.5 sm:mt-1">
                & Microservices
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-surface-50/80 p-1.5 rounded-2xl border border-surface-200/60 shadow-inner">
            {navLinks.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                      : 'text-surface-600 hover:text-brand-700 hover:bg-white hover:shadow-xs'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <LocationSelector variant="compact" />
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200/80 transition-all px-4 py-2.5 rounded-xl shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center font-extrabold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span>{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs font-bold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all px-3 py-2.5 rounded-xl"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs font-bold text-surface-700 hover:text-brand-600 transition-colors px-3 py-2.5"
              >
                Sign In
              </Link>
            )}
            <Button href="/book" size="sm" className="shadow-md shadow-brand-600/20 font-bold text-xs rounded-xl px-5 py-2.5">
              Book a Service
            </Button>
          </div>

          {/* Mobile Right */}
          <div className="flex lg:hidden items-center gap-2">
            <LocationSelector variant="compact" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl bg-surface-50 border border-surface-200 hover:bg-surface-100 transition-colors text-surface-700"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-surface-900/50 backdrop-blur-sm transition-opacity ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-[85vw] max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 flex flex-col z-50 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-surface-100 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 min-w-0" onClick={() => setMobileOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-white border border-surface-200 p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                <img src="/logo.png" alt={siteConfig.name} className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-base truncate">{siteConfig.name}</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-surface-100 text-surface-600 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 touch-pan-y">
            {navLinks.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-base font-extrabold rounded-xl transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-md'
                      : 'text-surface-700 hover:text-surface-900 hover:bg-surface-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <hr className="my-3 border-surface-100" />
            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-base font-semibold text-brand-700 bg-brand-50 rounded-xl transition-colors"
                >
                  Dashboard (My Account)
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="w-full text-left block px-4 py-3 text-base font-medium text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  Logout ({user.name})
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium text-surface-700 hover:bg-surface-50 rounded-xl transition-colors"
              >
                Login
              </Link>
            )}
            <div className="pt-3 px-1">
              <Button href="/book" onClick={() => setMobileOpen(false)} className="w-full" size="lg">
                Book a Service
              </Button>
            </div>
          </nav>

          <div className="p-4 border-t border-surface-100 bg-surface-50/50 shrink-0">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center justify-center gap-2 text-xs font-semibold text-surface-600 hover:text-brand-600 transition-colors py-1.5"
            >
              <Phone size={14} className="text-brand-600" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
