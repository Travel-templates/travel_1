'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, MessageCircle, Check } from 'lucide-react';

const budgetOptions = ['₹20,000 – ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,00,000', '₹2,00,000+', 'Flexible'];
const travelTypeOptions = ['Honeymoon', 'Family', 'Cruise', 'Group Tour', 'Solo', 'Corporate', 'Other'];

export function InquirySection() {
    const [form, setForm] = useState({
        name: '', phone: '', email: '', destination: '', dates: '', budget: '', travelType: '', notes: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) newErrors.phone = 'Valid phone number required';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email required';
        if (!form.destination.trim()) newErrors.destination = 'Destination is required';
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <section className="relative section-padding overflow-hidden">
            {/* Cinematic background */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-midnight/90 via-midnight/70 to-ocean-950/80" />
            </div>

            <div className="container-wide relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 chip-gold rounded-full mb-4">
                            <span className="text-xs font-semibold tracking-widest uppercase">Start Your Journey</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-display font-bold text-heading mb-6">
                            Let's plan your <br />
                            <span className="gradient-text-gold">dream escape together</span>
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8">
                            Share your travel vision with us. Our expert curators will reach out within 2 hours with a personalized itinerary concept and quote — no obligation, just inspiration.
                        </p>

                        {/* Contact Options */}
                        <div className="flex flex-col gap-3 mb-8">
                            {[
                                { icon: Phone, text: '+91 98765 43210', sub: 'Call us anytime', href: 'tel:+919876543210', color: '#0ea5e9' },
                                { icon: MessageCircle, text: 'Chat on WhatsApp', sub: 'Get instant replies', href: 'https://wa.me/919876543210', color: '#25D366' },
                                { icon: Mail, text: 'hello@wanderlux.in', sub: 'Email our team', href: 'mailto:hello@wanderlux.in', color: '#f59e0b' },
                            ].map(({ icon: Icon, text, sub, href, color }) => (
                                <a
                                    key={text}
                                    href={href}
                                    className="flex items-center gap-4 p-4 glass border border-white/8 rounded-2xl hover:border-white/15 group transition-all"
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + '22' }}>
                                        <Icon className="w-5 h-5" style={{ color }} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white group-hover:text-gold-400 transition-colors">{text}</p>
                                        <p className="text-xs text-white/40">{sub}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Trust */}
                        <div className="flex items-center gap-6">
                            {['Response in 2 hrs', 'No hidden charges', '100% customizable'].map((t) => (
                                <div key={t} className="flex items-center gap-1.5">
                                    <div className="w-4 h-4 rounded-full bg-teal-500/20 flex items-center justify-center">
                                        <Check className="w-2.5 h-2.5 text-teal-400" />
                                    </div>
                                    <span className="text-xs text-white/60">{t}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="glass border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center text-center py-8"
                                >
                                    <div className="w-20 h-20 rounded-full bg-teal-500/20 border-2 border-teal-500/40 flex items-center justify-center mb-6">
                                        <Check className="w-10 h-10 text-teal-400" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-white mb-2">Inquiry Received!</h3>
                                    <p className="text-white/60 mb-6">Our travel expert will reach out to you within 2 hours with a personalized plan.</p>
                                    <p className="text-sm text-gold-400 font-medium">Thank you for choosing WanderLux ✈️</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-6 btn-ghost text-sm"
                                    >
                                        Submit another inquiry
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <h3 className="text-xl font-display font-bold text-white mb-6">Plan My Trip</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-1.5">Full Name *</label>
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                                placeholder="Rahul Sharma"
                                                className={`input-premium ${errors.name ? 'border-red-500/50' : ''}`}
                                            />
                                            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-1.5">Phone Number *</label>
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                                placeholder="+91 98765 43210"
                                                className={`input-premium ${errors.phone ? 'border-red-500/50' : ''}`}
                                            />
                                            {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-1.5">Email Address *</label>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                                placeholder="rahul@example.com"
                                                className={`input-premium ${errors.email ? 'border-red-500/50' : ''}`}
                                            />
                                            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                                        </div>

                                        {/* Destination */}
                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-1.5">Dream Destination *</label>
                                            <input
                                                type="text"
                                                value={form.destination}
                                                onChange={e => setForm(p => ({ ...p, destination: e.target.value }))}
                                                placeholder="Bali, Maldives, Europe..."
                                                className={`input-premium ${errors.destination ? 'border-red-500/50' : ''}`}
                                            />
                                            {errors.destination && <p className="text-xs text-red-400 mt-1">{errors.destination}</p>}
                                        </div>

                                        {/* Travel Dates */}
                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-1.5">Preferred Travel Month</label>
                                            <input
                                                type="text"
                                                value={form.dates}
                                                onChange={e => setForm(p => ({ ...p, dates: e.target.value }))}
                                                placeholder="March 2026 / Flexible"
                                                className="input-premium"
                                            />
                                        </div>

                                        {/* Budget */}
                                        <div>
                                            <label className="block text-xs font-medium text-white/60 mb-1.5">Budget Range</label>
                                            <select
                                                value={form.budget}
                                                onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                                                className="input-premium appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-midnight">Select budget</option>
                                                {budgetOptions.map(b => (
                                                    <option key={b} value={b} className="bg-midnight">{b}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Travel Type */}
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-medium text-white/60 mb-1.5">Travel Type</label>
                                            <div className="flex flex-wrap gap-2">
                                                {travelTypeOptions.map((type) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => setForm(p => ({ ...p, travelType: type }))}
                                                        className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${form.travelType === type
                                                                ? 'border-gold-400 bg-gold-400/15 text-gold-300'
                                                                : 'border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
                                                            }`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-medium text-white/60 mb-1.5">Special Requests / Notes</label>
                                            <textarea
                                                value={form.notes}
                                                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                                                placeholder="Anniversary trip, dietary requirements, accessibility needs, any special requests..."
                                                rows={3}
                                                className="input-premium resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary w-full mt-5 justify-center text-sm disabled:opacity-60"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-midnight/30 border-t-midnight rounded-full animate-spin" />
                                                Sending your inquiry...
                                            </span>
                                        ) : (
                                            <>
                                                Send My Travel Inquiry
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-white/30 text-center mt-3">
                                        100% confidential • No spam • No obligation
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
