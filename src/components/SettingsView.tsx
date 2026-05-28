import React from 'react';
import { useSignal } from '../context/SignalContext';
import { Shield, ToggleLeft, ToggleRight, Network, Sparkles, KeyRound, Cpu, Terminal, Compass, Zap, BookOpen } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    brightDataConfig,
    toggleBrightDataService,
    selectedModel,
    setSelectedModel
  } = useSignal();

  const handleToggle = (key: string) => {
    toggleBrightDataService(key);
  };

  const docs = [
    { title: 'Variable Configuration', note: 'To deploy server-side intelligence, configure your GEMINI_API_KEY secret. Our Express server handles all extraction calls.' },
    { title: 'Standard Proxy Isolation', note: 'All Scraping Browser and Web Scraper queries are handled via regional pools to prevent target blockage.' },
    { title: 'Continuous Crawling Cycles', note: 'A background scheduler checks competitor pricing files every 15 minutes, pushing alerts if deviations occur.' }
  ];

  return (
    <div id="settings-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 font-sans text-zinc-100 max-w-7xl mx-auto overflow-y-auto h-screen pb-24">
      
      {/* Configuration column left */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Model switcher selection */}
        <div className="glass-panel p-6 rounded-2xl border border-zinc-850 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Gemini Model Synthesis Core</h3>
              <p className="text-[11px] text-zinc-550 font-mono">Select target generation model for text-structuring workflows.</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs text-zinc-400 font-medium">Model Standard Mode:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <button
                type="button"
                id="model-select-flash"
                onClick={() => setSelectedModel('gemini-3.5-flash')}
                className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                  selectedModel === 'gemini-3.5-flash'
                    ? 'bg-zinc-900 border-emerald-500/50 text-white'
                    : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[11px]">gemini-3.5-flash</span>
                  {selectedModel === 'gemini-3.5-flash' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </div>
                <span className="text-[10px] text-zinc-450 font-sans block">Primary. Low Latency. Highly structured output standard.</span>
              </button>

              <button
                type="button"
                id="model-select-pro"
                onClick={() => setSelectedModel('gemini-3.1-pro-preview')}
                className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                  selectedModel === 'gemini-3.1-pro-preview'
                    ? 'bg-zinc-900 border-cyan-500/50 text-white'
                    : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[11px]">gemini-3.1-pro-preview</span>
                  {selectedModel === 'gemini-3.1-pro-preview' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </div>
                <span className="text-[10px] text-zinc-450 font-sans block">Advanced. Deep reasoning. Demands paid billing approval.</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bright Data mock service toggling */}
        <div className="glass-panel p-6 rounded-2xl border border-zinc-850 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
            <Network className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Bright Data Proxy Gateways</h3>
              <p className="text-[11px] text-zinc-550 font-mono">Control scraping spiders and geofencing credentials.</p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            
            {/* SERP API */}
            <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <div className="space-y-1">
                <span className="block text-xs font-semibold text-white">SERP Extraction API Engine</span>
                <span className="text-[10px] text-zinc-500 block">Queries search grounding maps directly for trends indexing.</span>
              </div>
              <button 
                id="setting-toggle-serp"
                onClick={() => handleToggle('serp')}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                {brightDataConfig.serpApiEnabled ? (
                  <ToggleRight className="w-9 h-9 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-zinc-650" />
                )}
              </button>
            </div>

            {/* Web Scraper */}
            <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <div className="space-y-1">
                <span className="block text-xs font-semibold text-white">Web Scraper Javascript Crawler</span>
                <span className="text-[10px] text-zinc-500 block">Crawls client-side heavy corporate sites for pricing parameters.</span>
              </div>
              <button 
                id="setting-toggle-scraper"
                onClick={() => handleToggle('scraper')}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                {brightDataConfig.webScraperEnabled ? (
                  <ToggleRight className="w-9 h-9 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-zinc-650" />
                )}
              </button>
            </div>

            {/* Scraping Browser */}
            <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-900">
              <div className="space-y-1">
                <span className="block text-xs font-semibold text-white">Scraping Browser Container Pools</span>
                <span className="text-[10px] text-zinc-500 block">Hosts dynamic chromium containers to solve captchas.</span>
              </div>
              <button 
                id="setting-toggle-browser"
                onClick={() => handleToggle('browser')}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                {brightDataConfig.scrapingBrowserEnabled ? (
                  <ToggleRight className="w-9 h-9 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-zinc-650" />
                )}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Docs / credential instructions right */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Credentials guidance */}
        <div className="glass-panel p-6 rounded-2xl border border-zinc-850 space-y-4">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4.5 h-4.5 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Credential Documentation</h3>
          </div>

          <div className="space-y-4 pt-1">
            {docs.map((doc, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <span className="font-bold text-zinc-300 block">{doc.title}</span>
                <p className="text-zinc-500 leading-relaxed text-[11px]">{doc.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Server metrics logs */}
        <div className="bg-[#0b0c0e] p-5 rounded-2xl border border-zinc-900 space-y-3.5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-450 uppercase tracking-widest leading-none">
            <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" /> Network Metrics Indicator
          </div>
          
          <div className="space-y-2 text-xs font-mono text-zinc-500">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span>Proxies online:</span>
              <span className="text-white">{(brightDataConfig.proxyIpCount || 14210).toLocaleString()} residential hops</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <span>Average Hop Latency:</span>
              <span className="text-cyan-400">{brightDataConfig.averageResponseMs || 120}ms (99.9% uptime)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Extraction Bandwidth:</span>
              <span className="text-zinc-300">14.8 MB / today</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
