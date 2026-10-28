import { CtfChallenge, LogEntry, Packet, PhishingEmail } from '../types';

export const samplePackets: Packet[] = [
  {
    id: 1,
    timestamp: '14:22:01.102341',
    sourceIp: '192.168.1.45',
    destIp: '93.184.216.34',
    protocol: 'TCP',
    length: 74,
    flags: '[SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM=1',
    info: '49821 → 443 [SYN] Seq=0 Win=64240 Len=0',
    payloadHex: 'c2 9d 01 bb 00 00 00 00 a0 02 fa f0 6f b2 00 00 02 04 05 b4 01 03 03 08 01 01 04 02',
    payloadAscii: '............................',
    analysis: {
      isSuspicious: false,
      threatDescription: 'Standard initial SYN packet initiating TCP connection to external HTTPS server on port 443.',
      recommendation: 'Normal behavior.'
    }
  },
  {
    id: 2,
    timestamp: '14:22:01.124502',
    sourceIp: '93.184.216.34',
    destIp: '192.168.1.45',
    protocol: 'TCP',
    length: 74,
    flags: '[SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0',
    info: '443 → 49821 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0',
    payloadHex: '01 bb c2 9d 4b 28 e3 91 00 00 00 01 a0 12 ff ff b7 41 00 00 02 04 05 b4 01 03 03 07',
    payloadAscii: '....K(...........A......',
    analysis: {
      isSuspicious: false,
      threatDescription: 'Legitimate server acknowledgment agreeing to establish TCP session.',
      recommendation: 'Normal behavior.'
    }
  },
  {
    id: 3,
    timestamp: '14:22:05.891230',
    sourceIp: '192.168.1.108',
    destIp: '8.8.8.8',
    protocol: 'DNS',
    length: 124,
    info: 'Standard query 0x4a12 A d3hhdC1pcy1hbi11bmV4cGVjdGVkLWV4ZmlsLnRlY2g.evil-c2.net',
    payloadHex: '4a 12 01 00 00 01 00 00 00 00 00 00 2e 64 33 68 68 64 43 31 70 63 79 31 68 62 69 31',
    payloadAscii: 'J............d3hhdC1pcy1hbi1',
    analysis: {
      isSuspicious: true,
      threatDescription: 'DNS Data Exfiltration / C2 Tunneling attempt detected. High-entropy long subdomain containing encoded payload query to an untrusted domain.',
      recommendation: 'Block query on internal recursive DNS resolver and isolate host 192.168.1.108 for memory triage.'
    }
  },
  {
    id: 4,
    timestamp: '14:22:12.441092',
    sourceIp: '203.0.113.88',
    destIp: '192.168.1.10',
    protocol: 'HTTP',
    length: 412,
    info: "GET /products.php?category=1%27%20UNION%20SELECT%20null%2Cusername%2Cpassword_hash%20FROM%20users--%20 HTTP/1.1",
    payloadHex: '47 45 54 20 2f 70 72 6f 64 75 63 74 73 2e 70 68 70 3f 63 61 74 65 67 6f 72 79 3d 31 27 20 55 4e 49 4f 4e 20 53 45 4c 45 43 54 20 6e 75 6c 6c 2c 75 73 65 72 6e 61 6d 65 2c 70 61 73 73 77 6f 72 64 5f 68 61 73 68 20 46 52 4f 4d 20 75 73 65 72 73 2d 2d 20 48 54 54 50 2f 31 2e 31',
    payloadAscii: "GET /products.php?category=1' UNION SELECT null,username,password_hash FROM users--  HTTP/1.1",
    analysis: {
      isSuspicious: true,
      threatDescription: 'UNION-based SQL Injection exploit attempt targeted against database backend via URL parameter.',
      recommendation: 'WAF rule block triggered. Verify backend uses parameterized statements and sanitize URI parameters.'
    }
  },
  {
    id: 5,
    timestamp: '14:22:15.002131',
    sourceIp: '192.168.1.200',
    destIp: '192.168.1.1',
    protocol: 'ARP',
    length: 42,
    info: 'ARP Announcement: 192.168.1.1 is-at 00:0c:29:ab:cd:ef (Gratuitous ARP)',
    payloadHex: '00 01 08 00 06 04 00 02 00 0c 29 ab cd ef c0 a8 01 01 ff ff ff ff ff ff c0 a8 01 01',
    payloadAscii: '..................',
    analysis: {
      isSuspicious: true,
      threatDescription: 'Gratuitous ARP poisoning / Man-in-the-Middle (MitM) spoofing attempting to overwrite default gateway MAC address in LAN ARP tables.',
      recommendation: 'Enable Dynamic ARP Inspection (DAI) on managed switches and lock static IP-MAC bindings.'
    }
  }
];

