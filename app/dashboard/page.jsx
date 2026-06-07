// 'use client';

// import React, { useState, useEffect, Suspense } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useRouter, useSearchParams } from 'next/navigation';
// import Sidebar from '@/app/components/Sidebar';
// import PotionCard from '@/app/components/PotionCard';
// import ChatWidget from '@/app/components/ChatWidget';

// /* ---------------- DASHBOARD CONTENT ---------------- */
// const bgMap = {
//   Dashboard: "from-indigo-950 via-purple-900 to-slate-900",
//   Potions: "from-emerald-950 via-teal-900 to-slate-900",
//   Calendar: "from-purple-950 via-fuchsia-900 to-slate-900",
//   Rewards: "from-yellow-900 via-amber-900 to-slate-900",
// };

// function DashboardContent() {
//   const searchParams = useSearchParams();
//   const initialView = searchParams.get('view') || 'Dashboard';
//   const [activeView, setActiveView] = useState(initialView);
//   const [potions, setPotions] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//       return;
//     }

//     fetch('/api/potions', {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(data => setPotions(data))
//       .catch(err => console.error('Potion fetch error', err));
//   }, [router]);

//  return (
//   <div
//     className={`min-h-screen w-full bg-gradient-to-br ${
//       bgMap[activeView] || bgMap.Dashboard
//     } flex relative overflow-hidden transition-all duration-700`}
//   >

//     {/* Dynamic Background Glow Orbs */}
//     <div className="absolute inset-0 pointer-events-none transition-all duration-700">
//       {activeView === "Dashboard" && (
//         <div className="absolute top-24 left-16 w-[28rem] h-[28rem] bg-indigo-500/30 blur-3xl rounded-full animate-pulse" />
//       )}

//       {activeView === "Potions" && (
//         <div className="absolute bottom-24 right-24 w-[30rem] h-[30rem] bg-emerald-400/30 blur-3xl rounded-full animate-pulse" />
//       )}

//       {activeView === "Calendar" && (
//         <div className="absolute top-28 right-20 w-[28rem] h-[28rem] bg-purple-500/30 blur-3xl rounded-full animate-pulse" />
//       )}

//       {activeView === "Rewards" && (
//         <div className="absolute top-1/3 left-1/3 w-[32rem] h-[32rem] bg-yellow-400/25 blur-3xl rounded-full animate-pulse" />
//       )}
//     </div>

//     {/* Depth overlay */}
//     <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

//     <Sidebar activeView={activeView} setActiveView={setActiveView} />

//     <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-10 relative z-10">
//       <Header />

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={activeView}
//           initial={{ opacity: 0, y: 30, scale: 0.97 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.4, ease: "easeOut" }}
//         >
//           {renderView(activeView, { potions, setPotions })}
//         </motion.div>
//       </AnimatePresence>
//     </main>

//     <ChatWidget />
//   </div>
// );
// }

// /* ---------------- PAGE EXPORT ---------------- */

// export default function DashboardPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Loading Alchemical Records...
//       </div>
//     }>
//       <DashboardContent />
//     </Suspense>
//   );
// }

// /* ---------------- HEADER ---------------- */

// function Header() {
//   return (
//     <header className="section-card glow-gold p-8 space-y-6">
//       <div className="flex items-center gap-4">
//         <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-yellow-500 rounded-full flex items-center justify-center shadow-xl">
//           📖
//         </div>
//         <div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-yellow-300 bg-clip-text text-transparent">
//             The Alchemist's Grimoire
//           </h1>
//           <p className="text-emerald-200">
//             Your mystical wellness companion
//           </p>
//         </div>
//       </div>

//       <div className="bg-white/10 rounded-2xl p-6 border border-gold-400/30">
//         <p className="italic text-center text-emerald-100">
//           “Within these pages lie the secrets of balance, vitality, and well-being.”
//         </p>
//       </div>
//     </header>
//   );
// }

// /* ---------------- VIEW ROUTER ---------------- */

