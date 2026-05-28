import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Radar, Shield, Globe, Award, Sparkles, AlertCircle, ArrowRight, Server, Search, Database, RefreshCw, Cpu, Activity, ArrowUpRight } from 'lucide-react';

interface LandingPageProps {
  onEnterConsole: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterConsole }) => {
  const [demoUrl, setDemoUrl] = useState('cursor.com');
  const [demoStatus, setDemoStatus] = useState<'idle' | 'scraping' | 'analyzing' | 'done'>('idle');
  const [scrapedResult, setScrapedResult] = useState<any>(null);

  const stats = [
    { label: 'Active Web Agents', value: '14,200+' },
    { label: 'Signals Scraped / Day', value: '4.8M+' },
    { label: 'Scraping Accuracy', value: '99.94%' },
    { label: 'Average Signal Latency', value: '<2.4s' }
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      title: 'Autonomous Bright Data Crawling',
      description: 'Harness the Web Scraper, Scraping Browser, and SERP APIs to bypass blocking, CAPTCHAs, and geofences for raw, uninterrupted market access.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: 'Multimodal AI Reasoning Agents',
      description: 'Powered by Gemini models to parse extracted structures and automatically synthesize competitor core updates, positioning tactics, and hires.'
    },
    {
      icon: <Activity className="w-6 h-6 text-violet-400" />,
      title: 'High-Velocity Buying Intent',
      description: 'Isolate company expansion patterns, job listings surges, and technical stacks migration paths. Calculate real-time priority scores.'
    },
    {
      icon: <Shield className="w-6 h-6 text-red-400" />,
      title: 'Enterprise Battle Cards',
      description: 'Arm your revenue team with dynamic strengths mapping, weaknesses metrics, and instant counter-arguments optimized for technical objection Handling.'
    }
  ];

  const agentWorkflowSteps = [
    {
      step: '01',
      title: 'Bright Data Extraction',
      desc: 'Scrapes web-wide content, pricing paths, and forum threads at scale without detection.',
      color: 'border-emerald-500/30 text-emerald-400'
    },
    {
      step: '02',
      title: 'Neural Synthesizer',
      desc: 'Gemini models filter noise, extract concrete events schema, and assign contextual business impact.',
      color: 'border-cyan-500/30 text-cyan-400'
    },
    {
      step: '03',
      title: 'Revenue Dispatch',
      desc: 'Pushes real-time notifications, objection pitches, and GTM opportunities directly to your CRM.',
      color: 'border-violet-500/30 text-violet-400'
    }
  ];

  const handleDemoScrape = () => {
    if (!demoUrl.trim()) return;
    setDemoStatus('scraping');
    
    setTimeout(() => {
      setDemoStatus('analyzing');
      
      setTimeout(() => {
        setDemoStatus('done');
        setScrapedResult({
          competitor: demoUrl.replace('.com', '').toUpperCase(),
          industries: 'Artificial Intelligence & Developer Platforms',
          inferredPricing: '$20 / User (Pro Tier) - Capped Unlimited Requests',
          detectedSignal: 'Hiring volume for Compiler Developers surged +18% on EU boards.',
          marketSentiment: 'Strong Positive (+89%)'
        });
      }, 1500);
    }, 1500);
  };

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-emerald-500/30 relative overflow-hidden font-sans">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Global Landing Navbar */}
      <header className="border-b border-zinc-800/60 sticky top-0 bg-[#030303]/80 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-tr from-emerald-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-display font-medium text-lg tracking-tight bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                SignalForge <span className="text-emerald-400 font-bold">AI</span>
              </span>
              <span className="text-[10px] font-mono block text-zinc-500">ENTERPRISE SAAS GTM</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              id="enter-console-nav-btn"
              onClick={onEnterConsole}
              className="px-4.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-sm font-medium transition-all duration-300 flex items-center gap-2"
            >
              Enterprise Login <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
            <button 
              id="launch-console-btn-1"
              onClick={onEnterConsole}
              className="px-4.5 py-2 rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 text-black hover:opacity-90 text-sm font-semibold cursor-pointer transition-all duration-300 shadow-md shadow-emerald-500/20"
            >
              Launch Console
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 mb-6 text-xs text-zinc-400 font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Empowering global revenue teams with real-time intent
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-bold tracking-tight text-white leading-none"
          >
            Transform the Live Web Into <br />
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent font-extrabold">
              Revenue Intelligence
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            SignalForge AI continuously monitors competitors, buying signals, and market movements using autonomous AI agents powered by Bright Data infrastructure.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button 
              id="hero-cta-launch"
              onClick={onEnterConsole}
              className="px-8 py-4 rounded-xl bg-linear-to-r from-emerald-500 via-cyan-500 to-emerald-400 text-black font-semibold text-base transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-emerald-500/10 cursor-pointer flex items-center gap-2 group"
            >
              Access GTM Command Center
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a 
              href="#sandbox"
              className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 font-medium text-zinc-300 text-base transition-all duration-300 flex items-center gap-2"
            >
              Simulate Live Scrape
            </a>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-zinc-900 bg-black/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((st, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl font-display font-bold text-white tracking-tight bg-linear-to-b from-white to-zinc-400 bg-clip-text text-transparent">{st.value}</div>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">
            Autonomous GTM Intelligence Capabilities
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Automating the operational process of competitor intelligence so reps focus entirely on closed-won cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div 
              key={i} 
              className="glass-panel p-6 rounded-2xl relative group overflow-hidden transition-all duration-300 hover:border-zinc-700/80"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {feat.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE INTELLIGENCE PREVIEW (SANDBOX) */}
      <section id="sandbox" className="py-20 bg-zinc-950/40 border-t border-zinc-900 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-mono">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Live Crawler Simulator
              </div>
              <h2 className="text-3xl font-display font-bold text-white tracking-tight leading-tight">
                Instantly Analyze Any Digital Footprint
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Enter any enterprise domain below. SignalForge AI will simulate a multi-layered proxy retrieval job using Bright Data Scraping Browser to fetch the site metadata, followed by AI-synthesized categorization.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-zinc-500 text-sm font-mono">https://</span>
                  <input 
                    type="text" 
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="example.com"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl py-3.5 pl-17 pr-4 text-sm text-white font-mono outline-hidden focus:ring-1 focus:ring-emerald-500/50"
                  />
                </div>
                <button 
                  id="sandbox-trigger-btn"
                  onClick={handleDemoScrape}
                  disabled={demoStatus === 'scraping' || demoStatus === 'analyzing'}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:opacity-90 font-semibold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                  {demoStatus === 'idle' && <>Analyze Endpoint <ArrowUpRight className="w-4 h-4" /></>}
                  {demoStatus === 'scraping' && <>Scraping Web Targets (Bright Data)...</>}
                  {demoStatus === 'analyzing' && <>AI Engine Structuring Data...</>}
                  {demoStatus === 'done' && <>Analysis Complete, Re-run Audit <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="glass-panel rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl relative">
                
                {/* Terminal Header */}
                <div className="bg-zinc-900/60 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/50" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">bright_data_scraping_browser.sh</span>
                  <div className="w-14" />
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-xs text-zinc-400 space-y-4 min-h-76 flex flex-col justify-between">
                  {demoStatus === 'idle' && (
                    <div className="space-y-2 text-center my-auto">
                      <Search className="w-8 h-8 text-zinc-600 mx-auto animate-pulse" />
                      <p className="text-zinc-500">Telemetry engine ready. Provide domain URL to test extraction pipeline.</p>
                    </div>
                  )}

                  {(demoStatus === 'scraping' || demoStatus === 'analyzing') && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                        <Activity className="w-4 h-4 animate-spin text-emerald-400" />
                        <span>[ESTABLISHING BRIGHT DATA SCRAPING SESSION]</span>
                      </div>
                      <p className="text-zinc-500">Connecting to proxy pool: 14,210 active IP nodes available...</p>
                      <p className="text-zinc-300">✓ Target reached: {demoUrl}</p>
                      
                      {demoStatus === 'analyzing' && (
                        <>
                          <p className="text-cyan-400 animate-pulse">⚙ [AGENT] Invoking intelligent model parser (gemini-3.5-flash)...</p>
                          <p className="text-zinc-500">Extracting competitive pricing arrays and sentiment shifts...</p>
                        </>
                      )}
                    </div>
                  )}

                  {demoStatus === 'done' && scrapedResult && (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> AGENT ANALYSIS SUCCESS:
                        </span>
                        <span className="text-[10px] text-zinc-500">Latency: 142ms</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-1">
                        <span className="text-zinc-500">Competitor:</span>
                        <span className="text-white col-span-2">{scrapedResult.competitor}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-1">
                        <span className="text-zinc-500">Industry Sector:</span>
                        <span className="text-zinc-300 col-span-2">{scrapedResult.industries}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-1">
                        <span className="text-zinc-500">Detected Plans:</span>
                        <span className="text-cyan-400 col-span-2">{scrapedResult.inferredPricing}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-1">
                        <span className="text-zinc-500">Intelligent Signal:</span>
                        <span className="text-zinc-300 col-span-2">{scrapedResult.detectedSignal}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-1">
                        <span className="text-zinc-500">Sentiment Engine:</span>
                        <span className="text-emerald-400 font-semibold col-span-2">{scrapedResult.marketSentiment}</span>
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-zinc-600 border-t border-zinc-900 pt-3 flex justify-between">
                    <span>IP Mapped: 185.22.148.10 (BRIGHT_DATA_UK)</span>
                    <span className="text-emerald-500/80 animate-pulse">● SERVICE STATE: STREAMING</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AI AGENT WORKFLOW */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">
            Multi-Agent GTM Workflows
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            No manual curation. Each specialist agent runs distinct web operations pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agentWorkflowSteps.map((step, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-2xl border border-zinc-800 relative">
              <div className="absolute top-4 right-6 text-5xl font-extrabold text-zinc-800/40 select-none">
                {step.step}
              </div>
              <h3 className={`text-lg font-bold mb-3 ${step.color.includes('emerald') ? 'text-emerald-400' : step.color.includes('cyan') ? 'text-cyan-400' : 'text-violet-400'}`}>
                {step.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BRIGHT DATA ARCHITECTURE BANNER */}
      <section className="py-20 bg-zinc-950 border-t border-b border-zinc-900 px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Globe className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
          <h2 className="text-2xl sm:text-3.5xl font-display font-medium text-white tracking-tight">
            Empowered by Bright Data Infrastructure
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            SignalForge AI leverages Bright Data Web Scraping and SERP infrastructure, ensuring zero geoblocking, fast rendering of complex client-side applications via sandboxed Scraping Browser containers, and constant IP rotation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-zinc-500">
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">✓ Web Scraper API</span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">✓ SERP Intelligence API</span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">✓ Scraping Browser Node</span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">✓ Web Unlocker Captcha bypass</span>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8 glass-panel py-12 px-6 sm:px-12 rounded-3xl border border-zinc-800/80 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Ready to Out-Scrape Your Competitors?
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            Unlock complete market visibility. Access our autonomous GTM suite now to start compiling intelligent battle cards in real-time.
          </p>
          
          <button 
            id="landing-cta-bottom"
            onClick={onEnterConsole}
            className="px-8 py-4.5 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-black font-bold hover:opacity-95 transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-cyan-500/10 cursor-pointer"
          >
            Launch GTM Suite Console
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 py-12 text-center text-xs text-zinc-650">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 SignalForge AI. Licensed for enterprise competitive enablement teams. Built with Bright Data proxies.</p>
          <div className="flex gap-4 text-zinc-500 font-mono">
            <a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a>
            <span>•</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Term of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
