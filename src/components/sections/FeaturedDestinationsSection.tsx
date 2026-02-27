'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, ArrowRight, MapPin } from 'lucide-react';
import { destinations } from '@/data';
import { formatPrice } from '@/lib/utils';

const categories = [
    { id: 'all', label: 'All', emoji: '🌍' },
    { id: 'beach', label: 'Beach', emoji: '🏖️' },
    { id: 'cruise', label: 'Cruise', emoji: '🚢' },
    { id: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
    { id: 'luxury', label: 'Luxury', emoji: '✨' },
    { id: 'adventure', label: 'Adventure', emoji: '🏔️' },
    { id: 'honeymoon', label: 'Honeymoon', emoji: '💑' },
    { id: 'international', label: 'International', emoji: '✈️' },
    { id: 'domestic', label: 'Domestic', emoji: '🇮🇳' },
];

function DestinationCard({ dest, index, currency }: { dest: typeof destinations[0]; index: number; currency: 'INR' | 'USD' }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 } },
            }}
            className="group relative rounded-3xl overflow-hidden cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <Link href={`/destinations/${dest.id}`}>
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-midnight/30 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                        <div className="flex flex-wrap gap-2">
                            {dest.category.slice(0, 2).map((cat) => (
                                <span key={cat} className="chip text-xs px-2.5 py-1 capitalize">{cat}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 bg-midnight/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                            <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                            <span className="text-xs font-semibold text-white">{dest.rating}</span>
                        </div>
                    </div>

                    {/* Content appears at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1">
                            <MapPin className="w-3 h-3" />
                            {dest.country}
                        </div>
                        <h3 className="text-xl font-display font-bold text-white mb-0.5">{dest.name}</h3>
                        <p className="text-white/60 text-xs italic mb-3">{dest.tagline}</p>

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-xs text-white/50 mb-4">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {dest.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {dest.bestSeason.split(' – ')[0]}
                            </span>
                        </div>

                        {/* Price + CTA */}
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-white/40">Starting from</span>
                                <p className="text-lg font-display font-bold gradient-text-gold leading-none">
                                    {formatPrice(dest.priceINR, currency, dest.priceUSD)}
                                </p>
                                <span className="text-xs text-white/40">per person</span>
                            </div>
                            <motion.div
                                animate={{ x: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
                                className="btn-primary text-xs px-4 py-2 rounded-xl"
                            >
                                Explore
                                <ArrowRight className="w-3 h-3" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export function FeaturedDestinationsSection({ currency = 'INR' }: { currency?: 'INR' | 'USD' }) {
    const [activeCategory, setActiveCategory] = useState('all');

    const filtered = activeCategory === 'all'
        ? destinations
        : destinations.filter(d => d.category.includes(activeCategory));

    return (
        <section className="section-padding">
            <div className="container-wide">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 chip-gold rounded-full mb-4">
                        <span className="text-xs font-semibold tracking-widest uppercase">Featured Destinations</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4 text-heading">
                        Where will you <span className="gradient-text-ocean">go next?</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-xl mx-auto">
                        85+ handpicked destinations across 5 continents — each with a story waiting to be told.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-10 pb-2"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`group flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0 ${activeCategory === cat.id
                                    ? 'btn-primary text-midnight shadow-glow-gold'
                                    : 'glass border border-white/10 text-white/60 hover:text-white hover:border-white/20'
                                }`}
                        >
                            <span>{cat.emoji}</span>
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Results count */}
                <motion.p
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-white/40 mb-6"
                >
                    Showing {filtered.length} destination{filtered.length !== 1 ? 's' : ''}
                    {activeCategory !== 'all' ? ` for "${categories.find(c => c.id === activeCategory)?.label}"` : ''}
                </motion.p>

                {/* Destination Grid */}
                {filtered.length > 0 ? (
                    <motion.div
                        key={activeCategory}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.08 } },
                        }}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                    >
                        {filtered.map((dest, i) => (
                            <DestinationCard key={dest.id} dest={dest} index={i} currency={currency} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">🗺️</p>
                        <p className="text-white/60 text-lg">No destinations found for this category.</p>
                    </div>
                )}

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <Link href="/destinations" className="btn-secondary text-sm gap-2">
                        View All Destinations
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
