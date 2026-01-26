'use client';

import { useMotionValue, useSpring, motion } from 'framer-motion';
import { useEffect } from 'react';

export function MouseBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 250); // Center the 500px circle
            mouseY.set(e.clientY - 250);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-tangerine/20 to-electric-purple/20 blur-[100px] opacity-40 mix-blend-screen"
                style={{
                    x: springX,
                    y: springY,
                }}
            />
        </div>
    );
}
