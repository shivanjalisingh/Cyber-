import { CourseCategory } from '../types';

export const courseCategories: CourseCategory[] = [
  {
    id: 'fundamentals',
    title: 'Cybersecurity Fundamentals',
    tagline: 'The foundational pillars of confidentiality, integrity, and defensive architecture.',
    difficulty: 'Beginner',
    estimatedHours: 6,
    iconName: 'Shield',
    description:
      'Master the core concepts of information security: the CIA Triad, threat modeling, vulnerability life cycles, authentication factors, and foundational defense-in-depth principles.',
    recommendedResources: [
      { title: 'NIST Computer Security Resource Center (SP 800-53)', urlOrRef: 'NIST Guidelines', type: 'RFC / Standard' },
      { title: 'CIS Critical Security Controls Version 8', urlOrRef: 'Center for Internet Security', type: 'Documentation' },
      { title: 'Security Engineering (Ross Anderson)', urlOrRef: 'Wiley Publishing', type: 'Book' },
    ],
    lessons: [
      {
        id: 'fund-1',
        title: 'The CIA Triad & Core Security Principles',
        durationMinutes: 20,
        overview: 'Understand how Confidentiality, Integrity, and Availability form the bedrock of all cybersecurity controls.',
        content: {
          keyConcepts: ['Confidentiality', 'Integrity', 'Availability', 'Non-Repudiation', 'Defense-in-Depth'],
          interactiveComponent: 'cia-triad',
          sections: [
            {
              heading: '1. What is the CIA Triad?',
              body: 'The CIA Triad is the universally recognized model guiding information security policy. Rather than viewing security as an elusive impenetrable wall, cybersecurity professionals evaluate every asset against three independent objectives:\n\n• Confidentiality: Ensuring that information is accessible only to authorized entities and kept concealed from unauthorized eyes.\n• Integrity: Preserving the accuracy, completeness, and tamper-resistance of data across its entire lifecycle (in transit, at rest, and in memory).\n• Availability: Ensuring reliable, timely access to data and resources for authorized personnel when needed.'
            },
            {
              heading: '2. Defense-in-Depth & The Swiss Cheese Model',
              body: 'No single security barrier is infallible. Defense-in-Depth uses layered controls—physical perimeter, network segmentation, host firewalls, least-privilege IAM, encryption, and endpoint detection—so that a failure in one layer is caught by subsequent safeguards.',
              callout: {
                type: 'tip',
                title: 'Architectural Golden Rule',
                text: 'Assume that any single perimeter control can and will be bypassed. Always combine preventative, detective, and corrective controls.'
              }
            },
            {
              heading: '3. Threat, Vulnerability, and Risk Equation',
              body: 'In professional security assessments, these three terms have precise definitions:\n\n• Threat: Any circumstance or actor (malicious insider, nation-state, automated bot) with the potential to adversely impact an asset.\n• Vulnerability: A weakness in system design, configuration, implementation, or operational process.\n• Risk: The probability of a threat actor successfully exploiting a vulnerability, multiplied by the resulting operational/financial impact.\n\nRisk = (Threat × Vulnerability × Impact) - Controls'
            }
          ],
          practicalExercise: {
            task: 'Identify which pillar of the CIA Triad is directly violated when a database backup file is accidentally modified by an unauthenticated process with write privileges.',
            hint: 'Think about whether data secrecy, data correctness, or service uptime was damaged.',
            solution: 'Integrity. The data was modified without authorization, impairing its correctness and trustworthiness.'
          }
        },
        quiz: [
          {
            id: 'q-fund-1-1',
            question: 'A Distributed Denial of Service (DDoS) attack overwhelms a critical healthcare portal, making patient records temporarily inaccessible to doctors. Which pillar of the CIA triad is primarily impacted?',
            options: ['Confidentiality', 'Integrity', 'Availability', 'Non-Repudiation'],
            correctIndex: 2,
            explanation: 'Availability ensures authorized users have timely and reliable access. A DDoS attack exhausts bandwidth or compute, causing denial of service.'
          },
          {
            id: 'q-fund-1-2',
            question: 'What is the primary objective of Multi-Factor Authentication (MFA)?',
            options: [
              'Encrypting data stored on the hard drive',
              'Requiring evidence from at least two different credential categories (something you know, have, or are)',
              'Preventing network packet sniffers from reading HTTP headers',
              'Speeding up session token generation'
            ],
            correctIndex: 1,
            explanation: 'MFA requires two or more distinct authentication factors: something you know (password), something you have (security key/app), or something you are (biometrics).'
          }
        ]
      },
      {
        id: 'fund-2',
        title: 'Threat Modeling & STRIDE Framework',
        durationMinutes: 25,
        overview: 'Systematically decompose software systems to preemptively identify architectural vulnerabilities using Microsoft STRIDE.',
        content: {
          keyConcepts: ['STRIDE', 'Data Flow Diagrams (DFDs)', 'Trust Boundaries', 'Attack Surface'],
          sections: [
            {
              heading: '1. The Four Questions of Threat Modeling',
              body: 'Threat modeling is the practice of identifying security requirements early in system architecture. It answers four core questions:\n1. What are we building?\n2. What can go wrong?\n3. What are we going to do about it?\n4. Did we do a good enough job?'
            },
            {
              heading: '2. The STRIDE Taxonomy',
              body: 'STRIDE classifies security threats into 6 explicit categories:\n\n• S - Spoofing: Impersonating an authentic user or service.\n• T - Tampering: Modifying data or code maliciously.\n• R - Repudiation: Denying that an action was taken without an audit trail.\n• I - Information Disclosure: Exposing confidential data to unauthorized parties.\n• D - Denial of Service: Depleting system resources.\n• E - Elevation of Privilege: Gaining unauthorized administrative capabilities.'
            }
          ],
          practicalExercise: {
            task: 'Determine which STRIDE category matches an attacker intercepting an unencrypted session cookie and using it to impersonate the administrator.',
            hint: 'Is the attacker modifying data, claiming they did not do something, or pretending to be someone else?',
            solution: 'Spoofing (and potentially Elevation of Privilege). The attacker impersonates the identity of an authorized administrator.'
          }
        },
        quiz: [
          {
            id: 'q-fund-2-1',
            question: 'In STRIDE, a user modifying the price parameter inside an unvalidated HTTP request before submitting payment is an example of what threat?',
            options: ['Repudiation', 'Tampering', 'Information Disclosure', 'Denial of Service'],
            correctIndex: 1,
            explanation: 'Tampering refers to unauthorized alteration of data either in transit, at rest, or in memory.'
          }
        ]
      }
    ]
  },
  {
    id: 'networking',
    title: 'Networking & Protocols',
    tagline: 'Master packet flows, TCP/IP handshakes, routing, DNS, and traffic analysis.',
    difficulty: 'Beginner',
    estimatedHours: 8,
    iconName: 'Network',
    description:
      'Unpack the OSI and TCP/IP stack models. Deep dive into IP addressing, subnetting, TCP 3-way handshakes, DNS resolution loops, HTTP/S protocols, and firewall rules.',
    recommendedResources: [
      { title: 'RFC 793 - Transmission Control Protocol', urlOrRef: 'IETF Standards', type: 'RFC / Standard' },
      { title: 'Wireshark User Guide', urlOrRef: 'Wireshark Foundation', type: 'Documentation' },
      { title: 'TCP/IP Illustrated, Vol. 1 (W. Richard Stevens)', urlOrRef: 'Addison-Wesley', type: 'Book' }
    ],
    lessons: [
      {
        id: 'net-1',
        title: 'TCP/IP Model & The Three-Way Handshake',
        durationMinutes: 25,
        overview: 'Explore how reliable connections are established via SYN, SYN-ACK, and ACK flags.',
        content: {
          keyConcepts: ['OSI Model vs TCP/IP', 'TCP 3-Way Handshake', 'Sequence Numbers', 'SYN Floods'],
          interactiveComponent: 'handshake-sim',
          sections: [
            {
              heading: '1. The 3-Way Handshake Mechanism',
              body: 'TCP is a connection-oriented transport protocol. Before application data (such as HTTP or SSH) can be transmitted, client and server must agree on initial sequence numbers (ISNs):\n\n1. SYN: Client sends a TCP segment with the SYN flag set and an initial sequence number (seq=x).\n2. SYN-ACK: Server acknowledges the client’s request by returning an ACK (ack=x+1) and initiates its own sequence number with SYN (seq=y).\n3. ACK: Client sends the final confirmation ACK (ack=y+1). The connection state transitions to ESTABLISHED.'
            },
            {
              heading: '2. Common Transport & Application Ports',
              body: 'Well-known ports (0-1023) are assigned to standard services:\n\n• Port 22: SSH (Secure Shell)\n• Port 53: DNS (Domain Name System)\n• Port 80: HTTP (Cleartext Web)\n• Port 443: HTTPS (TLS Encrypted Web)\n• Port 3389: RDP (Remote Desktop Protocol)',
              codeBlock: {
                language: 'bash',
                code: '# Check listening ports on Linux\nsudo ss -tulpn\n\n# Probe a target port with netcat\nnc -zv 192.168.1.1 443',
                caption: 'Checking socket status using ss and nc'
              }
            }
          ],
          practicalExercise: {
            task: 'If a client sends SYN with seq=1000 and the server replies with SYN-ACK with seq=5000 and ack=1001, what must the client reply with in the final ACK?',
            hint: 'The client must acknowledge the server’s sequence number by incrementing it by 1.',
            solution: 'ack=5001 (and its own seq=1001).'
          }
        },
        quiz: [
          {
            id: 'q-net-1-1',
            question: 'During a TCP SYN flood attack, what resource is typically exhausted on the victim server?',
            options: [
              'The CPU instruction pipeline',
              'The TCP connection backlog table (half-open connection queue)',
              'The domain registration cache',
              'The physical NIC MAC table'
            ],
            correctIndex: 1,
            explanation: 'SYN floods leave numerous connections in the SYN_RECEIVED state waiting for an ACK that never arrives, exhausting the connection queue.'
          }
        ]
      }
    ]
  },
  {
    id: 'linux',
    title: 'Linux & Command Line',
    tagline: 'Terminal navigation, system administration, permission octals, and defense hygiene.',
    difficulty: 'Beginner',
    estimatedHours: 7,
    iconName: 'Terminal',
    description:
      'Gain fluency in the Linux operating system, bash syntax, directory trees, file permission octals (chmod/chown), process isolation, and essential hardening practices.',
    recommendedResources: [
      { title: 'The Linux Command Line (William Shotts)', urlOrRef: 'No Starch Press', type: 'Book' },
      { title: 'Linux Standard Base (LSB) Core Specification', urlOrRef: 'Linux Foundation', type: 'Documentation' }
    ],
    lessons: [
      {
        id: 'lin-1',
        title: 'Linux File Permissions & Chmod Octals',
        durationMinutes: 20,
        overview: 'Deconstruct Read (4), Write (2), and Execute (1) permission bits for Owner, Group, and Others.',
        content: {
          keyConcepts: ['Owner/Group/Others', 'Numeric Octals (4, 2, 1)', 'SUID/SGID', 'chown / chmod'],
          interactiveComponent: 'chmod-calc',
          sections: [
            {
              heading: '1. The 9-Bit Permission Architecture',
              body: 'Every Linux file contains metadata specifying permissions for three entities:\n\n• User (Owner) [u]\n• Group [g]\n• Others (World) [o]\n\nEach entity has three flags: Read (r = 4), Write (w = 2), and Execute (x = 1). Adding the values together yields an octal digit between 0 and 7.',
              codeBlock: {
                language: 'bash',
                code: '# Grant read/write/execute to owner, read/execute to group and others\nchmod 755 script.sh\n\n# Grant read/write only to owner (secure for private SSH keys)\nchmod 600 id_ed25519',
                caption: 'Setting permissions on security-sensitive files'
              }
            }
          ],
          practicalExercise: {
            task: 'Calculate the 3-digit octal permission value for a file where: Owner has Read + Write, Group has Read only, and Others have zero permissions.',
            hint: 'Owner: 4 + 2 = 6. Group: 4 = 4. Others: 0.',
            solution: '640'
          }
        },
        quiz: [
          {
            id: 'q-lin-1-1',
            question: 'What numeric permission should be assigned to an SSH private key file (~/.ssh/id_rsa) so that OpenSSH accepts it as securely protected?',
            options: ['777', '600', '755', '644'],
            correctIndex: 1,
            explanation: '600 gives Read and Write to the owner only. Any access to group or others will cause OpenSSH to refuse using the key due to insecurity.'
          }
        ]
      }
    ]
  },
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking & Recon',
    tagline: 'Methodology, reconnaissance, threat assessment, and responsible disclosure.',
    difficulty: 'Intermediate',
    estimatedHours: 9,
    iconName: 'Eye',
    description:
      'Learn the standard penetration testing lifecycle: passive & active reconnaissance, vulnerability scanning, threat modeling, and how to write rigorous responsible disclosure reports.',
    recommendedResources: [
      { title: 'Penetration Testing Execution Standard (PTES)', urlOrRef: 'PTES Standard', type: 'Documentation' },
      { title: 'OWASP Testing Guide (WSTG)', urlOrRef: 'OWASP Foundation', type: 'Documentation' }
    ],
    lessons: [
      {
        id: 'eth-1',
        title: 'Penetration Testing Phases & Legal Rules of Engagement',
        durationMinutes: 30,
        overview: 'Understand the difference between ethical security assessments and unauthorized cybercrime.',
        content: {
          keyConcepts: ['Rules of Engagement', 'Passive vs Active Recon', 'Scope Creep', 'Responsible Disclosure'],
          sections: [
            {
              heading: '1. The 5 Phases of Ethical Hacking',
              body: '1. Reconnaissance: Gathering intelligence on the target (DNS records, employee roles, tech stack).\n2. Scanning: Discovering live hosts, open ports, and unpatched versions.\n3. Vulnerability Analysis: Assessing discovered software against known CVE databases.\n4. Exploitation: Verifying theoretical flaws in a controlled, non-disruptive manner.\n5. Post-Exploitation & Reporting: Documenting root causes, risk severity, and remediation steps.'
            },
            {
              heading: '2. The Legal Boundary',
              body: 'Ethical penetration testing requires explicit, written authorization (Scope of Work / Rules of Engagement). Testing systems without prior consent is a criminal offense under statutes such as the CFAA (US) and Computer Misuse Act (UK).',
              callout: {
                type: 'warning',
                title: 'Legal Warning',
                text: 'Never run active port scanners or vulnerability probes against third-party systems without prior contractual authorization.'
              }
            }
          ],
          practicalExercise: {
            task: 'Classify whether querying WHOIS registries and searching publicly indexed Google dorks constitutes Passive or Active reconnaissance.',
            hint: 'Does WHOIS send traffic directly to the target’s corporate web server?',
            solution: 'Passive Reconnaissance. It queries third-party registries and search engines without directly contacting target infrastructure.'
          }
        },
        quiz: [
          {
            id: 'q-eth-1-1',
            question: 'What is the most critical document that an ethical pentester must have signed prior to sending any assessment packets?',
            options: [
              'A Wireshark software license',
              'Rules of Engagement (RoE) / Written Authorization',
              'A GitHub pull request agreement',
              'An SSL root certificate authority bundle'
            ],
            correctIndex: 1,
            explanation: 'Written Rules of Engagement clearly specify authorized IP ranges, testing windows, contact escalation channels, and legal permission.'
          }
        ]
      }
    ]
  },
  {
    id: 'web-security',
    title: 'Web Application Security & OWASP',
    tagline: 'Defend against SQLi, XSS, CSRF, broken access control, and API vulnerabilities.',
    difficulty: 'Intermediate',
    estimatedHours: 10,
    iconName: 'Globe',
    description:
      'Dissect the OWASP Top 10 vulnerabilities. Master how SQL Injection occurs at the query layer, how Cross-Site Scripting manipulates the DOM, and how parameterized queries prevent attacks.',
    recommendedResources: [
      { title: 'OWASP Top 10:2021', urlOrRef: 'owasp.org', type: 'Documentation' },
      { title: 'The Web Application Hacker’s Handbook (Dafydd Stuttard)', urlOrRef: 'Wiley', type: 'Book' }
    ],
    lessons: [
      {
        id: 'web-1',
        title: 'SQL Injection: Flaws, Exploits & Parameterized Defense',
        durationMinutes: 30,
        overview: 'See how dynamic query concatenation leads to database compromise and how prepared statements eliminate the flaw.',
        content: {
          keyConcepts: ['SQL Injection', 'Prepared Statements', 'Tautologies', 'ORM Pitfalls'],
          interactiveComponent: 'owasp-matrix',
          sections: [
            {
              heading: '1. Root Cause: Mixing Code and Data',
              body: 'SQL injection occurs when untrusted user input is directly concatenated into a dynamic SQL query string without strict type separation. The database engine cannot distinguish developer commands from user-supplied characters.'
            },
            {
              heading: '2. The Anatomy of an Attack',
              body: 'Consider this vulnerable backend authentication check:\n`SELECT * FROM users WHERE username = \'` + user_input + `\' AND password = \'` + pass_input + `\';`\n\nIf the attacker supplies `admin\' --` in the username field, the query becomes:\n`SELECT * FROM users WHERE username = \'admin\' --\' AND password = \'...\';`\nThe double-dash comments out the password requirement entirely!',
              codeBlock: {
                language: 'typescript',
                code: '// ❌ VULNERABLE: Direct string interpolation\nconst sql = `SELECT * FROM accounts WHERE id = ${req.query.id}`;\n\n// ✅ SECURE: Parameterized query (Prepared statement)\nconst sql = "SELECT * FROM accounts WHERE id = $1";\nawait pool.query(sql, [req.query.id]);',
                caption: 'Vulnerable query vs Secure parameterized query'
              }
            }
          ],
          practicalExercise: {
            task: 'Explain why parameterized queries (prepared statements) protect against SQL injection even if the user inputs malicious quotes like \' OR 1=1 --',
            hint: 'How does the database compiler treat parameterized placeholders?',
            solution: 'Prepared statements pre-compile the SQL execution plan first. Any input supplied into parameters is strictly treated as literal string/numerical data, never parsed as executable syntax.'
          }
        },
        quiz: [
          {
            id: 'q-web-1-1',
            question: 'Which of the following is the definitive primary defense against SQL Injection in modern web backends?',
            options: [
              'Base64-encoding all user input strings',
              'Using Parameterized Queries (Prepared Statements) or ORMs that bind variables safely',
              'Hiding the database port with an internal IP',
              'Checking the user agent string with a regex'
            ],
            correctIndex: 1,
            explanation: 'Prepared statements separate SQL code structure from incoming data values, rendering injection syntactically impossible.'
          }
        ]
      }
    ]
  },
  {
    id: 'cryptography',
    title: 'Cryptography & Data Protection',
    tagline: 'Symmetric vs asymmetric ciphers, SHA-256 hashing, digital signatures, and TLS.',
    difficulty: 'Intermediate',
    estimatedHours: 8,
    iconName: 'Lock',
    description:
      'Learn modern cryptographic primitives: block ciphers (AES-GCM), asymmetric key exchange (RSA, ECC), cryptographic hash functions (SHA-256), and digital signatures.',
    recommendedResources: [
      { title: 'RFC 5246 / RFC 8446 - The TLS Protocol 1.3', urlOrRef: 'IETF', type: 'RFC / Standard' },
      { title: 'Serious Cryptography (Jean-Philippe Aumasson)', urlOrRef: 'No Starch Press', type: 'Book' }
    ],
    lessons: [
      {
        id: 'crypto-1',
        title: 'Hashing vs Encryption vs Encoding',
        durationMinutes: 25,
        overview: 'Dispel common terminology confusion: why Base64 is not encryption and why passwords must never be encrypted.',
        content: {
          keyConcepts: ['One-Way Hashing', 'Symmetric Encryption', 'Asymmetric Encryption', 'Salting & Argon2'],
          interactiveComponent: 'crypto-keys',
          sections: [
            {
              heading: '1. Three Distinct Operations',
              body: '• Encoding (e.g. Base64, Hex): Reversible data representation without a secret key. Used for transport compatibility, NOT security.\n• Encryption (e.g. AES, RSA): Two-way mathematical transformation using a secret key. Only someone with the key can decrypt.\n• Hashing (e.g. SHA-256, bcrypt): Deterministic one-way mathematical function. It cannot be mathematically reversed to recover the original plaintext.'
            },
            {
              heading: '2. Storing Passwords Securely',
              body: 'Never use fast general-purpose hashes like MD5 or SHA-256 for password storage, as GPUs can calculate billions of hashes per second. Modern systems mandate slow, memory-hard adaptive hashing algorithms such as Argon2id or bcrypt combined with unique cryptographic salts.',
              callout: {
                type: 'tip',
                title: 'Salt Purpose',
                text: 'A cryptographic salt is random data added to a password before hashing. It ensures that two users with the same password produce completely distinct hashes, preventing pre-computed rainbow table attacks.'
              }
            }
          ],
          practicalExercise: {
            task: 'Can a Base64-encoded string be decoded without a secret password or key?',
            hint: 'Is Base64 an encryption algorithm or an encoding scheme?',
            solution: 'Yes. Base64 is purely a format conversion (encoding), requiring zero keys to convert back to original plaintext.'
          }
        },
        quiz: [
          {
            id: 'q-cry-1-1',
            question: 'Why is SHA-256 without a salt considered inappropriate for hashing user passwords today?',
            options: [
              'Because SHA-256 was mathematically broken in 2005',
              'Because modern GPUs can compute billions of SHA-256 hashes per second, allowing rapid offline brute-force and rainbow table lookups',
              'Because SHA-256 is an asymmetric cipher',
              'Because SHA-256 only supports 16-character passwords'
            ],
            correctIndex: 1,
            explanation: 'SHA-256 is designed to be fast for verifying file integrity. Password hashing requires intentionally slow, memory-hard algorithms like Argon2id or bcrypt.'
          }
        ]
      }
    ]
  },
  {
    id: 'forensics',
    title: 'Digital Forensics & Incident Response',
    tagline: 'Chain of custody, memory dump triage, timestomping, and root-cause analysis.',
    difficulty: 'Intermediate',
    estimatedHours: 8,
    iconName: 'Search',
    description:
      'Learn how incident responders preserve evidence without altering volatile RAM, analyze Windows event logs and Linux auth.log, and reconstruct intrusion timelines.',
    recommendedResources: [
      { title: 'NIST SP 800-86 Guide to Integrating Forensic Techniques', urlOrRef: 'NIST', type: 'RFC / Standard' },
      { title: 'The Art of Memory Forensics (Ligh, Case, Levy, Walters)', urlOrRef: 'Wiley', type: 'Book' }
    ],
    lessons: [
      {
        id: 'for-1',
        title: 'Evidence Preservation & Order of Volatility',
        durationMinutes: 25,
        overview: 'Why pulling the power plug can destroy crucial forensic artifacts in memory.',
        content: {
          keyConcepts: ['Order of Volatility', 'Chain of Custody', 'Cryptographic Hashes of Evidence', 'RAM Acquisition'],
          sections: [
            {
              heading: '1. RFC 3227: Order of Volatility',
              body: 'When capturing digital evidence during an incident, collect the most transient and easily lost information first:\n\n1. CPU registers & cache\n2. Routing tables, ARP cache, process table, kernel memory\n3. System RAM (volatile memory)\n4. Temporary file systems & swap\n5. Non-volatile storage (hard drives, SSDs)\n6. Remote logging data & archival media'
            }
          ],
          practicalExercise: {
            task: 'Why must investigators compute a SHA-256 hash of a forensically imaged disk immediately upon creation?',
            hint: 'How will they prove in court that the image was not tampered with during analysis?',
            solution: 'To establish evidence integrity. If the hash matches the original drive, it proves the forensic copy has not been altered.'
          }
        },
        quiz: [
          {
            id: 'q-for-1-1',
            question: 'Which of the following data sources is the MOST volatile during an active forensic investigation?',
            options: ['Hard drive partition table', 'RAM (system memory)', 'CPU cache & registers', 'Archived network syslog file'],
            correctIndex: 2,
            explanation: 'CPU registers and cache are lost in nanoseconds or microseconds as soon as execution changes, making them the most volatile.'
          }
        ]
      }
    ]
  },
  {
    id: 'malware-analysis',
    title: 'Malware Analysis & Threat Intel',
    tagline: 'Dissecting binaries, behavior analysis, IOCs, and MITRE ATT&CK mapping.',
    difficulty: 'Advanced',
    estimatedHours: 9,
    iconName: 'Bug',
    description:
      'Explore malware classification (trojans, ransomware, rootkits, infostealers). Study static and dynamic analysis methodologies, indicators of compromise (IOCs), and YARA rules.',
    recommendedResources: [
      { title: 'Practical Malware Analysis (Michael Sikorski)', urlOrRef: 'No Starch Press', type: 'Book' },
      { title: 'MITRE ATT&CK Matrix for Enterprise', urlOrRef: 'attack.mitre.org', type: 'Documentation' }
    ],
    lessons: [
      {
        id: 'mal-1',
        title: 'Static vs Dynamic Analysis & Indicators of Compromise',
        durationMinutes: 30,
        overview: 'Inspect malware safely without risking production host infection.',
        content: {
          keyConcepts: ['Static Analysis (strings, PE headers)', 'Dynamic Analysis (sandbox detonation)', 'IOCs (Hashes, C2 Domains)', 'YARA Rules'],
          sections: [
            {
              heading: '1. Two Complementary Approaches',
              body: '• Static Analysis: Examining code and metadata without executing the binary. Includes calculating hashes, extracting printable strings, inspecting PE export/import tables, and decompiling bytecode.\n• Dynamic Analysis: Executing the malware in an isolated, instrumented sandbox environment with monitored network egress, registry watchers, and API call hooking.'
            }
          ],
          practicalExercise: {
            task: 'Identify two common indicators of compromise (IOCs) that a security analyst extracts from a malicious payload sample.',
            hint: 'Think about network destinations and file fingerprints.',
            solution: 'File cryptographic hashes (SHA-256) and Command & Control (C2) IP addresses or domain names.'
          }
        },
        quiz: [
          {
            id: 'q-mal-1-1',
            question: 'What is the primary risk of performing dynamic malware analysis on a live corporate workstation instead of a sandboxed virtual machine?',
            options: [
              'The compiler might throw syntax warnings',
              'The malware could execute its payload, infect other LAN machines, encrypt files, or phone home to an attacker C2 server',
              'The CPU clock speed will permanently downgrade',
              'The DNS server will run out of memory'
            ],
            correctIndex: 1,
            explanation: 'Dynamic analysis executes real machine code. It must strictly run in isolated, disposable sandboxes.'
          }
        ]
      }
    ]
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security & DevSecOps',
    tagline: 'Shared responsibility, IAM least privilege, misconfigured buckets, and zero trust.',
    difficulty: 'Intermediate',
    estimatedHours: 7,
    iconName: 'Cloud',
    description:
      'Learn cloud infrastructure defense across AWS, GCP, and Azure. Understand IAM policy misconfigurations, cloud storage public access, container escape vectors, and CI/CD secret leaks.',
    recommendedResources: [
      { title: 'CIS Cloud Security Benchmarks', urlOrRef: 'Center for Internet Security', type: 'Documentation' },
      { title: 'Cloud Security Alliance (CSA) Security Guidance v4', urlOrRef: 'cloudsecurityalliance.org', type: 'Documentation' }
    ],
    lessons: [
      {
        id: 'cld-1',
        title: 'The Shared Responsibility Model & IAM Least Privilege',
        durationMinutes: 25,
        overview: 'Understand what the cloud provider secures versus what remains the customer’s responsibility.',
        content: {
          keyConcepts: ['IaaS vs PaaS vs SaaS', 'Shared Responsibility', 'Principle of Least Privilege', 'Cloud Storage Leakage'],
          sections: [
            {
              heading: '1. Who is Responsible for What?',
              body: 'In IaaS (Infrastructure as a Service), cloud providers manage physical data center security, host virtualization, and network cabling. The customer is entirely responsible for OS patches, firewall configurations, IAM permissions, application security, and data encryption.'
            }
          ],
          practicalExercise: {
            task: 'If an organization creates a storage bucket containing confidential medical records and leaves the bucket ACL set to "Public / All Users", whose security failure is this under the Shared Responsibility Model?',
            hint: 'Did AWS/GCP have a hardware failure, or did the customer configure access permissions improperly?',
            solution: 'Customer responsibility. Configuration of access control policies and data classification is always the customer’s obligation.'
          }
        },
        quiz: [
          {
            id: 'q-cld-1-1',
            question: 'Under the Shared Responsibility Model for an IaaS virtual machine, who is responsible for applying operating system security patches?',
            options: ['The cloud service provider (CSP)', 'The customer', 'The hardware manufacturer', 'The DNS registrar'],
            correctIndex: 1,
            explanation: 'In IaaS, the customer retains control and responsibility for guest OS installation, patching, user accounts, and firewalls.'
          }
        ]
      }
    ]
  },
  {
    id: 'iot-blockchain',
    title: 'IoT & Blockchain Security',
    tagline: 'Embedded device firmware, MQTT attacks, smart contract reentrancy, and consensus risks.',
    difficulty: 'Advanced',
    estimatedHours: 8,
    iconName: 'Cpu',
    description:
      'Analyze the expanding hardware attack surface: hardcoded IoT credentials, insecure MQTT brokers, alongside decentralized risks: smart contract reentrancy attacks and 51% consensus takeover.',
    recommendedResources: [
      { title: 'OWASP Internet of Things (IoT) Top 10', urlOrRef: 'owasp.org', type: 'Documentation' },
      { title: 'Mastering Ethereum: Smart Contract Security (Antonopoulos & Wood)', urlOrRef: 'O’Reilly', type: 'Book' }
    ],
    lessons: [
      {
        id: 'iot-1',
        title: 'IoT Attack Surface & Smart Contract Reentrancy',
        durationMinutes: 30,
        overview: 'From Mirai botnets exploiting default telnet passwords to millions drained in DAO smart contract reentrancy.',
        content: {
          keyConcepts: ['Hardcoded Credentials', 'Firmware Reverse Engineering', 'Smart Contract Reentrancy', 'Checks-Effects-Interactions Pattern'],
          sections: [
            {
              heading: '1. The IoT Vulnerability Epidemic',
              body: 'Many connected cameras, routers, and smart devices ship with default root credentials that cannot be easily updated over-the-air, enabling large-scale botnet recruitment (e.g., the Mirai botnet).'
            },
            {
              heading: '2. Smart Contract Reentrancy',
              body: 'In Ethereum Solidity, a reentrancy vulnerability occurs when a contract sends external Ether to an untrusted contract address before updating its own internal user balance state. The malicious fallback function calls back into `withdraw()` recursively until contract funds are depleted.'
            }
          ],
          practicalExercise: {
            task: 'What programming pattern prevents smart contract reentrancy bugs in Solidity?',
            hint: 'What order should state updates and external token transfers follow?',
            solution: 'The Checks-Effects-Interactions pattern (or using OpenZeppelin ReentrancyGuard mutex locks).'
          }
        },
        quiz: [
          {
            id: 'q-iot-1-1',
            question: 'Why did the Mirai botnet succeed in compromising over 300,000 IoT devices within hours?',
            options: [
              'It used a zero-day quantum computing decryption algorithm',
              'It scanned the public IPv4 space for open Telnet ports (23) and attempted a simple dictionary list of 60 default factory username/password combinations',
              'It exploited an unpatched flaw in the DNS root servers',
              'It manipulated Bitcoin blockchain consensus rules'
            ],
            correctIndex: 1,
            explanation: 'Mirai exploited the massive prevalence of default, unchangeable vendor passwords (e.g. root/admin, admin/12345) on internet-exposed Telnet services.'
          }
        ]
      }
    ]
  }
];
