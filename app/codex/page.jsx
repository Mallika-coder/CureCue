"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import PotionCard from "@/components/PotionCard";

const MOCK_REMEDIES = [
    {
        id: "ashwagandha",
        name: "Ashwagandha",
        description: "The ancient adaptogen that lowers cortisol, reduces anxiety, and builds resilience against daily stress. Classifed as a rasayana — a rejuvenating tonic — in Ayurveda.",
        elements: ["Stress", "Earth"],
        image: "🌿",
        rarity: "rare",
        origin: "India",
        use: "Take 300–600mg with warm milk at night."
    },
    {
        id: "valerian",
        name: "Valerian Root",
        description: "The 'nature's Valium' of the herbal world. Its active compounds bind to GABA receptors, producing calm and inducing deep, restorative sleep cycles.",
        elements: ["Sleep", "Air"],
        image: "🌸",
        rarity: "common",
        origin: "Europe & Asia",
        use: "Brew as tea 30 minutes before bed."
    },
    {
        id: "ginger",
        name: "Golden Ginger",
        description: "Warms the stomach and dispels cold humors. Gingerols are powerful anti-inflammatory compounds that rival some over-the-counter pain medications.",
        elements: ["Digestion", "Fire"],
        image: "🫚",
        rarity: "uncommon",
        origin: "Southeast Asia",
        use: "Fresh ginger tea after meals for digestion."
    },
    {
        id: "turmeric",
        name: "Turmeric Elixir",
        description: "The most studied spice in human history. Curcumin blocks NF-kB — a molecule that triggers inflammation at the genetic level. Always combine with black pepper for absorption.",
        elements: ["Digestion", "Fire"],
        image: "✨",
        rarity: "rare",
        origin: "India",
        use: "Golden milk with black pepper daily."
    },
    {
        id: "chamomile",
        name: "Chamomile Blossom",
        description: "Gentle yet potent — the flower that calms the nervous system, eases anxiety, and prepares the body for peaceful slumber. Safe for all ages.",
        elements: ["Sleep", "Air"],
        image: "🌼",
        rarity: "common",
        origin: "Europe",
        use: "One cup of tea 1 hour before sleep."
    },
    {
        id: "lavender",
        name: "Lavender Essence",
        description: "Clinically proven to reduce anxiety scores comparably to lorazepam. The aromatic compounds interact directly with the limbic system to dissolve tension.",
        elements: ["Stress", "Air"],
        image: "💜",
        rarity: "uncommon",
        origin: "Mediterranean",
        use: "Inhale essential oil or place near pillow."
    },
    {
        id: "peppermint",
        name: "Peppermint Leaf",
        description: "Cooling menthol clears the mind, reduces nausea, and soothes digestive discomfort. A natural analgesic for tension headaches when applied topically.",
        elements: ["Digestion", "Air"],
        image: "🍃",
        rarity: "common",
        origin: "Worldwide",
        use: "Tea after meals or oil on temples for headaches."
    },
    {
        id: "holy-basil",
        name: "Holy Basil (Tulsi)",
        description: "Sacred in Ayurveda for 3,000 years. Normalises blood glucose, reduces cortisol, and acts as a powerful adaptogen for building resilience to all forms of stress.",
        elements: ["Stress", "Earth"],
        image: "🪴",
        rarity: "rare",
        origin: "India",
        use: "3–5 fresh leaves daily or brew as tea."
    },
    {
        id: "melatonin",
        name: "Moonstone Extract",
        description: "A bioidentical form of your body's own sleep hormone. Resets disrupted circadian rhythms, especially after travel across time zones.",
        elements: ["Sleep", "Earth"],
        image: "🌙",
        rarity: "uncommon",
        origin: "Synthesised from plant sources",
        use: "0.5–3mg taken 30 minutes before target sleep time."
    },
    {
        id: "lions-mane",
        name: "Lion's Mane Mushroom",
        description: "The only known food source that stimulates Nerve Growth Factor production. Enhances memory, clarity, and neuroplasticity. The alchemist's brain tonic.",
        elements: ["Focus", "Earth"],
        image: "🍄",
        rarity: "legendary",
        origin: "Asia & North America",
        use: "500–1000mg extract daily in the morning."
    },
    {
        id: "echinacea",
        name: "Echinacea Bloom",
        description: "The immune sentinel. Clinical trials confirm it reduces cold duration by 1–4 days and decreases the likelihood of catching a cold by 26% when taken prophylactically.",
        elements: ["Immunity", "Fire"],
        image: "🌺",
        rarity: "uncommon",
        origin: "North America",
        use: "Take at first sign of illness for 7–10 days."
    },
    {
        id: "rhodiola",
        name: "Rhodiola Rosea",
        description: "The Arctic adaptogen used by Viking warriors and Soviet cosmonauts alike. Increases endurance, reduces burnout, and balances stress hormones.",
        elements: ["Stress", "Earth"],
        image: "❄️",
        rarity: "legendary",
        origin: "Arctic regions of Europe & Asia",
        use: "200–400mg extract in the morning on an empty stomach."
    },
];

