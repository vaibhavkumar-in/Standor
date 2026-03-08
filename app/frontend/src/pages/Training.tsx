import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Users, Brain, Target, Clock, ChevronRight, CheckCircle2, BookOpen, Zap, Trophy, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../components/PageShell';

interface Guide {
  id: string;
  title: string;
  audience: 'Interviewer' | 'Candidate' | 'Both';
  category: string;
  readMin: number;
  description: string;
  tips: string[];
  keyPoints: string[];
}

const GUIDES: Guide[] = [
  {
    id: 'structured-interview',
    title: 'Running a Structured Technical Interview',
    audience: 'Interviewer',
    category: 'Interview Design',
    readMin: 8,
    description: 'How to design a fair, consistent, and signal-rich coding interview that minimises bias and maximises predictive validity for job performance.',
    tips: ['Set a clear problem brief before the session', 'Share the problem link via Standor room settings', 'Let the candidate read silently for 2 minutes before starting'],
    keyPoints: [
      'Use the same problem across all candidates at the same level',
      'Define evaluation criteria (correctness, complexity, communication, testing) before the interview',
      'Avoid interrupting the candidate during initial exploration',
      'Ask "what trade-offs did you consider?" rather than "is that optimal?"',
      'Reserve 10 minutes at the end for candidate questions',
    ],
  },
  {
    id: 'ai-debrief',
    title: 'Using AI Analysis in Your Debrief',
    audience: 'Interviewer',
    category: 'AI Features',
    readMin: 5,
    description: 'How to effectively use Standor\'s AI-generated code analysis as an input to your hiring decision without over-relying on the score.',
    tips: ['Run AI analysis during or after the session', 'Cross-reference AI complexity findings with your own observations', 'Share the AI report with your debrief panel before the sync'],
    keyPoints: [
      'AI score is a signal, not a verdict — use it alongside your holistic assessment',
      'Bug detection is highly reliable; style scores are subjective',
      'Complexity analysis (O-notation) is verified against test cases',
      'AI suggestions show what the optimal solution looks like — useful for calibrating difficulty',
      'Export the full report to your ATS or Notion debrief doc',
    ],
  },
  {
    id: 'candidate-prep',
    title: 'Preparing for a Standor Interview',
    audience: 'Candidate',
    category: 'Candidate Guide',
    readMin: 6,
    description: 'What to expect in a Standor-powered technical interview and how to perform at your best in a real-time collaborative coding environment.',
    tips: ['Test your browser and audio/video before the session', 'Choose your strongest language at the start', 'Narrate your thinking out loud — interviewers value process'],
    keyPoints: [
      'The editor is Monaco (VS Code) — your usual shortcuts work',
      'Code is synced live — there is no "submit" button, the interviewer sees every keystroke',
      'Use comments to mark sections you plan to revisit',
      'Ask clarifying questions before writing any code',
      'Don\'t optimise prematurely — get a working solution first',
    ],
  },
  {
    id: 'problem-selection',
    title: 'Choosing the Right Problem',
    audience: 'Interviewer',
    category: 'Interview Design',
    readMin: 7,
    description: 'A framework for selecting problems from the Standor library that match your role level, stack, and the competencies you want to assess.',
    tips: ['Browse by difficulty and category in the Problems library', 'Preview starter code and test cases before selecting', 'For senior roles, prefer MEDIUM/HARD with open-ended extensions'],
    keyPoints: [
      'EASY problems work well for screening rounds (< 30 min)',
      'MEDIUM problems are best for core engineering interviews',
      'HARD problems with partial credit suit principal/staff assessments',
      'Data structure problems (HashMap, Tree) test algorithmic thinking well',
      'System-design extensions can be added verbally after the coding section',
    ],
  },
  {
    id: 'collaboration-features',
    title: 'Mastering Real-Time Collaboration',
    audience: 'Both',
    category: 'Platform Guide',
    readMin: 4,
    description: 'How to get the most out of Standor\'s CRDT-powered collaborative editor — from multi-cursor awareness to instant code snapshot sharing.',
    tips: ['Both participants\' cursors appear as coloured highlights in the editor', 'Use the chat panel for quick notes without interrupting flow', 'Snapshots auto-save every 30 seconds — no data is lost if connection drops'],
    keyPoints: [
      'Yjs CRDT sync means there are no merge conflicts — simultaneous edits are handled automatically',
      'Connection status indicator shows if Yjs WebSocket is live',
      'Language selector is synchronised — changing it updates both participants instantly',
      'The interviewer can run the code at any point via the Execute button',
      'Share the room link from the top bar — works for observers too',
    ],
  },
  {
    id: 'feedback-writing',
    title: 'Writing High-Quality Interview Feedback',
    audience: 'Interviewer',
    category: 'Hiring Process',
    readMin: 6,
    description: 'How to translate a Standor session into structured, actionable, and legally defensible hiring feedback that your committee can act on confidently.',
    tips: ['Write your feedback within 30 minutes of the session', 'Reference specific code moments from the session replay', 'Use the AI report\'s complexity and bug findings as concrete evidence'],
    keyPoints: [
      'Describe behaviours, not character traits ("asked clarifying questions" not "sharp")',
      'Quote the specific line or approach that demonstrated the signal',
      'Score each rubric dimension separately (correctness, complexity, communication, testing)',
      'Note what the candidate attempted vs. completed — both matter',
      'A "no-hire" needs as much evidence as a "hire" — be specific in both directions',
    ],
  },
];

