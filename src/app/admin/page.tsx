'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Package, 
  FolderTree, 
  MessageSquare, 
  Newspaper, 
  Award, 
  Video,
  BookOpen,
  Plus, 
  ArrowRight, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Database,
  ExternalLink,
  Phone,
  Mail,
  RefreshCw,
  Loader2
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    inquiries: 0,
    newInquiries: 0,
    news: 0,
    blogs: 0,
    certificates: 0,
    videos: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        if (data.stats) setStats(data.stats);
        if (data.recentInquiries) setRecentInquiries(data.recentInquiries);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Platform Overview</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Database className="w-3 h-3 text-emerald-600" /> Supabase Live
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status of catalog products, incoming hospital leads, and published clinical assets.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-brand-700' : ''}`} />
          </button>
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
            <MessageSquare className="w-4 h-4" /> View Inquiries
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        <Link 
          href="/admin/products"
          className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-brand-300 transition group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Products</span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center group-hover:scale-110 transition">
              <Package className="w-4 h-4 text-brand-700" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{loading ? '...' : stats.products}</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> In catalog
          </div>
        </Link>

        <Link 
          href="/admin/categories"
          className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-sky-300 transition group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Categories</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center group-hover:scale-110 transition">
              <FolderTree className="w-4 h-4 text-sky-600" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{loading ? '...' : stats.categories}</div>
          <div className="text-[11px] text-slate-500 font-medium">Primary &amp; subcategories</div>
        </Link>

        <Link 
          href="/admin/inquiries"
          className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-amber-300 transition group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">New Leads</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center group-hover:scale-110 transition">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600">{loading ? '...' : stats.newInquiries}</div>
          <div className="text-[11px] text-amber-700 font-semibold">
            {stats.inquiries} total received
          </div>
        </Link>

        <Link 
          href="/admin/certificates"
          className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Certificates</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition">
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{loading ? '...' : stats.certificates}</div>
          <div className="text-[11px] text-slate-500 font-medium">ISO, CE, FDA active</div>
        </Link>
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link 
          href="/admin/news"
          className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Newspaper className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Company News</div>
              <div className="text-[11px] text-slate-400">{stats.news} Published Articles</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link 
          href="/admin/blogs"
          className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Clinical Guides</div>
              <div className="text-[11px] text-slate-400">{stats.blogs} Technical Guides</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link 
          href="/admin/videos"
          className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Video Gallery</div>
              <div className="text-[11px] text-slate-400">{stats.videos} Factory &amp; Lab Clips</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Customer Inquiries &amp; Quotation Requests</h3>
            <p className="text-xs text-slate-500">Live incoming B2B inquiries from hospital procurement officers</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-bold text-brand-700 hover:text-brand-800 hover:underline flex items-center gap-1"
          >
            All Inquiries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Customer Name</th>
                <th className="px-6 py-3.5">Contact Details</th>
                <th className="px-6 py-3.5">Product Inquired</th>
                <th className="px-6 py-3.5">Destination</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto text-brand-700 mb-2" />
                    Loading recent inquiries...
                  </td>
                </tr>
              ) : recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                    No customer inquiries received yet. Incoming requests from website forms will appear here in real-time.
                  </td>
                </tr>
              ) : (
                recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {inq.name}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {inq.company || 'Direct Buyer'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{inq.email}</span>
                      </div>
                      {inq.phone && (
                        <div className="flex items-center gap-1 text-slate-400 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>{inq.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium max-w-xs">
                      {inq.product_name || 'General Product Catalog'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {inq.country || 'International'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border ${
                        inq.status === 'new'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : inq.status === 'contacted'
                          ? 'bg-sky-50 text-sky-700 border-sky-200'
                          : inq.status === 'in_progress'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {inq.status || 'new'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href="/admin/inquiries"
                        className="px-3 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-semibold rounded-lg text-[11px] transition inline-flex items-center gap-1"
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
