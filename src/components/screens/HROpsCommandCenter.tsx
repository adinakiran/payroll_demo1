import React, { useState } from 'react';
import {
  Building2,
  Users,
  Wallet,
  Zap,
  AlertTriangle,
  Clock,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowUp,
  Download,
  ShieldCheck,
  ChevronRight,
  Send,
  Eye,
  Check,
  X,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { HR_PENDING_APPROVALS } from '../../data/mockData';
import { ScreenType, PendingHRApproval } from '../../types/payroll';

interface HROpsCommandCenterProps {
  onNavigate: (screen: ScreenType) => void;
  onKiranApproved?: () => void;
}

export const HROpsCommandCenter: React.FC<HROpsCommandCenterProps> = ({
  onNavigate,
  onKiranApproved,
}) => {
  const [approvals, setApprovals] = useState<PendingHRApproval[]>(HR_PENDING_APPROVALS);
  const [copilotQuery, setCopilotQuery] = useState('');
  const [copilotResponses, setCopilotResponses] = useState<
    { query: string; response: string }[]
  >([]);
  const [inspectCluster, setInspectCluster] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'approved' } : a))
    );
    if (id === 'appr-1' && onKiranApproved) {
      onKiranApproved();
    }
  };

  const handleReject = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'rejected' } : a))
    );
  };

  const handleCopilotSubmit = (queryText: string) => {
    if (!queryText.trim()) return;
    const q = queryText.toLowerCase();
    let reply = '';

    if (q.includes('export') || q.includes('reconciliation')) {
      reply =
        'October 2024 Reconciliation Report compiled: 1,420 heads disbursed, ₹18.42 Cr settled via NEFT/RTGS batch. Download link generated: #REC-2024-10-OCT.csv';
    } else if (q.includes('anomalies') || q.includes('dept')) {
      reply =
        'Anomaly Breakdown by Department: Engineering (5 - Biometric Gate 04 maintenance), Product Ops (3 - Travel vouchers), Marketing (2 - TDS 80C proof lapse), Sales (1 - Commission cap).';
    } else if (q.includes('increment') || q.includes('simulate')) {
      reply =
        'Simulation: 6% baseline increment across 1,420 employees increases monthly gross payroll by ₹1.105 Cr. Projected annual impact: +₹13.26 Cr. Current runway buffer: Adequate (18.4 mos).';
    } else {
      reply = `Autonomous audit response: PayPilot verified query across Cluster IN-BLR-PROD-09. All statutory filings (EPF, TDS, PT) are within SLA.`;
    }

    setCopilotResponses((prev) => [{ query: queryText, response: reply }, ...prev]);
    setCopilotQuery('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-indigo-50/80 via-blue-50/50 to-slate-50 border border-indigo-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 text-[11px] font-bold text-[#4648d4] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4648d4]"></span>
            <span>AUTONOMOUS CONTROL SUITE • Cluster ID: IN-BLR-PROD-09</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Payroll Operations &amp; AI Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Real-time multi-tenant monitoring, autonomous anomaly clustering, and human specialist exception queues.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-center">
          <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-slate-900">Cycle: October 2024 Finalized</span>
            <span className="text-slate-400">• November Cycle Active (18d Left)</span>
          </div>

          <button
            onClick={() => alert('Synchronizing cluster telemetry...')}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Headcount */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">ACTIVE HEADCOUNT</span>
            <Users className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">1,420</div>
          <p className="text-[11px] text-slate-400">Employees across 4 hubs</p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold">
            <span className="text-emerald-700">+24 this month</span>
            <span className="text-slate-400">100% sync</span>
          </div>
        </div>

        {/* Disbursed */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">PAYROLL DISBURSED</span>
            <Wallet className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">₹18.42 Cr</div>
          <p className="text-[11px] text-slate-400">Oct Disbursal ($2.2M USD)</p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold">
            <span className="text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Reconciled
            </span>
            <span className="text-slate-400">0 pending</span>
          </div>
        </div>

        {/* AI Resolution Rate */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">AI RESOLUTION RATE</span>
            <Zap className="w-3.5 h-3.5 text-[#4648d4]" />
          </div>
          <div className="text-2xl font-black text-[#4648d4] tracking-tight">94.2%</div>
          <p className="text-[11px] text-slate-400">Zero manual escalation</p>
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] font-semibold text-[#4648d4]">
            <Sparkles className="w-3 h-3" />
            <span>182 / 193 resolved</span>
          </div>
        </div>

        {/* Discrepancies */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">PAYROLL DISCREPANCIES</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600 tracking-tight">11</div>
          <p className="text-[11px] text-slate-400">Active anomalies flagged</p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold">
            <span className="text-indigo-600">6 AI Auto-Investig.</span>
            <span className="text-rose-600">5 Ops Lead</span>
          </div>
        </div>

        {/* Resolution Velocity */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">RESOLUTION VELOCITY</span>
            <Clock className="w-3.5 h-3.5 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">4.2 min</div>
          <p className="text-[11px] text-slate-400">Avg employee wait time</p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold">
            <span className="text-emerald-700">↓ -98% vs manual</span>
            <span className="text-slate-400">(prev 3.2d)</span>
          </div>
        </div>
      </div>

      {/* Main Layout: Left 2 Cols (Health + Clusters + Pending Approvals) vs Right 1 Col (Trends + Compliance + Copilot) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Payroll Health & Autonomous Audits */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Live Payroll Health &amp; Autonomous Audits
                </h3>
                <p className="text-xs text-slate-400">
                  Continuous multi-vector cross-check against biometric, tax slabs, and disbursal routing
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                • Real-Time Integrity: 99.2%
              </span>
            </div>

            {/* Cascade 4 Nodes */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                AUTONOMOUS VERIFICATION CASCADE
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* 1. Biometrics */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">1. Biometrics</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-base font-extrabold text-slate-900 mt-1">
                    1,420 / 1,420
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                    100% Ingested
                  </span>
                </div>

                {/* 2. Sec 192 Tax */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">2. Sec 192 Tax</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-base font-extrabold text-slate-900 mt-1">
                    Dynamic Slabs
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                    100% Compliant
                  </span>
                </div>

                {/* 3. LOP & OT Audit (Flagged) */}
                <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-900">3. LOP &amp; OT Audit</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <div className="text-base font-extrabold text-rose-700 mt-1">
                    11 Flagged Items
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                    98.8% Verified
                  </span>
                </div>

                {/* 4. Disbursal Rail */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">4. Disbursal Rail</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-base font-extrabold text-slate-900 mt-1">
                    RTGS / NEFT Hot
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                    Ready &amp; Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Open Anomaly Cluster Breakdown */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Open Anomaly Cluster Breakdown
                </span>
                <span className="text-xs text-rose-600 font-semibold">11 Discrepancies Queued</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Cluster 1 */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Leave / LOP Disparity</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                      5
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Biometric punch mismatch with approved Slack leaves.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-700 font-medium">3 Resolved by Bot</span>
                    <button
                      onClick={() => setInspectCluster('Leave / LOP Disparity')}
                      className="text-[#4648d4] font-bold hover:underline cursor-pointer"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>

                {/* Cluster 2 */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Tax Declaration Gaps</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                      4
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Missing 80D Mediclaim receipt validation checks.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Employee Notified</span>
                    <button
                      onClick={() => setInspectCluster('Tax Declaration Gaps')}
                      className="text-[#4648d4] font-bold hover:underline cursor-pointer"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>

                {/* Cluster 3 */}
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Bank IFSC / Name Match</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                      2
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Penny-drop verification returned minor name truncation.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-rose-600 font-medium">Requires HR Sign-off</span>
                    <button
                      onClick={() => setInspectCluster('Bank IFSC / Name Match')}
                      className="text-[#4648d4] font-bold hover:underline cursor-pointer"
                    >
                      Inspect →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Agent Fleet Performance */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4648d4]" />
                <h3 className="text-sm font-bold text-slate-900">AI Agent Fleet Performance</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                All LLM Engines Nominal
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Continuous autonomous ticket resolution &amp; statutory policy synthesis
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">INQUIRIES TRIAGED</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">1,248</div>
                <p className="text-[11px] text-slate-500 mt-0.5">This billing cycle (30d)</p>
                <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700">
                  ↑ 18.4% volume handled autonom.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">AUTONOMOUS SLA COMPLIANCE</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">99.8%</div>
                <p className="text-[11px] text-slate-500 mt-0.5">&lt; 5m turnaround guarantee</p>
                <span className="inline-block mt-2 text-[10px] text-slate-400">
                  Target threshold: 95.0%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">TOP POLICY GROUNDING CITATION</span>
                <div className="text-base font-extrabold text-slate-900 mt-1">Policy §4.2</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Paid Time-off Carry Forward</p>
                <span className="inline-block mt-2 text-[10px] font-bold text-indigo-700">
                  Cited in 412 bot responses
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2 text-xs text-emerald-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="font-bold text-[10px] uppercase">LATEST AUTONOMOUS ACTION:</span>
              <span className="truncate text-[11px]">
                Resolved payslip variance ticket #TCK-9904 for Ananya Gupta (Design Lead) in 1.4s.
              </span>
            </div>
          </div>

          {/* Pending HR Specialist Approvals */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Pending HR Specialist Approvals
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {approvals.filter((a) => a.status === 'pending').length}
                </span>
              </div>
              <span className="text-xs text-slate-400">Requires manual authorized sign-off</span>
            </div>

            <div className="space-y-3">
              {approvals.map((appr) => {
                const isApproved = appr.status === 'approved';
                const isRejected = appr.status === 'rejected';

                return (
                  <div
                    key={appr.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      isApproved
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : isRejected
                        ? 'bg-slate-100/60 border-slate-200 opacity-60'
                        : 'bg-slate-50/60 border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={appr.avatar}
                        alt={appr.employeeName}
                        className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            {appr.employeeName}
                          </span>
                          <span className="text-[10px] text-slate-400">• {appr.empId}</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-slate-200 text-slate-700">
                            {appr.department}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800">
                          {appr.requestType}
                        </p>
                        {appr.amountOrDays && (
                          <p className="text-xs text-[#4648d4] font-bold">
                            {appr.amountOrDays}
                          </p>
                        )}
                        {appr.aiNote && (
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                            <Sparkles className="w-3 h-3 text-[#4648d4]" />
                            <span>{appr.aiNote}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      {isApproved ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Approved
                        </span>
                      ) : isRejected ? (
                        <span className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold">
                          Rejected
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              alert(
                                `Details for ${appr.employeeName}: ${appr.requestType}. Slack authorization confirmed.`
                              )
                            }
                            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
                          >
                            Review Details
                          </button>
                          <button
                            onClick={() => handleApprove(appr.id)}
                            className="px-4 py-1.5 rounded-xl bg-[#4648d4] hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          {appr.id === 'appr-3' && (
                            <button
                              onClick={() => handleReject(appr.id)}
                              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer"
                            >
                              Reject
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Disbursal Trends + Statutory Compliance + Admin Copilot */}
        <div className="space-y-6">
          {/* Disbursal Trends Chart Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Disbursal Trends
                </h3>
                <p className="text-[11px] text-slate-400">Past 6 months runtime velocity (May – Oct)</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                +14.2% YoY
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2">
              {[
                { month: 'May', height: '60%', amount: '₹16.1 Cr' },
                { month: 'Jun', height: '65%', amount: '₹16.6 Cr' },
                { month: 'Jul', height: '70%', amount: '₹17.3 Cr' },
                { month: 'Aug', height: '75%', amount: '₹17.5 Cr' },
                { month: 'Sep', height: '85%', amount: '₹18.1 Cr' },
                { month: 'Oct', height: '95%', amount: '₹18.4 Cr', active: true },
              ].map((bar) => (
                <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    style={{ height: bar.height }}
                    className={`w-full rounded-t-lg transition-all ${
                      bar.active
                        ? 'bg-[#4648d4] shadow-md shadow-[#4648d4]/20'
                        : 'bg-indigo-100 hover:bg-indigo-200'
                    }`}
                    title={`${bar.month}: ${bar.amount}`}
                  ></div>
                  <span className={`text-[10px] font-semibold ${bar.active ? 'text-[#4648d4] font-bold' : 'text-slate-400'}`}>
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Oct Gross Outflow:</span>
                <span className="font-extrabold text-slate-900">₹18,42,10,480</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Net Salary: 82%</span>
                <span>TDS &amp; Statutory: 14%</span>
                <span>Benefits: 4%</span>
              </div>
            </div>
          </div>

          {/* Statutory Compliance Checklist Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Statutory Compliance
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                100% On-Time
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">EPF &amp; EPS Filing</p>
                  <p className="text-[10px] text-slate-400">Challan #EPF9920119 • Oct 2024</p>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Filed
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">TDS / Section 192</p>
                  <p className="text-[10px] text-slate-400">Central NSDL Tax Grid Match</p>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Deposited
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Professional Tax (PT)</p>
                  <p className="text-[10px] text-slate-400">KA, MH, DL Portals Consolidated</p>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Remitted
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">ESI &amp; Health Floater</p>
                  <p className="text-[10px] text-slate-400">Direct Insurance Broker API Sync</p>
                </div>
                <span className="text-blue-700 font-bold text-[11px]">Active</span>
              </div>
            </div>

            <button
              onClick={() => alert('Downloading official Signed Compliance Vault Zip (SHA-256 Verified)...')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Compliance Vault Zip (Signed)</span>
            </button>
          </div>

          {/* PayPilot Admin Copilot Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#4648d4]/10 via-indigo-50/50 to-white border border-indigo-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#4648d4] text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  PayPilot Admin Copilot
                </h3>
                <p className="text-[10px] text-slate-500">Natural language ops &amp; ledger inspection</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Ask questions across all payroll cycles, state tax brackets, employee queries, or anomaly reports.
            </p>

            {/* Quick Prompts */}
            <div className="flex flex-col gap-1.5 text-xs">
              <button
                onClick={() => handleCopilotSubmit('Export Oct Reconciliation Report')}
                className="text-left px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-slate-700 hover:text-[#4648d4] border border-slate-200 text-[11px] font-semibold transition-all cursor-pointer"
              >
                “Export Oct Reconciliation Report”
              </button>
              <button
                onClick={() => handleCopilotSubmit('View Anomalies by Dept')}
                className="text-left px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-slate-700 hover:text-[#4648d4] border border-slate-200 text-[11px] font-semibold transition-all cursor-pointer"
              >
                “View Anomalies by Dept”
              </button>
              <button
                onClick={() => handleCopilotSubmit('Simulate 6% Increment Impact')}
                className="text-left px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-slate-700 hover:text-[#4648d4] border border-slate-200 text-[11px] font-semibold transition-all cursor-pointer"
              >
                “Simulate 6% Increment Impact”
              </button>
            </div>

            {/* Copilot Response Feed */}
            {copilotResponses.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {copilotResponses.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-indigo-100 text-xs space-y-1">
                    <p className="font-bold text-[#4648d4] text-[11px]">“{item.query}”</p>
                    <p className="text-slate-700 leading-relaxed text-[11px]">{item.response}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCopilotSubmit(copilotQuery);
              }}
              className="relative flex items-center pt-1"
            >
              <input
                type="text"
                value={copilotQuery}
                onChange={(e) => setCopilotQuery(e.target.value)}
                placeholder="Query PayPilot Core..."
                className="w-full h-11 pl-3.5 pr-10 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#4648d4]"
              />
              <button
                type="submit"
                disabled={!copilotQuery.trim()}
                className="absolute right-2 w-7 h-7 rounded-lg bg-[#4648d4] hover:bg-indigo-600 disabled:opacity-40 text-white flex items-center justify-center cursor-pointer transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Cluster Inspect Modal */}
      {inspectCluster && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">{inspectCluster}</h3>
              </div>
              <button
                onClick={() => setInspectCluster(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Anomaly cluster trace extracted from Keka Biometrics, Slack bot webhook, and Section 192 tax ledger. 3 of these events can be auto-resolved via AI recommendation.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-700">
              <p>• <strong>Kiran Sharma (EMP-109293):</strong> Oct 14 unapproved absence (Slack manager sign-off verified).</p>
              <p>• <strong>Rohan Verma (EMP-108191):</strong> Oct 11 half-day biometric gate punch missing.</p>
              <p>• <strong>Devika Rao (EMP-107620):</strong> Oct 22 sprint remote shift.</p>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setInspectCluster(null)}
                className="px-4 py-2 rounded-xl bg-[#4648d4] text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
