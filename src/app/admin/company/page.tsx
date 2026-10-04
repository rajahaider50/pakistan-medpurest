'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  History, 
  HeartHandshake, 
  Award, 
  Plus, 
  Trash2, 
  Edit, 
  Loader2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Save,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function AdminCompanyPage() {
  const [activeTab, setActiveTab] = useState<'history' | 'culture' | 'honors'>('history');
  const [data, setData] = useState<{ history: any[]; culture: any[]; honors: any[] }>({
    history: [],
    culture: [],
    honors: [],
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; section: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form States
  const [historyForm, setHistoryForm] = useState({
    year: '2026',
    title: '',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    sort_order: 1,
  });

  const [cultureForm, setCultureForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    icon: 'ShieldCheck',
    image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    sort_order: 1,
  });

  const [honorsForm, setHonorsForm] = useState({
    title: '',
    year: '2025',
    issuer: '',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80',
    sort_order: 1,
    status: 'published',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/company');
      if (res.ok) {
        const json = await res.json();
        setData({
          history: json.history || [],
          culture: json.culture || [],
          honors: json.honors || [],
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load company content.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let payload: any = {};
    if (activeTab === 'history') payload = historyForm;
    else if (activeTab === 'culture') payload = cultureForm;
    else if (activeTab === 'honors') payload = honorsForm;

    try {
      const res = await fetch('/api/admin/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: activeTab, data: payload }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save item');

      setIsAddOpen(false);
      setMessage({ type: 'success', text: 'Item added successfully.' });
      fetchData();
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error saving item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: activeTab, id: editingItem.id, data: editingItem }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to update item');

      setEditingItem(null);
      setMessage({ type: 'success', text: 'Item updated successfully.' });
      fetchData();
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (section: string, id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/company?section=${section}&id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Item removed successfully.' });
        fetchData();
        setTimeout(() => setMessage(null), 3000);
      } else {
        const json = await res.json();
        setMessage({ type: 'error', text: json.error || 'Failed to delete' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting' });
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Company Heritage &amp; Culture CMS</h1>
          <p className="text-xs text-slate-500 mt-1">Manage 25-year company development milestones, corporate culture values, and national/global honors.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-700' : ''}`} />
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs shadow flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
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

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs transition ${
            activeTab === 'history'
              ? 'border-brand-700 text-brand-700 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Development Milestones ({data.history.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('culture')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs transition ${
            activeTab === 'culture'
              ? 'border-brand-700 text-brand-700 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Corporate Culture ({data.culture.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('honors')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs transition ${
            activeTab === 'honors'
              ? 'border-brand-700 text-brand-700 bg-white rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Honors &amp; Awards ({data.honors.length})</span>
        </button>
      </div>

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Year</th>
                  <th className="px-6 py-3.5">Milestone Title &amp; Summary</th>
                  <th className="px-6 py-3.5">Sort</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-700 mb-2" />
                      Loading history milestones...
                    </td>
                  </tr>
                ) : data.history.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                      No milestones recorded.
                    </td>
                  </tr>
                ) : (
                  data.history.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4 font-mono font-black text-brand-700 text-sm whitespace-nowrap">
                        {item.year}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xl">
                          <span className="font-bold text-slate-900 block text-xs">{item.title}</span>
                          <span className="text-[11px] text-slate-500 mt-0.5 block leading-relaxed">{item.description}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-400">#{item.sort_order || 0}</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-1.5 text-slate-400 hover:text-brand-700 inline-block rounded hover:bg-slate-100"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ id: item.id, section: 'history' })}
                          className="p-1.5 text-slate-400 hover:text-red-600 inline-block rounded hover:bg-slate-100"
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
      )}

      {/* Culture Tab */}
      {activeTab === 'culture' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Core Value Title</th>
                  <th className="px-6 py-3.5">Subtitle</th>
                  <th className="px-6 py-3.5">Description</th>
                  <th className="px-6 py-3.5">Sort</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.culture.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">{item.title}</td>
                    <td className="px-6 py-4 text-brand-700 font-semibold whitespace-nowrap">{item.subtitle || 'Core'}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-md">{item.description}</td>
                    <td className="px-6 py-4 font-mono text-slate-400">#{item.sort_order || 0}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-1.5 text-slate-400 hover:text-brand-700 inline-block rounded hover:bg-slate-100"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ id: item.id, section: 'culture' })}
                        className="p-1.5 text-slate-400 hover:text-red-600 inline-block rounded hover:bg-slate-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Honors Tab */}
      {activeTab === 'honors' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Award / Honor Title</th>
                  <th className="px-6 py-3.5">Conferring Authority</th>
                  <th className="px-6 py-3.5">Year</th>
                  <th className="px-6 py-3.5">Sort</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.honors.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-bold text-slate-900 max-w-md">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{item.issuer}</td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-600">{item.year}</td>
                    <td className="px-6 py-4 font-mono text-slate-400">#{item.sort_order || 0}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-1.5 text-slate-400 hover:text-brand-700 inline-block rounded hover:bg-slate-100"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ id: item.id, section: 'honors' })}
                        className="p-1.5 text-slate-400 hover:text-red-600 inline-block rounded hover:bg-slate-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm capitalize">Add {activeTab} Item</h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              {activeTab === 'history' && (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Year *</label>
                      <input
                        type="text"
                        required
                        value={historyForm.year}
                        onChange={e => setHistoryForm({ ...historyForm, year: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Milestone Title *</label>
                      <input
                        type="text"
                        required
                        value={historyForm.title}
                        onChange={e => setHistoryForm({ ...historyForm, title: e.target.value })}
                        placeholder="e.g. Commissioning of 30,000 m² Cleanroom"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                    <textarea
                      rows={3}
                      required
                      value={historyForm.description}
                      onChange={e => setHistoryForm({ ...historyForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl resize-none"
                    ></textarea>
                  </div>
                </>
              )}

              {activeTab === 'culture' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={cultureForm.title}
                        onChange={e => setCultureForm({ ...cultureForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={cultureForm.subtitle}
                        onChange={e => setCultureForm({ ...cultureForm, subtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                    <textarea
                      rows={3}
                      required
                      value={cultureForm.description}
                      onChange={e => setCultureForm({ ...cultureForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl resize-none"
                    ></textarea>
                  </div>
                </>
              )}

              {activeTab === 'honors' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Award Title *</label>
                    <input
                      type="text"
                      required
                      value={honorsForm.title}
                      onChange={e => setHonorsForm({ ...honorsForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Conferring Body / Issuer</label>
                      <input
                        type="text"
                        value={honorsForm.issuer}
                        onChange={e => setHonorsForm({ ...honorsForm, issuer: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Year</label>
                      <input
                        type="text"
                        value={honorsForm.year}
                        onChange={e => setHonorsForm({ ...honorsForm, year: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={honorsForm.description}
                      onChange={e => setHonorsForm({ ...honorsForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl resize-none"
                    ></textarea>
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Edit Item</h3>
              <button onClick={() => setEditingItem(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              {activeTab === 'history' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={editingItem.year || ''}
                    onChange={e => setEditingItem({ ...editingItem, year: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              )}

              {activeTab === 'culture' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={editingItem.subtitle || ''}
                    onChange={e => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              )}

              {activeTab === 'honors' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Conferring Body</label>
                    <input
                      type="text"
                      value={editingItem.issuer || ''}
                      onChange={e => setEditingItem({ ...editingItem, issuer: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Year</label>
                    <input
                      type="text"
                      value={editingItem.year || ''}
                      onChange={e => setEditingItem({ ...editingItem, year: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl resize-none"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Confirm Deletion</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete this {deleteConfirm.section} record?
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => handleDelete(deleteConfirm.section, deleteConfirm.id)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
