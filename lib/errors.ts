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
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized access') {
        super(message, 401);
        this.name = 'UnauthorizedError';
    }
}

export class APIError extends AppError {
    constructor(message: string, statusCode: number = 500) {
        super(message, statusCode);
        this.name = 'APIError';
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
    if (error instanceof ValidationError) {
        return error.message;
    }

    if (error instanceof NotFoundError) {
        return 'The requested resource was not found.';
    }

    if (error instanceof UnauthorizedError) {
        return 'You are not authorized to perform this action.';
    }

    if (error instanceof APIError) {
        if (error.statusCode === 429) {
            return 'Too many requests. Please try again later.';
        }
        if (error.statusCode >= 500) {
            return 'A server error occurred. Please try again later.';
        }
        return error.message;
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
