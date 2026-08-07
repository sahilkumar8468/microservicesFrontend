'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '' });
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API integration point
  };

  return (
    <main className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block text-3xl font-bold text-surface-900 mb-6">
              Home<span className="text-brand-600">Solution</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">Create Account</h1>
            <p className="mt-2 text-surface-500">Join thousands of happy homeowners in Karachi</p>
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
              <label className="block text-sm font-semibold text-surface-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                <input
                  type="email"
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
              Create Account
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

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
            {['Verified & skilled professionals', 'Same-day service available', 'Transparent pricing, no hidden fees', 'Easy rescheduling & cancellation'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/80">
                <CheckCircle className="h-4 w-4 text-emerald-300 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
