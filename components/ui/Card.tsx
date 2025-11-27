'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

interface CardProps extends HTMLMotionProps<'div'> {
    variant?: 'default' | 'strong' | 'bordered';
    hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', hover = true, children, ...props }, ref) => {
        const variants = {
            default: 'glass',
            strong: 'glass-strong',
            bordered: 'glass border-2 border-primary-500/30',
        };

        return (
            <motion.div
                ref={ref}
                className={cn('rounded-2xl p-4 sm:p-6 shadow-glass overflow-hidden', variants[variant], className)}
                variants={hover ? cardHover : undefined}
                initial={hover ? 'rest' : undefined}
                whileHover={hover ? 'hover' : undefined}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = 'Card';

export default Card;
