import React, { useState } from 'react';
import { Shield, Flame, Award, Menu, X, Terminal, BookOpen, Wrench, Users, LayoutDashboard, Binary } from 'lucide-react';
import { useUser } from '../context/UserContext';

export type NavTab = 'home' | 'academy' | 'labs' | 'knowledge' | 'tools' | 'community' | 'dashboard';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const { profile } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg group shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-950 border border-sky-500/40 flex items-center justify-center text-sky-400 group-hover:border-sky-400 transition-colors">
              <Shield className="w-5 h-5 text-sky-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white font-mono group-hover:text-sky-300 transition-colors whitespace-nowrap">
                CyberSphere
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'home' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('academy')}
              className={`hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'academy' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Academy
            </button>
            <button
              onClick={() => handleNav('labs')}
              className={`hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'labs' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Labs
            </button>
            <button
              onClick={() => handleNav('knowledge')}
              className={`hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'knowledge' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Knowledge
            </button>
            <button
              onClick={() => handleNav('tools')}
              className={`hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'tools' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Tools
            </button>
            <button
              onClick={() => handleNav('community')}
              className={`hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 ${
                currentTab === 'community' ? 'text-sky-400 font-semibold' : ''
              }`}
            >
              Community
            </button>
          </nav>

          {/* Zone 3: 1 primary action or User Profile button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('dashboard')}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-all text-xs font-medium whitespace-nowrap ${
                currentTab === 'dashboard'
                  ? 'bg-sky-500/10 border-sky-400 text-sky-300'
                  : 'bg-slate-900 border-slate-700/80 text-slate-200 hover:border-slate-600'
              }`}
              title="View Learning Dashboard"
            >
              <div className="flex items-center gap-1.5 text-amber-400 font-mono">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span className="tabular-nums">{profile.streakDays}d</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1 text-emerald-400 font-mono">
                <Award className="w-3.5 h-3.5" />
                <span className="tabular-nums">{profile.xp} XP</span>
              </div>
              <span className="hidden sm:inline font-mono text-slate-400 truncate max-w-[90px]">
                {profile.username.split(' ')[0]}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => handleNav('home')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
              currentTab === 'home' ? 'bg-sky-500/10 text-sky-400 font-medium' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4 text-sky-400" /> Home
          </button>
          <button
            onClick={() => handleNav('academy')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
              currentTab === 'academy' ? 'bg-sky-500/10 text-sky-400 font-medium' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-sky-400" /> Academy
          </button>
          <button
            onClick={() => handleNav('labs')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
              currentTab === 'labs' ? 'bg-sky-500/10 text-sky-400 font-medium' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Binary className="w-4 h-4 text-sky-400" /> Cyber Labs
          </button>
          <button
            onClick={() => handleNav('knowledge')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
              currentTab === 'knowledge' ? 'bg-sky-500/10 text-sky-400 font-medium' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-sky-400" /> Knowledge Hub
          </button>
          <button
            onClick={() => handleNav('tools')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
              currentTab === 'tools' ? 'bg-sky-500/10 text-sky-400 font-medium' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4 text-sky-400" /> Recommended Tools
          </button>
          <button
            onClick={() => handleNav('community')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
              currentTab === 'community' ? 'bg-sky-500/10 text-sky-400 font-medium' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4 text-sky-400" /> Community
          </button>
          <button
            onClick={() => handleNav('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
              currentTab === 'dashboard' ? 'bg-sky-500/10 text-sky-400 font-medium' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-sky-400" /> My Learning Dashboard
          </button>
        </div>
      )}
    </header>
  );
};
