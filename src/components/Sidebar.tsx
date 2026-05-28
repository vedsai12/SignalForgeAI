import React from 'react';
import { LayoutDashboard, Users, Zap, Wallet, Rss, Settings, Sparkles, LogOut } from 'lucide-react';
import { useSignal } from '../context/SignalContext';

interface SidebarProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  onExit: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onChangeTab, onExit }) => {
  const { brightDataConfig } = useSignal();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'competitors', label: 'Competitors', icon: <Users className="w-4 h-4" /> },
    { id: 'signals', label: 'Buying Signals', icon: <Zap className="w-4 h-4" /> },
    { id: 'battlecards', label: 'AI Battle Cards', icon: <Wallet className="w-4 h-4" /> },
    { id: 'livefeed', label: 'Live Telemetry', icon: <Rss className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <aside id="sidebar-root" className="w-60 border-r border-zinc-800 bg-[#0c0c0e] h-screen flex flex-col justify-between sticky top-0 p-4 font-sans select-none shrink-0 z-10">
      
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)] shrink-0">
            <Sparkles className="w-4.5 h-4.5 text-black" fill="currentColor" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white block">SignalForge <span className="text-zinc-500 font-normal">AI</span></span>
            <span className="text-[9px] font-mono block text-zinc-500 uppercase tracking-widest leading-none mt-1">Enterprise Console</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold px-2 mb-3">Intelligence Hub</div>
          <nav className="space-y-1">
            {menuItems.map(item => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-tab-${item.id}`}
                  onClick={() => onChangeTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-800/50 border border-zinc-700 text-emerald-400 font-semibold shadow-[0_0_10px_rgba(52,211,153,0.05)]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 border border-transparent'
                  }`}
                >
                  <div className={isActive ? 'text-emerald-400' : 'text-zinc-500'}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                  {item.id === 'livefeed' && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Telemetry & User Admin Footer Parent */}
      <div className="space-y-4">
        
        {/* System status metrics widget styled like design HTML */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 space-y-2.5 text-[11px] font-mono">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800/60 pb-1.5">
            <span className="text-zinc-450 uppercase tracking-wider font-semibold">SYSTEM STATUS</span>
            <span className="text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse animate-duration-1000" /> Live
            </span>
          </div>
          
          <div className="space-y-1 text-zinc-450">
            <div className="flex justify-between items-center">
              <span>Bright Data:</span>
              <span className="text-emerald-400 font-medium">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Proxy Pool:</span>
              <span className="text-zinc-300">{(brightDataConfig?.proxyIpCount || 14210).toLocaleString()} Nodes</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Latency Index:</span>
              <span className="text-cyan-400">{brightDataConfig?.averageResponseMs || 120}ms</span>
            </div>
          </div>
        </div>

        {/* User profile card from Design HTML */}
        <div className="p-1 border-t border-zinc-800 pt-3">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <div className="w-8 h-8 rounded bg-violet-600 flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
              PE
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-100 truncate">pendotavedsai9</p>
              <p className="text-[10px] text-zinc-500 truncate">Enterprise Admin</p>
            </div>
            <button
              id="exit-console-btn"
              onClick={onExit}
              title="Exit to Landing Hub"
              className="text-zinc-500 hover:text-red-400 p-1.5 rounded hover:bg-zinc-800/50 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </aside>
  );
};