// function renderView(view, props) {
//   switch (view) {
//     case "Dashboard": return <DashboardView {...props} />;
//     case "Potions": return <PotionsView {...props} />;
//     case "Calendar": return <CalendarView {...props} />;
//     case "Rewards": return <RewardsView />;
//     default: return <DashboardView {...props} />;
//   }
// }

// /* ---------------- DASHBOARD VIEW ---------------- */

// function DashboardView({ potions }) {
//   return (
//     <div className="section-card glow-emerald p-8 space-y-10">
//       <div className="text-center">
//         <h2 className="text-4xl font-bold gradient-text mb-3">
//           Today’s Alchemical Rituals
//         </h2>
//         <p className="text-emerald-200">
//           Your potions await to restore balance
//         </p>
//       </div>

//       {potions.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="w-24 h-24 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-6">
//             🧪
//           </div>
//           <h3 className="text-2xl font-semibold text-gold-300 mb-2">
//             No Potions Scheduled
//           </h3>
//           <p className="text-emerald-200">
//             Begin your wellness journey
//           </p>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-6">
//           {potions.map(p => (
//             <PotionCard key={p._id || p.id} potion={p} />
//           ))}
//         </div>
//       )}

//       {/* Stats */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {[
//           { icon: "💊", label: "Active Potions", value: potions.length },
//           { icon: "⭐", label: "Day Streak", value: 7 },
//           { icon: "🏆", label: "Achievements", value: 12 }
//         ].map(stat => (
//           <div
//             key={stat.label}
//             className="section-card hover-lift glow-gold p-6 text-center"
//           >
//             <div className="text-4xl mb-2 animate-float">{stat.icon}</div>
//             <div className="text-2xl font-bold text-gold-300">
//               {stat.value}
//             </div>
//             <div className="text-emerald-200">
//               {stat.label}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ---------------- REWARDS VIEW ---------------- */

