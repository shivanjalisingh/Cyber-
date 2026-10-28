import { CommunityPost } from '../types';

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'How should a beginner set up their first isolated lab environment for ethical practice?',
    author: 'Alex_NetDef',
    authorRole: 'Junior Analyst',
    category: 'Lab Setup',
    timestamp: '2 hours ago',
    content: 'I want to practice Nmap and Linux terminal navigation without risking any home network devices. What is the safest hypervisor setup (VirtualBox vs VMware) and network adapter mode (NAT Network vs Host-Only) to isolate machines?',
    upvotes: 18,
    replies: [
      {
        id: 'rep-1',
        author: 'CyberSentry_Lead',
        authorRole: 'Senior Security Architect',
        timestamp: '1 hour ago',
        content: 'Use VirtualBox or VMware Workstation Player. Create an isolated "Host-Only Adapter" or internal network. In Host-Only mode, virtual machines can communicate with each other and your host, but cannot route traffic out to the internet or your physical Wi-Fi network. Perfect for practicing against intentionally vulnerable VMs like Metasploitable2.'
      },
      {
        id: 'rep-2',
        author: 'TriageNova',
        authorRole: 'Incident Responder',
        timestamp: '45 mins ago',
        content: 'Also make sure you take a clean snapshot of your target machine before booting it for the first time. That way, after any test session, you can roll back to a known clean state in 5 seconds!'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Why do so many breaches still stem from unpatched known CVEs instead of zero-days?',
    author: 'Samira_B',
    authorRole: 'SecOps Learner',
    category: 'Defensive Strategy',
    timestamp: '5 hours ago',
    content: 'We often hear sensational media stories about zero-days, but case studies like Equifax show attackers exploit vulnerabilities that had patches available months earlier. Why is enterprise patching so difficult?',
    upvotes: 27,
    replies: [
      {
        id: 'rep-3',
        author: 'PatchMaster99',
        authorRole: 'Infrastructure Engineer',
        timestamp: '3 hours ago',
        content: 'Enterprise systems have massive dependency trees. Patching a core framework like Java or OpenSSL can unexpectedly break legacy accounting software or payment gateways. IT teams must test patches in staging, which takes time. Threat actors know this window and automate scanning for new CVEs within 24 hours of public disclosure.'
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Best practices for reporting a security vulnerability responsibly to an organization?',
    author: 'Kiran_V',
    authorRole: 'Bug Hunter',
    category: 'Ethics & Legal',
    timestamp: '1 day ago',
    content: 'I noticed an open directory index on a university subdomain exposing test configuration files. How do I contact their security team without violating rules or raising false alarms?',
    upvotes: 34,
    replies: [
      {
        id: 'rep-4',
        author: 'ResponsibleDisclosureAdvocate',
        authorRole: 'Community Moderator',
        timestamp: '22 hours ago',
        content: 'First check if the domain publishes a `security.txt` file at `/.well-known/security.txt` or `/security.txt`. This RFC 9116 standard provides the official security contact email, PGP key, and disclosure policy. In your email, stick strictly to the facts: state the exact URL, the nature of the issue, and provide proof-of-concept without downloading or storing any confidential data. Be courteous and professional!'
      }
    ]
  }
];
