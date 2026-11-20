import React, { useState } from 'react';
import { X, UserPlus, Sparkles, Building, Mail, Phone, MapPin, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Nomination } from '../types';

interface RecommendAmbassadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNominate: (nomination: Nomination) => void;
}

export const RecommendAmbassadorModal: React.FC<RecommendAmbassadorModalProps> = ({
  isOpen,
  onClose,
  onNominate
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    targetCountry: 'Germany',
    reason: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.college) return;

    const newNomination: Nomination = {
      id: `nom-${Date.now()}`,
      nomineeName: formData.name,
      nomineeEmail: formData.email,
      nomineePhone: formData.phone || '+91 98765 43210',
      nomineeCollege: formData.college,
      targetCountry: formData.targetCountry,
      reason: formData.reason || 'Active student leader heading for international exchange.',
      submittedAt: 'Just now',
      status: 'Reviewing'
    };

    onNominate(newNomination);

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg p-6 rounded-2xl glass-panel bg-slate-900 border border-slate-700/60 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Recommend an Ambassador
              </h3>
              <p className="text-xs text-slate-400">Nominate a peer leader for unrepresented colleges & earn ₹200 bounty</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Earn <strong className="text-white">₹200 bonus cash</strong> when your nominated peer is onboarded and makes their first 5 card referrals!
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Peer's Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Priyanshu Mehta"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-blue-500 text-white text-sm placeholder-slate-600 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-400" /> Current College *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. IIM Kozhikode / NIT Trichy"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-blue-500 text-white text-sm placeholder-slate-600 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> Exchange Country
              </label>
              <select
                value={formData.targetCountry}
                onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-blue-500 text-white text-sm transition"
              >
                <option value="Germany">Germany 🇩🇪</option>
                <option value="United States">United States 🇺🇸</option>
                <option value="United Kingdom">United Kingdom 🇬🇧</option>
                <option value="Singapore">Singapore 🇸🇬</option>
                <option value="Canada">Canada 🇨🇦</option>
                <option value="France">France 🇫🇷</option>
                <option value="Australia">Australia 🇦🇺</option>
                <option value="Netherlands">Netherlands 🇳🇱</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" /> Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="priyanshu@iimk.ac.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-blue-500 text-white text-sm placeholder-slate-600 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" /> WhatsApp Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-blue-500 text-white text-sm placeholder-slate-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Why would they be a great Niyo Ambassador?
            </label>
            <textarea
              rows={2}
              placeholder="e.g. He is the head of the International Relations Cell and leads the exchange orientation committee."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-blue-500 text-white text-xs placeholder-slate-600 transition"
            />
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
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Submit Nomination (+₹200 Bounty)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
