'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Award, Heart, Globe, Zap } from 'lucide-react';
import { teamMembers } from '@/data';

const milestones = [
    { year: '2009', event: 'WanderLux Founded in Mumbai' },
    { year: '2012', event: 'Crossed 1,000 happy travelers' },
    { year: '2015', event: 'Launched luxury cruise division' },
    { year: '2018', event: 'IATA accreditation achieved' },
    { year: '2021', event: 'Digital-first rebrand & tech platform launch' },
    { year: '2024', event: '25,000+ trips and counting' },
];

const values = [
    { icon: Heart, title: 'Human-First', desc: 'Every trip is crafted with real human attention, not boilerplate templates.' },
    { icon: Globe, title: 'Ethically Local', desc: 'We partner with local guides and communities to make travel that gives back.' },
    { icon: Zap, title: 'Obsessively Curated', desc: 'We vet every hotel, route, and experience ourselves before recommending it.' },
    { icon: Award, title: 'Trusted by Thousands', desc: 'IATA-accredited, 5-star rated, and trusted by 25,000+ travelers since 2009.' },
];

export function AboutPageContent() {
    return (
        <main className="pt-[var(--header-height)]">
            {/* Hero */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/50 to-midnight" />
                </div>
                <div className="container-wide relative z-10 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="chip-gold mb-4 inline-flex items-center gap-2 rounded-full">
                            <span className="text-xs font-semibold tracking-widest uppercase">Our Story</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-display font-bold text-heading mb-4">
                            We believe travel<br /><span className="gradient-text-gold">changes everything</span>
                        </h1>
                        <p className="text-white/70 text-xl max-w-2xl leading-relaxed">
                            Founded in 2009 in Mumbai, WanderLux began with a simple conviction: that travel, planned thoughtfully, has the power to transform lives.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission / Vision */}
            <section className="section-padding bg-midnight-light/20">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-display font-bold mb-6 text-heading">
                                Luxury planning.<br />
                                <span className="gradient-text-ocean">Human support.</span><br />
                                Memorable journeys.
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed mb-6">
                                At WanderLux, we don't sell packages — we craft experiences. Every journey is designed from the ground up with your preferences, budget, and travel style at its heart.
                            </p>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Our team of travel specialists, each with deep destination expertise, works personally with every client long before the passport comes out. Because great travel begins with great conversation.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {values.map(({ icon: Icon, title, desc }, i) => (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="glass border border-white/8 rounded-2xl p-5"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center mb-3">
                                        <Icon className="w-5 h-5 text-gold-400" />
                                    </div>
                                    <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                                    <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Milestones */}
            <section className="section-padding">
                <div className="container-narrow">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-4xl font-display font-bold text-heading mb-3">Our journey so far</h2>
                        <p className="text-white/60">15 years of crafting unforgettable travel experiences</p>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent hidden md:block" />
                        <div className="space-y-8">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={m.year}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <p className="text-2xl font-display font-bold gradient-text-gold">{m.year}</p>
                                        <p className="text-white/70 text-sm mt-1">{m.event}</p>
                                    </div>
                                    <div className="w-4 h-4 rounded-full bg-gold-400 flex-shrink-0 hidden md:block shadow-glow-gold" />
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section id="team" className="section-padding bg-midnight-light/20">
                <div className="container-wide">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-display font-bold text-heading mb-3">
                            Meet your <span className="gradient-text-gold">travel experts</span>
                        </h2>
                        <p className="text-white/60">Passionate travelers who've been everywhere so you can go anywhere</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="group glass border border-white/8 rounded-3xl overflow-hidden hover:border-white/15 transition-all"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-base font-display font-bold text-white">{member.name}</h3>
                                    <p className="text-xs text-gold-400 font-medium mb-2">{member.role}</p>
                                    <p className="text-xs text-white/50 leading-relaxed">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center">
                <div className="container-narrow">
                    <h2 className="text-3xl font-display font-bold text-heading mb-4">Ready to start your story?</h2>
                    <p className="text-white/60 mb-8">Let's build an itinerary around your dream — together.</p>
                    <Link href="/contact" className="btn-primary text-sm">
                        Plan My Trip
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
