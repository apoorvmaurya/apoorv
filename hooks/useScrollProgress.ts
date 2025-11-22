'use client';

import { useEffect, useState } from 'react';
import { throttle } from '@/lib/utils';

/**
 * Custom hook to track scroll progress
 */
export function useScrollProgress(): number {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            const totalScroll = documentHeight - windowHeight;
            const currentProgress = (scrollTop / totalScroll) * 100;

            setProgress(Math.min(Math.max(currentProgress, 0), 100));
        };

        // Throttled scroll handler for performance
        const handleScroll = throttle(calculateProgress, 100);

        // Initial calculation
        calculateProgress();

        // Add scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return progress;
}
