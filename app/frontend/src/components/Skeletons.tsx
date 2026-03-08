import React from 'react';

export function TableSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-white/5" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/3 bg-white/5 rounded" />
                        <div className="h-3 w-1/4 bg-white/5 rounded" />
                    </div>
                    <div className="w-20 h-8 bg-white/5 rounded-lg" />
                </div>
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="p-6 rounded-3xl border border-white/[0.05] bg-white/[0.02] animate-pulse">
            <div className="w-10 h-10 rounded-2xl bg-white/5 mb-4" />
            <div className="h-4 w-1/2 bg-white/5 rounded mb-2" />
            <div className="h-8 w-2/3 bg-white/5 rounded" />
        </div>
    );
}

export function EditorSkeleton() {
    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col p-4 animate-pulse">
            <div className="h-8 w-full bg-white/5 rounded mb-4" />
            <div className="flex-1 space-y-4">
                {[1, 2, 3, 4, 10, 5, 2].map((w, i) => (
                    <div key={i} className="h-4 bg-white/5 rounded" style={{ width: `${w * 8}%` }} />
                ))}
            </div>
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">Loading</span>
            </div>
        </div>
    );
}
