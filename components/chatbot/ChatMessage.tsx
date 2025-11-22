'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ChatMessage as ChatMessageType } from '@/types';
import { staggerItem } from '@/lib/animations';

interface ChatMessageProps {
    message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <motion.div
            className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            variants={staggerItem}
        >
            {/* Avatar */}
            <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isUser
                        ? 'bg-gradient-to-r from-accent-cyan to-accent-purple'
                        : 'bg-gradient-to-r from-primary-600 to-accent-purple'
                    }`}
            >
                {isUser ? (
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                )}
            </div>

            {/* Message bubble */}
            <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${isUser
                        ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-tr-none'
                        : 'glass text-gray-100 rounded-tl-none'
                    }`}
            >
                <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                        components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-cyan hover:underline"
                                >
                                    {children}
                                </a>
                            ),
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            code: ({ children }) => (
                                <code className="bg-black/30 px-1 py-0.5 rounded text-accent-cyan text-xs">
                                    {children}
                                </code>
                            ),
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>

                {/* Timestamp */}
                <p className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>
        </motion.div>
    );
}
