export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                {/* Animated logo/spinner */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-primary-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-accent-purple animate-spin animation-delay-150" style={{ animationDirection: 'reverse' }}></div>
                </div>

                {/* Loading text */}
                <h2 className="text-xl font-heading font-semibold text-gradient mb-2">
                    Loading...
                </h2>
                <p className="text-gray-400 text-sm">
                    Preparing your experience
                </p>

                {/* Skeleton content */}
                <div className="mt-12 max-w-4xl mx-auto px-4 space-y-4">
                    <div className="skeleton h-12 rounded-lg w-3/4 mx-auto"></div>
                    <div className="skeleton h-8 rounded-lg w-1/2 mx-auto"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="skeleton h-32 rounded-xl"></div>
                        <div className="skeleton h-32 rounded-xl"></div>
                        <div className="skeleton h-32 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
