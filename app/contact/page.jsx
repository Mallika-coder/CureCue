"use client";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-24 px-6 pb-12 flex items-center justify-center bg-rose-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-white/80 border border-rose-100 p-10 rounded-3xl shadow-xl shadow-rose-100/50"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-cinzel text-rose-900 mb-4">
                        Send a Missive
                    </h1>
                    <p className="text-slate-500 font-cormorant text-lg italic">
                        "We await your words in the archives."
                    </p>
                </div>

                <div className="mb-8 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full border-4 border-rose-200 overflow-hidden shadow-xl mb-4">
                        <img src="/image.jpeg" alt="Mallika Verma" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-2xl font-bold font-cinzel text-rose-800">Mallika Verma</h2>
                    <p className="text-rose-500 font-medium text-sm tracking-widest uppercase mb-2">Grand Alchemist & Creator</p>
                    <p className="text-slate-600 text-center max-w-sm italic mb-4">
                        "Weaving ancient healing wisdom with the digital ether to craft a sanctuary for your soul."
                    </p>

                    <div className="flex gap-4 mb-6">
                        <a href="tel:9569714178" className="px-4 py-2 bg-white border border-rose-200 rounded-full text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-sm flex items-center gap-2 text-sm font-bold">
                            <span>📞</span> 9569714178
                        </a>
                        <a href="https://www.instagram.com/creative_mallika_0542/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity shadow-md flex items-center gap-2 text-sm font-bold">
                            <span>📸</span> @creative_mallika_0542
                        </a>
                    </div>
                </div>

                <form className="space-y-6 border-t border-rose-100 pt-8">
                    <div>
                        <label className="block text-rose-900 text-sm font-bold mb-2 uppercase tracking-wider">Name</label>
                        <input type="text" className="w-full bg-slate-50 border border-rose-100 rounded-lg px-4 py-3 text-slate-900 focus:border-rose-400 focus:outline-none transition-colors" placeholder="Your name..." />
                    </div>
                    <div>
                        <label className="block text-rose-900 text-sm font-bold mb-2 uppercase tracking-wider">Owl Post Address (Email)</label>
                        <input type="email" className="w-full bg-slate-50 border border-rose-100 rounded-lg px-4 py-3 text-slate-900 focus:border-rose-400 focus:outline-none transition-colors" placeholder="email@example.com" />
                    </div>
                    <div>
                        <label className="block text-rose-900 text-sm font-bold mb-2 uppercase tracking-wider">Message</label>
                        <textarea className="w-full bg-slate-50 border border-rose-100 rounded-lg px-4 py-3 text-slate-900 focus:border-rose-400 focus:outline-none transition-colors h-32" placeholder="Your inquiry..." />
                    </div>
                    <button type="button" className="w-full bg-rose-500 text-white font-bold py-3 rounded-lg hover:bg-rose-400 transition-colors font-cinzel tracking-wide shadow-lg shadow-rose-200">
                        Send Owl
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
