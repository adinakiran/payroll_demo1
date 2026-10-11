import React from 'react';
import { X, CheckCircle2, Calculator, ArrowRight, ShieldCheck } from 'lucide-react';

interface MathBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDispute: () => void;
}

export const MathBreakdownModal: React.FC<MathBreakdownModalProps> = ({
  isOpen,
  onClose,
  onDispute,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#4648d4] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Mathematical Breakdown — October 2024
              </h3>
              <p className="text-[11px] text-slate-400">
                Autonomous reconciliation formula per Section 192 &amp; Corporate LWP Policy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">1. Unpaid Leave (LOP) Deduction</span>
            <span className="font-extrabold text-rose-600">-₹1,000.00</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 font-mono text-[11px] text-slate-700 space-y-1">
            <p>Monthly Gross Remuneration = ₹2,25,000</p>
            <p>Standard Working Days in Oct = 22 Days</p>
            <p>Unapproved absence logged on Oct 14: 1 Day</p>
            <p className="text-[#4648d4] font-semibold">
              Corporate LWP Cap Clause §4.2: Pro-rata base daily deduction capped at ₹1,000
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">2. Section 192 Tax Withholding Recalibration</span>
            <span className="font-extrabold text-rose-600">-₹500.00</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 font-mono text-[11px] text-slate-700 space-y-1">
            <p>Year-to-Date Gross Earnings = ₹15,75,000 (7 Months)</p>
            <p>Projected Annual Income = ₹30,00,000</p>
            <p>Tax Regime: Default New Regime Sec 115BAC</p>
            <p className="text-amber-700 font-semibold">
              Quarterly catch-up applied under revised Section 87A marginal relief bracket: -₹500.00
            </p>
          </div>
        </div>

        {/* Total Summary */}
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">Net Take-Home Calculation</span>
            <span className="text-base font-extrabold text-slate-900">₹1,84,500.00</span>
          </div>
          <p className="text-slate-600 text-[11px]">
            September Net (₹1,86,000) - Unpaid Leave (-₹1,000) - Tax Delta (-₹500) = <strong className="text-slate-900">₹1,84,500</strong>
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 text-[11px] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified against IT Rules 1962
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onDispute();
              }}
              className="px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-indigo-600 text-white font-bold cursor-pointer"
            >
              Dispute This Deduction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
