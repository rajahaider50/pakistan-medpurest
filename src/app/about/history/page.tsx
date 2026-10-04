'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Calendar, ArrowRight } from 'lucide-react';

const TIMELINE = [
  {
    year: '1998',
    title: 'Company Founding & Textile Manufacturing',
    desc: 'Began precision weaving and medical non-woven processing, producing sterile gauze, absorbent laparotomy pads, and baseline hospital dressings.',
  },
  {
    year: '2006',
    title: 'ISO 13485 & CE Mark Certification',
    desc: 'Attained international medical device quality standard approvals and commenced direct bulk container shipments to European hospital distributors.',
  },
  {
    year: '2014',
    title: 'Commissioning of 30,000 m² Cleanroom Complex',
    desc: 'Expanded industrial facilities with automated robotic cutting lines, cleanroom ultrasonic welding machines, and dedicated EO sterilization chambers.',
  },
  {
    year: '2020',
    title: 'Global Epidemic Relief & Scaling',
    desc: 'Supplied over 150 million units of certified protective coveralls, isolation suits, and surgical gowns worldwide during the emergency pandemic response.',
  },
  {
    year: '2024',
    title: 'Next-Generation Enzymatic & Smart Surgical Lines',
    desc: 'Launched advanced quad-enzyme biofilm removal detergent series 858 and procedure-specific cardiovascular and orthopedic surgical packs.',
  },
];

export default function HistoryPage() {
  const [timeline, setTimeline] = useState(TIMELINE);

  useEffect(() => {
    fetch('/api/company')
      .then(res => res.json())
      .then(json => {
        if (json.history && json.history.length > 0) {
          const mapped = json.history.map((h: any) => ({
            year: h.year,
            title: h.title,
            desc: h.description,
          }));
          setTimeline(mapped);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/about" className="hover:text-white">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Development History</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Company Development History</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            A quarter-century chronicle of continuous clinical innovation, facility expansion, and global quality trust.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12 space-y-8">
        <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold mb-6">
          <Link href="/about" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Overview</Link>
          <Link href="/about/history" className="px-4 py-2 rounded-lg bg-brand-700 text-white">Development History</Link>
          <Link href="/about/certification" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Certifications</Link>
          <Link href="/about/honor" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Honors &amp; Awards</Link>
          <Link href="/about/culture" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Corporate Culture</Link>
        </div>

        <div className="relative border-l-2 border-brand-200 ml-4 md:ml-32 space-y-12 py-4">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-8 group">
              {/* Year badge on left */}
              <div className="md:absolute md:-left-36 md:top-0 mb-2 md:mb-0">
                <span className="inline-block px-3 py-1 bg-brand-700 text-white font-mono font-bold text-xs rounded-full shadow">
                  {item.year}
                </span>
              </div>

              {/* Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-brand-600 group-hover:scale-125 transition-transform"></div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 group-hover:border-brand-400 transition">
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
