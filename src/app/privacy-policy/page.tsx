import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs text-brand-300 font-semibold mb-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">Privacy Policy &amp; Data Protection</h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl">
            Regulatory compliance, GDPR adherence, and commercial confidentiality guidelines.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12">
        <div className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-sm text-slate-600 leading-relaxed">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> B2B Commercial Data Confidentiality
          </div>

          <h2 className="text-xl font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            Pakistan MedPurest Medical Technology Co., Ltd. (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates as a business-to-business manufacturer. When you submit inquiries, request quotations, or contact our customer support, we collect business contact details such as name, official work email, company or hospital affiliation, destination port, and procurement requirements.
          </p>

          <h2 className="text-xl font-bold text-slate-900">2. How We Use Collected Data</h2>
          <p>
            All submitted commercial inquiries are utilized strictly for preparing formal technical dossiers, price quotations, sample dispatches, and logistical communications. We never sell or license customer information to third parties.
          </p>

          <h2 className="text-xl font-bold text-slate-900">3. Regulatory &amp; Export Compliance</h2>
          <p>
            In accordance with international trade laws, ISO 13485 quality systems, and medical device tracing standards, export transactions and product batch numbers are securely archived to assure post-market clinical traceability.
          </p>

          <h2 className="text-xl font-bold text-slate-900">4. Contacting Data Officer</h2>
          <p>
            For inquiries regarding data storage or requests to expunge records, contact: <a href="mailto:info@pakistanmedical.com" className="text-brand-700 font-semibold underline">info@pakistanmedical.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
