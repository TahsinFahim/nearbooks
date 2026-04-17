'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const GlobalLoader = () => {
  const [dots, setDots] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    const hideTimer = setTimeout(() => {
      setFadeOut(true);
    }, 500000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  if (fadeOut) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      <div className="text-center max-w-sm p-8">

        {/* Logo Section */}
        <div className="mb-8">

          {/* Book Icon */}
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="w-14 h-20 mx-auto bg-gradient-to-br from-purple-600 to-blue-900 rounded-l-lg rounded-r-xl flex items-center justify-center shadow-xl animate-bounce">
              <span className="text-white text-3xl font-bold italic">N</span>
            </div>

            <div className="absolute right-[-12px] top-2 w-10 h-14 bg-white rounded-r-md shadow-md animate-pulse"></div>
          </div>

          {/* Brand */}
          <div className="flex items-center justify-center gap-2 text-4xl font-bold">

            <Image
              src="/assets/logo/nearbook-logo1.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />

            <span className="text-purple-600 animate-pulse">|</span>

            <span className="text-slate-400 font-light">
              {'.'.repeat(dots)}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            বই খুঁজুন, পড়ুন, শিখুন
          </p>
        </div>

        {/* Progress */}
         <div className="mb-7">
          <div className="relative mx-auto h-2 w-64 overflow-hidden rounded-full bg-slate-200">
            <div className="absolute inset-y-0 left-0 w-1/3 animate-[loader_1.4s_linear_infinite] rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          </div>

          <p className="mt-3 text-sm text-slate-600">
            আপনার পছন্দের বই খোঁজা হচ্ছে...
          </p>
        </div>

        {/* Stats */}
         <div className="grid grid-cols-3 gap-3 rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-slate-100 backdrop-blur">
          <div>
            <p className="text-lg font-bold text-slate-800">10K+</p>
            <p className="text-xs text-slate-500">Books</p>
          </div>

          <div>
            <p className="text-lg font-bold text-slate-800">1K+</p>
            <p className="text-xs text-slate-500">Authors</p>
          </div>

          <div>
            <p className="text-lg font-bold text-slate-800">99%</p>
            <p className="text-xs text-slate-500">Readers</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GlobalLoader;