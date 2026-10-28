import { SecurityTool } from '../types';

export const securityTools: SecurityTool[] = [
  {
    id: 'tool-wireshark',
    name: 'Wireshark',
    category: 'Network Analysis',
    tagline: 'The world’s most widely used network protocol analyzer.',
    officialSite: 'https://www.wireshark.org',
    license: 'GPLv2 (Open Source)',
    purpose: 'Inspect network traffic in microscopic detail. Wireshark captures packets on network interfaces and provides deep protocol dissection from physical link frames to application payloads.',
    coreFeatures: [
      'Live packet capture from Ethernet, Wi-Fi, Loopback, and Bluetooth interfaces',
      'Display filters with rich boolean syntax (e.g. `http.request.method == "POST" && ip.addr == 192.168.1.1`)',
      'Follow TCP / TLS Stream to reconstruct conversations exactly as endpoints exchanged them',
      'Export packet dissections to JSON, CSV, and PCAPNG forensic formats'
    ],
    installCommands: [
      { os: 'Ubuntu / Debian', cmd: 'sudo apt update && sudo apt install -y wireshark tshark' },
      { os: 'macOS (Homebrew)', cmd: 'brew install --cask wireshark' },
      { os: 'Arch Linux', cmd: 'sudo pacman -S wireshark-qt' }
    ],
    sampleCommands: [
      { cmd: 'tshark -i eth0 -f "tcp port 80" -w capture.pcap', description: 'Capture HTTP traffic to a pcap file using CLI version' },
      { cmd: 'tcp.analysis.flags && !tcp.analysis.window_update', description: 'Display filter for retransmissions and dropped segments' },
      { cmd: 'http contains "password" || http contains "admin"', description: 'Search cleartext HTTP streams for sensitive keyword leaks' }
    ],
    ethicalGuidelines: 'Only capture network packets on networks you own or where you have received explicit written authorization. Capturing third-party traffic without consent violates wiretapping and computer privacy laws.'
  },
  {
    id: 'tool-nmap',
    name: 'Nmap (Network Mapper)',
    category: 'Vulnerability Scanner',
    tagline: 'The premier open-source utility for network discovery and vulnerability auditing.',
    officialSite: 'https://nmap.org',
    license: 'Nmap Public Source License (NPSL)',
    purpose: 'Discover active hosts on a network subnet, map listening TCP/UDP ports, detect operating system fingerprints, and run automated vulnerability evaluation scripts (NSE).',
    coreFeatures: [
      'Host discovery using ARP, ICMP echo, and TCP SYN pings',
      'Fast port scanning via TCP SYN half-open probes (`-sS`)',
      'Service version detection (`-sV`) and OS detection (`-O`)',
      'Nmap Scripting Engine (NSE) with hundreds of automated security scripts'
    ],
    installCommands: [
      { os: 'Ubuntu / Debian', cmd: 'sudo apt update && sudo apt install -y nmap' },
      { os: 'macOS (Homebrew)', cmd: 'brew install nmap' },
      { os: 'Fedora / RHEL', cmd: 'sudo dnf install -y nmap' }
    ],
    sampleCommands: [
      { cmd: 'nmap -sS -p 1-1000 192.168.1.1', description: 'Stealth SYN scan of top 1000 ports on target gateway' },
      { cmd: 'nmap -sV -sC -T4 192.168.1.50', description: 'Version detection and default safe vulnerability assessment scripts' },
      { cmd: 'nmap --script ssl-enum-ciphers -p 443 192.168.1.10', description: 'Audit supported TLS ciphers for weak legacy protocols like 3DES or RC4' }
    ],
    ethicalGuidelines: 'Active port scanning sends unsolicited packets to target ports. Never scan government, corporate, or residential IP ranges without explicit permission.'
  },
  {
    id: 'tool-burpsuite',
    name: 'Burp Suite Community Edition',
    category: 'Web Security',
    tagline: 'The industry-standard interactive HTTP intercepting proxy for web security testing.',
    officialSite: 'https://portswigger.net/burp',
    license: 'Freeware / Commercial (PortSwigger)',
    purpose: 'Acts as an intermediary proxy between your web browser and target server, allowing security researchers to intercept, inspect, and modify HTTP/S requests in real time.',
    coreFeatures: [
      'Intercepting HTTP proxy with live request/response inspection',
      'Repeater tool to manually modify and re-issue individual HTTP requests',
      'Decoder tool to transform URL encoding, Base64, Hex, and Hashes',
      'Comparer tool to visually diff responses for subtle security behavior shifts'
    ],
    installCommands: [
      { os: 'Cross-Platform (Linux/macOS/Windows)', cmd: 'Download the official installer from portswigger.net or install via Kali package manager: sudo apt install burpsuite' }
    ],
    sampleCommands: [
      { cmd: 'burpsuite &', description: 'Launch the graphical application in the background' },
      { cmd: 'Config: Set browser proxy to 127.0.0.1:8080', description: 'Route browser traffic through Burp proxy and trust Burp CA certificate' }
    ],
    ethicalGuidelines: 'Used for authorized application security audits, bug bounty programs adhering strictly to program scopes, and controlled laboratory environments.'
  },
  {
    id: 'tool-owasp-zap',
    name: 'OWASP ZAP (ZAPROXY)',
    category: 'Web Security',
    tagline: 'The world’s most popular free and open-source web application security scanner.',
    officialSite: 'https://www.zaproxy.org',
    license: 'Apache 2.0 (Open Source)',
    purpose: 'Find security vulnerabilities in web applications during development and testing. Widely adopted for integrating automated security scans into DevSecOps CI/CD pipelines.',
    coreFeatures: [
      'Automated active and passive web vulnerability scanning',
      'Traditional and AJAX spidering for single-page applications (SPAs)',
      'Fuzzing framework with extensible payload generators',
      'Headless CLI and Docker integration for GitHub Actions and GitLab CI'
    ],
    installCommands: [
      { os: 'Ubuntu / Debian', cmd: 'sudo snap install zaproxy --classic' },
      { os: 'Docker', cmd: 'docker pull ghcr.io/zaproxy/zaproxy:stable' }
    ],
    sampleCommands: [
      { cmd: 'zap-baseline.py -t https://my-test-app.local', description: 'Run baseline passive scan against test staging URL inside container' }
    ],
    ethicalGuidelines: 'Active vulnerability scanning can trigger Denial of Service or populate backend databases with junk data. Only run scans against designated non-production staging systems.'
  },
  {
    id: 'tool-kali',
    name: 'Kali Linux',
    category: 'Operating System',
    tagline: 'The pre-configured Debian-derived distribution designed for digital forensics and penetration testing.',
    officialSite: 'https://www.kali.org',
    license: 'GPL (Open Source)',
    purpose: 'A specialized Linux operating system pre-loaded with over 600 defensive and offensive cybersecurity tools, forensic analysis utilities, and wireless diagnostic suites.',
    coreFeatures: [
      'Pre-configured security toolsets across all domains (recon, web, wireless, reversing, forensics)',
      'Available as ISO, VirtualBox/VMware appliance, WSL2 instance, or live boot with persistence',
      'Hardened default configurations and rolling updates based on Debian Testing'
    ],
    installCommands: [
      { os: 'Windows (WSL2)', cmd: 'wsl --install -d kali-linux' },
      { os: 'Virtual Machine', cmd: 'Import Kali OVA image into VirtualBox or VMware Workstation' }
    ],
    sampleCommands: [
      { cmd: 'sudo apt update && sudo apt dist-upgrade', description: 'Keep all Kali security tools updated to their latest patches' }
    ],
    ethicalGuidelines: 'Operating systems do not carry moral intent; the actions of the practitioner define legality. Possessing Kali Linux is legal, but utilizing its tools against unauthorized systems is illegal.'
  },
  {
    id: 'tool-ghidra',
    name: 'Ghidra',
    category: 'Reverse Engineering',
    tagline: 'A comprehensive software reverse engineering (SRE) suite developed by the NSA.',
    officialSite: 'https://ghidra-sre.org',
    license: 'Apache 2.0 (Open Source)',
    purpose: 'Analyze compiled software binaries across architectures (x86, x64, ARM, MIPS) without having original source code, enabling deep malware analysis and vulnerability research.',
    coreFeatures: [
      'High-quality decompiler that reconstructs C-like pseudo-code from machine assembly',
      'Interactive disassembler with graph visualizer of function control flows',
      'Support for PE, ELF, Mach-O, and raw firmware binary formats'
    ],
    installCommands: [
      { os: 'Ubuntu / Debian', cmd: 'sudo apt install default-jdk && wget https://github.com/NationalSecurityAgency/ghidra/releases/download/... && unzip ghidra.zip' }
    ],
    sampleCommands: [
      { cmd: './ghidraRun', description: 'Start Ghidra GUI interface' }
    ],
    ethicalGuidelines: 'Respect intellectual property and software license agreements. Reverse engineering is ethical for defensive malware research, vulnerability patching, and interoperability.'
  }
];
