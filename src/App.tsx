import React, { useState } from 'react';
import { SignalProvider, useSignal } from './context/SignalContext';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { CompetitorsView } from './components/CompetitorsView';
import { SignalsView } from './components/SignalsView';
import { BattleCardsView } from './components/BattleCardsView';
import { LiveFeedView } from './components/LiveFeedView';
import { SettingsView } from './components/SettingsView';

function ConsoleLayout() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const { loading } = useSignal();

  const handleExitToLanding = () => {
    // Navigate home
    window.location.hash = '';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardView onNavTab={(tab) => setCurrentTab(tab)} />;
      case 'competitors':
        return <CompetitorsView />;
      case 'signals':
        return <SignalsView />;
      case 'battlecards':
        return <BattleCardsView />;
      case 'livefeed':
        return <LiveFeedView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView onNavTab={(tab) => setCurrentTab(tab)} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center space-y-3 font-sans text-zinc-400">
        <span className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
        <span className="text-xs font-mono tracking-widest uppercase">Initializing SignalForge AI...</span>
      </div>
    );
  }

  return (
    <div className="flex bg-[#030303] text-zinc-100 min-h-screen relative overflow-hidden font-sans">
      
      {/* Decorative ambient background orb */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />

      {/* Sidebar navigation */}
      <Sidebar 
        currentTab={currentTab} 
        onChangeTab={setCurrentTab} 
        onExit={handleExitToLanding}
      />

      {/* Primary content node */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header */}
        <header className="h-14 border-b border-zinc-800 px-6 flex items-center justify-between bg-zinc-950/20 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-xs italic">Organization:</span>
            <span className="text-xs font-semibold text-zinc-300">Revenue Ops / Tech Scaleups</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[11px] flex items-center gap-2 text-zinc-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Live Intelligence Stream
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden duration-300 animate-fadeIn relative h-[calc(100vh-56px)]">
          {renderActiveTab()}
        </div>
      </main>

    </div>
  );
}

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'console'>('landing');

  // Listen to visual routing switches
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#console') {
        setViewMode('console');
      } else {
        setViewMode('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleEnterConsole = () => {
    window.location.hash = 'console';
  };

  return (
    <SignalProvider>
      {viewMode === 'landing' ? (
        <LandingPage onEnterConsole={handleEnterConsole} />
      ) : (
        <ConsoleLayout />
      )}
    </SignalProvider>
  );
}
