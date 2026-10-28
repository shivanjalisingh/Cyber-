/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { Homepage } from './views/Homepage';
import { AcademyView } from './views/AcademyView';
import { LabsView } from './views/LabsView';
import { KnowledgeHubView } from './views/KnowledgeHubView';
import { ToolsView } from './views/ToolsView';
import { AboutCommunityView } from './views/AboutCommunityView';
import { DashboardView } from './views/DashboardView';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500/30 selection:text-sky-200">
      {/* Background cyber grid effect */}
      <div className="fixed inset-0 cyber-grid-pattern pointer-events-none opacity-40 z-0" />

      {/* Top Bar Navigation */}
      <Navbar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main View Container */}
      <main className="flex-1 relative z-10">
        {currentTab === 'home' && <Homepage onNavigate={setCurrentTab} />}
        {currentTab === 'academy' && <AcademyView />}
        {currentTab === 'labs' && <LabsView />}
        {currentTab === 'knowledge' && <KnowledgeHubView />}
        {currentTab === 'tools' && <ToolsView />}
        {currentTab === 'community' && <AboutCommunityView />}
        {currentTab === 'dashboard' && <DashboardView onNavigate={setCurrentTab} />}
      </main>

      {/* Global Footer */}
      <Footer onSelectTab={setCurrentTab} />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
