import React, { useState } from 'react';
import {
  Wallet,
  Calendar,
  Download,
  ArrowRightLeft,
  Eye,
  CheckCircle2,
  Sparkles,
  TrendingDown,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
  FileSpreadsheet,
  UploadCloud,
} from 'lucide-react';
import {
  CURRENT_USER,
  PAYSLIP_RECORDS,
  OCTOBER_EARNINGS,
  OCTOBER_DEDUCTIONS,
} from '../../data/mockData';
import { ScreenType } from '../../types/payroll';

interface MyPayrollScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenPayslip: (payslipId?: string) => void;
  onOpenUploadPayslip?: () => void;
}

export const MyPayrollScreen: React.FC<MyPayrollScreenProps> = ({
  onNavigate,
  onOpenPayslip,
  onOpenUploadPayslip,
}) => {
  const [selectedMonth, setSelectedMonth] = useState('October 2024');
  const [showCompareModal, setShowCompareModal] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4648d4] flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4648d4]"></span>
            COMPENSATION LEDGER • Live Disbursal Verified
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Payroll
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Comprehensive breakdown of your earnings, tax withholdings, and monthly payment history.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none h-10 pl-3.5 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 cursor-pointer outline-none focus:border-[#4648d4]"
            >
              <option value="October 2024">October 2024</option>
              <option value="September 2024">September 2024</option>
              <option value="August 2024">August 2024</option>
              <option value="July 2024">July 2024</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
          </div>

          {onOpenUploadPayslip && (
            <button
              onClick={onOpenUploadPayslip}
              className="h-10 px-3.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/70 text-[#4648d4] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#4648d4]" />
              <span>Upload &amp; Audit Payslip</span>
            </button>
          )}

          <button
            onClick={() => setShowCompareModal(!showCompareModal)}
            className="h-10 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#4648d4]" />
            <span>Compare with Previous Month</span>
          </button>

          <button
            onClick={() => alert('Downloading official FY24-25 Consolidated Annual Statement PDF...')}
            className="h-10 px-4 rounded-xl bg-[#4648d4] hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#4648d4]/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Annual Statement</span>
          </button>
        </div>
      </div>

      {/* 4 Cards: Payroll Cycle, Net, Gross, Deductions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Payroll Cycle */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              PAYROLL CYCLE
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-[#4648d4]">
              Active Period
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            October 2024
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <span>📅 Disbursal: Oct 31, 2024</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Days in cycle: 31</span>
            <span className="text-emerald-600 font-semibold">100% Reconciled</span>
          </div>
        </div>

        {/* Card 2: Net Salary */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              NET SALARY
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
              Bank Deposited
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ₹1,84,500
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Credited to HDFC •••• 4091</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Take-home ratio</span>
            <span className="font-bold text-slate-700">82.0% of Gross</span>
          </div>
        </div>

        {/* Card 3: Gross Salary */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              GROSS SALARY
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
              Pre-tax total
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ₹2,25,000
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <span>→ No baseline fluctuation</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Annual CTC pace</span>
            <span className="font-bold text-slate-700">₹27.0 L / yr</span>
          </div>
        </div>

        {/* Card 4: Total Deductions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              TOTAL DEDUCTIONS
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700">
              Taxes &amp; PF
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ₹40,500
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <span className="text-slate-400">Effective Tax Rate:</span>
            <span className="font-bold text-slate-700">13.8%</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Adjustment</span>
            <span className="text-rose-600 font-bold">+₹1,500 vs Sep</span>
          </div>
        </div>
      </div>

      {/* Gross Income Distribution */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-indigo-50 text-[#4648d4] flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Gross Income Distribution</h3>
          </div>
          <span className="text-xs text-slate-400">
            Automated withholdings calculated per Section 192, Income Tax Act
          </span>
        </div>

        {/* Stacked Percentage Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
          <div style={{ width: '82%' }} className="bg-emerald-500 h-full" title="Net Take-Home 82.0%"></div>
          <div style={{ width: '11.2%' }} className="bg-amber-500 h-full" title="Income Tax (TDS) 11.2%"></div>
          <div style={{ width: '6.0%' }} className="bg-indigo-600 h-full" title="Employee PF 6.0%"></div>
          <div style={{ width: '0.8%' }} className="bg-sky-500 h-full" title="Insurance & Dues 0.8%"></div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shrink-0"></span>
            <div>
              <p className="text-slate-500 text-[11px]">Net Take-Home</p>
              <p className="font-bold text-slate-900">82.0% (₹1,84,500)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 shrink-0"></span>
            <div>
              <p className="text-slate-500 text-[11px]">Income Tax (TDS)</p>
              <p className="font-bold text-slate-900">11.2% (₹25,300)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 shrink-0"></span>
            <div>
              <p className="text-slate-500 text-[11px]">Employee PF (EPF)</p>
              <p className="font-bold text-slate-900">6.0% (₹13,500)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-500 shrink-0"></span>
            <div>
              <p className="text-slate-500 text-[11px]">Insurance &amp; Dues</p>
              <p className="font-bold text-slate-900">0.8% (₹1,700)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side: Gross Earnings & Deductions Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gross Earnings */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Gross Earnings</h3>
                  <p className="text-[11px] text-slate-400">4 Active compensation components</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                Total: ₹2,25,000
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {OCTOBER_EARNINGS.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{item.component}</p>
                    <p className="text-[11px] text-slate-400">{item.subtext}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.typeTag}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    ₹{item.amount.toLocaleString('en-IN')}.00
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-emerald-50/50 border-t border-emerald-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Total Gross Remuneration</span>
            <span className="text-base font-extrabold text-emerald-700">
              ₹2,25,000.00
            </span>
          </div>
        </div>

        {/* Deductions Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <TrendingDown className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Statutory &amp; Voluntary Deductions</h3>
                  <p className="text-[11px] text-slate-400">5 Withholding heads active</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700">
                Total: ₹40,500
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {OCTOBER_DEDUCTIONS.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-900">{item.item}</p>
                      {item.tag && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">{item.subtext}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.classification}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">
                    ₹{item.amount.toLocaleString('en-IN')}.00
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-rose-50/50 border-t border-rose-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Total Retained Withholdings</span>
            <span className="text-base font-extrabold text-rose-700">
              ₹40,500.00
            </span>
          </div>
        </div>
      </div>

      {/* Month-over-Month Delta Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Comparative variance: October 2024 vs. September 2024
            </span>
            <h3 className="text-sm font-bold text-slate-900">Month-over-Month Delta</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-[#4648d4]">
            Autonomous Delta Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Gross Salary</span>
            <div className="text-lg font-extrabold text-slate-900 mt-1">₹2,25,000</div>
            <p className="text-xs text-slate-500 mt-0.5">from ₹2,25,000 (Unchanged)</p>
            <span className="inline-block mt-2 text-[11px] font-semibold text-slate-500">
              — 0.0% variance
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
            <span className="text-[11px] font-semibold text-rose-600 uppercase">Deductions</span>
            <div className="text-lg font-extrabold text-rose-700 mt-1">₹40,500</div>
            <p className="text-xs text-rose-600/80 mt-0.5">from ₹39,000 (+3.8% increase)</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-rose-700">
              ↑ +₹1,500 additional deduction
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
            <span className="text-[11px] font-semibold text-amber-600 uppercase">Net Disbursal</span>
            <div className="text-lg font-extrabold text-slate-900 mt-1">₹1,84,500</div>
            <p className="text-xs text-slate-500 mt-0.5">from ₹1,86,000 (-0.8% delta)</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-rose-600">
              ↓ -₹1,500 lower payout
            </span>
          </div>
        </div>

        {/* AI Compensation Audit Note */}
        <div className="p-4 rounded-2xl bg-[#EEF2FF] border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#4648d4] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-[#4648d4]">
                AI Compensation Audit • Calibrated 4 hours ago
              </p>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                "The <strong className="text-slate-900">₹1,500 difference</strong> stems from{' '}
                <strong className="text-slate-900">1 unpaid leave day on Oct 14</strong> (₹1,000 deduction) and an automated{' '}
                <strong className="text-slate-900">₹500 tax recalculation</strong> scheduled for Q3 year-to-date compliance balancing."
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#4648d4] shrink-0 shadow-2xs cursor-pointer"
          >
            Audit Log Details
          </button>
        </div>
      </div>

      {/* Payroll Disbursal History Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Payroll Disbursal History</h3>
            <p className="text-xs text-slate-400">Audited logs for fiscal cycle 2024–2025</p>
          </div>
          <span className="text-xs text-slate-500">Showing latest 4 periods</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">PAY PERIOD</th>
                <th className="py-3 px-5">PAYMENT DATE</th>
                <th className="py-3 px-5">GROSS PAY</th>
                <th className="py-3 px-5">DEDUCTIONS</th>
                <th className="py-3 px-5">NET PAY</th>
                <th className="py-3 px-5">STATUS</th>
                <th className="py-3 px-5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {PAYSLIP_RECORDS.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      {rec.monthKey === '2024-10' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      )}
                      <span className="font-bold text-slate-900">{rec.shortPeriod}</span>
                      {rec.monthKey === '2024-10' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-[#4648d4]">
                          Current
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-500">{rec.paymentDate}</td>
                  <td className="py-4 px-5 font-semibold">₹{rec.grossPay.toLocaleString('en-IN')}.00</td>
                  <td className="py-4 px-5 font-semibold text-rose-600">
                    -₹{rec.deductions.toLocaleString('en-IN')}.00
                  </td>
                  <td className="py-4 px-5 font-bold text-slate-900">
                    ₹{rec.netPay.toLocaleString('en-IN')}.00
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      • {rec.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onOpenPayslip(rec.id)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-[#4648d4] font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Payslip</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cryptographically signed by PayPilot Autonomous Payroll Engine (SHA-256 Verified)</span>
          </div>
          <button className="text-[#4648d4] font-bold hover:underline cursor-pointer">
            View Full Historical Archives →
          </button>
        </div>
      </div>
    </div>
  );
};
