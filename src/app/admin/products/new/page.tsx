'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  Loader2, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    slug: '',
    category_id: '',
    short_description: '',
    description: '',
    packaging: '1 pc/sterile peel pouch, 50 pouches/carton',
    sterilization: 'Ethylene Oxide (EO Gas, SAL 10⁻⁶)',
    primary_image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    status: 'published',
    featured: false,
    sort_order: 0,
  });

  const [features, setFeatures] = useState<string[]>([
    'AAMI PB70 Level 3/4 Barrier Protection',
    'Ultrasonic Welded Seam Technology',
  ]);
  const [featureInput, setFeatureInput] = useState('');

  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([
    { key: 'Material', value: 'Multi-layer SMS / SMMS Non-Woven' },
    { key: 'Barrier Standard', value: 'EN 13795 / AAMI PB70' },
  ]);
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');

  const [applications, setApplications] = useState<string[]>([
    'Operating Theatres & Surgical Suites',
    'General Surgery Procedures',
  ]);
  const [appInput, setAppInput] = useState('');

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => {
        const cats = data.categories || [];
        setCategories(cats);
        if (cats.length > 0) {
          setFormData(prev => ({ ...prev, category_id: cats[0].id }));
        }
      })
      .catch(console.error)
      .finally(() => setLoadingCats(false));
  }, []);

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData(prev => ({ ...prev, name, slug }));
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setFeatures([...features, featureInput.trim()]);
    setFeatureInput('');
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addSpec = () => {
    if (!specKey.trim() || !specVal.trim()) return;
    setSpecs([...specs, { key: specKey.trim(), value: specVal.trim() }]);
    setSpecKey('');
    setSpecVal('');
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const addApplication = () => {
    if (!appInput.trim()) return;
    setApplications([...applications, appInput.trim()]);
    setAppInput('');
  };

  const removeApplication = (index: number) => {
    setApplications(applications.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Convert specs array to object
    const specObject: Record<string, string> = {};
    specs.forEach(s => {
      if (s.key) specObject[s.key] = s.value;
    });

    try {
      const payload = {
        ...formData,
        features,
        specifications: specObject,
        applications,
        images: [formData.primary_image],
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create product');
      }

      router.push('/admin/products');
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving product');
    } finally {
      setSaving(false);
    }
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
          <p className="text-xs text-slate-500">Configure technical parameters, certifications, and high-res imagery.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Core Identifiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => handleNameChange(e.target.value)}
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
              URL Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
              placeholder="reinforced-smms-surgical-gown"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Category *
            </label>
            <select
              value={formData.category_id}
              onChange={e => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:bg-white"
            >
              {loadingCats ? (
                <option value="">Loading categories...</option>
              ) : (
                categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.parent_id ? `↳ ${c.name}` : c.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Status & Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Publish Status
            </label>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sort Order
            </label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={e => setFormData({ ...formData, sort_order: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
            />
          </div>

          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <span>Featured on Homepage</span>
            </label>
          </div>
        </div>

        {/* Descriptions */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Short Description (Catalog Preview)
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
            Full Clinical Description &amp; Mechanism
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed clinical parameters, material density, ultrasonic bonding standards..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none"
          ></textarea>
        </div>

        {/* Logistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sterilization Method
            </label>
            <input
              type="text"
              value={formData.sterilization}
              onChange={e => setFormData({ ...formData, sterilization: e.target.value })}
              placeholder="Ethylene Oxide (EO Gas) / Gamma"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Packaging Format
            </label>
            <input
              type="text"
              value={formData.packaging}
              onChange={e => setFormData({ ...formData, packaging: e.target.value })}
              placeholder="e.g. 1 pc/sterile peel pouch, 50 pouches/carton"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Primary Image */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Primary Image URL
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="url"
              value={formData.primary_image}
              onChange={e => setFormData({ ...formData, primary_image: e.target.value })}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
            {formData.primary_image && (
              <img
                src={formData.primary_image}
                alt="Preview"
                className="w-12 h-12 rounded-lg object-cover border border-slate-300 bg-slate-100 flex-shrink-0"
                onError={e => (e.currentTarget.style.display = 'none')}
              />
            )}
          </div>
        </div>

        {/* Features Tag Input */}
        <div className="pt-4 border-t border-slate-200">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Key Features &amp; Certifications
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={featureInput}
              onChange={e => setFeatureInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); }}}
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

        {/* Technical Specifications Key-Value Builder */}
        <div className="pt-4 border-t border-slate-200">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Technical Specifications (Key &amp; Value)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-2">
            <input
              type="text"
              value={specKey}
              onChange={e => setSpecKey(e.target.value)}
              placeholder="Specification Name (e.g. Material)"
              className="sm:col-span-2 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
            <input
              type="text"
              value={specVal}
              onChange={e => setSpecVal(e.target.value)}
              placeholder="Value (e.g. SMS 50 gsm)"
              className="sm:col-span-2 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
            <button
              type="button"
              onClick={addSpec}
              className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-slate-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Spec
            </button>
          </div>
          <div className="space-y-1.5">
            {specs.map((s, i) => (
              <div
                key={i}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-800 mr-2">{s.key}:</span>
                  <span className="text-slate-600">{s.value}</span>
                </div>
                <button type="button" onClick={() => removeSpec(i)} className="text-slate-400 hover:text-red-500 p-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Applications Tags */}
        <div className="pt-4 border-t border-slate-200">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Clinical Applications &amp; Surgical Departments
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={appInput}
              onChange={e => setAppInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addApplication(); }}}
              placeholder="e.g. Orthopedic Surgery"
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
            <button
              type="button"
              onClick={addApplication}
              className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1 hover:bg-slate-700 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {applications.map((a, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-xs flex items-center gap-1.5"
              >
                {a}
                <button type="button" onClick={() => removeApplication(i)} className="text-slate-500 hover:text-red-500">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2 transition"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Product...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Publish Product to Catalogue
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
