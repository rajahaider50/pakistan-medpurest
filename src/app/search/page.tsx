'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ChevronRight, Package, FileText, ArrowRight } from 'lucide-react';

const SEARCHABLE_ITEMS = [
  {
    type: 'product',
    name: 'SMS Reinforced Sterile Surgical Gown Level 3/4',
    category: 'protective-equipment',
    slug: 'sms-sterile-surgical-gown-reinforced',
    desc: 'High barrier SMS/SMMS fabric surgical gown with chest and sleeve reinforcement for high-fluid surgical operations.',
    sku: 'PKG-SG-001',
    link: '/products/protective-equipment/sms-sterile-surgical-gown-reinforced',
  },
  {
    type: 'product',
    name: 'Disposable Protective Isolation Coverall with Taped Seams',
    category: 'protective-equipment',
    slug: 'disposable-isolation-suit-coverall',
    desc: 'Type 4/5/6 certified microporous laminated protective coverall designed for biological agent barrier protection.',
    sku: 'PKG-ISO-002',
    link: '/products/protective-equipment/disposable-isolation-suit-coverall',
  },
  {
    type: 'product',
    name: 'Sterile Cesarean Section (C-Section) Surgical Pack',
    category: 'surgical-pack',
    slug: 'cesarean-section-c-section-surgical-pack',
    desc: 'Specialized drape pack including aperture fenestration, fluid collection pouch with suction port, and baby blanket.',
    sku: 'PKG-SP-CS01',
    link: '/products/surgical-pack/cesarean-section-c-section-surgical-pack',
  },
  {
    type: 'product',
    name: 'Multi-Enzyme Medical Instrument Cleaner & Biofilm Remover 858',
    category: 'cleaning-and-disinfection-series',
    slug: 'biofilm-removal-multi-enzyme-cleaner-858',
    desc: 'Quad-enzyme concentrated detergent formulated to break down proteins, lipids, carbohydrates, and biofilms.',
    sku: 'PKG-CLN-858',
    link: '/products/cleaning-and-disinfection-series/biofilm-removal-multi-enzyme-cleaner-858',
  },
  {
    type: 'product',
    name: 'Ortho-Phthalaldehyde (OPA) 0.55% High-Level Disinfectant',
    category: 'cleaning-and-disinfection-series',
    slug: 'phthalaldehyde-opa-high-level-disinfectant',
    desc: 'Ready-to-use high-level disinfectant solution for heat-sensitive semi-critical medical devices and endoscopes.',
    sku: 'PKG-CLN-OPA',
    link: '/products/cleaning-and-disinfection-series/phthalaldehyde-opa-high-level-disinfectant',
  },
  {
    type: 'product',
    name: 'Universal Laparotomy & General Surgery Pack',
    category: 'surgical-pack',
    slug: 'universal-laparotomy-general-surgery-pack',
    desc: 'All-in-one sterile pack designed for open abdominal and exploratory general surgical procedures.',
    sku: 'PKG-SP-GEN01',
    link: '/products/surgical-pack/universal-laparotomy-general-surgery-pack',
  },
  {
    type: 'news',
    name: 'Pakistan Medical Supplies Showcases Advanced Surgical Packs at Arab Health Dubai',
    desc: 'Our international sales team demonstrated next-generation AAMI Level 4 surgical gowns and procedure packs.',
    link: '/news',
  },
  {
    type: 'news',
    name: 'Expansion of 60,000 m² Class 100,000 Purification Cleanroom Reaches Completion',
    desc: 'The facility expansion enhances monthly sterile surgical drape manufacturing capacity to 12 million units.',
    link: '/news',
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const results = SEARCHABLE_ITEMS.filter(item => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.desc.toLowerCase().includes(term) ||
      (item.sku && item.sku.toLowerCase().includes(term))
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Search</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Product &amp; Specification Search</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-10 space-y-6">
        {/* Search input box */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search keywords, surgical gowns, packs, or models..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-300 rounded-2xl text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Found <strong className="text-slate-900">{results.length}</strong> matching results
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <div className="font-bold text-slate-800">No matching items found</div>
              <p className="text-xs text-slate-500 mt-1">Please try alternative medical keywords or browse the full product catalogue.</p>
            </div>
          ) : (
            results.map((res, i) => (
              <Link
                key={i}
                href={res.link}
                className="p-5 bg-white rounded-xl border border-slate-200 hover:border-brand-500 shadow-sm hover:shadow-md transition flex items-start justify-between gap-4 block group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                      {res.type}
                    </span>
                    {res.sku && (
                      <span className="text-[10px] font-mono text-slate-500">
                        {res.sku}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition">
                    {res.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {res.desc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-700 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-2" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-xs">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
