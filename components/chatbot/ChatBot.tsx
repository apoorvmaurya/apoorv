'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { scaleIn, staggerContainer } from '@/lib/animations';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = (message: string) => {
        sendMessage(message);
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] right-3 sm:bottom-6 sm:right-6 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#18181B] text-[#F0B35A] border border-[#2E2E32] hover:border-[#F0B35A]/50 shadow-xl flex items-center justify-center transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="chat"
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                        </motion.svg>
                    )}
                </AnimatePresence>

                {/* Notification dot */}
                {!isOpen && (
                    <motion.span
                        className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#F0B35A] rounded-full border-2 border-[#18181B]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                    />
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-x-3 bottom-[calc(3.75rem+env(safe-area-inset-bottom,0px))] sm:inset-x-auto sm:bottom-24 sm:right-6 z-[45] sm:w-[380px] h-[500px] max-h-[calc(100vh-5rem)] rounded-2xl bg-[#18181B] border border-[#2E2E32] shadow-2xl flex flex-col overflow-hidden"
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        data-lenis-prevent
                    >
                        {/* Header */}
                        <div className="bg-[#111111] border-b border-[#2E2E32] p-3.5 sm:p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-9 h-9 rounded-full bg-[#F0B35A]/15 border border-[#F0B35A]/30 flex items-center justify-center text-[#F0B35A]">
                                        <svg
                                            className="w-5 h-5"
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
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-[#F4F4F5] text-sm">Portfolio Assistant</h3>
                                        <p className="text-[11px] text-[#A1A1AA]">Full-Stack AI Profile Assistant</p>
                                    </div>
                                </div>
                                {messages.length > 0 && (
                                    <button
                                        onClick={clearMessages}
                                        className="text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors p-1"
                                        title="Clear chat"
                                        aria-label="Clear chat"
                                    >
                                        <svg
                                            className="w-4 h-4 sm:w-5 sm:h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 bg-[#111111]" style={{ overscrollBehavior: 'contain' }}>
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="space-y-4"
                            >
                                {messages.map((message) => (
                                    <ChatMessage key={message.id} message={message} />
                                ))}
                            </motion.div>

                            {/* Suggestions (only shown if only welcome message is present) */}
                            {messages.length === 1 && (
                                <motion.div
                                    className="pl-2 sm:pl-10 space-y-2 mt-4 max-w-[95%] sm:max-w-[85%]"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <p className="text-[11px] text-[#A1A1AA] font-semibold mb-2 tracking-wider uppercase pl-1">
                                        Suggested questions:
                                    </p>
                                    <div className="grid grid-cols-1 gap-2">
                                        <button
                                            onClick={() => handleSend("Tell me about Apoorv's experience")}
                                            className="w-full text-left px-3.5 py-2.5 bg-white/[0.03] border border-[#2E2E32] rounded-xl text-xs text-[#D4D4D8] hover:text-[#F4F4F5] hover:bg-white/[0.06] hover:border-[#F0B35A]/40 transition-all duration-200 flex items-center justify-between"
                                        >
                                            <span>Tell me about his experience</span>
                                            <span className="text-[#A1A1AA]">→</span>
                                        </button>
                                        <button
                                            onClick={() => handleSend('What are his technical skills?')}
                                            className="w-full text-left px-3.5 py-2.5 bg-white/[0.03] border border-[#2E2E32] rounded-xl text-xs text-[#D4D4D8] hover:text-[#F4F4F5] hover:bg-white/[0.06] hover:border-[#F0B35A]/40 transition-all duration-200 flex items-center justify-between"
                                        >
                                            <span>What are his technical skills?</span>
                                            <span className="text-[#A1A1AA]">→</span>
                                        </button>
                                        <button
                                            onClick={() => handleSend('Show me his projects')}
                                            className="w-full text-left px-3.5 py-2.5 bg-white/[0.03] border border-[#2E2E32] rounded-xl text-xs text-[#D4D4D8] hover:text-[#F4F4F5] hover:bg-white/[0.06] hover:border-[#F0B35A]/40 transition-all duration-200 flex items-center justify-between"
                                        >
                                            <span>Show me his projects</span>
                                            <span className="text-[#A1A1AA]">→</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Typing indicator */}
                            {isLoading && (
                                <motion.div
                                    className="flex items-start space-x-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F0B35A]/15 border border-[#F0B35A]/30 flex items-center justify-center text-[#F0B35A] flex-shrink-0" />
                                    <div className="bg-[#18181B] border border-[#2E2E32] rounded-2xl rounded-tl-none px-4 py-3">
                                        <div className="flex space-x-1.5">
                                            <div className="w-1.5 h-1.5 bg-[#A1A1AA] rounded-full animate-bounce" />
                                            <div
                                                className="w-1.5 h-1.5 bg-[#A1A1AA] rounded-full animate-bounce"
                                                style={{ animationDelay: '0.1s' }}
                                            />
                                            <div
                                                className="w-1.5 h-1.5 bg-[#A1A1AA] rounded-full animate-bounce"
                                                style={{ animationDelay: '0.2s' }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Error message */}
                            {error && (
                                <motion.div
                                    className="rounded-lg p-3 bg-red-500/10 border border-red-500/30 text-xs text-red-400"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <p>{error}</p>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-[#2E2E32] p-3 sm:p-4 bg-[#111111]">
                            <ChatInput onSend={handleSend} disabled={isLoading} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
