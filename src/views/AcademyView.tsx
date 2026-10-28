import React, { useState } from 'react';
import {
  Shield, Network, Terminal, Eye, Globe, Lock, Search, Bug, Cloud, Cpu,
  CheckCircle2, Clock, BookOpen, Award, HelpCircle, ArrowRight, ChevronRight, X
} from 'lucide-react';
import { courseCategories } from '../data/coursesData';
import { CategoryId, CourseCategory, Lesson, QuizQuestion } from '../types';
import { useUser } from '../context/UserContext';
import { CiaTriadExplorer, HandshakeVisualizer, ChmodCalculator } from '../components/InteractiveSimulations';

export const AcademyView: React.FC = () => {
  const { profile, completeLesson, saveQuizScore } = useUser();
  const [selectedCatId, setSelectedCatId] = useState<CategoryId>('fundamentals');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('fund-1');
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = courseCategories.find(c => c.id === selectedCatId) || courseCategories[0];
  const currentLesson = currentCategory.lessons.find(l => l.id === selectedLessonId) || currentCategory.lessons[0];

  const isCompleted = profile.completedLessons.includes(currentLesson.id);
  const userScore = profile.quizScores[currentLesson.id];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Lock': return <Lock className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'Bug': return <Bug className="w-5 h-5" />;
      case 'Cloud': return <Cloud className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const handleSelectCategory = (cat: CourseCategory) => {
    setSelectedCatId(cat.id);
    setSelectedLessonId(cat.lessons[0].id);
    setShowHint(false);
    setShowSolution(false);
    setQuizSubmitted(false);
    setQuizAnswers({});
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLessonId(lesson.id);
    setShowHint(false);
    setShowSolution(false);
    setQuizSubmitted(false);
    setQuizAnswers({});
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleToggleComplete = () => {
    completeLesson(currentLesson.id, 50);
  };

  const handleAnswerSelect = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = () => {
    if (!currentLesson.quiz || currentLesson.quiz.length === 0) return;
    setQuizSubmitted(true);
    let correctCount = 0;
    currentLesson.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });
    saveQuizScore(currentLesson.id, correctCount, currentLesson.quiz.length);
    completeLesson(currentLesson.id, 50);
  };

  const filteredCategories = courseCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Academy Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>STRUCTURED CYBER CURRICULUM</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">CyberSphere Academy</h1>
          <p className="text-sm text-slate-400 mt-1">
            Ground-up learning pathways from security fundamentals to advanced threat modeling and forensics.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <div className="relative">
            <input
              type="text"
              placeholder="Search concepts or topics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 pl-9 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2-Column Split: Categories on Left, Lesson Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Category navigation */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
            10 Domain Categories
          </div>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredCategories.map(cat => {
              const isSelected = cat.id === selectedCatId;
              const completedInCat = cat.lessons.filter(l =>
                profile.completedLessons.includes(l.id)
              ).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-400/80 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {getCategoryIcon(cat.iconName)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{cat.title}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>{cat.difficulty}</span>
                        <span>·</span>
                        <span className="tabular-nums">{cat.estimatedHours}h</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-[11px] font-mono text-slate-400">
                    <span className="tabular-nums">
                      {completedInCat}/{cat.lessons.length}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-slate-600'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Recommended Resources for this category */}
          <div className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-xl space-y-2 mt-4 text-xs">
            <span className="font-mono text-slate-400 uppercase tracking-wider block text-[11px]">
              Recommended Standards & Reading
            </span>
            <ul className="space-y-1.5 pt-1">
              {currentCategory.recommendedResources.map((res, i) => (
                <li key={i} className="text-slate-300 flex items-start gap-1.5">
                  <span className="text-sky-400">›</span>
                  <div>
                    <span className="font-semibold text-white">{res.title}</span>
                    <span className="text-slate-400 text-[11px] block">{res.urlOrRef} · {res.type}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Active Category Lessons & Lesson Viewer */}
        <div className="lg:col-span-8 space-y-6">
          {/* Category Banner */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider">
                Active Category
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>Difficulty: <strong className="text-slate-200">{currentCategory.difficulty}</strong></span>
                <span>·</span>
                <span>Estimated: <strong className="text-slate-200">{currentCategory.estimatedHours} Hours</strong></span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-white">{currentCategory.title}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{currentCategory.description}</p>

            {/* Lesson pills tabs */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
              {currentCategory.lessons.map(lesson => {
                const isCur = lesson.id === currentLesson.id;
                const isDone = profile.completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all cursor-pointer ${
                      isCur
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                    <span className="truncate max-w-[200px]">{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Lesson Reader */}
          <article className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Lesson Overview · {currentLesson.durationMinutes} Minutes
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{currentLesson.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{currentLesson.overview}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleToggleComplete}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{isCompleted ? 'Completed (+50 XP)' : 'Mark as Completed'}</span>
                </button>
              </div>
            </div>

            {/* Key Concepts */}
            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Key Concepts Covered:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentLesson.content.keyConcepts.map((kc, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-slate-800/90 text-sky-300 font-mono text-xs border border-slate-700/60"
                  >
                    {kc}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Component if specified */}
            {currentLesson.content.interactiveComponent === 'cia-triad' && <CiaTriadExplorer />}
            {currentLesson.content.interactiveComponent === 'handshake-sim' && <HandshakeVisualizer />}
            {currentLesson.content.interactiveComponent === 'chmod-calc' && <ChmodCalculator />}

            {/* Main Sections */}
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
              {currentLesson.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-base font-bold text-white tracking-tight">{section.heading}</h4>
                  <p className="whitespace-pre-line text-xs sm:text-sm text-slate-300">{section.body}</p>

                  {section.codeBlock && (
                    <div className="my-3 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                      {section.codeBlock.caption && (
                        <div className="px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                          {section.codeBlock.caption}
                        </div>
                      )}
                      <pre className="p-3.5 text-xs font-mono text-emerald-400 overflow-x-auto">
                        <code>{section.codeBlock.code}</code>
                      </pre>
                    </div>
                  )}

                  {section.callout && (
                    <div
                      className={`p-3.5 rounded-lg border text-xs space-y-1 ${
                        section.callout.type === 'tip'
                          ? 'bg-sky-950/30 border-sky-800/50 text-sky-200'
                          : section.callout.type === 'warning'
                          ? 'bg-amber-950/30 border-amber-800/50 text-amber-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <strong className="block text-white font-semibold">{section.callout.title}</strong>
                      <p>{section.callout.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Practical Exercise */}
            {currentLesson.content.practicalExercise && (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <Terminal className="w-4 h-4" />
                  <span>PRACTICAL EXERCISE</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {currentLesson.content.practicalExercise.task}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                  >
                    {showHint ? 'Hide Hint' : 'Reveal Hint'}
                  </button>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="px-3 py-1.5 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs transition-colors cursor-pointer"
                  >
                    {showSolution ? 'Hide Solution' : 'Check Solution'}
                  </button>
                </div>

                {showHint && (
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs text-slate-400">
                    <strong>Hint:</strong> {currentLesson.content.practicalExercise.hint}
                  </div>
                )}

                {showSolution && (
                  <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded text-xs text-emerald-300">
                    <strong>Solution:</strong> {currentLesson.content.practicalExercise.solution}
                  </div>
                )}
              </div>
            )}

            {/* Quiz Launch Card */}
            {currentLesson.quiz && currentLesson.quiz.length > 0 && (
              <div className="p-5 rounded-xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-sky-400" />
                    <h4 className="text-sm font-bold text-white">Lesson Assessment Quiz</h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    {currentLesson.quiz.length} questions to test your conceptual understanding. Earn up to {currentLesson.quiz.length * 25} XP.
                  </p>
                  {userScore !== undefined && (
                    <div className="text-xs font-mono text-emerald-400 font-bold">
                      Your best score: {userScore}%
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setQuizModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{userScore !== undefined ? 'Retake Quiz' : 'Take Lesson Quiz'}</span>
                </button>
              </div>
            )}
          </article>
        </div>
      </div>

      {/* Quiz Modal */}
      {quizModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block">
                  Knowledge Evaluation
                </span>
                <h3 className="text-lg font-bold text-white">{currentLesson.title} Quiz</h3>
              </div>
              <button
                onClick={() => setQuizModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions list */}
            <div className="space-y-6">
              {currentLesson.quiz.map((q, qIdx) => {
                const userChoice = quizAnswers[qIdx];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div key={q.id} className="space-y-3 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                    <div className="text-xs font-semibold text-white leading-relaxed">
                      <span className="font-mono text-sky-400 mr-2">{qIdx + 1}.</span>
                      {q.question}
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userChoice === optIdx;
                        let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'bg-red-950/40 border-red-500 text-red-300';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-sky-500/20 border-sky-400 text-sky-300';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleAnswerSelect(qIdx, optIdx)}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs space-y-1">
                        <span className="font-semibold text-slate-200">
                          {isCorrect ? '✅ Correct!' : '❌ Explanation:'}
                        </span>
                        <p className="text-slate-300">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer controls */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <span className="text-xs text-slate-400">
                Answered: {Object.keys(quizAnswers).length} / {currentLesson.quiz.length}
              </span>
              <div className="flex items-center gap-3">
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < currentLesson.quiz.length}
                    className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs disabled:opacity-40 cursor-pointer"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <button
                    onClick={() => setQuizModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
                  >
                    Done & Return
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
