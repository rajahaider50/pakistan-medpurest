'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Globe2, 
  ArrowRight, 
  Send, 
  CheckCircle, 
  Play, 
  Calendar, 
  Layers, 
  ChevronRight,
  Package,
  Activity,
  Phone
} from 'lucide-react';
import PakistanLogo from '@/components/PakistanLogo';
import InquiryModal from '@/components/InquiryModal';

const CATEGORIES = [
  {
    title: 'Protective Equipment',
    slug: 'protective-equipment',
    desc: 'Sterile surgical gowns, isolation suits, patient gowns & protective scrub suits.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    count: '15+ Models',
  },
  {
    title: 'Surgical Pack',
    slug: 'surgical-pack',
    desc: 'Custom procedure packs: C-Section, General Laparotomy, Orthopedic & Cardiovascular.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    count: '24+ Packs',
  },
  {
    title: 'Cleaning & Disinfection',
    slug: 'cleaning-and-disinfection-series',
    desc: 'Multi-enzyme hospital cleaners, OPA high-level disinfectants & biofilm removers.',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    count: '8+ Formulations',
  },
  {
    title: 'Surgical Drapes',
    slug: 'surgical-drapes',
    desc: 'Fluid-impervious aperture drapes, mayo stand covers & sterile surgical sheets.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    count: '30+ Sizes',
  },
];

const FEATURED_PRODUCTS = [
  {
    name: 'SMS Reinforced Sterile Surgical Gown Level 3/4',
    slug: 'sms-sterile-surgical-gown-reinforced',
    category: 'protective-equipment',
    sku: 'PKG-SG-001',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    features: ['AAMI PB70 Level 3/4', 'Ultrasonic Welded Seams', 'Breathable Ergonomic Back'],
    desc: 'High barrier SMS/SMMS fabric surgical gown with chest and sleeve reinforcement for high-fluid surgical operations.',
  },
  {
    name: 'Disposable Protective Isolation Coverall with Taped Seams',
    slug: 'disposable-isolation-suit-coverall',
    category: 'protective-equipment',
    sku: 'PKG-ISO-002',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80',
    features: ['Type 4B / 5B / 6B Certified', 'Impervious Heat-Sealed Seams', 'Anti-Static EN 1149'],
    desc: 'Type 4/5/6 certified microporous laminated protective coverall designed for biological agent barrier protection.',
  },
  {
    name: 'Sterile Cesarean Section (C-Section) Surgical Pack',
    slug: 'cesarean-section-c-section-surgical-pack',
    category: 'surgical-pack',
    sku: 'PKG-SP-CS01',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    features: ['360° Fluid Collection Bag', 'Double Drainage Ports', 'Antimicrobial Incise Film'],
    desc: 'Specialized drape pack including aperture fenestration, fluid collection pouch with suction port, and baby blanket.',
  },
  {
    name: 'Multi-Enzyme Medical Instrument Cleaner & Biofilm Remover 858',
    slug: 'biofilm-removal-multi-enzyme-cleaner-858',
    category: 'cleaning-and-disinfection-series',
    sku: 'PKG-CLN-858',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    features: ['Quad-Enzyme Matrix', 'Rapid 3-Min Biofilm Removal', 'Neutral pH Non-Corrosive'],
    desc: 'Quad-enzyme concentrated detergent formulated to break down proteins, lipids, carbohydrates, and biofilms.',
  },
  {
    name: 'Ortho-Phthalaldehyde (OPA) 0.55% High-Level Disinfectant',
    slug: 'phthalaldehyde-opa-high-level-disinfectant',
    category: 'cleaning-and-disinfection-series',
    sku: 'PKG-CLN-OPA',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    features: ['Ready-To-Use Solution', 'Fast 5-Min Reprocessing', '14-Day Reuse Life'],
    desc: 'Ready-to-use high-level disinfectant solution for heat-sensitive semi-critical medical devices and endoscopes.',
  },
  {
    name: 'Universal Laparotomy & General Surgery Pack',
    slug: 'universal-laparotomy-general-surgery-pack',
    category: 'surgical-pack',
    sku: 'PKG-SP-GEN01',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    features: ['Trilaminate Absorbent Fabric', 'Reinforced Fluid Control Zone', 'Complete Accessory Utility Drapes'],
    desc: 'All-in-one sterile pack designed for open abdominal and exploratory general surgical procedures.',
  },
];

