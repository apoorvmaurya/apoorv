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
            className={`flex items-start space-x-2.5 sm:space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            variants={staggerItem}
        >
            {/* Avatar */}
            <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    isUser
                        ? 'bg-[#27272A] border border-[#3F3F46] text-[#A1A1AA]'
                        : 'bg-[#F0B35A]/15 border border-[#F0B35A]/30 text-[#F0B35A]'
                }`}
            >
                {isUser ? (
                    <svg
                        className="w-4 h-4 text-[#F4F4F5]"
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
                        className="w-4 h-4 text-[#F0B35A]"
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
                className={`max-w-[82%] sm:max-w-[78%] rounded-2xl px-4 py-2.5 shadow-sm ${
                    isUser
                        ? 'bg-[#27272A] border border-[#3E3E42] text-[#F4F4F5] rounded-tr-none'
                        : 'bg-[#18181B] border border-[#2E2E32] border-l-2 border-l-[#F0B35A] text-[#E4E4E7] rounded-tl-none'
                }`}
            >
                <div className="text-xs sm:text-sm font-sans leading-relaxed text-current whitespace-pre-wrap break-words">
                    <ReactMarkdown
                        components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#F0B35A] hover:underline font-medium"
                                >
                                    {children}
                                </a>
                            ),
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            code: ({ children }) => (
                                <code className="bg-black/40 text-[#F0B35A] px-1 py-0.5 rounded text-xs font-mono">
                                    {children}
                                </code>
                            ),
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>

                {message.action?.type === 'download' && message.action.payload === 'resume' && (
                    <motion.a
                        href="/resume.pdf"
                        download="Apoorv_Maurya_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F0B35A] text-[#111111] text-xs font-semibold rounded-lg hover:bg-[#E5A448] transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Apoorv&apos;s Resume
                    </motion.a>
                )}

                {/* Timestamp */}
                <p className="text-[10px] text-[#71717A] mt-1.5">
                    {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>
        </motion.div>
    );
}
