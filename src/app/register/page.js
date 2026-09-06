'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle, RefreshCw, KeyRound, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register, googleSignIn } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '' });
  const [agreed, setAgreed] = useState(false);

  // OTP Verification State
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [targetEmail, setTargetEmail] = useState('');
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Google Selector Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  useEffect(() => {
    let interval;
    if (otpStep && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpStep, timer]);

  // Handle Form Submission -> Trigger OTP
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setTargetEmail(formData.email);
    setGeneratedOtp(otp);
    setTimer(60);
    setErrorMsg('');
    setOtpStep(true);
  };

  // Handle OTP Input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value.slice(-1);
    setOtpCode(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setTimer(60);
    setOtpCode(['', '', '', '', '', '']);
    setErrorMsg('');
  };

  // Verify OTP & Save to Database
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered.length < 6) {
      setErrorMsg('Please enter the full 6-digit OTP code.');
      return;
    }

    if (entered !== generatedOtp && entered !== '123456') {
      setErrorMsg(`Invalid OTP code. For demo, use ${generatedOtp} or 123456.`);
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');
    try {
      // Call backend register API
      await register(formData.name, formData.email, formData.phone, formData.password);
      
      setVerifiedSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to connect to backend server. Make sure the API is running.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Execute Google Authentication with backend
  const handleGoogleAuth = async (email, name) => {
    setIsGoogleSubmitting(true);
    setErrorMsg('');
    try {
      const googleId = 'g_' + Math.floor(10000000 + Math.random() * 90000000);
      await googleSignIn(email, name, googleId);
      setShowGoogleModal(false);
      router.push('/account');
    } catch (err) {
      setErrorMsg(err.message || 'Google authentication failed.');
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex relative">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block text-3xl font-bold text-surface-900 mb-6">
              Home<span className="text-brand-600">Solution</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">
              {otpStep ? 'Verify Email Address' : 'Create Account'}
            </h1>
            <p className="mt-2 text-surface-500">
              {otpStep
                ? `Enter the OTP code sent to ${targetEmail}`
                : 'Join thousands of happy homeowners in Karachi'}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-semibold rounded-xl">
              {errorMsg}
            </div>
          )}

          {!otpStep ? (
            <>
              {/* Google Direct Sign Up Button */}
              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-surface-200 bg-white hover:bg-surface-50 text-surface-700 font-semibold transition-all shadow-sm mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                Continue with Google
              </button>

              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-surface-200 w-full" />
                <span className="bg-white px-3 text-xs font-semibold uppercase tracking-wider text-surface-400 absolute">
                  Or register with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-surface-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                    <input
                      type="text"
                      required
                      placeholder="Ahmed Khan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-surface-200 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-surface-200 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                    <input
                      type="email"
                      required
                      placeholder="ahmed@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-surface-200 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-surface-700 mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Min. 8 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-surface-200 text-surface-900 placeholder:text-surface-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-300 hover:text-surface-500"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-3 text-sm text-surface-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-surface-200 text-brand-600 focus:ring-brand-500"
                  />
                  <span>
                    I agree to the{' '}
                    <Link href="/" className="text-brand-600 font-semibold hover:text-brand-700">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/" className="text-brand-600 font-semibold hover:text-brand-700">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agreed}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-white font-semibold hover:bg-brand-700 active:scale-[0.98] transition-all shadow-lg shadow-brand-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  Create Account & Get OTP
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            /* OTP Verification Screen */
            <div className="space-y-6">
              {/* Simulated OTP Notification Banner */}
              <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 text-left">
                <div className="flex items-start gap-3">
                  <KeyRound className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-800">
                      OTP Sent To Desired Email
                    </p>
                    <p className="text-sm text-brand-900 mt-0.5">
                      Your verification OTP is: <strong className="text-base text-brand-700">{generatedOtp}</strong>
                    </p>
                    <p className="text-xs text-brand-600 mt-1">
                      (Check your inbox at <strong>{targetEmail}</strong>)
                    </p>
                  </div>
                </div>
              </div>

              {verifiedSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto animate-bounce" />
                  <h3 className="text-xl font-bold text-emerald-900">Email Verified & Registered!</h3>
                  <p className="text-sm text-emerald-700">
                    Your account has been created on the database. Redirecting to login...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 text-center mb-3">
                      Enter 6-Digit OTP Code
                    </label>
                    <div className="flex justify-center gap-1.5 sm:gap-2">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-9 h-11 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border border-surface-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-white font-semibold hover:bg-brand-700 active:scale-[0.98] transition-all shadow-lg shadow-brand-200 disabled:opacity-60"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> Registering in Backend...
                      </>
                    ) : (
                      <>
                        Verify OTP & Complete Sign Up
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-sm pt-2">
                    <button
                      type="button"
                      onClick={() => setOtpStep(false)}
                      className="text-surface-500 hover:text-surface-700 font-medium"
                    >
                      ← Edit Email / Go Back
                    </button>

                    <button
                      type="button"
                      disabled={timer > 0}
                      onClick={handleResendOtp}
                      className="text-brand-600 font-semibold hover:text-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {timer > 0 ? `Resend Code in ${timer}s` : 'Resend OTP'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          <p className="mt-8 text-center text-surface-500">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-600 font-semibold hover:text-brand-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-emerald-500 to-brand-700 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Join HomeSolution</h2>
          <p className="text-emerald-100 text-lg leading-relaxed max-w-sm mx-auto">
            Get access to verified professionals, easy booking, and premium home services at your fingertips.
          </p>
          <div className="mt-8 space-y-3 text-left max-w-xs mx-auto">
            {[
              'Direct Google & Email registration',
              'Instant Email OTP verification',
              'Verified & skilled professionals',
              'Same-day service available',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/80">
                <CheckCircle className="h-4 w-4 text-emerald-300 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MOCK GOOGLE SELECTOR MODAL --- */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3.5 sm:p-4">
          <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-surface-200 shadow-2xl p-4 sm:p-6 relative animate-in fade-in-50 zoom-in-95 duration-200">
            <div className="text-center mb-5 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-50 flex items-center justify-center mx-auto mb-3 border border-surface-200">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-surface-900">Sign in with Google</h2>
              <p className="text-xs sm:text-sm text-surface-500 mt-1">Choose an account to continue to HomeSolution</p>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Fatima Ali', email: 'fatima.ali@gmail.com' },
                { name: 'Zeeshan Khan', email: 'zeeshan.khan@gmail.com' }
              ].map((acc) => (
                <button
                  key={acc.email}
                  disabled={isGoogleSubmitting}
                  onClick={() => handleGoogleAuth(acc.email, acc.name)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-surface-100 hover:border-brand-300 hover:bg-brand-50/50 text-left transition-all group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {acc.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-surface-950 text-xs sm:text-sm truncate">{acc.name}</p>
                    <p className="text-[11px] sm:text-xs text-surface-500 truncate">{acc.email}</p>
                  </div>
                  <span className="text-xs text-brand-600 font-semibold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                    Select &rarr;
                  </span>
                </button>
              ))}
            </div>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-surface-100 w-full" />
              <span className="bg-white px-2.5 text-[10px] font-bold uppercase tracking-wider text-surface-400 absolute">
                Or Use Custom Google Account
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Google Account Full Name"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="google.user@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="flex-1 py-2.5 border border-surface-200 hover:bg-surface-50 text-surface-600 rounded-xl text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isGoogleSubmitting || !customGoogleEmail || !customGoogleName}
                  onClick={() => handleGoogleAuth(customGoogleEmail, customGoogleName)}
                  className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  {isGoogleSubmitting ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    'Connect Account'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
