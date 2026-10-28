import React, { useState } from 'react';
import { Shield, Lock, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Key, Server, Cpu } from 'lucide-react';

export const CiaTriadExplorer: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'confidentiality' | 'integrity' | 'availability'>('confidentiality');

  const details = {
    confidentiality: {
      title: 'Confidentiality',
      goal: 'Protect sensitive information from unauthorized access, interception, or disclosure.',
      threat: 'Eavesdropping on unencrypted Wi-Fi, database credential leaks, shoulder surfing, malware keyloggers.',
      defense: 'AES-256 encryption at rest and in transit (TLS 1.3), Multi-Factor Authentication (MFA), strict role-based access control (RBAC).',
      example: 'Patient medical records are encrypted so that unauthorized staff or packet sniffers only see unreadable ciphertext.'
    },
    integrity: {
      title: 'Integrity',
      goal: 'Preserve the authenticity, completeness, and tamper-resistance of data and software.',
      threat: 'Man-in-the-Middle packet tampering, unauthorized database modification, ransomware altering headers, supply chain trojans.',
      defense: 'Cryptographic hashing (SHA-256), digital code signatures, HMAC verification, immutable audit logging.',
      example: 'A downloaded software installer is verified against the vendor’s published SHA-256 checksum to ensure it was not modified.'
    },
    availability: {
      title: 'Availability',
      goal: 'Ensure systems, services, and data are reliably reachable by authorized users whenever required.',
      threat: 'Distributed Denial of Service (DDoS) bandwidth exhaustion, ransomware lockouts, hardware failures, power outages.',
      defense: 'Redundant server clusters, automated failovers, DDoS mitigation scrubbing centers, offsite immutable backups.',
      example: 'An emergency 911 dispatch database operates across multiple active geographic datacenters with automated failover.'
    }
  };

  const current = details[activePillar];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-sky-400" />
          <h4 className="text-sm font-semibold text-white">Interactive Model: The CIA Triad</h4>
        </div>
        <span className="text-xs text-slate-400">Click a pillar to simulate</span>
      </div>

      {/* 3 Pillar selector buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setActivePillar('confidentiality')}
          className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-center border ${
            activePillar === 'confidentiality'
              ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Confidentiality
        </button>
        <button
          onClick={() => setActivePillar('integrity')}
          className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-center border ${
            activePillar === 'integrity'
              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-sm'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Integrity
        </button>
        <button
          onClick={() => setActivePillar('availability')}
          className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-center border ${
            activePillar === 'availability'
              ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Availability
        </button>
      </div>

      {/* Dynamic Inspector Panel */}
      <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-4 space-y-3 text-xs">
        <div>
          <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider block mb-1">
            Primary Objective:
          </span>
          <p className="text-slate-200 text-sm">{current.goal}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-md">
            <div className="flex items-center gap-1.5 text-red-400 font-semibold mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Adversary Threats</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{current.threat}</p>
          </div>

          <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-md">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Defensive Countermeasures</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{current.defense}</p>
          </div>
        </div>

        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded text-slate-400">
          <strong className="text-slate-300">Concrete Scenario:</strong> {current.example}
        </div>
      </div>
    </div>
  );
};

