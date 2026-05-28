import React, { useState } from 'react';
import { useSignal } from '../context/SignalContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Globe, Users, TrendingUp, DollarSign, Activity, AlertTriangle, ArrowRight, BrainCircuit, Play, Sparkles } from 'lucide-react';

interface DashboardViewProps {
  onNavTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavTab }) => {
  const {
    competitors,
    buyingSignals,
    intelligenceLogs,
    brightDataConfig,
    analyticsStats,
    runAiResearch,
    researching,
    errorMessage
  } = useSignal();

  const [searchTarget, setSearchTarget] = useState('');
  const [targetSite, setTargetSite] = useState('');
  const [scrapeFeed, setScrapeFeed] = useState<string | null>(null);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTarget.trim()) return;
    
    setScrapeFeed(`Initializing Gemini full-scale research agent mapping for ${searchTarget}...`);
    const res = await runAiResearch(searchTarget, targetSite || undefined);
    
    if (res.success) {
      setSearchTarget('');
      setTargetSite('');
      setScrapeFeed(`Successfully updated database with battle cards and intent indexes for ${searchTarget}!`);
      setTimeout(() => setScrapeFeed(null), 5000);
    } else {
      setScrapeFeed(`Error conducting research check: ${errorMessage || 'Unknown extraction failure'}`);
    }
  };

  const handlePrepopulate = async (name: string, site: string) => {
    setSearchTarget(name);
    setTargetSite(site);
    setScrapeFeed(`Selected ${name} - Press Launch Research Agent.`);
  };

  // Safe fallback metrics
  const totalPipeline = analyticsStats?.totalPipeline || buyingSignals.reduce((acc, s) => acc + s.opportunityValue, 0);
  const targetCount = competitors.length;
  const confidence = analyticsStats?.overallConfidence || 86;
  const urgency = analyticsStats?.overallUrgency || 81;

  const kpis = [
    { label: 'High Intent Target Pipeline', value: `$${(totalPipeline / 1000000).toFixed(2)}M`, change: '+14.2% MoM', icon: <DollarSign className="w-5 h-5 text-emerald-400" /> },
    { label: 'Scraped Targets Indexed', value: targetCount, change: 'Active continuous cron', icon: <Users className="w-5 h-5 text-cyan-400" /> },
    { label: 'Avg Buyer Urgency', value: `${urgency}%`, change: 'Actionable threshold (>75)', icon: <TrendingUp className="w-5 h-5 text-violet-400" /> },
    { label: 'Confidence Coefficient', value: `${confidence}/100`, change: 'Based on 4 intent vectors', icon: <Globe className="w-5 h-5 text-emerald-400" /> }
  ];

  // Prepare chart formats
  const chartData = analyticsStats?.trendTimeline || [
    { name: 'Week 1', crawls: 420, signals: 12 },
    { name: 'Week 2', crawls: 680, signals: 19 },
    { name: 'Week 3', crawls: 1040, signals: 25 },
    { name: 'Week 4', crawls: 1485, signals: 32 }
  ];

  const sentimentData = competitors.map(c => ({
    name: c.name,
    score: c.sentimentScore
  }));

  const COLORS = ['#10b981', '#06b6d4', '#8b5cf6', '#3b82f6', '#ec4899', '#f59e0b'];

  return (
    <div id="dashboard-view-root" className="space-y-8 p-6 font-sans text-zinc-100 max-w-7xl mx-auto overflow-y-auto h-screen pb-24">
      
      {/* Top Welcome Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
        <div>
          <h2 className="text-2xl font-display font-semibold tracking-tight text-white">Revenue Control & GTM Command Center</h2>
          <p className="text-xs text-zinc-400 mt-1">Autonomous competitive intelligence fed by real-time Bright Data scraper nodes and synthesized by Gemini.</p>
        </div>
        <div className="flex gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-850">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>PROXY FEED : SYNCHRONIZED</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl transition-all duration-200 hover:border-zinc-750 hover:bg-zinc-900/70">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-550 font-semibold uppercase tracking-wider">{kpi.label}</span>
              <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-center">
                {kpi.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">{kpi.value}</div>
            <div className={`text-[10px] mt-2 font-medium font-mono ${index === 0 || index === 3 ? 'text-emerald-400' : 'text-zinc-500'}`}>
              {index === 0 || index === 3 ? '↑ ' : ''}{kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* DISPATCH CRAWL / RESEARCH INITIATOR */}
      <div className="glass-panel p-6 rounded-2xl border border-zinc-800 bg-zinc-950/80 relative overflow-hidden">
        
        {/* Animated Scanning Highlight Line */}
        {researching && <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-400 to-violet-500 animate-pulse" />}

        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-white">Trigger Competitor Intelligence Crawler</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Launches autonomous scraping session via Bright Data scraping infrastructure. Gemini will crawl and auto-populate positioning tactics.</p>
          </div>
        </div>

        <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5">
            <input 
              type="text" 
              value={searchTarget}
              onChange={(e) => setSearchTarget(e.target.value)}
              placeholder="Competitor Name (e.g., Midjourney, Retool, Cursor)"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white font-sans outline-hidden"
              required
            />
          </div>
          <div className="md:col-span-4">
            <input 
              type="text" 
              value={targetSite}
              onChange={(e) => setTargetSite(e.target.value)}
              placeholder="Website URL optional (e.g., midjourney.com)"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white font-sans outline-hidden"
            />
          </div>
          <div className="md:col-span-3">
            <button
              id="dashboard-launch-agent"
              type="submit"
              disabled={researching}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-black hover:opacity-90 font-semibold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              {researching ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  Analyzing Platform...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black" />
                  Launch Scraper Agent
                </>
              )}
            </button>
          </div>
        </form>

        {/* Suggested Targets Trigger Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] font-mono text-zinc-500 border-t border-zinc-900 pt-3">
          <span>Quick Targets:</span>
          <button onClick={() => handlePrepopulate('Midjourney', 'midjourney.com')} className="hover:text-emerald-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800 transition-colors">midjourney.com</button>
          <button onClick={() => handlePrepopulate('Databricks', 'databricks.com')} className="hover:text-emerald-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800 transition-colors">databricks.com</button>
          <button onClick={() => handlePrepopulate('Cursor', 'cursor.com')} className="hover:text-emerald-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800 transition-colors">cursor.com</button>
        </div>

        {scrapeFeed && (
          <div className="mt-3.5 bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-400 p-3 rounded-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{scrapeFeed}</span>
          </div>
        )}
      </div>

      {/* CHARTS GRAPHICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Crawl Performance History Area Chart */}
        <div className="lg:col-span-8 glass-panel p-5 rounded-2xl border border-zinc-800/80">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-sm font-semibold text-white">Daily Crawls & Buying Signals Detected</h4>
              <p className="text-[11px] text-zinc-500 font-mono">Aggregated metrics over trailing 4-week period.</p>
            </div>
            <div className="flex gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Web Crawls
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-violet-500" /> Intent Signals
              </span>
            </div>
          </div>
          
          <div className="h-68">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCrawls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSignals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} fontStyle="mono" />
                <YAxis stroke="#52525b" fontSize={10} fontStyle="mono" />
                <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} />
                <Area type="monotone" dataKey="crawls" stroke="#10b981" fillOpacity={1} fill="url(#colorCrawls)" strokeWidth={2} />
                <Area type="monotone" dataKey="signals" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSignals)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competitor Sentiment Rating Chart */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-zinc-800/80">
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white">Target Sentiment Index</h4>
            <p className="text-[11px] text-zinc-500 font-mono">Continuous web and pricing sentiment tracking scores.</p>
          </div>

          <div className="h-68">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} />
                <YAxis domain={[0, 100]} stroke="#52525b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* TOP PIPELINE OPPORTUNITIES LIST */}
      <div className="glass-panel p-5 rounded-2xl border border-zinc-850/80">
        <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white">High Value Revenue Opportunities</h3>
            <p className="text-xs text-zinc-450 mt-0.5">Scraped signals displaying confidence score & estimated contract pipeline potential.</p>
          </div>
          <button 
            id="dashboard-vitals-signals-btn"
            onClick={() => onNavTab('signals')}
            className="text-xs text-emerald-400 font-medium hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            All Signals <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-400">
            <thead>
              <tr className="border-b border-zinc-900 pb-2 text-zinc-500 font-mono">
                <th className="py-2.5 font-semibold">TARGET COMPANY</th>
                <th className="py-2.5 font-semibold text-center">CONFIDENCE</th>
                <th className="py-2.5 font-semibold text-center">URGENCY</th>
                <th className="py-2.5 font-semibold text-right">PIPELINE VALUE</th>
                <th className="py-2.5 font-semibold text-center">INTENT SECTOR</th>
                <th className="py-2.5 font-semibold text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {buyingSignals.slice(0, 3).map((sig) => (
                <tr key={sig.id} className="border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3">
                    <span className="font-semibold text-white text-[13px]">{sig.companyName}</span>
                    <span className="text-[10px] font-mono block text-zinc-500 mt-0.5">{sig.domain}</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold">{sig.confidenceScore}%</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono font-bold">{sig.urgencyScore}%</span>
                  </td>
                  <td className="py-3 text-right font-mono text-white font-medium">
                    ${sig.opportunityValue.toLocaleString()}
                  </td>
                  <td className="py-3 text-center uppercase tracking-wider text-[9px] font-mono">
                    <span className={`px-2 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-800`}>
                      {sig.flag.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <button 
                      onClick={() => onNavTab('signals')}
                      className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold cursor-pointer underline"
                    >
                      Pitches
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
