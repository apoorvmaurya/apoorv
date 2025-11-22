'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'accent' | 'outline';
}

export default function Badge({
    className,
    variant = 'default',
    children,
    ...props
}: BadgeProps) {
    const variants = {
        default: 'bg-white/10 text-gray-300',
        primary: 'bg-primary-500/20 text-primary-300 border border-primary-500/30',
        accent: 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30',
        outline: 'border border-white/20 text-gray-300',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
