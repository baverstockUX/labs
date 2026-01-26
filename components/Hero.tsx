'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ConnectedPointsBackground } from './ConnectedPointsBackground';

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#050505]">
            {/* Hero Background Image (Right) */}
            <div className="absolute top-0 right-0 w-full md:w-2/3 h-full z-[1] pointer-events-none opacity-50 mix-blend-screen">
                <div className="relative w-full h-full">
                    <Image
                        src="/background.png"
                        alt=""
                        fill
                        className="object-cover object-center md:object-left"
                        style={{
                            maskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)'
                        }}
                    />
                    {/* Pulsing Ember Glow Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-radial-gradient from-tangerine/40 via-coral-red/20 to-transparent mix-blend-color-dodge"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            background: 'radial-gradient(circle at center, rgba(243, 147, 0, 0.5) 0%, rgba(255, 60, 54, 0.2) 30%, transparent 70%)'
                        }}
                    />
                </div>
            </div>

            {/* Interactive Canvas Background */}
            <ConnectedPointsBackground />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 z-[5] opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Vertical Light Curtain Effect - Right Side */}
            <div className="absolute inset-y-0 right-0 w-1/2 md:w-2/5 z-0 pointer-events-none">
                {/* Core vibrant streaks */}
                <div className="absolute top-[-20%] bottom-[-20%] right-[10%] w-[100px] bg-coral-red blur-[80px] opacity-60 mix-blend-screen animate-pulse" />
                <div className="absolute top-[-20%] bottom-[-20%] right-[25%] w-[150px] bg-tangerine blur-[100px] opacity-50 mix-blend-screen" />
                <div className="absolute top-[-20%] bottom-[-20%] right-[5%] w-[80px] bg-electric-purple blur-[90px] opacity-30 mix-blend-screen" />

                {/* Vertical light beams */}
                <div className="absolute inset-y-0 right-[20%] w-[2px] bg-white/20 blur-[1px] opacity-10" />
                <div className="absolute inset-y-0 right-[35%] w-[1px] bg-white/10 blur-[1px] opacity-10" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tight text-white leading-[0.9]">
                            Powering<br />
                            the world of<br />
                            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F39300] to-[#FF3C36] pb-2">the future.</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="mt-8 max-w-lg"
                    >
                        <p className="text-lg text-white/70">
                            A showcase of prototypes and experimental apps. Test, break, and provide feedback to help us build what's next.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
