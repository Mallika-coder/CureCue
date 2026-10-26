"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const SCROLLS = [
    {
        id: 1,
        title: "The Alchemy of Gut Health",
        excerpt: "Discover how the inner furnace transforms your vitality, and which herbs fuel the fire of digestion.",
        category: "Body",
        date: "Mars 24, 2024",
        readTime: "5 min",
        emoji: "🔥",
        content: "The gut is the second brain. Ancient alchemists called it the 'inner cauldron' — the seat of transformation. Modern science confirms: 70% of your immune system lives in your gut. Herbs like ginger, fennel, and peppermint are not just flavourings — they are ancient medicines that reset the digestive fire. Start with warm ginger water each morning to prime your cauldron for the day ahead."
    },
    {
        id: 2,
        title: "Ancient Roots for Modern Stress",
        excerpt: "Why Ashwagandha and Rhodiola are becoming the alchemist's favourite tools in the digital age.",
        category: "Mind",
        date: "Mercury 12, 2024",
        readTime: "6 min",
        emoji: "🌿",
        content: "Adaptogens are herbs that help your body 'adapt' to stress — they work like a thermostat for your nervous system. Ashwagandha lowers cortisol. Rhodiola boosts endurance. Holy Basil (Tulsi) calms racing thoughts. The digital age has created unprecedented cortisol spikes. These roots, used for thousands of years, are now validated by clinical trials. Take them consistently for 8 weeks to feel the shift."
    },
    {
        id: 3,
        title: "The Sleep Tincture",
        excerpt: "Crafting the perfect evening ritual to induce deep, restorative slumber and wake reborn.",
        category: "Spirit",
        date: "Moon 05, 2024",
        readTime: "4 min",
        emoji: "🌙",
        content: "Sleep is not rest — it is repair. During deep sleep, your brain flushes toxins, your body repairs cells, and memories consolidate. The alchemist's sleep ritual: dim all lights 90 minutes before bed, brew valerian root or chamomile tea, write three things you release from the day, and place lavender near your pillow. Avoid screens for the last hour — the blue light suppresses melatonin for up to 3 hours."
    },
    {
        id: 4,
        title: "The Power of Morning Rituals",
        excerpt: "How ancient alchemists began their days and why those practices are backed by modern neuroscience.",
        category: "Mind",
        date: "Sol 01, 2024",
        readTime: "7 min",
        emoji: "☀️",
        content: "The first 90 minutes after waking set the neurochemical tone for your entire day. Ancient texts prescribed sunlight exposure, movement, and a period of silence before any external stimulation. Modern neuroscience explains why: cortisol peaks naturally at dawn (the 'cortisol awakening response') — sunlight amplifies this healthy spike, giving you alertness without anxiety. Delay your phone check by 30 minutes and watch your focus transform."
    },
    {
        id: 5,
        title: "Turmeric: The Golden Elixir",
        excerpt: "The science behind the most studied spice in human history and how to activate its full potential.",
        category: "Body",
        date: "Jupiter 18, 2024",
        readTime: "5 min",
        emoji: "✨",
        content: "Curcumin, turmeric's active compound, has over 12,000 peer-reviewed studies — more than almost any other natural substance. It is a potent anti-inflammatory, antioxidant, and neuroprotectant. But here is the secret ancient Indians already knew: it must be consumed with black pepper (piperine) to be absorbed. Black pepper increases curcumin bioavailability by 2000%. Add a pinch to your golden milk always."
    },
    {
        id: 6,
        title: "Water — The Forgotten Potion",
        excerpt: "Hydration is the simplest and most overlooked form of alchemy. Most ailments begin with water.",
        category: "Body",
        date: "Venus 03, 2024",
        readTime: "3 min",
        emoji: "💧",
        content: "The human body is 60% water. Your brain is 75% water. Even mild dehydration — just 1–2% fluid loss — impairs concentration, mood, and physical performance. Most headaches, afternoon fatigue, and brain fog are dehydration in disguise. The alchemist's formula: drink 500ml of water upon waking before any food or coffee. Add a pinch of Himalayan salt for electrolytes. This one habit alone can transform your daily energy."
    },
];

const CATEGORIES = ["All", "Body", "Mind", "Spirit"];

export default function ScrollsPage() {
    const [filter, setFilter] = useState("All");
    const [expanded, setExpanded] = useState(null);

    const filtered = SCROLLS.filter(s => filter === "All" || s.category === filter);

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-rose-50">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold font-cinzel text-rose-900 mb-4">
                        Scrolls of Knowledge
                    </h1>
                    <p className="text-slate-500 font-cormorant text-xl italic">
                        "Unrolling the wisdom of generations."
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-center gap-3 mb-10 flex-wrap"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-full border text-sm font-cinzel tracking-wider transition-all duration-300 ${
                                filter === cat
                                    ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200"
                                    : "bg-white border-rose-100 text-slate-500 hover:border-rose-300 hover:text-rose-600"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Scrolls */}
                <div className="grid gap-6">
                    {filtered.map((scroll, index) => (
                        <motion.div
                            key={scroll.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className="group bg-white border border-rose-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-rose-100 transition-all duration-300"
                        >
                            {/* Card Header */}
                            <div className="p-8">
                                <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                                    <div className="flex gap-4 items-start flex-1">
                                        <span className="text-3xl mt-1">{scroll.emoji}</span>
                                        <div className="flex-1">
                                            <div className="flex gap-3 items-center mb-2 flex-wrap">
                                                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${
                                                    scroll.category === "Body" ? "bg-rose-50 text-rose-600 border-rose-100" :
                                                    scroll.category === "Mind" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                    "bg-purple-50 text-purple-600 border-purple-100"
                                                }`}>
                                                    {scroll.category}
                                                </span>
                                                <span className="text-slate-400 text-xs font-mono">{scroll.date}</span>
                                                <span className="text-slate-400 text-xs">· {scroll.readTime} read</span>
                                            </div>
                                            <h2 className="text-xl font-bold font-cinzel text-slate-800 mb-2 group-hover:text-rose-700 transition-colors">
                                                {scroll.title}
                                            </h2>
                                            <p className="text-slate-500 font-cormorant text-lg leading-relaxed">
                                                {scroll.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setExpanded(expanded === scroll.id ? null : scroll.id)}
                                        className="px-5 py-2.5 border border-rose-200 rounded-xl text-rose-600 font-bold hover:bg-rose-600 hover:text-white transition-all font-cinzel text-sm shrink-0 self-start"
                                    >
                                        {expanded === scroll.id ? "Close ✕" : "Read Scroll"}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {expanded === scroll.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-rose-50 bg-rose-50/50 px-8 py-6"
                                >
                                    <p className="text-slate-700 font-cormorant text-lg leading-relaxed">
                                        {scroll.content}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-slate-400 font-cormorant italic mt-12 text-sm"
                >
                    {filtered.length} scroll{filtered.length !== 1 ? "s" : ""} found · More wisdom being transcribed...
                </motion.p>
            </div>
        </div>
    );
}
