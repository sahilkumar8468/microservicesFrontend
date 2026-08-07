'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import CTASection from '@/components/cta-section';

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
                  <a href={siteConfig.social.facebook} className="w-11 h-11 rounded-xl bg-surface-100 flex items-center justify-center hover:bg-brand-100 hover:text-brand-600 transition-all">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href={siteConfig.social.instagram} className="w-11 h-11 rounded-xl bg-surface-100 flex items-center justify-center hover:bg-brand-100 hover:text-brand-600 transition-all">
                    <Instagram className="h-5 w-5" />
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
