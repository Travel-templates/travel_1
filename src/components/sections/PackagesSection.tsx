'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Clock, Users, ArrowRight, Heart, Check, Hotel, Utensils, Car, Camera } from 'lucide-react';
import { packages } from '@/data';
import { formatPrice } from '@/lib/utils';

const categories = [
    { id: 'honeymoon', label: 'Honeymoon' },
    { id: 'family', label: 'Family' },
    { id: 'group', label: 'Group Tours' },
    { id: 'cruise', label: 'Cruises' },
    { id: 'international', label: 'International' },
    { id: 'weekend', label: 'Weekend' },
];

const inclusionIcons: Record<string, React.FC<{ className?: string }>> = {
    Hotel: Hotel,
    Meals: Utensils,
    Transfer: Car,
    Tour: Camera,
};

function PackageCard({ pkg, index, currency }: { pkg: typeof packages[0]; index: number; currency: 'INR' | 'USD' }) {
    const [wished, setWished] = useState(false);
    const [compared, setCompared] = useState(false);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 } },
            }}
            className="group card-premium overflow-hidden relative"
        >
            {/* Image Header */}
            <div className="relative aspect-[16/9] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-card/90 to-transparent" />

                {/* Tag */}
                {pkg.tag && (
                    <div className="absolute top-4 left-4 chip-gold text-xs px-3 py-1.5 font-semibold">{pkg.tag}</div>
                )}

                {/* Wishlist */}
                <button
                    onClick={() => setWished(!wished)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-midnight/50 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
                    aria-label="Wishlist"
                >
                    <Heart className={`w-4 h-4 transition-colors ${wished ? 'fill-red-400 text-red-400' : 'text-white/60'}`} />
                </button>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(pkg.rating) ? 'fill-gold-400 text-gold-400' : 'text-white/20'}`} />
                        ))}
                    </div>
                    <span className="text-xs text-white/70 font-medium">{pkg.rating} ({pkg.reviews})</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="text-xs text-ocean-400 font-semibold uppercase tracking-wider mb-1">{pkg.destination}</div>
                <h3 className="text-lg font-display font-bold text-white mb-2 leading-tight">{pkg.title}</h3>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pkg.duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Any group size
                    </span>
                </div>

                {/* Inclusions */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.inclusions.slice(0, 4).map((inc) => (
                        <span key={inc} className="flex items-center gap-1 text-xs text-teal-400 bg-teal-900/20 border border-teal-800/30 px-2 py-1 rounded-lg">
                            <Check className="w-2.5 h-2.5" />
                            {inc.split(' ')[0]}
                        </span>
                    ))}
                    {pkg.inclusions.length > 4 && (
                        <span className="text-xs text-white/40 px-2 py-1">+{pkg.inclusions.length - 4} more</span>
                    )}
                </div>

                {/* Divider */}
                <div className="divider-glow mb-4" />

                {/* Price + Actions */}
                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-xs text-white/40 block">Starting from</span>
                        <span className="text-xl font-display font-bold gradient-text-gold leading-none">
                            {formatPrice(pkg.priceINR, currency, pkg.priceUSD)}
                        </span>
                        <span className="text-xs text-white/40 block">per person</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Link
                            href={`/packages/${pkg.id}`}
                            className="btn-primary text-xs px-4 py-2 rounded-xl"
                        >
                            View Itinerary
                        </Link>
                        <button
                            onClick={() => setCompared(!compared)}
                            className={`text-xs px-4 py-1.5 rounded-xl border transition-all ${compared ? 'border-ocean-400/50 text-ocean-400 bg-ocean-900/20' : 'border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
                                }`}
                        >
                            {compared ? '✓ Comparing' : 'Compare'}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function PackagesSection({ currency = 'INR' }: { currency?: 'INR' | 'USD' }) {
    const [activeCategory, setActiveCategory] = useState('honeymoon');

    const filtered = packages.filter(p => p.category === activeCategory);

    return (
        <section className="section-padding bg-midnight-light/50">
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
                        <span className="text-xs font-semibold tracking-widest uppercase">Signature Packages</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4 text-heading">
                        Curated for every <span className="gradient-text-gold">kind of traveler</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-xl mx-auto">
                        From romantic escapes to family adventures — every package is thoughtfully assembled by our expert curators.
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center gap-2 flex-wrap mb-10"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.id
                                    ? 'bg-gold-500 text-midnight font-semibold shadow-glow-gold'
                                    : 'glass border border-white/10 text-white/60 hover:text-white hover:border-white/20'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Package Grid */}
                <motion.div
                    key={activeCategory}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filtered.map((pkg, i) => (
                        <PackageCard key={pkg.id} pkg={pkg} index={i} currency={currency} />
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-3 text-center py-12 text-white/40">
                            No packages in this category yet.
                        </div>
                    )}
                </motion.div>

                {/* View All */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <Link href="/packages" className="btn-ocean text-sm">
                        View All Packages
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
