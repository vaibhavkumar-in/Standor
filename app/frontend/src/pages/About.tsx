import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Users, FileCheck, ArrowRight, Brain, Code2, ShieldCheck, Zap, GitMerge, Clock } from 'lucide-react';
import FadeUp from '../components/FadeUp';
import SpotlightCard from '../components/SpotlightCard';

const PRINCIPLES = [
  {
    icon: Activity,
    title: 'Structure Over Gut Feeling',
    desc: 'Standor replaces ad-hoc interview feedback with structured rubrics, consistent scoring, and reproducible evaluation criteria.',
    accentHex: '#137fec',
    bg: 'bg-[#137fec]/10',
    border: 'border-[#137fec]/20',
    accent: 'text-[#137fec]',
  },
  {
    icon: Users,
    title: "Collaborate, Don't Interrogate",
    desc: 'Two engineers working together in a shared coding environment reveals more signal than one-way whiteboard problems.',
    accentHex: '#34D399',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    accent: 'text-emerald-400',
  },
  {
    icon: FileCheck,
    title: 'Evidence-Based Hiring',
    desc: 'Every session produces a timestamped record: code evolution, AI analysis, and interviewer notes — ready for team review.',
    accentHex: '#FBBF24',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    accent: 'text-amber-400',
  },
];

const TIMELINE = [
  { time: '0:00', event: 'Room opened', color: '#137fec' },
  { time: '0:45', event: 'Candidate joined via shared link', color: '#af25f4' },
  { time: '2:10', event: 'First approach — brute force O(n²)', color: '#137fec' },
  { time: '8:30', event: 'Snapshot #1 saved automatically', color: '#6B7178' },
  { time: '14:40', event: 'Optimized to O(n) with HashMap', color: '#22c55e' },
  { time: '18:00', event: 'AI Analysis triggered — Score: 9/10', color: '#FFBD2E' },
  { time: '22:10', event: 'Session ended — report generated', color: '#137fec' },
];

const STACK = [
  { icon: Code2, label: 'Monaco Editor', desc: 'VS Code-grade editing experience' },
  { icon: GitMerge, label: 'Yjs CRDTs', desc: 'Conflict-free real-time sync' },
  { icon: Brain, label: 'Claude AI', desc: 'Instant code analysis & scoring' },
  { icon: Zap, label: 'Piston Runtime', desc: '12+ sandboxed language runtimes' },
  { icon: ShieldCheck, label: 'Argon2id + JWT', desc: 'Enterprise-grade auth security' },
  { icon: Clock, label: 'Session Replay', desc: 'Full interview history & snapshots' },
];

