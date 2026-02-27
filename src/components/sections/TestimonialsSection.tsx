'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials, stats } from '@/data';

function StatCounter({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
    const displayValue = useTransform(scrollYProgress, [0, 1], [0, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center p-6 glass rounded-2xl border border-white/8"
        >
            <div className="text-4xl sm:text-5xl font-display font-bold gradient-text-gold leading-none mb-2">
                {value.toLocaleString()}{suffix}
            </div>
            <p className="text-sm text-white/50 font-medium">{label}</p>
        </motion.div>
    );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 } },
            }}
            className="card-premium p-6"
        >
            {/* Quote Icon */}
            <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-gold-400" />
            </div>

            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < testimonial.rating ? 'fill-gold-400 text-gold-400' : 'text-white/20'}`}
                    />
                ))}
            </div>

            <p className="text-white/80 text-sm leading-relaxed mb-5 italic">&ldquo;{testimonial.text}&rdquo;</p>

            {/* Package Tag */}
            <div className="chip text-xs px-3 py-1 rounded-lg mb-4">{testimonial.package}</div>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-white/40">{testimonial.destination} • {testimonial.date}</p>
                </div>
            </div>
        </motion.div>
    );
}

export function TestimonialsSection() {
    const partnerNames = ['Emirates', 'Marriott', 'MSC Cruises', 'IndiGo Airlines', 'Hilton Hotels', 'Hyatt', 'Air India', 'Radisson Blu'];

    return (
        <section className="section-padding bg-midnight-light/30 relative overflow-hidden">
            {/* Subtle bg pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
            }} />

            <div className="container-wide relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 chip-ocean rounded-full mb-4">
                        <span className="text-xs font-semibold tracking-widest uppercase">Traveler Stories</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4 text-heading">
                        What our travelers <span className="gradient-text-ocean">say about us</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-xl mx-auto">
                        Over 25,000 trips planned. Over 25,000 smiles created. Here's what some of them said.
                    </p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                    {stats.map((stat, i) => (
                        <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} index={i} />
                    ))}
                </div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
                >
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={t.id} testimonial={t} index={i} />
                    ))}
                </motion.div>

                {/* Partner Logos */}
                <div className="text-center">
                    <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-6">Trusted Partners & Airlines</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {partnerNames.map((name) => (
                            <div
                                key={name}
                                className="px-6 py-3 glass border border-white/8 rounded-xl text-sm font-semibold text-white/40 hover:text-white/60 hover:border-white/15 transition-all"
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
