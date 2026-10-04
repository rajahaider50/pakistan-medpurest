'use client';

import React, { useState, useEffect } from 'react';
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
  Shield,
  Loader2,
  Users,
  Building2
} from 'lucide-react';
import PakistanLogo from '@/components/PakistanLogo';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Inquiries & Leads', href: '/admin/inquiries', icon: MessageSquare, badgeKey: 'newInquiries' },
  { name: 'Products Catalog', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Company News', href: '/admin/news', icon: Newspaper },
  { name: 'Clinical Blogs', href: '/admin/blogs', icon: BookOpen },
  { name: 'Certificates', href: '/admin/certificates', icon: Award },
  { name: 'Videos', href: '/admin/videos', icon: Video },
  { name: 'Company Profile', href: '/admin/company', icon: Building2 },
  { name: 'Admin Accounts', href: '/admin/users', icon: Users },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ id: string; email: string; name: string; role: string } | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [newInquiriesCount, setNewInquiriesCount] = useState<number>(0);

  // If on login page, render children without admin shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecking(false);
      return;
    }

    // Verify session
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) throw new Error('Unauthenticated');
        return res.json();
      })
      .then(data => {
        if (data.authenticated && data.user) {
          setAdminUser(data.user);
          // Also fetch badge stats
          fetch('/api/admin/stats')
            .then(sRes => sRes.json())
            .then(sData => {
              if (sData.stats?.newInquiries) {
                setNewInquiriesCount(sData.stats.newInquiries);
              }
            })
            .catch(() => {});
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => {
        router.push('/admin/login');
      })
      .finally(() => {
        setAuthChecking(false);
      });
  }, [pathname, isLoginPage, router]);

  // Close sidebar on path change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-brand-400" />
          <span className="text-sm font-semibold tracking-wide">Verifying Administrator Access...</span>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
    }
  };

  const userInitials = adminUser?.name
    ? adminUser.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AD';

  const NavContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Logo Header */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="block">
            <PakistanLogo variant="white" size="sm" />
          </Link>
          <div className="mt-3 flex items-center justify-between px-2.5 py-1.5 bg-brand-500/10 border border-brand-500/30 text-brand-400 rounded-lg text-[11px] font-semibold">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-brand-400" /> Master Portal
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            const hasBadge = item.badgeKey === 'newInquiries' && newInquiriesCount > 0;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-brand-700 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </div>
                {hasBadge && (
                  <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full">
                    {newInquiriesCount}
                  </span>
                )}
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
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-300 flex-col justify-between border-r border-slate-800 fixed inset-y-0 left-0 z-40">
        <NavContent />
      </aside>

      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 transition-opacity"
        />
      )}

      {/* Mobile Drawer */}
      <aside 
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 z-50 transform transition-transform duration-300 ease-in-out border-r border-slate-800 flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative">
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
          <NavContent />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-slate-900 text-sm hidden sm:inline">
              Pakistan MedPurest Management Suite
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/settings"
              className="text-right hidden xs:block hover:opacity-80 transition"
            >
              <div className="text-xs font-bold text-slate-900">{adminUser?.name || 'Administrator'}</div>
              <div className="text-[10px] text-slate-400">{adminUser?.email || 'admin@pakistanmedical.com'}</div>
            </Link>
            <Link
              href="/admin/settings"
              className="w-9 h-9 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-black text-xs flex items-center justify-center shadow transition"
              title="Admin Settings & Profile"
            >
              {userInitials}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
