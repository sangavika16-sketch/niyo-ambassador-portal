/**
 * Groq Cloud API Client Service for Niyo Ambassador Workbench
 * Powered by ultra-fast Llama-3.3-70b-versatile & Llama-3.1-8b-instant on Groq LPUs
 */

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
const FALLBACK_MODEL = 'llama-3.1-8b-instant';

export const getStoredApiKey = (): string => {
  return localStorage.getItem('niyo_groq_api_key') || ((import.meta as any).env?.VITE_GROQ_API_KEY as string) || '';
};

export const setStoredApiKey = (key: string): void => {
  if (key) {
    localStorage.setItem('niyo_groq_api_key', key.trim());
  } else {
    localStorage.removeItem('niyo_groq_api_key');
  }
};

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function testGroqConnection(apiKey: string): Promise<{ success: boolean; message: string }> {
  if (!apiKey || apiKey.trim().length === 0) {
    return { success: false, message: 'Please provide a valid Groq API Key starting with gsk_...' };
  }

  try {
    const res = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: FALLBACK_MODEL,
        messages: [{ role: 'user', content: 'Say "Groq API Connected Successfully!" in 5 words.' }],
        max_tokens: 20
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error?.message || `HTTP ${res.status}: ${res.statusText}`;
      return { success: false, message: errMsg };
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || 'Connected!';
    return { success: true, message: reply.trim() };
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error connecting to Groq API' };
  }
}

/**
 * Generate marketing posts with Groq Llama 3
 */
export async function generateSocialPost(params: {
  platform: 'Instagram' | 'WhatsApp' | 'LinkedIn' | 'Reddit / Discord';
  targetAudience: string;
  tone: string;
  keyHighlight: string;
  customLink: string;
  ambassadorName: string;
  college: string;
}): Promise<{ content: string; isLiveGroq: boolean }> {
  const apiKey = getStoredApiKey();

  const systemPrompt = `You are an elite Growth Marketer and Student Brand Ambassador copywriter for Niyo Global.
Niyo is India's leading fintech card for international students, offering:
- 0% Forex Markup on international payments (saves 3.5% to 5% compared to typical bank cards + 18% GST).
- Real-time live VISA/interbank exchange rates without hidden fees.
- 100% digital KYC in 3 minutes via Aadhaar & Passport.
- Free international airport lounge access worldwide.
- Exemption from 20% TCS on education and student living expenses up to ₹7 Lakhs per year under RBI LRS.
- Free ATM cash withdrawals abroad with in-app multi-currency converter.

Your goal is to write a punchy, highly converting, authentic post tailored to Indian students traveling abroad or on semester exchange (IITs, IIMs, universities in US, UK, Germany, Canada, Singapore, Europe). Include the ambassador's personal referral link naturally. Add relevant formatting (emojis, line breaks, bullet points, call to action).`;

  const userPrompt = `Draft a high-conversion promotional message for:
- Platform: ${params.platform}
- Target Student Demographic: ${params.targetAudience}
- Tone / Style: ${params.tone}
- Main Value Hook to Emphasize: ${params.keyHighlight}
- Ambassador Referral Link: ${params.customLink}
- Ambassador: ${params.ambassadorName} (${params.college})

Ensure it includes specific math or tangible savings examples (e.g. saving ₹15,000 to ₹35,000 on semester living expenses / rent), clear next steps to get the card before flying, and zero fluff.`;

  if (apiKey) {
    try {
      const res = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.75,
          max_tokens: 800
        })
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return { content, isLiveGroq: true };
        }
      }
    } catch (e) {
      console.warn('Groq live API failed, falling back to smart template', e);
    }
  }

  // Fallback high-quality template when API key is not configured yet
  return {
    content: getFallbackPost(params),
    isLiveGroq: false
  };
}

/**
 * Ambassador Copilot Chatbot powered by Groq
 */
