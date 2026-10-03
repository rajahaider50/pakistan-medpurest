'use client';

import React, { useState } from 'react';
import { FolderTree, Plus, Edit, Trash2 } from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: '1', slug: 'protective-equipment', name: 'Protective Equipment', subcount: 5, sort: 1, featured: true },
  { id: '2', slug: 'surgical-pack', name: 'Surgical Pack', subcount: 7, sort: 2, featured: true },
  { id: '3', slug: 'cleaning-and-disinfection-series', name: 'Cleaning and Disinfection Series', subcount: 2, sort: 3, featured: true },
  { id: '4', slug: 'surgical-drapes', name: 'Surgical Drapes', subcount: 0, sort: 4, featured: true },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const slug = newCatSlug || newCatName.toLowerCase().replace(/\s+/g, '-');
    setCategories([
      ...categories,
      {
        id: String(Date.now()),
        slug,
        name: newCatName,
        subcount: 0,
        sort: categories.length + 1,
        featured: false,
      },
    ]);
    setNewCatName('');
    setNewCatSlug('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Product Categories</h1>
          <p className="text-xs text-slate-500 mt-1">Organize primary catalogues and subcategory hierarchies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="font-bold text-sm text-slate-900">Primary Categories</h3>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Category Name</th>
                <th className="px-6 py-3.5">URL Slug</th>
                <th className="px-6 py-3.5">Subcategories</th>
                <th className="px-6 py-3.5">Featured</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-slate-900">{c.name}</td>
                  <td className="px-6 py-4 font-mono text-slate-500">{c.slug}</td>
                  <td className="px-6 py-4 text-slate-600">{c.subcount} items</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded text-[10px]">
                      {c.featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setCategories(categories.filter(item => item.id !== c.id))}
                      className="p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Category Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900">Add New Category</h3>
          <form onSubmit={handleAddCategory} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Category Name
              </label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                placeholder="e.g. Sterilization Pouches"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Slug (Optional)
              </label>
              <input
                type="text"
                value={newCatSlug}
                onChange={e => setNewCatSlug(e.target.value)}
                placeholder="sterilization-pouches"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-lg text-xs shadow flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
