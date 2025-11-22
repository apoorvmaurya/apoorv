'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, id, type, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        // Determine autocomplete value based on input type and name if not provided
        const getAutocomplete = () => {
            if (props.autoComplete) return props.autoComplete;
            if (props.name === 'name') return 'name';
            if (props.name === 'email' || type === 'email') return 'email';
            if (props.name === 'subject') return 'off';
            return 'off';
        };

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    type={type}
                    autoComplete={getAutocomplete()}
                    className={cn(
                        'w-full px-4 py-3 rounded-lg glass border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300',
                        error && 'border-red-500 focus:ring-red-500',
                        className
                    )}
                    suppressHydrationWarning={true}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
