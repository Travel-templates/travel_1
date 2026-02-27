'use client';
import { motion } from 'framer-motion';
import { Waves, Utensils, Wifi, Dumbbell, Music, Star, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const amenities = [
    { icon: Waves, label: 'Infinity Pool' },
    { icon: Utensils, label: 'Fine Dining' },
    { icon: Wifi, label: 'High-Speed WiFi' },
    { icon: Dumbbell, label: 'Fitness Center' },
    { icon: Music, label: 'Live Entertainment' },
    { icon: Star, label: 'Butler Service' },
];

const luxuryReasons = [
    'Handpicked 5-star resorts, private villas, and overwater bungalows',
    'Personalized butler and concierge services throughout',
    'Exclusive access to private beaches and protected natural reserves',
    'Curated fine dining experiences with local master chefs',
    'Seamless door-to-door travel with luxury vehicle transfers',
    'Dedicated travel expert available 24/7 during your journey',
];

const cruiseHighlights = [
    {
        title: 'Mediterranean Luxury',
        desc: 'Athens, Barcelona, Rome, Santorini',
        image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80',
        price: '₹1,45,000',
        nights: '10 Nights',
    },
    {
        title: 'Ocean Deck Dining',
        desc: 'Fine dining under the stars',
        image: 'https://images.unsplash.com/photo-1566738780863-f9608f88f3a9?w=600&q=80',
        price: '₹95,000',
        nights: '7 Nights',
    },
    {
        title: 'Private Island Stop',
        desc: 'Exclusive port day experiences',
        image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80',
        price: '₹1,25,000',
        nights: '8 Nights',
    },
];

export function CruiseLuxurySection() {
    return (
        <section id="cruises" className="section-padding overflow-hidden relative">
            {/* BG */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-950/40 via-midnight to-teal-950/20" />
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-ocean-900/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-teal-900/15 blur-3xl" />
            </div>

            <div className="container-wide relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 chip-ocean rounded-full mb-4">
                            <span className="text-xs font-semibold tracking-widest uppercase">🚢 Cruise & Luxury</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-display font-bold text-heading mb-6">
                            The art of <span className="gradient-text-ocean">luxury travel</span>,<br />
                            perfectly orchestrated
                        </h2>
                        <p className="text-white/60 text-lg leading-relaxed mb-8">
                            Whether it's waking up in an overwater bungalow or watching the Adriatic shimmer from a cruise deck at dawn — we craft moments that redefine what travel means.
                        </p>

                        <div className="space-y-3 mb-8">
                            {luxuryReasons.map((reason, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-5 h-5 rounded-full bg-teal-900/50 border border-teal-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <ChevronRight className="w-3 h-3 text-teal-400" />
                                    </div>
                                    <span className="text-sm text-white/70">{reason}</span>
                                </motion.div>
                            ))}
                        </div>

                        <Link href="/packages?category=cruise" className="btn-ocean text-sm">
                            Explore Cruise Packages
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Image Stack */}
                    <div className="relative h-[500px] hidden lg:block">
                        <div className="absolute top-0 right-0 w-72 h-72 rounded-3xl overflow-hidden shadow-card">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80"
                                alt="Luxury cruise"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-3xl overflow-hidden shadow-card">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80"
                                alt="Maldives overwater villa"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 to-transparent" />
                        </div>
                        {/* Floating amenity card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass border border-white/10 rounded-2xl p-4 w-52 shadow-2xl animate-float">
                            <p className="text-xs font-semibold text-gold-400 mb-3 uppercase tracking-wider">Onboard Amenities</p>
                            <div className="grid grid-cols-3 gap-2">
                                {amenities.map(({ icon: Icon, label }) => (
                                    <div key={label} className="flex flex-col items-center gap-1">
                                        <div className="w-8 h-8 rounded-xl bg-ocean-900/40 flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-ocean-400" />
                                        </div>
                                        <span className="text-[10px] text-white/50 text-center leading-tight">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Cruise Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {cruiseHighlights.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[3/2]"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-ocean-300 mb-0.5">{item.nights}</p>
                                        <h4 className="text-base font-display font-bold text-white leading-tight">{item.title}</h4>
                                        <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-white/40">from</p>
                                        <p className="text-base font-bold gradient-text-gold">{item.price}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
