import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

const footerLinks = {
  services: [
    { href: '/services/plumbing', label: 'Plumbing' },
    { href: '/services/electrical', label: 'Electrical' },
    { href: '/services/ac-repair', label: 'AC Repair' },
    { href: '/services/carpenter', label: 'Carpenter' },
    { href: '/services/handyman', label: 'Handyman' },
    { href: '/services/water-tank-cleaning', label: 'Water Tank Cleaning' },
    { href: '/services/home-decoration', label: 'Home Decoration' },
    { href: '/services/furniture-transformation', label: 'Furniture Transformation' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/contact', label: 'Contact' },
    { href: '#', label: 'Careers' },
  ],
  support: [
    { href: '#', label: 'Help Center' },
    { href: '/faq', label: 'FAQs' },
    { href: '#', label: 'Terms & Conditions' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Cancellation Policy' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface-900 text-white">
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-surface-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your trusted partner for professional home services in Karachi. Quality, convenience, and reliability.
            </p>
            <div className="flex gap-2">
              {['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-brand-600 hover:text-white transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-surface-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-surface-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-surface-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 text-sm text-surface-400 hover:text-white transition-colors">
                  <Phone size={14} /> {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\s|\+/g, '')}`} className="flex items-center gap-2 text-sm text-surface-400 hover:text-white transition-colors">
                  <Phone size={14} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 text-sm text-surface-400 hover:text-white transition-colors">
                  <Mail size={14} /> {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-surface-400">
                <MapPin size={14} className="mt-0.5 shrink-0" /> {siteConfig.contact.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-surface-600">
            Demo statistics shown. Real data will be connected soon.
          </p>
        </div>
      </div>
    </footer>
  );
}
