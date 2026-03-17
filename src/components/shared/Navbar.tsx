'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full h-20 flex items-center justify-between px-8 md:px-12 z-50 relative">
      <div className="flex items-center gap-3">
        {/* Logo Icon */}
        <div className="w-8 h-8 rounded-lg bg-[#3D63DD] flex items-center justify-center -rotate-12">
          <svg
            className="w-4 h-4 text-white rotate-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        {/* Logo Text */}
        <span className="font-instrument font-medium text-lg text-[#070707]">Mondial</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full bg-white/40 shadow-sm border border-black/5 backdrop-blur-md">
        <Link href="#" className="font-instrument text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Concept</Link>
        <Link href="#" className="font-instrument text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">How It Works</Link>
        <Link href="#" className="font-instrument text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Pricing</Link>
        <Link href="#" className="font-instrument text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">FAQ&apos;s</Link>
      </div>

      {/* Action Button */}
      <div className="flex items-center">
        <Link href="/signup" className="px-6 py-2.5 bg-[#3D63DD] text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors inline-block">
          Join Free
        </Link>
      </div>
    </nav>
  );
}
