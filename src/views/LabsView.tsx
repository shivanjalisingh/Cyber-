import React, { useState } from 'react';
import {
  Key, Binary, Network, Mail, FileText, Flag, Globe,
  CheckCircle2, AlertTriangle, RefreshCw, Eye, ShieldAlert, Award, Copy, Check
} from 'lucide-react';
import { samplePackets, samplePhishingEmails, sampleLogEntries, ctfChallenges } from '../data/labsData';
import { Packet, PhishingEmail, LogEntry, CtfChallenge } from '../types';
import { useUser } from '../context/UserContext';

type LabTab = 'ciphers' | 'converters' | 'packets' | 'phishing' | 'logs' | 'ctf' | 'web-sec';

export const LabsView: React.FC = () => {
  const { solveChallenge, completeLesson } = useUser();
  const [activeTab, setActiveTab] = useState<LabTab>('ciphers');

  // --- 1. Cipher State ---
  const [caesarInput, setCaesarInput] = useState('ATTACK AT DAWN SECURE THE PERIMETER');
  const [caesarShift, setCaesarShift] = useState(3);
  const [caesarMode, setCaesarMode] = useState<'encode' | 'decode'>('encode');
  const [base64Input, setBase64Input] = useState('CyberSphere Security 2026');
  const [base64Mode, setBase64Mode] = useState<'encode' | 'decode'>('encode');
  const [hashInput, setHashInput] = useState('SecurityPassword123!');

  // --- 2. Converter State ---
  const [convText, setConvText] = useState('CYBER');
  const [practiceByte, setPracticeByte] = useState('01000001'); // ASCII 'A'
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [practiceResult, setPracticeResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // --- 3. Packet Analyzer State ---
  const [packetFilter, setPacketFilter] = useState<string>('ALL');
  const [selectedPacket, setSelectedPacket] = useState<Packet>(samplePackets[2]);

  // --- 4. Phishing State ---
  const [selectedEmail, setSelectedEmail] = useState<PhishingEmail>(samplePhishingEmails[0]);
  const [emailJudgments, setEmailJudgments] = useState<Record<string, { verdict: boolean; score: number }>>({});

  // --- 5. Log Inspector State ---
  const [logFilter, setLogFilter] = useState<'ALL' | 'ALERT' | 'WARNING' | 'INFO'>('ALL');
  const [logSearch, setLogSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(sampleLogEntries[1]);

  // --- 6. CTF State ---
  const [activeCtf, setActiveCtf] = useState<CtfChallenge>(ctfChallenges[0]);
  const [ctfInputs, setCtfInputs] = useState<Record<string, string>>({});
  const [ctfFeedback, setCtfFeedback] = useState<Record<string, { status: 'correct' | 'incorrect'; msg: string }>>({});
  const [revealedClues, setRevealedClues] = useState<Record<string, number>>({});

  // --- 7. Web Sec Sandbox State ---
  const [sqliUser, setSqliUser] = useState("admin' --");
  const [sqliPass, setSqliPass] = useState('random_pass');
  const [sqliMode, setSqliMode] = useState<'vulnerable' | 'secure'>('vulnerable');
  const [sqliResult, setSqliResult] = useState<string | null>(null);

  const [xssInput, setXssInput] = useState("<script>alert('Session Hijacked!')</script>");
  const [xssSanitized, setXssSanitized] = useState(false);

  // Helper Caesar shift function
  const applyCaesar = (str: string, shift: number, mode: 'encode' | 'decode'): string => {
    const s = mode === 'encode' ? shift : (26 - (shift % 26)) % 26;
    return str
      .split('')
      .map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + s) % 26) + 65);
        }
        if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + s) % 26) + 97);
        }
        return char;
      })
      .join('');
  };

  // Helper Base64 function
  const applyBase64 = (str: string, mode: 'encode' | 'decode'): string => {
    try {
      if (mode === 'encode') {
        return btoa(str);
      } else {
        return atob(str);
      }
    } catch {
      return '[Invalid Base64 sequence]';
    }
  };

  // Simple deterministic SHA-256 imitation for client-side sandbox
  const pseudoSha256 = (str: string): string => {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = (hash * 0x01000193) >>> 0;
    }
    const hex = hash.toString(16).padStart(8, '0');
    return `${hex}e4a9b238f0d57182c483a99281729012bb940172${hex}9821`;
  };

  // Converter helpers
  const textToHex = (str: string) => {
    return str
      .split('')
      .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(' ');
  };

  const textToBinary = (str: string) => {
    return str
      .split('')
      .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const handlePracticeCheck = () => {
    const expected = String.fromCharCode(parseInt(practiceByte, 2));
    if (practiceAnswer.trim().toUpperCase() === expected) {
      setPracticeResult('correct');
      completeLesson('fund-1', 25);
    } else {
      setPracticeResult('wrong');
    }
  };

  const handleEmailJudge = (phishVerdict: boolean) => {
    const isCorrect = phishVerdict === selectedEmail.isPhishing;
    setEmailJudgments(prev => ({
      ...prev,
      [selectedEmail.id]: { verdict: phishVerdict, score: isCorrect ? 100 : 0 }
    }));
    if (isCorrect) {
      completeLesson('fund-1', 30);
    }
  };

  const handleCtfSubmit = (challenge: CtfChallenge) => {
    const entered = (ctfInputs[challenge.id] || '').trim();
    if (entered.toLowerCase() === challenge.flagAnswer.toLowerCase()) {
      setCtfFeedback(prev => ({
        ...prev,
        [challenge.id]: { status: 'correct', msg: `Correct! ${challenge.points} XP added.` }
      }));
      solveChallenge(challenge.id, challenge.points);
    } else {
      setCtfFeedback(prev => ({
        ...prev,
        [challenge.id]: { status: 'incorrect', msg: 'Incorrect flag. Check the clues or inspect the exercise!' }
      }));
    }
  };

  const handleSimulateSqli = () => {
    if (sqliMode === 'vulnerable') {
      const lower = sqliUser.toLowerCase();
      if (lower.includes("' or '1'='1") || lower.includes("' or 1=1") || lower.includes("admin' --") || lower.includes("' or ''='")) {
        setSqliResult('SUCCESS_BYPASS: Authenticated as Superuser [admin]! The injected single-quote altered SQL logic, commenting out password verification.');
      } else {
        setSqliResult('AUTH_FAILED: Invalid credentials for user "' + sqliUser + '".');
      }
    } else {
      setSqliResult('AUTH_FAILED (PROTECTED): Prepared statement safely bound "' + sqliUser + '" as literal string parameter. Zero SQL commands were interpreted.');
    }
  };

  const filteredPackets = samplePackets.filter(p => {
    if (packetFilter === 'ALL') return true;
    return p.protocol === packetFilter;
  });

  const filteredLogs = sampleLogEntries.filter(log => {
    const matchesSev = logFilter === 'ALL' || log.severity === logFilter;
    const matchesQuery = !logSearch ||
      log.message.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.ip.includes(logSearch);
    return matchesSev && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
          <Binary className="w-4 h-4" />
          <span>HANDS-ON SECURITY SANDBOXES</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Interactive Cyber Labs</h1>
        <p className="text-sm text-slate-400 mt-1">
          Practice cryptanalysis, network packet triage, phishing detection, log anomaly hunting, and web vulnerability defense in isolated browser sandboxes.
        </p>
      </div>

      {/* Lab Nav Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800/80">
        <button
          onClick={() => setActiveTab('ciphers')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'ciphers'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>1. Ciphers & Hashes</span>
        </button>

        <button
          onClick={() => setActiveTab('converters')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'converters'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Binary className="w-3.5 h-3.5" />
          <span>2. Hex & Binary</span>
        </button>

        <button
          onClick={() => setActiveTab('packets')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'packets'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>3. Packet Analyzer</span>
        </button>

        <button
          onClick={() => setActiveTab('phishing')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'phishing'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>4. Phishing Detective</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'logs'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>5. Log Anomaly Hunter</span>
        </button>

        <button
          onClick={() => setActiveTab('ctf')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'ctf'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Flag className="w-3.5 h-3.5 text-amber-400" />
          <span>6. CTF Arena</span>
        </button>

        <button
          onClick={() => setActiveTab('web-sec')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'web-sec'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>7. Web Vulnerability Sandbox</span>
        </button>
      </div>

      {/* TAB 1: CIPHERS & HASHES */}
      {activeTab === 'ciphers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Caesar Cipher Tool */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white">Caesar Shift Cipher</h3>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setCaesarMode('encode')}
                    className={`px-2.5 py-1 rounded ${
                      caesarMode === 'encode' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Encode
                  </button>
                  <button
                    onClick={() => setCaesarMode('decode')}
                    className={`px-2.5 py-1 rounded ${
                      caesarMode === 'decode' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Decode
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 block">Input Text</label>
                <input
                  type="text"
                  value={caesarInput}
                  onChange={e => setCaesarInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Shift Offset: <strong>+{caesarShift} positions</strong></span>
                  <span className="font-mono text-sky-400">ROT{caesarShift}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={caesarShift}
                  onChange={e => setCaesarShift(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  {caesarMode === 'encode' ? 'Transformed Ciphertext' : 'Recovered Plaintext'}:
                </span>
                <div className="font-mono text-sm text-emerald-400 break-all select-all">
                  {applyCaesar(caesarInput, caesarShift, caesarMode)}
                </div>
              </div>
            </div>

            {/* Base64 Encoder / Decoder */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Binary className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Base64 Representation</h3>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setBase64Mode('encode')}
                    className={`px-2.5 py-1 rounded ${
                      base64Mode === 'encode' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Encode
                  </button>
                  <button
                    onClick={() => setBase64Mode('decode')}
                    className={`px-2.5 py-1 rounded ${
                      base64Mode === 'decode' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Decode
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 block">
                  {base64Mode === 'encode' ? 'Plaintext to Encode' : 'Base64 to Decode'}
                </label>
                <input
                  type="text"
                  value={base64Input}
                  onChange={e => setBase64Input(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Output:
                </span>
                <div className="font-mono text-sm text-sky-400 break-all select-all">
                  {applyBase64(base64Input, base64Mode)}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-normal">
                💡 <em>Notice:</em> Base64 is an <strong>encoding scheme</strong> (no secret keys), designed to transmit binary data safely across text-based protocols. It is not encryption!
              </div>
            </div>
          </div>

          {/* SHA-256 Avalanche Effect Demo */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                <span>Cryptographic Hash Demonstration (Avalanche Effect)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Type any string and notice how altering even a single character drastically scrambles the 256-bit output.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400">Input String</label>
                <input
                  type="text"
                  value={hashInput}
                  onChange={e => setHashInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400">Simulated SHA-256 Digest (64 Hex Characters)</label>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-purple-300 break-all select-all">
                  {pseudoSha256(hashInput)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HEX & BINARY CONVERTER */}
      {activeTab === 'converters' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Binary className="w-4 h-4 text-emerald-400" />
              <span>Multi-Format Data Representation Matrix</span>
            </h3>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 block">Enter Plaintext String</label>
              <input
                type="text"
                value={convText}
                onChange={e => setConvText(e.target.value)}
                maxLength={24}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Matrix View */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Hexadecimal (Base 16)
                </span>
                <div className="font-mono text-xs text-sky-400 break-all select-all">
                  {textToHex(convText)}
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Binary Stream (8-bit)
                </span>
                <div className="font-mono text-xs text-emerald-400 break-all select-all">
                  {textToBinary(convText)}
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  ASCII Decimal Codes
                </span>
                <div className="font-mono text-xs text-amber-400 break-all select-all">
                  {convText.split('').map(c => c.charCodeAt(0)).join(' ')}
                </div>
              </div>
            </div>

            {/* Individual Byte Breakdown */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Character-by-Character Byte Dissection
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-lg overflow-hidden">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-2">Glyph</th>
                      <th className="p-2">ASCII Dec</th>
                      <th className="p-2">Hex (Byte)</th>
                      <th className="p-2">Binary (8 Bits)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                    {convText.split('').map((char, i) => (
                      <tr key={i} className="hover:bg-slate-800/40">
                        <td className="p-2 text-white font-bold">{char === ' ' ? '[Space]' : char}</td>
                        <td className="p-2 text-amber-400 tabular-nums">{char.charCodeAt(0)}</td>
                        <td className="p-2 text-sky-400">0x{char.charCodeAt(0).toString(16).padStart(2, '0')}</td>
                        <td className="p-2 text-emerald-400">{char.charCodeAt(0).toString(2).padStart(8, '0')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mini-Practice Drill */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Binary Decoding Speed Drill
            </h4>
            <p className="text-xs text-slate-300">
              Decode the following 8-bit binary byte into its corresponding ASCII character:
            </p>
            <div className="flex items-center gap-3">
              <span className="p-2 bg-slate-950 border border-slate-800 rounded font-mono text-sm text-emerald-400 font-bold">
                {practiceByte}
              </span>
              <input
                type="text"
                placeholder="Letter..."
                maxLength={2}
                value={practiceAnswer}
                onChange={e => {
                  setPracticeAnswer(e.target.value);
                  setPracticeResult('idle');
                }}
                className="w-24 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white uppercase focus:outline-none focus:border-sky-500 font-mono text-center"
              />
              <button
                onClick={handlePracticeCheck}
                className="px-3.5 py-1.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Check
              </button>
            </div>
            {practiceResult === 'correct' && (
              <div className="text-xs text-emerald-400 font-medium">
                ✅ Correct! Binary 01000001 = 65 in decimal = uppercase "A". (+25 XP)
              </div>
            )}
            {practiceResult === 'wrong' && (
              <div className="text-xs text-red-400 font-medium">
                ❌ Not quite. Convert powers of two: 0×128 + 1×64 + 0×32 + 0×16 + 0×8 + 0×4 + 0×2 + 1×1 = 65.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PACKET ANALYZER (WIRESHARK SIMULATOR) */}
      {activeTab === 'packets' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white">Network Protocol Analyzer (PCAP Capture)</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-400 mr-1">Filter:</span>
                {['ALL', 'TCP', 'DNS', 'HTTP', 'ARP'].map(prot => (
                  <button
                    key={prot}
                    onClick={() => setPacketFilter(prot)}
                    className={`px-2 py-0.5 rounded text-[11px] ${
                      packetFilter === prot ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {prot}
                  </button>
                ))}
              </div>
            </div>

            {/* Packet Table */}
            <div className="overflow-x-auto border border-slate-800 rounded-lg">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">No.</th>
                    <th className="p-2.5">Time</th>
                    <th className="p-2.5">Source</th>
                    <th className="p-2.5">Destination</th>
                    <th className="p-2.5">Protocol</th>
                    <th className="p-2.5">Len</th>
                    <th className="p-2.5">Info</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
                  {filteredPackets.map(pkt => {
                    const isSelected = pkt.id === selectedPacket.id;
                    return (
                      <tr
                        key={pkt.id}
                        onClick={() => setSelectedPacket(pkt)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-sky-500/20 text-white'
                            : pkt.analysis.isSuspicious
                            ? 'hover:bg-red-950/20 text-red-200'
                            : 'hover:bg-slate-800/50 text-slate-300'
                        }`}
                      >
                        <td className="p-2.5 tabular-nums">{pkt.id}</td>
                        <td className="p-2.5 text-slate-400">{pkt.timestamp}</td>
                        <td className="p-2.5">{pkt.sourceIp}</td>
                        <td className="p-2.5">{pkt.destIp}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              pkt.protocol === 'DNS'
                                ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                : pkt.protocol === 'HTTP'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : pkt.protocol === 'ARP'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-sky-950 text-sky-300 border border-sky-800'
                            }`}
                          >
                            {pkt.protocol}
                          </span>
                        </td>
                        <td className="p-2.5 tabular-nums text-slate-400">{pkt.length}</td>
                        <td className="p-2.5 truncate max-w-xs">{pkt.info}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Packet Deep Dissection Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
              {/* Hex Dump */}
              <div className="lg:col-span-7 p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Raw Packet Hex & ASCII Payload (Packet #{selectedPacket.id})
                </span>
                <div className="font-mono text-xs text-sky-400 bg-slate-900/80 p-3 rounded border border-slate-800 break-all select-all leading-relaxed">
                  {selectedPacket.payloadHex}
                </div>
                <div className="font-mono text-xs text-slate-300 bg-slate-900/80 p-2 rounded border border-slate-800 break-all">
                  ASCII: <span className="text-emerald-400">{selectedPacket.payloadAscii}</span>
                </div>
              </div>

              {/* Threat Analysis Deck */}
              <div className="lg:col-span-5 p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Automated SOC Triage
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedPacket.analysis.isSuspicious
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    {selectedPacket.analysis.isSuspicious ? 'THREAT ANOMALY' : 'BENIGN TRAFFIC'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedPacket.analysis.threatDescription}
                </p>

                {selectedPacket.analysis.recommendation && (
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded text-xs space-y-1">
                    <strong className="text-slate-200 block">Defensive Recommendation:</strong>
                    <span className="text-slate-400">{selectedPacket.analysis.recommendation}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PHISHING DETECTIVE */}
      {activeTab === 'phishing' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Email List Inbox */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block px-1">
                Simulated Corporate Mailbox
              </span>
              <div className="space-y-2">
                {samplePhishingEmails.map(email => {
                  const isSelected = email.id === selectedEmail.id;
                  const judged = emailJudgments[email.id];
                  return (
                    <button
                      key={email.id}
                      onClick={() => setSelectedEmail(email)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-500/10 border-sky-400 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold truncate max-w-[150px]">{email.senderName}</span>
                        <span className="text-[11px] text-slate-400">{email.date}</span>
                      </div>
                      <div className="text-xs text-slate-200 font-medium truncate">{email.subject}</div>
                      <div className="text-[11px] text-slate-400 truncate mt-1">{email.preview}</div>

                      {judged && (
                        <div className="mt-2 text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Judged · Score {judged.score}%
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Reader & Triage Stage */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
              {/* Email Headers */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedEmail.subject}</h3>
                    <div className="text-slate-300 mt-1">
                      From: <strong className="text-white">{selectedEmail.senderName}</strong>{' '}
                      <span className="text-sky-400 font-mono text-[11px]">&lt;{selectedEmail.senderEmail}&gt;</span>
                    </div>
                    <div className="text-slate-400">
                      Reply-To: <span className="font-mono text-amber-400 text-[11px]">{selectedEmail.replyTo}</span>
                    </div>
                  </div>
                  <span className="text-slate-400 text-[11px]">{selectedEmail.date}</span>
                </div>

                {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                    <span className="text-slate-400">Attachment:</span>
                    {selectedEmail.attachments.map((att, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                          att.suspicious ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        📎 {att.filename}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Email Body Content */}
              <div
                className="p-5 bg-white text-slate-900 rounded-xl text-xs sm:text-sm space-y-3"
                dangerouslySetInnerHTML={{ __html: selectedEmail.bodyHtml }}
              />

              {/* Link Hover Inspection Tool */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Link Destination Inspector:
                </span>
                <div className="flex items-center justify-between text-slate-300 font-mono">
                  <span>Display Text: <strong className="text-sky-300">{selectedEmail.targetLinkDisplay}</strong></span>
                  <span>Actual Target URL: <strong className="text-red-400">{selectedEmail.targetLinkUrl}</strong></span>
                </div>
              </div>

              {/* Judgment Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-4">
                <div className="text-xs text-slate-400">
                  Carefully evaluate the sender address, urgency, and destination links before submitting.
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEmailJudge(false)}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                  >
                    Mark as Legitimate
                  </button>
                  <button
                    onClick={() => handleEmailJudge(true)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer"
                  >
                    Flag as Phishing!
                  </button>
                </div>
              </div>

              {/* Judgment Explanation */}
              {emailJudgments[selectedEmail.id] && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <span className="font-bold text-white block">
                    Analysis & Threat Breakdown:
                  </span>
                  <p className="text-slate-300">{selectedEmail.legitimacyNotes}</p>
                  {selectedEmail.redFlags.length > 0 && (
                    <ul className="space-y-1 pt-1">
                      {selectedEmail.redFlags.map((rf, i) => (
                        <li key={i} className="text-red-400 flex items-start gap-1.5">
                          <span>⚠️</span>
                          <span>{rf}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LOG ANOMALY HUNTER */}
      {activeTab === 'logs' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white">Security Event Log Triage (auth.log & nginx)</h3>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Filter by IP or keyword..."
                  value={logSearch}
                  onChange={e => setLogSearch(e.target.value)}
                  className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white focus:outline-none"
                />
                <select
                  value={logFilter}
                  onChange={e => setLogFilter(e.target.value as any)}
                  className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-300"
                >
                  <option value="ALL">All Severities</option>
                  <option value="ALERT">ALERT</option>
                  <option value="WARNING">WARNING</option>
                  <option value="INFO">INFO</option>
                </select>
              </div>
            </div>

            {/* Log Terminal View */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                {filteredLogs.map(log => {
                  const isSelected = selectedLog?.id === log.id;
                  return (
                    <div
                      key={log.id}
                      onClick={() => setSelectedLog(log)}
                      className={`p-2.5 flex items-start gap-3 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-sky-500/20 text-white'
                          : log.isAnomaly
                          ? 'hover:bg-red-950/20 text-slate-200'
                          : 'hover:bg-slate-900 text-slate-400'
                      }`}
                    >
                      <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                          log.severity === 'ALERT'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : log.severity === 'WARNING'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {log.severity}
                      </span>
                      <span className="text-sky-400 shrink-0">{log.source}</span>
                      <span className="truncate">{log.message}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Log Inspector */}
            {selectedLog && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px]">
                    Incident Log Detail
                  </span>
                  <span className="font-mono text-sky-400">Origin IP: {selectedLog.ip}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded font-mono text-slate-200 break-all">
                  {selectedLog.message}
                </div>
                {selectedLog.isAnomaly ? (
                  <div className="p-3 bg-red-950/20 border border-red-900/40 rounded text-red-300">
                    <strong>⚠️ Security Anomaly Detected:</strong> {selectedLog.anomalyReason}
                  </div>
                ) : (
                  <div className="text-emerald-400">
                    ✓ Routine authorized system event. No indicators of compromise detected.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: CTF ARENA */}
      {activeTab === 'ctf' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* CTF Challenge List */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block px-1">
                Active CTF Challenges
              </span>
              <div className="space-y-2">
                {ctfChallenges.map(c => {
                  const isCur = c.id === activeCtf.id;
                  const isSolved = ctfFeedback[c.id]?.status === 'correct';
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveCtf(c)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isCur
                          ? 'bg-amber-500/10 border-amber-400 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{c.title}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{c.category}</span>
                          <span>·</span>
                          <span className="text-amber-400 font-mono font-semibold">{c.points} XP</span>
                        </div>
                      </div>
                      {isSolved && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTF Active Challenge Deck */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                    {activeCtf.category} · {activeCtf.difficulty}
                  </span>
                  <h3 className="text-lg font-bold text-white">{activeCtf.title}</h3>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                  +{activeCtf.points} XP
                </div>
              </div>

              {/* Prompt */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                {activeCtf.prompt}
              </div>

              {/* Clues */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Hints & Clues
                  </span>
                  <button
                    onClick={() => {
                      const cur = revealedClues[activeCtf.id] || 0;
                      if (cur < activeCtf.clues.length) {
                        setRevealedClues(prev => ({ ...prev, [activeCtf.id]: cur + 1 }));
                      }
                    }}
                    disabled={(revealedClues[activeCtf.id] || 0) >= activeCtf.clues.length}
                    className="text-xs text-amber-400 hover:text-amber-300 disabled:opacity-40 cursor-pointer"
                  >
                    Unlock Clue (-{activeCtf.hintPenalty} XP)
                  </button>
                </div>

                <div className="space-y-1.5">
                  {activeCtf.clues.slice(0, revealedClues[activeCtf.id] || 0).map((clue, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950/70 border border-slate-800 rounded text-xs text-amber-300/90 font-mono">
                      Clue {idx + 1}: {clue}
                    </div>
                  ))}
                  {(revealedClues[activeCtf.id] || 0) === 0 && (
                    <div className="text-xs text-slate-500 italic">No clues unlocked yet. Try solving on your own first!</div>
                  )}
                </div>
              </div>

              {/* Submission Input */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <label className="text-xs text-slate-400 block font-mono">
                  Submit Flag: (Format: FLAG&#123;...&#125;)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="FLAG{...}"
                    value={ctfInputs[activeCtf.id] || ''}
                    onChange={e => setCtfInputs({ ...ctfInputs, [activeCtf.id]: e.target.value })}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => handleCtfSubmit(activeCtf)}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                  >
                    Submit Flag
                  </button>
                </div>

                {ctfFeedback[activeCtf.id] && (
                  <div
                    className={`p-3 rounded-lg text-xs font-medium ${
                      ctfFeedback[activeCtf.id].status === 'correct'
                        ? 'bg-emerald-950/40 border border-emerald-500 text-emerald-300'
                        : 'bg-red-950/40 border border-red-500 text-red-300'
                    }`}
                  >
                    {ctfFeedback[activeCtf.id].msg}
                  </div>
                )}

                {ctfFeedback[activeCtf.id]?.status === 'correct' && (
                  <div className="text-xs text-slate-300 pt-2 border-t border-slate-800 leading-relaxed">
                    <strong>Solution Debrief:</strong> {activeCtf.solutionExplanation}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: WEB SECURITY SANDBOX (SQLi & XSS) */}
      {activeTab === 'web-sec' && (
        <div className="space-y-8">
          {/* SQLi Interactive Sandbox */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                  Simulated Vulnerability #1
                </span>
                <h3 className="text-base font-bold text-white">SQL Injection: Authentication Bypass</h3>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setSqliMode('vulnerable')}
                  className={`px-3 py-1.5 rounded font-semibold transition-all ${
                    sqliMode === 'vulnerable'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Vulnerable Concatenation
                </button>
                <button
                  onClick={() => setSqliMode('secure')}
                  className={`px-3 py-1.5 rounded font-semibold transition-all ${
                    sqliMode === 'secure'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Secure Parameterized Query
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Input */}
              <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Simulated Login Form
                </span>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400">Username Input</label>
                  <input
                    type="text"
                    value={sqliUser}
                    onChange={e => setSqliUser(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                  />
                  <div className="flex gap-2 text-[11px] text-slate-500">
                    <span>Try:</span>
                    <button
                      onClick={() => setSqliUser("admin' --")}
                      className="text-sky-400 hover:underline cursor-pointer"
                    >
                      admin' --
                    </button>
                    <span>|</span>
                    <button
                      onClick={() => setSqliUser("' OR '1'='1")}
                      className="text-sky-400 hover:underline cursor-pointer"
                    >
                      ' OR '1'='1
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400">Password Input</label>
                  <input
                    type="text"
                    value={sqliPass}
                    onChange={e => setSqliPass(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  onClick={handleSimulateSqli}
                  className="w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Simulate Database Query Execution
                </button>
              </div>

              {/* Live Backend Query Visualizer */}
              <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Backend SQL Query Constructed:
                </span>
                <div className="p-3 bg-slate-900 rounded font-mono text-xs text-emerald-400 break-all leading-relaxed border border-slate-800">
                  {sqliMode === 'vulnerable' ? (
                    <>
                      <span className="text-purple-400">SELECT</span> * <span className="text-purple-400">FROM</span> users{' '}
                      <span className="text-purple-400">WHERE</span> username = '<span className="text-amber-300 font-bold">{sqliUser}</span>' <span className="text-purple-400">AND</span> password = '{sqliPass}';
                    </>
                  ) : (
                    <>
                      <span className="text-purple-400">PREPARE</span> stmt <span className="text-purple-400">AS</span> SELECT * FROM users WHERE username = $1 AND password = $2;
                      <br />
                      <span className="text-slate-400">EXECUTE stmt (PARAM_1 = "{sqliUser}", PARAM_2 = "{sqliPass}");</span>
                    </>
                  )}
                </div>

                {sqliResult && (
                  <div
                    className={`p-3 rounded-lg text-xs font-mono ${
                      sqliResult.startsWith('SUCCESS')
                        ? 'bg-red-950/40 border border-red-500 text-red-300'
                        : 'bg-emerald-950/40 border border-emerald-500 text-emerald-300'
                    }`}
                  >
                    {sqliResult}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* XSS Interactive Sandbox */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                  Simulated Vulnerability #2
                </span>
                <h3 className="text-base font-bold text-white">Cross-Site Scripting (XSS) Sanitization</h3>
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={xssSanitized}
                  onChange={e => setXssSanitized(e.target.checked)}
                  className="rounded bg-slate-800 text-emerald-500"
                />
                <span>Enable HTML Entity Encoding (Defense)</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 block">User Comment Input</label>
                <input
                  type="text"
                  value={xssInput}
                  onChange={e => setXssInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 block">DOM Rendered Result</label>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded min-h-[50px] text-xs font-mono">
                  {xssSanitized ? (
                    <span className="text-emerald-400">
                      [SAFE ESCAPED TEXT]: {xssInput}
                    </span>
                  ) : (
                    <span className="text-red-400">
                      ⚠️ [VULNERABLE INNERHTML]: Script tag would execute arbitrary JS in victim browser!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
