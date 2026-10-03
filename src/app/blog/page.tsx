'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';

const BLOG_POSTS = [
  {
    slug: 'how-to-choose-the-right-aami-level-surgical-gown',
    category: 'problem-guide',
    categoryName: 'Problem Guide',
    title: 'Clinical Guide: How to Select the Correct AAMI PB70 Level for Surgical Gowns',
    excerpt: 'A comprehensive comparison between AAMI Levels 1, 2, 3, and 4 to help hospital purchasing departments align protection with clinical exposure risks.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    date: 'March 24, 2026',
    author: 'Dr. Farooq Khan, Chief Quality Officer',
    readingTime: '5 min read',
  },
  {
    slug: 'overcoming-biofilm-resistance-in-endoscopic-channel-cleaning',
    category: 'product-introduction',
    categoryName: 'Product Introduction',
    title: 'Overcoming Bacterial Biofilm Resistance in Flexible Endoscope Channels with Multi-Enzyme Cleaners',
    excerpt: 'Why traditional detergents fail against polysaccharide matrix biofilms, and how quad-enzyme solutions restore lumen sterility.',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    date: 'March 14, 2026',
    author: 'CSSD Specialist Panel',
    readingTime: '6 min read',
  },
];

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'problem-guide' | 'product-introduction'>('all');

  const filteredPosts = BLOG_POSTS.filter(
    p => activeTab === 'all' || p.category === activeTab
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Blog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Clinical Insights &amp; Problem Guides</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            Practical knowledge for hospital procurement directors, CSSD supervisors, and infection control nurses.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10 space-y-8">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition ${
              activeTab === 'all'
                ? 'border-brand-700 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            All Insights
          </button>
          <button
            onClick={() => setActiveTab('problem-guide')}
            className={`px-6 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition ${
              activeTab === 'problem-guide'
                ? 'border-brand-700 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Problem Guides
          </button>
          <button
            onClick={() => setActiveTab('product-introduction')}
            className={`px-6 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition ${
              activeTab === 'product-introduction'
                ? 'border-brand-700 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Product Introductions
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col"
            >
              <div className="relative h-60 bg-slate-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-brand-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {post.categoryName}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readingTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 hover:text-brand-700 transition">
                    {post.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-700">
                  <span className="text-slate-500 font-medium">{post.author}</span>
                  <Link href={`/news`} className="flex items-center gap-1 hover:underline">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
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
