'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail, ChevronRight } from 'lucide-react';

export function FloatingExpertButton() {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="glass border border-white/10 rounded-2xl p-4 w-64 shadow-2xl"
                    >
                        <p className="text-sm font-semibold text-white mb-1">Talk to a Travel Expert</p>
                        <p className="text-xs text-white/50 mb-4">We're available 9 AM – 8 PM, 7 days a week</p>

                        <div className="flex flex-col gap-2">
                            <a
                                href="https://wa.me/919876543210"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/25 hover:bg-[#25D366]/25 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-white">WhatsApp Chat</p>
                                    <p className="text-xs text-white/50">Instant replies</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                            </a>

                            <a
                                href="tel:+919876543210"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-ocean-900/30 border border-ocean-500/25 hover:bg-ocean-900/50 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-ocean-500 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-white">Call Us</p>
                                    <p className="text-xs text-white/50">+91 98765 43210</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                            </a>

                            <a
                                href="mailto:hello@wanderlux.in"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold-900/20 border border-gold-500/20 hover:bg-gold-900/30 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-4 h-4 text-midnight" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-white">Email Us</p>
                                    <p className="text-xs text-white/50">hello@wanderlux.in</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setOpen(!open)}
                className="relative w-14 h-14 rounded-2xl btn-primary flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Talk to a travel expert"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X className="w-6 h-6 text-midnight" />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <MessageCircle className="w-6 h-6 text-midnight" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulse Ring */}
                {!open && (
                    <span className="absolute inset-0 rounded-2xl animate-ping bg-gold-400/30 pointer-events-none" />
                )}
            </motion.button>
        </div>
    );
}
