'use client';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Camera, MapPin, Calendar, FileText, Wrench } from 'lucide-react';
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
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedService = services.find(s => s.id === booking.serviceId);
  const problems = booking.serviceId ? problemTypes[booking.serviceId] || [] : [];

  function update(field, value) {
    setBooking(prev => ({ ...prev, [field]: value }));
  }

  function canProceed() {
    switch (step) {
      case 0: return !!booking.serviceId;
      case 1: return !!booking.problem;
      case 2: return true;
      case 3: return true;
      case 4: return !!booking.locationId;
      case 5: return !!booking.date && !!booking.time;
      case 6: return true;
      default: return false;
    }
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-surface-900 mb-3">Booking Request Sent!</h1>
          <p className="text-surface-500 mb-2">We&apos;ve received your service request. Our team will review it and get back to you shortly.</p>
          <p className="text-sm text-surface-400 mb-8">You&apos;ll receive a confirmation via phone and email.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/" variant="primary">Back to Home</Button>
            <Button href="/account/bookings" variant="outline">View My Bookings</Button>
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
                      {isSelected && (
                        <Check size={20} className="text-brand-600 ml-auto shrink-0" />
                      )}
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
                  <label className="block text-sm font-semibold text-surface-900 mb-2">
                    Upload Photos
                  </label>
                  <FileUploader
                    maxFiles={5}
                    accept="image/*"
                    label="Upload Photos"
                    onFilesChange={(files) => update('photos', files)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-900 mb-2">
                    Upload Video
                  </label>
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
                      ✓ Great! Services are available in {locations.find(l => l.id === booking.locationId)?.name}. We&apos;ll find a professional near you.
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

          {/* Step 5: Review */}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold text-surface-900 mb-6">Review Your Request</h2>

              <div className="space-y-4">
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
                        {locations.find(l => l.id === booking.locationId)?.name || '—'}
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

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-sm text-amber-800">
                    This is a demo frontend. In production, your request will be sent to our team who will review it and confirm availability.
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
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                Continue
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Confirm Booking
                <Check size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
