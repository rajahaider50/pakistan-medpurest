'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category_id: 'protective-equipment',
    short_description: '',
    description: '',
    packaging: '',
    sterilization: 'Ethylene Oxide (EO Gas)',
    primary_image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    status: 'published',
  });
  const [features, setFeatures] = useState<string[]>(['AAMI PB70 Level 3/4', 'Ultrasonic Seam Sealed']);
  const [featureInput, setFeatureInput] = useState('');
  const [saving, setSaving] = useState(false);

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setFeatures([...features, featureInput.trim()]);
    setFeatureInput('');
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save or insert into Supabase
    setTimeout(() => {
      setSaving(false);
      alert('Product created successfully and published to catalogue.');
      router.push('/admin/products');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900">Add New Medical Product</h1>
          <p className="text-xs text-slate-500">Configure technical parameters, certifications, and images.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Reinforced SMMS Surgical Gown"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Product SKU / Model Code *
            </label>
            <input
              type="text"
              required
              value={formData.sku}
              onChange={e => setFormData({ ...formData, sku: e.target.value })}
              placeholder="e.g. PKG-SG-008"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={formData.category_id}
              onChange={e => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:bg-white"
            >
              <option value="protective-equipment">Protective Equipment</option>
              <option value="surgical-pack">Surgical Pack</option>
              <option value="cleaning-and-disinfection-series">Cleaning &amp; Disinfection Series</option>
              <option value="surgical-drapes">Surgical Drapes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sterilization Method
            </label>
            <input
              type="text"
              value={formData.sterilization}
              onChange={e => setFormData({ ...formData, sterilization: e.target.value })}
              placeholder="Ethylene Oxide (EO) / Gamma / Non-Sterile"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Short Description
          </label>
          <input
            type="text"
            value={formData.short_description}
            onChange={e => setFormData({ ...formData, short_description: e.target.value })}
            placeholder="Brief 1-sentence product summary"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Full Clinical Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed clinical parameters, material weight, ultrasonic bonding standards..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none"
          ></textarea>
        </div>

        {/* Features Tag Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Key Features &amp; Certifications
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={featureInput}
              onChange={e => setFeatureInput(e.target.value)}
              placeholder="e.g. Type 4B Viral Barrier"
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1 hover:bg-slate-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((f, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-brand-50 text-brand-800 border border-brand-200 rounded-lg text-xs flex items-center gap-1.5"
              >
                {f}
                <button type="button" onClick={() => removeFeature(i)} className="text-brand-500 hover:text-red-500">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Primary Image URL
          </label>
          <input
            type="url"
            value={formData.primary_image}
            onChange={e => setFormData({ ...formData, primary_image: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
          />
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2 transition"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Publish Product to Catalogue'}
          </button>
        </div>
      </form>
    </div>
  );
}
