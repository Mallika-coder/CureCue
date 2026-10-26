"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ELEMENT_COLORS = {
    Air: "from-blue-50 to-cyan-50 border-blue-100",
    Fire: "from-orange-50 to-red-50 border-red-100",
    Earth: "from-emerald-50 to-green-50 border-emerald-100",
    Water: "from-blue-50 to-indigo-50 border-blue-100",
    Void: "from-purple-50 to-violet-50 border-purple-100",
};

const ELEMENT_ICONS = {
    Air: "🌬️", Fire: "🔥", Earth: "🌿", Water: "💧", Void: "🌙",
};

const mockResponses = {
    headache: {
        cause: "Disruption in the mind's ether — often tension, dehydration, or screen strain.",
        suggestion: "Rest in a darkened chamber. Brew peppermint tea and apply cool compress to your forehead. Drink 500ml of water immediately.",
        element: "Air",
        herbs: ["Peppermint", "Feverfew", "Lavender"],
        tip: "Most headaches resolve within 30 minutes of proper hydration."
    },
    stress: {
        cause: "The fire of burdens burns too bright, depleting your vital essence.",
        suggestion: "Practice 4-7-8 breathing: inhale 4 counts, hold 7, exhale 8. Take Ashwagandha daily for sustained relief.",
        element: "Fire",
        herbs: ["Ashwagandha", "Holy Basil", "Rhodiola"],
        tip: "Adaptogens take 2–4 weeks of consistent use to show full effect."
    },
    sleep: {
        cause: "The lunar tides pull your consciousness astray from its natural rhythm.",
        suggestion: "Brew Valerian Root tea 1 hour before sleep. Dim all lights. No screens after 9pm. Try 10 minutes of journaling to clear mental clutter.",
        element: "Void",
        herbs: ["Valerian Root", "Chamomile", "Passionflower"],
        tip: "Consistent sleep and wake times — even on weekends — reset your circadian rhythm fastest."
    },
    anxiety: {
        cause: "The earth beneath your spirit trembles — your nervous system is in overdrive.",
        suggestion: "Ground yourself: place bare feet on earth or grass. Ashwagandha twice daily. Limit caffeine intake before noon.",
        element: "Earth",
        herbs: ["Ashwagandha", "Lemon Balm", "Kava"],
        tip: "Cold water on your face activates the dive reflex, instantly slowing your heart rate."
    },
    fatigue: {
        cause: "Your vital essence has been depleted — iron, B12, or sleep debt may be the culprit.",
        suggestion: "Consume iron-rich foods (spinach, lentils). Rest beneath morning sunlight for 15 minutes. Check for iron or vitamin D deficiency.",
        element: "Fire",
        herbs: ["Maca Root", "Ginseng", "Rhodiola"],
        tip: "10 minutes of sunlight before 10am boosts daytime energy more than an extra cup of coffee."
    },
    digestion: {
        cause: "The cauldron of your stomach is unbalanced — gut flora or inflammation is disrupted.",
        suggestion: "Sip warm Golden Ginger brew after meals. Avoid cold drinks with food. Add fermented foods like yoghurt or kefir to your daily diet.",
        element: "Earth",
        herbs: ["Ginger", "Peppermint", "Fennel"],
        tip: "Chewing food 20–30 times per bite dramatically improves digestion and nutrient absorption."
    },
    cold: {
        cause: "The winds of illness have breached your outer defenses.",
        suggestion: "Hot turmeric milk with black pepper and honey. Steam inhalation with eucalyptus oil. Rest — sleep is the most powerful immune booster.",
        element: "Air",
        herbs: ["Turmeric", "Echinacea", "Elderberry"],
        tip: "Zinc lozenges within 24 hours of first symptoms can reduce cold duration by 30–40%."
    },
    skin: {
        cause: "Toxins seek escape through your outer vessel — often linked to gut health or inflammation.",
        suggestion: "Apply aloe vera gel directly. Increase water intake to 3 litres daily. Reduce sugar and dairy for 2 weeks and observe changes.",
        element: "Water",
        herbs: ["Aloe Vera", "Neem", "Calendula"],
        tip: "Skin issues often mirror gut health — healing your gut is the most effective skincare routine."
    },
    fever: {
        cause: "Your body's alchemical fires have been activated to burn away invaders.",
        suggestion: "Stay hydrated above all else. Cool compress on forehead. Seek medical attention if above 39.5°C or lasting more than 3 days.",
        element: "Fire",
        herbs: ["Elderflower", "Yarrow", "Willow Bark"],
        tip: "A mild fever (37.5–38.5°C) is your immune system working — do not suppress it unless uncomfortable."
    },
    energy: {
        cause: "Your life force flows inconsistently — rhythm and nourishment are out of alignment.",
        suggestion: "Start your morning with 500ml of water before coffee. Add Maca or Ginseng to your morning routine. Eat whole foods every 3–4 hours.",
        element: "Fire",
        herbs: ["Maca Root", "Ginseng", "Cordyceps"],
        tip: "Energy follows oxygen — 5 deep belly breaths in the morning can boost alertness immediately."
    },
    focus: {
        cause: "The mind's ether is scattered — distraction and mental fog cloud your clarity.",
        suggestion: "Lion's Mane mushroom supports nerve growth factor. Eliminate distractions for 25-minute blocks (Pomodoro). Hydrate well — even 1% dehydration cuts focus by 13%.",
        element: "Air",
        herbs: ["Lion's Mane", "Bacopa", "Ginkgo Biloba"],
        tip: "The most productive people work in focused 90-minute ultradian rhythm cycles with 20-minute breaks."
    },
    pain: {
        cause: "Inflammation has taken root in your vessel — the body's distress signal is sounding.",
        suggestion: "Turmeric with black pepper is a natural COX-2 inhibitor. Apply warm compress. Gentle movement increases blood flow to reduce chronic pain.",
        element: "Fire",
        herbs: ["Turmeric", "Boswellia", "White Willow Bark"],
        tip: "Anti-inflammatory diet — rich in omega-3s, berries, and leafy greens — can reduce chronic pain by 30% within weeks."
    },
    default: {
        cause: "An imbalance of humors has been detected in your vessel.",
        suggestion: "Begin with the foundations: drink more water, sleep 7–9 hours, and move your body daily for 20 minutes. These three alone resolve most ailments.",
        element: "Water",
        herbs: ["Turmeric", "Ashwagandha", "Chamomile"],
        tip: "The greatest medicine is a proper night's sleep, clean water, and time in nature."
    }
};

