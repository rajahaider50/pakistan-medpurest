'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Package, ArrowRight } from 'lucide-react';

const CATEGORY_DATA: Record<string, { title: string; desc: string }> = {
  'protective-equipment': {
    title: 'Protective Equipment',
    desc: 'Medical grade disposable protective gowns, scrub suits, isolation suits, and surgical patient apparel.',
  },
  'surgical-pack': {
    title: 'Surgical Pack',
    desc: 'Comprehensive procedure-specific sterile surgical drape and instrument packs for modern operating theaters.',
  },
  'cleaning-and-disinfection-series': {
    title: 'Cleaning and Disinfection Series',
    desc: 'High-level multi-enzyme instrument cleaners, biofilm removers, and hospital-grade sterilizing solutions.',
  },
  'surgical-drapes': {
    title: 'Surgical Drapes',
    desc: 'Sterile, liquid-impervious surgical drapes engineered for maximum barrier protection and fluid control.',
  },
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const cat = CATEGORY_DATA[categorySlug] || {
    title: categorySlug.replace(/-/g, ' ').toUpperCase(),
    desc: 'Professional medical products and surgical equipment.',
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-white">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white capitalize">{cat.title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">{cat.title}</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">{cat.desc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-4">
          <Package className="w-12 h-12 text-brand-700 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Explore Our {cat.title} Catalog</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Review detailed specifications, technical test reports, and submit bulk procurement requests directly to our export team.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-lg text-sm transition"
            >
              Browse Products Catalogue
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
