'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 overflow-hidden backdrop-blur-sm transition-colors flex flex-col"
        >
            {/* Hover Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-tangerine to-coral-red opacity-0 group-hover:opacity-20 blur transition duration-500 pointer-events-none" />

            <div className="relative h-full flex flex-col z-10">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div>
                            <p className="text-xs font-medium text-white/70 mb-1">{project.author}</p>
                            <h3 className="font-heading text-xl font-bold text-white">{project.title}</h3>
                        </div>
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider border
               ${project.status === 'Alpha' ? 'bg-tangerine/20 text-tangerine border-tangerine/30' :
                                project.status === 'Beta' ? 'bg-electric-purple/20 text-electric-purple border-electric-purple/30' :
                                    'bg-cyan-500/20 text-cyan-500 border-cyan-500/30'}`}>
                            {project.status}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <p className="text-sm text-white/70 leading-relaxed mb-6">
                        {project.description}
                    </p>

                    <div className="mt-auto">
                        {project.link_live ? (
                            <Link href={project.link_live} className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-tangerine transition-colors">
                                Launch App <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-white/40 cursor-not-allowed">
                                Launch App <ArrowUpRight className="w-4 h-4" />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
