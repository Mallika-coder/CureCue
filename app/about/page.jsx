"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const TEAM_VALUES = [
    {
        icon: "🔬",
        title: "Evidence-Based",
        desc: "While we use mystical aesthetics, every health recommendation is grounded in peer-reviewed science and verified medical research."
    },
    {
        icon: "🌀",
        title: "Holistic",
        desc: "We consider mental, physical, and environmental factors as one interconnected system — not isolated symptoms to be suppressed."
    },
    {
        icon: "⚡",
        title: "Empowerment",
        desc: "We give you the knowledge, tools, and rituals to become the master of your own vessel — not dependent on a system."
    },
    {
        icon: "🌿",
        title: "Natural First",
        desc: "We believe nature's pharmacy was here long before ours. Ancient herbal wisdom, validated by modern science, is our foundation."
    },
];

const STATS = [
    { value: "12+", label: "Herbal Remedies" },
    { value: "8", label: "Symptom Analyses" },
    { value: "∞", label: "Potions to Brew" },
    { value: "1", label: "Alchemist Creator" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 px-6 pb-16 bg-rose-50">
            <div className="max-w-4xl mx-auto">

                {/* Hero Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full h-64 md:h-80 mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-rose-200 border-2 border-white/50"
                >
                    <img
                        src="/portal-bg.png"
                        alt="Mystical Portal"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-900/20 to-transparent" />
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-cinzel text-white drop-shadow-lg">
                            The Archivist's Note
                        </h1>
                        <p className="text-rose-200 font-cormorant italic mt-2 text-lg">Where ancient wisdom meets modern science</p>
                    </div>
                </motion.div>

                {/* Mission Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/80 border border-rose-100 p-10 rounded-3xl font-cormorant text-xl leading-relaxed text-slate-600 shadow-xl shadow-rose-100/50 mb-10"
                >
                    <p className="mb-6">
                        <span className="text-rose-500 font-bold text-3xl float-left mr-2 leading-none font-cinzel">W</span>
                        elcome to <span className="text-rose-800 font-bold">The Alchemist's Grimoire</span> — CureCue.
                        Our mission is simple yet profound: to bridge the gap between ancient healing wisdom and modern scientific understanding.
                    </p>
                    <p className="mb-6">
                        In an age of information overload, we bring <span className="text-rose-800 font-bold">clarity</span>.
                        We believe wellness should be a ritual, not a routine. By treating your health journey as the mastery of alchemy,
                        we transform the mundane into the magical.
                    </p>
                    <blockquote className="border-l-4 border-rose-200 pl-6 py-2 my-8 italic text-slate-800 text-2xl font-light">
                        "We do not merely cure illness; we master the balance of life itself."
                    </blockquote>
                    <p>
                        Your body is not a problem to be fixed — it is a laboratory to be understood. Every potion you brew,
                        every symptom you consult the Oracle about, every remedy you study in the Codex — these are steps
                        on the path to becoming the master alchemist of your own existence.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                >
                    {STATS.map((stat, i) => (
                        <div key={i} className="bg-white border border-rose-100 rounded-2xl p-6 text-center shadow-sm">
                            <p className="text-3xl font-bold font-cinzel text-rose-500 mb-1">{stat.value}</p>
                            <p className="text-slate-500 font-cormorant text-sm">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Values */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/80 border border-rose-100 p-10 rounded-3xl shadow-xl shadow-rose-100/50 mb-10"
                >
                    <h3 className="text-2xl font-cinzel text-rose-700 mb-6 text-center">Our Pillars</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {TEAM_VALUES.map((val, i) => (
                            <div key={i} className="flex gap-4 items-start p-4 bg-rose-50/50 rounded-2xl">
                                <span className="text-2xl mt-0.5">{val.icon}</span>
                                <div>
                                    <h4 className="font-bold font-cinzel text-slate-800 mb-1">{val.title}</h4>
                                    <p className="text-slate-500 font-cormorant text-sm leading-relaxed">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center space-x-6"
                >
                    <Link href="/register" className="inline-block bg-rose-500 text-white font-cinzel font-bold px-8 py-3 rounded-xl hover:bg-rose-400 transition-colors shadow-lg shadow-rose-200">
                        Begin Your Journey
                    </Link>
                    <Link href="/" className="inline-block text-rose-500 hover:text-rose-400 font-cinzel font-bold border-b border-rose-200 hover:border-rose-400 transition-all">
                        Return to the Entrance
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