const DIFF_COLOURS: Record<string, string> = {
  Interviewer: 'bg-ns-accent/10 border-ns-accent/20 text-ns-accent',
  Candidate: 'bg-green-500/10 border-green-500/20 text-green-400',
  Both: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
};

export default function Training() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Guide | null>(null);
  const [filter, setFilter] = useState<'All' | 'Interviewer' | 'Candidate' | 'Both'>('All');

  const filtered = GUIDES.filter(g => filter === 'All' || g.audience === filter || g.audience === 'Both');

  return (
    <PageShell
      title="Interview Guides — Standor"
      description="Best practices for interviewers and candidates using the Standor real-time coding interview platform."
    >
      <div className="pt-32 pb-24 px-6">
        <div className="ns-container">

          {/* Header */}
          <div className="max-w-4xl mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-mono text-ns-accent uppercase tracking-[0.4em] px-4 py-1.5 rounded-full bg-ns-accent/10 border border-ns-accent/20">
                Interview Guides
              </span>
            </div>
            <h1 className="text-[clamp(2rem,6vw,4rem)] font-bold text-white leading-[0.95] tracking-tighter mb-6">
              Run better interviews.<br />
              <span className="text-ns-grey-600">Get better hires.</span>
            </h1>
            <p className="text-xl text-ns-grey-400 leading-relaxed font-medium max-w-2xl">
              Practical guides for interviewers and candidates on how to get the most out of Standor — from problem selection and AI analysis to debrief best practices.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: BookOpen, label: 'Guides', value: GUIDES.length.toString() },
              { icon: Clock, label: 'Avg read time', value: '6 min' },
              { icon: Users, label: 'For', value: 'All roles' },
              { icon: Trophy, label: 'Outcome', value: 'Better hires' },
            ].map((s, i) => (
              <div key={i} className="ns-glass-dark rounded-2xl border border-white/[0.05] p-6 flex items-center gap-4">
                <s.icon size={18} className="text-ns-accent shrink-0" />
                <div>
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-[10px] font-mono text-ns-grey-600 uppercase tracking-widest">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {(['All', 'Interviewer', 'Candidate', 'Both'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  filter === tab
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.03] border-white/10 text-ns-grey-500 hover:text-white hover:border-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Guide cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {filtered.map((guide, i) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => setSelected(guide)}
                className="ns-glass rounded-[2rem] border border-white/[0.04] p-8 hover:border-white/10 transition-all group cursor-pointer flex flex-col gap-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`text-[9px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${DIFF_COLOURS[guide.audience]}`}>
                    {guide.audience}
                  </span>
                  <div className="flex items-center gap-1 text-ns-grey-600">
                    <Clock size={11} />
                    <span className="text-[10px] font-mono">{guide.readMin} min</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-ns-grey-600 uppercase tracking-widest mb-2">{guide.category}</p>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-ns-accent transition-colors">{guide.title}</h3>
                  <p className="text-sm text-ns-grey-600 leading-relaxed line-clamp-2">{guide.description}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-ns-grey-600 uppercase tracking-wider group-hover:text-ns-accent transition-colors">
                  Read guide <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="ns-glass-dark rounded-[3.5rem] border border-white/[0.05] p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-ns-accent/5 blur-[120px] -z-10" />
            <Zap size={32} className="text-ns-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter">Ready to run your first session?</h2>
            <p className="text-lg text-ns-grey-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Apply what you've learned. Create an interview room in under 30 seconds.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => navigate('/create-session')}
                className="group px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-ns-grey-100 transition-all flex items-center gap-2 shadow-2xl"
              >
                New Interview Room
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/problems')}
                className="px-10 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
              >
                Browse Problems
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Guide detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-ns-bg-900 border-l border-white/[0.06] z-50 overflow-y-auto"
            >
              <div className="p-10">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <span className={`text-[9px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest mb-3 inline-block ${DIFF_COLOURS[selected.audience]}`}>
                      {selected.audience}
                    </span>
                    <h2 className="text-2xl font-bold text-white leading-tight">{selected.title}</h2>
                    <p className="text-xs text-ns-grey-600 mt-2">{selected.category} · {selected.readMin} min read</p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-ns-grey-500 hover:text-white shrink-0 mt-6"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-base text-ns-grey-400 leading-relaxed mb-10">{selected.description}</p>

                {/* Quick tips */}
                <div className="mb-8">
                  <p className="text-[10px] font-mono text-ns-accent uppercase tracking-widest mb-4">Quick Tips</p>
                  <div className="space-y-3">
                    {selected.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-ns-grey-300">
                        <Zap size={14} className="text-ns-accent shrink-0 mt-0.5" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key points */}
                <div className="mb-10">
                  <p className="text-[10px] font-mono text-ns-accent uppercase tracking-widest mb-4">Key Points</p>
                  <div className="space-y-3">
                    {selected.keyPoints.map((kp, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-ns-grey-400 leading-relaxed">
                        <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                        {kp}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => { setSelected(null); navigate('/create-session'); }}
                  className="w-full py-4 bg-white text-black rounded-full font-bold hover:bg-ns-grey-100 transition-all flex items-center justify-center gap-2"
                >
                  Start an Interview
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
