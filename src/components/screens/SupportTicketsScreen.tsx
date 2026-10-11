import React, { useState } from 'react';
import {
  LifeBuoy,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Paperclip,
  Send,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  FileText,
  User,
  Filter,
  Download,
} from 'lucide-react';
import { INITIAL_TICKETS, CURRENT_USER } from '../../data/mockData';
import { ScreenType, SupportTicket } from '../../types/payroll';

interface SupportTicketsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenRegularize: () => void;
  onOpenNewTicket: () => void;
}

export const SupportTicketsScreen: React.FC<SupportTicketsScreenProps> = ({
  onNavigate,
  onOpenRegularize,
  onOpenNewTicket,
}) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [activeCategory, setActiveCategory] = useState('All Types');
  const [activeStatusFilter, setActiveStatusFilter] = useState('Under AI Investigation');
  const [chatInput, setChatInput] = useState('');
  const [proofSubmitted, setProofSubmitted] = useState(false);

  const activeTicket = tickets[0];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      senderName: CURRENT_USER.name,
      time: 'Just now',
      text: text,
    };

    const updatedMessages = [...activeTicket.chatMessages, newMsg];
    setTickets((prev) =>
      prev.map((t) => (t.id === activeTicket.id ? { ...t, chatMessages: updatedMessages } : t))
    );
    setChatInput('');

    // Trigger instant autonomous agent response
    setTimeout(() => {
      let replyText = '';
      if (text.toLowerCase().includes('jira') || text.toLowerCase().includes('worked from home')) {
        replyText =
          'Thanks for the telemetry update! Jira sprint ticket #FE-8422 confirmed 7 commits on Oct 14. We have attached this validation to Node 4. Queued for Senior Payroll Ops Lead Ananya Roy to dispatch the ₹1,000 credit.';
        setProofSubmitted(true);
      } else if (text.toLowerCase().includes('tds') || text.toLowerCase().includes('surcharge')) {
        replyText =
          'The ₹500 TDS surcharge was recalculated because quarterly variable performance milestones pushed year-to-date taxable salary over the standard slab forecast. Section 192 requires this normalization.';
      } else {
        replyText =
          'Understood. Your feedback has been logged to audit hash #AG-991. An automated notification has been dispatched to HR Specialist Ananya Roy.';
      }

      const agentReply = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent' as const,
        senderName: 'PayPilot AI Investigator',
        time: 'Just now',
        text: replyText,
      };

      setTickets((prev) =>
        prev.map((t) =>
          t.id === activeTicket.id ? { ...t, chatMessages: [...updatedMessages, agentReply] } : t
        )
      );
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-slate-50 border border-indigo-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 text-[11px] font-bold text-[#4648d4] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SELF-HEALING PAYROLL OPERATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Support &amp; Payroll Tickets
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Track, escalate, and resolve payroll anomalies with autonomous AI-first diagnostics and tier-2 HR payroll specialists.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-center">
          <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase">AUTONOMOUS SLA</span>
            <span className="text-emerald-700 font-extrabold">&lt; 18 mins avg.</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <button
            onClick={onOpenNewTicket}
            className="h-10 px-4 rounded-xl bg-[#4648d4] hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#4648d4]/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Raise New Ticket</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Ticket ID, keyword, or tax period..."
            className="w-full h-10 pl-10 pr-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#4648d4]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">CATEGORY:</span>
          {['All Types', 'Tax TDS', 'Leave / LOP', 'Reimbursements', 'Salary Delta'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#4648d4] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs (All Tickets 7, Open 1, etc.) */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        {[
          { label: 'All Tickets', count: 7 },
          { label: 'Open', count: 1 },
          { label: 'Under AI Investigation', count: 1 },
          { label: 'Awaiting HR Review', count: 0 },
          { label: 'Resolved', count: 5 },
        ].map((tab) => {
          const isActive = activeStatusFilter === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveStatusFilter(tab.label)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-50 border-indigo-200 text-[#4648d4] font-bold shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-[#4648d4] text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Ticket Detailed Investigation Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Ticket Header, Resolution Trail, Actions, Chat */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Header & Stats */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold font-mono text-[#4648d4]">
                  {activeTicket.id}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
                  • {activeTicket.priority} Priority
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-xs text-slate-400">{activeTicket.filedAgo}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-1.5">
                {activeTicket.title}
              </h2>

              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Investigation In Progress • Node 4/5</span>
              </div>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-100 text-xs">
              <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100">
                <span className="text-[10px] font-bold uppercase text-rose-600 block">
                  DETECTED VARIANCE
                </span>
                <div className="text-base font-extrabold text-rose-700 mt-1">
                  -₹1,500.00
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Oct 31 Disbursal Cycle</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  IDENTIFIED ROOT CAUSES
                </span>
                <div className="space-y-0.5 mt-1 font-semibold text-slate-800 text-xs">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold mr-1">
                    1 Day LOP (-₹1,000)
                  </span>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">
                    TDS Surcharge (-₹500)
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <span className="text-[10px] font-bold uppercase text-[#4648d4] block">
                  PROJECTED RESOLUTION
                </span>
                <div className="text-xs font-bold text-slate-900 mt-1">
                  Reversal in Nov Cycle
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">Subject to attendance proof</p>
              </div>
            </div>
          </div>

          {/* MULTI-AGENT RESOLUTION TRAIL */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4648d4]" />
                <h3 className="text-sm font-bold text-slate-900">MULTI-AGENT RESOLUTION TRAIL</h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Autonomous execution graph #AG-991
              </span>
            </div>

            <div className="space-y-4">
              {/* Node 1 */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Node 1: Anomaly Flagged &amp; Ingested</span>
                    <span className="text-[10px] text-slate-400">Oct 31, 09:32 AM</span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Reported by Kiran Sharma via Payroll Investigator prompt. "Net disbursal lower than expected compensation baseline."
                  </p>
                </div>
              </div>

              {/* Node 2 */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Node 2: Autonomous Ledger Decomposition</span>
                    <span className="text-[10px] text-slate-400">Oct 31, 09:32 AM</span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    PayPilot Autonomous Diagnostic completed in 400ms. Isolated 1 day Loss of Pay deduction (₹1,000) and quarterly section 192 TDS catch-up (₹500).
                  </p>
                </div>
              </div>

              {/* Node 3 */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Node 3: HRMS Biometric Cross-Verification</span>
                    <span className="text-[10px] text-slate-400">Oct 31, 09:33 AM</span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    Interrogated Keka Biometric logs. Found absent record on Oct 14, 2024. VPN telemetry reveals 6.8 hrs active connection during the identical window.
                  </p>
                </div>
              </div>

              {/* Node 4 (Active / Action Required) */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-[#4648d4] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 animate-spin" />
                </div>
                <div className="flex-1 bg-indigo-50/40 p-4 rounded-2xl border border-indigo-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        Node 4: Regularization Proposal Prepared
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4648d4] text-white">
                        ACTION REQUIRED
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-[#4648d4]">Current Phase</span>
                  </div>

                  <p className="text-slate-700 leading-relaxed">
                    Autonomous proposal: Kiran can validate work log or supervisor override to instantly credit back <strong className="text-slate-900">₹1,000</strong>. The remaining ₹500 TDS adjustment is statutorily compliant and cannot be reversed.
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      onClick={onOpenRegularize}
                      className="px-3.5 py-2 rounded-xl bg-[#4648d4] hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
                    >
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>Attach Proof / Regularize Attendance</span>
                    </button>

                    <button
                      onClick={() =>
                        alert(
                          'VPN Session Log: Oct 14, 2024 (09:12 to 17:48). Total Active Bytes: 4.2GB. IP: BLR-ACT-FIBER. Verified.'
                        )
                      }
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Review Oct 14 VPN Log</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Node 5 */}
              <div className="flex items-start gap-3 text-xs opacity-75">
                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold">5</span>
                </div>
                <div className="flex-1 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">
                      Node 5: Human Ops Final Sign-Off &amp; Credit Dispatch
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Queued (SLA 4h)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-slate-500">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
                      alt="Ananya Roy"
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span className="text-[11px]">Assigned: Ananya Roy (Senior Payroll Ops Lead)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Autonomous Workspace Chat */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-[#4648d4]" />
                <h3 className="text-sm font-bold text-slate-900">Autonomous Workspace Chat</h3>
              </div>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Ananya Roy is active
              </span>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  handleSendMessage('I worked from home on Oct 14, here is the Jira sprint log')
                }
                className="px-3 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-[#4648d4] font-semibold text-[11px] transition-colors cursor-pointer"
              >
                “I worked from home on Oct 14, here is the Jira sprint log”
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSendMessage('Why was the ₹500 TDS surcharge applied?')
                }
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] transition-colors cursor-pointer"
              >
                “Why was the ₹500 TDS surcharge applied?”
              </button>
            </div>

            {/* Messages Thread */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {activeTicket.chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-50/80 border border-indigo-100 ml-8 text-slate-800'
                      : msg.sender === 'system'
                      ? 'bg-slate-50 border border-slate-100 text-slate-500 font-mono text-[11px]'
                      : 'bg-white border border-slate-200/80 mr-8 text-slate-700 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      {msg.avatar && (
                        <img
                          src={msg.avatar}
                          alt={msg.senderName}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                      )}
                      <span>{msg.senderName}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Input Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 pt-2 border-t border-slate-100"
            >
              <button
                type="button"
                onClick={onOpenRegularize}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
                title="Attach Document"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message or drop supportive documents..."
                className="flex-1 h-10 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#4648d4]"
              />

              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="h-10 px-4 rounded-xl bg-[#4648d4] hover:bg-indigo-600 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Right 1 Col: AI Diagnostic Core, SLAs, Proof Banner */}
        <div className="space-y-6">
          {/* AI Diagnostic Core Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4648d4]" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  AI Diagnostic Core
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                99.4% Confidence
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              PayPilot parsed 14 telemetry streams including punch records, income tax slab transitions, and company-wide calendar holidays to construct this diagnostic breakdown.
            </p>

            {/* Sync Statuses */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">HRMS SYNC</span>
                  <span className="font-bold text-slate-900">• Keka HR 2.4</span>
                </div>
                <span className="text-[11px] text-slate-400">Synced 12m ago</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">TAX MODEL</span>
                  <span className="font-bold text-slate-900">• New Regime 24–25</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold">Sec 115BAC verified</span>
              </div>
            </div>

            {/* Variance Attribution Ratio */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-slate-400">
                  Variance Attribution Ratio
                </span>
                <span className="font-bold text-slate-900">₹1,500 Total</span>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                <div className="bg-rose-500 h-full" style={{ width: '66.7%' }}></div>
                <div className="bg-indigo-600 h-full" style={{ width: '33.3%' }}></div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  66.7% LOP (Disputable)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  33.3% TDS (Fixed)
                </span>
              </div>
            </div>

            {/* Escalation Protocol & SLA */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                ESCALATION PROTOCOL &amp; SLA
              </span>

              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Auto-Diagnostic (L1)
                </span>
                <span className="font-semibold text-emerald-700">0m (Instant)</span>
              </div>

              <div className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  Specialist Review (L2)
                </span>
                <span className="font-semibold text-[#4648d4]">SLA 4h (3h 18m left)</span>
              </div>

              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Payroll Director Escalation</span>
                <span>If &gt; 24h</span>
              </div>
            </div>
          </div>

          {/* Attendance Proof Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Attendance Proof Submitted</span>
            </div>
            <p className="text-emerald-800 leading-relaxed text-[11px]">
              Node 4 updated. Queued for Senior Payroll Specialist Ananya Roy's sign-off.
            </p>
            <button
              onClick={() => onNavigate('documents')}
              className="text-[#4648d4] font-bold text-xs hover:underline flex items-center gap-1 pt-1 cursor-pointer"
            >
              <span>Browse Knowledge Base (14 Articles)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Resolved Ticket History Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Resolved Ticket History</h3>
            <p className="text-xs text-slate-400">
              Audit trail of previously adjudicated salary queries, tax forms, and account adjustments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter Archive</span>
            </button>
            <button
              onClick={() => alert('Exporting full resolved tickets history to CSV...')}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">TICKET ID &amp; ISSUE SUBJECT</th>
                <th className="py-3 px-5">CATEGORY</th>
                <th className="py-3 px-5">STATUS &amp; VERIFICATION</th>
                <th className="py-3 px-5">RESOLUTION SPEED</th>
                <th className="py-3 px-5">RESOLVED ON</th>
                <th className="py-3 px-5 text-right">AUDIT ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Tax Exemption Form 12BB Proof Re-upload</p>
                      <p className="text-[11px] text-slate-400">PAY-09841 • Rent receipts accepted</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Tax TDS &amp; 12BB
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    • Resolved
                  </span>
                </td>
                <td className="py-4 px-5 font-medium text-slate-600">Resolved in 14 mins by AI</td>
                <td className="py-4 px-5 text-slate-500">Oct 12, 2024</td>
                <td className="py-4 px-5 text-right">
                  <button
                    onClick={() => alert('Ledger log #PAY-09841: Validated under Section 10(13A).')}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    View Ledger Log
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-[#4648d4] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">August Performance Incentive Crediting Confirmation</p>
                      <p className="text-[11px] text-slate-400">PAY-08912 • Q2 Bonus variable payout</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Salary Delta
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    • Resolved
                  </span>
                </td>
                <td className="py-4 px-5 font-medium text-slate-600">Resolved in 2.1 hrs by HR Ops</td>
                <td className="py-4 px-5 text-slate-500">Sep 02, 2024</td>
                <td className="py-4 px-5 text-right">
                  <button
                    onClick={() => alert('Ledger log #PAY-08912: Bonus calculation formula signed by VP Eng.')}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    View Ledger Log
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Bank IFSC Code Update for HDFC Salary Account</p>
                      <p className="text-[11px] text-slate-400">PAY-07654 • Branch merger verification</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Disbursal / Banking
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    • Resolved
                  </span>
                </td>
                <td className="py-4 px-5 font-medium text-slate-600">Resolved in 6 mins by AI</td>
                <td className="py-4 px-5 text-slate-500">Jul 18, 2024</td>
                <td className="py-4 px-5 text-right">
                  <button
                    onClick={() => alert('Ledger log #PAY-07654: Penny drop test passed: HDFC Bank IFSC HDFC0000240.')}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    View Ledger Log
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
