import { ArrowDown, Users, Code2, Brain, ClipboardCheck, ArrowRight } from 'lucide-react';
import FadeUp from '../components/FadeUp';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    num: 1, icon: Users,
    title: 'Create', subtitle: 'Start a Room',
    desc: 'Host creates a private interview room in seconds. Share a single link — no installs, no accounts needed for the candidate.',
  },
  {
    num: 2, icon: Code2,
    title: 'Code Together', subtitle: 'Real-Time Collaboration',
    desc: 'Both participants type in the same Monaco editor simultaneously. Conflict-free CRDT sync keeps every keystroke in perfect order.',
  },
  {
    num: 3, icon: Brain,
    title: 'Analyze', subtitle: 'AI Evaluation',
    desc: 'One click triggers deep AI analysis — time/space complexity, correctness, bug detection, and improvement suggestions powered by Claude.',
  },
  {
    num: 4, icon: ClipboardCheck,
    title: 'Review', subtitle: 'Structured Report',
    desc: 'After the session ends, access a full replay with code snapshots, chat log, and AI-generated score sheet ready for your hiring committee.',
  },
];

const PANELS = [
  // Panel 0: Create room mockup
  <div key="create" className="p-6 flex flex-col gap-4 h-full justify-center">
    <div className="text-xs font-mono text-[#137fec] uppercase tracking-widest mb-2 opacity-60">New Interview Room</div>
    <div className="space-y-3">
      {['Session Name', 'Problem', 'Language'].map((label, i) => (
        <div key={label} className="flex flex-col gap-1">
          <span className="text-[10px] text-[#6B7178] uppercase tracking-wider">{label}</span>
          <div className={`h-8 rounded-md bg-white/[0.04] border border-white/10 px-3 flex items-center text-xs text-[#A6AAB0] ${i === 0 ? '' : 'opacity-60'}`}>
            {i === 0 ? 'Senior Frontend Engineer – Round 2' : i === 1 ? 'Two Sum' : 'TypeScript'}
          </div>
        </div>
      ))}
    </div>
    <motion.div
      className="mt-2 h-9 rounded-lg bg-[#137fec] flex items-center justify-center text-xs font-bold text-white"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Create Room → Copy Link
    </motion.div>
  </div>,

  // Panel 1: Dual-cursor editor
  <div key="editor" className="p-4 flex flex-col gap-2 h-full font-mono text-xs">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-[#6B7178] text-[10px]">2 users connected</span>
      <div className="ml-auto flex gap-1.5">
        {[{ color: '#137fec', label: 'AK' }, { color: '#af25f4', label: 'RS' }].map(u => (
          <div key={u.label} className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: u.color }}>{u.label}</div>
        ))}
      </div>
    </div>
    <div className="flex-1 space-y-0.5 overflow-hidden">
      {[
        { code: 'function twoSum(nums, target) {', user: null },
        { code: '  const map = new Map();', user: '#137fec' },
        { code: '  for (let i = 0; i < nums.length; i++) {', user: null },
        { code: '    const comp = target - nums[i];', user: null },
        { code: '    if (map.has(comp)) {', user: null },
        { code: '      return [map.get(comp), i];', user: '#af25f4' },
        { code: '    }', user: null },
        { code: '    map.set(nums[i], i);', user: null },
        { code: '  }', user: null },
        { code: '}', user: null },
      ].map((line, i) => (
        <div key={i} className={`flex items-center gap-2 px-1 rounded ${line.user ? 'bg-white/[0.06]' : ''}`}>
          <span className="text-[#2a2a2a] w-4 text-right shrink-0">{i + 1}</span>
          <span className="text-[#A6AAB0]">{line.code}</span>
          {line.user && (
            <motion.div className="w-0.5 h-3 rounded-full ml-auto shrink-0" style={{ background: line.user }}
              animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          )}
        </div>
      ))}
    </div>
  </div>,

  // Panel 2: AI analysis
  <div key="analysis" className="p-5 flex flex-col gap-3 h-full justify-center">
    <div className="text-xs font-mono text-[#137fec] uppercase tracking-widest mb-1 opacity-60">AI Code Analysis</div>
    <div className="grid grid-cols-3 gap-2">
      {[{ label: 'Time', value: 'O(n)' }, { label: 'Space', value: 'O(n)' }, { label: 'Score', value: '9/10' }].map(m => (
        <div key={m.label} className="rounded-lg bg-white/[0.04] border border-white/10 p-2 text-center">
          <div className="text-[10px] text-[#6B7178] mb-1">{m.label}</div>
          <div className="text-sm font-bold text-white">{m.value}</div>
        </div>
      ))}
    </div>
    <div className="rounded-lg bg-white/[0.04] border border-white/10 p-3 space-y-1.5">
      <div className="text-[10px] text-[#6B7178] uppercase tracking-wider">Suggestions</div>
      {['HashMap approach is optimal for O(n) time', 'Add edge case check for empty input', 'Consider returning early on first valid pair'].map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }}
          className="text-xs text-[#A6AAB0] flex gap-1.5">
          <span className="text-[#137fec] shrink-0">→</span> {s}
        </motion.div>
      ))}
    </div>
    <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-2 text-xs text-green-400 text-center font-medium">
      ✓ Correct solution — passes all test cases
    </div>
  </div>,

  // Panel 3: Session report
  <div key="report" className="p-5 flex flex-col gap-3 h-full justify-center">
    <div className="text-xs font-mono text-[#137fec] uppercase tracking-widest mb-1 opacity-60">Session Report</div>
    {[
      { label: 'Duration', value: '47 min' },
      { label: 'Code Snapshots', value: '14 saved' },
      { label: 'AI Score', value: '9.1 / 10' },
      { label: 'Chat Messages', value: '23 exchanged' },
      { label: 'Language', value: 'TypeScript' },
    ].map((r, i) => (
      <motion.div key={r.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
        className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        <span className="text-xs text-[#6B7178]">{r.label}</span>
        <span className="text-xs font-semibold text-white">{r.value}</span>
      </motion.div>
    ))}
    <motion.div
      className="mt-1 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-xs text-[#6B7178]"
      animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}
    >
      Download PDF Report
    </motion.div>
  </div>,
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % STEPS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pt-40 pb-24 px-6 bg-[#0B0B0D] min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <FadeUp>
          <div className="max-w-3xl mb-8">
            <p className="text-[10px] font-mono text-[#137fec] uppercase tracking-widest mb-4">Workflow</p>
            <h1 className="text-[clamp(1.75rem,5vw,2.75rem)] font-bold text-white leading-[1.1] tracking-tight mb-4">
              From Room to Report,{' '}
              <span className="text-[#6B7178]">in One Session.</span>
            </h1>
            <p className="text-lg text-[#6B7178] leading-relaxed max-w-xl">
              Standor gives interviewers and candidates a frictionless real-time environment — collaborative code,
              live AI feedback, and structured post-session reports ready for your hiring committee.
            </p>
          </div>
        </FadeUp>

        {/* Main visual section */}
        <FadeUp delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: steps */}
            <div>
              <div className="space-y-0">
                {STEPS.map((s, idx) => {
                  const Icon = s.icon;
                  const isActive = activeStep === idx;
                  return (
                    <div key={s.num} className="relative">
                      <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.08 }}
                        viewport={{ once: true, margin: '-60px' }}
                        onMouseEnter={() => setActiveStep(idx)}
                        className="flex gap-8 group py-4 cursor-pointer"
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 border ${isActive ? 'bg-white border-white text-black' : 'bg-white/[0.03] border-white/10 text-[#6B7178] group-hover:bg-white group-hover:text-black group-hover:border-white'}`}>
                          <Icon size={18} />
                        </div>
                        <div className="pt-1">
                          <h4 className={`text-[10px] font-mono uppercase tracking-widest mb-1 transition-opacity ${isActive ? 'text-[#137fec] opacity-100' : 'text-[#137fec] opacity-50 group-hover:opacity-100'}`}>
                            {s.subtitle}
                          </h4>
                          <h3 className={`text-xl font-bold mb-1.5 tracking-tight transition-colors ${isActive ? 'text-[#137fec]' : 'text-white group-hover:text-[#137fec]'}`}>
                            {s.title}
                          </h3>
                          <p className="text-sm text-[#6B7178] leading-relaxed max-w-md">{s.desc}</p>
                        </div>
                      </motion.div>

                      {idx < STEPS.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-px flex flex-col items-center">
                          <div className="h-full w-px bg-gradient-to-b from-white/20 to-transparent" />
                          <ArrowDown size={14} className="text-[#2a2a2a] absolute -bottom-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: animated panel */}
            <div className="lg:sticky lg:top-24 aspect-square rounded-[2rem] border border-[#1a1a1a] bg-[#0B1220] relative overflow-hidden shadow-2xl">
              {/* Step dots */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStep ? 'bg-[#137fec] w-4' : 'bg-white/20 w-1.5'}`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {PANELS[activeStep]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeUp>

        {/* Bottom CTA */}
        <FadeUp delay={0.2}>
          <div className="text-center mt-24">
            <h2 className="text-2xl font-bold text-white mb-6">See it live in 60 seconds.</h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all">
                Start for free <ArrowRight size={15} />
              </Link>
              <Link to="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#333] text-white font-semibold rounded-xl hover:border-[#555] transition-all">
                Watch demo
              </Link>
            </div>
          </div>
        </FadeUp>

      </div>
    </div>
  );
}
