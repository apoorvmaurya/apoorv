'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="relative flex items-end bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:border-primary-500/50 focus-within:ring-1 focus-within:ring-primary-500/50 transition-all duration-300">
            <textarea
                ref={textareaRef}
                id="chat-message-input"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={disabled}
                rows={1}
                className="flex-1 bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 focus:outline-none pl-3 pr-16 py-3.5 resize-none max-h-32 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                suppressHydrationWarning
            />
            
            <div className="absolute right-14 bottom-4.5 text-[10px] text-gray-500 hidden sm:block">
                {message.length}/1000
            </div>

            <button
                onClick={handleSend}
                disabled={disabled || !message.trim()}
                className="w-11 h-11 rounded-xl bg-gradient-to-r from-primary-600 to-accent-purple flex items-center justify-center text-white shadow-md hover:shadow-glow-sm hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex-shrink-0 mb-0.5 mr-0.5"
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                </svg>
            </button>
        </div>
    );
}
