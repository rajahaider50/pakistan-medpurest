'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Lightbulb, Globe, Leaf } from 'lucide-react';

const CULTURE_ITEMS = [
  {
    title: 'Purity & Zero Compromise',
    subtitle: 'Sterility First',
    desc: 'In surgical medicine, perfection is the baseline. Every square millimeter of surgical fabric is subjected to microscopic bioburden and hydrostatic barrier integrity checks.',
    icon: ShieldCheck,
    color: 'text-brand-700 bg-brand-50 border-brand-200',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Continuous Innovation',
    subtitle: 'R&D Driven',
    desc: 'Investing over 8% of annual revenue into non-woven polymer engineering, microbial barrier breathable membranes, and eco-friendly degradable medical fabrics.',
    icon: Lightbulb,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Global Responsibility',
    subtitle: 'Patient Safety Above All',
    desc: 'Empowering surgeons, nurses, and clinical teams across 85 nations with protective gear and surgical drape packs they can bet their lives upon.',
    icon: Globe,
    color: 'text-sky-600 bg-sky-50 border-sky-200',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Sustainable Manufacturing',
    subtitle: 'Eco Healthcare',
    desc: 'Transitioning medical secondary packaging to 100% recyclable mono-materials and reducing cleanroom air handling carbon footprint by 35%.',
    icon: Leaf,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
  },
];

export default function CulturePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/about" className="hover:text-white">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Corporate Culture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Corporate Culture &amp; Values</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            The core ethical and manufacturing philosophies guiding our team of healthcare specialists.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-12 space-y-8">
        <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold mb-4">
          <Link href="/about" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Overview</Link>
          <Link href="/about/history" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Development History</Link>
          <Link href="/about/certification" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Certifications</Link>
          <Link href="/about/honor" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Honors &amp; Awards</Link>
          <Link href="/about/culture" className="px-4 py-2 rounded-lg bg-brand-700 text-white">Corporate Culture</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CULTURE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition p-8 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${item.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.subtitle}</span>
                    <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                <div className="pt-2 rounded-xl overflow-hidden h-40">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-xl" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
