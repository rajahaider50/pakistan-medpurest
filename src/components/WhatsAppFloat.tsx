'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Phone, MessageSquare } from 'lucide-react';

export default function WhatsAppFloat() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick contact and navigation" className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 bg-white border border-slate-200 text-slate-700 shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition transform hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating WhatsApp Action */}
      <a
        href="https://wa.me/923005561917?text=Hello%20Pakistan%20Medical%20Supplies,%20I%20would%20like%20to%20inquire%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
        <MessageSquare className="w-7 h-7" />

        {/* Tooltip on hover */}
        <span className="absolute right-16 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
          WhatsApp 24/7 Fast Support
        </span>
      </a>
    </aside>
  );
}
