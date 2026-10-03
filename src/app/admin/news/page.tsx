'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Newspaper, Plus, Trash2, Calendar, Eye } from 'lucide-react';

const INITIAL_NEWS = [
  {
    id: 'n1',
    title: 'Pakistan Medical Supplies Showcases Advanced Surgical Packs at Arab Health Dubai',
    category: 'Company News',
    date: '2026-03-28',
    status: 'published',
    views: 850,
  },
  {
    id: 'n2',
    title: 'Expansion of 60,000 m² Class 100,000 Purification Cleanroom Reaches Completion',
    category: 'Company News',
    date: '2026-03-18',
    status: 'published',
    views: 1240,
  },
  {
    id: 'n3',
    title: 'WHO Issues Updated Guidelines for Surgical Site Infection (SSI) Prevention in Operating Theatres',
    category: 'Industry Dynamics',
    date: '2026-03-10',
    status: 'published',
    views: 2180,
  },
];

export default function AdminNewsPage() {
  const [news, setNews] = useState(INITIAL_NEWS);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">News Articles &amp; Press Releases</h1>
          <p className="text-xs text-slate-500 mt-1">Publish company announcements and medical industry news.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-3.5">Article Title</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Published Date</th>
              <th className="px-6 py-3.5">Views</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {news.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/80">
                <td className="px-6 py-4 font-bold text-slate-900 max-w-sm">{item.title}</td>
                <td className="px-6 py-4 text-slate-600">{item.category}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{item.date}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{item.views}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded text-[10px]">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setNews(news.filter(n => n.id !== item.id))}
                    className="p-1 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
