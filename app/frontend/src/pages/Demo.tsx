import { useEffect, useState, Suspense } from 'react';
import { ArrowLeft, Play, UserCircle2, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { MockSocketSimulator } from '../mock/mockSocketSimulator';

// Dummy Analysis
const initialAnalysis = "Awaiting execution... System is analyzing temporal entropy and syntax.";
const mockResponse = "Execution successful (2ms). Time complexity: O(N) where N is array length. Space complexity: O(N) due to Map. Optimal approach detected. Candidate displayed positive momentum, no erratic tab-switching.";

export default function Demo() {
    const [code, setCode] = useState('// Candidate is connecting...');
    const [simulator] = useState(() => new MockSocketSimulator());
    const [isRunning, setIsRunning] = useState(false);
    const [analysis, setAnalysis] = useState(initialAnalysis);

    useEffect(() => {
        simulator.onType((newCode) => {
            setCode(newCode);
        });

        // Auto-start the simulation after a short delay
        const timer = setTimeout(() => {
            setCode("// Candidate connected. Watch them type...\n\n");
            simulator.start();
        }, 2000);

        return () => {
            clearTimeout(timer);
            simulator.stop();
        };
    }, [simulator]);

    const handleRunCode = () => {
        setIsRunning(true);
        setAnalysis("Analyzing AST and executing tests deterministically in sandbox...");

        setTimeout(() => {
            setIsRunning(false);
            setAnalysis(mockResponse);
        }, 2500);
    };

    return (
        <div className="h-screen w-full bg-bg-900 border-t border-border flex flex-col overflow-hidden">

            {/* HEADER */}
            <header className="h-14 w-full bg-surface border-b border-border flex items-center justify-between px-4 z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-muted hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-sm font-mono text-white tracking-tight">standor-mock-session</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-surface bg-bg-900 flex items-center justify-center text-text-secondary"><UserCircle2 size={18} /></div>
                        <div className="w-8 h-8 rounded-full border-2 border-surface bg-accent flex items-center justify-center text-white"><UserCircle2 size={18} /></div>
                    </div>
                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-4 py-1.5 bg-white text-black text-sm font-semibold rounded hover:bg-neutral-200 transition-colors disabled:opacity-50"
                    >
                        {isRunning ? (
                            <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        ) : (
                            <Play size={16} fill="currentColor" />
                        )}
                        Run & Analyze
                    </button>
                </div>
            </header>

            {/* 3-PANEL VIEW */}
            <main className="flex-1 w-full flex flex-col md:flex-row min-h-0 bg-bg-900">

                {/* PANEL 1: PROMPT */}
                <section className="w-full md:w-1/4 h-1/3 md:h-full border-b md:border-b-0 md:border-r border-border flex flex-col bg-bg-900 overflow-y-auto ns-hide-scrollbar">
                    <div className="p-4 border-b border-white/5 sticky top-0 bg-bg-900/80 backdrop-blur-sm z-10">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-muted">Problem Focus</h2>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Two Sum</h3>
                        <div className="prose prose-invert prose-sm">
                            <p className="text-text-secondary">Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
                            <p className="text-text-secondary">You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
                        </div>

                        <div className="bg-surface p-4 rounded-lg mt-6 font-mono text-xs border border-white/5">
                            <p className="text-muted mb-2">Example 1:</p>
                            <div className="text-white mb-1"><span className="text-accent">Input:</span> nums = [2,7,11,15], target = 9</div>
                            <div className="text-white"><span className="text-accent">Output:</span> [0,1]</div>
                        </div>
                    </div>
                </section>

                {/* PANEL 2: MONACO EDITOR */}
                <section className="w-full md:flex-1 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-border bg-[#1e1e1e] flex flex-col relative min-h-0">
                    <Suspense fallback={<div className="flex-1 flex items-center justify-center text-muted font-mono text-sm animate-pulse">Initializing native environment...</div>}>
                        <Editor
                            height="100%"
                            language="typescript"
                            theme="vs-dark"
                            value={code}
                            options={{
                                readOnly: true, // It's a mock demo, candidate is typing
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                                scrollBeyondLastLine: false,
                                padding: { top: 24 }
                            }}
                        />
                    </Suspense>
                </section>

                {/* PANEL 3: AI ANALYSIS */}
                <section className="w-full md:w-[320px] h-1/3 md:h-full flex flex-col bg-bg-900 min-h-0">
                    <div className="p-4 border-b border-border sticky top-0 bg-bg-900/80 backdrop-blur-sm shadow-sm flex items-center gap-2">
                        <Brain className="text-accent" size={16} />
                        <h2 className="text-xs font-bold uppercase tracking-wider text-white">Standor AI Forensics</h2>
                    </div>
                    <div aria-live="polite" className="p-6 overflow-y-auto custom-scrollbar flex-1 text-sm font-mono leading-relaxed text-text-secondary">
                        {isRunning ? (
                            <div className="flex items-center gap-2 text-accent animate-pulse">
                                <div className="w-2 h-2 bg-accent rounded-full" />
                                Running temporal analysis...
                            </div>
                        ) : (
                            <p className={analysis === initialAnalysis ? "text-muted" : "text-emerald-400"}>
                                {analysis}
                            </p>
                        )}
                    </div>
                </section>

            </main>
        </div>
    );
}
