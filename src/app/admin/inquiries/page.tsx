'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  Building, 
  MapPin, 
  Eye, 
  X,
  Save,
  Trash2,
  ExternalLink,
  Loader2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchInquiries = () => {
    setLoading(true);
    fetch('/api/inquiries')
      .then(res => res.json())
      .then(data => {
        if (data.inquiries) setInquiries(data.inquiries);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string, notes?: string) => {
    setUpdating(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, notes }),
      });
      if (res.ok) {
        fetchInquiries();
        if (selectedInquiry) {
          setSelectedInquiry((prev: any) => ({ ...prev, status: newStatus, notes }));
        }
        setMessage({ type: 'success', text: `Lead status updated to ${newStatus.replace('_', ' ')}.` });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to update lead status.' });
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer inquiry?')) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(i => i.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
        setMessage({ type: 'success', text: 'Inquiry deleted successfully.' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete inquiry.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting inquiry.' });
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = inquiries.filter(inq => {
    const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
    const matchesSearch =
      inq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.product_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Inquiries &amp; Commercial Leads</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage incoming hospital inquiries, B2B quotation requests, and customer contact pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchInquiries}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition"
            title="Refresh Inquiries"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-700' : ''}`} />
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

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search leads by customer name, email, company, or product..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">All Statuses ({inquiries.length})</option>
          <option value="new">New ({inquiries.filter(i => i.status === 'new').length})</option>
          <option value="contacted">Contacted</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Customer &amp; Company</th>
                <th className="px-6 py-3.5">Product Inquired</th>
                <th className="px-6 py-3.5">Contact Details</th>
                <th className="px-6 py-3.5">Destination</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-700 mb-2" />
                    Loading customer leads...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No customer leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {item.name}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {item.company || 'Direct Hospital'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800 max-w-xs">
                      {item.product_name || 'General Product Inquiry'}
                      {item.quantity && (
                        <span className="block text-[11px] text-brand-700 font-semibold mt-0.5">
                          Qty: {item.quantity}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{item.email}</span>
                      </div>
                      {item.phone && (
                        <div className="flex items-center gap-1 text-slate-400 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>{item.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {item.country || 'International'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border ${
                          item.status === 'new'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : item.status === 'contacted'
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : item.status === 'in_progress'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {item.status || 'new'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold rounded-lg text-xs transition inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="p-1.5 text-slate-400 hover:text-red-600 inline-block rounded hover:bg-slate-100"
                        title="Delete Inquiry"
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

      {/* Inquiry Detail & Status Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Inquiry Details &amp; Commercial Pipeline</h3>
                <span className="text-[11px] text-brand-300">ID: {selectedInquiry.id}</span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Customer Name</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Company / Hospital</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedInquiry.company || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Email Address</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-brand-700 font-semibold underline flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3" />
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Phone Number</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {selectedInquiry.phone || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Product Inquired</span>
                  <span className="font-bold text-brand-700">{selectedInquiry.product_name || 'General'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Order Volume</span>
                  <span className="font-semibold text-slate-800">{selectedInquiry.quantity || 'Undisclosed'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Destination Country</span>
                  <span className="font-semibold text-slate-800">{selectedInquiry.country || 'International'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Submission Time</span>
                  <span className="font-mono text-slate-600">
                    {selectedInquiry.created_at ? new Date(selectedInquiry.created_at).toLocaleString() : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div className="flex gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Response to Quotation Request: ${encodeURIComponent(selectedInquiry.product_name || 'Medical Supplies')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Mail className="w-3.5 h-3.5" /> Email Response
                </a>
                {selectedInquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" /> WhatsApp Customer
                  </a>
                )}
              </div>

              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px] mb-1">
                  Customer Message / Procurement Specifications
                </span>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-700 block font-bold uppercase text-[10px] mb-2">
                  Update Lead Pipeline Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {['new', 'contacted', 'in_progress', 'closed'].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusUpdate(selectedInquiry.id, st, selectedInquiry.notes)}
                      disabled={updating}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                        selectedInquiry.status === st
                          ? 'bg-brand-700 text-white shadow'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="text-slate-700 block font-bold uppercase text-[10px] mb-1">
                  Internal Sales &amp; Quotation Notes
                </label>
                <textarea
                  rows={3}
                  defaultValue={selectedInquiry.notes || ''}
                  onBlur={e => handleStatusUpdate(selectedInquiry.id, selectedInquiry.status, e.target.value)}
                  placeholder="e.g. Sent proforma invoice #PI-889 via email, requested FOB Karachi price..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none"
                ></textarea>
                <span className="text-[10px] text-slate-400">Notes save automatically when you click outside the box.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
