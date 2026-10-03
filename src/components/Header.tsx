'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  Globe, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Send,
  Shield,
  Layers,
  Sparkles,
  FileCheck2
} from 'lucide-react';
import PakistanLogo from './PakistanLogo';
import SearchModal from './SearchModal';
import InquiryModal from './InquiryModal';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);

  // If in admin route, header can be minimal or skipped
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 transition-all">
        {/* Top Utility Bar */}
        <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a
                href="https://wa.me/923005561917"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp / Direct: <strong className="text-white">+92 300 556 1917</strong></span>
              </a>

              <a
                href="mailto:info@pakistanmedical.com"
                className="flex items-center gap-2 hover:text-brand-300 transition"
              >
                <Mail className="w-3.5 h-3.5 text-brand-400" />
                <span>Email: <strong className="text-white">info@pakistanmedical.com</strong></span>
              </a>
            </div>

            <div className="flex items-center gap-5">
              {/* Quality Badges */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400 border-r border-slate-700 pr-4">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Shield className="w-3 h-3" /> ISO 13485:2016
                </span>
                <span className="flex items-center gap-1 text-sky-400 font-semibold">
                  <FileCheck2 className="w-3 h-3" /> CE Mark MDR
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Sparkles className="w-3 h-3" /> Class 100,000 Cleanroom
                </span>
              </div>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdown(!langDropdown)}
                  className="flex items-center gap-1.5 hover:text-white font-medium focus:outline-none"
                >
                  <Globe className="w-3.5 h-3.5 text-brand-400" />
                  <span>{currentLang.flag} {currentLang.name}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {langDropdown && (
                  <div className="absolute right-0 mt-2 w-36 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 z-50 animate-fade-in">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang);
                          setLangDropdown(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-100 transition ${
                          currentLang.code === lang.code ? 'font-bold text-brand-700 bg-brand-50' : ''
                        }`}
                      >
                        <span>{lang.flag} {lang.name}</span>
                        {currentLang.code === lang.code && <span className="text-brand-600">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <PakistanLogo variant="dark" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
            <Link
              href="/"
              className={`hover:text-brand-700 transition ${pathname === '/' ? 'text-brand-700 font-bold' : ''}`}
            >
              Home
            </Link>

            {/* Products Mega Dropdown */}
            <div className="relative group">
              <Link
                href="/products"
                className={`flex items-center gap-1 hover:text-brand-700 transition py-2 ${
                  pathname.startsWith('/products') ? 'text-brand-700 font-bold' : ''
                }`}
              >
                Products
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </Link>

              <div className="absolute top-full left-0 w-[580px] bg-white rounded-xl shadow-2xl border border-slate-200 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 grid grid-cols-2 gap-4">
                <div>
                  <Link
                    href="/products/protective-equipment"
                    className="font-bold text-slate-900 text-xs uppercase tracking-wider text-brand-800 border-b border-brand-100 pb-1 mb-2 block hover:text-brand-600"
                  >
                    Protective Equipment
                  </Link>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li><Link href="/products/protective-equipment/sms-sterile-surgical-gown-reinforced" className="hover:text-brand-700 block">Surgical Gown (Level 3/4)</Link></li>
                    <li><Link href="/products/protective-equipment/disposable-isolation-suit-coverall" className="hover:text-brand-700 block">Disposable Isolation Suit</Link></li>
                    <li><Link href="/products/protective-equipment" className="hover:text-brand-700 block">Disposable Scrub Suits</Link></li>
                    <li><Link href="/products/protective-equipment" className="hover:text-brand-700 block">Disposable Patient Gowns</Link></li>
                    <li><Link href="/products/protective-equipment" className="hover:text-brand-700 block">Medical Raw Material</Link></li>
                  </ul>
                </div>

                <div>
                  <Link
                    href="/products/surgical-pack"
                    className="font-bold text-slate-900 text-xs uppercase tracking-wider text-brand-800 border-b border-brand-100 pb-1 mb-2 block hover:text-brand-600"
                  >
                    Surgical Packs &amp; Drapes
                  </Link>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li><Link href="/products/surgical-pack/cesarean-section-c-section-surgical-pack" className="hover:text-brand-700 block">C-Section Surgical Pack</Link></li>
                    <li><Link href="/products/surgical-pack/universal-laparotomy-general-surgery-pack" className="hover:text-brand-700 block">General Surgery Pack</Link></li>
                    <li><Link href="/products/surgical-pack" className="hover:text-brand-700 block">Orthopedic Surgery Pack</Link></li>
                    <li><Link href="/products/surgical-drapes" className="hover:text-brand-700 block">Sterile Surgical Drapes</Link></li>
                    <li><Link href="/products/cleaning-and-disinfection-series" className="hover:text-brand-700 block font-medium text-emerald-700">Cleaning &amp; Disinfection Series</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* About Dropdown */}
            <div className="relative group">
              <Link
                href="/about"
                className={`flex items-center gap-1 hover:text-brand-700 transition py-2 ${
                  pathname.startsWith('/about') ? 'text-brand-700 font-bold' : ''
                }`}
              >
                About Us
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-xs">
                <Link href="/about" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-700">Company Overview</Link>
                <Link href="/about/history" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-700">Company History</Link>
                <Link href="/about/certification" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-700">Certifications</Link>
                <Link href="/about/honor" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-700">Honors &amp; Awards</Link>
                <Link href="/about/culture" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-700">Corporate Culture</Link>
              </div>
            </div>

            {/* News */}
            <div className="relative group">
              <Link
                href="/news"
                className={`flex items-center gap-1 hover:text-brand-700 transition py-2 ${
                  pathname.startsWith('/news') ? 'text-brand-700 font-bold' : ''
                }`}
              >
                News
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-xs">
                <Link href="/news?category=company-news" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-700">Company News</Link>
                <Link href="/news?category=industry-dynamics" className="block px-4 py-2 hover:bg-slate-50 hover:text-brand-700">Industry Dynamics</Link>
              </div>
            </div>

            {/* Blog */}
            <Link
              href="/blog"
              className={`hover:text-brand-700 transition ${pathname.startsWith('/blog') ? 'text-brand-700 font-bold' : ''}`}
            >
              Blog
            </Link>

            {/* Video */}
            <Link
              href="/video"
              className={`hover:text-brand-700 transition ${pathname.startsWith('/video') ? 'text-brand-700 font-bold' : ''}`}
            >
              Video
            </Link>

            {/* Certificate */}
            <Link
              href="/certificate"
              className={`hover:text-brand-700 transition ${pathname === '/certificate' ? 'text-brand-700 font-bold' : ''}`}
            >
              Certificates
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact-us"
              className={`hover:text-brand-700 transition ${pathname === '/contact-us' ? 'text-brand-700 font-bold' : ''}`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-slate-600 hover:text-brand-700 hover:bg-slate-100 rounded-full transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setInquiryOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-lg text-xs md:text-sm shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              Inquire Now
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-brand-700 hover:bg-slate-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[65px] bg-white z-50 overflow-y-auto p-6 border-t border-slate-200 animate-fade-in">
            <div className="flex flex-col gap-4 text-base font-semibold text-slate-800">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Home</Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Products Catalog</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">About Us</Link>
              <Link href="/about/history" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-1 text-sm text-slate-600">Company History</Link>
              <Link href="/about/certification" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-1 text-sm text-slate-600">Certificates</Link>
              <Link href="/about/honor" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-1 text-sm text-slate-600">Honors</Link>
              <Link href="/about/culture" onClick={() => setMobileMenuOpen(false)} className="pl-4 py-1 text-sm text-slate-600">Culture</Link>
              <Link href="/news" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">News &amp; Dynamics</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Clinical Blog</Link>
              <Link href="/video" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Videos</Link>
              <Link href="/certificate" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Certificates</Link>
              <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100">Contact Us</Link>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setInquiryOpen(true);
                  }}
                  className="w-full py-3 bg-brand-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-4 h-4" />
                  Send Instant Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