const SUGGESTIONS = ["headache", "stress", "sleep", "anxiety", "fatigue", "digestion", "cold", "skin", "fever", "energy", "focus", "pain"];

export default function OraclePage() {
    const [symptom, setSymptom] = useState("");
    const [isConsulting, setIsConsulting] = useState(false);
    const [insight, setInsight] = useState(null);
    const [history, setHistory] = useState([]);

    const consultOracle = async () => {
        if (!symptom.trim()) return;
        setIsConsulting(true);
        setInsight(null);

        setTimeout(() => {
            const key = Object.keys(mockResponses).find(k =>
                k !== "default" && symptom.toLowerCase().includes(k)
            ) || "default";

            const result = mockResponses[key];
            setInsight(result);
            setHistory(prev => [{ symptom, result, key }, ...prev.slice(0, 4)]);
            setIsConsulting(false);
        }, 1800);
    };

    const elementStyle = insight ? (ELEMENT_COLORS[insight.element] || ELEMENT_COLORS.Water) : "";

    return (
        <div className="min-h-screen pt-24 px-4 pb-16 bg-rose-50">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <span className="text-6xl mb-4 block animate-float">🔮</span>
                    <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-slate-900 mb-3">
                        The Symptom Oracle
                    </h1>
                    <p className="text-slate-500 font-cormorant text-xl italic">
                        "Whisper your ailment to the ether, and receive clarity."
                    </p>
                </motion.div>

                {/* Quick Suggestion Pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 justify-center mb-6"
                >
                    {SUGGESTIONS.slice(0, 8).map((s) => (
                        <button
                            key={s}
                            onClick={() => setSymptom(s)}
                            className="px-3 py-1.5 bg-white border border-rose-100 text-rose-500 rounded-full text-sm font-cormorant hover:bg-rose-50 hover:border-rose-300 transition-all capitalize"
                        >
                            {s}
                        </button>
                    ))}
                </motion.div>

                {/* Input */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative mb-8"
                >
                    <input
                        type="text"
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                        placeholder="e.g. headache, fatigue, stress, sleep..."
                        className="w-full bg-white border border-rose-200 rounded-full px-8 py-4 text-lg text-slate-700 placeholder-slate-300 focus:outline-none focus:border-rose-400 focus:shadow-xl focus:shadow-rose-100 transition-all font-cormorant text-center"
                        onKeyDown={(e) => e.key === "Enter" && consultOracle()}
                    />
                    <button
                        onClick={consultOracle}
                        disabled={isConsulting || !symptom.trim()}
                        className="absolute right-2 top-2 bottom-2 px-6 bg-rose-500 text-white rounded-full font-cinzel font-bold hover:bg-rose-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm"
                    >
                        {isConsulting ? "Divining..." : "Consult"}
                    </button>
                </motion.div>

                {/* Consulting Loader */}
                <AnimatePresence>
                    {isConsulting && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-8"
                        >
                            <span className="text-4xl animate-spin inline-block">✨</span>
                            <p className="text-rose-400 font-cormorant italic text-lg mt-3">The Oracle peers into your essence...</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Result Card */}
                <AnimatePresence>
                    {insight && !isConsulting && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`bg-gradient-to-br ${elementStyle} border p-8 rounded-3xl shadow-xl mb-8`}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl">{ELEMENT_ICONS[insight.element]}</span>
                                <div>
                                    <h3 className="text-xl font-cinzel text-slate-800">The Oracle Speaks</h3>
                                    <p className="text-slate-500 text-sm">Element: {insight.element}</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="flex gap-3">
                                    <span className="text-xl mt-0.5">🌒</span>
                                    <div>
                                        <h4 className="font-bold text-rose-600 text-xs uppercase tracking-widest mb-1">Root Cause</h4>
                                        <p className="text-slate-700 font-cormorant text-lg leading-relaxed">{insight.cause}</p>
                                    </div>
                                </div>

                                <div className="h-px bg-white/60" />

                                <div className="flex gap-3">
                                    <span className="text-xl mt-0.5">🧪</span>
                                    <div>
                                        <h4 className="font-bold text-rose-600 text-xs uppercase tracking-widest mb-1">Alchemical Remedy</h4>
                                        <p className="text-slate-700 font-cormorant text-lg leading-relaxed">{insight.suggestion}</p>
                                    </div>
                                </div>

                                <div className="h-px bg-white/60" />

                                <div className="flex gap-3">
                                    <span className="text-xl mt-0.5">🌱</span>
                                    <div>
                                        <h4 className="font-bold text-rose-600 text-xs uppercase tracking-widest mb-1">Recommended Herbs</h4>
                                        <div className="flex gap-2 flex-wrap mt-1">
                                            {insight.herbs.map(h => (
                                                <span key={h} className="px-3 py-1 bg-white/70 border border-white text-slate-600 rounded-full text-sm font-cormorant">
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/50 rounded-xl p-4 flex gap-3 items-start">
                                    <span className="text-lg">💡</span>
                                    <p className="text-slate-600 font-cormorant text-sm italic">{insight.tip}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* History */}
                {history.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4"
                    >
                        <h3 className="text-sm font-cinzel text-slate-400 uppercase tracking-widest mb-3 text-center">Recent Consultations</h3>
                        <div className="flex gap-2 flex-wrap justify-center">
                            {history.slice(1).map((h, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setSymptom(h.symptom); setInsight(h.result); }}
                                    className="px-4 py-2 bg-white border border-rose-100 rounded-full text-slate-500 text-sm font-cormorant hover:border-rose-300 hover:text-rose-600 transition-all capitalize"
                                >
                                    {h.symptom}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Disclaimer */}
                <p className="text-center text-slate-300 text-xs font-cormorant mt-10 italic">
                    The Oracle provides wellness guidance rooted in traditional herbalism and lifestyle science. Always consult a medical professional for serious symptoms.
                </p>
            </div>
        </div>
    );
}
