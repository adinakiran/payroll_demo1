/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { OverviewScreen } from './components/screens/OverviewScreen';
import { MyPayrollScreen } from './components/screens/MyPayrollScreen';
import { PayslipScreen } from './components/screens/PayslipScreen';
import { InvestigatorScreen } from './components/screens/InvestigatorScreen';
import { LeaveAttendanceScreen } from './components/screens/LeaveAttendanceScreen';
import { SupportTicketsScreen } from './components/screens/SupportTicketsScreen';
import { HROpsCommandCenter } from './components/screens/HROpsCommandCenter';
import { BenefitsScreen } from './components/screens/BenefitsScreen';
import { DocumentsScreen } from './components/screens/DocumentsScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { MathBreakdownModal } from './components/modals/MathBreakdownModal';
import { RegularizationModal } from './components/modals/RegularizationModal';
import { RaiseTicketModal } from './components/modals/RaiseTicketModal';
import { UploadPayslipModal } from './components/modals/UploadPayslipModal';
import { ScreenType, UserPersona, SupportTicket } from './types/payroll';
import { CheckCircle2, X, UploadCloud } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [persona, setPersona] = useState<UserPersona>('employee');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('overview');
  const [selectedPayslipId, setSelectedPayslipId] = useState('PP-2024-10-9942');

  // Modals state
  const [isMathModalOpen, setIsMathModalOpen] = useState(false);
  const [isRegularizeModalOpen, setIsRegularizeModalOpen] = useState(false);
  const [isRaiseTicketModalOpen, setIsRaiseTicketModalOpen] = useState(false);
  const [isUploadPayslipModalOpen, setIsUploadPayslipModalOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; sub?: string } | null>(null);

  const showToast = (message: string, sub?: string) => {
    setToast({ message, sub });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLogin = (selectedPersona: UserPersona) => {
    setPersona(selectedPersona);
    setIsLoggedIn(true);
    if (selectedPersona === 'hr-ops') {
      setCurrentScreen('hr-command-center');
    } else {
      setCurrentScreen('overview');
    }
    showToast(
      `Signed in as ${selectedPersona === 'employee' ? 'Kiran Sharma' : 'HR Operations Lead'}`,
      'Session token verified via Google Enterprise Workspace SSO'
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSwitchPersona = (newPersona: UserPersona) => {
    setPersona(newPersona);
    if (newPersona === 'hr-ops') {
      setCurrentScreen('hr-command-center');
    } else {
      setCurrentScreen('overview');
    }
    showToast(
      `Switched context to ${newPersona === 'employee' ? 'Employee View (Kiran Sharma)' : 'HR & Operations Command Center'}`
    );
  };

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPayslip = (payslipId?: string) => {
    if (payslipId) setSelectedPayslipId(payslipId);
    setCurrentScreen('payslip-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegularizationSuccess = () => {
    setIsRegularizeModalOpen(false);
    showToast(
      'Regularization Submitted!',
      'Dispute ticket PAY-10293 created and queued for HR Specialist review.'
    );
  };

  const handleTicketCreated = (newTicket: SupportTicket) => {
    setIsRaiseTicketModalOpen(false);
    showToast(
      `Ticket ${newTicket.id} Submitted`,
      'PayPilot Autonomous Diagnostic Fleet assigned.'
    );
    setCurrentScreen('support-tickets');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased selection:bg-[#4648d4]/10 selection:text-[#4648d4]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        ticketBadgeCount={1}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          currentPersona={persona}
          onSwitchPersona={handleSwitchPersona}
          onLogout={handleLogout}
          onOpenNotifications={() => setCurrentScreen('notifications')}
          unreadCount={2}
        />

        {/* Screen Showcase Toolbar */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-6 py-2 flex items-center justify-between text-xs overflow-x-auto gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              QUICK SCREEN NAVIGATOR:
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: 'overview' as ScreenType, label: 'Overview (Img 5)' },
                { id: 'my-payroll' as ScreenType, label: 'My Payroll (Img 9)' },
                { id: 'payslip-detail' as ScreenType, label: 'Payslip (Img 3)' },
                { id: 'ai-assistant' as ScreenType, label: 'AI Investigator (Img 1)' },
                { id: 'leave-attendance' as ScreenType, label: 'Attendance (Img 7)' },
                { id: 'support-tickets' as ScreenType, label: 'Tickets (Img 11)' },
                { id: 'hr-command-center' as ScreenType, label: 'HR Command (Img 13)' },
                { id: 'benefits' as ScreenType, label: 'Benefits' },
                { id: 'documents' as ScreenType, label: 'Documents' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => {
                    if (btn.id === 'hr-command-center') {
                      setPersona('hr-ops');
                    } else if (persona === 'hr-ops') {
                      setPersona('employee');
                    }
                    handleNavigate(btn.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer shrink-0 ${
                    currentScreen === btn.id
                      ? 'bg-[#4648d4] text-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {btn.label}
                </button>
              ))}

              <button
                onClick={() => setIsUploadPayslipModalOpen(true)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-50 text-[#4648d4] hover:bg-indigo-100 border border-indigo-200 transition cursor-pointer shrink-0 flex items-center gap-1 shadow-2xs"
              >
                <UploadCloud className="w-3 h-3" />
                <span>Upload Payslip</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-[11px] text-slate-500 hover:text-slate-900 font-medium px-2 py-0.5 rounded hover:bg-white transition cursor-pointer"
            >
              View Login Screen (Img 16/18) →
            </button>
          </div>
        </div>

        {/* Page Content Viewport */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {persona === 'hr-ops' || currentScreen === 'hr-command-center' ? (
            <HROpsCommandCenter
              onNavigate={handleNavigate}
              onKiranApproved={() => {
                showToast(
                  'Regularization Approved!',
                  '₹1,000 deduction reversal scheduled for November disbursal.'
                );
              }}
            />
          ) : currentScreen === 'overview' ? (
            <OverviewScreen
              onNavigate={handleNavigate}
              onRequestTimeOff={() => setIsRegularizeModalOpen(true)}
              onRaiseIssue={() => setIsRaiseTicketModalOpen(true)}
              onOpenUploadPayslip={() => setIsUploadPayslipModalOpen(true)}
            />
          ) : currentScreen === 'my-payroll' ? (
            <MyPayrollScreen
              onNavigate={handleNavigate}
              onOpenPayslip={handleOpenPayslip}
              onOpenUploadPayslip={() => setIsUploadPayslipModalOpen(true)}
            />
          ) : currentScreen === 'payslip-detail' ? (
            <PayslipScreen
              onNavigate={handleNavigate}
              selectedPayslipId={selectedPayslipId}
            />
          ) : currentScreen === 'ai-assistant' ? (
            <InvestigatorScreen
              onNavigate={handleNavigate}
              onOpenMathBreakdown={() => setIsMathModalOpen(true)}
              onOpenDispute={() => setIsRegularizeModalOpen(true)}
              onOpenUploadPayslip={() => setIsUploadPayslipModalOpen(true)}
            />
          ) : currentScreen === 'leave-attendance' ? (
            <LeaveAttendanceScreen
              onNavigate={handleNavigate}
              onRequestLeave={() => setIsRegularizeModalOpen(true)}
              onResolveDispute={() => setIsRegularizeModalOpen(true)}
            />
          ) : currentScreen === 'support-tickets' ? (
            <SupportTicketsScreen
              onNavigate={handleNavigate}
              onOpenRegularize={() => setIsRegularizeModalOpen(true)}
              onOpenNewTicket={() => setIsRaiseTicketModalOpen(true)}
            />
          ) : currentScreen === 'benefits' ? (
            <BenefitsScreen />
          ) : currentScreen === 'documents' ? (
            <DocumentsScreen />
          ) : currentScreen === 'notifications' ? (
            <NotificationsScreen onNavigate={handleNavigate} />
          ) : (
            <OverviewScreen
              onNavigate={handleNavigate}
              onRequestTimeOff={() => setIsRegularizeModalOpen(true)}
              onRaiseIssue={() => setIsRaiseTicketModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <MathBreakdownModal
        isOpen={isMathModalOpen}
        onClose={() => setIsMathModalOpen(false)}
        onDispute={() => {
          setIsMathModalOpen(false);
          setIsRegularizeModalOpen(true);
        }}
      />

      <RegularizationModal
        isOpen={isRegularizeModalOpen}
        onClose={() => setIsRegularizeModalOpen(false)}
        onSubmitSuccess={handleRegularizationSuccess}
      />

      <RaiseTicketModal
        isOpen={isRaiseTicketModalOpen}
        onClose={() => setIsRaiseTicketModalOpen(false)}
        onTicketCreated={handleTicketCreated}
      />

      <UploadPayslipModal
        isOpen={isUploadPayslipModalOpen}
        onClose={() => setIsUploadPayslipModalOpen(false)}
        onDisputeGenerated={(data) => {
          setIsRegularizeModalOpen(true);
          showToast(
            'Dispute Form Pre-filled',
            `Attached ${data.fileName} with detected LOP discrepancy`
          );
        }}
      />

      {/* Global Floating Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-start gap-3 max-w-md animate-in slide-in-from-bottom-5">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold leading-tight">{toast.message}</p>
            {toast.sub && (
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                {toast.sub}
              </p>
            )}
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
