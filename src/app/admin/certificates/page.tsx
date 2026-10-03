'use client';

import React, { useState } from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';

const INITIAL_CERTS = [
  { id: 'c1', title: 'ISO 13485:2016 Medical Devices QMS', cert_number: 'MDQ-981240-PK', issuer: 'TÜV Rheinland / BSI', expiry: '2028-01-14' },
  { id: 'c2', title: 'CE Mark Certificate MDR (EU) 2017/745', cert_number: 'CE-MDR-2023-889', issuer: 'Notified Body 0123', expiry: '2028-04-09' },
  { id: 'c3', title: 'FDA Device Establishment Registration 510(k)', cert_number: 'FDA-REG-3017849', issuer: 'US FDA', expiry: '2027-12-31' },
  { id: 'c4', title: 'EN 13795 Surgical Drapes & Gowns Compliance', cert_number: 'EN-13795-ST-441', issuer: 'SGS Medical Testing', expiry: '2027-02-17' },
  { id: 'c5', title: 'ISO 9001:2015 International QMS', cert_number: 'QMS-PK-77402', issuer: 'Lloyds Register QA', expiry: '2026-08-11' },
];

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState(INITIAL_CERTS);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Regulatory Certifications</h1>
          <p className="text-xs text-slate-500 mt-1">Manage ISO, CE, FDA, and testing accreditation documents.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-6 py-3.5">Certificate Name</th>
              <th className="px-6 py-3.5">Registration #</th>
              <th className="px-6 py-3.5">Notified Body / Issuer</th>
              <th className="px-6 py-3.5">Expiry Date</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {certs.map(c => (
              <tr key={c.id} className="hover:bg-slate-50/80">
                <td className="px-6 py-4 font-bold text-slate-900 max-w-sm">{c.title}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{c.cert_number}</td>
                <td className="px-6 py-4 text-slate-600">{c.issuer}</td>
                <td className="px-6 py-4 font-mono text-emerald-600 font-semibold">{c.expiry}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setCerts(certs.filter(item => item.id !== c.id))}
                    className="p-1 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
