import React, { useState } from 'react';
import {
  Shield, Flame, Award, BookOpen, Flag, Bookmark, CheckCircle2,
  Lock, RefreshCw, User, Edit3, X, Calendar, ArrowRight
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { NavTab } from '../components/Navbar';
import { courseCategories } from '../data/coursesData';
import { knowledgeArticles } from '../data/knowledgeData';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { profile, badges, updateProfile, checkInStreak, resetProgress } = useUser();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(profile.username);
  const [roleInput, setRoleInput] = useState(profile.roleTitle);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      updateProfile(nameInput.trim(), roleInput.trim());
      setIsEditingProfile(false);
    }
  };

  const allLessons = courseCategories.flatMap(c => c.lessons);
  const completedLessonsList = allLessons.filter(l => profile.completedLessons.includes(l.id));
  const bookmarkedArticlesList = knowledgeArticles.filter(a => profile.bookmarkedArticles.includes(a.id));

  // XP Tier rank calculation
  const getRank = (xp: number) => {
    if (xp >= 500) return { title: 'Cyber Sentinel (Tier IV)', next: 1000, currentBase: 500 };
    if (xp >= 250) return { title: 'Security Specialist (Tier III)', next: 500, currentBase: 250 };
    if (xp >= 100) return { title: 'Defense Analyst (Tier II)', next: 250, currentBase: 100 };
    return { title: 'Apprentice Defender (Tier I)', next: 100, currentBase: 0 };
  };

  const rank = getRank(profile.xp);
  const xpInTier = profile.xp - rank.currentBase;
  const xpNeeded = rank.next - rank.currentBase;
  const progressPercent = Math.min(100, Math.round((xpInTier / xpNeeded) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner Profile Summary */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-950 border border-sky-400/60 flex items-center justify-center text-sky-400 font-mono text-2xl font-bold shadow-lg">
              {profile.username.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{profile.username}</h1>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Edit profile"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-sky-400 font-mono mt-0.5">{profile.roleTitle}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Active Rank: <strong className="text-slate-200">{rank.title}</strong>
              </div>
            </div>
          </div>

          {/* Daily Streak Check-in & XP Widget */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={checkInStreak}
              className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Check-in Streak ({profile.streakDays} Days)</span>
            </button>
            <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Total XP:</span>
              <span className="text-emerald-400 font-bold tabular-nums">{profile.xp}</span>
            </div>
          </div>
        </div>

        {/* Tier Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-2">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Next Rank: {rank.next} XP</span>
            <span className="tabular-nums">{progressPercent}% Progress</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-sky-400 text-xs">
            <BookOpen className="w-4 h-4" />
            <span>Completed Lessons</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {profile.completedLessons.length}
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs">
            <Flag className="w-4 h-4" />
            <span>CTFs Solved</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {profile.solvedChallenges.length}
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 text-xs">
            <Award className="w-4 h-4" />
            <span>Badges Unlocked</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {profile.badges.length} / {badges.length}
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-purple-400 text-xs">
            <Bookmark className="w-4 h-4" />
            <span>Saved Resources</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
            {profile.bookmarkedArticles.length}
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Security Badges & Honors</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {profile.badges.length} of {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map(badge => {
            const isUnlocked = profile.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                  isUnlocked
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-500 opacity-60'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg shrink-0 ${
                    isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-600'
                  }`}
                >
                  {isUnlocked ? <CheckCircle2 className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">{badge.name}</div>
                  <div className="text-[11px] text-slate-400 leading-normal">{badge.description}</div>
                  <div className="text-[10px] font-mono">
                    {isUnlocked ? (
                      <span className="text-emerald-400 font-semibold">✓ UNLOCKED</span>
                    ) : (
                      <span className="text-slate-600">LOCKED</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Split: Completed Courses & Bookmarked Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Progress */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Completed Lessons ({completedLessonsList.length})</span>
            </h3>
            <button
              onClick={() => onNavigate('academy')}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
            >
              <span>Academy</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {completedLessonsList.length > 0 ? (
            <div className="space-y-2">
              {completedLessonsList.map(lesson => (
                <div
                  key={lesson.id}
                  className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-white block">{lesson.title}</span>
                    <span className="text-[11px] text-slate-400">Duration: {lesson.durationMinutes} mins</span>
                  </div>
                  {profile.quizScores[lesson.id] !== undefined && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[11px]">
                      Quiz: {profile.quizScores[lesson.id]}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-500 py-6 text-center">
              No lessons marked as completed yet. Start in the Academy!
            </div>
          )}
        </div>

        {/* Bookmarks */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-purple-400" />
              <span>Saved Articles ({bookmarkedArticlesList.length})</span>
            </h3>
            <button
              onClick={() => onNavigate('knowledge')}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              <span>Knowledge Hub</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {bookmarkedArticlesList.length > 0 ? (
            <div className="space-y-2">
              {bookmarkedArticlesList.map(art => (
                <div
                  key={art.id}
                  className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-semibold text-white truncate block">{art.title}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {art.category} · {art.readTime}
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('knowledge')}
                    className="text-xs text-sky-400 hover:underline shrink-0"
                  >
                    Read
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-500 py-6 text-center">
              No bookmarked articles yet. Bookmark tutorials in the Knowledge Hub!
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="p-4 rounded-xl bg-red-950/15 border border-red-900/30 flex items-center justify-between text-xs">
        <span className="text-red-300">
          Reset all local learning statistics, streak, and unlocked badges to initial state.
        </span>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset your local progress?')) {
              resetProgress();
            }
          }}
          className="px-3 py-1.5 rounded bg-red-900/40 hover:bg-red-800/60 text-red-200 border border-red-700/50 cursor-pointer"
        >
          Reset Progress
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveProfile}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Edit Learner Profile</h3>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 block">Full Name / Handle</label>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 block">Security Role Title</label>
              <input
                type="text"
                value={roleInput}
                onChange={e => setRoleInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
