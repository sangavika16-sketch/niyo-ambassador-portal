import React from 'react';
import {
  CreditCard,
  TrendingUp,
  Award,
  DollarSign,
  Share2,
  Sparkles,
  ArrowUpRight,
  UserPlus,
  Wallet,
  Clock,
  CheckCircle,
  ExternalLink,
  Plane,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Ambassador, ReferralLead } from '../types';
import { ActiveTab } from './Navbar';

interface DashboardOverviewProps {
  ambassador: Ambassador;
  referrals: ReferralLead[];
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenPayoutModal: () => void;
  onOpenNominateModal: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  ambassador,
  referrals,
  onNavigateTab,
  onOpenPayoutModal,
  onOpenNominateModal,
  onShowToast
}) => {
  const referralLink = `https://niyo.me/${ambassador.name.toLowerCase().replace(/\s+/g, '-')}-iitd`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    onShowToast('Referral Link Copied!', 'Share this with outgoing students to earn ₹400 per card.', 'success');
  };

  const availableBalance = 4800; // Calculated available commissions
  const nextTierTarget = 50;
  const progressPercent = Math.min(100, Math.round((ambassador.onboardingsCount / nextTierTarget) * 100));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5" /> Campus Semester Exchange Season
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Live Commission: ₹400 / Activated Card
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {ambassador.name}! 🚀
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Leading the Niyo revolution from <strong className="text-white">{ambassador.college}</strong> to{' '}
              <strong className="text-white">{ambassador.exchangeUniversity}</strong>. Your cohort has saved an estimated{' '}
              <span className="text-emerald-400 font-bold">₹2,34,000+</span> in forex markups this semester.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Copy My Referral Link
            </button>
            <button
              onClick={() => onNavigateTab('ai-studio')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-bold text-amber-300 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              AI Post Studio
            </button>
            <button
              onClick={onOpenPayoutModal}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-600/25 transition flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Withdraw ₹{availableBalance.toLocaleString('en-IN')}
            </button>
          </div>
        </div>

        {/* Milestone Tier Progress Tracker */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-slate-200">
                Current Status: <span className="text-amber-400 font-bold">Gold Ambassador</span>
              </span>
              <span className="text-xs text-slate-400">➔ Next Tier: <strong className="text-white">Platinum (₹600/card + ₹10,000 Stipend)</strong></span>
            </div>
            <span className="text-xs font-mono font-bold text-blue-400">
              {ambassador.onboardingsCount} / {nextTierTarget} Onboardings ({nextTierTarget - ambassador.onboardingsCount} cards away)
            </span>
          </div>

          <div className="w-full bg-slate-950/80 rounded-full h-3 p-0.5 border border-slate-800">
            <div
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Core KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="glass-panel p-5 rounded-2xl glass-panel-hover">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wide uppercase">Niyo Cards Onboarded</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">{ambassador.onboardingsCount}</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12 this month
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">38 cards active & swiped abroad (90.4% conversion)</p>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-5 rounded-2xl glass-panel-hover">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wide uppercase">Forex Volume Driven</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">₹56.8L</span>
            <span className="text-xs font-semibold text-slate-400">~$68.4K USD</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">International tuition, living rent & transit swipes</p>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-5 rounded-2xl glass-panel-hover">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wide uppercase">Total Ambassador Earnings</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">₹22,400</span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">₹4,800 ready</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">₹17,600 already settled via direct bank transfer</p>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel p-5 rounded-2xl glass-panel-hover">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold tracking-wide uppercase">Global Ambassador Rank</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">#4</span>
            <span className="text-xs font-semibold text-amber-400">Top 1% Tier</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">IIT Delhi #1 Campus Representative</p>
        </div>
      </div>

      {/* Main Grid: Live Referral Activity & Campus Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Live Onboarding Tracker & Funnel */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Recent Referral Attributions & Card Status
              </h2>
              <p className="text-xs text-slate-400">Live feed of students onboarded via your dedicated link</p>
            </div>
            <button
              onClick={() => onNavigateTab('earnings')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
            >
              View Full Tracker <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Conversion Funnel Strip */}
          <div className="grid grid-cols-4 gap-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Link Clicks</span>
              <p className="text-base font-bold text-white mt-0.5">412</p>
              <span className="text-[9px] text-blue-400 font-mono">100% Top-funnel</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">KYC Started</span>
              <p className="text-base font-bold text-white mt-0.5">68</p>
              <span className="text-[9px] text-slate-400 font-mono">16.5% rate</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Card Active</span>
              <p className="text-base font-bold text-white mt-0.5">42</p>
              <span className="text-[9px] text-emerald-400 font-mono">61.7% of KYC</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Intl Swipe</span>
              <p className="text-base font-bold text-emerald-400 mt-0.5">38</p>
              <span className="text-[9px] text-emerald-400 font-mono">90.5% active</span>
            </div>
          </div>

          {/* List of Recent Students */}
          <div className="space-y-2.5">
            {referrals.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 flex items-center justify-between hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-200">
                    {lead.countryFlag}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{lead.studentName}</h3>
                    <p className="text-[11px] text-slate-400">
                      {lead.targetUniversity} ({lead.country})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                      lead.stage === 'First International Swipe'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : lead.stage === 'Card Activated'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {lead.stage}
                  </span>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white font-mono">
                      +₹{lead.commissionEarnedINR}
                    </span>
                    <p className="text-[9px] text-slate-500">{lead.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 col): Campus Marketing Missions & Groq LLM Assistant */}
        <div className="space-y-6">
          {/* Quick AI Post Generator Callout */}
          <div className="glass-panel p-5 rounded-2xl border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950">
            <div className="flex items-center gap-2.5 text-amber-400 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider">AI Content Studio</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Create viral WhatsApp broadcasts, Instagram Reel scripts, and LinkedIn posts for your college batch in 3 seconds using Groq Llama 3.
            </p>
            <button
              onClick={() => onNavigateTab('ai-studio')}
              className="mt-3.5 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-1.5"
            >
              Open AI Content Studio
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Peer Nomination Callout */}
          <div className="glass-panel p-5 rounded-2xl border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-950">
            <div className="flex items-center gap-2.5 text-emerald-400 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <UserPlus className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider">Nominate Unrepresented Campus</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Know friends heading to US/UK/Singapore from IIMs, IITs, or BITS? Nominate them as ambassadors and unlock a{' '}
              <strong className="text-white">₹200 referral bounty</strong>!
            </p>
            <button
              onClick={onOpenNominateModal}
              className="mt-3.5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-emerald-300 transition flex items-center justify-center gap-1.5"
            >
              Recommend an Ambassador
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ / Rule Reference */}
          <div className="glass-panel p-5 rounded-2xl text-xs space-y-2 text-slate-300">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
              Ambassador Program Rules:
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc list-inside">
              <li>Payouts disbursed on the 5th of every month.</li>
              <li>60-day attribution cookie on your custom link.</li>
              <li>Free international lounge pass for all active Gold & Platinum ambassadors.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
