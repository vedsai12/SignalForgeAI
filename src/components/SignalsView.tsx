import React, { useState } from 'react';
import { useSignal } from '../context/SignalContext';
import { BuyingSignal } from '../types';
import { Sparkles, DollarSign, BrainCircuit, ShieldAlert, Award, ChevronDown, ChevronUp, ArrowUpRight, Search, Zap, Users } from 'lucide-react';

export const SignalsView: React.FC = () => {
  const { buyingSignals } = useSignal();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filteredSignals = buyingSignals.filter(sig => {
    if (filterType === 'all') return true;
    return sig.flag === filterType;
  });

  return (
    <div id="signals-view-root" className="p-6 font-sans text-zinc-100 max-w-7xl mx-auto overflow-y-auto h-screen pb-24 space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-950 pb-5">
        <div>
          <h2 className="text-xl font-display font-semibold text-white">Act Intent & High-Performance Buying Signals</h2>
          <p className="text-xs text-zinc-400 mt-1">Isolating corporate expansion trajectories and cloud deployment metrics to discover high-propensity buyers.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <button 
            onClick={() => setFilterType('all')} 
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${filterType === 'all' ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
          >
            All Signal Types
          </button>
          <button 
            onClick={() => setFilterType('hiring_surge')} 
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${filterType === 'hiring_surge' ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
          >
            Hiring Spikes
          </button>
          <button 
            onClick={() => setFilterType('tech_stack_migration')} 
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${filterType === 'tech_stack_migration' ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
          >
            Stack Migrations
          </button>
          <button 
            onClick={() => setFilterType('exec_hire')} 
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${filterType === 'exec_hire' ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}
          >
            Exec Shuffles
          </button>
        </div>
      </div>

      {/* Signals List Grid */}
      <div className="space-y-4">
        {filteredSignals.length > 0 ? (
          filteredSignals.map(sig => {
            const isExpanded = expandedId === sig.id;
            return (
              <div 
                key={sig.id}
                id={`signal-row-card-${sig.id}`}
                className={`glass-panel rounded-2xl border transition-all duration-300 ${
                  isExpanded ? 'border-zinc-750 bg-[#070708]' : 'border-zinc-850/80 hover:border-zinc-800'
                }`}
              >
                {/* Main Card Header */}
                <div 
                  onClick={() => toggleExpand(sig.id)}
                  className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-[15px] text-white tracking-tight">{sig.companyName}</span>
                      <span className="text-[10px] text-zinc-500 font-mono bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                        {sig.domain}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider bg-zinc-900 text-zinc-350 border border-zinc-800 capitalize">
                        {sig.flag.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1 max-w-2xl">{sig.signals[0]}</p>
                  </div>

                  {/* Metrics Strip */}
                  <div className="flex items-center gap-6 self-stretch justify-between md:self-auto shrink-0 font-mono">
                    <div className="text-center">
                      <span className="block text-[8px] text-zinc-550 uppercase">Opportunity</span>
                      <span className="text-xs font-semibold text-emerald-400 flex items-center justify-center font-bold">
                        ${(sig.opportunityValue / 1000).toLocaleString()}k
                      </span>
                    </div>

                    <div className="text-center">
                      <span className="block text-[8px] text-zinc-550 uppercase">Urgency</span>
                      <span className="text-xs font-semibold text-violet-400 font-bold">{sig.urgencyScore}%</span>
                    </div>

                    <div className="text-center">
                      <span className="block text-[8px] text-zinc-550 uppercase">Confidence</span>
                      <span className="text-xs font-semibold text-cyan-400 font-bold">{sig.confidenceScore}%</span>
                    </div>

                    <div className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-900">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-400" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Drawer Details (AI-synthesised pitch enablement) */}
                {isExpanded && (
                  <div className="border-t border-zinc-900 p-6 bg-zinc-950/40 space-y-6 text-sm animate-fadeIn">
                    
                    {/* Urgency Progress meters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="glass-panel p-4 rounded-xl border border-zinc-850 space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Intent Indicators</span>
                        <div className="flex justify-between items-center pt-1">
                          <span className="font-semibold text-xs text-zinc-100 uppercase tracking-wide">{sig.flag.replace('_', ' ')}</span>
                          <span className="font-mono text-emerald-400 font-bold">Passed</span>
                        </div>
                      </div>

                      <div className="glass-panel p-4 rounded-xl border border-zinc-850 space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Outreach Priority Rating</span>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full mt-2.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" 
                            style={{ width: `${sig.urgencyScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="glass-panel p-4 rounded-xl border border-zinc-850 space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Sourced Datestamps</span>
                        <div className="text-zinc-300 font-mono pt-1 text-xs">Logged: {sig.date}</div>
                      </div>
                    </div>

                    {/* Sourced Signals List Box */}
                    <div className="space-y-2.5">
                      <span className="block text-xs font-bold text-[#10b981] uppercase tracking-wider font-mono">Discovered Signal Bulletins</span>
                      <ul className="space-y-2 text-xs text-zinc-350 list-none">
                        {sig.signals.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start bg-zinc-900/40 p-3 rounded-lg border border-zinc-850">
                            <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* AI Reasoning and Decision Makers */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* AI Reasoning Text */}
                      <div className="lg:col-span-8 space-y-2">
                        <span className="text-xs font-bold text-violet-400 uppercase tracking-wider font-mono flex items-center gap-1">
                          <BrainCircuit className="w-4 h-4 text-violet-400" /> AI Intent Rationale (Sourced by Gemini)
                        </span>
                        <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-850 text-xs leading-relaxed text-zinc-300">
                          {sig.reasoning}
                        </div>
                      </div>

                      {/* Decision makers list */}
                      <div className="lg:col-span-4 space-y-2">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-1">
                          <Users className="w-4 h-4 text-cyan-400" /> Key Stakeholders Sourced
                        </span>
                        <div className="space-y-2.5">
                          {sig.keyDecisionMakers.map((dm, idx) => (
                            <div key={idx} className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-850 flex items-center justify-between">
                              <div>
                                <span className="block text-xs font-semibold text-white">{dm.name}</span>
                                <span className="text-[10px] font-mono text-zinc-500">{dm.title}</span>
                              </div>
                              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                                Outbound Target
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Recommendations action playbook list */}
                    <div className="space-y-3 bg-zinc-900/40 p-5 rounded-2xl border border-zinc-850">
                      <span className="text-xs font-bold text-white uppercase tracking-wider font-mono block">Outbound Pitch Playbook Action Bulletins:</span>
                      <div className="space-y-2.5">
                        {sig.recommendations.map((rec, idx) => (
                          <div key={idx} className="text-xs text-zinc-300 flex items-start gap-2 bg-black/40 p-3 rounded-lg border border-zinc-900">
                            <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="text-center py-12 text-zinc-550 border border-zinc-900 rounded-xl">
            <p>No active GTM buying alerts match the applied filters.</p>
          </div>
        )}
      </div>

    </div>
  );
};
