'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Phone, Mail, Building, MapPin, Package } from 'lucide-react';
import PakistanLogo from './PakistanLogo';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productId?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  productName = '',
  productId = '',
}: InquiryModalProps) {
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

  useEffect(() => {
    if (productName) {
      setFormData(prev => ({
        ...prev,
        message: `Hello, we are interested in receiving a formal quotation and technical data sheet for: ${productName}.`,
      }));
    }
  }, [productName]);

  if (!isOpen) return null;

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
          product_name: productName || 'General Catalog Inquiry',
          product_id: productId || null,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit inquiry. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 p-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PakistanLogo variant="white" size="sm" />
            </div>
            <p className="text-xs text-brand-200 uppercase tracking-wider font-semibold">
              B2B Hospital & Distributor Direct Inquiry
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Inquiry Received Successfully!</h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                Thank you for contacting Pakistan Medical Supplies. Our export sales team will review your specifications and respond via email within 24 business hours.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`https://wa.me/923005561917?text=${encodeURIComponent(`Hello Pakistan Medical, I submitted an inquiry for: ${productName || 'Medical Supplies'}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm shadow transition"
                >
                  <Phone className="w-4 h-4" />
                  Chat on WhatsApp Now
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-sm transition"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {productName && (
                <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl flex items-center gap-3">
                  <Package className="w-5 h-5 text-brand-700 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-brand-800 uppercase">Selected Product</div>
                    <div className="text-sm font-bold text-slate-900">{productName}</div>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. John Smith / Mr. Ahmed"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
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
                    placeholder="procurement@hospital.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 0000000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Company / Hospital Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Central Teaching Hospital / Med Supplies Ltd"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Country / Destination Port
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. United Kingdom, UAE, Germany"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Estimated Order Quantity
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 5,000 pcs / 1x 20ft Container"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Technical Requirements / Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please specify certifications required, target delivery schedule, OEM packaging requirements..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  🔒 We protect your data. Fast response within 24h.
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-semibold rounded-lg text-sm shadow transition"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
