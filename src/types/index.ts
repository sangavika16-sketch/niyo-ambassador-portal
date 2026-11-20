export interface Ambassador {
  id: string;
  name: string;
  avatar: string;
  college: string;
  exchangeUniversity: string;
  destinationCountry: string;
  countryFlag: string;
  tier: 'Silver' | 'Gold' | 'Platinum';
  onboardingsCount: number;
  forexVolumeINR: number;
  rank: number;
  badge: string;
  linkedinUrl?: string;
  isActive: boolean;
}

export interface ReferralLead {
  id: string;
  studentName: string;
  targetUniversity: string;
  country: string;
  countryFlag: string;
  date: string;
  stage: 'KYC Initiated' | 'Card Dispatched' | 'Card Activated' | 'First International Swipe';
  commissionEarnedINR: number;
  payoutStatus: 'Paid' | 'Processing' | 'Available for Payout';
}

export interface MarketingCampaign {
  id: string;
  title: string;
  description: string;
  rewardINR: number;
  rewardPoints: number;
  category: 'Social Media' | 'Campus Event' | 'Peer Group' | 'Content Creation';
  status: 'Active' | 'Ending Soon' | 'Completed';
  deadline: string;
  submissionsCount: number;
  requirements: string[];
}

export interface TaskSubmission {
  id: string;
  campaignId: string;
  campaignTitle: string;
  submissionDate: string;
  proofUrl: string;
  proofNotes: string;
  status: 'Under Review' | 'Approved' | 'Paid';
  rewardINR: number;
}

export interface AmbassadorFeedback {
  id: string;
  ambassadorName: string;
  college: string;
  message: string;
  category?: 'Product Feature' | 'Card Features' | 'Forex Rates' | 'Commission & Payouts' | 'App UX' | 'Campus Marketing';
  sentiment?: 'Positive' | 'Neutral' | 'Constructive / Issue';
  impactScore?: 'High' | 'Medium' | 'Low';
  aiSummary?: string;
  createdAt: string;
}

export interface Nomination {
  id: string;
  nomineeName: string;
  nomineeEmail: string;
  nomineePhone: string;
  nomineeCollege: string;
  targetCountry: string;
  reason: string;
  submittedAt: string;
  status: 'Reviewing' | 'Contacted' | 'Onboarded';
}
