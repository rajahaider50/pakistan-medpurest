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
  Save
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [updating, setUpdating] = useState(false);

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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
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
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Inquiries &amp; Commercial Leads</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage hospital inquiries, requests for quotations, and customer communications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search leads..."
              className="pl-8 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Customer &amp; Company</th>
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">Contact Details</th>
                <th className="px-6 py-3.5">Destination</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No customer leads match the selected filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {item.name}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {item.company || 'Direct Hospital'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {item.product_name || 'General Inquiry'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
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
                    <td className="px-6 py-4 text-slate-600">
                      {item.country || 'International'}
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold rounded-lg text-xs transition"
                      >
                        View &amp; Edit
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
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Inquiry Details</h3>
                <span className="text-xs text-brand-300">ID: {selectedInquiry.id}</span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Customer</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Company / Hospital</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedInquiry.company || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-brand-700 font-semibold underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Phone</span>
                  <span className="font-semibold text-slate-800">{selectedInquiry.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Product Inquired</span>
                  <span className="font-bold text-brand-700">{selectedInquiry.product_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Est. Quantity</span>
                  <span className="font-semibold text-slate-800">{selectedInquiry.quantity || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block font-semibold uppercase text-[10px] mb-1">
                  Customer Message / Specifications
                </span>
                <div className="p-4 bg-white border border-slate-200 rounded-xl text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-700 block font-bold uppercase text-[10px] mb-2">
                  Update Lead Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {['new', 'contacted', 'in_progress', 'closed'].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusUpdate(selectedInquiry.id, st, selectedInquiry.notes)}
                      disabled={updating}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
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
                  Internal Sales Notes
                </label>
                <textarea
                  rows={3}
                  defaultValue={selectedInquiry.notes || ''}
                  onBlur={e => handleStatusUpdate(selectedInquiry.id, selectedInquiry.status, e.target.value)}
                  placeholder="Add notes e.g., Sent FOB quotation via email on March 29..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none"
                ></textarea>
                <span className="text-[10px] text-slate-400">Notes save automatically on click away.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
