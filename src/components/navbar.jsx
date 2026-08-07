'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './button';
import { LocationSelector } from './location-selector';
import { siteConfig } from '@/data/site-config';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
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
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-200 py-3'
            : 'bg-white py-4'
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-xl text-surface-900 tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <LocationSelector variant="compact" />
            <Link
              href="/login"
              className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Button href="/book" size="sm">
              Book a Service
            </Button>
          </div>

          {/* Mobile Right */}
          <div className="flex lg:hidden items-center gap-2">
            <LocationSelector variant="compact" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-surface-900/50 backdrop-blur-sm transition-opacity ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-surface-100">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <span className="text-white font-bold text-base">H</span>
              </div>
              <span className="font-bold text-lg">{siteConfig.name}</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-surface-100"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-base font-medium text-surface-700 hover:text-surface-900 hover:bg-surface-50 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-3 border-surface-100" />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-base font-medium text-surface-700 hover:bg-surface-50 rounded-xl transition-colors"
            >
              Login
            </Link>
            <div className="pt-3 px-2">
              <Button href="/book" className="w-full" size="lg">
                Book a Service
              </Button>
            </div>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-100">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center justify-center gap-2 text-sm text-surface-600 hover:text-brand-600 transition-colors py-2"
            >
              <Phone size={16} />
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