export default function About() {
  return (
    <main className="bg-[#0B0B0D] relative overflow-hidden min-h-screen">

      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#137fec]/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-40 pb-32 relative z-10">

        {/* ── HERO ── */}
        <FadeUp>
          <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
            <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-white leading-[1.05] tracking-tighter">
              Technical Interviews,{' '}
              <span style={{ background: 'linear-gradient(135deg,#137fec,#af25f4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Reimagined.
              </span>
            </h1>
            <p className="text-lg text-[#6B7178] leading-relaxed">
              Standor transforms the fragmented technical interview process into a structured, evidence-based evaluation — enabling teams to assess engineering talent in real time, with AI-powered analysis and complete session replay.
            </p>
          </div>
        </FadeUp>

        {/* ── THE PROBLEM ── */}
        <div className="mb-32 max-w-4xl">
          <FadeUp>
            <p className="text-[10px] font-mono text-[#137fec] uppercase tracking-widest mb-4">The Problem</p>
            <h2 className="text-3xl font-bold text-white tracking-tight leading-snug mb-8">
              The Technical Interview Process Is Broken
            </h2>
            <div className="space-y-4 text-[#6B7178] leading-relaxed text-lg">
              <p>
                Hiring teams rely on rushed, inconsistent interviews that reveal almost nothing about how a candidate thinks.
                Notes are incomplete, feedback is subjective, and decisions are made on gut instinct.
              </p>
              <p>
                Traditional interview tools focus on the editor — but rarely capture the full picture: how the candidate approached
                the problem, where they got stuck, and how they communicated under pressure.
              </p>
              <p className="text-white font-semibold">Standor was built to fix that.</p>
            </div>
          </FadeUp>
        </div>

        {/* ── SESSION TIMELINE ── */}
        <div className="mb-32">
          <FadeUp>
            <p className="text-[10px] font-mono text-[#137fec] uppercase tracking-widest text-center mb-4">Deep Dive</p>
            <h2 className="text-3xl font-bold text-white tracking-tight text-center mb-12">
              A complete session record
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="p-8 rounded-2xl border border-[#1a1a1a] bg-[#0B1220]">
              <p className="text-xs font-mono text-[#6B7178] mb-6 uppercase tracking-widest">Interview session · Two Sum · TypeScript</p>
              <div className="relative space-y-4">
                <div className="absolute left-[68px] top-0 bottom-0 w-px bg-[#1a1a1a]" />
                {TIMELINE.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[10px] font-mono text-[#6B7178] w-12 shrink-0 text-right">{t.time}</span>
                    <div className="w-2.5 h-2.5 rounded-full border-2 shrink-0 z-10" style={{ borderColor: t.color, background: `${t.color}30` }} />
                    <span className="text-sm text-[#A6AAB0]">{t.event}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ── CORE PRINCIPLES ── */}
        <div className="mb-32">
          <FadeUp>
            <p className="text-[10px] font-mono text-[#137fec] uppercase tracking-widest text-center mb-4">Principles</p>
            <h2 className="text-3xl font-bold text-white tracking-tight text-center mb-12">Core Design Principles</h2>
          </FadeUp>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid md:grid-cols-3 gap-6"
          >
            {PRINCIPLES.map((p) => (
              <motion.div
                key={p.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              >
                <SpotlightCard
                  accentColor={p.accentHex}
                  className="p-8 rounded-2xl border border-[#1a1a1a] bg-[#0B1220] hover:border-[#2a2a2a] hover:-translate-y-1.5 transition-all duration-500 h-full"
                >
                  <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-6 border ${p.border}`}>
                    <p.icon className={p.accent} size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-[#6B7178] leading-relaxed text-sm">{p.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── TECHNOLOGY STACK ── */}
        <div className="mb-32">
          <FadeUp>
            <p className="text-[10px] font-mono text-[#137fec] uppercase tracking-widest text-center mb-4">Platform Design</p>
            <h2 className="text-3xl font-bold text-white tracking-tight text-center mb-4">Standor Platform Architecture</h2>
            <p className="text-center text-[#6B7178] mb-12 max-w-2xl mx-auto">
              Standor is built as modular interview infrastructure designed for scale — each component operates independently and can be self-hosted.
            </p>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {STACK.map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.06}>
                <div className="p-6 rounded-2xl border border-[#1a1a1a] bg-[#0B1220] hover:border-[#2a2a2a] transition-colors">
                  <item.icon size={20} className="text-[#137fec] mb-4" />
                  <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                  <p className="text-xs text-[#6B7178]">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── BRAND STATEMENT ── */}
        <FadeUp>
          <div className="text-center mb-24 max-w-5xl mx-auto px-6 py-16 border-y border-[#1a1a1a]">
            <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white tracking-tight italic">
              "Standor transforms technical interviews into structured engineering evaluations."
            </p>
          </div>
        </FadeUp>

        {/* ── BOTTOM CTA ── */}
        <FadeUp>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Ready to see it in action?</h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all">
                Start for free <ArrowRight size={15} />
              </Link>
              <Link to="/how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#333] text-white font-semibold rounded-xl hover:border-[#555] transition-all">
                How it works
              </Link>
            </div>
          </div>
        </FadeUp>

      </div>
    </main>
  );
}