const REASONS = [
  {
    num: '01',
    title: 'Certified Medical Standards',
    desc: 'Full compliance with ISO 13485:2016, CE Mark MDR (EU) 2017/745, and FDA device establishment listings.',
  },
  {
    num: '02',
    title: 'Class 100,000 Cleanrooms',
    desc: '60,000 m² of certified positive-pressure purification workshops featuring HEPA air filtration.',
  },
  {
    num: '03',
    title: 'Advanced Ultrasonic Sealing',
    desc: 'State-of-the-art robotic cutting and ultrasonic seam bonding preventing viral strike-through.',
  },
  {
    num: '04',
    title: 'High-Performance Barrier Materials',
    desc: 'Exclusive multi-layer SMS, SMMS, and microporous breathable polymer fabrics engineered for surgeons.',
  },
  {
    num: '05',
    title: 'Full OEM/ODM Customization',
    desc: 'Tailored drape apertures, bespoke procedure pack contents, private label sterile packaging.',
  },
  {
    num: '06',
    title: 'Global Export Footprint',
    desc: 'Reliable supply chain network serving healthcare ministries and hospital chains across 85+ nations.',
  },
];

const CERTIFICATES = [
  { name: 'ISO 13485:2016', authority: 'TUV Rheinland / BSI', year: 'Valid to 2028' },
  { name: 'CE Mark MDR 2017/745', authority: 'Notified Body 0123', year: 'Class I & IIa' },
  { name: 'FDA 510(k) Registration', authority: 'US FDA Device Reg', year: 'Active' },
  { name: 'EN 13795 Compliance', authority: 'SGS Medical Testing', year: 'Verified' },
  { name: 'ISO 9001:2015', authority: 'Lloyds Register QA', year: 'Certified' },
];

