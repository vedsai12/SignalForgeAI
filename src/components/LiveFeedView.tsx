import React, { useState, useEffect, useRef } from 'react';
import { useSignal } from '../context/SignalContext';
import { IntelligenceLog, RealtimeFeedEvent } from '../types';
import { Terminal, Rss, ShieldAlert, Wifi, WifiOff, RefreshCw, Cpu, Activity, Play, Zap, HelpCircle } from 'lucide-react';

export const LiveFeedView: React.FC = () => {
  const { intelligenceLogs, alerts } = useSignal();
  const [streamEvents, setStreamEvents] = useState<RealtimeFeedEvent[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load baseline values from signal context Alerts
  useEffect(() => {
    if (alerts.length > 0 && streamEvents.length === 0) {
      setStreamEvents(alerts.map(a => ({
        id: a.id,
        type: a.type || 'scraping_success',
        message: a.message,
        timestamp: a.timestamp
      })));
    }
  }, [alerts]);

  // Establish SSE connection to our express endpoint
  useEffect(() => {
    setConnectionStatus('connecting');
    const source = new EventSource('/api/stream');

    source.onopen = () => {
      setConnectionStatus('connected');
    };

    source.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.type === 'connected') return;

        setStreamEvents(prev => {
          const updated = [parsed, ...prev];
          return updated.slice(0, 50); // Keep max 50
        });
      } catch (err) {
        console.error('Error parsing telemetry SSE event:', err);
      }
    };

    source.onerror = () => {
      setConnectionStatus('disconnected');
    };

    return () => {
      source.close();
    };
  }, []);

  // Scroll to anchor on entry
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [streamEvents]);

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'crawl_start':
        return <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[9px] px-2 py-0.5 rounded font-mono">PROXY_DISPATCH</span>;
      case 'scraping_success':
        return <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded font-mono">SCRAWL_SUCCESS</span>;
      case 'agent_analyzing':
        return <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] px-2 py-0.5 rounded font-mono">AI_REASONING</span>;
      case 'signal_detected':
        return <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] px-2 py-0.5 rounded font-mono animate-pulse">INTENT_ALERT</span>;
      case 'battlecard_updated':
        return <span className="bg-violet-500/10 border border-violet-500/30 text-violet-400 text-[9px] px-2 py-0.5 rounded font-mono">CARD_UPSERT</span>;
      default:
        return <span className="bg-zinc-800 border border-zinc-750 text-zinc-400 text-[9px] px-2 py-0.5 rounded font-mono">TELEMETRY_TICK</span>;
    }
  };

  return (
    <div id="live-feed-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 font-sans text-zinc-100 max-w-7xl mx-auto overflow-y-auto h-screen pb-24">
      
      {/* Visual Terminal Teletext Feed Left Column */}
      <div className="lg:col-span-7 flex flex-col h-[calc(100vh-180px)] min-h-[500px] glass-panel rounded-2xl border border-zinc-850 overflow-hidden relative shadow-2xl">
        
        {/* Terminal Title Bar Header */}
        <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-900 flex items-center justify-between shrink-0 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">SignalForge Realtime Wire</span>
          </div>

          <div className="flex items-center gap-3">
            {connectionStatus === 'connected' && (
              <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                <Wifi className="w-3.5 h-3.5" /> LIVE PIPELINE
              </span>
            )}
            {connectionStatus === 'connecting' && (
              <span className="text-cyan-400 flex items-center gap-1 text-[10px] animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> ENGAGING...
              </span>
            )}
            {connectionStatus === 'disconnected' && (
              <span className="text-red-400 flex items-center gap-1 text-[10px]">
                <WifiOff className="w-3.5 h-3.5" /> STANDBY MODE
              </span>
            )}
          </div>
        </div>

        {/* Streaming News Wire Body text */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-zinc-400 space-y-4">
          
          <div className="text-[10px] text-zinc-600 border-b border-zinc-900 pb-3 mb-2 flex justify-between">
            <span>DISPATCH PORT: INCOMING INTENT ALARMS</span>
            <span>SYSTEM RECON : TRUE</span>
          </div>

          {streamEvents.length === 0 ? (
            <div className="text-center py-20 text-zinc-650 flex flex-col items-center gap-2 font-sans my-auto">
              <Activity className="w-8 h-8 text-zinc-700 animate-spin" />
              <p>Polling node ports... Listening for active scraping emissions.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {streamEvents.map((evt) => (
                <div 
                  key={evt.id} 
                  className="p-3 rounded-lg bg-zinc-950/45 border border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-zinc-800 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-zinc-600 text-[10px] shrink-0 font-bold mt-0.5">[{evt.timestamp}]</span>
                    <p className="text-zinc-200 leading-normal text-[11px] font-sans pr-4">{evt.message}</p>
                  </div>
                  <div className="shrink-0 self-end md:self-auto">
                    {getEventBadge(evt.type)}
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          )}

        </div>

        {/* Telemetry bottom console status info */}
        <div className="bg-zinc-950 px-5 py-3 border-t border-zinc-900 flex justify-between text-[11px] font-mono text-zinc-550 shrink-0">
          <span>IP CLUSTER: GLOBAL_PROXY_GRID</span>
          <span className="text-emerald-500 animate-ping">● ACTIVE MONITORING</span>
        </div>

      </div>

      {/* Right Column: Historical / Curated scrap logs archives */}
      <div className="lg:col-span-5 space-y-5 h-[calc(100vh-180px)] overflow-y-auto">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Telemetry History Database</h3>

        <div className="space-y-3.5">
          {intelligenceLogs.map((log) => (
            <div key={log.id} className="glass-panel p-4 rounded-xl border border-zinc-850 space-y-2 text-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`px-2 py-0.5 rounded-[4px] text-[9.5px] font-mono font-semibold uppercase tracking-wider ${
                  log.severity === 'high' 
                    ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                    : log.severity === 'medium'
                    ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
                }`}>
                  {log.severity} Priority
                </span>
                <span className="text-[10px] font-mono text-zinc-500">{log.timestamp}</span>
              </div>

              <h4 className="font-semibold text-white text-[13px]">{log.title}</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">{log.text}</p>

              <div className="text-[10px] font-mono text-zinc-500 border-t border-zinc-900 pt-2 flex justify-between">
                <span>Subject: <span className="text-zinc-350">{log.competitorName}</span></span>
                <span>Source: <span className="text-cyan-400">{log.source}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
