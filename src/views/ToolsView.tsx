import React, { useState } from 'react';
import {
  Wrench, ExternalLink, ShieldCheck, Terminal, Copy, Check, Filter, AlertTriangle, BookOpen
} from 'lucide-react';
import { securityTools } from '../data/toolsData';
import { SecurityTool } from '../types';

export const ToolsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeTool, setActiveTool] = useState<SecurityTool>(securityTools[0]);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const categories = ['ALL', 'Network Analysis', 'Vulnerability Scanner', 'Web Security', 'Operating System', 'Reverse Engineering'];

  const filteredTools = securityTools.filter(t => {
    if (selectedCategory === 'ALL') return true;
    return t.category === selectedCategory;
  });

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
          <Wrench className="w-4 h-4" />
          <span>LEGITIMATE SECURITY TOOL DIRECTORY</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Recommended Security Tools</h1>
        <p className="text-sm text-slate-400 mt-1">
          Explore industry-standard defensive and analytical utilities, installation procedures, syntax guides, and strict legal rules of engagement.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <span className="text-xs text-slate-400 mr-2 font-mono">Category:</span>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
              selectedCategory === c
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 2-Column Split: Tool List vs Deep Dive Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tool Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
            Essential Utilities ({filteredTools.length})
          </div>

          <div className="space-y-2">
            {filteredTools.map(tool => {
              const isSelected = tool.id === activeTool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-400 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-sm text-white">{tool.name}</span>
                    <span className="font-mono text-[11px] text-sky-400">{tool.license}</span>
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-1">{tool.tagline}</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-2 flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {tool.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Tool Inspector */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                <span>{activeTool.category}</span>
                <span>·</span>
                <span>{activeTool.license}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">{activeTool.name}</h2>
              <p className="text-xs text-slate-300 mt-1">{activeTool.tagline}</p>
            </div>

            <a
              href={activeTool.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <span>Official Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            </a>
          </div>

          {/* Purpose & Core Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Tool Purpose & Architecture
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeTool.purpose}</p>

            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Core Capabilities:
              </span>
              <ul className="space-y-1">
                {activeTool.coreFeatures.map((feat, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400">›</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Installation Commands */}
          <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Installation Instructions
            </h4>
            <div className="space-y-2">
              {activeTool.installCommands.map((inst, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[11px] text-slate-400 font-semibold">{inst.os}</span>
                  <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-emerald-400 flex items-center justify-between gap-2 border border-slate-800/80">
                    <code className="select-all break-all">{inst.cmd}</code>
                    <button
                      onClick={() => handleCopy(inst.cmd)}
                      className="p-1 text-slate-500 hover:text-white shrink-0"
                    >
                      {copiedCmd === inst.cmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Usage Commands */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Common Practical Syntax
            </h4>
            <div className="space-y-2">
              {activeTool.sampleCommands.map((s, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <code className="font-mono text-sky-300 select-all">{s.cmd}</code>
                    <button
                      onClick={() => handleCopy(s.cmd)}
                      className="p-1 text-slate-500 hover:text-white"
                    >
                      {copiedCmd === s.cmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ethical & Legal Guardrails */}
          <div className="p-4 bg-amber-950/20 border border-amber-900/40 rounded-xl space-y-1 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Ethical Usage & Legal Compliance</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{activeTool.ethicalGuidelines}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