export const samplePhishingEmails: PhishingEmail[] = [
  {
    id: 'phish-1',
    senderName: 'IT Support Helpdesk',
    senderEmail: 'helpdesk-auth@corp-support-desk365.com',
    replyTo: 'credential-harvest@anonymous-relay.to',
    date: 'Today at 09:14 AM',
    subject: 'URGENT: Your Corporate Password Expires in 4 Hours',
    preview: 'Action Required: Your Single Sign-On password will expire today. Verify immediately to avoid account suspension...',
    targetLinkDisplay: 'https://login.company.com/renew-credentials',
    targetLinkUrl: 'http://corp-login.phish-gate.xyz/auth?victim=user',
    bodyHtml: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <p>Dear Employee,</p>
        <p>Your Active Directory credentials are set to expire within <strong>4 hours</strong> due to routine quarterly cybersecurity compliance.</p>
        <p>Failure to renew your credentials will result in immediate suspension of corporate email, VPN, and internal dashboard access.</p>
        <p style="margin: 20px 0;">
          <span style="display:inline-block; background-color: #0284c7; color: white; padding: 10px 18px; border-radius: 6px; font-weight: bold; text-decoration: none;">Keep Current Password</span>
        </p>
        <p style="font-size: 12px; color: #64748b;">IT Infrastructure & Security Group · Ticket Ref: #SEC-98219</p>
      </div>
    `,
    attachments: [
      { filename: 'urgent_policy_notice.pdf.exe', extension: '.exe', suspicious: true }
    ],
    isPhishing: true,
    redFlags: [
      'Deceptive display domain: "corp-support-desk365.com" does not match legitimate organization domain.',
      'Hidden mismatch URL: Hovering over the button reveals destination "http://corp-login.phish-gate.xyz", NOT the official portal.',
      'Manufactured urgency: "Expires in 4 hours" creates panic to bypass rational evaluation.',
      'Dangerous attachment: Double extension executable file "urgent_policy_notice.pdf.exe" posing as a PDF.'
    ],
    legitimacyNotes: 'Classic high-urgency credential harvesting lure with disguised hyperlinks and malware dropper attachment.'
  },
  {
    id: 'phish-2',
    senderName: 'GitHub Notifications',
    senderEmail: 'notifications@github.com',
    replyTo: 'support@github.com',
    date: 'Yesterday at 3:45 PM',
    subject: '[GitHub] A personal access token has been granted to your account',
    preview: 'A new fine-grained personal access token was created on your account from IP 198.51.100.12...',
    targetLinkDisplay: 'https://github.com/settings/tokens',
    targetLinkUrl: 'https://github.com/settings/tokens',
    bodyHtml: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <p>Hi developer,</p>
        <p>A new personal access token <strong>(read:packages, repo)</strong> was generated on your account.</p>
        <p>If you made this change, no further action is required. If this was not you, please revoke the token immediately in your account settings.</p>
        <p style="margin: 20px 0;">
          <span style="display:inline-block; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 6px; font-weight: 500;">Review Token Settings</span>
        </p>
      </div>
    `,
    isPhishing: false,
    redFlags: [],
    legitimacyNotes: 'Legitimate transactional notification: Sender SPF/DKIM passes github.com, display link matches actual target URL, zero panic rhetoric.'
  },
  {
    id: 'phish-3',
    senderName: 'Chief Executive Officer',
    senderEmail: 'ceo.office.direct@mail-vip-exec.net',
    replyTo: 'ceo.private.confidential@mail-vip-exec.net',
    date: 'Today at 11:02 AM',
    subject: 'Confidential project - Are you at your desk right now?',
    preview: 'I am currently in an all-day confidential acquisition meeting and need an urgent wire transfer executed...',
    targetLinkDisplay: 'None provided',
    targetLinkUrl: '#',
    bodyHtml: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <p>Hi,</p>
        <p>Are you available at your desk right now? I am in an NDA-restricted partner meeting with our legal counsel and cannot take voice calls.</p>
        <p>I need you to process an urgent wire transfer for an acquisition retainer before 1:00 PM today. Reply back immediately so I can provide the wire routing instructions.</p>
        <p>Keep this strictly confidential between us for now.</p>
        <p>Best regards,<br/>Executive Office</p>
      </div>
    `,
    isPhishing: true,
    redFlags: [
      'Business Email Compromise (BEC) / CEO Fraud tactic.',
      'Sender uses free/disposable domain "mail-vip-exec.net" rather than corporate domain.',
      'Isolation tactic: "Cannot take voice calls", instructing employee not to verify out-of-band.',
      'Pressure to circumvent financial verification safeguards.'
    ],
    legitimacyNotes: 'Classic CEO Fraud BEC scam designed to trick finance staff into transferring funds without dual-authorization.'
  }
];

export const sampleLogEntries: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-27 19:14:02',
    source: 'auth.log',
    severity: 'INFO',
    ip: '192.168.1.15',
    message: 'sshd[1821]: Accepted publickey for dev_admin from 192.168.1.15 port 52312 ssh2: ED25519 SHA256:K3l...',
    isAnomaly: false
  },
  {
    id: 'log-2',
    timestamp: '2026-10-27 19:15:33',
    source: 'auth.log',
    severity: 'WARNING',
    ip: '185.220.101.5',
    message: 'sshd[1830]: Failed password for root from 185.220.101.5 port 39102 ssh2',
    isAnomaly: true,
    anomalyReason: 'Brute-force SSH attack: Direct root login attempt from known hostile Tor exit node IP.'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-27 19:15:34',
    source: 'auth.log',
    severity: 'WARNING',
    ip: '185.220.101.5',
    message: 'sshd[1832]: Failed password for invalid user admin from 185.220.101.5 port 39104 ssh2',
    isAnomaly: true,
    anomalyReason: 'Rapid automated dictionary credential stuffing (1-second interval).'
  },
  {
    id: 'log-4',
    timestamp: '2026-10-27 19:15:35',
    source: 'auth.log',
    severity: 'ALERT',
    ip: '185.220.101.5',
    message: 'sshd[1835]: Maximum authentication attempts exceeded for invalid user test [preauth]',
    isAnomaly: true,
    anomalyReason: 'Exceeded SSH authentication threshold. Trigger Fail2Ban or IP blocklist.'
  },
  {
    id: 'log-5',
    timestamp: '2026-10-27 19:18:10',
    source: 'nginx_access.log',
    severity: 'INFO',
    ip: '74.125.224.72',
    message: 'GET /api/v1/health HTTP/1.1 200 42 "Googlebot/2.1" "-"',
    isAnomaly: false
  },
  {
    id: 'log-6',
    timestamp: '2026-10-27 19:20:44',
    source: 'nginx_access.log',
    severity: 'ALERT',
    ip: '91.240.118.12',
    message: 'GET /search?q=%27%20OR%201%3D1%20UNION%20SELECT%20schema_name%2Cnull%20FROM%20information_schema.schemata--%20 HTTP/1.1 500 128 "-" "sqlmap/1.6.4#stable"',
    isAnomaly: true,
    anomalyReason: 'Automated vulnerability scanner (sqlmap) probing for database schema via URL parameter.'
  },
  {
    id: 'log-7',
    timestamp: '2026-10-27 19:22:01',
    source: 'nginx_access.log',
    severity: 'ALERT',
    ip: '91.240.118.12',
    message: 'GET /cgi-bin/view.cgi?file=;cat%20/etc/passwd HTTP/1.1 403 94 "-" "curl/7.68.0"',
    isAnomaly: true,
    anomalyReason: 'OS Command Injection attempt trying to read sensitive local system passwd file.'
  }
];

export const ctfChallenges: CtfChallenge[] = [
  {
    id: 'ctf-1',
    title: 'The Hidden Caesar Shift',
    category: 'Cryptography',
    difficulty: 'Beginner',
    points: 100,
    prompt: 'An intercepted spy transmission reads: "FRGH: IODJ{fdhvdu_fskhu_ghfrghg_101}". The operative shifted all alphabetical characters by +3 (ROT3). What is the original flag?',
    clues: [
      'The letters are shifted by 3 positions forward in the Latin alphabet.',
      'F - 3 = C, R - 3 = O, G - 3 = D, H - 3 = E.',
      'Reverse the shift by moving each letter backward by 3 (or +23).'
    ],
    hintPenalty: 15,
    flagAnswer: 'FLAG{caesar_cipher_decoded_101}',
    solutionExplanation: 'By subtracting 3 from each letter: FODJ -> FLAG, fdhvdu -> caesar, fskhu -> cipher, ghfrghg -> decoded. The flag is FLAG{caesar_cipher_decoded_101}.'
  },
  {
    id: 'ctf-2',
    title: 'Base64 Detective',
    category: 'Cryptography',
    difficulty: 'Beginner',
    points: 125,
    prompt: 'You recovered an encoded environment variable token from a misconfigured server commit: "RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb25fc2VjcmV0fQ==". Decode this payload to find the flag.',
    clues: [
      'The double equal signs "==" at the end indicate Base64 padding.',
      'Use the CyberSphere Base64 Decoder tool in Lab 1 to decode the string.'
    ],
    hintPenalty: 20,
    flagAnswer: 'FLAG{base64_is_not_encryption_secret}',
    solutionExplanation: 'Base64 converts binary bytes into 6-bit ASCII representations. Decoding "RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb25fc2VjcmV0fQ==" yields "FLAG{base64_is_not_encryption_secret}".'
  },
  {
    id: 'ctf-3',
    title: 'SQLi Tautology Bypass',
    category: 'Web',
    difficulty: 'Easy',
    points: 150,
    prompt: 'A vulnerable legacy authentication endpoint queries the database using: SELECT * FROM admin WHERE user=\'USER_INPUT\' AND pass=\'...\'. What classic injection string entered into USER_INPUT makes the WHERE condition unconditionally TRUE and comments out the password requirement? Enter the full flag: FLAG{classic_sqli_bypass}',
    clues: [
      'The payload begins with a single quote to close the literal: \' ',
      'Next comes OR followed by an equality that is always true, like 1=1 or \'1\'=\'1\'',
      'Finally, an SQL comment sequence like -- or # ignores the rest of the query.'
    ],
    hintPenalty: 25,
    flagAnswer: 'FLAG{classic_sqli_bypass}',
    solutionExplanation: 'Entering \' OR 1=1 -- causes the SQL parser to evaluate (user=\'\' OR 1=1), returning true for all rows regardless of password.'
  },
  {
    id: 'ctf-4',
    title: 'Hexadecimal Memory Dump',
    category: 'Forensics',
    difficulty: 'Easy',
    points: 175,
    prompt: 'A malware analyst extracted a hex string from a RAM dump: "46 4c 41 47 7b 68 65 78 5f 62 79 74 65 73 5f 74 72 69 61 67 65 64 7d". Convert these hex values to ASCII text.',
    clues: [
      '46 in hex is 70 in decimal, which is uppercase "F" in ASCII.',
      '4c is "L", 41 is "A", 47 is "G", 7b is "{"',
      'Use the Hex/Binary Converter tool in Lab 2.'
    ],
    hintPenalty: 25,
    flagAnswer: 'FLAG{hex_bytes_triaged}',
    solutionExplanation: 'Converting hex pairs to ASCII characters: 46 4c 41 47 7b ... translates directly to FLAG{hex_bytes_triaged}.'
  },
  {
    id: 'ctf-5',
    title: 'Default Credentials Triage',
    category: 'Network',
    difficulty: 'Easy',
    points: 200,
    prompt: 'What was the default factory username and password pair famously exploited on over 300,000 CCTV cameras by the Mirai IoT botnet on Telnet port 23? Enter the flag in the format: FLAG{root_xc3511} or FLAG{admin_admin} or FLAG{root_admin} or FLAG{admin_1234}. Clue: Think of the highest Linux privilege user and default router admin password.',
    clues: [
      'User is the superuser account "root"',
      'Password is "admin"',
      'Format: FLAG{root_admin}'
    ],
    hintPenalty: 30,
    flagAnswer: 'FLAG{root_admin}',
    solutionExplanation: 'The Mirai dictionary list heavily exploited root:admin and root:xc3511 on busybox IoT firmware.'
  }
];
