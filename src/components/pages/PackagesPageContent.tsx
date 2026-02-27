'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Check, ChevronDown, Clock, Search, SlidersHorizontal, Star } from 'lucide-react';
import { packages } from '@/data';
import { formatPrice } from '@/lib/utils';

type PackageItem = (typeof packages)[number];

const categoryOptions = [
    { id: 'all', label: 'All' },
    { id: 'honeymoon', label: 'Honeymoon' },
    { id: 'family', label: 'Family' },
    { id: 'group', label: 'Group Tours' },
    { id: 'cruise', label: 'Cruises' },
    { id: 'international', label: 'International' },
    { id: 'weekend', label: 'Weekend' },
];

const durationOptions = [
    { id: 'all', label: 'Any Duration' },
    { id: 'short', label: 'Up to 5 days' },
    { id: 'week', label: '6 to 8 days' },
    { id: 'long', label: '9+ days' },
];

const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
];

const maxAvailablePrice = Math.max(...packages.map((pkg) => pkg.priceINR));
const maxBudgetLimit = Math.ceil(maxAvailablePrice / 10000) * 10000;

function getTotalNights(duration: string): number {
    const parsed = Number.parseInt(duration, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}

function matchesDuration(pkg: PackageItem, duration: string): boolean {
    const nights = getTotalNights(pkg.duration);
    if (duration === 'short') return nights <= 5;
    if (duration === 'week') return nights > 5 && nights <= 8;
    if (duration === 'long') return nights > 8;
    return true;
}

export function PackagesPageContent() {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [duration, setDuration] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [maxBudget, setMaxBudget] = useState(maxBudgetLimit);
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        const categoryFromQuery = searchParams.get('category');
        if (categoryFromQuery && categoryOptions.some((item) => item.id === categoryFromQuery)) {
            setCategory(categoryFromQuery);
            return;
        }
        if (!categoryFromQuery) {
            setCategory('all');
        }
    }, [searchParams]);

    useEffect(() => {
        setVisibleCount(6);
    }, [search, category, duration, sortBy, maxBudget]);

    const filteredPackages = useMemo(() => {
        const query = search.trim().toLowerCase();

        const scoped = packages.filter((pkg) => {
            const matchesCategory = category === 'all' || pkg.category === category;
            const matchesSearch =
                !query ||
                pkg.title.toLowerCase().includes(query) ||
                pkg.destination.toLowerCase().includes(query) ||
                pkg.overview.toLowerCase().includes(query);
            const matchesBudget = pkg.priceINR <= maxBudget;
            const matchesStay = duration === 'all' || matchesDuration(pkg, duration);
            return matchesCategory && matchesSearch && matchesBudget && matchesStay;
        });

        if (sortBy === 'price-low') {
            return scoped.sort((a, b) => a.priceINR - b.priceINR);
        }
        if (sortBy === 'price-high') {
            return scoped.sort((a, b) => b.priceINR - a.priceINR);
        }
        if (sortBy === 'rating') {
            return scoped.sort((a, b) => b.rating - a.rating);
        }
        return scoped.sort((a, b) => b.reviews - a.reviews);
    }, [category, duration, maxBudget, search, sortBy]);

    const visiblePackages = filteredPackages.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPackages.length;

    return (
        <main className="pt-[var(--header-height)]">
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-teal-950/30 via-midnight to-midnight" />
                <div className="container-wide relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10"
                    >
                        <div className="chip-gold mb-4 inline-flex items-center gap-2 rounded-full">
                            <span className="text-xs font-semibold tracking-widest uppercase">Signature Packages</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-display font-bold text-heading mb-4">
                            Handpicked trips for <span className="gradient-text-gold">every traveler</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Explore curated experiences across honeymoon, family, group, and cruise journeys.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mb-6">
                        <div className="xl:col-span-5">
                            <div className="glass border border-white/10 rounded-2xl flex items-center gap-3 px-5 py-3">
                                <Search className="w-5 h-5 text-white/40" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search package or destination..."
                                    className="bg-transparent text-white placeholder-white/30 outline-none w-full text-sm"
                                />
                            </div>
                        </div>

                        <div className="xl:col-span-7">
                            <div className="glass border border-white/10 rounded-2xl px-4 py-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-xs text-white/45 flex items-center gap-1">
                                        <SlidersHorizontal className="w-3.5 h-3.5" />
                                        Filters
                                    </span>

                                    <select
                                        value={duration}
                                        onChange={(event) => setDuration(event.target.value)}
                                        className="input-premium text-xs py-2 px-3 rounded-xl w-auto"
                                    >
                                        {durationOptions.map((option) => (
                                            <option key={option.id} value={option.id} className="bg-midnight">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={sortBy}
                                        onChange={(event) => setSortBy(event.target.value)}
                                        className="input-premium text-xs py-2 px-3 rounded-xl w-auto"
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value} className="bg-midnight">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="flex items-center gap-2 ml-auto min-w-[200px]">
                                        <span className="text-xs text-white/40 whitespace-nowrap">Budget</span>
                                        <input
                                            type="range"
                                            min={20000}
                                            max={maxBudgetLimit}
                                            step={5000}
                                            value={maxBudget}
                                            onChange={(event) => setMaxBudget(Number(event.target.value))}
                                            className="w-full accent-gold-400"
                                        />
                                        <span className="text-xs text-gold-400 font-semibold whitespace-nowrap">
                                            {formatPrice(maxBudget)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {categoryOptions.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setCategory(item.id)}
                                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${category === item.id
                                    ? 'bg-gold-500 text-midnight font-semibold'
                                    : 'glass border border-white/10 text-white/60 hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <p className="text-xs text-white/40 mt-4">
                        Showing {Math.min(visibleCount, filteredPackages.length)} of {filteredPackages.length} packages
                    </p>
                </div>
            </section>

            <section className="pb-20">
                <div className="container-wide">
                    {filteredPackages.length === 0 ? (
                        <div className="glass border border-white/10 rounded-3xl p-10 text-center">
                            <p className="text-lg text-white/75 mb-2">No packages found with these filters.</p>
                            <p className="text-sm text-white/45 mb-6">
                                Try widening your budget or resetting category and duration filters.
                            </p>
                            <button
                                onClick={() => {
                                    setSearch('');
                                    setCategory('all');
                                    setDuration('all');
                                    setSortBy('popular');
                                    setMaxBudget(maxBudgetLimit);
                                }}
                                className="btn-secondary text-sm"
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {visiblePackages.map((pkg, index) => (
                                    <motion.article
                                        key={pkg.id}
                                        initial={{ opacity: 0, y: 28 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.45, delay: index * 0.06 }}
                                        className="group card-premium overflow-hidden"
                                    >
                                        <Link href={`/packages/${pkg.id}`} className="block">
                                            <div className="relative aspect-[16/10] overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={pkg.image}
                                                    alt={pkg.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-midnight-card/95 to-transparent" />
                                                {pkg.tag && (
                                                    <div className="absolute top-4 left-4 chip-gold text-xs px-3 py-1.5 font-semibold">
                                                        {pkg.tag}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-5">
                                                <div className="text-xs text-ocean-400 font-semibold uppercase tracking-wider mb-1">
                                                    {pkg.destination}
                                                </div>
                                                <h3 className="text-lg font-display font-bold text-white mb-2 leading-tight group-hover:text-gold-400 transition-colors">
                                                    {pkg.title}
                                                </h3>
                                                <p className="text-sm text-white/50 line-clamp-2 mb-4">{pkg.overview}</p>

                                                <div className="flex items-center gap-4 text-xs text-white/45 mb-4">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {pkg.duration}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        Fixed departures
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                                                        {pkg.rating}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {pkg.inclusions.slice(0, 4).map((inclusion) => (
                                                        <span
                                                            key={inclusion}
                                                            className="flex items-center gap-1 text-[11px] text-teal-300 bg-teal-900/20 border border-teal-800/30 px-2 py-1 rounded-lg"
                                                        >
                                                            <Check className="w-2.5 h-2.5" />
                                                            {inclusion.split(' ')[0]}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="divider-glow mb-4" />

                                                <div className="flex items-end justify-between gap-4">
                                                    <div>
                                                        <span className="text-xs text-white/35 block">Starting from</span>
                                                        <span className="text-xl font-display font-bold gradient-text-gold">
                                                            {formatPrice(pkg.priceINR)}
                                                        </span>
                                                        <span className="text-xs text-white/35 block">per person</span>
                                                    </div>

                                                    <span className="btn-primary text-xs px-4 py-2 rounded-xl">
                                                        View Itinerary
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>

                            {hasMore && (
                                <div className="text-center mt-10">
                                    <button
                                        onClick={() => setVisibleCount((count) => count + 6)}
                                        className="btn-secondary text-sm"
                                    >
                                        Load More Packages
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <section className="pb-20">
                <div className="container-narrow text-center">
                    <h2 className="text-3xl font-display font-bold text-heading mb-3">
                        Need a custom itinerary instead?
                    </h2>
                    <p className="text-white/60 mb-7">
                        Share your dates and travel style, and our experts will build a tailored plan.
                    </p>
                    <Link href="/contact" className="btn-primary text-sm">
                        Talk to an Expert
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
