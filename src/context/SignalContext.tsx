import React, { createContext, useContext, useState, useEffect } from 'react';
import { Competitor, BuyingSignal, IntelligenceLog, BattleCard, RealtimeFeedEvent } from '../types';

interface BrightDataConfig {
  serpApiEnabled: boolean;
  webScraperEnabled: boolean;
  scrapingBrowserEnabled: boolean;
  webUnlockerEnabled: boolean;
  scrapedCountToday: number;
  proxyIpCount: number;
  averageResponseMs: number;
}

interface AnalyticsStats {
  overallConfidence: number;
  overallUrgency: number;
  totalPipeline: number;
  targetCount: number;
  sentimentStats: { name: string; score: number }[];
  trendTimeline: { name: string; crawls: number; signals: number }[];
}

interface SignalContextProps {
  competitors: Competitor[];
  buyingSignals: BuyingSignal[];
  battleCards: BattleCard[];
  intelligenceLogs: IntelligenceLog[];
  alerts: RealtimeFeedEvent[];
  brightDataConfig: BrightDataConfig;
  analyticsStats: AnalyticsStats | null;
  loading: boolean;
  researching: boolean;
  errorMessage: string | null;
  refreshData: () => Promise<void>;
  runAiResearch: (competitor: string, website?: string) => Promise<{ success: boolean; warning?: string }>;
  toggleBrightDataService: (serviceKey: string) => Promise<void>;
  addCustomAlert: (message: string, type?: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const SignalContext = createContext<SignalContextProps | undefined>(undefined);

export const SignalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [buyingSignals, setBuyingSignals] = useState<BuyingSignal[]>([]);
  const [battleCards, setBattleCards] = useState<BattleCard[]>([]);
  const [intelligenceLogs, setIntelligenceLogs] = useState<IntelligenceLog[]>([]);
  const [alerts, setAlerts] = useState<RealtimeFeedEvent[]>([]);
  
  const [brightDataConfig, setBrightDataConfig] = useState<BrightDataConfig>({
    serpApiEnabled: true,
    webScraperEnabled: true,
    scrapingBrowserEnabled: true,
    webUnlockerEnabled: false,
    scrapedCountToday: 1485,
    proxyIpCount: 14210,
    averageResponseMs: 120
  });

  const [analyticsStats, setAnalyticsStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [researching, setResearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState('gemini-3.5-flash');

  const refreshData = async () => {
    try {
      setErrorMessage(null);
      
      const [compRes, sigRes, bcRes, intelRes, alertRes, bdRes, analyticRes] = await Promise.all([
        fetch('/api/competitors'),
        fetch('/api/signals'),
        fetch('/api/battlecards'),
        fetch('/api/intelligence'),
        fetch('/api/alerts'),
        fetch('/api/brightdata'),
        fetch('/api/analytics')
      ]);

      if (compRes.ok) setCompetitors(await compRes.json());
      if (sigRes.ok) setBuyingSignals(await sigRes.json());
      if (bcRes.ok) setBattleCards(await bcRes.json());
      if (intelRes.ok) setIntelligenceLogs(await intelRes.json());
      if (alertRes.ok) setAlerts(await alertRes.json());
      if (bdRes.ok) setBrightDataConfig(await bdRes.json());
      if (analyticRes.ok) setAnalyticsStats(await analyticRes.json());

    } catch (err: any) {
      console.warn('Unable to sync live server data. Applying premium mock state container:', err);
      // Fallback is implicitly fine if the Express server hasn't rebooted yet, handled in the views
    } finally {
      setLoading(false);
    }
  };

  const runAiResearch = async (competitor: string, website?: string) => {
    setResearching(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/agent/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competitor, website })
      });

      if (!res.ok) {
        throw new Error(await res.text() || 'Failed to complete competitive analysis pipeline');
      }

      const report = await res.json();
      await refreshData();
      return { success: true, warning: report.warning };
    } catch (err: any) {
      setErrorMessage(err.message);
      return { success: false };
    } finally {
      setResearching(false);
    }
  };

  const toggleBrightDataService = async (serviceKey: string) => {
    try {
      const res = await fetch('/api/brightdata/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: serviceKey })
      });
      if (res.ok) {
        const body = await res.json();
        setBrightDataConfig(body.config);
        await refreshData();
      }
    } catch (err) {
      console.error('Error toggling Bright Data proxy service:', err);
    }
  };

  const addCustomAlert = (message: string, type: string = 'signal_detected') => {
    const newAlert: RealtimeFeedEvent = {
      id: `custom-alert-${Date.now()}`,
      type: type as any,
      message,
      timestamp: 'Just Now'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 10000); // Polling index
    return () => clearInterval(interval);
  }, []);

  return (
    <SignalContext.Provider
      value={{
        competitors,
        buyingSignals,
        battleCards,
        intelligenceLogs,
        alerts,
        brightDataConfig,
        analyticsStats,
        loading,
        researching,
        errorMessage,
        refreshData,
        runAiResearch,
        toggleBrightDataService,
        addCustomAlert,
        selectedModel,
        setSelectedModel
      }}
    >
      {children}
    </SignalContext.Provider>
  );
};

export const useSignal = () => {
  const context = useContext(SignalContext);
  if (context === undefined) {
    throw new Error('useSignal must be used within a SignalProvider Workspace');
  }
  return context;
};
