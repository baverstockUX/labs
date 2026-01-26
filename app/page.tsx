'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { Footer } from '@/components/Footer';
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

  return (
    <motion.main
      ref={containerRef}
      style={{ backgroundColor }}
      className="min-h-screen text-foreground selection:bg-tangerine selection:text-white relative"
    >
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12 border-b border-white/10 pb-6"
        >
          <div>
            <h2 className="font-heading text-3xl font-bold text-white mb-2">Vibrant Alphas</h2>
            <p className="text-white/50">Fresh from the lab. Ready for your input.</p>
          </div>
          {/* Future: Add filters here */}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
