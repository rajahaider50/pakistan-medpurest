'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Globe2, 
  ChevronRight, 
  CheckCircle2, 
  Building2, 
  Users, 
  Factory,
  ArrowRight
} from 'lucide-react';
import PakistanLogo from '@/components/PakistanLogo';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>About Us</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">About Pakistan Medical Supplies</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            A premier healthcare manufacturing conglomerate specializing in infection prevention textiles and sterile procedure packs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12 space-y-12">
        {/* Sub-navigation bar */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
          <Link href="/about" className="px-4 py-2 rounded-lg bg-brand-700 text-white">Overview</Link>
          <Link href="/about/history" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Development History</Link>
          <Link href="/about/certification" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Certifications</Link>
          <Link href="/about/honor" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Honors &amp; Awards</Link>
          <Link href="/about/culture" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Corporate Culture</Link>
        </div>

        {/* Corporate Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Company Background</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              25 Years of Precision Engineering in Medical Sterility
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Founded with the vision to deliver hospital-grade sterility at scale, Pakistan MedPurest Medical Technology Co., Ltd. has grown into one of Asia leading manufacturers of single-use surgical attire and procedure-specific surgical packs.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Operating out of an advanced manufacturing complex spanning over 60,000 square meters of certified Class 100,000 cleanrooms, our facilities feature automated laser cutting, robotic folding, and ultrasonic sealing lines that guarantee zero pinhole permeability.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-2xl font-black text-brand-700">60,000 m²</div>
                <div className="text-xs text-slate-500 font-medium">Cleanroom Area</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-2xl font-black text-emerald-600">85+</div>
                <div className="text-xs text-slate-500 font-medium">Export Destinations</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-2xl font-black text-slate-900">1,200+</div>
                <div className="text-xs text-slate-500 font-medium">Trained Specialists</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                alt="Pakistan Medical Factory Cleanroom"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 bg-slate-900 text-white text-xs flex items-center justify-between">
                <span>Class 100,000 Positive-Pressure Cleanroom</span>
                <span className="text-emerald-400 font-semibold">ISO 13485</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Advanced Cleanrooms</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipped with computerized air monitoring maintaining fewer than 100,000 particles (&ge;0.5μm) per cubic foot, exceeding surgical fabric standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Total Quality Control</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every production batch undergoes hydrostatic head pressure testing, tensile elongation analysis, and bioburden validation before release.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-sky-50 text-sky-700 rounded-xl flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Global Supply Chain</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct container shipments from Karachi and regional air hubs reaching major healthcare distribution centers in Europe, Middle East, and the Americas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
