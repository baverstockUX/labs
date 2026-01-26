'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/data';

interface FeaturedCarouselProps {
    projects: Project[];
}

const THEMES = [
    {
        name: 'Tangerine',
        gradient: 'from-[#F39300] to-[#FF3C36]',
        bg: 'bg-[#F39300]/10',
        border: 'border-[#F39300]/30',
        text: 'text-[#F39300]',
        button: 'bg-[#F39300] hover:bg-[#F39300]/90'
    },
    {
        name: 'Coral',
        gradient: 'from-[#FF3C36] to-[#9D00FF]',
        bg: 'bg-[#FF3C36]/10',
        border: 'border-[#FF3C36]/30',
        text: 'text-[#FF3C36]',
        button: 'bg-[#FF3C36] hover:bg-[#FF3C36]/90'
    },
    {
        name: 'Purple',
        gradient: 'from-[#9D00FF] to-cyan-500',
        bg: 'bg-[#9D00FF]/10',
        border: 'border-[#9D00FF]/30',
        text: 'text-[#9D00FF]',
        button: 'bg-[#9D00FF] hover:bg-[#9D00FF]/90'
    },
    {
        name: 'Cyan',
        gradient: 'from-cyan-500 to-emerald-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        text: 'text-cyan-500',
        button: 'bg-cyan-500 hover:bg-cyan-500/90'
    },
    {
        name: 'Emerald',
        gradient: 'from-emerald-400 to-[#F39300]',
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/30',
        text: 'text-emerald-400',
        button: 'bg-emerald-400 hover:bg-emerald-400/90'
    },
];

export function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const featured = projects.slice(0, 5);

    // Auto-rotate
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 6000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, [featured.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
    }, [featured.length]);

    const currentProject = featured[currentIndex];
    // Cycle through themes safely
    const theme = THEMES[currentIndex % THEMES.length];

    return (
        <section className="relative w-full py-16 px-4 md:px-0 bg-[#050505] overflow-hidden">
            <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8 px-4 md:px-0">
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${theme.button}`}></span>
                        Featured Alphas
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="absolute inset-0 grid md:grid-cols-2"
                        >
                            {/* Image Side */}
                            <div className="relative h-full w-full group">
                                <Image
                                    src={currentProject.image}
                                    alt={currentProject.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-20 mix-blend-overlay`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:bg-gradient-to-r" />
                            </div>

                            {/* Content Side */}
                            <div className={`relative h-full w-full p-8 md:p-12 flex flex-col justify-center ${theme.bg}`}>
                                {/* Ambient Glow */}
                                <div className={`absolute top-1/2 left-0 w-64 h-64 ${theme.text} blur-[120px] opacity-20 pointer-events-none -translate-y-1/2`} />

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative z-10 space-y-6"
                                >
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${theme.border} bg-white/5 backdrop-blur-md`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${theme.button} animate-pulse`} />
                                        <span className={`text-xs font-bold uppercase tracking-wider ${theme.text}`}>
                                            {currentProject.status}
                                        </span>
                                    </div>

                                    <h3 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
                                        {currentProject.title}
                                    </h3>

                                    <p className="text-lg text-white/70 max-w-md">
                                        {currentProject.description}
                                    </p>

                                    <div className="pt-4 flex items-center gap-4">
                                        <button className={`px-6 py-3 rounded-lg font-bold text-white flex items-center gap-2 transition-transform hover:scale-105 ${theme.button}`}>
                                            View Experiment
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <div className="flex flex-col text-sm text-white/40">
                                            <span>Led by</span>
                                            <span className="text-white font-medium">{currentProject.author}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {featured.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? `w-8 ${theme.button}` : 'bg-white/20 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
