export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111111] px-4">
            <div className="max-w-md w-full bg-[#18181B] border border-[#2E2E32] rounded-2xl p-8 text-center shadow-xl">
                <div className="mb-6">
                    <h1 className="text-8xl font-heading font-bold text-[#F0B35A] mb-4">404</h1>
                    <h2 className="text-2xl font-heading font-bold text-[#F4F4F5] mb-2">Page Not Found</h2>
                    <p className="text-[#A1A1AA] text-sm">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                <a
                    href="/"
                    className="inline-block px-8 py-3 bg-[#F0B35A] text-[#111111] hover:bg-[#E5A448] font-semibold rounded-lg transition-colors"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
