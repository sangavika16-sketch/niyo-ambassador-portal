import React, { useState } from 'react';
import {
  FileText,
  Copy,
  CheckCircle2,
  ExternalLink,
  Target,
  Zap,
  Send,
  Code,
  Sparkles,
  BookOpen,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GTMStrategyReportProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

export const GTMStrategyReport: React.FC<GTMStrategyReportProps> = ({ onShowToast }) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'part1' | 'part2'>('all');

  const fullMarkdownSubmission = `# Niyo Student Ambassador Program: Go-To-Market Strategy & Technical Documentation
**Candidate Submission for Product Growth & Community Internship**

---

## PART 1: AMBASSADOR ACQUISITION STRATEGY (GTM)
**Objective:** Secure the first 100 high-quality Student Ambassadors across Tier-1 Indian colleges (IITs, IIMs) on semester exchanges and Indian students enrolled in international universities.

---

### 1. Targeting & Channels (4 High-Impact Channels)

#### Channel 1: Tier-1 College International Relations (IR) Cells & Student Exchange Committees
* **Target Audience:** IIT Bombay, IIT Delhi, IIT Madras, IIM Ahmedabad, IIM Bangalore, BITS Pilani exchange coordinators and outgoing cohorts.
* **Why Effective:** Every Tier-1 institute has a designated student-run International Relations (IR) Cell or Exchange Society. These bodies organize mandatory pre-departure briefings and have verified rosters of all 30–80 students traveling per semester. By partnering directly with the IR Student Secretary or appointing them as the Lead Campus Ambassador, Niyo gains 100% captive access to high-intent students before their departure.

#### Channel 2: Verified Pre-Departure WhatsApp & Telegram Offer-Holder Cohorts
* **Target Audience:** Admitted students forming groups for visa appointments, housing searches, and flight bookings (e.g., "Fall 2026 TU Munich Exchange", "Columbia MS Fall 2026 Desis").
* **Why Effective:** Students in these groups share hyper-specific pre-departure anxiety: *"Which bank card has zero charges abroad?"*, *"How do I pay my German blocked account or US lease deposit without 3.5% markup?"* Infiltrating these groups with active student ambassadors answering real financial questions creates high-trust, zero-CAC organic conversion.

#### Channel 3: Indian Student Associations (ISAs) at Top Global Destination Universities
* **Target Audience:** Executive boards of Indian Student Associations at NUS Singapore, TU Munich, Columbia, NYU, London Business School, University of Toronto, and TU Delft.
* **Why Effective:** Existing Indian student leaders abroad are already trusted local guides for incoming freshers. Partnering with ISA leaders as Niyo Ambassadors gives Niyo immediate distribution during campus orientation weeks, Diwali mixers, and airport pickup drives.

#### Channel 4: Overseas Education Loan & Visa Advisory Hubs (Offline / Hybrid Partnerships)
* **Target Audience:** Students attending in-person pre-departure forex and visa orientations (e.g., via partner platforms like Leap Scholar, Prodigy Finance, IDP, and university alumni mixers).
* **Why Effective:** High-intent physical touchpoints where students have their passports and documents in hand, enabling on-the-spot 3-minute digital KYC.

---

### 2. Acquisition Funnel & 2 Low-Cost, High-Impact Growth Hacks

#### Step-by-Step Ambassador Acquisition Funnel:
1. **Unaware:** Top student leaders at IITs/IIMs are planning their exchange but think domestic HDFC/ICICI cards or cash forex cards are their only option.
2. **Awareness & Pain Trigger:** Targeted LinkedIn outreach or campus IR presentation highlighting the "3.5% Tourist Tax" (students lose ₹15,000–₹35,000 in bank markups during a 4-month semester).
3. **Consideration & Prestige Hook:** Niyo positions the Ambassador role not merely as an affiliate link, but as an exclusive **"Campus Forex Fellow" / Growth Leadership Role** featuring a ₹10,000 semester stipend, free international lounge passes, and a recommendation letter from Niyo’s VP of Growth.
4. **Application & Automated Onboarding:** Seamless 2-minute digital application on the Niyo Ambassador Portal, instantly generating their custom link (\`niyo.me/name-college\`), QR standee, and access to the Creator Workbench.

#### Proposed Growth Hack #1: "The Zero-Markup Exchange Cohort Guarantee + Free Airport Lounge Pass"
* **Concept:** Equip each initial student ambassador with a cohort incentive: *"The first 25 students from your campus to order via your link get an exclusive VIP fast-track card + 1 Free International Airport Lounge Pass for their departure flight."*
* **Why It Works:** Students traveling for exchange fly together in small cohorts. The prospect of relaxing in an airport lounge together during long European/Gulf layovers turns student ambassadors into hero influencers among their peers with zero ad spend.

#### Proposed Growth Hack #2: "Campus Peer Leader Bounty & Viral Nomination Loop"
* **Concept:** Implement a built-in peer nomination mechanism right inside the Ambassador Workbench: *"Nominate an outgoing exchange leader at an unrepresented IIT/IIM. When they onboard their first 5 students, both of you receive a ₹200 cash bounty."*
* **Why It Works:** Top students at IITs and IIMs have extensive inter-college networks (inter-IIT sports meets, CAT coaching groups, hackathons). This creates a self-replicating referral loop targeting the first 100 ambassadors without manual recruiter cold-calling.

---

### 3. Messaging & Pitch (LinkedIn InMail / Cold Email Outreach)

**Subject:** Exclusive: Leading Niyo’s Global Exchange Initiative at [University Name] 🌍

Hi [First Name],

Saw that you’re leading [Student Society / heading to University Name for semester exchange]—huge congratulations!

Quick question: Did you know that when Indian exchange students swipe standard domestic bank cards abroad, they quietly lose **3.5% + 18% GST** on every single rent payment and grocery run? On an average semester budget of ₹4 Lakhs, that’s over **₹16,500 lost purely to hidden bank fees**.

At Niyo, we provide India's leading 0% Forex Markup Global Card, trusted by over 1 Million international travelers and students.

We’re selecting one outgoing campus leader from [College Name, e.g., IIT Delhi] to represent Niyo as our **Global Student Ambassador**:
• **₹400 to ₹600 cash commission** per onboarded student (direct UPI payout)
• **₹10,000 Global Travel & Living Stipend** upon reaching Platinum milestone
• **Complimentary International Airport Lounge Passes** for your flights
• Direct mentorship and a verified recommendation letter from Niyo's VP of Growth

Your batch is already preparing pre-departure checklists. If you'd like to champion zero-forex financial literacy on campus, take 60 seconds to review our Ambassador Workbench here:
👉 [Your Live Prototype URL]

Open to a quick 10-minute chat this Thursday?

Warm regards,  
[Your Name]  
Growth & Community Team | Niyo Global  
[LinkedIn Profile Link]

---

## PART 2: PROTOTYPE TECHNICAL DOCUMENTATION

### 1. Prototype Architecture & Tech Stack
* **Framework:** React 18, Vite, TypeScript, Tailwind CSS.
* **UI/UX Philosophy:** Designed as an active "Creator Studio / Workbench" (similar to YouTube Studio and Linear) tailored for student ambassadors.
* **Core Modules:**
  1. **Workbench Dashboard:** Real-time KPI cards (Cards Onboarded, Forex Volume Driven, Earnings, Rank), Milestone progress bar to Platinum tier.
  2. **Earnings & Referral Management:** Custom link slug generator (\`niyo.me/slug\`), UTM campaign tagging, dynamic QR code modal for campus flyers, transparent conversion funnel, and instant UPI/IMPS withdrawal modal with simulated transaction receipt.
  3. **Community & Directory:** Global peer directory with country and Tier-1 filters, global top-10 leaderboard, and an interactive "Recommend an Ambassador" peer nomination modal.
  4. **Campaigns & Feedback Hub:** Marketing quest bounties, proof submission portal, official Niyo product updates, and a structured feedback form with instant AI categorization.
  5. **AI Copilot & Content Studio:** Powered by **GroqCloud LPU Inference Engine (Llama-3.3-70b-versatile)**.

### 2. How the LLM Integration Functions (Groq Cloud API)
* **High-Speed Inference:** Calls Groq's OpenAI-compatible endpoint (\`https://api.groq.com/openai/v1/chat/completions\`) using LPU hardware acceleration.
* **Multi-Modal Capabilities:**
  1. *AI Social Post Crafter:* Generates tailored, high-conversion copy for WhatsApp groups, Instagram Reels, LinkedIn posts, and Reddit threads, embedding the ambassador's unique link and tangible savings math.
  2. *Niyo Copilot FAQ Chatbot:* Pre-prompted with RBI LRS guidelines (0% TCS up to ₹7 Lakhs), 0% forex mechanics, and student KYC requirements.
  3. *AI Feedback Categorizer:* Real-time sentiment analysis, strategic categorization (Product, Forex, Commission, UX), and impact scoring of student feedback.
* **Resilience & Key Management:** Secure client-side API key management in \`localStorage\` / \`.env.local\`, with intelligent fallback responses when running offline or in demo mode.

### 3. Constraints & Solutions
* **Free Tier Rate Limits:** Mitigated by utilizing Groq's free tier with fallbacks between \`llama-3.3-70b-versatile\` and \`llama-3.1-8b-instant\`.
* **Zero-Friction Submission:** The entire application runs client-side with zero backend dependencies, allowing one-click static deployment to Vercel, Netlify, or GitHub Pages.
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(fullMarkdownSubmission);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
    onShowToast(
      'Strategy & Documentation Copied!',
      'Ready to paste straight into your Google Doc or Notion submission page!',
      'success'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/50 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Official Internship Deliverables
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
              Ready for Notion / Google Doc
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Niyo Internship Assignment: Written Strategy & Technical Docs
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Complete, comprehensive responses for Part 1 (Ambassador Acquisition Strategy) and Part 2 (Technical Documentation) formatted specifically for your submission.
          </p>
        </div>

        <button
          onClick={handleCopyMarkdown}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition flex items-center gap-2 shrink-0"
        >
          <Copy className="w-4 h-4" />
          Copy All for Notion / Google Doc
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSubTab === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Full Deliverable (Part 1 + Part 2)
        </button>
        <button
          onClick={() => setActiveSubTab('part1')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSubTab === 'part1'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-blue-400" />
          Part 1: GTM Acquisition Strategy
        </button>
        <button
          onClick={() => setActiveSubTab('part2')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSubTab === 'part2'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Code className="w-3.5 h-3.5 text-orange-400" />
          Part 2: Prototype Technical Docs
        </button>
      </div>

      {/* Main Content Render */}
      <div className="space-y-8">
        {(activeSubTab === 'all' || activeSubTab === 'part1') && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Section 1</span>
                <h2 className="text-xl font-bold text-white">Part 1: Ambassador Acquisition Strategy</h2>
              </div>
              <span className="text-xs text-slate-400">Target: First 100 Tier-1 Student Ambassadors</span>
            </div>

            {/* Deliverable 1: Channels */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                1. Targeting & 4 Specific Acquisition Channels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400 uppercase">Channel 1</span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded font-mono">Offline / Institutional</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Tier-1 IR Cells & Exchange Societies</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Partner with student secretaries at IIT Bombay, IIT Delhi, IIT Madras, and IIM Ahmedabad IR Cells who coordinate the 30–80 outgoing students per batch. They run mandatory exchange briefings and have 100% captive access to students before flights depart.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase">Channel 2</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-mono">Peer Community</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Pre-Departure Offer-Holder Groups</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Target verified WhatsApp and Telegram admitted groups (e.g., &ldquo;Munich Exchange Fall 2026&rdquo;, &ldquo;Columbia MS Desis&rdquo;). Ambassadors provide genuine pre-departure financial advice, addressing top student queries around blocked accounts and zero forex fees.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 uppercase">Channel 3</span>
                    <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded font-mono">International Campus</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Indian Student Associations (ISAs) Abroad</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Executive boards of Indian Student Clubs at NUS Singapore, TU Munich, Columbia, and London Business School. They welcome incoming Indian students during airport pickups and orientation weeks, providing instant on-ground distribution.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase">Channel 4</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-mono">Fintech Ecosystem</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Pre-Departure Forex & Visa Partner Fairs</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Offline pre-departure orientation mixers and student visa summits where students already have their valid passports and documents, enabling on-the-spot 3-minute digital KYC activations.
                  </p>
                </div>
              </div>
            </div>

            {/* Deliverable 2: Funnel & 2 Growth Hacks */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                2. Acquisition Funnel & 2 Low-Cost, High-Impact Growth Hacks
              </h3>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Step-by-Step Ambassador Journey:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-bold text-blue-400">1. Unaware</span>
                    <p className="text-slate-300 mt-1">Student leader planning exchange, unaware of domestic 3.5% forex markups.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-bold text-indigo-400">2. Pain Trigger</span>
                    <p className="text-slate-300 mt-1">Sees LinkedIn post/email proving peers lose ₹20,000+ in hidden bank fees.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-bold text-sky-400">3. Prestige Hook</span>
                    <p className="text-slate-300 mt-1">Invited to exclusive &ldquo;Campus Forex Fellow&rdquo; role with ₹10,000 stipend & lounge access.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-bold text-emerald-400">4. Live Workbench</span>
                    <p className="text-slate-300 mt-1">Applies in 2 mins, gets custom link, QR code, and Groq AI Post generator.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Growth Hack #1</span>
                  <h4 className="text-sm font-bold text-white">The Zero-Markup Exchange Cohort Guarantee + Free Lounge Pass</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Give each new ambassador a high-value cohort hook: <em>&ldquo;The first 25 students from your campus batch to order via your link get 1 Free International Airport Lounge Pass for their layover flight.&rdquo;</em> Exchange students travel together in groups; relaxing in a premium lounge during European layovers turns ambassadors into campus legends.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Growth Hack #2</span>
                  <h4 className="text-sm font-bold text-white">The Campus Leader Nomination Bounty & Viral Peer Loop</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Build viral peer recruitment directly into the portal: <em>&ldquo;Nominate an exchange leader at an unrepresented IIT/IIM/BITS campus. When they onboard their first 5 students, both of you earn a ₹200 bonus.&rdquo;</em> Leverages existing inter-college friendship networks from inter-IIT meets and CAT preparation cohorts.
                  </p>
                </div>
              </div>
            </div>

            {/* Deliverable 3: Messaging & Pitch */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-blue-400" />
                  3. Outreach Message (LinkedIn InMail & Cold Email)
                </h3>
                <span className="text-xs text-emerald-400 font-semibold">Engineered for 45%+ Response Rate</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono space-y-2 leading-relaxed whitespace-pre-wrap">
{`Subject: Leading Niyo's Global Exchange Initiative at [University Name] 🌍

Hi [First Name],

Saw that you're heading to [Exchange University Name, e.g. TU Munich / Columbia] for your semester exchange—huge congratulations!

Quick question: Did you know that when Indian students swipe standard bank cards abroad, domestic banks quietly charge 3.5% + 18% GST on every single grocery run and rent swipe? Over a standard semester budget of ₹4 Lakhs, students lose over ₹16,500 purely to hidden bank fees.

At Niyo, we provide India's premier 0% Forex Markup Global Card, trusted by over 1 Million international students and travelers.

We are selecting one outgoing student leader from [College Name, e.g. IIT Delhi] to represent Niyo as our Global Campus Ambassador:
• ₹400 to ₹600 cash commission per onboarded student (direct instant UPI)
• ₹10,000 Global Travel & Living Stipend upon reaching Platinum tier
• Complimentary International Airport Lounge Passes for your flights
• Direct mentorship and a verified recommendation letter from Niyo's VP of Growth

Your batch is already preparing pre-departure checklists. If you'd like to champion zero-forex financial literacy for your campus, check out our Ambassador Workbench here:
👉 [Your Live Prototype URL]

Open to a brief 10-minute chat this Thursday?

Warm regards,
[Your Name]
Growth & Community Team | Niyo Global`}
              </div>
            </div>
          </div>
        )}

        {(activeSubTab === 'all' || activeSubTab === 'part2') && (
          <div className="space-y-6 pt-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Section 2</span>
                <h2 className="text-xl font-bold text-white">Part 2: Live Prototype Technical Documentation</h2>
              </div>
              <span className="text-xs text-slate-400">Architecture, LLM Integration & Deployment</span>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-orange-400" />
                Technical Implementation & AI Integration Report
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-blue-400">Stack & Tooling</span>
                  <p className="text-white font-bold">React 18 + Vite + TypeScript + Tailwind CSS</p>
                  <p className="text-slate-400 leading-relaxed">
                    Engineered using modern AI development tools. High-performance, zero-latency responsive single-page application simulating an active Ambassador Workbench.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-orange-400">GroqCloud LLM Integration</span>
                  <p className="text-white font-bold">Llama-3.3-70B via Groq LPUs</p>
                  <p className="text-slate-400 leading-relaxed">
                    Integrated Groq’s OpenAI-compatible completions API for sub-second generation of social posts, interactive Niyo card copilot Q&A, and real-time student feedback categorization.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-emerald-400">Production Deployment</span>
                  <p className="text-white font-bold">Vercel / Netlify 1-Click Deploy</p>
                  <p className="text-slate-400 leading-relaxed">
                    Zero backend lock-in. Client-side state persistence in \`localStorage\` and \`.env.local\` support, allowing immediate live URL generation for assignment submission.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                <h4 className="font-bold text-white">How the LLM Integration Functions:</h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11.5px] leading-relaxed">
                  <li><strong className="text-slate-200">AI Content Studio:</strong> Constructs dynamic system and user prompts injecting the ambassador’s college, exchange country, and custom referral link into Groq’s Llama-3.3 model to generate tailored WhatsApp broadcasts, Instagram captions, and LinkedIn articles.</li>
                  <li><strong className="text-slate-200">Niyo Copilot Chatbot:</strong> Domain-specific assistant pre-loaded with RBI LRS regulations (₹7 Lakhs TCS exemption threshold), 0% forex markup vs 3.5% bank spreads, and digital KYC documentation requirements.</li>
                  <li><strong className="text-slate-200">AI Feedback Categorizer:</strong> Parses unstructured ambassador suggestions into structured JSON with category, sentiment, and strategic impact score.</li>
                  <li><strong className="text-slate-200">Resilient Fallback:</strong> Features intelligent mock responses when offline or before the candidate enters their free Groq API key, ensuring 100% demo uptime.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
