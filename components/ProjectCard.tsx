'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project;
    index: number;
    variant?: 'wide' | 'tall' | 'square' | 'compact';
}

const STATUS_STYLES = {
    'Alpha': 'bg-tangerine/20 text-tangerine border-tangerine/40',
    'Beta': 'bg-electric-purple/20 text-electric-purple border-electric-purple/40',
    'Prototype': 'bg-cyan-500/20 text-cyan-500 border-cyan-500/40',
};

function ProjectBadge({ status, className = "" }: { status: Project['status'], className?: string }) {
    return (
        <span className={`font-black rounded-full uppercase tracking-widest border backdrop-blur-xl ${STATUS_STYLES[status]} ${className}`}>
            {status}
        </span>
    );
}

function ProjectLink({ link, text = "Launch App", className = "", iconClassName = "w-4 h-4" }: { link?: string, text?: string, className?: string, iconClassName?: string }) {
    if (link) {
        return (
            <Link href={link} className={`inline-flex items-center gap-2 font-bold transition-colors group/link ${className}`}>
                {text} <ArrowUpRight className={`${iconClassName} transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5`} />
            </Link>
        );
    }
    return (
        <span className={`inline-flex items-center gap-2 font-bold cursor-not-allowed ${className} opacity-30`}>
            {text} <ArrowUpRight className={iconClassName} />
        </span>
    );
}

function ProjectImage({ project, sizes, className = "" }: { project: Project, sizes: string, className?: string }) {
    return (
        <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={sizes}
            className={`object-cover transition-transform duration-700 group-hover:scale-110 ${className}`}
        />
    );
}

export function ProjectCard({ project, index, variant = 'square' }: ProjectCardProps) {
    if (variant === 'wide') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 overflow-hidden backdrop-blur-sm transition-all flex flex-col md:flex-row md:col-span-2 h-[280px]"
            >
                {/* Hover Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-tangerine via-coral-red to-electric-purple opacity-0 group-hover:opacity-10 blur-xl transition duration-500 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row w-full h-full z-10">
                    <div className="relative w-full md:w-[40%] h-48 md:h-full overflow-hidden">
                        <ProjectImage project={project} sizes="(max-width: 768px) 100vw, 40vw" />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent" />
                    </div>

                    <div className="relative w-full md:w-[60%] p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">{project.author}</p>
                                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
                                        {project.title}
                                    </h3>
                                </div>
                                <ProjectBadge status={project.status} className="px-3 py-1.5 text-xs shrink-0" />
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="mt-6">
                            <ProjectLink link={project.link_live} className="text-sm text-white hover:text-tangerine" />
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (variant === 'tall') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative rounded-3xl overflow-hidden backdrop-blur-sm transition-all md:row-span-2 h-[520px] border-2 border-white/10 hover:border-white/20"
            >
                <ProjectImage project={project} sizes="(max-width: 768px) 100vw, 33vw" className="group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute -inset-1 bg-gradient-to-t from-tangerine/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition duration-500 pointer-events-none" />

                <div className="relative h-full flex flex-col justify-between p-6 z-10">
                    <div className="flex justify-end">
                        <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 5 }}>
                            <ProjectBadge status={project.status} className="px-3 py-1.5 text-xs" />
                        </motion.div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">{project.author}</p>
                            <h3 className="font-heading text-3xl font-bold text-white leading-tight mb-3">
                                {project.title}
                            </h3>
                            <p className="text-sm text-white/70 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <ProjectLink link={project.link_live} className="text-sm text-white hover:text-tangerine" />
                    </div>
                </div>
            </motion.div>
        );
    }

    if (variant === 'compact') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl overflow-hidden backdrop-blur-sm transition-all h-[240px] border border-white/10 hover:border-tangerine/50"
            >
                <ProjectImage project={project} sizes="(max-width: 768px) 100vw, 33vw" className="transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300" />

                <div className="relative h-full flex flex-col items-center justify-center text-center p-6 z-10">
                    <ProjectBadge status={project.status} className="px-2.5 py-1 text-[10px] mb-3" />

                    <h3 className="font-heading text-2xl font-bold text-white mb-2 leading-tight">
                        {project.title}
                    </h3>

                    <p className="text-xs text-white/50 mb-1">{project.author}</p>

                    {project.link_live ? (
                         <Link href={project.link_live} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-tangerine hover:text-white transition-colors">
                            View <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    ) : (
                        <span className="mt-3 text-xs text-white/30">Coming Soon</span>
                    )}
                </div>
            </motion.div>
        );
    }

    // Square variant (default)
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="group relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 overflow-hidden backdrop-blur-sm transition-all flex flex-col h-[380px]"
        >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-tangerine/20 to-electric-purple/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500 pointer-events-none" />

            <div className="relative h-full flex flex-col z-10">
                <div className="relative h-52 w-full overflow-hidden">
                    <ProjectImage project={project} sizes="(max-width: 768px) 100vw, 33vw" className="transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 right-4">
                        <ProjectBadge status={project.status} className="px-2.5 py-1 text-[10px]" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">{project.author}</p>
                        <h3 className="font-heading text-2xl font-bold text-white leading-tight">{project.title}</h3>
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                    <p className="text-sm text-white/60 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="mt-4">
                        <ProjectLink link={project.link_live} className="text-sm text-white hover:text-tangerine" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