const FILTERS = ["All", "Stress", "Sleep", "Digestion", "Focus", "Immunity"];

const RARITY_LABELS = {
    common: { label: "Common", color: "text-slate-500 bg-slate-50 border-slate-100" },
    uncommon: { label: "Uncommon", color: "text-blue-600 bg-blue-50 border-blue-100" },
    rare: { label: "Rare", color: "text-amber-600 bg-amber-50 border-amber-100" },
    legendary: { label: "Legendary", color: "text-purple-600 bg-purple-50 border-purple-100" },
};

export default function CodexPage() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);

    const filtered = MOCK_REMEDIES.filter(r => {
        const matchFilter = filter === "All" || r.elements.includes(filter);
        const matchSearch = search === "" ||
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.description.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    return (
        <div className="min-h-screen pt-24 px-6 pb-16 bg-rose-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-slate-900 mb-4 font-cinzel">
                        The Codex of Remedies
                    </h1>
                    <p className="text-slate-500 text-lg font-cormorant max-w-2xl mx-auto italic">
                        "Here lies the knowledge of the ancients, preserved in light."
                    </p>
                    <p className="text-slate-400 text-sm mt-2">{MOCK_REMEDIES.length} remedies catalogued</p>
                </div>

                {/* Search */}
                <div className="max-w-md mx-auto mb-6">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search remedies..."
                        className="w-full bg-white border border-rose-100 rounded-full px-6 py-3 text-slate-700 placeholder-slate-300 focus:outline-none focus:border-rose-400 transition-all font-cormorant text-lg text-center"
                    />
                </div>

                {/* Filters */}
                <div className="flex justify-center gap-3 mb-10 flex-wrap">
                    {FILTERS.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`px-5 py-2 rounded-full border transition-all duration-300 font-cinzel text-sm tracking-wider ${
                                filter === tag
                                    ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200"
                                    : "bg-white border-rose-100 text-slate-500 hover:border-rose-300 hover:text-rose-600"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Results count */}
                {(filter !== "All" || search) && (
                    <p className="text-center text-slate-400 font-cormorant italic mb-6 text-sm">
                        {filtered.length} remedy{filtered.length !== 1 ? "s" : ""} found
                    </p>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((remedy, index) => (
                        <motion.div
                            key={remedy.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group cursor-pointer"
                            onClick={() => setSelected(selected?.id === remedy.id ? null : remedy)}
                        >
                            <div className={`bg-white border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                                selected?.id === remedy.id ? "ring-2 ring-rose-400 shadow-xl shadow-rose-100" : "border-rose-100 hover:shadow-rose-100"
                            }`}>
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-4xl">{remedy.image}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${RARITY_LABELS[remedy.rarity]?.color}`}>
                                        {RARITY_LABELS[remedy.rarity]?.label}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold font-cinzel text-slate-800 mb-2 group-hover:text-rose-700 transition-colors">
                                    {remedy.name}
                                </h3>

                                <p className="text-slate-500 font-cormorant text-sm leading-relaxed mb-3 line-clamp-2">
                                    {remedy.description}
                                </p>

                                <div className="flex gap-2 flex-wrap">
                                    {remedy.elements.map(el => (
                                        <span key={el} className="px-2 py-0.5 bg-rose-50 text-rose-500 text-xs rounded-full border border-rose-100 font-cormorant">
                                            {el}
                                        </span>
                                    ))}
                                </div>

                                {/* Expanded detail */}
                                {selected?.id === remedy.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-4 pt-4 border-t border-rose-50 space-y-2"
                                    >
                                        <div className="flex gap-2 items-start">
                                            <span className="text-sm">🌍</span>
                                            <p className="text-slate-500 font-cormorant text-sm"><strong>Origin:</strong> {remedy.origin}</p>
                                        </div>
                                        <div className="flex gap-2 items-start">
                                            <span className="text-sm">📋</span>
                                            <p className="text-slate-500 font-cormorant text-sm"><strong>How to use:</strong> {remedy.use}</p>
                                        </div>
                                        <p className="text-slate-600 font-cormorant text-sm leading-relaxed">{remedy.description}</p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <span className="text-5xl mb-4 block">🔍</span>
                        <p className="text-slate-400 font-cormorant text-xl italic">No remedies found for your search.</p>
                        <button onClick={() => { setSearch(""); setFilter("All"); }} className="mt-4 text-rose-500 font-cinzel text-sm hover:underline">
                            Clear filters
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
