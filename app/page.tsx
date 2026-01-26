'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { Footer } from '@/components/Footer';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { projects } from '@/lib/data';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#050505", "#101C36", "#050505"]
  );

  const gridProjects = projects.slice(5);

  return (
    <motion.main
      ref={containerRef}
      style={{ backgroundColor }}
      className="min-h-screen text-foreground selection:bg-tangerine selection:text-white relative"
    >
      <Navbar />
      <Hero />

      {/* Featured Marquee Section */}
      <FeaturedCarousel projects={projects.slice(0, 5)} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-16 border-b border-white/10 pb-6"
        >
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
              All Experiments
            </h2>
            <p className="text-white/40 text-lg">Explore the latest submitted prototypes.</p>
          </div>
          {/* Future: Add filters here */}
        </motion.div>

        {/* Broken Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-auto">
          {gridProjects.map((project, index) => {
            // Define variant pattern: wide, square, tall, square, square, compact, tall, square
            const variantPattern: Array<'wide' | 'tall' | 'square' | 'compact'> = [
              'wide',    // 0
              'square',  // 1
              'tall',    // 2
              'square',  // 3
              'square',  // 4
              'compact', // 5
              'tall',    // 6
              'square',  // 7
            ];

            const variant = variantPattern[index % variantPattern.length];

            // Add vertical offset for staggered effect
            const offsetClass = index % 3 === 0 ? 'lg:translate-y-8' :
                               index % 3 === 1 ? 'lg:-translate-y-4' : '';

            return (
              <div
                key={project.id}
                className={`${offsetClass} transition-transform duration-300`}
              >
                <ProjectCard
                  project={project}
                  index={index + 5}
                  variant={variant}
                />
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <button className="group px-10 py-4 rounded-full border-2 border-white/10 bg-white/5 hover:bg-tangerine hover:border-tangerine transition-all text-white font-heading font-bold text-lg hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-tangerine/20">
            View Gallery
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </section>

      <Footer />
    </motion.main>
  );
}
