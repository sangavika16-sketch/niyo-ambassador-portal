import React, { useState } from 'react';
import {
  Megaphone,
  CheckSquare,
  MessageSquare,
  Bell,
  Sparkles,
  ExternalLink,
  UploadCloud,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  FileCheck,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MarketingCampaign, TaskSubmission, AmbassadorFeedback } from '../types';
import { analyzeFeedbackWithAI } from '../services/groqService';

interface CampaignsFeedbackHubProps {
  campaigns: MarketingCampaign[];
  feedbackList: AmbassadorFeedback[];
  onAddFeedback: (feedback: AmbassadorFeedback) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

export const CampaignsFeedbackHub: React.FC<CampaignsFeedbackHubProps> = ({
  campaigns,
  feedbackList,
  onAddFeedback,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'updates' | 'feedback'>('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<MarketingCampaign | null>(null);
  const [proofUrl, setProofUrl] = useState('');
  const [proofNotes, setProofNotes] = useState('');
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);

  // Submissions state
  const [submissions, setSubmissions] = useState<TaskSubmission[]>([
    {
      id: 'sub-01',
      campaignId: 'camp-03',
      campaignTitle: 'Exchange Cohort WhatsApp / Discord Broadcast',
      submissionDate: '2026-11-16',
      proofUrl: 'https://drive.google.com/proof/whatsapp-batch-iitd.png',
      proofNotes: 'Shared in IITD European Exchange 2026 official WhatsApp group (84 members). Resulted in 14 card orders.',
      status: 'Approved',
      rewardINR: 1000
    }
  ]);

  // Feedback form state
  const [feedbackInput, setFeedbackInput] = useState('');
  const [isAnalyzingFeedback, setIsAnalyzingFeedback] = useState(false);

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign || !proofUrl) return;

    setIsSubmittingTask(true);
    setTimeout(() => {
      const newSub: TaskSubmission = {
        id: `sub-${Date.now()}`,
        campaignId: selectedCampaign.id,
        campaignTitle: selectedCampaign.title,
        submissionDate: 'Just now',
        proofUrl,
        proofNotes,
        status: 'Under Review',
        rewardINR: selectedCampaign.rewardINR
      };

      setSubmissions([newSub, ...submissions]);
      setIsSubmittingTask(false);
      setSelectedCampaign(null);
      setProofUrl('');
      setProofNotes('');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      onShowToast('Task Proof Submitted!', `Submitted for review. ₹${newSub.rewardINR} will be credited upon approval.`, 'success');
    }, 800);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.trim()) return;

    setIsAnalyzingFeedback(true);
    const aiAnalysis = await analyzeFeedbackWithAI(feedbackInput);

    const newFeedback: AmbassadorFeedback = {
      id: `fb-${Date.now()}`,
      ambassadorName: 'Aarav Sharma',
      college: 'IIT Delhi',
      message: feedbackInput,
      category: aiAnalysis.category,
      sentiment: aiAnalysis.sentiment,
      impactScore: aiAnalysis.impactScore,
      aiSummary: aiAnalysis.aiSummary,
      createdAt: 'Just now'
    };

