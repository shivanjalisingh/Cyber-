export type CategoryId =
  | 'fundamentals'
  | 'networking'
  | 'linux'
  | 'ethical-hacking'
  | 'web-security'
  | 'cryptography'
  | 'forensics'
  | 'malware-analysis'
  | 'cloud-security'
  | 'iot-blockchain';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  overview: string;
  content: {
    keyConcepts: string[];
    sections: {
      heading: string;
      body: string;
      codeBlock?: {
        language: string;
        code: string;
        caption?: string;
      };
      callout?: {
        type: 'info' | 'warning' | 'tip';
        title: string;
        text: string;
      };
    }[];
    interactiveComponent?: 'cia-triad' | 'handshake-sim' | 'chmod-calc' | 'owasp-matrix' | 'crypto-keys';
    practicalExercise: {
      task: string;
      hint: string;
      solution: string;
    };
  };
  quiz: QuizQuestion[];
}

export interface CourseCategory {
  id: CategoryId;
  title: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  iconName: string;
  description: string;
  lessons: Lesson[];
  recommendedResources: {
    title: string;
    urlOrRef: string;
    type: 'RFC / Standard' | 'Documentation' | 'Book' | 'Lab Environment';
  }[];
}

export interface Packet {
  id: number;
  timestamp: string;
  sourceIp: string;
  destIp: string;
  protocol: 'TCP' | 'UDP' | 'DNS' | 'HTTP' | 'ICMP' | 'ARP';
  length: number;
  info: string;
  flags?: string;
  payloadHex: string;
  payloadAscii: string;
  analysis: {
    isSuspicious: boolean;
    threatDescription?: string;
    recommendation?: string;
  };
}

export interface PhishingEmail {
  id: string;
  senderName: string;
  senderEmail: string;
  replyTo: string;
  date: string;
  subject: string;
  preview: string;
  bodyHtml: string;
  targetLinkUrl: string;
  targetLinkDisplay: string;
  attachments?: { filename: string; extension: string; suspicious: boolean }[];
  isPhishing: boolean;
  redFlags: string[];
  legitimacyNotes: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  source: 'auth.log' | 'nginx_access.log' | 'syslog' | 'firewall.log';
  severity: 'INFO' | 'NOTICE' | 'WARNING' | 'ALERT';
  message: string;
  ip: string;
  isAnomaly: boolean;
  anomalyReason?: string;
}

export interface CtfChallenge {
  id: string;
  title: string;
  category: 'Cryptography' | 'Web' | 'Forensics' | 'Steganography' | 'Network';
  difficulty: 'Beginner' | 'Easy' | 'Medium';
  points: number;
  prompt: string;
  clues: string[];
  hintPenalty: number;
  flagAnswer: string;
  solutionExplanation: string;
}

export interface SecurityTool {
  id: string;
  name: string;
  category: 'Network Analysis' | 'Web Security' | 'Vulnerability Scanner' | 'Operating System' | 'Reverse Engineering' | 'Intrusion Detection';
  tagline: string;
  officialSite: string;
  license: string;
  purpose: string;
  coreFeatures: string[];
  installCommands: { os: string; cmd: string }[];
  sampleCommands: { cmd: string; description: string }[];
  ethicalGuidelines: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  author: string;
  date: string;
  summary: string;
  content: string[];
}

export interface GlossaryTerm {
  term: string;
  acronym?: string;
  category: string;
  definition: string;
  example: string;
}

export interface CheatSheet {
  id: string;
  title: string;
  description: string;
  sections: {
    title: string;
    commands: { cmd: string; desc: string }[];
  }[];
}

export interface IncidentCaseStudy {
  id: string;
  title: string;
  year: number;
  targetOrganization: string;
  attackVector: string;
  impactSummary: string;
  rootCause: string;
  timeline: { date: string; event: string }[];
  defensiveTakeaways: string[];
}

export interface CommunityPost {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  category: string;
  timestamp: string;
  content: string;
  upvotes: number;
  replies: {
    id: string;
    author: string;
    authorRole: string;
    timestamp: string;
    content: string;
  }[];
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserProfile {
  username: string;
  handle: string;
  roleTitle: string;
  avatarSeed: string;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
  solvedChallenges: string[];
  bookmarkedArticles: string[];
  badges: string[];
}
