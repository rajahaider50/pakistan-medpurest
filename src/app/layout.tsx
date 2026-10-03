import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Surgical Gown Manufacturers, Isolation Suit Factory, Pakistan Medical Supplies',
  description: 'Professional Medical Supplies & Surgical Solutions Manufacturer - High-quality SMS Surgical Gowns, Disposable Isolation Suits, Universal Surgical Packs, and Disinfection Solutions.',
  keywords: 'Surgical Gowns, Disposable Isolation Suits, Surgical Packs, Medical Gowns for Patients, Infection Control, Pakistan Medical Supplies, MedPurest',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Pakistan Medical Supplies - Surgical Gowns & Infection Prevention Manufacturer',
    description: 'CE & ISO 13485 certified manufacturer of sterile surgical packs, SMS surgical gowns, and healthcare protective solutions.',
    siteName: 'Pakistan Medical Supplies',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-slate-800 bg-white">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
