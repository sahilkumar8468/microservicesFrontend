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
    <footer className="bg-gradient-to-b from-surface-950 via-slate-950 to-black text-white relative overflow-hidden border-t border-surface-800/60">
      {/* Background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-orange-600/10 blur-[130px] pointer-events-none" />

      <div className="container-wide py-12 sm:py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-11 h-11 rounded-xl bg-white p-0.5 border border-white/20 overflow-hidden flex items-center justify-center shadow-lg">
                <img src="/logo.png" alt={siteConfig.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight block leading-none">
                  Universal<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Interior</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-surface-400 uppercase block mt-1">
                  & Microservices
                </span>
              </div>
            </Link>
            <p className="text-surface-400 text-xs leading-relaxed mb-6 max-w-xs font-medium">
              Karachi&apos;s premier microservices platform for verified plumbing, electrical, AC repair, and home transformations.
            </p>
            <div className="flex gap-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 hover:border-pink-500 hover:text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-black hover:border-white/40 hover:text-white transition-all shadow-sm"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68 6.34 6.34 0 009.34 22a6.34 6.34 0 006.34-6.34V9.36a8.16 8.16 0 004.91 1.63V7.54a4.85 4.85 0 01-1-.85z"/></svg>
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-emerald-600 hover:border-emerald-500 hover:text-white transition-all shadow-sm"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.123-1.334a9.96 9.96 0 004.887 1.282h.004c5.505 0 9.989-4.478 9.99-9.985A9.948 9.948 0 0012.012 2zm.003 16.402h-.003a8.274 8.274 0 01-4.221-1.157l-.303-.18-3.136.818.835-3.048-.198-.314a8.272 8.272 0 01-1.272-4.47c.001-4.568 3.722-8.283 8.297-8.283a8.25 8.25 0 015.86 2.428 8.243 8.243 0 012.43 5.863c-.002 4.569-3.724 8.284-8.297 8.284zm4.545-6.208c-.249-.125-1.474-.727-1.703-.81-.229-.083-.395-.125-.561.125-.166.249-.644.81-.79 0.976-.145.166-.291.187-.54.062a6.837 6.837 0 01-2.008-1.238 7.55 7.55 0 01-1.388-1.73c-.146-.249-.016-.384.109-.508.113-.112.249-.291.374-.436.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.436-.062-.125-.561-1.351-.769-1.85-.203-.487-.41-.421-.561-.428-.145-.007-.312-.007-.478-.007s-.436.062-.665.312c-.229.249-.873.852-.873 2.079 0 1.226.894 2.41 1.018 2.577.125.166 1.758 2.685 4.26 3.766.595.257 1.06.41 1.423.526.598.19 1.142.163 1.572.099.48-.071 1.474-.602 1.682-1.184.208-.582.208-1.08.145-1.184-.062-.104-.228-.166-.477-.291z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5">Microservices</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs font-semibold text-surface-400 hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs font-semibold text-surface-400 hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5">Support & Trust</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs font-semibold text-surface-400 hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5">Verified Support</h4>
            <ul className="space-y-3.5">
              <li>
                <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2.5 text-xs font-semibold text-surface-400 hover:text-emerald-400 transition-colors">
                  <Phone size={14} className="text-emerald-400 shrink-0" /> {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs font-semibold text-surface-400 hover:text-emerald-400 transition-colors">
                  <Phone size={14} className="text-emerald-400 shrink-0" /> WhatsApp Chat
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2.5 text-xs font-semibold text-surface-400 hover:text-brand-400 transition-colors break-all">
                  <Mail size={14} className="text-brand-400 shrink-0" /> {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs font-semibold text-surface-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-400" /> <span className="leading-tight">{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 relative z-10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-400 font-medium">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
    
        </div>
      </div>
    </footer>
  );
}
