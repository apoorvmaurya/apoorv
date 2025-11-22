export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full glass rounded-2xl p-8 text-center">
                <div className="mb-6">
                    <h1 className="text-8xl font-heading font-bold text-gradient mb-4">404</h1>
                    <h2 className="text-2xl font-heading font-bold mb-2">Page Not Found</h2>
                    <p className="text-gray-400">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <a
                    href="/"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-purple rounded-lg font-medium hover:shadow-glow-md transition-all duration-300 hover:scale-105"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
