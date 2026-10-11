import React, { useState } from 'react';
import {
  ShieldCheck,
  HeartPulse,
  Landmark,
  Coffee,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Download,
  Users,
  Award,
  AlertCircle,
  FileText,
  DollarSign,
  PlusCircle,
} from 'lucide-react';
import { CURRENT_USER } from '../../data/mockData';

export const BenefitsScreen: React.FC = () => {
  const [vpfPercentage, setVpfPercentage] = useState<number>(0);
  const [showVpfSuccess, setShowVpfSuccess] = useState(false);

  const handleUpdateVpf = () => {
    setShowVpfSuccess(true);
    setTimeout(() => setShowVpfSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#4648d4] bg-indigo-50 px-2 py-0.5 rounded-md">
              COMPREHENSIVE WELLBEING &amp; EQUITY
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              All Policies Active
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Benefits &amp; Insurance Portfolio
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Employer-sponsored health, retirement, and flexible compensation components for {CURRENT_USER.name} ({CURRENT_USER.empId}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Download Summary
          </button>
          <a
            href="https://www.starhealth.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#4648d4] rounded-xl hover:bg-[#3b3dbb] shadow-xs cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            MediBuddy / TPA Portal
          </a>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Group Health Cover
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">₹10,00,000</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Star Health Floater (Self + Spouse + 2 Children)
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Term Life Insurance
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">₹90,00,000</div>
          <p className="text-[11px] text-slate-500 mt-1">
            3x Annual Base CTC (HDFC Life)
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Provident Fund Total
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">₹4,82,400</div>
          <p className="text-[11px] text-slate-500 mt-1">
            EPFO UAN: {CURRENT_USER.uan} (Interest 8.25% p.a.)
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Monthly Per-Diem / Food
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Coffee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">₹3,000/mo</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Pluxee / Sodexo Food Card (Tax Exempt)
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Health Insurance Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Group Medical Insurance (GMC)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Policy No: <span className="font-mono text-slate-700">SH-GMC-2024-88912</span> • Valid through Mar 31, 2025
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-lg">
                Active Cover
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5 py-4 bg-slate-50/60 rounded-xl px-4 border border-slate-100">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Cover Type</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">Family Floater (1+3)</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Maternity Benefit</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">₹75,000 (Day 1 Cover)</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Room Rent Limit</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">Single Private AC Room</p>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Covered Dependents
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#4648d4] flex items-center justify-center font-bold text-xs">
                    KS
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Kiran Sharma (Self)</p>
                    <p className="text-[11px] text-slate-400">DOB: 12 Aug 1993 • Female</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Primary
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                    AS
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Aditya Sharma (Spouse)</p>
                    <p className="text-[11px] text-slate-400">DOB: 04 Nov 1991 • Male</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Spouse
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Need cashless hospital network or claim assistance?
              </span>
              <button className="text-xs font-bold text-[#4648d4] hover:underline flex items-center gap-1 cursor-pointer">
                <span>View 12,400+ Network Hospitals</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Provident Fund & Voluntary Top-up */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#4648d4] flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Voluntary Provident Fund (VPF)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Earn sovereign-backed 8.25% interest completely tax-exempt under Sec 80C.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                Current VPF: {vpfPercentage}%
              </span>
            </div>

            <div className="my-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Choose Voluntary Deduction (% of Basic):</span>
                  <span className="font-bold text-[#4648d4]">{vpfPercentage}% (₹{(CURRENT_USER.ctcAnnual * 0.4 / 12 * (vpfPercentage / 100)).toLocaleString('en-IN')}/mo)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={vpfPercentage}
                  onChange={(e) => setVpfPercentage(Number(e.target.value))}
                  className="w-full accent-[#4648d4] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0% (Standard 12% EPF only)</span>
                  <span>5%</span>
                  <span>10%</span>
                  <span>15%</span>
                  <span>20% (Max allowed)</span>
                </div>
              </div>

              {showVpfSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>VPF adjustment request recorded! Changes will reflect from November 2024 payroll.</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleUpdateVpf}
                  className="px-4 py-2 bg-[#4648d4] text-white text-xs font-bold rounded-xl hover:bg-[#3b3dbb] transition cursor-pointer"
                >
                  Confirm VPF Contribution
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          {/* Wellness Perks Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#4648d4]" />
              Lifestyle &amp; Wellness Perks
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">Cult.fit / Gym Allowance</span>
                  <span className="text-[11px] font-semibold text-emerald-600">Claimed (₹1,500)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Monthly reimbursement against fitness center subscription.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">Home Broadband Fiber</span>
                  <span className="text-[11px] font-semibold text-emerald-600">Active (₹1,000)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Direct bill reimbursement for high-speed fiber internet.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">Learning &amp; Upskilling</span>
                  <span className="text-[11px] font-semibold text-[#4648d4]">₹25,000 Left</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Annual budget for books, certifications, and conferences.
                </p>
              </div>
            </div>

            <button className="w-full mt-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-1 cursor-pointer">
              <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Submit New Wellness Claim</span>
            </button>
          </div>

          {/* AI Benefit Advisory */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50/60 rounded-2xl border border-indigo-100 p-5">
            <div className="flex items-center gap-2 mb-2 text-[#4648d4]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                AI Optimization Tip
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              You are currently utilizing ₹1.2L of your ₹1.5L 80C limit. Allocating a 5% VPF deduction would fully cap your 80C deductions without any equity lock-in.
            </p>
            <button
              onClick={() => setVpfPercentage(5)}
              className="mt-3 text-xs font-bold text-[#4648d4] hover:underline cursor-pointer"
            >
              Set VPF to 5% automatically →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
