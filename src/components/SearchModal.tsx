'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'SMS Reinforced Surgical Gown',
  'Disposable Isolation Coverall',
  'Biofilm Removal Multi-Enzyme Cleaner',
  'Ortho-Phthalaldehyde (OPA) Disinfectant',
  'C-Section Surgical Pack',
  'General Surgery Laparotomy Pack',
  'ISO 13485 Certification',
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(keyword.trim())}`);
  };

  const handleTagClick = (term: string) => {
    onClose();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
        >
          <X className="w-6 h-6" />
        </button>

        <p className="text-xs uppercase tracking-widest font-bold text-brand-600 mb-2">
          Global Product & Specification Search
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
          What are you looking for?
        </h2>

        <form onSubmit={handleSearch} className="relative mb-6">
          <input
            type="text"
            autoFocus
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Search surgical gowns, packs, disinfectants, certifications..."
            className="w-full pl-12 pr-28 py-4 bg-slate-50 border border-slate-300 rounded-xl text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-medium rounded-lg text-sm transition flex items-center gap-1.5"
          >
            Search
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            <Tag className="w-3.5 h-3.5" />
            Popular Searches
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((term, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleTagClick(term)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-300 border border-slate-200 rounded-full text-xs font-medium text-slate-700 transition"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
