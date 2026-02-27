'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock, Check, ArrowRight } from 'lucide-react';

const offices = [
    { city: 'Mumbai (HQ)', address: 'Level 12, One BKC, Bandra Kurla Complex, Mumbai 400051', phone: '+91 98765 43210', email: 'mumbai@wanderlux.in', hours: 'Mon-Sat: 9 AM - 8 PM' },
    { city: 'Delhi NCR', address: 'Building 9A, Cyber City, Gurugram 122002', phone: '+91 98765 43211', email: 'delhi@wanderlux.in', hours: 'Mon-Sat: 9 AM - 8 PM' },
    { city: 'Bangalore', address: '4th Floor, Prestige Tower, MG Road, Bangalore 560001', phone: '+91 98765 43212', email: 'bangalore@wanderlux.in', hours: 'Mon-Sat: 9 AM - 8 PM' },
];

const budgetOptions = ['Under 50k', '50k - 1L', '1L - 2L', '2L+', 'Flexible'];

export function ContactPageContent() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', destination: '', dates: '', budget: '', notes: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <main className="pt-[var(--header-height)]">
            {/* Hero */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-950/30 via-midnight to-midnight" />
                <div className="container-wide relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-2xl mx-auto">
                        <div className="chip-gold mb-4 inline-flex items-center gap-2 rounded-full">
                            <span className="text-xs font-semibold tracking-widest uppercase">Get In Touch</span>
                        </div>
                        <h1 className="text-5xl font-display font-bold text-heading mb-4">
                            Let us plan your <span className="gradient-text-gold">dream trip</span>
                        </h1>
                        <p className="text-white/60 text-lg">Our travel experts are just a message away. Reach out and we will craft a journey you will never forget.</p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="section-padding">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                        {/* Quick Contact */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">Quick Contact</h2>
                                <p className="text-white/50 text-sm mb-6">We typically respond within 2 hours during business hours.</p>
                            </div>

                            {[
                                { icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210', color: '#0ea5e9' },
                                { icon: MessageCircle, label: 'WhatsApp', value: 'Chat Now', href: 'https://wa.me/919876543210', color: '#25D366' },
                                { icon: Mail, label: 'Email', value: 'hello@wanderlux.in', href: 'mailto:hello@wanderlux.in', color: '#f59e0b' },
                            ].map(({ icon: Icon, label, value, href, color }) => (
                                <a key={label} href={href} className="flex items-center gap-4 p-4 glass border border-white/8 rounded-2xl hover:border-white/15 transition-all group">
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: color + '20' }}>
                                        <Icon className="w-5 h-5" style={{ color }} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/40 uppercase tracking-wider">{label}</p>
                                        <p className="text-sm font-semibold text-white group-hover:text-gold-400 transition-colors">{value}</p>
                                    </div>
                                </a>
                            ))}

                            {/* Business Hours */}
                            <div className="glass border border-white/8 rounded-2xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="w-4 h-4 text-gold-400" />
                                    <h4 className="text-sm font-bold text-white">Business Hours</h4>
                                </div>
                                <p className="text-sm text-white/50">Monday - Saturday: 9:00 AM - 8:00 PM IST</p>
                                <p className="text-sm text-white/50">Sunday: 10:00 AM - 4:00 PM IST</p>
                                <p className="text-xs text-teal-400 mt-2">24/7 support for active travelers</p>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-3">
                            <div className="glass border border-white/10 rounded-3xl p-6 sm:p-8">
                                {submitted ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-12">
                                        <div className="w-20 h-20 rounded-full bg-teal-500/20 border-2 border-teal-500/40 flex items-center justify-center mb-6">
                                            <Check className="w-10 h-10 text-teal-400" />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent!</h3>
                                        <p className="text-white/60 mb-6">We will get back to you within 2 hours.</p>
                                        <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', destination: '', dates: '', budget: '', notes: '' }); }} className="btn-ghost text-sm">Send another inquiry</button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <h3 className="text-xl font-display font-bold text-white mb-6">Send Us Your Travel Inquiry</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-xs font-medium text-white/60 mb-1.5">Full Name *</label>
                                                <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" className="input-premium" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-white/60 mb-1.5">Phone *</label>
                                                <input type="tel" required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98765 43210" className="input-premium" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-white/60 mb-1.5">Email *</label>
                                                <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" className="input-premium" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-white/60 mb-1.5">Destination</label>
                                                <input type="text" value={form.destination} onChange={e => setForm(p => ({ ...p, destination: e.target.value }))} placeholder="Bali, Europe, Maldives..." className="input-premium" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-white/60 mb-1.5">Travel Dates</label>
                                                <input type="text" value={form.dates} onChange={e => setForm(p => ({ ...p, dates: e.target.value }))} placeholder="March 2026 / Flexible" className="input-premium" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-white/60 mb-1.5">Budget Range</label>
                                                <select value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} className="input-premium appearance-none cursor-pointer">
                                                    <option value="" className="bg-midnight">Select budget</option>
                                                    {budgetOptions.map(b => <option key={b} value={b} className="bg-midnight">{b}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-xs font-medium text-white/60 mb-1.5">Additional Notes</label>
                                            <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Tell us about your dream trip..." rows={3} className="input-premium resize-none" />
                                        </div>
                                        <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm">
                                            {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-midnight/30 border-t-midnight rounded-full animate-spin" />Sending...</span> : <>Send Inquiry <ArrowRight className="w-4 h-4" /></>}
                                        </button>
                                        <p className="text-xs text-white/30 text-center mt-3">100% confidential. No spam. No obligation.</p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Offices */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">Our Offices</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {offices.map((office) => (
                                <motion.div key={office.city} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass border border-white/8 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <MapPin className="w-4 h-4 text-gold-400" />
                                        <h4 className="text-base font-bold text-white">{office.city}</h4>
                                    </div>
                                    <p className="text-sm text-white/50 mb-3">{office.address}</p>
                                    <div className="space-y-1.5 text-sm">
                                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"><Phone className="w-3 h-3" /> {office.phone}</a>
                                        <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"><Mail className="w-3 h-3" /> {office.email}</a>
                                        <p className="flex items-center gap-2 text-white/40"><Clock className="w-3 h-3" /> {office.hours}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="mt-10 glass border border-white/8 rounded-3xl overflow-hidden h-64 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="w-8 h-8 text-gold-400 mx-auto mb-2" />
                            <p className="text-white/40 text-sm">Interactive Map</p>
                            <p className="text-white/25 text-xs">Map integration placeholder</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
