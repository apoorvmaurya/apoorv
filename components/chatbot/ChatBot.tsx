'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { scaleIn, fadeInUp, staggerContainer } from '@/lib/animations';

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

    // Welcome message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Add welcome message after a short delay
            const timer = setTimeout(() => {
                const welcomeMessage = {
                    id: 'welcome',
                    role: 'assistant' as const,
                    content:
                        "Hi! I'm Apoorv's AI assistant. I can help you learn about his background, skills, experience, and projects. Feel free to ask me anything!",
                    timestamp: new Date(),
                };
                // This would normally be added through the chat system
                // For now, we'll let users start the conversation
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, messages.length]);

    const handleSend = (message: string) => {
        sendMessage(message);
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-primary-600 to-accent-purple shadow-glow-lg flex items-center justify-center text-white hover:shadow-glow-lg transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
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
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
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

                {/* Notification dot for new features */}
                {!isOpen && (
                    <motion.span
                        className="absolute -top-1 -right-1 w-4 h-4 bg-accent-cyan rounded-full border-2 border-background"
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
                        className="fixed bottom-24 right-6 z-40 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] glass-strong rounded-2xl shadow-glow-md overflow-hidden flex flex-col border border-white/10"
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-600/20 to-accent-purple/20 backdrop-blur-xl border-b border-white/10 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-accent-purple flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-white"
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
                                        <h3 className="font-heading font-semibold text-white">AI Assistant</h3>
                                        <p className="text-xs text-gray-400">Powered by Google Gemini</p>
                                    </div>
                                </div>
                                {messages.length > 0 && (
                                    <button
                                        onClick={clearMessages}
                                        className="text-gray-400 hover:text-white transition-colors"
                                        title="Clear chat"
                                    >
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
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 ? (
                                <motion.div
                                    className="h-full flex items-center justify-center text-center px-4"
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <div>
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                                            <svg
                                                className="w-8 h-8 text-primary-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="font-heading font-semibold text-white mb-2">
                                            Start a conversation
                                        </h4>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Ask me about Apoorv's experience, skills, or projects!
                                        </p>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => handleSend("Tell me about Apoorv's experience")}
                                                className="w-full text-left px-4 py-2 glass rounded-lg text-sm hover:glass-strong transition-all"
                                            >
                                                💼 Tell me about his experience
                                            </button>
                                            <button
                                                onClick={() => handleSend('What are his technical skills?')}
                                                className="w-full text-left px-4 py-2 glass rounded-lg text-sm hover:glass-strong transition-all"
                                            >
                                                🛠️ What are his skills?
                                            </button>
                                            <button
                                                onClick={() => handleSend('Show me his projects')}
                                                className="w-full text-left px-4 py-2 glass rounded-lg text-sm hover:glass-strong transition-all"
                                            >
                                                🚀 Show me his projects
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
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
                            )}

                            {/* Typing indicator */}
                            {isLoading && (
                                <motion.div
                                    className="flex items-start space-x-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-accent-purple flex-shrink-0" />
                                    <div className="glass rounded-2xl rounded-tl-none px-4 py-3">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                            <div
                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style={{ animationDelay: '0.1s' }}
                                            />
                                            <div
                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style={{ animationDelay: '0.2s' }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Error message */}
                            {error && (
                                <motion.div
                                    className="glass-strong rounded-lg p-3 border border-red-500/30"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <p className="text-sm text-red-400">{error}</p>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-white/10 p-4 bg-background/50 backdrop-blur-xl">
                            <ChatInput onSend={handleSend} disabled={isLoading} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