export const HandshakeVisualizer: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  const steps = [
    {
      label: 'Initial State: Closed / Listening',
      clientState: 'CLOSED',
      serverState: 'LISTEN',
      direction: 'idle',
      packetInfo: 'Server daemon (e.g., Nginx, OpenSSH) is bound to port and waiting for incoming connection requests.',
      seqDetails: 'No segments exchanged yet.'
    },
    {
      label: 'Step 1: SYN (Synchronize)',
      clientState: 'SYN_SENT',
      serverState: 'SYN_RCVD',
      direction: 'client-to-server',
      packetInfo: 'Client picks random Initial Sequence Number (ISN_c = 1000) and transmits [SYN] flag.',
      seqDetails: 'Flags: [SYN] | Seq = 1000 | Ack = 0'
    },
    {
      label: 'Step 2: SYN-ACK (Synchronize + Acknowledge)',
      clientState: 'SYN_SENT',
      serverState: 'SYN_RCVD',
      direction: 'server-to-client',
      packetInfo: 'Server acknowledges client ISN by adding 1 (Ack = 1001) and supplies its own random ISN (ISN_s = 5000).',
      seqDetails: 'Flags: [SYN, ACK] | Seq = 5000 | Ack = 1001'
    },
    {
      label: 'Step 3: ACK (Acknowledge)',
      clientState: 'ESTABLISHED',
      serverState: 'ESTABLISHED',
      direction: 'client-to-server',
      packetInfo: 'Client confirms receipt of server ISN by adding 1 (Ack = 5001). Handshake complete! Application data (HTTP/TLS) can now flow.',
      seqDetails: 'Flags: [ACK] | Seq = 1001 | Ack = 5001'
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-sky-400" />
          <h4 className="text-sm font-semibold text-white">Interactive TCP 3-Way Handshake Simulator</h4>
        </div>
        <button
          onClick={() => setStep(0)}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Stage visualizer */}
      <div className="grid grid-cols-3 gap-2 items-center text-center py-4 bg-slate-950/80 rounded-lg border border-slate-800/80 px-4">
        {/* Client Host */}
        <div className="space-y-1">
          <div className="w-10 h-10 mx-auto rounded-lg bg-sky-950/80 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="text-xs font-semibold text-white">Client (192.168.1.45)</div>
          <div className="text-[11px] font-mono text-sky-400">State: {currentStep.clientState}</div>
        </div>

        {/* Transmission channel */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-[11px] font-mono text-amber-400 font-semibold px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/30">
            {currentStep.direction === 'idle'
              ? 'No Traffic'
              : currentStep.direction === 'client-to-server'
              ? 'Client → Server'
              : 'Server → Client'}
          </div>
          <div className="w-full flex items-center justify-center text-slate-600">
            <div className="h-0.5 w-full bg-slate-700 relative">
              {currentStep.direction === 'client-to-server' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-sky-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
              {currentStep.direction === 'server-to-client' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-emerald-400 rotate-180">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Server Host */}
        <div className="space-y-1">
          <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Server className="w-5 h-5" />
          </div>
          <div className="text-xs font-semibold text-white">Server (93.184.216.34:443)</div>
          <div className="text-[11px] font-mono text-emerald-400">State: {currentStep.serverState}</div>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200">{currentStep.label}</span>
          <span className="font-mono text-slate-400 tabular-nums">Step {step} of 3</span>
        </div>
        <p className="text-xs text-slate-300">{currentStep.packetInfo}</p>
        <div className="p-2 bg-slate-900 rounded font-mono text-xs text-sky-300">
          {currentStep.seqDetails}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(prev => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="px-3 py-1.5 text-xs rounded bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700"
        >
          Previous Step
        </button>
        <button
          onClick={() => setStep(prev => Math.min(3, prev + 1))}
          disabled={step === 3}
          className="px-4 py-1.5 text-xs font-medium rounded bg-sky-600 text-white disabled:opacity-40 hover:bg-sky-500"
        >
          {step === 3 ? 'Connection Established' : 'Advance Handshake →'}
        </button>
      </div>
    </div>
  );
};

export const ChmodCalculator: React.FC = () => {
  const [perms, setPerms] = useState({
    uR: true, uW: true, uX: true,  // Owner (7)
    gR: true, gW: false, gX: true, // Group (5)
    oR: true, oW: false, oX: true  // Others (5)
  });

  const toggle = (key: keyof typeof perms) => {
    setPerms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ownerVal = (perms.uR ? 4 : 0) + (perms.uW ? 2 : 0) + (perms.uX ? 1 : 0);
  const groupVal = (perms.gR ? 4 : 0) + (perms.gW ? 2 : 0) + (perms.gX ? 1 : 0);
  const otherVal = (perms.oR ? 4 : 0) + (perms.oW ? 2 : 0) + (perms.oX ? 1 : 0);
  const octal = `${ownerVal}${groupVal}${otherVal}`;

  const symbolic = [
    '-',
    perms.uR ? 'r' : '-', perms.uW ? 'w' : '-', perms.uX ? 'x' : '-',
    perms.gR ? 'r' : '-', perms.gW ? 'w' : '-', perms.gX ? 'x' : '-',
    perms.oR ? 'r' : '-', perms.oW ? 'w' : '-', perms.oX ? 'x' : '-'
  ].join('');

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-semibold text-white">Interactive Linux Permissions (chmod) Calculator</h4>
        </div>
        <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
          chmod {octal}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs">
        {/* Owner */}
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
          <div className="font-semibold text-sky-400 flex justify-between items-center">
            <span>Owner (User)</span>
            <span className="font-mono tabular-nums">{ownerVal}</span>
          </div>
          <div className="space-y-1.5 text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={perms.uR} onChange={() => toggle('uR')} className="rounded bg-slate-800 text-sky-500" />
              <span>Read (4)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={perms.uW} onChange={() => toggle('uW')} className="rounded bg-slate-800 text-sky-500" />
              <span>Write (2)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={perms.uX} onChange={() => toggle('uX')} className="rounded bg-slate-800 text-sky-500" />
              <span>Execute (1)</span>
            </label>
          </div>
        </div>

        {/* Group */}
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
          <div className="font-semibold text-amber-400 flex justify-between items-center">
            <span>Group</span>
            <span className="font-mono tabular-nums">{groupVal}</span>
          </div>
          <div className="space-y-1.5 text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={perms.gR} onChange={() => toggle('gR')} className="rounded bg-slate-800 text-amber-500" />
              <span>Read (4)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={perms.gW} onChange={() => toggle('gW')} className="rounded bg-slate-800 text-amber-500" />
              <span>Write (2)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={perms.gX} onChange={() => toggle('gX')} className="rounded bg-slate-800 text-amber-500" />
              <span>Execute (1)</span>
            </label>
          </div>
        </div>

        {/* Others */}
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
          <div className="font-semibold text-slate-400 flex justify-between items-center">
            <span>Others (World)</span>
            <span className="font-mono tabular-nums">{otherVal}</span>
          </div>
          <div className="space-y-1.5 text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={perms.oR} onChange={() => toggle('oR')} className="rounded bg-slate-800 text-slate-500" />
              <span>Read (4)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={perms.oW} onChange={() => toggle('oW')} className="rounded bg-slate-800 text-slate-500" />
              <span>Write (2)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={perms.oX} onChange={() => toggle('oX')} className="rounded bg-slate-800 text-slate-500" />
              <span>Execute (1)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-slate-400 text-[11px] block">ls -l Symbolic Representation:</span>
          <code className="text-emerald-400 font-mono text-sm tracking-wider">{symbolic}</code>
        </div>
        <div className="text-right">
          <span className="text-slate-400 text-[11px] block">Common Use:</span>
          <span className="text-slate-200">
            {octal === '755' && 'Standard executable program / public script'}
            {octal === '644' && 'Standard readable document / config file'}
            {octal === '600' && 'Highly sensitive private key / secret file'}
            {octal === '777' && '⚠️ Highly dangerous world-writable permissions!'}
            {!['755', '644', '600', '777'].includes(octal) && 'Custom access control octal'}
          </span>
        </div>
      </div>
    </div>
  );
};
