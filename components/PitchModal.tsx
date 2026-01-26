'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useActionState, useEffect, useState } from 'react';
import { submitIdea } from '@/app/actions/submit-idea';
import { X, Lightbulb } from 'lucide-react';

interface PitchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const initialState = {
    message: '',
};

export function PitchModal({ isOpen, onClose }: PitchModalProps) {
    const [state, formAction, isPending] = useActionState(submitIdea, initialState);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (state?.message) {
            setSuccess(true);
            const timer = setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [state, onClose]);

    // Reset success state when reopening
    useEffect(() => {
        if (isOpen) {
            setSuccess(false);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-tangerine/5 to-electric-purple/5 pointer-events-none" />

                            {success ? (
                                <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Lightbulb className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold text-white">Idea Received!</h3>
                                    <p className="text-white/60">Thanks for sparking innovation.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                                        <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                                            <Lightbulb className="w-5 h-5 text-tangerine" />
                                            Pitch an Idea
                                        </h3>
                                        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <form action={formAction} className="p-6 space-y-4">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-white/70 mb-1">Title</label>
                                            <input type="text" name="title" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tangerine transition-colors placeholder-white/20" placeholder="e.g. AI-Powered Coffee Maker" />
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-white/70 mb-1">Description</label>
                                            <textarea name="description" required rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tangerine transition-colors placeholder-white/20" placeholder="Describe your brilliant idea..." />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">Name (Optional)</label>
                                                <input type="text" name="name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tangerine transition-colors" />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">Email (Optional)</label>
                                                <input type="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-tangerine transition-colors" />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                disabled={isPending}
                                                type="submit"
                                                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-tangerine to-coral-red text-white font-bold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-tangerine/20"
                                            >
                                                {isPending ? 'Submitting...' : 'Submit Idea'}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
