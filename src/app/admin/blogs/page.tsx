'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Trash2 } from 'lucide-react';

const INITIAL_BLOGS = [
  {
    id: 'b1',
    title: 'Clinical Guide: How to Select the Correct AAMI PB70 Level for Surgical Gowns',
    category: 'Problem Guide',
    author: 'Dr. Farooq Khan',
    date: '2026-03-24',
    readingTime: '5 min read',
  },
  {
    id: 'b2',
    title: 'Overcoming Bacterial Biofilm Resistance in Flexible Endoscope Channels with Multi-Enzyme Cleaners',
    category: 'Product Introduction',
    author: 'CSSD Specialist Panel',
    date: '2026-03-14',
    readingTime: '6 min read',
  },
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Clinical Blog Guides</h1>
          <p className="text-xs text-slate-500 mt-1">Manage problem guides and product intro articles.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-3.5">Blog Title</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Author</th>
              <th className="px-6 py-3.5">Read Time</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {blogs.map(b => (
              <tr key={b.id} className="hover:bg-slate-50/80">
                <td className="px-6 py-4 font-bold text-slate-900 max-w-sm">{b.title}</td>
                <td className="px-6 py-4 text-slate-600">{b.category}</td>
                <td className="px-6 py-4 text-slate-600">{b.author}</td>
                <td className="px-6 py-4 text-slate-500">{b.readingTime}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setBlogs(blogs.filter(item => item.id !== b.id))}
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
