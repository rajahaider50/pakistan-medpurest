'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, Shield } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    site_name: 'Pakistan Medical Supplies',
    company_legal_name: 'Pakistan MedPurest Healthcare Technologies Ltd.',
    contact_email: 'info@pakistanmedical.com',
    contact_phone: '+92 51 289 1917',
    contact_whatsapp: '+92 300 556 1917',
    contact_address: 'Medical & Surgical Technology Industrial Zone, Sialkot / Islamabad, Pakistan',
    cleanroom_area: '60,000+ m²',
    purification_grade: 'Class 100,000 Standard',
    countries_exported: '85+ Countries',
    years_experience: '25+ Years',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Platform Settings &amp; Identity</h1>
          <p className="text-xs text-slate-500 mt-1">Configure company details, contact information, and factory capacity.</p>
        </div>
        {saved && (
          <div className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-lg flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> Settings Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Brand &amp; Legal Identity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Website / Brand Name
              </label>
              <input
                type="text"
                value={settings.site_name}
                onChange={e => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Official Corporate Entity Name
              </label>
              <input
                type="text"
                value={settings.company_legal_name}
                onChange={e => setSettings({ ...settings, company_legal_name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Contact &amp; Logistical Points
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={e => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Telephone
              </label>
              <input
                type="text"
                value={settings.contact_phone}
                onChange={e => setSettings({ ...settings, contact_phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                WhatsApp Business
              </label>
              <input
                type="text"
                value={settings.contact_whatsapp}
                onChange={e => setSettings({ ...settings, contact_whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Factory &amp; Headquarters Address
            </label>
            <input
              type="text"
              value={settings.contact_address}
              onChange={e => setSettings({ ...settings, contact_address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
            />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Manufacturing Cleanroom Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Cleanroom Area
              </label>
              <input
                type="text"
                value={settings.cleanroom_area}
                onChange={e => setSettings({ ...settings, cleanroom_area: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Purification Standard
              </label>
              <input
                type="text"
                value={settings.purification_grade}
                onChange={e => setSettings({ ...settings, purification_grade: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Export Destinations
              </label>
              <input
                type="text"
                value={settings.countries_exported}
                onChange={e => setSettings({ ...settings, countries_exported: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Manufacturing Heritage
              </label>
              <input
                type="text"
                value={settings.years_experience}
                onChange={e => setSettings({ ...settings, years_experience: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2 transition"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
