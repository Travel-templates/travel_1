'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, Phone } from 'lucide-react';

const navLinks = [
    {
        label: 'Destinations',
        href: '/destinations',
        submenu: [
            { label: 'Bali', href: '/destinations/bali' },
            { label: 'Maldives', href: '/destinations/maldives' },
            { label: 'Dubai', href: '/destinations/dubai' },
            { label: 'Switzerland', href: '/destinations/switzerland' },
            { label: 'All Destinations', href: '/destinations' },
        ],
    },
    {
        label: 'Packages',
        href: '/packages',
        submenu: [
            { label: 'Honeymoon', href: '/packages?category=honeymoon' },
            { label: 'Family Tours', href: '/packages?category=family' },
            { label: 'Group Tours', href: '/packages?category=group' },
            { label: 'Cruises', href: '/packages?category=cruise' },
            { label: 'All Packages', href: '/packages' },
        ],
    },
    { label: 'Cruises', href: '/#cruises' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 60);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? 'glass border-b border-white/10 shadow-2xl'
                        : 'bg-transparent'
                    }`}
                style={{ height: 'var(--header-height)' }}
            >
                <div className="container-wide h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative w-9 h-9">
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold-500 to-gold-300 opacity-20 group-hover:opacity-30 transition-opacity" />
                            <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-midnight" />
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-display font-bold tracking-tight">
                                Wander<span className="gradient-text-gold">Lux</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div
                                key={link.label}
                                className="relative group"
                                onMouseEnter={() => link.submenu && setActiveSubmenu(link.label)}
                                onMouseLeave={() => setActiveSubmenu(null)}
                            >
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                                >
                                    {link.label}
                                    {link.submenu && (
                                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                                    )}
                                </Link>

                                {link.submenu && (
                                    <AnimatePresence>
                                        {activeSubmenu === link.label && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                                className="absolute top-full left-0 mt-2 w-52 glass rounded-2xl p-2 shadow-2xl border border-white/10"
                                            >
                                                {link.submenu.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/8 rounded-xl transition-all duration-200 font-medium"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Currency Toggle */}
                        <button
                            onClick={() => setCurrency(c => c === 'INR' ? 'USD' : 'INR')}
                            className="text-xs font-semibold text-white/60 hover:text-white/90 transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20"
                        >
                            {currency === 'INR' ? '₹ INR' : '$ USD'}
                        </button>

                        <a
                            href="tel:+919876543210"
                            className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            <span className="font-medium">+91 98765 43210</span>
                        </a>

                        <Link href="/contact" className="btn-primary text-xs px-5 py-2.5">
                            Plan My Trip
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-midnight/80 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed right-0 top-0 bottom-0 w-80 glass border-l border-white/10 z-50 lg:hidden overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <Link href="/" className="text-xl font-display font-bold">
                                        Wander<span className="gradient-text-gold">Lux</span>
                                    </Link>
                                    <button
                                        onClick={() => setMobileOpen(false)}
                                        className="p-2 rounded-xl hover:bg-white/8 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-1 mb-8">
                                    {navLinks.map((link) => (
                                        <div key={link.label}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="block px-4 py-3 text-base font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                                            >
                                                {link.label}
                                            </Link>
                                            {link.submenu && (
                                                <div className="pl-4 flex flex-col gap-0.5 mt-1 mb-2">
                                                    {link.submenu.map((item) => (
                                                        <Link
                                                            key={item.label}
                                                            href={item.href}
                                                            onClick={() => setMobileOpen(false)}
                                                            className="block px-4 py-2 text-sm text-white/50 hover:text-white/80 rounded-lg hover:bg-white/5 transition-all"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </nav>

                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/contact"
                                        onClick={() => setMobileOpen(false)}
                                        className="btn-primary text-center justify-center"
                                    >
                                        Plan My Trip
                                    </Link>
                                    <a
                                        href="tel:+919876543210"
                                        className="btn-secondary text-center justify-center"
                                    >
                                        <Phone className="w-4 h-4" />
                                        Call Us Now
                                    </a>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <button
                                        onClick={() => setCurrency(c => c === 'INR' ? 'USD' : 'INR')}
                                        className="text-sm text-white/50 hover:text-white/80 transition-colors"
                                    >
                                        Currency: {currency === 'INR' ? '₹ INR → Switch to USD' : '$ USD → Switch to INR'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
