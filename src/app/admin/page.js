'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import InteractiveCoverageMap from '@/components/interactive-coverage-map';
import {
  Users, Radio, Wrench, Plus, Trash2, Edit, CheckCircle,
  Calendar, Clock, LogOut, ShieldAlert, RefreshCw, Star,
  UserCheck, KeySquare, Eye, EyeOff, ShieldCheck, AlertTriangle,
  Search, Mail, Phone, Globe, Shield, Activity, MapPin, Sliders,
  Navigation, Save, Map as MapIcon, Send, CheckSquare, Square
} from 'lucide-react';

export default function AdminPage() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Access Gate State
  const [loginMode, setLoginMode] = useState('credentials'); // 'credentials' | 'code'
  const [adminUsernameInput, setAdminUsernameInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Dashboard Stats
  const [metrics, setMetrics] = useState({ totalAccounts: 0, currentlyLoggedIn: 0, googleUsers: 0 });
  const [loadingMetrics, setLoadingMetrics] = useState(false);

  // Tabs: 'users', 'bookings', 'employees', 'service-area'
  const [activeTab, setActiveTab] = useState('users');

  // Customer Users / Sessions State
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userSearch, setUserSearch] = useState('');

  // Service Area & Radius Map State
  const [serviceArea, setServiceArea] = useState({
    baseCity: 'Karachi',
    centerName: 'DHA Phase 5, Karachi',
    centerLat: 24.8138,
    centerLng: 67.0671,
    fromDistanceKm: 0,
    toDistanceKm: 15,
    coveredLocations: ['dha-5', 'dha-6', 'dha-7', 'dha-8', 'clifton', 'pechs', 'gulshan', 'gulistan-jauhar', 'nazimabad', 'north-nazimabad', 'bahadurabad'],
    statusMessage: 'Currently serving within 0 - 15 km of DHA & Clifton'
  });
  const [loadingServiceArea, setLoadingServiceArea] = useState(false);
  const [savingServiceArea, setSavingServiceArea] = useState(false);
  const [serviceAreaNotice, setServiceAreaNotice] = useState('');

  // Employee CRUD State
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [empForm, setEmpForm] = useState({ name: '', email: '', phone: '', specialty: '' });
  const [empError, setEmpError] = useState('');
  const [empSubmitting, setEmpSubmitting] = useState(false);

  // Bookings / Assignment State
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [assigningBookingId, setAssigningBookingId] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [assigningSubmitting, setAssigningSubmitting] = useState(false);

  // Custom Services Management State
  const [customServices, setCustomServices] = useState([]);
  const [loadingCustomServices, setLoadingCustomServices] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    icon: 'Wrench',
    image: '',
    description: '',
    shortDesc: '',
    microServices: ''
  });
  const [serviceError, setServiceError] = useState('');
  const [serviceSubmitting, setServiceSubmitting] = useState(false);

  // Email Marketing State
  const [emailTargetType, setEmailTargetType] = useState('all'); // 'all' | 'selected'
  const [selectedRecipientEmails, setSelectedRecipientEmails] = useState([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailNotice, setEmailNotice] = useState('');
  const [emailError, setEmailError] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://micro-services-backend.vercel.app/api';

  const getAdminToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hs_admin_token') || '';
    }
    return '';
  };

  // Restore & verify admin session from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('hs_admin_token');
      if (token) {
        verifyAdminToken(token);
      }
    }
  }, []);

  const verifyAdminToken = async (token) => {
    try {
      const res = await fetch(`${API_URL}/admin/verify-token`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setIsAdminLoggedIn(true);
      } else {
        handleAdminLogout();
      }
    } catch (e) {
      console.error('Admin token verification error:', e);
      setIsAdminLoggedIn(true);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchAllAdminData();
    }
  }, [isAdminLoggedIn]);

  const fetchAllAdminData = () => {
    fetchMetrics();
    fetchUsers();
    fetchEmployees();
    fetchBookings();
    fetchServiceArea();
    fetchCustomServices();
    fetchCampaigns();
  };

  const fetchCampaigns = async () => {
    setLoadingCampaigns(true);
    try {
      const token = getAdminToken();
      const res = await fetch(`${API_URL}/admin/email-campaigns`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data);
      }
    } catch (e) {
      console.error('Error fetching campaigns:', e);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  const handleSendEmailBroadcast = async (e) => {
    e.preventDefault();
    setSendingEmail(true);
    setEmailNotice('');
    setEmailError('');

    try {
      const token = getAdminToken();
      const payload = {
        targetType: emailTargetType,
        recipientEmails: selectedRecipientEmails,
        subject: emailSubject,
        body: emailBody
      };

      const res = await fetch(`${API_URL}/admin/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send broadcast');

      setEmailNotice(data.message);
      setEmailSubject('');
      setEmailBody('');
      setSelectedRecipientEmails([]);
      fetchCampaigns();
    } catch (err) {
      setEmailError(err.message);
    } finally {
      setSendingEmail(false);
    }
  };

  const toggleRecipientEmail = (email) => {
    setSelectedRecipientEmails(prev =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  const fetchCustomServices = async () => {
    setLoadingCustomServices(true);
    try {
      const res = await fetch(`${API_URL}/services`);
      if (res.ok) {
        const data = await res.json();
        setCustomServices(data);
      }
    } catch (e) {
      console.error('Error fetching custom services:', e);
    } finally {
      setLoadingCustomServices(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setServiceSubmitting(true);
    setServiceError('');
    try {
      const token = getAdminToken();
      const res = await fetch(`${API_URL}/admin/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(serviceForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create service');

      setShowServiceModal(false);
      setServiceForm({ name: '', icon: 'Wrench', image: '', description: '', shortDesc: '', microServices: '' });
      fetchCustomServices();
    } catch (err) {
      setServiceError(err.message);
    } finally {
      setServiceSubmitting(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!confirm('Are you sure you want to remove this service?')) return;
    try {
      const token = getAdminToken();
      const res = await fetch(`${API_URL}/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchCustomServices();
      }
    } catch (e) {
      console.error('Failed to delete service:', e);
    }
  };

  // ── ACCESS CODE & CREDENTIALS VERIFICATION via Backend ────────────
  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    if (!adminUsernameInput.trim() || !adminPasswordInput.trim()) {
      setLoginError('Please enter both admin username and password.');
      return;
    }

    setIsVerifying(true);
    setLoginError('');

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: adminUsernameInput.trim(),
          password: adminPasswordInput.trim()
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('hs_admin_token', data.token);
        setIsAdminLoggedIn(true);
        setLoginError('');
        setAttempts(0);
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        setLoginError(data.error || 'Invalid admin username or password.');
      }
    } catch (err) {
      setLoginError('Cannot connect to backend server. Ensure backend is running on port 5000.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeVerify = async (e) => {
    e.preventDefault();
    if (!codeInput.trim()) {
      setLoginError('Please enter the access code.');
      return;
    }

    setIsVerifying(true);
    setLoginError('');

    try {
      const res = await fetch(`${API_URL}/admin/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeInput.trim() })
      });

      const data = await res.json();

      if (res.ok) {
        // Valid code — save token and grant access
        localStorage.setItem('hs_admin_token', data.token);
        setIsAdminLoggedIn(true);
        setLoginError('');
        setAttempts(0);
      } else {
        // Wrong code
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        setLoginError(data.error || 'Access denied. Invalid code.');
        setCodeInput('');
      }
    } catch (err) {
      setLoginError('Cannot connect to backend server. Ensure it is running on port 5000.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('hs_admin_token');
    setIsAdminLoggedIn(false);
    setCodeInput('');
    setLoginError('');
    setAttempts(0);
  };

  // ── DATA FETCHING ───────────────────────────────────────────────────
  const fetchMetrics = async () => {
    setLoadingMetrics(true);
    try {
      const token = getAdminToken();
      const res = await fetch(`${API_URL}/admin/metrics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setMetrics(await res.json());
    } catch (e) { console.error('Metrics fetch error:', e); }
    finally { setLoadingMetrics(false); }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const token = getAdminToken();
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (e) { console.error('Users fetch error:', e); }
    finally { setLoadingUsers(false); }
  };

  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const token = getAdminToken();
      const res = await fetch(`${API_URL}/employees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setEmployees(await res.json());
    } catch (e) { console.error('Employees fetch error:', e); }
    finally { setLoadingEmployees(false); }
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const token = getAdminToken();
      const res = await fetch(`${API_URL}/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (e) { console.error('Bookings fetch error:', e); }
    finally { setLoadingBookings(false); }
  };

  const fetchServiceArea = async () => {
    setLoadingServiceArea(true);
    try {
      const res = await fetch(`${API_URL}/service-area`);
      if (res.ok) {
        const data = await res.json();
        setServiceArea(data);
      }
    } catch (e) {
      console.error('Service area fetch error:', e);
    } finally {
      setLoadingServiceArea(false);
    }
  };

  const handleSaveServiceArea = async (e) => {
    if (e) e.preventDefault();
    setSavingServiceArea(true);
    setServiceAreaNotice('');

    try {
      const token = getAdminToken();
      const res = await fetch(`${API_URL}/admin/service-area`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(serviceArea)
      });

      const data = await res.json();
      if (res.ok) {
        setServiceArea(data.config);
        setServiceAreaNotice('Service Area Coverage updated and live on website!');
        setTimeout(() => setServiceAreaNotice(''), 4000);
      } else {
        alert(data.error || 'Failed to update service area');
      }
    } catch (e) {
      console.error('Error saving service area:', e);
      alert('Error connecting to backend server');
    } finally {
      setSavingServiceArea(false);
    }
  };

  // ── EMPLOYEE CRUD ───────────────────────────────────────────────────
  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    setEmpError('');
    setEmpSubmitting(true);

    const url = editingEmployee
      ? `${API_URL}/employees/${editingEmployee.id}`
      : `${API_URL}/employees`;
    const method = editingEmployee ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save employee');
      fetchEmployees();
      setShowEmployeeModal(false);
      setEditingEmployee(null);
      setEmpForm({ name: '', email: '', phone: '', specialty: '' });
    } catch (err) {
      setEmpError(err.message);
    } finally {
      setEmpSubmitting(false);
    }
  };

  const deleteEmployee = async (id) => {
    if (!confirm('Remove this employee from the system?')) return;
    const res = await fetch(`${API_URL}/employees/${id}`, { method: 'DELETE' });
    if (res.ok) fetchEmployees();
  };

  const startEditEmployee = (emp) => {
    setEditingEmployee(emp);
    setEmpForm({ name: emp.name, email: emp.email, phone: emp.phone, specialty: emp.specialty });
    setEmpError('');
    setShowEmployeeModal(true);
  };

  // ── BOOKING ASSIGNMENT & LIFECYCLE STAGES ───────────────────────────
  const handleAssignEmployee = async (bookingId) => {
    if (!selectedEmployeeId) { alert('Select an employee first'); return; }
    setAssigningSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/assign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId: selectedEmployeeId })
      });
      if (res.ok) { fetchBookings(); setAssigningBookingId(null); setSelectedEmployeeId(''); }
      else { const d = await res.json(); alert(d.error || 'Assignment failed'); }
    } catch (e) { console.error(e); }
    finally { setAssigningSubmitting(false); }
  };

  const handleUpdateBookingStatus = async (bookingId, nextStatus) => {
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        fetchBookings();
      } else {
        const d = await res.json();
        alert(d.error || 'Status update failed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ══════════════════════════════════════════════════
  // ADMIN USERNAME & PASSWORD GATEWAY (Strict Security)
  // ══════════════════════════════════════════════════
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-brand-50/20 to-surface-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl" />
        </div>

        <div className="relative w-full max-w-md">
          {/* Card */}
          <div className="bg-white border border-surface-200 rounded-3xl p-8 sm:p-10 shadow-xl">
            {/* Logo / Header */}
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white border border-surface-200 p-1 flex items-center justify-center mb-4 shadow-lg shadow-surface-900/10">
                <img src="/logo.png" alt="UniversalInterior & Microservices" className="w-full h-full object-contain" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-surface-900 tracking-tight">
                Universal<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Interior</span>
              </div>
              <span className="text-[11px] font-bold tracking-widest text-surface-400 uppercase mt-0.5">& Microservices</span>
              <h1 className="text-sm font-bold text-surface-800 mt-2">Admin Access Control</h1>
              <p className="text-surface-500 text-xs mt-1">
                Enter your administrative credentials to open the control panel
              </p>
            </div>

            {/* Error banner */}
            {loginError && (
              <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl">
                <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-rose-700 text-xs font-bold">{loginError}</p>
                  {attempts > 0 && (
                    <p className="text-rose-500/80 text-[11px] mt-0.5">
                      Attempt {attempts} — security breach alert logged.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Username & Password Form */}
            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-1.5">
                  Admin Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={adminUsernameInput}
                  onChange={(e) => setAdminUsernameInput(e.target.value)}
                  autoComplete="off"
                  className="w-full bg-surface-50 border border-surface-200 text-surface-900 placeholder:text-surface-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-50 focus:border-brand-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showCode ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    autoComplete="off"
                    className="w-full bg-surface-50 border border-surface-200 text-surface-900 placeholder:text-surface-400 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-4 focus:ring-brand-50 focus:border-brand-500 font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-700 transition-colors"
                  >
                    {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying || !adminUsernameInput.trim() || !adminPasswordInput.trim()}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-brand-600/20 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Sign In to Control Panel
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-surface-400 text-xs mt-6 font-medium">
              Protected Administrator Portal · High Security Session
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════
  // ADMIN DASHBOARD (Post-authentication - Light Theme)
  // ══════════════════════════════════════════════════
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-surface-50 text-surface-900 pb-16">
      {/* ── ADMIN NAVBAR (Exact UI & Styling of Main Site Navbar) ── */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md py-3.5 border-b border-surface-200/80 shadow-sm transition-all w-full max-w-full overflow-x-hidden">
        <div className="w-full max-w-full px-4 sm:px-8 flex items-center justify-between gap-4">
          
          {/* Logo (Identical to Main Site Navbar) */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-white border border-surface-200 p-0.5 overflow-hidden flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="UniversalInterior & Microservices" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl text-surface-900 tracking-tight block leading-none">
                  Universal<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Interior</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-800 border border-orange-200">
                  Admin
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-surface-400 uppercase block mt-1">
                & Microservices · Control Panel
              </span>
            </div>
          </Link>

          {/* Desktop Nav Pills (Identical styling to main site nav: bg-surface-50/80 p-1.5 rounded-2xl border border-surface-200/60 shadow-inner) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-surface-50/80 p-1.5 rounded-2xl border border-surface-200/60 shadow-inner overflow-x-auto no-scrollbar">
            {[
              { id: 'users', label: 'Customers', count: users.length },
              { id: 'bookings', label: 'Assignments', count: bookings.filter(b => b.status === 'pending').length, badge: 'pending' },
              { id: 'employees', label: 'Workers', count: employees.length },
              { id: 'services', label: 'Services', count: customServices.length },
              { id: 'email-marketing', label: 'Email Marketing' },
              { id: 'service-area', label: 'Coverage Area' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-bold transition-all rounded-xl flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 shadow-md shadow-orange-500/20 font-extrabold'
                      : 'text-surface-600 hover:text-brand-700 hover:bg-white rounded-xl hover:shadow-sm'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-extrabold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-surface-200/80 text-surface-700'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && tab.count > 0 && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls (Desktop & Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-surface-700 hover:text-brand-600 bg-surface-50 hover:bg-white border border-surface-200 rounded-xl transition-all shadow-xs flex items-center gap-1"
            >
              <Globe size={13} className="text-orange-500" />
              <span className="hidden sm:inline">Main Site ↗</span>
              <span className="sm:hidden">Site ↗</span>
            </Link>
            <button
              onClick={handleAdminLogout}
              className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-all flex items-center gap-1"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden bg-white border-b border-surface-200 px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 sticky top-[73px] z-40 shadow-xs">
        {[
          { id: 'users', label: 'Customers', count: users.length },
          { id: 'bookings', label: 'Assignments', count: bookings.filter(b => b.status === 'pending').length },
          { id: 'employees', label: 'Workers', count: employees.length },
          { id: 'services', label: 'Services', count: customServices.length },
          { id: 'email-marketing', label: 'Email' },
          { id: 'service-area', label: 'Coverage' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 transition-all ${
                isActive
                  ? 'text-white bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 font-extrabold shadow-md shadow-orange-500/20'
                  : 'text-surface-600 bg-surface-50 border border-surface-200/80 hover:bg-white'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && <span className="text-[10px] font-mono font-bold">({tab.count})</span>}
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-full px-4 sm:px-8 py-8 overflow-x-hidden">

        {/* ── USER ACCOUNTS & SESSIONS TAB ── */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-surface-900 font-bold text-base flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-brand-600" />
                  Customer Accounts & Live Sessions
                </h2>
                <p className="text-surface-500 text-xs mt-0.5 font-medium">
                  User profiles registered via Google SSO or Email/Password authentication
                </p>
              </div>

              {/* Search filter */}
              <div className="relative w-full md:w-64">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
                <input
                  type="text"
                  placeholder="Filter users by name/email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full bg-surface-50 border border-surface-200 text-surface-900 text-xs rounded-xl pl-9 pr-3 py-2.5 placeholder:text-surface-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 font-medium"
                />
              </div>
            </div>

            {loadingUsers ? (
              <div className="py-20 text-center text-surface-500 font-semibold">
                <RefreshCw className="h-7 w-7 animate-spin mx-auto mb-2 text-brand-600" />
                Loading registered profiles…
              </div>
            ) : users.length === 0 ? (
              <div className="py-16 text-center text-surface-400">
                <Users className="h-10 w-10 mx-auto mb-2 opacity-30 text-surface-500" />
                <p className="text-sm font-semibold text-surface-700">No registered users found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-surface-50 text-surface-500 text-xs uppercase font-bold tracking-wider border-b border-surface-200">
                    <tr>
                      <th className="px-5 py-3.5">User Profile</th>
                      <th className="px-5 py-3.5">Contact</th>
                      <th className="px-5 py-3.5">Auth Method</th>
                      <th className="px-5 py-3.5">Session State</th>
                      <th className="px-5 py-3.5">Member Since</th>
                      <th className="px-5 py-3.5">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    {users
                      .filter(u =>
                        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                        (u.phone && u.phone.includes(userSearch))
                      )
                      .map((u) => {
                        const isGoogle = u.authProvider === 'google' || Boolean(u.googleId);
                        return (
                          <tr key={u.id || u.email} className="hover:bg-surface-50/80 transition-colors">
                            {/* Profile */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center text-sm shadow-sm ${
                                  isGoogle
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-brand-600 text-white'
                                }`}>
                                  {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                  <p className="text-surface-900 font-bold text-sm leading-tight">{u.name}</p>
                                  <p className="text-surface-400 font-mono text-[11px] mt-0.5">{u.id}</p>
                                </div>
                              </div>
                            </td>

                            {/* Contact */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-1.5 text-surface-700 text-xs font-semibold mb-1">
                                <Mail className="h-3.5 w-3.5 text-surface-400" />
                                {u.email}
                              </div>
                              {u.phone && u.phone !== 'N/A' ? (
                                <div className="flex items-center gap-1.5 text-surface-500 text-[11px] font-mono">
                                  <Phone className="h-3 w-3 text-surface-400" />
                                  {u.phone}
                                </div>
                              ) : (
                                <span className="text-surface-400 text-[11px] italic">No phone added</span>
                              )}
                            </td>

                            {/* Auth Method */}
                            <td className="px-5 py-4">
                              {isGoogle ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 border border-blue-200 text-blue-700">
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.33 24 12 24z"/>
                                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                                  </svg>
                                  Google SSO
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface-100 border border-surface-200 text-surface-700">
                                  <Mail className="w-3.5 h-3.5 text-brand-600" />
                                  Email & Password
                                </span>
                              )}
                            </td>

                            {/* Session State */}
                            <td className="px-5 py-4">
                              {u.isLoggedIn ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 border border-emerald-200 text-emerald-700 uppercase tracking-wider">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                  Active Online
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface-100 border border-surface-200 text-surface-500">
                                  <span className="w-2 h-2 rounded-full bg-surface-400" />
                                  Offline
                                </span>
                              )}
                            </td>

                            {/* Member Since */}
                            <td className="px-5 py-4 text-surface-600 text-xs font-semibold">
                              {u.memberSince}
                            </td>

                            {/* Last Active */}
                            <td className="px-5 py-4 text-surface-600 text-xs font-semibold">
                              {u.isLoggedIn ? (
                                <span className="text-emerald-700 font-extrabold">Active Right Now</span>
                              ) : u.lastLoginAt ? (
                                new Date(u.lastLoginAt).toLocaleString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              ) : (
                                <span className="text-surface-400 italic font-normal">No login record</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── BOOKINGS TAB ── */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-100 flex items-center justify-between">
              <div>
                <h2 className="text-surface-900 font-bold text-base">Service Assignment Dashboard</h2>
                <p className="text-surface-500 text-xs mt-0.5 font-medium">Assign active service professionals to customer bookings</p>
              </div>
            </div>

            {loadingBookings ? (
              <div className="py-20 text-center text-surface-500 font-semibold">
                <RefreshCw className="h-7 w-7 animate-spin mx-auto mb-2 text-brand-600" />
                Loading booking records…
              </div>
            ) : bookings.length === 0 ? (
              <div className="py-16 text-center text-surface-400">
                <Calendar className="h-10 w-10 mx-auto mb-2 opacity-30 text-surface-500" />
                <p className="text-sm font-semibold text-surface-700">No customer bookings found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-surface-50 text-surface-500 text-xs uppercase font-bold tracking-wider border-b border-surface-200">
                    <tr>
                      <th className="px-5 py-3.5">Ref & OTP</th>
                      <th className="px-5 py-3.5">Customer</th>
                      <th className="px-5 py-3.5">Service Requested</th>
                      <th className="px-5 py-3.5">Schedule</th>
                      <th className="px-5 py-3.5">Lifecycle Status</th>
                      <th className="px-5 py-3.5">Assigned Professional</th>
                      <th className="px-5 py-3.5 text-right">Lifecycle Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    {bookings.map((booking) => {
                      const emp = employees.find(e => e.id === booking.employeeId);
                      return (
                        <tr key={booking.id} className="hover:bg-surface-50/80 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-bold text-surface-900 font-mono text-xs">{booking.id}</p>
                            {booking.otpCode && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold font-mono bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded mt-1">
                                🔑 OTP: {booking.otpCode}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-surface-600 text-xs font-semibold">{booking.userEmail}</td>
                          <td className="px-5 py-4">
                            <p className="text-surface-900 font-bold text-xs">{booking.serviceName}</p>
                            <p className="text-surface-500 text-[11px] mt-0.5 max-w-[150px] truncate font-medium">{booking.problem}</p>
                            {Array.isArray(booking.photos) && booking.photos.length > 0 && (
                              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                                {booking.photos.map((photo, pIdx) => (
                                  <a
                                    key={pIdx}
                                    href={photo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-7 h-7 rounded-lg overflow-hidden border border-surface-300 hover:border-orange-500 transition-all shrink-0 shadow-xs"
                                    title="Click to view full issue photo"
                                  >
                                    <img src={photo} alt={`Issue ${pIdx + 1}`} className="w-full h-full object-cover" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-surface-900 text-xs font-semibold">{booking.date}</p>
                            <p className="text-surface-500 text-[11px] font-medium">{booking.time}</p>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              booking.status === 'pending' ? 'bg-amber-50 border border-amber-200 text-amber-700' :
                              booking.status === 'employee_assigned' ? 'bg-blue-50 border border-blue-200 text-blue-700' :
                              booking.status === 'dispatched' ? 'bg-purple-50 border border-purple-200 text-purple-700' :
                              booking.status === 'reached' ? 'bg-sky-50 border border-sky-200 text-sky-700' :
                              booking.status === 'in_progress' ? 'bg-orange-50 border border-orange-200 text-orange-700' :
                              booking.status === 'completed' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' :
                              'bg-rose-50 border border-rose-200 text-rose-700'
                            }`}>
                              {booking.status === 'employee_assigned' ? 'Worker Assigned' :
                               booking.status === 'dispatched' ? 'Worker En-Route' :
                               booking.status === 'reached' ? 'Reached Client' :
                               booking.status === 'in_progress' ? 'Work In Progress' :
                               booking.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {emp ? (
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-200 text-brand-700 font-bold text-xs flex items-center justify-center">
                                  {emp.name.charAt(0)}
                                </div>
                                <div>
                                  <span className="text-surface-900 text-xs font-bold block">{emp.name}</span>
                                  <span className="text-surface-400 text-[10px]">{emp.phone}</span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-rose-600 text-xs font-bold italic bg-rose-50 px-2 py-0.5 rounded border border-rose-100">Unassigned</span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-right">
                            {assigningBookingId === booking.id ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <select
                                  value={selectedEmployeeId}
                                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                  className="bg-surface-50 border border-surface-200 text-surface-900 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-500 font-medium"
                                >
                                  <option value="">Select worker…</option>
                                  {employees.map(e => (
                                    <option key={e.id} value={e.id}>{e.name} ({e.specialty})</option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => handleAssignEmployee(booking.id)}
                                  disabled={assigningSubmitting}
                                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-40"
                                >
                                  {assigningSubmitting ? '…' : 'Save'}
                                </button>
                                <button
                                  onClick={() => setAssigningBookingId(null)}
                                  className="px-2 py-1.5 border border-surface-200 text-surface-500 hover:text-surface-900 text-xs rounded-lg"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                {booking.status === 'pending' && (
                                  <button
                                    onClick={() => { setAssigningBookingId(booking.id); setSelectedEmployeeId(booking.employeeId || ''); }}
                                    className="px-3 py-1.5 text-xs font-bold border border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-lg transition-all"
                                  >
                                    Assign Worker
                                  </button>
                                )}
                                {booking.status === 'employee_assigned' && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateBookingStatus(booking.id, 'dispatched')}
                                      className="px-3 py-1.5 text-xs font-bold border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg transition-all"
                                    >
                                      Discharge En-Route
                                    </button>
                                    <button
                                      onClick={() => { setAssigningBookingId(booking.id); setSelectedEmployeeId(booking.employeeId || ''); }}
                                      className="px-2 py-1.5 text-xs text-surface-500 hover:text-surface-900"
                                    >
                                      Reassign
                                    </button>
                                  </>
                                )}
                                {booking.status === 'dispatched' && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(booking.id, 'reached')}
                                    className="px-3 py-1.5 text-xs font-bold border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg transition-all"
                                  >
                                    Mark Reached Client
                                  </button>
                                )}
                                {booking.status === 'reached' && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(booking.id, 'in_progress')}
                                    className="px-3 py-1.5 text-xs font-bold border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-lg transition-all"
                                  >
                                    Verify OTP & Start Job
                                  </button>
                                )}
                                {booking.status === 'in_progress' && (
                                  <button
                                    onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                                    className="px-3 py-1.5 text-xs font-bold border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-all"
                                  >
                                    Mark Service Done
                                  </button>
                                )}
                                {booking.status === 'completed' && (
                                  <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                                    <CheckCircle className="h-3.5 w-3.5" /> Completed
                                  </span>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── EMPLOYEES TAB ── */}
        {activeTab === 'employees' && (
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-100 flex items-center justify-between">
              <div>
                <h2 className="text-surface-900 font-bold text-base">Worker Roster</h2>
                <p className="text-surface-500 text-xs mt-0.5 font-medium">Manage technicians and service professionals</p>
              </div>
              <button
                onClick={() => { setEditingEmployee(null); setEmpForm({ name: '', email: '', phone: '', specialty: '' }); setEmpError(''); setShowEmployeeModal(true); }}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-brand-600/20"
              >
                <Plus className="h-4 w-4" /> Add Worker
              </button>
            </div>

            {loadingEmployees ? (
              <div className="py-20 text-center text-surface-500 font-semibold">
                <RefreshCw className="h-7 w-7 animate-spin mx-auto mb-2 text-brand-600" />
                Loading employees…
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-surface-50 text-surface-500 text-xs uppercase font-bold tracking-wider border-b border-surface-200">
                    <tr>
                      <th className="px-5 py-3.5">Employee</th>
                      <th className="px-5 py-3.5">Specialty</th>
                      <th className="px-5 py-3.5">Phone</th>
                      <th className="px-5 py-3.5">Email</th>
                      <th className="px-5 py-3.5">Rating</th>
                      <th className="px-5 py-3.5">Jobs Completed</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-surface-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 font-bold flex items-center justify-center text-sm shadow-sm">
                              {emp.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-surface-900 font-bold text-sm">{emp.name}</p>
                              <p className="text-surface-400 font-mono text-[10px]">{emp.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-surface-800 font-bold text-xs">{emp.specialty}</td>
                        <td className="px-5 py-4 text-surface-600 font-mono text-xs">{emp.phone}</td>
                        <td className="px-5 py-4 text-surface-500 text-xs">{emp.email}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="text-surface-900 font-extrabold text-xs">{Number(emp.rating).toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-surface-900 font-bold text-xs">{emp.jobs}</td>
                        <td className="px-5 py-4 text-right space-x-1.5">
                          <button
                            onClick={() => startEditEmployee(emp)}
                            className="p-2 border border-surface-200 hover:border-brand-300 hover:bg-brand-50 text-surface-600 hover:text-brand-700 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => deleteEmployee(emp.id)}
                            className="p-2 border border-surface-200 hover:border-rose-300 hover:bg-rose-50 text-surface-600 hover:text-rose-600 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── SERVICE COVERAGE AREA & MAP TAB ── */}
        {activeTab === 'service-area' && (
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-surface-100">
              <div>
                <h2 className="text-surface-900 font-bold flex items-center gap-2 text-base">
                  <MapPin className="h-5 w-5 text-brand-600" />
                  Service Location & Operating Radius Bounds
                </h2>
                <p className="text-surface-500 text-xs mt-0.5 font-medium">
                  Define your operating center, set coverage radius bounds (From / To km), and toggle active serving zones for website reflection.
                </p>
              </div>

              {serviceAreaNotice && (
                <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-bold">
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                  {serviceAreaNotice}
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column - Controls & Configuration Form */}
              <div className="lg:col-span-7 space-y-6">
                <form onSubmit={handleSaveServiceArea} className="space-y-6">
                  {/* Operating Location Inputs */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-brand-600" /> Operating City
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceArea.baseCity}
                        onChange={(e) => setServiceArea({ ...serviceArea, baseCity: e.target.value })}
                        className="w-full bg-surface-50 border border-surface-200 text-surface-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 font-medium"
                        placeholder="e.g. Karachi"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-brand-600" /> Center Hub Address
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceArea.centerName}
                        onChange={(e) => setServiceArea({ ...serviceArea, centerName: e.target.value })}
                        className="w-full bg-surface-50 border border-surface-200 text-surface-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 font-medium"
                        placeholder="e.g. DHA Phase 5, Karachi"
                      />
                    </div>
                  </div>

                  {/* Radius Range Sliders */}
                  <div className="bg-surface-50 p-5 rounded-2xl border border-surface-200 space-y-5">
                    <h3 className="text-surface-900 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-brand-600" /> Distance Range Coverage (Km)
                    </h3>

                    {/* From Distance */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                        <span className="text-surface-600">From Minimum Distance:</span>
                        <span className="text-brand-700 font-mono font-bold bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                          {serviceArea.fromDistanceKm} km
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={serviceArea.fromDistanceKm}
                        onChange={(e) => setServiceArea({ ...serviceArea, fromDistanceKm: Number(e.target.value) })}
                        className="w-full accent-brand-600 bg-surface-200 h-2 rounded-lg cursor-pointer"
                      />
                      <p className="text-[11px] text-surface-500 mt-1">Starting coverage boundary offset from base hub</p>
                    </div>

                    {/* To Distance */}
                    <div>
                      <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                        <span className="text-surface-600">To Maximum Distance (Service Radius):</span>
                        <span className="text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {serviceArea.toDistanceKm} km
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        step="1"
                        value={serviceArea.toDistanceKm}
                        onChange={(e) => setServiceArea({ ...serviceArea, toDistanceKm: Number(e.target.value) })}
                        className="w-full accent-emerald-600 bg-surface-200 h-2 rounded-lg cursor-pointer"
                      />
                      <p className="text-[11px] text-surface-500 mt-1">Outer boundary radius limit for active technician dispatches</p>
                    </div>
                  </div>

                  {/* Website Banner Status Message */}
                  <div>
                    <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-2">
                      Website Announcement Message
                    </label>
                    <input
                      type="text"
                      value={serviceArea.statusMessage}
                      onChange={(e) => setServiceArea({ ...serviceArea, statusMessage: e.target.value })}
                      className="w-full bg-surface-50 border border-surface-200 text-surface-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 font-medium"
                      placeholder="e.g. Currently serving within 0 - 15 km of DHA & Clifton"
                    />
                  </div>

                  {/* Active Serving Neighborhoods Checkboxes */}
                  <div>
                    <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-2.5">
                      Enabled Serving Zones
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'dha-5', label: 'DHA Phase 5' },
                        { id: 'dha-6', label: 'DHA Phase 6' },
                        { id: 'dha-7', label: 'DHA Phase 7' },
                        { id: 'dha-8', label: 'DHA Phase 8' },
                        { id: 'clifton', label: 'Clifton' },
                        { id: 'pechs', label: 'PECHS' },
                        { id: 'gulshan', label: 'Gulshan-e-Iqbal' },
                        { id: 'gulistan-jauhar', label: 'Gulistan-e-Jauhar' },
                        { id: 'nazimabad', label: 'Nazimabad' },
                        { id: 'north-nazimabad', label: 'North Nazimabad' },
                        { id: 'bahadurabad', label: 'Bahadurabad' },
                        { id: 'karsaz', label: 'Karsaz' },
                        { id: 'malir', label: 'Malir' },
                      ].map((zone) => {
                        const checked = serviceArea.coveredLocations?.includes(zone.id);
                        return (
                          <label
                            key={zone.id}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                              checked
                                ? 'bg-brand-50 border-brand-200 text-brand-700'
                                : 'bg-surface-50 border-surface-200 text-surface-500 hover:text-surface-800'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                const current = serviceArea.coveredLocations || [];
                                const next = e.target.checked
                                  ? [...current, zone.id]
                                  : current.filter(id => id !== zone.id);
                                setServiceArea({ ...serviceArea, coveredLocations: next });
                              }}
                              className="rounded border-surface-300 text-brand-600 focus:ring-brand-500"
                            />
                            {zone.label}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={savingServiceArea}
                    className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-brand-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {savingServiceArea ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" /> Save Service Area & Sync Website
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column - Real Interactive Google/OpenStreetMap Map */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="bg-white rounded-2xl border border-surface-200 p-5 shadow-sm flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapIcon className="h-4 w-4 text-brand-600" />
                      <h3 className="text-surface-900 font-bold text-xs uppercase tracking-wider">Real Interactive Map</h3>
                    </div>
                    <span className="text-emerald-700 text-xs font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {serviceArea.fromDistanceKm} km ➔ {serviceArea.toDistanceKm} km Radius
                    </span>
                  </div>

                  {/* Leaflet Real Tile Interactive Map */}
                  <InteractiveCoverageMap
                    baseCity={serviceArea.baseCity}
                    centerName={serviceArea.centerName}
                    fromDistanceKm={serviceArea.fromDistanceKm}
                    toDistanceKm={serviceArea.toDistanceKm}
                    lat={serviceArea.centerLat || 24.8138}
                    lng={serviceArea.centerLng || 67.0671}
                    onLocationChange={({ lat, lng }) => {
                      setServiceArea(prev => ({
                        ...prev,
                        centerLat: lat,
                        centerLng: lng
                      }));
                    }}
                    isInteractive={true}
                    height="380px"
                  />

                  {/* Summary Footer Details */}
                  <div className="mt-4 pt-3.5 border-t border-surface-100 space-y-2 text-xs font-medium text-surface-600">
                    <div className="flex justify-between">
                      <span>Base Operating Center:</span>
                      <strong className="text-surface-900">{serviceArea.centerName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Live Coordinates:</span>
                      <strong className="text-brand-600 font-mono text-[11px]">
                        {(serviceArea.centerLat || 24.8138).toFixed(4)}° N, {(serviceArea.centerLng || 67.0671).toFixed(4)}° E
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Enabled Neighborhood Zones:</span>
                      <strong className="text-emerald-700 font-bold">{serviceArea.coveredLocations?.length || 0} locations</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SERVICES & CATEGORIES TAB ── */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-surface-900 font-bold text-base flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-orange-600" />
                  Services & Category Management
                </h2>
                <p className="text-surface-500 text-xs mt-0.5 font-medium">
                  Add new microservices or custom service offerings that automatically reflect on the public website and booking flows.
                </p>
              </div>

              <button
                onClick={() => setShowServiceModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-md shadow-orange-600/20 shrink-0"
              >
                <Plus className="h-4 w-4" /> Add New Service
              </button>
            </div>

            {loadingCustomServices ? (
              <div className="py-20 text-center text-surface-500 font-semibold">
                <RefreshCw className="h-7 w-7 animate-spin mx-auto mb-2 text-orange-600" />
                Loading service categories…
              </div>
            ) : customServices.length === 0 ? (
              <div className="p-8 text-center bg-orange-50/50 border-b border-surface-100">
                <p className="text-sm font-semibold text-orange-950">Default 8 Services Currently Active on Frontend.</p>
                <p className="text-xs text-surface-500 mt-1">Click &quot;Add New Service&quot; above to publish an additional custom service offering!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-50 text-surface-500 font-bold uppercase border-b border-surface-200">
                    <tr>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Sub-Services / Microservices</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100 text-surface-700">
                    {customServices.map((srv) => (
                      <tr key={srv.id} className="hover:bg-surface-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-surface-200">
                              <img src={srv.image} alt={srv.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-surface-900 text-sm">{srv.name}</p>
                              <p className="text-[11px] text-surface-400 max-w-xs truncate">{srv.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-sm">
                            {(srv.microServices || []).map((ms) => (
                              <span key={ms} className="bg-orange-50 text-orange-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-orange-200">
                                {ms}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active on Website
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteService(srv.id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-rose-200 inline-flex items-center gap-1 font-extrabold text-xs"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── EMAIL MARKETING & CAMPAIGNS TAB ── */}
        {activeTab === 'email-marketing' && (
          <div className="space-y-6">
            
            {/* Compose Campaign Card */}
            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-surface-100">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-surface-900 font-bold text-base">Send Marketing Email Broadcast</h2>
                  <p className="text-surface-500 text-xs font-medium">Compose promotional offers, service updates, or announcements for registered customers.</p>
                </div>
              </div>

              {emailNotice && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center justify-between">
                  <span>✅ {emailNotice}</span>
                  <button onClick={() => setEmailNotice('')} className="text-emerald-600 hover:text-emerald-900 font-bold">✕</button>
                </div>
              )}

              {emailError && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">
                  ⚠️ {emailError}
                </div>
              )}

              <form onSubmit={handleSendEmailBroadcast} className="space-y-6">
                
                {/* Target Recipient Selection */}
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-2">Target Audience *</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setEmailTargetType('all')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        emailTargetType === 'all'
                          ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20'
                          : 'border-surface-200 bg-surface-50/50 hover:bg-surface-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-surface-900 text-sm">Send to All Registered Customers</span>
                        <span className="text-xs font-mono font-extrabold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">
                          {users.length} accounts
                        </span>
                      </div>
                      <p className="text-xs text-surface-500 mt-1">Broadcast email to every registered user account.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEmailTargetType('selected')}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        emailTargetType === 'selected'
                          ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20'
                          : 'border-surface-200 bg-surface-50/50 hover:bg-surface-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-surface-900 text-sm">Select Specific Customers</span>
                        <span className="text-xs font-mono font-extrabold bg-surface-200 text-surface-800 px-2 py-0.5 rounded-md">
                          {selectedRecipientEmails.length} selected
                        </span>
                      </div>
                      <p className="text-xs text-surface-500 mt-1">Choose 1 or more custom customer email addresses.</p>
                    </button>
                  </div>
                </div>

                {/* Specific Recipient Checklist (If 'selected' chosen) */}
                {emailTargetType === 'selected' && (
                  <div className="p-4 bg-surface-50 border border-surface-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-surface-700 uppercase tracking-wider">
                        Select Customer Email Accounts ({selectedRecipientEmails.length} Selected)
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedRecipientEmails(users.map(u => u.email))}
                          className="text-[11px] font-bold text-orange-600 hover:text-orange-700 underline"
                        >
                          Select All
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedRecipientEmails([])}
                          className="text-[11px] font-bold text-surface-400 hover:text-surface-600 underline"
                        >
                          Deselect All
                        </button>
                      </div>
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2">
                      {users.map((u) => {
                        const isChecked = selectedRecipientEmails.includes(u.email);
                        return (
                          <div
                            key={u.id}
                            onClick={() => toggleRecipientEmail(u.email)}
                            className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-orange-50/80 border-orange-300 text-orange-950 font-bold'
                                : 'bg-white border-surface-200 text-surface-700 hover:bg-surface-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {isChecked ? (
                                <CheckSquare className="h-4 w-4 text-orange-600 shrink-0" />
                              ) : (
                                <Square className="h-4 w-4 text-surface-400 shrink-0" />
                              )}
                              <span className="text-xs font-semibold">{u.name}</span>
                              <span className="text-[11px] text-surface-400 font-mono">({u.email})</span>
                            </div>
                            <span className="text-[10px] uppercase font-bold text-surface-400">{u.authProvider}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Email Subject Line */}
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-1.5">Email Subject Line *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 🛠 Exclusive 20% Discount on AC Repair & Plumbing Services This Weekend!"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 text-surface-900 placeholder:text-surface-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-50 font-semibold"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-1.5">Email Message Body *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Dear Homeowner, We are pleased to announce our weekend special offer. Book any home service and get instant OTP verification safety and priority worker dispatch..."
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full bg-surface-50 border border-surface-200 text-surface-900 placeholder:text-surface-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-50 font-medium leading-relaxed"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={sendingEmail}
                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all"
                  >
                    {sendingEmail ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> Dispatching Broadcast…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Email Broadcast
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Campaign Logs History */}
            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-surface-100 flex items-center justify-between">
                <h3 className="text-surface-900 font-bold text-sm">Past Email Marketing Campaigns Log</h3>
                <span className="text-xs text-surface-400 font-medium">{campaigns.length} campaigns logged</span>
              </div>

              {loadingCampaigns ? (
                <div className="py-12 text-center text-surface-400 text-xs font-semibold">Loading campaign logs…</div>
              ) : campaigns.length === 0 ? (
                <div className="py-12 text-center text-surface-400 text-xs font-medium">No past email marketing campaigns logged yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-50 text-surface-500 font-bold uppercase border-b border-surface-200">
                      <tr>
                        <th className="px-6 py-3.5">Campaign ID</th>
                        <th className="px-6 py-3.5">Subject</th>
                        <th className="px-6 py-3.5">Target Audience</th>
                        <th className="px-6 py-3.5">Recipients</th>
                        <th className="px-6 py-3.5">Date & Time</th>
                        <th className="px-6 py-3.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100 text-surface-700">
                      {campaigns.map((c) => (
                        <tr key={c.id} className="hover:bg-surface-50/80">
                          <td className="px-6 py-4 font-mono font-bold text-surface-900">{c.id}</td>
                          <td className="px-6 py-4 font-bold text-surface-900">{c.subject}</td>
                          <td className="px-6 py-4">
                            <span className="bg-surface-100 text-surface-700 font-bold px-2 py-0.5 rounded text-[11px]">
                              {c.targetType} ({c.recipientCount})
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono text-[11px] text-surface-500 max-w-xs truncate">
                            {(c.recipients || []).join(', ')}
                          </td>
                          <td className="px-6 py-4 text-surface-500">
                            {new Date(c.sentAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold px-2.5 py-0.5 rounded-full text-[10px]">
                              ● {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* ── ADD SERVICE MODAL ── */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-950/60 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-white border border-surface-200 w-full max-w-md rounded-2xl shadow-2xl p-5 sm:p-6 text-surface-900 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-surface-900 font-bold text-lg">Add Additional Service</h2>
              <button onClick={() => setShowServiceModal(false)} className="text-surface-400 hover:text-surface-900 font-bold">✕</button>
            </div>
            <p className="text-surface-500 text-xs mb-5 font-medium">New services appear instantly on the homepage service catalog and booking menu.</p>

            {serviceError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">
                {serviceError}
              </div>
            )}

            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-1.5">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar Panel Maintenance, Pest Control, CCTV Setup"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full bg-surface-50 border border-surface-200 text-surface-900 placeholder:text-surface-400 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-50 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-1.5">Photographic Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                  className="w-full bg-surface-50 border border-surface-200 text-surface-900 placeholder:text-surface-400 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-1.5">Description *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Describe what this service offers to customers..."
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full bg-surface-50 border border-surface-200 text-surface-900 placeholder:text-surface-400 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-50 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-1.5">Sub-Services / Microservices (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Panel Cleaning, Inverter Check, Wiring Inspection"
                  value={serviceForm.microServices}
                  onChange={(e) => setServiceForm({ ...serviceForm, microServices: e.target.value })}
                  className="w-full bg-surface-50 border border-surface-200 text-surface-900 placeholder:text-surface-400 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-50 font-medium"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 py-2.5 border border-surface-200 text-surface-600 hover:text-surface-900 rounded-xl text-sm font-semibold transition-all hover:bg-surface-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={serviceSubmitting}
                  className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/20"
                >
                  {serviceSubmitting ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : 'Publish Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EMPLOYEE MODAL (Matching Light Theme) ── */}
      {showEmployeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-950/60 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-white border border-surface-200 w-full max-w-md rounded-2xl shadow-2xl p-5 sm:p-6 text-surface-900 max-h-[90vh] overflow-y-auto">
            <h2 className="text-surface-900 font-bold text-lg mb-1">
              {editingEmployee ? 'Edit Worker Profile' : 'Add New Worker'}
            </h2>
            <p className="text-surface-500 text-xs mb-5 font-medium">Changes are saved to the system database immediately.</p>

            {empError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">
                {empError}
              </div>
            )}

            <form onSubmit={handleEmployeeSubmit} className="space-y-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Muhammad Ali' },
                { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+92 300 7654321' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'ali@universalinterior.pk' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-1.5">{field.label} *</label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={empForm[field.key]}
                    onChange={(e) => setEmpForm({ ...empForm, [field.key]: e.target.value })}
                    className="w-full bg-surface-50 border border-surface-200 text-surface-900 placeholder:text-surface-400 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 font-medium"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-surface-600 uppercase tracking-wider mb-1.5">Specialty *</label>
                <select
                  required
                  value={empForm.specialty}
                  onChange={(e) => setEmpForm({ ...empForm, specialty: e.target.value })}
                  className="w-full bg-surface-50 border border-surface-200 text-surface-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50 font-semibold"
                >
                  <option value="">Select specialty…</option>
                  {['Plumber', 'Electrician', 'AC Repair', 'Carpenter', 'Cleaner', 'Painter'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmployeeModal(false)}
                  className="flex-1 py-2.5 border border-surface-200 text-surface-600 hover:text-surface-900 rounded-xl text-sm font-semibold transition-all hover:bg-surface-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={empSubmitting}
                  className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {empSubmitting ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : editingEmployee ? 'Save Changes' : 'Register Worker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
