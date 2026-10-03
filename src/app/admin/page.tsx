'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Package, 
  FolderTree, 
  MessageSquare, 
  Newspaper, 
  Award, 
  Plus, 
  ArrowRight, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 6,
    categories: 14,
    inquiries: 3,
    newInquiries: 3,
    news: 3,
    certificates: 5,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data.stats) setStats(data.stats);
        if (data.recentInquiries) setRecentInquiries(data.recentInquiries);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Platform Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status of products, customer inquiries, and published clinical content.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs shadow flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
          <Link
            href="/admin/inquiries"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" /> View Leads
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
            <Package className="w-5 h-5 text-brand-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.products}</div>
          <div className="text-[11px] text-emerald-600 font-semibold">Active in catalogue</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Categories</span>
            <FolderTree className="w-5 h-5 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.categories}</div>
          <div className="text-[11px] text-slate-500">4 primary, 10 subcategories</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">New Inquiries</span>
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600">{stats.newInquiries}</div>
          <div className="text-[11px] text-amber-700 font-semibold">Require sales follow-up</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Certificates</span>
            <Award className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.certificates}</div>
          <div className="text-[11px] text-slate-500">ISO 13485, CE MDR, FDA active</div>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Customer Inquiries &amp; Leads</h3>
            <p className="text-xs text-slate-500">Incoming B2B quotations and hospital purchase inquiries</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1"
          >
            All Inquiries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Customer Name</th>
                <th className="px-6 py-3.5">Email &amp; Phone</th>
                <th className="px-6 py-3.5">Product Inquired</th>
                <th className="px-6 py-3.5">Destination</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No recent inquiries recorded. Incoming requests from public forms will show here.
                  </td>
                </tr>
              ) : (
                recentInquiries.map((inq, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {inq.name}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {inq.company || 'Direct Buyer'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div>{inq.email}</div>
                      <div className="text-slate-400">{inq.phone || 'No phone'}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {inq.product_name || 'General Inquiry'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {inq.country || 'International'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-bold text-[10px] uppercase">
                        {inq.status || 'New'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href="/admin/inquiries"
                        className="px-3 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-semibold rounded-lg text-[11px] transition"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
