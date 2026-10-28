import React, { useState } from 'react';
import {
  Users, MessageSquare, ThumbsUp, Send, Shield, Lock,
  CheckCircle2, Mail, HelpCircle, PlusCircle, X, ChevronDown, ChevronUp
} from 'lucide-react';
import { initialCommunityPosts } from '../data/communityData';
import { CommunityPost } from '../types';
import { useUser } from '../context/UserContext';

type Tab = 'about' | 'community' | 'contact';

export const AboutCommunityView: React.FC = () => {
  const { profile } = useUser();
  const [activeTab, setActiveTab] = useState<Tab>('community');
  const [posts, setPosts] = useState<CommunityPost[]>(initialCommunityPosts);

  // New post modal
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('General Defense');
  const [postContent, setPostContent] = useState('');

  // Reply state
  const [replyOpenPostId, setReplyOpenPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Contact form state
  const [contactName, setContactName] = useState(profile.username);
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Curriculum Feedback');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleUpvote = (postId: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      title: postTitle.trim(),
      category: postCategory,
      author: profile.username,
      authorRole: profile.roleTitle,
      timestamp: 'Just now',
      content: postContent.trim(),
      upvotes: 1,
      replies: []
    };

    setPosts([newPost, ...posts]);
    setPostTitle('');
    setPostContent('');
    setNewPostModalOpen(false);
  };

  const handleAddReply = (postId: string) => {
    if (!replyText.trim()) return;

    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        return {
          ...p,
          replies: [
            ...p.replies,
            {
              id: `rep-${Date.now()}`,
              author: profile.username,
              authorRole: profile.roleTitle,
              timestamp: 'Just now',
              content: replyText.trim()
            }
          ]
        };
      })
    );
    setReplyText('');
    setReplyOpenPostId(null);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactMessage('');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
          <Users className="w-4 h-4" />
          <span>COLLABORATION & DEFENSE ETHICS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">About & Community</h1>
        <p className="text-sm text-slate-400 mt-1">
          Connect with fellow defensive practitioners, review the CyberSphere ethical charter, and provide feedback to expand the academy.
        </p>
      </div>

      {/* View Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('community')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'community'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Learner Community ({posts.length} Threads)</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'about'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Platform Mission & Ethical Charter</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'contact'
              ? 'bg-sky-500/15 border border-sky-400 text-sky-300'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact & Feedback Form</span>
        </button>
      </div>

      {/* 1. COMMUNITY FORUM */}
      {activeTab === 'community' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Defensive Security Discussions</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Share research, ask questions regarding labs and CTFs, and exchange threat intelligence.
              </p>
            </div>
            <button
              onClick={() => setNewPostModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Ask a Question</span>
            </button>
          </div>

          {/* Posts list */}
          <div className="space-y-4">
            {posts.map(post => (
              <div
                key={post.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-mono text-sky-400 font-semibold">{post.category}</span>
                      <span>·</span>
                      <span>Posted by <strong className="text-slate-200">{post.author}</strong> ({post.authorRole})</span>
                      <span>·</span>
                      <span>{post.timestamp}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{post.title}</h4>
                  </div>

                  {/* Upvote button */}
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-sky-400" />
                    <span className="tabular-nums font-bold">{post.upvotes}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Replies section */}
                {post.replies.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Community Responses ({post.replies.length}):
                    </span>
                    <div className="space-y-2 pl-3 border-l border-slate-800">
                      {post.replies.map(rep => (
                        <div key={rep.id} className="p-3 bg-slate-950/60 rounded-lg text-xs space-y-1">
                          <div className="flex items-center justify-between text-slate-400 text-[11px]">
                            <span className="font-bold text-slate-200">
                              {rep.author} <span className="text-sky-400 font-normal">({rep.authorRole})</span>
                            </span>
                            <span>{rep.timestamp}</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{rep.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline reply trigger */}
                <div className="pt-2 flex items-center justify-between">
                  {replyOpenPostId === post.id ? (
                    <div className="w-full space-y-2">
                      <textarea
                        rows={2}
                        placeholder="Write a constructive, technically grounded reply..."
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setReplyOpenPostId(null);
                            setReplyText('');
                          }}
                          className="px-3 py-1 rounded text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddReply(post.id)}
                          className="px-3 py-1 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                        >
                          Post Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyOpenPostId(post.id)}
                      className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Reply to thread</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. ABOUT & ETHICAL CHARTER */}
      {activeTab === 'about' && (
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white">Our Educational Mission</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              CyberSphere was established with a clear mandate: democratize professional, rigorous cybersecurity education. Cybersecurity is often portrayed through dramatized cinematic tropes or fragmented behind paywalls. CyberSphere bridges the gap by providing grounded theory alongside safe, interactive browser simulations.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Whether you are an aspiring SOC analyst, a developer hardening web APIs, or an experienced engineer reviewing cryptographic primitives, our platform provides a modular, self-paced curriculum.
            </p>
          </div>

          {/* Ethical Charter */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/20 to-slate-900 border border-emerald-500/30 space-y-5">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">The CyberSphere Ethical Charter</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Knowledge of offensive techniques is taught strictly to cultivate informed defensive countermeasures. All learners agree to uphold these core tenets:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white block font-mono">1. Absolute Legal Authorization</strong>
                <p className="text-slate-300">
                  Never scan, probe, or interact with any system or network without prior explicit, written authorization from the system owner.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white block font-mono">2. Strict Sandboxing Discipline</strong>
                <p className="text-slate-300">
                  Practice exploits and payloads strictly within designated local virtual machines, CTF arenas, or browser-based sandboxes provided on this platform.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white block font-mono">3. Responsible Coordinated Disclosure</strong>
                <p className="text-slate-300">
                  When discovering vulnerabilities in third-party systems, report findings privately to security teams via RFC 9116 security.txt channels before any public disclosure.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white block font-mono">4. Defense First Mindset</strong>
                <p className="text-slate-300">
                  Pair every demonstrated weakness with a corresponding remediation: parameterized queries for SQLi, escaping for XSS, and least privilege for IAM.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTACT & FEEDBACK FORM */}
      {activeTab === 'contact' && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white">Contact Platform Maintainers</h3>
            <p className="text-xs text-slate-400 mt-1">
              Have curriculum suggestions, detected a bug in a lab sandbox, or want to contribute a challenge?
            </p>
          </div>

          {contactSuccess && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Thank you! Your feedback has been recorded and routed to the curriculum development team.</span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 block">Your Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 block">Your Email</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 block">Topic</label>
              <select
                value={contactSubject}
                onChange={e => setContactSubject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="Curriculum Feedback">Curriculum & Lesson Feedback</option>
                <option value="Lab Anomaly Report">Interactive Lab Bug Report</option>
                <option value="CTF Challenge Submission">Propose a New CTF Challenge</option>
                <option value="Institutional Inquiry">Academic / University Partnership</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 block">Message</label>
              <textarea
                rows={5}
                placeholder="Share your detailed feedback or recommendations..."
                value={contactMessage}
                onChange={e => setContactMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>
      )}

      {/* New Post Modal */}
      {newPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreatePost}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Start a Discussion</h3>
              <button
                type="button"
                onClick={() => setNewPostModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 block">Discussion Title</label>
              <input
                type="text"
                placeholder="e.g. How does DNS over HTTPS prevent ISP snooping?"
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 block">Topic Domain</label>
              <select
                value={postCategory}
                onChange={e => setPostCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
              >
                <option value="General Defense">General Defense</option>
                <option value="Lab Setup">Lab Setup & Virtualization</option>
                <option value="Web Security">Web Security & OWASP</option>
                <option value="Network Analysis">Network Analysis</option>
                <option value="Cryptography">Cryptography</option>
                <option value="Ethics & Legal">Ethics & Legal</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 block">Question / Content</label>
              <textarea
                rows={4}
                placeholder="Provide context, what you have tried, and specific questions..."
                value={postContent}
                onChange={e => setPostContent(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setNewPostModalOpen(false)}
                className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
              >
                Publish Question
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
