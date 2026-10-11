import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { ScreenType } from '../../types/payroll';

interface NotificationsScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onNavigate }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'October 2024 Salary Credited',
      desc: '₹1,94,500.00 has been credited to your HDFC bank account ••••4102 via IMPS/NEFT.',
      time: 'Today at 09:30 AM',
      read: false,
      type: 'success',
      actionScreen: 'my-payroll' as ScreenType,
      actionText: 'View Payslip',
    },
    {
      id: 2,
      title: 'AI Variance Explanation Ready',
      desc: 'PayPilot detected a -₹1,500 difference compared to September. Click to examine root cause (1 day LOP + ₹500 TDS adjustment).',
      time: 'Today at 08:45 AM',
      read: false,
      type: 'ai',
      actionScreen: 'ai-assistant' as ScreenType,
      actionText: 'Open AI Investigator',
    },
    {
      id: 3,
      title: 'Ticket PAY-10293 Status Update',
      desc: 'HR Specialist Rohit Sen is reviewing your Oct 14 Attendance Regularization request with attached Slack screenshots.',
      time: 'Yesterday at 04:15 PM',
      read: true,
      type: 'info',
      actionScreen: 'support-tickets' as ScreenType,
      actionText: 'View Ticket',
    },
    {
      id: 4,
      title: 'Diwali Festive Holiday Notice',
      desc: 'Offices will remain closed on Oct 31 and Nov 01 for Deepavali. Shift schedules have been adjusted.',
      time: '2 days ago',
      read: true,
      type: 'info',
      actionScreen: 'leave-attendance' as ScreenType,
      actionText: 'Check Calendar',
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#4648d4] bg-indigo-50 px-2 py-0.5 rounded-md">
              LIVE NOTIFICATION FEED
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {notifications.filter((n) => !n.read).length} unread alerts
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Notifications &amp; Activity Feed
          </h1>
        </div>

        <button
          onClick={markAllRead}
          className="px-3 py-1.5 text-xs font-bold text-[#4648d4] bg-indigo-50 hover:bg-indigo-100 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Mark all as read</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition ${
              item.read
                ? 'bg-white border-slate-200/80'
                : 'bg-indigo-50/30 border-indigo-200 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    item.type === 'ai'
                      ? 'bg-purple-100 text-[#4648d4]'
                      : item.type === 'success'
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {item.type === 'ai' ? (
                    <Sparkles className="w-4 h-4" />
                  ) : item.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Bell className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#4648d4]"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </p>
                </div>
              </div>

              {item.actionScreen && (
                <button
                  onClick={() => onNavigate(item.actionScreen)}
                  className="px-3 py-1.5 text-xs font-bold text-[#4648d4] bg-white border border-indigo-200 rounded-xl hover:bg-indigo-50 transition shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
