import React, { useState } from 'react';
import {
  Sparkles,
  History,
  Plus,
  Lock,
  Clock,
  Cloud,
  Cpu,
  Zap,
  Landmark,
  BookOpen,
  ArrowUp,
  FileSpreadsheet,
  Calendar,
  LifeBuoy,
  Download,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  Info,
  UploadCloud,
  FileCheck,
} from 'lucide-react';
import { CURRENT_USER, INVESTIGATION_NODES, DISCREPANCY_FACTORS } from '../../data/mockData';
import { ScreenType } from '../../types/payroll';

interface InvestigatorScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenMathBreakdown: () => void;
  onOpenDispute: () => void;
  onOpenUploadPayslip?: () => void;
}

export const InvestigatorScreen: React.FC<InvestigatorScreenProps> = ({
  onNavigate,
  onOpenMathBreakdown,
  onOpenDispute,
  onOpenUploadPayslip,
}) => {
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { role: 'user' | 'assistant'; text: string; timestamp: string }[]
  >([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAskQuestion = async (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg = {
      role: 'user' as const,
      text: questionText,
      timestamp: 'Just now',
    };
    setChatHistory((prev) => [...prev, userMsg]);
    setFollowUpQuestion('');
    setIsAnalyzing(true);

    // Generate smart context-aware answer
    setTimeout(() => {
      let aiReply = '';
      const q = questionText.toLowerCase();

      if (q.includes('medical proof') || q.includes('regularization') || q.includes('oct 14')) {
        aiReply =
          'To submit medical proof or manager approval for Oct 14: You can click the "Dispute Leave Record" button above or regularize attendance directly. Once uploaded, Ticket PAY-10293 will automatically move to Node 5 for approval, and the ₹1,000 LOP deduction will be reimbursed in your November payroll cycle.';
      } else if (q.includes('tds') || q.includes('tax')) {
        aiReply =
          'The ₹500 TDS adjustment occurred because your Q2 YTD actual taxable income exceeded the initial projection by ₹4,166. Under Section 192 (New Regime Sec 115BAC), PayPilot recalibrated the monthly withholding to prevent an end-of-year tax lump sum in March 2025.';
      } else if (q.includes('projected') || q.includes('november') || q.includes('next month')) {
        aiReply =
          'Projected November 2024 Net Pay: ₹1,85,500 to ₹1,86,500. Assuming standard 22 working days without LOP and with the regularized ₹1,000 reversal credited, your take-home pay will normalize back to baseline.';
      } else if (q.includes('leave balance') || q.includes('forecast')) {
        aiReply =
          'Your available leave balance is currently 18.5 days (12 Annual, 4.5 Sick, 0 Casual). Notice: corporate policy caps year-end carryover at 10 days into 2025. 4.5 days risk lapsing unless taken before Dec 31.';
      } else {
        aiReply = `PayPilot Autonomous Diagnostic analyzed: "${questionText}". All audit logs indicate that your salary was calculated strictly in compliance with Section 192 and the Acme HR Handbook §4.2. No other anomalies or discrepancies exist on your account.`;
      }

      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: aiReply,
          timestamp: 'Just now',
        },
      ]);
      setIsAnalyzing(false);
    }, 900);
  };

  const getNodeIcon = (iconType: string) => {
    switch (iconType) {
      case 'cloud':
        return <Cloud className="w-3.5 h-3.5 text-blue-500" />;
      case 'fingerprint':
        return <Cpu className="w-3.5 h-3.5 text-rose-500" />;
      case 'bolt':
        return <Zap className="w-3.5 h-3.5 text-purple-500" />;
      case 'landmark':
        return <Landmark className="w-3.5 h-3.5 text-cyan-600" />;
      case 'book':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#4648d4]" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-indigo-50/70 via-blue-50/40 to-slate-50 border border-indigo-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 text-[11px] font-bold text-slate-700 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Autonomous Diagnostic Engine v2.4 • SOC2 Audited</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Payroll Investigator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Let AI investigate your payroll questions, anomalies, and policy reconciliations across connected enterprise systems in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
          {onOpenUploadPayslip && (
            <button
              onClick={onOpenUploadPayslip}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#4648d4] to-indigo-600 hover:from-[#3b3dbb] hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#4648d4]/25 cursor-pointer transition"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload &amp; Investigate Payslip</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('support-tickets')}
            className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>Past Inquiries</span>
          </button>

          <button
            onClick={() => {
              setChatHistory([]);
              alert('Triggered fresh deep telemetry scan across Keka, BambooHR, and Tax grids.');
            }}
            className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Deep Scan</span>
          </button>
        </div>
      </div>

      {/* AI Pulse Active Banner */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
          <span className="font-bold uppercase tracking-wider text-[11px] text-[#4648d4]">
            AI PULSE ACTIVE •
          </span>
          <span className="text-slate-600 font-medium">
            Real-time neural correlation enabled across HRMS, Biometric Attendance, and Central Tax Engine.
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-800 text-[11px] font-semibold self-start sm:self-auto">
          <Lock className="w-3 h-3 text-blue-600" />
          <span>Zero data retention protocol active</span>
        </div>
      </div>

      {/* Main Grid: Left Investigation Trail & Follow-up vs Right Synthesis & Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: User Inquiry & 5 Resolution Nodes */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Inquiry Box */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={CURRENT_USER.avatar}
                  alt={CURRENT_USER.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-50"
                />
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{CURRENT_USER.name}</h3>
                  <p className="text-[11px] text-slate-400">{CURRENT_USER.role}</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Today at 09:32 AM</span>
            </div>

            <div className="pt-2">
              <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                “Why is my salary lower this month?”
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Triggered Autonomous Investigation Pipeline #INV-2024-8841</span>
              </p>
            </div>
          </div>

          {/* Autonomous Resolution Trail */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4648d4]" />
                <h3 className="text-sm font-bold text-slate-900">Autonomous Resolution Trail</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                5 Verification Nodes Completed (1.24s)
              </span>
            </div>

            <div className="space-y-3">
              {INVESTIGATION_NODES.map((node) => {
                const isFlagged = node.statusType === 'flagged';
                return (
                  <div
                    key={node.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isFlagged
                        ? 'bg-rose-50/40 border-rose-200/80'
                        : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isFlagged
                            ? 'bg-rose-100 text-rose-600'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {isFlagged ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900">{node.title}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isFlagged
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {node.statusBadge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {node.description}
                        </p>
                      </div>
                    </div>

                    <div className="self-end sm:self-center shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-2xs">
                        {getNodeIcon(node.systemIcon)}
                        <span>{node.systemTag}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat History & Interactive Ask Follow-Up Question */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Ask follow-up question
            </h3>

            {/* Conversation Flow if any */}
            {chatHistory.length > 0 && (
              <div className="space-y-3 pb-3 border-b border-slate-100 max-h-72 overflow-y-auto pr-1">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-50 border border-indigo-100 text-slate-800 ml-8'
                        : 'bg-slate-50 border border-slate-100 text-slate-700 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[11px] text-slate-900">
                        {msg.role === 'user' ? CURRENT_USER.name : 'PayPilot AI Investigator'}
                      </span>
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
            )}

            {isAnalyzing && (
              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-[#4648d4] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Interrogating biometric logs and tax rules...</span>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion(followUpQuestion);
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                placeholder="e.g., 'How can I submit medical proof for Oct 14?' or 'Show my projected November net pay'"
                className="w-full h-12 pl-4 pr-12 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/20 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!followUpQuestion.trim()}
                className="absolute right-2 w-8 h-8 rounded-xl bg-[#4648d4] hover:bg-indigo-600 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>

            {/* Quick Suggestions Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[11px] text-slate-400 font-medium">Quick suggestions:</span>
              {onOpenUploadPayslip && (
                <button
                  type="button"
                  onClick={onOpenUploadPayslip}
                  className="px-3 py-1 rounded-full bg-indigo-50 text-[#4648d4] font-bold hover:bg-indigo-100 text-[11px] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <UploadCloud className="w-3 h-3" />
                  <span>Upload Payslip PDF to Audit</span>
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  handleAskQuestion('How do I submit attendance regularization for Oct 14?')
                }
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-[#4648d4] text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
              >
                Submit attendance regularization for Oct 14
              </button>
              <button
                type="button"
                onClick={() =>
                  handleAskQuestion('Explain the TDS recalculation breakdown of ₹500')
                }
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-[#4648d4] text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
              >
                Explain TDS recalculation breakdown
              </button>
              <button
                type="button"
                onClick={() => handleAskQuestion('View my leave balance forecast for Q4')}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-[#4648d4] text-slate-600 text-[11px] font-medium transition-colors cursor-pointer"
              >
                View leave balance forecast
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Diagnostic Synthesis + Actionable Next Steps + Ledger Protection */}
        <div className="space-y-6">
          {/* Diagnostic Synthesis Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                DIAGNOSTIC SYNTHESIS
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 flex items-center gap-1 border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                99.8% Confidence
              </span>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                Payroll Difference Identified
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Your net take-home pay decreased by exactly{' '}
                <strong className="text-slate-900">₹1,500</strong> for October 2024.
              </p>
            </div>

            {/* Impact Table */}
            <div className="rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-100 text-xs">
              <div className="p-3 bg-slate-50/80 flex items-center justify-between font-bold text-slate-500 uppercase text-[10px]">
                <span>Factor / Component</span>
                <span>Impact</span>
              </div>

              <div className="p-3 flex items-start justify-between">
                <div>
                  <p className="font-bold text-slate-900">1 Unpaid Leave (Oct 14)</p>
                  <p className="text-[11px] text-slate-400">Daily rate based on 22 working days</p>
                </div>
                <span className="font-bold text-rose-600 text-sm">-₹1,000</span>
              </div>

              <div className="p-3 flex items-start justify-between">
                <div>
                  <p className="font-bold text-slate-900">Tax Adjustment (TDS)</p>
                  <p className="text-[11px] text-slate-400">Quarterly proof shortfall adjustment</p>
                </div>
                <span className="font-bold text-rose-600 text-sm">-₹500</span>
              </div>

              <div className="p-4 bg-rose-50/40 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-rose-600 rounded"></span>
                  <span className="font-bold text-slate-900 text-xs">Net Discrepancy Delta</span>
                </div>
                <span className="text-2xl font-black text-rose-600 tracking-tight">
                  -₹1,500
                </span>
              </div>
            </div>
          </div>

          {/* Actionable Next Steps */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
              ACTIONABLE NEXT STEPS
            </span>

            {/* Button 1: View Mathematical Breakdown */}
            <button
              onClick={onOpenMathBreakdown}
              className="w-full p-3.5 rounded-2xl bg-[#4648d4] hover:bg-indigo-600 text-white font-bold text-xs flex items-center justify-between shadow-md shadow-[#4648d4]/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-4 h-4" />
                <span>View Mathematical Breakdown</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Button 1b: Upload & Investigate Payslip */}
            {onOpenUploadPayslip && (
              <button
                onClick={onOpenUploadPayslip}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 text-[#4648d4] font-bold text-xs flex items-center justify-between transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <UploadCloud className="w-4 h-4 text-[#4648d4]" />
                  <span>Upload &amp; Investigate Payslip</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#4648d4]" />
              </button>
            )}

            {/* Button 2: Dispute Leave Record */}
            <button
              onClick={onOpenDispute}
              className="w-full p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Dispute Leave Record</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Button 3: Raise Ticket to Payroll Desk */}
            <button
              onClick={() => onNavigate('support-tickets')}
              className="w-full p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <LifeBuoy className="w-4 h-4 text-slate-500" />
                <span>Raise Ticket to Payroll Desk</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Button 4: Export Audit Report as PDF */}
            <button
              onClick={() =>
                alert('Exporting official cryptographically-verified Audit Report #INV-2024-8841 as PDF.')
              }
              className="w-full p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-slate-500" />
                <span>Export Audit Report as PDF</span>
              </div>
              <Download className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Continuous Ledger Protection Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&auto=format&fit=crop&q=80"
              alt="Security nodes"
              className="w-12 h-12 rounded-xl object-cover shrink-0"
            />
            <div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                Continuous Ledger Protection
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Every audit trace is hashed and anchored into PayPilot’s immutable compliance logbook.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
