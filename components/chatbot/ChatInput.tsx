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
        <div className="relative flex items-end bg-[#18181B] border border-[#2E2E32] rounded-xl p-1.5 focus-within:border-[#F0B35A] focus-within:ring-1 focus-within:ring-[#F0B35A]/50 transition-colors">
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
                className="flex-1 bg-transparent border-0 text-[#F4F4F5] placeholder-[#71717A] focus:ring-0 focus:outline-none pl-2.5 pr-12 py-2 resize-none max-h-28 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                suppressHydrationWarning
            />
            
            <div className="absolute right-12 bottom-3 text-[10px] text-[#71717A] hidden sm:block">
                {message.length}/1000
            </div>

            <button
                onClick={handleSend}
                disabled={disabled || !message.trim()}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#F0B35A] text-[#111111] hover:bg-[#E5A448] disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Send message"
            >
                <svg
                    className="w-4 h-4"
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
