'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

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
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">Welcome Back</h1>
            <p className="mt-2 text-surface-500">Sign in to manage your bookings and account</p>
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
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-white font-semibold hover:bg-brand-700 active:scale-[0.98] transition-all shadow-lg shadow-brand-200"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

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
        {/* Decorative shapes */}
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
