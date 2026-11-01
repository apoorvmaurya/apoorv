/**
 * Custom error classes for better error handling
 */

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500,
        public isOperational: boolean = true
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'NotFoundError';
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized access') {
        super(message, 401);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'UnauthorizedError';
    }
}

export class APIError extends AppError {
    constructor(message: string, statusCode: number = 500) {
        super(message, statusCode);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'APIError';
    }
}

export class ProviderAuthError extends APIError {
    constructor(message: string = 'AI service authentication failed. Please configure GROQ_API_KEY correctly.') {
        super(message, 401);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'ProviderAuthError';
    }
}

export class ProviderRateLimitError extends APIError {
    constructor(message: string = 'Groq service rate limit exceeded. Please try again in a moment.') {
        super(message, 429);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'ProviderRateLimitError';
    }
}

export class ProviderUnavailableError extends APIError {
    constructor(message: string = 'AI service is temporarily unavailable. Please try again later.', statusCode: number = 503) {
        super(message, statusCode);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'ProviderUnavailableError';
    }
}

export class ProviderBadRequestError extends APIError {
    constructor(message: string = 'Invalid request to AI service.', statusCode: number = 400) {
        super(message, statusCode);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'ProviderBadRequestError';
    }
}

export class ProviderMalformedResponseError extends APIError {
    constructor(message: string = 'Received malformed response from AI service.') {
        super(message, 502);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'ProviderMalformedResponseError';
    }
}

/**
 * Error logger
 */
export function logError(error: Error | AppError, context?: string): void {
    const timestamp = new Date().toISOString();
    const errorInfo = {
        timestamp,
        context,
        name: error.name,
        message: error.message,
        stack: error.stack,
        ...(error instanceof AppError && {
            statusCode: error.statusCode,
            isOperational: error.isOperational,
        }),
    };

    // In production, send to error tracking service (e.g., Sentry)
    console.error('Error:', errorInfo);
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: Error | AppError): string {
    if (error instanceof ValidationError || error.name === 'ValidationError') {
        return error.message;
    }

    if (error instanceof NotFoundError || error.name === 'NotFoundError') {
        return 'The requested resource was not found.';
    }

    if (error instanceof UnauthorizedError || error.name === 'UnauthorizedError') {
        return 'You are not authorized to perform this action.';
    }

    if (error instanceof ProviderRateLimitError || error.name === 'ProviderRateLimitError') {
        return error.message;
    }

    if (error instanceof ProviderAuthError || error.name === 'ProviderAuthError') {
        return error.message;
    }

    if (error instanceof ProviderUnavailableError || error.name === 'ProviderUnavailableError') {
        return error.message;
    }

    if (error instanceof ProviderMalformedResponseError || error.name === 'ProviderMalformedResponseError') {
        return error.message;
    }

    if (error instanceof ProviderBadRequestError || error.name === 'ProviderBadRequestError') {
        return error.message;
    }

    if (error instanceof APIError || error.name === 'APIError') {
        const statusCode = 'statusCode' in error ? error.statusCode : 500;
        if (statusCode === 429) {
            return 'Too many requests. Please try again later.';
        }
        return error.message || 'An API error occurred.';
    }

    // Generic error message
    return 'An unexpected error occurred. Please try again.';
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
): Promise<T> {
    let lastError: Error;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            if (i < maxRetries - 1) {
                const delay = baseDelay * Math.pow(2, i);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError!;
}

/**
 * Safe async handler for API routes
 */
export function asyncHandler(
    handler: (req: Request) => Promise<Response>
): (req: Request) => Promise<Response> {
    return async (req: Request) => {
        try {
            return await handler(req);
        } catch (error) {
            logError(error as Error, 'API Route');

            if (error instanceof AppError) {
                return Response.json(
                    {
                        error: getUserFriendlyMessage(error),
                        statusCode: error.statusCode,
                    },
                    { status: error.statusCode }
                );
            }

            return Response.json(
                {
                    error: 'An unexpected error occurred',
                    statusCode: 500,
                },
                { status: 500 }
            );
        }
    };
}
