'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/data';

interface FeaturedCarouselProps {
    projects: Project[];
}

const THEMES = [
    {
        name: 'Tangerine',
        gradient: 'from-[#F39300] to-[#FF3C36]',
        glow: 'shadow-[#F39300]',
        button: 'bg-[#F39300] hover:bg-[#F39300]/90'
    },
    {
        name: 'Coral',
        gradient: 'from-[#FF3C36] to-[#9D00FF]',
        glow: 'shadow-[#FF3C36]',
        button: 'bg-[#FF3C36] hover:bg-[#FF3C36]/90'
    },
    {
        name: 'Purple',
        gradient: 'from-[#9D00FF] to-cyan-500',
        glow: 'shadow-[#9D00FF]',
        button: 'bg-[#9D00FF] hover:bg-[#9D00FF]/90'
    },
    {
        name: 'Cyan',
        gradient: 'from-cyan-500 to-emerald-400',
        glow: 'shadow-cyan-500',
        button: 'bg-cyan-500 hover:bg-cyan-500/90'
    },
    {
        name: 'Emerald',
        gradient: 'from-emerald-400 to-[#F39300]',
        glow: 'shadow-emerald-400',
        button: 'bg-emerald-400 hover:bg-emerald-400/90'
    },
];

export function FeaturedCarousel({ projects }: FeaturedCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const featured = projects.slice(0, 5);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-rotate (paused during drag)
    useEffect(() => {
        if (isDragging) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featured.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featured.length, isDragging]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        setIsDragging(false);
        if (Math.abs(info.offset.x) > 100) {
            if (info.offset.x > 0) {
                setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
            } else {
                setCurrentIndex((prev) => (prev + 1) % featured.length);
            }
        }
    };

    const theme = THEMES[currentIndex % THEMES.length];

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full py-24 px-4 md:px-8 bg-[#050505] overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header with Card Counter */}
                <div className="flex items-center justify-between mb-12 px-4 md:px-0">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${theme.button}`}></span>
                        Featured Alphas
                    </h2>

                    <div className="font-heading text-white/40 text-sm tracking-wider">
                        <span className="text-white text-2xl font-bold">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        {' / '}
                        <span>{String(featured.length).padStart(2, '0')}</span>
                    </div>
                </div>

                {/* Exhibition Deck */}
                <div
                    className="relative h-[600px] w-full flex items-center justify-center perspective-1000"
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab',
                        perspective: '2000px'
                    }}
                >
                    <AnimatePresence initial={false}>
                        {featured.map((project, index) => {
                            const offset = (index - currentIndex + featured.length) % featured.length;
                            const isActive = offset === 0;
                            const isVisible = offset <= 2;

                            if (!isVisible) return null;

                            return (
                                <motion.div
                                    key={project.id}
                                    drag={isActive ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragStart={() => setIsDragging(true)}
                                    onDragEnd={handleDragEnd}
                                    initial={{
                                        scale: 0.8,
                                        rotateY: 0,
                                        z: -200 * offset
                                    }}
                                    animate={{
                                        scale: isActive ? 1 : 0.92 - offset * 0.04,
                                        rotateY: isActive ? 0 : offset * 4,
                                        rotateZ: isActive ? 0 : offset * -2,
                                        z: -80 * offset,
                                        x: offset * 25,
                                        y: offset * 15,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.32, 0.72, 0, 1]
                                    }}
                                    style={{
                                        rotateX: isActive ? rotateX : 0,
                                        rotateY: isActive ? rotateY : offset * 4,
                                        transformStyle: 'preserve-3d',
                                        zIndex: featured.length - offset,
                                    }}
                                    className="absolute w-full max-w-4xl h-[550px] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl"
                                    onClick={() => !isActive && setCurrentIndex(index)}
                                >
                                    <div className="relative w-full h-full grid md:grid-cols-2">
                                        {/* Image Side */}
                                        <div className="relative h-full w-full group">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover"
                                                priority={offset === 0}
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-20 mix-blend-overlay`} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent md:bg-gradient-to-r" />
                                        </div>

                                        {/* Content Side */}
                                        <div className="relative h-full w-full p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#0a0a0a] to-[#121212]">
                                            {/* Floating Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="absolute top-8 right-8"
                                            >
                                                <div className={`px-4 py-2 rounded-full border ${theme.glow} border-current backdrop-blur-xl bg-white/5`}>
                                                    <span className={`text-xs font-black uppercase tracking-widest bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                                                        {project.status}
                                                    </span>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="relative z-10 space-y-6"
                                            >
                                                <h3 className="font-heading text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight">
                                                    {project.title}
                                                </h3>

                                                <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-md">
                                                    {project.description}
                                                </p>

                                                <div className="pt-6 flex items-center gap-6">
                                                    <button className={`px-6 py-3 rounded-xl font-bold text-white text-sm flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl active:scale-95 ${theme.button}`}>
                                                        View Experiment
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>

                                                    <div className="flex flex-col text-xs text-white/30">
                                                        <span className="font-mono uppercase tracking-wider">Led by</span>
                                                        <span className="text-white font-heading font-semibold text-sm mt-0.5">{project.author}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Shadow overlay for inactive cards */}
                                    {!isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 rounded-3xl pointer-events-none" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Hint Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center text-white/20 text-sm font-mono"
                >
                    Drag to explore • Click cards to navigate
                </motion.div>
            </div>
        </section>
    );
}
