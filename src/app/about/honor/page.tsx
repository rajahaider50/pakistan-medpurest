'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Award, Trophy } from 'lucide-react';

const HONORS = [
  {
    title: 'National Healthcare Export Excellence Award',
    year: '2024',
    issuer: 'Ministry of Commerce & Health Authorities',
    desc: 'Awarded for extraordinary quality compliance, ethical manufacturing standards, and outstanding medical equipment export growth across 85 countries.',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Cleanroom Technology & Aseptic Manufacturing Pioneer',
    year: '2023',
    issuer: 'Asia-Pacific Medical Devices Federation',
    desc: 'Recognition for establishing the largest robotic Class 100,000 surgical pack assembly facility and introducing ultrasonic non-pinhole bonding.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Top 10 Global Infection Prevention Solution Provider',
    year: '2022',
    issuer: 'International Hospital Supplies Association',
    desc: 'Acknowledged for rapid delivery, zero-defect hospital infection control solutions, and consistent humanitarian support during epidemic relief.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80',
  },
];

export default function HonorPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/about" className="hover:text-white">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Honors &amp; Awards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Honors, Awards &amp; Recognition</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            Celebrating industry milestones, healthcare export leadership, and government manufacturing accolades.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-12 space-y-8">
        <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold mb-4">
          <Link href="/about" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Overview</Link>
          <Link href="/about/history" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Development History</Link>
          <Link href="/about/certification" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Certifications</Link>
          <Link href="/about/honor" className="px-4 py-2 rounded-lg bg-brand-700 text-white">Honors &amp; Awards</Link>
          <Link href="/about/culture" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Corporate Culture</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HONORS.map((h, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img src={h.image} alt={h.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-brand-700 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                  {h.year}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    {h.issuer}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{h.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{h.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
