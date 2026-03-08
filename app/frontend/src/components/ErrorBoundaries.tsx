import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-black/20 border border-white/[0.05] rounded-3xl backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                        <AlertTriangle className="text-red-500" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
                    <p className="text-neutral-500 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                        Standor encountered an unexpected error. This has been logged and we're looking into it.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
                    >
                        <RotateCcw size={16} />
                        Reload Page
                    </button>
                    {import.meta.env.DEV && (
                        <pre className="mt-8 p-4 bg-red-500/5 border border-red-500/10 rounded-lg text-left text-[10px] font-mono text-red-400 overflow-auto max-w-full">
                            {this.state.error?.toString()}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
