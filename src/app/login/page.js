'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle, KeyRound, RefreshCw } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [otpStep, setOtpStep] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Google Direct Sign In
  const handleGoogleSignIn = () => {
    const defaultEmail = formData.email || 'user.google@gmail.com';
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setFormData((prev) => ({ ...prev, email: defaultEmail }));
    setGeneratedOtp(otp);
    setOtpStep(true);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/account');
    }, 800);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput === generatedOtp || otpInput === '123456') {
      router.push('/account');
    } else {
      setErrorMsg(`Invalid code. Enter ${generatedOtp} or 123456 for demo.`);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block text-3xl font-bold text-surface-900 mb-6">
              Home<span className="text-brand-600">Solution</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">
              {otpStep ? 'Google Account Verification' : 'Welcome Back'}
            </h1>
            <p className="mt-2 text-surface-500">
              {otpStep
                ? `Enter OTP sent to ${formData.email}`
                : 'Sign in to manage your bookings and account'}
            </p>
          </div>

          {!otpStep ? (
            <>
              {/* Google Direct Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
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
                  Or sign in with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-surface-700 mb-2">Email Address</label>
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
                  <label className="block text-sm font-semibold text-surface-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
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

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-surface-500 cursor-pointer">
                    <input type="checkbox" className="rounded border-surface-200 text-brand-600 focus:ring-brand-500" />
                    Remember me
                  </label>
                  <Link href="/login" className="text-brand-600 font-semibold hover:text-brand-700">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-white font-semibold hover:bg-brand-700 active:scale-[0.98] transition-all shadow-lg shadow-brand-200 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" /> Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* OTP Verification Step for Google Login */
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 text-left">
                <div className="flex items-start gap-3">
                  <KeyRound className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-800">
                      Google Direct Login OTP
                    </p>
                    <p className="text-sm text-brand-900 mt-0.5">
                      Your verification OTP code is: <strong className="text-base text-brand-700">{generatedOtp}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-surface-700 mb-2">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter 6-digit OTP code"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                {errorMsg && <p className="text-xs font-semibold text-rose-600 text-center">{errorMsg}</p>}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-white font-semibold hover:bg-brand-700 active:scale-[0.98] transition-all shadow-lg shadow-brand-200"
                >
                  Confirm & Sign In
                  <CheckCircle className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="w-full text-center text-sm text-surface-500 hover:text-surface-700 pt-2"
                >
                  ← Go back to Login
                </button>
              </form>
            </div>
          )}

          <p className="mt-8 text-center text-surface-500">
            Don't have an account?{' '}
            <Link href="/register" className="text-brand-600 font-semibold hover:text-brand-700">
              Create one now
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-brand-600 to-brand-800 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Home,<br />Our Priority</h2>
          <p className="text-brand-100 text-lg leading-relaxed max-w-sm mx-auto">
            Sign in to track your bookings, schedule new services, and manage your home solutions — all in one place.
          </p>
        </div>
      </div>
    </main>
  );
}
