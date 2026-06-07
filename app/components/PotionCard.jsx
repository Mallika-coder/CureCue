
// components/PotionCard.jsx
// import { CheckCircle, Clock, Droplet, Sparkles } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function PotionCard({ potion }) {
//   return (
//     <motion.div 
//       whileHover={{ y: -8, scale: 1.02 }}
//       className="relative overflow-hidden rounded-3xl p-6 border-2 border-[#fbbf24]/30 bg-[#022c22] shadow-[0_10px_30px_rgba(0,0,0,0.5)] group transition-all duration-500"
//     >
//       {/* 1. Background Texture Overlay for better legibility */}
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

//       {/* 2. Header Section */}
//       <div className="flex items-start justify-between mb-6 relative z-10">
//         <div className="flex items-center space-x-4">
//           {/* Icon Container */}
//           <div className="w-14 h-14 bg-[#051512] border border-[#fbbf24]/40 rounded-2xl flex items-center justify-center shadow-inner group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
//              <Droplet className="w-7 h-7 text-[#10b981] group-hover:animate-bounce" />
//           </div>

//           <div>
//             {/* Title - Stronger Font Weight */}
//             <h3 className="text-2xl font-bold text-white group-hover:text-[#fbbf24] transition-colors duration-300 tracking-tight leading-none mb-1">
//               {potion.name}
//             </h3>
//             <div className="flex items-center gap-1 text-[#10b981] text-sm font-semibold italic">
//               <Sparkles className="w-3 h-3 text-[#fbbf24]" />
//               <span>{potion.dosage} formula</span>
//             </div>
//           </div>
//         </div>

//         {/* Time Badge - High Visibility */}
//         <div className="bg-[#051512] border border-[#fbbf24]/40 px-3 py-1.5 rounded-xl shadow-lg">
//           <div className="flex items-center space-x-1.5 text-[#fbbf24] font-black">
//             <Clock className="w-4 h-4" />
//             <span className="text-sm tracking-tighter">{potion.time}</span>
//           </div>
//         </div>
//       </div>

//       {/* 3. Details Section - Fixed Contrast */}
//       <div className="space-y-3 mb-6 relative z-10">
//         <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
//           <span className="text-white/60 font-medium">Potency Level</span>
//           <span className="text-[#fbbf24] font-bold">Standard Ritual</span>
//         </div>
//         <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
//           <span className="text-white/60 font-medium">Status</span>
//           <span className="text-[#10b981] font-bold uppercase tracking-widest text-[10px]">Active Elixir</span>
//         </div>
//       </div>

//       {/* 4. Action Button - 10/10 Gold Style */}
//       <button className="w-full relative group/btn overflow-hidden py-4 rounded-2xl bg-[#fbbf24] text-[#022c22] font-black uppercase tracking-widest text-xs transition-all shadow-[0_5px_15px_rgba(251,191,36,0.3)] hover:shadow-[0_8px_25px_rgba(251,191,36,0.5)] active:scale-95 z-10">
//         <div className="flex items-center justify-center gap-2">
//           <CheckCircle className="w-5 h-5" />
//           <span>Consume Formula</span>
//         </div>
//         {/* Shine animation */}
//         <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
//       </button>

//       {/* Subtle Glow in corner */}
//       <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#fbbf24]/5 rounded-full blur-3xl pointer-events-none"></div>
//     </motion.div>
//   );
// }

// components/PotionCard.jsx
import { CheckCircle, Clock, Droplet, Sparkles, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PotionCard({ potion, onDelete, onMarkTaken }) {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.01 }}
      className="relative overflow-hidden rounded-[2.5rem] p-8 border-2 border-[#fbbf24]/20 bg-[#022c22] shadow-[0_20px_50px_rgba(0,0,0,0.6)] group transition-all duration-500"
    >
      {/* 1. Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      {/* 2. Header Section */}
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="flex items-center space-x-5">
          {/* Animated Icon Container */}
          <div className="w-16 h-16 bg-[#051512] border-2 border-[#fbbf24]/30 rounded-2xl flex items-center justify-center shadow-inner group-hover:border-[#10b981]/50 transition-all">
             <Droplet className="w-8 h-8 text-[#10b981] group-hover:animate-pulse" />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white group-hover:text-[#fbbf24] transition-colors tracking-tighter mb-1">
              {potion.name}
            </h3>
            <div className="flex items-center gap-1.5 text-[#10b981] text-sm font-bold italic">
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span className="tracking-wide">{potion.dosage} Formula</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Time & Delete */}
        <div className="flex flex-col items-end gap-3">
          <div className="bg-[#051512] border border-[#fbbf24]/40 px-4 py-2 rounded-xl shadow-lg">
            <div className="flex items-center space-x-2 text-[#fbbf24] font-black">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{potion.time}</span>
            </div>
          </div>
          
          {/* Delete Button (Optional) */}
          <button 
            onClick={() => onDelete(potion.id)}
            className="p-2 text-white/20 hover:text-red-500 transition-colors"
            title="Discard Potion"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* 3. Ritual Stats Section */}
      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Potency</p>
          <p className="text-[#fbbf24] font-bold text-sm">High Ritual</p>
        </div>
        <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Frequency</p>
          <p className="text-[#10b981] font-bold text-sm">Daily Cycle</p>
        </div>
      </div>

      {/* 4. Action Button - Enhanced 3D Effect */}
      <button 
        onClick={() => onMarkTaken(potion.id)}
        className="w-full relative group/btn overflow-hidden py-5 rounded-2xl bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] text-[#022c22] font-black uppercase tracking-widest text-xs transition-all shadow-[0_10px_20px_rgba(0,0,0,0.4)] active:scale-95 z-10"
      >
        <div className="flex items-center justify-center gap-3 relative z-10">
          <CheckCircle className="w-5 h-5" />
          <span>Mark as Consumed</span>
        </div>
        
        {/* Shine Sweep Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
      </button>

      {/* Decorative Corner Glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#fbbf24]/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#10b981]/10 transition-colors duration-1000"></div>
    </motion.div>
  );
}