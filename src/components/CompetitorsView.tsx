import React, { useState } from 'react';
import { useSignal } from '../context/SignalContext';
import { Competitor } from '../types';
import { Globe, Users, Coins, Sparkles, Plus, Search, ChevronRight, Activity, ArrowUpRight, TrendingUp } from 'lucide-react';

export const CompetitorsView: React.FC = () => {
  const { competitors, runAiResearch, researching, errorMessage } = useSignal();
  const [selectedComp, setSelectedComp] = useState<Competitor | null>(null);
  const [newCompName, setNewCompName] = useState('');
  const [newCompSite, setNewCompSite] = useState('');
  const [agentTriggerMsg, setAgentTriggerMsg] = useState<string | null>(null);

  // Set default competitor selected on load if non selected
  React.useEffect(() => {
    if (competitors.length > 0 && !selectedComp) {
      setSelectedComp(competitors[0]);
    }
  }, [competitors, selectedComp]);

  const handleResearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;

    setAgentTriggerMsg(`Launching autonomous search spiders for ${newCompName}...`);
    const result = await runAiResearch(newCompName, newCompSite || undefined);
    
    if (result.success) {
      setNewCompName('');
      setNewCompSite('');
      setAgentTriggerMsg(`Discovered & analyzed ${newCompName}! Core database updated.`);
      
      // Auto select the newly updated competitor
      const updated = competitors.find(c => c.name.toLowerCase() === newCompName.toLowerCase());
      if (updated) setSelectedComp(updated);
      
      setTimeout(() => setAgentTriggerMsg(null), 5000);
    } else {
      setAgentTriggerMsg(`Scraping block detected or missing model context: ${errorMessage}`);
    }
  };

  const handleSelectComp = (comp: Competitor) => {
    setSelectedComp(comp);
  };

  return (
    <div id="competitors-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 font-sans text-zinc-100 max-w-7xl mx-auto overflow-y-auto h-screen pb-24">
      
      {/* Left panel: List and Add competitor form */}
      <div className="lg:col-span-4 space-y-6 shrink-0">
        
        {/* Dynamic Add Comp Panel */}
        <div className="glass-panel p-5 rounded-xl border border-zinc-850">
          <div className="flex items-center gap-1 text-emerald-400 font-semibold mb-3 text-xs uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Add Tracked Opponent
          </div>
          <p className="text-[11px] text-zinc-400 mb-4 font-sans leading-relaxed">
            SignalForge AI will execute immediate Web scraper tasks matching the domains specified using high performance residential rotating proxies.
          </p>

          <form onSubmit={handleResearchSubmit} className="space-y-3">
            <input 
              type="text" 
              value={newCompName}
              onChange={(e) => setNewCompName(e.target.value)}
              placeholder="Competitor Name (e.g. Midjourney)"
              required
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-lg p-2.5 text-xs text-white outline-hidden"
            />
            <input 
              type="text" 
              value={newCompSite}
              onChange={(e) => setNewCompSite(e.target.value)}
              placeholder="Website URL optional"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-lg p-2.5 text-xs text-white outline-hidden"
            />
            <button
              id="competitors-add-btn"
              type="submit"
              disabled={researching}
              className="w-full py-2 px-3 rounded-lg bg-emerald-500 text-black hover:opacity-95 font-semibold text-xs transition-all duration-300 disabled:opacity-40 cursor-pointer flex items-center justify-center gap-1.5"
            >
              {researching ? (
                <>
                  <Activity className="w-3.5 h-3.5 animate-spin text-black" />
                  Running Spiders...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Trigger Gemini Research
                </>
              )}
            </button>
          </form>

          {agentTriggerMsg && (
            <div className="mt-3 bg-zinc-900 text-[10px] font-mono p-2.5 rounded text-cyan-400 border border-zinc-850 animate-pulse">
              {agentTriggerMsg}
            </div>
          )}
        </div>

        {/* Competitors List Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Indexed Portfolio ({competitors.length})</h3>
          
          <div className="space-y-2.5">
            {competitors.map((comp) => {
              const isSelected = selectedComp?.id === comp.id;
              return (
                <div
                  key={comp.id}
                  id={`comp-card-item-${comp.id}`}
                  onClick={() => handleSelectComp(comp)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 border-emerald-500/50 shadow-sm shadow-emerald-500/5 text-white'
                      : 'glass-panel border-zinc-850/80 hover:bg-zinc-900/40 text-zinc-350'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-sm">{comp.name}</span>
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                      {comp.marketCapOrFunding}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500">
                    <span>{comp.industry}</span>
                    <span className="flex items-center gap-0.5 text-emerald-400">
                      <TrendingUp className="w-3 h-3" /> Sentiment: {comp.sentimentScore}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Right panel: Competitor Profile Detail view */}
      <div className="lg:col-span-8 space-y-6">
        {selectedComp ? (
          <div className="space-y-6">
            
            {/* Header Profiler */}
            <div className="glass-panel p-6 rounded-2xl border border-zinc-850 relative overflow-hidden flex flex-col sm:flex-row justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">Active Competitor Trace</span>
                <h2 className="text-2xl font-display font-bold text-white tracking-tight mt-2">{selectedComp.name}</h2>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-450">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-zinc-500" /> {selectedComp.website}
                  </span>
                  <span>•</span>
                  <span>{selectedComp.industry}</span>
                  <span>•</span>
                  <span>{selectedComp.employeesCount} Staff</span>
                </div>
              </div>

              {/* Sentiment Circle Score Meter */}
              <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-3 rounded-xl border border-zinc-850 self-start shrink-0">
                <div className="text-right">
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Scraper Trust Meter</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">{selectedComp.sentimentScore}%</span>
                </div>
                <div className="w-10 h-10 rounded-full border-3 border-emerald-950 flex items-center justify-center font-mono text-xs text-white border-t-emerald-400 border-l-emerald-400">
                  AI
                </div>
              </div>
            </div>

            {/* Pricing Model comparison list */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* Pricing Cards List */}
              <div className="md:col-span-6 glass-panel p-5 rounded-xl border border-zinc-850 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-zinc-900 pb-2">Pricing Models Sourced</h3>
                <div className="space-y-3">
                  {selectedComp.pricingPlans.map((plan, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-zinc-900/60 p-3 rounded-lg border border-zinc-850">
                      <div>
                        <span className="block text-[13px] font-semibold text-white">{plan.name}</span>
                        <span className="text-[10px] font-mono text-zinc-500 capitalize">{plan.period} pricing</span>
                      </div>
                      <span className="text-sm font-bold text-cyan-400 font-mono">{plan.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hiring analytics alerts */}
              <div className="md:col-span-6 glass-panel p-5 rounded-xl border border-zinc-850 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-zinc-900 pb-2">Active Hiring Analytics</h3>
                
                <div className="space-y-4 text-xs">
                  <div className="bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg flex items-start gap-2 leading-relaxed">
                    <Activity className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold">Latest Alert Sourced From Jobs:</span>
                      <p className="text-[11px] text-zinc-300 mt-1">{selectedComp.recentHiringAlert || 'Recruitment intensity matches stable baseline operations parameters.'}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-mono text-zinc-500 uppercase">Division Allocation:</span>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                      <div className="bg-zinc-900 p-2 rounded border border-zinc-850">
                        <span className="block font-bold text-white text-xs">{selectedComp.hiringStats?.engineering || 12}</span>
                        <span className="text-zinc-500 block">Eng</span>
                      </div>
                      <div className="bg-zinc-900 p-2 rounded border border-zinc-850">
                        <span className="block font-bold text-white text-xs">{selectedComp.hiringStats?.sales || 4}</span>
                        <span className="text-zinc-500 block">Sales</span>
                      </div>
                      <div className="bg-zinc-900 p-2 rounded border border-zinc-850">
                        <span className="block font-bold text-white text-xs">{selectedComp.hiringStats?.marketing || 2}</span>
                        <span className="text-zinc-500 block">Mktg</span>
                      </div>
                      <div className="bg-zinc-900 p-2 rounded border border-zinc-850">
                        <span className="block font-bold text-white text-xs">{selectedComp.hiringStats?.others || 3}</span>
                        <span className="text-zinc-500 block">Ops</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Extracted Core Capabilities List & Tech Stack */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-7 glass-panel p-5 rounded-xl border border-zinc-850 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Feature Capacities (Aesthetic Scrapes)</h4>
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedComp.features.map((feat, idx) => (
                    <span key={idx} className="bg-zinc-900 border border-zinc-800 text-xs px-3 py-1.5 rounded-lg text-zinc-300">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 glass-panel p-5 rounded-xl border border-zinc-850 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Discovered Stack Markers</h4>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedComp.techStack.map((tech, idx) => (
                    <span key={idx} className="bg-zinc-900 text-zinc-450 border border-zinc-850 text-[10px] font-mono px-2.5 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Launch Pipeline Logs */}
            <div className="glass-panel p-5 rounded-xl border border-zinc-850 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Discovered Feature Launches & Releases</h4>
              <div className="space-y-3.5 pt-2">
                {selectedComp.launches && selectedComp.launches.map((launch, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs bg-zinc-900/30 p-3 rounded-lg border border-zinc-850/60">
                    <div className="space-y-1">
                      <span className="block font-semibold text-white">{launch.title}</span>
                      <span className="text-[10px] font-mono text-zinc-500">Date Logged: {launch.date}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold capitalize ${
                      launch.impact === 'high' 
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                        : launch.impact === 'medium'
                        ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
                    }`}>
                      {launch.impact} Impact
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center my-auto py-12 text-zinc-550">
            <p>Please select a competitor from the tracked portfolio list to review intelligence matrices.</p>
          </div>
        )}
      </div>

    </div>
  );
};
