'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Camera, MapPin, Calendar, FileText, Wrench, Phone, Mail, CheckCircle2, Send, RefreshCw } from 'lucide-react';
import { BookingStepper } from '@/components/booking-stepper';
import { Button } from '@/components/button';
import { FileUploader } from '@/components/file-uploader';
import { LocationSelector } from '@/components/location-selector';
import { services, serviceIcons } from '@/data/services';
import { bookingSteps, problemTypes, timeSlots } from '@/data/booking';
import { locations } from '@/data/locations';
import Link from 'next/link';

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState({
    serviceId: null,
    problem: '',
    description: '',
    photos: [],
    video: null,
    locationId: null,
    date: '',
    time: '',
    phone: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [emailResent, setEmailResent] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const selectedService = services.find((s) => s.id === booking.serviceId);
  const problems = booking.serviceId ? problemTypes[booking.serviceId] || [] : [];

  function update(field, value) {
    setBooking((prev) => ({ ...prev, [field]: value }));
  }

  function canProceed() {
    switch (step) {
      case 0:
        return !!booking.serviceId;
      case 1:
        return !!booking.problem;
      case 2:
        return true;
      case 3:
        return !!booking.locationId;
      case 4:
        return !!booking.date && !!booking.time;
      case 5:
        // Mandatory mobile number check
        return booking.phone.trim().length >= 10;
      default:
        return false;
    }
  }

  function handleSubmit() {
    if (!booking.phone || booking.phone.trim().length < 10) return;
    const randomId = 'BK-2026-' + Math.floor(1000 + Math.random() * 9000);
    setBookingId(randomId);
    setSubmitted(true);
  }

  function handleResendConfirmation() {
    setEmailResent(true);
    setTimeout(() => setEmailResent(false), 4000);
  }

  if (submitted) {
    const customerEmail = booking.email.trim() || 'customer@example.com';

    return (
      <div className="min-h-screen pt-24 pb-16 bg-surface-50 flex items-center justify-center">
        <div className="container-narrow px-4">
          <div className="bg-white rounded-3xl border border-surface-200 shadow-xl overflow-hidden max-w-xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-brand-600 p-8 text-white text-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-lg">
                <CheckCircle2 size={44} className="text-white" />
              </div>
              <span className="inline-block px-3 py-1 bg-white/20 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                Booking #{bookingId}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold">Service Booked Successfully!</h1>
              <p className="text-emerald-100 text-sm mt-1">
                Your request has been dispatched to our nearest professional team.
              </p>
            </div>

            {/* Confirmation Email Badge */}
            <div className="p-6 space-y-6">
              <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 flex items-start gap-3">
                <Mail className="h-6 w-6 text-brand-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                      Confirmation Email Sent
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      <Check size={12} /> Delivered
                    </span>
                  </div>
                  <p className="text-sm text-surface-800 font-medium mt-1 truncate">
                    A confirmation receipt has been sent to <strong>{customerEmail}</strong>.
                  </p>
                  <p className="text-xs text-surface-500 mt-1">
                    SMS notification will also be sent to <strong>{booking.phone}</strong>.
                  </p>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-surface-50 rounded-2xl p-5 border border-surface-200 space-y-3">
                <h3 className="text-sm font-bold text-surface-900 uppercase tracking-wider">
                  Booking Reference & Details
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm pt-1">
                  <div>
                    <span className="text-xs text-surface-400 block">Service Name</span>
                    <strong className="text-surface-900">{selectedService?.name}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-surface-400 block">Issue / Task</span>
                    <strong className="text-surface-900">{booking.problem}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-surface-400 block">Date & Time</span>
                    <strong className="text-surface-900">
                      {booking.date} ({booking.time})
                    </strong>
                  </div>
                  <div>
                    <span className="text-xs text-surface-400 block">Location Area</span>
                    <strong className="text-surface-900">
                      {locations.find((l) => l.id === booking.locationId)?.name}
                    </strong>
                  </div>
                  <div>
                    <span className="text-xs text-surface-400 block">Contact Phone</span>
                    <strong className="text-surface-900">{booking.phone}</strong>
                  </div>
                  <div>
                    <span className="text-xs text-surface-400 block">Payment Method</span>
                    <strong className="text-emerald-700">Cash on Completion</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
                  >
                    <Send size={13} />
                    {emailResent ? '✓ Email Resent to ' + customerEmail : 'Resend Confirmation Email'}
                  </button>
                  <span className="text-xs text-surface-400">Ref: {bookingId}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button href="/" variant="primary" className="flex-1 justify-center">
                    Back to Home
                  </Button>
                  <Button href="/account/bookings" variant="outline" className="flex-1 justify-center">
                    View My Bookings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-surface-50">
      <div className="container-narrow">
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-surface-900 text-center mb-2">Book a Service</h1>
          <p className="text-surface-500 text-center">Complete the steps below to request a service.</p>
        </div>

        <BookingStepper steps={bookingSteps} currentStep={step} />

        <div className="mt-10 bg-white rounded-2xl border border-surface-200 shadow-sm p-6 md:p-8">
          {/* Step 0: Choose Service */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-surface-900 mb-6">Choose a Service</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map((service) => {
                  const Icon = serviceIcons[service.icon];
                  const isSelected = booking.serviceId === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => update('serviceId', service.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50 shadow-sm'
                          : 'border-surface-200 hover:border-brand-200 hover:bg-surface-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${service.bgColor} flex items-center justify-center shrink-0`}>
                        <Icon size={22} className={service.textColor} />
                      </div>
                      <div>
                        <p className="font-semibold text-surface-900">{service.name}</p>
                        <p className="text-xs text-surface-500">From {service.startingPrice}</p>
                      </div>
                      {isSelected && <Check size={20} className="text-brand-600 ml-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 1: Choose Problem */}
          {step === 1 && selectedService && (
            <div>
              <h2 className="text-xl font-bold text-surface-900 mb-2">What&apos;s the Problem?</h2>
              <p className="text-surface-500 mb-6">Select the issue you&apos;re facing with {selectedService.name.toLowerCase()}.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {problems.map((p) => (
                  <button
                    key={p}
                    onClick={() => update('problem', p)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      booking.problem === p
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-surface-200 hover:border-brand-200 hover:bg-surface-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-surface-900">{p}</span>
                      {booking.problem === p && <Check size={18} className="text-brand-600 ml-auto" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Describe & Media */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-surface-900 mb-2">Describe the Problem</h2>
              <p className="text-surface-500 mb-6">Tell us more about what needs to be fixed. Photos and videos help us understand better.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-surface-900 mb-2">
                    Description <span className="text-surface-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={booking.description}
                    onChange={(e) => update('description', e.target.value)}
                    placeholder="Describe the issue in your own words — what's happening, since when, any details that might help..."
                    rows={4}
                    className="w-full px-4 py-3 border border-surface-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-900 mb-2">Upload Photos</label>
                  <FileUploader
                    maxFiles={5}
                    accept="image/*"
                    label="Upload Photos"
                    onFilesChange={(files) => update('photos', files)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-900 mb-2">Upload Video</label>
                  <FileUploader
                    maxFiles={1}
                    accept="video/*"
                    label="Upload Video"
                    onFilesChange={(files) => update('video', files[0] || null)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-surface-900 mb-2">Where Do You Need Service?</h2>
              <p className="text-surface-500 mb-6">Select your area so we can find the right professional near you.</p>
              <div className="max-w-md">
                <LocationSelector
                  selectedId={booking.locationId}
                  onSelect={(loc) => update('locationId', loc.id)}
                />
                {booking.locationId && (
                  <div className="mt-4 p-4 rounded-xl bg-brand-50 border border-brand-100">
                    <p className="text-sm text-brand-700 font-medium">
                      ✓ Great! Services are available in {locations.find((l) => l.id === booking.locationId)?.name}. We&apos;ll find a professional near you.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Schedule */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-surface-900 mb-2">Choose Date & Time</h2>
              <p className="text-surface-500 mb-6">Select when you&apos;d like the professional to visit.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-surface-900 mb-2">Date</label>
                  <input
                    type="date"
                    value={booking.date}
                    onChange={(e) => update('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full max-w-xs px-4 py-3 border border-surface-200 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-900 mb-2">Time Slot</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-w-lg">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => update('time', slot)}
                        className={`px-3 py-2.5 text-sm rounded-xl border-2 transition-all ${
                          booking.time === slot
                            ? 'border-brand-600 bg-brand-50 text-brand-700 font-semibold'
                            : 'border-surface-200 hover:border-brand-200 text-surface-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Customer Contact Info */}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold text-surface-900 mb-2">Review & Contact Information</h2>
              <p className="text-surface-500 mb-6">Provide your mandatory phone number so our technician can confirm the appointment.</p>

              <div className="space-y-6">
                {/* Contact Inputs */}
                <div className="p-5 rounded-2xl bg-brand-50/50 border border-brand-200 space-y-4">
                  <h3 className="text-sm font-bold text-surface-900">Customer Contact Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-surface-700 mb-1.5">
                        Mobile Phone Number * <span className="text-rose-500">(Required)</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                        <input
                          type="tel"
                          required
                          placeholder="+92 300 1234567"
                          value={booking.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white"
                        />
                      </div>
                      {(!booking.phone || booking.phone.trim().length < 10) && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">
                          Please enter a valid mobile number (+92...)
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-surface-700 mb-1.5">
                        Email Address <span className="text-surface-400">(For Confirmation Receipt)</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                        <input
                          type="email"
                          placeholder="ahmed@example.com"
                          value={booking.email}
                          onChange={(e) => update('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-50">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Service</p>
                      <p className="font-semibold text-surface-900 mt-1">{selectedService?.name || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Problem</p>
                      <p className="font-semibold text-surface-900 mt-1">{booking.problem || '—'}</p>
                    </div>
                    {booking.description && (
                      <div className="sm:col-span-2">
                        <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Description</p>
                        <p className="text-surface-700 mt-1">{booking.description}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Photos</p>
                      <p className="text-surface-700 mt-1">{booking.photos.length > 0 ? `${booking.photos.length} photo(s)` : 'None'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Video</p>
                      <p className="text-surface-700 mt-1">{booking.video ? '1 video' : 'None'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Location</p>
                      <p className="font-semibold text-surface-900 mt-1">
                        {locations.find((l) => l.id === booking.locationId)?.name || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-500 uppercase tracking-wider font-semibold">Schedule</p>
                      <p className="font-semibold text-surface-900 mt-1">
                        {booking.date && booking.time ? `${booking.date} at ${booking.time}` : '—'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                  <Mail className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    A confirmation email will automatically be generated and sent to{' '}
                    <strong>{booking.email || 'your email'}</strong> upon booking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-surface-100">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className={`flex items-center gap-2 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors ${step === 0 ? 'invisible' : ''}`}
            >
              <ArrowLeft size={16} /> Back
            </button>

            {step < 5 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                Continue
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canProceed()}>
                Confirm Booking & Send Email
                <Check size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
