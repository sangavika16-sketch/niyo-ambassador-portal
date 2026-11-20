import React, { useState } from 'react';
import { X, Landmark, ArrowRight, CheckCircle2, ShieldCheck, Wallet } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PayoutRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onPayoutSuccess: (amount: number) => void;
}

export const PayoutRequestModal: React.FC<PayoutRequestModalProps> = ({
  isOpen,
  onClose,
  availableBalance,
  onPayoutSuccess
}) => {
  const [method, setMethod] = useState<'upi' | 'bank'>('upi');
  const [upiId, setUpiId] = useState('aarav.sharma@okhdfcbank');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '918237492817',
    ifsc: 'HDFC0000240',
    holderName: 'Aarav Sharma'
  });
  const [amount, setAmount] = useState(availableBalance.toString());
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<{ id: string; amount: number; time: string } | null>(null);

  if (!isOpen) return null;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = Number(amount);
    if (withdrawAmount <= 0 || withdrawAmount > availableBalance) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setReceipt({
        id: `TXN-NIYO-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: withdrawAmount,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      onPayoutSuccess(withdrawAmount);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 1200);
  };

  const handleFinish = () => {
    setReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md p-6 rounded-2xl glass-panel bg-slate-900 border border-slate-700/60 shadow-2xl overflow-hidden">
        {receipt ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                Disbursement Initiated
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">₹{receipt.amount.toLocaleString('en-IN')}</h3>
              <p className="text-xs text-slate-400 mt-1">Sent to {method === 'upi' ? upiId : 'HDFC Bank ending in ...2817'}</p>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Reference ID:</span>
                <span className="text-slate-200">{receipt.id}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Timestamp:</span>
                <span className="text-slate-200">{receipt.time}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">IMPS Instant Settled</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-bold text-white shadow-lg transition"
            >
              Done & Return to Workbench
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Withdraw Ambassador Earnings</h3>
                  <p className="text-xs text-slate-400">Instant IMPS payout to your verified Indian bank account / UPI</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-950/50 to-indigo-950/40 border border-blue-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-blue-300 font-medium">Available for Instant Withdrawal</span>
                <div className="text-2xl font-extrabold text-white mt-0.5">
                  ₹{availableBalance.toLocaleString('en-IN')}
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                0% Processing Fee
              </span>
            </div>

            <form onSubmit={handleWithdraw} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Withdrawal Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMethod('upi')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      method === 'upi'
                        ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    UPI ID (Instant)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('bank')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      method === 'bank'
                        ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Landmark className="w-3.5 h-3.5" /> Bank NEFT/IMPS
                  </button>
                </div>
              </div>

              {method === 'upi' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Verified UPI ID</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okaxis"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-blue-500 text-white text-sm font-mono transition"
                  />
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Account Number</label>
                    <input
                      type="text"
                      required
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        required
                        value={bankDetails.ifsc}
                        onChange={(e) => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-white text-xs font-mono uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Holder Name</label>
                      <input
                        type="text"
                        required
                        value={bankDetails.holderName}
                        onChange={(e) => setBankDetails({ ...bankDetails, holderName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Amount to Withdraw (₹)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="500"
                    max={availableBalance}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-blue-500 text-white text-base font-bold font-mono transition"
                  />
                  <button
                    type="button"
                    onClick={() => setAmount(availableBalance.toString())}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-blue-400 hover:text-blue-300 px-2 py-1 rounded bg-blue-900/40 border border-blue-700/50"
                  >
                    MAX
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Regulated under RBI guidelines via Niyo Partner Banking Network.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing || Number(amount) <= 0 || Number(amount) > availableBalance}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition disabled:opacity-40 flex items-center gap-1.5"
                >
                  {isProcessing ? 'Processing Transfer...' : 'Confirm Withdrawal'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
