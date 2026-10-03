'use client';

import React, { useState } from 'react';
import { Video, Plus, Trash2, Play } from 'lucide-react';

const INITIAL_VIDEOS = [
  { id: 'v1', title: 'Automated Class 100,000 Cleanroom & Ultrasonic Production Facility Tour', duration: '04:25', status: 'published' },
  { id: 'v2', title: 'Hydrostatic Pressure & Blood Strikethrough Barrier Test Demonstration', duration: '03:10', status: 'published' },
  { id: 'v3', title: 'Multi-Enzyme Cleaner 858 Biofilm Dissolution Laboratory Demonstration', duration: '02:45', status: 'published' },
];

export default function AdminVideosPage() {
  const [videos, setVideos] = useState(INITIAL_VIDEOS);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Video Gallery Management</h1>
          <p className="text-xs text-slate-500 mt-1">Configure facility tours, product demonstrations, and testing clips.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-3.5">Video Title</th>
              <th className="px-6 py-3.5">Duration</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {videos.map(v => (
              <tr key={v.id} className="hover:bg-slate-50/80">
                <td className="px-6 py-4 font-bold text-slate-900 max-w-md flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-brand-700" />
                  {v.title}
                </td>
                <td className="px-6 py-4 font-mono text-slate-500">{v.duration}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded text-[10px]">
                    {v.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setVideos(videos.filter(item => item.id !== v.id))}
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
