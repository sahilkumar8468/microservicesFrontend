'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  ArrowLeft, Calendar, Clock, MapPin, Phone, MessageCircle,
  CheckCircle, XCircle, Star, ChevronRight, User, Wrench, FileText, CreditCard,
  RefreshCw, MessageSquare
} from 'lucide-react';

const statusConfig = {
  confirmed: { icon: CheckCircle, className: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Confirmed' },
  completed: { icon: CheckCircle, className: 'bg-brand-50 text-brand-700 border-brand-200', label: 'Completed' },
  cancelled: { icon: XCircle, className: 'bg-rose-50 text-rose-700 border-rose-200', label: 'Cancelled' },
  pending: { icon: Clock, className: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Pending' },
};

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { API_URL, user } = useAuth();
  
  const id = params.id;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [ratingInput, setRatingInput] = useState(5);
  const [reviewInput, setReviewInput] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBookingDetail();
    }
  }, [id]);

  const fetchBookingDetail = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`);
      if (!res.ok) {
        throw new Error('Booking not found');
      }
      const data = await res.json();
      setBooking(data);
    } catch (e) {
      console.error(e);
      setError('Could not retrieve booking details from backend.');
    } finally {
      setLoading(false);
    }
  };

  // Submit Rating & Completion to Backend
  const handleCompleteService = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      const res = await fetch(`${API_URL}/bookings/${id}/complete`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: ratingInput, review: reviewInput })
      });
      if (res.ok) {
        setShowReviewModal(false);
        fetchBookingDetail();
      } else {
        alert('Failed to complete booking.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-surface-50 flex items-center justify-center pt-24 pb-16">
        <div className="text-center space-y-4">
          <RefreshCw className="h-10 w-10 text-brand-600 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-surface-500">Loading booking record...</p>
        </div>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="min-h-screen bg-surface-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="p-6 bg-white border border-surface-200 rounded-3xl max-w-md mx-auto shadow-sm">
            <XCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-surface-900">Record Not Found</h1>
            <p className="text-sm text-surface-400 mt-2">{error || 'Booking detail missing.'}</p>
            <Link href="/account" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 text-white font-semibold text-sm hover:bg-brand-700 transition-all">
              Go Back to Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const status = statusConfig[booking.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  // Multi-step lifecycle status stages
  const lifecycleStages = [
    { key: 'pending', label: 'Booking Placed' },
    { key: 'employee_assigned', label: 'Partner Assigned' },
    { key: 'dispatched', label: 'En-Route (Discharged)' },
    { key: 'reached', label: 'Reached Client Site' },
    { key: 'in_progress', label: 'Work In Progress' },
    { key: 'completed', label: 'Completed' },
  ];

  const getStageIndex = (st) => {
    switch (st) {
      case 'pending': return 0;
      case 'employee_assigned': return 1;
      case 'dispatched': return 2;
      case 'reached': return 3;
      case 'in_progress': return 4;
      case 'completed': return 5;
      default: return 0;
    }
  };

  const currentStageIdx = getStageIndex(booking.status);

  // Dynamic timeline history based on booking status
  const timeline = [
    { event: 'Booking Placed', time: booking.date || 'Recently', icon: FileText, color: 'text-brand-600' },
    ...(booking.employeeId ? [{ event: `Partner Assigned (${booking.employee?.name || 'Technician'})`, time: 'Confirmed', icon: Wrench, color: 'text-amber-600' }] : []),
    ...(booking.status === 'dispatched' || booking.status === 'reached' || booking.status === 'in_progress' || booking.status === 'completed' ? [{ event: 'Partner Dispatched to Location', time: 'In Transit', icon: Clock, color: 'text-blue-600' }] : []),
    ...(booking.status === 'reached' || booking.status === 'in_progress' || booking.status === 'completed' ? [{ event: 'Technician Reached Client Site', time: 'On Site', icon: MapPin, color: 'text-purple-600' }] : []),
    ...(booking.status === 'in_progress' || booking.status === 'completed' ? [{ event: 'Service In Progress', time: 'Ongoing', icon: Wrench, color: 'text-indigo-600' }] : []),
    ...(booking.status === 'completed' ? [{ event: 'Service Successfully Completed', time: 'Finished', icon: CheckCircle, color: 'text-emerald-600' }] : []),
  ];

  return (
    <main className="min-h-screen bg-surface-50 pt-20 sm:pt-24 pb-12 sm:pb-16 relative">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Back */}
        <Link href="/account" className="inline-flex items-center gap-2 text-surface-500 hover:text-brand-600 font-medium mb-6 sm:mb-8 transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Account
        </Link>

        {/* Live Multi-stage Tracking Lifecycle Progress Bar Card */}
        <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-surface-900 break-all">Booking #{booking.id}</h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 text-brand-700 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  {booking.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-surface-500 text-xs sm:text-sm font-medium break-words">{booking.serviceName} — {booking.problem}</p>
            </div>
            
            {/* Mark as Completed / Completion Controls */}
            <div className="flex gap-2 w-full sm:w-auto">
              {(booking.status === 'in_progress' || booking.status === 'reached' || booking.status === 'employee_assigned' || booking.status === 'confirmed') && (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white transition-all shadow-md shadow-brand-600/20"
                >
                  <CheckCircle className="h-4 w-4" /> Complete Job & Rate Worker
                </button>
              )}
              {booking.status === 'completed' && (
                <span className="w-full sm:w-auto text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-600" /> Service Completed & Rated
                </span>
              )}
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="py-4 border-t border-surface-100 mb-4 sm:mb-6">
            <div className="flex items-center justify-between relative px-2">
              <div className="absolute top-3.5 sm:top-4 left-4 right-4 h-1 bg-surface-100 z-0" />
              <div
                className="absolute top-3.5 sm:top-4 left-4 h-1 bg-brand-600 z-0 transition-all duration-500"
                style={{ width: `${(currentStageIdx / (lifecycleStages.length - 1)) * 92}%` }}
              />

              {lifecycleStages.map((stage, idx) => {
                const isPassed = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                return (
                  <div key={stage.key} className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-[11px] sm:text-xs flex items-center justify-center transition-all ${
                      isCurrent ? 'bg-brand-600 text-white ring-2 sm:ring-4 ring-brand-100 shadow-md' :
                      isPassed ? 'bg-emerald-600 text-white shadow-sm' :
                      'bg-white border-2 border-surface-200 text-surface-400'
                    }`}>
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <span className={`text-[11px] mt-2 font-semibold max-w-[80px] hidden sm:block ${
                      isCurrent ? 'text-brand-600 font-extrabold' :
                      isPassed ? 'text-surface-900 font-bold' :
                      'text-surface-400'
                    }`}>
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Active Stage Label */}
            <div className="sm:hidden text-center mt-3 pt-3 border-t border-surface-100">
              <span className="text-[11px] text-surface-400 font-medium">Current Status: </span>
              <span className="text-xs font-bold text-brand-600">{lifecycleStages[currentStageIdx]?.label}</span>
              <span className="text-[10px] text-surface-400 block mt-0.5">Stage {currentStageIdx + 1} of {lifecycleStages.length}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {[
              { icon: Calendar, label: 'Scheduled Date', value: booking.date },
              { icon: Clock, label: 'Time Slot', value: booking.time },
              { icon: MapPin, label: 'Customer Contact', value: booking.phone },
              { icon: CreditCard, label: 'Estimated Price', value: booking.price },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-surface-50 p-3 sm:p-4 border border-surface-100">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-600 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-bold text-surface-500 uppercase tracking-wide truncate">{item.label}</span>
                </div>
                <p className="font-extrabold text-surface-900 text-xs sm:text-sm break-all">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security OTP Verification Card */}
        {booking.otpCode && (
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-surface-50 rounded-2xl border border-amber-300 p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-amber-500 text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center shadow-md shadow-amber-500/30 shrink-0">
                🔑
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-900 block">
                  Microservice Partner Verification Security OTP
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-950 tracking-widest sm:tracking-[0.2em] my-0.5 break-all">
                  {booking.otpCode}
                </p>
                <p className="text-xs text-amber-800 font-medium">
                  Provide this security OTP to your technician upon arrival to verify partner authenticity.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-amber-100 border border-amber-200 text-amber-900 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider shrink-0 self-start sm:self-center">
              Verified Partner Security
            </span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            
            {/* Problem Description & Uploaded Issue Photos */}
            <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-surface-900 mb-2 sm:mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-brand-600" />
                Problem Description & Issue Photos
              </h2>
              <p className="text-surface-700 leading-relaxed text-xs sm:text-sm font-medium break-words">
                {booking.description || 'No additional description added.'}
              </p>

              {Array.isArray(booking.photos) && booking.photos.length > 0 && (
                <div className="mt-4 pt-4 border-t border-surface-100">
                  <p className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-2">Uploaded Issue Photos ({booking.photos.length})</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                    {booking.photos.map((photo, pIdx) => (
                      <a
                        key={pIdx}
                        href={photo}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-surface-200 hover:border-brand-500 transition-all shadow-sm"
                      >
                        <img src={photo} alt={`Uploaded issue ${pIdx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                          View ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-surface-900 mb-4 sm:mb-6 flex items-center gap-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-brand-500" />
                Timeline History
              </h2>
              <div className="relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-surface-200" />
                <div className="space-y-5 sm:space-y-6">
                  {timeline.map((event, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 relative">
                      <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-surface-200 flex items-center justify-center flex-shrink-0">
                        <event.icon className={`h-4 w-4 ${event.color}`} />
                      </div>
                      <div className="pt-1.5 min-w-0">
                        <p className="font-semibold text-surface-900 text-xs sm:text-sm">{event.event}</p>
                        <p className="text-[11px] sm:text-xs text-surface-400 mt-0.5">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-surface-900 mb-3 sm:mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-brand-500" />
                Service Address
              </h2>
              <p className="text-surface-600 text-xs sm:text-sm">Customer Phone: <strong className="font-semibold text-surface-900 break-all">{booking.phone}</strong></p>
              <p className="text-surface-400 text-xs mt-1">Operational Area: DHA Phase 6, Clifton, Karachi</p>
            </div>

            {/* Customer Review (if completed) */}
            {booking.status === 'completed' && booking.rating !== null && (
              <div className="bg-white rounded-2xl border border-brand-200 p-4 sm:p-6 shadow-sm bg-brand-50/20">
                <h2 className="text-base sm:text-lg font-bold text-surface-900 mb-2 sm:mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-brand-600" />
                  Your Rating & Feedback
                </h2>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${s <= booking.rating ? 'fill-current' : 'text-surface-200'}`}
                    />
                  ))}
                  <span className="font-bold text-surface-900 text-xs sm:text-sm ml-2">({booking.rating}/5 stars)</span>
                </div>
                <p className="text-xs sm:text-sm text-surface-600 italic bg-white border border-surface-100 rounded-xl p-3 sm:p-4 mt-2 break-words">
                  &ldquo;{booking.review || 'No feedback text provided.'}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            
            {/* Professional Card */}
            <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-surface-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Wrench className="h-4 w-4 sm:h-5 sm:w-5 text-brand-500" />
                Assigned Professional
              </h2>
              
              {booking.employeeId && booking.employee ? (
                <>
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-lg sm:text-xl shrink-0">
                      {booking.employee.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-surface-900 text-sm sm:text-base truncate">{booking.employee.name}</p>
                      <p className="text-xs text-brand-600 font-semibold truncate">{booking.employee.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />
                        <span className="text-xs font-semibold text-surface-700">
                          {booking.employee.rating !== null && booking.employee.rating !== undefined && Number(booking.employee.rating) > 0
                            ? Number(booking.employee.rating).toFixed(1)
                            : 'New Partner'}
                        </span>
                        <span className="text-xs text-surface-400">· {booking.employee.jobs || 0} jobs served</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a
                      href={`tel:${booking.employee.phone}`}
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-brand-50 px-4 py-2.5 sm:py-3 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
                    >
                      <Phone className="h-4 w-4" /> Call: {booking.employee.phone}
                    </a>
                    <a
                      href={`https://wa.me/${booking.employee.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-50 px-4 py-2.5 sm:py-3 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp Worker
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                  </div>
                  <h3 className="font-bold text-surface-800 text-xs sm:text-sm">Assigning Professional...</h3>
                  <p className="text-xs text-surface-400 mt-1 max-w-[200px] mx-auto">
                    Admin team is looking for a nearby {booking.serviceName?.toLowerCase()} expert.
                  </p>
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-surface-900 mb-3 sm:mb-4">Payment Summary</h2>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-surface-500">Service Fee</span>
                  <span className="text-surface-700 font-medium">{booking.price}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-surface-500">Visit & Inspection</span>
                  <span className="text-emerald-600 font-medium">FREE</span>
                </div>
                <div className="border-t border-surface-100 pt-2.5 sm:pt-3 flex justify-between">
                  <span className="font-bold text-surface-900 text-xs sm:text-sm">Total Price</span>
                  <span className="font-bold text-brand-600 text-sm sm:text-base">{booking.price}</span>
                </div>
              </div>
              <p className="text-[10px] text-surface-400 mt-3 font-medium text-center">
                Cash or bank transfer accepted upon job completion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- RATING & REVIEW DIALOG MODAL --- */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3.5 sm:p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-surface-200 shadow-2xl p-5 sm:p-6 relative animate-in fade-in-50 zoom-in-95 duration-200">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-3 border border-brand-200">
                <Star className="h-6 w-6 text-brand-600 fill-brand-100" />
              </div>
              <h2 className="text-xl font-bold text-surface-900">Complete Job & Review</h2>
              <p className="text-xs text-surface-500 mt-1">
                Please rate your service. Feedback updates employee rankings!
              </p>
            </div>

            <form onSubmit={handleCompleteService} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-surface-700 text-center mb-2">
                  Overall Service Rating
                </label>
                <div className="flex items-center justify-center gap-1 text-amber-400 py-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRatingInput(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={32}
                        className={`${
                          s <= (hoverRating || ratingInput) 
                            ? 'fill-current text-amber-400' 
                            : 'text-surface-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-surface-700 mb-1.5">
                  Write a Short Review (Optional)
                </label>
                <textarea
                  placeholder="Tell us about the worker's performance, punctuality, and behavior..."
                  rows={3}
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-2.5 border border-surface-200 hover:bg-surface-50 text-surface-600 rounded-xl text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  {submittingReview ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    'Submit Feedback'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
