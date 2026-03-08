import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Loader2, Code2, Filter } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'sonner';

interface Problem {
  id: string;
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  category: string;
  tags: string[];
  description: string;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  EASY: 'text-green-400 bg-green-400/10 border-green-400/20',
  MEDIUM: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  HARD: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function Problems() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<string>('ALL');

  useEffect(() => {
    api.get('/problems')
      .then(res => setProblems(res.data))
      .catch(() => toast.error('Failed to load problems'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = problems.filter(p => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchDiff = diffFilter === 'ALL' || p.difficulty === diffFilter;
    return matchSearch && matchDiff;
  });

  const handleStartInterview = (problem: Problem) => {
    navigate(`/create-session?problem=${encodeURIComponent(problem.title)}&difficulty=${problem.difficulty}`);
  };

  return (
    <div className="min-h-screen pt-20 sm:pt-24 px-4 sm:px-6 pb-10 bg-[#0B0B0D]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Problem Library</h1>
            <p className="text-sm text-neutral-500">Browse and start interview sessions from curated problems</p>
          </div>
          <button
            onClick={() => navigate('/create-session')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg font-semibold text-sm hover:bg-neutral-200 transition-colors shrink-0"
          >
            <Plus size={16} /> Custom Problem
            <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded-full bg-black/20 border border-black/10 opacity-60">SOON</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, category, or tag..."
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-white/[0.15] transition-colors shadow-inner"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-neutral-600 shrink-0" />
            {['ALL', 'EASY', 'MEDIUM', 'HARD'].map(d => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 border ${diffFilter === d
                    ? d === 'ALL' ? 'bg-white text-black border-white' : DIFFICULTY_COLORS[d]
                    : 'border-white/[0.06] text-neutral-600 hover:text-neutral-300 hover:border-white/[0.12] bg-white/[0.01]'
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Problems list */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-20 w-full bg-white/[0.02] border border-white/[0.04] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] text-neutral-600">
            <Code2 size={40} className="mb-4 text-neutral-700 opacity-50" />
            <h3 className="text-white font-medium mb-1">No results found</h3>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((problem, i) => (
              <div
                key={problem.id}
                className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.12] hover:bg-white/[0.025] hover:translate-x-1 transition-all duration-300"
              >
                <span className="text-[11px] font-mono text-neutral-700 w-6 shrink-0 group-hover:text-neutral-500 transition-colors">{(i + 1).toString().padStart(2, '0')}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white group-hover:text-ns-accent transition-colors">{problem.title}</h3>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono font-bold uppercase tracking-wider ${DIFFICULTY_COLORS[problem.difficulty]}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                    <span className="font-mono text-neutral-400">{problem.category}</span>
                    <span className="text-neutral-800">•</span>
                    <div className="flex gap-1.5">
                      {problem.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.05] text-[10px] text-neutral-600 font-mono italic">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleStartInterview(problem)}
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-neutral-400 hover:text-black hover:bg-white hover:border-white transition-all duration-300 text-xs font-bold opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <Plus size={14} /> Start
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-[10px] text-neutral-700 mt-12 font-mono uppercase tracking-[0.2em]">
          {filtered.length} curated challenge{filtered.length !== 1 ? 's' : ''} available
        </p>
      </div>
    </div>
  );
}
