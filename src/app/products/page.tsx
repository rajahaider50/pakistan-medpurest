'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowRight, Send, CheckCircle2, ChevronRight, Package } from 'lucide-react';
import InquiryModal from '@/components/InquiryModal';

const CATEGORIES = [
  { id: 'all', name: 'All Products', count: 6 },
  { id: 'protective-equipment', name: 'Protective Equipment', count: 2 },
  { id: 'surgical-pack', name: 'Surgical Pack', count: 2 },
  { id: 'cleaning-and-disinfection-series', name: 'Cleaning & Disinfection', count: 2 },
  { id: 'surgical-drapes', name: 'Surgical Drapes', count: 0 },
];

const PRODUCTS = [
  {
    name: 'SMS Reinforced Sterile Surgical Gown Level 3/4',
    slug: 'sms-sterile-surgical-gown-reinforced',
    category: 'protective-equipment',
    categoryName: 'Protective Equipment',
    sku: 'PKG-SG-001',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    desc: 'High barrier SMS/SMMS fabric surgical gown with chest and sleeve reinforcement for high-fluid surgical operations.',
    features: ['AAMI PB70 Level 3/4', 'Ultrasonic Welded Seams', 'Breathable Ergonomic Back'],
    standard: 'EN 13795 / AAMI PB70',
  },
  {
    name: 'Disposable Protective Isolation Coverall with Taped Seams',
    slug: 'disposable-isolation-suit-coverall',
    category: 'protective-equipment',
    categoryName: 'Protective Equipment',
    sku: 'PKG-ISO-002',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80',
    desc: 'Type 4/5/6 certified microporous laminated protective coverall designed for biological agent barrier protection.',
    features: ['Type 4B / 5B / 6B Certified', 'Impervious Heat-Sealed Seams', 'Anti-Static EN 1149'],
    standard: 'CE Category III / EN 14126',
  },
  {
    name: 'Sterile Cesarean Section (C-Section) Surgical Pack',
    slug: 'cesarean-section-c-section-surgical-pack',
    category: 'surgical-pack',
    categoryName: 'Surgical Pack',
    sku: 'PKG-SP-CS01',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    desc: 'Specialized drape pack including aperture fenestration, fluid collection pouch with suction port, and baby blanket.',
    features: ['360° Fluid Collection Bag', 'Double Drainage Ports', 'Antimicrobial Incise Film'],
    standard: 'EO Gas Sterilized (SAL 10⁻⁶)',
  },
  {
    name: 'Multi-Enzyme Medical Instrument Cleaner & Biofilm Remover 858',
    slug: 'biofilm-removal-multi-enzyme-cleaner-858',
    category: 'cleaning-and-disinfection-series',
    categoryName: 'Cleaning & Disinfection',
    sku: 'PKG-CLN-858',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    desc: 'Quad-enzyme concentrated detergent formulated to break down proteins, lipids, carbohydrates, and biofilms.',
    features: ['Quad-Enzyme Matrix', 'Rapid 3-Min Biofilm Removal', 'Neutral pH Non-Corrosive'],
    standard: 'Medical Detergent ISO Class',
  },
  {
    name: 'Ortho-Phthalaldehyde (OPA) 0.55% High-Level Disinfectant',
    slug: 'phthalaldehyde-opa-high-level-disinfectant',
    category: 'cleaning-and-disinfection-series',
    categoryName: 'Cleaning & Disinfection',
    sku: 'PKG-CLN-OPA',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    desc: 'Ready-to-use high-level disinfectant solution for heat-sensitive semi-critical medical devices and endoscopes.',
    features: ['Ready-To-Use Solution', 'Fast 5-Min Reprocessing', '14-Day Reuse Life'],
    standard: 'High-Level Disinfectant (HLD)',
  },
  {
    name: 'Universal Laparotomy & General Surgery Pack',
    slug: 'universal-laparotomy-general-surgery-pack',
    category: 'surgical-pack',
    categoryName: 'Surgical Pack',
    sku: 'PKG-SP-GEN01',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    desc: 'All-in-one sterile pack designed for open abdominal and exploratory general surgical procedures.',
    features: ['Trilaminate Absorbent Fabric', 'Reinforced Fluid Control Zone', 'Utility Accessories Included'],
    standard: 'EO Gas Sterilized (SAL 10⁻⁶)',
  },
];

