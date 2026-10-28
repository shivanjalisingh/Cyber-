import React from 'react';
import { Shield, Terminal, Binary, ArrowRight, Award, Flame, CheckCircle2, BookOpen, Lock, Activity, Eye, Zap } from 'lucide-react';
import { NavTab } from '../components/Navbar';
import { useUser } from '../context/UserContext';
import { cyberNewsItems } from '../data/knowledgeData';

interface HomepageProps {
  onNavigate: (tab: NavTab) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  const { profile } = useUser();

  const heroImagePath = '/src/assets/images/hero_cyber_defense_1793164861930.jpg';

  const learningPaths = [
    {
      title: 'SOC & Defensive Security Analyst',
      level: 'Beginner to Intermediate',
      hours: '24 hours',
      desc: 'Master network packet inspection, SIEM triage, brute-force identification, and threat response.',
      topics: ['CIA Triad & Threat Models', 'TCP/IP & Packet Flows', 'Log Analysis', 'Incident Triage'],
      accent: 'border-sky-500/40 hover:border-sky-400'
    },
    {
      title: 'Web Application Security & OWASP',
      level: 'Intermediate',
      hours: '18 hours',
      desc: 'Dissect SQL Injection, Cross-Site Scripting (XSS), CSRF, and broken access controls with live sandboxes.',
      topics: ['SQLi Query Manipulation', 'DOM & Stored XSS', 'Authentication Flaws', 'Secure Coding'],
      accent: 'border-emerald-500/40 hover:border-emerald-400'
    },
    {
      title: 'Ethical Hacking & Penetration Testing',
      level: 'Intermediate to Advanced',
      hours: '28 hours',
      desc: 'Explore reconnaissance methodology, port enumeration, vulnerability assessment, and responsible disclosure.',
      topics: ['Passive & Active Recon', 'Nmap & Service Scans', 'CTF Cryptanalysis', 'Legal Standards'],
      accent: 'border-purple-500/40 hover:border-purple-400'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 tracking-wide">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>INTERACTIVE CYBER DEFENSE PLATFORM</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Understand the Threats.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                  Master the Defense.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl text-balance">
                Your journey into cybersecurity starts here. Learn core concepts from ground zero, inspect simulated malicious packets, solve safe CTF exercises, and practice ethical hacking in browser sandboxes.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('academy')}
                  className="px-6 py-3.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Learning</span>
                </button>
                <button
                  onClick={() => onNavigate('labs')}
                  className="px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-sm tracking-wide transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Binary className="w-4 h-4 text-emerald-400" />
                  <span>Explore Cyber Labs</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Free & Open Access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>10 Guided Cyber Domains</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Safe Browser Sandboxes</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Overlaid Telemetry */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
                <img
                  src={heroImagePath}
                  alt="Cyber Defense Command Operations Center"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Overlaid Card Stats */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800/90 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5 text-sky-400">
                      <Activity className="w-3.5 h-3.5" />
                      Live Sandbox State
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">READY · ACTIVE</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Lessons</span>
                      <span className="font-mono text-sm font-bold text-white tabular-nums">20+</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Labs</span>
                      <span className="font-mono text-sm font-bold text-sky-400 tabular-nums">7 Active</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">CTF Challenges</span>
                      <span className="font-mono text-sm font-bold text-emerald-400 tabular-nums">5 Tiers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Dashboard Preview Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block">
                Your Learning Snapshot
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Welcome back, {profile.username}</span>
                <span className="text-xs font-normal px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {profile.roleTitle}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                You have completed {profile.completedLessons.length} lessons and solved {profile.solvedChallenges.length} CTF challenges.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl min-w-[100px] text-center">
                <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-semibold mb-0.5">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  <span>Streak</span>
                </div>
                <div className="font-mono text-xl font-extrabold text-white tabular-nums">
                  {profile.streakDays} <span className="text-xs font-normal text-slate-400">days</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl min-w-[100px] text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-semibold mb-0.5">
                  <Award className="w-4 h-4" />
                  <span>Total XP</span>
                </div>
                <div className="font-mono text-xl font-extrabold text-white tabular-nums">
                  {profile.xp}
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl min-w-[100px] text-center">
                <div className="flex items-center justify-center gap-1 text-sky-400 text-xs font-semibold mb-0.5">
                  <Shield className="w-4 h-4" />
                  <span>Badges</span>
                </div>
                <div className="font-mono text-xl font-extrabold text-white tabular-nums">
                  {profile.badges.length}
                </div>
              </div>

              <button
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Learning Paths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block mb-1">
              Curated Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Learning Paths
            </h2>
          </div>
          <button
            onClick={() => onNavigate('academy')}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>View all 10 categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningPaths.map((path, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl bg-slate-900/60 border ${path.accent} flex flex-col justify-between space-y-5 transition-all`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono">{path.level}</span>
                  <span className="font-mono tabular-nums">{path.hours}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{path.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{path.desc}</p>
                <div className="pt-2 space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Core Modules:
                  </span>
                  <ul className="space-y-1">
                    {path.topics.map((t, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => onNavigate('academy')}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Enroll in Academy Path</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Hands-On Cyber Labs Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Terminal className="w-4 h-4" />
                <span>PRACTICE IN SAFE SANDBOXES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Browser-Based Interactive Cyber Labs
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Theory without practice is forgotten. CyberSphere features seven interactive browser tools designed to build tangible technical skills without needing virtual machines or dangerous software.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <strong className="text-white block mb-0.5">Packet Analyzer</strong>
                  <span>Inspect Wireshark-style flows and identify DNS tunneling attempts.</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <strong className="text-white block mb-0.5">Phishing Mail Lab</strong>
                  <span>Detect header spoofs, mismatched links, and executable attachments.</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <strong className="text-white block mb-0.5">Cipher & Hash Cracker</strong>
                  <span>Decode Base64, shift Caesar ciphers, and calculate SHA-256 hashes.</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <strong className="text-white block mb-0.5">Web Security Sandbox</strong>
                  <span>Witness live SQLi query manipulation and compare prepared statements.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('labs')}
                  className="px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Launch Interactive Labs</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
                <img
                  src="/src/assets/images/cyber_labs_terminal_1793164864154.jpg"
                  alt="Cyber Labs Terminal Environment"
                  className="w-full h-72 object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Intelligence & News Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block mb-1">
              Real-World Context
            </span>
            <h2 className="text-2xl font-bold text-white">Threat Intelligence & Incident Analysis</h2>
          </div>
          <button
            onClick={() => onNavigate('knowledge')}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>Read full articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cyberNewsItems.map(item => (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-sky-400">{item.category}</span>
                  <span className="font-mono">{item.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-white leading-snug">{item.headline}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.summary}</p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                Source: {item.source}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