    onAddFeedback(newFeedback);
    setIsAnalyzingFeedback(false);
    setFeedbackInput('');
    confetti({ particleCount: 40, spread: 50 });
    onShowToast(
      'Feedback Categorized & Logged!',
      `AI tagged as: ${aiAnalysis.category} (${aiAnalysis.sentiment})`,
      'success'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-950 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5" /> Growth Tasks & Feedback Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Campus Marketing Quests & Product Feedback
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1">
            Complete high-impact marketing missions for bonus cash, stay updated with Niyo card announcements, and submit feature ideas analyzed by Groq AI.
          </p>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'campaigns'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          Active Marketing Tasks ({campaigns.length})
        </button>
        <button
          onClick={() => setActiveTab('updates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'updates'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          Niyo Official Announcements
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'feedback'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Structured Feedback & AI Categorizer
        </button>
      </div>

      {/* Tab 1: Marketing Campaigns & Tasks */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                      {camp.category}
                    </span>
                    <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Reward: ₹{camp.rewardINR.toLocaleString('en-IN')} + {camp.rewardPoints} XP
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-2.5">{camp.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{camp.description}</p>

                  <div className="mt-3.5 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                      Requirements:
                    </span>
                    <ul className="text-xs space-y-1 text-slate-300">
                      {camp.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">⏳ Deadline: {camp.deadline}</span>
                  <button
                    onClick={() => setSelectedCampaign(camp)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    Submit Proof
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Submissions History */}
          <div className="glass-panel p-6 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              Your Task Submissions & Approval Status
            </h3>
            <div className="space-y-2">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white">{sub.campaignTitle}</h4>
                    <p className="text-slate-400 text-[11px]">{sub.proofNotes}</p>
                    <a
                      href={sub.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline inline-flex items-center gap-1 text-[11px]"
                    >
                      Proof Link: {sub.proofUrl} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        sub.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {sub.status}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">₹{sub.rewardINR}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Niyo Official Announcements */}
      {activeTab === 'updates' && (
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Regulatory & Tax Benefit Update
              </span>
              <span className="text-[11px] text-slate-500">Yesterday</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Zero TCS Confirmed on Overseas Student Remittances up to ₹7 Lakhs
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under RBI Liberalised Remittance Scheme (LRS), Indian students spending on education, tuition, accommodation, and living abroad with Niyo cards are completely exempt from the 20% TCS up to ₹7,00,000 per financial year. Inform your outgoing batches—this is a massive USP vs domestic debit cards!
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-blue-500 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Airport Lounge Network Expansion
              </span>
              <span className="text-[11px] text-slate-500">3 days ago</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Complimentary Lounge Access Live in Frankfurt, Munich, London Heathrow & Singapore Changi
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ambassadors and cardholders can now flash their Niyo Global Card for complimentary entry to partner premium lounges during flight layovers. Encourage your batchmates to activate before departure!
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-amber-500 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Logistics & Delivery Speed
              </span>
              <span className="text-[11px] text-slate-500">1 week ago</span>
            </div>
            <h3 className="text-base font-bold text-white">
              48-Hour Express Physical Card Delivery Enabled in Metro Cities
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For students with urgent flight departure dates within 3 days, Niyo now dispatches physical cards via Bluedart Apex Express in Delhi-NCR, Mumbai, Bangalore, Pune, and Chennai.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Structured Feedback & AI Categorizer */}
      {activeTab === 'feedback' && (
        <div className="space-y-6">
          {/* Submit form */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Ambassador Feedback & Feature Suggestion Box
                </h3>
                <p className="text-xs text-slate-400">
                  Every suggestion is automatically analyzed by Groq Llama 3 for sentiment, category, and impact score.
                </p>
              </div>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-3">
              <textarea
                rows={3}
                required
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="What friction are students on your campus facing? What new card feature, blocked account integration, or app enhancement would triple your card sign-ups?"
                className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-blue-500 text-white text-xs placeholder-slate-500 transition"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  ⚡ Powered by Groq LPU: Instant Product Sentiment & Strategic Tagging
                </span>
                <button
                  type="submit"
                  disabled={isAnalyzingFeedback || !feedbackInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition disabled:opacity-40 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isAnalyzingFeedback ? 'Categorizing with AI...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </div>

          {/* Feedback Feed */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white">Recent Ambassador Submissions & AI Tagging</h3>
            <div className="space-y-3">
              {feedbackList.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel p-4 rounded-xl space-y-2 border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-white">{item.ambassadorName}</span>
                      <span className="text-xs text-blue-400 ml-1.5 font-medium">({item.college})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.category && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {item.category}
                        </span>
                      )}
                      {item.sentiment && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.sentiment === 'Positive'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {item.sentiment}
                        </span>
                      )}
                      {item.impactScore && (
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          Impact: {item.impactScore}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">&ldquo;{item.message}&rdquo;</p>

                  {item.aiSummary && (
                    <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-200">AI Product Insight:</strong> {item.aiSummary}
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-500 text-right">{item.createdAt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Task Proof Submission Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md p-6 rounded-2xl glass-panel bg-slate-900 border border-slate-700/60 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Submit Task Proof</h3>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase">
                {selectedCampaign.category}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">{selectedCampaign.title}</h4>
              <p className="text-xs text-emerald-400 font-mono mt-1">
                Reward: ₹{selectedCampaign.rewardINR} + {selectedCampaign.rewardPoints} XP
              </p>
            </div>

            <form onSubmit={handleTaskSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Proof URL (Google Drive screenshot, Instagram post link, LinkedIn URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/... or https://instagram.com/p/..."
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Execution Details / Batch Reach Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Shared with 85 exchange students in the IITD batch group. Answered questions about German blocked account."
                  value={proofNotes}
                  onChange={(e) => setProofNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedCampaign(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTask || !proofUrl}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition disabled:opacity-40"
                >
                  {isSubmittingTask ? 'Submitting...' : 'Confirm Submission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
