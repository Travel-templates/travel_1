'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, DollarSign, Calendar, Compass, Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { destinations, interestOptions, travelStyles } from '@/data';
import { generateMockItinerary } from '@/lib/utils';
import Link from 'next/link';

const budgetRanges = [
    { id: 'budget', label: 'Budget', range: '₹20k – ₹50k', color: '#14b8a6' },
    { id: 'mid', label: 'Mid-Range', range: '₹50k – ₹1L', color: '#0ea5e9' },
    { id: 'luxury', label: 'Luxury', range: '₹1L – ₹2L', color: '#f59e0b' },
    { id: 'ultra', label: 'Ultra Luxury', range: '₹2L+', color: '#d97706' },
];

const daysOptions = [3, 5, 7, 10, 14];

const steps = [
    { id: 1, label: 'Destination', icon: MapPin },
    { id: 2, label: 'Budget', icon: DollarSign },
    { id: 3, label: 'Duration', icon: Calendar },
    { id: 4, label: 'Interests', icon: Compass },
    { id: 5, label: 'Your Plan', icon: Sparkles },
];

export function TripBuilderSection() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDest, setSelectedDest] = useState<string>('');
    const [selectedBudget, setSelectedBudget] = useState<string>('');
    const [selectedDays, setSelectedDays] = useState<number>(7);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [generatedItinerary, setGeneratedItinerary] = useState<any[]>([]);

    const toggleInterest = (id: string) => {
        setSelectedInterests(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleGenerate = () => {
        const destName = destinations.find(d => d.id === selectedDest)?.name || 'Your Destination';
        const itinerary = generateMockItinerary(destName, selectedDays, selectedInterests);
        setGeneratedItinerary(itinerary);
        setCurrentStep(5);
    };

    const selectedDestData = destinations.find(d => d.id === selectedDest);

    return (
        <section className="section-padding relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight-light/30 to-midnight" />

            <div className="container-wide relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 chip-gold rounded-full mb-4">
                        <Sparkles className="w-3 h-3 text-gold-400" />
                        <span className="text-xs font-semibold tracking-widest uppercase">AI Trip Builder</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4 text-heading">
                        Build your <span className="gradient-text-gold">perfect itinerary</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-xl mx-auto">
                        Tell us where your heart wants to go — our smart planner generates a personalized day-by-day itinerary in seconds.
                    </p>
                </motion.div>

                {/* Builder Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Progress Steps */}
                    <div className="flex items-stretch border-b border-white/8">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isDone = currentStep > step.id;
                            return (
                                <button
                                    key={step.id}
                                    onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                                    className={`flex-1 flex flex-col items-center gap-1 py-4 text-xs font-medium transition-all border-b-2 ${isActive
                                            ? 'border-gold-400 text-gold-400 bg-gold-400/5'
                                            : isDone
                                                ? 'border-teal-500/50 text-teal-400/80 cursor-pointer hover:bg-white/3'
                                                : 'border-transparent text-white/30'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden sm:block">{step.label}</span>
                                    {isDone && <Check className="w-3 h-3 text-teal-400" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Step Content */}
                    <div className="p-6 sm:p-8 min-h-[320px]">
                        <AnimatePresence mode="wait">

                            {/* Step 1: Destination */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-xl font-display font-bold text-white mb-2">Where do you want to go?</h3>
                                    <p className="text-white/50 text-sm mb-6">Choose your dream destination</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {destinations.slice(0, 9).map((dest) => (
                                            <button
                                                key={dest.id}
                                                onClick={() => setSelectedDest(dest.id)}
                                                className={`group flex flex-col items-start gap-2 p-3 rounded-2xl border transition-all text-left ${selectedDest === dest.id
                                                        ? 'border-gold-400 bg-gold-400/10'
                                                        : 'border-white/8 hover:border-white/20 bg-white/3'
                                                    }`}
                                            >
                                                <div className="w-full h-20 rounded-xl overflow-hidden">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" loading="lazy" />
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-semibold ${selectedDest === dest.id ? 'text-gold-400' : 'text-white'}`}>{dest.name}</p>
                                                    <p className="text-xs text-white/40">{dest.country}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Budget */}
                            {currentStep === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                                    <h3 className="text-xl font-display font-bold text-white mb-2">What's your budget range?</h3>
                                    <p className="text-white/50 text-sm mb-6">Per person, excluding flights</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {budgetRanges.map((b) => (
                                            <button
                                                key={b.id}
                                                onClick={() => setSelectedBudget(b.id)}
                                                className={`p-5 rounded-2xl border text-left transition-all ${selectedBudget === b.id
                                                        ? 'border-opacity-60 bg-opacity-10'
                                                        : 'border-white/8 bg-white/3 hover:border-white/20'
                                                    }`}
                                                style={selectedBudget === b.id ? { borderColor: b.color + '88', background: b.color + '15' } : {}}
                                            >
                                                <div className="w-3 h-3 rounded-full mb-3" style={{ background: b.color }} />
                                                <p className={`text-base font-display font-bold mb-1`} style={selectedBudget === b.id ? { color: b.color } : { color: 'white' }}>{b.label}</p>
                                                <p className="text-sm text-white/50">{b.range}</p>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Duration */}
                            {currentStep === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                                    <h3 className="text-xl font-display font-bold text-white mb-2">How many days?</h3>
                                    <p className="text-white/50 text-sm mb-6">Choose your travel duration</p>
                                    <div className="flex flex-wrap gap-3">
                                        {daysOptions.map((days) => (
                                            <button
                                                key={days}
                                                onClick={() => setSelectedDays(days)}
                                                className={`px-6 py-4 rounded-2xl border text-center transition-all ${selectedDays === days
                                                        ? 'border-gold-400 bg-gold-400/15 text-gold-400'
                                                        : 'border-white/8 bg-white/3 text-white/60 hover:border-white/20 hover:text-white'
                                                    }`}
                                            >
                                                <p className="text-2xl font-display font-bold">{days}</p>
                                                <p className="text-xs mt-1">Days</p>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 4: Interests */}
                            {currentStep === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                                    <h3 className="text-xl font-display font-bold text-white mb-2">What do you love?</h3>
                                    <p className="text-white/50 text-sm mb-6">Select all that interest you</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {interestOptions.map((interest) => (
                                            <button
                                                key={interest.id}
                                                onClick={() => toggleInterest(interest.id)}
                                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${selectedInterests.includes(interest.id)
                                                        ? 'border-teal-400 bg-teal-400/10 text-teal-300'
                                                        : 'border-white/8 bg-white/3 text-white/60 hover:text-white hover:border-white/20'
                                                    }`}
                                            >
                                                <span className="text-2xl">{interest.icon}</span>
                                                <span className="text-xs font-medium text-center">{interest.label}</span>
                                                {selectedInterests.includes(interest.id) && (
                                                    <Check className="w-3.5 h-3.5 text-teal-400" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 5: Generated Itinerary */}
                            {currentStep === 5 && (
                                <motion.div key="step5" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-xl font-display font-bold text-white">Your personalized itinerary</h3>
                                            <p className="text-white/50 text-sm">
                                                {selectedDestData?.name} • {selectedDays} Days • {selectedInterests.length} interests selected
                                            </p>
                                        </div>
                                        <div className="chip-gold text-xs px-3 py-1.5 font-semibold">✨ AI Generated</div>
                                    </div>
                                    <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide pr-1">
                                        {generatedItinerary.map((day) => (
                                            <div key={day.day} className="flex gap-4 p-3 rounded-xl bg-white/3 border border-white/5">
                                                <div className="w-10 h-10 rounded-xl bg-gold-400/15 border border-gold-400/20 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-gold-400 text-sm font-bold">{day.day}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-white mb-1">{day.title}</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {day.activities.map((act: string, i: number) => (
                                                            <span key={i} className="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded-lg">{act}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex gap-3">
                                        <Link href="/contact" className="btn-primary text-sm flex-1 justify-center">
                                            Send This to an Expert
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <button onClick={() => setCurrentStep(1)} className="btn-secondary text-sm px-5">
                                            Start Over
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    {currentStep < 5 && (
                        <div className="flex items-center justify-between px-6 sm:px-8 pb-6">
                            <button
                                onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
                                className={`btn-ghost text-sm flex items-center gap-2 ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>

                            {currentStep < 4 ? (
                                <button
                                    onClick={() => setCurrentStep(s => s + 1)}
                                    disabled={currentStep === 1 ? !selectedDest : currentStep === 2 ? !selectedBudget : false}
                                    className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleGenerate}
                                    className="btn-primary text-sm"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Generate My Itinerary
                                </button>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
