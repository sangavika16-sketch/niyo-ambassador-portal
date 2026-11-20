import React from 'react';
import {
  LayoutDashboard,
  Coins,
  Users,
  Megaphone,
  Sparkles,
  FileText,
  Key,
  Shield,
  ExternalLink
} from 'lucide-react';
import { Ambassador } from '../types';

export type ActiveTab = 'dashboard' | 'earnings' | 'community' | 'campaigns' | 'ai-studio' | 'strategy-docs';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  ambassador: Ambassador;
  hasGroqKey: boolean;
  onOpenGroqSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  ambassador,
  hasGroqKey,
  onOpenGroqSettings
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Workbench', icon: LayoutDashboard },
    { id: 'earnings', label: 'Earnings & Referrals', icon: Coins },
    { id: 'community', label: 'Community & Peers', icon: Users },
    { id: 'campaigns', label: 'Campaigns & Feedback', icon: Megaphone },
    { id: 'ai-studio', label: 'AI Copilot & Studio', icon: Sparkles, highlight: true },
    { id: 'strategy-docs', label: 'GTM Strategy & Docs', icon: FileText, badge: 'Part 1 & 2' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Program Title */}
          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
                <span className="text-white font-black text-xl tracking-tighter">N</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white text-base tracking-tight">niyo</span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    STUDENT GLOBAL
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium -mt-0.5">Ambassador Workbench</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.highlight && !isActive ? 'text-amber-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-[19px] left-3 right-3 h-[2px] bg-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Groq Cloud Indicator & Profile Card */}
          <div className="flex items-center gap-2.5">
            {/* Groq Key Status Button */}
            <button
              onClick={onOpenGroqSettings}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
                hasGroqKey
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/40 animate-pulse'
              }`}
              title="Configure Groq Cloud API"
            >
              <span className={`w-2 h-2 rounded-full ${hasGroqKey ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
              <Key className="w-3 h-3" />
              <span className="hidden sm:inline">
                {hasGroqKey ? 'Groq LPU Active' : 'Configure Groq'}
              </span>
            </button>

            {/* Current Ambassador Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <img
                src={ambassador.avatar}
                alt={ambassador.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/40"
              />
              <div className="hidden lg:block text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white leading-tight">{ambassador.name}</span>
                  <span className="text-[10px] font-bold px-1.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {ambassador.tier}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">{ambassador.college} ➔ {ambassador.destinationCountry} {ambassador.countryFlag}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-slate-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