export default function ProductsPage() {
  const [productList, setProductList] = useState(PRODUCTS);
  const [categoryList, setCategoryList] = useState(CATEGORIES);
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.products && data.products.length > 0) {
          const mapped = data.products.map((p: any) => ({
            name: p.name,
            slug: p.slug,
            category: p.med_categories?.slug || p.category_id || 'protective-equipment',
            categoryName: p.med_categories?.name || 'Medical Supply',
            sku: p.sku,
            image: p.primary_image || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
            desc: p.short_description || p.description || '',
            features: Array.isArray(p.features) ? p.features : [],
            standard: p.specifications?.['Barrier Standard'] || p.sterilization || 'Medical Grade',
          }));
          setProductList(mapped);
        }
      })
      .catch(() => {});

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories && data.categories.length > 0) {
          const primary = data.categories.filter((c: any) => !c.parent_id);
          const mappedCats = [
            { id: 'all', name: 'All Products', count: data.categories.length },
            ...primary.map((c: any) => ({
              id: c.slug,
              name: c.name,
              count: 0
            }))
          ];
          setCategoryList(mappedCats);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProducts = productList.filter(prod => {
    const matchesCat = selectedCat === 'all' || prod.category === selectedCat;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleInquiry = (name: string) => {
    setInquiryProduct(name);
    setInquiryModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Products</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Medical Products &amp; Solutions Catalogue</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            Browse our complete line of surgical gowns, sterile procedure packs, protective wear, and infection prevention products.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-700" />
                Categories
              </h3>
              <div className="space-y-1">
                {categoryList.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                      selectedCat === cat.id
                        ? 'bg-brand-700 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      selectedCat === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-brand-50 border border-brand-200 p-5 rounded-2xl text-xs text-slate-700 space-y-3">
              <div className="font-bold text-slate-900 text-sm">Need Custom OEM Pack?</div>
              <p className="text-slate-600 leading-relaxed">
                We manufacture bespoke surgical packs and private-label medical garments tailored to your specifications.
              </p>
              <button
                onClick={() => handleInquiry('Custom OEM Pack Inquiry')}
                className="w-full py-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-lg shadow transition"
              >
                Inquire Custom Pack
              </button>
            </div>
          </aside>

          {/* Main Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter by product name, SKU..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> medical products
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
                <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No products found</h3>
                <p className="text-xs text-slate-500 mt-1">Try clearing your search keyword or selecting another category.</p>
                <button
                  onClick={() => { setSelectedCat('all'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <Link href={`/products/${prod.category}/${prod.slug}`} className="relative h-48 bg-slate-100 overflow-hidden block">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        {prod.sku}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow">
                        {prod.standard}
                      </div>
                    </Link>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-brand-700 mb-1">
                          {prod.categoryName}
                        </div>
                        <Link
                          href={`/products/${prod.category}/${prod.slug}`}
                          className="text-sm font-bold text-slate-900 hover:text-brand-700 transition line-clamp-2"
                        >
                          {prod.name}
                        </Link>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {prod.desc}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {prod.features.map((f, fi) => (
                            <span key={fi} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <Link
                          href={`/products/${prod.category}/${prod.slug}`}
                          className="text-xs font-bold text-slate-700 hover:text-brand-700"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => handleInquiry(prod.name)}
                          className="px-3.5 py-1.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-lg text-xs shadow flex items-center gap-1.5 transition"
                        >
                          <Send className="w-3 h-3" />
                          Inquire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        productName={inquiryProduct}
      />
    </div>
  );
}
