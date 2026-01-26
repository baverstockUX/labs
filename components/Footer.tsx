export function Footer() {
    return (
        <footer className="border-t border-white/10 py-12 bg-background relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-lg text-white">OneAdvanced</span>
                    <span className="text-white/20">|</span>
                    <span className="text-sm text-white/50">IQ Labs Innovation Portal</span>
                </div>

                <p className="text-sm text-white/30">
                    &copy; {new Date().getFullYear()} OneAdvanced. Internal Use Only.
                </p>
            </div>
        </footer>
    );
}
