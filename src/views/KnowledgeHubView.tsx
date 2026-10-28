import React, { useState } from 'react';
import {
  BookOpen, Search, Bookmark, Copy, Check, Filter,
  Terminal, ShieldAlert, Clock, ArrowRight, X, AlertTriangle, FileText, Newspaper
} from 'lucide-react';
import { knowledgeArticles, glossaryTerms, cheatSheets, incidentCaseStudies, cyberNewsItems } from '../data/knowledgeData';
import { Article } from '../types';
import { useUser } from '../context/UserContext';

type KnowledgeTab = 'articles' | 'glossary' | 'cheatsheets' | 'casestudies' | 'news';

export const KnowledgeHubView: React.FC = () => {
  const { profile, toggleBookmark } = useUser();
  const [activeTab, setActiveTab] = useState<KnowledgeTab>('articles');

  // Article filters
  const [articleSearch, setArticleSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<'ALL' | 'Beginner' | 'Intermediate' | 'Advanced'>('ALL');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Glossary filter
  const [glossarySearch, setGlossarySearch] = useState('');

  // CheatSheet active
  const [activeSheetId, setActiveSheetId] = useState(cheatSheets[0].id);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const filteredArticles = knowledgeArticles.filter(art => {
    const matchesDiff = diffFilter === 'ALL' || art.difficulty === diffFilter;
    const matchesQuery = !articleSearch ||
      art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.summary.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.category.toLowerCase().includes(articleSearch.toLowerCase());
    return matchesDiff && matchesQuery;
  });

  const filteredGlossary = glossaryTerms.filter(term => {
    if (!glossarySearch) return true;
    const q = glossarySearch.toLowerCase();
    return (
      term.term.toLowerCase().includes(q) ||
      (term.acronym && term.acronym.toLowerCase().includes(q)) ||
      term.definition.toLowerCase().includes(q)
    );
  });

  const activeSheet = cheatSheets.find(s => s.id === activeSheetId) || cheatSheets[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>CYBERSECURITY KNOWLEDGE BASE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Knowledge Hub</h1>
        <p className="text-sm text-slate-400 mt-1">
          A curated library of technical articles, searchable cybersecurity glossaries, sysadmin cheat sheets, and post-mortem incident case studies.
        </p>
      </div>

      {/* Nav Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'articles'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Articles & Tutorials</span>
        </button>

        <button
          onClick={() => setActiveTab('glossary')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'glossary'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Security Glossary (A-Z)</span>
        </button>

        <button
          onClick={() => setActiveTab('cheatsheets')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'cheatsheets'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Command Cheat Sheets</span>
        </button>

        <button
          onClick={() => setActiveTab('casestudies')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'casestudies'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Incident Case Studies</span>
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'news'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Newspaper className="w-3.5 h-3.5" />
          <span>Threat Intel News</span>
        </button>
      </div>

      {/* 1. ARTICLES & TUTORIALS */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles by title, topic, or keyword..."
                value={articleSearch}
                onChange={e => setArticleSearch(e.target.value)}
                className="w-full px-3.5 py-2 pl-9 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 mr-1">Difficulty:</span>
              {(['ALL', 'Beginner', 'Intermediate', 'Advanced'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDiffFilter(d)}
                  className={`px-2.5 py-1 rounded text-xs transition-all ${
                    diffFilter === d
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Article Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map(art => {
              const isBookmarked = profile.bookmarkedArticles.includes(art.id);
              return (
                <article
                  key={art.id}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sky-400">{art.category}</span>
                        <span>·</span>
                        <span>{art.difficulty}</span>
                        <span>·</span>
                        <span className="tabular-nums">{art.readTime}</span>
                      </div>
                      <button
                        onClick={() => toggleBookmark(art.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-purple-950 text-purple-400 border-purple-800'
                            : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-white hover:text-sky-300 transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{art.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">By {art.author}</span>
                    <button
                      onClick={() => setSelectedArticle(art)}
                      className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. GLOSSARY */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search cybersecurity terminology (e.g. CIA, 0-Day, MitM, XSS, Honeypot)..."
              value={glossarySearch}
              onChange={e => setGlossarySearch(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{item.term}</span>
                    {item.acronym && (
                      <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800 font-mono text-[10px]">
                        {item.acronym}
                      </span>
                    )}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">{item.category}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.definition}</p>
                <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded text-[11px] text-slate-400">
                  <strong className="text-slate-300">In Practice:</strong> {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. COMMAND CHEAT SHEETS */}
      {activeTab === 'cheatsheets' && (
        <div className="space-y-6">
          {/* Sheet Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {cheatSheets.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSheetId(s.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  activeSheetId === s.id
                    ? 'bg-sky-500 text-slate-950'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">{activeSheet.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{activeSheet.description}</p>
            </div>

            <div className="space-y-6">
              {activeSheet.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <div className="space-y-2">
                    {section.commands.map((cmdItem, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <code className="text-xs font-mono text-emerald-400 select-all">
                          {cmdItem.cmd}
                        </code>
                        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400">
                          <span>{cmdItem.desc}</span>
                          <button
                            onClick={() => handleCopy(cmdItem.cmd)}
                            className="p-1 text-slate-500 hover:text-white transition-colors"
                            title="Copy command"
                          >
                            {copiedCmd === cmdItem.cmd ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. INCIDENT CASE STUDIES */}
      {activeTab === 'casestudies' && (
        <div className="space-y-8">
          {incidentCaseStudies.map(study => (
            <div
              key={study.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5"
            >
              <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-red-400 uppercase tracking-wider block">
                    Security Incident Post-Mortem · {study.year}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{study.title}</h3>
                </div>
                <div className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
                  Target: <strong className="text-white">{study.targetOrganization}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Attack Vector:
                  </span>
                  <span className="text-white font-semibold">{study.attackVector}</span>
                  <p className="text-slate-300 pt-2 leading-relaxed">{study.impactSummary}</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Root Cause:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{study.rootCause}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Intrusion Timeline:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {study.timeline.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs space-y-1">
                      <div className="font-mono text-sky-400 font-bold">{item.date}</div>
                      <div className="text-slate-300 text-[11px] leading-snug">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Defensive Takeaways */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-emerald-400">Defensive Takeaways & Architectural Lessons:</div>
                <ul className="space-y-1.5 text-slate-300">
                  {study.defensiveTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. THREAT INTEL NEWS */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cyberNewsItems.map(item => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-sky-400">{item.category}</span>
                    <span className="font-mono">{item.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">{item.headline}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                  Reported by: {item.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block">
                  {selectedArticle.category} · {selectedArticle.readTime}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedArticle.title}</h3>
                <span className="text-xs text-slate-400">
                  By {selectedArticle.author} · {selectedArticle.date}
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-slate-800 pt-4">
              <button
                onClick={() => toggleBookmark(selectedArticle.id)}
                className="text-xs text-purple-400 hover:underline flex items-center gap-1.5"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>
                  {profile.bookmarkedArticles.includes(selectedArticle.id)
                    ? 'Saved in Dashboard'
                    : 'Save to Bookmarks'}
                </span>
              </button>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
