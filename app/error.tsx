'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111111] px-4">
            <div className="max-w-md w-full bg-[#18181B] border border-[#2E2E32] rounded-2xl p-8 text-center shadow-xl">
                <div className="mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-[#F4F4F5] mb-2">
                        Something went wrong
                    </h2>
                    <p className="text-[#A1A1AA] text-sm">
                        {error.message || 'An unexpected error occurred. Please try again.'}
                    </p>
                </div>

                <button
                    onClick={reset}
                    className="w-full px-6 py-3 bg-[#F0B35A] text-[#111111] hover:bg-[#E5A448] font-semibold rounded-lg transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
