'use client';

import { siteConfig } from '@/data/site-config';

export function WhatsAppFloat() {
  const whatsappUrl = siteConfig.social.whatsapp || `https://wa.me/${siteConfig.contact.whatsapp.replace(/\s|\+/g, '')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Label Tooltip */}
      <span className="mr-3 px-3 py-1.5 bg-surface-900 text-white text-xs font-semibold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden sm:inline-block">
        Chat with us on WhatsApp
      </span>

      {/* Pulsing ring background */}
      <span className="absolute -inset-1 rounded-full bg-emerald-400/40 animate-ping opacity-75 pointer-events-none" />

      {/* Button Link */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-full shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-emerald-500/50"
      >
        <svg
          className="w-8   h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.123-1.334a9.96 9.96 0 004.887 1.282h.004c5.505 0 9.989-4.478 9.99-9.985A9.948 9.948 0 0012.012 2zm.003 16.402h-.003a8.274 8.274 0 01-4.221-1.157l-.303-.18-3.136.818.835-3.048-.198-.314a8.272 8.272 0 01-1.272-4.47c.001-4.568 3.722-8.283 8.297-8.283a8.25 8.25 0 015.86 2.428 8.243 8.243 0 012.43 5.863c-.002 4.569-3.724 8.284-8.297 8.284zm4.545-6.208c-.249-.125-1.474-.727-1.703-.81-.229-.083-.395-.125-.561.125-.166.249-.644.81-.79 0.976-.145.166-.291.187-.54.062a6.837 6.837 0 01-2.008-1.238 7.55 7.55 0 01-1.388-1.73c-.146-.249-.016-.384.109-.508.113-.112.249-.291.374-.436.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.436-.062-.125-.561-1.351-.769-1.85-.203-.487-.41-.421-.561-.428-.145-.007-.312-.007-.478-.007s-.436.062-.665.312c-.229.249-.873.852-.873 2.079 0 1.226.894 2.41 1.018 2.577.125.166 1.758 2.685 4.26 3.766.595.257 1.06.41 1.423.526.598.19 1.142.163 1.572.099.48-.071 1.474-.602 1.682-1.184.208-.582.208-1.08.145-1.184-.062-.104-.228-.166-.477-.291z" />
        </svg>
      </a>
    </div>
  );
}
