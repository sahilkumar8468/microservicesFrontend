'use client';

import { useState, useEffect } from 'react';
import { MapPin, Navigation, CheckCircle2, XCircle, Search, ArrowRight, Map as MapIcon, X } from 'lucide-react';
import Link from 'next/link';
import InteractiveCoverageMap from './interactive-coverage-map';

export function ServiceCoverageBanner() {
  const [config, setConfig] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://micro-services-backend.vercel.app/api';

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch(`${API_URL}/service-area`);
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (e) {
      console.error('Failed to load service area config:', e);
    }
  };

  const handleCheckLocation = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    if (!config) return;

    const covered = config.coveredLocations || [];
    const isMatched = covered.some(locId =>
      locId.includes(query) ||
      query.includes(locId.replace('-', ' ')) ||
      query.includes('dha') ||
      query.includes('clifton') ||
      query.includes('pechs') ||
      query.includes('gulshan')
    );

    if (isMatched) {
      setCheckResult({
        covered: true,
        message: `Great news! Your area "${searchQuery}" is within our active ${config.fromDistanceKm || 0} - ${config.toDistanceKm || 15} km service range.`
      });
    } else {
      setCheckResult({
        covered: false,
        message: `Currently, "${searchQuery}" is outside our active ${config.toDistanceKm || 15} km operating radius. We are expanding soon!`
      });
    }
  };

  if (!config) return null;

  return (
    <div className="w-full bg-gradient-to-r from-slate-950 via-surface-900 to-slate-950 border-y border-surface-800 text-white py-4 px-4 sm:px-6 shadow-2xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Banner Left Info */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-brand-600/20 border border-brand-500/30 text-brand-400 flex items-center justify-center shrink-0 shadow-inner">
            <Navigation className="h-5 w-5 text-brand-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Active Service Radius
              </span>
              <span className="text-emerald-400 text-xs font-mono font-extrabold bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-lg">
                {(config && config.fromDistanceKm) || 21} km ➔ {(config && config.toDistanceKm) || 43} km Range
              </span>
            </div>
            <p className="text-sm font-extrabold text-white mt-1 tracking-tight">
              {(config && config.statusMessage) || `Currently serving within ${(config && config.fromDistanceKm) || 21} - ${(config && config.toDistanceKm) || 43} km of ${config?.centerName || 'DHA & Clifton'}`}
            </p>
          </div>
        </div>

        {/* Banner Right Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <form onSubmit={handleCheckLocation} className="relative flex items-center">
            <Search className="h-4 w-4 absolute left-3.5 text-surface-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Enter your location..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCheckResult(null); }}
              className="bg-surface-800/90 border border-surface-700 text-white text-xs font-medium rounded-xl pl-10 pr-20 py-2.5 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-extrabold rounded-lg transition-all shadow-sm"
            >
              Check
            </button>
          </form>

          {/* Interactive Map Modal Button */}
          <button
            onClick={() => setShowMapModal(true)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-300 hover:bg-brand-500/30 text-xs font-extrabold transition-all shrink-0"
          >
            <MapIcon className="h-4 w-4 text-brand-400" /> View Interactive Map
          </button>

          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-extrabold shadow-md shadow-brand-600/30 transition-all shrink-0"
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Coverage Check Toast Result */}
      {checkResult && (
        <div className="max-w-7xl mx-auto mt-3">
          <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold ${
            checkResult.covered
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
          }`}>
            <div className="flex items-center gap-2">
              {checkResult.covered ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-amber-400 shrink-0" />
              )}
              <span>{checkResult.message}</span>
            </div>
            <button
              onClick={() => setCheckResult(null)}
              className="text-surface-400 hover:text-white px-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Interactive Map Modal for Public Visitors */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-950/75 backdrop-blur-md p-4">
          <div className="bg-white text-surface-900 border border-surface-200 w-full max-w-3xl rounded-3xl shadow-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-100">
              <div>
                <h3 className="text-surface-900 font-extrabold text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-brand-600" /> Live Service Coverage Map
                </h3>
                <p className="text-surface-500 text-xs font-medium mt-0.5">
                  Operating City: <strong>{config.baseCity}</strong> · Serving Radius: <strong>{config.fromDistanceKm || 0} km to {config.toDistanceKm || 15} km</strong>
                </p>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="w-9 h-9 rounded-xl border border-surface-200 bg-surface-50 hover:bg-surface-100 text-surface-600 flex items-center justify-center transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <InteractiveCoverageMap
              baseCity={config.baseCity}
              centerName={config.centerName}
              fromDistanceKm={config.fromDistanceKm || 0}
              toDistanceKm={config.toDistanceKm || 15}
              lat={config.centerLat || 24.8138}
              lng={config.centerLng || 67.0671}
              isInteractive={true}
              height="400px"
            />

            <div className="mt-4 flex justify-between items-center text-xs">
              <span className="text-surface-500 font-medium">Zoom in/out to locate your home address inside the emerald coverage circle.</span>
              <Link
                href="/book"
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition-all"
              >
                Proceed to Book Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

