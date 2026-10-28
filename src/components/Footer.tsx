import React from 'react';
import { Shield, Lock, ExternalLink, Heart } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-mono font-bold text-lg">
              <Shield className="w-5 h-5 text-sky-400" />
              <span>CyberSphere</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              A comprehensive, modern cybersecurity education platform dedicated to empowering defenders, ethical hackers, and security researchers worldwide. Learn hands-on in safe simulated sandboxes.
            </p>
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs text-slate-400 leading-normal flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Defensive Security Pledge:</strong> All lab exercises and simulations operate in safe local sandboxes. We advocate strictly responsible disclosure, legal compliance, and defense-first practices.
              </span>
            </div>
          </div>

          {/* Quick Learning Paths */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Learning Academy
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('academy')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Cybersecurity Fundamentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('academy')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Networking & Protocols
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('academy')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Web Security & OWASP Top 10
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('academy')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Cryptography & Data Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('academy')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Digital Forensics & Incident Response
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Labs & Resources */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Practice & Reference
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('labs')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Network Packet Inspector
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('labs')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Phishing Email Detective
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('labs')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Beginner CTF Arena
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('knowledge')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Command Cheat Sheets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tools')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Recommended Tool Guides
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CyberSphere Education Platform. Open for students and security defenders.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectTab('community')}
              className="hover:text-slate-300 transition-colors"
            >
              Code of Ethics
            </button>
            <span>·</span>
            <button
              onClick={() => onSelectTab('community')}
              className="hover:text-slate-300 transition-colors"
            >
              Contact & Feedback
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
