"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_ITEMS = [
    { name: 'Dashboard', path: '/lab', icon: '⚗️' },
    { name: 'Grimoire Codex', path: '/codex', icon: '📖' },
    { name: 'Symptom Oracle', path: '/oracle', icon: '🔮' },
    { name: 'Scrolls', path: '/scrolls', icon: '📜' },
    { name: 'About', path: '/about', icon: '✨' },
    { name: 'Contact', path: '/contact', icon: '💌' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <motion.aside
                initial={{ width: 250 }}
                animate={{ width: isOpen ? 250 : 80 }}
                className="fixed left-0 top-0 h-full bg-white/70 backdrop-blur-xl border-r border-rose-200 z-40 hidden md:flex flex-col shadow-lg shadow-rose-100/50"
            >
                <div className="p-6 flex items-center justify-between">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xl font-bold font-cinzel text-rose-800"
                            >
                                Alchemist
                            </motion.span>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 hover:bg-rose-50 rounded-lg text-rose-500 transition-colors"
                    >
                        {isOpen ? '◀' : '▶'}
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {MENU_ITEMS.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link key={item.path} href={item.path}>
                                <div
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                        ? 'bg-rose-400 text-white shadow-md shadow-rose-300/50'
                                        : 'hover:bg-rose-50 text-slate-600 hover:text-rose-500'
                                        }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="font-medium whitespace-nowrap overflow-hidden"
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {isActive && isOpen && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-rose-100">
                    <div className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-rose-50 to-white border border-rose-100 ${!isOpen && 'justify-center'}`}>
                        <div className="w-8 h-8 rounded-full bg-rose-400 flex items-center justify-center text-white text-xs font-bold">
                            M
                        </div>
                        {isOpen && (
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-slate-800">Mallika V.</p>
                                <p className="text-xs text-rose-400">Novice</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Mobile Trigger */}
            <div className="md:hidden fixed bottom-4 left-4 z-50">
                <button className="w-12 h-12 bg-rose-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl">
                    ☰
                </button>
            </div>
        </>
    );
}
