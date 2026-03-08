import { Link } from 'react-router-dom';
import { Github, Linkedin, Globe } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full bg-[#050505] pt-16 pb-8 border-t border-white/5 mt-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">

                    {/* Left */}
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-neutral-400 text-[10px] uppercase tracking-widest font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                            Operational
                        </div>
                        <p className="text-neutral-500 text-[10px] font-mono">
                            &copy; 2026 Standor. All Rights Reserved.
                        </p>
                    </div>

                    {/* Center */}
                    <div className="flex flex-col items-center gap-6">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold text-base tracking-tight">
                                ST
                            </div>
                            <span className="text-white font-bold text-2xl tracking-tight italic">
                                STANDOR
                            </span>
                        </Link>

                        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-8 py-3.5 rounded-full border border-white/10 bg-[#0A0A0A]">
                            <Link to="/dashboard" className="text-[10px] font-bold text-white hover:text-neutral-300 transition-colors uppercase tracking-widest">Dashboard</Link>
                            <Link to="/problems" className="text-[10px] font-bold text-white hover:text-neutral-300 transition-colors uppercase tracking-widest">Problems</Link>
                            <Link to="/create-session" className="text-[10px] font-bold text-white hover:text-neutral-300 transition-colors uppercase tracking-widest">New Interview</Link>
                            <Link to="/blog" className="text-[10px] font-bold text-white hover:text-neutral-300 transition-colors uppercase tracking-widest">Blog</Link>
                            <Link to="/contact" className="text-[10px] font-bold text-white hover:text-neutral-300 transition-colors uppercase tracking-widest">Contact</Link>
                            <Link to="/privacy" className="text-[10px] font-bold text-white hover:text-neutral-300 transition-colors uppercase tracking-widest">Privacy</Link>
                            <Link to="/terms" className="text-[10px] font-bold text-white hover:text-neutral-300 transition-colors uppercase tracking-widest">Terms</Link>
                        </nav>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-4 text-white">
                        <a href="https://github.com/standor" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-neutral-300 transition-colors text-[11px] font-medium">
                            <Github size={14} /> Github
                        </a>
                        <a href="https://linkedin.com/company/standor" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-neutral-300 transition-colors text-[11px] font-medium">
                            <Linkedin size={14} /> LinkedIn
                        </a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <p className="text-neutral-500 text-[10px] font-mono leading-relaxed max-w-3xl">
                        Standor is an AI-powered technical interview platform for engineering teams. Not affiliated with LeetCode® or similar entities. Built for hiring at scale.
                    </p>
                    <button className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors text-[10px] font-bold tracking-widest font-mono">
                        <Globe size={12} /> EN
                    </button>
                </div>

            </div>
        </footer>
    );
}