export async function askAmbassadorCopilot(
  history: ChatMessage[],
  userQuery: string
): Promise<{ reply: string; isLiveGroq: boolean }> {
  const apiKey = getStoredApiKey();

  const systemPrompt = `You are "Niyo Copilot", the intelligent AI companion for Niyo Student Ambassadors (students from IITs, IIMs, and Indian students abroad).
You are an expert on:
1. Niyo Global Card features:
   - 0% forex markup on transactions in 150+ currencies. Traditional bank credit/debit cards charge 3.5% + 18% GST (effectively ~4.13% fee). On spending €5,000 (~₹4.5 Lakhs), students lose ₹18,500 just to hidden bank markups!
   - 0 TCS up to ₹7 Lakhs under Liberalised Remittance Scheme (LRS) for education and living expenses.
   - Complimentary International Airport Lounge access at major global transit hubs.
   - 100% digital KYC completed in 3 mins using Indian Aadhaar + Passport + PAN.
   - In-app card lock/unlock, zero liability on lost cards, contactless NFC enabled.
2. Niyo Ambassador Program Workbench & Rules:
   - Tier 1 Silver: ₹250 per activated card.
   - Tier 2 Gold: ₹400 per activated card (unlocked at 25 activations).
   - Tier 3 Platinum: ₹600 per activated card + ₹10,000 semester global stipend (unlocked at 50 activations).
   - Monthly payout cycle: Disbursed automatically on the 5th of every month via direct UPI / bank transfer.
   - 60-day cookie attribution window for referral links.
   - Marketing campaigns & event sponsorships available for campus pre-departure fairs.

Always respond in a concise, encouraging, authoritative tone with clear bullet points. Keep answers direct and actionable.`;

  if (apiKey) {
    try {
      const messages: ChatMessage[] = [
        { role: 'system', content: systemPrompt },
        ...history.slice(-6),
        { role: 'user', content: userQuery }
      ];

      const res = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          messages,
          temperature: 0.6,
          max_tokens: 650
        })
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          return { reply, isLiveGroq: true };
        }
      }
    } catch (e) {
      console.warn('Groq chat call failed, using smart fallback', e);
    }
  }

  return {
    reply: getFallbackCopilotReply(userQuery),
    isLiveGroq: false
  };
}

/**
 * AI Feedback Categorizer powered by Groq
 */
export async function analyzeFeedbackWithAI(feedbackText: string): Promise<{
  category: 'Product Feature' | 'Card Features' | 'Forex Rates' | 'Commission & Payouts' | 'App UX' | 'Campus Marketing';
  sentiment: 'Positive' | 'Neutral' | 'Constructive / Issue';
  impactScore: 'High' | 'Medium' | 'Low';
  aiSummary: string;
  isLiveGroq: boolean;
}> {
  const apiKey = getStoredApiKey();

  const prompt = `Analyze this student ambassador feedback for Niyo Card:
"${feedbackText}"

Return ONLY a valid JSON object with the following fields:
{
  "category": one of ["Product Feature", "Forex Rates", "Commission & Payouts", "App UX", "Campus Marketing"],
  "sentiment": one of ["Positive", "Neutral", "Constructive / Issue"],
  "impactScore": one of ["High", "Medium", "Low"],
  "aiSummary": a single concise sentence summarizing the strategic core insight and recommendation for Niyo's product/growth team
}`;

  if (apiKey) {
    try {
      const res = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: FALLBACK_MODEL,
          messages: [
            { role: 'system', content: 'You are an AI Product Operations Analyst at Niyo. You output only raw valid JSON without markdown fences.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.2,
          max_tokens: 250
        })
      });

      if (res.ok) {
        const data = await res.json();
        let rawContent = data.choices?.[0]?.message?.content || '{}';
        rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(rawContent);
        return {
          category: parsed.category || 'Product Feature',
          sentiment: parsed.sentiment || 'Constructive / Issue',
          impactScore: parsed.impactScore || 'Medium',
          aiSummary: parsed.aiSummary || 'Key feedback categorized by Groq LPU.',
          isLiveGroq: true
        };
      }
    } catch (e) {
      console.warn('Groq feedback analysis fallback', e);
    }
  }

  // Smart heuristic fallback
  const lower = feedbackText.toLowerCase();
  let category: 'Product Feature' | 'Card Features' | 'Forex Rates' | 'Commission & Payouts' | 'App UX' | 'Campus Marketing' = 'Product Feature';
  if (lower.includes('card') || lower.includes('atm') || lower.includes('physical') || lower.includes('virtual')) category = 'Card Features';
  else if (lower.includes('rate') || lower.includes('forex') || lower.includes('currency') || lower.includes('markup')) category = 'Forex Rates';
  else if (lower.includes('payout') || lower.includes('commission') || lower.includes('money') || lower.includes('tier') || lower.includes('upi')) category = 'Commission & Payouts';
  else if (lower.includes('app') || lower.includes('ui') || lower.includes('slow') || lower.includes('login') || lower.includes('bug')) category = 'App UX';
  else if (lower.includes('campus') || lower.includes('flyer') || lower.includes('event') || lower.includes('batch') || lower.includes('group')) category = 'Campus Marketing';

  let sentiment: 'Positive' | 'Neutral' | 'Constructive / Issue' = 'Neutral';
  if (lower.includes('love') || lower.includes('great') || lower.includes('amazing') || lower.includes('helped') || lower.includes('saved')) sentiment = 'Positive';
  else if (lower.includes('problem') || lower.includes('issue') || lower.includes('fail') || lower.includes('stuck') || lower.includes('delay') || lower.includes('slow')) sentiment = 'Constructive / Issue';

  const impactScore = (lower.includes('card') || lower.includes('payout') || lower.includes('blocked') || lower.includes('urgent')) ? 'High' : 'Medium';

  return {
    category,
    sentiment,
    impactScore,
    aiSummary: `AI Summary: Strategic input on ${category.toLowerCase()} identified. Recommended for prioritization in next sprint.`,
    isLiveGroq: false
  };
}

