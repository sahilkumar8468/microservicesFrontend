'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { locations } from '@/data/locations';

export function LocationSelector({ variant = 'default', onSelect, selectedId, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeLocations, setActiveLocations] = useState(locations);
  const [selected, setSelected] = useState(() => locations.find((l) => l.id === selectedId) || null);
  const dropdownRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://micro-services-backend.vercel.app/api';

  useEffect(() => {
    fetchServiceAreaConfig();
  }, []);

  const fetchServiceAreaConfig = async () => {
    try {
      const res = await fetch(`${API_URL}/service-area`);
      if (res.ok) {
        const config = await res.json();
        if (config.coveredLocations && Array.isArray(config.coveredLocations)) {
          const updated = locations.map(loc => {
            const isCovered = config.coveredLocations.includes(loc.id);
            return {
              ...loc,
              active: isCovered,
              note: isCovered ? loc.note : 'Out of active radius'
            };
          });
          setActiveLocations(updated);
        }
      }
    } catch (e) {
      console.error('Failed to sync service area config in LocationSelector:', e);
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = activeLocations.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.city.toLowerCase().includes(search.toLowerCase())
  );

  function handleSelect(loc) {
    if (!loc.active) return;
    setSelected(loc);
    setIsOpen(false);
    setSearch('');
    onSelect?.(loc);
  }

  if (variant === 'compact') {
    return (
      <div ref={dropdownRef} className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-xs sm:text-sm text-surface-600 hover:text-surface-900 transition-colors py-1.5 px-2 rounded-lg hover:bg-surface-50"
        >
          <MapPin size={16} className="text-brand-600 shrink-0" />
          <span className="font-medium hidden sm:inline max-w-[130px] truncate">{selected?.name || 'Select Location'}</span>
          <ChevronDown size={14} className={`transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 right-0 w-64 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-surface-200 p-2 z-50">
            <div className="relative mb-2">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                placeholder="Search area..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-surface-200 rounded-lg focus:outline-none focus:border-brand-500"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filtered.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSelect(loc)}
                  disabled={!loc.active}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                    selected?.id === loc.id
                      ? 'bg-brand-50 text-brand-700 font-medium'
                      : loc.active
                      ? 'hover:bg-surface-50 text-surface-700'
                      : 'text-surface-400 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{loc.name}</span>
                    {!loc.active && <span className="text-[10px] text-surface-400 shrink-0">{loc.note}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white border border-surface-200 rounded-xl shadow-sm hover:border-brand-300 transition-colors text-left"
      >
        <MapPin size={20} className="text-brand-600 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] sm:text-xs text-surface-500">Where do you need a service?</div>
          <div className="font-semibold text-surface-900 text-sm sm:text-base truncate">{selected?.name || 'Select your area'}</div>
        </div>
        <ChevronDown size={18} className={`text-surface-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 max-w-full bg-white rounded-xl shadow-xl border border-surface-200 p-2 z-50">
          <div className="relative mb-2">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search your area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-surface-200 rounded-lg focus:outline-none focus:border-brand-500"
            />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc)}
                disabled={!loc.active}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                  selected?.id === loc.id
                    ? 'bg-brand-50 text-brand-700 font-medium'
                    : loc.active
                    ? 'hover:bg-surface-50 text-surface-700'
                    : 'text-surface-400 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">{loc.name}</span>
                  {!loc.active && <span className="text-[10px] text-surface-400 shrink-0">{loc.note}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
