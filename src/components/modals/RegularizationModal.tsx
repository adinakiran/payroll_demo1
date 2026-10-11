import React, { useState } from 'react';
import { X, Calendar, Upload, CheckCircle2, ShieldAlert } from 'lucide-react';

interface RegularizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const RegularizationModal: React.FC<RegularizationModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [reason, setReason] = useState('biometric_fault');
  const [manager, setManager] = useState('Arjun Verma (Engineering Manager)');
  const [comment, setComment] = useState(
    'Gate 04 biometric turnstile had sensor failure on morning of Oct 14. Manager approved WFH via Slack channel #eng-pod-a.'
  );
  const [fileName, setFileName] = useState('slack_approval_oct14.png');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Dispute &amp; Regularize Attendance
              </h3>
              <p className="text-[11px] text-slate-400">
                Target date: Monday, October 14, 2024 (1 Day LOP -₹1,000)
              </p>
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
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Reason for Dispute</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-[#4648d4]"
            >
              <option value="biometric_fault">Biometric turnstile hardware fault at Gate 04</option>
              <option value="wfh_approved">Remote work approved by manager on Slack</option>
              <option value="client_visit">Official external duty / client meeting</option>
              <option value="medical_emergency">Medical emergency (Doctor certificate attached)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Authorizing Manager</label>
            <input
              type="text"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-[#4648d4]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Detailed Justification</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:bg-white focus:border-[#4648d4]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Supporting Attachment</label>
            <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100/70 cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-slate-400 mb-1" />
              <p className="text-xs font-semibold text-slate-800">{fileName}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, or PDF up to 10MB</p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl flex items-start gap-2 text-emerald-800 text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>Autonomous Guarantee:</strong> Once approved by HR Operations Lead Ananya Roy, the ₹1,000 deduction will be credited back in the upcoming cycle.
            </p>
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
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-[#4648d4] hover:bg-indigo-600 disabled:opacity-50 text-white font-bold cursor-pointer transition-all"
            >
              {isSubmitting ? 'Submitting to HR Ops...' : 'Submit Regularization Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
