import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Clock, Cpu, Activity, Users, FileCode, ShieldCheck,
  Brain, Zap, GitMerge, BarChart3, Terminal, Lock, Check,
} from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';

const FEATURES = [
  {
    icon: FileCode, color: '#137fec',
    title: 'Monaco Editor Native',
    desc: 'Candidates use the same editor as VS Code — full keybindings, IntelliSense, multi-cursor, minimap. Zero learning curve, maximum signal.',
    points: ['Syntax highlighting for 12+ languages', 'Auto-indent & bracket matching', 'Multi-cursor collaborative presence'],
  },
  {
    icon: GitMerge, color: '#af25f4',
    title: 'CRDT Real-Time Sync',
    desc: 'Built on Yjs conflict-free replicated data types. Every keystroke syncs in under 50ms — no conflicts, no merge issues, ever.',
    points: ['Sub-50ms propagation globally', 'Conflict-free by design (CRDT)', 'Offline-resilient with auto-reconnect'],
  },
  {
    icon: Brain, color: '#0EA5A4',
    title: 'Claude AI Code Analysis',
    desc: 'Click analyze and get instant time/space complexity, bug detection, correctness verification, and a 1–10 quality score — powered by Claude.',
    points: ['Big-O complexity detection', 'Bug & edge case reports', 'Improvement suggestions with examples'],
  },
  {
    icon: Cpu, color: '#FFBD2E',
    title: 'Sandboxed Code Execution',
    desc: 'Piston runtime spins up secure containers in under 300ms. Deterministic, isolated, with stdin/stdout support for any test case.',
    points: ['Python, TypeScript, Go, Java, Rust, C++…', 'Custom stdin test inputs', 'Execution time & memory reporting'],
  },
  {
    icon: Clock, color: '#137fec',
    title: 'Session Replay',
    desc: 'Review any interview like a video — code snapshots saved every 30 seconds, full AI report attached, sharable with your hiring committee.',
    points: ['30-second automatic snapshots', 'Exportable PDF session report', 'Chat transcript included'],
  },
  {
    icon: Activity, color: '#af25f4',
    title: 'Entropy & Integrity Analysis',
    desc: 'Track paste events, tab switches, and typing cadence anomalies. Standor gives every session an integrity confidence score.',
    points: ['Paste event detection', 'Tab-unfocus tracking', 'AI-suspicious pattern flags'],
  },
  {
    icon: Users, color: '#0EA5A4',
    title: 'Multiplayer Presence',
    desc: 'Both participants see each other\'s cursor positions, highlighted text, and real-time edits. Like pair programming but for hiring.',
    points: ['Coloured cursor badges per user', 'Shared language & theme state', 'Integrated video + audio via WebRTC'],
  },
  {
    icon: BarChart3, color: '#137fec',
    title: 'Team Analytics',
    desc: 'Track pass rates, average session length, AI scores, and problem completion across your entire hiring pipeline.',
    points: ['Dashboard with aggregated metrics', 'Per-problem & per-candidate history', 'CSV export for ATS integration'],
  },
  {
    icon: ShieldCheck, color: '#22c55e',
    title: 'Enterprise Security',
    desc: 'Argon2id password hashing, JWT refresh token rotation, Helmet security headers, rate limiting, and full GDPR-compliant data handling.',
    points: ['TLS 1.2+ everywhere', 'Argon2id + JWT rotation', 'GDPR-compliant data residency'],
  },
];

const COMPARISON = [
  { feature: 'Real-time collaborative editor', standor: true, coderpad: true, hackerrank: false },
  { feature: 'CRDT sync (no conflicts)', standor: true, coderpad: false, hackerrank: false },
  { feature: 'AI code analysis', standor: true, coderpad: false, hackerrank: false },
  { feature: 'Session replay + snapshots', standor: true, coderpad: false, hackerrank: true },
  { feature: 'Open source', standor: true, coderpad: false, hackerrank: false },
  { feature: '12+ sandboxed languages', standor: true, coderpad: true, hackerrank: true },
  { feature: 'Free tier', standor: true, coderpad: false, hackerrank: false },
  { feature: 'Self-hostable', standor: true, coderpad: false, hackerrank: false },
];

export default function Features() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-[#0B0B0D] overflow-hidden">

      {/* ═══ HERO ═══ */}
      <section className="w-full pt-32 pb-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#137fec]/10 blur-[130px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#137fec]/30 bg-[#137fec]/10 mb-6">
              <Zap size={11} className="text-[#137fec]" />
              <span className="text-[10px] font-mono text-[#137fec] uppercase tracking-widest">Platform features</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-white leading-[0.92] mb-6">
              Built for scale.<br />
              <span style={{ background: 'linear-gradient(135deg, #137fec, #af25f4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Designed for speed.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[#6B7178] max-w-2xl mx-auto leading-relaxed">
              Every component in Standor eliminates friction from the technical interview process —
              from the first keystroke to the final hiring decision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURE GRID ═══ */}
      <section className="w-full pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              >
                <SpotlightCard spotlightColor={`${f.color}18`} className="h-full p-7 bg-[#0B1220] border-[#1a1a1a] rounded-2xl">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                    <f.icon size={18} style={{ color: f.color }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-sm text-[#6B7178] leading-relaxed mb-5">{f.desc}</p>
                  <ul className="space-y-2">
                    {f.points.map(p => (
                      <li key={p} className="flex items-start gap-2 text-xs text-[#A6AAB0]">
                        <Check size={11} style={{ color: f.color }} className="mt-0.5 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="w-full py-24 border-t border-[#1a1a1a] bg-[#0F1722]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-[10px] font-mono text-[#137fec] uppercase tracking-widest mb-4">Comparison</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Why teams choose Standor.
            </h2>
            <p className="text-[#6B7178]">How we stack up against the alternatives.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="rounded-2xl border border-[#1a1a1a] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1a1a1a] bg-[#0B1220]">
                  <th className="text-left px-6 py-4 text-[#6B7178] font-medium">Feature</th>
                  <th className="px-6 py-4 text-white font-bold text-center">
                    <span className="text-[#137fec]">Standor</span>
                  </th>
                  <th className="px-6 py-4 text-[#6B7178] font-medium text-center">CoderPad</th>
                  <th className="px-6 py-4 text-[#6B7178] font-medium text-center">HackerRank</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-[#1a1a1a] ${i % 2 === 0 ? 'bg-[#0B1220]' : 'bg-[#0F1722]'}`}>
                    <td className="px-6 py-4 text-[#A6AAB0]">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.standor
                        ? <Check size={16} className="mx-auto text-green-400" />
                        : <span className="text-[#333] mx-auto block text-center">—</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.coderpad
                        ? <Check size={16} className="mx-auto text-[#6B7178]" />
                        : <span className="text-[#333] mx-auto block text-center">—</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.hackerrank
                        ? <Check size={16} className="mx-auto text-[#6B7178]" />
                        : <span className="text-[#333] mx-auto block text-center">—</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="w-full py-24 border-t border-[#1a1a1a] bg-[#0B0B0D] text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Ready to upgrade your hiring?
          </h2>
          <p className="text-[#6B7178] mb-10 max-w-lg mx-auto">
            Start for free — no credit card, no setup. Your first interview room in under 60 seconds.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all">
              Get started free <ArrowRight size={15} />
            </Link>
            <Link to="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#333] text-white font-semibold rounded-xl hover:border-[#555] transition-all">
              Watch demo
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