export default function HomePage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleOpenInquiry = (productName?: string) => {
    setSelectedProduct(productName || '');
    setInquiryModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ISO 13485 &amp; CE MDR Certified Medical Manufacturer
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Surgical Gowns &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-sky-200 to-emerald-300">
                Infection Prevention
              </span> Solutions
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Pakistan Medical Supplies is committed to the research, robotic manufacturing, and global distribution of high-barrier surgical packs, disposable gowns, isolation coveralls, and hospital disinfectant systems.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-sm shadow-xl hover:shadow-brand-500/20 transition flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                Explore Product Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleOpenInquiry()}
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm border border-white/20 backdrop-blur transition flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                Request Instant Quotation
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div>
                <div className="text-2xl lg:text-3xl font-black text-white">60,000 m²</div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium">Cleanroom Workshop</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-black text-brand-400">Class 100K</div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium">Purification Standard</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-black text-emerald-400">85+</div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium">Export Countries</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-500 to-emerald-500 opacity-30 blur-lg"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-2">
                <img
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
                  alt="Pakistan Medical Cleanroom Surgical Gown"
                  className="w-full h-80 lg:h-96 object-cover rounded-xl"
                />
                <div className="p-4 bg-slate-900/90 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">AAMI PB70 Level 3/4 Surgical Gown</div>
                    <div className="text-slate-400">Ultrasonic seam welded with fluid barrier</div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold rounded-md">
                    In Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US OVERVIEW & MANUFACTURING STRENGTH */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                  alt="Medical Cleanroom Manufacturing"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">National Healthcare Export Leader</div>
                      <div className="text-xs text-slate-500">Over 25 years of infection prevention technology</div>
                    </div>
                  </div>
                  <Link href="/about" className="text-brand-700 font-semibold text-xs hover:underline">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-700">
                About Pakistan Medical Supplies
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Global Standards in Healthcare Infection Control
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pakistan MedPurest Healthcare Technologies is an established manufacturer specializing in single-use sterile medical packs, surgical gowns, protective apparel, and clinical enzymatic detergents.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Equipped with 60,000 square meters of certified Class 100,000 cleanrooms and advanced automated ultrasonic welding machinery, we ensure complete sterility assurance (SAL 10⁻⁶) and high hydrostatic barrier performance according to EN 13795 and AAMI PB70 protocols.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-brand-700">25+</div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">Years Manufacturing History</div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-emerald-600">85+</div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">Exported Countries Worldwide</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-sm transition"
                >
                  Read Corporate Profile
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              Product Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Comprehensive Medical Solutions
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore our core product lines manufactured to international healthcare standards for hospitals, operating rooms, and clinical centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                href={`/products/${cat.slug}`}
                className="group relative bg-slate-50 hover:bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur text-white text-[11px] font-semibold rounded-full">
                    {cat.count}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-700">
                    <span>View Category Products</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SHOWCASE */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                Featured Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                High-Demand Medical Products
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-brand-700 hover:text-brand-800 font-bold text-sm"
            >
              Browse All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PRODUCTS.map((prod, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <Link href={`/products/${prod.category}/${prod.slug}`} className="relative h-56 bg-slate-100 overflow-hidden block">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {prod.sku}
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/products/${prod.category}/${prod.slug}`}
                      className="text-base font-bold text-slate-900 hover:text-brand-700 transition line-clamp-2"
                    >
                      {prod.name}
                    </Link>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {prod.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {prod.features.map((f, fi) => (
                        <span key={fi} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/products/${prod.category}/${prod.slug}`}
                      className="text-xs font-bold text-slate-700 hover:text-brand-700"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => handleOpenInquiry(prod.name)}
                      className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-lg text-xs shadow flex items-center gap-1.5 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Inquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 6 REASONS TO CHOOSE US */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              6 Reasons To Choose Pakistan Medical
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We combine European certification rigor, advanced automated cleanrooms, and cost-efficient medical non-woven engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REASONS.map((reason, i) => (
              <div
                key={i}
                className="bg-slate-800/80 border border-slate-700/80 p-8 rounded-2xl hover:border-brand-500 transition-all duration-300 relative group"
              >
                <div className="text-3xl font-black text-brand-400/30 group-hover:text-brand-400 transition-colors mb-3">
                  {reason.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CERTIFICATES & QUALITY REGULATORY */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              International Regulatory Certifications
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CERTIFICATES.map((cert, i) => (
              <div
                key={i}
                className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-center hover:shadow-md transition flex flex-col items-center justify-center"
              >
                <Award className="w-8 h-8 text-brand-600 mb-2" />
                <h4 className="font-bold text-xs text-slate-900">{cert.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{cert.authority}</p>
                <span className="text-[10px] text-emerald-600 font-semibold mt-2 px-2 py-0.5 bg-emerald-50 rounded">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION / INQUIRY BANNER */}
      <section className="py-16 bg-gradient-to-r from-brand-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to Procure High-Quality Medical Supplies?
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Whether you require bulk hospital procurement, customized OEM procedure packs, or distribution partnerships, our sales engineers are ready to assist.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => handleOpenInquiry()}
              className="px-8 py-3.5 bg-white text-brand-900 hover:bg-slate-100 font-bold rounded-xl text-sm shadow-xl transition flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-brand-700" />
              Submit Direct Inquiry
            </button>
            <a
              href="https://wa.me/923005561917"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-xl transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Direct Chat
            </a>
          </div>
        </div>
      </section>

      {/* Global Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        productName={selectedProduct}
      />
    </div>
  );
}
