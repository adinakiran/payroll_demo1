import React, { useState } from 'react';
import {
  Printer,
  Mail,
  Download,
  Sparkles,
  Building2,
  User,
  Landmark,
  Calendar,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  Wallet,
} from 'lucide-react';
import {
  CURRENT_USER,
  EMPLOYER_INFO,
  PAYSLIP_RECORDS,
  OCTOBER_EARNINGS,
  OCTOBER_DEDUCTIONS,
  EMPLOYER_CONTRIBUTIONS,
} from '../../data/mockData';
import { ScreenType } from '../../types/payroll';

interface PayslipScreenProps {
  onNavigate: (screen: ScreenType) => void;
  selectedPayslipId?: string;
}

export const PayslipScreen: React.FC<PayslipScreenProps> = ({
  onNavigate,
  selectedPayslipId = 'PP-2024-10-9942',
}) => {
  const [currentSlipId, setCurrentSlipId] = useState(selectedPayslipId);
  const [emailSent, setEmailSent] = useState(false);

  const currentRecord =
    PAYSLIP_RECORDS.find((p) => p.id === currentSlipId) || PAYSLIP_RECORDS[0];

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  const handleDownloadPdf = () => {
    alert(`Downloading official digitally-signed PDF for ${currentRecord.period} (REF: ${currentRecord.refNumber})`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={() => onNavigate('my-payroll')}
            className="hover:text-[#4648d4] font-medium flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            My Payroll
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-900">{currentRecord.period} Payslip</span>
          <span className="text-slate-400">• REF: {currentRecord.refNumber}</span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Autonomous Engine Verified | 0x7F...9A4E
          </span>
        </div>
      </div>

      {/* Main Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Payslip Details — {currentRecord.period}
          </h1>
          <div className="flex flex-wrap items-center gap-2.5 mt-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Paid on {currentRecord.paymentDate}
            </span>
            <span className="text-xs text-slate-500">
              Disbursed via automated ACH transfer to registered salary account on file.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrint}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>

          <button
            onClick={handleSendEmail}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>{emailSent ? 'Email Dispatched!' : 'Send to Work Email'}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="h-9 px-3.5 rounded-xl bg-[#4648d4] hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-[#4648d4]/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official PDF</span>
          </button>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="h-9 px-3.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#4648d4] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4648d4]" />
            <span>Ask AI Assistant</span>
          </button>
        </div>
      </div>

      {/* 4 Cards Header Information: Employer, Employee, Account, Pay Period */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Employer Entity */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>EMPLOYER ENTITY</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">{EMPLOYER_INFO.name}</h4>
            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{EMPLOYER_INFO.address}</p>
          </div>
          <div className="pt-1 text-[10px] text-slate-400 font-mono space-y-0.5 border-t border-slate-100">
            <p>CIN: {EMPLOYER_INFO.cin}</p>
            <p>GSTIN: {EMPLOYER_INFO.gstin}</p>
          </div>
        </div>

        {/* 2. Employee Information */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-emerald-500" />
              <span>EMPLOYEE INFORMATION</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">{CURRENT_USER.name}</h4>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                {CURRENT_USER.empId}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">{CURRENT_USER.role}</p>
            <p className="text-[10px] text-slate-400">Dept: {CURRENT_USER.department}</p>
          </div>
          <div className="pt-1 text-[10px] text-slate-400 font-mono space-y-0.5 border-t border-slate-100">
            <p>PAN: {CURRENT_USER.pan} • UAN: {CURRENT_USER.uan}</p>
          </div>
        </div>

        {/* 3. Disbursement Account */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5 text-blue-500" />
            <span>DISBURSEMENT ACCOUNT</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">{CURRENT_USER.bankName}</h4>
            <p className="text-xs text-slate-700 font-mono mt-0.5 flex items-center gap-1.5">
              <span>A/C: {CURRENT_USER.bankAccount}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
            </p>
          </div>
          <div className="pt-1 text-[10px] text-slate-400 space-y-0.5 border-t border-slate-100">
            <p>IFSC: {CURRENT_USER.ifsc}</p>
            <p className="text-emerald-700 font-medium">Payout Mode: Immediate NEFT Settlement</p>
          </div>
        </div>

        {/* 4. Pay Period */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>PAY PERIOD</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-[#4648d4]">
              {currentRecord.shortPeriod}
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">01 Oct 2024 – 31 Oct 2024</h4>
            <div className="flex items-center justify-between text-xs text-slate-600 mt-1">
              <span>Days in Month:</span>
              <span className="font-bold text-slate-900">{currentRecord.totalDays}</span>
            </div>
          </div>
          <div className="pt-1 text-[11px] flex items-center justify-between border-t border-slate-100">
            <span className="text-slate-400">Days Credited:</span>
            <span className="font-bold text-emerald-700">
              {currentRecord.daysCredited} ({currentRecord.lopDays} LOP)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Detailed Statements vs Right Intelligence Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Net Salary Hero + Earnings + Deductions + Employer Overheads */}
        <div className="lg:col-span-2 space-y-6">
          {/* Net Take-Home Pay Hero */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-white border border-indigo-100 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#4648d4] uppercase tracking-wider flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5" />
                  Net Take-Home Pay
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                  ₹{currentRecord.netPay.toLocaleString('en-IN')}{' '}
                  <span className="text-base font-semibold text-slate-400">INR</span>
                </div>
                <p className="text-xs text-slate-500 italic mt-0.5">
                  "One Lakh Eighty-Four Thousand Five Hundred Rupees Only"
                </p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs self-start sm:self-auto">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  SETTLEMENT CONFIRMATION
                </span>
                <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Deposited into HDFC Bank
                </p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  UTN: ACH-241031-9081249
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-indigo-100/80 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block">Gross Earnings</span>
                <span className="font-bold text-slate-900 text-sm">
                  ₹{currentRecord.grossPay.toLocaleString('en-IN')}.00
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Total Deductions</span>
                <span className="font-bold text-rose-600 text-sm">
                  -₹{currentRecord.deductions.toLocaleString('en-IN')}.00
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Employer Contrib.</span>
                <span className="font-bold text-slate-700 text-sm">₹18,910.00</span>
              </div>
            </div>
          </div>

          {/* Earnings Breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <span className="text-xs font-bold">+</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">Earnings Breakdown</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                STANDARD CTC PACKAGE
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="py-2.5 px-5">COMPENSATION COMPONENT</th>
                  <th className="py-2.5 px-5">COMPUTATION TYPE</th>
                  <th className="py-2.5 px-5 text-right">AMOUNT (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {OCTOBER_EARNINGS.map((earn, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-slate-900">{earn.component}</p>
                      <p className="text-[11px] text-slate-400">{earn.subtext}</p>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {earn.typeTag}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right font-bold text-slate-900">
                      ₹{earn.amount.toLocaleString('en-IN')}.00
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 font-bold border-t border-slate-200">
                  <td className="py-3 px-5 text-slate-900" colSpan={2}>
                    Total Gross Earnings
                  </td>
                  <td className="py-3 px-5 text-right text-slate-900">
                    ₹{currentRecord.grossPay.toLocaleString('en-IN')}.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Deductions Breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <span className="text-xs font-bold">-</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">Deductions Breakdown</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                STATUTORY &amp; COMPANY POLICY
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="py-2.5 px-5">DEDUCTION ITEM</th>
                  <th className="py-2.5 px-5">CLASSIFICATION</th>
                  <th className="py-2.5 px-5 text-right">AMOUNT (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {OCTOBER_DEDUCTIONS.map((ded, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{ded.item}</span>
                        {ded.tag && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700">
                            {ded.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{ded.subtext}</p>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {ded.classification}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right font-bold text-rose-600">
                      ₹{ded.amount.toLocaleString('en-IN')}.00
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-rose-50/50 font-bold border-t border-rose-100">
                  <td className="py-3 px-5 text-slate-900" colSpan={2}>
                    Total Deductions Retained
                  </td>
                  <td className="py-3 px-5 text-right text-rose-600">
                    ₹{currentRecord.deductions.toLocaleString('en-IN')}.00
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Employer Non-Cash Contributions (CTC Overhead) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#4648d4]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Employer Non-Cash Contributions (CTC Overhead)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Benefits funded 100% by Acme Tech</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EMPLOYER_CONTRIBUTIONS.map((emp, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 block">{emp.label}</span>
                  <div className="text-base font-extrabold text-slate-900 mt-1">
                    ₹{emp.amount.toLocaleString('en-IN')}.00
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{emp.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: PayPilot Intelligence Variance + Tax Card + Historical Slips */}
        <div className="space-y-6">
          {/* Card 1: PayPilot Intelligence Variance Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#EEF2FF] to-white border border-indigo-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4648d4] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4648d4] animate-pulse"></span>
                PAYPILOT INTELLIGENCE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 text-[#4648d4]">
                Variance Engine v4.2
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                Why is this payout ₹1,500 lower than September?
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                PayPilot evaluated your October ledger against September 2024 (₹1,86,000 net). The ₹1,500 net variance is fully attributed to two verified operational shifts:
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Unpaid Leave (LOP)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    1 unapproved absence logged for Oct 14 during sprint freeze.
                  </p>
                </div>
                <span className="text-xs font-extrabold text-rose-600 shrink-0 ml-2">-₹1,000</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">TDS Bracket Re-Index</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tax adjusted to normalize projected FY25 annual slab bracket.
                  </p>
                </div>
                <span className="text-xs font-extrabold text-rose-600 shrink-0 ml-2">-₹500</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('ai-assistant')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4648d4] to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Full AI Investigator</span>
            </button>
          </div>

          {/* Card 2: FY 2024–25 Tax Status */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-slate-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  FY 2024–25 Tax Status
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                New Regime
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">YTD Tax Deducted</span>
                <span className="font-bold text-slate-900">₹1,75,400 / ₹3,03,600</span>
              </div>
              <p className="text-[10px] text-slate-400">7 of 12 Months completed</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#4648d4] h-full" style={{ width: '58%' }}></div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span>Regime Option:</span>
                <span className="font-medium text-slate-900">Default (Sec 115BAC)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Standard Deduction:</span>
                <span className="font-medium text-slate-900">₹75,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Deduction:</span>
                <span className="text-emerald-700 font-semibold">Applied</span>
              </div>
              <div className="flex items-center justify-between">
                <span>80C / 80D Declarations:</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('my-payroll')}
              className="text-xs font-bold text-[#4648d4] flex items-center gap-1 hover:underline pt-1 cursor-pointer"
            >
              <span>View Full FY24–25 Tax Simulation</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 3: Recent Payslips List */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recent Payslips
              </h3>
              <button
                onClick={() => onNavigate('my-payroll')}
                className="text-[11px] font-semibold text-[#4648d4] hover:underline cursor-pointer"
              >
                All History
              </button>
            </div>

            <div className="space-y-2">
              {PAYSLIP_RECORDS.map((slip) => {
                const isSelected = slip.id === currentSlipId;
                return (
                  <button
                    key={slip.id}
                    onClick={() => setCurrentSlipId(slip.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-200 shadow-2xs'
                        : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">{slip.period}</span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#4648d4] bg-indigo-100 px-1.5 py-0.2 rounded">
                            Active Selection
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{slip.daysCredited} Days Paid</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900">
                        ₹{slip.netPay.toLocaleString('en-IN')}
                      </p>
                      <span className="text-[10px] text-emerald-600 font-semibold">Paid</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Cryptographically Signed Footer Banner */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#4648d4] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">
                Cryptographically Signed by PayPilot Autonomous Payroll Engine
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700">
                SHA-256
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Hash: b412e87904fc192ac8997ef00192a54b3c9902e19d7b42aa18e90c05812 • Timestamp: 2024-10-31 09:30:14 IST
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-500 font-medium shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>SOC2 Type II Certified</span>
          </div>
          <span className="text-slate-300">•</span>
          <span>Section 192 IT Act Compliant</span>
        </div>
      </div>
    </div>
  );
};
