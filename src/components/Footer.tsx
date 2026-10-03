'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Lock
} from 'lucide-react';
import PakistanLogo from './PakistanLogo';

export default function Footer() {
  const pathname = usePathname();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: newsletterEmail,
          message: 'Subscribed to Pakistan Medical product catalog and medical bulletin updates.',
          product_name: 'Catalog Subscription',
        }),
      });
      setSubscribed(true);
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Credentials */}
          <div className="space-y-4">
            <Link href="/">
              <PakistanLogo variant="white" size="md" />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Pakistan Medical Supplies is an international manufacturing enterprise dedicated to high-end surgical packs, medical towels, surgical gowns, isolation wear, and clinical infection prevention consumables.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>ISO 13485:2016 &amp; CE MDR Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-400">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Class 100,000 Medical Cleanroom Facilities</span>
              </div>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-3">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/products/protective-equipment" className="hover:text-white transition">
                  Protective Equipment
                </Link>
              </li>
              <li>
                <Link href="/products/protective-equipment/sms-sterile-surgical-gown-reinforced" className="hover:text-white transition">
                  Sterile Surgical Gowns
                </Link>
              </li>
              <li>
                <Link href="/products/protective-equipment/disposable-isolation-suit-coverall" className="hover:text-white transition">
                  Disposable Isolation Coveralls
                </Link>
              </li>
              <li>
                <Link href="/products/surgical-pack" className="hover:text-white transition">
                  Universal Surgical Packs
                </Link>
              </li>
              <li>
                <Link href="/products/surgical-pack/cesarean-section-c-section-surgical-pack" className="hover:text-white transition">
                  C-Section Surgical Packs
                </Link>
              </li>
              <li>
                <Link href="/products/cleaning-and-disinfection-series" className="hover:text-white transition">
                  Cleaning &amp; Disinfection Series
                </Link>
              </li>
              <li>
                <Link href="/products/surgical-drapes" className="hover:text-white transition">
                  Impervious Surgical Drapes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/about/history" className="hover:text-white transition">Development History</Link>
              </li>
              <li>
                <Link href="/about/certification" className="hover:text-white transition">Certifications</Link>
              </li>
              <li>
                <Link href="/about/honor" className="hover:text-white transition">Honors &amp; Awards</Link>
              </li>
              <li>
                <Link href="/about/culture" className="hover:text-white transition">Corporate Culture</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition">News &amp; Dynamics</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">Clinical Blog Guides</Link>
              </li>
              <li>
                <Link href="/video" className="hover:text-white transition">Factory Video Tour</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-white transition">Sitemap</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-3">
              Contact &amp; Inquiries
            </h4>
            <div className="space-y-3 text-xs text-slate-400 mb-5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>Medical Industrial Estate, Islamabad / Sialkot, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+92512891917" className="hover:text-white transition">+92 51 289 1917</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="https://wa.me/923005561917" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  WhatsApp: +92 300 556 1917
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href="mailto:info@pakistanmedical.com" className="hover:text-white transition">
                  info@pakistanmedical.com
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-200 block mb-2">
                Subscribe to Product Catalogue
              </span>
              {subscribed ? (
                <div className="text-emerald-400 text-xs flex items-center gap-1.5 py-1">
                  <CheckCircle2 className="w-4 h-4" /> Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-brand-700 hover:bg-brand-600 text-white rounded-lg text-xs font-semibold flex items-center transition"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pakistan MedPurest Medical Technology Co., Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition">Privacy Policy</Link>
            <Link href="/sitemap" className="hover:text-slate-400 transition">Sitemap</Link>
            <Link href="/admin/login" className="hover:text-brand-400 flex items-center gap-1 text-slate-600 transition">
              <Lock className="w-3 h-3" /> Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
