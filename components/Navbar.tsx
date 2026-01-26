'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lightbulb } from 'lucide-react';
import { PitchModal } from './PitchModal';

export function Navbar() {
    const [isPitchOpen, setIsPitchOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-4 group">
                                <div className="relative h-8 w-32 md:w-40">
                                    <Image
                                        src="/oneadvanced-logo.2c9f7db1.svg"
                                        alt="OneAdvanced"
                                        fill
                                        className="object-contain object-left"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="hidden md:inline text-white/20 text-2xl font-light">|</span>
                                    <span className="font-heading font-extrabold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400 pt-1">
                                        IQ Labs
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-8">
                                <Link href="/coming-soon" className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group">
                                    My Experiments
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-tangerine to-coral-red transition-all group-hover:w-full"></span>
                                </Link>

                                <button
                                    onClick={() => setIsPitchOpen(true)}
                                    className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-105"
                                >
                                    <Lightbulb className="w-4 h-4 text-tangerine group-hover:text-yellow-400 transition-colors" />
                                    <span className="text-sm font-bold text-white">Pitch an Idea</span>
                                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 group-hover:ring-white/20" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <PitchModal isOpen={isPitchOpen} onClose={() => setIsPitchOpen(false)} />
        </>
    );
}
