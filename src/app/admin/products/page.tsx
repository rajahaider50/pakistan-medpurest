'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    sku: 'PKG-SG-001',
    name: 'SMS Reinforced Sterile Surgical Gown Level 3/4',
    category: 'Protective Equipment',
    status: 'published',
    views: 1420,
    link: '/products/protective-equipment/sms-sterile-surgical-gown-reinforced',
  },
  {
    id: 'p2',
    sku: 'PKG-ISO-002',
    name: 'Disposable Protective Isolation Coverall with Taped Seams',
    category: 'Protective Equipment',
    status: 'published',
    views: 980,
    link: '/products/protective-equipment/disposable-isolation-suit-coverall',
  },
  {
    id: 'p3',
    sku: 'PKG-SP-CS01',
    name: 'Sterile Cesarean Section (C-Section) Surgical Pack',
    category: 'Surgical Pack',
    status: 'published',
    views: 1150,
    link: '/products/surgical-pack/cesarean-section-c-section-surgical-pack',
  },
  {
    id: 'p4',
    sku: 'PKG-CLN-858',
    name: 'Multi-Enzyme Medical Instrument Cleaner & Biofilm Remover 858',
    category: 'Cleaning & Disinfection',
    status: 'published',
    views: 1820,
    link: '/products/cleaning-and-disinfection-series/biofilm-removal-multi-enzyme-cleaner-858',
  },
  {
    id: 'p5',
    sku: 'PKG-CLN-OPA',
    name: 'Ortho-Phthalaldehyde (OPA) 0.55% High-Level Disinfectant',
    category: 'Cleaning & Disinfection',
    status: 'published',
    views: 2100,
    link: '/products/cleaning-and-disinfection-series/phthalaldehyde-opa-high-level-disinfectant',
  },
  {
    id: 'p6',
    sku: 'PKG-SP-GEN01',
    name: 'Universal Laparotomy & General Surgery Pack',
    category: 'Surgical Pack',
    status: 'published',
    views: 850,
    link: '/products/surgical-pack/universal-laparotomy-general-surgery-pack',
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this product from catalogue?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Products Catalog Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, update specifications, configure AAMI standards, and publish medical products.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-8 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs shadow flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3.5">SKU</th>
                <th className="px-6 py-3.5">Product Title</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Views</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-mono font-bold text-slate-700">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 max-w-xs">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px] uppercase">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono">
                    {item.views}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={item.link}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-brand-700 inline-block"
                      title="View on Live Site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 inline-block"
                      title="Delete Product"
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
    </div>
  );
}
