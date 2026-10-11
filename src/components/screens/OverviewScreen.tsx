import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Ticket,
  ChevronRight,
  TrendingDown,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  LifeBuoy,
  ShieldCheck,
  Send,
  Eye,
  ExternalLink,
  Filter,
  UploadCloud,
} from 'lucide-react';
import { CURRENT_USER, AUDIT_LOG_EVENTS } from '../../data/mockData';
import { ScreenType } from '../../types/payroll';

interface OverviewScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onRequestTimeOff: () => void;
  onRaiseIssue: () => void;
  onOpenUploadPayslip?: () => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  onNavigate,
  onRequestTimeOff,
  onRaiseIssue,
  onOpenUploadPayslip,
}) => {
  const [insightAcknowledged, setInsightAcknowledged] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4648d4] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4648d4]"></span>
              Compensation &amp; Operations Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Good morning, Kiran 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Here's your employee and payroll overview for October 2024.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800 self-start sm:self-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>AI Pulse:</span>
          <span className="text-emerald-700 font-medium">Live sync active • Payroll integrity 99.8%</span>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Net Disbursed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              NET DISBURSED
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 flex items-center gap-1 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Paid Oct 31
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ₹1,84,500
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-semibold text-[11px]">
              <TrendingDown className="w-3 h-3 text-rose-600" />
              -₹1,500 vs Sep (₹1.86k)
            </span>
          </div>
        </div>

        {/* 2. Upcoming Payday */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              UPCOMING PAYDAY
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
              In 24 days
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Nov 30, 2024
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Regular Cycle • HDFC Bank •••• 4102</span>
          </div>
        </div>

        {/* 3. Available Time-Off */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              AVAILABLE TIME-OFF
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/60">
              74% Left
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              18.5
            </span>
            <span className="text-xs font-semibold text-slate-500">Days</span>
          </div>
          {/* Stacked bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 my-2 overflow-hidden flex">
            <div className="bg-[#4648d4] h-full" style={{ width: '60%' }} title="12 Annual"></div>
            <div className="bg-teal-500 h-full" style={{ width: '25%' }} title="4.5 Sick"></div>
            <div className="bg-amber-400 h-full" style={{ width: '15%' }} title="2 Casual"></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>12 Annual</span>
            <span>4.5 Sick</span>
            <span>2 Casual</span>
          </div>
          <button
            onClick={onRequestTimeOff}
            className="mt-2.5 w-full py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#4648d4] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Request Time Off</span>
          </button>
        </div>

        {/* 4. Autonomous Care */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              AUTONOMOUS CARE
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-[#4648d4] flex items-center gap-1 border border-indigo-200/60">
              <Sparkles className="w-2.5 h-2.5 text-[#4648d4] animate-spin" />
              AI Investigating
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            1 Active Ticket
          </div>
          <p className="text-xs text-slate-500 truncate mt-1">
            #PAY-10293: Salary Discrepancy...
          </p>
          <div className="mt-2.5 flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-[11px] text-slate-400">Updated 14 mins ago</span>
            <button
              onClick={() => onNavigate('support-tickets')}
              className="text-[#4648d4] font-bold text-xs flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              View Log
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero AI Payroll Insight + Campus Hub Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Payroll Insight */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/40 rounded-3xl p-6 sm:p-7 border border-indigo-100/90 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4648d4]/10 text-[#4648d4] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#4648d4]" />
                <span>AI Payroll Insight</span>
                <span className="text-slate-400 font-normal">• Computed automatically on payout clearance</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Your net pay decreased by{' '}
                <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg">₹1,500</span> compared with last month.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Identified <strong className="text-slate-900">1 day unpaid leave deduction (-₹1,000)</strong> logged on Oct 14 and a{' '}
                <strong className="text-slate-900">mid-quarter tax regime adjustment (-₹500)</strong> recalculated under revised Section 87A slabs.
              </p>
            </div>

            {/* 2 Breakdown Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Unpaid Leave (1 Day)</p>
                    <p className="text-[11px] text-slate-400">Oct 14 LOP deduction</p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-rose-600">-₹1,000</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Tax Surcharge Delta</p>
                    <p className="text-[11px] text-slate-400">Sec 87A quarterly align</p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-rose-600">-₹500</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('ai-assistant')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4648d4] to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#4648d4]/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Understand Why (Launch Investigator)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenUploadPayslip && (
                <button
                  onClick={onOpenUploadPayslip}
                  className="px-4 py-2.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50/50 text-[#4648d4] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <UploadCloud className="w-4 h-4 text-[#4648d4]" />
                  <span>Upload &amp; Investigate Payslip</span>
                </button>
              )}

              <button
                onClick={() => setInsightAcknowledged(true)}
                className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  insightAcknowledged
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {insightAcknowledged ? '✓ Acknowledged' : 'Acknowledge'}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified against HRMS attendance log #9921</span>
            </p>
          </div>
        </div>

        {/* Right 1 Col: Campus Hub & Holiday card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="relative h-40 w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80"
              alt="Campus Hub"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                OFFICE CAMPUS HUB
              </p>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Bengaluru Tech Park • Wing B
              </h3>
            </div>
          </div>

          <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">Upcoming Public Holiday</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700">
                  In 3 Days
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diwali Festival holidays commence on <strong className="text-slate-900">Nov 01 – Nov 03</strong>. Normal payroll shifts remain unimpacted.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">14 Days Off Remaining 2024</span>
              <button
                onClick={() => onNavigate('leave-attendance')}
                className="text-[#4648d4] font-bold hover:underline cursor-pointer"
              >
                View Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Operational Actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Quick Operational Actions
          </h3>
          <span className="text-[11px] text-slate-400">Frequently accessed automated utilities</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => onNavigate('payslip-detail')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-200 hover:shadow-sm text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#4648d4] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-900">View Payslip</p>
            <p className="text-[11px] text-slate-400 mt-0.5">PDF &amp; Breakdown</p>
          </button>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-200 hover:shadow-sm text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-900">Ask AI Assistant</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Instant Answers</p>
          </button>

          <button
            onClick={onRequestTimeOff}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200 hover:shadow-sm text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-900">Request Leave</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Apply PTO / Sick</p>
          </button>

          <button
            onClick={onRaiseIssue}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-200 hover:shadow-sm text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <LifeBuoy className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-900">Raise Issue</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Direct Escalation</p>
          </button>

          <button
            onClick={() => onNavigate('documents')}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-200 hover:shadow-sm text-left transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-900">Tax Documents</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Form 16 &amp; Proofs</p>
          </button>
        </div>
      </div>

      {/* Compliance Monitor & Immutable Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Monitor */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                COMPLIANCE MONITOR
              </span>
              <h3 className="text-sm font-bold text-slate-900">Payroll Health &amp; Integrity</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Healthy &amp; Verified
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Last Payroll Cleared
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  October 31, 2024 at 09:30 AM IST
                </p>
                <p className="text-[10px] text-amber-600 font-medium mt-1">
                  • 1 expected anomaly flagged and explained by AI
                </p>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Autonomous Engine</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Tax Deductions (TDS)</p>
                  <p className="text-[10px] text-slate-400">Accurate to ₹0.00 discrepancy</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                100% Synced
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">EPF &amp; Pension Ledger</p>
                  <p className="text-[10px] text-slate-400">UAN: {CURRENT_USER.uan} confirmed</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                Deposited
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Group Medical Insurance</p>
                  <p className="text-[10px] text-slate-400">₹10,00,000 coverage active</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
            <span>Block Seal: #a98f-019d-c4</span>
            <button
              onClick={() => onNavigate('my-payroll')}
              className="text-[#4648d4] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Audit Ledger Report</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Recent Activity & Audit Trail */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                IMMUTABLE LOG
              </span>
              <h3 className="text-sm font-bold text-slate-900">Recent Activity &amp; Audit Trail</h3>
            </div>
            <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
              <Filter className="w-3 h-3" />
              <span>Filter</span>
            </button>
          </div>

          <div className="space-y-3">
            {AUDIT_LOG_EVENTS.map((event) => (
              <div key={event.id} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100/80 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">{event.title}</p>
                    <span className="text-[10px] text-slate-400">{event.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>Showing 4 of 38 events</span>
            <button
              onClick={() => onNavigate('my-payroll')}
              className="text-[#4648d4] font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Explore Complete Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
