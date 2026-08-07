'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, Calendar, MapPin, User, Settings, LogOut,
  Clock, CheckCircle, XCircle, ChevronRight, Plus, Star, Phone, Mail
} from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: User },
];

// Mock data — will be replaced by API
const mockUser = {
  name: 'Ahmed Khan',
  email: 'ahmed@example.com',
  phone: '+92 300 1234567',
  memberSince: 'March 2025',
};

const mockBookings = [
  { id: 'BK-001', service: 'Plumbing', problem: 'Tap is leaking', date: '15 Aug 2026', time: '11:00 AM', status: 'confirmed', address: 'DHA Phase 6, Karachi', price: 'PKR 1,500' },
  { id: 'BK-002', service: 'AC Repair', problem: 'AC not cooling', date: '12 Aug 2026', time: '02:00 PM', status: 'completed', address: 'DHA Phase 6, Karachi', price: 'PKR 3,200' },
  { id: 'BK-003', service: 'Electrical', problem: 'Fan not working', date: '05 Aug 2026', time: '10:00 AM', status: 'cancelled', address: 'DHA Phase 6, Karachi', price: 'PKR 800' },
];

const mockAddresses = [
  { id: 1, label: 'Home', address: 'House #42, Street 5, DHA Phase 6, Karachi', isDefault: true },
  { id: 2, label: 'Office', address: 'Office #12, 3rd Floor, Clifton Block 9, Karachi', isDefault: false },
];

const statusConfig = {
  confirmed: { icon: CheckCircle, className: 'bg-emerald-50 text-emerald-700', label: 'Confirmed' },
  completed: { icon: CheckCircle, className: 'bg-brand-50 text-brand-700', label: 'Completed' },
  cancelled: { icon: XCircle, className: 'bg-rose-50 text-rose-700', label: 'Cancelled' },
  pending: { icon: Clock, className: 'bg-amber-50 text-amber-700', label: 'Pending' },
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <main className="min-h-screen bg-surface-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-surface-200 p-6 sticky top-28">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-surface-100">
                <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
                  {mockUser.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-surface-900 truncate">{mockUser.name}</p>
                  <p className="text-sm text-surface-400 truncate">{mockUser.email}</p>
                </div>
              </div>

              {/* Nav */}
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-surface-500 hover:bg-surface-50 hover:text-surface-700'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-surface-100">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 transition-all">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Bookings', value: '12', icon: Calendar, color: 'bg-brand-50 text-brand-600' },
                    { label: 'Completed', value: '8', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Upcoming', value: '2', icon: Clock, color: 'bg-amber-50 text-amber-600' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl border border-surface-200 p-5">
                      <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <p className="text-2xl font-bold text-surface-900">{stat.value}</p>
                      <p className="text-sm text-surface-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl border border-surface-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-surface-900">Recent Bookings</h2>
                    <button onClick={() => setActiveTab('bookings')} className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                      View All <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockBookings.slice(0, 3).map((booking) => {
                      const status = statusConfig[booking.status];
                      const StatusIcon = status.icon;
                      return (
                        <Link
                          key={booking.id}
                          href={`/account/bookings/${booking.id}`}
                          className="flex items-center justify-between p-4 rounded-xl border border-surface-100 hover:border-brand-200 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center">
                              <Calendar className="h-4 w-4 text-surface-500" />
                            </div>
                            <div>
                              <p className="font-semibold text-surface-900">{booking.service}</p>
                              <p className="text-sm text-surface-400">{booking.date} · {booking.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>
                              <StatusIcon className="h-3 w-3" />
                              {status.label}
                            </span>
                            <ChevronRight className="h-4 w-4 text-surface-300" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-surface-200 p-6">
                  <h2 className="text-lg font-bold text-surface-900 mb-4">Quick Actions</h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Link href="/book" className="flex items-center gap-3 p-4 rounded-xl bg-brand-50 hover:bg-brand-100 transition-colors">
                      <Plus className="h-5 w-5 text-brand-600" />
                      <span className="font-semibold text-brand-700 text-sm">New Booking</span>
                    </Link>
                    <Link href="/services" className="flex items-center gap-3 p-4 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors">
                      <Star className="h-5 w-5 text-surface-500" />
                      <span className="font-semibold text-surface-700 text-sm">Browse Services</span>
                    </Link>
                    <Link href="/contact" className="flex items-center gap-3 p-4 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors">
                      <Phone className="h-5 w-5 text-surface-500" />
                      <span className="font-semibold text-surface-700 text-sm">Get Support</span>
                    </Link>
                  </div>
                </div>
              </>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl border border-surface-200 p-6">
                <h2 className="text-lg font-bold text-surface-900 mb-6">My Bookings</h2>
                {mockBookings.length === 0 ? (
                  <div className="text-center py-16">
                    <Calendar className="h-16 w-16 text-surface-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-surface-700 mb-2">No bookings yet</h3>
                    <p className="text-surface-400 mb-6">Book your first service and it will appear here.</p>
                    <Link href="/book" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-white font-semibold hover:bg-brand-700 transition-colors">
                      <Plus className="h-4 w-4" /> Book a Service
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mockBookings.map((booking) => {
                      const status = statusConfig[booking.status];
                      const StatusIcon = status.icon;
                      return (
                        <Link
                          key={booking.id}
                          href={`/account/bookings/${booking.id}`}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-surface-100 hover:border-brand-200 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-surface-100 flex items-center justify-center flex-shrink-0">
                              <Calendar className="h-5 w-5 text-surface-500" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <p className="font-semibold text-surface-900">{booking.service}</p>
                                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}>
                                  <StatusIcon className="h-3 w-3" />
                                  {status.label}
                                </span>
                              </div>
                              <p className="text-sm text-surface-400">{booking.problem}</p>
                              <p className="text-sm text-surface-400">{booking.date} at {booking.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 ml-16 sm:ml-0">
                            <span className="font-semibold text-surface-900">{booking.price}</span>
                            <ChevronRight className="h-4 w-4 text-surface-300" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl border border-surface-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-surface-900">Saved Addresses</h2>
                  <button className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Add New
                  </button>
                </div>
                <div className="space-y-4">
                  {mockAddresses.map((addr) => (
                    <div key={addr.id} className="flex items-start justify-between p-5 rounded-xl border border-surface-100 hover:border-brand-200 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MapPin className="h-4 w-4 text-surface-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-surface-900">{addr.label}</p>
                            {addr.isDefault && (
                              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-600">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-surface-400 leading-relaxed">{addr.address}</p>
                        </div>
                      </div>
                      <button className="text-sm text-surface-400 hover:text-brand-600 font-medium">Edit</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-surface-200 p-6">
                <h2 className="text-lg font-bold text-surface-900 mb-6">Profile Settings</h2>
                <div className="flex items-center gap-5 mb-8 pb-8 border-b border-surface-100">
                  <div className="w-20 h-20 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold text-3xl">
                    {mockUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-surface-900">{mockUser.name}</p>
                    <p className="text-sm text-surface-400">Member since {mockUser.memberSince}</p>
                  </div>
                </div>

                <div className="space-y-5 max-w-lg">
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                      <input
                        type="text"
                        defaultValue={mockUser.name}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-surface-200 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                      <input
                        type="tel"
                        defaultValue={mockUser.phone}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-surface-200 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                      <input
                        type="email"
                        defaultValue={mockUser.email}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-surface-200 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      />
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-white font-semibold hover:bg-brand-700 transition-colors">
                    <Settings className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
