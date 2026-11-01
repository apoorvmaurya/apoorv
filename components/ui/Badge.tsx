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
        default: 'bg-white/[0.05] text-[#D4D4D8] border border-white/10',
        primary: 'bg-[#F0B35A]/15 text-[#F0B35A] border border-[#F0B35A]/30',
        accent: 'bg-[#F0B35A]/10 text-[#F0B35A] border border-[#F0B35A]/25',
        outline: 'border border-[#2E2E32] text-[#A1A1AA]',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
