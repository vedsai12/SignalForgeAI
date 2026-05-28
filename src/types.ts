export interface PricingPlan {
  name: string;
  price: string;
  period: 'monthly' | 'yearly' | 'custom';
}

export interface FeatureLaunch {
  title: string;
  date: string;
  impact: 'high' | 'medium' | 'low';
}

export interface Competitor {
  id: string;
  name: string;
  website: string;
  industry: string;
  employeesCount: number;
  pricingPlans: PricingPlan[];
  features: string[];
  hiringStatus: string;
  hiringStats: {
    engineering: number;
    sales: number;
    marketing: number;
    others: number;
  };
  recentHiringAlert?: string;
  techStack: string[];
  marketCapOrFunding: string;
  sentimentScore: number; // 0-100
  sentimentTimeline: { month: string; score: number }[];
  launches: FeatureLaunch[];
  tags: string[];
}

export interface BuyingSignal {
  id: string;
  companyName: string;
  domain: string;
  industry: string;
  signals: string[];
  urgencyScore: number; // 0-100
  confidenceScore: number; // 0-100
  opportunityValue: number; // USD
  keyDecisionMakers: { name: string; title: string; avatar?: string }[];
  flag: 'funding_round' | 'exec_hire' | 'hiring_surge' | 'tech_stack_migration' | 'social_intent';
  date: string;
  reasoning: string;
  recommendations: string[];
}

export type AlertSeverity = 'info' | 'medium' | 'high';

export interface IntelligenceLog {
  id: string;
  type: 'pricing' | 'launch' | 'hiring' | 'sentiment' | 'tech' | 'custom_agent';
  title: string;
  text: string;
  competitorName: string;
  timestamp: string;
  severity: AlertSeverity;
  source: 'Bright Data Scraper' | 'Bright Data SERP' | 'Bright Data Browser' | 'SignalForge AI Agent';
}

export interface ObjectionHandling {
  objection: string;
  counterPitch: string;
}

export interface BattleCard {
  id: string;
  competitorName: string;
  positioningSummary: string;
  strengths: string[];
  weaknesses: string[];
  keyDifferentiators: string[];
  objectionHandling: ObjectionHandling[];
  positioningStrategy: string;
  aiRecommendations: string[];
}

export interface RealtimeFeedEvent {
  id: string;
  type: 'crawl_start' | 'scraping_success' | 'agent_analyzing' | 'signal_detected' | 'battlecard_updated';
  message: string;
  timestamp: string;
  payload?: any;
}
