'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  MessageSquare 
} from 'lucide-react';
import PakistanLogo from '@/components/PakistanLogo';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    quantity: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          product_name: 'General Contact Inquiry',
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Contact Us &amp; Global Procurement</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            Reach out to our export sales team for formal price quotations, samples, regulatory dossiers, or factory visits.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Direct Contact Details</h2>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 bg-brand-50 text-brand-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Factory Complex &amp; Global HQ</span>
                    <span className="leading-relaxed text-slate-500">
                      Medical &amp; Surgical Technology Industrial Zone, Sialkot / Islamabad, Pakistan
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">WhatsApp Direct / 24-7</span>
                    <a href="https://wa.me/923005561917" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">
                      +92 300 556 1917
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-sky-50 text-sky-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Official Email</span>
                    <a href="mailto:info@pakistanmedical.com" className="text-brand-700 font-bold hover:underline">
                      info@pakistanmedical.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Operating Hours</span>
                    <span className="text-slate-500">Mon - Sat: 8:30 AM - 6:00 PM (PKT / UTC+5)</span>
                  </div>
                </div>
              </div>

              {/* Fast WhatsApp Box */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Need Rapid Quotations?
                </span>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Connect instantly with our bilingual sales team on WhatsApp for technical specs and FOB/CIF prices.
                </p>
                <a
                  href="https://wa.me/923005561917"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition shadow"
                >
                  Start WhatsApp Chat
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                Send Business &amp; Tender Inquiry
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill in your product requirements below. Our commercial sales director will reach out within 24 business hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Inquiry Submitted Successfully!</h3>
                  <p className="text-slate-600 text-xs max-w-md mx-auto leading-relaxed">
                    Thank you. We have recorded your procurement inquiry. A copy has been dispatched to our export sales desk.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        country: '',
                        quantity: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-lg text-xs transition shadow"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. John Doe"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="purchasing@hospital.org"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        WhatsApp / Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 0000000"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Hospital / Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Apex Medical Group"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Country / Port of Destination
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. United Kingdom, UAE"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                        Estimated Order Volume
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="e.g. 10,000 sets / 40HQ container"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Specifications &amp; Inquiry Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify target product models, required sterilization certifications (EO / Gamma), custom packaging instructions..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition shadow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Submitting Inquiry...' : 'Submit Commercial Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
