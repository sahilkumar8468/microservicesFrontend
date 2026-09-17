'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { CTASection } from '@/components/cta-section';
import { OfficeLocationMap } from '@/components/office-location-map';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = (siteConfig.contact.whatsapp || '+92 301 8665163').replace(/[^0-9]/g, '');
    const messageLines = [
      `*New Contact Inquiry - Universal Interior & Microservices*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${formData.name}`,
      `📞 *Phone:* ${formData.phone}`,
      formData.email ? `✉️ *Email:* ${formData.email}` : null,
      `📌 *Topic:* ${formData.subject || 'General Inquiry'}`,
      ``,
      `💬 *Message:*`,
      formData.message,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Sent via Universal Interior Website_`
    ].filter(Boolean).join('\n');

    const targetUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageLines)}`;
    setWhatsappUrl(targetUrl);
    setSubmitted(true);

    if (typeof window !== 'undefined') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Call Us', value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
    { icon: MessageCircle, label: 'WhatsApp', value: siteConfig.contact.whatsapp, href: siteConfig.social.whatsapp },
    { icon: Mail, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: MapPin, label: 'Address', value: siteConfig.contact.address },
    { icon: Clock, label: 'Working Hours', value: 'Mon – Sat, 9:00 AM – 8:00 PM' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/20 pt-20 pb-10 sm:pt-32 sm:pb-16">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-brand-700 mb-3 sm:mb-6">
            <MessageCircle className="h-4 w-4" />
            Get In Touch
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 tracking-tight">
            We'd Love to <span className="text-brand-600">Hear</span> From You
          </h1>
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-base md:text-lg text-surface-500 max-w-2xl mx-auto">
            Have a question, feedback, or need help? Reach out anytime — our team is here for you.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="relative -mt-4 sm:-mt-8 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="group bg-white rounded-2xl p-4 sm:p-5 border border-surface-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50 transition-all duration-300">
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                      <item.icon className="h-5 w-5 text-brand-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-surface-400">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm sm:text-base text-surface-900 font-semibold hover:text-brand-600 transition-colors break-all sm:break-words block">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm sm:text-base text-surface-900 font-semibold break-words">{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-surface-200">
                <p className="text-xs sm:text-sm font-medium text-surface-400 mb-3 sm:mb-4">Follow Us & Socials</p>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-surface-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm" aria-label="Facebook">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-surface-100 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all shadow-sm" aria-label="Instagram">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-surface-100 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm" aria-label="TikTok">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68 6.34 6.34 0 009.34 22a6.34 6.34 0 006.34-6.34V9.36a8.16 8.16 0 004.91 1.63V7.54a4.85 4.85 0 01-1-.85z"/></svg>
                  </a>
                  <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-surface-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm" aria-label="WhatsApp">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.123-1.334a9.96 9.96 0 004.887 1.282h.004c5.505 0 9.989-4.478 9.99-9.985A9.948 9.948 0 0012.012 2zm.003 16.402h-.003a8.274 8.274 0 01-4.221-1.157l-.303-.18-3.136.818.835-3.048-.198-.314a8.272 8.272 0 01-1.272-4.47c.001-4.568 3.722-8.283 8.297-8.283a8.25 8.25 0 015.86 2.428 8.243 8.243 0 012.43 5.863c-.002 4.569-3.724 8.284-8.297 8.284zm4.545-6.208c-.249-.125-1.474-.727-1.703-.81-.229-.083-.395-.125-.561.125-.166.249-.644.81-.79 0.976-.145.166-.291.187-.54.062a6.837 6.837 0 01-2.008-1.238 7.55 7.55 0 01-1.388-1.73c-.146-.249-.016-.384.109-.508.113-.112.249-.291.374-.436.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.436-.062-.125-.561-1.351-.769-1.85-.203-.487-.41-.421-.561-.428-.145-.007-.312-.007-.478-.007s-.436.062-.665.312c-.229.249-.873.852-.873 2.079 0 1.226.894 2.41 1.018 2.577.125.166 1.758 2.685 4.26 3.766.595.257 1.06.41 1.423.526.598.19 1.142.163 1.572.099.48-.071 1.474-.602 1.682-1.184.208-.582.208-1.08.145-1.184-.062-.104-.228-.166-.477-.291z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl border border-surface-200 p-5 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-500/10">
                    <MessageCircle className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-surface-900 mb-2">Message Ready for WhatsApp!</h3>
                  <p className="text-surface-500 max-w-md mx-auto mb-6 text-sm">
                    We have formatted your inquiry for WhatsApp. If WhatsApp did not open automatically, click below to start chatting directly with our support desk:
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Open WhatsApp Chat Now
                    </a>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', subject: '', message: '' }); }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-surface-200 bg-surface-50 px-6 py-3.5 text-surface-700 font-semibold hover:bg-surface-100 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl mb-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-surface-900 font-bold text-xs sm:text-sm">Instant WhatsApp Assistance</h2>
                      <p className="text-[11px] text-surface-500">Submitting will open our WhatsApp desk directly at <strong>+92 301 8665163</strong>.</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-surface-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ahmed Khan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-surface-200 px-4 py-3 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-surface-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-surface-200 px-4 py-3 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="ahmed@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-surface-200 px-4 py-3 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-surface-200 px-4 py-3 text-surface-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22m6%208%204%204%204-4%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10"
                    >
                      <option value="" disabled>Select a topic</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Service Question">Service Question</option>
                      <option value="Booking Help">Booking Help</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Partnership">Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-surface-200 px-4 py-3 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-white font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-lg shadow-emerald-600/20"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Send Message via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Real Interactive & Embedded Office Map */}
      <section className="pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <OfficeLocationMap />
        </div>
      </section>

      <CTASection
        variant="brand"
        title="Need Urgent Help?"
        description="Call or WhatsApp us now for same-day service in Karachi."
        primaryButton={{ label: 'WhatsApp Now', href: siteConfig.social.whatsapp, icon: 'MessageCircle' }}
        secondaryButton={{ label: 'Call Now', href: `tel:${siteConfig.contact.phone}`, icon: 'Phone' }}
      />
    </main>
  );
}
