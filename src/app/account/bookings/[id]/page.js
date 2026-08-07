'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Calendar, Clock, MapPin, Phone, MessageCircle,
  CheckCircle, XCircle, Star, ChevronRight, User, Wrench, FileText, CreditCard
} from 'lucide-react';

// Mock booking data — will be replaced by API
const mockBookingDetail = {
  id: 'BK-001',
  status: 'confirmed',
  service: 'Plumbing',
  problem: 'Tap is leaking in the kitchen',
  description: 'The kitchen sink tap has been dripping continuously for 3 days. Also the shut-off valve under the sink seems stuck.',
  media: ['/images/sample-1.jpg'],
  date: '15 Aug 2026',
  time: '11:00 AM - 12:00 PM',
  address: 'House #42, Street 5, DHA Phase 6, Karachi',
  price: 'PKR 1,500',
  professional: {
    name: 'Muhammad Ali',
    rating: 4.8,
    jobs: 342,
    phone: '+92 300 7654321',
    photo: null,
  },
  timeline: [
    { time: '10 Aug, 3:15 PM', event: 'Booking confirmed', icon: CheckCircle, color: 'text-emerald-500' },
    { time: '10 Aug, 3:16 PM', event: 'Professional assigned', icon: User, color: 'text-brand-500' },
    { time: '14 Aug, 9:00 AM', event: 'Reminder sent via SMS', icon: MessageCircle, color: 'text-amber-500' },
  ],
};

const statusConfig = {
  confirmed: { icon: CheckCircle, className: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Confirmed' },
  completed: { icon: CheckCircle, className: 'bg-brand-50 text-brand-700 border-brand-200', label: 'Completed' },
  cancelled: { icon: XCircle, className: 'bg-rose-50 text-rose-700 border-rose-200', label: 'Cancelled' },
  pending: { icon: Clock, className: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Pending' },
};

export default function BookingDetailPage() {
  const [booking] = useState(mockBookingDetail);
  const status = statusConfig[booking.status];
  const StatusIcon = status.icon;

  return (
    <main className="min-h-screen bg-surface-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/account" className="inline-flex items-center gap-2 text-surface-500 hover:text-brand-600 font-medium mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Account
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-surface-200 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-surface-900">Booking {booking.id}</h1>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}>
                  <StatusIcon className="h-3.5 w-3.5" />
                  {status.label}
                </span>
              </div>
              <p className="text-surface-400">{booking.service} — {booking.problem}</p>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl border border-surface-200 px-4 py-2.5 text-sm font-semibold text-surface-600 hover:border-brand-200 hover:text-brand-600 transition-all">
                <XCircle className="h-4 w-4" /> Cancel
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-surface-200 px-4 py-2.5 text-sm font-semibold text-surface-600 hover:border-brand-200 hover:text-brand-600 transition-all">
                <Calendar className="h-4 w-4" /> Reschedule
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Calendar, label: 'Date', value: booking.date },
              { icon: Clock, label: 'Time', value: booking.time },
              { icon: MapPin, label: 'Location', value: 'DHA Phase 6, Karachi' },
              { icon: CreditCard, label: 'Price', value: booking.price },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-surface-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-4 w-4 text-surface-400" />
                  <span className="text-xs font-medium text-surface-400 uppercase tracking-wide">{item.label}</span>
                </div>
                <p className="font-semibold text-surface-900 text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problem Description */}
            <div className="bg-white rounded-2xl border border-surface-200 p-6">
              <h2 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-500" />
                Problem Description
              </h2>
              <p className="text-surface-500 leading-relaxed">{booking.description}</p>

              {/* Media */}
              {booking.media && booking.media.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-surface-400 mb-3">Attached Media</p>
                  <div className="flex gap-3">
                    {booking.media.map((src, i) => (
                      <div key={i} className="w-24 h-24 rounded-xl bg-surface-100 border border-surface-200 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-surface-300 text-xs">
                          Photo {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-surface-200 p-6">
              <h2 className="text-lg font-bold text-surface-900 mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-500" />
                Timeline
              </h2>
              <div className="relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-surface-200" />
                <div className="space-y-6">
                  {booking.timeline.map((event, i) => (
                    <div key={i} className="flex gap-4 relative">
                      <div className={`relative z-10 w-10 h-10 rounded-full bg-white border-2 border-surface-200 flex items-center justify-center flex-shrink-0`}>
                        <event.icon className={`h-4 w-4 ${event.color}`} />
                      </div>
                      <div className="pt-2">
                        <p className="font-semibold text-surface-900 text-sm">{event.event}</p>
                        <p className="text-xs text-surface-400 mt-0.5">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-surface-200 p-6">
              <h2 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-500" />
                Service Address
              </h2>
              <p className="text-surface-500">{booking.address}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Professional Card */}
            <div className="bg-white rounded-2xl border border-surface-200 p-6">
              <h2 className="text-lg font-bold text-surface-900 mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-brand-500" />
                Professional
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-2xl">
                  {booking.professional.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-surface-900">{booking.professional.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-surface-700">{booking.professional.rating}</span>
                    <span className="text-sm text-surface-400">· {booking.professional.jobs} jobs</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href={`tel:${booking.professional.phone}`}
                  className="flex items-center gap-2 w-full rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
                >
                  <Phone className="h-4 w-4" /> Call Professional
                </a>
                <a
                  href={`https://wa.me/${booking.professional.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 w-full rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-2xl border border-surface-200 p-6">
              <h2 className="text-lg font-bold text-surface-900 mb-4">Payment</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">Service Charge</span>
                  <span className="text-surface-700 font-medium">{booking.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">Visit Fee</span>
                  <span className="text-surface-700 font-medium">Free</span>
                </div>
                <div className="border-t border-surface-100 pt-3 flex justify-between">
                  <span className="font-bold text-surface-900">Total</span>
                  <span className="font-bold text-brand-600">{booking.price}</span>
                </div>
              </div>
              <p className="text-xs text-surface-400 mt-3">Pay cash, bank transfer, or mobile wallet after service</p>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-br from-brand-50 to-surface-50 rounded-2xl border border-brand-100 p-6">
              <h3 className="font-bold text-surface-900 mb-2">Need Help?</h3>
              <p className="text-sm text-surface-500 mb-4">Something not right with your booking? Our support team is here to help.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Contact Support <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
