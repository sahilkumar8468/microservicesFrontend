'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { CTASection } from '@/components/cta-section';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Will integrate API here
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
      <section className="relative bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/20 pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-6">
            <MessageCircle className="h-4 w-4" />
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 tracking-tight">
            We'd Love to <span className="text-brand-600">Hear</span> From You
          </h1>
          <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
            Have a question, feedback, or need help? Reach out anytime — our team is here for you.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="relative -mt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="group bg-white rounded-2xl p-5 border border-surface-200 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                      <item.icon className="h-5 w-5 text-brand-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-surface-400">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-surface-900 font-semibold hover:text-brand-600 transition-colors break-words">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-surface-900 font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="bg-white rounded-2xl p-5 border border-surface-200">
                <p className="text-sm font-medium text-surface-400 mb-4">Follow Us</p>
                <div className="flex gap-3">
                  <a href={siteConfig.social.facebook} className="w-11 h-11 rounded-xl bg-surface-100 flex items-center justify-center hover:bg-brand-100 hover:text-brand-600 transition-all" aria-label="Facebook">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href={siteConfig.social.instagram} className="w-11 h-11 rounded-xl bg-surface-100 flex items-center justify-center hover:bg-brand-100 hover:text-brand-600 transition-all" aria-label="Instagram">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-surface-200 p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                    <Send className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-surface-900 mb-2">Message Sent!</h3>
                  <p className="text-surface-500 max-w-md mx-auto">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', subject: '', message: '' }); }}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-white font-semibold hover:bg-brand-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-surface-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ahmed Khan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-surface-200 px-4 py-3 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
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
                        className="w-full rounded-xl border border-surface-200 px-4 py-3 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
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
                      className="w-full rounded-xl border border-surface-200 px-4 py-3 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-surface-200 px-4 py-3 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22m6%208%204%204%204-4%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10"
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
                      className="w-full rounded-xl border border-surface-200 px-4 py-3 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-8 py-3.5 text-white font-semibold hover:bg-brand-700 active:scale-[0.98] transition-all shadow-lg shadow-brand-200"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-surface-200 h-80 bg-surface-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-10 w-10 text-brand-400 mx-auto mb-3" />
              <p className="text-surface-500 font-medium">Map will be embedded here</p>
              <p className="text-sm text-surface-400 mt-1">{siteConfig.contact.address}</p>
            </div>
          </div>
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
