'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ChevronRight, 
  Send, 
  Phone, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Package, 
  Layers, 
  FileText,
  ArrowRight
} from 'lucide-react';
import InquiryModal from '@/components/InquiryModal';

// Static product database matching seed data
const PRODUCT_DETAILS: Record<string, any> = {
  'sms-sterile-surgical-gown-reinforced': {
    name: 'SMS Reinforced Sterile Surgical Gown Level 3 / Level 4',
    sku: 'PKG-SG-001',
    category: 'protective-equipment',
    categoryName: 'Protective Equipment',
    primaryImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80',
    ],
    shortDesc: 'High barrier SMS/SMMS fabric surgical gown with chest and sleeve reinforcement for high-fluid surgical operations.',
    longDesc: 'Pakistan Medical SMS Reinforced Surgical Gown provides reliable protection against bloodborne pathogens, body fluids, and liquid strike-through during prolonged operating room procedures. Engineered using premium multi-layer SMS non-woven material, it offers superior tensile strength, breathability, and ergonomic comfort for surgical personnel.',
    features: [
      'Meets AAMI PB70 Level 3 & Level 4 liquid barrier standards',
      'Reinforced chest and forearm critical zones for ultimate fluid resistance',
      'Soft ultrasonic welded seams prevent microbial penetration',
      'Generous raglan sleeve cut ensuring full range of movement',
      'Breathable back panel reduces thermal stress during long surgeries',
      'Supplied with two sterile hand towels in peelable medical pouch',
    ],
    specs: {
      'Material': 'Multi-layer SMS / SMMS Non-Woven',
      'Fabric Grammage': '45-60 gsm (Heavy duty reinforced)',
      'Sterilization Method': 'Ethylene Oxide (EO Gas, SAL 10⁻⁶)',
      'Barrier Standard': 'EN 13795 / AAMI PB70 Level 3/4',
      'Color Options': 'Medical Blue / Forest Green',
      'Neckline & Closure': 'Adjustable hook-and-loop neckline with 4-tie belt',
      'Seam Technology': '100% Ultrasonic welded, no needle holes',
      'Shelf Life': '3 Years from sterilization date',
    },
    applications: [
      'Operating Theatres & Surgical Suites',
      'General Surgery & Laparoscopic Procedures',
      'Orthopedic Joint Replacement Surgeries',
      'Cardiothoracic Surgery & Vascular Operations',
      'Emergency Room Trauma Care',
    ],
    packaging: '1 pc/sterile peel pouch with 2 towels, 50 pouches/carton',
    sterilization: 'Ethylene Oxide (EO Gas)',
  },
  'disposable-isolation-suit-coverall': {
    name: 'Disposable Protective Isolation Coverall with Taped Seams',
    sku: 'PKG-ISO-002',
    category: 'protective-equipment',
    categoryName: 'Protective Equipment',
    primaryImage: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80',
    ],
    shortDesc: 'Type 4/5/6 certified microporous laminated protective coverall designed for biological agent barrier protection.',
    longDesc: 'Our Disposable Protective Isolation Coverall is manufactured using high-grade microporous film laminated to spunbond polypropylene. Blue taped heat-sealed seams ensure complete impermeability to particulate matter, aerosols, infectious liquids, and viral agents.',
    features: [
      'Type 4B / 5B / 6B certified for chemical and infectious agent protection',
      'Heat-sealed impervious tape over all seams',
      'Elasticated hood, cuffs, ankles, and waist for snug contoured fit',
      'Two-way zipper with storm flap and adhesive sealing strip',
      'Anti-static treatment meeting EN 1149 standard',
      'Lint-free, tear-resistant composite fabric',
    ],
    specs: {
      'Material': 'Microporous Film laminated PP non-woven',
      'Weight': '65 gsm',
      'Seam Type': 'Heat-sealed blue taped seams',
      'Certification': 'CE Category III, EN 14126, Type 4/5/6',
      'Sizes Available': 'M, L, XL, XXL, 3XL',
      'Color': 'Clean White with Blue Seam Tape',
    },
    applications: [
      'Infectious Disease Isolation Wards',
      'Quarantine and Epidemic Control Protocols',
      'Clinical Laboratories and Pathological Testing',
      'Pharmaceutical Cleanrooms',
      'Emergency Rescue Units',
    ],
    packaging: '1 pc/vacuum bag, 40 bags/carton',
    sterilization: 'Non-sterile or EO gas available',
  },
  'cesarean-section-c-section-surgical-pack': {
    name: 'Sterile Cesarean Section (C-Section) Surgical Pack',
    sku: 'PKG-SP-CS01',
    category: 'surgical-pack',
    categoryName: 'Surgical Pack',
    primaryImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    ],
    shortDesc: 'Specialized drape pack including aperture fenestration, fluid collection pouch with suction port, and baby blanket.',
    longDesc: 'Pakistan Medical C-Section Surgical Pack is configured to optimize surgical workflow, minimize drape adjustment time, and maintain strict asepsis during emergency and planned cesarean deliveries. The integrated fluid collection bag prevents operating theater pooling and safeguards surgical teams.',
    features: [
      'C-section drape with 360-degree fluid collection pouch and double drainage ports',
      'Integrated incise film with antimicrobial iodine impregnation',
      'Includes sterile baby wrap blanket, umbilical cord clamps, and neonatal suction tube',
      'High absorption zone around incision prevents spillover',
      'EO sterilized with class 5 chemical indicator strip',
    ],
    specs: {
      'Drape Dimensions': '260cm x 300cm',
      'Incision Fenestration': '30cm x 34cm with incise film',
      'Collection Pouch': 'Heavy duty polyethylene with malleable wire rim',
      'Sterilization': 'Ethylene Oxide (SAL 10⁻⁶)',
      'Standard Compliance': 'EN 13795 / ISO 13485',
      'Shelf Life': '3 Years',
    },
    applications: [
      'Obstetrics Operating Rooms',
      'Maternity Hospitals and Birthing Centers',
      'Emergency Labor & Delivery Units',
    ],
    packaging: '1 set/sterile peel pack, 10 sets/carton',
    sterilization: 'Ethylene Oxide (EO Gas)',
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = params.category as string;
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'applications'>('specs');

  // Lookup product or default to SMS gown
  const product = PRODUCT_DETAILS[slug] || PRODUCT_DETAILS['sms-sterile-surgical-gown-reinforced'];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 text-xs font-medium text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-brand-700">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={`/products/${category}`} className="hover:text-brand-700 capitalize">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8">
        {/* Top Product Hero Block */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square flex items-center justify-center">
              <img
                src={product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur text-white text-xs font-mono px-3 py-1 rounded-md">
                SKU: {product.sku}
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded shadow">
                  AAMI Level 3/4
                </span>
                <span className="px-3 py-1 bg-brand-700 text-white text-xs font-bold rounded shadow">
                  Sterile EO
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3">
              {product.images.map((img: string, i: number) => (
                <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-brand-600 cursor-pointer">
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Hospital &amp; Clinical Certified
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                {product.shortDesc}
              </p>

              {/* Key Bullet Highlights */}
              <div className="mt-5 space-y-2 border-t border-b border-slate-100 py-4">
                {product.features.slice(0, 3).map((f: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Quick Specs Overview */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Packaging</span>
                  <span className="font-semibold text-slate-800">{product.packaging}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Sterilization</span>
                  <span className="font-semibold text-slate-800">{product.sterilization}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setInquiryOpen(true)}
                  className="flex-1 py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Inquire / Request Quotation
                </button>
                <a
                  href={`https://wa.me/923005561917?text=${encodeURIComponent(`Hello Pakistan Medical, I am interested in: ${product.name} (${product.sku})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              <button
                onClick={() => setInquiryOpen(true)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-slate-500" />
                Download Technical Data Sheet (PDF)
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-200 text-sm font-bold bg-slate-50/50">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 border-b-2 transition ${
                activeTab === 'specs'
                  ? 'border-brand-700 text-brand-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-6 py-4 border-b-2 transition ${
                activeTab === 'features'
                  ? 'border-brand-700 text-brand-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Clinical Features &amp; Performance
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-4 border-b-2 transition ${
                activeTab === 'applications'
                  ? 'border-brand-700 text-brand-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Intended Applications
            </button>
          </div>

          <div className="p-6 lg:p-8">
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <h3 className="text-base font-bold text-slate-900">Technical Parameter Matrix</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <tbody>
                      {Object.entries(product.specs).map(([key, val], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/80' : 'bg-white'}>
                          <td className="px-5 py-3 font-semibold text-slate-700 w-1/3 border-r border-slate-200">
                            {key}
                          </td>
                          <td className="px-5 py-3 text-slate-600 font-medium">
                            {val as string}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Clinical &amp; Barrier Performance Highlights</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {product.longDesc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((f: string, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Clinical Departments &amp; Surgical Scenarios</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {product.applications.map((app: string, idx: number) => (
                    <div key={idx} className="p-4 bg-brand-50/60 border border-brand-100 rounded-xl flex items-center gap-3">
                      <Layers className="w-5 h-5 text-brand-700 flex-shrink-0" />
                      <span className="text-xs font-bold text-slate-800">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        productName={product.name}
        productId={product.sku}
      />
    </div>
  );
}
