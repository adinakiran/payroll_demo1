import React, { useState } from 'react';
import {
  FolderClosed,
  FileText,
  Download,
  UploadCloud,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  ExternalLink,
  Eye,
  FileCheck,
} from 'lucide-react';
import { CURRENT_USER } from '../../data/mockData';

export const DocumentsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tax' | 'payslips' | 'employment'>('tax');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setUploadedFiles((prev) => [fileName, ...prev]);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3500);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#4648d4] bg-indigo-50 px-2 py-0.5 rounded-md">
              SECURE COMPLIANCE VAULT
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              256-Bit Encrypted
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Documents &amp; Tax Declarations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Digitally signed tax forms, statutory filings, appointment letters, and Form 16 certificates.
          </p>
        </div>

        {/* Upload Trigger */}
        <label className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-[#4648d4] hover:bg-[#3b3dbb] rounded-xl shadow-xs cursor-pointer transition">
          <UploadCloud className="w-4 h-4" />
          <span>Upload Tax Proof</span>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleSimulateUpload}
          />
        </label>
      </div>

      {uploadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Document successfully uploaded and queued for PayPilot AI OCR verification!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('tax')}
          className={`pb-3 px-3 text-xs font-bold border-b-2 transition cursor-pointer ${
            activeTab === 'tax'
              ? 'border-[#4648d4] text-[#4648d4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Form 16 &amp; Tax Proofs
        </button>
        <button
          onClick={() => setActiveTab('payslips')}
          className={`pb-3 px-3 text-xs font-bold border-b-2 transition cursor-pointer ${
            activeTab === 'payslips'
              ? 'border-[#4648d4] text-[#4648d4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Historical Payslip PDFs
        </button>
        <button
          onClick={() => setActiveTab('employment')}
          className={`pb-3 px-3 text-xs font-bold border-b-2 transition cursor-pointer ${
            activeTab === 'employment'
              ? 'border-[#4648d4] text-[#4648d4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Contracts &amp; Letters
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'tax' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Form 16 Part A & B */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4648d4] flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Form 16 (Assessment Year 2024–25)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Financial Year 2023–24 • Digitally Signed by Principal Officer
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 rounded-md">
                  Verified by TRACES
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-slate-400 text-[10px] font-bold uppercase">Part A (TDS Deposited)</p>
                  <p className="font-semibold text-slate-800 mt-1">₹3,03,600.00</p>
                  <a
                    href="#download"
                    onClick={(e) => { e.preventDefault(); window.print(); }}
                    className="text-[#4648d4] text-[11px] font-bold mt-2 inline-flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Download className="w-3 h-3" /> Download Part A (PDF)
                  </a>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-slate-400 text-[10px] font-bold uppercase">Part B (Salary Computation)</p>
                  <p className="font-semibold text-slate-800 mt-1">Gross: ₹30,00,000.00</p>
                  <a
                    href="#download"
                    onClick={(e) => { e.preventDefault(); window.print(); }}
                    className="text-[#4648d4] text-[11px] font-bold mt-2 inline-flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Download className="w-3 h-3" /> Download Part B (PDF)
                  </a>
                </div>
              </div>
            </div>

            {/* Uploaded proofs */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Submitted Investment Proofs (FY 2024–25)
              </h3>
              <div className="space-y-2.5">
                {uploadedFiles.map((fname, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-indigo-100 bg-indigo-50/40">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#4648d4]" />
                      <span className="text-xs font-semibold text-slate-800">{fname}</span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                      In AI Queue
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">HRA_Rent_Receipts_Q1_Q2.pdf</p>
                      <p className="text-[10px] text-slate-400">Uploaded 12 Jul 2024 • 1.4 MB</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">PPF_Deposit_Receipt_SBI.pdf</p>
                      <p className="text-[10px] text-slate-400">Uploaded 04 Apr 2024 • 840 KB</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI OCR Auditor info */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#4648d4] to-indigo-700 text-white p-5 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-indigo-200" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-100">
                  Autonomous Tax OCR
                </h4>
              </div>
              <p className="text-xs text-indigo-100 leading-relaxed">
                PayPilot automatically extracts Landlord PAN, premium policy numbers, and ELSS units to ensure zero TDS discrepancy during year-end reconciliation.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 mb-2">Important Dates</h4>
              <ul className="text-xs space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Dec 15, 2024:</strong> Preliminary Tax proof submission deadline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Jan 31, 2025:</strong> Final hard deadline for 80C/80D declarations.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payslips' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            All Generated Payslips (2024)
          </h3>
          <div className="divide-y divide-slate-100">
            {[
              { month: 'October 2024', ref: 'PP-2024-10-994', net: '₹1,94,500.00', date: 'Oct 31, 2024' },
              { month: 'September 2024', ref: 'PP-2024-09-881', net: '₹1,96,000.00', date: 'Sep 30, 2024' },
              { month: 'August 2024', ref: 'PP-2024-08-765', net: '₹1,96,000.00', date: 'Aug 30, 2024' },
              { month: 'July 2024', ref: 'PP-2024-07-640', net: '₹1,96,000.00', date: 'Jul 31, 2024' },
              { month: 'June 2024', ref: 'PP-2024-06-532', net: '₹1,96,000.00', date: 'Jun 28, 2024' },
            ].map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">{item.month}</p>
                  <p className="text-[11px] text-slate-400">Ref: {item.ref} • Disbursed {item.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-900">{item.net}</span>
                  <button
                    onClick={() => window.print()}
                    className="p-1.5 text-slate-500 hover:text-[#4648d4] hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'employment' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Employment Contracts &amp; Verification Letters
          </h3>
          <div className="space-y-3">
            {[
              { title: 'Employment Agreement & Terms', date: 'Jun 15, 2022', size: '2.4 MB' },
              { title: 'Promotion & Band L5 Revision Letter', date: 'Apr 01, 2024', size: '420 KB' },
              { title: 'Bonafide Employment Certificate (For Visa/Loans)', date: 'Auto-Generable', size: 'PDF' },
              { title: 'EPFO Form 11 (Declaration Form)', date: 'Jun 20, 2022', size: '310 KB' },
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{doc.title}</p>
                    <p className="text-[11px] text-slate-400">Issued: {doc.date} • {doc.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-semibold text-[#4648d4] hover:bg-indigo-50 rounded-lg transition flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
