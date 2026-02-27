'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Star, Clock, Calendar, MapPin, ArrowRight, SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';
import { destinations } from '@/data';
import { formatPrice, filterDestinations } from '@/lib/utils';

const categories = [
    { id: 'all', label: 'All' },
    { id: 'beach', label: 'Beach' },
    { id: 'cruise', label: 'Cruise' },
    { id: 'family', label: 'Family' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'honeymoon', label: 'Honeymoon' },
    { id: 'international', label: 'International' },
    { id: 'domestic', label: 'Domestic' },
];

const continents = ['all', 'Asia', 'Europe', 'Middle East', 'Indian Ocean'];
const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
];

export function DestinationsPageContent() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [continent, setContinent] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [visibleCount, setVisibleCount] = useState(8);

    let filtered = filterDestinations(destinations, { category, search, continent });

    if (sortBy === 'price-low') filtered.sort((a, b) => a.priceINR - b.priceINR);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.priceINR - a.priceINR);
    else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    return (
        <main className="pt-[var(--header-height)]">
            {/* Hero */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/30 via-midnight to-midnight" />
                <div className="container-wide relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-10">
                        <h1 className="text-5xl font-display font-bold text-heading mb-3">
                            Explore <span className="gradient-text-ocean">destinations</span>
                        </h1>
                        <p className="text-white/60 text-lg">85+ handpicked destinations across 5 continents</p>
                    </motion.div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="glass border border-white/10 rounded-2xl flex items-center gap-3 px-5 py-3">
                            <Search className="w-5 h-5 text-white/40" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search destinations, countries..."
                                className="bg-transparent text-white placeholder-white/30 outline-none w-full text-sm"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="text-xs text-white/40 hover:text-white/70">Clear</button>
                            )}
                        </div>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                            {categories.map(cat => (
                                <button key={cat.id} onClick={() => setCategory(cat.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all ${category === cat.id ? 'bg-gold-500 text-midnight font-semibold' : 'glass border border-white/10 text-white/60 hover:text-white'}`}>
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-3">
                            <select value={continent} onChange={e => setContinent(e.target.value)} className="input-premium text-xs py-2 px-3 rounded-xl w-auto">
                                {continents.map(c => <option key={c} value={c} className="bg-midnight">{c === 'all' ? 'All Regions' : c}</option>)}
                            </select>
                            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-premium text-xs py-2 px-3 rounded-xl w-auto">
                                {sortOptions.map(s => <option key={s.value} value={s.value} className="bg-midnight">{s.label}</option>)}
                            </select>
                            <div className="flex glass border border-white/10 rounded-xl overflow-hidden">
                                <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40'}`}><Grid3X3 className="w-4 h-4" /></button>
                                <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40'}`}><List className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-white/40 mb-6">Showing {visible.length} of {filtered.length} destinations</p>
                </div>
            </section>

            {/* Results */}
            <section className="pb-20">
                <div className="container-wide">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-4xl mb-3">🗺️</p>
                            <p className="text-white/60 text-lg mb-2">No destinations found</p>
                            <p className="text-white/40 text-sm">Try adjusting your filters or search term</p>
                            <button onClick={() => { setSearch(''); setCategory('all'); setContinent('all'); }} className="btn-secondary text-xs mt-4">Clear Filters</button>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {visible.map((dest, i) => (
                                <motion.div key={dest.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                                    <Link href={`/destinations/${dest.id}`} className="group block card-premium overflow-hidden">
                                        <div className="aspect-[3/4] relative overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent" />
                                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-midnight/60 backdrop-blur-sm rounded-full px-2 py-1">
                                                <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                                                <span className="text-xs font-semibold text-white">{dest.rating}</span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <p className="text-xs text-white/50 flex items-center gap-1 mb-1"><MapPin className="w-3 h-3" />{dest.country}</p>
                                                <h3 className="text-lg font-display font-bold text-white">{dest.name}</h3>
                                                <p className="text-xs text-white/50 italic mb-2">{dest.tagline}</p>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-xs text-white/40">from </span>
                                                        <span className="text-base font-bold gradient-text-gold">{formatPrice(dest.priceINR)}</span>
                                                    </div>
                                                    <span className="text-xs text-white/40 flex items-center gap-1"><Clock className="w-3 h-3" />{dest.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {visible.map((dest, i) => (
                                <motion.div key={dest.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                                    <Link href={`/destinations/${dest.id}`} className="group flex items-center gap-5 card-premium p-3 overflow-hidden">
                                        <div className="w-40 h-28 rounded-2xl overflow-hidden flex-shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-base font-display font-bold text-white">{dest.name}</h3>
                                                <span className="text-xs text-white/40">- {dest.country}</span>
                                            </div>
                                            <p className="text-xs text-white/50 mb-2 line-clamp-1">{dest.description}</p>
                                            <div className="flex items-center gap-4 text-xs text-white/40">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{dest.duration}</span>
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{dest.bestSeason}</span>
                                                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-gold-400 fill-gold-400" />{dest.rating}</span>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <span className="text-xs text-white/40">from</span>
                                            <p className="text-lg font-bold gradient-text-gold">{formatPrice(dest.priceINR)}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {hasMore && (
                        <div className="text-center mt-10">
                            <button onClick={() => setVisibleCount(c => c + 8)} className="btn-secondary text-sm">
                                Load More Destinations
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
