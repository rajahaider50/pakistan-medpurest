'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Play, X, Clock } from 'lucide-react';

const VIDEOS = [
  {
    title: 'Automated Class 100,000 Cleanroom & Ultrasonic Production Facility Tour',
    desc: 'Take an inside look at Pakistan Medical automated manufacturing lines, HEPA purification zones, and cleanroom gown assembly.',
    duration: '04:25',
    thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Hydrostatic Pressure & Blood Strikethrough Barrier Test Demonstration',
    desc: 'Watch our laboratory technicians execute standard EN 13795 and AAMI PB70 hydrostatic tests comparing SMS reinforced gowns against liquid penetration.',
    duration: '03:10',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    title: 'Multi-Enzyme Cleaner 858 Biofilm Dissolution Laboratory Demonstration',
    desc: 'Microscopic demonstration showing how quad-enzyme formula digests stubborn proteinaceous soil on endoscopic lumen samples in under 180 seconds.',
    duration: '02:45',
    thumbnail: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

export default function VideoPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Video</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Factory Video Tour &amp; Lab Demonstrations</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            Experience our cleanroom manufacturing standards, automated ultrasonic sealing, and laboratory barrier tests.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS.map((v, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col"
            >
              <div
                onClick={() => setActiveVideo(v.videoUrl)}
                className="relative h-56 bg-slate-900 overflow-hidden cursor-pointer group flex items-center justify-center"
              >
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute w-14 h-14 bg-brand-600/90 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-brand-500 transition">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/70 text-white text-[11px] font-mono rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {v.duration}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2">{v.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">{v.desc}</p>
                </div>
                <button
                  onClick={() => setActiveVideo(v.videoUrl)}
                  className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1 pt-2 border-t border-slate-100"
                >
                  <Play className="w-3.5 h-3.5" /> Watch Video Demonstration
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={activeVideo}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
