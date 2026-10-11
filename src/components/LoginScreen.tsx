import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';
import { UserPersona } from '../types/payroll';

interface LoginScreenProps {
  onLogin: (persona: UserPersona) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [persona, setPersona] = useState<UserPersona>('employee');
  const [email, setEmail] = useState('kiran.sharma@acme.com');
  const [password, setPassword] = useState('••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handlePersonaChange = (newPersona: UserPersona) => {
    setPersona(newPersona);
    if (newPersona === 'employee') {
      setEmail('kiran.sharma@acme.com');
    } else {
      setEmail('ops.lead@acme.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(persona);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-white font-sans text-slate-900 selection:bg-[#4648d4]/20 selection:text-[#4648d4]">
      {/* LEFT HERO COLUMN */}
      <aside className="relative w-full lg:w-[48%] xl:w-[45%] bg-[#F0F4FA] p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200/70">
        {/* Subtle Ambient Decorative Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-200/50 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-28 w-80 h-80 rounded-full bg-teal-100/60 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl pointer-events-none"></div>

        {/* Top Section */}
        <div className="relative z-10">
          {/* Logo & Badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4648d4] to-indigo-600 shadow-md shadow-[#4648d4]/25 flex items-center justify-center text-white font-extrabold tracking-tight">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">PayPilot</span>
                <span className="px-1.5 py-0.5 text-[11px] font-bold tracking-wider uppercase bg-[#4648d4]/10 text-[#4648d4] rounded-md">
                  AI
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-semibold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>AI Pulse Active</span>
            </div>
          </div>

          {/* Headline & Supporting Copy */}
          <div className="space-y-2.5 max-w-lg mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Understand your payroll.<br className="hidden sm:inline" /> Resolve issues faster.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Your intelligent employee &amp; payroll companion. Real-time reconciliation, transparent deductions, and autonomous dispute resolution.
            </p>
          </div>

          {/* Interactive Showcase Card */}
          <div className="rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 p-5 sm:p-6 shadow-xl shadow-slate-200/50 space-y-5">
            {/* Header & Status */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-[#4648d4]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                    PayPilot Continuous Engine
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Auto-reconciliation ledger v4.8</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                In Sync
              </span>
            </div>

            {/* Metric & Sparkline Graphic */}
            <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                  Reconciliation Speed
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">0.42s</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    -98% manual audit
                  </span>
                </div>
              </div>
              <div className="w-24 sm:w-28 h-9">
                <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 100 32">
                  <defs>
                    <linearGradient id="metricGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#4648d4" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#4648d4" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,26 Q20,24 35,16 T70,12 T95,4" fill="none" stroke="#4648d4" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M0,26 Q20,24 35,16 T70,12 T95,4 L95,32 L0,32 Z" fill="url(#metricGrad)" />
                  <circle className="fill-emerald-500 stroke-white stroke-2" cx="95" cy="4" r="3.5" />
                </svg>
              </div>
            </div>

            {/* Verification Nodes Checklist */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Autonomous Verification Nodes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                  <div className="truncate">
                    <span className="text-slate-700 font-medium">Biometrics Ingested</span>
                    <span className="text-[10px] text-slate-400 block">1,420 / 1,420 (100%)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                  <div className="truncate">
                    <span className="text-slate-700 font-medium">Sec 192 Tax Slabs</span>
                    <span className="text-[10px] text-emerald-600 block">Validated &amp; Capped</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                  <div className="truncate">
                    <span className="text-slate-700 font-medium">Bank RTGS/NEFT Rail</span>
                    <span className="text-[10px] text-slate-400 block">Encrypted Handshake OK</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                  <div className="truncate">
                    <span className="text-slate-700 font-medium">₹18.42 Cr Reconciled</span>
                    <span className="text-[10px] text-emerald-600 block">Without Discrepancy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="relative z-10 pt-8 mt-6 border-t border-slate-200/60">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4648d4] shrink-0" />
              <span>256-Bit Bank Grade Encryption</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>ISO 27001 Certified</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4648d4] shrink-0" />
              <span>SOC 2 Type II Audited</span>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT LOGIN FORM */}
      <main className="w-full lg:w-[52%] xl:w-[55%] bg-white flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-7">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500">
              Sign in to access your payroll, benefits, and AI insights.
            </p>
          </div>

          {/* Persona Switcher Tabs */}
          <div className="p-1 bg-slate-100/90 rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => handlePersonaChange('employee')}
              className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all text-center ${
                persona === 'employee'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Employee Self-Service
            </button>
            <button
              type="button"
              onClick={() => handlePersonaChange('hr-ops')}
              className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all text-center ${
                persona === 'hr-ops'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              HR &amp; Ops Portal
            </button>
          </div>

          {/* Credentials Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700" htmlFor="work-id">
                Work Email or Employee ID
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  id="work-id"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/20 transition-all outline-none"
                  placeholder="e.g. kiran.sharma@acme.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700" htmlFor="login-password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to registered email.')}
                  className="text-xs font-semibold text-[#4648d4] hover:text-indigo-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/20 transition-all outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none flex items-center"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#4648d4] border-slate-300 focus:ring-[#4648d4]/30 accent-[#4648d4] cursor-pointer"
                />
                <span className="text-xs text-slate-600">Remember this device for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-11 px-5 mt-2 bg-gradient-to-r from-[#4648d4] via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-semibold text-sm rounded-xl shadow-lg shadow-[#4648d4]/25 hover:shadow-indigo-500/35 transition-all flex items-center justify-center gap-2 active:scale-[0.99] group cursor-pointer"
            >
              <span>Sign In to PayPilot ({persona === 'employee' ? 'Employee' : 'HR Ops'})</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* SSO Divider */}
          <div className="relative flex items-center justify-center pt-1">
            <div className="w-full border-t border-slate-200"></div>
            <span className="absolute px-3 bg-white text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Or continue with enterprise SSO
            </span>
          </div>

          {/* SSO Buttons */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => onLogin(persona)}
              className="h-10 px-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs font-medium text-slate-700 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span className="truncate">Google</span>
            </button>

            <button
              type="button"
              onClick={() => onLogin(persona)}
              className="h-10 px-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs font-medium text-slate-700 cursor-pointer"
            >
              <svg className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" fill="none" r="10" stroke="currentColor" strokeWidth="4" />
              </svg>
              <span className="truncate">Okta SSO</span>
            </button>

            <button
              type="button"
              onClick={() => onLogin(persona)}
              className="h-10 px-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs font-medium text-slate-700 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path d="M1 1h10v10H1z" fill="#F25022" />
                <path d="M1 13h10v10H1z" fill="#00A4EF" />
                <path d="M13 1h10v10H13z" fill="#7FBA00" />
                <path d="M13 13h10v10H13z" fill="#FFB900" />
              </svg>
              <span className="truncate">Entra ID</span>
            </button>
          </div>

          <div className="pt-2 text-center space-y-1">
            <p className="text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Protected by PayPilot Adaptive Shield.
              </span>
            </p>
            <p className="text-xs text-slate-500">
              Need assistance?{' '}
              <a className="text-[#4648d4] hover:underline font-medium" href="#support">
                Contact HR Ops Support
              </a>{' '}
              or read{' '}
              <a className="text-[#4648d4] hover:underline font-medium" href="#faq">
                Security Compliance FAQs
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
