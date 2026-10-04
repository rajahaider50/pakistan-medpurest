'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  CheckCircle2, 
  Shield, 
  Lock, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Share2, 
  Activity, 
  Loader2,
  RefreshCw,
  AlertCircle,
  Key
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'brand' | 'contact' | 'manufacturing' | 'social' | 'security'>('brand');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Settings Dictionary State
  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: 'Pakistan Medical Supplies',
    site_tagline: 'Professional Infection Prevention & Surgical Solutions Manufacturer',
    company_legal_name: 'Pakistan MedPurest Healthcare Technologies Ltd.',
    contact_email: 'info@pakistanmedical.com',
    contact_phone: '+92 51 289 1917',
    contact_whatsapp: '+92 300 556 1917',
    contact_address: 'Medical & Surgical Technology Industrial Zone, Sialkot / Islamabad, Pakistan',
    operating_hours: 'Monday - Saturday: 8:30 AM - 6:00 PM (PKT / UTC+5)',
    cleanroom_area: '60,000+ m²',
    purification_grade: 'Class 100,000 Standard',
    countries_exported: '85+ Countries',
    years_experience: '25+ Years',
    facebook_url: 'https://facebook.com/pakistanmedical',
    linkedin_url: 'https://linkedin.com/company/pakistanmedical',
    youtube_url: 'https://youtube.com/@pakistanmedical',
    twitter_url: 'https://twitter.com/pakistanmedical',
  });

  // Admin Profile & Security State
  const [profile, setProfile] = useState({
    full_name: 'Master Administrator',
    email: 'admin@pakistanmedical.com',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const [settingsRes, profileRes] = await Promise.all([
        fetch('/api/admin/settings'),
        fetch('/api/admin/profile'),
      ]);

      if (settingsRes.ok) {
        const data = await settingsRes.json();
        if (data.settings) {
          setSettings(prev => ({ ...prev, ...data.settings }));
        }
      }

      if (profileRes.ok) {
        const pData = await profileRes.json();
        if (pData.admin) {
          setProfile({
            full_name: pData.admin.full_name || 'Master Administrator',
            email: pData.admin.email || 'admin@pakistanmedical.com',
          });
        }
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load configuration from database.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update settings');

      setMessage({ type: 'success', text: 'System configuration saved to database successfully.' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error saving settings' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      alert('Please enter your current password');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    setPasswordSaving(true);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: profile.full_name,
          email: profile.email,
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');

      setMessage({ type: 'success', text: 'Admin security credentials updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setMessage(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Error updating password');
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Platform Settings &amp; Security</h1>
          <p className="text-xs text-slate-500 mt-1">Configure company identity, contact channels, cleanroom specifications, and admin access.</p>
        </div>

        <button
          onClick={fetchSettings}
          className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 transition self-start sm:self-auto"
          title="Refresh Settings"
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

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto text-xs font-bold">
        {[
          { id: 'brand', label: 'Brand & Legal', icon: Building },
          { id: 'contact', label: 'Contact & HQ', icon: Mail },
          { id: 'manufacturing', label: 'Cleanroom Specs', icon: Activity },
          { id: 'social', label: 'Social & Media', icon: Share2 },
          { id: 'security', label: 'Admin Security', icon: Shield },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold whitespace-nowrap transition ${
                isActive
                  ? 'border-brand-700 text-brand-700 bg-white rounded-t-xl'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Brand & Legal */}
      {activeTab === 'brand' && (
        <form onSubmit={handleSettingsSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
            Brand Identity &amp; Corporate Entity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Website / Brand Name
              </label>
              <input
                type="text"
                value={settings.site_name || ''}
                onChange={e => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Corporate Entity Name
              </label>
              <input
                type="text"
                value={settings.company_legal_name || ''}
                onChange={e => setSettings({ ...settings, company_legal_name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Company Brand Tagline
              </label>
              <input
                type="text"
                value={settings.site_tagline || ''}
                onChange={e => setSettings({ ...settings, site_tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Standard Operating Hours
              </label>
              <input
                type="text"
                value={settings.operating_hours || ''}
                onChange={e => setSettings({ ...settings, operating_hours: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2 transition"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Brand Settings
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Contact & HQ */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSettingsSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
            Contact Points &amp; Factory Coordinates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Inquiries Email
              </label>
              <input
                type="email"
                value={settings.contact_email || ''}
                onChange={e => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Telephone Number
              </label>
              <input
                type="text"
                value={settings.contact_phone || ''}
                onChange={e => setSettings({ ...settings, contact_phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                value={settings.contact_whatsapp || ''}
                onChange={e => setSettings({ ...settings, contact_whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Factory &amp; Headquarters Address
              </label>
              <textarea
                rows={2}
                value={settings.contact_address || ''}
                onChange={e => setSettings({ ...settings, contact_address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2 transition"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Contact Points
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Manufacturing */}
      {activeTab === 'manufacturing' && (
        <form onSubmit={handleSettingsSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
            Manufacturing &amp; Cleanroom Capability Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Cleanroom Area
              </label>
              <input
                type="text"
                value={settings.cleanroom_area || ''}
                onChange={e => setSettings({ ...settings, cleanroom_area: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Purification Standard
              </label>
              <input
                type="text"
                value={settings.purification_grade || ''}
                onChange={e => setSettings({ ...settings, purification_grade: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Export Destinations
              </label>
              <input
                type="text"
                value={settings.countries_exported || ''}
                onChange={e => setSettings({ ...settings, countries_exported: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Heritage Years
              </label>
              <input
                type="text"
                value={settings.years_experience || ''}
                onChange={e => setSettings({ ...settings, years_experience: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2 transition"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Statistics
            </button>
          </div>
        </form>
      )}

      {/* Tab 4: Social */}
      {activeTab === 'social' && (
        <form onSubmit={handleSettingsSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
            Social Media &amp; Web Portals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={settings.linkedin_url || ''}
                onChange={e => setSettings({ ...settings, linkedin_url: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={settings.youtube_url || ''}
                onChange={e => setSettings({ ...settings, youtube_url: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={settings.facebook_url || ''}
                onChange={e => setSettings({ ...settings, facebook_url: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={settings.twitter_url || ''}
                onChange={e => setSettings({ ...settings, twitter_url: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2 transition"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Social Links
            </button>
          </div>
        </form>
      )}

      {/* Tab 5: Security */}
      {activeTab === 'security' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-700" />
              Administrator Credentials &amp; Password
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Change master admin account password stored securely in database.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Full Name
              </label>
              <input
                type="text"
                value={profile.full_name}
                onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Email (Login Username)
              </label>
              <input
                type="email"
                disabled
                value={profile.email}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-500 cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400">Master account identifier is fixed.</span>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Current Password *
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Enter current password (default: admin123)"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                New Password *
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={passwordSaving}
                className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow flex items-center gap-2 transition"
              >
                {passwordSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
