export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                {/* Simple spinner - faster initial load */}
                <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-primary-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin"></div>
                </div>

                {/* Minimal text */}
                <p className="text-gray-400 text-sm">Loading...</p>
            </div>
        </div>
    );
}
