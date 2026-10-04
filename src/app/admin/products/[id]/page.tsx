'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  Loader2, 
  Trash2, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    slug: '',
    category_id: '',
    short_description: '',
    description: '',
    packaging: '',
    sterilization: '',
    primary_image: '',
    status: 'published',
    featured: false,
    sort_order: 0,
  });

  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');

  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([]);
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');

  const [applications, setApplications] = useState<string[]>([]);
  const [appInput, setAppInput] = useState('');

  useEffect(() => {
    if (!productId) return;

    Promise.all([
      fetch(`/api/admin/products/${productId}`).then(res => res.json()),
      fetch('/api/admin/categories').then(res => res.json()),
    ])
      .then(([prodData, catData]) => {
        if (catData.categories) {
          setCategories(catData.categories);
        }

        if (prodData.product) {
          const p = prodData.product;
          setFormData({
            name: p.name || '',
            sku: p.sku || '',
            slug: p.slug || '',
            category_id: p.category_id || '',
            short_description: p.short_description || '',
            description: p.description || '',
            packaging: p.packaging || '',
            sterilization: p.sterilization || '',
            primary_image: p.primary_image || '',
            status: p.status || 'published',
            featured: Boolean(p.featured),
            sort_order: p.sort_order || 0,
          });

          if (Array.isArray(p.features)) {
            setFeatures(p.features);
          }

          if (p.specifications && typeof p.specifications === 'object') {
            const specList = Object.entries(p.specifications).map(([key, value]) => ({
              key,
              value: String(value),
            }));
            setSpecs(specList);
          }

          if (Array.isArray(p.applications)) {
            setApplications(p.applications);
          }
        } else {
          setError('Product not found in database.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load product data.');
      })
      .finally(() => setLoading(false));
  }, [productId]);

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
    setSuccessMsg(null);

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

      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update product');
      }

      setSuccessMsg('Product specifications successfully saved to database!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product from the database?')) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        router.push('/admin/products');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to delete product');
      }
    } catch (err: any) {
      setError(err.message || 'Error deleting product');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-brand-700 mb-3" />
        <span className="text-sm font-semibold">Loading product specifications...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Edit Medical Product</h1>
            <p className="text-xs text-slate-500">ID: {productId}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Identifiers */}
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
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              SKU / Model Code *
            </label>
            <input
              type="text"
              required
              value={formData.sku}
              onChange={e => setFormData({ ...formData, sku: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
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
              <option value="">-- Select Category --</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.parent_id ? `↳ ${c.name}` : c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Catalog Status
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
            Short Description
          </label>
          <input
            type="text"
            value={formData.short_description}
            onChange={e => setFormData({ ...formData, short_description: e.target.value })}
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
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none"
          ></textarea>
        </div>

        {/* Packaging & Sterilization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Sterilization Method
            </label>
            <input
              type="text"
              value={formData.sterilization}
              onChange={e => setFormData({ ...formData, sterilization: e.target.value })}
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

        {/* Features */}
        <div className="pt-4 border-t border-slate-200">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Key Features &amp; Standards
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

        {/* Specifications */}
        <div className="pt-4 border-t border-slate-200">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Technical Specifications (Key &amp; Value)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-2">
            <input
              type="text"
              value={specKey}
              onChange={e => setSpecKey(e.target.value)}
              placeholder="Specification Name"
              className="sm:col-span-2 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
            <input
              type="text"
              value={specVal}
              onChange={e => setSpecVal(e.target.value)}
              placeholder="Value"
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

        {/* Applications */}
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

        {/* Buttons */}
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
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Specifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
