import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  RefreshCw,
  Plus,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  ShieldCheck,
  User,
  Flag,
} from 'lucide-react';
import {
  CURRENT_USER,
  ATTENDANCE_OCTOBER,
  BIOMETRIC_SHIFT_STREAM,
} from '../../data/mockData';
import { ScreenType } from '../../types/payroll';

interface LeaveAttendanceScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onRequestLeave: () => void;
  onResolveDispute: () => void;
}

export const LeaveAttendanceScreen: React.FC<LeaveAttendanceScreenProps> = ({
  onNavigate,
  onRequestLeave,
  onResolveDispute,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<'oct' | 'nov'>('oct');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncBiometrics = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Biometrics synchronized with Keka Gate 04 turnstile. 1 anomaly confirmed on Oct 14.');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4648d4] flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            SELF-SERVICE PORTAL • Autonomous Sync: Active
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Leave &amp; Attendance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track time-off balances, biometric telemetry logs, statutory holiday schedules, and autonomous leave approvals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSyncBiometrics}
            className="h-10 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync Biometrics</span>
          </button>

          <button
            onClick={onRequestLeave}
            className="h-10 px-4 rounded-xl bg-[#4648d4] hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#4648d4]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Request Leave</span>
          </button>
        </div>
      </div>

      {/* 4 Cards: Available Balance, Used YTD, Pending, Next Holiday */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Balance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              AVAILABLE LEAVE BALANCE
            </span>
            <div className="w-6 h-6 rounded-md bg-blue-50 text-[#4648d4] flex items-center justify-center">
              <CalendarIcon className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              18.5
            </span>
            <span className="text-xs text-slate-500 font-semibold">Days total</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 my-2.5 overflow-hidden flex">
            <div className="bg-[#4648d4] h-full" style={{ width: '60%' }}></div>
            <div className="bg-teal-500 h-full" style={{ width: '25%' }}></div>
            <div className="bg-amber-400 h-full" style={{ width: '15%' }}></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Annual: 12d</span>
            <span>Sick: 4.5d</span>
            <span>Casual: 2d</span>
          </div>
        </div>

        {/* Used Leave YTD */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              USED LEAVE YTD
            </span>
            <div className="w-6 h-6 rounded-md bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              9.5
            </span>
            <span className="text-xs text-slate-500 font-semibold">/ 28 Allowance</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1.5 text-slate-600 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              33.9% Utilized
            </span>
            <span className="text-emerald-700 font-semibold text-[11px]">On Track for Policy</span>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              PENDING REQUESTS
            </span>
            <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
              <CalendarIcon className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              1
            </span>
            <span className="text-xs text-slate-500 font-semibold">Awaiting Approval</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-600 pt-1 border-t border-slate-100 truncate flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-500 shrink-0" />
            <span className="truncate">Dec 24–26 (Annual PTO...)</span>
          </div>
        </div>

        {/* Next Public Holiday */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              NEXT PUBLIC HOLIDAY
            </span>
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Diwali Break
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-slate-500 text-[11px]">Nov 01 – Nov 03</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
              In 3 days
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar Ledger & Forecasting Advisory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Attendance & Time-Off Ledger */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#4648d4] flex items-center justify-center">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Attendance &amp; Time-Off Ledger</h3>
                <p className="text-[11px] text-slate-400">
                  Live biometrics feed reconciled with Autonomous Ops
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-slate-100 rounded-xl flex items-center text-xs font-semibold">
                <button
                  onClick={() => setSelectedMonth('oct')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedMonth === 'oct' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  October 2024
                </button>
                <button
                  onClick={() => setSelectedMonth('nov')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedMonth === 'nov' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  November 2024
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-500">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600 pb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Present / Logged
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Approved PTO
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              Public Holiday
            </span>
            <span className="flex items-center gap-1.5 text-rose-600 font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              LOP / AI Flagged
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              Weekend
            </span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
              <div key={day} className="py-2 text-[10px] font-bold text-slate-400 uppercase">
                {day}
              </div>
            ))}

            {/* Empty padding day for Oct 1st (Tue) */}
            <div className="p-2 min-h-16 rounded-xl bg-slate-50/40 text-slate-300 text-left">
              <span className="text-[10px]">30</span>
            </div>

            {ATTENDANCE_OCTOBER.map((day) => {
              const isLop = day.status === 'lop';
              const isHoliday = day.status === 'holiday';
              const isPto = day.status === 'pto';
              const isCurrent = day.status === 'current';
              const isWeekend = day.status === 'weekend';

              return (
                <div
                  key={day.dayNumber}
                  className={`p-2 min-h-16 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isLop
                      ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-200'
                      : isCurrent
                      ? 'bg-indigo-50 border-indigo-300 ring-2 ring-[#4648d4]/30'
                      : isHoliday
                      ? 'bg-teal-50/70 border-teal-200'
                      : isPto
                      ? 'bg-blue-50/70 border-blue-200'
                      : isWeekend
                      ? 'bg-slate-50/50 border-slate-100 text-slate-400'
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold ${
                        isLop
                          ? 'text-rose-700'
                          : isCurrent
                          ? 'text-[#4648d4]'
                          : isWeekend
                          ? 'text-slate-400'
                          : 'text-slate-900'
                      }`}
                    >
                      {day.dayNumber}
                    </span>

                    {isLop && <Flag className="w-3 h-3 text-rose-600" />}
                  </div>

                  <div className="mt-1">
                    {day.hoursLogged && (
                      <span className="text-[10px] text-slate-600 block">
                        • {day.hoursLogged}
                      </span>
                    )}
                    {day.label && (
                      <span
                        className={`text-[9px] font-bold px-1 py-0.2 rounded block truncate ${
                          isLop
                            ? 'bg-rose-200 text-rose-900'
                            : isHoliday
                            ? 'bg-teal-200 text-teal-900'
                            : isPto
                            ? 'bg-blue-200 text-blue-900'
                            : 'bg-indigo-200 text-[#4648d4]'
                        }`}
                      >
                        {day.label}
                      </span>
                    )}
                    {isWeekend && <span className="text-[10px] text-slate-400">Off</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: AI Leave Forecasting Engine Advisory */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4648d4]" />
              <h3 className="text-xs font-bold text-[#4648d4] uppercase tracking-wider">
                AI Leave Forecasting Engine
              </h3>
            </div>

            <div>
              <h4 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                Year-End Carryover Advisory
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                If you schedule time off for the upcoming year-end shutdown (
                <strong className="text-slate-900">Dec 24 – Dec 31</strong>), you will preserve{' '}
                <strong className="text-slate-900">14.5 days</strong>. Note: Corporate policy permits carrying forward a maximum of{' '}
                <strong className="text-slate-900">10 days</strong> into Q1 2025. 4.5 days risk lapsing.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-indigo-100 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#4648d4] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-snug">
                <strong>Recommended:</strong> Take 4 consecutive days in December to avoid statutory forfeiture.
              </p>
            </div>

            <button
              onClick={onRequestLeave}
              className="w-full py-2.5 px-4 rounded-xl bg-[#4648d4] hover:bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Optimize Holiday Planning</span>
            </button>
          </div>

          {/* Leave Requests Widget */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Leave Requests
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">Q4 Tracking</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Dec 24 – Dec 26, 2024</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">
                    Pending
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">Vacation PTO • 3 Days</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-1 border-t border-slate-200/60">
                  <span className="text-emerald-700 font-semibold">✓ AI Pre-validated</span>
                  <span>Approver: Aris Thorne</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Oct 18, 2024</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    Approved
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">Medical / Sick Leave • 1 Day</p>
                <p className="text-[10px] text-slate-400 mt-1">Prescription Attached • Autonomous Pass</p>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Aug 14 – Aug 16, 2024</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    Approved
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">Annual PTO • 3 Days</p>
                <p className="text-[10px] text-slate-400 mt-1">Independence Day Weekend • Fully Audited</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Balances by Category */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Leave Balances by Category</h3>
            <p className="text-xs text-slate-400">
              Annual allocations conforming to Statutory Karnataka Shops &amp; Est. Act • Cycle: Jan 2024 – Dec 2024
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Vacation */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Vacation / Annual Leave</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                Carried 4d
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Accrual: 1.5 days/month</p>
            <div className="text-xl font-extrabold text-slate-900">
              12.0 <span className="text-xs font-normal text-slate-400">left / 18 Total</span>
            </div>
          </div>

          {/* Sick */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Sick / Medical Leave</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                Active
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Medical certificate &gt; 2 days</p>
            <div className="text-xl font-extrabold text-slate-900">
              4.5 <span className="text-xs font-normal text-slate-400">left / 7 Total</span>
            </div>
          </div>

          {/* Casual (Exhausted!) */}
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Casual / Personal</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                Exhausted
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Single day increments</p>
            <div className="text-xl font-extrabold text-rose-700">
              0.0 <span className="text-xs font-normal text-slate-400">left / 3 Total</span>
            </div>
          </div>

          {/* Parental */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Parental / Paternity Leave</span>
            <p className="text-[10px] text-slate-400">Fully paid continuous entitlement</p>
            <div className="text-xl font-extrabold text-slate-900">
              15 <span className="text-xs font-normal text-slate-400">Days Eligible</span>
            </div>
          </div>

          {/* Bereavement */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Bereavement &amp; Special Leave</span>
            <p className="text-[10px] text-slate-400">Compassionate ground allocation</p>
            <div className="text-xl font-extrabold text-slate-900">
              5 <span className="text-xs font-normal text-slate-400">Days Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Biometric & Telemetry Shift Stream Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Biometric &amp; Telemetry Shift Stream</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Hardware Synced
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated sync with Keka Biometrics &amp; Office Turnstiles (Gate 04, Bengaluru HQ)
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
            Weekly Average: 8h 45m / day
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">DATE</th>
                <th className="py-3 px-5">FIRST PUNCH IN</th>
                <th className="py-3 px-5">LAST PUNCH OUT</th>
                <th className="py-3 px-5">GROSS DURATION</th>
                <th className="py-3 px-5">TERMINAL NODE</th>
                <th className="py-3 px-5 text-right">AUDIT STATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {BIOMETRIC_SHIFT_STREAM.map((stream, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    stream.isAlert ? 'bg-rose-50/50' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    <span className={stream.isAlert ? 'text-rose-600' : ''}>{stream.date}</span>
                  </td>
                  <td className="py-3.5 px-5">{stream.firstPunchIn}</td>
                  <td className="py-3.5 px-5">{stream.lastPunchOut}</td>
                  <td className="py-3.5 px-5 font-semibold">{stream.grossDuration}</td>
                  <td className="py-3.5 px-5 text-slate-500">{stream.terminalNode}</td>
                  <td className="py-3.5 px-5 text-right">
                    {stream.isAlert ? (
                      <button
                        onClick={onResolveDispute}
                        className="px-3 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>Resolve Dispute</span>
                      </button>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        • {stream.auditState}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
