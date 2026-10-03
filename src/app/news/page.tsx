'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, User, Eye, ArrowRight, Tag } from 'lucide-react';

const NEWS_ARTICLES = [
  {
    slug: 'pakistan-medical-showcases-sterile-surgical-packs-at-arab-health-dubai',
    category: 'company-news',
    categoryName: 'Company News',
    title: 'Pakistan Medical Supplies Showcases Advanced Surgical Packs at Arab Health Dubai',
    excerpt: 'Our international sales team demonstrated next-generation AAMI Level 4 surgical gowns and procedure packs at the Dubai World Trade Centre.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    date: 'March 28, 2026',
    author: 'Editorial Team',
    views: 850,
  },
  {
    slug: 'expansion-of-class-100000-cleanroom-facility-reaches-completion',
    category: 'company-news',
    categoryName: 'Company News',
    title: 'Expansion of 60,000 m² Class 100,000 Purification Cleanroom Reaches Completion',
    excerpt: 'The facility expansion enhances monthly sterile surgical drape manufacturing capacity to 12 million units with computerized particle monitoring.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    date: 'March 18, 2026',
    author: 'Operations Directorate',
    views: 1240,
  },
  {
    slug: 'who-issues-updated-guidelines-for-surgical-site-infection-prevention',
    category: 'industry-dynamics',
    categoryName: 'Industry Dynamics',
    title: 'WHO Issues Updated Guidelines for Surgical Site Infection (SSI) Prevention in Operating Theatres',
    excerpt: 'Global healthcare authorities underline the paramount role of high-barrier single-use non-woven drapes over traditional cotton linens.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    date: 'March 10, 2026',
    author: 'Clinical Regulatory Dept',
    views: 2180,
  },
];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'company-news' | 'industry-dynamics'>('all');

  const filteredNews = NEWS_ARTICLES.filter(
    n => activeTab === 'all' || n.category === activeTab
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>News</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Medical News &amp; Industry Dynamics</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            Stay informed with company announcements, global exhibition reports, and clinical infection prevention research.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10 space-y-8">
        {/* Category Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition ${
              activeTab === 'all'
                ? 'border-brand-700 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            All Articles
          </button>
          <button
            onClick={() => setActiveTab('company-news')}
            className={`px-6 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition ${
              activeTab === 'company-news'
                ? 'border-brand-700 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Company News
          </button>
          <button
            onClick={() => setActiveTab('industry-dynamics')}
            className={`px-6 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition ${
              activeTab === 'industry-dynamics'
                ? 'border-brand-700 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Industry Dynamics
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <Link href={`/news/${article.category}/${article.slug}`} className="relative h-52 bg-slate-100 overflow-hidden block">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-brand-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {article.categoryName}
                </span>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {article.views} views
                    </span>
                  </div>

                  <Link
                    href={`/news/${article.category}/${article.slug}`}
                    className="text-base font-bold text-slate-900 hover:text-brand-700 transition line-clamp-2"
                  >
                    {article.title}
                  </Link>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-700">
                  <Link href={`/news/${article.category}/${article.slug}`} className="flex items-center gap-1 hover:underline">
                    Read Full Story <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
