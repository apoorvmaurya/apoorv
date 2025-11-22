'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage } from '@/types';

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    /**
     * Send a message to the chat API
     */
    const sendMessage = useCallback(
        async (content: string) => {
            if (!content.trim() || isLoading) return;

            // Create user message
            const userMessage: ChatMessage = {
                id: Date.now().toString(),
                role: 'user',
                content: content.trim(),
                timestamp: new Date(),
            };

            // Add user message optimistically
            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);
            setError(null);

            // Create abort controller for this request
            abortControllerRef.current = new AbortController();

            try {
                // Prepare conversation history (last 10 messages)
                const history = messages.slice(-10).map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                }));

                // Call chat API
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: content.trim(),
                        history,
                    }),
                    signal: abortControllerRef.current.signal,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to get response');
                }

                const data = await response.json();

                // Create assistant message
                const assistantMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: data.data.message,
                    timestamp: new Date(),
                };

                // Add assistant message
                setMessages((prev) => [...prev, assistantMessage]);

                // Handle action if present
                if (data.data.action) {
                    handleAction(data.data.action);
                }
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    console.log('Request aborted');
                    return;
                }

                console.error('Chat error:', err);
                setError(err.message || 'Failed to send message');

                // Add error message
                const errorMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content:
                        "I'm sorry, I encountered an error. Please try again or contact Apoorv directly.",
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
                abortControllerRef.current = null;
            }
        },
        [messages, isLoading]
    );

    /**
     * Handle actions from AI responses
     */
    const handleAction = useCallback((action: { type: string; payload?: any }) => {
        switch (action.type) {
            case 'navigate':
                // Scroll to section
                const element = document.getElementById(action.payload);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                break;

            case 'download':
                // Download resume
                if (action.payload === 'resume') {
                    const link = document.createElement('a');
                    link.href = '/Resume.pdf';
                    link.download = 'Apoorv_Maurya_Resume.pdf';
                    link.click();
                }
                break;

            case 'contact':
                // Open contact form or navigate to contact section
                const contactElement = document.getElementById('contact');
                if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                break;

            default:
                console.log('Unknown action type:', action.type);
        }
    }, []);

    /**
     * Clear all messages
     */
    const clearMessages = useCallback(() => {
        setMessages([]);
        setError(null);
    }, []);

    /**
     * Cancel ongoing request
     */
    const cancelRequest = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            setIsLoading(false);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages,
        cancelRequest,
    };
}
