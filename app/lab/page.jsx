"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from '@/components/Sidebar';
import PotionCard from '@/components/PotionCard';
import RoutineCalendar from '@/components/RoutineCalendar';

export default function AlchemyLabPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Potions List
    const [potions, setPotions] = useState([
        { name: "Morning Clarity", effect: "Increases focus.", image: "☕", elements: ['Water', 'Fire'], rarity: "common" },
        { name: "Deep Rest Tincture", effect: "Induces REM sleep.", image: "🌙", elements: ['Earth', 'Void'], rarity: "rare" }
    ]);

    // Calendar Events
    const [calendarEvents, setCalendarEvents] = useState([
        { title: 'Sun Salutation', time: '07:00', type: 'Ritual', icon: '☀️' },
        { title: 'Morning Clarity Brew', time: '08:00', type: 'Potion', icon: '☕' },
        { title: 'Moonlight Meditation', time: '21:00', type: 'Ritual', icon: '🧘' }
    ]);

    // New Potion Form State
    const [newPotion, setNewPotion] = useState({ name: '', effect: '', elements: ['Water'], rarity: 'common', time: '12:00' });

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error("Not authenticated");
            })
            .then((data) => {
                setUser(data.user);
                setLoading(false);
            })
            .catch(() => {
                // Fallback for demo
                setUser({ name: "Traveler", role: "Novice" });
                setLoading(false);
            });
    }, [router]);

    const handleAddPotion = () => {
        if (!newPotion.name) return;

        const emojiMap = { Water: '💧', Fire: '🔥', Earth: '🌿', Air: '💨', Void: '🔮' };
        const icon = emojiMap[newPotion.elements[0]] || '🧪';

        // 1. Add to Potions List
        setPotions([...potions, { ...newPotion, image: icon }]);

        // 2. Add to Calendar
        if (newPotion.time) {
            setCalendarEvents(prev => [...prev, {
                title: `Brew: ${newPotion.name}`,
                time: newPotion.time,
                type: 'Potion',
                icon: icon
            }]);
        }

        setIsModalOpen(false);
        setNewPotion({ name: '', effect: '', elements: ['Water'], rarity: 'common', time: '12:00' });
    };

    return (
        <div className="min-h-screen bg-rose-50 flex">
            <Sidebar />

            <main className="flex-1 md:ml-[250px] p-8 pt-24 md:pt-8 transition-all duration-300">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold font-cinzel text-slate-900">Alchemy Lab</h1>
                        <p className="text-slate-500 font-cormorant">Your daily rituals and concoctions.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-white border border-rose-100 flex items-center justify-center shadow-sm text-rose-500">
                            🔔
                        </div>
                    </div>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Rituals Complete', val: '85%', color: 'bg-emerald-400' },
                        { label: 'Grimoire Level', val: '3', color: 'bg-rose-400' },
                        { label: 'Active Potions', val: '2', color: 'bg-indigo-400' },
                        { label: 'Streak', val: '5 Days', color: 'bg-amber-400' },
                    ].map((s) => (
                        <div key={s.label} className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">{s.val}</p>
                            </div>
                            <div className={`w-2 h-10 rounded-full ${s.color}`} />
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                                <h2 className="text-2xl font-bold text-slate-800 font-cinzel flex items-center gap-2">
                                    <span className="text-rose-500">⚗️</span> Active Brews
                                </h2>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="group relative px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-xl">+</span>
                                        <span>Brew New Potion</span>
                                    </span>
                                </button>
                            </div>

                            {/* Success Message */}
                            <AnimatePresence>
                                {potions.length > 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2"
                                    >
                                        <span>✓</span>
                                        <p className="text-sm font-bold">Success! Your new potion has been brewed and added to the Almanac.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {potions.map((p, idx) => (
                                    <PotionCard
                                        key={idx}
                                        name={p.name}
                                        effect={p.effect}
                                        image={p.image}
                                        elements={p.elements}
                                        rarity={p.rarity}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Add Potion Modal */}
                        <AnimatePresence>
                            {isModalOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-rose-100 max-h-[90vh] overflow-y-auto"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold font-cinzel text-slate-800">Brew New Potion</h3>
                                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500">✕</button>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-1">Potion Name</label>
                                                <input
                                                    value={newPotion.name}
                                                    onChange={e => setNewPotion({ ...newPotion, name: e.target.value })}
                                                    className="w-full px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-400"
                                                    placeholder="e.g. Urikind"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Brewing Time</label>
                                                    <input
                                                        type="time"
                                                        value={newPotion.time}
                                                        onChange={e => setNewPotion({ ...newPotion, time: e.target.value })}
                                                        className="w-full px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-400"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Effect / Purpose</label>
                                                    <input
                                                        value={newPotion.effect}
                                                        onChange={e => setNewPotion({ ...newPotion, effect: e.target.value })}
                                                        className="w-full px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-400"
                                                        placeholder="e.g. Energy"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Element</label>
                                                    <select
                                                        onChange={e => setNewPotion({ ...newPotion, elements: [e.target.value] })}
                                                        className="w-full px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-400"
                                                    >
                                                        <option value="Water">Water</option>
                                                        <option value="Fire">Fire</option>
                                                        <option value="Earth">Earth</option>
                                                        <option value="Air">Air</option>
                                                        <option value="Void">Void</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Rarity</label>
                                                    <select
                                                        onChange={e => setNewPotion({ ...newPotion, rarity: e.target.value })}
                                                        className="w-full px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl focus:outline-none focus:border-rose-400"
                                                    >
                                                        <option value="common">Common</option>
                                                        <option value="rare">Rare</option>
                                                        <option value="legendary">Legendary</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleAddPotion}
                                                className="w-full py-3 bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors mt-4"
                                            >
                                                Begin Brewing
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Integrated Routine Calendar */}
                        <RoutineCalendar events={calendarEvents} />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl shadow-rose-200">
                            <h3 className="font-cinzel font-bold text-lg mb-2">Daily Wisdom</h3>
                            <p className="font-cormorant text-xl italic opacity-95 mb-4">"The body is the garden, the will is the gardener."</p>
                            <div className="flex items-center gap-2 text-sm opacity-80">
                                <span>— Shakespeare</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 font-cinzel">Recommended</h3>
                            <div className="flex items-center gap-3 mb-4 p-3 bg-rose-50 rounded-xl border border-rose-100">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm text-green-600">🍵</div>
                                <div>
                                    <p className="font-bold text-sm text-slate-700">Matcha Tea</p>
                                    <p className="text-xs text-slate-500">Antioxidant Boost</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
