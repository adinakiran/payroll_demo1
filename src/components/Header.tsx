import React, { useState } from 'react';
import { Search, Bell, Shield, LogOut, ChevronDown, Check, Building2, User } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';
import { UserPersona, ScreenType } from '../types/payroll';

interface HeaderProps {
  currentPersona: UserPersona;
  onSwitchPersona: (persona: UserPersona) => void;
  onLogout: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPersona,
  onSwitchPersona,
  onLogout,
  onOpenNotifications,
  unreadCount = 2,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* AI Pulse Status Pill */}
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-xs font-semibold text-slate-700 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-slate-900">AI Pulse:</span>
          <span className="text-slate-500 font-normal">
            Payroll data synchronized • No unusual activity detected
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Search */}
        <div className="relative">
          {searchOpen ? (
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search payslips, tax slabs, tickets..."
                className="w-64 h-9 pl-8 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-[#4648d4]"
                autoFocus
                onBlur={() => !searchQuery && setSearchOpen(false)}
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-xl border border-slate-200/80 hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors"
              title="Quick Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative w-9 h-9 rounded-xl border border-slate-200/80 hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          )}
        </button>

        {/* Portal Switcher Pill */}
        <button
          onClick={() =>
            onSwitchPersona(currentPersona === 'employee' ? 'hr-ops' : 'employee')
          }
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            currentPersona === 'hr-ops'
              ? 'bg-indigo-50 border-indigo-200 text-[#4648d4]'
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-[#4648d4]" />
          <span>{currentPersona === 'employee' ? 'Switch to HR Ops' : 'Switch to Employee'}</span>
        </button>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 pl-2 py-1 pr-1.5 rounded-xl hover:bg-slate-50 transition-colors text-right"
          >
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {CURRENT_USER.name}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {currentPersona === 'employee' ? CURRENT_USER.role : 'HR & Payroll Operations'} • {CURRENT_USER.empId}
              </p>
            </div>
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
              <div className="p-2.5 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">{CURRENT_USER.name}</p>
                <p className="text-[11px] text-slate-400">{CURRENT_USER.email}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#4648d4]">
                  {CURRENT_USER.department}
                </span>
              </div>

              <button
                onClick={() => {
                  onSwitchPersona('employee');
                  setDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg hover:bg-slate-50 text-slate-700 text-left"
              >
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Employee Portal</span>
                </div>
                {currentPersona === 'employee' && <Check className="w-3.5 h-3.5 text-[#4648d4]" />}
              </button>

              <button
                onClick={() => {
                  onSwitchPersona('hr-ops');
                  setDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg hover:bg-slate-50 text-slate-700 text-left"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>HR &amp; Ops Command Center</span>
                </div>
                {currentPersona === 'hr-ops' && <Check className="w-3.5 h-3.5 text-[#4648d4]" />}
              </button>

              <div className="my-1 border-t border-slate-100"></div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 rounded-lg hover:bg-rose-50 text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of PayPilot</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
