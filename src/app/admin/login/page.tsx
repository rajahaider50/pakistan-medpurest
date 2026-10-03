'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PakistanLogo from '@/components/PakistanLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@pakistanmedical.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-200">
        <div className="text-center mb-8">
          <PakistanLogo variant="dark" size="md" className="justify-center mb-4" />
          <h1 className="text-2xl font-black text-slate-900">Admin Control Center</h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to manage products, categories, leads &amp; CMS content
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@pakistanmedical.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Quick Credential Hint */}
          <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-[11px] text-brand-900">
            <strong>Default Access:</strong> <br />
            Email: <code className="bg-white px-1 py-0.5 rounded">admin@pakistanmedical.com</code><br />
            Password: <code className="bg-white px-1 py-0.5 rounded">admin123</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-lg transition flex items-center justify-center gap-2 transform active:scale-95"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-xs text-slate-500">
        <Link href="/" className="hover:text-white transition">
          ← Return to Public Website
        </Link>
      </div>
    </div>
  );
}
