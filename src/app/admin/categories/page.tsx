'use client';

import React, { useState, useEffect } from 'react';
import { 
  FolderTree, 
  Plus, 
  Edit, 
  Trash2, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  X,
  Save,
  Layers
} from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New category form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatParent, setNewCatParent] = useState('');
  const [newCatSort, setNewCatSort] = useState(0);
  const [newCatFeatured, setNewCatFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Edit category modal state
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [editSaving, setEditSaving] = useState(false);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load categories.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNameChange = (name: string) => {
    setNewCatName(name);
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setNewCatSlug(slug);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCatName,
          slug: newCatSlug,
          parent_id: newCatParent || null,
          sort_order: newCatSort,
          featured: newCatFeatured,
          status: 'published',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create category');
      }

      setMessage({ type: 'success', text: `Category "${newCatName}" created successfully.` });
      setNewCatName('');
      setNewCatSlug('');
      setNewCatParent('');
      setNewCatSort(0);
      setNewCatFeatured(false);
      fetchCategories();
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error creating category' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    setEditSaving(true);
    try {
      const res = await fetch(`/api/admin/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingCategory.name,
          slug: editingCategory.slug,
          parent_id: editingCategory.parent_id || null,
          sort_order: Number(editingCategory.sort_order) || 0,
          featured: Boolean(editingCategory.featured),
          status: editingCategory.status || 'published',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update category');
      }

      setEditingCategory(null);
      setMessage({ type: 'success', text: 'Category updated successfully.' });
      fetchCategories();
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update category');
    } finally {
      setEditSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCategories(prev => prev.filter(c => c.id !== id));
        setMessage({ type: 'success', text: 'Category deleted successfully.' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete category' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting category' });
    } finally {
      setDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  // Primary categories for parent selector
  const primaryCategories = categories.filter(c => !c.parent_id);
  const categoriesMap = new Map(categories.map(c => [c.id, c.name]));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Product Categories Hierarchy</h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize surgical catalogs, primary collections, and sterile pack subcategory trees.
          </p>
        </div>

        <button
          onClick={fetchCategories}
          className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition self-start sm:self-auto"
          title="Refresh Categories"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-700' : ''}`} />
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-700" />
              All Categories ({categories.length})
            </h3>
            <span className="text-[11px] text-slate-400">
              {primaryCategories.length} Primary · {categories.length - primaryCategories.length} Subcategories
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Category Name</th>
                  <th className="px-6 py-3.5">Slug</th>
                  <th className="px-6 py-3.5">Level / Parent</th>
                  <th className="px-6 py-3.5">Products</th>
                  <th className="px-6 py-3.5">Featured</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-700 mb-2" />
                      Loading category tree...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      No categories found. Use the form to create your first category.
                    </td>
                  </tr>
                ) : (
                  categories.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {c.parent_id ? (
                          <span className="text-slate-400 font-normal mr-1.5">↳</span>
                        ) : null}
                        {c.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-500 text-[11px]">
                        {c.slug}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {c.parent_id ? (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">
                            {categoriesMap.get(c.parent_id) || 'Subcategory'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-brand-50 text-brand-800 rounded text-[10px] font-bold">
                            Primary
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {c.productCount || 0} items
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.featured 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {c.featured ? 'Featured' : 'Standard'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setEditingCategory(c)}
                          className="p-1.5 text-slate-400 hover:text-brand-700 inline-block rounded hover:bg-slate-100"
                          title="Edit Category"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(c.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 inline-block rounded hover:bg-slate-100"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Category Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100">
            Add New Category
          </h3>
          <form onSubmit={handleAddCategory} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={e => handleNameChange(e.target.value)}
                placeholder="e.g. Sterilization Pouches"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={newCatSlug}
                onChange={e => setNewCatSlug(e.target.value)}
                placeholder="sterilization-pouches"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Parent Hierarchy
              </label>
              <select
                value={newCatParent}
                onChange={e => setNewCatParent(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:bg-white"
              >
                <option value="">None (Primary Category)</option>
                {primaryCategories.map(pc => (
                  <option key={pc.id} value={pc.id}>↳ Under: {pc.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={newCatSort}
                  onChange={e => setNewCatSort(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={newCatFeatured}
                    onChange={e => setNewCatFeatured(e.target.checked)}
                    className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                  />
                  <span>Featured</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow flex items-center justify-center gap-1.5 transition"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Adding Category...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Add Category
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Edit Category</h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.slug}
                  onChange={e => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Parent Hierarchy
                </label>
                <select
                  value={editingCategory.parent_id || ''}
                  onChange={e => setEditingCategory({ ...editingCategory, parent_id: e.target.value || null })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                >
                  <option value="">None (Primary Category)</option>
                  {primaryCategories
                    .filter(pc => pc.id !== editingCategory.id)
                    .map(pc => (
                      <option key={pc.id} value={pc.id}>↳ Under: {pc.name}</option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={editingCategory.sort_order || 0}
                    onChange={e => setEditingCategory({ ...editingCategory, sort_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={Boolean(editingCategory.featured)}
                      onChange={e => setEditingCategory({ ...editingCategory, featured: e.target.checked })}
                      className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                    />
                    <span>Featured</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSaving}
                  className="px-5 py-2 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  {editSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Delete Category</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete this category? Products assigned to it will be set to uncategorized.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Deleting...
                  </>
                ) : (
                  'Confirm Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
