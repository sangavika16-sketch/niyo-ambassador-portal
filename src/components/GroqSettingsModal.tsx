import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink, CheckCircle2, AlertCircle, Cpu, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey, testGroqConnection } from '../services/groqService';

interface GroqSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const GroqSettingsModal: React.FC<GroqSettingsModalProps> = ({ isOpen, onClose, onSaved }) => {
  const [apiKey, setApiKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    const result = await testGroqConnection(apiKey);
    setTestResult(result);
    setIsTesting(false);
  };

  const handleSave = () => {
    setStoredApiKey(apiKey);
    onSaved();
    onClose();
  };

  const handleClear = () => {
    setApiKey('');
    setStoredApiKey('');
    setTestResult(null);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl p-6 rounded-2xl glass-panel bg-slate-900 border border-slate-700/60 shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Groq Cloud API Configuration
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  LPU Inference
                </span>
              </h3>
              <p className="text-xs text-slate-400">Power your Niyo AI Assistant & Social Post Crafter with Llama 3.3</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Groq Cloud API Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Key className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-slate-600 text-sm font-mono transition"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Your key is saved locally in your browser storage and never transmitted to any third-party server.
            </p>
          </div>

          {/* Test Status Banner */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                testResult.success
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span className="flex-1 font-medium">{testResult.message}</span>
            </div>
          )}

          {/* How to get API Key Box */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center justify-between text-white font-semibold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                How to get your free Groq API Key (100% Free):
              </span>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 hover:underline text-[11px]"
              >
                console.groq.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11.5px] leading-relaxed">
              <li>Open <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">Groq Console</a> and sign in with Google or GitHub (takes 10 seconds).</li>
              <li>Navigate to <strong className="text-slate-200">API Keys</strong> in the left sidebar.</li>
              <li>Click <strong className="text-slate-200">Create API Key</strong> and give it a name (e.g. &ldquo;Niyo-Ambassador&rdquo;).</li>
              <li>Copy the key starting with <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-mono">gsk_...</code> and paste it in the field above!</li>
            </ol>
            <div className="pt-1 text-[11px] text-slate-500 border-t border-slate-800/60">
              💡 <em>Pro-tip for Developers:</em> You can also add <code className="text-blue-300 font-mono">VITE_GROQ_API_KEY=gsk_...</code> inside your project&rsquo;s <code className="text-blue-300 font-mono">.env.local</code> file!
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-xl transition"
          >
            Clear Key
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isTesting || !apiKey}
              onClick={handleTest}
              className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition disabled:opacity-40 flex items-center gap-1.5"
            >
              {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
              {isTesting ? 'Pinging Groq...' : 'Test Connection'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition"
            >
              Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
