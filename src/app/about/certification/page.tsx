'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Award, ShieldCheck, Download, Eye, X } from 'lucide-react';

const CERTIFICATES = [
  {
    title: 'ISO 13485:2016 Medical Devices Quality Management',
    number: 'MDQ-981240-PK',
    authority: 'TÜV Rheinland / BSI International',
    validity: 'Valid: 2022 - 2028',
    image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80',
    desc: 'Certifies our design, development, cleanroom manufacturing, and sterilization of sterile surgical gowns and procedure drape sets.',
  },
  {
    title: 'CE Mark Certificate MDR (EU) 2017/745 Class I & IIa',
    number: 'CE-MDR-2023-889',
    authority: 'European Notified Body 0123',
    validity: 'Valid: 2023 - 2028',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    desc: 'Full compliance with European Union Medical Device Regulation for surgical drapes, isolation suits, and patient apparel.',
  },
  {
    title: 'FDA Device Establishment Registration 510(k)',
    number: 'FDA-REG-3017849',
    authority: 'U.S. Food and Drug Administration',
    validity: 'Status: Registered & Active',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    desc: 'Authorized establishment listing for surgical attire and barrier drapes exported to hospitals across North America.',
  },
  {
    title: 'EN 13795 Surgical Drapes & Gowns Standard',
    number: 'EN-13795-ST-441',
    authority: 'SGS International Medical Testing',
    validity: 'Standard: Level 3 & Level 4',
    image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80',
    desc: 'Demonstrates liquid strikethrough barrier resistance, tensile strength, microbial penetration resistance, and lint-free cleanliness.',
  },
  {
    title: 'ISO 9001:2015 International Quality Management System',
    number: 'QMS-PK-77402',
    authority: 'Lloyds Register Quality Assurance (LRQA)',
    validity: 'Valid: 2020 - 2026',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    desc: 'Ensures robust organizational supply chain tracking, computerized traceability, and customer satisfaction governance.',
  },
];

export default function CertificationPage() {
  const [certs, setCerts] = useState(CERTIFICATES);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/certificates')
      .then(res => res.json())
      .then(data => {
        if (data.certificates && data.certificates.length > 0) {
          const mapped = data.certificates.map((c: any) => ({
            title: c.title,
            number: c.cert_number || '',
            authority: c.issuing_authority || 'Accredited Body',
            validity: c.expiry_date ? `Valid: ${c.expiry_date}` : 'Active Certification',
            image: c.image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
            desc: c.description || 'Certified for healthcare manufacturing compliance and international barrier standards.',
          }));
          setCerts(mapped);
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
            <span>Certifications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Quality &amp; Regulatory Certifications</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            Our quality management protocols comply with strict European, American, and international standards.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12 space-y-8">
        <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold mb-4">
          <Link href="/about" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Overview</Link>
          <Link href="/about/history" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Development History</Link>
          <Link href="/about/certification" className="px-4 py-2 rounded-lg bg-brand-700 text-white">Certifications</Link>
          <Link href="/about/honor" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Honors &amp; Awards</Link>
          <Link href="/about/culture" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">Corporate Culture</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div
                onClick={() => setSelectedImg(cert.image)}
                className="relative h-60 bg-slate-100 overflow-hidden cursor-pointer group"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-semibold text-xs">
                  <Eye className="w-5 h-5" /> Click to Inspect Certificate
                </div>
                <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {cert.number}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">
                    {cert.authority}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{cert.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{cert.desc}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-700">{cert.validity}</span>
                  <button
                    onClick={() => setSelectedImg(cert.image)}
                    className="p-1.5 text-slate-500 hover:text-brand-700 hover:bg-slate-100 rounded-lg transition"
                    title="View Certificate"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4">
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900/80 text-white rounded-full hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedImg} alt="Certificate preview" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
