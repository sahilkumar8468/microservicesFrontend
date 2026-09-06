'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const isRefreshingRef = useRef(false);
  const pendingRequestsQueueRef = useRef([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://micro-services-backend.vercel.app/api';

  useEffect(() => {
    // Check if tokens exist in localStorage on startup
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('hs_token');
      const storedRefreshToken = localStorage.getItem('hs_refresh_token');
      const storedUser = localStorage.getItem('hs_user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setUser(JSON.parse(storedUser));
        fetchProfile(storedToken, storedRefreshToken);
      } else {
        setLoading(false);
      }
    }
  }, []);

  // 90-Second Short-Lived Access Token Silent Refresh Timer (Triggers every 75s)
  useEffect(() => {
    if (!token || !refreshToken) return;

    const interval = setInterval(() => {
      silentRefreshToken();
    }, 75000); // 75 seconds silent refresh (before 90s expiration)

    return () => clearInterval(interval);
  }, [token, refreshToken]);

  // Silent Token Refresh Request
  const silentRefreshToken = async () => {
    const currentRefreshToken = refreshToken || (typeof window !== 'undefined' ? localStorage.getItem('hs_refresh_token') : null);
    if (!currentRefreshToken) return null;

    try {
      const res = await fetch(`${API_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: currentRefreshToken })
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        if (data.refreshToken) setRefreshToken(data.refreshToken);

        localStorage.setItem('hs_token', data.token);
        if (data.refreshToken) localStorage.setItem('hs_refresh_token', data.refreshToken);
        return data.token;
      } else {
        logoutLocal();
        return null;
      }
    } catch (e) {
      console.error('Silent refresh failed:', e);
      return null;
    }
  };

  // Interceptor Function: Waits for Token Refresh if 401 Unauthorized occurs
  const fetchWithAuth = async (url, options = {}) => {
    let activeToken = token || (typeof window !== 'undefined' ? localStorage.getItem('hs_token') : null);
    
    const reqHeaders = {
      ...options.headers,
      'Authorization': `Bearer ${activeToken}`
    };

    let response = await fetch(url, { ...options, headers: reqHeaders });

    // If Access Token Expired (401), Queue Request & Refresh Token
    if (response.status === 401) {
      if (!isRefreshingRef.current) {
        isRefreshingRef.current = true;
        const newToken = await silentRefreshToken();
        isRefreshingRef.current = false;

        if (newToken) {
          // Resolve all queued pending requests with new token
          pendingRequestsQueueRef.current.forEach(callback => callback(newToken));
          pendingRequestsQueueRef.current = [];

          // Retry initial failed request with new token
          const retryHeaders = {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`
          };
          response = await fetch(url, { ...options, headers: retryHeaders });
        }
      } else {
        // Queue pending API calls while token is actively refreshing
        const newToken = await new Promise(resolve => {
          pendingRequestsQueueRef.current.push(resolve);
        });

        const retryHeaders = {
          ...options.headers,
          'Authorization': `Bearer ${newToken}`
        };
        response = await fetch(url, { ...options, headers: retryHeaders });
      }
    }

    return response;
  };

  async function fetchProfile(authToken, authRefreshToken) {
    try {
      const res = await fetch(`${API_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        const profileData = await res.json();
        setUser(profileData);
        localStorage.setItem('hs_user', JSON.stringify(profileData));
      } else if (authRefreshToken) {
        // Try refreshing expired 90s token
        const newToken = await silentRefreshToken();
        if (newToken) {
          fetchProfile(newToken, authRefreshToken);
          return;
        } else {
          logoutLocal();
        }
      } else {
        logoutLocal();
      }
    } catch (e) {
      console.error('Error fetching user profile:', e);
    } finally {
      setLoading(false);
    }
  }

  const sendSmsOtp = async (phone, email) => {
    const res = await fetch(`${API_URL}/auth/send-sms-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, email })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to send verification SMS');
    }
    return data;
  };

  const verifySmsOtp = async (phone, otp) => {
    const res = await fetch(`${API_URL}/auth/verify-sms-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Invalid verification code');
    }
    return data;
  };

  const register = async (name, email, phone, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    return data;
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    setToken(data.token);
    setRefreshToken(data.refreshToken);
    setUser(data.user);

    localStorage.setItem('hs_token', data.token);
    if (data.refreshToken) localStorage.setItem('hs_refresh_token', data.refreshToken);
    localStorage.setItem('hs_user', JSON.stringify(data.user));
    return data;
  };

  const googleSignIn = async (email, name, googleId) => {
    const res = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, googleId })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Google Login failed');
    }

    setToken(data.token);
    setRefreshToken(data.refreshToken);
    setUser(data.user);

    localStorage.setItem('hs_token', data.token);
    if (data.refreshToken) localStorage.setItem('hs_refresh_token', data.refreshToken);
    localStorage.setItem('hs_user', JSON.stringify(data.user));
    return data;
  };

  const logoutLocal = () => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem('hs_token');
    localStorage.removeItem('hs_refresh_token');
    localStorage.removeItem('hs_user');
  };

  const logout = async () => {
    try {
      await fetchWithAuth(`${API_URL}/auth/logout`, {
        method: 'POST'
      });
    } catch (e) {
      console.error('Logout request failed:', e);
    } finally {
      logoutLocal();
    }
  };

  const updateProfile = async (name, phone) => {
    const res = await fetchWithAuth(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phone })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update profile');
    }

    const updatedUser = { ...user, name, phone };
    setUser(updatedUser);
    localStorage.setItem('hs_user', JSON.stringify(updatedUser));
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, loading, register, login, googleSignIn, logout, updateProfile, sendSmsOtp, verifySmsOtp, fetchWithAuth, silentRefreshToken, API_URL }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
