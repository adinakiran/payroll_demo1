import React from 'react';
import {
  LayoutGrid,
  Wallet,
  Calendar,
  ShieldCheck,
  FolderClosed,
  Bot,
  Ticket,
  Bell,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { ScreenType } from '../types/payroll';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  ticketBadgeCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  ticketBadgeCount = 1,
}) => {
  const navItems = [
    { id: 'overview' as ScreenType, label: 'Overview', icon: LayoutGrid },
    { id: 'my-payroll' as ScreenType, label: 'My Payroll', icon: Wallet },
    { id: 'leave-attendance' as ScreenType, label: 'Leave & Attendance', icon: Calendar },
    { id: 'benefits' as ScreenType, label: 'Benefits', icon: ShieldCheck },
    { id: 'documents' as ScreenType, label: 'Documents', icon: FolderClosed },
    {
      id: 'ai-assistant' as ScreenType,
      label: 'AI Assistant',
      icon: Bot,
      highlight: true,
      sparkle: true,
    },
    {
      id: 'support-tickets' as ScreenType,
      label: 'Support Tickets',
      icon: Ticket,
      badge: ticketBadgeCount > 0 ? ticketBadgeCount : undefined,
    },
    { id: 'notifications' as ScreenType, label: 'Notifications', icon: Bell },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
      <div>
        {/* Logo Section */}
        <div className="p-6 pb-5 flex items-center gap-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4648d4] to-indigo-600 shadow-md shadow-[#4648d4]/20 flex items-center justify-center text-white">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900">PayPilot AI</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">Intelligent Operations</p>
          </div>
        </div>

        {/* Navigation Core */}
        <div className="px-4 py-5">
          <p className="px-3 text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">
            OPERATIONS CORE
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentScreen === item.id ||
                (item.id === 'my-payroll' && currentScreen === 'payslip-detail');

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-[#EEF2FF] text-[#4648d4] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#4648d4]' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.sparkle && (
                      <span className="w-2 h-2 rounded-full bg-[#4648d4] animate-pulse"></span>
                    )}
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Compliance Card */}
      <div className="p-4 m-3 rounded-xl bg-blue-50/60 border border-blue-100/80">
        <div className="flex items-start gap-2.5">
          <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center text-[#4648d4] shrink-0 mt-0.5">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
              SOC2 Type II Certified
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
              Autonomous compliance monitoring active across India &amp; APAC.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
