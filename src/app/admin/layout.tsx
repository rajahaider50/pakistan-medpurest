'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  MessageSquare, 
  Newspaper, 
  BookOpen, 
  Award, 
  Video, 
  Settings, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  Shield
} from 'lucide-react';
import PakistanLogo from '@/components/PakistanLogo';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Inquiries & Leads', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'Products Catalog', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Company News', href: '/admin/news', icon: Newspaper },
  { name: 'Clinical Blogs', href: '/admin/blogs', icon: BookOpen },
  { name: 'Certificates', href: '/admin/certificates', icon: Award },
  { name: 'Videos', href: '/admin/videos', icon: Video },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render children without admin shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-300 flex-col justify-between border-r border-slate-800">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-slate-800">
            <Link href="/admin">
              <PakistanLogo variant="white" size="sm" />
            </Link>
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 bg-brand-500/10 border border-brand-500/30 text-brand-400 rounded-md text-[11px] font-semibold">
              <Shield className="w-3 h-3" /> Master Admin Portal
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-brand-700 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-slate-800 text-sm hidden sm:inline">
              Pakistan MedPurest Management Suite
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-900">Administrator</div>
              <div className="text-[10px] text-slate-400">admin@pakistanmedical.com</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-brand-700 text-white font-bold text-xs flex items-center justify-center">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