// Fallback generator for instant instant responses
function getFallbackPost(params: {
  platform: string;
  targetAudience: string;
  tone: string;
  keyHighlight: string;
  customLink: string;
  ambassadorName: string;
  college: string;
}): string {
  if (params.platform === 'WhatsApp') {
    return `✈️ *PSA for all ${params.college} folks traveling for exchange / study abroad this semester!*

Quick heads up before you pack: DO NOT make the mistake of swiping your regular Indian bank debit/credit card abroad. 
They quietly slap a *3.5% + 18% GST markup* on every single coffee, grocery run, and rent swipe. Over 4 months, you easily donate ₹25,000+ straight to bank fees! 💸

Get a *Niyo Global Card* instead:
✅ *0% Forex Markup* (you pay the exact live interbank rate, zero extra)
✅ *Free International Lounge Access* at major transit airports 🛋️
✅ *₹0 TCS* on expenses up to ₹7 Lakhs under LRS
✅ Load INR instantly via UPI, spend anywhere in Europe/US/Singapore
✅ Takes literally 3 mins to do digital KYC with your Passport + PAN

I managed to get a dedicated fast-track onboarding link for our ${params.college} batch so your physical card arrives before your flight:
👉 *Order yours here:* ${params.customLink}

DM me if you need help with the KYC or country activation! 🙌`;
  }

  if (params.platform === 'LinkedIn') {
    return `Preparing for a semester exchange or master's abroad is thrilling—until you uncover the hidden costs of international student finance. 🌍🎓

Most students don't realize that standard domestic cards charge between 3.5% to 5% in hidden foreign exchange markup plus GST on international transactions. On a standard semester budget of $6,000, that’s $250+ lost purely to administrative bank margins.

As a Student Ambassador for Niyo at ${params.college}, I’ve been championing smarter student financial tools for our cohort heading to global campuses.

Why @Niyo is the gold standard for Indian students overseas:
• Absolute 0% Forex Markup across 150+ countries
• Real-time RBI/VISA conversion rates directly tracked in-app
• Complimentary airport lounge access for international transit
• Instant Indian UPI loading with zero inward wire charges
• Complete digital KYC approval in under 3 minutes

If you're preparing for upcoming departure cycles, secure your card through our student cohort link:
🔗 ${params.customLink}

Feel free to connect or drop a message if you'd like guidance on pre-departure banking.

#StudyAbroad #StudentLife #Fintech #GlobalEducation #SemesterExchange #NiyoGlobal #CampusAmbassador`;
  }

  if (params.platform === 'Instagram') {
    return `Stop paying a 3.5% "tourist tax" on your own student exchange semester! 😭💸

Before you board that flight to Europe, the US, or Singapore, hear me out:
If you use your standard bank card abroad, you lose ₹3,500 for every ₹1,00,000 you spend. That’s your grocery budget for an entire week gone!

Switch to @goniyo Global:
✨ TRUE 0% Forex markup
✨ Free international airport lounge pass (relax during layovers!)
✨ Load in INR via Google Pay / PhonePe, swipe in Euros, Dollars, Pounds
✨ 100% digital KYC before you fly

Grab your fast-track card with my link in bio or tap here: ${params.customLink} 🚀

Drop a comment with your exchange destination and I'll send you our pre-departure packing & forex guide! ✈️📦`;
  }

  return `Hey everyone! For those heading abroad for exchange: make sure to order your Niyo Global card at ${params.customLink} to avoid losing 3.5% on every international swipe. Zero forex markup, free airport lounges, and instant UPI loading.`;
}

function getFallbackCopilotReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('forex') || q.includes('markup') || q.includes('fee') || q.includes('charge')) {
    return `### 💡 How Niyo's 0% Forex Markup Works:
- **Traditional Banks:** Charge a 3.5% foreign exchange markup + 18% GST on the markup (effective fee ~4.13%). On ₹3,00,000 spent abroad, students lose **₹12,390** purely in fees!
- **Niyo Global:** Charges **0% Forex Markup**. Transactions convert at the exact live VISA interbank rate with zero hidden spread.
- **Currencies Supported:** Works in 150+ countries and automatically converts from INR into Euros, USD, GBP, SGD, CAD, etc., whenever swiped!`;
  }

  if (q.includes('tcs') || q.includes('tax') || q.includes('7 lakh') || q.includes('lrs')) {
    return `### 📜 TCS (Tax Collected at Source) Rules:
- Under RBI's Liberalised Remittance Scheme (LRS), payments for **education and overseas living expenses are EXEMPT from TCS up to ₹7 Lakhs** in a financial year.
- Above ₹7 Lakhs:
  - For education financed by an approved education loan: Only 0.5% TCS.
  - Other remittances: 20% TCS applies, which can be claimed back during annual ITR filing.
- Niyo automatically tracks students' cumulative LRS quota inside the app with real-time tax transparency!`;
  }

  if (q.includes('payout') || q.includes('commission') || q.includes('earn') || q.includes('money')) {
    return `### 💰 Ambassador Earnings & Payout Schedule:
- **Silver Tier (0 - 24 cards):** ₹250 per activated card.
- **Gold Tier (25 - 49 cards):** ₹400 per activated card.
- **Platinum Tier (50+ cards):** ₹600 per activated card + ₹10,000 Global Travel & Semester Stipend!
- **Payout Frequency:** All approved earnings are disbursed on the **5th of every month** via direct bank transfer or UPI.
- **Attribution Window:** Your unique referral link carries a **60-day cookie window**. Even if a peer signs up weeks after clicking your link, you get full credit upon card activation!`;
  }

  if (q.includes('kyc') || q.includes('document') || q.includes('passport') || q.includes('apply')) {
    return `### 📑 Digital KYC Requirements for Students:
Students need only three things to get instant approval in 3 minutes:
1. **Valid Indian Passport** (mandatory for international cards).
2. **Aadhaar Card** (linked to active mobile number for OTP verification).
3. **PAN Card** (required under RBI banking norms).

The virtual card is activated instantly inside the Niyo app and can be linked immediately to Apple Pay / Google Wallet. The physical card is delivered to their Indian home address within 3-5 business days.`;
  }

  return `### 🚀 Niyo Ambassador Tip:
To accelerate sign-ups across your university campus, target the **Pre-Departure WhatsApp & Telegram cohorts** 30 to 45 days before flight departures. 

Offer them a concrete comparison: *"On an average exchange semester budget of ₹4,00,000, you save ₹16,500 using Niyo instead of an ICICI/HDFC forex card, plus you get free airport lounge access."* 

Use the **AI Content Studio** in this workbench to generate customized posts for your specific college!`;
}
