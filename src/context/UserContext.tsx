import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserBadge, UserProfile } from '../types';

export const allBadges: UserBadge[] = [
  {
    id: 'badge-first-step',
    name: 'Cyber Cadet',
    description: 'Completed your first cybersecurity lesson.',
    icon: 'ShieldCheck'
  },
  {
    id: 'badge-cipher',
    name: 'Cipher Breaker',
    description: 'Successfully decrypted a secret cipher challenge.',
    icon: 'Key'
  },
  {
    id: 'badge-packet',
    name: 'Packet Sentry',
    description: 'Inspected and classified malicious network traffic.',
    icon: 'Activity'
  },
  {
    id: 'badge-phish',
    name: 'Phish Hunter',
    description: 'Detected a deceptive credential harvesting attempt.',
    icon: 'MailCheck'
  },
  {
    id: 'badge-sqli',
    name: 'Injection Defender',
    description: 'Understood SQL injection mechanics and parameterized defense.',
    icon: 'Database'
  },
  {
    id: 'badge-sentinel',
    name: 'Cyber Sentinel',
    description: 'Earned over 500 Experience Points in training.',
    icon: 'Award'
  }
];

interface UserContextType {
  profile: UserProfile;
  badges: UserBadge[];
  completeLesson: (lessonId: string, earnedXp?: number) => void;
  saveQuizScore: (lessonId: string, score: number, total: number) => void;
  solveChallenge: (challengeId: string, earnedPoints: number) => void;
  toggleBookmark: (articleId: string) => void;
  updateProfile: (username: string, roleTitle: string) => void;
  checkInStreak: () => void;
  resetProgress: () => void;
}

const defaultProfile: UserProfile = {
  username: 'Alex Rivera',
  handle: 'alex_cyberdef',
  roleTitle: 'Apprentice Defense Analyst',
  avatarSeed: 'alex',
  xp: 120,
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['fund-1'],
  quizScores: {
    'fund-1': 100
  },
  solvedChallenges: ['ctf-1'],
  bookmarkedArticles: ['art-1', 'art-3'],
  badges: ['badge-first-step', 'badge-cipher']
};

const STORAGE_KEY = 'cybersphere_user_state_v1';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return defaultProfile;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Ignored
    }
  }, [profile]);

  const checkBadgeUnlocks = (newProfile: UserProfile): string[] => {
    const updatedBadges = [...newProfile.badges];

    if (newProfile.completedLessons.length > 0 && !updatedBadges.includes('badge-first-step')) {
      updatedBadges.push('badge-first-step');
    }
    if (newProfile.solvedChallenges.length > 0 && !updatedBadges.includes('badge-cipher')) {
      updatedBadges.push('badge-cipher');
    }
    if (newProfile.xp >= 500 && !updatedBadges.includes('badge-sentinel')) {
      updatedBadges.push('badge-sentinel');
    }
    if (newProfile.completedLessons.includes('web-1') && !updatedBadges.includes('badge-sqli')) {
      updatedBadges.push('badge-sqli');
    }

    return updatedBadges;
  };

  const completeLesson = (lessonId: string, earnedXp = 50) => {
    setProfile(prev => {
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      const newCompleted = alreadyCompleted
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];
      const newXp = alreadyCompleted ? prev.xp : prev.xp + earnedXp;

      const updated: UserProfile = {
        ...prev,
        completedLessons: newCompleted,
        xp: newXp
      };
      updated.badges = checkBadgeUnlocks(updated);
      return updated;
    });
  };

  const saveQuizScore = (lessonId: string, score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    const earnedXp = score * 25;

    setProfile(prev => {
      const newQuizScores = { ...prev.quizScores, [lessonId]: percentage };
      const updated: UserProfile = {
        ...prev,
        xp: prev.xp + earnedXp,
        quizScores: newQuizScores
      };
      updated.badges = checkBadgeUnlocks(updated);
      return updated;
    });
  };

  const solveChallenge = (challengeId: string, earnedPoints: number) => {
    setProfile(prev => {
      if (prev.solvedChallenges.includes(challengeId)) return prev;
      const updated: UserProfile = {
        ...prev,
        solvedChallenges: [...prev.solvedChallenges, challengeId],
        xp: prev.xp + earnedPoints
      };
      updated.badges = checkBadgeUnlocks(updated);
      return updated;
    });
  };

  const toggleBookmark = (articleId: string) => {
    setProfile(prev => {
      const isBookmarked = prev.bookmarkedArticles.includes(articleId);
      return {
        ...prev,
        bookmarkedArticles: isBookmarked
          ? prev.bookmarkedArticles.filter(id => id !== articleId)
          : [...prev.bookmarkedArticles, articleId]
      };
    });
  };

  const updateProfile = (username: string, roleTitle: string) => {
    setProfile(prev => ({
      ...prev,
      username,
      roleTitle
    }));
  };

  const checkInStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastActiveDate === today) return;

    setProfile(prev => ({
      ...prev,
      lastActiveDate: today,
      streakDays: prev.streakDays + 1,
      xp: prev.xp + 20
    }));
  };

  const resetProgress = () => {
    setProfile({
      ...defaultProfile,
      xp: 0,
      streakDays: 1,
      completedLessons: [],
      quizScores: {},
      solvedChallenges: [],
      badges: []
    });
  };

  const badgesWithStatus: UserBadge[] = allBadges.map(b => ({
    ...b,
    unlockedAt: profile.badges.includes(b.id) ? 'Unlocked' : undefined
  }));

  return (
    <UserContext.Provider
      value={{
        profile,
        badges: badgesWithStatus,
        completeLesson,
        saveQuizScore,
        solveChallenge,
        toggleBookmark,
        updateProfile,
        checkInStreak,
        resetProgress
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
