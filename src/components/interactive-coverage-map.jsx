'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, MapPin, Locate, RefreshCw } from 'lucide-react';

export default function InteractiveCoverageMap({
  baseCity = 'Karachi',
  centerName = 'DHA Phase 5, Karachi',
  fromDistanceKm = 0,
  toDistanceKm = 15,
  lat = 24.8296,
  lng = 67.0738,
  onLocationChange = null,
  isInteractive = true,
  height = '420px'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const outerCircleRef = useRef(null);
  const innerCircleRef = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  // Load Leaflet dynamically on mount (SSR safe)
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
          center: [lat, lng],
          zoom: 11,
          zoomControl: false,
          scrollWheelZoom: isInteractive,
          dragging: isInteractive,
          touchZoom: isInteractive,
          doubleClickZoom: isInteractive,
        });

        // Add CartoDB Voyager High-Res Light Tiles (Google Maps modern style)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;

        // Custom Marker Icon
        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="
              width: 36px;
              height: 36px;
              background: #2563eb;
              border: 3px solid #ffffff;
              border-radius: 50%;
              box-shadow: 0 4px 14px rgba(37,99,235,0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              cursor: pointer;
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36]
        });

        // Add Draggable Center Marker
        const marker = L.marker([lat, lng], {
          draggable: isInteractive,
          icon: customIcon
        }).addTo(map);

        marker.bindPopup(`<b>${centerName}</b><br/>Operating Hub`).openPopup();
        markerRef.current = marker;

        // Handle Marker Drag
        if (isInteractive) {
          marker.on('dragend', (e) => {
            const newPos = e.target.getLatLng();
            if (onLocationChange) {
              onLocationChange({ lat: newPos.lat, lng: newPos.lng });
            }
          });

          // Handle Map Click
          map.on('click', (e) => {
            const { lat: clickLat, lng: clickLng } = e.latlng;
            marker.setLatLng([clickLat, clickLng]);
            if (onLocationChange) {
              onLocationChange({ lat: clickLat, lng: clickLng });
            }
          });
        }

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

  // Update Center, Marker, and Radius Circles when props change
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;
    const L = window.L;
    if (!L) return;

    const map = mapInstanceRef.current;
    const centerPos = [lat, lng];

    // Update Marker position & popup
    if (markerRef.current) {
      markerRef.current.setLatLng(centerPos);
      markerRef.current.setPopupContent(`<b>${centerName}</b><br/>Operating Hub (${fromDistanceKm}km to ${toDistanceKm}km)`);
    }

    // Outer Coverage Radius Circle (To Distance in Meters)
    const outerMeters = Math.max(100, toDistanceKm * 1000);
    if (outerCircleRef.current) {
      outerCircleRef.current.setLatLng(centerPos);
      outerCircleRef.current.setRadius(outerMeters);
    } else {
      const outerCircle = L.circle(centerPos, {
        radius: outerMeters,
        color: '#10b981', // Emerald green
        weight: 2.5,
        dashArray: '6, 6',
        fillColor: '#10b981',
        fillOpacity: 0.12,
      }).addTo(map);
      outerCircleRef.current = outerCircle;
    }

    // Inner Coverage Radius Circle (From Distance in Meters)
    if (fromDistanceKm > 0) {
      const innerMeters = fromDistanceKm * 1000;
      if (innerCircleRef.current) {
        innerCircleRef.current.setLatLng(centerPos);
        innerCircleRef.current.setRadius(innerMeters);
        innerCircleRef.current.setStyle({ opacity: 1, fillOpacity: 0.15 });
      } else {
        const innerCircle = L.circle(centerPos, {
          radius: innerMeters,
          color: '#ef4444', // Red / Rose
          weight: 2,
          dashArray: '4, 4',
          fillColor: '#ef4444',
          fillOpacity: 0.15,
        }).addTo(map);
        innerCircleRef.current = innerCircle;
      }
    } else if (innerCircleRef.current) {
      map.removeLayer(innerCircleRef.current);
      innerCircleRef.current = null;
    }

    // Smoothly auto-fit map view to circle radius bounds
    if (outerCircleRef.current && isInteractive) {
      map.fitBounds(outerCircleRef.current.getBounds(), {
        padding: [30, 30],
        maxZoom: 14,
        animate: true
      });
    }
  }, [lat, lng, fromDistanceKm, toDistanceKm, centerName, mapLoaded]);

  // Zoom Control Handlers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetCenter = () => {
    if (mapInstanceRef.current && outerCircleRef.current) {
      mapInstanceRef.current.fitBounds(outerCircleRef.current.getBounds(), {
        padding: [30, 30],
        maxZoom: 14
      });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-surface-200 shadow-md bg-surface-100" style={{ height }}>
      {/* Real Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Loading Overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-surface-100/90 backdrop-blur-sm flex flex-col items-center justify-center text-surface-600 gap-2 z-20">
          <RefreshCw className="h-7 w-7 animate-spin text-brand-600" />
          <span className="text-xs font-bold tracking-wide">Loading Real Map View...</span>
        </div>
      )}

      {/* Floating Header Info Badge (Top Left) */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 max-w-[calc(100%-4rem)]">
        <span className="bg-white/95 backdrop-blur-md border border-surface-200 text-surface-900 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 truncate">
          <MapPin className="h-3.5 w-3.5 text-brand-600 shrink-0" />
          <span className="truncate">{baseCity}: {fromDistanceKm}km ➔ {toDistanceKm}km</span>
        </span>
      </div>

      {/* Manual Zoom & Controls Buttons (Top Right) */}
      {isInteractive && (
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/95 backdrop-blur-md border border-surface-200 text-surface-800 hover:bg-surface-50 hover:text-brand-600 shadow-md flex items-center justify-center transition-all active:scale-95"
            title="Zoom In (+)"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/95 backdrop-blur-md border border-surface-200 text-surface-800 hover:bg-surface-50 hover:text-brand-600 shadow-md flex items-center justify-center transition-all active:scale-95"
            title="Zoom Out (-)"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleResetCenter}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/95 backdrop-blur-md border border-surface-200 text-surface-800 hover:bg-surface-50 hover:text-brand-600 shadow-md flex items-center justify-center transition-all active:scale-95"
            title="Fit Map to Coverage Bounds"
          >
            <Locate className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Map Legend Footer Bar */}
      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-10 bg-white/95 backdrop-blur-md border border-surface-200 rounded-xl p-2 sm:p-2.5 shadow-md flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-surface-700 font-semibold gap-1.5 sm:gap-2">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/20 border-2 border-dashed border-emerald-500 shrink-0" />
            <span>Outer: <strong className="text-emerald-700 font-bold">{toDistanceKm} km</strong></span>
          </div>
          {fromDistanceKm > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/20 border-2 border-dashed border-rose-500 shrink-0" />
              <span>Inner: <strong className="text-rose-600 font-bold">{fromDistanceKm} km</strong></span>
            </div>
          )}
        </div>
        <div className="text-[10px] text-surface-400 font-medium hidden sm:block">
          Drag pin or click map to reposition hub
        </div>
      </div>
    </div>
  );
}
