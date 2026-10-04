'use client';

import React, { useState, useEffect } from 'react';
import { 
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
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    cert_number: '',
    issuing_authority: '',
    issue_date: '2023-01-15',
    expiry_date: '2028-01-14',
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    sort_order: 1,
    status: 'published',
  });

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/certificates');
      if (res.ok) {
        const data = await res.json();
        setCerts(data.certificates || []);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load certificates.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add certificate');

      setIsAddOpen(false);
      setMessage({ type: 'success', text: 'Certificate added successfully.' });
      setFormData({
        title: '',
        cert_number: '',
        issuing_authority: '',
        issue_date: '2023-01-15',
        expiry_date: '2028-01-14',
        image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        sort_order: certs.length + 1,
        status: 'published',
      });
      fetchCerts();
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error saving certificate');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/certificates/${editingCert.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCert),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update certificate');

      setEditingCert(null);
      setMessage({ type: 'success', text: 'Certificate updated successfully.' });
      fetchCerts();
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating certificate');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/certificates/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCerts(prev => prev.filter(c => c.id !== id));
        setMessage({ type: 'success', text: 'Certificate removed successfully.' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete certificate' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting certificate' });
    } finally {
      setDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Regulatory &amp; Quality Certifications</h1>
          <p className="text-xs text-slate-500 mt-1">Manage ISO 13485, CE MDR, FDA 510(k), and EN testing accreditations.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchCerts}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition"
            title="Refresh certificates"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-700' : ''}`} />
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs shadow flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" /> Add Certificate
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

      {/* Certificates Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Certificate Name</th>
                <th className="px-6 py-3.5">Registration #</th>
                <th className="px-6 py-3.5">Notified Body / Issuer</th>
                <th className="px-6 py-3.5">Validity Dates</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-700 mb-2" />
                    Loading regulatory certificates...
                  </td>
                </tr>
              ) : certs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No certificates recorded. Click "Add Certificate" to register one.
                  </td>
                </tr>
              ) : (
                certs.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-bold text-slate-900 max-w-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <span>{c.title}</span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-600 whitespace-nowrap">
                      {c.cert_number || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{c.issuing_authority || 'Accredited Body'}</td>
                    <td className="px-6 py-4 font-mono text-emerald-700 font-semibold whitespace-nowrap">
                      {c.expiry_date ? `Exp: ${c.expiry_date}` : 'Perpetual / Ongoing'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px] uppercase">
                        {c.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setEditingCert(c)}
                        className="p-1.5 text-slate-400 hover:text-brand-700 inline-block rounded hover:bg-slate-100"
                        title="Edit Certificate"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(c.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 inline-block rounded hover:bg-slate-100"
                        title="Delete Certificate"
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

      {/* Add Certificate Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Add Regulatory Certificate</h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Certificate Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. ISO 13485:2016 Medical Devices QMS"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Registration / Cert #
                  </label>
                  <input
                    type="text"
                    value={formData.cert_number}
                    onChange={e => setFormData({ ...formData, cert_number: e.target.value })}
                    placeholder="MDQ-981240-PK"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Issuing Authority / Body
                  </label>
                  <input
                    type="text"
                    value={formData.issuing_authority}
                    onChange={e => setFormData({ ...formData, issuing_authority: e.target.value })}
                    placeholder="TÜV Rheinland / BSI"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={formData.issue_date}
                    onChange={e => setFormData({ ...formData, issue_date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiry_date}
                    onChange={e => setFormData({ ...formData, expiry_date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Document / Certificate Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={e => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="published">Published (Active)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

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
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Certificate Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Edit Certificate</h3>
              <button onClick={() => setEditingCert(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Certificate Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title}
                  onChange={e => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Registration #
                  </label>
                  <input
                    type="text"
                    value={editingCert.cert_number || ''}
                    onChange={e => setEditingCert({ ...editingCert, cert_number: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Issuing Authority
                  </label>
                  <input
                    type="text"
                    value={editingCert.issuing_authority || ''}
                    onChange={e => setEditingCert({ ...editingCert, issuing_authority: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Issue Date
                  </label>
                  <input
                    type="text"
                    value={editingCert.issue_date || ''}
                    onChange={e => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={editingCert.expiry_date || ''}
                    onChange={e => setEditingCert({ ...editingCert, expiry_date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Certificate Image URL
                </label>
                <input
                  type="url"
                  value={editingCert.image_url || ''}
                  onChange={e => setEditingCert({ ...editingCert, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
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
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Delete Certificate</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove this regulatory document?
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => handleDelete(deleteConfirmId)}
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
