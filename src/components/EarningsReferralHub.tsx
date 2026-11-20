import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Copy,
  QrCode,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Wallet,
  Award,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Ambassador, ReferralLead } from '../types';

interface EarningsReferralHubProps {
  ambassador: Ambassador;
  referrals: ReferralLead[];
  onOpenPayoutModal: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

export const EarningsReferralHub: React.FC<EarningsReferralHubProps> = ({
  ambassador,
  referrals,
  onOpenPayoutModal,
  onShowToast
}) => {
  const [customSlug, setCustomSlug] = useState('aarav-iitd');
  const [selectedUtm, setSelectedUtm] = useState('direct');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [showQrModal, setShowQrModal] = useState(false);

  const baseLink = `https://niyo.me/${customSlug}`;
  const fullLink = selectedUtm === 'direct' ? baseLink : `${baseLink}?utm_source=${selectedUtm}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullLink);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    onShowToast('Link Copied to Clipboard!', fullLink, 'success');
  };

  const filteredReferrals = referrals.filter((ref) => {
    const matchesSearch =
      ref.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.targetUniversity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStage = stageFilter === 'all' || ref.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Earnings Summary & Instant Withdrawal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Ambassador Payout Wallet
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">₹4,800</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Ready for Instant Settlement
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Total lifetime earned: <strong className="text-white">₹22,400</strong> &bull; Settled via UPI/IMPS: <strong className="text-slate-300">₹17,600</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenPayoutModal}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Withdraw ₹4,800 to Bank / UPI
            </button>
          </div>
        </div>

        {/* Current Tier Perk Card */}
        <div className="glass-panel p-5 rounded-2xl border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Gold Ambassador Tier</span>
            </div>
            <span className="text-xs font-mono font-bold text-white bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
              ₹400 / Card
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
            You earn ₹400 for every peer who completes KYC & activates their Niyo card for international exchange.
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Next milestone: 50 cards</span>
            <span className="text-amber-300 font-semibold">Platinum (₹600/card)</span>
          </div>
        </div>
      </div>

      {/* Unique Referral Link & QR Code Engine */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-blue-400" />
              Your Unique Attribution Link & QR Code
            </h2>
            <p className="text-xs text-slate-400">
              Personalized link with 60-day cookie tracking. Every sign-up is credited automatically to your account.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQrModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5 text-blue-400" />
              View Poster QR Code
            </button>
          </div>
        </div>

        {/* Link Customizer Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 flex items-center bg-slate-950/80 rounded-xl border border-slate-700/80 overflow-hidden px-3.5 py-2.5">
            <span className="text-xs text-slate-500 font-mono select-none">https://niyo.me/</span>
            <input
              type="text"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              className="bg-transparent border-0 text-white font-mono text-xs focus:ring-0 focus:outline-none flex-1 font-bold text-blue-400"
              placeholder="your-custom-slug"
            />
            {selectedUtm !== 'direct' && (
              <span className="text-[11px] font-mono text-slate-500 select-none">
                ?utm_source={selectedUtm}
              </span>
            )}
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedUtm}
              onChange={(e) => setSelectedUtm(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-300 transition"
            >
              <option value="direct">Direct Link</option>
              <option value="whatsapp_batch">WhatsApp Group UTM</option>
              <option value="instagram_bio">Instagram Bio UTM</option>
              <option value="linkedin_post">LinkedIn Post UTM</option>
              <option value="campus_flyer">Campus Flyer QR UTM</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* Attribution Conversion Funnel */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">Ambassador Onboarding Conversion Funnel</h2>
          <p className="text-xs text-slate-400">Step-by-step student drop-off and activation pipeline</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
            <span className="text-[10px] uppercase font-bold text-slate-400">Stage 1: Link Clicks</span>
            <div className="text-2xl font-black text-white mt-1">412</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Top-of-funnel student interest</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500" />
            <span className="text-[10px] uppercase font-bold text-slate-400">Stage 2: KYC Started</span>
            <div className="text-2xl font-black text-white mt-1">68</div>
            <p className="text-[10px] text-indigo-400 font-semibold mt-0.5">16.5% click-to-KYC</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500" />
            <span className="text-[10px] uppercase font-bold text-slate-400">Stage 3: Card Dispatched</span>
            <div className="text-2xl font-black text-white mt-1">42</div>
            <p className="text-[10px] text-sky-400 font-semibold mt-0.5">61.7% KYC completion</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
            <span className="text-[10px] uppercase font-bold text-slate-400">Stage 4: Active Abroad</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">38</div>
            <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">90.5% international usage</p>
          </div>
        </div>
      </div>

      {/* Attribution Breakdown Table */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Attribution & Referral Ledger</h2>
            <p className="text-xs text-slate-400">Transparent student-level commission breakdown</p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search student or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-300"
            >
              <option value="all">All Stages</option>
              <option value="First International Swipe">First Swipe (Settled)</option>
              <option value="Card Activated">Card Activated</option>
              <option value="Card Dispatched">Card Dispatched</option>
              <option value="KYC Initiated">KYC Initiated</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Referred Student</th>
                <th className="py-3 px-4">Exchange Destination</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Journey Stage</th>
                <th className="py-3 px-4">Commission</th>
                <th className="py-3 px-4 rounded-r-xl">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredReferrals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No student referrals match your search filters.
                  </td>
                </tr>
              ) : (
                filteredReferrals.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.countryFlag}</span>
                        <span>{item.studentName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="text-slate-200">{item.targetUniversity}</span>
                        <p className="text-[10px] text-slate-500">{item.country}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{item.date}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          item.stage === 'First International Swipe'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : item.stage === 'Card Activated'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {item.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {item.commissionEarnedINR > 0 ? `₹${item.commissionEarnedINR}` : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          item.payoutStatus === 'Paid'
                            ? 'bg-emerald-950/60 text-emerald-400'
                            : item.payoutStatus === 'Available for Payout'
                            ? 'bg-blue-950/60 text-blue-300 font-bold'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.payoutStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tier Comparison Matrix */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">Ambassador Tier Progression & Rewards</h2>
          <p className="text-xs text-slate-400">Unlock higher payouts and executive benefits as your campus cohort scales</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Silver */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Silver Tier</span>
              <span className="text-xs font-mono font-bold text-slate-300">0 - 24 Cards</span>
            </div>
            <div className="text-2xl font-black text-white">₹250 <span className="text-xs font-normal text-slate-400">/ card</span></div>
            <ul className="text-xs space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Basic referral dashboard</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Monthly payouts</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Niyo ambassador badge</li>
            </ul>
          </div>

          {/* Gold (Current) */}
          <div className="p-5 rounded-xl bg-gradient-to-b from-amber-950/30 to-slate-950 border-2 border-amber-500/50 space-y-3 relative shadow-lg shadow-amber-500/10">
            <span className="absolute -top-2.5 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase tracking-wider">
              Current Tier
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Gold Tier</span>
              <span className="text-xs font-mono font-bold text-amber-300">25 - 49 Cards</span>
            </div>
            <div className="text-2xl font-black text-amber-300">₹400 <span className="text-xs font-normal text-slate-400">/ card</span></div>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Complimentary international lounge pass</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Fast-track instant IMPS withdrawals</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Exclusive Niyo Global Welcome Merch Kit</li>
            </ul>
          </div>

          {/* Platinum */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Platinum Tier</span>
              <span className="text-xs font-mono font-bold text-purple-300">50+ Cards</span>
            </div>
            <div className="text-2xl font-black text-white">₹600 <span className="text-xs font-normal text-slate-400">/ card</span></div>
            <ul className="text-xs space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> <strong>₹10,000 Global Travel & Living Stipend</strong></li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> LinkedIn recommendation from Niyo VP of Growth</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Fast-track interview for Niyo Summer Associate</li>
            </ul>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm p-6 rounded-2xl glass-panel bg-slate-900 border border-slate-700/60 shadow-2xl text-center space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Campus Poster QR Standee</h3>
              <button onClick={() => setShowQrModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* High-contrast QR Representation */}
            <div className="bg-white p-5 rounded-2xl inline-block shadow-inner">
              <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer positioning squares */}
                <rect x="5" y="5" width="28" height="28" rx="4" fill="#0A2540" />
                <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
                <rect x="13" y="13" width="12" height="12" fill="#0066FF" />

                <rect x="67" y="5" width="28" height="28" rx="4" fill="#0A2540" />
                <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
                <rect x="75" y="13" width="12" height="12" fill="#0066FF" />

                <rect x="5" y="67" width="28" height="28" rx="4" fill="#0A2540" />
                <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
                <rect x="13" y="75" width="12" height="12" fill="#0066FF" />

                {/* Simulated QR data modules */}
                <rect x="38" y="10" width="8" height="8" fill="#0A2540" />
                <rect x="50" y="10" width="8" height="8" fill="#0A2540" />
                <rect x="42" y="22" width="6" height="6" fill="#0A2540" />
                <rect x="52" y="22" width="6" height="6" fill="#0A2540" />

                <rect x="10" y="38" width="8" height="8" fill="#0A2540" />
                <rect x="22" y="42" width="6" height="6" fill="#0A2540" />
                <rect x="38" y="38" width="24" height="24" rx="4" fill="#0066FF" />
                <text x="50" y="54" fill="white" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">N</text>

                <rect x="68" y="38" width="8" height="8" fill="#0A2540" />
                <rect x="80" y="44" width="8" height="8" fill="#0A2540" />

                <rect x="38" y="68" width="8" height="8" fill="#0A2540" />
                <rect x="50" y="74" width="8" height="8" fill="#0A2540" />
                <rect x="74" y="68" width="6" height="6" fill="#0A2540" />
                <rect x="82" y="80" width="8" height="8" fill="#0A2540" />
              </svg>
            </div>

            <div>
              <p className="text-xs font-bold text-white">Scan to get Zero Forex Niyo Card</p>
              <p className="text-[11px] text-blue-400 font-mono mt-0.5">{fullLink}</p>
              <p className="text-[10px] text-slate-400 mt-1">Printed with your unique referral ID embedded.</p>
            </div>

            <button
              onClick={() => {
                onShowToast('QR Code Ready!', 'Download triggered for campus flyer placement.', 'success');
                setShowQrModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Flyer Ready Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
