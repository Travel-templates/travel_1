'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Search, Tag } from 'lucide-react';
import { blogPosts } from '@/data';

const categoryColors: Record<string, string> = {
    'Travel Tips': '#0ea5e9',
    Honeymoon: '#ec4899',
    Cruise: '#14b8a6',
    'Visa & Travel': '#f59e0b',
    Destination: '#8b5cf6',
    'Luxury Travel': '#d97706',
};

const categories = ['all', ...Array.from(new Set(blogPosts.map((post) => post.category)))];

export function BlogPageContent() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return [...blogPosts]
            .filter((post) => activeCategory === 'all' || post.category === activeCategory)
            .filter((post) => {
                if (!query) return true;
                return (
                    post.title.toLowerCase().includes(query) ||
                    post.excerpt.toLowerCase().includes(query) ||
                    post.author.toLowerCase().includes(query)
                );
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [activeCategory, search]);

    const featuredPost = filteredPosts[0];
    const remainingPosts = filteredPosts.slice(1);

    return (
        <main className="pt-[var(--header-height)]">
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/30 via-midnight to-midnight" />
                <div className="container-wide relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10"
                    >
                        <div className="chip-gold mb-4 inline-flex items-center gap-2 rounded-full">
                            <span className="text-xs font-semibold tracking-widest uppercase">Travel Journal</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-display font-bold text-heading mb-4">
                            Stories, tips, and <span className="gradient-text-gold">travel know-how</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Guides from WanderLux experts to help you plan better trips, avoid common mistakes, and
                            travel smarter.
                        </p>
                    </motion.div>

                    <div className="max-w-2xl mx-auto mb-6">
                        <div className="glass border border-white/10 rounded-2xl flex items-center gap-3 px-5 py-3">
                            <Search className="w-5 h-5 text-white/40" />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search articles or authors..."
                                className="bg-transparent text-white placeholder-white/30 outline-none w-full text-sm"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="text-xs text-white/40 hover:text-white/70"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${activeCategory === category
                                    ? 'bg-gold-500 text-midnight font-semibold'
                                    : 'glass border border-white/10 text-white/60 hover:text-white'
                                    }`}
                            >
                                {category === 'all' ? 'All Articles' : category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="container-wide">
                    {featuredPost ? (
                        <>
                            <motion.article
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="group grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden glass border border-white/10 mb-8 hover:border-white/20 transition-all"
                            >
                                <Link
                                    href={`/blog/${featuredPost.id}`}
                                    className="block relative aspect-video lg:aspect-auto overflow-hidden"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-midnight/35 lg:block hidden" />
                                </Link>

                                <div className="p-7 sm:p-8 flex flex-col justify-center">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span
                                            className="chip text-xs px-3 py-1 rounded-full font-semibold"
                                            style={{
                                                color: categoryColors[featuredPost.category] ?? '#38bdf8',
                                                borderColor: `${categoryColors[featuredPost.category] ?? '#38bdf8'}40`,
                                                background: `${categoryColors[featuredPost.category] ?? '#38bdf8'}15`,
                                            }}
                                        >
                                            {featuredPost.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-white/45">
                                            <Clock className="w-3 h-3" />
                                            {featuredPost.readTime}
                                        </span>
                                        <span className="text-xs text-white/35">{featuredPost.date}</span>
                                    </div>

                                    <Link href={`/blog/${featuredPost.id}`}>
                                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 leading-tight hover:text-gold-400 transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                    </Link>
                                    <p className="text-white/60 leading-relaxed mb-6">{featuredPost.excerpt}</p>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-9 h-9 rounded-full bg-ocean-900/50 border border-ocean-700/30 flex items-center justify-center">
                                                <span className="text-xs font-bold text-ocean-400">
                                                    {featuredPost.author.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{featuredPost.author}</p>
                                                <p className="text-xs text-white/40">{featuredPost.authorRole}</p>
                                            </div>
                                        </div>
                                        <Link href={`/blog/${featuredPost.id}`} className="btn-ghost text-sm">
                                            Read Article
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {remainingPosts.map((post, index) => (
                                    <motion.article
                                        key={post.id}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.45, delay: index * 0.05 }}
                                        className="group card-premium overflow-hidden"
                                    >
                                        <Link href={`/blog/${post.id}`} className="block">
                                            <div className="aspect-[16/10] overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center gap-1.5 mb-2">
                                                    <Tag
                                                        className="w-3 h-3"
                                                        style={{ color: categoryColors[post.category] ?? '#38bdf8' }}
                                                    />
                                                    <span
                                                        className="text-xs font-semibold"
                                                        style={{ color: categoryColors[post.category] ?? '#38bdf8' }}
                                                    >
                                                        {post.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-display font-bold text-white leading-tight mb-2 line-clamp-2 group-hover:text-gold-400 transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-white/50 line-clamp-2 mb-4">{post.excerpt}</p>
                                                <div className="flex items-center justify-between text-xs text-white/40">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {post.readTime}
                                                    </span>
                                                    <span>{post.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="glass border border-white/10 rounded-3xl p-10 text-center">
                            <p className="text-lg text-white/75 mb-2">No articles found for your filters.</p>
                            <p className="text-sm text-white/45 mb-6">Try a different search term or reset category.</p>
                            <button
                                onClick={() => {
                                    setSearch('');
                                    setActiveCategory('all');
                                }}
                                className="btn-secondary text-sm"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="pb-20">
                <div className="container-narrow text-center">
                    <h2 className="text-3xl font-display font-bold text-heading mb-3">
                        Need help planning your next trip?
                    </h2>
                    <p className="text-white/60 mb-7">
                        Talk to a WanderLux expert and get a hand-crafted itinerary tailored to your travel style.
                    </p>
                    <Link href="/contact" className="btn-primary text-sm">
                        Plan My Trip
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
