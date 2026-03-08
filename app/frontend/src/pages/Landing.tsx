import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Code2, ShieldCheck, Brain, Link2, FileCode2,
  BarChart3, Star, Check, GitMerge, Layers, Terminal,
  Play, Sparkles, ChevronRight,
} from 'lucide-react';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { HeroFallback } from '../components/3d/HeroFallback';

const HeroScene = lazy(() => import('../components/3d/HeroScene'));

// ── DATA ──────────────────────────────────────────────────────────────────────

const CODE_LINES = [
  { code: 'function twoSum(nums: number[], target: number) {', key: 0 },
  { code: '  const map = new Map<number, number>();', key: 1, hl: true },
  { code: '  for (let i = 0; i < nums.length; i++) {', key: 2 },
  { code: '    const comp = target - nums[i];', key: 3 },
  { code: '    if (map.has(comp)) {', key: 4 },
  { code: '      return [map.get(comp)!, i];', key: 5, hl: true },
  { code: '    }', key: 6 },
  { code: '    map.set(nums[i], i);', key: 7 },
  { code: '  }', key: 8 },
  { code: '}', key: 9 },
];

const STEPS = [
  { n: '01', icon: Link2, color: '#137fec', title: 'Create a room', desc: 'Choose a problem from the library, set the language, and get a shareable link in under 30 seconds.' },
  { n: '02', icon: FileCode2, color: '#af25f4', title: 'Code together', desc: 'Both participants type in the same Monaco editor live. Run code against test cases with built-in Piston execution.' },
  { n: '03', icon: Brain, color: '#ccff00', title: 'AI evaluation', desc: 'Click Analyze for instant Claude-powered feedback — complexity detection, bug reports, and quality scoring.' },
  { n: '04', icon: BarChart3, color: '#137fec', title: 'Review & decide', desc: 'End the session for a PDF report with AI scores, code replay, and chat transcript ready for your committee.' },
];

