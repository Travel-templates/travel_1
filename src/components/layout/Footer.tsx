'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Globe, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, ArrowRight, Shield, Award, HeadphonesIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
    destinations: [
        { label: 'Bali, Indonesia', href: '/destinations/bali' },
        { label: 'Maldives', href: '/destinations/maldives' },
        { label: 'Dubai, UAE', href: '/destinations/dubai' },
        { label: 'Switzerland', href: '/destinations/switzerland' },
        { label: 'Kashmir, India', href: '/destinations/kashmir' },
        { label: 'All Destinations', href: '/destinations' },
    ],
    packages: [
        { label: 'Honeymoon Packages', href: '/packages?category=honeymoon' },
        { label: 'Family Tours', href: '/packages?category=family' },
        { label: 'Group Departures', href: '/packages?category=group' },
        { label: 'Cruise Packages', href: '/packages?category=cruise' },
        { label: 'Weekend Getaways', href: '/packages?category=weekend' },
        { label: 'All Packages', href: '/packages' },
    ],
    company: [
        { label: 'About WanderLux', href: '/about' },
        { label: 'Our Team', href: '/about#team' },
        { label: 'Blog & Guides', href: '/blog' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Partner With Us', href: '/contact' },
        { label: 'Careers', href: '/contact' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms & Conditions', href: '#' },
        { label: 'Refund Policy', href: '#' },
        { label: 'Cookie Policy', href: '#' },
    ],
};

const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
];

const trustBadges = [
    { icon: Shield, text: 'Secure Payments', sub: 'SSL Encrypted' },
    { icon: Award, text: 'Verified Partners', sub: 'IATA Accredited' },
    { icon: HeadphonesIcon, text: '24/7 Support', sub: 'Expert Guidance' },
];

export function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <footer className="relative bg-midnight border-t border-white/5">
            {/* Top gradient line */}
            <div className="divider-glow" />

            <div className="container-wide py-16 lg:py-20">
                {/* Newsletter Banner */}
                <div className="mb-16 p-8 rounded-3xl glass border border-white/8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/50 via-transparent to-teal-950/50" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-display font-bold mb-2 gradient-text-gold">Get Travel Inspiration</h3>
                        <p className="text-white/60 mb-6 text-sm">Exclusive deals, destination guides, and travel tips — straight to your inbox.</p>
                        {subscribed ? (
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-900/30 border border-teal-500/30 text-teal-400 text-sm font-medium">
                                ✓ You're subscribed! Welcome to WanderLux.
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="input-premium flex-1"
                                />
                                <button type="submit" className="btn-primary whitespace-nowrap">
                                    Subscribe
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 mb-16">
                    {trustBadges.map((badge) => (
                        <div key={badge.text} className="flex items-center gap-3 p-4 rounded-2xl glass border border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                                <badge.icon className="w-5 h-5 text-gold-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">{badge.text}</p>
                                <p className="text-xs text-white/50">{badge.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-midnight" />
                            </div>
                            <span className="text-xl font-display font-bold">
                                Wander<span className="gradient-text-gold">Lux</span>
                            </span>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
                            Curated escapes designed around your pace. From ocean cruises to mountain retreats, every itinerary is crafted to feel effortless.
                        </p>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-3 mb-6">
                            <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
                                <Phone className="w-4 h-4 text-gold-400 group-hover:text-gold-300" />
                                +91 98765 43210
                            </a>
                            <a href="mailto:hello@wanderlux.in" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
                                <Mail className="w-4 h-4 text-gold-400 group-hover:text-gold-300" />
                                hello@wanderlux.in
                            </a>
                            <div className="flex items-center gap-2 text-sm text-white/60">
                                <MapPin className="w-4 h-4 text-gold-400" />
                                Mumbai, Maharashtra, India
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all hover:scale-110"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Destinations</h4>
                        <ul className="flex flex-col gap-2">
                            {footerLinks.destinations.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/50 hover:text-gold-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Packages */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Packages</h4>
                        <ul className="flex flex-col gap-2">
                            {footerLinks.packages.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/50 hover:text-gold-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
                        <ul className="flex flex-col gap-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/50 hover:text-gold-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/30">
                        © 2026 WanderLux Travel Pvt. Ltd. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        {footerLinks.legal.map((link) => (
                            <Link key={link.label} href={link.href} className="text-xs text-white/30 hover:text-white/60 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
