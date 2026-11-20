import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  Copy,
  Share2,
  ExternalLink,
  RefreshCw,
  Cpu,
  Key,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Ambassador } from '../types';
import {
  generateSocialPost,
  askAmbassadorCopilot,
  ChatMessage,
  getStoredApiKey
} from '../services/groqService';

interface AICopilotStudioProps {
  ambassador: Ambassador;
  hasGroqKey: boolean;
  onOpenGroqSettings: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

export const AICopilotStudio: React.FC<AICopilotStudioProps> = ({
  ambassador,
  hasGroqKey,
  onOpenGroqSettings,
  onShowToast
}) => {
  const [activeTool, setActiveTool] = useState<'content-studio' | 'copilot-chat'>('content-studio');

  // Content Studio State
  const [platform, setPlatform] = useState<'WhatsApp' | 'Instagram' | 'LinkedIn' | 'Reddit / Discord'>('WhatsApp');
  const [targetAudience, setTargetAudience] = useState('IIT/IIM Outgoing Semester Exchange');
  const [tone, setTone] = useState('Relatable Student Advice (No BS)');
  const [keyHighlight, setKeyHighlight] = useState('0% Forex Markup (Save ₹18,000+ vs traditional banks)');
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<string>('');
  const [isLiveGroqPost, setIsLiveGroqPost] = useState(false);

  // Copilot Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `👋 Hey **${ambassador.name}**! I am **Niyo Copilot**, your AI growth mentor powered by Groq LPUs.\n\nAsk me anything about **0% Forex mechanics**, **RBI TCS exemption rules**, **KYC requirements for students**, or **how to pitch Niyo at campus orientations**!`
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const customLink = `https://niyo.me/${ambassador.name.toLowerCase().replace(/\s+/g, '-')}-iitd`;

  // Quick prompt suggestions
  const suggestedQuestions = [
    'How does Niyo 0% Forex save ₹20,000+ compared to ICICI/HDFC cards?',
    'What are the RBI rules on 20% TCS exemption up to ₹7 Lakhs?',
    'How do ambassador payout tiers (Gold to Platinum) work?',
    'What 3 documents does a student need for 3-minute KYC approval?'
  ];

  const handleGeneratePost = async () => {
    setIsGeneratingPost(true);
    const result = await generateSocialPost({
      platform,
      targetAudience,
      tone,
      keyHighlight,
      customLink,
      ambassadorName: ambassador.name,
      college: ambassador.college
    });

    setGeneratedPost(result.content);
    setIsLiveGroqPost(result.isLiveGroq);
    setIsGeneratingPost(false);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    onShowToast(
      'Marketing Post Generated!',
      result.isLiveGroq ? 'Generated via Groq Llama 3.3 LPU' : 'Generated via Smart Template',
      'success'
    );
  };

  const handleCopyPost = () => {
    if (!generatedPost) return;
    navigator.clipboard.writeText(generatedPost);
    confetti({ particleCount: 40, spread: 50 });
    onShowToast('Post Copied to Clipboard!', 'Ready to paste into WhatsApp, Instagram, or LinkedIn.', 'success');
  };

  const handleSendChat = async (queryText?: string) => {
    const textToSend = queryText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    const updatedHistory = [...chatMessages, userMsg];
    setChatMessages(updatedHistory);
    setChatInput('');
    setIsChatLoading(true);

    const result = await askAmbassadorCopilot(updatedHistory, textToSend);

    setChatMessages([
      ...updatedHistory,
      { role: 'assistant', content: result.reply }
    ]);
    setIsChatLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Groq LPU Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-950/40 via-slate-900 to-indigo-950/40 border border-orange-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> GroqCloud LPU Inference Engine
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                hasGroqKey
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              {hasGroqKey ? '⚡ Llama 3.3-70B Live' : 'Demo Mode (Add Groq Key for Live LLM)'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Niyo AI Growth Suite & Ambassador Copilot
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Harness high-speed Groq inference to draft high-converting student campaign posts and resolve pre-departure card queries instantly.
          </p>
        </div>

        <button
          onClick={onOpenGroqSettings}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-orange-300 transition flex items-center gap-2 shrink-0 shadow-lg"
        >
          <Key className="w-4 h-4 text-orange-400" />
          {hasGroqKey ? 'Manage Groq API Key' : 'Enter Free Groq API Key'}
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTool('content-studio')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTool === 'content-studio'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          AI Content Studio (Social Post Crafter)
        </button>
        <button
          onClick={() => setActiveTool('copilot-chat')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTool === 'copilot-chat'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          Niyo Copilot (24/7 Card FAQ Chatbot)
        </button>
      </div>

      {/* View 1: AI Content Studio */}
      {activeTool === 'content-studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Target Audience & Campaign Parameters
              </h2>
              <p className="text-xs text-slate-400">
                Tailor marketing posts to specific campus batches and social channels
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Social Platform *</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['WhatsApp', 'Instagram', 'LinkedIn', 'Reddit / Discord'] as const).map((plat) => (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => setPlatform(plat)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                        platform === plat
                          ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Student Segment *</label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white"
                >
                  <option value="IIT/IIM Outgoing Semester Exchange">IIT/IIM Semester Exchange (Europe / Asia)</option>
                  <option value="Fall Semester Masters Students (US / UK / Germany)">Fall Intake Masters Students (US / UK / Germany)</option>
                  <option value="Exchange Backpackers on a Strict Budget">Budget-conscious Exchange Students</option>
                  <option value="Parents & Sponsors Paying Overseas Tuition & Living">Parents / Sponsors Paying Tuition Fees</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tone & Voice *</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white"
                >
                  <option value="Relatable Student Advice (No BS)">Relatable Student Advice (Authentic, peer-to-peer)</option>
                  <option value="High Urgency & FOMO (Flight Leaving Soon)">High Urgency / FOMO (&ldquo;Don&rsquo;t pay 3.5% tourist tax&rdquo;)</option>
                  <option value="Value-first Financial Wisdom (Concrete Math)">Value-first Financial Breakdown (Clear Math & Savings)</option>
                  <option value="Campus Leader Official Announcement">Official Campus IR / Batch Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Core Value Proposition Hook *</label>
                <select
                  value={keyHighlight}
                  onChange={(e) => setKeyHighlight(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white"
                >
                  <option value="0% Forex Markup (Save ₹18,000+ vs traditional banks)">0% Forex Markup (Save ₹18,000+ vs domestic banks)</option>
                  <option value="Free Airport Lounge Access on Layover Flights">Free International Airport Lounge Access</option>
                  <option value="₹0 TCS Exemption on Living Expenses up to ₹7 Lakhs">₹0 TCS on Education Expenses up to ₹7 Lakhs</option>
                  <option value="100% Digital KYC in 3 Mins with Indian Passport">Instant 3-Min KYC & Fast-track Delivery</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
                <span className="text-slate-200 font-semibold">Embedded Referral Link:</span>{' '}
                <code className="text-blue-400 font-mono">{customLink}</code>
              </div>

              <button
                type="button"
                onClick={handleGeneratePost}
                disabled={isGeneratingPost}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-xs font-extrabold text-slate-950 shadow-lg shadow-orange-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGeneratingPost ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating with Groq LPU...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    Generate Promotional Copy with Groq LPU
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Result Column (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">Generated Promotional Copy</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                    {platform}
                  </span>
                </div>
                {isLiveGroqPost && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ⚡ Live Groq Llama 3.3
                  </span>
                )}
              </div>

              {generatedPost ? (
                <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto selection:bg-blue-600">
                  {generatedPost}
                </div>
              ) : (
                <div className="mt-8 py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-500">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-300">No Post Generated Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Select your platform, target audience, and key value hook on the left, then click &ldquo;Generate with Groq LPU&rdquo;.
                  </p>
                </div>
              )}
            </div>

            {generatedPost && (
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 font-mono">
                  {generatedPost.length} chars &bull; ~{generatedPost.split(/\s+/).length} words
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(generatedPost)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Share on WhatsApp
                  </a>
                  <button
                    onClick={handleCopyPost}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy to Clipboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* View 2: Niyo Copilot Chatbot */}
      {activeTool === 'copilot-chat' && (
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Niyo Ambassador AI Copilot</h2>
                <p className="text-xs text-slate-400">
                  Instant answers on Niyo Card features, forex markup math, TCS rules, and ambassador commissions
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              {hasGroqKey ? 'Groq LPU Connected' : 'Smart Simulator Active'}
            </span>
          </div>

          {/* Suggested Quick Prompt Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendChat(q)}
                className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition text-left flex items-center gap-1.5"
              >
                <HelpCircle className="w-3 h-3 text-blue-400 shrink-0" />
                <span>{q}</span>
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="h-[440px] overflow-y-auto space-y-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            {chatMessages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                      isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow'
                    }`}
                  >
                    {isUser ? 'You' : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-wrap'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}

            {isChatLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-400" />
                <span>Niyo Copilot is thinking on Groq LPU...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendChat();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about Niyo forex markup, ATM limits, TCS rules, or pitching..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="submit"
              disabled={isChatLoading || !chatInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition disabled:opacity-40 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
