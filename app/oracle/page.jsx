"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OraclePage() {
    const [symptom, setSymptom] = useState("");
    const [isConsulting, setIsConsulting] = useState(false);
    const [insight, setInsight] = useState(null);

    const consultOracle = async () => {
        if (!symptom) return;
        setIsConsulting(true);
        setInsight(null);

        // Simulate Consultation Delay
        setTimeout(() => {
            const mockResponses = {
                "headache": {
                    cause: "Disruption in the mind's ether.",
                    suggestion: "Rest in a darkened chamber. Brew strict tea of Peppermint.",
                    element: "Air"
                },
                "stress": {
                    cause: "The fire of specific burdens burns too bright.",
                    suggestion: "Cooling winds of meditation. Practice 4-7-8 breathing.",
                    element: "Fire"
                },
                "sleep": {
                    cause: "The lunar tides pull your consciousness astray.",
                    suggestion: "Brew Valerian Root tea. Dim all lights one hour before rest.",
                    element: "Void"
                },
                "anxiety": {
                    cause: "The earth beneath your spirit trembles with unrest.",
                    suggestion: "Ground yourself with Ashwagandha. Walk barefoot on grass.",
                    element: "Earth"
                },
                "fatigue": {
                    cause: "Your vital essence has been depleted by excess.",
                    suggestion: "Consume iron-rich elixirs. Rest beneath sunlight for 15 minutes.",
                    element: "Fire"
                },
                "digestion": {
                    cause: "The cauldron of your stomach is unbalanced.",
                    suggestion: "Sip warm Golden Ginger brew. Avoid cold foods after sunset.",
                    element: "Earth"
                },
                "cold": {
                    cause: "The winds of illness have breached your defenses.",
                    suggestion: "Hot turmeric milk with black pepper. Steam inhalation with eucalyptus.",
                    element: "Air"
                },
                "skin": {
                    cause: "Toxins seek escape through your outer vessel.",
                    suggestion: "Apply aloe vera. Increase water intake to flush impurities.",
                    element: "Water"
                },
                "default": {
                    cause: "An imbalance of humors has been detected.",
                    suggestion: "Seek balance through hydration and sleep.",
                    element: "Water"
                }
            };

            const key = Object.keys(mockResponses).find(k => symptom.toLowerCase().includes(k)) || "default";

            setIsConsulting(false);
            setInsight(mockResponses[key]);
        }, 2000);
    };

    return (
        <div className="min-h-screen pt-24 px-6 flex flex-col items-center bg-rose-50">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl w-full text-center"
            >
                <span className="text-6xl mb-6 block animate-float">🔮</span>
                <h1 className="text-5xl font-cinzel font-bold text-slate-900 mb-4">
                    The Symptom Oracle
                </h1>
                <p className="text-slate-500 font-cormorant text-xl italic mb-12">
                    "Whisper your ailment to the ether, and receive clarity."
                </p>

                <div className="relative mb-12">
                    <input
                        type="text"
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                        placeholder="e.g. Aching head, weary spirit..."
                        className="w-full bg-white border border-rose-200 rounded-full px-8 py-5 text-xl text-slate-700 placeholder-slate-300 focus:outline-none focus:border-rose-400 focus:shadow-xl focus:shadow-rose-100 transition-all font-cormorant text-center"
                        onKeyDown={(e) => e.key === 'Enter' && consultOracle()}
                    />
                    <button
                        onClick={consultOracle}
                        disabled={isConsulting || !symptom}
                        className="absolute right-2 top-2 bottom-2 px-8 bg-rose-500 text-white rounded-full font-cinzel font-bold hover:bg-rose-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border border-rose-400"
                    >
                        {isConsulting ? "Divining..." : "Consult"}
                    </button>
                </div>

                <AnimatePresence>
                    {insight && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white border border-rose-100 p-10 rounded-3xl relative overflow-hidden shadow-xl shadow-rose-100"
                        >
                            <div className="absolute inset-0 bg-rose-50/50" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-cinzel text-rose-800 mb-6">The Oracle Speaks</h3>

                                <div className="grid gap-6 text-left">
                                    <div className="flex gap-4">
                                        <span className="text-2xl">🌒</span>
                                        <div>
                                            <h4 className="font-bold text-rose-500 text-sm uppercase tracking-wide mb-1">Root Cause</h4>
                                            <p className="text-slate-600 font-cormorant text-lg">{insight.cause}</p>
                                        </div>
                                    </div>

                                    <div className="w-full h-px bg-rose-100" />

                                    <div className="flex gap-4">
                                        <span className="text-2xl">🧪</span>
                                        <div>
                                            <h4 className="font-bold text-rose-500 text-sm uppercase tracking-wide mb-1">Alchemical Remedy</h4>
                                            <p className="text-slate-600 font-cormorant text-lg">{insight.suggestion}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-rose-100 flex justify-center gap-2 text-slate-400 text-sm">
                                    <span>Element: {insight.element}</span>
                                    <span>•</span>
                                    <span>Source: The Grimoire</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
