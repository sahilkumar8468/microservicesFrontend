'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, MapPin, Navigation, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export function OfficeLocationMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeView, setActiveView] = useState('interactive'); // 'interactive' | 'google'

  // Coordinates for Econ Plaza, Nursery, Shahrah-e-Faisal, Karachi
  const officeLat = 24.8638;
  const officeLng = 67.0655;

  useEffect(() => {
    let isMounted = true;

    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Fix Leaflet default marker icons in Next.js bundler
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Initialize map instance if not already initialized
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [officeLat, officeLng],
          zoom: 16,
          zoomControl: false,
          scrollWheelZoom: true,
        });

        // Add CartoDB Voyager High-Res Light Tiles (Google Maps modern style)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;

        // Custom Marker Icon for Office
        const officeIcon = L.divIcon({
          className: 'custom-office-pin',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center;">
              <div style="
                position: absolute;
                width: 48px;
                height: 48px;
                background: rgba(249, 115, 22, 0.25);
                border-radius: 50%;
                animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
              "></div>
              <div style="
                position: relative;
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #ea580c, #f59e0b);
                border: 3px solid #ffffff;
                border-radius: 50%;
                box-shadow: 0 10px 25px -5px rgba(234, 88, 12, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
              ">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40]
        });

        // Add Marker with Popup
        const marker = L.marker([officeLat, officeLng], { icon: officeIcon }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: system-ui, sans-serif; padding: 4px; max-width: 220px;">
            <div style="font-weight: 800; font-size: 14px; color: #0f172a; margin-bottom: 4px;">
              ${siteConfig.name}
            </div>
            <div style="font-size: 12px; color: #475569; line-height: 1.4;">
              ${siteConfig.contact.address}
            </div>
            <div style="margin-top: 8px; font-weight: 700; font-size: 12px; color: #ea580c;">
              📞 ${siteConfig.contact.phone}
            </div>
          </div>
        `, { closeButton: true }).openPopup();

        setMapLoaded(true);
      }
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([officeLat, officeLng], 16);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-surface-200 shadow-xl overflow-hidden">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-surface-900 truncate">Head Office & Operations Hub</h3>
            <p className="text-[11px] sm:text-xs text-surface-500 font-medium leading-snug break-words">{siteConfig.contact.address}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2">
          {/* Mode Switchers */}
          <div className="flex bg-surface-100 p-1 rounded-xl border border-surface-200 text-[11px] sm:text-xs font-bold">
            <button
              onClick={() => setActiveView('interactive')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'interactive'
                  ? 'bg-white text-surface-900 shadow-xs font-extrabold'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => setActiveView('google')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all ${
                activeView === 'google'
                  ? 'bg-white text-surface-900 shadow-xs font-extrabold'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              Google Embed
            </button>
          </div>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all border border-orange-200/60 shrink-0"
          >
            <span>Open Maps</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Map Container Body */}
      <div className="relative w-full h-[320px] sm:h-[450px] rounded-xl sm:rounded-2xl overflow-hidden border border-surface-200/80 shadow-inner bg-slate-100">
        {activeView === 'interactive' ? (
          <>
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Custom Zoom & Reset Controls */}
            {mapLoaded && (
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-surface-200 shadow-lg">
                <button
                  onClick={handleZoomIn}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-surface-700 hover:bg-surface-100 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-surface-700 hover:bg-surface-100 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={18} />
                </button>
                <hr className="my-0.5 border-surface-200" />
                <button
                  onClick={handleResetView}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-orange-600 hover:bg-orange-50 transition-colors"
                  title="Recenter Map"
                >
                  <Navigation size={18} />
                </button>
              </div>
            )}

            {/* Office Badge Card Overlay */}
            <div className="absolute bottom-4 left-4 z-20 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-surface-200 shadow-xl hidden sm:block">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-surface-200 p-0.5 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                  <img src="/logo.png" alt={siteConfig.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-surface-900">{siteConfig.name}</h4>
                  <p className="text-[11px] text-surface-600 font-medium leading-snug mt-0.5">{siteConfig.contact.address}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Office Operational
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <iframe
            title="Google Maps Location"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0163351980836!2d67.0655!3d24.8638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ee3c92a2a09%3A0x6b77209d29efc609!2sEcon%20Plaza!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
