# Niyo Student Ambassador Workbench 🚀
> Built for the **Niyo Growth & Community Internship Assignment**  
> An automated, affiliate-led Creator Studio and digital portal for Tier-1 Indian colleges (IITs, IIMs) on semester exchanges and Indian students abroad.

---

## 🌟 Key Features Built for the Assignment

### 1. Ambassador Workbench Dashboard (Creator Studio UI)
* **Real-time KPI Tracking:** Active Niyo card onboardings (42), forex volume driven (₹56.8 Lakhs / ~$68.4K USD), total earnings (₹22,400), and campus rank (#4 Global).
* **Milestone Progress Bar:** Tracks progress towards the **Platinum Tier** (50 cards required to unlock ₹600/card + ₹10,000 Global Travel & Living Stipend).
* **Live Attribution Stream:** Real-time feed of onboarded students across Germany, US, UK, and Singapore.

### 2. Earnings & Referral Management
* **Custom Link Engine:** Customizable slug (`https://niyo.me/your-name-college`) with 60-day cookie tracking and 1-click copy with celebratory animations.
* **UTM Campaign Builder:** Pre-built tags for WhatsApp batch groups, Instagram bio, LinkedIn posts, and campus posters.
* **Poster QR Standee Generator:** Clean, high-contrast QR code generator ready for printing and offline placement at campus exchange fairs.
* **Transparent Conversion Funnel:** Tracks Clicks (412) ➔ KYC Initiated (68) ➔ Card Dispatched (42) ➔ First International Swipe (38).
* **Instant Payout Withdrawal Modal:** Interactive IMPS/UPI withdrawal interface with simulated instant bank settlement receipts and zero processing fees.

### 3. Community Directory & Global Referrals
* **Global Peer Directory:** Search and filter ambassadors by Indian college (IIT Delhi, IIT Bombay, IIM Ahmedabad, BITS Pilani), exchange country (Germany, US, UK, Singapore, Canada, France), and tier.
* **Top-10 Global Leaderboard:** Highlights top-performing ambassadors driving zero-forex adoption.
* **"Recommend an Ambassador" Nomination Form:** Allows ambassadors to nominate peer leaders from unrepresented campuses with a **₹200 bonus bounty** loop.

### 4. Campaigns & Structured Feedback Hub
* **Campus Marketing Quests:** Structured tasks (e.g., Pre-departure IR presentation for ₹2,500, Instagram Reel for ₹1,500, Batch WhatsApp drop for ₹1,000) with task proof submission and review tracking.
* **Official Announcements Feed:** Real-time updates on RBI TCS 0% exemption rules up to ₹7 Lakhs, European airport lounge additions, and express 48h card delivery.
* **AI Feedback Categorizer:** Every student feature suggestion is analyzed via Groq LLM for category, sentiment, and strategic impact score.

### 5. LLM Integration: GroqCloud LPU AI Suite
* **AI Social Post Crafter:** Generates platform-tailored promotional copy (WhatsApp Broadcast, Instagram Reel, LinkedIn, Reddit) embedding the student's unique link, tone, and specific forex math.
* **Niyo Copilot (24/7 AI Chatbot):** Answers questions on 0% forex markup vs 3.5% bank charges, RBI TCS regulations, student KYC documentation, and campus pitching tips.
* **Groq LPU Hardware Acceleration:** Sub-second inference powered by `llama-3.3-70b-versatile` and `llama-3.1-8b-instant`.
* **Zero-Friction Fallback:** Includes smart built-in template simulation if an API key is not yet provided, ensuring the site is 100% demo-ready.

### 6. Submission Deliverables Hub (Part 1 & 2)
* Built-in dedicated tab featuring the complete, written Part 1 Go-To-Market Strategy (Targeting, 4 Channels, Step-by-Step Funnel, 2 Growth Hacks, and Cold Pitch Email) and Part 2 Technical Documentation with a **"Copy All for Notion / Google Doc"** button!

---

## 🚀 How to Run the Website (Beginner Friendly)

### Method A: One-Click Launch (Easiest for Windows)
Simply double-click the **`run.bat`** file located in this project folder!
1. Double-click `run.bat`.
2. A terminal window will open and automatically launch the website at **`http://localhost:5173`**.
3. Your default web browser will automatically open with the website ready to use!

---

### Method B: Via Terminal / Command Prompt
1. Open PowerShell or Command Prompt in this folder (`c:\Users\DELL\Documents\niyo`).
2. Run the following command:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to: **`http://localhost:5173`**

---

## 🔑 How to Get and Add Your Free GroqCloud API Key

The website is already 100% functional with built-in smart AI templates. To connect live ultra-fast **Groq Llama 3.3** inference:

### Step 1: Get your free API key
1. Go to **[https://console.groq.com/keys](https://console.groq.com/keys)** in your browser.
2. Sign in with your Google or GitHub account (takes 10 seconds, completely free).
3. Click the orange **"Create API Key"** button.
4. Give it a name (e.g. `niyo-ambassador`) and copy the generated key starting with `gsk_...`.

### Step 2: Put it into the Codebase or Web App (Two Easy Ways)

#### Option 1: Directly inside the Website UI (Recommended)
1. Open the website in your browser (`http://localhost:5173`).
2. Click the **"Configure Groq"** button in the top navigation bar.
3. Paste your `gsk_...` key into the box.
4. Click **"Test Connection"** to verify, then click **"Save & Apply"**.
5. The button will immediately turn green: **"Groq LPU Active"**!

#### Option 2: Using the `.env.local` File
1. In the project folder, create a file named `.env.local` (or copy `.env.example`).
2. Add your key like this:
   ```env
   VITE_GROQ_API_KEY=gsk_your_actual_key_here
   ```
3. Save the file and restart the dev server (`npm run dev`).

---

## 🌐 How to Deploy to Production (For Assignment Live URL)

The assignment requires: *"The application must be deployed to production (e.g., via Vercel, Netlify, Render). A limited audience or staging deployment is perfectly fine."*

Because this project is built with Vite and React, you can deploy it in 60 seconds completely for free:

### Deploying to Vercel (Recommended & Fastest):
1. Create a free account on **[https://vercel.com](https://vercel.com)**.
2. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Niyo Student Ambassador Portal"
   git remote add origin https://github.com/your-username/niyo-ambassador-portal.git
   git push -u origin main
   ```
3. In Vercel, click **"Add New Project"** ➔ Select your GitHub repository.
4. (Optional) In the **Environment Variables** section, add:
   * Name: `VITE_GROQ_API_KEY`
   * Value: `gsk_your_groq_api_key_here`
5. Click **"Deploy"**. Within 30 seconds, Vercel will give you a live URL like `https://niyo-ambassador-portal.vercel.app`!

### Deploying to Netlify (Drag and Drop):
1. In your local folder, run `build.bat` or `npm run build`.
2. This creates a production-ready **`dist/`** folder.
3. Go to **[https://app.netlify.com/drop](https://app.netlify.com/drop)**.
4. Drag and drop the `dist/` folder onto the web page.
5. Netlify will instantly provide a live HTTPS URL!

---

## 📝 Assignment Submission Summary
When submitting your Google Doc or Notion link to Niyo:
1. Paste the **Written Strategy for Part 1** (you can copy it in 1 click from the **"GTM Strategy & Docs"** tab inside the website!).
2. Paste the **Live URL** of your prototype (from Vercel or Netlify).
3. Paste the **Technical Documentation for Part 2** (also available in the **"GTM Strategy & Docs"** tab).
