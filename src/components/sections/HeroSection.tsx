'use client';
import { useRef, useState, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users, ChevronDown, ArrowRight, Play } from 'lucide-react';

// Lazy load 3D Globe to not block initial render
const GlobeScene = lazy(() => import('@/components/3d/GlobeScene'));

const destinationSuggestions = ['Bali, Indonesia', 'Maldives', 'Dubai, UAE', 'Switzerland', 'Kashmir, India', 'Thailand', 'Goa', 'Singapore'];
const travelTypes = ['All Inclusive', 'Honeymoon', 'Family', 'Adventure', 'Cruise', 'Group Tour'];

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    const [destination, setDestination] = useState('');
    const [travelers, setTravelers] = useState('2');
    const [travelType, setTravelType] = useState('All Inclusive');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredSuggestions = destination
        ? destinationSuggestions.filter(d => d.toLowerCase().includes(destination.toLowerCase()))
        : destinationSuggestions;

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-end pb-20 overflow-hidden">
            {/* Parallax Background */}
            <motion.div className="absolute inset-0 z-0" style={{ scale, y }}>
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
                    }}
                />
                {/* Dark overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-midnight/20 to-midnight" />
                <div className="absolute inset-0 bg-gradient-to-r from-midnight/70 via-transparent to-midnight/30" />
            </motion.div>

            {/* Particle Effects */}
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white/30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `particleFloat ${4 + Math.random() * 8}s ease-in-out ${Math.random() * 4}s infinite alternate`,
                        }}
                    />
                ))}
                {/* Light orbs */}
                <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-ocean-500/10 blur-3xl animate-float-slow" />
                <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gold-400/8 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
            </div>

            {/* 3D Globe (right side) */}
            <div className="absolute inset-y-0 right-0 w-[55%] z-[2] hidden lg:flex items-center justify-center pointer-events-none">
                <Suspense fallback={null}>
                    <div className="w-[500px] h-[500px] opacity-60">
                        <GlobeScene />
                    </div>
                </Suspense>
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 container-wide"
                style={{ opacity }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="max-w-2xl"
                >
                    {/* Tagline chip */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="inline-flex items-center gap-2 chip-gold rounded-full mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                        <span className="text-xs font-semibold tracking-widest uppercase">Luxury Travel Redefined</span>
                    </motion.div>

                    {/* Hero Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6 tracking-tight">
                        <span className="block text-white">Craft journeys</span>
                        <span className="block gradient-text-gold">that feel</span>
                        <span className="block text-white">unforgettable.</span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
                    >
                        From ocean cruises to mountain retreats — every itinerary is crafted with care, delivered with expertise, and designed to feel effortless.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.75 }}
                        className="flex flex-wrap items-center gap-3 mb-12"
                    >
                        <Link href="/destinations" className="btn-primary text-sm px-7 py-3.5">
                            Explore Destinations
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/packages" className="btn-secondary text-sm px-7 py-3.5">
                            View Packages
                        </Link>
                        <button className="btn-ghost text-sm flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Play className="w-3 h-3 ml-0.5" />
                            </div>
                            Watch our Story
                        </button>
                    </motion.div>
                </motion.div>

                {/* Search Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="glass border border-white/10 rounded-2xl p-2 max-w-4xl shadow-2xl"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {/* Destination */}
                        <div className="relative">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-0.5">Where to?</p>
                                    <input
                                        type="text"
                                        value={destination}
                                        onChange={(e) => { setDestination(e.target.value); setShowSuggestions(true); }}
                                        onFocus={() => setShowSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                        placeholder="Search destinations..."
                                        className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full font-medium"
                                    />
                                </div>
                            </div>
                            <AnimatePresence>
                                {showSuggestions && filteredSuggestions.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        className="absolute top-full left-0 right-0 mt-2 glass border border-white/10 rounded-xl p-2 z-50 shadow-2xl"
                                    >
                                        {filteredSuggestions.slice(0, 5).map((s) => (
                                            <button
                                                key={s}
                                                onMouseDown={() => { setDestination(s); setShowSuggestions(false); }}
                                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/8 rounded-lg transition-all text-left"
                                            >
                                                <MapPin className="w-3 h-3 text-gold-400" />
                                                {s}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                            <Calendar className="w-4 h-4 text-ocean-400 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-0.5">Travel Dates</p>
                                <input
                                    type="text"
                                    placeholder="Select dates"
                                    onFocus={(e) => (e.target.type = 'date')}
                                    onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                                    className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full font-medium"
                                />
                            </div>
                        </div>

                        {/* Travelers */}
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                            <Users className="w-4 h-4 text-teal-400 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-0.5">Travelers</p>
                                <select
                                    value={travelers}
                                    onChange={(e) => setTravelers(e.target.value)}
                                    className="bg-transparent text-sm text-white outline-none w-full font-medium appearance-none cursor-pointer"
                                >
                                    {[1, 2, 3, 4, 5, 6, '6+'].map(n => (
                                        <option key={n} value={n} className="bg-midnight">{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex items-stretch">
                            <Link
                                href={`/packages?destination=${encodeURIComponent(destination)}&travelers=${travelers}`}
                                className="btn-primary w-full rounded-xl text-sm font-semibold justify-center"
                            >
                                <Search className="w-4 h-4" />
                                Search Trips
                            </Link>
                        </div>
                    </div>

                    {/* Travel Type Chips */}
                    <div className="flex items-center gap-2 px-2 pt-2 pb-1 overflow-x-auto scrollbar-hide">
                        {travelTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setTravelType(type)}
                                className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full font-medium transition-all ${travelType === type
                                        ? 'bg-gold-500/20 text-gold-300 border border-gold-400/30'
                                        : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-white/40 tracking-widest uppercase font-medium">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5"
                >
                    <div className="w-1 h-2.5 rounded-full bg-gold-400" />
                </motion.div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-0 left-0 right-0 z-10"
            >
                <div className="container-wide">
                    <div className="flex items-center justify-start gap-8 py-4 border-t border-white/5">
                        {[
                            { value: '25,000+', label: 'Trips Planned' },
                            { value: '85+', label: 'Destinations' },
                            { value: '98%', label: 'Satisfaction' },
                            { value: '15 Yrs', label: 'Experience' },
                        ].map((stat) => (
                            <div key={stat.label} className="hidden sm:block">
                                <p className="text-lg font-display font-bold gradient-text-gold leading-none">{stat.value}</p>
                                <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
