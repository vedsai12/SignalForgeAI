import React, { useState } from 'react';
import { useSignal } from '../context/SignalContext';
import { BattleCard } from '../types';
import { Sparkles, ShieldCheck, ShieldAlert, Award, MessageSquare, Target, Lightbulb, Zap, Plus, Compass } from 'lucide-react';

export const BattleCardsView: React.FC = () => {
  const { battleCards } = useSignal();
  const [selectedCard, setSelectedCard] = useState<BattleCard | null>(null);

  React.useEffect(() => {
    if (battleCards.length > 0 && !selectedCard) {
      setSelectedCard(battleCards[0]);
    }
  }, [battleCards, selectedCard]);

  const handleSelectBC = (card: BattleCard) => {
    setSelectedCard(card);
  };

  return (
    <div id="battle-cards-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 font-sans text-zinc-100 max-w-7xl mx-auto overflow-y-auto h-screen pb-24">
      
      {/* Competitor Battle selectors left column */}
      <div className="lg:col-span-4 space-y-4 shrink-0">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">Competitor Battlecards ({battleCards.length})</h3>
        
        <div className="space-y-2.5">
          {battleCards.map((card) => {
            const isSelected = selectedCard?.id === card.id;
            return (
              <div
                key={card.id}
                id={`battle-card-menu-item-${card.id}`}
                onClick={() => handleSelectBC(card)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 border-zinc-700 text-white shadow-md shadow-emerald-500/5'
                    : 'glass-panel border-zinc-850 hover:bg-zinc-900/40 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-sm">{card.competitorName}</span>
                  <Award className={`w-4.5 h-4.5 ${isSelected ? 'text-emerald-400' : 'text-zinc-600'}`} />
                </div>
                <p className="text-[11px] font-mono text-zinc-500 line-clamp-1">{card.positioningSummary}</p>
              </div>
            );
          })}
        </div>

        {/* Advisory Tips */}
        <div className="bg-[#0b0b0d] p-4.5 rounded-xl border border-zinc-900 text-[11px] text-zinc-400 font-mono space-y-2 leading-relaxed">
          <span className="font-bold text-emerald-400 block uppercase">★ Enablement Policy</span>
          <p>These sales playbooks are dynamically updated in the background using continuous scraping vectors synced with competitive forum threads.</p>
        </div>
      </div>

      {/* Right column: Battlecard enablement metrics */}
      <div className="lg:col-span-8 space-y-6">
        {selectedCard ? (
          <div className="space-y-6">
            
            {/* Lead Positioning Block */}
            <div className="glass-panel p-6 rounded-2xl border border-zinc-850 space-y-3 relative overflow-hidden">
              <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded">Positioning Summary</span>
              <h2 className="text-xl font-display font-medium text-white">{selectedCard.competitorName} Battle Matrix</h2>
              <p className="text-xs leading-relaxed text-zinc-350">{selectedCard.positioningSummary}</p>
            </div>

            {/* Strengths and Weaknesses sliders side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Strengths (Green highlights) */}
              <div className="glass-panel p-5 rounded-xl border border-zinc-850 space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sourced Competitor Strengths
                </h3>
                <div className="space-y-2.5 pt-1">
                  {selectedCard.strengths.map((str, idx) => (
                    <div key={idx} className="text-xs text-zinc-300 flex items-start gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weaknesses (Amber highlights) */}
              <div className="glass-panel p-5 rounded-xl border border-zinc-850 space-y-3">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-400" /> Exploitable Weaknesses
                </h3>
                <div className="space-y-2.5 pt-1">
                  {selectedCard.weaknesses.map((weak, idx) => (
                    <div key={idx} className="text-xs text-zinc-300 flex items-start gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <span>{weak}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Objection and Counter Pitch handling list */}
            <div className="glass-panel p-5 rounded-xl border border-zinc-850 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 border-b border-zinc-900 pb-3">
                <MessageSquare className="w-4.5 h-4.5 text-cyan-400" /> Objection Resolution Framework
              </h3>

              <div className="space-y-4 pt-1">
                {selectedCard.objectionHandling && selectedCard.objectionHandling.map((pair, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch bg-zinc-900/30 p-4 rounded-xl border border-zinc-850">
                    
                    {/* Obstacle objection */}
                    <div className="md:col-span-5 space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Objection Raised by Prospect:</span>
                      <p className="text-xs font-semibold text-white leading-relaxed">"{pair.objection}"</p>
                    </div>

                    {/* Counter resolution pitch */}
                    <div className="md:col-span-7 bg-zinc-950 p-3.5 rounded-lg border border-zinc-900 space-y-1.5 text-xs">
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-emerald-400" /> Outperform Pivot Pitch:
                      </span>
                      <p className="text-zinc-300 leading-relaxed">"{pair.counterPitch}"</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Strategic positioning suggestions */}
            {selectedCard.positioningStrategy && (
              <div className="glass-panel p-5 rounded-xl border border-zinc-850 space-y-2.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-violet-400" /> GTM Positioning Strategy
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{selectedCard.positioningStrategy}</p>
              </div>
            )}

            {/* AI Custom GTM recommendations checklist */}
            {selectedCard.aiRecommendations && (
              <div className="bg-[#0b0c0f] p-5 rounded-2xl border border-zinc-850 space-y-3.5 relative">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1">
                  <Lightbulb className="w-4 h-4 text-emerald-400 animate-pulse" /> Active AI Lead Enablement Directives
                </span>
                
                <div className="space-y-2.5">
                  {selectedCard.aiRecommendations.map((rec, idx) => (
                    <div key={idx} className="text-xs text-zinc-300 flex items-start gap-2 bg-black/40 p-3 rounded-lg border border-zinc-900">
                      <span className="text-emerald-400 font-mono font-bold shrink-0 mt-0.5">▪</span>
                      <span className="leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="text-center py-12 text-zinc-550 border border-zinc-900 rounded-xl">
            <p>Please select a battlecard from the competitor portfolio roster.</p>
          </div>
        )}
      </div>

    </div>
  );
};
