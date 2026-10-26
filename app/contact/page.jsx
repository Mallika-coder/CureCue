"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setStatus("sending");

        // Simulate send (no backend yet — shows success after delay)
        setTimeout(() => {
            setStatus("sent");
            setForm({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-24 px-6 pb-16 bg-rose-50">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold font-cinzel text-rose-900 mb-4">
                        Send a Missive
                    </h1>
                    <p className="text-slate-500 font-cormorant text-xl italic">
                        "We await your words in the archives."
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Creator Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/80 border border-rose-100 p-8 rounded-3xl shadow-xl shadow-rose-100/50 flex flex-col items-center text-center"
                    >
                        <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-full border-4 border-rose-200 overflow-hidden shadow-xl">
                                <img src="/image.jpeg" alt="Mallika Verma" className="w-full h-full object-cover" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 text-2xl">✨</span>
                        </div>

                        <h2 className="text-2xl font-bold font-cinzel text-rose-800 mb-1">Mallika Verma</h2>
                        <p className="text-rose-500 font-medium text-xs tracking-widest uppercase mb-3">Grand Alchemist & Creator</p>

                        <p className="text-slate-600 font-cormorant italic text-lg leading-relaxed mb-6 max-w-xs">
                            "Weaving ancient healing wisdom with the digital ether to craft a sanctuary for your soul."
                        </p>

                        {/* Contact Links */}
                        <div className="flex flex-col gap-3 w-full">
                            <a
                                href="tel:9569714178"
                                className="flex items-center gap-3 px-5 py-3 bg-rose-50 border border-rose-100 rounded-xl text-slate-700 hover:bg-rose-100 hover:text-rose-700 transition-all group"
                            >
                                <span className="text-xl">📞</span>
                                <div className="text-left">
                                    <p className="text-xs text-slate-400 font-cinzel uppercase tracking-wider">Phone</p>
                                    <p className="font-bold text-sm">9569714178</p>
                                </div>
                            </a>

                            <a
                                href="https://www.instagram.com/creative_mallika_0542/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-pink-100 rounded-xl text-slate-700 hover:opacity-80 transition-all group"
                            >
                                <span className="text-xl">📸</span>
                                <div className="text-left">
                                    <p className="text-xs text-slate-400 font-cinzel uppercase tracking-wider">Instagram</p>
                                    <p className="font-bold text-sm text-pink-600">@creative_mallika_0542</p>
                                </div>
                            </a>

                            <a
                                href="https://github.com/Mallika-coder/CureCue"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 hover:bg-slate-100 transition-all group"
                            >
                                <span className="text-xl">💻</span>
                                <div className="text-left">
                                    <p className="text-xs text-slate-400 font-cinzel uppercase tracking-wider">GitHub</p>
                                    <p className="font-bold text-sm">Mallika-coder/CureCue</p>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 border border-rose-100 p-8 rounded-3xl shadow-xl shadow-rose-100/50"
                    >
                        <h3 className="text-xl font-cinzel text-slate-800 mb-6">Write Your Scroll</h3>

                        {status === "sent" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <span className="text-5xl mb-4 block">🦉</span>
                                <h4 className="text-xl font-cinzel text-emerald-700 mb-2">Owl Dispatched!</h4>
                                <p className="text-slate-500 font-cormorant text-lg italic">
                                    Your message has been sent into the ether. The Grand Alchemist shall receive it soon.
                                </p>
                                <button
                                    onClick={() => setStatus(null)}
                                    className="mt-6 text-rose-500 font-cinzel text-sm hover:underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-rose-900 text-xs font-bold mb-2 uppercase tracking-wider font-cinzel">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        required
                                        className="w-full bg-slate-50 border border-rose-100 rounded-xl px-4 py-3 text-slate-900 focus:border-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-200 transition-all font-cormorant text-lg"
                                        placeholder="Your name..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-rose-900 text-xs font-bold mb-2 uppercase tracking-wider font-cinzel">
                                        Owl Post (Email)
                                    </label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        required
                                        className="w-full bg-slate-50 border border-rose-100 rounded-xl px-4 py-3 text-slate-900 focus:border-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-200 transition-all font-cormorant text-lg"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-rose-900 text-xs font-bold mb-2 uppercase tracking-wider font-cinzel">
                                        Your Message
                                    </label>
                                    <textarea
                                        value={form.message}
                                        onChange={e => setForm({ ...form, message: e.target.value })}
                                        required
                                        rows={5}
                                        className="w-full bg-slate-50 border border-rose-100 rounded-xl px-4 py-3 text-slate-900 focus:border-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-200 transition-all font-cormorant text-lg resize-none"
                                        placeholder="Share your thoughts, questions, or ideas..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="w-full bg-rose-500 text-white font-bold py-3.5 rounded-xl hover:bg-rose-400 transition-all font-cinzel tracking-wide shadow-lg shadow-rose-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {status === "sending" ? "Dispatching Owl..." : "Send Owl 🦉"}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
