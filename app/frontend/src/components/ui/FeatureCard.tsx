import { ReactNode } from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
}

export function FeatureCard({ title, description, icon, className = '' }: FeatureCardProps) {
    return (
        <div className={`p-8 h-full flex flex-col ${className}`}>
            {icon && (
                <div className="w-12 h-12 rounded-lg bg-surface-dark border border-border flex items-center justify-center mb-6">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-semibold tracking-tight text-foreground mb-3">{title}</h3>
            <p className="text-muted leading-relaxed text-sm">{description}</p>
        </div>
    );
}
