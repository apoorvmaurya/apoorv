'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { fadeInUp } from '@/lib/animations';

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    id?: string;
}

export default function AnimatedSection({
    children,
    className,
    delay = 0,
    id,
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref as React.RefObject<HTMLElement>, {
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <motion.div
            ref={ref}
            id={id}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}
