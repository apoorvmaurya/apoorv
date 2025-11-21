"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineDetector() {
    const [isOnline, setIsOnline] = useState(true);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        // Set initial state
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            setShowNotification(true);

            // Auto-hide success notification after 3 seconds
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowNotification(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <AnimatePresence>
            {showNotification && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
                >
                    <div
                        className={`
              flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-md border
              ${isOnline
                                ? 'bg-green-500/90 border-green-600 text-white'
                                : 'bg-destructive/90 border-destructive text-destructive-foreground'
                            }
            `}
                    >
                        <div className="flex-shrink-0">
                            {isOnline ? (
                                <Wifi className="w-5 h-5" />
                            ) : (
                                <WifiOff className="w-5 h-5" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">
                                {isOnline ? 'Back Online' : 'No Internet Connection'}
                            </p>
                            <p className="text-xs opacity-90 mt-0.5">
                                {isOnline
                                    ? 'Your connection has been restored'
                                    : 'Please check your internet connection'}
                            </p>
                        </div>

                        {!isOnline && (
                            <button
                                onClick={() => setShowNotification(false)}
                                className="flex-shrink-0 hover:opacity-70 transition-opacity"
                                aria-label="Dismiss notification"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