// function RewardsView() {
//   const badges = [
//     { label: "First Potion Brewed", unlocked: true, icon: "🧪" },
//     { label: "3-Day Streak", unlocked: true, icon: "🔥" },
//     { label: "7-Day Mastery", unlocked: false, icon: "⭐" },
//     { label: "Mindful Alchemist", unlocked: true, icon: "🧘" },
//   ];

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {badges.map(b => (
//         <div
//           key={b.label}
//           className={`relative section-card p-6 text-center hover-lift ${
//             b.unlocked ? "glow-gold" : "opacity-60"
//           }`}
//         >
//           {b.unlocked && (
//             <div className="absolute inset-0 border-2 border-gold-400 rounded-2xl animate-pulse"></div>
//           )}
//           <div className="text-4xl mb-3">{b.icon}</div>
//           <h3 className="text-gold-300 font-semibold">
//             {b.label}
//           </h3>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ---------------- POTIONS VIEW ---------------- */

// function PotionsView({ potions, setPotions }) {
//   return (
//     <div className="section-card glow-emerald p-8">
//       <h2 className="text-3xl font-bold text-gold-300 mb-4 text-center">
//         Potion Laboratory
//       </h2>

//       <div className="grid md:grid-cols-3 gap-6">
//         {potions.map(p => (
//           <PotionCard key={p._id || p.id} potion={p} />
//         ))}
//       </div>
//     </div>
//   );
// }
// //calender view

// function CalendarView({ potions }) {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const nextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   const prevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   return (
//     <div className="space-y-6">
//       {/* 1. Header with clear contrast */}
//       <div className="text-center mb-8">
//         <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
//           Alchemist's <span className="text-[#fbbf24]">Almanac</span>
//         </h2>
//         <p className="text-emerald-400/80 italic">"Tracking the celestial cycles of your health"</p>
//       </div>

//       {/* 2. Calendar Card */}
//       <div className="bg-[#022c22] border-2 border-[#fbbf24]/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
//         {/* Subtle Paper Texture Overlay */}
//         <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        
//         {/* Navigation */}
//         <div className="flex justify-between items-center mb-10 relative z-10">
//           <button
//             onClick={prevMonth}
//             className="p-3 bg-[#051512] border border-[#fbbf24]/40 text-[#fbbf24] rounded-xl hover:bg-[#fbbf24] hover:text-[#022c22] transition-all duration-300 shadow-lg"
//           >
//             <ChevronLeft size={24} />
//           </button>

//           <h3 className="text-3xl font-bold text-white tracking-widest uppercase">
//             {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//           </h3>

//           <button
//             onClick={nextMonth}
//             className="p-3 bg-[#051512] border border-[#fbbf24]/40 text-[#fbbf24] rounded-xl hover:bg-[#fbbf24] hover:text-[#022c22] transition-all duration-300 shadow-lg"
//           >
//             <ChevronRight size={24} />
//           </button>
//         </div>

//         {/* Calendar Grid */}
//         <div className="grid grid-cols-7 gap-3 sm:gap-5 relative z-10">
//           {/* Days Name Header */}
//           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//             <div key={day} className="text-center font-black text-[#fbbf24]/60 text-xs uppercase tracking-tighter pb-4">
//               {day}
//             </div>
//           ))}

//           {/* Dates - Static 31 days for UI preview */}
//           {[...Array(31)].map((_, i) => {
//             const dateNum = i + 1;
//             const isToday = dateNum === 20; // Example: Today highlight
//             const hasPotion = [5, 12, 20, 28].includes(dateNum); // Potion days

//             return (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.05, borderColor: 'rgba(251, 191, 36, 0.6)' }}
//                 className={`p-3 min-h-[90px] rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between
//                   ${isToday 
//                     ? "bg-[#fbbf24] border-[#fbbf24] shadow-[0_0_25px_rgba(251,191,36,0.3)]" 
//                     : "bg-[#051512] border-[#fbbf24]/10 text-white"
//                   }`}
//               >
//                 <span className={`text-xl font-bold ${isToday ? "text-[#022c22]" : "text-white/90"}`}>
//                   {dateNum}
//                 </span>
                
//                 {/* Ritual Indicator */}
//                 {hasPotion && (
//                   <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-lg
//                     ${isToday ? "bg-black/10 text-[#022c22]" : "bg-[#10b981]/20 text-[#10b981]"}`}>
//                     <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isToday ? "bg-[#022c22]" : "bg-[#10b981]"}`}></div>
//                     Ritual
//                   </div>
//                 )}
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { 
//   ChevronLeft, ChevronRight, Plus, X, Clock, Pill, 
//   Sparkles, Beaker, Trash2, Search, Zap 
// } from "lucide-react";
import { 
  ChevronLeft, ChevronRight, Plus, X, Clock, Pill, 
  Sparkles, Beaker, Trash2, Search, Zap, Star, Trophy 
} from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import PotionCard from '@/app/components/PotionCard';
import ChatWidget from '@/app/components/ChatWidget';

/* ---------------- THEME MAPPING ---------------- */
const bgMap = {
  Dashboard: "from-indigo-950 via-purple-900 to-slate-900",
  Potions: "from-emerald-950 via-teal-900 to-slate-900",
  Calendar: "from-purple-950 via-fuchsia-900 to-slate-900",
  Rewards: "from-yellow-900 via-amber-900 to-slate-900",
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get('view') || 'Dashboard';
  const [activeView, setActiveView] = useState(initialView);
  const [potions, setPotions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const router = useRouter();

  // Load Initial Data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Dummy initial data for UI preview
    setPotions([{ id: 1, name: "URIKIND", dosage: "1 Packet", time: "11:00 AM" }]);
  }, [router]);

  // CRUD Functions
  const handleAddPotion = (newPotion) => {
    setPotions([...potions, { ...newPotion, id: Date.now() }]);
    setShowAddModal(false);
  };

  const handleDeletePotion = (id) => {
    setPotions(potions.filter(p => p.id !== id));
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${bgMap[activeView] || bgMap.Dashboard} flex relative overflow-hidden transition-all duration-700`}>
      
      {/* Mystical Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-16 w-[30rem] h-[30rem] bg-gold-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[20rem] h-[20rem] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>

      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 p-6 lg:p-12 overflow-y-auto space-y-12 relative z-10 custom-scrollbar">
        <Header />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderView(activeView, { potions, setPotions, setShowAddModal, handleDeletePotion })}
          </motion.div>
        </AnimatePresence>
      </main>

      <ChatWidget />

      {/* ADD POTION MODAL */}
      <AddPotionModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onAdd={handleAddPotion} 
      />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Header() {
  return (
    <header className="bg-slate-900/40 backdrop-blur-xl rounded-[3rem] border border-gold-500/20 p-8 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(251,191,36,0.4)] rotate-3">
          📖
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-white">The Alchemist's <span className="text-gold-500">Grimoire</span></h1>
          <p className="text-emerald-400/60 italic">"Decoding the ancient formulas of your vitality"</p>
        </div>
      </div>
      <div className="hidden md:block text-right">
        <p className="text-xs text-gold-500/50 uppercase tracking-[0.3em] font-bold">Celestial Cycle</p>
        <p className="text-white font-mono">Phase: Waxing Gibbous</p>
      </div>
    </header>
  );
}

function AddPotionModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({ name: '', dosage: '', time: '' });
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#051512] border-2 border-gold-500/30 rounded-[3rem] p-10 w-full max-w-lg shadow-2xl relative">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/30 hover:text-white"><X size={24} /></button>
        <h3 className="text-3xl font-bold text-gold-500 mb-8 text-center italic tracking-tighter">Brew New Elixir</h3>
        <form onSubmit={(e) => { e.preventDefault(); onAdd(formData); }} className="space-y-6">
          <InputGroup label="Potion Name" placeholder="e.g. URIKIND" onChange={(v) => setFormData({...formData, name: v})} />
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Dosage" placeholder="1 Packet" onChange={(v) => setFormData({...formData, dosage: v})} />
            <InputGroup label="Ritual Time" type="time" onChange={(v) => setFormData({...formData, time: v})} />
          </div>
          <button type="submit" className="w-full py-5 bg-gold-500 text-black font-black rounded-2xl shadow-xl hover:bg-white transition-all mt-4 uppercase tracking-widest text-xs">Register Formula</button>
        </form>
      </motion.div>
    </div>
  );
}

const InputGroup = ({ label, placeholder, type = "text", onChange }) => (
  <div>
    <label className="text-[10px] text-gold-500/60 uppercase tracking-[0.3em] ml-2 mb-2 block font-black">{label}</label>
    <input required type={type} onChange={(e) => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-gold-500/50 text-white" placeholder={placeholder} />
  </div>
);

function DashboardView({ potions }) {
  const [symptom, setSymptom] = useState("");
  const [oracleResult, setOracleResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const consultOracle = async () => {
    if (!symptom) return;
    setIsLoading(true);
    setOracleResult("");

    try {
      // Yahan hum aapke backend AI service ko call karenge
      const response = await fetch('/api/ai-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: symptom })
      });
      const data = await response.json();
      setOracleResult(data.analysis || "The spirits suggest balance and rest.");
    } catch (err) {
      setOracleResult("The Oracle is currently clouded. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Existing Rituals Section */}
      <section className="text-center">
        <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Today's <span className="text-gold-500">Rituals</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {potions.map(p => <PotionCard key={p.id} potion={p} />)}
        </div>
      </section>

      {/* --- SYMPTOM ORACLE (FUNCTIONAL) --- */}
      <section className="bg-slate-900/60 border-2 border-gold-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-20"><Zap size={40} className="text-gold-500" /></div>
        
        <div className="relative z-10 space-y-8">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-white tracking-tighter">Consult the <span className="text-gold-500">Symptom Oracle</span></h3>
            <p className="text-gray-400 italic mt-2">Describe your ailments to receive alchemical guidance.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && consultOracle()}
                placeholder="Describe your sensation (e.g., burning in chest)..." 
                className="w-full bg-black/40 border border-gold-500/30 rounded-2xl px-8 py-5 outline-none focus:border-gold-500 transition-all text-white" 
              />
            </div>
            <button 
              onClick={consultOracle}
              disabled={isLoading}
              className="bg-gold-500 text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? "Consulting..." : <><Search size={20}/> Ask Oracle</>}
            </button>
          </div>

          {/* DISPLAY THE RESULT HERE */}
          <AnimatePresence>
            {oracleResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-8 bg-gold-500/5 border border-gold-500/20 rounded-3xl"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🔮</span>
                  <div>
                    <h4 className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-2">Oracle Analysis</h4>
                    <p className="text-gray-200 leading-relaxed italic">{oracleResult}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function PotionsView({ potions, setShowAddModal, handleDeletePotion }) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center bg-slate-900/40 p-10 rounded-[3rem] border border-white/10">
        <div>
          <h2 className="text-4xl font-bold text-gold-500 tracking-tighter">Potion Laboratory</h2>
          <p className="text-gray-400 italic">Manage your active elixirs and botanical formulas</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-gold-500 text-black px-10 py-4 rounded-full font-black flex items-center gap-3 hover:bg-white transition-all shadow-2xl">
          <Plus size={24} /> <span className="uppercase tracking-widest text-sm">Brew New Elixir</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {potions.map(p => (
          <div key={p.id} className="relative group">
            <PotionCard potion={p} />
            <button onClick={() => handleDeletePotion(p.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 bg-red-500/20 text-red-500 rounded-lg transition-all"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- CALENDAR COMPONENT --- */
function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-slate-900/60 backdrop-blur-xl border-2 border-gold-500/20 rounded-[3rem] p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <button className="p-3 bg-white/5 rounded-xl text-gold-500 hover:bg-gold-500 hover:text-black transition-all"><ChevronLeft /></button>
          <h2 className="text-3xl font-bold text-white italic tracking-tighter uppercase">December 2025</h2>
          <button className="p-3 bg-white/5 rounded-xl text-gold-500 hover:bg-gold-500 hover:text-black transition-all"><ChevronRight /></button>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {days.map(d => <div key={d} className="text-center text-gold-500/50 font-black text-xs uppercase tracking-widest">{d}</div>)}
          {dates.map(date => (
            <div key={date} className={`h-24 rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all hover:border-gold-500 ${date === 20 ? 'bg-gold-500 border-gold-400 shadow-lg text-black' : 'bg-black/20 border-white/5 text-white'}`}>
              <span className="text-xl font-bold">{date}</span>
              {date === 20 && <Sparkles size={12} className="animate-pulse" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- REWARDS/ACHIEVEMENTS COMPONENT --- */
function RewardsView() {
  const badges = [
    { name: "Initiate Alchemist", icon: <Beaker />, desc: "First potion brewed", unlocked: true },
    { name: "Master of Timing", icon: <Clock />, desc: "7-day streak maintained", unlocked: true },
    { name: "Celestial Healer", icon: <Star />, desc: "Unlock all daily rituals", unlocked: false },
    { name: "Vault Guardian", icon: <Trophy />, desc: "Complete 1 month journey", unlocked: false }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {badges.map((b, i) => (
        <div key={i} className={`p-8 rounded-[2.5rem] border-2 flex flex-col items-center text-center transition-all ${b.unlocked ? 'bg-slate-900/60 border-gold-500/40 shadow-xl' : 'bg-black/40 border-white/5 opacity-50'}`}>
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-4 ${b.unlocked ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20' : 'bg-white/5 text-white/20'}`}>
            {b.icon}
          </div>
          <h3 className={`text-xl font-bold mb-2 ${b.unlocked ? 'text-white' : 'text-white/20'}`}>{b.name}</h3>
          <p className="text-xs text-white/40 uppercase tracking-widest font-bold">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}

function StatBox({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gold-500 mb-2 border border-white/10">{icon}</div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">{label}</p>
    </div>
  );
}

function renderView(view, props) {
  switch (view) {
    case "Dashboard": return <DashboardView {...props} />;
    case "Potions": return <PotionsView {...props} />;
    case "Calendar": return <CalendarView />;
    case "Rewards": return <RewardsView />;
    default: return <DashboardView {...props} />;
  }
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white bg-[#020617] tracking-[0.5em] uppercase text-xs">Summoning the Spirits...</div>}>
      <DashboardContent />
    </Suspense>
  );
}