import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { DashboardOverview } from './components/DashboardOverview';
import { EarningsReferralHub } from './components/EarningsReferralHub';
import { CommunityDirectory } from './components/CommunityDirectory';
import { CampaignsFeedbackHub } from './components/CampaignsFeedbackHub';
import { AICopilotStudio } from './components/AICopilotStudio';
import { GTMStrategyReport } from './components/GTMStrategyReport';
import { GroqSettingsModal } from './components/GroqSettingsModal';
import { RecommendAmbassadorModal } from './components/RecommendAmbassadorModal';
import { PayoutRequestModal } from './components/PayoutRequestModal';
import { Toast, ToastMessage } from './components/Toast';
import {
  CURRENT_AMBASSADOR,
  MOCK_AMBASSADORS,
  MOCK_REFERRALS,
  MOCK_CAMPAIGNS,
  MOCK_FEEDBACK
} from './services/mockData';
import { getStoredApiKey } from './services/groqService';
import { Nomination } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [ambassador, setAmbassador] = useState(CURRENT_AMBASSADOR);
  const [referrals, setReferrals] = useState(MOCK_REFERRALS);
  const [ambassadorsList, setAmbassadorsList] = useState(MOCK_AMBASSADORS);
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [feedbackList, setFeedbackList] = useState(MOCK_FEEDBACK);
  const [availableBalance, setAvailableBalance] = useState(4800);

  const [nominations, setNominations] = useState<Nomination[]>([
    {
      id: 'nom-01',
      nomineeName: 'Priyanshu Mehta',
      nomineeEmail: 'priyanshu@iimk.ac.in',
      nomineePhone: '+91 98765 12340',
      nomineeCollege: 'IIM Kozhikode',
      targetCountry: 'Germany',
      reason: 'Exchange Committee Convener heading to ESCP Europe this semester.',
      submittedAt: '3 days ago',
      status: 'Reviewing'
    },
    {
      id: 'nom-02',
      nomineeName: 'Ritwika Sen',
      nomineeEmail: 'ritwika@nitt.edu',
      nomineePhone: '+91 94321 87650',
      nomineeCollege: 'NIT Trichy',
      targetCountry: 'United States',
      reason: 'Outgoing MS exchange scholar with active campus student council network.',
      submittedAt: '1 week ago',
      status: 'Contacted'
    }
  ]);

  // Modals state
  const [isGroqModalOpen, setIsGroqModalOpen] = useState(false);
  const [isNominateModalOpen, setIsNominateModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [hasGroqKey, setHasGroqKey] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    setHasGroqKey(!!getStoredApiKey());
  }, []);

  const showToast = (title: string, message: string = '', type: 'success' | 'info' | 'error' = 'info') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      message,
      type
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handlePayoutSuccess = (withdrawnAmount: number) => {
    setAvailableBalance((prev) => Math.max(0, prev - withdrawnAmount));
    showToast(
      'Payout Transferred!',
      `₹${withdrawnAmount.toLocaleString('en-IN')} successfully transferred via instant IMPS to your bank account.`,
      'success'
    );
  };

  const handleNominate = (nomination: Nomination) => {
    setNominations([nomination, ...nominations]);
    showToast(
      'Ambassador Nominated!',
      `We will contact ${nomination.nomineeName} from ${nomination.nomineeCollege}. ₹200 bonus locked!`,
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ambassador={ambassador}
        hasGroqKey={hasGroqKey}
        onOpenGroqSettings={() => setIsGroqModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            ambassador={ambassador}
            referrals={referrals}
            onNavigateTab={setActiveTab}
            onOpenPayoutModal={() => setIsPayoutModalOpen(true)}
            onOpenNominateModal={() => setIsNominateModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'earnings' && (
          <EarningsReferralHub
            ambassador={ambassador}
            referrals={referrals}
            onOpenPayoutModal={() => setIsPayoutModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'community' && (
          <CommunityDirectory
            ambassadors={ambassadorsList}
            nominations={nominations}
            onOpenNominateModal={() => setIsNominateModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'campaigns' && (
          <CampaignsFeedbackHub
            campaigns={campaigns}
            feedbackList={feedbackList}
            onAddFeedback={(newFb) => setFeedbackList([newFb, ...feedbackList])}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'ai-studio' && (
          <AICopilotStudio
            ambassador={ambassador}
            hasGroqKey={hasGroqKey}
            onOpenGroqSettings={() => setIsGroqModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'strategy-docs' && (
          <GTMStrategyReport onShowToast={showToast} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300">niyo</span>
            <span>&bull;</span>
            <span>Student Ambassador Portal & Workbench</span>
            <span>&bull;</span>
            <span className="text-blue-400">0% Forex Markup</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Built for Niyo Growth & Community Internship Assignment &bull; Powered by GroqCloud LPU Inference
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <GroqSettingsModal
        isOpen={isGroqModalOpen}
        onClose={() => setIsGroqModalOpen(false)}
        onSaved={() => {
          setHasGroqKey(!!getStoredApiKey());
          showToast('Groq Cloud API Key Saved!', 'Llama 3.3-70B is now powering your AI Content Studio & Copilot.', 'success');
        }}
      />

      <RecommendAmbassadorModal
        isOpen={isNominateModalOpen}
        onClose={() => setIsNominateModalOpen(false)}
        onNominate={handleNominate}
      />

      <PayoutRequestModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        availableBalance={availableBalance}
        onPayoutSuccess={handlePayoutSuccess}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};
export default App;
