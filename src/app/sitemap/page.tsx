import React from 'react';
import Link from 'next/link';
import { ChevronRight, Globe, Layers, FileText } from 'lucide-react';

export default function HTMLSitemapPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Sitemap</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Website Navigation Sitemap</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Main Sections</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/" className="hover:text-brand-700">Home</Link></li>
              <li><Link href="/products" className="hover:text-brand-700">Product Catalogue</Link></li>
              <li><Link href="/about" className="hover:text-brand-700">About Us</Link></li>
              <li><Link href="/about/history" className="hover:text-brand-700">Company History</Link></li>
              <li><Link href="/about/certification" className="hover:text-brand-700">Certificates</Link></li>
              <li><Link href="/about/honor" className="hover:text-brand-700">Honors &amp; Awards</Link></li>
              <li><Link href="/about/culture" className="hover:text-brand-700">Corporate Culture</Link></li>
              <li><Link href="/news" className="hover:text-brand-700">News &amp; Dynamics</Link></li>
              <li><Link href="/blog" className="hover:text-brand-700">Clinical Blog</Link></li>
              <li><Link href="/video" className="hover:text-brand-700">Videos</Link></li>
              <li><Link href="/certificate" className="hover:text-brand-700">Regulatory Certifications</Link></li>
              <li><Link href="/contact-us" className="hover:text-brand-700">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-brand-700">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Product Categories</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/products/protective-equipment" className="hover:text-brand-700">Protective Equipment</Link></li>
              <li><Link href="/products/protective-equipment/sms-sterile-surgical-gown-reinforced" className="hover:text-brand-700">Surgical Gowns Level 3/4</Link></li>
              <li><Link href="/products/protective-equipment/disposable-isolation-suit-coverall" className="hover:text-brand-700">Disposable Isolation Coverall</Link></li>
              <li><Link href="/products/surgical-pack" className="hover:text-brand-700">Surgical Pack Series</Link></li>
              <li><Link href="/products/surgical-pack/cesarean-section-c-section-surgical-pack" className="hover:text-brand-700">C-Section Surgical Pack</Link></li>
              <li><Link href="/products/surgical-pack/universal-laparotomy-general-surgery-pack" className="hover:text-brand-700">General Surgery Pack</Link></li>
              <li><Link href="/products/cleaning-and-disinfection-series" className="hover:text-brand-700">Cleaning &amp; Disinfection Series</Link></li>
              <li><Link href="/products/surgical-drapes" className="hover:text-brand-700">Sterile Surgical Drapes</Link></li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Multilingual Portals</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><span className="font-semibold text-slate-800">English (Global)</span></li>
              <li><span className="font-semibold text-slate-800">Español (América Latina / España)</span></li>
              <li><span className="font-semibold text-slate-800">العربية (الشرق الأوسط وشمال أفريقيا)</span></li>
              <li><span className="font-semibold text-slate-800">Português (Brasil / Portugal)</span></li>
              <li><span className="font-semibold text-slate-800">中文 (亚太采购中心)</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
