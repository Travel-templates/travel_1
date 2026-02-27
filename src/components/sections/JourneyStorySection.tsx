'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const journeySteps = [
    {
        step: '01',
        label: 'Dream',
        title: 'Let Your Imagination Wander',
        description: 'Every great journey starts with a feeling — a longing for somewhere new. We help you shape that dream into a destination.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        color: '#0ea5e9',
        icon: '✦',
    },
    {
        step: '02',
        label: 'Discover',
        title: 'Explore Curated Possibilities',
        description: 'Browse 85+ handpicked destinations and hundreds of itineraries — filtered by your interests, budget, and travel style.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        color: '#14b8a6',
        icon: '◎',
    },
    {
        step: '03',
        label: 'Customize',
        title: 'Shape Your Perfect Itinerary',
        description: 'Work with our expert travel curators to tailor every detail — from hotel categories to day-wise activities and meal preferences.',
        image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
        color: '#f59e0b',
        icon: '☽',
    },
    {
        step: '04',
        label: 'Travel',
        title: 'Experience Travel, Effortlessly',
        description: "Arrive, and let the journey unfold. Our local teams and 24/7 support ensure you're always cared for — wherever you are.",
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
        color: '#0d9488',
        icon: '↗',
    },
    {
        step: '05',
        label: 'Relive',
        title: 'Memories That Last Forever',
        description: 'Receive a curated photo journal, travel memories digest, and future trip recommendations based on your journey.',
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
        color: '#d97706',
        icon: '◈',
    },
];

export function JourneyStorySection() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="relative py-24 lg:py-32 overflow-hidden">
            {/* BG decoration */}
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold-500/20 to-transparent ml-8 lg:ml-32" />

            <div className="container-wide">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 chip-ocean rounded-full mb-4">
                        <span className="text-xs font-semibold tracking-widest uppercase">Your Travel Journey</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4 text-heading">
                        Five chapters, <span className="gradient-text-gold">one unforgettable story</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        We guide you from the first spark of wanderlust to the last cherished memory — every step of the way.
                    </p>
                </motion.div>

                {/* Journey Steps */}
                <div className="flex flex-col gap-0">
                    {journeySteps.map((step, index) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-16 border-b border-white/5 last:border-0 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                                }`}
                        >
                            {/* Content */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <span className="text-5xl font-display font-bold" style={{ color: step.color, opacity: 0.3 }}>
                                        {step.step}
                                    </span>
                                    <div>
                                        <span
                                            className="text-xs font-bold tracking-[0.2em] uppercase font-display block mb-1"
                                            style={{ color: step.color }}
                                        >
                                            {step.label}
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl font-display font-bold gradient-text-white">
                                            {step.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-white/60 text-lg leading-relaxed pl-16">{step.description}</p>
                                <div className="pl-16">
                                    <div
                                        className="inline-flex items-center gap-2 text-sm font-medium cursor-default"
                                        style={{ color: step.color }}
                                    >
                                        <div className="w-8 h-px" style={{ background: step.color }} />
                                        Learn more
                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative group">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={step.image}
                                        alt={step.label}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
                                    <div
                                        className="absolute top-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold"
                                        style={{ background: `${step.color}22`, border: `1px solid ${step.color}44`, color: step.color }}
                                    >
                                        {step.icon}
                                    </div>
                                </div>
                                {/* Decorative ring */}
                                <div
                                    className="absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                                    style={{ background: `radial-gradient(ellipse at center, ${step.color}15 0%, transparent 70%)` }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
