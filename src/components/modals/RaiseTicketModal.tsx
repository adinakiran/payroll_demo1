import React, { useState } from 'react';
import { X, LifeBuoy, Send, ShieldCheck } from 'lucide-react';
import { SupportTicket } from '../../types/payroll';

interface RaiseTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketCreated: (ticket: SupportTicket) => void;
}

export const RaiseTicketModal: React.FC<RaiseTicketModalProps> = ({
  isOpen,
  onClose,
  onTicketCreated,
}) => {
  const [category, setCategory] = useState('Salary Delta');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newTicket: SupportTicket = {
        id: `PAY-${Math.floor(10000 + Math.random() * 90000)}`,
        title: subject,
        priority: priority,
        filedAgo: 'Just now',
        status: 'Open',
        currentNode: 1,
        totalNodes: 5,
        detectedVariance: 0,
        identifiedRootCauses: [category],
        projectedResolution: 'SLA < 18 mins',
        slaInfo: 'Under Triage',
        chatMessages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'user',
            senderName: 'Kiran Sharma',
            time: 'Just now',
            text: description,
          },
        ],
      };

      onTicketCreated(newTicket);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#4648d4] flex items-center justify-center">
              <LifeBuoy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Raise New Payroll Ticket</h3>
              <p className="text-[11px] text-slate-400">Autonomous triage will commence in under 400ms</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-[#4648d4]"
              >
                <option value="Salary Delta">Salary Delta / Underpayment</option>
                <option value="Tax TDS">Tax / Section 192 TDS</option>
                <option value="Leave / LOP">Leave / Biometric LOP</option>
                <option value="Reimbursements">Expense / Allowance</option>
                <option value="Banking">Banking &amp; IFSC Update</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-[#4648d4]"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority (Disbursal Blocker)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Issue Subject</label>
            <input
              type="text"
              required
              placeholder="Brief summary of payroll or tax discrepancy..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-[#4648d4]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Detailed Description</label>
            <textarea
              rows={4}
              required
              placeholder="Provide exact transaction dates, amounts, or supporting context..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-[#4648d4]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !subject.trim()}
              className="px-5 py-2 rounded-xl bg-[#4648d4] hover:bg-indigo-600 disabled:opacity-50 text-white font-bold cursor-pointer transition-all"
            >
              {isSubmitting ? 'Dispatching...' : 'Dispatch Ticket to AI Pipeline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