const BENTO_FEATURES = [
  {
    id: 'editor', wide: true, icon: Code2, color: '#137fec',
    title: 'Live VS Code Environment',
    desc: 'Monaco Editor with full syntax highlighting, IntelliSense, multi-cursor, and all familiar shortcuts. Candidates feel at home — not fighting the tool.',
    badge: 'Monaco Editor',
    demo: (
      <div className="font-mono text-xs leading-6 select-none mt-4 overflow-hidden">
        {CODE_LINES.slice(0, 6).map(l => (
          <div key={l.key} className={`px-2 rounded ${(l as any).hl ? 'bg-accent/10 text-accent' : 'text-[#A6AAB0]'}`}>{l.code}</div>
        ))}
      </div>
    ),
  },
  {
    id: 'ai', wide: false, icon: Brain, color: '#af25f4',
    title: 'Claude AI Analysis',
    desc: 'Instant complexity scoring, bug detection, and improvement suggestions powered by Claude.',
    badge: 'Powered by Claude',
    demo: (
      <div className="mt-4 space-y-2">
        {[['Time', 'O(n)', false], ['Space', 'O(n)', false], ['Score', '9/10', true]].map(([k, v, accent]) => (
          <div key={k as string} className="flex justify-between items-center px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            <span className="text-xs text-[#6B7178]">{k}</span>
            <span className={`text-xs font-bold ${accent ? 'text-accent' : 'text-accent-tertiary'}`}>{v}</span>
          </div>
        ))}
        <div className="text-[10px] text-accent-tertiary text-center pt-1">&#10003; Correct — passes all test cases</div>
      </div>
    ),
  },
  {
    id: 'langs', wide: false, icon: Terminal, color: '#ccff00',
    title: '12+ Languages',
    desc: 'Python, TypeScript, Go, Java, Rust, C++, Ruby, Swift, Kotlin, and more — all sandboxed via Piston.',
    badge: 'Piston Runtime',
    demo: (
      <div className="mt-4 flex flex-wrap gap-1.5">
        {['Python', 'TypeScript', 'Go', 'Java', 'Rust', 'C++', 'Ruby', 'Swift'].map(l => (
          <span key={l} className="text-[10px] px-2 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[#A6AAB0] font-mono">{l}</span>
        ))}
      </div>
    ),
  },
  {
    id: 'sync', wide: false, icon: GitMerge, color: '#137fec',
    title: 'CRDT Real-Time Sync',
    desc: 'Yjs conflict-free sync — every keystroke propagates under 50ms with zero merge conflicts, ever.',
    badge: 'Yjs CRDTs',
    demo: (
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
          <span className="text-xs text-[#A6AAB0]">AK — typing...</span>
          <span className="ml-auto text-[10px] font-mono text-accent">12ms</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse shrink-0" />
          <span className="text-xs text-[#A6AAB0]">RS — reviewing</span>
          <span className="ml-auto text-[10px] font-mono text-accent-secondary">18ms</span>
        </div>
        <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden mt-2">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-accent to-accent-secondary" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'replay', wide: false, icon: Layers, color: '#af25f4',
    title: 'Session Replay',
    desc: 'Review any interview like a video — code snapshots every 30s, full AI report attached post-session.',
    badge: 'Auto-snapshot',
    demo: (
      <div className="mt-4 space-y-1.5">
        {['0:00 — Room opened', '2:15 — First approach', '14:40 — Optimized to O(n)', '22:10 — AI analysis run'].map((e, i) => (
          <div key={i} className="flex items-center gap-2 text-[10px] text-[#6B7178]">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-secondary shrink-0" />
            {e}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'security', wide: true, icon: ShieldCheck, color: '#0EA5A4',
    title: 'Enterprise-Ready Security',
    desc: 'Argon2id password hashing, JWT refresh rotation, Helmet headers, rate limiting, CORS, and full GDPR-compliant data handling — security is not an afterthought.',
    badge: 'SOC 2 Ready',
    demo: (
      <div className="mt-4 grid grid-cols-3 gap-2">
        {['TLS 1.2+', 'Argon2id', 'GDPR', 'Rate Limit', 'CORS', 'Audit Log'].map(f => (
          <div key={f} className="flex items-center gap-1.5 text-[10px] text-[#A6AAB0]">
            <Check size={10} className="text-green-400 shrink-0" /> {f}
          </div>
        ))}
      </div>
    ),
  },
];

const PROBLEMS = [
  { title: 'Two Sum', difficulty: 'EASY', category: 'Array', tags: ['HashMap', 'Two Pointer'], time: '~20 min' },
  { title: 'LRU Cache', difficulty: 'MEDIUM', category: 'Design', tags: ['LinkedList', 'HashMap'], time: '~45 min' },
  { title: 'Word Break', difficulty: 'MEDIUM', category: 'DP', tags: ['Dynamic Programming', 'BFS'], time: '~40 min' },
];

const DIFF_CLS: Record<string, string> = {
  EASY: 'bg-green-500/10 border-green-500/20 text-green-400',
  MEDIUM: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  HARD: 'bg-red-500/10 border-red-500/20 text-red-400',
};

const COMPANIES = ['Google', 'Meta', 'Amazon', 'Stripe', 'Figma', 'Notion', 'Linear', 'Vercel', 'Shopify', 'Airbnb', 'Netflix', 'Uber', 'Spotify', 'Apple', 'Microsoft'];

const METRICS = [
  { value: 50, suffix: 'ms', label: 'Avg sync latency', prefix: '<' },
  { value: 12, suffix: '+', label: 'Languages supported', prefix: '' },
  { value: 100, suffix: '+', label: 'Curated problems', prefix: '' },
  { value: 99.9, suffix: '%', label: 'Platform uptime', prefix: '' },
];

const PRICING = [
  {
    name: 'Free', price: '$0', period: 'forever', highlight: false,
    features: ['5 interviews / month', '3 languages', 'Basic AI analysis', '30-day session history', 'Community support'],
    cta: 'Get started',
  },
  {
    name: 'Pro', price: '$29', period: 'per seat / month', highlight: true,
    features: ['Unlimited interviews', '12+ languages', 'Advanced AI scoring', 'Unlimited session history', 'Session replay export', 'Priority support', 'Team analytics'],
    cta: 'Start free trial',
  },
];

// ── ANIMATED COUNTER ──────────────────────────────────────────────────────────
function Counter({ to, suffix, prefix = '' }: { to: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 40;
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(t); }
      else setCount(Math.floor(start * 10) / 10);
    }, 30);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Landing() {
  const [visibleLines, setVisibleLines] = useState(0);
  const demoRef = useRef<HTMLDivElement>(null);
  const demoInView = useInView(demoRef, { once: true });

  useEffect(() => {
    if (!demoInView) return;
    let i = 0;
    const t = setInterval(() => {
      i++; setVisibleLines(i);
      if (i >= CODE_LINES.length) clearInterval(t);
    }, 110);
    return () => clearInterval(t);
  }, [demoInView]);

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-bg-900 overflow-hidden">

      {/* ═══════ 1. HERO ═══════ */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center mt-[-64px] pt-16">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<HeroFallback />}>
            <HeroScene />
          </Suspense>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-mono text-[#A6AAB0] uppercase tracking-wider">Open beta · Free for engineering teams</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6"
          >
            The interview platform<br />
            <span className="text-[#6B7178]">built for real engineers.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#6B7178] max-w-2xl mb-10 leading-relaxed"
          >
            Real-time collaborative Monaco editor, AI-powered code analysis, sandboxed execution in 12+ languages,
            and structured session reports — all in one link.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all text-sm shadow-2xl group">
              Start for free <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#333] text-white font-medium rounded-xl hover:border-[#555] transition-all text-sm">
              <Play size={14} /> See how it works
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] font-mono text-[#333] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#333] to-transparent" />
        </motion.div>
      </section>

      {/* ═══════ 2. MARQUEE — trusted by teams at ═══════ */}
      <section className="w-full py-12 border-t border-[#1a1a1a] bg-[#0F1722] overflow-hidden">
        <p className="text-center text-[10px] font-mono text-[#2a2a2a] uppercase tracking-widest mb-8">Trusted by engineers at</p>
        <div className="flex gap-12 animate-marquee whitespace-nowrap w-max">
          {[...COMPANIES, ...COMPANIES].map((c, i) => (
            <span key={i} className="text-sm font-bold text-[#2a2a2a] tracking-wide shrink-0">{c}</span>
          ))}
        </div>
      </section>

      {/* ═══════ 3. BENTO FEATURES ═══════ */}
      <section className="w-full py-24 sm:py-32 bg-bg-900">
        <div className="ns-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-4">Platform</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Zero friction.<br />Infinite signals.
            </h2>
            <p className="text-[#6B7178] text-lg leading-relaxed">
              Every feature built specifically for the technical interview workflow — not retrofitted from a generic editor.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BENTO_FEATURES.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={f.wide ? 'md:col-span-2' : ''}
              >
                <SpotlightCard spotlightColor={`${f.color}18`} className="h-full p-7 bg-[#0B1220] border-[#1a1a1a] rounded-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                      <f.icon size={18} style={{ color: f.color }} />
                    </div>
                    <span className="text-[9px] font-mono px-2.5 py-1 rounded-full border"
                      style={{ color: f.color, borderColor: `${f.color}30`, background: `${f.color}10` }}>
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-[#6B7178] leading-relaxed">{f.desc}</p>
                  {f.demo}
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 4. LIVE DEMO — animated editor ═══════ */}
      <section ref={demoRef} className="w-full py-24 border-t border-[#1a1a1a] bg-[#0F1722]">
        <div className="ns-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: copy */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-4">Live Collaboration</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                Both of you in the<br />same editor. Always.
              </h2>
              <p className="text-[#6B7178] mb-8 leading-relaxed">
                Yjs CRDT sync means every keystroke appears in under 50ms. No refreshes, no conflicts.
                The interviewer sees exactly what the candidate sees — in real time.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Multi-cursor presence — coloured badges per participant',
                  'Language selector syncs both users instantly',
                  'Code auto-saved as snapshots every 30 seconds',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#A6AAB0]">
                    <Check size={14} className="text-accent shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/create-session" className="inline-flex items-center gap-2 text-white font-semibold hover:text-accent transition-colors group">
                Try it now <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right: 3D-tilted fake IDE */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ perspective: '1200px' }}
            >
              <motion.div
                whileHover={{ rotateX: -3, rotateY: 5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="rounded-2xl border border-[#1a1a1a] bg-[#0B1220] shadow-[0_32px_80px_rgba(0,0,0,0.7)] overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* IDE chrome bar */}
                <div className="flex items-center gap-2 px-4 h-10 bg-[#111827] border-b border-[#1a1a1a]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  <span className="ml-3 text-xs font-mono text-[#6B7178]">twoSum.ts — Standor Interview</span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <div className="flex -space-x-1">
                      {['var(--accent)', 'var(--accent-secondary)'].map((c, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border border-[#0B1220] flex items-center justify-center text-[8px] font-bold text-white"
                          style={{ background: c }}>
                          {['AK', 'RS'][i]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Code area */}
                <div className="p-5 font-mono text-xs leading-7 min-h-[220px]">
                  {CODE_LINES.map((line, i) => (
                    <div key={line.key}
                      className={`flex items-center transition-all duration-300 rounded px-1 ${i < visibleLines ? 'opacity-100' : 'opacity-0'} ${(line as any).hl ? 'bg-accent/10' : ''}`}
                    >
                      <span className="text-[#2a2a2a] w-5 text-right mr-4 shrink-0 select-none">{i + 1}</span>
                      <span className={(line as any).hl ? 'text-accent' : 'text-[#A6AAB0]'}>{line.code}</span>
                      {i === visibleLines - 1 && (
                        <span className="inline-block w-0.5 h-4 bg-accent ml-0.5 animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom execution bar */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-[#1a1a1a] bg-[#0B1220]/60">
                  <span className="text-[10px] font-mono text-[#6B7178]">TypeScript &#x2022; Piston Runtime</span>
                  <button className="flex items-center gap-1.5 text-[10px] font-bold text-black bg-accent px-3 py-1 rounded-md hover:bg-accent-secondary transition-colors">
                    <Play size={9} fill="black" /> Run
                  </button>
                </div>
              </motion.div>

              {/* AI result card — floats below editor */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="mt-3 mx-4 p-4 rounded-xl border border-accent-secondary/30 bg-accent-secondary/10 flex items-center gap-4"
              >
                <Brain size={20} className="text-accent-secondary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white">AI Analysis complete</p>
                  <p className="text-[10px] text-[#6B7178] truncate">O(n) time &#x2022; O(n) space &#x2022; Score 9/10 &#x2022; No bugs found</p>
                </div>
                <span className="text-[10px] font-bold text-accent-tertiary shrink-0">&#10003; Correct</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ 5. HOW IT WORKS ═══════ */}
      <section className="w-full py-24 sm:py-32 border-t border-[#1a1a1a] bg-bg-900">
        <div className="ns-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-4">Workflow</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">From invite to report<br />in minutes.</h2>
            <p className="text-[#6B7178] text-lg">No setup. No installs. Share a link and start coding.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative p-7 rounded-2xl border border-[#1a1a1a] bg-[#0B1220] hover:border-[#2a2a2a] transition-colors group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[10px] font-mono text-[#2a2a2a]">{step.n}</span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}>
                    <step.icon size={16} style={{ color: step.color }} />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                <p className="text-sm text-[#6B7178] leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={14} className="absolute -right-3 top-1/2 -translate-y-1/2 text-[#2a2a2a] hidden lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 6. METRICS ═══════ */}
      <section className="w-full py-24 border-t border-[#1a1a1a] bg-[#0F1722]">
        <div className="ns-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl border border-[#1a1a1a] bg-[#0B1220]"
              >
                <div className="text-4xl sm:text-5xl font-bold tracking-tighter text-white mb-2">
                  <Counter to={m.value} suffix={m.suffix} prefix={m.prefix} />
                </div>
                <p className="text-xs text-[#6B7178] font-mono uppercase tracking-widest">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 7. PROBLEM LIBRARY PREVIEW ═══════ */}
      <section className="w-full py-24 sm:py-32 border-t border-[#1a1a1a] bg-bg-900">
        <div className="ns-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-4">Problem Library</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                100+ curated problems.<br />Ready to use instantly.
              </h2>
              <p className="text-[#6B7178] mb-8 leading-relaxed">
                Handpicked EASY, MEDIUM, and HARD problems across algorithms, data structures, system design, and dynamic programming. Starter code in every language, test cases included.
              </p>
              <div className="flex gap-3">
                <Link to="/problems" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all">
                  Browse library <ArrowRight size={14} />
                </Link>
                <Link to="/create-session" className="inline-flex items-center gap-2 px-6 py-3 border border-[#333] text-white font-medium rounded-xl hover:border-white/40 transition-all">
                  Start interview
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="space-y-3"
            >
              {PROBLEMS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-5 rounded-xl border border-[#1a1a1a] bg-[#0B1220] hover:border-[#2a2a2a] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${DIFF_CLS[p.difficulty]}`}>{p.difficulty}</span>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">{p.title}</p>
                      <p className="text-[10px] text-[#6B7178] font-mono mt-0.5">{p.tags.join(' · ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[#6B7178]">
                    <span className="text-[10px] font-mono hidden sm:block">{p.time}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
              <div className="text-center pt-2">
                <Link to="/problems" className="text-xs text-[#333] hover:text-[#6B7178] transition-colors">+ 97 more problems in the library →</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ 8. TESTIMONIALS ═══════ */}
      <section className="w-full py-24 sm:py-32 border-t border-[#1a1a1a] bg-[#0F1722]">
        <div className="ns-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-4">From the field</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Teams that switched<br />never went back.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'We ran 40 interviews last month without a single scheduling issue. The AI report alone saved each interviewer 20 minutes of write-up time.', author: 'Aarav Kumar', role: 'Engineering Lead, Razorpay', stars: 5 },
              { quote: "The CRDT sync is genuinely impressive — I've never seen two people type in the same editor without fighting conflicts. It just works.", author: 'Sophie Williams', role: 'Staff Engineer, Monzo', stars: 5 },
              { quote: "Replaced our CoderPad subscription. Standor's session replay feature finally lets our hiring committee review interviews asynchronously.", author: 'Marcus Chen', role: 'VP Engineering, Linear', stars: 5 },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard spotlightColor="#137fec18" className="h-full p-7 bg-[#0B1220] border-[#1a1a1a] rounded-2xl flex flex-col gap-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} size={12} fill="#137fec" className="text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-[#A6AAB0] leading-relaxed flex-1">"{t.quote}"</p>
                  <div>
                    <p className="text-sm font-bold text-white">{t.author}</p>
                    <p className="text-[10px] text-[#6B7178] font-mono mt-0.5">{t.role}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 9. PRICING ═══════ */}
      <section className="w-full py-24 sm:py-32 border-t border-[#1a1a1a] bg-bg-900">
        <div className="ns-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Simple, transparent<br />pricing.</h2>
            <p className="text-[#6B7178] text-lg">Start free. Upgrade when your team grows.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border p-8 flex flex-col gap-6 ${plan.highlight ? 'border-accent bg-accent/5' : 'border-[#1a1a1a] bg-[#0B1220]'}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Most popular</div>
                )}
                <div>
                  <p className="text-[10px] font-mono text-[#6B7178] uppercase tracking-widest mb-2">{plan.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-xs text-[#6B7178]">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2.5 text-sm text-[#A6AAB0]">
                      <Check size={12} className="text-accent shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all block ${plan.highlight ? 'bg-white text-black hover:bg-neutral-200' : 'border border-[#333] text-white hover:border-[#555]'}`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 10. FINAL CTA ═══════ */}
      <section className="w-full py-28 border-t border-[#1a1a1a] relative overflow-hidden bg-[#0F1722]">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-accent-secondary/15 blur-[80px] rounded-full" />
        </div>

        <div className="ns-container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-accent/30 bg-accent/10">
              <Sparkles size={13} className="text-accent" />
              <span className="text-[11px] font-mono text-accent uppercase tracking-wider">Free forever — no credit card required</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
              Ready to run<br />better interviews?
            </h2>
            <p className="text-[#6B7178] text-lg mb-12 max-w-lg mx-auto leading-relaxed">
              Create your first interview room in 30 seconds. No setup, no installs, no credit card.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-100 transition-all shadow-2xl group animate-glow-ping"
              >
                Get Started Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 px-10 py-4 border border-[#333] text-white font-medium rounded-xl hover:border-[#555] transition-all"
              >
                See how it works
              </Link>
            </div>

            {/* Bottom trust line */}
            <div className="flex items-center justify-center gap-8 mt-14 flex-wrap">
              {['No credit card', 'Unlimited rooms', 'Open source'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#6B7178]">
                  <Check size={11} className="text-accent" /> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
