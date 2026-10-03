'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

export default function NewsDetailPage() {
  const params = useParams();
  const title = (params.slug as string || 'Medical Article')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 text-xs font-medium text-slate-500">
        <div className="max-w-4xl mx-auto flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/news" className="hover:text-brand-700">News</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-sm">{title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-10">
        <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-12 space-y-6">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-slate-400 border-b border-slate-100 pb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> March 2026
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> Pakistan Medical Editorial
            </span>
          </div>

          <div className="rounded-xl overflow-hidden h-72 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
              alt="Medical Article"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
            <p>
              Infection prevention in modern surgical healthcare is rooted in consistent barrier reliability. As international healthcare bodies elevate hospital accreditation standards, single-use high-barrier surgical apparel and drapes have become paramount.
            </p>
            <p>
              Traditional multi-use woven cotton fabrics experience micro-fiber breakdown after repeated autoclaving cycles. This degeneration allows capillary fluid conduction, increasing the probability of bacterial strike-through by more than 40% during lengthy operations.
            </p>
            <h3 className="text-lg font-bold text-slate-900 pt-2">Hydrostatic Barrier Excellence</h3>
            <p>
              Pakistan Medical Supplies uses high-grade SMS and SMMS polypropylene non-woven laminate fabrics. The middle meltblown layer acts as an impermeable microscopic sieve, preventing bacteria, blood droplets, and viral particles from traversing while remaining breathable for clinical staff comfort.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
