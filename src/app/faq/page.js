'use client';

import { useState } from 'react';
import { HelpCircle, Search, MessageCircle, ChevronDown } from 'lucide-react';
import { faqData } from '@/data/faq';
import { siteConfig } from '@/data/site-config';
import CTASection from '@/components/cta-section';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleItem = (category, index) => {
    const key = `${category}-${index}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = ['All', ...faqData.map((c) => c.category)];

  const filteredFAQs = faqData
    .filter((cat) => activeCategory === 'All' || cat.category === activeCategory)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-surface-50 via-white to-brand-50/30 pt-32 pb-16">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700 mb-6">
            <HelpCircle className="h-4 w-4" />
            Help Center
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 tracking-tight">
            Frequently <span className="text-brand-600">Asked</span> Questions
          </h1>
          <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
            Find answers to common questions. Can't find what you're looking for? Reach out to our support team.
          </p>

          {/* Search */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-300" />
            <input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-surface-200 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-sm text-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-200'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="h-16 w-16 text-surface-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-surface-700 mb-2">No questions found</h3>
              <p className="text-surface-400">Try a different search term or browse by category.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredFAQs.map((category) => (
                <div key={category.category}>
                  <h2 className="text-2xl font-bold text-surface-900 mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 rounded-full bg-brand-600" />
                    {category.category}
                  </h2>
                  <div className="space-y-3">
                    {category.items.map((item, index) => {
                      const key = `${category.category}-${index}`;
                      const isOpen = openItems[key];
                      return (
                        <div
                          key={key}
                          className="rounded-2xl border border-surface-200 overflow-hidden transition-all hover:border-surface-300"
                        >
                          <button
                            onClick={() => toggleItem(category.category, index)}
                            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                          >
                            <span className="text-surface-900 font-semibold pr-4">{item.q}</span>
                            <ChevronDown
                              className={`flex-shrink-0 h-5 w-5 text-surface-400 transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                            }`}
                          >
                            <p className="px-6 text-surface-500 leading-relaxed">{item.a}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-surface-50">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-8 w-8 text-brand-600" />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 mb-3">Still need help?</h2>
          <p className="text-surface-500 mb-8">
            Our support team is ready to assist. Reach out via WhatsApp, phone, or email.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.social.whatsapp}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-white font-semibold hover:bg-brand-700 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      <CTASection
        variant="brand"
        title="Ready to Book a Service?"
        description="Your solution is just a few clicks away."
        primaryButton={{ label: 'Book Now', href: '/book', icon: 'Wrench' }}
      />
    </main>
  );
}
