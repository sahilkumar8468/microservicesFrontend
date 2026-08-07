'use client';
import { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react';

export function BeforeAfterSlider({ beforeLabel = 'Before', afterLabel = 'After' }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  function handleMouseDown() {
    function onMouseMove(e) { handleMove(e.clientX); }
    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function handleTouchStart() {
    function onTouchMove(e) { handleMove(e.touches[0].clientX); }
    function onTouchEnd() {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    }
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  }

  return (
    <div ref={containerRef} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-surface-200 select-none">
      {/* After image (full width) */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-brand-600/10 flex items-center justify-center mb-3">
            <ArrowLeftRight size={32} className="text-brand-600" />
          </div>
          <p className="text-brand-700 font-semibold">After</p>
          <p className="text-sm text-brand-500 mt-1">Transformed Result</p>
        </div>
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-surface-100 to-surface-200 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-surface-300/50 flex items-center justify-center mb-3">
              <ArrowLeftRight size={32} className="text-surface-500" />
            </div>
            <p className="text-surface-700 font-semibold">Before</p>
            <p className="text-sm text-surface-500 mt-1">Original Condition</p>
          </div>
        </div>
      </div>

      {/* Slider line and handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md cursor-ew-resize"
        style={{ left: `${sliderPos}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-brand-600 flex items-center justify-center">
          <ChevronLeft size={14} className="text-brand-600 -mr-0.5" />
          <ChevronRight size={14} className="text-brand-600 -ml-0.5" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-surface-900/80 text-white text-xs font-medium px-3 py-1 rounded-full">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-brand-600/90 text-white text-xs font-medium px-3 py-1 rounded-full">
        {afterLabel}
      </div>
    </div>
  );
}
