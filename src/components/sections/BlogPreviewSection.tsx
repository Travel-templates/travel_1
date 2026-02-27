'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '@/data';

const categoryColors: Record<string, string> = {
    'Travel Tips': '#0ea5e9',
    'Honeymoon': '#ec4899',
    'Cruise': '#14b8a6',
    'Visa & Travel': '#f59e0b',
    'Destination': '#8b5cf6',
    'Luxury Travel': '#d97706',
};

export function BlogPreviewSection() {
    const featured = blogPosts[0];
    const remaining = blogPosts.slice(1, 6);

    return (
        <section className="section-padding">
            <div className="container-wide">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 chip-gold rounded-full mb-3">
                            <span className="text-xs font-semibold tracking-widest uppercase">Travel Insights</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-display font-bold text-heading">
                            Stories & <span className="gradient-text-gold">guides</span>
                        </h2>
                    </div>
                    <Link href="/blog" className="btn-secondary flex-shrink-0 text-sm">
                        View All Posts
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Featured Post */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden glass border border-white/8 mb-6 cursor-pointer hover:border-white/15 transition-all"
                >
                    <Link href={`/blog/${featured.id}`} className="block relative aspect-video lg:aspect-auto">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={featured.image}
                            alt={featured.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-midnight/30 lg:block hidden" />
                    </Link>
                    <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <span
                                className="chip text-xs px-3 py-1 rounded-full font-semibold"
                                style={{ color: categoryColors[featured.category], borderColor: categoryColors[featured.category] + '40', background: categoryColors[featured.category] + '15' }}
                            >
                                {featured.category}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-white/40">
                                <Clock className="w-3 h-3" />
                                {featured.readTime}
                            </div>
                        </div>

                        <Link href={`/blog/${featured.id}`}>
                            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 leading-tight hover:text-gold-400 transition-colors">
                                {featured.title}
                            </h3>
                        </Link>
                        <p className="text-white/60 text-base leading-relaxed mb-6">{featured.excerpt}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-ocean-900/50 border border-ocean-700/30 flex items-center justify-center">
                                    <span className="text-xs font-bold text-ocean-400">{featured.author.charAt(0)}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{featured.author}</p>
                                    <p className="text-xs text-white/40">{featured.date}</p>
                                </div>
                            </div>
                            <Link href={`/blog/${featured.id}`} className="btn-ghost text-sm flex items-center gap-1">
                                Read Article <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Remaining Articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {remaining.map((post, i) => (
                        <motion.div
                            key={post.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="group glass border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all cursor-pointer"
                        >
                            <Link href={`/blog/${post.id}`}>
                                <div className="aspect-[3/2] overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-1 mb-2">
                                        <Tag className="w-3 h-3" style={{ color: categoryColors[post.category] }} />
                                        <span className="text-xs font-semibold" style={{ color: categoryColors[post.category] }}>
                                            {post.category}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-display font-bold text-white leading-tight mb-2 group-hover:text-gold-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <div className="flex items-center gap-1 text-xs text-white/40">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
