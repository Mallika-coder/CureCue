"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const SCROLLS = [
    {
        id: 1,
        title: "The Alchemy of Gut Health",
        excerpt: "Discover how the inner furnace transforms your vitality, and which herbs fuel the fire.",
        category: "Body",
        date: "Mars 24, 2024"
    },
    {
        id: 2,
        title: "Ancient Roots for Modern Stress",
        excerpt: "Why Ashwagandha and Rhodiola are becoming the alchemist's favorite tools in the digital age.",
        category: "Mind",
        date: "Mercury 12, 2024"
    },
    {
        id: 3,
        title: "The Sleep Tincture",
        excerpt: "Crafting the perfect evening ritual to induce deep, restorative slumber.",
        category: "Spirit",
        date: "Moon 05, 2024"
    },
];

export default function ScrollsPage() {
    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-rose-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold font-cinzel text-rose-900 mb-6">
                        Scrolls of Knowledge
                    </h1>
                    <p className="text-slate-500 font-cormorant text-xl">
                        Unrolling the wisdom of generations.
                    </p>
                </div>

                <div className="grid gap-8 max-w-4xl mx-auto">
                    {SCROLLS.map((scroll, index) => (
                        <motion.div
                            key={scroll.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white border border-rose-100 p-8 rounded-2xl hover:shadow-xl hover:shadow-rose-100 transition-all duration-300"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between relative z-10">
                                <div>
                                    <div className="flex gap-4 items-center mb-3">
                                        <span className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-wider rounded-full border border-rose-100">
                                            {scroll.category}
                                        </span>
                                        <span className="text-slate-400 text-sm font-mono">{scroll.date}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold font-cinzel text-slate-800 mb-3 group-hover:text-rose-700 transition-colors">
                                        {scroll.title}
                                    </h2>
                                    <p className="text-slate-500 font-cormorant text-lg">
                                        {scroll.excerpt}
                                    </p>
                                </div>

                                <button className="px-6 py-3 border border-rose-200 rounded-lg text-rose-600 font-bold hover:bg-rose-600 hover:text-white transition-all font-cinzel text-sm shrink-0">
                                    Read Scroll
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
