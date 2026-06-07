"use client";
import { motion } from 'framer-motion';

export default function PotionCard({ name, effect, image, elements, rarity = 'common', onAction }) {
    const rarityColors = {
        common: 'border-rose-100 bg-white',
        uncommon: 'border-rose-200 bg-rose-50',
        rare: 'border-amber-200 bg-amber-50',
        legendary: 'border-purple-200 bg-purple-50',
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`relative p-5 rounded-2xl border ${rarityColors[rarity]} shadow-sm hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 group overflow-hidden`}
        >
            {/* Glow Effect */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-rose-200 to-transparent rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity" />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl border border-rose-100 text-rose-500">
                    {image || '⚗️'}
                </div>
                <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full bg-white/80 border ${rarity === 'rare' ? 'text-amber-600 border-amber-200' : 'text-slate-400 border-rose-100'
                    }`}>
                    {rarity}
                </span>
            </div>

            <h3 className="font-cinzel text-lg font-bold text-slate-800 mb-1 relative z-10 group-hover:text-rose-600 transition-colors">{name}</h3>
            <p className="text-sm text-slate-500 mb-4 h-10 line-clamp-2 relative z-10">{effect}</p>

            <div className="flex gap-2 mb-4 relative z-10">
                {elements?.map(el => (
                    <span key={el} className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                        {el}
                    </span>
                ))}
            </div>

            <button
                onClick={onAction}
                className="w-full py-2 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-rose-500 transition-colors shadow-lg shadow-slate-900/10 relative z-10"
            >
                Brew Potion
            </button>
        </motion.div>
    );
}
