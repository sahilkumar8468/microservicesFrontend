'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Calendar, MapPin, User, Settings, LogOut,
  Clock, CheckCircle, XCircle, ChevronRight, Plus, Star, Phone, Mail,
  RefreshCw
} from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
  { id: 'profile', label: 'Profile', icon: User },
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
  const router = useRouter();
  const { user, token, loading, logout, updateProfile, API_URL } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileErrorMsg, setProfileErrorMsg] = useState('');

  // Redirect to login if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Sync profile form state when user changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || ''
      });
      fetchUserBookings();
    }
  }, [user]);

  // Fetch actual bookings from backend
  const fetchUserBookings = async () => {
    if (!user || !user.email) return;
    setLoadingBookings(true);
    try {
      const res = await fetch(`${API_URL}/bookings?email=${encodeURIComponent(user.email)}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (e) {
      console.error('Error fetching user bookings:', e);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Handle Profile Update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccessMsg('');
    setProfileErrorMsg('');
    try {
      await updateProfile(profileForm.name, profileForm.phone);
      setProfileSuccessMsg('Profile changes saved successfully!');
    } catch (err) {
      setProfileErrorMsg(err.message || 'Failed to save changes.');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleLogoutClick = async () => {
    await logout();
    router.push('/login');
  };

  if (loading || (!user && !loading)) {
    return (
      <main className="min-h-screen bg-surface-50 flex items-center justify-center pt-24 pb-16">
        <div className="text-center space-y-4">
          <RefreshCw className="h-10 w-10 text-brand-600 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-surface-500">Checking session & loading account...</p>
        </div>
      </main>
    );
  }

  // Stats calculation
  const totalCount = bookings.length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;

  return (
    <main className="min-h-screen bg-surface-50 pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Mobile Header Card (Visible only on < lg screens) */}
        <div className="lg:hidden mb-4 bg-white rounded-2xl border border-surface-200 p-4 space-y-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-base shrink-0">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-surface-900 text-sm truncate">{user.name}</p>
                <p className="text-xs text-surface-400 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogoutClick}
              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all shrink-0"
              title="Sign Out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>


          {/* Horizontal Scrollable Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 -mx-1 px-1 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/20'
                    : 'bg-surface-50 text-surface-600 hover:bg-surface-100'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Desktop Sidebar (Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl border border-surface-200 p-6 sticky top-28 space-y-6 shadow-sm">
              
              {/* User Info */}
              <div className="flex items-center gap-4 pb-6 border-b border-surface-100">
                <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-surface-900 truncate">{user.name}</p>
                  <p className="text-sm text-surface-400 truncate">{user.email}</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : 'text-surface-500 hover:bg-surface-50 hover:text-surface-700'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>


              {/* Sign Out */}
              <div className="pt-4 border-t border-surface-100">
                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { label: 'Total Bookings', value: totalCount, icon: Calendar, color: 'bg-brand-50 text-brand-600' },
                    { label: 'Completed', value: completedCount, icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Upcoming / Pending', value: pendingCount, icon: Clock, color: 'bg-amber-50 text-amber-600' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-5 shadow-sm">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${stat.color} flex items-center justify-center mb-2.5 sm:mb-3`}>
                        <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-surface-900">{loadingBookings ? '...' : stat.value}</p>
                      <p className="text-xs sm:text-sm text-surface-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-base sm:text-lg font-bold text-surface-900">Recent Bookings</h2>
                    <button onClick={() => setActiveTab('bookings')} className="text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                      View All <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                  
                  {loadingBookings ? (
                    <div className="text-center py-8 text-surface-400 text-sm">Loading history...</div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-8 text-surface-400 text-sm">No recent bookings.</div>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 3).map((booking) => {
                        const status = statusConfig[booking.status] || statusConfig.pending;
                        const StatusIcon = status.icon;
                        return (
                          <Link
                            key={booking.id}
                            href={`/account/bookings/${booking.id}`}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-surface-100 hover:border-brand-200 hover:shadow-sm transition-all"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-surface-100 flex items-center justify-center shrink-0">
                                <Calendar className="h-4 w-4 text-surface-500" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-surface-900 text-sm sm:text-base truncate">{booking.serviceName}</p>
                                <p className="text-xs text-surface-400 truncate">{booking.date} · {booking.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-3 pl-13 sm:pl-0">
                              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}>
                                <StatusIcon className="h-3 w-3" />
                                {status.label}
                              </span>
                              <ChevronRight className="h-4 w-4 text-surface-300 shrink-0" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 shadow-sm">
                  <h2 className="text-base sm:text-lg font-bold text-surface-900 mb-3 sm:mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    <Link href="/book" className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-brand-50 hover:bg-brand-100 transition-colors">
                      <Plus className="h-5 w-5 text-brand-600 shrink-0" />
                      <span className="font-semibold text-brand-700 text-sm">New Booking</span>
                    </Link>
                    <Link href="/services" className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors">
                      <Star className="h-5 w-5 text-surface-500 shrink-0" />
                      <span className="font-semibold text-surface-700 text-sm">Browse Services</span>
                    </Link>
                    <Link href="/contact" className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors">
                      <Phone className="h-5 w-5 text-surface-500 shrink-0" />
                      <span className="font-semibold text-surface-700 text-sm">Get Support</span>
                    </Link>
                  </div>
                </div>
              </>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-surface-900 mb-4 sm:mb-6">My Bookings</h2>
                {loadingBookings ? (
                  <div className="text-center py-12 sm:py-16">
                    <RefreshCw className="h-8 w-8 sm:h-10 sm:w-10 text-brand-600 animate-spin mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-surface-400">Loading booking records...</p>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12 sm:py-16">
                    <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-surface-200 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl font-bold text-surface-700 mb-1 sm:mb-2">No bookings yet</h3>
                    <p className="text-xs sm:text-sm text-surface-400 mb-5 sm:mb-6">Book your first service and it will appear here.</p>
                    <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 sm:px-6 py-2.5 sm:py-3 text-white text-sm font-semibold hover:bg-brand-700 transition-colors w-full sm:w-auto">
                      <Plus className="h-4 w-4" /> Book a Service
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.map((booking) => {
                      const status = statusConfig[booking.status] || statusConfig.pending;
                      const StatusIcon = status.icon;
                      return (
                        <Link
                          key={booking.id}
                          href={`/account/bookings/${booking.id}`}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl border border-surface-100 hover:border-brand-200 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-100 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-surface-500" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <p className="font-semibold text-surface-900 text-sm sm:text-base">{booking.serviceName}</p>
                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] sm:text-xs font-semibold ${status.className}`}>
                                  <StatusIcon className="h-3 w-3" />
                                  {status.label}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-surface-500 break-words">{booking.problem}</p>
                              <p className="text-xs text-surface-400 mt-0.5">{booking.date} at {booking.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-3 pl-13 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-100">
                            <span className="font-semibold text-surface-900 text-xs sm:text-sm">{booking.price}</span>
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
              <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-bold text-surface-900">Saved Addresses</h2>
                  <button className="text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                    <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Add New
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {mockAddresses.map((addr) => (
                    <div key={addr.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 sm:p-5 rounded-xl border border-surface-100 hover:border-brand-200 transition-all">
                      <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-100 flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin className="h-4 w-4 text-surface-500" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <p className="font-semibold text-surface-900 text-sm sm:text-base">{addr.label}</p>
                            {addr.isDefault && (
                              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] sm:text-xs font-semibold text-brand-600">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-surface-400 leading-relaxed break-words">{addr.address}</p>
                        </div>
                      </div>
                      <div className="flex justify-end pl-12 sm:pl-0">
                        <button className="text-xs sm:text-sm text-surface-400 hover:text-brand-600 font-medium">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-surface-200 p-4 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-surface-900 mb-4 sm:mb-6">Profile Settings</h2>
                <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-surface-100">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shrink-0">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-bold text-surface-900 truncate">{user.name}</p>
                    <p className="text-xs sm:text-sm text-surface-400">Registered member</p>
                  </div>
                </div>

                {profileSuccessMsg && (
                  <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-semibold rounded-xl">
                    {profileSuccessMsg}
                  </div>
                )}

                {profileErrorMsg && (
                  <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm font-semibold rounded-xl">
                    {profileErrorMsg}
                  </div>
                )}

                <form onSubmit={handleProfileUpdate} className="space-y-4 sm:space-y-5 max-w-lg">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-surface-700 mb-1.5 sm:mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-surface-200 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-surface-700 mb-1.5 sm:mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-surface-200 text-surface-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-surface-700 mb-1.5 sm:mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-300" />
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-surface-200 text-surface-400 bg-surface-50 cursor-not-allowed"
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs text-surface-400 mt-1 block">Email address cannot be changed.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 sm:py-3 text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
                  >
                    {profileSaving ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Settings className="h-4 w-4" />
                    )}
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
