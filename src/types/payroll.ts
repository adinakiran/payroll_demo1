export type ScreenType = 
  | 'overview' 
  | 'my-payroll' 
  | 'payslip-detail' 
  | 'leave-attendance' 
  | 'ai-assistant' 
  | 'support-tickets' 
  | 'benefits' 
  | 'documents' 
  | 'notifications' 
  | 'hr-command-center';

export type UserPersona = 'employee' | 'hr-ops';

export interface VerificationNode {
  id: number;
  title: string;
  statusBadge: string;
  statusType: 'verified' | 'flagged' | 'calculated' | 'recalibrated' | 'compliant' | 'pending';
  description: string;
  systemTag: string;
  systemIcon: 'cloud' | 'fingerprint' | 'bolt' | 'landmark' | 'book';
}

export interface FactorImpact {
  factor: string;
  subtext: string;
  impact: number;
  type: 'negative' | 'positive';
}

export interface PayslipRecord {
  id: string;
  period: string; // e.g., 'October 2024'
  shortPeriod: string; // 'Oct 2024'
  monthKey: string; // '2024-10'
  paymentDate: string; // 'Oct 31, 2024'
  grossPay: number;
  deductions: number;
  netPay: number;
  status: 'Paid' | 'Processing';
  refNumber: string;
  accountEnding: string;
  daysCredited: number;
  totalDays: number;
  lopDays: number;
}

export interface SupportTicket {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  filedAgo: string;
  status: 'Open' | 'Under AI Investigation' | 'Awaiting HR Review' | 'Resolved';
  currentNode: number;
  totalNodes: number;
  detectedVariance: number;
  identifiedRootCauses: string[];
  projectedResolution: string;
  slaInfo: string;
  chatMessages: {
    id: string;
    sender: 'user' | 'agent' | 'system';
    senderName: string;
    avatar?: string;
    time: string;
    text: string;
    isAttachment?: boolean;
    attachmentName?: string;
  }[];
}

export interface AttendanceDay {
  dayNumber: number;
  dateStr: string; // '2024-10-14'
  dayOfWeek: string; // 'Mon'
  status: 'present' | 'pto' | 'holiday' | 'lop' | 'weekend' | 'current';
  hoursLogged?: string;
  label?: string;
  punchIn?: string;
  punchOut?: string;
  terminalNode?: string;
}

export interface PendingHRApproval {
  id: string;
  employeeName: string;
  empId: string;
  avatar: string;
  department: string;
  requestType: string;
  amountOrDays?: string;
  aiRecommendation: string;
  aiNote?: string;
  status: 'pending' | 'approved' | 'rejected';
}
