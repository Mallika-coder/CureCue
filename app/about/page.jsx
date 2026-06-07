"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-rose-50">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto text-center"
            >
                {/* Decorative Portal Background */}
                <div className="relative w-full h-64 md:h-80 mb-10 rounded-3xl overflow-hidden shadow-2xl shadow-rose-200 border-2 border-white/50">
                    <img
                        src="/portal-bg.png"
                        alt="Mystical Portal"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-50/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-0 right-0">
                        <h1 className="text-5xl font-bold font-cinzel text-rose-900 drop-shadow-sm">
                            The Archivist's Note
                        </h1>
                    </div>
                </div>

                <div className="bg-white/80 border border-id border-rose-100 p-10 rounded-3xl text-left space-y-8 font-cormorant text-xl leading-relaxed text-slate-600 shadow-xl shadow-rose-100/50">
                    <p>
                        <span className="text-rose-500 font-bold text-2xl float-left mr-2 leading-none">W</span>
                        elcome to <span className="text-rose-800 font-bold">The Alchemist's Grimoire</span>.
                        Our mission is simple yet profound: to bridge the gap between ancient healing wisdom and modern scientific understanding.
                    </p>

                    <p>
                        In an age of information overload, we bring <span className="text-rose-800 font-bold">clarity</span>.
                        We believe that wellness should be a ritual, not a routine.
                        By treating your health journey as a mastery of alchemy, we transform the mundane into the magical.
                    </p>

                    <div className="border-l-4 border-rose-200 pl-6 py-2 my-8 italic text-slate-800 text-2xl font-light">
                        "We do not merely cure illness; we master the balance of life itself."
                    </div>

                    <div>
                        <h3 className="text-2xl font-cinzel text-rose-700 mb-4">Our Ethical Stance</h3>
                        <ul className="list-disc pl-6 space-y-2 text-lg">
                            <li><strong className="text-slate-900">Evidence-Based:</strong> While we use mystical aesthetics, our health advice is grounded in verified medical science.</li>
                            <li><strong className="text-slate-900">Holistic:</strong> We consider mental, physical, and environmental factors as one interconnected system.</li>
                            <li><strong className="text-slate-900">Empowerment:</strong> We give you the knowledge to be the master of your own vessel.</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12">
                    <Link href="/" className="text-rose-500 hover:text-rose-400 font-cinzel font-bold border-b border-rose-200 hover:border-rose-400 transition-all">
                        Return to the Entrance
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
