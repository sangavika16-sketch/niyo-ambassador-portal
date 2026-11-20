import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Award,
  Globe,
  ExternalLink,
  MapPin,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Ambassador, Nomination } from '../types';

interface CommunityDirectoryProps {
  ambassadors: Ambassador[];
  nominations: Nomination[];
  onOpenNominateModal: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

export const CommunityDirectory: React.FC<CommunityDirectoryProps> = ({
  ambassadors,
  nominations,
  onOpenNominateModal,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<'all' | 'iit-iim' | 'europe' | 'north-america' | 'apac'>('all');
  const [activeTab, setActiveTab] = useState<'directory' | 'leaderboard' | 'nominations'>('directory');

  const filteredAmbassadors = ambassadors.filter((amb) => {
    const matchesSearch =
      amb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amb.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amb.exchangeUniversity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amb.destinationCountry.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (regionFilter === 'iit-iim') {
      return amb.college.includes('IIT') || amb.college.includes('IIM');
    }
    if (regionFilter === 'europe') {
      return ['Germany', 'United Kingdom', 'France', 'Switzerland', 'Sweden', 'Netherlands'].includes(amb.destinationCountry);
    }
    if (regionFilter === 'north-america') {
      return ['United States', 'Canada'].includes(amb.destinationCountry);
    }
    if (regionFilter === 'apac') {
      return ['Singapore', 'Australia'].includes(amb.destinationCountry);
    }
    return true;
  });

  // Sort by rank for leaderboard
  const sortedLeaderboard = [...ambassadors].sort((a, b) => a.rank - b.rank);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Global Network & Recommend Action */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-950 border border-indigo-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Global Ambassador Network
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {ambassadors.length} Active Campus Leads
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Connect with Fellow Niyo Ambassadors Worldwide
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Collaborate, share high-converting exchange marketing strategies, and refer peer leaders heading to global universities.
          </p>
        </div>

        <button
          onClick={onOpenNominateModal}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 transition flex items-center gap-2 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          Recommend an Ambassador (+₹200 Bounty)
        </button>
      </div>

      {/* Sub navigation pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'directory'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Global Directory ({filteredAmbassadors.length})
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Leaderboard (Top 10)
          </button>
          <button
            onClick={() => setActiveTab('nominations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'nominations'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Your Nominations ({nominations.length})
          </button>
        </div>

        {/* Search bar */}
        {activeTab === 'directory' && (
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search college, country, peer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setRegionFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  regionFilter === 'all' ? 'bg-blue-600/30 text-blue-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setRegionFilter('iit-iim')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  regionFilter === 'iit-iim' ? 'bg-blue-600/30 text-blue-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                IITs / IIMs
              </button>
              <button
                onClick={() => setRegionFilter('europe')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  regionFilter === 'europe' ? 'bg-blue-600/30 text-blue-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Europe
              </button>
              <button
                onClick={() => setRegionFilter('north-america')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  regionFilter === 'north-america' ? 'bg-blue-600/30 text-blue-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                US & Canada
              </button>
              <button
                onClick={() => setRegionFilter('apac')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  regionFilter === 'apac' ? 'bg-blue-600/30 text-blue-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                APAC
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View 1: Directory Cards */}
      {activeTab === 'directory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAmbassadors.map((amb) => {
            const isMe = amb.id === 'amb-001';
            return (
              <div
                key={amb.id}
                className={`glass-panel p-5 rounded-2xl glass-panel-hover flex flex-col justify-between relative overflow-hidden ${
                  isMe ? 'ring-2 ring-blue-500/60 bg-blue-950/20' : ''
                }`}
              >
                {isMe && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500 text-white uppercase tracking-wider">
                    You
                  </span>
                )}

                <div>
                  <div className="flex items-start gap-3.5">
                    <img
                      src={amb.avatar}
                      alt={amb.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white truncate">{amb.name}</h3>
                        <span className="text-base">{amb.countryFlag}</span>
                      </div>
                      <p className="text-xs font-semibold text-blue-400">{amb.college}</p>
                      <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        {amb.exchangeUniversity}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Cards Onboarded</span>
                      <p className="text-sm font-bold text-white mt-0.5">{amb.onboardingsCount}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Forex Driven</span>
                      <p className="text-sm font-bold text-emerald-400 mt-0.5 font-mono">
                        ₹{(amb.forexVolumeINR / 100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        amb.tier === 'Platinum'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : amb.tier === 'Gold'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {amb.tier} Ambassador
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Rank #{amb.rank}</span>
                  </div>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-blue-400 flex items-center gap-1 text-[11px] font-semibold transition"
                  >
                    LinkedIn <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 2: Global Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Semester Exchange Leaderboard (Top 10 Global)
            </h2>
            <p className="text-xs text-slate-400">
              Recognizing top student ambassadors driving zero-forex adoption for their campus cohorts
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Rank</th>
                  <th className="py-3 px-4">Ambassador</th>
                  <th className="py-3 px-4">Indian College</th>
                  <th className="py-3 px-4">Exchange University & Country</th>
                  <th className="py-3 px-4">Onboardings</th>
                  <th className="py-3 px-4">Forex Volume</th>
                  <th className="py-3 px-4 rounded-r-xl">Tier & Honor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {sortedLeaderboard.map((amb) => {
                  const isTop3 = amb.rank <= 3;
                  const rankIcons = ['🥇', '🥈', '🥉'];
                  return (
                    <tr
                      key={amb.id}
                      className={`hover:bg-slate-900/40 transition ${
                        amb.id === 'amb-001' ? 'bg-blue-950/30 border-l-2 border-blue-500' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-sm">
                        {isTop3 ? (
                          <span className="text-lg">{rankIcons[amb.rank - 1]}</span>
                        ) : (
                          <span className="text-slate-400 font-mono">#{amb.rank}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={amb.avatar}
                            alt={amb.name}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-700"
                          />
                          <div>
                            <span className="font-bold text-white">{amb.name}</span>
                            {amb.id === 'amb-001' && (
                              <span className="ml-1.5 text-[9px] px-1.5 py-0.2 bg-blue-500 text-white rounded font-bold">YOU</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-200">{amb.college}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-300">
                          {amb.countryFlag} {amb.exchangeUniversity}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white font-mono">{amb.onboardingsCount}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono">
                        ₹{(amb.forexVolumeINR / 100000).toFixed(1)}L
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            amb.tier === 'Platinum'
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {amb.badge}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: Previously Nominated Ambassadors */}
      {activeTab === 'nominations' && (
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Your Campus Peer Nominations</h2>
              <p className="text-xs text-slate-400">
                Peers you have recommended for unrepresented colleges. You receive ₹200 when they activate their first 5 cards.
              </p>
            </div>
            <button
              onClick={onOpenNominateModal}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" /> Nominate Another Peer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {nominations.map((nom) => (
              <div
                key={nom.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{nom.nomineeName}</h4>
                    <p className="text-xs text-blue-400">{nom.nomineeCollege} ➔ {nom.targetCountry}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {nom.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 italic">&ldquo;{nom.reason}&rdquo;</p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Nominated: {nom.submittedAt}</span>
                  <span className="text-emerald-400 font-bold">Bounty: ₹200 Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
