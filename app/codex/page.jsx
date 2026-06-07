"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import PotionCard from '@/components/PotionCard';

// Mock data until DB is populated
const MOCK_REMEDIES = [
    {
        id: "ashwagandha",
        name: "Ashwagandha",
        description: "An ancient medicinal herb classified as an adaptogen. Reduces cortisol and balances thyroid hormones.",
        elements: ["Stress", "Earth"],
        image: "🌿",
        rarity: "rare"
    },
    {
        id: "valerian",
        name: "Valerian Root",
        description: "Known for its sedative qualities to induce deep, restorative sleep cycles.",
        elements: ["Sleep", "Air"],
        image: "🌸",
        rarity: "common"
    },
    {
        id: "ginger",
        name: "Golden Ginger",
        description: "Warms the stomach and dispels cold humors. Powerful anti-inflammatory.",
        elements: ["Digestion", "Fire"],
        image: "🫚",
        rarity: "uncommon"
    },
    {
        id: "turmeric",
        name: "Turmeric Elixir",
        description: "The golden spice of life. Contains curcumin, a potent anti-inflammatory compound.",
        elements: ["Digestion", "Fire"],
        image: "✨",
        rarity: "rare"
    },
    {
        id: "chamomile",
        name: "Chamomile Blossom",
        description: "Gentle flower that calms the nervous system and eases into peaceful slumber.",
        elements: ["Sleep", "Air"],
        image: "🌼",
        rarity: "common"
    },
    {
        id: "lavender",
        name: "Lavender Essence",
        description: "Aromatic herb that dissolves tension and anxiety from the spirit.",
        elements: ["Stress", "Air"],
        image: "💜",
        rarity: "uncommon"
    },
    {
        id: "peppermint",
        name: "Peppermint Leaf",
        description: "Cooling herb that clears the mind and soothes digestive discomfort.",
        elements: ["Digestion", "Air"],
        image: "🍃",
        rarity: "common"
    },
    {
        id: "holy-basil",
        name: "Holy Basil (Tulsi)",
        description: "Sacred herb revered in Ayurveda for building resilience against stress.",
        elements: ["Stress", "Earth"],
        image: "🪴",
        rarity: "rare"
    },
    {
        id: "melatonin",
        name: "Moonstone Extract",
        description: "Mimics the body's natural sleep hormone for restful nights.",
        elements: ["Sleep", "Earth"],
        image: "🌙",
        rarity: "uncommon"
    },
];

export default function CodexPage() {
    const [filter, setFilter] = useState("All");

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-rose-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-slate-900 mb-4 font-cinzel">
                        The Codex of Remedies
                    </h1>
                    <p className="text-slate-500 text-lg font-cormorant max-w-2xl mx-auto italic">
                        "Here lies the knowledge of the ancients, preserved in light."
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {["All", "Stress", "Sleep", "Digestion"].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`px-6 py-2 rounded-full border transition-all duration-300 font-cinzel text-sm tracking-wider ${filter === tag
                                    ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200"
                                    : "bg-white border-rose-100 text-slate-500 hover:border-rose-300 hover:text-rose-600"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_REMEDIES.filter(r => filter === "All" || r.elements.includes(filter)).map((remedy, index) => (
                        <PotionCard
                            key={remedy.id}
                            name={remedy.name}
                            effect={remedy.description}
                            image={remedy.image}
                            elements={remedy.elements}
                            rarity={remedy.rarity}
                            onAction={() => console.log('Viewing', remedy.name)}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
